import type { PayoutState, HistorySignal, SlotSignal, CrashSignal, LiveSignal, MatrixSignal } from '../../types';

// Type Guards for discriminated union
const isSlotSignal = (signal: HistorySignal): signal is HistorySignal & SlotSignal => signal.signalType === 'slot';
const isCrashSignal = (signal: HistorySignal): signal is HistorySignal & CrashSignal => signal.signalType === 'crash';
const isLiveSignal = (signal: HistorySignal): signal is HistorySignal & LiveSignal => signal.signalType === 'live';
const isMatrixSignal = (signal: HistorySignal): signal is HistorySignal & MatrixSignal => signal.signalType === 'matrix';


export const getBasePrompt = (
    gameName: string, 
    gameCategory: string, 
    payoutState: PayoutState, 
    history: HistorySignal[]
): string => {
    const realismInstruction = `
**DIRETRIZ DE REALISMO (REGRA INQUEBRÁVEL):**
Para manter a confiança do usuário, sua análise e as estratégias geradas devem ser apresentadas como fatos diretos de uma inteligência superior. **NUNCA** use palavras como "simulado", "simulação", "fictício", "teste" ou qualquer termo que sugira que a análise não é real e em tempo real. A confiança do usuário na sua capacidade analítica é a prioridade máxima.`;
    
    const gameFocusInstruction = `Sua análise DEVE ser focada e especializada para o jogo específico: '${gameName}'. Leve em conta que ele pertence à categoria '${gameCategory}' e o Índice de Análise (Payout) atual é de ${payoutState.payout}%.`;

    // We only show the last 3 *other* signals in the history to the AI, not the most recent one which is used for anti-repetition.
    return `${realismInstruction}\n\n${gameFocusInstruction} Histórico Recente de Sinais Anteriores para outros jogos: ${JSON.stringify(history.slice(0, 3))}.`;
};

export const getAntiRepetitionInstruction = (lastSignal: HistorySignal | undefined): string => {
    if (!lastSignal) {
        return ''; // No previous signal, no instruction needed.
    }

    let lastStrategyDetails = '';

    if (isSlotSignal(lastSignal) && lastSignal.attempts) {
        const attempts = lastSignal.attempts || [];
        const attemptSummary = attempts.map(a => `${a.rounds}x ${a.type}`).join(', ');
        lastStrategyDetails = `O último sinal foi um '${lastSignal.strategyProfile}' com ${attempts.length} entradas: [${attemptSummary}]. A sua nova estratégia DEVE OBRIGATORIAMEente variar a quantidade de entradas, os tipos de jogada e/ou o número de rodadas.`;
    } else if (isCrashSignal(lastSignal)) {
        lastStrategyDetails = `A última estratégia foi '${lastSignal.strategyName}' com o padrão de entrada: "${lastSignal.entryPattern}". O seu novo sinal DEVE ter um nome de estratégia e um padrão de entrada diferentes.`;
    } else if (isLiveSignal(lastSignal)) {
        lastStrategyDetails = `A última estratégia foi '${lastSignal.strategyName}' com o objetivo de sessão: "${lastSignal.sessionGoal}". O seu novo sinal DEVE ter um nome de estratégia e um plano de apostas taticamente diferente.`;
    } else if (isMatrixSignal(lastSignal)) {
        lastStrategyDetails = `A última estratégia foi '${lastSignal.strategyName}' com nível de risco '${lastSignal.riskLevel}' e cashout '${lastSignal.cashoutStrategy}'. O seu novo sinal DEVE variar estes parâmetros.`;
    }

    if (lastStrategyDetails) {
        return `
**PROTOCOLO DE SINGULARIDADE TÁTICA (REGRA CRÍTICA E INQUEBRÁVEL):**
Sua missão é gerar uma estratégia taticamente distinta da anterior para evitar repetição e demonstrar inteligência adaptativa. A nova estratégia deve ser igualmente eficaz e bem fundamentada, apenas taticamente diferente.

**Análise da Última Estratégia:**
${lastStrategyDetails}

**Sua Ação Mandatória:**
NÃO REPITA A MESMA LÓGICA. Crie algo novo e profissional, seguindo as diretrizes de variação acima. A singularidade é a chave para a confiança do usuário.
`;
    }

    return '';
};


