import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/constants';
import DetailModal from '../components/ui/detail-modal';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';
const JourneySection = () => {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <section id="journey-section" className="py-16 px-6 bg-transparent relative z-10">
      <div className="absolute inset-0 bg-honeycomb opacity-[0.50] pointer-events-none -z-10" />
      {/* Triggering the Deep Dive Modal */}
      {activeDetail && <DetailModal step={activeDetail} onClose={() => setActiveDetail(null)} />}

      <div className="max-w-5xl mx-auto space-y-12">
        <SectionHeading
          pre="Movement of Grace"
          title="Hive to"
          italic="jar"
          sub="A rapid look at the unfiltered movement of Grace from the Welkom fields to your table."
        />
        <div className="max-w-5xl mx-auto px-6 pb-24 space-y-16 md:space-y-24 relative z-10">
          {/* Decorative Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-1/2" />

          {JOURNEY_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 relative group`}
            >
              {/* Step Image Container with Enhanced Golden Aesthetic */}
              <div className="w-full md:w-5/12 relative">
                {/* 1. REACTIVE AMBIENT GLOW: Expands when the user looks at the card */}
                <div className="absolute inset-0 bg-amber-500/0 blur-[100px] group-hover:bg-amber-500/10 transition-all duration-1000 rounded-full scale-50 group-hover:scale-100 -z-10" />

                {/* 2. THE PREMIUM GLASS BOX */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-amber-500/50 group-hover:shadow-amber-500/10">
                  {/* Decorative Subtle Glint (Top Left) */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10" />

                  <OptimizedImage
                    src={step.img}
                    alt={`${step.title} - ${step.subtitle}`}
                    title={step.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 golden-filter transition-all duration-[1500ms]"
                    priority={idx === 0}
                  />

                  {/* Inner Gradient for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-amber-500 text-black w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-serif text-xl md:text-2xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] z-20 group-hover:scale-110 transition-transform duration-500">
                  {idx + 1}
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-7/12 space-y-4 text-center md:text-left z-10 px-2 md:px-0">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    {step.icon}
                  </div>
                  <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Movement 0{idx + 1}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif leading-tight tracking-tight text-white">
                  {step.title} <br />
                  <span className="text-lg md:text-2xl text-gray-500 italic font-light tracking-normal">
                    {step.subtitle}
                  </span>
                </h2>

                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                  {step.description}
                </p>

                <button
                  onClick={() => setActiveDetail(step)}
                  title={`Examine technical evidence for ${step.title}`}
                  className="group pt-2 flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.3em] text-gray-500 hover:text-amber-500 transition-colors mx-auto md:mx-0 active:scale-95"
                >
                  Examine Detail{' '}
                  <MoveRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default JourneySection;
