import React, { useState, useRef } from 'react';

import SectionHeading from '../../../components/ui/section-heading';
import ViscosityPour from '../../../components/ui/viscosity-pour';
import TerroirCompass from '../../../components/ui/terroir-compass';
import BioAcousticHum from '../../../components/ui/bio-acoustic-hum';
import Section from '../../../components/layout/section';

const Sensory = () => {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getActiveIndex = () => {
    const el = scrollRef.current;
    if (!el) return 0;

    const children = el.children?.length ?? 1;
    const totalScrollable = el.scrollWidth - el.clientWidth;

    if (totalScrollable <= 0) return 0;

    const progress = el.scrollLeft / totalScrollable; // 0..1
    const idx = Math.round(progress * (children - 1));
    return Math.max(0, Math.min(children - 1, idx));
  };

  const handleScroll = () => {
    // Throttle via rAF to reduce scroll jank
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const idx = getActiveIndex();
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    });
  };

  return (
    <Section id="sensory" className="overflow-hidden">
      {/* Ambient layers (full-bleed) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-500/[0.03] blur-[180px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-honeycomb opacity-[0.04] pointer-events-none -z-10" />

      <div className="space-y-10 md:space-y-12 relative z-10">
        <SectionHeading
          pre="The Sensory Sanctuary"
          title="Life in"
          italic="Digital Form"
          sub="Transcending the screen to touch the density and hear the frequency of our harvest."
        />

        {/* Swipe indicators (mobile only) */}
        <div className="flex md:hidden justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? 'w-10 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                  : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Interaction matrix */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex md:grid md:grid-cols-3
            gap-6 md:gap-8
            overflow-x-auto md:overflow-x-visible
            snap-x snap-mandatory
            no-scrollbar
          "
        >
          {/* 
            IMPORTANT:
            Ensure each child component (ViscosityPour / TerroirCompass / BioAcousticHum)
            has `snap-center` on its outermost wrapper for best mobile swipe feel.
            If they don’t, we’ll add it inside those components next.
          */}
          <ViscosityPour />
          <TerroirCompass />
          <BioAcousticHum />
        </div>
      </div>
    </Section>
  );
};

export default Sensory;
