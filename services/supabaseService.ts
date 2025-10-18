import type { ManagedGame, HistorySignal } from '../types';

// ==================
// MOCK DATA STORE
// ==================

const MOCK_GAMES: ManagedGame[] = [
    { name: 'Fortune Ox', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Tiger', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Mouse', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Rabbit', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Dragon', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Gems', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Gods', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Caishen\'s Fortune', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Tree', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Phoenix', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Ganesha Fortune', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Prosperity Fortune Tree', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Fortune Pig', category: 'Fortune', icon: {} as any, isActive: true },
    { name: 'Mines', category: 'Matrix', icon: {} as any, isActive: true },
    { name: 'Aviator', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Spaceman', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Plinko', category: 'Matrix', icon: {} as any, isActive: true },
    { name: 'Goal', category: 'Matrix', icon: {} as any, isActive: true },
    { name: 'Penalty Shoot-Out', category: 'Matrix', icon: {} as any, isActive: true },
    { name: 'Sugar Rush', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Sweet Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gates of Olympus', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Starlight Princess', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Crazy Time', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Wolf Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Dog House Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'John Hunter and the Tomb of the Scarab Queen', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Great Rhino Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Big Bass Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mustang Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Chilli Heat', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fruit Party', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gems Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Power of Thor Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Floating Dragon', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild West Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Madame Destiny Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Hand of Midas', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Starlight Princess 1000', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wisdom of Athena', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Forge of Olympus', category: 'Slots', icon: {} as any, isActive: true },
    { name: '5 Lions Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Buffalo King Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Juicy Fruits', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Bigger Bass Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Book of the Fallen', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Magician\'s Secrets', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Crystal Caverns Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Smuggler\'s Cove', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Santa\'s Wonderland', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Big Juan', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Day of Dead', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Star Pirates Code', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Rise of Giza PowerNudge', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Piggy Bank Bills', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Treasure Wild', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Cash Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mystic Chief', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Candy Village', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Ultimate 5', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Colossal Cash Zone', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Elemental Gems Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Might of Ra', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Queenie', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Snakes and Ladders Megadice', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Extra Juicy Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Tic Tac Take', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Rainbow Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Barn Festival', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Drill That Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Goblin Heist PowerNudge', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'North Guardians', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Spirit of Adventure', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Cleocatra', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild West Gold Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Cosmic Cash', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Bomb Bonanza', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Sugar Rush 1000', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Big Bass Splash', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Octobeer Fortunes', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fire Hot 100', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Black Bull', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Greedy Wolf', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Coffee Wild', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Crown of Fire', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Book of Golden Sands', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Striking Hot 5', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Happy Hooves', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Firebird Spirit', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Pirate Golden Age', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'John Hunter and the Book of Tut', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Sword of Ares', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Big Bass - Keeping it Reel', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Release the Kraken', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gems of Serengeti', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Shield of Sparta', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Spin & Score Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Towering Fortunes', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fury of Odin Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Reel Banks', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Dragon Hero', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Hot Pepper', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'PIZZA! PIZZA? PIZZA!', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Sweet Powernudge', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Secret City Gold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Pinup Girls', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fish Eye', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mammoth Gold Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Monster Superlanche', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fire Archer', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Club Tropicana', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Dog House Multihold', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild Wild Riches Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Peak Power', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Jasmine Dreams', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mochimon', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Cowboy Coins', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild West Duels', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mystery of the Orient', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild Bison Charge', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Knight Hot Spotz', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Excalibur Unleashed', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Kingdom of The Dead', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Jane Hunter and the Mask of Montezuma', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'JetX', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Big Bass Crash', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Football X', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Balloon', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Limbo Cat', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Triple Cash or Crash', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Maverick', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Space XY', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Roleta Brasileira', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Blackjack Ao Vivo', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Bac Bo', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Dragon Tiger Live', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Speed Baccarat', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Mega Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Sweet Bonanza Candyland', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Mega Wheel', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Boom City', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'PowerUP Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Andar Bahar', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Teen Patti', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'ONE Blackjack', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'VIP Roulette', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Sic Bo', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Football Studio Dice', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Vegas Ball Bonanza', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Snakes & Ladders Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Treasure Island', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Funky Time', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Legacy of Dead', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Reactoonz', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Money Train 2', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gonzo\'s Quest', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Jammin\' Jars', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Dead or Alive 2', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Razor Shark', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Tome of Madness', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Rise of Merlin', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Legacy of Egypt', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fire Joker', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Wild Machine', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wild Swarm', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Mental', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Punk Rocker', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'San Quentin xWays', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'East Coast vs West Coast', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Tombstone', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'El Paso Gunfight', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Chaos Crew', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Lucky Jet', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'JetX3', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Crash X', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Lightning Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Immersive Roulette', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Dream Catcher', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Monopoly Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Deal or No Deal Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Football Studio', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Side Bet City', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Book of Dead', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Starburst', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gonzo\'s Quest Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Bonanza Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Jammin\' Jars 2', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Money Train 3', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Wanted Dead or a Wild', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Reactoonz 2', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Dog House', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fruit Party 2', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gates of Valhalla', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Big Bamboo', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'RIP City', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Dork Unit', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Hand of Anubis', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Moon Princess', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Fire in the Hole xBomb', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'xWays Hoarder xSplit', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Deadwood', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Iron Bank', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Temple Tumble Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Book of Shadows', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Gigantoonz', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'The Bowery Boys', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Joker Stoker', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Rich Wilde and the Amulet of Dead', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Rise of Olympus 100', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Divine Fortune Megaways', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Vikings Go Berzerk', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Valley of the Gods', category: 'Slots', icon: {} as any, isActive: true },
    { name: 'Aviatrix', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'F777 Fighter', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'Cricket X', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'To Mars and Beyond', category: 'Crash', icon: {} as any, isActive: true },
    { name: 'XXXtreme Lightning Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Crazy Coin Flip', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Monopoly Big Baller', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Gold Bar Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Gonzo\'s Treasure Hunt Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Dead or Alive: Saloon', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Football Studio Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Adventures Beyond Wonderland Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'The Money Drop Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Mega Fire Blaze Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Quantum Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Age of the Gods Bonus Roulette', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Baccarat Squeeze', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Casino Hold\'em', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Three Card Poker', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Cash or Crash Live', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Fan Tan Live', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Lightning Dice', category: 'Game Show', icon: {} as any, isActive: true },
    { name: 'Super Sic Bo', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: '2 Hand Casino Hold\'em', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Ultimate Texas Hold\'em', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Caribbean Stud Poker', category: 'Ao Vivo', icon: {} as any, isActive: true },
    { name: 'Bet on Poker', category: 'Ao Vivo', icon: {} as any, isActive: true },
];

const HISTORY_KEY = 'base_ex_cassino_signal_history';

const getHistoryFromStorage = (): HistorySignal[] => {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            const history = JSON.parse(stored) as HistorySignal[];
            return history.filter(s => s && typeof s.generatedAtTimestamp === 'number');
        }
        return [];
    } catch (e) {
        console.error("Failed to read signal history from localStorage", e);
        localStorage.removeItem(HISTORY_KEY);
        return [];
    }
};

const setHistoryInStorage = (history: HistorySignal[]) => {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error("Failed to write signal history to localStorage", e);
    }
};

