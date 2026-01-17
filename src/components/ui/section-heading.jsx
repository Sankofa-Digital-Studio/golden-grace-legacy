import React from 'react';


// const SectionHeading = ({ pre, title, italic, sub }) => (
//   <div className="text-left space-y-2 px-6">
//     <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] block uppercase">
//       {pre}
//     </span>
//     <h2 className="text-4xl md:text-6xl font-serif text-white italic tracking-tight leading-tight">
//       {title} <span className="text-amber-400 font-light not-italic">{italic}</span>
//     </h2>
//     {sub && (
//       <p className="text-gray-500 text-sm font-light max-w-[280px] md:max-w-sm italic leading-relaxed">
//         {sub}
//       </p>
//     )}
//   </div>
// );
// export default SectionHeading;

const SectionHeading = ({ pre, title, italic, sub, center = false }) => (
  <div className={`space-y-4 px-6 ${center ? 'text-center flex flex-col items-center' : 'text-left'}`}>
    <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] block animate-fade-in">
      {pre}
    </span>
    <h2 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight">
      {title} <span className="text-amber-400 font-light italic">{italic}</span>
    </h2>
    {sub && (
      /* SANKOFA FIX: max-w-[280px] on mobile and max-w-2xl on desktop prevents edge touching */
      <p className={`text-gray-500 text-sm md:text-lg font-light leading-relaxed italic 
        ${center ? 'max-w-2xl' : 'max-w-[300px] md:max-w-xl'}`}
      >
        "{sub}"
      </p>
    )}
  </div>
);

export default SectionHeading;