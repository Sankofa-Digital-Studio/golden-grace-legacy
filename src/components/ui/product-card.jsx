import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

const ProductCard = ({ product, delay, onAdd, onImageClick }) => {
  const { title, basePrice, tag, image, secondaryImage, desc, isVariable, variantType = 'honey' } = product;
  
  // Default states depend on the variant type
  const [size, setSize] = useState(variantType === 'honey' ? '500g' : '8cm');
  const [material, setMaterial] = useState('Plastic');

  const getPrice = () => {
      let price = basePrice;
      if (isVariable) {
        // Logic for Honey
        if (variantType === 'honey') {
            if (size === '750g') price += 50; 
            if (material === 'Glass') price += 20; 
        } 
        // Logic for Accessories (Dippers/Ladles)
        else if (variantType === 'size') {
            if (size === '10cm') price += 15;  // Price increase for Medium
            if (size === '15cm') price += 30;  // Price increase for Large
        }
      }
      return price;
  };

  const handleAdd = (e) => {
      e.stopPropagation();
      const variantLabel = variantType === 'honey' ? `${size}, ${material}` : size;
      
      const finalProduct = {
          ...product,
          id: isVariable ? `${product.id}-${size.replace(/\s/g, '')}` : product.id,
          title: isVariable ? `${title} (${variantLabel})` : title,
          price: getPrice()
      };
      onAdd(finalProduct);
  };
  
  return (
    <div 
      className={`group relative w-full bg-[#121212] border border-white/5 md:hover:border-amber-500/30 transition-all duration-500 overflow-hidden flex flex-col rounded-lg snap-center flex-shrink-0 min-w-[280px] md:min-w-0`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/20 transition-all duration-700"></div>

      <div 
        className="relative h-48 md:h-56 lg:h-64 2xl:h-80 w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onImageClick(image, title)}
      >
        {/* Primary Image */}
        <img 
            src={image} 
            alt={title} 
            className={`h-32 md:h-40 lg:h-48 2xl:h-64 w-auto object-contain golden-filter transition-all duration-700 ${secondaryImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
            loading="lazy"
        />
        
        {/* Secondary Image (Hover State) */}
        {secondaryImage && (
            <img 
                src={secondaryImage} 
                alt={`${title} view 2`} 
                className="absolute inset-0 m-auto h-32 md:h-40 lg:h-48 2xl:h-64 w-auto object-contain golden-filter opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                loading="lazy"
            />
        )}

        <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-bold tracking-widest border border-amber-500/30 text-amber-400 rounded-full bg-black/60 backdrop-blur-md">
            {tag}
            </span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Maximize2 size={16} className="text-white/70" />
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl 2xl:text-2xl font-serif text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-xs md:text-xs 2xl:text-sm mb-4 line-clamp-2 min-h-[2.5em]">{desc}</p>
        
        {isVariable && (
            <div className="mb-6">
                {variantType === 'honey' ? (
                    <div className="grid grid-cols-2 gap-2">
                        {/* FIX: Added bg-[#1a1a1a] text-white to force dark theme */}
                        <select 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)}
                            className="bg-[#1a1a1a] text-white text-[10px] md:text-xs p-2 rounded border border-white/10 outline-none focus:border-amber-500 w-full appearance-none cursor-pointer hover:border-amber-500/50 transition-colors"
                        >
                            <option value="500g">500g</option>
                            <option value="750g">750g</option>
                        </select>
                        <select 
                            value={material} 
                            onChange={(e) => setMaterial(e.target.value)}
                            className="bg-[#1a1a1a] text-white text-[10px] md:text-xs p-2 rounded border border-white/10 outline-none focus:border-amber-500 w-full appearance-none cursor-pointer hover:border-amber-500/50 transition-colors"
                        >
                            <option value="Plastic">Plastic</option>
                            <option value="Glass">Glass (+R20)</option>
                        </select>
                    </div>
                ) : (
                    <select 
                        value={size} 
                        onChange={(e) => setSize(e.target.value)}
                        className="bg-[#1a1a1a] text-white text-[10px] md:text-xs p-2 rounded border border-white/10 outline-none focus:border-amber-500 w-full appearance-none cursor-pointer hover:border-amber-500/50 transition-colors"
                    >
                        <option value="8cm">Small (8cm)</option>
                        <option value="10cm">Medium (10cm) +R15</option>
                        <option value="15cm">Large (15cm) +R30</option>
                    </select>
                )}
            </div>
        )}

        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-amber-400 text-base md:text-lg 2xl:text-xl font-light">R {getPrice().toFixed(2)}</p>
            </div>
            
            <button 
                onClick={handleAdd}
                className={`w-full relative overflow-hidden bg-white text-black uppercase tracking-widest text-[10px] md:text-xs font-bold py-3 transition-colors flex items-center justify-center gap-2 group/btn hover:bg-amber-500`}
            >
                <span className="relative z-10">Add to Cart</span>
                <div 
                    className={`absolute inset-0 bg-amber-500 transition-transform duration-[1500ms] ease-out origin-top ${false ? 'scale-y-100' : 'scale-y-0'}`}
                ></div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;