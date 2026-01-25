
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
          className="bg-white dark:bg-indigo-900/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-transparent hover:border-indigo-400"
        >
          <div className="relative aspect-video bg-black">
            <video 
              src={`./videos/${num}.mp4`} 
              className="w-full h-full"
              controls
              preload="metadata"
              onPlay={handlePlay}
            />
          </div>
          <div className="p-4 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">Lesson {num}</span>
              Fun with English
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
