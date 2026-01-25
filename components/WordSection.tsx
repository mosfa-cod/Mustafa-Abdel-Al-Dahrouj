
import React from 'react';
import { MOCK_WORDS } from '../constants';

const WordSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {MOCK_WORDS.map(word => (
        <div 
          key={word.id} 
          className="group relative bg-white dark:bg-gray-800 rounded-[2rem] p-4 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <div className="rounded-[1.5rem] overflow-hidden aspect-square">
            <img 
              src={word.image} 
              alt={word.word} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">{word.category}</span>
            <h3 className="text-3xl font-extrabold mt-1 text-gray-800 dark:text-white">{word.word}</h3>
          </div>
          <div className="absolute top-6 right-6 bg-yellow-400 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl shadow-lg group-hover:rotate-12 transition-transform">
            🔊
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordSection;
