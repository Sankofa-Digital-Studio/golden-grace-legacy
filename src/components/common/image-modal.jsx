import React from 'react';
import { X } from 'lucide-react';

const ImageModal = ({ image, alt, onClose }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[90vh] w-auto h-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors">
                    <X size={32} />
                </button>
                <img src={image} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10" />
            </div>
        </div>
    );
};

export default ImageModal;