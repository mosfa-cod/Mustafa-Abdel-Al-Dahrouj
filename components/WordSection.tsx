
import React from 'react';
import { MOCK_WORDS } from '../constants';

const WordSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {MOCK_WORDS.map(word => (
        <div 
          key={word.id} 
          className="group relative bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-indigo-300 dark:hover:border-purple-400"
        >
          <div className="rounded-2xl overflow-hidden aspect-square relative">
            <img 
              src={word.image} 
              alt={word.word} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-5 text-center">
            <span className="inline-block bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-300/30 dark:border-purple-400/30">
              {word.category}
            </span>
            <h3 className="text-3xl font-black mt-3 text-gray-800 dark:text-white text-balance">{word.word}</h3>
          </div>
          <div className="absolute top-5 right-5 bg-gradient-to-br from-yellow-400 to-orange-400 text-white w-14 h-14 flex items-center justify-center rounded-full text-2xl shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all">
            🔊
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordSection;
