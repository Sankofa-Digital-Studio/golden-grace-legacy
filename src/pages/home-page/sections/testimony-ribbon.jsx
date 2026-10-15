import React from 'react';
import { Star } from 'lucide-react';
import { shortTestimonies } from '../../../data/constants';
import Section from '../../../components/layout/section';

/**
 * --- TESTIMONY RIBBON v2.1.0 ---
 * Purpose: Social proof as ambient motion
 * Role: Emotional reinforcement between Journey → Sensory
 * Contract: Section-compliant
 */
const TestimonyRibbon = () => {
  // Duplicate to ensure seamless marquee loop
  const items = [...shortTestimonies, ...shortTestimonies];

  return (
    <Section
      id="testimony-ribbon"
      className="
        bg-amber-500/5
        border-y border-white/5
        py-6
        overflow-hidden
        select-none
      "
    >
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee_ribbon items-center">
          {items.map((text, i) => (
            <div
              key={`testimony-${i}`}
              className="flex items-center gap-8 mx-12 shrink-0"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    size={10}
                    className="fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white font-serif italic text-sm md:text-lg tracking-wide">
                “{text}”
              </p>

              {/* Divider dot */}
              <span className="w-1 h-1 rounded-full bg-amber-500/40" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TestimonyRibbon;
