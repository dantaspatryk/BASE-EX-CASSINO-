
import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import type { ManagedGame, GamePayoutStates, PayoutSettings, User, Page } from '../types';

const LOGO_CAROUSEL_ICONS = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8.32a2.5 2.5 0 0 0-3.41-3.53l-.22.22a2.5 2.5 0 0 0-3.53 3.41L12 12l-2.12-2.12a2.5 2.5 0 0 0-3.54 3.54L8.5 15.58M12 12l2.12 2.12a2.5 2.5 0 0 0 3.54-3.54L15.5 8.42" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M7 13c.76-2.5.76-5 0-7.5" /><path d="M17 13c-.76-2.5-.76-5 0-7.5" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M18 10a6 6 0 0 0-12 0" /><path d="M12 14c2.21 0 4-1.79 4-4" /><path d="M12 14c-2.21 0-4-1.79 4-4" /><path d="M12 18v-4" /><path d="M15 15l1.5 1.5" /><path d="M9 15l-1.5 1.5" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 12a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" /><path d="M17 6a5 5 0 0 0-10 0" /><path d="M12 12V9" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 9.88V14a4 4 0 1 0 8 0V9.88" /><path d="m12 6-3.03 2.97a2.5 2.5 0 0 0 0 3.53L12 15.5l3.03-2.97a2.5 2.5 0 0 0 0-3.53Z" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M15.14 8.86 8.86 15.14"/><path d="M16.5 12A4.5 4.5 0 0 0 7.5 12a4.5 4.5 0 0 0 1.41 3.24L12 12l3.12-3.12A4.49 4.49 0 0 0 16.5 12Z"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5z"/><path d="M12 12v5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-5"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="8" r="1"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="8" cy="17" r="1"/><circle cx="16" cy="17" r="1"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" /><path d="M16 12a4 4 0 0 1-4 4" /><path d="M8 12a4 4 0 0 0 4 4" /><path d="M12 8a4 4 0 0 1 4 4" /><path d="M12 8a4 4 0 0 0-4 4" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M14.5 14.5c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5 2.5-1 3.5 0" /><path d="M11 11l-2.5-2.5" /><path d="M15.5 15.5L13 13" /><path d="M10 14l-1.5 1.5" /><path d="M14 10l1.5-1.5" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M13.29 7.71 10.5 12l2.79 4.29" /><path d="M16 12h-5.5" /><path d="M8 12h.01" /></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m12 3-1.5 4.5-4.5 1.5 4.5 1.5L12 15l1.5-4.5 4.5-1.5-4.5-1.5L12 3z"/><path d="M19 19-3-3"/></svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12v-4"/><path d="M16.2 16.2 12 12"/><path d="M10 6.2a6 6 0 0 0-3.8 9.8"/></svg>
];

const LogoCarousel = () => {
    const icons = [...LOGO_CAROUSEL_ICONS, ...LOGO_CAROUSEL_ICONS];

    return (
        <div className="relative w-full max-w-md mx-auto h-24 overflow-hidden mb-4" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="absolute top-0 left-0 flex animate-scroll">
                {icons.map((icon, index) => (
                    <div key={index} className="flex-shrink-0 w-24 h-24 flex items-center justify-center p-2">
                         {React.cloneElement(icon, { className: "w-16 h-16 opacity-70" })}
                    </div>
                ))}
            </div>
        </div>
    );
};


