import React, { useEffect, useState } from 'react';
import { X, Thermometer, Map, ShieldCheck } from 'lucide-react';
import { JOURNEY_TECHNICAL_DATA } from '../../data/constants';
import BeeCloseButton from './bee-close-button';

const DetailModal = ({ step, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const data = JOURNEY_TECHNICAL_DATA[step.id];

  // --- ROBUST INDUSTRIAL SCROLL LOCK ---
  useEffect(() => {
    const originalBodyStyle = window.getComputedStyle(document.body).overflow;
    const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalBodyStyle;
      document.documentElement.style.overflow = originalHtmlStyle;
    };
  }, []);

  const handleIntentionalExit = () => {
    setIsClosing(true);
    setTimeout(onClose, 800); 
  };

  return (
    <div
      className={`fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl transition-all duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`max-w-xl w-full bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-700 ease-out ${isClosing ? 'scale-75 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100'} animate-in zoom-in-75 slide-in-from-bottom-16`}
      >
        {/* THE CLOSE BUTTON */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 scale-110 z-[60]">
          <BeeCloseButton onClose={onClose} />
        </div>

        <div className="flex flex-col h-full space-y-8 md:space-y-10">
          
          {/* 1. HEADER AREA: Aligned with intent 
              Top: Distinct Label
              Bottom: Icon + Title inline
          */}
          <div className="space-y-4"> 
           <h4 className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[9px] text-center w-full block">
              Technical Deep Dive
            </h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-center [&>svg]:text-white shrink-0">
                {step.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                {step.title}
              </h3>
            </div>
          </div>

          {/* 2. DATA LISTING: Icons aligned with the header icon center-axis */}
          <div className="space-y-6 text-left">
            <div className="flex gap-4 group/item items-start">
              {/* Slot matches header icon width (w-12) for perfect vertical alignment */}
              <div className="w-12 flex justify-center shrink-0 pt-1">
                <Thermometer
                  className="text-amber-500 transition-transform group-hover/item:scale-110"
                  size={18}
                />
              </div>
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-1 opacity-70">
                  Lab Analysis
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.labData}</p>
              </div>
            </div>
            
            <div className="flex gap-4 group/item items-start">
              <div className="w-12 flex justify-center shrink-0 pt-1">
                <Map
                  className="text-amber-500 transition-transform group-hover/item:scale-110"
                  size={18}
                />
              </div>
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-1 opacity-70">
                  Geographic Lore
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.lore}</p>
              </div>
            </div>
          </div>

          {/* 3. INTEGRITY SEAL: Compacted space and disciplined metric typography */}
          <div className="pt-2 flex flex-col items-center text-center">
            <div className="relative group w-full">
                <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000" />
                
                <div className="relative bg-white/[0.02] border border-white/5 px-6 py-6 rounded-[2.5rem] flex flex-col items-center gap-3 transition-all duration-500 group-hover:border-amber-500/20">
                    <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        <ShieldCheck size={24} className="text-amber-500" />
                    </div>
                    
                    <div className="space-y-1.5">
                        <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.6em]">Integrity Confirmation</p>
                        {/* TYPOGRAPHY FIX: Non-italic, text-[10px] (smaller than text-xs), and uppercase for authority */}
                        <p className="text-gray-300 text-[10px] md:text-xs font-sans font-medium leading-relaxed px-4 pt-4 opacity-80 tracking-wider">
                            "{data.integrityMetric}"
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
