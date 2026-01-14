import React, { useState, useEffect } from 'react';
import { Hexagon, Compass } from 'lucide-react';
import { FORAGER_MESSAGES } from '../../data/constants';


const ForagerLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Cycle through messages every 1.2 seconds to mimic a natural rhythm
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === FORAGER_MESSAGES.length - 1) {
          clearInterval(interval);
          // Pause briefly on the final state before initiating the exit fade
          setTimeout(() => setIsFading(true), 800);
          setTimeout(onComplete, 1600); // Signal completion to the parent App component
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[2000] bg-[#050505] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out
        ${isFading ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      {/* 1. VISUAL ANCHOR: Centered Navigator & Hexagon */}
      <div className="relative mb-12 flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full animate-pulse" />
        
        {/* Rotating Hexagon Frame */}
        <Hexagon 
          size={80} 
          className="text-amber-500 animate-[spin_8s_linear_infinite] relative z-10 opacity-80" 
        />
        
        {/* Centered Compass Navigator */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Compass 
            size={32} 
            className="text-white animate-bounce" 
          />
        </div>
      </div>

      {/* 2. TEXT LAYER: The Cycling Story */}
      <div className="space-y-6 text-center px-8">
        <p className="text-amber-500 font-bold uppercase tracking-[0.6em] text-[10px] animate-pulse">
            Golden Grace is Gathering
        </p>
        
        <div className="h-12 flex items-center justify-center">
            <h2 
                key={index}
                className="text-white font-serif text-2xl md:text-4xl italic animate-in fade-in slide-in-from-bottom-2 duration-700"
            >
                "{FORAGER_MESSAGES[index]}"
            </h2>
        </div>

        {/* 3. PROGRESS BRIDGE: Visual feedback for the sequence duration */}
        <div className="relative w-48 h-px mx-auto mt-12 overflow-hidden bg-white/10 rounded-full">
            <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-1000"
                style={{ width: `${((index + 1) / FORAGER_MESSAGES.length) * 100}%` }}
            />
        </div>
      </div>
      
      {/* Industrial Accessibility Compliance */}
      <span className="sr-only">Golden Grace is preparing your harvest experience.</span>
    </div>
  );
};

export default ForagerLoader;