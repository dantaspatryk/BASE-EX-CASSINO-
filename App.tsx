import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SignalDisplay from './components/SignalDisplay';
import SignalGeneratorPage from './components/SignalGeneratorPage';
import ChangingPhaseInterstitial from './components/ChangingPhaseInterstitial';
import HistoryPage from './components/HistoryPage';
import InformationPage from './components/InformationPage';
import SupportPage from './components/SupportPage';
import GameSelection from './components/GameSelection';
import GeneratingSignalLoader from './components/GeneratingSignalLoader';
import { Navbar } from './components/Navbar';

import { useGameData } from './hooks/useGameData';
import { useUserSettings } from './hooks/useUserSettings';
import { usePayoutManager } from './hooks/usePayoutManager';
import { useSignalManager } from './hooks/useSignalManager';
import usePersistentState from './hooks/usePersistentState'; // Import the new hook

import type { PayoutSettings, User, Page, PayoutState } from './types';

const DEFAULT_PAYOUT_SETTINGS: PayoutSettings = {
    highPhaseMin: 75,
    highPhaseMax: 95,
    lowPhaseMin: 55,
    lowPhaseMax: 74,
    highPhaseDurationMinutes: 12,
    lowPhaseDurationMinutes: 20,
    volatilityCooldownMinutes: 5,
    humanSupportCooldownMinutes: 35,
    futureAnalysisGapMinutesMin: 10,
    futureAnalysisGapMinutesMax: 30,
};

