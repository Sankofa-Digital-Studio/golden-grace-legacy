// import React from 'react';
// import SectionHeading from '../components/ui/section-heading';
// import OptimizedImage from '../components/ui/optimized-image';
// const Sensory = () => (
//   <section id="sensory" className="py-16 md:py-20 2xl:py-32  bg-[#050505] relative">
//     <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
//       <SectionHeading
//         pre="Liquid Soul"
//         title="Sensory"
//         italic="whispers"
//         sub="Feel the texture, see the shimmer, and taste the unfiltered truth of raw honey."
//       />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-16">
//         <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
//           <OptimizedImage
//             src="/images/sensory/liquid-gold.webp"
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
//             alt="Liquid Honey Texture"
//             loading="lazy"
//             decoding="async"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
//             <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
//               Liquid Gold
//             </h3>
//             <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
//               Smooth, viscous, and clarifying. Sourced from Wildflower, Blue Gum, and Eucalyptus.
//               Flows like silk.
//             </p>
//           </div>
//         </div>
//         <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
//           <OptimizedImage
//             src="/images/sensory/creamed-goodness.webp"
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
//             alt="Creamed Honey Texture"
//             loading="lazy"
//             decoding="async"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
//             <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
//               Velvet Cream
//             </h3>
//             <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
//               Naturally crystallized Sunflower honey whipped into a buttery, spreadable delight.
//             </p>
//           </div>
//         </div>
//         <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
//           <OptimizedImage
//             src="/images/sensory/infused-botanicals.webp"
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
//             alt="Infused Honey"
//             loading="lazy"
//             decoding="async"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
//             <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
//               Botanical Infusions
//             </h3>
//             <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
//               Expertly blended with Ginger, Garlic, or Lemon for a potent wellness boost.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default Sensory;

import React, { useState, useEffect, useRef } from 'react';
import {
  MoveDown,
} from 'lucide-react';
import SectionHeading from '../components/ui/section-heading';
import ViscosityPour from '../components/ui/viscosity-pour';
import TerroirCompass from '../components/ui/terroir-compass';
import BioAcousticHum from '../components/ui/bio-acoustic-hum';
/**
 * --- MAIN SENSORY SECTION ---
 */
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
      
      <style>{`
        
      `}</style>
    </section>
  );
};
export default Sensory;


