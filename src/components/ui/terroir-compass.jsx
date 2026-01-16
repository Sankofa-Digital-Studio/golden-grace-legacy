import React, { useState } from 'react';
import { Info, Compass } from 'lucide-react';
import OptimizedImage from '../ui/optimized-image';
import {FLORAL_PROFILES} from '../../data/constants'
const TerroirCompass = () => {
  const [activeProfile, setActiveProfile] = useState(0);
  const profile = FLORAL_PROFILES[activeProfile];

  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center relative rounded-[2.5rem] overflow-hidden h-[560px] flex flex-col items-center group border border-white/10 transition-all duration-700 hover:border-amber-500/40 bg-[#0a0a0a]">
      {/* VISUAL SOUL: Botanical Infusions */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/sensory/infused-botanicals.webp"
          alt="Macro texture of botanical honey infusions"
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] opacity-30 golden-filter"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* 1. HEADER & INFO (Synchronized with ViscosityPour) */}
      <div className="text-center space-y-1 z-10 pt-8 px-6">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
          Botanical Intelligence
        </p>
        <h4 className="text-xl font-serif text-white italic mb-4">The Terroir Compass</h4>

        <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full flex items-center justify-center gap-2 mb-6">
          <Info size={12} className="text-amber-500" />
          <span className="text-[9px] text-white uppercase font-bold tracking-widest">
            Select a source to visualize terroir.
          </span>
        </div>
      </div>

      {/* 2. THE VISUAL SANCTUARY: Animated Radar Chart */}
      <div className="relative w-full flex-1 flex justify-center items-center py-2 z-10">
        <div className="absolute w-48 h-48 bg-amber-500/5 blur-3xl rounded-full animate-pulse" />

        <svg viewBox="0 0 100 100" className="w-64 h-64 overflow-visible drop-shadow-2xl">
          {/* Grid Levels */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
            <polygon
              key={scale}
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              className="fill-none stroke-white/10 stroke-[0.5]"
              transform={`translate(${50 - 50 * scale}, ${50 - 50 * scale}) scale(${scale})`}
            />
          ))}

          {/* Dynamic Flavor Polygon */}
          <polygon
            points={profile.points}
            className="fill-amber-500/20 stroke-amber-500 stroke-[1.5] transition-all duration-1000 ease-in-out group-hover:fill-amber-500/40"
          />

          {/* Labels (Small and Industrial) */}
          <g className="text-[4px] fill-gray-500 font-bold uppercase tracking-tighter opacity-50">
            <text x="50" y="3" textAnchor="middle">
              Sweet
            </text>
            <text x="96" y="27" textAnchor="start">
              Floral
            </text>
            <text x="96" y="74" textAnchor="start">
              Medicinal
            </text>
            <text x="50" y="98" textAnchor="middle">
              Citrus
            </text>
            <text x="4" y="74" textAnchor="end">
              Earthy
            </text>
          </g>
        </svg>

        {/* Floating Identity Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-700">
            <div className="text-amber-500 mb-1 flex justify-center">{profile.icon}</div>
            <p className="text-white text-[8px] font-black uppercase tracking-widest text-center whitespace-nowrap">
              {profile.name}
            </p>
          </div>
        </div>
      </div>

      {/* 3. TACTILE INTERACTION: Profile Switcher */}
      <div className="w-full px-8 pb-8 space-y-4 z-10">
        <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase font-black tracking-widest mb-2">
          <span>Select Flora</span>
          <span className="text-amber-500 flex items-center gap-1">
            <Compass size={10} /> {profile.location}
          </span>
        </div>

        <div className="flex gap-2 w-full">
          {FLORAL_PROFILES.map((p, idx) => (
            <button
              key={p.id}
              title={`Switch to ${p.name} profile`}
              onClick={() => setActiveProfile(idx)}
              className={`flex-1 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95
                        ${
                          activeProfile === idx
                            ? 'bg-amber-500 border-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FOOTER NARRATIVE */}
      <div className="w-full p-6 z-10 bg-black/60 backdrop-blur-md border-t border-white/5">
        <p className="text-gray-400 text-[10px] text-center italic leading-relaxed px-4">
          "{profile.desc}"
        </p>
      </div>
    </div>
  );
};
export default TerroirCompass;
