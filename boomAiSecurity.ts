import type { GeneratedSignal, PayoutState, SlotSignal } from '../../types';
import { generateAITimeSuggestion } from '../utils';

/**
 * Builds a dynamic fallback signal for Boom AI based on momentum and high bankroll.
 * @param {PayoutState | undefined} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @returns {SlotSignal} A dynamically generated, aggressive SlotSignal.
 */
export const getBoomAiFallback = (payoutState: PayoutState | undefined, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 78; // Default to a good payout to encourage aggressive strategy
    const isLowPayout = payout < 75;

    let strategyProfile: SlotSignal['strategyProfile'];
    let attempts: SlotSignal['attempts'];
    let strategyTips: string;
    let executionStrategy: string;
    let betValueInBRL: number;

    if (payout >= 88) { // HOT
        strategyProfile = 'Agressivo';
        attempts = [ { type: 'Normal', rounds: 7 }, { type: 'Turbo', rounds: 11 }, { type: 'Auto', rounds: 12 }, { type: 'Turbo', rounds: 10 }, { type: 'Normal', rounds: 8 } ];
        betValueInBRL = 2.00; 
        strategyTips = `A diretriz é um 'blitzkrieg' de alto impacto, explorando uma janela de oportunidade excepcional para um ganho exponencial e rápido.`;
        executionStrategy = `Análise de Momentum Máximo para ${gameName}: Com o índice em pico, a aposta de R$${betValueInBRL.toFixed(2)} é calibrada para uma banca de R$650-R$950, buscando um retorno substancial com um custo total de estratégia que respeita seu capital.`;
    } else if (payout >= 77) { // Oportunista
        strategyProfile = 'Oportunista';
        attempts = [ { type: 'Normal', rounds: 6 }, { type: 'Auto', rounds: 10 }, { type: 'Turbo', rounds: 11 } ];
        betValueInBRL = 1.50; 
        strategyTips = `A diretriz é um ataque balanceado para explorar a janela de oportunidade favorável com controle e precisão.`;
        executionStrategy = `Análise de Assalto Padrão para ${gameName}: O cenário é favorável. A aposta de R$${betValueInBRL.toFixed(2)} permite uma exploração robusta para uma banca de R$650-R$950, mantendo o custo total da estratégia em um nível seguro.`;
    } else { // Risco
        strategyProfile = 'Defensivo';
        attempts = [ { type: 'Normal', rounds: 5 }, { type: 'Normal', rounds: 7 } ];
        betValueInBRL = 1.00; 
        strategyTips = `A diretriz é uma 'sonda' rápida da volatilidade do ${gameName}. Uma sequência curta para identificar uma brecha sem grande exposição.`;
        executionStrategy = `Análise de Sonda para ${gameName}: O cenário sugere cautela. A aposta de R$${betValueInBRL.toFixed(2)} permite testar o algoritmo com risco mínimo, garantindo um custo total de estratégia muito baixo para sua banca.`;
    }

    return {
        signalType: 'slot',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        strategyProfile,
        attempts,
        strategyTips,
        executionStrategy,
        isLowPayoutSignal: isLowPayout,
        aiProfile: 'Boom',
        betValueInBRL,
    };
};