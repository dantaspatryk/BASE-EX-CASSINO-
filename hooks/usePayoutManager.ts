import { useState, useEffect, useMemo, useCallback } from 'react';
import usePersistentState from './usePersistentState'; // Import the persistent state hook
import type { ManagedGame, PayoutSettings, PayoutState, GamePayoutStates } from '../types';

const DURATIONS_MINUTES = [15, 25, 35];

export const usePayoutManager = (
    allManagedGames: ManagedGame[],
    payoutSettings: PayoutSettings
) => {
    // Use the persistent state hook to store and retrieve payout states
    const [gamePayoutStates, setGamePayoutStates] = usePersistentState<GamePayoutStates>('gamePayoutStates', {});

    useEffect(() => {
        if (allManagedGames.length > 0 && Object.keys(gamePayoutStates).length === 0) {
            const initialStates: GamePayoutStates = {};
            const gamesToPair = [...allManagedGames].sort((a, b) => a.name.localeCompare(b.name));

            let pairIndex = 0;

            for (let i = 0; i < gamesToPair.length; i += 2) {
                const durationIndexForPair = pairIndex % DURATIONS_MINUTES.length;
                const duration = DURATIONS_MINUTES[durationIndexForPair];
                pairIndex++;

                if (i + 1 < gamesToPair.length) {
                    const gameA = gamesToPair[i];
                    const gameB = gamesToPair[i + 1];
                    const endTime = Date.now() + duration * 60000;
                    
                    initialStates[gameA.name] = {
                        payout: payoutSettings.highPhaseMax,
                        phase: 'high',
                        phaseStartTime: Date.now(),
                        phaseEndTime: endTime,
                        volatilityCooldownEnd: null,
                        humanSupportCooldownEnd: null,
                        durationMinutes: duration,
                        durationIndex: durationIndexForPair,
                        forcedLowPhaseEnd: null,
                    };
                    initialStates[gameB.name] = {
                        payout: payoutSettings.lowPhaseMin,
                        phase: 'low',
                        phaseStartTime: Date.now(),
                        phaseEndTime: endTime,
                        volatilityCooldownEnd: null,
                        humanSupportCooldownEnd: null,
                        durationMinutes: duration,
                        durationIndex: durationIndexForPair,
                        forcedLowPhaseEnd: null,
                    };
                } else {
                    const game = gamesToPair[i];
                    const isHigh = Math.random() > 0.5;
                    initialStates[game.name] = {
                        payout: isHigh ? payoutSettings.highPhaseMax : payoutSettings.lowPhaseMin,
                        phase: isHigh ? 'high' : 'low',
                        phaseStartTime: Date.now(),
                        phaseEndTime: Date.now() + duration * 60000,
                        volatilityCooldownEnd: null,
                        humanSupportCooldownEnd: null,
                        durationMinutes: duration,
                        durationIndex: durationIndexForPair,
                        forcedLowPhaseEnd: null,
                    };
                }
            }
            setGamePayoutStates(initialStates);
        }
    }, [allManagedGames, payoutSettings, gamePayoutStates, setGamePayoutStates]);

    useEffect(() => {
        const payoutInterval = setInterval(() => {
            setGamePayoutStates(currentStates => {
                const now = Date.now();
                const newStates = { ...currentStates };
                const gameNames = allManagedGames
                    .map(g => g.name)
                    .filter(name => newStates[name])
                    .sort((a, b) => a.localeCompare(b));

                const updateState = (state: PayoutState) => {
                    const isInForcedLowPhase = state.forcedLowPhaseEnd && now < state.forcedLowPhaseEnd;
                    const effectivePhase = isInForcedLowPhase ? 'low' : state.phase;

                    const totalDuration = state.phaseEndTime - state.phaseStartTime;
                    const elapsed = now - state.phaseStartTime;
                    const progress = totalDuration > 0 ? Math.min(1, elapsed / totalDuration) : 0;
                    
                    if (effectivePhase === 'high') {
                        const payoutRange = payoutSettings.highPhaseMax - payoutSettings.highPhaseMin;
                        state.payout = Math.max(payoutSettings.highPhaseMin, Math.round(payoutSettings.highPhaseMax - (progress * payoutRange)));
                    } else {
                        const lowPayoutRange = payoutSettings.lowPhaseMax - payoutSettings.lowPhaseMin;
                        const newPayout = payoutSettings.lowPhaseMin + (progress * lowPayoutRange);
                        state.payout = Math.round(newPayout);
                    }

                    let isNowChangingSoon = false;
                    if (isInForcedLowPhase) {
                        isNowChangingSoon = false;
                    } else if (effectivePhase === 'high' && state.payout <= payoutSettings.highPhaseMin + 2 && state.payout >= payoutSettings.highPhaseMin) { // Payout decreasing, e.g., 77-75.
                        isNowChangingSoon = true;
                        state.nextPhase = 'low';
                    } else if (effectivePhase === 'low' && state.payout >= 71 && state.payout <= payoutSettings.lowPhaseMax) { // Payout increasing, e.g., 71-74
                        isNowChangingSoon = true;
                        state.nextPhase = 'high';
                    }

                    if (isNowChangingSoon && !state.isChangingSoon) {
                        state.isChangingSoon = true;
                        const nextIndex = (state.durationIndex + 1) % DURATIONS_MINUTES.length;
                        state.nextPhaseDurationMinutes = DURATIONS_MINUTES[nextIndex];
                    } else if (!isNowChangingSoon && state.isChangingSoon) {
                        state.isChangingSoon = false;
                        state.nextPhase = undefined;
                        state.nextPhaseDurationMinutes = undefined;
                    }
                };

                const transitionState = (state: PayoutState, newPhase: 'high' | 'low') => {
                    const newDurationIndex = (state.durationIndex + 1) % DURATIONS_MINUTES.length;
                    const newDuration = DURATIONS_MINUTES[newDurationIndex];
                    
                    state.phase = newPhase;
                    state.phaseStartTime = now;
                    state.phaseEndTime = now + newDuration * 60000;
                    state.durationMinutes = newDuration;
                    state.durationIndex = newDurationIndex;
                    state.isChangingSoon = false;
                    state.nextPhase = undefined;
                    state.nextPhaseDurationMinutes = undefined;
                    
                    state.payout = newPhase === 'high' ? payoutSettings.highPhaseMax : payoutSettings.lowPhaseMin;
                };

                for (let i = 0; i < gameNames.length; i += 2) {
                    const gameNameA = gameNames[i];
                    if (i + 1 < gameNames.length) {
                        const gameNameB = gameNames[i + 1];
                        const stateA = { ...newStates[gameNameA] };
                        const stateB = { ...newStates[gameNameB] };

                        if (now >= stateA.phaseEndTime) {
                            transitionState(stateA, stateA.phase === 'high' ? 'low' : 'high');
                            transitionState(stateB, stateB.phase === 'high' ? 'low' : 'high');
                        } else {
                            updateState(stateA);
                            updateState(stateB);
                        }
                        newStates[gameNameA] = stateA;
                        newStates[gameNameB] = stateB;
                    } else {
                        const currentState = { ...newStates[gameNameA] };
                        if (now >= currentState.phaseEndTime) {
                            transitionState(currentState, currentState.phase === 'high' ? 'low' : 'high');
                        } else {
                            updateState(currentState);
                        }
                        newStates[gameNameA] = currentState;
                    }
                }

                for (const gameName in newStates) {
                    const state = newStates[gameName];
                    if (state.forcedLowPhaseEnd && now >= state.forcedLowPhaseEnd) {
                        state.forcedLowPhaseEnd = null;
                    }
                }
                
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'UPDATE_STATES',
                        payload: newStates
                    });
                }
                return newStates;
            });
        }, 2000);

        return () => clearInterval(payoutInterval);
    }, [payoutSettings, allManagedGames, setGamePayoutStates]);

    const gamePayouts = useMemo(() => {
        return Object.fromEntries(
            Object.entries(gamePayoutStates).map(([gameName, state]) => [gameName, (state as PayoutState).payout])
        );
    }, [gamePayoutStates]);
    
    const updateGameCooldown = useCallback((gameName: string, cooldownEnd: number, forcedLowPhaseEnd: number) => {
        setGamePayoutStates(prev => {
            if (!prev[gameName]) return prev;
            return {
                ...prev,
                [gameName]: {
                    ...prev[gameName],
                    humanSupportCooldownEnd: cooldownEnd,
                    forcedLowPhaseEnd: forcedLowPhaseEnd
                }
            };
        });
    }, [setGamePayoutStates]);

    return { gamePayoutStates, gamePayouts, updateGameCooldown };
};
