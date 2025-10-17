import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';
import type { AnalysisLog } from '../../hooks/useGenericAnalysis';

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);

interface BlueAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
    analysisLogs: AnalysisLog[];
}

const BlueAiGenerator: React.FC<BlueAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable, analysisLogs }) => {
    return (
        <AiGeneratorCard 
            title="Blue AI"
            description="Especialista em Banca Baixa (R$50-R$100). Cria estratégias ultra-seguras para crescimento gradual."
            icon={<ShieldIcon className="w-10 h-10 text-blue-400"/>}
            onClick={() => onGenerate('Blue')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Slots & Fortune' : undefined}
            borderColor="border-blue-500/50"
            contentTop={
                <DecodingMatrix themeColor="blue" />
            }
        />
    );
};

export default BlueAiGenerator;