// src/components/ui/image-carousel.jsx
import React, { useState, useEffect } from 'react';
import OptimizedImage from './optimized-image';
export const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Safety check: if no images, do nothing
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  const nextIndex = images.length > 1 ? (currentIndex + 1) % images.length : currentIndex;
  const renderIndexes = Array.from(new Set([currentIndex, nextIndex]));

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      {renderIndexes.map((index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
        >
         <OptimizedImage 
            src={images[index]}
            alt={`Hero Slide ${index + 1}`}
            priority={index === currentIndex}
            sizes="100vw"
            className="h-full w-full object-cover opacity-60"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
