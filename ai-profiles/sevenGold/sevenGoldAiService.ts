import { Type } from "@google/genai";
import type { PayoutState, HistorySignal, CrashResult } from '../../types';
import { getBasePrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getSevenGoldAiPrompt = (
    gameName: string, 
    gameCategory: string, 
    payoutState: PayoutState, 
    history: HistorySignal[],
    realTimeHistory?: CrashResult[]
): string => {
    if (!payoutState) {
        throw new Error(`Payout state for ${gameName} is not available.`);
    }

    const lastSignalForGame = history.find(s => s.gameName === gameName);
    const antiRepetitionInstruction = getAntiRepetitionInstruction(lastSignalForGame);
    const baseInfo = getBasePrompt(gameName, gameCategory, payoutState, history);
    const timeInstruction = getTimeInstruction(payoutState, gameCategory);
    const realTimeHistoryData = realTimeHistory ? `Histórico de Resultados em Tempo Real: ${JSON.stringify(realTimeHistory.slice(0, 10))}` : "Nenhum histórico em tempo real disponível.";
    
    return `Você é o 'Seven Gold AI', um especialista em jogos de Crash. Crie uma estratégia de "Caça à Vela Alta" para o jogo '${gameName}'. O objetivo é capturar multiplicadores altos com risco calculado.
    
    **Análise do Cenário:**
    ${baseInfo}
    ${timeInstruction}
    ${realTimeHistoryData}
    ${antiRepetitionInstruction}

    **Análise de Risco Mandatória:**
    O índice de análise geral do sistema é ${payoutState.payout}%.
    - **Índice < 75% (Baixo):** A estratégia DEVE ser mais segura. Priorize um 'entryPattern' que aguarde uma confirmação mais forte (ex: 3 velas baixas seguidas). As metas de saída ('exitPoints') DEVEM ser conservadoras. Talvez não inclua um alvo 'high'.
    - **Índice >= 75% (Alto):** A estratégia pode ser mais ousada, buscando 'velas altas' com padrões de entrada mais rápidos e incluindo metas de saída 'high'.

    **Diretrizes Táticas (OBRIGATÓRIAS):**
    1.  **Analise o Histórico em Tempo Real:** Baseie seu 'entryPattern' (padrão de entrada) nos resultados recentes fornecidos.
    2.  **Múltiplas Metas de Saída (NOVA REGRA MESTRA):** Para cada categoria de risco ('safe', 'medium', 'high') que você decidir incluir, você DEVE gerar uma lista de **3 opções de multiplicadores distintas**.
        *   **'safe' (OBRIGATÓRIO):** Gere 3 opções entre **1.15x e 1.45x**.
        *   **'medium':** Gere 3 opções entre **1.60x e 2.50x**.
        *   **'high':** Gere 3 opções entre **3.00x e 8.00x**.
        *   **Exemplo:** Para 'safe', o resultado no JSON deve ser \`"multipliers": [1.19, 1.27, 1.41]\`.
    
    **Modo de Operação (OBRIGATÓRIO):**
    No campo 'operatingMode', explique de forma clara e direta como o jogador deve agir DENTRO do 'Horário de Oportunidade'. Responda a estas perguntas: A estratégia é para uma única entrada? Ou o jogador deve repetir a entrada toda vez que o 'entryPattern' ocorrer dentro da janela de tempo?

    **Execução da Estratégia (OBRIGATÓRIO):**
    Gere também um campo 'executionStrategy' que explique em detalhes a lógica tática por trás do padrão de entrada, das metas de saída, e como gerenciar o risco durante a sessão, sempre com um tom profissional e confiante.

    Gere um JSON Válido.`;
};

export const getSevenGoldAiSchema = () => ({
    type: Type.OBJECT,
    properties: {
        payingTimeSuggestion: { type: Type.STRING },
        strategyName: { type: Type.STRING },
        entryPattern: { type: Type.STRING },
        exitPoints: { 
            type: Type.ARRAY, 
            items: { 
                type: Type.OBJECT, 
                properties: { 
                    multipliers: { type: Type.ARRAY, items: {type: Type.NUMBER} }, 
                    type: { type: Type.STRING, enum: ['safe', 'medium', 'high'] } 
                },
                required: ['multipliers', 'type']
            } 
        },
        maxLossStreak: { type: Type.INTEGER },
        operatingMode: { type: Type.STRING, description: "Instrução clara sobre como operar dentro da janela de tempo (ex: entrar uma vez, repetir a cada padrão)." },
        executionStrategy: { type: Type.STRING, description: "Explicação detalhada da lógica da estratégia e gestão de risco." },
    },
    required: ['payingTimeSuggestion', 'strategyName', 'entryPattern', 'exitPoints', 'maxLossStreak', 'operatingMode', 'executionStrategy'],
});
