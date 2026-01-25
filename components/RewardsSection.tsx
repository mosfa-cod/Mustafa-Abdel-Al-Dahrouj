
import React from 'react';
import { Reward } from '../types';

interface RewardsSectionProps {
  rewards: Reward[];
  score: number;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ rewards, score }) => {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-black mb-4 dark:text-white">Your Hall of Fame 🏛️</h2>
      <p className="text-2xl font-bold text-indigo-500 mb-12">Total Score: {score} Stars ⭐</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {rewards.map(reward => (
          <div 
            key={reward.id}
            className={`
              p-8 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all
              ${reward.unlocked 
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 border-4 border-yellow-400 shadow-xl' 
                : 'bg-gray-100 dark:bg-gray-800 border-4 border-transparent opacity-60'}
            `}
          >
            <span className={`text-7xl ${reward.unlocked ? 'bouncy' : 'grayscale'}`}>
              {reward.unlocked ? reward.icon : '🔒'}
            </span>
            <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white">{reward.name}</h3>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{reward.requirement}</p>
            {reward.unlocked ? (
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Unlocked</span>
            ) : (
              <span className="bg-gray-400 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Keep Trying</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-indigo-500 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 text-9xl opacity-10 translate-x-10 -translate-y-10">🎓</div>
        <h3 className="text-4xl font-black mb-4">You're doing great!</h3>
        <p className="text-xl opacity-90">Keep learning to unlock more legendary treasures! 💎🚀</p>
      </div>
    </div>
  );
};

export default RewardsSection;
