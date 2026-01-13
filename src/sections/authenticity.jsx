
import React, { useState, useRef } from 'react';
import { ArrowRight, Home as HomeIcon } from 'lucide-react';
import GlassCard from '../components/ui/glass-card';
import { LEXICON_GROUPS, INTERESTING_FACTS } from '../data/constants';

const Authenticity = () => {
  const scrollRef = useRef(null);
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section id="authenticity" className="py-32 px-6 bg-transparent relative z-10">
      <div className="absolute inset-0 bg-honeycomb opacity-[0.22] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto space-y-32">
        {/* TRUTH IN SCIENCE */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-8xl font-serif text-white leading-none tracking-tight">
            Truth in <span className="italic text-amber-500">Science.</span>
          </h2>
          <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px]">
            Unfiltered Evidence of Integrity
          </p>
        </div>

        {/* SWIPEABLE FIELD GUIDE */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-2">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] block">
                Field Guide
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-white italic">Did you know?</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5 h-1">
                {INTERESTING_FACTS.map((_, i) => (
                  <div key={i} className="w-6 h-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-300 w-0" />
                  </div>
                ))}
              </div>
              <div className="hidden md:flex gap-2">
                <button
                  title="Previous Fact"
                  onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                  className="p-3 rounded-full border border-white/10 hover:bg-amber-500 hover:text-black transition-all active:scale-90"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <button
                  title="Next Fact"
                  onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                  className="p-3 rounded-full border border-white/10 hover:bg-amber-500 hover:text-black transition-all active:scale-90"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Swipe Container with Snap */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {INTERESTING_FACTS.map((fact, i) => (
              <div key={i} className="min-w-[90%] md:min-w-[450px] snap-center">
                <GlassCard className="h-full flex flex-col overflow-hidden group hover:border-amber-500/40 transition-all duration-700">
                  <div className="h-56 relative overflow-hidden bg-black/60">
                    <img
                      src={fact.img}
                      alt={fact.title}
                      className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000"
                    />
                    <div className="absolute top-6 left-6 bg-amber-500 text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {fact.page}
                    </div>
                  </div>
                  <div className="p-10 space-y-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        {fact.icon}
                      </div>
                      <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                        {fact.category}
                      </span>
                    </div>
                    <h4 className="text-3xl font-serif text-white">{fact.title}</h4>
                    <p className="text-gray-400 text-base leading-relaxed font-light italic">
                      "{fact.content}"
                    </p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* THE HIVE LEXICON (Renamed & Grouped) */}
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] block">
              Linguistic Integrity
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-white">
              The Hive <span className="italic text-amber-500">Lexicon.</span>
            </h3>
          </div>

          {/* Logical Grouping Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {LEXICON_GROUPS.map((group, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGroup(idx)}
                title={`View ${group.name}`}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                    ${activeGroup === idx ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
              >
                {group.icon} {group.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {LEXICON_GROUPS[activeGroup].terms.map((item, i) => (
              <GlassCard
                key={i}
                className="p-8 space-y-4 hover:border-amber-500/30 transition-all group"
              >
                <h4 className="text-xl font-serif text-white group-hover:text-amber-500 transition-colors">
                  {item.term}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {item.definition}
                </p>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-amber-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                    Our Standard
                  </p>
                  <p className="text-white text-xs italic opacity-80">{item.ourStandard}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Authenticity;