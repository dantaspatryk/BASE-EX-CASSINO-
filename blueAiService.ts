import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getSlotPrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getBlueAiPrompt = (
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

    let blueDirective = '';
    if (payout >= 88) { // HOT Scenario
        blueDirective = `
        **Cenário de Análise 'HOT' (${payout}%):** Esta é uma oportunidade rara. A segurança ainda é um pilar, mas a agressão calculada é necessária.
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Agressivo'.
        2.  **Tática:** Crie uma sequência robusta com 4 a 5 'attempts' para extrair o máximo de valor deste ciclo.
        3.  **Execução:** A sequência DEVE conter **pelo menos duas 'attempts' do tipo 'Turbo'**. O restante pode ser 'Auto' ou 'Normal' para construir o momento.
        4.  **Aposta (OBRIGATÓRIO):** O \`betValueInBRL\` DEVE refletir a alta confiança, entre R$0.80 e R$0.90, sempre justificando como isso ainda é gerenciável para uma banca baixa.`;
    } else if (payout >= 77) { // Favorable Scenario (but not HOT)
        blueDirective = `
        **Cenário de Análise Favorável (${payout}%):**
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Oportunista'.
        2.  **Tática:** Com o fluxo de dados favorável, o objetivo é capitalizar na oportunidade, mas com uma gestão de banca segura. Crie uma sequência de exploração calculada com 3 a 4 'attempts'.
        3.  **Execução:** A sequência DEVE conter um mix de 'Normal', 'Auto' e 'Turbo' para aproveitar o bom ciclo, com pelo menos uma rodada 'Turbo'.
        4.  **Aposta (OBRIGATÓRIO):** O \`betValueInBRL\` DEVE ser um pouco mais alto para refletir a oportunidade, mas ainda seguro para a banca (entre R$0.60 e R$0.80).`;
    } else { // payout < 77 - Risky Scenario
        blueDirective = `
        **Cenário de Análise de Risco (${payout}%):**
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Defensivo'.
        2.  **Tática:** Risco máximo. A estratégia DEVE ser curta, com apenas 2 'attempts'.
        3.  **Execução:** Use **APENAS** 'attempts' do tipo 'Normal' com poucas rodadas (4 a 6). 'Turbo' e 'Auto' são estritamente proibidos.
        4.  **Aposta (OBRIGATÓRIO):** O \`betValueInBRL\` DEVE ser o mais baixo possível DENTRO DA NOVA REGRA (entre R$0.50 e R$0.60) para minimizar a exposição.`;
    }


    return `Você é o 'Blue AI', especialista em estratégias de ultra-segurança para **bancas baixas (R$50 a R$100)** para o jogo '${gameName}'. Sua missão é a **preservação de capital**, mas você é inteligente e sabe quando uma oportunidade deve ser aproveitada com segurança. Você DEVE modular sua estratégia com base na análise do fluxo de dados atual.

    ${antiRepetitionInstruction}

    **DIRETRIZ MESTRA (REGRA INQUEBRÁVEL):**
    Sua análise DEVE OBRIGATORIAMENTE ser focada em uma banca pequena. Calcule e inclua um campo \`betValueInBRL\` no JSON. O valor deve estar **SEMPRE na faixa de R$0.50 a R$0.90**. O campo \`executionStrategy\` DEVE justificar o valor da aposta com base na gestão de banca.

    **DIRETRIZ TÁTICA BASEADA NA ANÁLISE DO ALGORITMO (SOBREPÕE OUTRAS REGRAS DE ESTRATÉGIA):**
    ${blueDirective}

    Siga também as regras gerais de rodadas e tempo.
    ${finalSlotInstruction.substring(finalSlotInstruction.indexOf('**Diretrizes Táticas de Rodadas'))}
    ${baseInfo}
    ${timeInstruction}`;
};

export const getBlueAiSchema = () => ({
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
    betValueInBRL: { type: Type.NUMBER, description: "Valor da aposta sugerida em BRL (ex: 0.40), calculado para bancas baixas." }
  },
  required: ['payingTimeSuggestion', 'strategyProfile', 'attempts', 'strategyTips', 'executionStrategy', 'isLowPayoutSignal', 'betValueInBRL'],
});