import type { GeneratedSignal, LiveSignal, PayoutState } from '../../types';
import { generateAITimeSuggestion, selectRandom } from '../utils';

const MASTER_LIST: Record<string, () => Omit<LiveSignal, 'payingTimeSuggestion' | 'aiProfile' | 'signalType' | 'operatingMode' | 'executionStrategy'>> = {
    'Blackjack Ao Vivo': () => ({
        strategyName: 'Tática da Contagem Básica',
        riskProfile: 'Baixo',
        gameType: 'Blackjack Ao Vivo',
        bettingPlan: [
            { step: 1, instruction: 'Siga a tabela de estratégia básica do Blackjack.', condition: 'Sempre.', objective: 'Tomar a decisão matematicamente ideal para maximizar suas chances.' },
            { step: 2, instruction: 'Aposte 1 unidade consistentemente (Flat Betting).', condition: 'Em cada mão.', objective: 'Controlar a variância e proteger sua banca.' },
        ],
        sessionGoal: 'O objetivo é atingir +4 unidades de lucro. Stop-loss em -5 unidades.'
    }),
    'Football Studio': () => selectRandom([
        {
            strategyName: 'Seguidor de Tendência',
            riskProfile: 'Moderado',
            gameType: 'Football Studio',
            bettingPlan: [
                { step: 1, instruction: 'Aposte 1 unidade no vencedor da rodada anterior (Casa ou Fora).', condition: 'Após cada resultado.', objective: 'Seguir a tendência atual do jogo, capitalizando em sequências de vitórias.' },
                { step: 2, instruction: 'Se uma sequência de 4 vitórias para o mesmo lado ocorrer, PARE de apostar e aguarde a quebra da sequência.', condition: 'Ao observar 4 vitórias seguidas.', objective: 'Evitar o fim de uma longa tendência e proteger os lucros.' }
            ],
            sessionGoal: 'O objetivo é atingir +5 unidades de lucro. Stop-loss em -7 unidades.',
        },
        {
            strategyName: 'Caçador de Empates',
            riskProfile: 'Moderado',
            gameType: 'Football Studio',
            bettingPlan: [
                { step: 1, instruction: 'Aposte 1 unidade em Casa ou Fora (escolha um e mantenha).', condition: 'Em todas as rodadas.', objective: 'Manter o jogo base ativo com uma aposta de alta probabilidade.' },
                { step: 2, instruction: 'Aposte 0.1 unidades em Empate.', condition: 'Em todas as rodadas.', objective: 'Cobrir a aposta de alto pagamento (Empate) com um investimento baixo, buscando um grande retorno.' }
            ],
            sessionGoal: 'O objetivo é acertar um Empate. Stop-loss em -8 unidades.',
        }
    ]),
    'Dragon Tiger Live': () => ({
        strategyName: 'Caçador de Sequências',
        riskProfile: 'Moderado',
        gameType: 'Dragon Tiger Live',
        bettingPlan: [
            { step: 1, instruction: 'Observe 3 vitórias seguidas para o mesmo lado (Dragão ou Tigre).', condition: 'Apenas observe, não aposte.', objective: 'Identificar o início de uma tendência forte antes de arriscar capital.' },
            { step: 2, instruction: 'Na 4ª rodada, aposte 1 unidade no lado que está na sequência de vitórias.', condition: 'Após confirmar a sequência de 3.', objective: 'Capitalizar na continuação da tendência identificada.' },
        ],
        sessionGoal: 'O objetivo é acertar 2 sequências. Stop-loss após 3 tentativas fracassadas.'
    }),
    // ... add more games like Baccarat, etc.
};

export const getAceAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 75;
    const calculatedRiskProfile = payout < 75 ? 'Alto' : payout < 88 ? 'Moderado' : 'Baixo';

    const generator = MASTER_LIST[gameName];
    let chosenStrategy;

    if (generator) {
        chosenStrategy = generator();
    } else {
        // Generic fallback for any other card game
        chosenStrategy = {
            strategyName: 'Estratégia de Aposta Plana',
            riskProfile: 'Baixo',
            gameType: gameName,
            bettingPlan: [
                { step: 1, instruction: 'Escolha uma das apostas principais (ex: Jogador, Banca, Casa) e aposte 1 unidade nela.', condition: 'Início da sessão.', objective: `Manter a consistência e observar o ritmo do ${gameName} com risco mínimo.` },
                { step: 2, instruction: 'Continue apostando 1 unidade na mesma posição, independentemente do resultado.', condition: 'Em todas as rodadas.', objective: 'Evitar progressões de aposta arriscadas e focar na gestão de banca.' }
            ],
            sessionGoal: 'O objetivo é a consistência. Stop-loss em -5 unidades. Meta de lucro em +3 unidades.'
        };
    }
    
    chosenStrategy.riskProfile = calculatedRiskProfile;

    return {
        signalType: 'live',
        ...chosenStrategy,
        aiProfile: 'Ace',
        payingTimeSuggestion: generateAITimeSuggestion(),
        operatingMode: "Inicie no 'Horário de Oportunidade' e siga o 'Plano de Aposta' rodada a rodada. Continue aplicando as regras do plano até atingir a meta de lucro ou o limite de perda definidos no 'Objetivo da Sessão'. Ao atingir um desses pontos, encerre a operação imediatamente.",
        executionStrategy: "Esta estratégia profissional se baseia em disciplina e gestão de risco. Ao seguir um plano de apostas consistente e ter metas claras, você joga contra a sorte e a favor da probabilidade, maximizando suas chances a longo prazo.",
    };
};