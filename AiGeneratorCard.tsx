import React from 'react';

const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

interface AiGeneratorCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    disabledReason?: string;
    borderColor?: string;
    contentTop?: React.ReactNode;
    contentBottom?: React.ReactNode;
    buttonText?: string;
}

const AiGeneratorCard: React.FC<AiGeneratorCardProps> = ({ 
    title, 
    description, 
    icon, 
    onClick, 
    disabled = false, 
    disabledReason, 
    borderColor = 'border-purple-500/50', 
    contentTop,
    contentBottom,
    buttonText = "Gerar Sinal" 
}) => {
    return (
        <div className={`relative bg-slate-900/60 p-4 rounded-2xl shadow-lg border ${borderColor} ${disabled ? 'opacity-60' : ''} transition-opacity`}>
            {contentTop}
            
            <div className={`flex items-center gap-4 ${contentTop ? 'mt-4' : ''}`}>
                <div className="flex-shrink-0">{icon}</div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-gray-300">{description}</p>
                </div>
            </div>

            {contentBottom && <div className="mt-4">{contentBottom}</div>}

            <button
                onClick={onClick}
                disabled={disabled}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-4 rounded-lg text-md shadow-lg shadow-green-500/30 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none"
            >
                {disabledReason ? 'Indisponível' : buttonText}
            </button>

            {disabledReason && (
                 <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-yellow-300 text-xs font-bold py-1 px-3 rounded-full border border-yellow-500/50 flex items-center gap-1.5">
                     <LockIcon className="w-3 h-3"/>
                     <span>{disabledReason}</span>
                 </div>
            )}
        </div>
    );
};

export default AiGeneratorCard;