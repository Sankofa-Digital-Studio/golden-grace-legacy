import React, { useState } from 'react';
import ProductCard from '../../../components/ui/product-card';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';
import { ShoppingBag, Star, Hexagon } from 'lucide-react';
import { PRODUCTS } from '../../../data/constants';
import { CATEGORIES } from '../../../data/constants';

const Collection = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState({});

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

const handleAdd = (product) => {
  const chosenSize = selectedSizes[product.id] || product.sizes?.[0];

  // payload goes to CartContext addToCart(product)
  onAddToCart?.({
    ...product,
    selectedSize: chosenSize,
  });
};

  return (
    <section id="collection" className="py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. HEADER: The Reserve Narrative */}
        <div className="mb-16">
          <SectionHeading 
            pre="The Selection"
            title="The Reserve"
            italic="Collection"
            sub="Limited batches of raw, unbothered grace. Harvested when He provides, bottled with uncompromising integrity."
          />
        </div>

        {/* 2. CATEGORY CHIPS: Boutique Grouping */}
        <div className="flex flex-wrap gap-3 mb-12">
           {CATEGORIES.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               title={`View ${cat.label}`}
               className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95
                 ${activeCategory === cat.id 
                   ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                   : 'bg-white/5 text-gray-400 border border-white/10 hover:border-amber-500/30'}`}
             >
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>

        {/* 3. PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 hover:border-amber-500/20 transition-all duration-700 flex flex-col h-full"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#0a0a0a] mb-8">
                 {product.tag && (
                    <span className="absolute top-4 left-4 z-20 bg-amber-500 text-black text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-xl">
                        {product.tag}
                    </span>
                 )}
                 <OptimizedImage 
                    src={product.img} 
                    alt={product.title}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Identity */}
              <div className="space-y-2 mb-6">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-1">{product.flora}</p>
                        <h4 className="text-white font-serif text-2xl group-hover:text-amber-400 transition-colors">{product.title}</h4>
                    </div>
                    <p className="text-white font-serif text-xl">R{product.price}</p>
                 </div>
                 <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                    <Hexagon size={10} className="text-amber-500/40" /> {product.vessel}
                 </p>
              </div>

              {/* Size Selector Chips */}
              <div className="flex gap-2 mb-8">
                {product.sizes.map(size => (
                    <button
                        key={size}
                        onClick={() => handleSizeSelect(product.id, size)}
                        title={`Select ${size} size`}
                        className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
                            ${(selectedSizes[product.id] || product.sizes[0]) === size 
                                ? 'bg-white text-black' 
                                : 'bg-white/5 text-gray-500 border border-white/10 hover:border-white/20'}`}
                    >
                        {size}
                    </button>
                ))}
              </div>

              {/* CTA: Guest Checkout Focused */}
              <button 
                title={`Add ${product.title} to your harvest bag`}
                 onClick={() => handleAdd(product)}
                className="mt-auto w-full py-5 bg-amber-500 hover:bg-white text-black rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 group/btn shadow-xl shadow-amber-500/5"
              >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Experience the Drip</span>
                 <ShoppingBag size={16} className="group-hover/btn:translate-y-[-2px] transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* 4. FOOTER NOTE */}
        <div className="mt-20 flex flex-col items-center gap-4 py-12 border-t border-white/5">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-amber-500 text-amber-500" />)}
            </div>
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.5em] text-center">
                Strictly Limited Seasonal Quantities. 
                <br className="md:hidden" />
                <span className="text-amber-500/40"> Provided by His Grace.</span>
            </p>
        </div>

      </div>
    </section>
  );
};
export default Collection;
