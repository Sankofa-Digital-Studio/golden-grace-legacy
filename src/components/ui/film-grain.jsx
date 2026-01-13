import React from 'react';

const FilmGrain = () => (
  <div className="pointer-events-none fixed inset-0 z-[200] opacity-20 mix-blend-overlay overflow-hidden">
    <svg className='h-full w-full' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence 
          type='fractalNoise' 
          baseFrequency='0.85' 
          numOctaves='3' 
          stitchTiles='stitch'
        />
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
    </svg>
  </div>
);

export default FilmGrain;