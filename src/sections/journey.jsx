import React from 'react';
import { ArrowLeft, ChevronDown, MoveRight, Hexagon } from 'lucide-react';
import { JOURNEY_STEPS, HARVEST_IMAGES } from '../data/constants';

/**
 * HIVE TO JAR: SANKOFA SNEAK PEEK
 * Refined for warmth, flow, and intimate storytelling.
 * Focuses on removing "mechanical" gaps and adding "soulful" depth.
 */
const JourneySection = ({ onBack }) => (
  <div className="bg-[#050505] text-white animate-in fade-in duration-1000 relative">
    {/* Global Section Texture/Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none" />

    {/* Subltle Honeycomb Pattern Overlay */}
    <div className="absolute inset-0 bg-honeycomb opacity-[0.35] pointer-events-none z-0"/>
      {/* Hive to Jar Header */}
      <header className="relative pt-16 pb-12 px-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] block mb-2">
            Evidence of Integrity
          </span>
          <h1 className="text-4xl md:text-7xl font-serif leading-none tracking-tight">
            Hive to <span className="italic text-amber-400 font-light">Jar</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-xs md:text-sm font-light tracking-wide italic leading-relaxed">
            "A rapid look at the unfiltered movement of Grace from the Welkom fields to your table."
          </p>
        </div>
      </header>
    
    {/* The Process Flow (Tighter & Organic) */}
    <div className="max-w-5xl mx-auto px-6 pb-24 space-y-16 md:space-y-24 relative">
      {/* Visual Flow Line (Hidden on Mobile for simplicity, visible on Desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-1/2" />

      {JOURNEY_STEPS.map((step, idx) => (
        <div
          key={step.id}
          className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 relative`}
        >
          {/* Step Image - Wrapped in a glowing aura */}
          <div className="w-full md:w-1/2 relative group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-amber-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl transition-all duration-700 group-hover:border-amber-500/30">
              <img
                src={step.img}
                alt={`${step.title} - ${step.subtitle}`}
                title={step.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent opacity-60" />
            </div>

            {/* Floating Step Number */}
            <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-amber-500 text-black w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-serif text-xl md:text-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] z-10 animate-fade-in">
              {idx + 1}
            </div>
          </div>

          {/* Text Content - Positioned closer to image */}
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left z-10 px-2 md:px-0">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500">
                {step.icon}
              </div>
              <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                Movement 0{idx + 1}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight tracking-tight">
              {step.title} <br />
              <span className="text-lg md:text-2xl text-gray-500 italic font-light tracking-normal">
                {step.subtitle}
              </span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto md:mx-0">
              {step.description}
            </p>

            <button
              title={`View ${step.title} detail`}
              className="group pt-2 flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.3em] text-gray-500 hover:text-amber-500 transition-colors mx-auto md:mx-0"
            >
              Examine Detail{' '}
              <MoveRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Section Closer / Bridge */}
    <section className="py-20 text-center relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-amber-950/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-6 px-6">
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.5em] font-bold">
          The journey is deeper than a glance
        </p>
        <h3 className="text-2xl md:text-4xl font-serif text-white italic">
          "Witness the full integrity of the harvest."
        </h3>
        <div className="pt-4">
          <button
            onClick={onBack}
            title="Return to the Hive for more"
            className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all shadow-xl active:scale-90"
          >
            Return to Hive
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default JourneySection;