export const App = () => {
    const [currentUser, setCurrentUser] = usePersistentState<User>('currentUser', { userEmail: '', cooldowns: {} });
    const [currentPage, setCurrentPage] = usePersistentState<Page>('currentPage', 'generator');
    const [selectedGame, setSelectedGame] = usePersistentState<string | null>('selectedGame', null);
    const [showInterstitialForGame, setShowInterstitialForGame] = useState<{ name: string; state: PayoutState } | null>(null);
    const [gameToSelectAfterInterstitial, setGameToSelectAfterInterstitial] = useState<string | null>(null);

    // --- Service Worker Registration ---
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registered successfully:', registration);
                    })
                    .catch(registrationError => {
                        console.log('Service Worker registration failed:', registrationError);
                    });
            });
        }
    }, []);


    // --- Custom Hooks for State Management ---
    const { allManagedGames, initialSignalHistory } = useGameData();
    const { favoriteGames, notificationSubscriptions, toggleFavorite, toggleNotificationSubscription } = useUserSettings();
    const { gamePayoutStates, gamePayouts, updateGameCooldown } = usePayoutManager(allManagedGames, DEFAULT_PAYOUT_SETTINGS);

    const onUserCooldownUpdate = useCallback((gameName: string, cooldownEnd: number) => {
        setCurrentUser(prevUser => {
            const currentCooldowns = prevUser.cooldowns || {};
            const updatedCooldowns = { ...currentCooldowns, [gameName]: { humanSupportEnd: cooldownEnd } };
            return { ...prevUser, cooldowns: updatedCooldowns };
        });
    }, [setCurrentUser]);
    
    const {
        activeSignals,
        signalHistory,
        generatingGameName,
        isGenerating,
        confirmedProfitGames,
        generationDuration,
        finalizingSignalsInfo,
        handleGenerateSignal,
        handleInvalidateSignal,
        handleConfirmProfit,
        handleUnconfirmProfit,
    } = useSignalManager({
        currentUser,
        initialHistory: initialSignalHistory,
        gamePayoutStates,
        payoutSettings: DEFAULT_PAYOUT_SETTINGS,
        updateGameCooldown,
        onUserCooldownUpdate,
        allManagedGames,
    });


    // --- Navigation and Selection Handlers ---
    const handleNavigate = useCallback((page: Page) => {
        setSelectedGame(null);
        setCurrentPage(page);
    }, [setCurrentPage, setSelectedGame]);

    const handleGameSelection = useCallback((gameName: string) => {
        const state = gamePayoutStates[gameName];
        if (state && state.isChangingSoon) {
            setShowInterstitialForGame({ name: gameName, state: state });
        } else {
            setSelectedGame(gameName);
        }
    }, [gamePayoutStates, setSelectedGame]);

    const handleReplayGame = useCallback((gameName: string) => {
        setCurrentPage('generator');
        const state = gamePayoutStates[gameName];
        if (state && state.isChangingSoon) {
            setGameToSelectAfterInterstitial(gameName);
            setShowInterstitialForGame({ name: gameName, state: state });
        } else {
            setSelectedGame(gameName);
        }
    }, [gamePayoutStates, setCurrentPage, setSelectedGame]);

    const handleBackToSelection = useCallback(() => {
        setSelectedGame(null);
    }, [setSelectedGame]);

    const handleInvalidateAndGoHome = useCallback((...args: Parameters<typeof handleInvalidateSignal>) => {
        handleInvalidateSignal(...args);
        handleBackToSelection();
    }, [handleInvalidateSignal, handleBackToSelection]);


    const selectedGameData = useMemo(() => {
        return allManagedGames.find(g => g.name === selectedGame);
    }, [selectedGame, allManagedGames]);


    return (
        <div className="min-h-screen text-white font-sans flex flex-col pt-8 pb-24 px-4">
            {isGenerating && generatingGameName && <GeneratingSignalLoader gameName={generatingGameName} duration={generationDuration} />}
            
            {!selectedGame && !showInterstitialForGame && <Header />}

            {showInterstitialForGame?.state.nextPhase && (
                <ChangingPhaseInterstitial
                    gameName={showInterstitialForGame.name}
                    nextPhase={showInterstitialForGame.state.nextPhase}
                    endTime={showInterstitialForGame.state.phaseEndTime}
                    onFinish={() => {
                        setShowInterstitialForGame(null);
                        if (gameToSelectAfterInterstitial) {
                            setSelectedGame(gameToSelectAfterInterstitial);
                            setGameToSelectAfterInterstitial(null);
                        }
                    }}
                    durationMinutes={showInterstitialForGame.state.durationMinutes}
                />
            )}

            <main className="flex-grow">
                {selectedGame && selectedGameData ? (
                    (() => {
                        const signalForGame = activeSignals
                            .find(s => s.gameName === selectedGame);

                        if (signalForGame) {
                             const finalizingInfo = finalizingSignalsInfo.find(info => info.timestamp === signalForGame.generatedAt);
                             const isAutoFinalizing = !!finalizingInfo;
                             const autoFinalizeStartTime = finalizingInfo ? finalizingInfo.startTime : 0;
                             const transitionType = finalizingInfo ? finalizingInfo.transitionType : null;
                            return <SignalDisplay
                                signal={signalForGame.signal}
                                gameName={signalForGame.gameName}
                                generatedAt={signalForGame.generatedAt}
                                payoutState={gamePayoutStates[signalForGame.gameName]}
                                currentPayout={gamePayouts[signalForGame.gameName]}
                                onBackToSelection={handleBackToSelection}
                                onInvalidateSignal={handleInvalidateAndGoHome}
                                onConfirmProfit={handleConfirmProfit}
                                onUnconfirmProfit={handleUnconfirmProfit}
                                isProfitConfirmed={confirmedProfitGames.includes(signalForGame.gameName)}
                                isGenerating={isGenerating}
                                isAutoFinalizing={isAutoFinalizing}
                                autoFinalizeStartTime={autoFinalizeStartTime}
                                transitionType={transitionType}
                            />;
                        }
                        
                        return <SignalGeneratorPage 
                            user={currentUser}
                            gameName={selectedGame}
                            gameCategory={selectedGameData.category}
                            onGenerateSignal={handleGenerateSignal}
                            isLoading={isGenerating}
                            onBack={handleBackToSelection}
                            payoutState={gamePayoutStates[selectedGame]}
                            payoutSettings={DEFAULT_PAYOUT_SETTINGS}
                            signalHistory={signalHistory}
                            activeSignalsCount={activeSignals.length}
                        />;
                    })()
                ) : (
                    <>
                        <div className={currentPage === 'generator' ? 'block' : 'hidden'}>
                            <GameSelection 
                                games={allManagedGames}
                                onGameSelect={handleGameSelection}
                                onNavigate={handleNavigate}
                                gamePayouts={gamePayouts}
                                gamePayoutStates={gamePayoutStates}
                                payoutSettings={DEFAULT_PAYOUT_SETTINGS}
                                generatingGameName={generatingGameName}
                                onToggleFavorite={toggleFavorite}
                                favoriteGames={favoriteGames}
                                activeSignalGameNames={activeSignals.map(s => s.gameName)}
                                riskAnalysisGames={[]} // This can be managed in a hook if needed
                                notificationSubscriptions={notificationSubscriptions}
                                onToggleNotificationSubscription={toggleNotificationSubscription}
                            />
                        </div>
                        <div className={currentPage === 'history' ? 'block' : 'hidden'}>
                           <HistoryPage history={signalHistory} onReplayGame={handleReplayGame} />
                        </div>
                        <div className={currentPage === 'info' ? 'block' : 'hidden'}>
                            <InformationPage />
                        </div>
                        <div className={currentPage === 'support' ? 'block' : 'hidden'}>
                            <SupportPage />
                        </div>
                         <div className={currentPage === 'profile' ? 'block' : 'hidden'}>
                            {/* Profile page is intentionally left blank as per user feedback */}
                        </div>
                    </>
                )}
            </main>

            {!showInterstitialForGame && (
                <Navbar
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    isGameSelected={!!selectedGame}
                />
            )}
        </div>
    );
};