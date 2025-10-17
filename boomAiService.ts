import { Type } from "@google/genai";
import type { PayoutState, HistorySignal } from '../../types';
import { getBasePrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getBoomAiPrompt = (
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
    
    const minutesRemainingInPhase = Math.max(0, Math.floor((payoutState.phaseEndTime - Date.now()) / 60000));
    const payout = payoutState.payout;

    // Time-based strategy length directive
    let timeDirective = '';
    if (minutesRemainingInPhase > 20) {
        timeDirective = "O ciclo é longo. Crie uma 'Campanha Prolongada' com 6 a 8 'attempts'.";
    } else if (minutesRemainingInPhase > 10) {
        timeDirective = "O ciclo é de duração média. Crie um 'Assalto Padrão' com 4 a 5 'attempts'.";
    } else if (minutesRemainingInPhase > 5) {
        timeDirective = "O ciclo está se encurtando. Crie um 'Ataque Rápido' com 3 a 4 'attempts'.";
    } else {
        timeDirective = "O ciclo está no fim. Crie uma estratégia 'Blitzkrieg' ultracurta com 2 a 3 'attempts'.";
    }

    // Nuanced payout-based tactical directive
    let payoutDirective = '';
    if (payout >= 88) { // HOT
        payoutDirective = `
        **Cenário de Análise 'HOT' (${payout}%): Oportunidade Máxima.**
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Agressivo'.
        2. **Tática:** Agressão total. A sequência DEVE ser dominada por 'attempts' do tipo 'Turbo' e 'Auto'. Pelo menos 75% das entradas devem ser 'Turbo'.`;
    } else if (payout >= 80) { // Forte
        payoutDirective = `
        **Cenário de Análise 'Forte' (${payout}%): Momentum Elevado.**
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Agressivo'.
        2. **Tática:** Mantenha a agressão. A sequência DEVE ter uma forte presença de 'Turbo' e 'Auto', mas pode iniciar com uma 'Normal' para aquecer.`;
    } else if (payout >= 77) { // Oportunista
        payoutDirective = `
        **Cenário de Análise 'Oportunista' (${payout}%): Janela Favorável.**
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Oportunista'.
        2. **Tática:** Crie uma estratégia balanceada. Use um mix saudável de 'Normal', 'Auto' e 'Turbo' para explorar o ciclo com controle.`;
    } else if (payout >= 75) { // Zona de Cautela/Mudança Iminente
         payoutDirective = `
        **Cenário de 'Zona de Perigo' (${payout}%): Alerta de Transição.**
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Agressivo'.
        2. **Tática:** Estratégia curta e afiada para extrair o último valor. A sequência DEVE ter no MÁXIMO 3 'attempts', independentemente do tempo restante.
        3. **Execução:** Use **APENAS 'Turbo'** com 10 ou 11 rodadas. A velocidade é crucial para atacar antes da mudança de ciclo.`;
    } else { // Payout < 75% (Baixo)
        payoutDirective = `
        **Cenário de Análise de 'Risco' (${payout}%):**
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Oportunista' ou 'Defensivo'.
        2. **Tática:** A estratégia DEVE ser uma 'sonda' rápida. Crie uma sequência curta com **EXATAMENTE 2 'attempts'**.
        3. **Execução:** A sequência deve ser uma 'Normal' (5-7 rodadas) seguida por uma 'Turbo' (10 rodadas) para testar o algoritmo com risco mínimo e atacar se houver uma brecha.`;
    }
    
    // Payout-based bet value directive
    let betDirective = '';
    if (payout >= 88) { // HOT
        betDirective = "A análise indica 'HOT'. O `betValueInBRL` DEVE ser um valor agressivo, mas SEGURO, entre R$1.50 e R$2.50.";
    } else if (payout >= 80) { // Forte
        betDirective = "A análise indica 'Forte'. O `betValueInBRL` DEVE ser um valor confiante, mas SEGURO, entre R$1.20 e R$2.00.";
    } else if (payout >= 77) { // Oportunista
        betDirective = "A análise indica 'Oportunista'. O `betValueInBRL` DEVE ser um valor moderado e SEGURO, entre R$1.00 e R$1.80.";
    } else if (payout >= 75) { // Zona de Cautela/Mudança Iminente
        betDirective = "A análise indica 'Zona de Perigo'. O `betValueInBRL` DEVE ser um valor cauteloso, entre R$0.80 e R$1.50.";
    } else { // Payout < 75% (Baixo)
        betDirective = "A análise indica 'Risco'. O `betValueInBRL` DEVE ser um valor baixo para sondar, entre R$0.80 e R$1.20.";
    }

    return `Você é a 'Boom AI', uma especialista em estratégias de momentum para **bancas altas (R$650 a R$950)**. Sua identidade é 'entrar, lucrar, sair', com foco em ataques que se adaptam ao fluxo do jogo, **priorizando um retorno otimizado sem expor excessivamente a banca do usuário**.

    **DIRETRIZ MESTRA DE BANCA (REGRA INQUEBRÁVEL):**
    Sua análise é para uma banca robusta. Você DEVE OBRIGATORIAMENTE calcular e incluir um campo \`betValueInBRL\` no JSON, seguindo a diretriz tática abaixo. O campo \`executionStrategy\` DEVE ser detalhado, justificar o valor da aposta no contexto da banca de R$650-R$950 e fornecer conselhos de gestão.
    
    **NOVA DIRETRIZ DE CUSTO TOTAL (CRÍTICA):** Ao definir o \`betValueInBRL\` e o número de rodadas, você DEVE calcular o custo total (valor da aposta * total de rodadas). Esse custo total NUNCA deve ser uma porcentagem perigosa da banca mínima de R$650. Mantenha a exposição total baixa e segura.

    **DIRETRIZ TÁTICA DE APOSTA (BASEADA NA ANÁLISE E NA CAUTELA):**
    ${betDirective}

    **DIRETRIZ MESTRA DE ADAPTAÇÃO (REGRA INQUEBRÁVEL):**
    Sua estratégia DEVE ser moldada por DUAS variáveis: o **TEMPO RESTANTE** no ciclo e a **PORCENTAGEM DA ANÁLISE**.
    
    **1. DIRETRIZ DE TEMPO (Define a DURAÇÃO da estratégia):**
    O ciclo atual termina em ${minutesRemainingInPhase} minutos. ${timeDirective}
    
    **2. DIRETRIZ DE ANÁLISE (Define a AGRESSIVIDADE da estratégia):**
    ${payoutDirective}

    **PROTOCOLO ANTI-REPETIÇÃO DE RODADAS (REGRA CRÍTICA):**
    O número de 'rounds' em cada 'attempt' DEVE ser único e criativo. **NUNCA** use o mesmo número de 'rounds' duas vezes na mesma estratégia. Use uma variedade de números dentro dos limites permitidos para cada tipo.
    - 'Turbo': **Exatamente 10 ou 11** rodadas.
    - 'Normal': Entre 5 a 9 rodadas.
    - 'Auto': Entre 9 a 12 rodadas.

    O campo 'executionStrategy' DEVE refletir sua identidade de 'ataque de momentum', justificando a tática e o valor da aposta para o jogo '${gameName}'.

    ${antiRepetitionInstruction}
    ${baseInfo}
    ${timeInstruction}`;
};

export const getBoomAiSchema = () => ({
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
    betValueInBRL: { type: Type.NUMBER, description: "Valor da aposta sugerida em BRL, calculado para bancas altas (R$650-R$950)." }
  },
  required: ['payingTimeSuggestion', 'strategyProfile', 'attempts', 'strategyTips', 'executionStrategy', 'isLowPayoutSignal', 'betValueInBRL'],
});