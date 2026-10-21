import React, { useState } from 'react';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';
import { ShoppingBag, Star, Hexagon, ArrowRight, Sparkles, Bell } from 'lucide-react';
import WaitlistModal from '../../../components/ui/waitlist-modal';
import { PRODUCTS, CATEGORIES } from '../../../data/constants';

const Collection = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [waitlistProduct, setWaitlistProduct] = useState(null);

  const filteredProducts =
    activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const renderStandardCard = (product) => {
    const activeSize = selectedSizes[product.id] || product.sizes[0];

    return (
      <div
        key={product.id}
        className="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 md:p-6 hover:border-amber-500/30 transition-all duration-700 flex flex-col h-full hover:shadow-2xl hover:shadow-amber-500/5"
      >
        {/* Product Image Stage */}
        <div className="relative aspect-[4/3] sm:aspect-square rounded-[1.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 mb-5 flex items-center justify-center">
          {product.tag && (
            <span className="absolute top-3 left-3 z-20 bg-amber-500 text-black text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
              {product.tag}
            </span>
          )}
          <OptimizedImage
            src={product.img}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Identity */}
        <div className="space-y-2 mb-4 flex-1">
          {product.remainingJars && product.totalBatchJars ? (
            <div className="space-y-1 bg-amber-500/[0.06] border border-amber-500/20 p-2 rounded-xl">
              <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-wider text-amber-400">
                <span className="flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Only {product.remainingJars} Jars Left
                </span>
                <span className="text-gray-400">{product.batchNumber || product.batch}</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  style={{ width: `${Math.round((1 - product.remainingJars / product.totalBatchJars) * 100)}%` }}
                />
              </div>
            </div>
          ) : product.scarcity ? (
            <div className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-wider text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {product.scarcity}
            </div>
          ) : null}

          <div className="flex justify-between items-start gap-2">
            <div>
              <p className="text-amber-500 text-[8px] font-black uppercase tracking-[0.25em] mb-0.5">
                {product.flora}
              </p>
              <h4 className="text-white font-serif text-lg sm:text-xl group-hover:text-amber-400 transition-colors leading-snug">
                {product.title}
              </h4>
            </div>
            <p className="text-white font-serif text-lg font-medium whitespace-nowrap">
              R{product.price}
            </p>
          </div>

          {product.tasteNotes && (
            <p className="text-gray-400 text-[11px] italic leading-snug line-clamp-2">
              "{product.tasteNotes}"
            </p>
          )}

          <p className="text-gray-500 text-[8px] uppercase font-mono tracking-wider flex items-center gap-1.5 pt-1 border-t border-white/5">
            <Hexagon size={9} className="text-amber-500/40" /> {product.batch || 'Reserve'} • {product.vessel}
          </p>
        </div>

        {/* Size Selector */}
        <div className="flex gap-1.5 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(product.id, size)}
              title={`Select ${size} size`}
              className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all ${
                activeSize === size
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto space-y-1.5">
          <button
            onClick={() => onAddToCart(product, activeSize)}
            title={`Add ${product.title} to your harvest bag`}
            className="w-full py-3.5 bg-amber-500 hover:bg-white text-black rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group/btn shadow-lg shadow-amber-500/10 font-black text-[9px] uppercase tracking-[0.25em]"
          >
            <span>Add to Bag</span>
            <ShoppingBag size={14} className="group-hover/btn:translate-y-[-1px] transition-transform" />
          </button>
          {product.tag === 'Limited Harvest' && (
            <button
              onClick={() => setWaitlistProduct(product)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-amber-400 hover:text-amber-300 border border-amber-500/30 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <Bell size={11} />
              <span>Join Bloom Waitlist</span>
            </button>
          )}
          <p className="text-[7.5px] text-gray-500 text-center uppercase tracking-wider">
            ✓ 100% Raw • DFS194 Certified
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="collection" className="pt-12 md:pt-16 pb-24 bg-[#050505] relative overflow-hidden">
      {/* --- BIOLUMINESCENT HONEYCOMB AURORA (Option A+) --- */}
      {/* 1. Glowing Amber Seam & Horizon Halo */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-16 bg-amber-500/15 blur-2xl rounded-full pointer-events-none" />

      {/* 2. Multi-tier Radial Honey Light Field */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(245,158,11,0.18)_0%,rgba(217,119,6,0.06)_45%,transparent_75%)] pointer-events-none -z-0" />

      {/* 3. Ambient Honeycomb Texture linking into product cards */}
      <div className="absolute top-0 inset-x-0 h-96 bg-honeycomb opacity-[0.06] pointer-events-none -z-0" />

      {/* 4. Ambient Side Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 1. HEADER: The Honey Shop */}
        <div className="mb-10 md:mb-12">
          <SectionHeading
            pre="Golden Grace Honey"
            title="The Honey"
            italic="Shop"
            sub="Limited batches of raw, unpasteurized honey from the Free State veld. Ready to order with direct nationwide courier."
          />
        </div>

        {/* 2. CATEGORY SWITCHER: Luxury Segmented Pill Bar */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap justify-center shadow-2xl">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  title={`View ${cat.label}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. DYNAMIC REAL ESTATE ADAPTATION */}
        {filteredProducts.length === 1 ? (
          /* CASE A: Single-item category (e.g. The Squeeze or The Gift) -> Master Showcase + Companion Shelf */
          <div className="space-y-16">
            {/* The Master Showcase Card */}
            {(() => {
              const single = filteredProducts[0];
              const singleActiveSize = selectedSizes[single.id] || single.sizes[0];
              const others = PRODUCTS.filter((p) => p.id !== single.id);

              return (
                <>
                  <div className="max-w-5xl mx-auto bg-white/[0.02] border border-amber-500/20 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                      {/* Image Stage */}
                      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-center">
                        {single.tag && (
                          <span className="absolute top-4 left-4 z-20 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-xl">
                            {single.tag}
                          </span>
                        )}
                        <OptimizedImage
                          src={single.img}
                          alt={single.title}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>

                      {/* Content & Ordering */}
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">
                              {single.flora}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                            <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">
                              {single.batch}
                            </span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-2">
                            {single.title}
                          </h3>
                          <p className="text-2xl sm:text-3xl text-amber-400 font-serif font-medium">
                            R{single.price}
                          </p>
                        </div>

                        {single.tasteNotes && (
                          <p className="text-gray-300 text-sm sm:text-base italic leading-relaxed font-light">
                            "{single.tasteNotes}"
                          </p>
                        )}

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5 text-[10px]">
                          <div>
                            <span className="text-gray-500 uppercase tracking-widest block font-bold">Vessel</span>
                            <span className="text-white font-medium">{single.vessel}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 uppercase tracking-widest block font-bold">Standard</span>
                            <span className="text-white font-medium">DFS194 Traceable • Cold-Pulled</span>
                          </div>
                        </div>

                        {/* Size Selector */}
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                            Select Vessel Net Weight
                          </span>
                          <div className="flex gap-2">
                            {single.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(single.id, size)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                  singleActiveSize === size
                                    ? 'bg-white text-black shadow-lg'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Primary Action */}
                        <div className="pt-2 space-y-2">
                          <button
                            onClick={() => onAddToCart(single, singleActiveSize)}
                            className="w-full py-5 bg-amber-500 hover:bg-white text-black rounded-[1.5rem] flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-amber-500/10 active:scale-95"
                          >
                            <span>Add to Harvest Bag</span>
                            <ShoppingBag size={18} />
                          </button>
                          <p className="text-[8px] text-gray-500 text-center uppercase tracking-widest">
                            ✓ 100% Raw • Zero Glucose Adulteration • Fast Nationwide Courier
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Companion Shelf: Fills Tablet & Desktop Real Estate with other reserves */}
                  <div className="pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em]">
                          Complete Your Flight
                        </p>
                        <h4 className="text-xl sm:text-2xl font-serif text-white">
                          Other Free State Reserves
                        </h4>
                      </div>
                      <button
                        onClick={() => setActiveCategory('all')}
                        className="text-xs text-gray-400 hover:text-amber-400 uppercase tracking-widest font-black transition-colors"
                      >
                        View All (4) →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {others.map((product) => renderStandardCard(product))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        ) : filteredProducts.length === 2 ? (
          /* CASE B: Two items (The Jars) -> Balanced 2-Column Desktop Spread */
          <div className="space-y-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((product) => renderStandardCard(product))}
            </div>

            {/* Companion shelf for remaining items */}
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em]">
                    Additional Formats
                  </p>
                  <h4 className="text-xl sm:text-2xl font-serif text-white">
                    Squeeze & Gift Flights
                  </h4>
                </div>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-xs text-gray-400 hover:text-amber-400 uppercase tracking-widest font-black transition-colors"
                >
                  View All (4) →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {PRODUCTS.filter((p) => p.category !== 'The Jars').map((product) =>
                  renderStandardCard(product)
                )}
              </div>
            </div>
          </div>
        ) : (
          /* CASE C: All Harvests (4 items) -> Balanced 4-Column Row on Desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => renderStandardCard(product))}
          </div>
        )}

        {/* 4. HARVEST COMPARISON TABLE: High-Value Desktop & Tablet Real Estate */}
        <div className="mt-20 hidden md:block border border-white/5 bg-white/[0.015] rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div>
              <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em] mb-1">
                Terroir Intelligence
              </p>
              <h4 className="text-xl font-serif text-white">Harvest Matrix Comparison</h4>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
              Free State Apiary Registry DFS194
            </span>
          </div>

          <div className="grid grid-cols-4 gap-6 divide-x divide-white/5">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="pl-6 first:pl-0 space-y-2">
                <p className="text-white font-serif text-base">{p.title}</p>
                <p className="text-amber-500 text-[9px] font-mono uppercase tracking-wider">{p.flora}</p>
                <p className="text-gray-400 text-xs italic leading-snug">"{p.tasteNotes}"</p>
                <div className="pt-2 text-[9px] text-gray-500 uppercase tracking-widest font-mono flex items-center justify-between">
                  <span>{p.vessel}</span>
                  <span className="text-amber-400/80 font-bold">From R{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FOOTER ASSURANCE */}
        <div className="mt-16 flex flex-col items-center gap-4 py-8 border-t border-white/5">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.5em] text-center">
            Strictly Limited Seasonal Quantities.
            <br className="md:hidden" />
            <span className="text-amber-500/40"> Provided by His Grace.</span>
          </p>
        </div>
      </div>
          <WaitlistModal
        isOpen={Boolean(waitlistProduct)}
        product={waitlistProduct}
        onClose={() => setWaitlistProduct(null)}
      />
    </section>
  );
};

export default Collection;