// === GameSelection component ===
interface GameSelectionProps {
  games: ManagedGame[];
  onGameSelect: (gameName: string) => void;
  onNavigate: (page: Page) => void;
  gamePayouts: Record<string, number>;
  gamePayoutStates: GamePayoutStates;
  payoutSettings: PayoutSettings;
  generatingGameName: string | null;
  onToggleFavorite: (gameName: string) => void;
  favoriteGames: string[];
  activeSignalGameNames: string[];
  riskAnalysisGames: string[];
  notificationSubscriptions: string[];
  onToggleNotificationSubscription: (gameName: string) => void;
}
const GameSelection: React.FC<GameSelectionProps> = ({ 
    games, 
    onGameSelect, 
    onNavigate, 
    gamePayouts, 
    gamePayoutStates, 
    payoutSettings, 
    generatingGameName, 
    onToggleFavorite, 
    favoriteGames, 
    activeSignalGameNames, 
    riskAnalysisGames,
    notificationSubscriptions,
    onToggleNotificationSubscription 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAndActiveGames = games.filter(game => {
    const term = searchTerm.toLowerCase();
    return game.isActive && (
        game.name.toLowerCase().includes(term) || 
        game.category.toLowerCase().includes(term)
    );
  });

  const isAnySignalActive = activeSignalGameNames.length > 0;

  const groupedGames = useMemo(() => {
    const activeGameNames = new Set(activeSignalGameNames);
    const riskAnalysisGameNames = new Set(riskAnalysisGames);
    const favoriteGameNames = new Set(favoriteGames);

    const activeGamesList = filteredAndActiveGames.filter(game => activeGameNames.has(game.name));
    const riskGamesList = filteredAndActiveGames.filter(game => riskAnalysisGameNames.has(game.name) && !activeGameNames.has(game.name));
    const favoriteGamesList = filteredAndActiveGames.filter(
        game => favoriteGameNames.has(game.name) && !activeGameNames.has(game.name) && !riskAnalysisGameNames.has(game.name)
    );

    const otherGames = filteredAndActiveGames.filter(
        game => !activeGameNames.has(game.name) &&
                !riskAnalysisGameNames.has(game.name) &&
                !favoriteGameNames.has(game.name)
    );

    const otherGamesGrouped = otherGames.reduce((acc, game) => {
        const category = game.category || 'Outros';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(game);
        return acc;
    }, {} as Record<string, ManagedGame[]>);

    const finalGrouped: Record<string, ManagedGame[]> = {};

    if (activeGamesList.length > 0) {
        finalGrouped['🔥 SINAIS ATIVOS'] = activeGamesList;
    }
    
    if (riskGamesList.length > 0) {
        finalGrouped['⚠️ ANÁLISE DE RISCO'] = riskGamesList;
    }

    if (favoriteGamesList.length > 0) {
        finalGrouped['⭐ FAVORITOS'] = favoriteGamesList;
    }
    
    return { ...finalGrouped, ...otherGamesGrouped };

  }, [filteredAndActiveGames, activeSignalGameNames, riskAnalysisGames, favoriteGames]);
    
  return (
    <div className="w-full max-w-md mx-auto text-center animate-fade-in">
        <LogoCarousel />
        {activeSignalGameNames.length > 1 && !generatingGameName && (
            <div className="mb-6 bg-purple-900/50 border border-purple-500/70 rounded-lg p-4 text-center animate-fade-in">
                <h3 className="text-lg font-bold text-purple-300">Você tem {activeSignalGameNames.length} sinais ativos!</h3>
                <p className="text-sm text-gray-300 mt-2">Verifique os jogos marcados abaixo para acompanhar suas análises.</p>
            </div>
        )}
        <p className="text-green-400/80 mt-2 text-lg mb-6">
            Navegue pelas categorias ou pesquise
        </p>
        
        <div className="mb-8 px-2">
            <input
                type="text"
                placeholder="🔎 Pesquisar jogo ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-purple-500/50 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            />
        </div>

        <div className="space-y-8">
            {groupedGames ? (
                Object.entries(groupedGames as Record<string, ManagedGame[]>).map(([category, gamesInCategory]) => {
                    const categoryStyles: { [key: string]: string } = {
                        'ATIVOS': 'text-purple-400',
                        'RISCO': 'text-yellow-400',
                        'FAVORITOS': 'text-yellow-300',
                    };
                    const styleKey = Object.keys(categoryStyles).find(key => category.toUpperCase().includes(key));
                    const titleColorClass = styleKey ? categoryStyles[styleKey] : 'text-green-400';

                    return (
                        <div key={category}>
                            <h2 className={`text-2xl font-bold text-left mb-4 px-2 flex items-center gap-2 ${titleColorClass}`}>
                               {category.replace(/[⭐🔥⚠️]/g, '').trim()}
                            </h2>
                            <div className="space-y-4">
                                {gamesInCategory.map(game => {
                                    const gameState = gamePayoutStates[game.name];
                                    const hasActiveSignal = activeSignalGameNames.includes(game.name);
                                    return (
                                        <GameCard 
                                            key={game.name}
                                            game={game}
                                            payout={gamePayouts[game.name]}
                                            onSelect={onGameSelect}
                                            locked={false}
                                            isChangingSoon={gameState?.isChangingSoon}
                                            nextPhase={gameState?.nextPhase}
                                            humanSupportCooldownEnd={gameState?.humanSupportCooldownEnd}
                                            payoutSettings={payoutSettings}
                                            generatingGameName={generatingGameName}
                                            onToggleFavorite={onToggleFavorite}
                                            isFavorite={favoriteGames.includes(game.name)}
                                            hasActiveSignal={hasActiveSignal}
                                            hasRiskAnalysis={riskAnalysisGames.includes(game.name)}
                                            isAnySignalActive={isAnySignalActive}
                                            isSubscribedToNotifications={notificationSubscriptions.includes(game.name)}
                                            onToggleNotificationSubscription={onToggleNotificationSubscription}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )
                })
            ) : null}
            {filteredAndActiveGames.length === 0 && (
                 <div className="text-center text-gray-400 bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 mt-8">
                    {searchTerm ? (
                        <p>Nenhum jogo encontrado com o nome "<span className="font-bold text-white">{searchTerm}</span>".<br/>Tente limpar a busca.</p>
                    ) : (
                        <p>Nenhum jogo disponível no momento.<br/>Isso pode ser temporário. Por favor, verifique mais tarde.</p>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default GameSelection;
