import type { GeneratedSignal, PayoutState, SlotSignal } from '../../types';
import { generateAITimeSuggestion } from '../utils';

/**
 * Dynamically builds a Slot fallback signal for Black AI for medium bankrolls (R$100-R$500).
 * @param {PayoutState | undefined} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @returns {SlotSignal} A dynamically generated, realistic SlotSignal.
 */
export const getBlackAiFallback = (payoutState: PayoutState | undefined, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 65; // Default to low payout
    const isLowPayout = payout < 75;

    let strategyProfile: SlotSignal['strategyProfile'];
    let attempts: SlotSignal['attempts'];
    let executionStrategy: string;
    let strategyTips: string;
    let betValueInBRL: number;

    if (payout >= 88) { // HOT
        strategyProfile = 'Agressivo';
        attempts = [ { type: 'Normal', rounds: 6 }, { type: 'Turbo', rounds: 10 }, { type: 'Auto', rounds: 12 }, { type: 'Turbo', rounds: 11 }, { type: 'Normal', rounds: 7 } ];
        betValueInBRL = 3.00;
        strategyTips = `A diretriz é capitalizar em uma janela de oportunidade excepcional, usando uma sequência tática agressiva para buscar ganhos exponenciais.`;
        executionStrategy = `Análise de Oportunidade Máxima para ${gameName}: Para uma banca de R$100-R$500, a aposta de R$${betValueInBRL.toFixed(2)} é ideal para capitalizar neste índice excepcional, oferecendo alto potencial de retorno com risco gerenciado.`;
    } else if (!isLowPayout) { // High
        strategyProfile = 'Oportunista';
        attempts = [ { type: 'Normal', rounds: 5 }, { type: 'Auto', rounds: 9 }, { type: 'Turbo', rounds: 10 }];
        betValueInBRL = 2.00;
        strategyTips = `A diretriz é validar o ciclo de distribuição favorável e extrair lucro com um mix tático de rodadas.`;
        executionStrategy = `Análise Otimizada para ${gameName}: A análise atual indica uma janela favorável. Para uma banca de R$100-R$500, a aposta de R$${betValueInBRL.toFixed(2)} permite explorar o cenário com um bom potencial de ganho.`;
    } else { // Low
        strategyProfile = 'Conservador';
        attempts = [ { type: 'Normal', rounds: 6 }, { type: 'Auto', rounds: 9 } ];
        betValueInBRL = 1.00;
        strategyTips = "A diretriz é 'aquecer' o algoritmo com o menor risco possível para sua banca, aguardando um ciclo de distribuição.";
        executionStrategy = `Análise de Contenção para ${gameName}: O cenário atual exige cautela. Para uma banca de R$100-R$500, a aposta de R$${betValueInBRL.toFixed(2)} é recomendada para testar o jogo com exposição mínima ao risco.`;
    }

    return {
        signalType: 'slot',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        strategyProfile,
        attempts,
        strategyTips,
        executionStrategy,
        isLowPayoutSignal: isLowPayout,
        aiProfile: 'Black',
        betValueInBRL,
    };
};
