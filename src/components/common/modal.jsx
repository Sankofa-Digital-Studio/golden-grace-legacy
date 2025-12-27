import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg md:max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl p-6 md:p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button title="Close" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            {title && <h2 className="text-xl md:text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">{title}</h2>}
            <div className="text-gray-300 space-y-4 text-sm leading-relaxed font-light">{content}</div>
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end"><button onClick={onClose} className="px-6 py-2 bg-amber-500 text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">Close</button></div>
        </div>
    </div>
);

export default Modal;