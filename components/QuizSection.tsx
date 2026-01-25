
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

      <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gray-100 dark:bg-gray-700">
          <div 
            className="h-full bg-green-500 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / MOCK_QUIZ.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between mb-8">
          <span className="text-xl font-bold text-indigo-500">Question {currentIndex + 1} of {MOCK_QUIZ.length}</span>
          <span className="text-4xl">🧩</span>
        </div>

        <h2 className="text-4xl font-extrabold text-center mb-12 dark:text-white leading-tight">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!feedback}
              className={`
                p-6 text-2xl font-bold rounded-3xl transition-all border-4
                ${selectedOption === option 
                  ? feedback === 'correct' 
                    ? 'bg-green-500 border-green-200 text-white scale-105 shadow-green-200 shadow-xl'
                    : 'bg-red-500 border-red-200 text-white shake scale-95'
                  : 'bg-indigo-50 dark:bg-indigo-900/30 border-transparent hover:border-indigo-300 dark:text-white'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback === 'wrong' && (
          <div className="mt-8 text-center text-red-500 text-2xl font-bold animate-bounce">
            Try again! 💙 You can do it!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
