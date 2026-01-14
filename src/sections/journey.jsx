import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/constants';
import DetailModal from '../components/ui/detail-modal';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';

const JourneySection = () => {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <div className="bg-[#050505] text-white relative min-h-screen selection:bg-amber-500 selection:text-black">
      {/* Detail Modal Overlay */}
      {activeDetail && <DetailModal step={activeDetail} onClose={() => setActiveDetail(null)} />}

      {/* Styles Injection */}
      <style>{`
        .bg-honeycomb {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23f59e0b' stroke-opacity='0.4' stroke-width='1'/%3E%3C/svg%3E");
          background-attachment: fixed;
        }
        @keyframes bee-fly-away {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(100px, -100px) rotate(45deg); opacity: 0; }
        }
        .animate-bee-fly-away { animation: bee-fly-away 0.8s ease-in forwards; }
        .golden-filter { filter: brightness(0.9) contrast(1.1) saturate(1.1); }
      `}</style>

      {/* Global Texture Layers */}
      <div className="fixed inset-0 bg-honeycomb opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-amber-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="relative pt-24 pb-12 px-6 z-10 text-center space-y-4">
        <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] block mb-2 animate-in fade-in slide-in-from-top-4 duration-1000">Evidence of Integrity</span>
        <h1 className="text-5xl md:text-8xl font-serif leading-none tracking-tight">
          Hive to <span className="italic text-amber-400 font-light lowercase">Jar</span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-xs md:text-sm font-light italic leading-relaxed">
          "A rapid look at the unfiltered movement of Grace from the Welkom fields to your table."
        </p>
      </header>
      
      {/* Process Flow */}
      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-24 md:space-y-32 relative z-10">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-1/2" />

        {JOURNEY_STEPS.map((step, idx) => (
          <div key={step.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 relative group`}>
            {/* Step Image */}
            <div className="w-full md:w-5/12 relative">
              <div className="absolute inset-0 bg-amber-500/0 blur-[100px] group-hover:bg-amber-500/10 transition-all duration-1000 rounded-full scale-50 group-hover:scale-100 -z-10" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl transition-all duration-700 group-hover:border-amber-500/50">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10" />
                <OptimizedImage 
                  src={step.img} 
                  alt={`${step.title} - ${step.subtitle}`} 
                  className="w-full h-full golden-filter group-hover:scale-110" 
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-amber-500 text-black w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-serif text-xl md:text-2xl shadow-lg z-20 group-hover:scale-110 transition-transform duration-500">
                {idx + 1}
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-7/12 space-y-6 text-center md:text-left z-10 px-2 md:px-0">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">{step.icon}</div>
                <span className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Movement 0{idx + 1}</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-serif leading-none text-white tracking-tighter">
                {step.title} <br /> 
                <span className="text-xl md:text-3xl text-gray-500 italic font-light tracking-normal">{step.subtitle}</span>
              </h2>
              
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                {step.description}
              </p>

              <button 
                onClick={() => setActiveDetail(step)}
                title={`Examine technical evidence for ${step.title}`}
                className="group pt-4 flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.4em] text-gray-500 hover:text-amber-500 transition-all mx-auto md:mx-0 active:scale-95"
              >
                Examine Detail <MoveRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default JourneySection;
