import React from 'react';


const SectionHeading = ({ pre, title, italic, sub }) => (
  <div className="text-center space-y-3 mb-16 animate-fade-in-up">
    <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] block">
      {pre}
    </span>
    <h2 className="text-4xl md:text-8xl font-serif leading-none tracking-tight text-white uppercase">
      {title} <span className="italic text-amber-400 font-light lowercase">{italic}</span>
    </h2>
    <p className="pt-2 text-gray-400 max-w-md mx-auto text-xs italic font-light tracking-wide leading-relaxed">
      "{sub}"
    </p>
  </div>
);
export default SectionHeading;