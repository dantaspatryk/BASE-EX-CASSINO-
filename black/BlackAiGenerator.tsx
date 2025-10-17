import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';
import type { AnalysisLog } from '../../hooks/useGenericAnalysis';

const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>);

interface BlackAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
    analysisLogs: AnalysisLog[];
}

const BlackAiGenerator: React.FC<BlackAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable, analysisLogs }) => {
    return (
        <AiGeneratorCard 
            title="Black AI"
            description="Analista Mestre. Estratégias táticas para bancas de R$100 a R$500, com análise profunda."
            icon={<CpuIcon className="w-10 h-10 text-purple-300"/>}
            onClick={() => onGenerate('Black')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Slots & Fortune' : undefined}
            borderColor="border-purple-500/50"
            contentTop={
                <DecodingMatrix themeColor="purple" />
            }
        />
    );
};

export default BlackAiGenerator;
