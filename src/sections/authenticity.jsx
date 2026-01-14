import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Home as HomeIcon,
  Verified,
  Hexagon,
  Shield,
  FileCheck,
  ShieldCheck,
  Landmark,
  AlertTriangle,
  Check,
  Heart 
} from 'lucide-react';
import GlassCard from '../components/ui/glass-card';
import { LEXICON_DATA, HONEY_TESTS } from '../data/constants';
import SectionHeading from '../components/ui/section-heading';

const Authenticity = () => {
  const testScrollRef = useRef(null);
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [activeLexiconGroup, setActiveLexiconGroup] = useState(0);
  const lexiconScrollRef = useRef(null);
  const [activeTermIndex, setActiveTermIndex] = useState(0);

  useEffect(() => {
    setActiveTermIndex(0);
    if (lexiconScrollRef.current) {
      lexiconScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeLexiconGroup]);

  const handleScrollTracker = (ref, setIndex) => {
    if (!ref.current) return;
    const { scrollLeft, clientWidth } = ref.current;
    setIndex(Math.round(scrollLeft / clientWidth));
  };
  const handleTestScroll = () => {
    if (!testScrollRef.current) return;
    const { scrollLeft, clientWidth } = testScrollRef.current;
    setActiveTestIndex(Math.round(scrollLeft / clientWidth));
  };
  return (
    <section id="authenticity" className="py-16 px-6 bg-transparent relative z-10">
      <div className="absolute inset-0 bg-honeycomb opacity-[0.22] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. SECTION HEADING */}
        <SectionHeading
          pre="Evidence of Integrity"
          title="Truth in"
          italic="science"
          sub="Unfiltered evidence that the honey you hold is raw, active, and whole."
        />

        {/* 2. NARRATIVE BRIDGE: The Seal of Integrity & CoA */}
        <div className="max-w-4xl mx-auto -mt-8">
          <GlassCard className="p-8 md:p-12 flex flex-col items-center gap-10 border-amber-500/10 bg-amber-500/[0.02]">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                <Hexagon size={80} className="text-amber-500 fill-amber-500/10 relative z-10" />
                <Verified
                  size={32}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-400 z-20"
                />
              </div>
              <div className="text-center md:text-left space-y-4">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    <Shield size={12} className="text-amber-500" />
                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                      DFS194 Registered
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <FileCheck size={12} className="text-green-500" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">
                      CoA Compliant
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                  Beyond the lab tests lies a{' '}
                  <span className="italic text-amber-400">heritage</span> of integrity.
                </h3>
              </div>
            </div>

            <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="flex gap-4 md:w-1/2 group">
                <div className="p-2.5 bg-amber-500/10 rounded-xl h-fit border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Landmark size={20} />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-bold text-[10px] uppercase tracking-widest">
                    What is DFS194?
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    A mandatory Department of Agriculture (DALRRD) registration ensuring total
                    traceability of hive origins and management standards.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:w-1/2 group">
                <div className="p-2.5 bg-green-500/10 rounded-xl h-fit border border-green-500/20 group-hover:bg-green-500 group-hover:text-black transition-all">
                  <ShieldCheck size={20} />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-bold text-[10px] uppercase tracking-widest">
                    Regulation R638
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    The Certificate of Acceptability (CoA) confirms our facility's adherence to
                    legal hygiene and food safety standards mandated in SA.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 3. SWIPEABLE AUTHENTICITY CHECK (Relocated Honey Tests) */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-2">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] block">
                Scientific Confirmation
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-white italic">
                Authenticity Check
              </h3>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {HONEY_TESTS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeTestIndex ? 'w-8 bg-amber-500' : 'w-2 bg-white/10'}`}
                    title={`Step ${i + 1}`}
                  />
                ))}
              </div>

              <div className="hidden md:flex gap-2">
                <button
                  title="Previous Test"
                  onClick={() =>
                    testScrollRef.current?.scrollBy({ left: -450, behavior: 'smooth' })
                  }
                  className="p-3 rounded-full border border-white/10 hover:bg-amber-500 hover:text-black transition-all active:scale-90"
                >
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <button
                  title="Next Test"
                  onClick={() => testScrollRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}
                  className="p-3 rounded-full border border-white/10 hover:bg-amber-500 hover:text-black transition-all active:scale-90"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={testScrollRef}
            onScroll={handleTestScroll}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {HONEY_TESTS.map((test, i) => (
              <div key={i} className="min-w-[90%] md:min-w-[400px] snap-center">
                <GlassCard className="h-full p-10 space-y-6 flex flex-col group hover:border-amber-500/40 transition-all duration-700">
                  <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {test.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif text-white mb-2">{test.title}</h4>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4">
                      Method
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "{test.instruction}"
                    </p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <p className="text-white text-xs font-bold uppercase tracking-widest mb-2">
                      The Truth
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{test.result}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* 4. THE HIVE LEXICON (Renamed & Structured) */}
      {/* <div className="flex flex-wrap gap-3 mb-8 px-2"> */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-2">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] block">
               Lingustic Integrity
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-white italic">
                The Hive Lexicon
              </h3>
            </div>
             {LEXICON_DATA.map((group, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveLexiconGroup(idx)}
                  title={`View ${group.category} terms`}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                    ${activeLexiconGroup === idx ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                >
                  {group.icon} {group.category}
                </button>
             ))}
          </div>

          {/* Swipe Container for Lexicon Cards */}
          <div 
            ref={lexiconScrollRef}
            onScroll={() => handleScrollTracker(lexiconScrollRef, setActiveTermIndex)}
            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
          >
            {LEXICON_DATA[activeLexiconGroup].terms.map((item, i) => (
              <div key={i} className="min-w-[90%] md:min-w-[500px] snap-center h-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-full p-10 space-y-8 flex flex-col group hover:border-amber-500/30 transition-all duration-500">
                   <div className="space-y-2">
                      <h4 className="text-3xl font-serif text-white group-hover:text-amber-500 transition-colors uppercase tracking-tighter">
                        {item.term}
                      </h4>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] text-gray-500 font-mono italic tracking-widest bg-white/5 w-fit px-3 py-1 rounded-full border border-white/5">
                            {item.phonetic}
                        </p>
                        <span className="h-px w-8 bg-amber-500/20" />
                        <span className="text-[10px] text-amber-500/50 font-bold uppercase tracking-widest">{LEXICON_DATA[activeLexiconGroup].category}</span>
                      </div>
                   </div>

                   <p className="text-gray-300 text-lg leading-relaxed font-light">
                    "{item.definition}"
                   </p>
                   
                   <div className="space-y-6 pt-6 border-t border-white/5 mt-auto">
                      <div className="space-y-2">
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle size={12}/> The Industry Truth
                        </p>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.truth}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Check size={12}/> Golden Grace Standard
                        </p>
                        <p className="text-white text-sm leading-relaxed font-medium italic opacity-90 underline decoration-amber-500/30 underline-offset-4">
                            {item.ourStandard}
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center-Aligned Indicators */}
          <div className="flex justify-center gap-3">
              {LEXICON_DATA[activeLexiconGroup].terms.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-700 ${i === activeTermIndex ? 'w-12 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'w-2 bg-white/10'}`}
                  title={`Term ${i + 1}`}
                />
              ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
            <button 
                onClick={() => onNavigate('education')} 
                title="Explore Bee Smart full guide"
                className="inline-flex items-center gap-2 bg-amber-500 text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white active:scale-90 transition-all shadow-xl"
            >
                Explore Bee Smart <ArrowRight size={18} />
            </button>
        </div>
    </section>
  );
};
export default Authenticity;
