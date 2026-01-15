import React, { useEffect, useState } from 'react';
import { X, Thermometer, Map, ShieldCheck, MoveRight } from 'lucide-react';
import { JOURNEY_TECHNICAL_DATA } from '../../data/constants';
import BeeCloseButton from './bee-close-button';

const DetailModal = ({ step, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const data = JOURNEY_TECHNICAL_DATA[step.id];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleIntentionalExit = () => {
    setIsClosing(true);
    setTimeout(onClose, 800); // Wait for bee fly-away animation
  };

  return (
    <div
      className={`fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl transition-all duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div
        className={`max-w-xl w-full bg-[#111] border border-amber-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-700 ease-out ${isClosing ? 'scale-75 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100'} animate-in zoom-in-75 slide-in-from-bottom-16`}
      >
        <div className="absolute top-8 right-8 scale-110">
          <BeeCloseButton onClose={onClose} />
        </div>
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-amber-500/10 rounded-2xl text-white border border-amber-500/20 shadow-inner">
              {step.icon}
            </div>
            <div>
              <h4 className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-1">
                Technical Deep Dive
              </h4>
              <h3 className="text-3xl md:text-4xl font-serif text-white">{step.title}</h3>
            </div>
          </div>
          <div className="space-y-8 text-left">
            <div className="flex gap-6 group">
              <Thermometer
                className="text-amber-500 transition-transform group-hover:scale-110"
                size={24}
              />
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
                  Lab Analysis
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.labData}</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <Map
                className="text-amber-500 transition-transform group-hover:scale-110"
                size={24}
              />
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
                  Geographic Lore
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.lore}</p>
              </div>
            </div>
            <div className="bg-amber-500/[0.03] p-8 rounded-[2rem] border border-amber-500/10 relative group">
              <ShieldCheck
                size={48}
                className="absolute top-6 right-6 text-amber-500/10 group-hover:text-amber-500/30 transition-colors"
              />
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-3">
                Integrity Confirmation
              </p>
              <p className="text-white text-xl font-serif italic pr-12 leading-snug">
                {data.integrityMetric}
              </p>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
