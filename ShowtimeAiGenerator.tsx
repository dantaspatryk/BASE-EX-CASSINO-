import React from 'react';
import type { AiProfile } from '../../types';
import AiGeneratorCard from '../../components/AiGeneratorCard';
import DecodingMatrix from '../../components/DecodingMatrix';

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);

interface ShowtimeAiGeneratorProps {
    onGenerate: (aiProfile: AiProfile) => void;
    isLoading: boolean;
    isApplicable: boolean;
}

const ShowtimeAiGenerator: React.FC<ShowtimeAiGeneratorProps> = ({ onGenerate, isLoading, isApplicable }) => {
    return (
        <AiGeneratorCard 
            title="Showtime AI"
            description="Mestre de Game Shows. Cria estratégias para Crazy Time, Monopoly etc., focando em bônus e multiplicadores."
            icon={<StarIcon className="w-10 h-10 text-pink-400"/>}
            onClick={() => onGenerate('Showtime')}
            disabled={isLoading || !isApplicable}
            disabledReason={!isApplicable ? 'Apenas para Game Shows' : undefined}
            borderColor="border-pink-500/50"
            contentTop={
                <DecodingMatrix themeColor="purple" />
            }
        />
    );
};

export default ShowtimeAiGenerator;