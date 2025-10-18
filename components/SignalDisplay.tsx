import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { GeneratedSignal, PayoutState, SlotSignal, CrashSignal, LiveSignal, CrashResult, StrategyProfile, MatrixSignal, ActiveSignal } from '../types';
import CopyIcon from './icons/CopyIcon';
import TelegramIcon from './icons/TelegramIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import LossConfirmationModal from './LossConfirmationModal';
import { useRealTimeHistory } from '../hooks/useRealTimeHistory';
import RealTimeHistory from './RealTimeHistory';
import DecodingMatrix from './DecodingMatrix';
import CompassIcon from './icons/CompassIcon';
import AutoFinalizeModal from './AutoFinalizeModal';
import { getSignalTimeDetails } from '../services/signalSecurityService';


// Icons
const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);
const RefreshCwIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>);
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>);
const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.23 5.77 3.22 7.78a5.5 5.5 0 0 0 7.56 0A7.07 7.07 0 0 0 19 9a7 7 0 0 0-7-7z" /></svg>);
const StrategyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M17 17l-2.086-2.086A6 6 0 0 0 17 9h-2"/><path d="m15.536 7.464 2.121-2.121"/><path d="m20.243 9 1.414-1.414"/><path d="M2 12h3"/><path d="M7 12H4"/><path d="M12 2v3"/><path d="M12 7V4"/><path d="M4.929 4.929 7.05 7.05"/><path d="M16.95 16.95 19.07 19.07"/><path d="m7.05 16.95 2.121-2.121"/><path d="M19.071 4.929 16.95 7.05"/></svg>);
const MoneyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12m-3-8h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6"/></svg>);
const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const TargetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12"cy="12" r="2"/></svg>);
const CalculatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><line x1="12" y1="14" x2="12" y2="18"></line><line x1="8" y1="14" x2="8" y2="18"></line><line x1="8" y1="10" x2="16" y2="10"></line></svg>);
const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const TrendingUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>);
const LayersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const FootprintsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 16.85V18a2 2 0 0 0 2 2h1.15a3 3 0 0 0 2.8-2l1.6-2.4a3 3 0 0 1 2.9-2h.3a3 3 0 0 1 2.9 2l1.6 2.4a3 3 0 0 0 2.8 2H20a2 2 0 0 0 2-2v-1.15a3 3 0 0 0-1.6-2.8l-1.6-1.2a3 3 0 0 1-1.2-2.8V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2.85a3 3 0 0 1-1.2 2.8l-1.6 1.2A3 3 0 0 0 4 16.85z"></path></svg>);


// Animated Check Icon Component
const AnimatedCheckIcon: React.FC = () => (
    <div className="w-20 h-20 mx-auto">
        <svg viewBox="0 0 52 52" className="checkmark">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <style>{`
            .checkmark {
                width: 100%; height: 100%; border-radius: 50%; display: block; stroke-width: 3;
                stroke: #fff; stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #4ade80;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
                stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 3;
                stroke-miterlimit: 10; stroke: #4ade80; fill: none;
                animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
                transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48;
                animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
            }
            @keyframes stroke { 100% { stroke-dashoffset: 0; } }
            @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
            @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 30px #4ade80; } }
        `}</style>
    </div>
);


// Type Guards
const isSlotSignal = (signal: GeneratedSignal): signal is SlotSignal => signal.signalType === 'slot';
const isCrashSignal = (signal: GeneratedSignal): signal is CrashSignal => signal.signalType === 'crash';
const isLiveSignal = (signal: GeneratedSignal): signal is LiveSignal => signal.signalType === 'live';
const isMatrixSignal = (signal: GeneratedSignal): signal is MatrixSignal => signal.signalType === 'matrix';

const OperatingModeGuide: React.FC<{ text: string }> = ({ text }) => (
    <div className="bg-slate-900/60 p-4 rounded-2xl border border-sky-500/50">
        <h3 className="font-bold text-sky-300 mb-2 flex items-center gap-2">
            <CompassIcon className="w-5 h-5"/> Modo de Operação
        </h3>
        <p className="text-gray-300 text-sm bg-black/30 p-3 rounded-lg">{text}</p>
    </div>
);

// === UI COMPONENTS FOR EACH SIGNAL TYPE ===

