
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
      document.body.classList.add('bg-[#1e1b4b]', 'text-white');
      document.body.classList.remove('bg-[#f2f6ff]', 'text-[#2d3748]');
    } else {
      document.body.classList.add('bg-[#f2f6ff]', 'text-[#2d3748]');
      document.body.classList.remove('bg-[#1e1b4b]', 'text-white');
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
      <header className={`p-6 sticky top-0 z-50 shadow-lg flex flex-col md:flex-row items-center justify-between transition-colors duration-300 ${darkMode ? 'bg-[#312e81]' : 'bg-[#4f46e5] text-white'}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <span className="text-4xl bouncy">🎈</span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Super English Academy</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-full font-bold flex items-center gap-2">
            <span className="text-yellow-400">⭐</span> {score}
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xl"
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-[104px] md:top-[88px] z-40 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex gap-3 justify-start md:justify-center">
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
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full transition-all duration-500">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center opacity-70">
        <p className="text-lg">Made with ❤️ for future superstars!</p>
        <p className="text-sm mt-2">© 2024 Super English Academy</p>
      </footer>
    </div>
  );
};

export default App;
