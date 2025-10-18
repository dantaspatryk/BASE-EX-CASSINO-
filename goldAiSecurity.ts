import type { GeneratedSignal, PayoutState, SlotSignal } from '../../types';
import { generateAITimeSuggestion } from '../utils';

/**
 * Builds a fallback signal specifically for 'Fortune' style games.
 * @param {PayoutState} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @returns {SlotSignal} A dynamically generated SlotSignal tailored for Fortune games.
 */
export const getGoldAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 75;
    const isLowPayout = payout < 75;

    let strategyProfile: SlotSignal['strategyProfile'];
    let attempts: SlotSignal['attempts'];
    let strategyTips: string;
    let executionStrategy: string;

    if (payout >= 88) { // HOT
        strategyProfile = 'Agressivo';
        attempts = [ { type: 'Normal', rounds: 5 }, { type: 'Turbo', rounds: 10 }, { type: 'Turbo', rounds: 11 }, { type: 'Auto', rounds: 10 } ];
        strategyTips = `A diretriz é forçar o acúmulo de símbolos e ativar a rodada bônus do ${gameName} durante esta janela de oportunidade excepcional.`;
        executionStrategy = `Análise de Potencial Máximo para ${gameName}: Com o índice de oportunidade excepcional, a estratégia foca em uma sequência intensa para ativar o recurso de re-spin o mais rápido possível e capitalizar nos ganhos acumulados.`;
    } else if (!isLowPayout) { // High
        strategyProfile = 'Oportunista';
        attempts = [ { type: 'Normal', rounds: 7 }, { type: 'Turbo', rounds: 10 }, { type: 'Auto', rounds: 9 } ];
        strategyTips = `A diretriz é construir uma base de símbolos na grade e usar as rodadas turbo para acionar o bônus do ${gameName} no atual ciclo favorável.`;
        executionStrategy = `Análise Otimizada para ${gameName}: O índice de análise atual é ideal para buscar a rodada bônus. A sequência equilibra a preparação do grid com a agressividade das rodadas turbo para maximizar a chance de ativação.`;
    } else { // Low
        strategyProfile = 'Conservador';
        attempts = [ { type: 'Normal', rounds: 8 }, { type: 'Normal', rounds: 7 } ];
        strategyTips = `A diretriz é testar o algoritmo do ${gameName} com baixo custo, buscando uma ativação de bônus com risco mínimo, dado o cenário atual.`;
        executionStrategy = `Análise de Risco Controlado para ${gameName}: Com o cenário atual, a prioridade é a cautela. Use apenas rodadas normais para sondar o comportamento do jogo sem comprometer a banca.`;
    }

    return {
        signalType: 'slot',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        strategyProfile,
        attempts,
        strategyTips,
        executionStrategy,
        isLowPayoutSignal: isLowPayout,
        aiProfile: 'Gold',
    };
};