let signalHistoryStore: HistorySignal[] = getHistoryFromStorage();
let managedGamesStore: ManagedGame[] = MOCK_GAMES;

// ==================
// MOCK DATA SERVICE
// ==================
export const dataService = {
    // Games
    async getManagedGames(): Promise<ManagedGame[]> {
        return Promise.resolve(managedGamesStore);
    },
    async updateManagedGame(name: string, isActive: boolean): Promise<ManagedGame> {
        const game = managedGamesStore.find(g => g.name === name);
        if (game) {
            game.isActive = isActive;
        }
        return Promise.resolve(game!);
    },

    // Signal History
    async getSignalHistory(): Promise<HistorySignal[]> {
        signalHistoryStore = getHistoryFromStorage();
        return Promise.resolve([...signalHistoryStore]);
    },
    async addSignalToHistory(signal: HistorySignal): Promise<HistorySignal> {
        signalHistoryStore = getHistoryFromStorage();
        signalHistoryStore.unshift(signal);
        setHistoryInStorage(signalHistoryStore);
        return Promise.resolve(signal);
    },
    async updateSignalStatus(timestamp: number, status: HistorySignal['status']): Promise<HistorySignal> {
        signalHistoryStore = getHistoryFromStorage();
        const signalIndex = signalHistoryStore.findIndex(s => s.generatedAtTimestamp === timestamp);
        if (signalIndex !== -1) {
            const updatedSignal = { ...signalHistoryStore[signalIndex], status };
            signalHistoryStore[signalIndex] = updatedSignal;
            setHistoryInStorage(signalHistoryStore);
            return Promise.resolve(updatedSignal);
        }
        
        return Promise.reject(new Error(`Signal with timestamp ${timestamp} not found in mock store.`));
    },
};
