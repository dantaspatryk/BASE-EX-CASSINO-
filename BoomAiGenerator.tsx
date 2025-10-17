import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';
import type { AnalysisLog } from '../../hooks/useGenericAnalysis';

const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);

interface BoomAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
    analysisLogs: AnalysisLog[];
}

const BoomAiGenerator: React.FC<BoomAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable, analysisLogs }) => {
    return (
        <AiGeneratorCard 
            title="Boom AI"
            description="Bancas de R$650-R$950. Adapta a intensidade ao fluxo para ataques de alto impacto com risco calculado."
            icon={<ZapIcon className="w-10 h-10 text-yellow-400"/>}
            onClick={() => onGenerate('Boom')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Slots & Fortune' : undefined}
            borderColor="border-yellow-500/50"
            contentTop={
                <DecodingMatrix themeColor="yellow" />
            }
        />
    );
};

export default BoomAiGenerator;
