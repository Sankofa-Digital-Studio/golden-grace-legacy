import React, { useState } from 'react';
import { X, Maximize2, ArrowLeft } from 'lucide-react';
import { HARVEST_IMAGES } from '../../../data/constants';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';

const ArchiveSection = ({ onBack }) => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="archive" className="min-h-screen bg-[#050505] pt-16 px-4 md:px-12 pb-24 text-white animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <SectionHeading 
            center
            pre="Frames of Unfiltered Grace"
            title="The Harvest"
            italic="Archive"
            sub="A gallery of unfiltered frames capturing the raw integrity and daily devotion of our Free State harvest."
          />

        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {HARVEST_IMAGES.map((img) => (
            <div 
              key={img.id} 
              onClick={() => setSelected(img)} 
              className="relative rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white/5 transition-all hover:border-amber-500/50"
            >
              <OptimizedImage 
                src={img.path} 
                alt={img.alt} 
                title={img.title} 
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                 <p className="text-amber-500 font-serif text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</p>
                 <Maximize2 size={16} className="text-white/30 absolute top-4 right-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[400] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in zoom-in-95 duration-300" onClick={() => setSelected(null)}>
           <button className="absolute top-8 right-8 text-white/50 hover:text-white" title="Close Lightbox"><X size={32}/></button>
           <div className="max-w-5xl w-full flex flex-col items-center gap-6">
              <OptimizedImage 
              src={selected.path} alt={selected.alt} className="max-w-full max-h-[75vh] rounded-lg shadow-2xl border border-white/10" />
              <div className="text-center">
                <h3 className="text-amber-500 font-serif text-3xl">{selected.title}</h3>
                <p className="text-gray-500 text-xs uppercase tracking-[0.4em] mt-2 bold">{selected.category}</p>
              </div>
           </div>
        </div>
      )}
    </section>
  );
};

export default ArchiveSection;