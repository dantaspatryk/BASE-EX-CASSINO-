import React from 'react';
import type { CrashResult } from '../types';
import type { AnalysisLog } from '../hooks/useGenericAnalysis';

type ThemeColor = 'purple' | 'amber' | 'sky' | 'teal' | 'blue' | 'yellow';

const THEME_CLASSES: Record<ThemeColor, { border: string; text: string }> = {
    purple: { border: 'border-purple-500/50', text: 'text-purple-300' },
    amber: { border: 'border-amber-500/50', text: 'text-amber-300' },
    sky: { border: 'border-sky-500/50', text: 'text-sky-300' },
    teal: { border: 'border-teal-500/50', text: 'text-teal-300' },
    blue: { border: 'border-blue-500/50', text: 'text-blue-300' },
    yellow: { border: 'border-yellow-500/50', text: 'text-yellow-300' },
};


interface RealTimeHistoryProps {
    analysisType: 'crash' | 'generic';
    themeColor?: ThemeColor;
    history?: CrashResult[];
    analysisLogs?: AnalysisLog[];
    title?: string;
    description?: string;
}

const RealTimeHistory: React.FC<RealTimeHistoryProps> = ({ analysisType, themeColor = 'amber', history, analysisLogs, title, description }) => {
    const theme = THEME_CLASSES[themeColor] || THEME_CLASSES.amber;

    const getMultiplierColor = (multiplier: number) => {
        if (multiplier < 2) return 'text-sky-300';
        if (multiplier < 10) return 'text-green-300';
        return 'text-amber-300';
    };

    const getStatusTag = (status: AnalysisLog['status']) => {
        switch (status) {
            case 'OK': return <span className="font-bold text-green-400">[OK]</span>;
            case 'SYNC': return <span className="font-bold text-blue-400">[SYNC]</span>;
            case 'INFO': return <span className="font-bold text-gray-400">[INFO]</span>;
            case 'DETECT': return <span className="font-bold text-purple-400">[DETECT]</span>;
            case 'WARN': return <span className="font-bold text-yellow-400">[WARN]</span>;
            default: return null;
        }
    };

    const renderCrashHistory = (data: CrashResult[]) => (
        data.map((result, index) => (
            <div key={index} className="flex justify-between items-center text-sm px-2">
                <span className="text-gray-400">{result.timestamp}</span>
                <span className={`font-bold ${getMultiplierColor(result.multiplier)}`}>
                    {result.multiplier.toFixed(2)}x
                </span>
            </div>
        ))
    );

    const renderGenericAnalysis = (data: AnalysisLog[]) => (
        data.map((log) => (
            <div key={log.id} className="flex justify-between items-center text-sm px-2 animate-fade-in-short">
                <div className="flex items-center gap-2 truncate">
                    {getStatusTag(log.status)}
                    <span className="text-gray-300 truncate">{log.message}</span>
                </div>
                <span className="text-gray-500 flex-shrink-0">{log.timestamp}</span>
            </div>
        ))
    );

    return (
        <div className={`bg-slate-900/60 p-4 rounded-2xl border ${theme.border} mb-4 animate-fade-in`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold ${theme.text}`}>{title || 'Análise em Tempo Real'}</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-300">AO VIVO</span>
                </div>
            </div>
            {description && (
                <p className="text-xs text-gray-400 text-left mb-3">{description}</p>
            )}
            <div className="h-24 bg-black/30 rounded-lg p-2 flex flex-col-reverse overflow-hidden">
                <div className="space-y-1">
                    {analysisType === 'crash' 
                        ? renderCrashHistory(history || []) 
                        : renderGenericAnalysis(analysisLogs || [])}
                </div>
            </div>
        </div>
    );
};

export default RealTimeHistory;