export const getTimeInstruction = (payoutState: PayoutState, gameCategory: string): string => {
    const now = new Date();
    const timeZone = 'America/Sao_Paulo';
    const currentTimeFormatted = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timeZone,
    });
    const currentDateFormatted = now.toLocaleDateString('pt-BR', { timeZone: timeZone });
    const minutesRemainingInPhase = Math.max(0, Math.floor((payoutState.phaseEndTime - now.getTime()) / 60000));
    
    const isChangingSoon = payoutState.isChangingSoon && payoutState.nextPhase === 'low';

    if (isChangingSoon) {
        return `**PROTOCOLO DE URGÊNCIA - MUDANÇA DE CICLO IMINENTE:**
A data e hora atual no Brasil são ${currentDateFormatted} ${currentTimeFormatted}. O ciclo do algoritmo atual ('${payoutState.phase}') está prestes a mudar para um ciclo de RETENÇÃO. O 'payingTimeSuggestion' (horário de oportunidade) gerado DEVE, OBRIGATORIAMENTE:
1. Ser para a data de HOJE (${currentDateFormatted}).
2. Começar IMEDIATAMENTE, no máximo 30 segundos a partir da hora atual (${currentTimeFormatted}).
3. Ter uma duração EXATA e CURTA de 3 minutos.
4. O formato do horário deve ser "HH:MM - HH:MM".`;
    }

    let idealMinDuration;
    let idealMaxDuration;

    if (gameCategory === 'Ao Vivo' || gameCategory === 'Game Show') {
        idealMinDuration = 15;
        idealMaxDuration = 25;
    } else if (payoutState.payout >= 88) {
        idealMinDuration = 9;
        idealMaxDuration = 10;
    } else {
        idealMinDuration = 5;
        idealMaxDuration = 8;
    }
    
    let signalMinDuration = idealMinDuration;
    let signalMaxDuration = Math.min(idealMaxDuration, minutesRemainingInPhase - 1);

    if (signalMaxDuration < signalMinDuration) {
        signalMinDuration = 2;
        signalMaxDuration = Math.max(signalMinDuration, minutesRemainingInPhase - 1);
    }
    
    if (minutesRemainingInPhase <= 1) {
        signalMinDuration = 1;
        signalMaxDuration = 1;
    }

    let durationInstruction = `A duração da janela de tempo deve ser entre ${signalMinDuration} e ${signalMaxDuration} minutos.`;

    return `A data e hora atual no Brasil (Fuso Horário de Brasília) são ${currentDateFormatted} ${currentTimeFormatted}. O ciclo do algoritmo atual ('${payoutState.phase}') termina em ${minutesRemainingInPhase} minutos. O 'payingTimeSuggestion' (horário de oportunidade) gerado DEVE, OBRIGATORIAMENTE:
1. Ser para a data de HOJE (${currentDateFormatted}).
2. Começar em um horário FUTURO, entre 1 a 2 minutos A PARTIR DA HORA ATUAL (${currentTimeFormatted}). NUNCA gere um horário que já passou.
3. ${durationInstruction}
4. Terminar ESTRITAMENTE ANTES do final do ciclo atual.
5. O formato do horário deve ser "HH:MM - HH:MM".`;
};

