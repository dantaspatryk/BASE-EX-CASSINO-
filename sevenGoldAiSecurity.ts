import type { GeneratedSignal, CrashSignal, PayoutState } from '../../types';
import { generateAITimeSuggestion, selectRandom, generateMultiplierOptions } from '../utils';

/**
 * Dynamically builds a Crash fallback signal for Seven Gold AI.
 * @param {PayoutState} payoutState - The current payout state.
 * @param {string} gameName - The name of the game.
 * @returns {CrashSignal} A realistic CrashSignal.
 */
export const getSevenGoldAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 60; // Default to low if state is missing

    const strategies: {
        name: string;
        pattern: string;
    }[] = [
        { name: 'Caça à Vela Segura', pattern: 'Aguardar uma sequência de 2 velas abaixo de 1.50x. Entrar na terceira rodada.' },
        { name: 'Tática de Retirada Rápida', pattern: 'Entrar após uma vela alta (acima de 5.00x), buscando uma correção de baixa.' },
        { name: 'Explorador de Volatilidade', pattern: 'Após uma vela rosa ( > 10x), pular duas rodadas e entrar na terceira.' },
    ];
    
    let chosenStrategy;
    let exits: CrashSignal['exitPoints'];

    // If analysis indicates a low opportunity flow, force the safest strategy
    if (payout < 75) {
        chosenStrategy = strategies[0]; 
        exits = [
            { multipliers: generateMultiplierOptions(1.15, 1.45), type: 'safe' },
            { multipliers: generateMultiplierOptions(1.50, 1.90), type: 'medium' },
        ];
    } else if (payout < 88) {
        chosenStrategy = selectRandom(strategies.slice(0,2)); // Safe and Quick strategies
         exits = [
            { multipliers: generateMultiplierOptions(1.20, 1.50), type: 'safe' },
            { multipliers: generateMultiplierOptions(1.70, 2.50), type: 'medium' },
        ];
    } else { // High payout, more aggressive options
        chosenStrategy = selectRandom(strategies);
        exits = [
            { multipliers: generateMultiplierOptions(1.25, 1.55), type: 'safe' },
            { multipliers: generateMultiplierOptions(1.80, 2.90), type: 'medium' },
            { multipliers: generateMultiplierOptions(3.50, 7.50), type: 'high' }
        ];
    }

    return {
        signalType: 'crash',
        strategyName: chosenStrategy.name,
        entryPattern: chosenStrategy.pattern,
        exitPoints: exits,
        maxLossStreak: 3,
        aiProfile: 'Seven Gold',
        payingTimeSuggestion: generateAITimeSuggestion(),
        operatingMode: "Durante o Horário de Oportunidade, aguarde o 'Padrão de Entrada' se materializar. Assim que ocorrer, faça sua aposta. Após a rodada, independentemente do resultado, aguarde o padrão ocorrer novamente para uma nova entrada. Pare imediatamente se atingir o stop loss ou ao final do horário.",
        executionStrategy: "Esta estratégia foca em contenção de risco. O padrão de entrada busca um momento de baixa volatilidade para uma entrada segura. Priorize SEMPRE a meta 'safe' para garantir lucros pequenos e consistentes, protegendo sua banca.",
    };
};