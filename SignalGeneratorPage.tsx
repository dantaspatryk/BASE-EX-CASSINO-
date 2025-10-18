import React from 'react';
import type { User, PayoutState, PayoutSettings, HistorySignal, AiProfile, CustomStrategyConfig, CrashResult } from '../types';
import { useRealTimeHistory } from '../hooks/useRealTimeHistory';
import { useGenericAnalysis } from '../hooks/useGenericAnalysis';

// Import individual AI generator components
import BlackAiGenerator from '../ai-profiles/black/BlackAiGenerator';
import BlueAiGenerator from '../ai-profiles/blue/BlueAiGenerator';
import BoomAiGenerator from '../ai-profiles/boom/BoomAiGenerator';
import DiamondAiGenerator from '../ai-profiles/diamond/DiamondAiGenerator';
import SevenGoldAiGenerator from '../ai-profiles/sevenGold/SevenGoldAiGenerator';
import NineAiGenerator from '../ai-profiles/nine/NineAiGenerator';
import GoldAiGenerator from '../ai-profiles/gold/GoldAiGenerator';
import MatrixAiGenerator from '../ai-profiles/matrix/MatrixAiGenerator';
import ShowtimeAiGenerator from '../ai-profiles/showtime/ShowtimeAiGenerator';
import AceAiGenerator from '../ai-profiles/ace/AceAiGenerator';


// Icons
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);
const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);

interface SignalGeneratorPageProps {
  user: User;
  gameName: string;
  gameCategory: string;
  onGenerateSignal: (gameName: string, gameCategory: string, aiProfile: AiProfile, forceBadSignal?: boolean, customStrategy?: CustomStrategyConfig, realTimeHistory?: CrashResult[]) => void;
  isLoading: boolean;
  onBack: () => void;
  payoutState: PayoutState;
  payoutSettings: PayoutSettings;
  signalHistory: HistorySignal[];
  activeSignalsCount: number;
}

const SignalGeneratorPage: React.FC<SignalGeneratorPageProps> = ({ user, gameName, gameCategory, onGenerateSignal, isLoading, onBack, payoutState, payoutSettings }) => {
    const isCrashCategory = gameCategory === 'Crash';
    const useGenericLogs = !isCrashCategory;
    const { history: realTimeHistory } = useRealTimeHistory(isCrashCategory ? gameName : null);
    const { analysisLogs } = useGenericAnalysis(useGenericLogs);

    const isVeryLowPayout = payoutState.payout < 70;
    
    const payoutStatus = React.useMemo(() => {
        const payout = payoutState.payout;
        const highPhaseMin = payoutSettings.highPhaseMin; // 75

        if (payout < highPhaseMin) {
            return { text: 'Fluxo de Retenção', color: 'text-red-400' };
        }
        if (payout <= 77) {
            return { text: 'Fluxo de Transição', color: 'text-yellow-400' };
        }
        return { text: 'Fluxo de Distribuição', color: 'text-green-400' };
    }, [payoutState.payout, payoutSettings.highPhaseMin]);

    // Logic to determine which specialist AI to show
    const cardGameShows = ['Football Studio', 'Dragon Tiger Live', 'Football Studio Dice', 'Bac Bo', 'Andar Bahar', 'Teen Patti', 'Side Bet City'];
    const isCardGame = gameCategory === 'Ao Vivo' || cardGameShows.some(name => gameName.includes(name));
    const isWheelGameShow = gameCategory === 'Game Show' && !isCardGame;


  return (
    <div className="w-full max-w-md mx-auto flex flex-col animate-fade-in px-4">
      <header className="relative py-4 flex items-center justify-center">
        <button onClick={onBack} className="absolute left-0 p-2 text-white"><ArrowLeftIcon className="w-6 h-6" /></button>
        <h1 className="text-2xl font-bold text-white text-center">{gameName}</h1>
      </header>

      <div className="bg-slate-900/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-purple-500/50 mb-6 text-center">
        <p className="text-sm text-gray-400">ÍNDICE DE OPORTUNIDADE</p>
        <p className={`text-6xl font-black ${payoutStatus.color}`}>{payoutState.payout}%</p>
        <p className={`text-lg font-bold ${payoutStatus.color}`}>{payoutStatus.text}</p>
      </div>

       {isVeryLowPayout && (
            <div className="bg-amber-900/50 border border-amber-500/70 rounded-xl p-4 text-center mb-6 animate-fade-in flex items-start gap-3">
                <WarningIcon className="w-8 h-8 text-amber-300 flex-shrink-0 mt-1" />
                <div className="text-left">
                    <h3 className="font-bold text-amber-300">Atenção: Fluxo de Retenção Intenso</h3>
                    <p className="text-sm text-amber-200/90 mt-1">
                        A análise do algoritmo indica um risco elevado. A IA tentará encontrar uma brecha, mas jogue com extrema cautela.
                    </p>
                </div>
            </div>
        )}
      
      <div className="space-y-4">
        {/* Slot AIs */}
        <BlackAiGenerator 
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={['Slots', 'Fortune'].includes(gameCategory)}
            analysisLogs={analysisLogs}
        />
        <BlueAiGenerator 
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={['Slots', 'Fortune'].includes(gameCategory)}
            analysisLogs={analysisLogs}
        />
        <BoomAiGenerator 
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={['Slots', 'Fortune'].includes(gameCategory)}
            analysisLogs={analysisLogs}
        />
        <DiamondAiGenerator 
             onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
             isLoading={isLoading}
             isApplicable={['Slots', 'Fortune'].includes(gameCategory)}
             analysisLogs={analysisLogs}
        />
        {/* Fortune AI */}
        <GoldAiGenerator
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={gameCategory === 'Fortune'}
        />
        {/* Crash AI */}
        <SevenGoldAiGenerator 
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            realTimeHistory={realTimeHistory}
            isApplicable={gameCategory === 'Crash'}
        />
        {/* Matrix AI */}
        <MatrixAiGenerator
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={gameCategory === 'Matrix'}
        />
        {/* Live Game AIs */}
        <NineAiGenerator 
            onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
            isLoading={isLoading}
            isApplicable={gameCategory === 'Ao Vivo'}
            analysisLogs={analysisLogs}
        />
        <AceAiGenerator
             onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
             isLoading={isLoading}
             isApplicable={isCardGame}
        />
        <ShowtimeAiGenerator
             onGenerate={(...args) => onGenerateSignal(gameName, gameCategory, ...args)}
             isLoading={isLoading}
             isApplicable={isWheelGameShow}
        />
      </div>
    </div>
  );
};

export default SignalGeneratorPage;