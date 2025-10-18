import type { ActiveSignal, GamePayoutStates } from '../types';

/**
 * Parses a "HH:MM - HH:MM" time string relative to a generation timestamp
 * and returns both start and end Date objects, handling all edge cases.
 * @param timeRange The time string to parse.
 * @param generatedAt The timestamp when the signal was generated.
 * @returns An object with start and end Date objects, or null if parsing fails.
 */
export function getSignalTimeDetails(timeRange: string, generatedAt: number): { start: Date, end: Date } | null {
    const timeMatch = timeRange.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    if (!timeMatch) return null;

    try {
        const [, startTimeStr, endTimeStr] = timeMatch;
        const [startHours, startMinutes] = startTimeStr.split(':').map(Number);
        const [endHours, endMinutes] = endTimeStr.split(':').map(Number);

        let start = new Date(generatedAt);
        start.setHours(startHours, startMinutes, 0, 0);

        let end = new Date(generatedAt);
        end.setHours(endHours, endMinutes, 0, 0);

        // Case 1: Overnight signal (e.g., 23:00 - 01:00)
        if (end.getTime() < start.getTime()) {
            end.setDate(end.getDate() + 1);
        }

        // Case 2: Signal for next day generated before midnight (e.g., generated at 23:58 for 00:05 - 00:10)
        // If the calculated end time is in the past relative to generation time, the whole signal must be for the next day.
        if (end.getTime() < generatedAt) {
             start.setDate(start.getDate() + 1);
             end.setDate(end.getDate() + 1);
        }
        
        return { start, end };

    } catch (error) {
        console.error(`Error parsing time range: ${timeRange}`, error);
        return null;
    }
}


/**
 * Checks a list of active signals and returns those that need to be finalized.
 * @param activeSignals The list of currently active signals.
 * @param gamePayoutStates The current payout states for all games.
 * @returns An array of signals to be finalized, with the reason.
 */
export const checkSignalsForFinalization = (
    activeSignals: ActiveSignal[],
    gamePayoutStates: GamePayoutStates,
): { signal: ActiveSignal; reason: 'expired' | 'phase_change', transitionType: 'high_to_low' | 'low_to_high' | null }[] => {
    
    const signalsToFinalize: { signal: ActiveSignal; reason: 'expired' | 'phase_change', transitionType: 'high_to_low' | 'low_to_high' | null }[] = [];
    const nowTimestamp = Date.now();
    const finalizedSignalTimestamps = new Set<number>();

    for (const signal of activeSignals) {
        if (finalizedSignalTimestamps.has(signal.generatedAt)) {
            continue; // Already marked for finalization in this run
        }

        // 1. Check for Payout transitions (Security & Optimization Protocol)
        const payoutState = gamePayoutStates[signal.gameName];
        if (payoutState) {
            const { phase, payout } = payoutState;
            
            // High -> Low transition (payout dropping)
            if (phase === 'high' && payout <= 77) {
                signalsToFinalize.push({ signal, reason: 'phase_change', transitionType: 'high_to_low' });
                finalizedSignalTimestamps.add(signal.generatedAt);
                continue; // Prioritize phase change, move to next signal
            }

            // Low -> High transition (payout rising)
            if (phase === 'low' && payout >= 71 && payout <= 74) {
                 signalsToFinalize.push({ signal, reason: 'phase_change', transitionType: 'low_to_high' });
                 finalizedSignalTimestamps.add(signal.generatedAt);
                 continue; // Prioritize phase change, move to next signal
            }
        }
        
        // 2. Check for Time Expiration
        const timeRange = signal.signal.payingTimeSuggestion;
        if (!timeRange || !timeRange.includes(' - ') || timeRange.toLowerCase().includes('n/a')) {
            continue; // Cannot check expiration for invalid time ranges
        }

        const timeDetails = getSignalTimeDetails(timeRange, signal.generatedAt);
        if (timeDetails && nowTimestamp >= timeDetails.end.getTime()) {
            signalsToFinalize.push({ signal, reason: 'expired', transitionType: null });
            finalizedSignalTimestamps.add(signal.generatedAt);
        }
    }
    
    return signalsToFinalize;
};