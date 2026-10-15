import React from 'react';
import { certs } from '../../../data/constants';
import Section from '../../../components/layout/section';

/**
 * --- TRUST BAR v2.2.0 ---
 * Contract: Section-compliant
 * Purpose: Authority + credibility reinforcement without cognitive load
 */
const TrustBar = () => {
  // Repeat to create seamless marquee loop
  const marqueeItems = [...certs, ...certs, ...certs, ...certs];

  return (
    <Section
      id="trust-bar"
      className="
        relative
        border-y border-white/5
        py-10 md:py-12
        overflow-hidden
        select-none
      "
    >
      {/* Marquee Track */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee gap-12 md:gap-24 lg:gap-32 items-center">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-4 group cursor-help shrink-0"
              title={item.title}
            >
              {/* Icon Container */}
              <div
                className={`
                  p-3 rounded-xl border
                  transition-all duration-500
                  ${item.accent}
                `}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="text-left">
                <h4 className="text-white text-[11px] md:text-xs font-black uppercase tracking-widest leading-none mb-1">
                  {item.label}
                </h4>
                <p className="text-gray-500 text-[9px] md:text-[10px] uppercase font-bold tracking-tighter">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge fades — soften the loop edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-20" />
    </Section>
  );
};

export default TrustBar;
