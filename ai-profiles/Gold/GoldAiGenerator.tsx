import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';

const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M12 22 6 9l-4-6h12l4 6-10 13Z"></path></svg>);

interface GoldAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
}

const GoldAiGenerator: React.FC<GoldAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable }) => {
    return (
        <AiGeneratorCard 
            title="Gold AI"
            description="Especialista em jogos 'Fortune'. Cria estratégias focadas em re-spins e acumulação de bônus."
            icon={<GemIcon className="w-10 h-10 text-yellow-300"/>}
            onClick={() => onGenerate('Gold')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Fortune' : undefined}
            borderColor="border-yellow-500/50"
            contentTop={
                <DecodingMatrix themeColor="yellow" />
            }
        />
    );
};

export default GoldAiGenerator;
