import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { PRODUCTS } from '../../data/catalog';

/**
 * StickyMobileCartBar - P0 Conversion Multiplier
 * Floats a sleek gold pill on mobile when browsing the collection to reduce purchase friction.
 */
export const StickyMobileCartBar = ({ onAddToCart, isCartOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Default featured product (Aloe Ferox Reserve or Discovery Duo)
  const featuredProduct = PRODUCTS.find((p) => p.id === 'premium-hex-aloe') || PRODUCTS[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Check if mobile viewport
      if (window.innerWidth >= 768 || isDismissed) {
        setIsVisible(false);
        return;
      }

      const collectionElem = document.getElementById('collection');
      if (!collectionElem) {
        setIsVisible(false);
        return;
      }

      const rect = collectionElem.getBoundingClientRect();
      // Show when collection is in view (top is above viewport bottom, bottom is below viewport top)
      const inView = rect.top < window.innerHeight && rect.bottom > 100;
      setIsVisible(inView && !isCartOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isDismissed, isCartOpen]);

  if (!isVisible || !featuredProduct) return null;

  return (
    <aside
      aria-label="Quick harvest order"
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden animate-fade-in-up"
    >
      <div className="flex items-center justify-between p-2 pl-4 pr-2 rounded-full bg-slate-950/95 border border-amber-500/40 shadow-2xl shadow-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0 pr-2">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <img
              src={featuredProduct.img}
              alt={featuredProduct.title}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-serif font-semibold text-white truncate">
              {featuredProduct.title}
            </h4>
            <p className="text-[10px] text-amber-400 font-bold">
              R{featuredProduct.price}{' '}
              <span className="text-[9px] text-slate-400 font-normal">({featuredProduct.sizes[0]})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onAddToCart?.(featuredProduct, featuredProduct.sizes[0])}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            <ShoppingBag size={13} />
            <span>Add</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss quick bar"
            className="p-1.5 text-slate-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default StickyMobileCartBar;
