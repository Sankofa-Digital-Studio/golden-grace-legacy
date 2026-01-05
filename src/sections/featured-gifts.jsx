import React from 'react';
import { Award, Gift, ArrowRight } from 'lucide-react';

const FeaturedGifts = ({ navigate }) => (
  <section className="py-16 bg-[#121212] border-t border-white/5">
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">
            Gifting
          </span>
          <h3 className="text-2xl md:text-4xl font-serif text-white mt-2">Share the Sweetness</h3>
        </div>
        <button
          onClick={() => navigate('gifts')}
          className="hidden md:flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
        >
          View Gift Sets <ArrowRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div
          onClick={() => navigate('gifts')}
          className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1549488352-843258fb82fd?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Gifts"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <div>
              <h4 className="text-xl font-serif text-white mb-2">Corporate & Events</h4>
              <p className="text-gray-300 text-sm">Bespoke hampers for weddings and business.</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate('gifts')}
          className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer border border-amber-500/20"
        >
          <img
            src="/images/gift-mini.webp"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter"
            alt="Mini Gift Jar"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
            <div>
              <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">
                NEW ARRIVAL
              </span>
              <h4 className="text-xl font-serif text-white mb-2">The Mini Gift Jar</h4>
              <p className="text-gray-300 text-sm">
                A precious token of sweetness. Includes mini dipper & bee charm.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('gifts')}
        className="md:hidden mt-6 flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm uppercase tracking-widest"
      >
        View Gift Sets <ArrowRight size={16} />
      </button>
    </div>
  </section>
);

export default FeaturedGifts;
