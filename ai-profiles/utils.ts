/**
 * Generates a dynamic, AI-sounding time suggestion string for a signal.
 * @param {number} [payout] - The current payout. If provided and >= 88, generates a longer duration.
 * @returns {string} A formatted time string like "HH:MM - HH:MM".
 */
export const generateAITimeSuggestion = (payout?: number): string => {
    const startMinutes = 2 + Math.floor(Math.random() * 2); // 2-3 minutes from now
    
    let durationMinutes;
    if (payout && payout >= 88) {
        durationMinutes = 9 + Math.floor(Math.random() * 2); // 9 or 10
    } else {
        durationMinutes = 5 + Math.floor(Math.random() * 3); // 5, 6, or 7
    }
    
    const startTime = new Date(Date.now() + startMinutes * 60000);
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
    const format = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${format(startTime)} - ${format(endTime)}`;
};

/**
 * Selects a random element from an array.
 * @template T
 * @param {T[]} arr The array to select from.
 * @returns {T} A random element from the array.
 */
export const selectRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generates an array of distinct, sorted, random multiplier options within a given range.
 * @param {number} min - The minimum value for the multiplier.
 * @param {number} max - The maximum value for the multiplier.
 * @param {number} count - The number of options to generate.
 * @returns {number[]} An array of formatted multiplier numbers.
 */
export const generateMultiplierOptions = (min: number, max: number, count = 3): number[] => {
    const options = new Set<number>();
    while (options.size < count) {
        const randomMultiplier = min + Math.random() * (max - min);
        options.add(parseFloat(randomMultiplier.toFixed(2)));
    }
    return Array.from(options).sort((a, b) => a - b);
};
