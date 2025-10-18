

import React, { useState, useEffect } from 'react';
import { dataService } from '../services/supabaseService';
import { GAME_ICON_MAP } from '../data/games';
import type { ManagedGame, HistorySignal } from '../types';

// FIX: Replaced JSX with React.createElement to avoid JSX syntax errors in a .ts file.
const DefaultGameIcon = React.createElement('div', { className: 'w-12 h-12 bg-gray-700 rounded-md flex-shrink-0' });

export const useGameData = () => {
    const [allManagedGames, setAllManagedGames] = useState<ManagedGame[]>([]);
    const [initialSignalHistory, setInitialSignalHistory] = useState<HistorySignal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const gamesPromise = dataService.getManagedGames();
                const historyPromise = dataService.getSignalHistory();

                const [dbGames, history] = await Promise.all([gamesPromise, historyPromise]);
                
                if (!isMounted) return;
                
                const gamesWithIcons = dbGames.map((game: Omit<ManagedGame, 'icon'>) => ({
                    ...game,
                    icon: GAME_ICON_MAP[game.name] || DefaultGameIcon
                }));

                setAllManagedGames(gamesWithIcons);
                setInitialSignalHistory(history);
            } catch (error) {
                console.error("An unexpected error occurred during initial data fetch:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, []);

    return { allManagedGames, initialSignalHistory, isLoading };
};
