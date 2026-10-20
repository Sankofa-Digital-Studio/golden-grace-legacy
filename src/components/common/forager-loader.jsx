import React, { useState, useEffect } from 'react';
import { Hexagon, Icon } from 'lucide-react';
import { bee } from '@lucide/lab';
import { FORAGER_MESSAGES } from '../../data/constants';

const ForagerLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === FORAGER_MESSAGES.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 400);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 900);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[2000] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ease-in-out cursor-pointer select-none
        ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      {/* Background Honeycomb Ambience */}
      <div className="absolute inset-0 bg-honeycomb opacity-10 pointer-events-none" />

      {/* 1. VISUAL ANCHOR: High-Precision Centering */}
      <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
        {/* Glow Foundation */}
        <div className="absolute inset-0 bg-amber-500/15 blur-3xl rounded-full animate-pulse" />

        {/* The Hexagon Frame: Rotating */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Hexagon size={84} className="text-amber-500 animate-spin-slow opacity-80" />
        </div>

        {/* The Navigator: Balanced Oscillation around Center */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Icon
            iconNode={bee}
            size={36}
            className="text-white animate-compass-float drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 2. TEXT LAYER: The Cycling Story */}
      <div className="space-y-6 text-center px-8 relative z-10 max-w-lg">
        <p className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] animate-pulse">
          Golden Grace Honey &bull; Free State Reserve
        </p>

        <div className="h-14 flex items-center justify-center">
          <h2
            key={index}
            className="text-white font-serif text-2xl md:text-3xl italic animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            "{FORAGER_MESSAGES[index]}"
          </h2>
        </div>

        {/* 3. PROGRESS BRIDGE */}
        <div className="relative w-48 h-1 mx-auto mt-8 overflow-hidden bg-white/10 rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 transition-all duration-500 rounded-full"
            style={{ width: `${((index + 1) / FORAGER_MESSAGES.length) * 100}%` }}
          />
        </div>

        <p className="text-gray-500 text-[9px] uppercase tracking-widest pt-2">
          Tap anywhere to enter
        </p>
      </div>

      {/* Screen Reader Compliance */}
      <span className="sr-only">The Golden Grace application is preparing your experience.</span>
    </div>
  );
};

export default ForagerLoader;
