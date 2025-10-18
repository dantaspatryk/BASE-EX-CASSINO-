

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * A custom hook that uses useState and syncs the state with localStorage.
 * It retrieves the stored value on initialization and saves it on change.
 * @param key The key to use for storing the value in localStorage.
 * @param initialValue The initial value to use if nothing is stored.
 * @returns A stateful value, and a function to update it.
 */
// FIX: Import Dispatch and SetStateAction from react and use them directly to fix "Cannot find namespace 'React'" error.
function usePersistentState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                // If a value is found in localStorage, parse and return it.
                return JSON.parse(storedValue);
            }
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
        }
        // Otherwise, return the initial value.
        return initialValue;
    });

    useEffect(() => {
        try {
            // Whenever the state changes, save it to localStorage.
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, state]);

    return [state, setState];
}

export default usePersistentState;
