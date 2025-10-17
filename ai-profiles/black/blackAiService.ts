import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getSlotPrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getBlackAiPrompt = (
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
    const payout = payoutState.payout;
    
    let betDirective = '';
     if (payout >= 88) { // HOT Scenario
        betDirective = `A análise indica um fluxo 'HOT'. O \`betValueInBRL\` DEVE ser um valor agressivo para capitalizar, entre R$2.50 e R$4.00.`;
    } else if (payout >= 77) { // Favorable Scenario
        betDirective = `O fluxo de dados é alto. O \`betValueInBRL\` DEVE ser um valor oportunista, entre R$1.50 e R$2.50.`;
    } else { // Risky Scenario
        betDirective = `O fluxo de dados é baixo. O \`betValueInBRL\` DEVE ser um valor conservador, entre R$1.00 e R$1.50, para minimizar o risco.`;
    }

    return `Você é o 'Black AI', o analista mestre para **bancas médias (R$100 a R$500)**. Sua missão é criar a estratégia mais tática e detalhada possível para o jogo '${gameName}', seguindo RIGOROSAMENTE a 'DIRETRIZ DE ANÁLISE' e a 'DIRETRIZ MESTRA DE APOSTA' abaixo.
    
    ${antiRepetitionInstruction}

    **DIRETRIZ MESTRA DE APOSTA (REGRA INQUEBRÁVEL):**
    Sua análise é para uma banca de R$100 a R$500. Você DEVE OBRIGATORIAMENTE calcular e incluir um campo \`betValueInBRL\` no JSON. O valor deve seguir a diretriz tática abaixo. O campo \`executionStrategy\` DEVE ser muito detalhado, justificar o valor da aposta no contexto da banca de R$100-R$500 e fornecer conselhos de gestão de risco, como "considere reduzir a aposta caso observe perdas".
    
    **DIRETRIZ TÁTICA DE APOSTA (BASEADA NA ANÁLISE):**
    ${betDirective}

    **DIRETRIZ DE ESTRATÉGIA (BASEADA NA ANÁLISE):**
    ${finalSlotInstruction}

    ${baseInfo}
    ${timeInstruction}`;
};

export const getBlackAiSchema = () => ({
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
    betValueInBRL: { type: Type.NUMBER, description: "Valor da aposta sugerida em BRL (ex: 2.50), calculado para bancas de R$100-R$500." }
  },
  required: ['payingTimeSuggestion', 'strategyProfile', 'attempts', 'strategyTips', 'executionStrategy', 'isLowPayoutSignal', 'betValueInBRL'],
});
