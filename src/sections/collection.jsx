import React, { useState } from 'react';
import { Droplet, Smile, Utensils, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ui/product-card';

const Collection = ({ onAddToCart, onImageClick, onBulkEnquire }) => {
  const [activeTab, setActiveTab] = useState('honey');

  const products = {
      honey: [
        { id: 'regular', title: "Regular Raw Honey", basePrice: 150.00, tag: "BESTSELLER", desc: "Sourced from Sunflower, Wildflower, Blue Gum, or Eucalyptus. A pure, liquid amber experience.", image: "/images/13.jpeg", intensity: 3, isVariable: true, variantType: 'honey' },
        { id: 'creamed', title: "Creamed Honey", basePrice: 160.00, tag: "ARTISANAL", desc: "Controlled crystallization creates a luxurious, spreadable texture. Perfect for toast.", image: "/images/7.jpeg", intensity: 2, isVariable: true, variantType: 'honey' },
        { id: 'infused', title: "Infused Trio", basePrice: 180.00, tag: "WELLNESS", desc: "Choose from Lemon, Garlic, or Ginger infusions. A powerful boost for your immune system.", image: "/images/17.jpeg", intensity: 4, isVariable: true, variantType: 'honey' },
      ],
      accessories: [
        { id: 'bamboo-dipper', title: "Engraved Bamboo Dipper", basePrice: 45.00, tag: "ACCESSORY", desc: "Sustainable bamboo honey dipper engraved with the Golden Grace insignia.", image: "/images/WhatsApp Image 2025-12-22 at 21.14.15.jpeg", isVariable: true, variantType: 'size' },
        { id: 'bamboo-ladle', title: "Engraved Bamboo Ladle", basePrice: 55.00, tag: "PREMIUM", desc: "Our signature dark honeycomb ladle. Hand-carved for the perfect pour.", image: "/images/WhatsApp Image 2025-12-22 at 21.14.16.jpeg", isVariable: true, variantType: 'size' },
        { id: 'perspex-dipper', title: "Perspex Dipper", basePrice: 65.00, tag: "MODERN", desc: "Sleek, easy-to-clean perspex dipper for a modern aesthetic.", image: "/images/15.jpeg", isVariable: true, variantType: 'size' },
      ],
      kitchen: [
        { id: 'coaster', title: "Honeycomb Coaster", basePrice: 30.00, tag: "HOME", desc: "Protect your table with our stylish honeycomb-patterned coasters.", image: "/images/14.jpeg", isVariable: false },
        { 
            id: 'board-s', 
            title: "Artisan Chopping Board", 
            basePrice: 250.00, 
            tag: "KITCHEN", 
            desc: "Handcrafted wooden board, perfect for serving cheese and honey.", 
            image: "/images/WhatsApp Image 2025-12-22 at 21.14.19 (1).jpeg", 
            secondaryImage: "/images/WhatsApp Image 2025-12-22 at 21.14.23 (1).jpeg", 
            isVariable: false 
        },
        { id: 'mug', title: "Sublimation Mug", basePrice: 95.00, tag: "MERCH", desc: "Premium mug with black interior and white exterior, branded with our logo.", image: "/images/WhatsApp Image 2025-12-22 at 21.14.20.jpeg", isVariable: false }
      ]
  };

  return (
    <section id="collection" className="py-16 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-amber-500 tracking-[0.5em] text-xs 2xl:text-sm font-bold uppercase">The Golden Collection</span>
          <h2 className="text-4xl md:text-7xl 2xl:text-9xl font-serif text-white mt-4 md:mt-6 mb-8">Taste of South Africa</h2>
          
          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                  { id: 'honey', label: 'The Reserve', icon: Droplet },
                  { id: 'accessories', label: 'Apiary Tools', icon: Smile },
                  { id: 'kitchen', label: 'Home & Living', icon: Utensils }
              ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${activeTab === tab.id ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-white border-white/20 hover:border-amber-500/50'}`}
                  >
                      <tab.icon size={16} />
                      <span className="uppercase tracking-widest text-xs font-bold">{tab.label}</span>
                  </button>
              ))}
          </div>
        </div>

        {/* Improved Mobile Carousel Layout */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 2xl:gap-16 items-stretch no-scrollbar pr-6">
          {products[activeTab].map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 50} onAdd={onAddToCart} onImageClick={onImageClick} />
          ))}
        </div>
        {/* Carousel Hint */}
        <div className="md:hidden flex justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest animate-pulse mt-4">
             <span>Swipe for more</span> <ArrowRight size={12} /> 
        </div>

        <div className="mt-16 text-center bg-[#121212] p-8 rounded-lg border border-amber-500/20 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Need More?</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">We cater for bulk sales. Get cases of 24, 5L buckets, or 20L drums for your business or event.</p>
            <button 
                onClick={onBulkEnquire}
                className="bg-transparent border border-amber-500 text-amber-500 px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-amber-500 hover:text-black transition-colors"
            >
                Enquire for Bulk Pricing
            </button>
        </div>
      </div>
    </section>
  );
};

export default Collection;
