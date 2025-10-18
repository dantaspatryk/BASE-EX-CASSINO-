import type { CrashResult } from '../types';

// This is a MOCK service to simulate a real-time casino API feed.
// In a real-world scenario, this would connect to a WebSocket or use polling
// to get live data from a casino's game history endpoint.

/**
 * Generates a single, somewhat realistic Crash game multiplier.
 * There's a high chance of low multipliers (crash early) and a small chance of very high ones.
 */
const generateRandomMultiplier = (): number => {
    const random = Math.random();
    
    if (random < 0.5) { // 50% chance of crashing before 2x
        return 1.00 + Math.random(); // Range: 1.00 to 1.99
    }
    if (random < 0.85) { // 35% chance of crashing between 2x and 10x
        return 2.00 + Math.random() * 8; // Range: 2.00 to 9.99
    }
    if (random < 0.98) { // 13% chance of crashing between 10x and 100x
        return 10.00 + Math.random() * 90; // Range: 10.00 to 99.99
    }
    // 2% chance of a very high multiplier
    return 100.00 + Math.random() * 400; // Range: 100.00 to 499.99
};

/**
 * Generates an initial batch of historical crash results.
 */
const generateInitialHistory = (count = 50): CrashResult[] => {
    const history: CrashResult[] = [];
    for (let i = 0; i < count; i++) {
        history.push({
            multiplier: parseFloat(generateRandomMultiplier().toFixed(2)),
            timestamp: new Date(Date.now() - i * 3000).toLocaleTimeString('pt-BR'),
        });
    }
    return history.reverse(); // Oldest first
};

/**
 * Generates a new, single crash result.
 */
const generateNewResult = (): CrashResult => {
    return {
        multiplier: parseFloat(generateRandomMultiplier().toFixed(2)),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
    };
};

export const realtimeCasinoService = {
    getInitialHistory: generateInitialHistory,
    getNewResult: generateNewResult,
};