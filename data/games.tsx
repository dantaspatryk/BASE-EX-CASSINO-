import React from 'react';

// === ICONS (Centralized for mapping) ===
const OxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8.32a2.5 2.5 0 0 0-3.41-3.53l-.22.22a2.5 2.5 0 0 0-3.53 3.41L12 12l-2.12-2.12a2.5 2.5 0 0 0-3.54 3.54L8.5 15.58M12 12l2.12 2.12a2.5 2.5 0 0 0 3.54-3.54L15.5 8.42" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M7 13c.76-2.5.76-5 0-7.5" /><path d="M17 13c-.76-2.5-.76-5 0-7.5" /></svg>
);
const TigerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M18 10a6 6 0 0 0-12 0" /><path d="M12 14c2.21 0 4-1.79 4-4" /><path d="M12 14c-2.21 0-4-1.79 4-4" /><path d="M12 18v-4" /><path d="M15 15l1.5 1.5" /><path d="M9 15l-1.5 1.5" /></svg>
);
const MouseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 12a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" /><path d="M17 6a5 5 0 0 0-10 0" /><path d="M12 12V9" /></svg>
);
const MinesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 9.88V14a4 4 0 1 0 8 0V9.88" /><path d="m12 6-3.03 2.97a2.5 2.5 0 0 0 0 3.53L12 15.5l3.03-2.97a2.5 2.5 0 0 0 0-3.53Z" /></svg>
);
const AviatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M15.14 8.86 8.86 15.14"/><path d="M16.5 12A4.5 4.5 0 0 0 7.5 12a4.5 4.5 0 0 0 1.41 3.24L12 12l3.12-3.12A4.49 4.49 0 0 0 16.5 12Z"/></svg>
);
const SpacemanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5z"/><path d="M12 12v5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-5"/></svg>
);
const PlinkoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="8" r="1"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="8" cy="17" r="1"/><circle cx="16" cy="17" r="1"/></svg>
);
const SugarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" /><path d="M16 12a4 4 0 0 1-4 4" /><path d="M8 12a4 4 0 0 0 4 4" /><path d="M12 8a4 4 0 0 1 4 4" /><path d="M12 8a4 4 0 0 0-4 4" /></svg>
);
const BonanzaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M14.5 14.5c-1 1-2.5 1-3.5 0s-1-2.5 0-3.5 2.5-1 3.5 0" /><path d="M11 11l-2.5-2.5" /><path d="M15.5 15.5L13 13" /><path d="M10 14l-1.5 1.5" /><path d="M14 10l1.5-1.5" /></svg>
);
const OlympusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M13.29 7.71 10.5 12l2.79 4.29" /><path d="M16 12h-5.5" /><path d="M8 12h.01" /></svg>
);
const StarlightPrincessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m12 3-1.5 4.5-4.5 1.5 4.5 1.5L12 15l1.5-4.5 4.5-1.5-4.5-1.5L12 3z"/>
     <path d="M19 19 L 5 5"/></svg>
);
const CrazyTimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12v-4"/><path d="M16.2 16.2 12 12"/><path d="M10 6.2a6 6 0 0 0-3.8 9.8"/></svg>
);
const SlotsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M16 8h-2a2 2 0 1 0-4 0H8" /><path d="M12 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path d="M12 10v2" /></svg>
);
const CrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m2 16 4-6 4 2 4-6 4 4 4-8" /></svg>
);
const LiveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /></svg>
);
const GemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M6 9 12 3l6 6-8 12-8-12z"/><path d="m6 9 6 12 6-12"/></svg>
);
const AnimalPawIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="11" cy="11" r="1" /><circle cx="15" cy="11" r="1" /><circle cx="8" cy="15" r="1" /><circle cx="18" cy="15" r="1" /><path d="M9 11a5 5 0 0 1 6 0" /><path d="M12 14a2 2 0 0 1 2-2h-4a2 2 0 0 1 2 2z" /></svg>
);
const MythologyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m13 2-3 9h5l-7 10 3-9H8z"/></svg>
);
const FruitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a5 5 0 0 0 5-5H7a5 5 0 0 0 5 5z"/><path d="M12 12a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z"/><path d="M14.5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" /></svg>
);
const MoneyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12m-3-8h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h6"/></svg>
);
const FishIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M17 11.5a5.5 5.5 0 0 1-11 0 5.5 5.5 0 0 1 11 0z"/><path d="M17 11.5 21 8l-4 8-4-3"/><circle cx="8.5" cy="11.5" r=".5" fill="currentColor"/></svg>
);
const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v15H6.5A2.5 2.5 0 0 0 4 19.5z"/><path d="m9 7 3 3 3-3"/></svg>
);
const RocketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M7 11.5 12 3l5 8.5-5 2-5-2z"/><path d="M12 13v9"/><path d="M9 19h6"/></svg>
);
const FootballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 5.25 15.5 8.5l-1.5 6-4-3.5-4 3.5-1.5-6L12 5.25z"/><path d="M8.5 14.5 5 18.5"/><path d="m15.5 14.5 3.5 4"/><path d="M12 22v-4.5"/></svg>
);
const CardsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><rect x="5" y="5" width="8" height="12" rx="2" /><rect x="11" y="7" width="8" height="12" rx="2" /></svg>
);
const RouletteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="12" r="4" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="M22 12h-4" /><path d="M6 12H2" /><path d="m18.36 18.36-2.83-2.83"/><path d="m8.46 8.46-2.83-2.83"/><path d="m18.36 5.64-2.83 2.83"/><path d="m8.46 15.54-2.83 2.83"/><path d="M15 17 8 8"/></svg>
);

