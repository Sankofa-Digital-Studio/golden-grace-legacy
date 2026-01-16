import React, { useState } from 'react';
import { Info } from 'lucide-react';
import OptimizedImage from '../ui/optimized-image'
  
export const ViscosityPour = () => {
  const [viscosity, setViscosity] = useState(35);
  
  // Resistance Physics: Jitter intensity increases as we reach 100%
  const jitterIntensity = (viscosity / 100) * 2; 

  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center relative rounded-[2.5rem] overflow-hidden h-[560px] flex flex-col items-center group border border-white/10 transition-all duration-700 hover:border-amber-500/40 bg-[#0a0a0a]">
      
      {/* VISUAL SOUL BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[#050505]" />
        {/* Note: Ensure OptimizedImage exists or fallback to img */}
        <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="/images/sensory/liquid-gold.webp" 
          alt="Macro texture of liquid raw honey" 
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] opacity-30 golden-filter" 
        />
      </div>
      </div>

      {/* 1. HEADER & INFO: Defined space at the top */}
      <div className="text-center space-y-1 z-10 pt-8 px-6">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Tactile Density</p>
        <h4 className="text-xl font-serif text-white italic mb-4">The Virtual Pour</h4>
        
        <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full flex items-center justify-center gap-2 mb-6">
           <Info size={12} className="text-amber-500" />
           <span className="text-[9px] text-white uppercase font-bold tracking-widest">Adjust weight to verify purity.</span>
        </div>
      </div>

      {/* 2. THE VISUAL SANCTUARY: Positioned in the middle for maximum impact */}
      <div className="relative w-full flex-1 flex justify-center items-start pt-4 z-10">
        <div className="absolute bottom-10 w-32 h-12 bg-amber-500/10 blur-3xl rounded-full" />
        
        {/* Stream with Dynamic Jitter */}
        <div 
          className={`w-1.5 md:w-2 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.6)]
            ${viscosity > 50 ? 'animate-jitter' : ''}`}
          style={{ 
            height: `${viscosity * 0.7}%`, 
            '--jitter': jitterIntensity,
            '--scale': 1.6 - (viscosity / 100),
            transform: `scaleX(${1.6 - (viscosity / 100)})` 
          }}
        />
        
        {/* Falling Drop */}
        <div 
           className={`absolute w-4 h-6 bg-amber-400 rounded-full blur-[0.5px] animate-bounce
             ${viscosity > 75 ? 'animate-jitter' : ''}`}
           style={{ 
             top: `${viscosity * 0.7}%`, 
             opacity: viscosity > 5 && viscosity < 98 ? 1 : 0,
             '--jitter': jitterIntensity * 1.5,
             '--scale': 1
           }}
        />
      </div>

      {/* 3. THE CONTROL DECK: Tactile slider positioned for easy thumb reach */}
      <div className="w-full px-8 pb-10 space-y-4 z-10">
        <div className="flex justify-between text-[9px] text-gray-400 uppercase font-black tracking-widest">
            <span>Filtered</span>
            <span className="text-amber-500 font-bold bg-black/40 px-2 py-0.5 rounded">{viscosity}% Weight</span>
            <span>Raw</span>
        </div>
        <input 
          type="range" 
          title="Adjust Honey Viscosity Simulation" 
          min="0" max="100" 
          value={viscosity} 
          onChange={(e) => setViscosity(parseInt(e.target.value))} 
          className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer" 
        />
      </div>

      {/* 4. FOOTER NARRATIVE */}
      <div className="w-full p-6 z-10 bg-black/60 backdrop-blur-md border-t border-white/5">
        <p className="text-gray-400 text-[10px] text-center italic leading-relaxed">
          "Real honey fights gravity with a heavy, rhythmic jitter."
        </p>
      </div>
    </div>
  );
};
export default ViscosityPour;