import React, { useMemo } from 'react';

type ThemeColor = 'purple' | 'amber' | 'sky' | 'teal' | 'blue' | 'yellow';

const THEME_STYLES: Record<ThemeColor, { light: string; dark: string; border: string; text: string; }> = {
    purple: { light: '#a78bfa', dark: '#5b21b6', border: 'border-purple-500/50', text: 'text-purple-300' },
    amber:  { light: '#facc15', dark: '#b45309', border: 'border-amber-500/50', text: 'text-amber-300' },
    sky:    { light: '#7dd3fc', dark: '#0369a1', border: 'border-sky-500/50', text: 'text-sky-300' },
    teal:   { light: '#5eead4', dark: '#134e4a', border: 'border-teal-500/50', text: 'text-teal-300' },
    blue:   { light: '#93c5fd', dark: '#1e40af', border: 'border-blue-500/50', text: 'text-blue-300' },
    yellow: { light: '#fde047', dark: '#ca8a04', border: 'border-yellow-500/50', text: 'text-yellow-300' },
};

const CELL_COUNT = 60; // 12 columns x 5 rows

const DecodingMatrix: React.FC<{ themeColor?: ThemeColor }> = ({ themeColor = 'purple' }) => {
    const theme = THEME_STYLES[themeColor] || THEME_STYLES.purple;

    const cells = useMemo(() => {
        return Array.from({ length: CELL_COUNT }).map((_, i) => ({
            key: i,
            // Random animation delay for each cell to create a dynamic, non-uniform effect
            delay: `${Math.random() * 4}s`,
        }));
    }, []);

    return (
        <div className={`bg-slate-900/60 p-4 rounded-2xl border ${theme.border} mb-4 animate-fade-in`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold ${theme.text}`}>Decodificando Algoritmo...</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-300">AO VIVO</span>
                </div>
            </div>
            <div 
                className="h-24 bg-black/30 rounded-lg p-2 grid grid-cols-12 gap-1.5"
                style={{
                    '--cell-color-light': theme.light,
                    '--cell-color-dark': theme.dark,
                } as React.CSSProperties}
            >
                {cells.map(cell => (
                    <div
                        key={cell.key}
                        className="matrix-cell rounded-[2px]"
                        style={{ animationDelay: cell.delay }}
                    />
                ))}
            </div>
        </div>
    );
};

export default DecodingMatrix;
