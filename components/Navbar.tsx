import React from 'react';
import type { Page } from '../types';

// === NAVIGATION ICONS ===
const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const HistoryNavIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
);
const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);
const SupportIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="9.17" y1="14.83" x2="4.93" y2="19.07"/><line x1="19.07" y1="4.93" x2="14.83" y2="9.17"/></svg>
);

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    isGameSelected: boolean;
}

const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    const activeClass = isActive ? 'text-amber-300' : 'text-amber-200/60 hover:text-amber-100';

    return (
        <button
            onClick={onClick}
            className={`relative z-0 flex flex-col items-center justify-center gap-1 p-2 transition-colors duration-200 ${activeClass}`}
            aria-label={`Navegar para ${label}`}
        >
            {isActive && (
                <span className="absolute inset-0 -top-1 mx-auto h-12 w-16 bg-amber-500/20 rounded-full blur-lg -z-10"></span>
            )}
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, isGameSelected }) => {
    return (
        <nav 
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/60 backdrop-blur-xl z-50"
            style={{ boxShadow: '0 -4px 20px rgba(245, 158, 11, 0.15)' }}
        >
            <div className="max-w-md mx-auto flex justify-around">
                <NavItem
                    page="generator"
                    label="Jogos"
                    icon={<HomeIcon className="w-6 h-6" />}
                    isActive={currentPage === 'generator' && !isGameSelected}
                    onClick={() => onNavigate('generator')}
                />
                <NavItem
                    page="history"
                    label="Histórico"
                    icon={<HistoryNavIcon className="w-6 h-6" />}
                    isActive={currentPage === 'history'}
                    onClick={() => onNavigate('history')}
                />
                <NavItem
                    page="info"
                    label="Ajuda"
                    icon={<InfoIcon className="w-6 h-6" />}
                    isActive={currentPage === 'info'}
                    onClick={() => onNavigate('info')}
                />
                <NavItem
                    page="support"
                    label="Suporte"
                    icon={<SupportIcon className="w-6 h-6" />}
                    isActive={currentPage === 'support'}
                    onClick={() => onNavigate('support')}
                />
            </div>
        </nav>
    );
};
