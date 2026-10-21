import React from 'react';
import { Square } from 'lucide-react';

const VideoModal = ({ videoSrc, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Video Container */}
      <div className="relative w-full max-w-7xl px-4 flex flex-col items-center">
        <video
          controls
          autoPlay
          className="w-full max-h-[70vh] rounded-lg shadow-2xl ring-1 ring-white/10 aspect-video object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 'Return to Site' Button */}
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
          <button
            onClick={onClose}
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-white hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            <Square
              size={16}
              className="fill-current text-white/80 group-hover:text-red-400 transition-colors"
            />

            <span className="text-sm font-bold tracking-widest uppercase">Return to Site</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
