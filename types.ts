import type { ReactElement } from 'react';

export type Page = 'generator' | 'history' | 'info' | 'support' | 'profile';

export interface User {
  userEmail: string;
  cooldowns: {
    [gameName: string]: {
      humanSupportEnd: number;
    }
  };
}

export interface PayoutSettings {
  highPhaseMin: number;
  highPhaseMax: number;
  lowPhaseMin: number;
  lowPhaseMax: number;
  highPhaseDurationMinutes: number;
  lowPhaseDurationMinutes: number;
  volatilityCooldownMinutes: number;
  humanSupportCooldownMinutes: number;
  futureAnalysisGapMinutesMin: number;
  futureAnalysisGapMinutesMax: number;
}

export interface PayoutState {
  payout: number;
  phase: 'high' | 'low';
  phaseStartTime: number;
  phaseEndTime: number;
  volatilityCooldownEnd: number | null;
  humanSupportCooldownEnd: number | null;
  durationMinutes: number;
  durationIndex: number;
  forcedLowPhaseEnd: number | null;
  isChangingSoon?: boolean;
  nextPhase?: 'high' | 'low';
  nextPhaseDurationMinutes?: number;
}

export type GamePayoutStates = Record<string, PayoutState>;

export interface ManagedGame {
  name: string;
  category: string;
  icon: ReactElement;
  isActive: boolean;
}

export type StrategyProfile = 'Agressivo' | 'Moderado' | 'Conservador' | 'Defensivo' | 'Cauteloso' | 'Observador' | 'Oportunista';

export interface SignalAttempt {
    type: string; // e.g., 'Normal', 'Turbo', 'Auto'
    rounds: number;
}

export type AiProfile = 'Black' | 'Diamond' | 'Seven Gold' | 'Nine' | 'Blue' | 'Boom' | 'Gold' | 'Matrix' | 'Showtime' | 'Ace';

// --- Discriminated Union for Signal Types ---

export interface SlotSignal {
    signalType: 'slot';
    payingTimeSuggestion: string;
    strategyProfile: StrategyProfile;
    attempts: SignalAttempt[];
    strategyTips: string; // O OBJETIVO da sequência (O porquê)
    executionStrategy: string; // O MÉTODO de jogo (O como)
    isLowPayoutSignal: boolean;
    aiProfile: AiProfile;
    betValueInBRL?: number; // Valor da aposta sugerida em BRL para Blue AI
}

export interface CrashSignal {
    signalType: 'crash';
    strategyName: string;
    entryPattern: string;
    exitPoints: { multipliers: number[]; type: 'safe' | 'medium' | 'high' }[];
    maxLossStreak: number;
    aiProfile: 'Seven Gold';
    payingTimeSuggestion: string; 
    operatingMode: string;
    executionStrategy?: string;
}

export interface LiveSignal {
    signalType: 'live';
    strategyName: string;
    riskProfile: string; // 'Baixo', 'Moderado', 'Alto'
    gameType: string; // 'Roleta', 'Blackjack', etc.
    bettingPlan: {
        step: number;
        instruction: string;
        condition: string;
        objective: string;
    }[];
    sessionGoal: string;
    aiProfile: 'Nine' | 'Showtime' | 'Ace';
    payingTimeSuggestion: string;
    operatingMode: string;
    executionStrategy?: string;
}

export interface MatrixSignal {
    signalType: 'matrix';
    strategyName: string;
    riskLevel: string; // e.g., '3 Mines', 'High Risk (16 pins)', 'Mira Estratégica (2 Alvos)'
    bettingPattern: string; // e.g., 'Flat Bet', 'Martingale after 2 losses'
    cashoutStrategy: {
      safe: number[];
      medium: number[];
      high: number[];
    };
    aiProfile: 'Matrix';
    payingTimeSuggestion: string;
    operatingMode: string;
    executionStrategy?: string;
    targetCount?: number; // Specific for shooting games like Penalty Shoot-Out
    shootingStyle?: string; // Specific for shooting games
}

export type GeneratedSignal = SlotSignal | CrashSignal | LiveSignal | MatrixSignal;


export interface ActiveSignal {
    signal: GeneratedSignal;
    gameName: string;
    generatedAt: number;
}

export type HistorySignal = GeneratedSignal & {
    gameName: string;
    generatedAt: string; // Formatted time string
    generatedAtTimestamp: number;
    status: 'valid' | 'invalid' | 'finalized' | 'expired';
};

export interface CustomStrategyConfig {
    strategyProfile: StrategyProfile;
    numberOfAttempts: number; // e.g., 2-8
    maxRoundsPerAttempt: number; // e.g., 5-20
}

export interface CrashResult {
    multiplier: number;
    timestamp: string;
}