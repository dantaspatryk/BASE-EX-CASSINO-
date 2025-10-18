import { useState, useCallback, useEffect, useRef } from 'react';
import { generateSignal } from '../services/geminiService';
import { dataService } from '../services/supabaseService';
import usePersistentState from './usePersistentState'; // Import the new hook
import { checkSignalsForFinalization } from '../services/signalSecurityService';
import type { 
    ActiveSignal, 
    HistorySignal, 
    GeneratedSignal, 
    User, 
    GamePayoutStates, 
    PayoutSettings,
    CustomStrategyConfig, 
    AiProfile,
    ManagedGame,
    CrashResult,
    SlotSignal
} from '../types';

const MAX_ACTIVE_SIGNALS = 25;

interface UseSignalManagerProps {
    currentUser: User;
    initialHistory: HistorySignal[];
    gamePayoutStates: GamePayoutStates;
    payoutSettings: PayoutSettings;
    updateGameCooldown: (gameName: string, cooldownEnd: number, forcedLowPhaseEnd: number) => void;
    onUserCooldownUpdate: (gameName: string, cooldownEnd: number) => void;
    allManagedGames: ManagedGame[];
}

export const useSignalManager = ({
    currentUser,
    initialHistory,
    gamePayoutStates,
    payoutSettings,
    updateGameCooldown,
    onUserCooldownUpdate,
    allManagedGames,
}: UseSignalManagerProps) => {
    const [activeSignals, setActiveSignals] = usePersistentState<ActiveSignal[]>('activeSignals', []);
    const [signalHistory, setSignalHistory] = useState<HistorySignal[]>(initialHistory);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingGameName, setGeneratingGameName] = useState<string | null>(null);
    const [confirmedProfitGames, setConfirmedProfitGames] = usePersistentState<string[]>('confirmedProfitGames', []);
    const [generationDuration, setGenerationDuration] = useState(25000);
    const [finalizingSignalsInfo, setFinalizingSignalsInfo] = useState<{ timestamp: number, startTime: number, transitionType: 'high_to_low' | 'low_to_high' }[]>([]);
    const generationInProgress = useRef(false);
    const cleanupRan = useRef(false);

    useEffect(() => {
        setSignalHistory(initialHistory);
    }, [initialHistory]);

    const handleInvalidateSignal = useCallback(async (generatedAtTimestamp: number, reason: 'warning' | 'user_cancellation' | 'profit_finalize' | 'phase_change' | 'expired') => {
        const signalToInvalidate = activeSignals.find(s => s.generatedAt === generatedAtTimestamp);
        if (!signalToInvalidate) return;

        setConfirmedProfitGames(prev => prev.filter(gameName => gameName !== signalToInvalidate.gameName));
        
        setFinalizingSignalsInfo(prev => prev.filter(info => info.timestamp !== generatedAtTimestamp));

        let newStatus: HistorySignal['status'] = 'invalid';
        if (reason === 'profit_finalize') newStatus = 'finalized';
        else if (['expired', 'phase_change', 'warning'].includes(reason)) newStatus = 'expired';

        try {
            const updatedHistorySignal = await dataService.updateSignalStatus(generatedAtTimestamp, newStatus);
            setSignalHistory(prev => prev.map(s => s.generatedAtTimestamp === generatedAtTimestamp ? updatedHistorySignal : s));
        } catch (error) {
             console.error(`Failed to update signal status for ${generatedAtTimestamp}`, error);
             setSignalHistory(prev => prev.map(s => s.generatedAtTimestamp === generatedAtTimestamp ? { ...s, status: newStatus } : s));
        }
        
        if (reason === 'user_cancellation' && currentUser) {
            const cooldownEnd = Date.now() + (payoutSettings.humanSupportCooldownMinutes * 60000);
            const forcedLowPhaseEnd = cooldownEnd;
            updateGameCooldown(signalToInvalidate.gameName, cooldownEnd, forcedLowPhaseEnd);
            onUserCooldownUpdate(signalToInvalidate.gameName, cooldownEnd);
        }

        setActiveSignals(prev => prev.filter(s => s.generatedAt !== generatedAtTimestamp));
    }, [activeSignals, currentUser, payoutSettings.humanSupportCooldownMinutes, updateGameCooldown, onUserCooldownUpdate, setConfirmedProfitGames, setSignalHistory, setActiveSignals]);

    // This effect runs on mount to clean up signals that expired while the app was closed.
    useEffect(() => {
        if (cleanupRan.current || Object.keys(gamePayoutStates).length === 0 || activeSignals.length === 0) {
            return;
        }

        // Run the check once on mount
        const signalsToFinalizeOnLoad = checkSignalsForFinalization(activeSignals, gamePayoutStates);

        signalsToFinalizeOnLoad.forEach(({ signal }) => {
            // On initial load, we don't need the modal/delay for payout drops,
            // we just expire them immediately to clean up the state.
            handleInvalidateSignal(signal.generatedAt, 'expired');
        });
        
        cleanupRan.current = true;
        
    }, [activeSignals, handleInvalidateSignal, gamePayoutStates]);


    const handleGenerateSignal = useCallback(async (
        gameName: string,
        gameCategory: string,
        aiProfile: AiProfile,
        forceBadSignal?: boolean,
        customStrategy?: CustomStrategyConfig,
        realTimeHistory?: CrashResult[]
    ) => {
        if (generationInProgress.current) {
            console.warn("A signal generation is already in progress. Ignoring new request.");
            return;
        }
        if (activeSignals.length >= MAX_ACTIVE_SIGNALS) {
            console.error("Signal limit reached.");
            return;
        }

        generationInProgress.current = true;
        setConfirmedProfitGames(prev => prev.filter(g => g !== gameName));
        setIsGenerating(true);
        setGeneratingGameName(gameName);

        const payout = gamePayoutStates[gameName]?.payout ?? 0;
        let duration = 40000; // Payout HOT >= 88%
        if (payout < 75) {
            duration = 15000; // Payout Baixo
        } else if (payout < 88) {
            duration = 25000; // Payout Alto
        }
        setGenerationDuration(duration);
    
        try {
            const signalPromise = generateSignal(gameName, gameCategory, gamePayoutStates[gameName], signalHistory, aiProfile, customStrategy, realTimeHistory);
            const minimumDurationPromise = new Promise(resolve => setTimeout(resolve, duration));
            const [signal] = await Promise.all([signalPromise, minimumDurationPromise]);
    
            const newActiveSignal: ActiveSignal = { signal, gameName, generatedAt: Date.now() };
            setActiveSignals(prev => [...prev.filter(s => s.gameName !== gameName), newActiveSignal].slice(-MAX_ACTIVE_SIGNALS));
    
            const historyEntry: HistorySignal = {
                ...signal,
                gameName: gameName,
                generatedAt: new Date(newActiveSignal.generatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                generatedAtTimestamp: newActiveSignal.generatedAt,
                status: 'valid'
            };
    
            const savedHistorySignal = await dataService.addSignalToHistory(historyEntry);
            setSignalHistory(prev => [savedHistorySignal, ...prev]);
    
        } catch (error) {
            console.error("Error generating signal in hook:", error);
        } finally {
            generationInProgress.current = false;
            setIsGenerating(false);
            setGeneratingGameName(null);
        }
    }, [activeSignals.length, gamePayoutStates, signalHistory, setActiveSignals, setSignalHistory, setConfirmedProfitGames]);

    const handleConfirmProfit = useCallback((gameName: string) => {
        if (!confirmedProfitGames.includes(gameName)) {
            setConfirmedProfitGames(prev => [...prev, gameName]);
        }
    }, [confirmedProfitGames, setConfirmedProfitGames]);

    const handleUnconfirmProfit = useCallback((gameName: string) => {
        setConfirmedProfitGames(prev => prev.filter(g => g !== gameName));
    }, [setConfirmedProfitGames]);
    
    // Periodic check for signal finalization
    useEffect(() => {
        const periodicTimer = setInterval(() => {
            // Get a list of signals to finalize from the security service
            const signalsToFinalize = checkSignalsForFinalization(activeSignals, gamePayoutStates);

            signalsToFinalize.forEach(({ signal, reason, transitionType }) => {
                const isAlreadyBeingFinalized = finalizingSignalsInfo.some(info => info.timestamp === signal.generatedAt);

                // A phase transition was detected
                if (transitionType && !isAlreadyBeingFinalized) {
                    // Trigger the modal in the UI
                    setFinalizingSignalsInfo(prev => [...prev, { timestamp: signal.generatedAt, startTime: Date.now(), transitionType }]);
                    
                    // Invalidate the signal after a 20-second delay for the modal
                    window.setTimeout(() => handleInvalidateSignal(signal.generatedAt, 'phase_change'), 20000);
                } else if (reason === 'expired' && !isAlreadyBeingFinalized) {
                    // For expirations, invalidate immediately without a modal.
                    handleInvalidateSignal(signal.generatedAt, 'expired');
                }
            });
        }, 1000); // Check every 1 second

        return () => clearInterval(periodicTimer);
    }, [activeSignals, handleInvalidateSignal, gamePayoutStates, finalizingSignalsInfo]);


    return {
        activeSignals,
        signalHistory,
        isGenerating,
        generatingGameName,
        confirmedProfitGames,
        generationDuration,
        finalizingSignalsInfo,
        handleGenerateSignal,
        handleInvalidateSignal,
        handleConfirmProfit,
        handleUnconfirmProfit,
    };
};
