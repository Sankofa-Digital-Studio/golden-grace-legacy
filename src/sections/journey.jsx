import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/constants';
import DetailModal from '../components/ui/detail-modal';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';

/**
 * --- JOURNEY SECTION v2.6.5 ---
 * Focus: High-precision narrative flow and z-index integrity.
 * * DESIGN NOTES:
 * 1. Stacking Context: The section elevates to z-[600] when a modal is active
 * to prevent the Sensory section from rendering "over" the modal.
 * 2. Spacing: Internal paddings are tightened to bridge the gaps between sections.
 */
const Journey = () => {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    /* SANKOFA FIX: Dynamic Stacking Context.
       We elevate the entire section's priority when the modal is open.
    */
    <section 
      id="journey" 
      className={`py-16 px-6 bg-transparent relative transition-all duration-500 
        ${activeDetail ? 'z-[600]' : 'z-10'}`}
    >
      
      {/* DIRECTIVE: High-contrast honeycomb background layer */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.50] pointer-events-none -z-10" />
      
      {/* The Detail Modal: Positioned relative to this section's high z-index */}
      {activeDetail && (
        <DetailModal 
            step={activeDetail} 
            onClose={() => setActiveDetail(null)} 
        />
      )}

      {/* Narrative Header: Tightened spacing to bridge the Trust-Bar gap */}
      <div className="pt-4 pb-12">
        <SectionHeading
          pre="Evidence of Integrity"
          title="The Movement of"
          italic="Grace"
          sub="A rapid look at the unfiltered movement of our premium Golden Grace Honey. A journey from the sunny Free State fields to a jar on your table."
        />
      </div>

      {/* List Container: Reduced pb-40 to pb-12 for a smoother hand-off to the Sensory Sanctuary */}
      <div className="max-w-5xl mx-auto px-6 pb-12 md:pb-24 space-y-12 md:space-y-64 relative z-10">
        
        {/* Visual Axis Connector */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-1/2" />
        
        {JOURNEY_STEPS.map((step, idx) => (
          <div
            key={step.id}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative group`}
          >
            {/* The Interactive Visual Frame */}
            <div className="w-full md:w-5/12 relative cursor-pointer" onClick={() => setActiveDetail(step)}>
              <div className="absolute inset-0 bg-amber-500/0 blur-[100px] group-hover:bg-amber-500/10 transition-all duration-1000 rounded-full scale-50 group-hover:scale-100 -z-10" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl transition-all duration-700 group-hover:border-amber-500/50">
                <OptimizedImage
                  src={step.img}
                  alt={`Harvest movement step ${idx + 1}: ${step.title}`}
                  className="w-full h-full object-cover golden-filter group-hover:scale-110 transition-all duration-[1500ms]"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Step Badge */}
              <div className="absolute -top-4 -left-4 bg-amber-500 text-black w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-2xl shadow-xl z-20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                {idx + 1}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="w-full md:w-7/12 space-y-6 text-center md:text-left z-10 px-2 md:px-0">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 transition-all duration-500 flex items-center justify-center 
                  [&>svg]:text-white [&>svg]:transition-colors [&>svg]:duration-500
                  group-hover:bg-amber-500 group-hover:[&>svg]:text-black"
                >
                  {step.icon}
                </div>
                <span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-[10px]">
                  Movement 0{idx + 1}
                </span>
              </div>

              <h2 className="text-4xl md:text-7xl font-serif leading-none tracking-tighter text-white">
                {step.title} <br />
                <span className="text-xl md:text-3xl text-gray-500 italic font-light tracking-normal">
                  {step.subtitle}
                </span>
              </h2>

              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
                {step.description}
              </p>

              <button
                onClick={() => setActiveDetail(step)}
                title={`Examine technical evidence for ${step.title}`}
                className="group pt-6 flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.5em] text-gray-500 hover:text-amber-500 transition-all mx-auto md:mx-0 active:scale-95"
              >
                Examine Detail 
                <MoveRight
                  size={16}
                  className="group-hover:translate-x-3 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Journey;
