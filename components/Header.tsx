import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import Logo from './Logo';

interface HeaderProps {
    gameName?: string;
}

const Header: React.FC<HeaderProps> = ({ gameName }) => {
  return (
    <header className="text-center mb-8 flex flex-col items-center">
      <Logo className="w-24 h-24 mb-4" />
      <div className="flex items-center gap-2">
        <SparklesIcon className="w-8 h-8 text-green-400" />
        <h1 className="text-4xl font-bold text-white tracking-wider">
          BASE EX CASSINO
        </h1>
        <SparklesIcon className="w-8 h-8 text-green-400" />
      </div>
      <p className="text-green-400/80 mt-2 text-lg">
        {gameName ? `Inteligência IA para ${gameName}` : 'Inteligência IA'}
      </p>
    </header>
  );
};

export default Header;