const SlotSignalView: React.FC<{ signal: SlotSignal }> = ({ signal }) => {
    // Bankroll management details
    const bankrollDetails = useMemo(() => {
        if (signal.aiProfile === 'Black') {
            return {
                title: "Gestão de Banca (R$100 - R$500)",
                borderColor: "border-purple-500/50",
                textColor: "text-purple-300"
            };
        }
        if (signal.aiProfile === 'Blue') {
            return {
                title: "Gestão de Banca (R$50 - R$100)",
                borderColor: "border-blue-500/50",
                textColor: "text-blue-300"
            };
        }
        if (signal.aiProfile === 'Boom') {
            return {
                title: "Gestão de Banca (R$650 - R$950)",
                borderColor: "border-yellow-500/50",
                textColor: "text-yellow-300"
            };
        }
        return null; // Don't show for other AIs
    }, [signal.aiProfile]);

    // Total cost calculation
    const totalCost = useMemo(() => {
        if (typeof signal.betValueInBRL !== 'number' || !signal.attempts) {
            return null;
        }
        const totalRounds = signal.attempts.reduce((sum, attempt) => sum + attempt.rounds, 0);
        return totalRounds * signal.betValueInBRL;
    }, [signal.betValueInBRL, signal.attempts]);

    return (
    <>
        <DecodingMatrix themeColor="purple" />
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-purple-500/50">
            <h3 className="font-bold text-purple-300 mb-2">🎯 Horário Pagante</h3>
            <div className="bg-black/30 p-3 rounded-lg text-center">
                <p className="text-3xl font-bold text-white tracking-widest">{signal.payingTimeSuggestion}</p>
            </div>
        </div>
        
        {/* Bankroll Management Card (now dynamic) */}
        {bankrollDetails && typeof signal.betValueInBRL === 'number' && (
             <div className={`bg-slate-900/60 p-4 rounded-2xl border ${bankrollDetails.borderColor}`}>
                <h3 className={`font-bold ${bankrollDetails.textColor} mb-2 flex items-center gap-2`}>
                    <MoneyIcon className="w-5 h-5"/> {bankrollDetails.title}
                </h3>
                <div className="bg-black/30 p-3 rounded-lg text-center">
                     <p className="text-gray-300 text-sm">Aposta Sugerida por Rodada</p>
                     <p className="text-3xl font-bold text-white">
                         R$ {signal.betValueInBRL.toFixed(2).replace('.', ',')}
                     </p>
                </div>
            </div>
        )}

        {/* Bet Flexibility Info Card */}
        {bankrollDetails && typeof signal.betValueInBRL === 'number' && (
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-sky-500/50 text-left animate-fade-in-short">
                <h3 className="font-bold text-sky-300 mb-2 flex items-center gap-2">
                    <LightbulbIcon className="w-5 h-5"/> Flexibilidade na Aposta
                </h3>
                <p className="text-gray-300 text-sm">
                    Sinta-se à vontade para ajustar o valor da aposta de acordo com sua própria gestão de banca, caso não se sinta confortável com o valor sugerido pela IA.
                </p>
            </div>
        )}

        {/* Total Cost Card (New) */}
        {totalCost !== null && (
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
                <h3 className="font-bold text-green-300 mb-2 flex items-center gap-2">
                    <CalculatorIcon className="w-5 h-5"/> Custo Total da Estratégia
                </h3>
                <div className="bg-black/30 p-3 rounded-lg text-center">
                     <p className="text-gray-300 text-sm">Valor total se seguir todas as entradas</p>
                     <p className="text-3xl font-bold text-white">
                         R$ {totalCost.toFixed(2).replace('.', ',')}
                     </p>
                </div>
            </div>
        )}

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-purple-500/50">
            <h3 className="font-bold text-purple-300 mb-2">♟️ Sequência de Entrada</h3>
            <div className="space-y-2">
                {signal.attempts.map((attempt, index) => (
                     <div key={index} className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                        <p className="text-white font-semibold">Entrada {index + 1}: <span className="font-bold text-green-300">{attempt.rounds}x Rodadas {attempt.type}</span></p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-purple-500/50">
            <h3 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                <LightbulbIcon className="w-5 h-5"/> Dicas da Estratégia
            </h3>
            <p className="text-gray-300 text-sm">{signal.strategyTips}</p>
        </div>
         <div className="bg-slate-900/60 p-4 rounded-2xl border border-purple-500/50">
            <h3 className="font-bold text-purple-300 mb-2 flex items-center gap-2">
                <StrategyIcon className="w-5 h-5"/> Execução da Estratégia
            </h3>
            <p className="text-gray-300 text-sm">{signal.executionStrategy}</p>
        </div>
    </>
    );
};

const CrashSignalView: React.FC<{ signal: CrashSignal; history: CrashResult[] }> = ({ signal, history }) => {
    const getMultiplierColor = (type: 'safe' | 'medium' | 'high') => {
        if (type === 'safe') return 'text-green-400';
        if (type === 'medium') return 'text-yellow-400';
        return 'text-red-500';
    };
    return (
    <>
        <RealTimeHistory 
            analysisType="crash"
            themeColor="amber"
            history={history}
            title="Análise da IA em Tempo Real"
            description="Este é o fluxo de dados que nossa inteligência decodifica para criar sua estratégia."
        />
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-amber-500/50 text-center">
            <h3 className="font-bold text-amber-300 mb-1 text-2xl">🔥 {signal.strategyName}</h3>
            <p className="text-gray-300">{signal.payingTimeSuggestion}</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-amber-500/50">
            <h3 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                 <LightbulbIcon className="w-5 h-5"/> Padrão de Entrada
            </h3>
            <p className="text-gray-300 bg-black/30 p-3 rounded-lg">{signal.entryPattern}</p>
        </div>
        
        {signal.operatingMode && <OperatingModeGuide text={signal.operatingMode} />}
        
        {signal.executionStrategy && (
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-amber-500/50">
                <h3 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                    <StrategyIcon className="w-5 h-5"/> Execução da Estratégia
                </h3>
                <p className="text-gray-300 text-sm">{signal.executionStrategy}</p>
            </div>
        )}

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-amber-500/50">
            <h3 className="font-bold text-amber-300 mb-2">🎯 Metas de Saída (Auto Cashout)</h3>
            <div className="space-y-2">
                {signal.exitPoints.map((exit, index) => (
                    <div key={index} className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                        <p className={`text-white font-semibold capitalize`}>{exit.type}</p>
                        <p className={`font-bold text-lg ${getMultiplierColor(exit.type)}`}>
                            {exit.multipliers.map(m => m.toFixed(2)).join('x / ')}x
                        </p>
                    </div>
                ))}
            </div>
        </div>
         <div className="bg-slate-900/60 p-4 rounded-2xl border border-red-500/50">
            <h3 className="font-bold text-red-300 mb-2">⚠️ Stop Loss</h3>
            <p className="text-gray-300 text-center">Parar após <b className="text-white">{signal.maxLossStreak}</b> perdas consecutivas.</p>
        </div>
    </>
    );
};

const LiveSignalView: React.FC<{ signal: LiveSignal; currentPayout?: number; }> = ({ signal, currentPayout }) => {
    const getRiskProfileColor = (profile: string) => {
        if (!profile) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        switch (profile.toLowerCase()) {
            case 'baixo': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'moderado': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'alto': return 'bg-red-500/20 text-red-300 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const mainPlanSteps = useMemo(() => 
        signal.bettingPlan.filter(p => 
            !p.condition.toLowerCase().includes('perda') && 
            !p.instruction.toLowerCase().includes('pare')
        ), [signal.bettingPlan]);

    const recoverySteps = useMemo(() => 
        signal.bettingPlan.filter(p => 
            p.condition.toLowerCase().includes('perda')
        ), [signal.bettingPlan]);

    const stopLossSteps = useMemo(() =>
        signal.bettingPlan.filter(p => 
            p.instruction.toLowerCase().includes('pare')
        ), [signal.bettingPlan]);

    const isHighModerate = currentPayout && currentPayout >= 85 && currentPayout <= 87;

    return (
        <>
            <DecodingMatrix themeColor="sky" />
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-sky-500/50 text-center">
                <h3 className="font-bold text-sky-300 mb-2 text-2xl">🚀 {signal.strategyName}</h3>
                <div className="flex justify-center items-center gap-4">
                    <p className="text-gray-300">{signal.payingTimeSuggestion}</p>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getRiskProfileColor(signal.riskProfile)}`}>
                        {isHighModerate && signal.riskProfile.toLowerCase() === 'moderado' ? 'Probabilidade Moderada' : `Risco ${signal.riskProfile}`}
                    </span>
                </div>
            </div>

            {signal.operatingMode && <OperatingModeGuide text={signal.operatingMode} />}

            {signal.executionStrategy && (
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-sky-500/50">
                    <h3 className="font-bold text-sky-300 mb-2 flex items-center gap-2">
                        <StrategyIcon className="w-5 h-5"/> Execução da Estratégia
                    </h3>
                    <p className="text-gray-300 text-sm">{signal.executionStrategy}</p>
                </div>
            )}
            
            {/* Main Plan Box */}
            {mainPlanSteps.length > 0 && (
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-sky-500/50">
                    <h3 className="font-bold text-sky-300 mb-3 flex items-center gap-2 text-lg">
                        <StrategyIcon className="w-6 h-6" />
                        Plano de Aposta Tático ({signal.gameType})
                    </h3>
                    <div className="space-y-4">
                        {mainPlanSteps.map((plan, i) => (
                            <div key={`main-${i}`} className="bg-black/30 p-4 rounded-xl border border-slate-700/80 flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-black font-black text-lg mt-1">
                                    {plan.step}
                                </span>
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <p className="text-lg font-bold text-white leading-tight">{plan.instruction}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sky-300 bg-sky-900/50 px-3 py-1 rounded-full w-fit">
                                            <TrendingUpIcon className="w-4 h-4" />
                                            <p className="text-xs font-bold uppercase tracking-wider">
                                                Condição: <span className="text-white font-semibold normal-case">{plan.condition}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-700">
                                        <p className="text-sm font-semibold text-sky-300 mb-1">Lógica da IA</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{plan.objective}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recovery Plan Box */}
            {recoverySteps.length > 0 && (
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-amber-500/50">
                    <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2 text-lg">
                        <RefreshCwIcon className="w-6 h-6" />
                        Plano de Recuperação (Martingale)
                    </h3>
                    <div className="space-y-4">
                        {recoverySteps.map((plan, i) => (
                            <div key={`recovery-${i}`} className="bg-black/30 p-4 rounded-xl border border-slate-700/80 flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-black font-black text-lg mt-1">
                                    {plan.step}
                                </span>
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <p className="text-lg font-bold text-white leading-tight">{plan.instruction}</p>
                                        <div className="flex items-center gap-2 mt-2 text-amber-300 bg-amber-900/50 px-3 py-1 rounded-full w-fit">
                                            <AlertTriangleIcon className="w-4 h-4" />
                                            <p className="text-xs font-bold uppercase tracking-wider">
                                                Condição: <span className="text-white font-semibold normal-case">{plan.condition}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-700">
                                        <p className="text-sm font-semibold text-amber-300 mb-1">Lógica da IA</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{plan.objective}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Session Goal & Stop Loss Box */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-red-500/50">
                <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2 text-lg">
                    <TargetIcon className="w-6 h-6" />
                    Objetivo e Stop Loss da Sessão
                </h3>
                {stopLossSteps.length > 0 && stopLossSteps.map((plan, i) => (
                    <div key={`stop-${i}`} className="mb-3 bg-black/30 p-3 rounded-lg text-sm border border-red-900">
                        <p className="font-bold text-white mb-1">{plan.instruction}</p>
                        <p className="text-gray-300"><span className="font-semibold text-red-300">Condição:</span> {plan.condition}</p>
                    </div>
                ))}
                <p className="text-gray-300 bg-black/30 p-3 rounded-lg text-sm">{signal.sessionGoal}</p>
            </div>
        </>
    );
};

const MatrixSignalView: React.FC<{ signal: MatrixSignal }> = ({ signal }) => {
    const renderMultipliers = (multipliers: number[], color: string) => (
        <p className={`font-bold text-lg ${color}`}>
            {multipliers.map(m => m.toFixed(2)).join('x / ')}x
        </p>
    );
    
    const isShootingGame = signal.targetCount && signal.shootingStyle;

    const getTitleEmoji = () => {
        if (isShootingGame) return '⚽';
        if (signal.riskLevel.toLowerCase().includes('mines')) return '💣';
        return '🧩';
    };

    return (
    <>
        <DecodingMatrix themeColor="teal" />
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50 text-center">
            <h3 className="font-bold text-green-300 mb-1 text-2xl">{getTitleEmoji()} {signal.strategyName}</h3>
            <p className="text-gray-300">{signal.payingTimeSuggestion}</p>
        </div>

        {isShootingGame ? (
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
                <h3 className="font-bold text-green-300 mb-3 text-center text-lg">🎯 Plano de Ataque: {signal.riskLevel}</h3>
                <div className="space-y-3">
                    <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center text-center">
                        <div className='flex-1'>
                             <p className="text-sm text-gray-400">Alvos no Gol</p>
                             <p className="text-2xl font-bold text-white">{signal.targetCount}</p>
                        </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg">
                         <p className="text-sm text-gray-400 text-center mb-1">Estilo de Chute</p>
                         <p className="text-white text-center font-semibold">{signal.shootingStyle}</p>
                    </div>
                </div>
            </div>
        ) : (
             <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
                <h3 className="font-bold text-green-300 mb-2 flex items-center gap-2">
                     <ShieldIcon className="w-5 h-5"/> Nível de Risco
                </h3>
                <p className="text-gray-300 bg-black/30 p-3 rounded-lg">{signal.riskLevel}</p>
            </div>
        )}
        
        {signal.operatingMode && <OperatingModeGuide text={signal.operatingMode} />}

        {signal.executionStrategy && (
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
                <h3 className="font-bold text-green-300 mb-2 flex items-center gap-2">
                    <StrategyIcon className="w-5 h-5"/> Execução da Estratégia
                </h3>
                <p className="text-gray-300 text-sm">{signal.executionStrategy}</p>
            </div>
        )}
        
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
            <h3 className="font-bold text-green-300 mb-2 flex items-center gap-2">
                 <LayersIcon className="w-5 h-5"/> Padrão de Aposta
            </h3>
            <p className="text-gray-300 bg-black/30 p-3 rounded-lg">{signal.bettingPattern}</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-green-500/50">
            <h3 className="font-bold text-green-300 mb-2 flex items-center gap-2">
                 <TargetIcon className="w-5 h-5"/> Metas de Saída (Cashout)
            </h3>
            <div className="space-y-2">
                <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                    <p className="text-white font-semibold">Safe</p>
                    {renderMultipliers(signal.cashoutStrategy.safe, 'text-green-400')}
                </div>
                <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                    <p className="text-white font-semibold">Medium</p>
                    {renderMultipliers(signal.cashoutStrategy.medium, 'text-yellow-400')}
                </div>
                <div className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                    <p className="text-white font-semibold">High</p>
                    {renderMultipliers(signal.cashoutStrategy.high, 'text-red-500')}
                </div>
            </div>
        </div>
    </>
    );
};


// === MAIN DISPLAY COMPONENT ===

interface SignalDisplayProps {
  signal: GeneratedSignal;
  gameName: string;
  generatedAt: number;
  payoutState: PayoutState;
  currentPayout?: number;
  onBackToSelection: () => void;
  onInvalidateSignal: (timestamp: number, reason: 'user_cancellation' | 'profit_finalize' | 'phase_change') => void;
  onConfirmProfit: (gameName: string) => void;
  onUnconfirmProfit: (gameName: string) => void;
  isProfitConfirmed: boolean;
  isGenerating?: boolean;
  isAutoFinalizing: boolean;
  autoFinalizeStartTime: number;
  transitionType: 'high_to_low' | 'low_to_high' | null;
}

const SignalDisplay: React.FC<SignalDisplayProps> = ({ signal, gameName, generatedAt, payoutState, currentPayout, onBackToSelection, onInvalidateSignal, onConfirmProfit, onUnconfirmProfit, isProfitConfirmed, isGenerating, isAutoFinalizing, autoFinalizeStartTime, transitionType }) => {
    const [timeDisplay, setTimeDisplay] = useState('');
    const [timeLabel, setTimeLabel] = useState('Analisando...');
    const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [showLossModal, setShowLossModal] = useState(false);

    const { history } = useRealTimeHistory(isCrashSignal(signal) ? gameName : null);

    const profileInfo = useMemo(() => {
        if (isSlotSignal(signal)) {
            // High Payout Context Colors (Signal was generated in a good phase)
            const highPayoutColors: Record<StrategyProfile, string> = {
                'Agressivo': 'bg-teal-500/20 text-teal-300 border-teal-500/30',      // Correctly aggressive
                'Oportunista': 'bg-green-500/20 text-green-300 border-green-500/30',  // Correctly opportunistic
                'Moderado': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                'Conservador': 'bg-sky-500/20 text-sky-300 border-sky-500/30',      // A safe choice is still good
                'Defensivo': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
                'Cauteloso': 'bg-gray-500/20 text-gray-300 border-gray-500/30',      // Correctly cautious if phase is changing
                'Observador': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
            };
            // Low Payout Context Colors (Signal was generated in a bad phase)
            const lowPayoutColors: Record<StrategyProfile, string> = {
                'Agressivo': 'bg-red-500/20 text-red-300 border-red-500/30',        // Dangerously aggressive
                'Oportunista': 'bg-amber-500/20 text-amber-300 border-amber-500/30', // Risky opportunistic
                'Moderado': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                'Conservador': 'bg-green-500/20 text-green-300 border-green-500/30',  // Correctly conservative
                'Defensivo': 'bg-teal-500/20 text-teal-300 border-teal-500/30',      // Correctly defensive
                'Cauteloso': 'bg-sky-500/20 text-sky-300 border-sky-500/30',        // Correctly cautious
                'Observador': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
            };
            const colors = signal.isLowPayoutSignal ? lowPayoutColors : highPayoutColors;
            return {
                value: `Perfil ${signal.strategyProfile}`,
                className: colors[signal.strategyProfile] || colors['Moderado']
            };
        }
        if (isCrashSignal(signal) || isMatrixSignal(signal)) {
            return {
                value: signal.strategyName,
                className: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            };
        }
        if (isLiveSignal(signal)) {
            return {
                value: signal.strategyName,
                className: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
            };
        }
        return null;
    }, [signal]);

    useEffect(() => {
        const interval = setInterval(() => {
            const timeRange = signal.payingTimeSuggestion;
            const timeDetails = getSignalTimeDetails(timeRange, generatedAt);

            if (!timeDetails) {
                setTimeLabel('Horário');
                setTimeDisplay(timeRange || 'N/A');
                setIsFeedbackEnabled(false);
                return;
            }

            const now = Date.now();
            const { start, end } = timeDetails;

            const timeToStartMs = start.getTime() - now;
            const timeToEndMs = end.getTime() - now;

            if (timeToStartMs > 0) {
                setTimeLabel('Inicia em');
                const minutes = Math.floor(timeToStartMs / 60000);
                const seconds = Math.floor((timeToStartMs % 60000) / 1000);
                setTimeDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                setIsFeedbackEnabled(false);
            } else if (timeToEndMs > 0) {
                setTimeLabel('Tempo Restante');
                const minutes = Math.floor(timeToEndMs / 60000);
                const seconds = Math.floor((timeToEndMs % 60000) / 1000);
                setTimeDisplay(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                setIsFeedbackEnabled(true);
            } else {
                // This state should now be very brief, as the auto-finalization will remove the component.
                setTimeLabel('Status');
                setTimeDisplay('Finalizando...');
                setIsFeedbackEnabled(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [signal.payingTimeSuggestion, generatedAt]);
    
    const buildSignalText = useCallback(() => {
      let signalDetails = '';
      if (isSlotSignal(signal)) {
          const attemptsText = signal.attempts.map((a, i) => `🔹 Entrada ${i+1}: ${a.rounds}x ${a.type}`).join('\n');
          const betValueText = typeof signal.betValueInBRL === 'number' 
            ? `\n💰 *Aposta Sugerida:* R$ ${signal.betValueInBRL.toFixed(2).replace('.', ',')} (Gestão de Banca Baixa)` 
            : '';

          signalDetails = `
🎯 *Perfil Estratégico:* ${signal.strategyProfile}
*Sequência de Entrada:*
${attemptsText}${betValueText}
💡 *Dicas da Estratégia (O Objetivo):*
${signal.strategyTips}
♟️ *Execução da Estratégia (O Método):*
${signal.executionStrategy}
          `.trim();
      } else if (isCrashSignal(signal)) {
          const exitsText = signal.exitPoints.map(e => `🔹 ${e.type.charAt(0).toUpperCase() + e.type.slice(1)}: ${e.multipliers.map(m => m.toFixed(2)).join('x / ')}x`).join('\n');
          signalDetails = `
🔥 *Estratégia:* ${signal.strategyName}
🧭 *Modo de Operação:* ${signal.operatingMode}
💡 *Padrão de Entrada:* ${signal.entryPattern}
*Metas de Saída:*
${exitsText}
⚠️ *Stop Loss:* Parar após ${signal.maxLossStreak} perdas seguidas.
          `.trim();
      } else if (isLiveSignal(signal)) {
          const planText = signal.bettingPlan.map(p => 
              `*Passo ${p.step}:* ${p.instruction}\n*Quando:* ${p.condition}\n*Objetivo:* ${p.objective}`
          ).join('\n\n');
          signalDetails = `
🔥 *Estratégia:* ${signal.strategyName}
🎲 *Jogo:* ${signal.gameType}
📊 *Risco:* ${signal.riskProfile}
🧭 *Modo de Operação:* ${signal.operatingMode}

*Plano de Aposta:*
${planText}

🏁 *Objetivo da Sessão:* ${signal.sessionGoal}
          `.trim();
      } else if (isMatrixSignal(signal)) {
           const cashoutText = `
🔹 Safe: ${signal.cashoutStrategy.safe.map(m => m.toFixed(2)).join('x / ')}x
🔹 Medium: ${signal.cashoutStrategy.medium.map(m => m.toFixed(2)).join('x / ')}x
🔹 High: ${signal.cashoutStrategy.high.map(m => m.toFixed(2)).join('x / ')}x
           `.trim();
          const shootingPlan = signal.targetCount && signal.shootingStyle ? `
🎯 *Plano de Ataque:* ${signal.riskLevel}
🔢 *Alvos no Gol:* ${signal.targetCount}
🧭 *Estilo de Chute:* ${signal.shootingStyle}
` : `🛡️ *Nível de Risco:* ${signal.riskLevel}`;

          signalDetails = `
🔥 *Estratégia:* ${signal.strategyName}${shootingPlan}
🧭 *Modo de Operação:* ${signal.operatingMode}
📈 *Padrão de Aposta:* ${signal.bettingPattern}
*Metas de Saída:*
${cashoutText}
          `.trim();
      }

      return `
🚀 *SINAL CONFIRMADO - ${gameName}* 🚀

🕒 *Horário Pagante:* ${signal.payingTimeSuggestion}

${signalDetails}

*🛡️ PROTOCOLO DE PROTEÇÃO DE LUCRO 🛡️*
Ao obter *QUALQUER VALOR DE LUCRO*, pare imediatamente. A casa pode identificar o ganho e induzir a uma perda maior. *Proteja seu resultado.*

🤖 *Análise Gerada por:* ${signal.aiProfile} AI
🔗 *Acesse a Plataforma:* [SEU_LINK_AQUI]
      `.trim();
    }, [signal, gameName]);


    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(buildSignalText());
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };
    
    const handleShareToTelegram = () => {
        const text = buildSignalText();
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent('Sinal Exclusivo!')}&text=${encodeURIComponent(text)}`;
        window.open(telegramUrl, '_blank');
    };

    const handleShareToWhatsApp = () => {
        const text = buildSignalText();
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const renderSignalContent = () => {
        if (isSlotSignal(signal)) return <SlotSignalView signal={signal} />;
        if (isCrashSignal(signal)) return <CrashSignalView signal={signal} history={history} />;
        if (isLiveSignal(signal)) return <LiveSignalView signal={signal} currentPayout={currentPayout} />;
        if (isMatrixSignal(signal)) return <MatrixSignalView signal={signal} />;
        return <p>Tipo de sinal desconhecido.</p>;
    };

    const getPayoutColorClass = (payout: number | undefined) => {
        if (payout === undefined) return 'text-gray-400';
        if (payout < 75) return 'text-red-400';
        if (payout <= 77) return 'text-yellow-400';
        return 'text-green-400';
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col animate-fade-in px-4">
            {isAutoFinalizing && transitionType && (
                <AutoFinalizeModal
                    gameName={gameName}
                    startTime={autoFinalizeStartTime}
                    transitionType={transitionType}
                />
            )}
            {showLossModal && (
                <LossConfirmationModal
                    gameName={gameName}
                    onConfirm={() => {
                        setShowLossModal(false);
                        onInvalidateSignal(generatedAt, 'user_cancellation');
                    }}
                    onCancel={() => setShowLossModal(false)}
                />
            )}
            <header className="relative py-4 flex items-center justify-center">
                <button onClick={onBackToSelection} className="absolute left-0 p-2 text-white"><ArrowLeftIcon className="w-6 h-6" /></button>
                <div className="text-center px-10">
                    <h1 className="text-2xl font-bold text-white truncate">{gameName}</h1>
                    {profileInfo && (
                        <div className={`mt-2 inline-block px-3 py-1 text-xs font-bold rounded-full border ${profileInfo.className} animate-fade-in-short max-w-full truncate`}>
                            {profileInfo.value.toUpperCase()}
                        </div>
                    )}
                </div>
            </header>

            {/* NEW ALERT FOR IMMINENT PHASE CHANGE */}
            {payoutState.isChangingSoon && payoutState.nextPhase && (
                 <div className={`bg-slate-900/60 border-2 ${payoutState.nextPhase === 'low' ? 'border-yellow-500/70' : 'border-green-500/70'} rounded-2xl p-4 mb-4 animate-pulse flex items-start gap-3`}>
                    <div className="flex-shrink-0 mt-1">
                        {payoutState.nextPhase === 'low' 
                            ? <AlertTriangleIcon className="w-8 h-8 text-yellow-300" />
                            : <TrendingUpIcon className="w-8 h-8 text-green-300" />
                        }
                    </div>
                    <div className="text-left w-full">
                        <h3 className="font-bold text-white text-lg">
                            {payoutState.nextPhase === 'low' ? 'ALERTA DE TRANSIÇÃO' : 'OPORTUNIDADE IMINENTE'}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">
                            {payoutState.nextPhase === 'low' 
                                ? 'O jogo está prestes a entrar em FASE DE BAIXA. Finalize sua jogada para proteger seus ganhos, o risco irá aumentar.'
                                : 'O jogo está prestes a entrar em FASE DE ALTA! Prepare-se para uma nova janela de alta probabilidade.'
                            }
                        </p>
                        {payoutState.nextPhase === 'low' && (
                            <button 
                                onClick={() => onInvalidateSignal(generatedAt, 'profit_finalize')}
                                className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm shadow-lg shadow-teal-500/20"
                            >
                                Finalizar Sinal com Segurança
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-purple-500/50 flex justify-around text-center">
                    <div>
                        <p className="text-sm text-gray-400">{timeLabel}</p>
                        <p className="text-2xl font-bold text-white">{timeDisplay}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Índice da Análise</p>
                        <p className={`text-2xl font-bold ${getPayoutColorClass(currentPayout)}`}>{currentPayout ?? '--'}%</p>
                    </div>
                </div>

                {renderSignalContent()}

                {signal.aiProfile === 'Diamond' && (
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-teal-500/50 text-center">
                        <h3 className="font-bold text-teal-300 mb-2">Análise Personalizada</h3>
                        <p className="text-sm text-gray-300">
                            Esta estratégia foi gerada com base no seu perfil de risco. A análise ignora o fluxo de dados atual e foca exclusivamente nas suas configurações de Risco e Profundidade.
                        </p>
                    </div>
                )}
                
                <div className="bg-gradient-to-r from-amber-600/30 to-slate-900/60 p-4 rounded-2xl border-2 border-amber-500/80 shadow-lg shadow-amber-500/20">
                    <h3 className="font-bold text-amber-300 mb-2 flex items-center justify-center gap-2 text-lg">
                        <ShieldIcon className="w-6 h-6"/>
                        Protocolo de Proteção de Lucro
                    </h3>
                    <p className="text-sm text-gray-200 leading-relaxed text-center">
                        Ao obter <strong className="text-white">QUALQUER VALOR DE LUCRO</strong>, PARE IMEDIATAMENTE. Muitas vezes a casa de aposta identifica o ganho e tenta induzir a uma perda maior. <strong className="text-white uppercase">Proteja seu resultado.</strong>
                    </p>
                </div>

                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={handleCopyToClipboard} className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                        <CopyIcon className="w-5 h-5" /> {hasCopied ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button onClick={handleShareToTelegram} className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                        <TelegramIcon className="w-5 h-5" /> Telegram
                    </button>
                    <button onClick={handleShareToWhatsApp} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                        <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                    </button>
                </div>
                
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-teal-500/50 text-center mt-4 animate-fade-in">
                    <h3 className="font-bold text-teal-300 mb-2 flex items-center justify-center gap-2">
                        <MoneyIcon className="w-6 h-6"/> Monetize Nossos Sinais
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Transforme esta IA em sua fonte de renda. Crie um grupo VIP, compartilhe nossos sinais de alta precisão com um clique e cobre uma assinatura. A análise é nossa, o lucro é seu.
                    </p>
                </div>

                {signal.aiProfile !== 'Diamond' && (
                    <>
                        {!isProfitConfirmed ? (
                             <div className={`bg-slate-900/60 p-4 rounded-2xl border transition-all duration-500 ${isFeedbackEnabled ? 'border-yellow-400 ring-2 ring-yellow-400/50 animate-pulse' : 'border-yellow-500/50'}`}>
                                <h3 className="font-bold text-yellow-300 mb-2 text-center">Como foi sua jogada?</h3>

                                {!isFeedbackEnabled ? (
                                    <p className="text-xs text-cyan-300 text-center mb-4">
                                        A validação será liberada quando o Horário Pagante iniciar.
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-400 text-center mb-4">Seu feedback é crucial para aprimorar a IA.</p>
                                )}

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setShowLossModal(true)}
                                        disabled={!isFeedbackEnabled}
                                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all bg-red-900/80 text-red-300 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-900/80">
                                        <XCircleIcon className="w-5 h-5"/> Prejuízo
                                    </button>
                                    <button 
                                        onClick={() => onConfirmProfit(gameName)}
                                        disabled={!isFeedbackEnabled}
                                        className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all bg-green-900/80 text-green-300 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-900/80">
                                        <CheckCircleIcon className="w-5 h-5"/> Lucrativo
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-green-900/50 to-slate-900/60 p-6 rounded-2xl border border-green-500/50 text-center animate-fade-in">
                                <AnimatedCheckIcon />
                                <h3 className="text-2xl font-bold text-white mt-4">Lucro Confirmado!</h3>
                                <p className="text-gray-300 mt-2 text-sm">Parabéns! Para proteger seu ganho e ajudar a IA, finalize o sinal.</p>
                                <button 
                                    onClick={() => onInvalidateSignal(generatedAt, 'profit_finalize')} 
                                    className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-500/20">
                                    Finalizar e Proteger Lucro
                                </button>
                                <button 
                                    onClick={() => onUnconfirmProfit(gameName)} 
                                    className="text-xs text-gray-400 hover:text-white mt-3 transition-colors">
                                    Cliquei por engano
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SignalDisplay;