// ICONS FOR THE 30 NEW GAMES
const ExplorerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12 8 20l4-4 4 4-4-12"/><circle cx="12" cy="12" r="2"/></svg>
);
const AlienIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14s1.5-2 4-2 4 2 4 2"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M11 4.5a7 7 0 0 1 2 0"/><path d="M12 2v2.5"/></svg>
);
const TrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><rect x="7" y="9" width="10" height="8" rx="1"/><path d="M7 17v1.5a1.5 1.5 0 0 0 3 0V17"/><path d="M17 17v1.5a1.5 1.5 0 0 1-3 0V17"/><path d="M17 9V7a2 2 0 0 0-2-2h-1"/><path d="m10 5-3 4"/></svg>
);
const WildWestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M17 10.5V17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-6.5"/><path d="M10 10.5V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2.5"/></svg>
);
const SharkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M17 13.5c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5c.83 0 1.5.34 2 .88"/><path d="m5 13.5 4-3 4 3-4 3-4-3z"/><path d="M10 18s-2-1.5-2-3.5c0-2 2-3.5 2-3.5"/></svg>
);
const WizardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m5 12 5-10 5 10-5 10z"/><path d="M19 12h-4"/></svg>
);
const ClassicJokerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/></svg>
);
const ScienceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/></svg>
);
const BeeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M10 16.5 12 12l2-4.5"/><path d="M14 16.5 12 12l-2-4.5"/><path d="M12 12h5"/><path d="M12 12H7"/><path d="m15 5-3-3-3 3"/></svg>
);
const AbstractIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 12a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/></svg>
);
const MusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="10" cy="17" r="2"/><circle cx="16" cy="16" r="2"/><path d="M10 15V7l6-1v8"/></svg>
);
const GraffitiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 9.5c.5-1 1.5-1 2.5-1s2.5.5 2.5 1.5c0 1.5-1.5 1-1.5 2.5"/><path d="M13 14c1 0 1 .5 1.5 1s.5 1 1.5 1"/><circle cx="12" cy="12" r=".5" fill="currentColor"/><path d="m15 9-1-1"/></svg>
);
const LightningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const DreamCatcherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="12" r="5"/><path d="M12 2v3"/><path d="M12 17v3"/><path d="M19.07 4.93l-2.12 2.12"/><path d="M7.05 16.95l-2.12 2.12"/><path d="M4.93 4.93l2.12 2.12"/><path d="M16.95 16.95l2.12 2.12"/></svg>
);
const MonopolyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M12 15a3 3 0 1 0 0-6"/><path d="M12 15V9"/><path d="M9 12h6"/></svg>
);

const TreeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 12v6"/>
        <path d="M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M15 12a3 3 0 1 0-6 0h6z"/>
        <path d="M9 12a3 3 0 1 0 0 6h.5"/>
    </svg>
);

const PhoenixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/>
        <path d="M12 2c-2.5 3-2.5 7.5 0 10.5C14.5 9.5 14.5 5 12 2z"/>
        <path d="M17 9c1.5 1.5 1.5 4 0 5.5"/>
        <path d="M7 9c-1.5 1.5-1.5 4 0 5.5"/>
        <path d="M12 16v4"/>
    </svg>
);

const ElephantIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M10 12h.01"/><path d="M14 12h.01"/>
        <path d="M12 12v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2"/>
        <path d="M18 10a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v2c0 1.1.9 2 2 2h1"/>
        <path d="M18 10a4 4 0 0 1 0 8h-1"/>
    </svg>
);

const PigIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M10 10h.01"/><path d="M14 10h.01"/>
        <path d="M12 16c-1.5 0-2-1-2.5-2"/>
        <path d="M14.5 14c.5 1 1 2 2.5 2"/>
        <path d="M7 12c0 2.5 2 4 5 4s5-1.5 5-4c0-2-1-3-3-3"/>
    </svg>
);

const RabbitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M15.5 9.5a.5.5 0 0 1-1 0V6a2.5 2.5 0 0 0-5 0v3.5a.5.5 0 0 1-1 0"/>
        <path d="M12 12a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z"/>
    </svg>
);

const DragonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M15 13a4 4 0 0 1-4 4"/>
        <path d="M9 13a4 4 0 0 0 4 4"/>
        <path d="M17 10a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2z"/>
        <path d="M7 6s1 2 5 2 5-2 5-2"/>
    </svg>
);

