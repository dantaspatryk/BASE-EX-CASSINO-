import React, { useState, useEffect } from 'react';

// Icons
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const TrendingDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
    </svg>
);

interface ChangingPhaseInterstitialProps {
    gameName: string;
    nextPhase: 'high' | 'low';
    durationMinutes: number;
    endTime: number;
    onFinish: () => void;
}

const ChangingPhaseInterstitial: React.FC<ChangingPhaseInterstitialProps> = ({ gameName, nextPhase, endTime, onFinish }) => {
    // Initialize state directly from props to avoid flicker and ensure persistence
    const [secondsLeft, setSecondsLeft] = useState(() => Math.max(0, Math.round((endTime - Date.now()) / 1000)));

    useEffect(() => {
        const calculateRemaining = () => Math.max(0, Math.round((endTime - Date.now()) / 1000));
        
        // Ensure the initial value is up-to-date on mount
        setSecondsLeft(calculateRemaining());

        const intervalId = setInterval(() => {
            const remainingSeconds = calculateRemaining();
            setSecondsLeft(remainingSeconds);

            if (remainingSeconds <= 0) {
                clearInterval(intervalId);
                onFinish();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endTime, onFinish]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const isHighPhase = nextPhase === 'high';

    const theme = {
        borderColor: isHighPhase ? 'border-green-500/80' : 'border-red-500/80',
        textColor: isHighPhase ? 'text-green-300' : 'text-red-300',
        icon: isHighPhase 
            ? <TrendingUpIcon className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse" /> 
            : <TrendingDownIcon className="w-20 h-20 text-red-400 mx-auto mb-4 animate-pulse" />,
        title: isHighPhase ? 'OTIMIZANDO OPORTUNIDADE' : 'BAIXA PROBABILIDADE CHEGANDO',
        textShadow: isHighPhase 
            ? '0 2px 10px rgba(74, 222, 128, 0.4)' 
            : '0 2px 10px rgba(248, 113, 113, 0.4)',
        message: isHighPhase 
            ? `Nossos analistas estão calibrando os algoritmos para o novo ciclo de alta probabilidade do ${gameName}. Aguarde para receber um sinal com precisão máxima.`
            : `Detectamos uma possível mudança para um ciclo de baixa no ${gameName}. Nossa equipe está realizando uma análise aprofundada para confirmar e proteger sua jogada.`
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className={`w-full max-w-md mx-auto bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border-2 ${theme.borderColor} text-center`}>
                {theme.icon}
                <h3 className="text-4xl font-black text-white uppercase tracking-wider mb-4" style={{ textShadow: theme.textShadow }}>
                    {theme.title}
                </h3>
                <p className="text-gray-200 text-base mb-8">{theme.message}</p>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <ClockIcon className="w-8 h-8 text-white" />
                        <p className="text-5xl font-bold text-white tabular-nums">{formatTime(secondsLeft)}</p>
                    </div>
                    <p className={`font-semibold ${theme.textColor}`}>Análise em andamento...</p>
                </div>

                <button
                    onClick={onFinish}
                    className="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default ChangingPhaseInterstitial;
