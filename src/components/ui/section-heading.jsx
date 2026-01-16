import React from 'react';


const SectionHeading = ({ pre, title, italic, sub }) => (
  <div className="text-left space-y-2 px-6">
    <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] block uppercase">
      {pre}
    </span>
    <h2 className="text-4xl md:text-6xl font-serif text-white italic tracking-tight leading-tight">
      {title} <span className="text-amber-400 font-light not-italic">{italic}</span>
    </h2>
    {sub && (
      <p className="text-gray-500 text-sm font-light max-w-[280px] md:max-w-sm italic leading-relaxed">
        {sub}
      </p>
    )}
  </div>
);
export default SectionHeading;