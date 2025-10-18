import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getShowtimeAiPrompt = (
    gameName: string, 
    gameCategory: string, 
    payoutState: PayoutState, 
    history: HistorySignal[]
): string => {
    if (!payoutState) {
        throw new Error(`Payout state for ${gameName} is not available.`);
    }

    const lastSignalForGame = history.find(s => s.gameName === gameName);
    const antiRepetitionInstruction = getAntiRepetitionInstruction(lastSignalForGame);
    const baseInfo = getBasePrompt(gameName, gameCategory, payoutState, history);
    const timeInstruction = getTimeInstruction(payoutState, gameCategory);

    const gameSpecificInstructions = `
        **Diretrizes Táticas para Game Shows de Roda/Roleta/Dados (OBRIGATÓRIAS):**
        1.  **Foco nos Bônus e Multiplicadores:** A estratégia DEVE ter um componente claro focado em como apostar nas rodadas de bônus ou segmentos com multiplicadores do '${gameName}'. Explique por que essa é a chave para grandes ganhos.
        2.  **Gestão de Banca:** O 'bettingPlan' deve equilibrar apostas nos números/segmentos base (mais prováveis) com apostas menores nos bônus para garantir a longevidade da sessão.
        3.  **Especificidade:** As instruções DEVEM ser claras e nomear os segmentos de aposta (ex: 'Aposte 1 unidade em "Coin Flip"', 'Aposte 2 unidades no número 5', 'Aposte 1 unidade na Cor Vermelha').
    `;


    return `Você é o 'Showtime AI', um especialista em Game Shows de cassino Ao Vivo baseados em rodas, roletas ou dados. Sua missão é criar uma estratégia de apostas divertida e tática para o jogo '${gameName}'.

    **Análise do Cenário:**
    ${baseInfo}
    ${timeInstruction}
    ${antiRepetitionInstruction}

    **Análise de Risco Mandatória (REGRA CRÍTICA):**
    O índice de análise geral do sistema é ${payoutState.payout}%.
    - **Índice < 75% (Baixo):** O 'riskProfile' DEVE ser 'Alto'. A estratégia deve ser conservadora, focando nas apostas mais prováveis e cobrindo bônus com valores muito baixos.
    - **Índice >= 75% (Alto):** O 'riskProfile' pode ser 'Moderado' ou 'Baixo'. A estratégia deve ser mais ousada, cobrindo múltiplas ou todas as casas de bônus para maximizar a chance de um grande multiplicador.

    ${gameSpecificInstructions}

    4.  **'gameType' (OBRIGATÓRIO):** O campo no JSON DEVE ser exatamente '${gameName}'.
    
    **Modo de Operação (OBRIGATÓRIO):**
    No campo 'operatingMode', explique como o jogador deve operar. Ele deve seguir o 'bettingPlan' em todas as rodadas dentro do 'Horário de Oportunidade' até que o 'sessionGoal' (lucro ou perda) seja alcançado? Deixe claro que a operação deve parar ao atingir a meta.

    **Execução da Estratégia (OBRIGATÓRIO):**
    Crie um campo 'executionStrategy' que explique por que a estratégia foca nesses bônus específicos e como o jogador deve gerenciar a expectativa e a banca enquanto busca os grandes multiplicadores.

    Gere um JSON Válido.`;
};

// Reusing the LiveSignal schema as it fits game shows well
export const getShowtimeAiSchema = () => ({
    type: Type.OBJECT,
    properties: {
        strategyName: { type: Type.STRING, description: "Um nome criativo e temático para a estratégia." },
        riskProfile: { type: Type.STRING, description: "O perfil de risco (Baixo, Moderado, Alto)." },
        gameType: { type: Type.STRING, description: "O nome do Game Show." },
        bettingPlan: {
            type: Type.ARRAY,
            description: "Plano de apostas passo a passo.",
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER },
                    instruction: { type: Type.STRING, description: "Instrução clara, nomeando o local da aposta (ex: 'Aposte 1 unidade em Pachinko')." },
                    condition: { type: Type.STRING },
                    objective: { type: Type.STRING },
                },
                required: ['step', 'instruction', 'condition', 'objective']
            }
        },
        sessionGoal: { type: Type.STRING, description: "Meta de lucro e limite de perda (stop-loss)." },
        payingTimeSuggestion: { type: Type.STRING },
        operatingMode: { type: Type.STRING, description: "Explicação sobre como executar o plano de apostas dentro da sessão." },
        executionStrategy: { type: Type.STRING, description: "Explicação da tática de bônus e gestão de expectativa/banca." },
    },
    required: ['strategyName', 'riskProfile', 'gameType', 'bettingPlan', 'sessionGoal', 'payingTimeSuggestion', 'operatingMode', 'executionStrategy'],
});
