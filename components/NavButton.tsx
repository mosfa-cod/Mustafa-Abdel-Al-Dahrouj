
import React from 'react';

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, label, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base
        ${active 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105 shadow-lg shadow-indigo-500/50' 
          : 'bg-white/80 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-slate-600 border border-indigo-200 dark:border-slate-600'}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default NavButton;
