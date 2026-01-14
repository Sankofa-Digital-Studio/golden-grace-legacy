import React, { useState } from 'react';
import { X } from 'lucide-react'; 
export const BeeCloseButton = ({ onClose }) => {
  const [isFlying, setIsFlying] = useState(false);
  const handleClick = () => { setIsFlying(true); setTimeout(onClose, 800); };
  return (
    <button title="Close Drawer" onClick={handleClick} className={`p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all group ${isFlying ? 'pointer-events-none' : ''}`}>
      <X size={24} className={`transition-transform duration-300 ${isFlying ? 'rotate-180 opacity-0' : 'group-hover:rotate-90'}`} />
    </button>
  );
};

export default BeeCloseButton;