import type { GeneratedSignal, LiveSignal, PayoutState } from '../../types';
import { generateAITimeSuggestion, selectRandom } from '../utils';

/**
 * Dynamically builds a Live Game Show fallback signal.
 * @param {PayoutState} payoutState - The current payout state.
 * @param {string} gameName - The name of the game show.
 * @returns {LiveSignal} A realistic and engaging LiveSignal for a game show.
 */
export const getShowtimeAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 75;
    const calculatedRiskProfile = payout < 75 ? 'Alto' : payout < 88 ? 'Moderado' : 'Baixo';

    // Fallback for wheel games
    const strategies = [
        {
            name: 'Caçador de Bônus',
            plan: [
                { step: 1, instruction: 'Aposte 1 unidade no número 2.', condition: 'Em todas as rodadas.', objective: 'Manter um ganho base consistente enquanto aguarda os bônus.' },
                { step: 2, instruction: 'Aposte 0.5 unidades em TODAS as casas de bônus disponíveis.', condition: 'Em todas as rodadas.', objective: 'Garantir que você nunca perca uma rodada de bônus, que é onde estão os maiores multiplicadores.' }
            ],
            goal: 'O objetivo é ativar uma rodada de bônus. Stop-loss em -10 unidades.',
            exec: "Game Shows são sobre volatilidade. Esta estratégia balanceia a cobertura dos números-base para manter sua banca ativa, enquanto 'caça' as rodadas de bônus, que são o objetivo principal. Paciência e gestão de banca são essenciais."
        },
        {
            name: 'Estratégia do Multiplicador Seguro',
            plan: [
                { step: 1, instruction: 'Aposte 2 unidades no número 1.', condition: 'Em todas as rodadas.', objective: 'Cobrir o segmento mais frequente para um fluxo de caixa estável.' },
                { step: 2, instruction: 'Aposte 1 unidade no número 5.', condition: 'Em todas as rodadas.', objective: 'Buscar um multiplicador de médio alcance para aumentar os lucros.' }
            ],
            goal: 'O objetivo é atingir +8 unidades de lucro. Stop-loss em -6 unidades.',
            exec: 'Esta estratégia é mais conservadora, focando no segmento mais provável (número 1) para garantir retornos frequentes e pequenos, enquanto se arrisca um pouco no número 5 para um ganho mais substancial.'
        }
    ];
    
    const chosenStrategy = selectRandom(strategies);

    return {
        signalType: 'live',
        strategyName: chosenStrategy.name,
        riskProfile: calculatedRiskProfile,
        gameType: gameName,
        bettingPlan: chosenStrategy.plan,
        sessionGoal: chosenStrategy.goal,
        aiProfile: 'Showtime',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        operatingMode: "Aplique o 'Plano de Aposta' em todas as rodadas que ocorrerem dentro do 'Horário de Oportunidade'. Continue seguindo o plano até atingir sua meta de lucro ou limite de perda ('Objetivo da Sessão'). Ao atingir um desses limites, PARE imediatamente.",
        executionStrategy: chosenStrategy.exec,
    };
};