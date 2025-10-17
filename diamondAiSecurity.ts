import type { GeneratedSignal, PayoutState, SlotSignal, CustomStrategyConfig } from '../../types';
import { generateAITimeSuggestion } from '../utils';

/**
 * Builds a fallback signal for Diamond AI that respects the user's custom strategy.
 * @param {PayoutState | undefined} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @param {CustomStrategyConfig} [customStrategy] - The user's defined strategy.
 * @returns {SlotSignal} A dynamically generated SlotSignal based on user's config.
 */
export const getDiamondAiFallback = (
    payoutState: PayoutState | undefined, 
    gameName: string, 
    customStrategy?: CustomStrategyConfig
): GeneratedSignal => {
    const payout = payoutState?.payout ?? 75;
    const isLowPayout = payout < 75;

    // Use user's config, or default to a safe 'Moderado' profile
    const profile = customStrategy?.strategyProfile || 'Moderado';
    const numAttempts = customStrategy?.numberOfAttempts || 4;
    const maxRounds = customStrategy?.maxRoundsPerAttempt || 10;

    const attempts: SlotSignal['attempts'] = [];
    for (let i = 0; i < numAttempts; i++) {
        const isAggressive = profile === 'Agressivo' || profile === 'Oportunista';
        const useTurbo = (isAggressive && Math.random() > 0.4) || maxRounds >= 10;
        
        attempts.push({
            type: useTurbo ? 'Turbo' : 'Normal',
            rounds: Math.min(maxRounds, 5 + Math.floor(Math.random() * 5)), // 5-9, capped by maxRounds
        });
    }

    const strategyTips = `Estratégia personalizada para perfil '${profile}'. O objetivo é seguir suas diretrizes de risco para uma jogada controlada.`;
    const executionStrategy = `Execução Personalizada para ${gameName}: Com base no seu perfil '${profile}', esta estratégia foi construída com ${numAttempts} entradas e um limite de ${maxRounds} rodadas. Gerencie sua banca de acordo com o risco que você definiu.`;

    return {
        signalType: 'slot',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        strategyProfile: profile,
        attempts,
        strategyTips,
        executionStrategy,
        isLowPayoutSignal: isLowPayout,
        aiProfile: 'Diamond',
    };
};