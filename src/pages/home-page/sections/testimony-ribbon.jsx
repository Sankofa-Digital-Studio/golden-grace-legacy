import React from 'react';
import { Star } from 'lucide-react';
import { shortTestimonies } from '../../../data/constants';

export const TestimonyRibbon = () => {
 

  return (
    <div className="w-full bg-amber-500/5 border-y border-white/5 py-6 overflow-hidden relative">
      <div className="flex animate-marquee_ribbon whitespace-nowrap">
        {[...shortTestimonies, ...shortTestimonies].map((text, i) => (
          <div key={i} className="flex items-center gap-8 mx-12">
            <div className="flex gap-1">
              {[...Array(5)].map((_, s) => (
                <Star key={s} size={10} className="fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-white font-serif italic text-sm md:text-lg tracking-wide">
              "{text}"
            </p>
            <span className="w-1 h-1 rounded-full bg-amber-500/40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonyRibbon;