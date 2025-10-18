

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ManagedGame, PayoutSettings } from '../types';
import BellIcon from './icons/BellIcon';
import BellOffIcon from './icons/BellOffIcon';

// === ICONS ===
const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);
const TrendingDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
    </svg>
);
const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);
const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const CpuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);

const StarIcon: React.FC<React.SVGProps<SVGSVGElement> & { isFavorite: boolean }> = ({ isFavorite, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24" 
        fill={isFavorite ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const CooldownTimer = ({ endTime }: { endTime: number }) => {
    const [timeLeft, setTimeLeft] = useState(() => Math.max(0, endTime - Date.now()));

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = Math.max(0, endTime - Date.now());
            setTimeLeft(remaining);
            if (remaining === 0) {
                clearInterval(timer);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.round(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-1.5 text-cyan-300">
            <CpuIcon className="w-4 h-4" />
            <span className="text-xs font-bold tabular-nums">{formatTime(timeLeft)}</span>
        </div>
    );
};

interface GameCardProps {
    game: ManagedGame;
    payout?: number;
    onSelect: (gameName: string) => void;
    locked: boolean;
    isChangingSoon?: boolean;
    nextPhase?: 'high' | 'low';
    humanSupportCooldownEnd?: number | null;
    payoutSettings: PayoutSettings;
    generatingGameName: string | null;
    onToggleFavorite: (gameName: string) => void;
    isFavorite: boolean;
    hasActiveSignal?: boolean;
    hasRiskAnalysis?: boolean;
    isAnySignalActive?: boolean;
    isSubscribedToNotifications: boolean;
    onToggleNotificationSubscription: (gameName: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
    game,
    payout,
    onSelect,
    locked,
    isChangingSoon,
    nextPhase,
    humanSupportCooldownEnd,
    payoutSettings,
    generatingGameName,
    onToggleFavorite,
    isFavorite,
    hasActiveSignal,
    hasRiskAnalysis,
    isSubscribedToNotifications,
    onToggleNotificationSubscription,
}) => {
    const isThisGameGenerating = generatingGameName === game.name;
    const isAnotherGameGenerating = generatingGameName !== null && !isThisGameGenerating;
    const isOnCooldown = humanSupportCooldownEnd && humanSupportCooldownEnd > Date.now();
    const isDisabled = locked || !game.isActive || isOnCooldown || isAnotherGameGenerating;
    const isClickable = !isDisabled;

    const highPhaseMin = payoutSettings.highPhaseMin; // 75
    const isLowPayout = payout !== undefined && payout < highPhaseMin;
    const isCautionPayout = payout !== undefined && payout >= highPhaseMin && payout <= 77;
    const isHot = payout !== undefined && payout >= 88;
    
    // Only show the "critical" change warning (pulse + text) when payout is 77% or less.
    // The `isChangingSoon` prop from the hook activates at 77% for the in-signal warning.
    const isCriticalChange = isChangingSoon && payout !== undefined && payout <= 77;

    const getBorderClass = () => {
        if (hasActiveSignal) return 'border-purple-500 ring-2 ring-purple-500/50';
        if (locked || !game.isActive || isOnCooldown) return 'border-gray-700/70';
        if (isThisGameGenerating) return 'border-purple-500 ring-2 ring-purple-500/50 animate-pulse';
        if (hasRiskAnalysis) return 'border-yellow-500';
        if (isCriticalChange) { // This now takes precedence only when critically imminent (77% or less).
            return 'border-yellow-500 animate-pulse';
        }
        if (isLowPayout) return 'border-red-500';
        if (isCautionPayout) return 'border-yellow-500'; // Non-pulsing for 75-77 when not yet critical.
        return 'border-green-500';
    };

    const payoutColorClass = isLowPayout ? 'text-red-400' : isCautionPayout ? 'text-yellow-400' : 'text-green-400';

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(game.name);
    };
    
    const handleToggleSubscription = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleNotificationSubscription(game.name);
    };

    const renderPayoutInfo = () => {
        if (locked) return null;
        if (isThisGameGenerating) {
            return (
                <div className="flex items-center gap-1.5 text-purple-300">
                    <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-purple-300"></div>
                    <span className="text-xs font-bold">Analisando...</span>
                </div>
            );
        }
        if (isOnCooldown) {
            return <CooldownTimer endTime={humanSupportCooldownEnd!} />;
        }
        if (payout === undefined) {
            return <span className="text-sm font-bold text-gray-400">--%</span>;
        }

        let IconComponent = TrendingUpIcon;
        if (isLowPayout) IconComponent = TrendingDownIcon;
        else if (isCautionPayout) IconComponent = AlertTriangleIcon;

        return (
            <div className={`flex items-center gap-1.5 font-bold ${payoutColorClass}`}>
                <IconComponent className="w-4 h-4" />
                <span className="text-xl">{payout}%</span>
            </div>
        );
    };
    
    const handleSelect = useCallback(() => {
        if (isClickable) {
            onSelect(game.name);
        }
    }, [isClickable, onSelect, game.name]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            onSelect(game.name);
        }
    }, [isClickable, onSelect, game.name]);


    return (
        <div
            onClick={handleSelect}
            className={`relative w-full flex items-center bg-slate-900/60 backdrop-blur-lg rounded-2xl shadow-lg border transition-all duration-300 ${isClickable ? 'cursor-pointer transform hover:scale-[1.03] hover:border-purple-400' : 'opacity-50 cursor-not-allowed'} ${getBorderClass()}`}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : -1}
            onKeyDown={handleKeyDown}
            aria-label={`Selecionar jogo ${game.name}`}
        >
            {/* Main content part */}
            <div className="flex flex-grow items-center p-4 text-left min-w-0">
                {/* Cast game.icon to `any` to resolve type inference issues with React.cloneElement,
which occurs due to the union of multiple icon component types. This allows safely
adding a className and accessing the existing one. */}
                {React.cloneElement(game.icon as any, { className: `w-12 h-12 flex-shrink-0 ${(game.icon as any).props.className || ''}`.trim() })}
                <div className="flex-1 min-w-0 mx-4">
                    {hasActiveSignal && (
                        <div className="text-xs font-bold text-black bg-purple-400 px-2 py-0.5 rounded-full shadow-lg shadow-purple-500/30 mb-1 inline-block animate-pulse">SINAL ATIVO</div>
                    )}
                    <h3 className="text-lg font-bold text-white truncate">{game.name}</h3>
                    {!game.isActive ? <p className="text-xs text-red-400 font-semibold">Indisponível</p> :
                    isCriticalChange && !isDisabled ? (
                        <>
                            {nextPhase === 'high' && <p className="text-xs text-green-300 font-semibold">Oportunidade Iminente!</p>}
                            {nextPhase === 'low' && <p className="text-xs text-red-300 font-semibold">Risco Aumentando!</p>}
                        </>
                    ) : (
                        <p className="text-xs text-gray-400">{game.category}</p>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center">
                        {isHot && (
                            <div className="text-xs font-bold text-yellow-300 bg-green-600 px-2 py-0.5 rounded-full shadow-lg shadow-green-500/30 mb-1">HOT</div>
                        )}
                        {renderPayoutInfo()}
                    </div>
                    {locked && <LockIcon className="w-6 h-6 text-gray-400" />}
                </div>
            </div>

            {/* Divider */}
            <div className="self-stretch w-px bg-purple-500/30"></div>

            {/* Actions */}
            <div className="flex flex-col justify-center items-center gap-2 px-3">
                <button
                    onClick={handleToggleFavorite}
                    disabled={isDisabled}
                    className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none rounded-full"
                    aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    <StarIcon isFavorite={isFavorite} className="w-6 h-6" />
                </button>
                <button
                    onClick={handleToggleSubscription}
                    disabled={isDisabled}
                    className={`p-1 transition-colors disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none rounded-full ${isSubscribedToNotifications ? 'text-teal-400 hover:text-teal-300' : 'text-gray-500 hover:text-gray-300'}`}
                    aria-label={isSubscribedToNotifications ? "Desativar notificações" : "Ativar notificações"}
                >
                    {isSubscribedToNotifications ? <BellIcon className="w-6 h-6"/> : <BellOffIcon className="w-6 h-6"/>}
                </button>
            </div>
            
        </div>
    );
};

export default React.memo(GameCard);
