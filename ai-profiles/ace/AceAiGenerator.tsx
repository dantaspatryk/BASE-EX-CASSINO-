import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import ClubIcon from '../../components/icons/ClubIcon';

interface AceAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
}

const AceAiGenerator: React.FC<AceAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable }) => {
    return (
        <AiGeneratorCard 
            title="Ace AI"
            description="Estrategista de Cartas. Adapta táticas profissionais para Blackjack, Bacará e outros jogos de mesa."
            icon={<ClubIcon className="w-10 h-10 text-teal-300"/>}
            onClick={() => onGenerate('Ace')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Indisponível para este jogo' : undefined}
            borderColor="border-teal-500/50"
        />
    );
};

export default AceAiGenerator;
