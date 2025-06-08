import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface HeaderProps {
  onToggleInfo: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleInfo }) => {
  return (
    <header className="py-6 px-4 md:px-8 text-center border-b border-slate-700">
      <div className="flex items-center justify-center mb-2">
        <SparklesIcon className="w-8 h-8 text-amber-400 mr-3" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
          The Weaver's Evolution
        </h1>
      </div>
      <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
        An interactive fractal narrative. Your choices, guided by the Six Powers and emergent themes, weave The Weaver's Journey.
      </p>
      <button
        onClick={onToggleInfo}
        className="mt-3 text-xs text-sky-400 hover:text-sky-300 transition-colors inline-flex items-center"
      >
        Learn about Narrative Intelligence
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
