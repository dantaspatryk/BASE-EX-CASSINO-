import type { GeneratedSignal, PayoutState, MatrixSignal } from '../../types';
import { generateAITimeSuggestion, generateMultiplierOptions } from '../utils';

/**
 * Builds a fallback signal for Matrix-based games like Mines or Plinko.
 * @param {PayoutState} payoutState - The current payout state of the game.
 * @param {string} gameName - The name of the game.
 * @returns {MatrixSignal} A dynamically generated, realistic MatrixSignal.
 */
export const getMatrixAiFallback = (payoutState: PayoutState, gameName: string): GeneratedSignal => {
    const payout = payoutState?.payout ?? 75;

    let signal: Partial<MatrixSignal> = {};
    const isShootingGame = gameName.toLowerCase().includes('penalty') || gameName.toLowerCase().includes('goal');

    if (isShootingGame) {
        signal.strategyName = 'Tiro Certeiro Tático';
        signal.bettingPattern = 'Apostas planas. Se 2 vitórias seguidas, aumente 50% por uma rodada.';
        
        if (payout < 80) {
            signal.riskLevel = 'Risco Alto - 2 Alvos';
            signal.targetCount = 2;
            signal.shootingStyle = 'Alternar chutes nos cantos inferiores (esquerdo/direito).';
            signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.18, 1.35),
                medium: generateMultiplierOptions(1.50, 1.90),
                high: generateMultiplierOptions(2.00, 2.50)
            };
        } else {
            signal.riskLevel = 'Risco Baixo - 3 Alvos';
            signal.targetCount = 3;
            signal.shootingStyle = 'Variar entre os 2 cantos inferiores e um chute alto no meio.';
             signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.25, 1.55),
                medium: generateMultiplierOptions(1.75, 2.80),
                high: generateMultiplierOptions(3.20, 5.50)
            };
        }
    } else if (gameName.toLowerCase().includes('mines')) {
        if (payout < 80) {
            signal.strategyName = 'Mineração Cautelosa';
            signal.riskLevel = 'Risco Alto - 3 Minas';
            signal.bettingPattern = 'Apostas planas (sem Martingale).';
            signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.15, 1.45),
                medium: generateMultiplierOptions(1.50, 2.00),
                high: generateMultiplierOptions(2.10, 2.80)
            };
        } else {
            signal.strategyName = 'Sonda de Risco Moderado';
            signal.riskLevel = 'Risco Baixo - 5 Minas';
            signal.bettingPattern = 'Aumentar a aposta em 50% após uma vitória.';
            signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.30, 1.60),
                medium: generateMultiplierOptions(1.80, 2.70),
                high: generateMultiplierOptions(3.00, 5.00)
            };
        }
    } else { // Plinko or other Matrix games
        signal.bettingPattern = 'Apostas planas e consistentes.';
        if (payout < 80) {
            signal.strategyName = 'Queda Segura Plinko';
            signal.riskLevel = 'Risco Alto - 8 Linhas';
            signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.10, 1.20),
                medium: generateMultiplierOptions(1.30, 1.60),
                high: generateMultiplierOptions(1.70, 2.20)
            };
        } else {
            signal.strategyName = 'Cascata Oportunista';
            signal.riskLevel = 'Risco Moderado - 16 Linhas';
            signal.cashoutStrategy = {
                safe: generateMultiplierOptions(1.20, 1.50),
                medium: generateMultiplierOptions(2.00, 3.50),
                high: generateMultiplierOptions(4.00, 9.00)
            };
        }
    }

    return {
        signalType: 'matrix',
        aiProfile: 'Matrix',
        payingTimeSuggestion: generateAITimeSuggestion(payout),
        operatingMode: "Execute a estratégia uma vez. Se obtiver lucro, PARE IMEDIATAMENTE. Se não, siga o 'Padrão de Aposta' (ex: Martingale) na rodada seguinte. Ao recuperar a perda e obter qualquer lucro, PARE IMEDIATAMENTE. Não jogue continuamente até o fim do horário.",
        executionStrategy: "Esta estratégia foca em risco baixo para ganhos consistentes. A chave é a disciplina: siga o padrão de aposta sem ganância e saia assim que atingir o objetivo de cashout. Não tente prolongar a jogada para buscar ganhos maiores que o planejado.",
        ...signal
    } as MatrixSignal;
};