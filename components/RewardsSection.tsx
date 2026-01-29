
import React from 'react';
import { Reward } from '../types';

interface RewardsSectionProps {
  rewards: Reward[];
  score: number;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ rewards, score }) => {
  return (
    <div className="text-center">
      <h2 className="text-5xl md:text-6xl font-black mb-2 dark:text-white text-gray-800 text-balance">Your Hall of Fame 🏛️</h2>
      <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-black text-2xl mb-12 shadow-lg shadow-yellow-500/50">
        ⭐ {score} Stars
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {rewards.map(reward => (
          <div 
            key={reward.id}
            className={`
              p-8 rounded-2xl flex flex-col items-center gap-4 transition-all border-2 transform
              ${reward.unlocked 
                ? 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100 dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-yellow-900/30 border-yellow-400 dark:border-yellow-600 shadow-xl shadow-yellow-500/30 hover:scale-105' 
                : 'bg-gray-100 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 opacity-60'}
            `}
          >
            <span className={`text-7xl transition-transform ${reward.unlocked ? 'bouncy scale-125' : 'grayscale scale-100'}`}>
              {reward.unlocked ? reward.icon : '🔒'}
            </span>
            <h3 className="text-2xl font-black text-gray-800 dark:text-white">{reward.name}</h3>
            <p className="text-xs font-bold text-gray-600 dark:text-slate-300 uppercase tracking-wide">{reward.requirement}</p>
            {reward.unlocked ? (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase shadow-md shadow-green-500/30">✅ Unlocked</span>
            ) : (
              <span className="bg-gray-400 dark:bg-slate-500 text-white px-4 py-2 rounded-full text-xs font-black uppercase">🔄 Keep Trying</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-pink-900/50 rounded-3xl text-white shadow-2xl relative overflow-hidden border-2 border-indigo-400/50 dark:border-purple-600/50">
        <div className="absolute top-0 right-0 text-9xl opacity-10 translate-x-10 -translate-y-10">🎓</div>
        <div className="absolute bottom-0 left-0 text-8xl opacity-10 -translate-x-5 translate-y-5">🚀</div>
        <h3 className="text-4xl font-black mb-4 relative z-10 text-balance">You're doing amazing!</h3>
        <p className="text-lg font-semibold opacity-95 relative z-10">Keep learning to unlock more legendary treasures! 💎✨</p>
      </div>
    </div>
  );
};

export default RewardsSection;
