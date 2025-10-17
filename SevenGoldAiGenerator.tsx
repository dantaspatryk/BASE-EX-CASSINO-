import React from 'react';
import type { AiProfile, CrashResult } from '../../types';
import RealTimeHistory from '../../components/RealTimeHistory';
import AiGeneratorCard from '../../components/AiGeneratorCard';

const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);

interface SevenGoldAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile, forceBadSignal: boolean, customStrategy: undefined, realTimeHistory: CrashResult[]) => void;
    isLoading: boolean;
    realTimeHistory: CrashResult[];
    isApplicable: boolean;
}

const SevenGoldAiGenerator: React.FC<SevenGoldAiGeneratorProps> = ({ onGenerate, isLoading, realTimeHistory, isApplicable }) => {
    return (
        <AiGeneratorCard 
            title="Seven Gold AI"
            description="Caçador de Velas Altas. Analisa o histórico em tempo real para estratégias de alto risco."
            icon={<GemIcon className="w-10 h-10 text-amber-400"/>}
            onClick={() => onGenerate('Seven Gold', false, undefined, realTimeHistory)}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Crash' : undefined}
            borderColor="border-amber-500/50"
            contentTop={
                <RealTimeHistory 
                    analysisType="crash"
                    themeColor="amber"
                    history={realTimeHistory}
                    title="Análise em Tempo Real"
                    description="Este é o fluxo de dados que nossa inteligência decodifica para criar sua estratégia."
                />
            }
        />
    );
};

export default SevenGoldAiGenerator;