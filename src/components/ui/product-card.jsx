import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '../../data/constants';
const ProductCard = ({ product, isSankofa, onAddToCart, isFavorite, onToggleFavorite }) => {
  const [activeImage, setActiveImage] = useState(0);

  // Safety check to prevent the 'map of undefined' error
  if (!product || !product.images) {
    return (
      <div className="p-4 border border-dashed border-white/10 text-gray-500 text-xs rounded-xl">
        Product data missing...
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-xl overflow-hidden transition-all duration-500 flex flex-col h-full
      ${
        isSankofa
          ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 hover:shadow-2xl'
          : 'bg-white/5 border border-white/10'
      }
    `}
    >
      {/* Image Gallery */}
      <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
        {product.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${product.name} perspective ${idx + 1}`}
            title={`${product.name} - View ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
               ${activeImage === idx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
            `}
            loading="lazy"
          />
        ))}

        {/* Gallery Controls (Dots) */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === idx ? 'bg-amber-500 w-4' : 'bg-white/50'}`}
                title={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-red-500/20 transition-colors z-20 group/heart"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            className={`transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover/heart:text-red-400'}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-serif text-white mb-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4">
          {product.container} • {product.size}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-amber-500">M{product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
               ${isSankofa ? 'bg-white/10 hover:bg-amber-500 hover:text-black active:scale-90' : 'bg-amber-500 text-black hover:bg-white'}
            `}
            title={`Add ${product.name} to your reserve`}
          >
            Add to Reserve
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
