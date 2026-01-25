import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
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

import Section from '../../../components/layout/section';
import GlassCard from '../../../components/ui/glass-card';
import SectionHeading from '../../../components/ui/section-heading';
import { LEXICON_DATA, HONEY_TESTS } from '../../../data/constants';

const Authenticity = () => {
  const testScrollRef = useRef(null);
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [activeLexiconGroup, setActiveLexiconGroup] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  /* ---------- Swipe tracker (mobile friendly) ---------- */
  const handleTestScroll = () => {
    if (!testScrollRef.current) return;
    const { scrollLeft, clientWidth } = testScrollRef.current;
    setActiveTestIndex(Math.round(scrollLeft / clientWidth));
  };

  return (
    <Section
      id="authenticity"
      className="relative overflow-hidden"
      bg="bg-transparent"
    >
      {/* Honeycomb ambient layer */}
      <div className="absolute inset-0 bg-honeycomb opacity-50 pointer-events-none -z-10" />

      {/* 1. SECTION HEADING */}
      <SectionHeading
        pre="The Scientific Standard"
        title="The Science of"
        italic="Purity"
        sub="Unfiltered evidence that the honey you hold is raw, active, and whole. We don't hide behind labels; we invite the test."
      />

      {/* 2. SEAL OF INTEGRITY */}
      <div className="max-w-4xl mx-auto mt-12">
        <GlassCard className="p-8 md:p-12 flex flex-col items-center gap-10 border-amber-500/10 bg-amber-500/[0.02]">
          <div className="flex flex-col md:flex-row items-center gap-10 w-full">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <Hexagon size={80} className="text-amber-500 fill-amber-500/10 relative z-10" />
              <Verified
                size={32}
                className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-400 z-20"
              />
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge icon={<Shield size={12} />} text="DFS194 Registered" color="amber" />
                <Badge icon={<FileCheck size={12} />} text="CoA Compliant" color="green" />
              </div>

              <h3 className="text-2xl md:text-4xl font-serif text-white leading-tight">
                Beyond the lab tests lies a{' '}
                <span className="italic text-amber-400 font-light">heritage</span> of integrity.
              </h3>
            </div>
          </div>

          <div className="w-full pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoBlock
              icon={<Landmark size={20} />}
              title="What is DFS194?"
              text="Mandatory registration ensuring total traceability and strict standards."
              color="amber"
            />
            <InfoBlock
              icon={<ShieldCheck size={20} />}
              title="Regulation R638"
              text="Adherence to legal food safety standards mandated for SA establishments."
              color="green"
            />
          </div>
        </GlassCard>
      </div>

      {/* 3. AUTHENTICITY CHECK */}
      <div className="mt-24 space-y-12">
        <SectionHeading
          pre="The Physical Truth"
          title="Authenticity"
          italic="Check"
          sub="Three simple tests to verify the integrity of any harvest."
        />

        <div
          ref={testScrollRef}
          onScroll={handleTestScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar"
        >
          {HONEY_TESTS.map((test, i) => (
            <div key={i} className="min-w-[90%] md:min-w-[380px] snap-center">
              <GlassCard className="h-full p-8 flex flex-col space-y-6">
                <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {test.icon}
                </div>

                <div>
                  <h4 className="text-2xl font-serif text-white">{test.title}</h4>
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mt-1">
                    Method
                  </p>
                  <p className="text-gray-300 italic mt-3">"{test.instruction}"</p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
                    The Truth
                  </p>
                  <p className="text-gray-400">{test.result}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LEXICON */}
      <div className="mt-32 max-w-4xl mx-auto space-y-8">
        <SectionHeading
          pre="The Vocabulary of Grace"
          title="The Hive"
          italic="Lexicon"
          sub="Technical standards defined with soulful clarity."
        />

        {/* Mobile selector */}
        <div className="md:hidden relative">
          <select
            value={activeLexiconGroup}
            onChange={(e) => setActiveLexiconGroup(Number(e.target.value))}
            className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-4 uppercase tracking-widest text-sm font-bold"
          >
            {LEXICON_DATA.map((group, idx) => (
              <option key={idx} value={idx}>
                {group.category}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500" />
        </div>

        {/* Desktop chips */}
        <div className="hidden md:flex gap-3 justify-center">
          {LEXICON_DATA.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveLexiconGroup(idx)}
              className={`px-6 py-3 rounded-full uppercase tracking-widest text-[10px] font-black transition-all
                ${activeLexiconGroup === idx
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-gray-500 hover:text-white'}`}
            >
              {group.icon} {group.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {LEXICON_DATA[activeLexiconGroup].terms.map((item, i) => {
            const isOpen = openAccordion === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all overflow-hidden
                  ${isOpen ? 'bg-white/5 border-amber-500/30' : 'bg-[#0a0a0a] border-white/5'}`}
              >
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <div>
                    <h4 className={`font-serif text-xl ${isOpen ? 'text-amber-400' : 'text-white'}`}>
                      {item.term}
                    </h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                      {item.phonetic}
                    </p>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${isOpen ? 'rotate-180 text-amber-500' : 'text-gray-500'}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-8 pb-8 space-y-6">
                    <p className="italic text-gray-300">"{item.definition}"</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <TruthBlock icon={<AlertTriangle size={14} />} title="Industry Truth" text={item.truth} color="red" />
                      <TruthBlock icon={<Check size={14} />} title="Golden Grace Standard" text={item.ourStandard} color="green" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

/* ---------- Small helpers (local, not shared yet) ---------- */

const Badge = ({ icon, text, color }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${color}-500/10 border border-${color}-500/20`}>
    {icon}
    <span className={`text-[9px] font-black uppercase tracking-widest text-${color}-500`}>
      {text}
    </span>
  </div>
);

const InfoBlock = ({ icon, title, text, color }) => (
  <div className="flex gap-4">
    <div className={`p-2.5 rounded-xl h-fit bg-${color}-500/10 border border-${color}-500/20`}>
      {icon}
    </div>
    <div>
      <p className="text-white text-[10px] font-black uppercase tracking-widest">{title}</p>
      <p className="text-gray-400 text-xs">{text}</p>
    </div>
  </div>
);

const TruthBlock = ({ icon, title, text, color }) => (
  <div className={`p-6 rounded-xl bg-${color}-500/[0.03] border border-${color}-500/10 space-y-3`}>
    <p className={`text-${color}-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2`}>
      {icon} {title}
    </p>
    <p className="text-sm leading-relaxed">{text}</p>
  </div>
);

export default Authenticity;
