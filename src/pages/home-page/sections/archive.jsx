import React, { useState } from 'react';
import { X, Maximize2, ArrowLeft } from 'lucide-react';
import { HARVEST_IMAGES } from '../../../data/constants';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';
import Section from '../../../components/layout/section';

const ArchiveSection = () => {
  const [selected, setSelected] = useState(null);

  // Close on ESC for desktop + accessibility
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Section id="archive" className="overflow-hidden">
      <SectionHeading
        center
        pre="Frames of Unfiltered Grace"
        title="The Harvest"
        italic="Archive"
        sub="A gallery of unfiltered frames capturing the raw integrity and daily devotion of our Free State harvest."
      />

      {/* Masonry-ish columns. `break-inside-avoid` prevents awkward splitting. */}
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {HARVEST_IMAGES.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelected(img)}
            className="block w-full text-left break-inside-avoid rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in bg-white/5 transition-all hover:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            title={`Open ${img.title}`}
          >
            <div className="relative">
              <OptimizedImage
                src={img.path}
                alt={img.alt}
                title={img.title}
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-amber-500 font-serif text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.title}
                </p>
                <Maximize2 size={16} className="text-white/30 absolute top-4 right-4" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[400] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-6 animate-in zoom-in-95 duration-300"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Harvest image viewer"
        >
          {/* Stop click bubbling so clicking content doesn't close */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-2 -right-2 md:top-0 md:right-0 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-amber-500/30 transition-all"
              title="Close lightbox"
              onClick={() => setSelected(null)}
              type="button"
            >
              <X size={22} />
            </button>

            <OptimizedImage
              src={selected.path}
              alt={selected.alt}
              className="max-w-full max-h-[72vh] md:max-h-[75vh] rounded-2xl shadow-2xl border border-white/10"
            />

            <div className="text-center">
              <h3 className="text-amber-500 font-serif text-2xl md:text-3xl">
                {selected.title}
              </h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mt-2 font-black">
                {selected.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default ArchiveSection;