export const GAME_ICON_MAP: Record<string, React.ReactElement> = {
    'Fortune Ox': <OxIcon className="text-green-400" />,
    'Fortune Tiger': <TigerIcon className="text-orange-400" />,
    'Fortune Mouse': <MouseIcon className="text-gray-400" />,
    'Fortune Rabbit': <RabbitIcon className="text-pink-400" />,
    'Fortune Dragon': <DragonIcon className="text-red-600" />,
    'Fortune Gems': <GemIcon className="text-fuchsia-400" />,
    'Fortune Gods': <MythologyIcon className="text-amber-300" />,
    'Caishen\'s Fortune': <MoneyIcon className="text-red-500" />,
    'Fortune Tree': <TreeIcon className="text-lime-500" />,
    'Fortune Phoenix': <PhoenixIcon className="text-orange-500" />,
    'Ganesha Fortune': <ElephantIcon className="text-indigo-400" />,
    'Prosperity Fortune Tree': <TreeIcon className="text-yellow-400" />,
    'Fortune Pig': <PigIcon className="text-pink-300" />,
    'Mines': <MinesIcon className="text-red-500" />,
    'Aviator': <AviatorIcon className="text-blue-500" />,
    'Spaceman': <SpacemanIcon className="text-indigo-400" />,
    'Plinko': <PlinkoIcon className="text-pink-400" />,
    'Sugar Rush': <SugarIcon className="text-rose-400" />,
    'Sweet Bonanza': <BonanzaIcon className="text-yellow-400" />,
    'Gates of Olympus': <OlympusIcon className="text-amber-400" />,
    'Starlight Princess': <StarlightPrincessIcon className="text-fuchsia-400" />,
    'Crazy Time': <CrazyTimeIcon className="text-cyan-400" />,
    // 130 Novos Jogos com ícones variados
    'Wolf Gold': <AnimalPawIcon className="text-yellow-500" />,
    'The Dog House Megaways': <AnimalPawIcon className="text-blue-400" />,
    'John Hunter and the Tomb of the Scarab Queen': <BookIcon className="text-amber-500" />,
    'Great Rhino Megaways': <AnimalPawIcon className="text-gray-500" />,
    'Big Bass Bonanza': <FishIcon className="text-green-500" />,
    'Mustang Gold': <MoneyIcon className="text-orange-500" />,
    'Chilli Heat': <SlotsIcon className="text-red-500" />,
    'Fruit Party': <FruitIcon className="text-pink-500" />,
    'Gems Bonanza': <GemIcon className="text-purple-500" />,
    'Power of Thor Megaways': <MythologyIcon className="text-cyan-500" />,
    'Floating Dragon': <MythologyIcon className="text-red-400" />,
    'Wild West Gold': <MoneyIcon className="text-yellow-600" />,
    'Madame Destiny Megaways': <SlotsIcon className="text-indigo-500" />,
    'The Hand of Midas': <MythologyIcon className="text-amber-400" />,
    'Starlight Princess 1000': <StarlightPrincessIcon className="text-fuchsia-500" />,
    'Wisdom of Athena': <MythologyIcon className="text-yellow-300" />,
    'Forge of Olympus': <MythologyIcon className="text-orange-400" />,
    '5 Lions Megaways': <AnimalPawIcon className="text-green-600" />,
    'Buffalo King Megaways': <AnimalPawIcon className="text-amber-600" />,
    'Juicy Fruits': <FruitIcon className="text-rose-500" />,
    'Bigger Bass Bonanza': <FishIcon className="text-teal-500" />,
    'Book of the Fallen': <BookIcon className="text-amber-700" />,
    'Magician\'s Secrets': <SlotsIcon className="text-purple-600" />,
    'Crystal Caverns Megaways': <GemIcon className="text-sky-400" />,
    'Smuggler\'s Cove': <MoneyIcon className="text-blue-600" />,
    'Santa\'s Wonderland': <SlotsIcon className="text-red-600" />,
    'Big Juan': <SlotsIcon className="text-lime-500" />,
    'Day of Dead': <SlotsIcon className="text-violet-500" />,
    'Star Pirates Code': <SlotsIcon className="text-cyan-400" />,
    'Rise of Giza PowerNudge': <BookIcon className="text-yellow-700" />,
    'Piggy Bank Bills': <MoneyIcon className="text-pink-400" />,
    'Treasure Wild': <MoneyIcon className="text-emerald-500" />,
    'Cash Bonanza': <MoneyIcon className="text-green-400" />,
    'Mystic Chief': <AnimalPawIcon className="text-indigo-400" />,
    'Candy Village': <FruitIcon className="text-rose-400" />,
    'The Ultimate 5': <AnimalPawIcon className="text-gray-400" />,
    'Colossal Cash Zone': <MoneyIcon className="text-lime-400" />,
    'Elemental Gems Megaways': <GemIcon className="text-blue-500" />,
    'Might of Ra': <MythologyIcon className="text-amber-400" />,
    'Queenie': <SlotsIcon className="text-red-400" />,
    'Snakes and Ladders Megadice': <AnimalPawIcon className="text-green-500" />,
    'Extra Juicy Megaways': <FruitIcon className="text-orange-400" />,
    'Tic Tac Take': <SlotsIcon className="text-cyan-300" />,
    'Rainbow Gold': <MoneyIcon className="text-lime-300" />,
    'Barn Festival': <AnimalPawIcon className="text-red-300" />,
    'Drill That Gold': <MoneyIcon className="text-yellow-500" />,
    'Goblin Heist PowerNudge': <MoneyIcon className="text-green-600" />,
    'North Guardians': <MythologyIcon className="text-sky-500" />,
    'Spirit of Adventure': <BookIcon className="text-emerald-400" />,
    'Cleocatra': <AnimalPawIcon className="text-yellow-400" />,
    'Wild West Gold Megaways': <MoneyIcon className="text-amber-600" />,
    'Cosmic Cash': <MoneyIcon className="text-fuchsia-400" />,
    'Bomb Bonanza': <SlotsIcon className="text-red-600" />,
    'Sugar Rush 1000': <SugarIcon className="text-pink-400" />,
    'Big Bass Splash': <FishIcon className="text-cyan-500" />,
    'Octobeer Fortunes': <MoneyIcon className="text-amber-500" />,
    'Fire Hot 100': <SlotsIcon className="text-orange-600" />,
    'Black Bull': <AnimalPawIcon className="text-gray-600" />,
    'Greedy Wolf': <AnimalPawIcon className="text-lime-600" />,
    'Coffee Wild': <SlotsIcon className="text-yellow-800" />,
    'Crown of Fire': <SlotsIcon className="text-red-700" />,
    'Book of Golden Sands': <BookIcon className="text-amber-400" />,
    'Striking Hot 5': <SlotsIcon className="text-orange-500" />,
    'Happy Hooves': <AnimalPawIcon className="text-green-300" />,
    'Firebird Spirit': <MythologyIcon className="text-red-500" />,
    'Pirate Golden Age': <MoneyIcon className="text-yellow-600" />,
    'John Hunter and the Book of Tut': <BookIcon className="text-amber-500" />,
    'Sword of Ares': <MythologyIcon className="text-red-600" />,
    'Big Bass - Keeping it Reel': <FishIcon className="text-blue-400" />,
    'Release the Kraken': <AnimalPawIcon className="text-teal-400" />,
    'Gems of Serengeti': <GemIcon className="text-purple-400" />,
    'Shield of Sparta': <MythologyIcon className="text-gray-500" />,
    'Spin & Score Megaways': <FootballIcon className="text-green-400" />,
    'Towering Fortunes': <MoneyIcon className="text-yellow-400" />,
    'Fury of Odin Megaways': <MythologyIcon className="text-sky-400" />,
    'Reel Banks': <MoneyIcon className="text-emerald-400" />,
    'Dragon Hero': <MythologyIcon className="text-red-500" />,
    'Hot Pepper': <FruitIcon className="text-orange-500" />,
    'PIZZA! PIZZA? PIZZA!': <FruitIcon className="text-yellow-500" />,
    'Sweet Powernudge': <FruitIcon className="text-pink-400" />,
    'Secret City Gold': <MoneyIcon className="text-amber-500" />,
    'Pinup Girls': <SlotsIcon className="text-rose-400" />,
    'Fish Eye': <FishIcon className="text-cyan-400" />,
    'Mammoth Gold Megaways': <AnimalPawIcon className="text-gray-400" />,
    'Monster Superlanche': <AnimalPawIcon className="text-lime-400" />,
    'Fire Archer': <SlotsIcon className="text-red-400" />,
    'Club Tropicana': <FruitIcon className="text-fuchsia-400" />,
    'The Dog House Multihold': <AnimalPawIcon className="text-blue-300" />,
    'Wild Wild Riches Megaways': <MoneyIcon className="text-green-500" />,
    'Peak Power': <MythologyIcon className="text-yellow-300" />,
    'Jasmine Dreams': <GemIcon className="text-purple-300" />,
    'Mochimon': <FruitIcon className="text-pink-300" />,
    'Cowboy Coins': <MoneyIcon className="text-amber-600" />,
    'Wild West Duels': <MoneyIcon className="text-yellow-700" />,
    'Mystery of the Orient': <BookIcon className="text-red-500" />,
    'Wild Bison Charge': <AnimalPawIcon className="text-orange-400" />,
    'Knight Hot Spotz': <SlotsIcon className="text-gray-400" />,
    'Excalibur Unleashed': <MythologyIcon className="text-blue-400" />,
    'Kingdom of The Dead': <BookIcon className="text-amber-700" />,
    'Jane Hunter and the Mask of Montezuma': <BookIcon className="text-emerald-500" />,
    'JetX': <RocketIcon className="text-sky-400" />,
    'Big Bass Crash': <FishIcon className="text-green-400" />,
    'Penalty Shoot-Out': <FootballIcon className="text-lime-400" />,
    'Football X': <FootballIcon className="text-gray-300" />,
    'Balloon': <CrashIcon className="text-red-400" />,
    'Limbo Cat': <AnimalPawIcon className="text-purple-400" />,
    'Triple Cash or Crash': <MoneyIcon className="text-yellow-400" />,
    'Maverick': <RocketIcon className="text-blue-400" />,
    'Space XY': <RocketIcon className="text-indigo-400" />,
    'Goal': <FootballIcon className="text-white" />,
    'Roleta Brasileira': <RouletteIcon className="text-green-500" />,
    'Blackjack Ao Vivo': <CardsIcon className="text-gray-400" />,
    'Bac Bo': <CardsIcon className="text-red-500" />,
    'Dragon Tiger Live': <AnimalPawIcon className="text-orange-500" />,
    'Speed Baccarat': <CardsIcon className="text-purple-500" />,
    'Mega Roulette': <RouletteIcon className="text-yellow-500" />,
    'Sweet Bonanza Candyland': <FruitIcon className="text-pink-400" />,
    'Mega Wheel': <RouletteIcon className="text-cyan-400" />,
    'Boom City': <LiveIcon className="text-fuchsia-500" />,
    'PowerUP Roulette': <RouletteIcon className="text-sky-400" />,
    'Andar Bahar': <CardsIcon className="text-emerald-500" />,
    'Teen Patti': <CardsIcon className="text-rose-500" />,
    'ONE Blackjack': <CardsIcon className="text-teal-400" />,
    'VIP Roulette': <RouletteIcon className="text-amber-400" />,
    'Sic Bo': <LiveIcon className="text-red-400" />,
    'Football Studio Dice': <FootballIcon className="text-blue-400" />,
    'Vegas Ball Bonanza': <LiveIcon className="text-lime-400" />,
    'Snakes & Ladders Live': <AnimalPawIcon className="text-green-400" />,
    'Treasure Island': <MoneyIcon className="text-yellow-600" />,
    'Funky Time': <LiveIcon className="text-purple-400" />,
    'Legacy of Dead': <BookIcon className="text-amber-500" />,
    'Reactoonz': <AlienIcon className="text-lime-400" />,
    'Money Train 2': <TrainIcon className="text-gray-500" />,
    'Gonzo\'s Quest': <ExplorerIcon className="text-emerald-500" />,
    'Jammin\' Jars': <FruitIcon className="text-red-500" />,
    'Dead or Alive 2': <WildWestIcon className="text-yellow-700" />,
    'Razor Shark': <SharkIcon className="text-sky-500" />,
    'Tome of Madness': <BookIcon className="text-purple-500" />,
    'Rise of Merlin': <WizardIcon className="text-indigo-400" />,
    'Legacy of Egypt': <MythologyIcon className="text-yellow-400" />,
    'Fire Joker': <ClassicJokerIcon className="text-orange-500" />,
    'The Wild Machine': <ScienceIcon className="text-cyan-400" />,
    'Wild Swarm': <BeeIcon className="text-yellow-400" />,
    'Mental': <AbstractIcon className="text-red-600" />,
    'Punk Rocker': <MusicIcon className="text-pink-500" />,
    'San Quentin xWays': <WildWestIcon className="text-blue-600" />,
    'East Coast vs West Coast': <MusicIcon className="text-teal-400" />,
    'Tombstone': <WildWestIcon className="text-gray-400" />,
    'El Paso Gunfight': <WildWestIcon className="text-orange-600" />,
    'Chaos Crew': <GraffitiIcon className="text-lime-300" />,
    'Lucky Jet': <RocketIcon className="text-purple-400" />,
    'JetX3': <RocketIcon className="text-red-400" />,
    'Crash X': <CrashIcon className="text-yellow-400" />,
    'Lightning Roulette': <LightningIcon className="text-yellow-300" />,
    'Immersive Roulette': <RouletteIcon className="text-red-500" />,
    'Dream Catcher': <DreamCatcherIcon className="text-fuchsia-400" />,
    'Monopoly Live': <MonopolyIcon className="text-green-500" />,
    'Deal or No Deal Live': <MoneyIcon className="text-gray-400" />,
    'Football Studio': <FootballIcon className="text-green-400" />,
    'Side Bet City': <CardsIcon className="text-pink-500" />,
    // 50 NEW GAMES
    'Book of Dead': <BookIcon className="text-amber-500" />,
    'Starburst': <GemIcon className="text-yellow-300" />,
    'Gonzo\'s Quest Megaways': <ExplorerIcon className="text-green-500" />,
    'Bonanza Megaways': <MinesIcon className="text-gray-400" />,
    'Jammin\' Jars 2': <FruitIcon className="text-pink-500" />,
    'Money Train 3': <TrainIcon className="text-gray-600" />,
    'Wanted Dead or a Wild': <WildWestIcon className="text-red-700" />,
    'Reactoonz 2': <AlienIcon className="text-purple-400" />,
    'The Dog House': <AnimalPawIcon className="text-orange-400" />,
    'Fruit Party 2': <FruitIcon className="text-rose-400" />,
    'Gates of Valhalla': <MythologyIcon className="text-sky-400" />,
    'Big Bamboo': <AnimalPawIcon className="text-green-600" />,
    'RIP City': <GraffitiIcon className="text-gray-500" />,
    'Dork Unit': <FruitIcon className="text-yellow-400" />,
    'Hand of Anubis': <MythologyIcon className="text-gray-800" />,
    'Moon Princess': <StarlightPrincessIcon className="text-pink-400" />,
    'Fire in the Hole xBomb': <MinesIcon className="text-orange-600" />,
    'xWays Hoarder xSplit': <AbstractIcon className="text-yellow-600" />,
    'Deadwood': <WildWestIcon className="text-amber-800" />,
    'Iron Bank': <MoneyIcon className="text-gray-500" />,
    'Temple Tumble Megaways': <ExplorerIcon className="text-teal-500" />,
    'Book of Shadows': <BookIcon className="text-indigo-600" />,
    'Gigantoonz': <AlienIcon className="text-blue-500" />,
    'The Bowery Boys': <WildWestIcon className="text-lime-700" />,
    'Joker Stoker': <ClassicJokerIcon className="text-red-500" />,
    'Rich Wilde and the Amulet of Dead': <BookIcon className="text-amber-600" />,
    'Rise of Olympus 100': <OlympusIcon className="text-yellow-300" />,
    'Divine Fortune Megaways': <MythologyIcon className="text-amber-300" />,
    'Vikings Go Berzerk': <MythologyIcon className="text-blue-300" />,
    'Valley of the Gods': <MythologyIcon className="text-yellow-500" />,
    'Aviatrix': <AviatorIcon className="text-pink-500" />,
    'F777 Fighter': <RocketIcon className="text-gray-400" />,
    'Cricket X': <FootballIcon className="text-green-500" />,
    'To Mars and Beyond': <SpacemanIcon className="text-red-400" />,
    'XXXtreme Lightning Roulette': <LightningIcon className="text-yellow-400" />,
    'Crazy Coin Flip': <MoneyIcon className="text-purple-400" />,
    'Monopoly Big Baller': <MonopolyIcon className="text-teal-400" />,
    'Gold Bar Roulette': <RouletteIcon className="text-amber-400" />,
    'Gonzo\'s Treasure Hunt Live': <ExplorerIcon className="text-emerald-600" />,
    'Dead or Alive: Saloon': <WildWestIcon className="text-amber-700" />,
    'Football Studio Roulette': <FootballIcon className="text-blue-500" />,
    'Adventures Beyond Wonderland Live': <DreamCatcherIcon className="text-sky-400" />,
    'The Money Drop Live': <MoneyIcon className="text-green-400" />,
    'Mega Fire Blaze Roulette': <RouletteIcon className="text-red-600" />,
    'Quantum Roulette': <RouletteIcon className="text-indigo-500" />,
    'Age of the Gods Bonus Roulette': <MythologyIcon className="text-yellow-200" />,
    'Baccarat Squeeze': <CardsIcon className="text-red-700" />,
    'Casino Hold\'em': <CardsIcon className="text-green-700" />,
    'Three Card Poker': <CardsIcon className="text-blue-700" />,
    // 8 Novos Jogos Ao Vivo
    'Cash or Crash Live': <LiveIcon className="text-green-400" />,
    'Fan Tan Live': <LiveIcon className="text-gray-400" />,
    'Lightning Dice': <LightningIcon className="text-yellow-400" />,
    'Super Sic Bo': <LiveIcon className="text-red-400" />,
    '2 Hand Casino Hold\'em': <CardsIcon className="text-blue-500" />,
    'Ultimate Texas Hold\'em': <CardsIcon className="text-purple-500" />,
    'Caribbean Stud Poker': <CardsIcon className="text-teal-500" />,
    'Bet on Poker': <CardsIcon className="text-orange-500" />,
};
