import React, { useState } from 'react';
import { MoveRight } from 'lucide-react';
import { JOURNEY_STEPS } from '../../../data/constants';
import DetailModal from '../../../components/ui/detail-modal';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';
import Section from '../../../components/layout/section';

/**
 * --- JOURNEY SECTION v2.7.0 ---
 * Refactor: Section contract compliance + mobile rhythm tightening.
 * Keeps: z-index elevation when modal is open (prevents Sensory overlap).
 */
const Journey = () => {
  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <Section
      id="journey"
      bg="bg-transparent"
      className={`transition-all duration-500 ${
        activeDetail ? 'z-[600]' : 'z-10'
      }`}
      // NOTE: Section already provides py-16 md:py-24 + container padding via contract
    >
      {/* DIRECTIVE: High-contrast honeycomb background layer (full bleed) */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.50] pointer-events-none -z-10" />

      {/* The Detail Modal: Positioned relative to this section's high z-index */}
      {activeDetail && (
        <DetailModal step={activeDetail} onClose={() => setActiveDetail(null)} />
      )}

      {/* Narrative Header */}
      <div className="pt-4 pb-10 md:pb-12">
        <SectionHeading
          pre="Evidence of Integrity"
          title="The Movement of"
          italic="Grace"
          sub="A rapid look at the unfiltered movement of our premium Golden Grace Honey. A journey from the sunny Free State fields to a jar on your table."
        />
      </div>

      {/* Timeline Container (remove duplicate max-w + padding; contract already handles it) */}
      <div className="relative z-10 space-y-14 md:space-y-40">
        {/* Visual Axis Connector */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 -translate-x-1/2" />

        {JOURNEY_STEPS.map((step, idx) => (
          <div
            key={step.id}
            className={`flex flex-col ${
              idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center gap-10 md:gap-24 relative group`}
          >
            {/* The Interactive Visual Frame */}
            <button
              type="button"
              onClick={() => setActiveDetail(step)}
              title={`Open detail view for ${step.title}`}
              className="w-full md:w-5/12 relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-amber-500/40 rounded-3xl"
            >
              <div className="absolute inset-0 bg-amber-500/0 blur-[100px] group-hover:bg-amber-500/10 transition-all duration-1000 rounded-full scale-50 group-hover:scale-100 -z-10" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-amber-500/10 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square shadow-2xl transition-all duration-700 group-hover:border-amber-500/50">
                <OptimizedImage
                  src={step.img}
                  alt={`Harvest movement step ${idx + 1}: ${step.title}`}
                  className="w-full h-full object-cover golden-filter group-hover:scale-110 transition-all duration-[1500ms]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Step Badge */}
              <div className="absolute -top-4 -left-4 bg-amber-500 text-black w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-2xl shadow-xl z-20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                {idx + 1}
              </div>
            </button>

            {/* Narrative Content */}
            <div className="w-full md:w-7/12 space-y-6 text-center md:text-left z-10 px-1 md:px-0">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div
                  className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 transition-all duration-500 flex items-center justify-center
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

              <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0">
                {step.description}
              </p>

              <button
                type="button"
                onClick={() => setActiveDetail(step)}
                title={`Examine technical evidence for ${step.title}`}
                className="group pt-4 md:pt-6 flex items-center gap-4 text-[10px] uppercase font-black tracking-[0.5em] text-gray-500 hover:text-amber-500 transition-all mx-auto md:mx-0 active:scale-95"
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
    </Section>
  );
};

export default Journey;
