import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getMatrixAiPrompt = (
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
    const payout = payoutState.payout;

    const cashoutInstruction = payout < 75
        ? `
        **'cashoutStrategy' (Cenário de ALTO RISCO):** Sua prioridade é a segurança.
        *   **'safe' (OBRIGATÓRIO):** Gere 3 opções conservadoras entre **1.10x e 1.35x**.
        *   **'medium' (OBRIGATÓRIO):** Gere 3 opções cautelosas entre **1.40x e 1.90x**.
        *   **'high' (OBRIGATÓRIO):** Gere 3 opções de "sorte" muito realistas e baixas, entre **2.00x e 2.80x**. Multiplicadores altos são estritamente proibidos neste cenário arriscado.`
        : `
        **'cashoutStrategy' (Cenário de BAIXO RISCO):** Há mais espaço para ambição.
        *   **'safe' (OBRIGATÓRIO):** Gere 3 opções seguras entre **1.20x e 1.50x**.
        *   **'medium' (OBRIGATÓRIO):** Gere 3 opções balanceadas entre **1.70x e 2.80x**.
        *   **'high' (OBRIGATÓRIO):** Gere 3 opções ambiciosas. Para Plinko/Mines, pode ir de **3.00x até 8.00x**. Para jogos de chute, limite a **5.00x**.`;

    const isShootingGame = gameName.toLowerCase().includes('penalty') || gameName.toLowerCase().includes('goal');

    const gameSpecificInstructions = isShootingGame
        ? `
        **DIRETRIZ PARA JOGO DE CHUTE (OBRIGATÓRIO):**
        O jogo '${gameName}' é um jogo de chute. Sua estratégia DEVE ser focada em um plano de ataque claro.
        1.  **'riskLevel'**: Descreva a tática de forma sucinta (ex: 'Mira Dupla Rasteira', 'Ataque Central').
        2.  **'targetCount' (OBRIGATÓRIO):** Gere um número de alvos para o jogador escolher no gol (entre 1 a 5).
        3.  **'shootingStyle' (OBRIGATÓRIO):** Descreva o padrão de chute (ex: 'Alternar entre cantos inferiores', 'Focar no meio, variando altura', 'Chutes rasteiros nas laterais').
        `
        : `
        **DIRETRIZ PARA JOGO DE MATRIZ (OBRIGATÓRIO):**
        O jogo '${gameName}' é um jogo de matriz.
        1.  **'riskLevel'**: Especifique a configuração de risco (ex: '3 Minas', 'Risco Baixo - 8 Linhas').
        2.  Os campos 'targetCount' e 'shootingStyle' NÃO DEVEM ser gerados.
        `;

    return `Você é o 'Matrix AI', um analista especialista em jogos de probabilidade e risco como Mines e Plinko. Sua missão é criar uma estratégia clara e acionável para o jogo '${gameName}'.

    **Análise do Cenário:**
    ${baseInfo}
    ${timeInstruction}
    ${antiRepetitionInstruction}

    **Análise de Risco Mandatória (REGRA CRÍTICA):**
    O índice de análise geral do sistema é ${payoutState.payout}%. Sua resposta DEVE refletir o risco do AMBIENTE no campo 'riskLevel'.
    - **Índice < 75% (Baixo):** O ambiente do jogo é de **ALTO RISCO**.
        - **Estratégia:** Crie uma estratégia DEFENSIVA para proteger o capital. Para Mines, sugira 2-3 minas. Para Plinko, poucas linhas (8). Para jogos de chute, 1-2 alvos.
        - **Campo 'riskLevel' (OBRIGATÓRIO):** O texto DEVE começar com "Risco Alto" ou "Risco Elevado", seguido da configuração. Exemplo: "Risco Alto - 3 Minas", "Risco Elevado - 8 Linhas".
        - **Metas de Cashout:** Devem ser conservadoras, seguindo a diretriz abaixo.
    - **Índice >= 75% (Alto):** O ambiente do jogo é de **BAIXO RISCO**.
        - **Estratégia:** Crie uma estratégia MODERADA para capitalizar na oportunidade. Para Mines, sugira 4-5 minas. Para Plinko, um número médio de linhas (12-14). Para jogos de chute, 2-3 alvos.
        - **Campo 'riskLevel' (OBRIGATÓRIO):** O texto DEVE começar com "Risco Baixo" ou "Risco Moderado". Exemplo: "Risco Baixo - 5 Minas", "Risco Moderado - 14 Linhas".
        - **Metas de Cashout:** Podem ser mais ambiciosas, seguindo a diretriz abaixo.

    **Diretrizes Táticas (OBRIGATÓRIAS):**
    ${gameSpecificInstructions}
    1.  **'strategyName'**: Crie um nome tático para a estratégia (ex: 'Mineração Cautelosa', 'Tiro Certeiro Matrix').
    2.  **'bettingPattern'**: Descreva como o usuário deve gerenciar o valor da aposta (ex: 'Apostas planas de 1 unidade', 'Dobrar a aposta após 3 perdas - Martingale').
    3.  **'cashoutStrategy' (NOVA REGRA MESTRA):** Este campo DEVE ser um objeto contendo três arrays: 'safe', 'medium', e 'high'. Para cada array, gere **3 opções de multiplicadores distintas e realistas** para o cashout, seguindo a diretriz abaixo.
        ${cashoutInstruction}

    **Modo de Operação (OBRIGATÓRIO):**
    No campo 'operatingMode', explique como o jogador deve operar. É uma única tentativa por sinal? Ou ele deve repetir a jogada, seguindo o 'bettingPattern', até o 'Horário Pagante' acabar ou até um lucro ser obtido?
    
    **Execução da Estratégia (OBRIGATÓRIO):**
    Adicionalmente, forneça um campo 'executionStrategy' detalhando o porquê da escolha do nível de risco e do padrão de aposta, e como o jogador deve se portar mentalmente durante o jogo para ter sucesso.

    Gere um JSON Válido.`;
};

export const getMatrixAiSchema = () => ({
    type: Type.OBJECT,
    properties: {
        strategyName: { type: Type.STRING, description: "Nome tático para a estratégia." },
        riskLevel: { type: Type.STRING, description: "A descrição do risco (ex: '3 Minas', 'Mira Dupla Rasteira')." },
        bettingPattern: { type: Type.STRING, description: "A estratégia de gestão de apostas (ex: 'Apostas planas')." },
        cashoutStrategy: {
            type: Type.OBJECT,
            properties: {
                safe: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                medium: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                high: { type: Type.ARRAY, items: { type: Type.NUMBER } },
            },
            required: ['safe', 'medium', 'high']
        },
        payingTimeSuggestion: { type: Type.STRING },
        operatingMode: { type: Type.STRING, description: "Instrução sobre a frequência de jogo (uma vez, continuamente, etc.)." },
        executionStrategy: { type: Type.STRING, description: "Justificativa da estratégia, do risco e dicas de mentalidade." },
        targetCount: { type: Type.NUMBER, description: "Para jogos de chute, o número de alvos a serem selecionados no gol." },
        shootingStyle: { type: Type.STRING, description: "Para jogos de chute, o estilo ou padrão de chute recomendado." },
    },
    required: ['strategyName', 'riskLevel', 'bettingPattern', 'cashoutStrategy', 'payingTimeSuggestion', 'operatingMode', 'executionStrategy'],
});