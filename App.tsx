
import React, { useState, useEffect, useCallback } from 'react';
import { Section } from './types';
import { COLORS, MOCK_REWARDS } from './constants';
import VideoSection from './components/VideoSection';
import WordSection from './components/WordSection';
import QuizSection from './components/QuizSection';
import ListenSection from './components/ListenSection';
import RewardsSection from './components/RewardsSection';
import NavButton from './components/NavButton';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.VIDEOS);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [score, setScore] = useState(0);
  const [rewards, setRewards] = useState(MOCK_REWARDS);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const addScore = useCallback((points: number) => {
    setScore(prev => prev + points);
    // Logic to unlock rewards based on score/actions could go here
    if (score + points > 50) {
      setRewards(prev => prev.map(r => r.id === 'r2' ? { ...r, unlocked: true } : r));
    }
  }, [score]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderSection = () => {
    switch (currentSection) {
      case Section.VIDEOS: return <VideoSection />;
      case Section.WORDS: return <WordSection />;
      case Section.QUIZ: return <QuizSection onCorrect={() => addScore(10)} />;
      case Section.LISTEN: return <ListenSection onComplete={() => {
        addScore(5);
        setRewards(prev => prev.map(r => r.id === 'r3' ? { ...r, unlocked: true } : r));
      }} />;
      case Section.REWARDS: return <RewardsSection rewards={rewards} score={score} />;
      default: return <VideoSection />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className={`p-6 sticky top-0 z-50 shadow-lg backdrop-blur-md flex flex-col md:flex-row items-center justify-between transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700' 
          : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 border-b border-indigo-400 text-white shadow-xl'
      }`}>
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <span className="text-4xl bouncy">🎈</span>
          <div>
            <h1 className={`text-2xl md:text-3xl font-black tracking-tight text-balance ${darkMode ? 'text-white' : 'text-white'}`}>
              Super English Academy
            </h1>
            <p className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-indigo-100'}`}>Learn English with Fun! 🌟</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 backdrop-blur-sm ${
            darkMode 
              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-300' 
              : 'bg-white/20 border border-white/30 text-white'
          }`}>
            <span className="text-xl">⭐</span> 
            <span className="font-black text-lg">{score}</span>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all text-xl font-bold ${
              darkMode 
                ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-300' 
                : 'bg-white/20 hover:bg-white/30 border border-white/30 text-white'
            }`}
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`p-4 backdrop-blur-md sticky top-20 md:top-24 z-40 overflow-x-auto border-b transition-colors ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-white/80 border-indigo-100'
      }`}>
        <div className="max-w-6xl mx-auto flex gap-2 justify-start md:justify-center">
          <NavButton 
            active={currentSection === Section.VIDEOS} 
            onClick={() => setCurrentSection(Section.VIDEOS)}
            label="Videos" 
            icon="📺"
          />
          <NavButton 
            active={currentSection === Section.WORDS} 
            onClick={() => setCurrentSection(Section.WORDS)}
            label="Words" 
            icon="📸"
          />
          <NavButton 
            active={currentSection === Section.QUIZ} 
            onClick={() => setCurrentSection(Section.QUIZ)}
            label="Quiz" 
            icon="🧩"
          />
          <NavButton 
            active={currentSection === Section.LISTEN} 
            onClick={() => setCurrentSection(Section.LISTEN)}
            label="Listen" 
            icon="👂"
          />
          <NavButton 
            active={currentSection === Section.REWARDS} 
            onClick={() => setCurrentSection(Section.REWARDS)}
            label="Rewards" 
            icon="🏆"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className={`flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full transition-all duration-500 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
        <div className="slide-in-up">
          {renderSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-8 text-center transition-all ${
        darkMode 
          ? 'bg-slate-800 border-t border-slate-700 text-slate-300' 
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-t border-indigo-400'
      }`}>
        <p className="text-lg font-semibold">Made with 💜 for future superstars!</p>
        <p className="text-sm mt-2 opacity-80">© 2024 Super English Academy • Keep Learning! 🚀</p>
      </footer>
    </div>
  );
};

export default App;
