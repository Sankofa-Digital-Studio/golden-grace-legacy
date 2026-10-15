import React, { useState } from 'react';
import { X } from 'lucide-react'; 

export const BeeCloseButton = ({ onClose }) => {
  const [isFlying, setIsFlying] = useState(false);
   const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
  const handleClick = () => {
  if (prefersReducedMotion) {
    onClose();
    return;
  }
  setIsFlying(true);
  setTimeout(onClose, 800);
};
  return (
    <button 
      type="button"
      onClick={handleClick}
      title="Close Detail View"
      aria-label="Close detail view"
      className={`p-2 rounded-full bg-black/20 text-white hover:bg-amber-500/20 transition-all group relative
        ${isFlying ? 'animate-bee-fly-away pointer-events-none' : ''}`}
    >
      <X size={24} className={`transition-transform duration-300 ${isFlying ? 'rotate-180 opacity-0' : 'group-hover:rotate-90'}`} />
      <svg viewBox="0 0 24 24" className={`absolute inset-0 w-full h-full text-amber-400 opacity-0 transition-opacity duration-300 ${isFlying ? 'opacity-100' : 'group-hover:opacity-100'}`} fill="currentColor">
         <path d="M19.4 7.6c-.6-.7-1.4-1.2-2.3-1.4.2-.9.1-1.8-.4-2.5-.5-.7-1.3-1-2.1-1-.5 0-1 .1-1.4.3C12.7 2.4 11.9 2 11 2c-1.7 0-3 1.3-3 3 0 .2 0 .5.1.7-1.2.3-2.1 1.3-2.1 2.6 0 .3.1.6.2.9C4.8 9.6 4 10.9 4 12.3c0 1.2.6 2.3 1.5 2.9-.1.4-.2.9-.2 1.3 0 2.2 1.8 4 4 4 1.2 0 2.3-.6 3-1.5.4.1.9.2 1.3.2 2.2 0 4-1.8 4-4 0-.4-.1-.8-.2-1.2 1-.7 1.7-1.8 1.7-3.1 0-1.2-.6-2.3-1.4-2.9.4-.1.7-.2.9-.4z"/>
      </svg>
    </button>
  );
};

export default BeeCloseButton;
