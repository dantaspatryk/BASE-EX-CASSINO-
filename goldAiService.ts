import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getSlotPrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getGoldAiPrompt = (
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
    const finalSlotInstruction = getSlotPrompt(payoutState);
    
    return `Você é o 'Gold AI', um especialista em jogos da categoria 'Fortune'. Sua missão é criar a melhor estratégia para o jogo '${gameName}', focando em suas mecânicas únicas de re-spin e acúmulo de bônus, adaptando a intensidade com base na análise do fluxo de dados.

    **DIRETRIZ MESTRA (REGRA INQUEBRÁVEL):**
    Sua análise DEVE focar em como ativar a rodada bônus ou o recurso de re-spin do '${gameName}'. A sequência de 'attempts' e os 'strategyTips' precisam refletir essa tática. A estratégia deve ser construída DENTRO do contexto da 'DIRETRIZ DE ANÁLISE' abaixo, que se baseia na diretriz geral de slots.

    **DIRETRIZ DE ANÁLISE (ADAPTAÇÃO DA INTENSIDADE):**
    - **Índice >= 88% (HOT):** Oportunidade máxima. A estratégia deve ser 'Agressiva'. Crie uma sequência longa e intensa (5-6 'attempts') com foco em rodadas 'Turbo' e 'Auto' para forçar a ativação do bônus rapidamente e capitalizar no fluxo de dados alto.
    - **Índice 77%-87% (Alto):** Cenário favorável. A estratégia deve ser 'Oportunista'. Crie uma sequência balanceada (4-5 'attempts') com um mix de rodadas 'Normal', 'Auto' e 'Turbo' para construir o momento e então buscar o bônus.
    - **Índice < 77% (Baixo):** Cenário de risco. A estratégia deve ser 'Defensiva'. Crie uma sequência curta e de baixo custo (2-3 'attempts') usando principalmente rodadas 'Normal' para testar a propensão do jogo a dar o bônus sem arriscar muito a banca.

    O 'executionStrategy' gerado DEVE explicar como essa abordagem tática funciona especificamente para o '${gameName}', considerando o índice de análise de ${payoutState.payout}%.

    ${antiRepetitionInstruction}
    ${finalSlotInstruction}
    ${baseInfo}
    ${timeInstruction}`;
};

export const getGoldAiSchema = () => ({
  type: Type.OBJECT,
  properties: {
    payingTimeSuggestion: { type: Type.STRING },
    strategyProfile: { type: Type.STRING },
    attempts: {
      type: Type.ARRAY,
      items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, rounds: { type: Type.INTEGER } }, required: ['type', 'rounds'] },
    },
    strategyTips: { type: Type.STRING },
    executionStrategy: { type: Type.STRING },
    isLowPayoutSignal: { type: Type.BOOLEAN },
  },
  required: ['payingTimeSuggestion', 'strategyProfile', 'attempts', 'strategyTips', 'executionStrategy', 'isLowPayoutSignal'],
});