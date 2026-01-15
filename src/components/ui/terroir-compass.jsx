import React from 'react';  
import { Info } from 'lucide-react';
import OptimizedImage from '../ui/optimized-image';

const TerroirCompass = () => (
  <div className="min-w-[90vw] md:min-w-0 snap-center relative rounded-[2.5rem] overflow-hidden h-[540px] flex flex-col items-center justify-between group border border-white/10 transition-all duration-700 hover:border-amber-500/40">
    
    {/* VISUAL SOUL: Botanical Infusions */}
    <div className="absolute inset-0 z-0">
      <OptimizedImage 
        src="/images/sensory/infused-botanicals.webp" 
        alt="Botanical Infusion Texture" 
        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] opacity-30 golden-filter" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </div>

    <div className="text-center space-y-1 z-10 pt-8">
      <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Botanical Intelligence</p>
      <h4 className="text-xl font-serif text-white italic">The Terroir Compass</h4>
    </div>

    <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Visualize the Free State flower notes.</span>
    </div>

    <div className="relative w-full flex justify-center items-center py-6 scale-90 z-10">
      <svg viewBox="0 0 100 100" className="w-64 h-64 overflow-visible drop-shadow-2xl">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
              <polygon key={scale} points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" className="fill-none stroke-white/20 stroke-[0.5]" transform={`translate(${50 - 50*scale}, ${50 - 50*scale}) scale(${scale})`} />
          ))}
          <polygon points="50,15 85,30 75,70 25,75 15,35" className="fill-amber-500/30 stroke-amber-500 stroke-[2] transition-all duration-1000 group-hover:fill-amber-500/50" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute top-0 text-[8px] text-amber-500 font-bold uppercase tracking-widest bg-black/60 px-2 py-1 rounded-full border border-white/5">Aloe Bloom</span>
          <span className="absolute bottom-4 text-[8px] text-gray-400 font-bold uppercase tracking-widest">Free State Earth</span>
      </div>
    </div>
    
    <div className="w-full p-8 z-10 bg-black/40 backdrop-blur-md">
        <p className="text-gray-300 text-xs text-center italic leading-relaxed">
            "A potent wellness profile expertly blended with indigenous botanicals."
        </p>
    </div>
  </div>
);
export default TerroirCompass;