import React, { useState } from 'react';
import { Hexagon, Info } from 'lucide-react';
  
export const ViscosityPour = () => {
  const [viscosity, setViscosity] = useState(35);
  const jitterIntensity = (viscosity / 100) * 1.5; 
  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden h-[500px] flex flex-col items-center justify-between group transition-all duration-700 hover:border-amber-500/30">
      <div className="text-center space-y-1 z-10 mb-4">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Tactile Density</p>
        <h4 className="text-xl font-serif text-white italic">The Virtual Pour</h4>
      </div>
       <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Touch the slider to feel the weight of purity.</span>
      </div>
       <div className="relative w-full flex-1 flex justify-center py-8">
        <div className="absolute bottom-10 w-24 h-8 bg-amber-500/10 blur-2xl rounded-full" />
        
        {/* THE STREAM: Jitters more as it gets thicker */}
        <div 
          className={`w-1.5 md:w-2 bg-gradient-to-b from-amber-200 via-amber-500 to-amber-700 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]
            ${viscosity > 60 ? 'animate-jitter' : ''}`}
          style={{ 
            height: `${viscosity}%`, 
            '--jitter': jitterIntensity,
            '--scale': 1.6 - (viscosity / 100),
            transform: `scaleX(${1.6 - (viscosity / 100)})` 
          }}
        />
        
        {/* THE DROP: Also jitters to show tension */}
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

      <div className="w-full space-y-4 z-10">
        <div className="flex justify-between text-[10px] text-gray-500 uppercase font-black tracking-tighter">
            <span>Strained</span>
            <span className="text-amber-500 font-bold">{viscosity}% Weight</span>
            <span>Raw</span>
        </div>
        <input 
          type="range" 
          title="Adjust Honey Viscosity Simulation" 
          min="0" 
          max="100" 
          value={viscosity} 
          onChange={(e) => setViscosity(e.target.value)} 
          className="w-full accent-amber-500 bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer" 
        />
         <p className="text-gray-500 text-[10px] text-center italic opacity-60">"Feel the slow, heavy rhythm of the Free State harvest."</p>
      </div>
    </div>
  );
};
export default ViscosityPour;