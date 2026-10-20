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

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
        >
         <OptimizedImage 
            src={img}
            alt={`Hero Slide ${index + 1}`}
            className="h-full w-full object-cover opacity-60"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;