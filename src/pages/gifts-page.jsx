import React, { useEffect } from 'react';
import { Award, Gift, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { OptimizedImage } from '../components/ui/optimized-image';
import { VIEWS } from '../views';
import { WHATSAPP_NUMBER } from '../config/maintenance';

const GiftsPage = ({ onBack, onNavigate, onRequestCatalogue, onBuildBox }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate(VIEWS.HOME);
    }
  };

  const handleRequestCatalogue = () => {
    if (onRequestCatalogue) {
      onRequestCatalogue();
      return;
    }
    const text = encodeURIComponent(
      'Hello Golden Grace Concierge, I would like to request the Corporate Gifting & Bespoke Suites catalogue.'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const handleBuildBox = () => {
    if (onBuildBox) {
      onBuildBox();
      return;
    }
    if (onNavigate) {
      onNavigate(VIEWS.HOME, { scrollTo: 'collection' });
    } else {
      const text = encodeURIComponent(
        'Hello Golden Grace Concierge, I would like to curate a custom celebration gift hamper.'
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-[#050505] min-h-screen text-white">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Top Backward Navigation Bar */}
        <div className="mb-8">
          <button
            onClick={handleReturn}
            title="Return to the Storefront"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/40 text-amber-400 hover:text-white transition-all text-xs font-mono tracking-wider active:scale-95 shadow-lg"
          >
            <ArrowLeft size={14} /> Return to Storefront
          </button>
        </div>

        {/* Header Block */}
        <div className="mb-14 md:mb-20 text-center animate-fade-in-up">
          <span className="text-amber-500 tracking-[0.35em] text-xs lg:text-sm font-bold uppercase block mb-3">
            Bespoke Gifting • Free State Apiaries
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tight leading-tight">
            The Art of Giving.
          </h1>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-md md:max-w-2xl lg:max-w-3xl lg:text-lg mx-auto font-light leading-relaxed">
            Curated hampers, raw honeycomb sections, and personalized honey suites for corporate
            clients, wedding celebrations, and discerning hosts.
          </p>
        </div>

        {/* Gifting Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Corporate Card */}
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 h-[480px] md:h-[550px] lg:h-[600px] shadow-2xl transition-all hover:border-amber-500/40">
            <OptimizedImage
              src="/images/harvest/harvest-23.webp"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 grayscale group-hover:grayscale-0"
              alt="Corporate Honey Suites"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 flex flex-col justify-end p-8 md:p-12 text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <Award size={28} />
              </div>
              <span className="text-amber-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-1">
                Executive & Institutional
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3">
                Corporate Suites
              </h3>
              <p className="text-gray-300 mb-8 text-xs md:text-sm leading-relaxed max-w-md font-light">
                Impress VIP clients and partners with B-BBEE Level 1 compliant, locally sourced
                Free State raw luxury. Custom wax seals and wooden presentation boxes available.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleRequestCatalogue}
                  title="Request Corporate Catalogue via Concierge"
                  className="bg-amber-500 hover:bg-white text-black px-7 py-3.5 rounded-full uppercase tracking-widest text-xs font-black transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-amber-500/10"
                >
                  <MessageCircle size={15} />
                  <span>Request Catalogue</span>
                </button>
              </div>
            </div>
          </div>

          {/* Personal Card */}
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 h-[480px] md:h-[550px] lg:h-[600px] shadow-2xl transition-all hover:border-amber-500/40">
            <OptimizedImage
              src="/images/harvest/harvest-10.webp"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 grayscale group-hover:grayscale-0"
              alt="Celebration Hampers"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 flex flex-col justify-end p-8 md:p-12 text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <Gift size={28} />
              </div>
              <span className="text-amber-400 text-[10px] font-mono uppercase tracking-[0.3em] font-bold mb-1">
                Weddings & Milestones
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-3">
                Celebration Hampers
              </h3>
              <p className="text-gray-300 mb-8 text-xs md:text-sm leading-relaxed max-w-md font-light">
                Weddings, housewarmings, or anniversary honors. Pair single-origin hexagonal jars
                with hand-carved olive wood dippers and botanicals.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleBuildBox}
                  title="Curate celebration hamper from current honey reserves"
                  className="bg-white hover:bg-amber-500 text-black px-7 py-3.5 rounded-full uppercase tracking-widest text-xs font-black transition-all flex items-center gap-2 active:scale-95 shadow-xl"
                >
                  <span>Build Your Hamper</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Backward & Conversion Pivot */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center space-y-4">
          <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.4em]">
            DFS194 Registered • Free State Apiaries • Handcrafted Presentation
          </p>
          <div>
            <button
              onClick={handleReturn}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white uppercase tracking-widest transition-colors py-2 px-5 rounded-full border border-white/10 hover:border-white/30"
            >
              <ArrowLeft size={14} /> Back to Storefront
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftsPage;
