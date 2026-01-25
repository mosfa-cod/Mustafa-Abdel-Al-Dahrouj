
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-[3rem] p-10 shadow-2xl text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-indigo-100 dark:border-indigo-900 shadow-inner">
          <img src={currentWord.image} alt={currentWord.word} className="w-full h-full object-cover" />
        </div>
      </div>

      <h2 className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-tight">
        {currentWord.word}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 font-bold mb-8">Listen and say it 3 times!</p>

      <div className="flex justify-center gap-4 mb-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${i < repeatCount ? 'bg-green-500 scale-110' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {i < repeatCount ? '✔️' : '👂'}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleListen}
          disabled={isPlaying}
          className={`
            px-10 py-5 rounded-full text-2xl font-black shadow-xl transition-all flex items-center justify-center gap-3
            ${isPlaying ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600 text-white active:scale-95'}
          `}
        >
          {isPlaying ? 'Playing...' : '🔊 Listen'}
        </button>
        <button 
          onClick={nextWord}
          className="px-10 py-5 rounded-full text-2xl font-black bg-yellow-400 hover:bg-yellow-500 text-white shadow-xl transition-all active:scale-95"
        >
          Next Word ➡️
        </button>
      </div>
    </div>
  );
};

export default ListenSection;
