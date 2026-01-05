// import React, { useState, useEffect } from 'react';

// const CAROUSEL_IMAGES = [
//   {
//     id: 1,
//     src: "/images/hero-bg-slide-1.webp",
//     alt: "hero-slide-1: honey jars on wooden table"
//   },
//   {
//     id: 2,
//     src: "/images/hero-bg-slide-2.webp",
//     alt: "hero-slide-2: blue mug in flowers"
//   },
//   {
//     id: 3,
//     src: "/images/hero-bg-slide-3.webp",
//     alt: "hero-slide-3: extraction process of honey"
//   },
//   {
//     id: 4,
//     src: "/images/hero-bg-slide-4.webp", // Get proper name
//     alt: "hero-slide-4: honey comb close-up"
//   }
// ];

// const ImageCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     // 1. Set up the timer to switch images every 6 seconds
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 6000);

//     // 2. Cleanup the timer when the component goes away (prevents memory leaks)
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
//       {CAROUSEL_IMAGES.map((image, index) => (
//         <div
//           key={image.id}
//           className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
//             ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
//           `}
//         >
//           {/* The Image Itself
//              - 'object-cover': Ensures it covers the whole screen on mobile & desktop.
//              - 'animate-ken-burns': A custom animation for that slow, emotional zoom.
//           */}
//           <img
//             src={image.src}
//             alt={image.alt}
//             className={`h-full w-full object-cover ${index === currentIndex ? 'scale-110 transition-transform duration-[10000ms] ease-linear' : 'scale-100'}`}
//           />

//           {/* Dark Overlay for Text Readability (Optional but recommended) */}
//           <div className="absolute inset-0 bg-black/40" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageCarousel;
import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 Seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Image with Ken Burns Effect (Slow Zoom) */}
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className={`h-full w-full object-cover opacity-60 
                ${index === currentIndex ? 'scale-110 transition-transform duration-[6000ms] ease-linear' : 'scale-100'}
            `}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