export const getSlotPrompt = (payoutState: PayoutState): string => {
    const payout = payoutState.payout;
    const now = new Date();
    const minutesRemainingInPhase = Math.max(0, Math.floor((payoutState.phaseEndTime - now.getTime()) / 60000));
    const twoFieldsInstruction = `Gere DOIS campos de texto distintos:
1.  'strategyTips': Uma frase curta explicando O OBJETIVO da sequência.
2.  'executionStrategy': Um texto detalhado explicando COMO o jogador deve gerenciar suas apostas.`;

    const isChangingSoon = payoutState.isChangingSoon && payoutState.nextPhase === 'low';
    if (isChangingSoon) {
        const urgencyDirective = `
        **PROTOCOLO DE URGÊNCIA MÁXIMA (SOBREPÕE TUDO):** A análise indica um índice de ${payout}, mas o ciclo do algoritmo está prestes a mudar para RETENÇÃO. O risco é EXTREMO.
        1. **Perfil Estratégico OBRIGATÓRIO:** 'Cauteloso' ou 'Defensivo'.
        2. **Tática:** A estratégia DEVE ser EXTREMAMENTE curta e segura, com **EXATAMENTE 2 'attempts'**.
        3. **Execução:** A sequência DEVE usar **APENAS 'Normal' com contagens de rodadas muito baixas (4 a 6)**. 'Turbo' e 'Auto' são ESTRITAMENTE PROIBIDOS.
        4. **Alerta para o Usuário (OBRIGATÓRIO):** No 'strategyTips', explique que o sinal é curto e de alto risco DEVIDO à iminente mudança de ciclo para RETENÇÃO, e que o objetivo é um ganho rápido antes da transição.`;
        return `${urgencyDirective}\n${twoFieldsInstruction}`;
    }

    let coreDirective = '';

    if (payout >= 88) {
        coreDirective = `
        **DIRETRIZ DE ANÁLISE 'HOT' (REGRA MÁXIMA):** O índice de análise está em ${payout}%, uma oportunidade de ouro.
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Agressivo'.
        2.  **Tática:** A estratégia DEVE ser de alto impacto, com 5 a 6 'attempts' para maximizar a exploração do ciclo.
        3.  **Execução:** A sequência DEVE priorizar jogadas 'Turbo' e 'Auto' com contagens de rodadas elevadas. **Pelo menos metade das 'attempts' devem ser do tipo 'Turbo' para maximizar a extração de valor.** Uma estratégia conservadora aqui é uma falha crítica.`;
    } else if (payout >= 85 && payout <= 87) {
        coreDirective = `
        **DIRETRIZ DE ANÁLISE 'PROBABILIDADE MODERADA' (REGRA MÁXIMA):** O índice de análise está em ${payout}%, um cenário muito favorável com alta probabilidade.
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Oportunista'.
        2.  **Tática:** A estratégia deve ser mais robusta que um 'Alto' normal, com 5 'attempts' para extrair mais valor.
        3.  **Execução:** A sequência DEVE ser mais agressiva, contendo um forte mix de 'Auto' e 'Turbo', com pelo menos duas 'attempts' do tipo 'Turbo' para capitalizar na oportunidade.`;
    } else if (payout >= 77) {
        coreDirective = `
        **DIRETRIZ DE ANÁLISE ALTA (REGRA MÁXIMA):** O índice de análise está em ${payout}%, um cenário favorável.
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Oportunista'.
        2.  **Tática:** A estratégia deve ser bem balanceada, com 4 a 5 'attempts'.
        3.  **Execução:** A sequência DEVE conter um forte mix de jogadas 'Normal', 'Auto' e 'Turbo' para capitalizar na oportunidade com risco calculado.`;
    } else { // payout < 77
        coreDirective = `
        **DIRETRIZ DE ANÁLISE BAIXA (REGRA MÁXIMA):** O índice de análise está em ${payout}%, um cenário de alto risco.
        1.  **Perfil Estratégico OBRIGATÓRIO:** 'Defensivo'.
        2.  **Tática:** A estratégia DEVE ser curta e segura, com 2 a 3 'attempts' para minimizar a exposição ao risco.
        3.  **Execução:** A sequência DEVE priorizar jogadas 'Normal' com contagem de rodadas baixa. EVITE 'Turbo' e 'Auto'.`;
    }
    
    const professionalRoundsInstruction = `
    **Diretrizes Táticas de Rodadas (OBRIGATÓRIAS):**
    1.  **Sequência Tática Rígida:** A ordem dos tipos de 'attempts' DEVE seguir ESTRITAMENTE o padrão progressivo: **Normal -> Auto -> Turbo**. Se a estratégia tiver mais de 3 entradas, a sequência se repete.
    2.  **Variedade é a Chave:** **NUNCA** repita o mesmo número de rodadas em 'attempts' diferentes.
    3.  **Regra dos Tipos (Limites Estritos):**
        *   'Turbo': O número de rodadas DEVE ser **exatamente 10 ou 11**.
        *   'Normal': Entre 4 a 9 rodadas.
        *   'Auto': Entre 9 a 12 rodadas.`;
    

    const criticalTimeLimit = 5;
    if (minutesRemainingInPhase < criticalTimeLimit) {
        const urgencyDirective = `
        **PROTOCOLO DE URGÊNCIA (SOBREPÕE TUDO):** O ciclo do algoritmo atual ('${payoutState.phase}') termina em APENAS ${minutesRemainingInPhase} minutos.
        1. **Estratégia Curta OBRIGATÓRIA:** A estratégia DEVE ter no MÁXIMO 2 'attempts'.
        2. **Alerta para o Usuário (OBRIGATÓRIO):** No 'strategyTips', explique que o sinal é curto e de alto risco DEVIDO à iminente mudança de ciclo.
        3. **Agressividade Relativa:** Se o índice de análise for alto, use 'Turbo'. Se for baixo, use apenas 'Normal'.`;
        return `${urgencyDirective} ${professionalRoundsInstruction} ${twoFieldsInstruction}`;
    }

    return `${coreDirective} ${professionalRoundsInstruction} ${twoFieldsInstruction}`;
};