import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Heart, ArrowRight, Shield } from 'lucide-react';
import { certs } from '../../../data/constants';

const TrustBar = () => {
  const [activeCert, setActiveCert] = useState(null);
  const marqueeItems = [...certs, ...certs, ...certs, ...certs];

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    if (activeCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeCert]);

  const handleScrollTo = (targetId) => {
    setActiveCert(null);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="trust-bar"
      className="relative z-20 bg-[#050505] border-y border-white/5 py-8 md:py-10 overflow-hidden select-none"
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* The Animated Container - Pauses when activeCert is opened */}
        <div
          className={`flex animate-marquee gap-12 md:gap-20 lg:gap-28 items-center ${
            activeCert ? '[animation-play-state:paused]' : 'hover:[animation-play-state:paused]'
          }`}
        >
          {marqueeItems.map((item, index) => (
            <button
              type="button"
              key={`${item.id}-${index}`}
              onClick={() => setActiveCert(item)}
              className="flex items-center gap-4 group cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95 text-left focus:outline-none"
              title={`${item.title} - Click for certification details`}
            >
              {/* Icon Container */}
              <div
                className={`p-3 rounded-xl border transition-all duration-500 ${item.accent} group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]`}
              >
                {item.icon}
              </div>

              {/* Text Context */}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-white text-[11px] md:text-xs font-black uppercase tracking-widest leading-none mb-1 group-hover:text-amber-400 transition-colors">
                    {item.label}
                  </h4>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />
                </div>
                <p className="text-gray-500 text-[9px] md:text-[10px] uppercase font-bold tracking-tighter">
                  {item.sub}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative Ambient Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-30 pointer-events-none" />

      {/* --- THE LEGACY PEEK DRAWER (Contextual Proof Modal) --- */}
      {activeCert && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center animate-in fade-in duration-300">
          {/* Backdrop */}
          <div
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full sm:max-w-xl bg-[#0a0a0a] border-t sm:border border-amber-500/30 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-amber-500/10 animate-in slide-in-from-bottom-6 duration-300">
            {/* Top Bar with Tag and Close */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${activeCert.accent}`}>
                  {activeCert.icon}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    {activeCert.tag}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                title="Close certification details"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {/* Headline and Context */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xl sm:text-2xl font-serif text-white">
                {activeCert.headline}
              </h3>
              <p className="text-gray-400 text-xs uppercase font-mono tracking-widest">
                {activeCert.title}
              </p>
            </div>

            {/* Detail Blocks */}
            <div className="space-y-4 mb-8">
              {/* Consumer Guarantee */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/15 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <CheckCircle2 size={15} className="text-amber-400 shrink-0" />
                  What This Means For Your Jar
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-6">
                  {activeCert.consumerBenefit}
                </p>
              </div>

              {/* Golden Grace Legacy Commitment */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-wider">
                  <Heart size={15} className="text-amber-500 shrink-0" />
                  The Golden Grace Legacy
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed pl-6">
                  {activeCert.legacyStory}
                </p>
              </div>
            </div>

            {/* Commercial & Education Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => handleScrollTo('collection')}
                className="flex-1 bg-amber-500 hover:bg-white text-black py-4 px-6 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Shop Certified Harvest <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo('authenticity')}
                className="py-4 px-6 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                View Purity Tests
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrustBar;
