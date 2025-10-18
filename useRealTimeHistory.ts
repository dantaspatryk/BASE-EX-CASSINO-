import { useState, useEffect, useRef } from 'react';
import { realtimeCasinoService } from '../services/realtimeCasinoService';
import type { CrashResult } from '../types';

const MAX_HISTORY_LENGTH = 50;
const UPDATE_INTERVAL = 4000; // 4 seconds

export const useRealTimeHistory = (gameName: string | null) => {
    const [history, setHistory] = useState<CrashResult[]>([]);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Stop any existing interval when the effect re-runs or component unmounts
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (gameName) {
            // Initialize with a batch of historical data
            const initialHistory = realtimeCasinoService.getInitialHistory();
            setHistory(initialHistory);

            // Set up an interval to fetch new results
            intervalRef.current = window.setInterval(() => {
                const newResult = realtimeCasinoService.getNewResult();
                setHistory(prevHistory => {
                    const updatedHistory = [newResult, ...prevHistory];
                    if (updatedHistory.length > MAX_HISTORY_LENGTH) {
                        return updatedHistory.slice(0, MAX_HISTORY_LENGTH);
                    }
                    return updatedHistory;
                });
            }, UPDATE_INTERVAL);

        } else {
            // If no game is selected (or it's not a crash game), clear the history
            setHistory([]);
        }

        // Cleanup function to clear the interval when the component unmounts or gameName changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gameName]); // This effect depends on gameName

    return { history };
};