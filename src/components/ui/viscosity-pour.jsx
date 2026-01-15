import React, { useState } from 'react';
import { Info } from 'lucide-react';
import OptimizedImage from '../ui/optimized-image'
  
export const ViscosityPour = () => {
  const [viscosity, setViscosity] = useState(35);
  const jitterIntensity = (viscosity / 100) * 1.5; 
  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden h-[500px] flex flex-col items-center justify-between group transition-all duration-700 hover:border-amber-500/30">
  <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="/images/sensory/liquid-gold.webp" 
          alt="Liquid Honey Texture" 
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] opacity-40 grayscale-[20%] golden-filter" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="text-center space-y-1 z-10 pt-8 mb-8">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Liquid Gold</p>
        <h4 className="text-xl font-serif text-white italic">The Virtual Pour</h4>
      </div>
      
      {/* <div className="text-center space-y-1 z-10 mb-4">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Tactile Density</p>
        <h4 className="text-xl font-serif text-white italic">The Virtual Pour</h4>
      </div> */}
       <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Touch the slider to feel the weight of purity.</span>
      </div>
       <div className="relative w-full flex-1 flex justify-center py-8">
        <div className="absolute bottom-10 w-24 h-8 bg-amber-500/10 blur-2xl rounded-full" />
        
             <div className="relative w-full flex-1 flex justify-center py-8 z-10">
        <div className="absolute bottom-10 w-24 h-8 bg-amber-500/20 blur-2xl rounded-full" />
        <div 
          className={`w-1.5 md:w-2 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.6)]
            ${viscosity > 60 ? 'animate-jitter' : ''}`}
          style={{ 
            height: `${viscosity}%`, 
            '--jitter': jitterIntensity,
            '--scale': 1.6 - (viscosity / 100),
            transform: `scaleX(${1.6 - (viscosity / 100)})` 
          }}
        />
        <div 
           className={`absolute w-4 h-6 bg-amber-400 rounded-full blur-[0.5px] animate-bounce
             ${viscosity > 80 ? 'animate-jitter' : ''}`}
           style={{ 
             top: `${viscosity}%`, 
             opacity: viscosity > 0 && viscosity < 98 ? 1 : 0,
             '--jitter': jitterIntensity * 2,
             '--scale': 1
           }}
        />
      </div>

      <div className="w-full p-8 space-y-4 z-10 bg-black/40 backdrop-blur-md">
        <div className="flex justify-between text-[10px] text-gray-400 uppercase font-black tracking-tighter">
            <span>Silk Flow</span>
            <span className="text-amber-500 font-bold">{viscosity}% Density</span>
            <span>Raw Weight</span>
        </div>
        <input 
          type="range" title="Adjust Honey Viscosity Simulation" min="0" max="100" value={viscosity} 
          onChange={(e) => setViscosity(e.target.value)} 
          className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer" 
        />
         <p className="text-gray-500 text-[10px] text-center italic opacity-60">"Feel the slow, heavy rhythm of the Free State harvest."</p>
      </div>
       
      </div>
    </div>
  );
};
export default ViscosityPour;