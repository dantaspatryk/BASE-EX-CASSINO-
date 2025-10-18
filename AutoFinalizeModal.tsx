import React, { useState, useEffect } from 'react';

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

interface AutoFinalizeModalProps {
    gameName: string;
    startTime: number;
    transitionType: 'high_to_low' | 'low_to_high';
}

const FINALIZE_DURATION_S = 20;

const AutoFinalizeModal: React.FC<AutoFinalizeModalProps> = ({ gameName, startTime, transitionType }) => {
    const [countdown, setCountdown] = useState(FINALIZE_DURATION_S);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            const elapsedMs = Date.now() - startTime;
            const remainingS = Math.max(0, FINALIZE_DURATION_S - Math.floor(elapsedMs / 1000));
            const progressPercent = Math.max(0, (1 - (elapsedMs / (FINALIZE_DURATION_S * 1000))) * 100);
            
            setCountdown(remainingS);
            setProgress(progressPercent);
            
            if (remainingS <= 0) {
                clearInterval(timer);
            }
        }, 100); // Update frequently for smooth progress bar

        return () => clearInterval(timer);
    }, [startTime]);

    const isHighToLow = transitionType === 'high_to_low';

    const modalConfig = {
        title: isHighToLow ? 'PROTOCOLO DE SEGURANÇA ATIVADO' : 'PROTOCOLO DE OTIMIZAÇÃO ATIVADO',
        borderColor: isHighToLow ? 'border-red-500/80' : 'border-green-500/80',
        iconBorderColor: isHighToLow ? 'border-red-500/50' : 'border-green-500/50',
        iconBgColor: isHighToLow ? 'bg-red-500/10' : 'bg-green-500/10',
        titleColor: isHighToLow ? 'text-red-300' : 'text-green-300',
        progressColor: isHighToLow ? 'bg-red-600' : 'bg-green-600',
        icon: isHighToLow 
            ? <AlertTriangleIcon className="w-8 h-8 text-red-300" /> 
            : <TrendingUpIcon className="w-8 h-8 text-green-300" />,
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className={`w-full max-w-md mx-auto bg-slate-900/60 p-6 rounded-2xl shadow-2xl border-2 ${modalConfig.borderColor} text-center`}>
                <div className={`mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full ${modalConfig.iconBgColor} border-2 ${modalConfig.iconBorderColor} animate-pulse`}>
                    {modalConfig.icon}
                </div>
                <h2 className={`text-2xl font-bold ${modalConfig.titleColor} mb-3`}>{modalConfig.title}</h2>
                <p className="text-gray-200 mb-6">
                    {isHighToLow
                        ? <>Detectamos uma mudança de fase para <strong className="text-white">BAIXA</strong> no <strong className="text-white">{gameName}</strong>. Para proteger seu resultado, este sinal será finalizado automaticamente.</>
                        : <>Detectamos uma transição para uma fase de <strong className="text-white">ALTA</strong> no <strong className="text-white">{gameName}</strong>. Para otimizar sua estratégia, este sinal será finalizado para que você possa gerar um novo, mais adequado ao novo ciclo.</>
                    }
                </p>
                <div className="space-y-2">
                    <p className="text-white text-lg font-bold">
                        Finalizando em {countdown}s...
                    </p>
                    <div className={`w-full bg-black/40 rounded-full h-2.5 border ${isHighToLow ? 'border-red-500/50' : 'border-green-500/50'}`}>
                        <div 
                            className={`h-2 rounded-full transition-all duration-100 ease-linear ${modalConfig.progressColor}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoFinalizeModal;