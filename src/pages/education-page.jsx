import React from 'react';
import { CheckCircle, GraduationCap, ThermometerSun, Info } from 'lucide-react';

const EducationPage = ({ onScheduleClick }) => (
  <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
      <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
        <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">
          Bee Smart Academy
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">
          Guardians of the Hive
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-32 items-center mb-20">
        <div className="space-y-6 lg:space-y-10 order-2 lg:order-1">
          <h3 className="text-2xl lg:text-4xl font-serif text-white">Why We Need Bees</h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base lg:text-xl">
            Bees are responsible for 1 in every 3 bites of food we eat. At Golden Grace, we don't
            just harvest; we protect. Our training programs empower locals to become stewards of the
            environment.
          </p>
          <ul className="space-y-4 text-gray-300 text-sm md:text-base lg:text-lg">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Pollination Support
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Biodiversity
              Protection
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Sustainable Farming
            </li>
          </ul>
        </div>
        <div className="h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10 order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover golden-filter"
            alt="Bee Education"
          />
        </div>
      </div>

      <div className="bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/5 text-center">
        <GraduationCap className="text-amber-500 mx-auto mb-6" size={48} />
        <h3 className="text-2xl lg:text-4xl font-serif text-white mb-4">Join Our Workshops</h3>
        <p className="text-gray-400 mb-8 max-w-xl lg:max-w-3xl lg:text-lg mx-auto text-sm md:text-base">
          From beginner beekeeping to advanced hive management. Learn from the experts in the Free
          State.
        </p>
        <button
          onClick={onScheduleClick}
          className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-white transition-colors"
        >
          View Course Schedule
        </button>
      </div>

      <div className="mt-20 bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors max-w-4xl mx-auto mb-8">
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
    </div>
  </div>
);

export default EducationPage;
