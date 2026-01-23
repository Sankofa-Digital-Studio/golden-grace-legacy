import React, { useState, useEffect } from 'react';

export const OptimizedImage = ({ src, alt, className = "", priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : "");

  useEffect(() => {
    if (priority) return;

    // Intersection Observer to trigger load only when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' }); // Load 200px before it enters the screen

    const element = document.getElementById(`img-${src}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [src, priority]);

  return (
    <div 
      id={`img-${src}`}
      className={`relative overflow-hidden bg-white/5 ${className}`}
    >
      {/* Placeholder: Honeycomb Shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-honeycomb opacity-[0.05] animate-pulse" />
      )}

      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-in-out
            ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'}`}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;