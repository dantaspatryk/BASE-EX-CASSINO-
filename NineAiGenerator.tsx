import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';
import type { AnalysisLog } from '../../hooks/useGenericAnalysis';

const CrownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);

interface NineAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
    analysisLogs: AnalysisLog[];
}

const NineAiGenerator: React.FC<NineAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable, analysisLogs }) => {
    return (
        <AiGeneratorCard 
            title="Nine AI"
            description="Analista Tático. Gera estratégias profissionais para Roleta, Blackjack e outros jogos de mesa."
            icon={<CrownIcon className="w-10 h-10 text-sky-400"/>}
            onClick={() => onGenerate('Nine')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Ao Vivo' : undefined}
            borderColor="border-sky-500/50"
            contentTop={
                <DecodingMatrix themeColor="sky" />
            }
        />
    );
};

export default NineAiGenerator;