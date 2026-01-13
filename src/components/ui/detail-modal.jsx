import React from 'react';
import {X, Thermometer, Map} from 'lucide-react';
import { JOURNEY_TECHNICAL_DATA } from '../../data/constants';

const DetailModal = ({ step, onClose }) => {
  const data = JOURNEY_TECHNICAL_DATA[step.id];
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="max-w-lg w-full bg-[#111] border border-amber-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl -z-10" />
        
        <button onClick={onClose} title="Close Detail" className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">{step.icon}</div>
             <div>
               <h4 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px]">Technical Evidence</h4>
               <h3 className="text-2xl font-serif text-white">{step.title}</h3>
             </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Thermometer className="text-amber-500 shrink-0" size={20} />
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">Lab Analysis</p>
                <p className="text-gray-400 text-sm leading-relaxed">{data.labData}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Map className="text-amber-500 shrink-0" size={20} />
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">Geographic Lore</p>
                <p className="text-gray-400 text-sm leading-relaxed">{data.lore}</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
               <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-1">Integrity Metric</p>
               <p className="text-white text-lg font-serif italic">{data.stats}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-all"
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailModal;