import type { GeneratedSignal, PayoutState, SlotSignal } from '../../types';
import { generateAITimeSuggestion } from '../utils';

/**
 * Builds a conservative Slot fallback signal for Blue AI, specialized for low bankrolls.
 * @param {PayoutState | undefined} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @returns {SlotSignal} A dynamically generated, conservative SlotSignal with bankroll management.
 */
export const getBlueAiFallback = (payoutState: PayoutState | undefined, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 65;
    const isLowPayout = payout < 75;

    let strategyProfile: SlotSignal['strategyProfile'];
    let attempts: SlotSignal['attempts'];
    let strategyTips: string;
    let executionStrategy: string;
    let betValueInBRL: number;

    if (payout >= 88) { // HOT Payout Scenario
        strategyProfile = 'Agressivo';
        attempts = [
            { type: 'Normal', rounds: 5 },
            { type: 'Auto', rounds: 10 },
            { type: 'Turbo', rounds: 11 },
            { type: 'Turbo', rounds: 10 },
        ];
        betValueInBRL = 0.90;
        strategyTips = `O objetivo é maximizar o retorno durante esta janela de oportunidade excepcional, com uma estratégia agressiva, mas calculada para sua banca.`;
        executionStrategy = `Análise de Oportunidade Máxima para ${gameName}: Com o índice de análise altíssimo, a aposta de R$0.90 oferece um excelente potencial de retorno. A sequência foi desenhada para capitalizar intensamente nesta janela rara de oportunidade.`;
    } else if (payout >= 77) { // High Payout Scenario
        strategyProfile = 'Oportunista';
        attempts = [
            { type: 'Normal', rounds: 6 },
            { type: 'Auto', rounds: 8 },
            { type: 'Turbo', rounds: 10 },
        ];
        betValueInBRL = 0.70;
        strategyTips = `O objetivo é explorar o ciclo de distribuição favorável com risco controlado, ideal para sua banca de R$50-R$100.`;
        executionStrategy = `Análise de Oportunidade Segura para ${gameName}: Com o índice alto, use a aposta sugerida de R$0.70 para capitalizar na oportunidade sem expor demais sua banca. A sequência é projetada para testar e depois atacar.`;
    } else { // Low Payout Scenario
        strategyProfile = 'Defensivo';
        attempts = [
            { type: 'Normal', rounds: 5 },
            { type: 'Normal', rounds: 7 },
        ];
        betValueInBRL = 0.50;
        strategyTips = `O objetivo é analisar o algoritmo do ${gameName} com o menor risco possível, focando na proteção do seu saldo de R$50-R$100.`;
        executionStrategy = `Análise de Proteção de Banca para ${gameName}: Com uma banca inicial de R$50-R$100, a prioridade é a sobrevivência. Use a aposta sugerida de R$0.50 para completar a estratégia com segurança.`;
    }

    return {
        signalType: 'slot',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        strategyProfile,
        attempts,
        strategyTips,
        executionStrategy,
        isLowPayoutSignal: isLowPayout,
        aiProfile: 'Blue',
        betValueInBRL,
    };
};