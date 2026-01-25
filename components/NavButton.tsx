
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
        flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap
        ${active 
          ? 'bg-[#4f46e5] text-white scale-105 shadow-md' 
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
      `}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
};

export default NavButton;
