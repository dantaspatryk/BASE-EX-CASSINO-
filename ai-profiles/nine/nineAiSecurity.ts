// FIX: Removed extraneous header lines causing syntax errors.
import type { GeneratedSignal, LiveSignal, PayoutState } from '../../types';
import { generateAITimeSuggestion, selectRandom } from '../utils';

/**
 * Dynamically builds a Live Game fallback signal, ensuring compatibility and variety.
 * @param {PayoutState} payoutState - The current payout state.
 * @param {string} gameName - The name of the live game.
 * @returns {LiveSignal} A realistic and game-compatible LiveSignal.
 */
export const getNineAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 60; // Default to low if state is missing
    const calculatedRiskProfile = payout < 75 ? 'Alto' : payout < 88 ? 'Moderado' : 'Baixo';

    // A "book" of strategy generators for specific games
    const liveStrategyGenerators: Record<string, () => Omit<LiveSignal, 'payingTimeSuggestion' | 'aiProfile' | 'signalType' | 'operatingMode' | 'executionStrategy'>> = {
        'Blackjack Ao Vivo': () => {
            const strategies = [
                {
                    strategyName: 'Tática da Contagem Básica',
                    riskProfile: 'Baixo',
                    bettingPlan: [
                        { step: 1, instruction: 'Siga a tabela de estratégia básica do Blackjack.', condition: 'Sempre.', objective: `Tomar a decisão matematicamente ideal para maximizar suas chances no ${gameName}.` },
                        { step: 2, instruction: 'Aposte 1 unidade consistentemente (Flat Betting).', condition: 'Em cada mão.', objective: 'Controlar a variância e proteger sua banca.' },
                    ],
                    sessionGoal: 'O objetivo é atingir +4 unidades de lucro. Stop-loss em -5 unidades.'
                },
                {
                    strategyName: 'Estratégia de Dobra Oportunista',
                    riskProfile: 'Moderado',
                    bettingPlan: [
                        { step: 1, instruction: 'Dobre a aposta (Double Down) em mãos com total 10 ou 11.', condition: 'Quando a sua mão inicial somar 10 ou 11.', objective: 'Capitalizar em mãos fortes para dobrar o ganho potencial.' },
                    ],
                    sessionGoal: 'O objetivo é conseguir 2 dobras bem-sucedidas. Stop-loss após 3 perdas consecutivas.'
                }
            ];
            return { ...selectRandom(strategies), gameType: gameName };
        },
        'Roleta Brasileira': () => {
             const strategies = [
                {
                    strategyName: 'Tática da Dúzia Dupla',
                    riskProfile: 'Baixo',
                    bettingPlan: [
                        { step: 1, instruction: 'Aposte 1 unidade na 1ª Dúzia (1-12).', condition: 'Início da sessão.', objective: 'Cobrir 1/3 da mesa.' },
                        { step: 2, instruction: 'Aposte 1 unidade na 2ª Dúzia (13-24).', condition: 'Aposta simultânea.', objective: 'Cobrir 2/3 da mesa para alta probabilidade.' },
                    ],
                    sessionGoal: 'O objetivo é obter um lucro de +5 unidades. Stop-loss em -4 unidades.'
                }
            ];
            return { ...selectRandom(strategies), gameType: gameName };
        },
        'Sic Bo': () => {
            const chosenBet = selectRandom(['Grande (Big)', 'Pequeno (Small)']);
            const strategies = [
                {
                    strategyName: 'Tática de Risco Controlado (Big/Small)',
                    riskProfile: 'Baixo',
                    bettingPlan: [
                        { step: 1, instruction: `Aposte 1 unidade em ${chosenBet}.`, condition: 'A cada rodada.', objective: 'Focar em apostas de probabilidade próxima a 50% para manter a consistência e observar o jogo.' },
                        { step: 2, instruction: 'NÃO aposte em triplos específicos ou somas.', condition: 'Durante toda a sessão.', objective: 'Evitar as apostas de maior risco para proteger sua banca, conforme a estratégia de risco controlado.' },
                    ],
                    sessionGoal: 'O objetivo é consistência. Stop-loss em -5 unidades. Meta de lucro em +4 unidades.'
                }
            ];
            return { ...selectRandom(strategies), gameType: gameName };
        }
    };

    const generator = liveStrategyGenerators[gameName];
    let chosenStrategy;

    if (generator) {
        chosenStrategy = generator();
    } else {
        // Generic fallback for any other live game
        chosenStrategy = {
            strategyName: 'Estratégia de Jogo Cauteloso',
            riskProfile: 'Baixo',
            gameType: gameName,
            bettingPlan: [
                { step: 1, instruction: 'Inicie com a aposta mínima permitida.', condition: 'Início da sessão.', objective: `Observar o ritmo do ${gameName} com risco mínimo.` },
                { step: 2, instruction: 'Identifique a aposta com a maior probabilidade (ex: Par/Ímpar, Cor) e foque nela.', condition: 'Sempre.', objective: 'Focar na aposta principal para uma gestão de banca mais segura.' }
            ],
            sessionGoal: 'O objetivo é a observação e a consistência. Stop-loss em -5 unidades.'
        };
    }
    
    // Override the risk profile based on the current analysis
    chosenStrategy.riskProfile = calculatedRiskProfile;

    return {
        signalType: 'live',
        ...chosenStrategy,
        aiProfile: 'Nine',
        payingTimeSuggestion: generateAITimeSuggestion(),
        operatingMode: "Inicie no 'Horário de Oportunidade' e siga o 'Plano de Aposta' rodada a rodada. Continue aplicando as regras do plano até atingir a meta de lucro ou o limite de perda definidos no 'Objetivo da Sessão'. Ao atingir um desses pontos, encerre a operação imediatamente.",
        executionStrategy: "A base desta estratégia é a consistência. Ao focar em apostas de alta probabilidade e seguir o plano de gestão, você minimiza a variância e joga de forma mais controlada. Disciplina é a chave para o sucesso a longo prazo.",
    };
};
