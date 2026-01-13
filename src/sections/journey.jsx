import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/constants';
import DetailModal from '../components/ui/detail-modal';

const JourneySection = () => {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <section id="journey-section" className="py-24 px-6 bg-transparent relative z-10">
        <div className="absolute inset-0 bg-honeycomb opacity-[0.22] pointer-events-none -z-10" />
      {/* Triggering the Deep Dive Modal */}
      {activeDetail && <DetailModal step={activeDetail} onClose={() => setActiveDetail(null)} />}
      
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-500 tracking-[0.3em] text-xs 2xl:text-sm font-bold uppercase">Evidence of Integrity</span>
          <h2 className="text-4xl md:text-7xl font-serif leading-none tracking-tight text-white uppercase">Hive to <span className="italic text-amber-400 font-light lowercase">Jar</span></h2>
          <p className="text-gray-400 max-w-md mx-auto text-xs italic">"A rapid look at the unfiltered movement of Grace."</p>
        </div>
        <div className="space-y-20">
          {JOURNEY_STEPS.map((step, idx) => (
            <div key={step.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                  <img src={step.img} alt={step.title} title={step.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" loading="lazy" />
                </div>
                <div className="absolute -top-3 -left-3 bg-amber-500 text-black w-10 h-10 rounded-xl flex items-center justify-center font-serif text-xl shadow-lg z-10">{idx + 1}</div>
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left px-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-500">
                    {step.icon}
                  </div>
                  <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Movement 0{idx + 1}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{step.description}</p>
                
                {/* DEEP DIVE TRIGGER BUTTON */}
                <button 
                  onClick={() => setActiveDetail(step)}
                  title={`Examine technical evidence for ${step.title}`} 
                  className="group pt-2 flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.3em] text-gray-500 hover:text-amber-500 transition-colors mx-auto md:mx-0 active:scale-95"
                >
                  Examine Detail <MoveRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default JourneySection;