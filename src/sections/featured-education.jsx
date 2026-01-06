import React from 'react';
import { ThermometerSun, Info } from 'lucide-react';

const FeaturedEducation = ({ navigate, onScheduleClick }) => (
  <section className="py-16 bg-[#0a0a0a]">
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
      <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Academy</span>
      <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-6">Become a Guardian</h3>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Join our beekeeping workshops and learn how to sustain the hive for future generations.
      </p>
      <div className="mt-8 bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors max-w-4xl mx-auto mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-amber-500/20 p-3 rounded-full">
            <ThermometerSun className="text-amber-400 w-6 h-6 2xl:w-8 2xl:h-8" />
          </div>
          <div>
            <h4 className="text-white font-serif text-lg 2xl:text-2xl mb-1">
              Crystallization is Natural
            </h4>
            <p className="text-xs 2xl:text-sm text-gray-400">
              It's a sign of purity, not spoilage.
            </p>
          </div>
        </div>
        <p className="text-gray-300 text-sm 2xl:text-lg leading-relaxed mb-4">
          Raw honey naturally solidifies over time, especially in winter. This preserves the flavor
          and quality of the nectar.
        </p>
        <div className="bg-black/40 p-4 rounded-lg">
          <p className="text-amber-500 text-xs 2xl:text-sm font-bold uppercase mb-1 flex items-center gap-2">
            <Info size={14} /> Quick Fix
          </p>
          <p className="text-gray-400 text-xs 2xl:text-base">
            Simply place your jar in a bowl of warm water (not boiling) to return it to liquid gold.
          </p>
        </div>
      </div>
      <button
        onClick={onScheduleClick}
        className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
      >
        View Course Schedule
      </button>
    </div>
  </section>
);

export default FeaturedEducation;
