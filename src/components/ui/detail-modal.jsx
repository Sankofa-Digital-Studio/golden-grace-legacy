import React, {useEffect} from 'react';
import { X, Thermometer, Map, ShieldCheck } from 'lucide-react';
import { JOURNEY_TECHNICAL_DATA } from '../../data/constants';
import BeeCloseButton from './bee-close-button';

const DetailModal = ({ step, onClose }) => {
  const data = JOURNEY_TECHNICAL_DATA[step.id];
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="max-w-xl w-full bg-[#111] border border-amber-500/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <div className="absolute top-6 right-6 scale-110"><BeeCloseButton onClose={onClose} /></div>
        <div className="space-y-10">
          <div className="flex items-center gap-5">
             <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20">{step.icon}</div>
             <div>
               <h4 className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-1">Technical Deep Dive</h4>
               <h3 className="text-3xl font-serif text-white">{step.title}</h3>
             </div>
          </div>
          <div className="space-y-8 text-left">
            <div className="flex gap-5 group">
              <Thermometer className="text-amber-500 group-hover:scale-110 transition-transform" size={22} />
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Lab Analysis</p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.labData}</p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <Map className="text-amber-500 group-hover:scale-110 transition-transform" size={22} />
              <div>
                <p className="text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Geographic Lore</p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{data.lore}</p>
              </div>
            </div>
            <div className="bg-amber-500/[0.03] p-6 rounded-3xl border border-amber-500/10 relative group">
               <ShieldCheck size={40} className="absolute top-4 right-4 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
               <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Integrity Confirmation</p>
               <p className="text-white text-lg font-serif italic pr-12 leading-tight">{data.integrityMetric}</p>
            </div>
          </div>
          <button onClick={onClose} title="Return to story" className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-all shadow-xl active:scale-95">Continue Movement</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
