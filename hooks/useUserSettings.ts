
import { useState, useCallback, useEffect } from 'react';

const FAVORITES_KEY = 'diamond-ia-favorite-games';
const SUBSCRIPTIONS_KEY = 'diamond-ia-notification-subs';

export const useUserSettings = () => {
    const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
    const [notificationSubscriptions, setNotificationSubscriptions] = useState<string[]>([]);

    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem(FAVORITES_KEY);
            if (savedFavorites) {
                setFavoriteGames(JSON.parse(savedFavorites));
            }
            const savedSubs = localStorage.getItem(SUBSCRIPTIONS_KEY);
            if (savedSubs) {
                setNotificationSubscriptions(JSON.parse(savedSubs));
            }
        } catch (error) {
            console.error("Error loading user settings from localStorage:", error);
        }
    }, []);

    const toggleFavorite = useCallback((gameName: string) => {
        setFavoriteGames(prevFavorites => {
            const newFavorites = prevFavorites.includes(gameName)
                ? prevFavorites.filter(name => name !== gameName)
                : [...prevFavorites, gameName];
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            } catch (error) {
                console.error("Error saving favorite games to localStorage:", error);
            }
            return newFavorites;
        });
    }, []);

    const toggleNotificationSubscription = useCallback((gameName: string) => {
        setNotificationSubscriptions(prev => {
            const newSubs = prev.includes(gameName)
                ? prev.filter(name => name !== gameName)
                : [...prev, gameName];
            try {
                localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(newSubs));
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'UPDATE_SUBSCRIPTIONS',
                        payload: newSubs
                    });
                }
            } catch (error) {
                console.error("Error saving notification subscriptions to localStorage:", error);
            }
            return newSubs;
        });
    }, []);
    
    useEffect(() => {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                         registration.active?.postMessage({
                            type: 'UPDATE_SUBSCRIPTIONS',
                            payload: notificationSubscriptions
                         });
                    });
                }
            });
        }
    }, [notificationSubscriptions]);

    return {
        favoriteGames,
        notificationSubscriptions,
        toggleFavorite,
        toggleNotificationSubscription,
    };
};
