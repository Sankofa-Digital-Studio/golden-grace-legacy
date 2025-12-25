import React, { useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
        onClick={onNavigate}
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm md:left-auto md:right-6 md:translate-x-0 md:bottom-6 z-[100] animate-fade-in-up cursor-pointer transition-transform active:scale-95`}
    >
      <div className="bg-[#1a1a1a]/95 border border-amber-500/30 text-white px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-2xl flex items-center gap-3 md:gap-4 backdrop-blur-md">
        <div className="bg-amber-500/10 p-2 rounded-full flex-shrink-0">
            {type === 'cart' ? <ShoppingBag className="text-amber-400 w-4 h-4 md:w-5 md:h-5" /> : <CheckCircle className="text-amber-400 w-4 h-4 md:w-5 md:h-5" />}
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-serif font-bold text-amber-400 uppercase tracking-wider">{type === 'cart' ? 'Reserve Updated' : 'Success'}</h4>
          <p className="text-[10px] md:text-xs text-gray-300">{message}</p>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="text-gray-500 hover:text-white ml-auto"
        >
            <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;