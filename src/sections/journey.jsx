import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { JOURNEY_STEPS, HARVEST_IMAGES } from '../data/constants';

const JourneySection = ({ onBack }) => (
  <div className="bg-[#050505] min-h-screen text-white animate-in slide-in-from-right-10 duration-700">
    <header className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HARVEST_IMAGES[24].path}
          alt="Wide panoramic of the Welkom honey farm"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-black/60" />
      </div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl font-serif mb-6 leading-none">
          The <span className="italic text-amber-500 font-light">Origin</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg font-light tracking-wide italic">
          "A story written in nectar and sunlight."
        </p>
        <div className="mt-12 animate-bounce opacity-30">
          <ChevronDown size={32} className="mx-auto" />
        </div>
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-6 py-32 space-y-64">
      {JOURNEY_STEPS.map((step, idx) => (
        <div
          key={step.id}
          className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
        >
          <div className="w-full md:w-1/2 relative group">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src={step.img}
                alt={step.title}
                title={step.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-amber-500 text-black p-6 rounded-2xl font-serif text-3xl shadow-2xl">
              0{idx + 1}
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-full border border-white/10 text-amber-500">
                {step.icon}
              </div>
              <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                The Process
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              {step.title} <br />{' '}
              <span className="text-2xl text-gray-500 italic font-light">{step.subtitle}</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed font-light">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default JourneySection;
