import React, { useState, useEffect, useRef, useId } from 'react';
import { Hexagon } from 'lucide-react';

export const OptimizedImage = ({ src, alt, className = "", priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : "");
  const containerRef = useRef(null);
  const rawId = useId();
  const patternId = rawId.replace(/[^a-zA-Z0-9_-]/g, '-');

  useEffect(() => {
    if (priority) return;

    // Intersection Observer to trigger load only when approaching screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '250px' }
    );

    const currentElem = containerRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, [src, priority]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
    >
      {/* --- ANIMATED HONEYCOMB FALLBACK (Artisanal Line Shimmer) --- */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ease-out pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Animated SVG Honeycomb Grid */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`comb-pattern-${patternId}`}
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-comb-draw"
              />
            </pattern>
            <radialGradient
              id={`comb-glow-${patternId}`}
              cx="50%"
              cy="50%"
              r="60%"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0.85" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#comb-glow-${patternId})`} />
          <rect
            width="100%"
            height="100%"
            fill={`url(#comb-pattern-${patternId})`}
          />
        </svg>

        {/* Central Hexagonal Heartbeat Indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 blur-md animate-pulse" />
            <Hexagon
              size={24}
              className="text-amber-500/80 animate-spin-slow transition-transform"
            />
          </div>
        </div>
      </div>

      {/* --- RENDERED IMAGE (Silky Fade-in Transition) --- */}
      {currentSrc && !hasError && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out relative z-10 ${
            isLoaded
              ? 'opacity-100 scale-100 blur-0'
              : 'opacity-0 scale-[1.02] blur-sm'
          }`}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;