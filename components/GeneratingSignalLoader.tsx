import React, { useState, useEffect } from 'react';

const AnalysisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="analysis-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g>
      {/* Outer pulsing ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.5">
         <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Data stream ring */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="2 10" className="animate-spin-slow" />

      {/* Inner scanning ring */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="80 110" strokeLinecap="round" className="animate-spin-reverse-medium" />
      
      {/* Central Core with the app's spark icon */}
      <g transform="translate(50, 50) scale(0.25)">
        <polygon
          points="0,-20 5,-5 20,0 5,5 0,20 -5,5 -20,0 -5,-5"
          fill="#a78bfa"
          filter="url(#analysis-glow)"
          className="animate-pulse"
        />
      </g>
    </g>
  </svg>
);


const LOADING_MESSAGES = [
    "Analisando o comportamento do algoritmo...",
    "Cruzando dados da comunidade de jogadores...",
    "Verificando padrões de volatilidade...",
    "Modelando cenários de resultado...",
    "Calibrando o perfil de risco ideal...",
    "Construindo estratégia de execução...",
    "Verificando a base de dados...",
];

interface GeneratingSignalLoaderProps {
  gameName: string;
  duration: number;
}

const GeneratingSignalLoader: React.FC<GeneratingSignalLoaderProps> = ({ gameName, duration }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);

  useEffect(() => {
    setMessageIndex(0);
    setIsFinalizing(false);
    if (duration <= 0) return;
    
    const intervalTime = duration / LOADING_MESSAGES.length;

    const messageTimer = setInterval(() => {
      setMessageIndex(prevIndex => Math.min(prevIndex + 1, LOADING_MESSAGES.length - 1));
    }, intervalTime);
    
    const finalizingTimer = setTimeout(() => {
        setIsFinalizing(true);
        clearInterval(messageTimer);
    }, duration);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(finalizingTimer);
    };
  }, [gameName, duration]);

  const currentMessage = LOADING_MESSAGES[messageIndex];
  
  const Title = () => {
      if (isFinalizing) {
          return (
             <h2 className="text-2xl font-bold text-white transition-opacity duration-300 min-h-[3rem] flex items-center justify-center animate-pulse">
                Finalizando Análise...
            </h2>
          );
      }
      return (
        <h2 className="text-2xl font-bold text-white transition-opacity duration-300 min-h-[3rem] flex items-center justify-center text-center">
            {currentMessage}
        </h2>
      );
  }

  return (
    <div className="fixed inset-0 bg-brand-dark backdrop-blur-md flex flex-col items-center justify-center z-50 p-4 animate-fade-in text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-green-900/20"></div>

        <div className="relative w-40 h-40 mb-8">
            <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
            <AnalysisIcon className="relative w-full h-full" />
        </div>

        <div className="w-full max-w-lg mx-auto">
            <Title />
            <p className="text-xl font-bold text-green-400 mb-8">{gameName}</p>
            
            <div className="w-full bg-black/30 rounded-full h-4 border-2 border-purple-500/50 overflow-hidden mt-4 relative p-1">
                <div 
                    className="bg-gradient-to-r from-purple-500 to-green-400 h-full rounded-full transition-transform duration-300 ease-linear"
                    style={{
                        animation: `fill-progress ${duration}ms linear forwards`,
                        transformOrigin: 'left'
                    }}
                />
            </div>
            <p className="text-xs text-purple-300 mt-2">Nossa IA está trabalhando para você...</p>
        </div>
    </div>
  );
};

export default GeneratingSignalLoader;
