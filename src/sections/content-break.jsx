import React from 'react';
import { Hexagon, Sparkles, ArrowDown } from 'lucide-react';
import OptimizedImage from '../components/ui/optimized-image';
import SectionHeading from '../components/ui/section-heading';
/**
 * --- CONTENT BREAK v2.8.0 ---
 * The "Palette Cleanser"
 * Purpose: A soulful transition from Science/Truth to Desire/Product.
 * UX Strategy: Minimalism. Remove the "thinking" brain and activate the "feeling" heart.
 */
const ContentBreak = () => {
  return (
    <section className="relative py-32 md:py-48 bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="/images/harvest/harvest-10.webp" 
          alt="Sunlight catching the liquid gold flow"
          className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* 2. THE THRESHOLD CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Divine Connection Label */}
        <div className="inline-flex items-center gap-3 border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm px-4 py-2 rounded-full mb-12 animate-pulse">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">The Blessing of Providence</span>
        </div>

        {/* The Soulful Quote: Transitioning to the Product */}
        <div className="space-y-8 max-w-4xl">
            <h2 className="text-4xl md:text-6xl 2xl:text-8xl font-serif text-white leading-tight">
                A gift provided by <span className="italic text-amber-400 font-light">Him</span>,<br /> 
                protected by <span className="text-gray-400">us.</span>
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
                "We have finished the harvest. We have verified the truth. Now, we invite you to experience the grace that defined the journey."
            </p>
        </div>

        {/* Visual Anchor & Anchor point for the scroll to Collection */}
        <div className="mt-16 flex flex-col items-center gap-6 group">
            <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <Hexagon 
                    size={48} 
                    className="text-amber-500/40 animate-spin-slow relative z-10" 
                />
                <ArrowDown 
                    size={20} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white group-hover:translate-y-1 transition-transform" 
                />
            </div>
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.6em]">Enter the Reserve</p>
        </div>

      </div>

      {/* Decorative Side Accents for Ultra-Wide Support */}
      <div className="hidden 2xl:block absolute left-20 top-1/2 -translate-y-1/2 h-px w-64 bg-gradient-to-r from-transparent to-white/10" />
      <div className="hidden 2xl:block absolute right-20 top-1/2 -translate-y-1/2 h-px w-64 bg-gradient-to-l from-transparent to-white/10" />

    </section>
  );
};

export default ContentBreak;