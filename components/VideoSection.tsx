
import React, { useRef } from 'react';

const VideoSection: React.FC = () => {
  const videos = Array.from({ length: 17 }, (_, i) => i + 1);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (activeVideoRef.current && activeVideoRef.current !== video) {
      activeVideoRef.current.pause();
    }
    activeVideoRef.current = video;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map(num => (
        <div 
          key={num} 
          className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3 border-2 border-transparent hover:border-indigo-400 dark:hover:border-purple-500"
        >
          <div className="relative aspect-video bg-black overflow-hidden">
            <video 
              src={`./videos/${num}.mp4`} 
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              controls
              preload="metadata"
              onPlay={handlePlay}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-5 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-black">
                Lesson {num}
              </span>
              <span className="text-2xl">📺</span>
            </div>
            <h3 className="text-lg font-bold mt-3 text-gray-800 dark:text-white text-balance">
              Fun with English
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">Interactive lesson for learners</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
