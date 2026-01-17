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
  ChevronDown,
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
  const [openAccordion, setOpenAccordion] = useState(null);

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
      <div className="absolute inset-0 bg-honeycomb opacity-[0.50] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 1. SECTION HEADING */}
         <SectionHeading
            pre="The Scientific Standard"
            title="The Science of"
            italic="Purity"
            sub="Unfiltered evidence that the honey you hold is raw, active, and whole. We don't hide behind labels; we invite the test."
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
                <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight max-w-2xl">
                  Beyond the lab tests lies a{' '}
                  <span className="italic text-amber-400 font-light">heritage</span> of integrity.
                </h3>
              </div>
            </div>

            <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row gap-8 md:gap-12">
             <div className="flex gap-4 md:w-1/2 group" title="DALRRD Traceability">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl h-fit border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                       <Landmark size={20} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-white font-bold text-[10px] uppercase tracking-widest">What is DFS194?</p>
                        <p className="text-gray-400 text-xs leading-relaxed">Mandatory registration ensuring total traceability and strict standards.</p>
                    </div>
                  </div>
              <div className="flex gap-4 md:w-1/2 group" title="Regulation R638 Hygiene">
                    <div className="p-2.5 bg-green-500/10 rounded-xl h-fit border border-green-500/20 group-hover:bg-green-500 group-hover:text-black transition-all">
                       <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-white font-bold text-[10px] uppercase tracking-widest">Regulation R638</p>
                        <p className="text-gray-400 text-xs leading-relaxed">Adherence to legal food safety standards mandated for SA establishments.</p>
                    </div>
                  </div>
            </div>
          </GlassCard>
        </div>

        {/* 3. SWIPEABLE AUTHENTICITY CHECK (Relocated Honey Tests) */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-12">
            <SectionHeading 
                pre="The Physical Truth"
                title="Authenticity"
                italic="Check"
                sub="Don't take our word for it. Perform these three simple tests to verify the integrity of any harvest."
            />
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
                    <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                      Method
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "{test.instruction}"
                    </p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
                      The Truth
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{test.result}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
            <div className="space-y-12">
            <SectionHeading 
                pre="The Vocabulary of Grace"
                title="The Hive"
                italic="Lexicon"
                sub="Technical standards defined with soulful clarity for the conscious keeper."
            />
        </div>

            {/* CATEGORY SWITCHER: Select for Mobile, Chips for Desktop */}
            <div className="w-full md:w-auto">
              {/* Mobile Dropdown */}
              <div className="md:hidden relative">
                <select
                  title="Select Lexicon Category"
                  value={activeLexiconGroup}
                  onChange={(e) => setActiveLexiconGroup(parseInt(e.target.value))}
                  className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-amber-500 appearance-none transition-all"
                >
                  {LEXICON_DATA.map((group, idx) => (
                    <option key={idx} value={idx}>
                      {group.category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none"
                />
              </div>

              {/* Desktop Chips (Right Aligned) */}
              <div className="hidden md:flex gap-3">
                {LEXICON_DATA.map((group, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLexiconGroup(idx)}
                    title={`View ${group.category} terms`}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                ${activeLexiconGroup === idx ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
                  >
                    {group.icon} {group.category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ACCORDION CONTENT */}
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {LEXICON_DATA[activeLexiconGroup].terms.map((item, i) => {
              const isOpen = openAccordion === i;
              return (
                <div
                  key={i}
                  className={`group rounded-2xl border transition-all duration-500 overflow-hidden
                            ${isOpen ? 'bg-white/5 border-amber-500/30 shadow-2xl' : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'}`}
                >
                  <button
                    title={`Expand ${item.term}`}
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <div className="space-y-1">
                      <h4
                        className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? 'text-amber-400' : 'text-white'}`}
                      >
                        {item.term}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-mono italic tracking-widest uppercase">
                        {item.phonetic}
                      </p>
                    </div>
                    <div
                      className={`p-2 rounded-full transition-all ${isOpen ? 'bg-amber-500 text-black rotate-180' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'}`}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 pb-8' : 'max-h-0 opacity-0 overflow-hidden'}`}
                  >
                    <div className="px-8 space-y-8">
                      <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                        "{item.definition}"
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-red-500/[0.03] border border-red-500/10 p-6 rounded-xl space-y-3">
                          <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle size={14} /> The Industry Truth
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.truth}</p>
                        </div>
                        <div className="bg-green-500/[0.03] border border-green-500/10 p-6 rounded-xl space-y-3">
                          <p className="text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Check size={14} /> Golden Grace Standard
                          </p>
                          <p className="text-white text-sm leading-relaxed font-medium italic">
                            {item.ourStandard}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      {/* <div className="text-center">
        <button
          onClick={() => onNavigate('education')}
          title="Explore Bee Smart full guide"
          className="inline-flex items-center gap-2 bg-amber-500 text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white active:scale-90 transition-all shadow-xl"
        >
          Explore Bee Smart <ArrowRight size={18} />
        </button>
      </div> */}
    </section>
  );
};
export default Authenticity;
