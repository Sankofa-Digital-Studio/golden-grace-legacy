import React from 'react';  
import { Info } from 'lucide-react';
export const TerroirCompass = () => {

  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 h-[500px] flex flex-col items-center justify-between relative group overflow-hidden transition-all duration-700 hover:border-amber-500/30">
    <div className="text-center space-y-1 z-10 mb-4">
      <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Nectar Analysis</p>
      <h4 className="text-xl font-serif text-white italic">The Terroir Compass</h4>
    </div>
     <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Visualize the Free State flower notes.</span>
    </div>
    <div className="relative w-full flex justify-center items-center py-6">
      <svg viewBox="0 0 100 100" className="w-64 h-64 overflow-visible drop-shadow-2xl" alt="Flavor Profile Chart">
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
              <polygon key={scale} points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" className="fill-none stroke-white/5 stroke-[0.5]" transform={`translate(${50 - 50*scale}, ${50 - 50*scale}) scale(${scale})`} />
          ))}
          <polygon points="50,15 85,30 75,70 25,75 15,35" className="fill-amber-500/20 stroke-amber-500 stroke-[1.5] transition-all duration-1000 group-hover:fill-amber-500/40" />
          {[15,30,70,75,35].map((_, i) => <circle key={i} cx="50" cy="50" r="1.5" className="fill-white" />)}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2">
          <span className="absolute top-2 text-[9px] text-amber-500 font-bold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">Floral (Aloe)</span>
          <span className="absolute bottom-4 text-[9px] text-gray-500 font-bold uppercase tracking-widest">Earth Notes</span>
          <span className="absolute right-0 text-[9px] text-gray-500 font-bold uppercase tracking-widest rotate-90 origin-right pr-6">Sweetness</span>
          <span className="absolute left-0 text-[9px] text-amber-300/60 font-bold uppercase tracking-widest -rotate-90 origin-left pl-6">Medicinal</span>
      </div>
    </div>
    <div className="text-center px-4 space-y-3 z-10"><p className="text-gray-400 text-xs leading-relaxed italic pr-4">"A heavy floral start with a medicinal finish, unique to the Welkom aloe belt."</p></div>
  </div>
  );
};

export default TerroirCompass;