import { useState, useEffect, useRef } from 'react';

// Log line for the generic analysis type
export type AnalysisLog = {
    id: string; // Unique identifier for each log entry
    status: 'OK' | 'SYNC' | 'INFO' | 'DETECT' | 'WARN';
    message: string;
    timestamp: string;
};

const GENERIC_LOGS = [
    { status: 'OK', message: 'Índice de Volatilidade Estável' },
    { status: 'SYNC', message: 'Algoritmo de Payout Alinhado' },
    { status: 'INFO', message: 'Fluxo de Dados Nominal' },
    { status: 'DETECT', message: 'Anomalia de Padrão Detectada' },
    { status: 'OK', message: 'Dados da Comunidade Verificados' },
    { status: 'SYNC', message: 'Dados Históricos Analisados' },
    { status: 'WARN', message: 'Flutuação de Payout Identificada' },
    { status: 'INFO', message: 'Conectando ao Servidor do Jogo...' },
] as const;

const generateLogId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const generateInitialLogs = (): AnalysisLog[] => {
    const logs: AnalysisLog[] = [];
    for (let i = 0; i < 5; i++) {
        const randomLog = GENERIC_LOGS[Math.floor(Math.random() * GENERIC_LOGS.length)];
        // Add to the start, so the newest is at the top of the array (index 0)
        logs.unshift({
            id: generateLogId(),
            ...randomLog, 
            // Simulate past timestamps
            timestamp: new Date(Date.now() - (4 - i) * 1800).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second:'2-digit' }) 
        });
    }
    return logs;
};

export const useGenericAnalysis = (isActive: boolean) => {
    // Lazy initialization to populate state on first render without flicker
    const [analysisLogs, setAnalysisLogs] = useState<AnalysisLog[]>(() => {
        return isActive ? generateInitialLogs() : [];
    });
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (isActive) {
            // This ensures that if the component was inactive and becomes active, it gets populated.
            if (analysisLogs.length === 0) {
                setAnalysisLogs(generateInitialLogs());
            }

            // Faster interval for a more "live" feel
            const updateInterval = 1800; 

            intervalRef.current = window.setInterval(() => {
                const randomLog = GENERIC_LOGS[Math.floor(Math.random() * GENERIC_LOGS.length)];
                const newLog: AnalysisLog = { 
                    id: generateLogId(),
                    ...randomLog, 
                    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second:'2-digit' }) 
                };

                setAnalysisLogs(prevLogs => {
                    const newLogs = [newLog, ...prevLogs];
                    // Keep the list from growing indefinitely
                    return newLogs.slice(0, 50);
                });
            }, updateInterval);
        } else {
            setAnalysisLogs([]);
        }

        // Cleanup function for when the component unmounts or isActive changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive]); // This effect depends only on the active state

    return { analysisLogs };
};
