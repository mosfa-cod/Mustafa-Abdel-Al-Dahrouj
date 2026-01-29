
import React, { useState, useEffect } from 'react';
import { MOCK_QUIZ } from '../constants';

interface QuizSectionProps {
  onCorrect: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onCorrect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showTrophy, setShowTrophy] = useState(false);

  const currentQuestion = MOCK_QUIZ[currentIndex];

  const handleSelect = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
      onCorrect();
      setShowTrophy(true);
      // Play sound would happen here
      setTimeout(() => {
        setShowTrophy(false);
        if (currentIndex < MOCK_QUIZ.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setFeedback(null);
          setSelectedOption(null);
        } else {
          // Finished quiz
          setFeedback(null);
          setSelectedOption(null);
          setCurrentIndex(0);
        }
      }, 3000);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {showTrophy && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-[150px] bouncy">🏆</div>
          <div className="text-white text-4xl font-black mt-8 animate-pulse text-center">
            AMAZING JOB!<br/>🎉👏🎉
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden border-2 border-indigo-100 dark:border-purple-900">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700" 
            style={{ width: `${((currentIndex + 1) / MOCK_QUIZ.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">Question Progress</p>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{currentIndex + 1} of {MOCK_QUIZ.length}</span>
          </div>
          <span className="text-5xl bouncy">🧩</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 dark:text-white leading-tight text-balance text-gray-800">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!feedback}
              className={`
                p-6 text-xl font-bold rounded-2xl transition-all border-2 md:text-2xl
                ${selectedOption === option 
                  ? feedback === 'correct' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 text-white scale-105 shadow-lg shadow-green-500/50'
                    : 'bg-gradient-to-r from-red-500 to-pink-500 border-red-300 text-white shake scale-95 shadow-lg shadow-red-500/50'
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-600/50 border-indigo-200 dark:border-slate-500 text-gray-800 dark:text-white hover:border-indigo-400 dark:hover:border-purple-400 hover:shadow-md'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback === 'wrong' && (
          <div className="mt-8 text-center text-red-600 dark:text-red-400 text-2xl font-bold animate-bounce">
            Try again! 💙 You can do it!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
