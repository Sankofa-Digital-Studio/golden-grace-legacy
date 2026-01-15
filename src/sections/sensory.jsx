
import React, { useState, useEffect, useRef } from 'react';

import SectionHeading from '../components/ui/section-heading';
import ViscosityPour from '../components/ui/viscosity-pour';
import TerroirCompass from '../components/ui/terroir-compass';
import BioAcousticHum from '../components/ui/bio-acoustic-hum';

const Sensory  = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  return (
    <section id="sensory" className="w-full py-24 bg-[#050505] relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-500/[0.03] blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-honeycomb opacity-[0.04] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <SectionHeading 
          pre="The Sensory Sanctuary"
          title="Life in" italic="Digital Form"
          sub="Transcending the screen to touch the density and hear the frequency of our harvest."
        />

        {/* SWIPE INDICATORS (At the TOP of the matrix) */}
        <div className="flex md:hidden justify-center gap-2 px-6">
            {[0, 1, 2].map(i => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'w-2 bg-white/10'}`} />
            ))}
        </div>

        {/* INTERACTION MATRIX (Mobile: Swipe, Desktop: Grid) */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 px-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide no-scrollbar"
        >
          <ViscosityPour />
          <TerroirCompass />
          <BioAcousticHum />
        </div>


      </div>
      
    </section>
  );
};
export default Sensory;


