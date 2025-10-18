import { Type } from "@google/genai";
import type { PayoutState, HistorySignal, CustomStrategyConfig } from '../../types';
import { getBasePrompt, getTimeInstruction, getAntiRepetitionInstruction } from '../promptUtils';

export const getDiamondAiPrompt = (
    gameName: string, 
    gameCategory: string, 
    payoutState: PayoutState, 
    history: HistorySignal[],
    customStrategy: CustomStrategyConfig
): string => {
    if (!payoutState) {
        throw new Error(`Payout state for ${gameName} is not available.`);
    }

    const lastSignalForGame = history.find(s => s.gameName === gameName);
    const antiRepetitionInstruction = getAntiRepetitionInstruction(lastSignalForGame);
    const baseInfo = getBasePrompt(gameName, gameCategory, payoutState, history);
    const timeInstruction = getTimeInstruction(payoutState, gameCategory);
    const { strategyProfile, numberOfAttempts, maxRoundsPerAttempt } = customStrategy;

    const professionalRule = `**REGRA PROFISSIONAL OBRIGATÓRIA (A MAIS IMPORTANTE):** Para adicionar um toque de especialista, qualquer 'attempt' com **8 ou mais rodadas** DEVE OBRIGATORIAMENTE ser do tipo 'Turbo'. 'Attempts' com 7 ou menos rodadas podem ser 'Normais' ou outro tipo, dependendo do perfil. Esta regra se sobrepõe a todas as outras para o tipo de jogada.`;

    let profileInstructions = '';
    switch(strategyProfile) {
        case 'Agressivo':
            profileInstructions = "O Perfil é 'Agressivo'. Crie uma estratégia de alto risco. A sequência deve focar em jogadas 'Turbo' e 'Auto'. Lembre-se da REGRA PROFISSIONAL para 'attempts' com 8+ rodadas.";
            break;
        case 'Oportunista':
            profileInstructions = "O Perfil é 'Oportunista'. Crie uma estratégia focada em aproveitar picos de sorte rápidos. Use 'Turbo' e 'Auto', mas com uma execução de 'entrar e sair'. A REGRA PROFISSIONAL se aplica.";
            break;
        case 'Moderado':
            profileInstructions = "O Perfil é 'Moderado'. Crie um equilíbrio entre jogadas 'Normais' e 'Turbo'. A REGRA PROFISSIONAL definirá quando usar 'Turbo' para contagens de rodadas mais altas.";
            break;
        case 'Conservador':
            profileInstructions = "O Perfil é 'Conservador'. Crie uma estratégia de baixo risco que priorize jogadas 'Normais' para contagens de rodadas mais baixas (7 ou menos). Use 'Turbo' com moderação, especialmente seguindo a REGRA PROFISSIONAL. Não use jogadas 'Auto'.";
            break;
        case 'Defensivo':
            profileInstructions = "O Perfil é 'Defensivo'. Crie a estratégia mais segura possível, focando em jogadas 'Normais' com poucas rodadas. No entanto, se o usuário definir um limite de rodadas alto, você DEVE aplicar a REGRA PROFISSIONAL e transformar 'attempts' com 8+ rodadas em 'Turbo'.";
            break;
        default:
            profileInstructions = "O Perfil é 'Moderado'. Crie um equilíbrio entre jogadas 'Normais' e 'Turbo'. A REGRA PROFISSIONAL definirá quando usar 'Turbo' para contagens de rodadas mais altas.";
    }

    const twoFieldsInstruction = `Gere DOIS campos de texto distintos:
1.  'strategyTips': Uma frase curta e direta explicando O OBJETIVO da sequência (ex: "O objetivo é aquecer o algoritmo com as rodadas normais para buscar um grande prêmio nas rodadas turbo.").
2.  'executionStrategy': Um texto mais detalhado explicando COMO o jogador deve gerenciar suas apostas e sua sessão para maximizar os resultados.`;

    const attemptsInstruction = `A estratégia DEVE ter EXATAMENTE ${numberOfAttempts} 'attempts'.`;
    const roundsInstruction = `O número de 'rounds' em QUALQUER uma das 'attempts' NÃO PODE EXCEDER ${maxRoundsPerAttempt}. Use valores próximos a este máximo para as jogadas de maior impacto, e valores mais baixos para jogadas mais seguras.`;
    
    return `Você é o 'Diamond AI', um gerador de estratégias de slot personalizadas. Sua tarefa é criar uma estratégia profissional para '${gameName}' que siga RIGOROSAMENTE as seguintes diretrizes do usuário:

    ${antiRepetitionInstruction}

    1. **${professionalRule}**
    2. **Diretriz de Perfil (Define o ESTILO GERAL das jogadas):** ${profileInstructions}
    3. **Diretriz de Entradas (Define a QUANTIDADE de 'attempts'):** ${attemptsInstruction}
    4. **Diretriz de Rodadas (Define o LIMITE MÁXIMO de 'rounds'):** ${roundsInstruction}

    Ignore a análise de fluxo atual. Baseie a quantidade e tipo de 'attempts' e 'rounds' exclusivamente nas diretrizes acima, com a REGRA PROFISSIONAL tendo a maior prioridade. O 'strategyProfile' gerado DEVE ser '${strategyProfile}'. Gere o JSON.
    ${twoFieldsInstruction}
    ${baseInfo} ${timeInstruction}`;
};

export const getDiamondAiSchema = () => ({
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
