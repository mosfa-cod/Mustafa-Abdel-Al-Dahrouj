
import React, { useState } from 'react';
import { generateSpeech } from '../services/geminiService';
import { MOCK_WORDS } from '../constants';

interface ListenSectionProps {
  onComplete: () => void;
}

const ListenSection: React.FC<ListenSectionProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);

  const currentWord = MOCK_WORDS[currentIndex];

  const handleListen = async () => {
    setIsPlaying(true);
    await generateSpeech(currentWord.word);
    setIsPlaying(false);
    setRepeatCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        onComplete();
      }
      return newCount;
    });
  };

  const nextWord = () => {
    setCurrentIndex((currentIndex + 1) % MOCK_WORDS.length);
    setRepeatCount(0);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl text-center border-2 border-indigo-100 dark:border-purple-900">
      <div className="mb-8 flex justify-center relative">
        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-400 to-purple-400 shadow-2xl relative">
          <img src={currentWord.image} alt={currentWord.word} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg">
          👂
        </div>
      </div>

      <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 uppercase tracking-tight text-balance">
        {currentWord.word}
      </h2>
      <p className="text-gray-600 dark:text-slate-300 font-bold mb-10">Listen and say it 3 times! 🎤</p>

      <div className="flex justify-center gap-3 mb-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all transform ${
              i < repeatCount 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 scale-110 shadow-lg shadow-green-500/50' 
                : 'bg-gray-200 dark:bg-slate-700 scale-100'
            }`}
          >
            {i < repeatCount ? '✅' : '👂'}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleListen}
          disabled={isPlaying}
          className={`
            px-8 py-4 rounded-2xl text-lg font-black shadow-xl transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none
            ${isPlaying 
              ? 'bg-gray-400 dark:bg-slate-600 text-white' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white active:scale-95 shadow-lg shadow-indigo-500/50'}
          `}
        >
          {isPlaying ? '⏳ Playing...' : '🔊 Listen'}
        </button>
        <button 
          onClick={nextWord}
          className="px-8 py-4 rounded-2xl text-lg font-black bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-xl transition-all active:scale-95 shadow-orange-500/50 flex-1 sm:flex-none"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ListenSection;
