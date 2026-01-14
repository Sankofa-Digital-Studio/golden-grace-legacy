import React from 'react';
import { ShoppingBag, Minus, Plus, Trash2, X } from 'lucide-react';
import OptimizedImage from '../components/ui/optimized-image';

// Optional: BeeCloseButton if you implemented it in Step 5 (otherwise use X)
// import BeeCloseButton from '../components/ui/bee-close-button'; 

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, isSankofa }) => {
  if (!isOpen) return null;

  // Calculate Total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111]">
          <div>
            <h2 className="text-2xl font-serif text-white">Your Reserve</h2>
            <p className="text-xs text-gray-500 mt-1">{cartItems.reduce((acc, item) => acc + item.qty, 0)} items selected</p>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
           {cartItems.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
               <ShoppingBag size={48} className="mb-4" />
               <p>Your reserve is currently empty.</p>
               <button onClick={onClose} className="mt-6 text-amber-400 text-sm tracking-widest border-b border-amber-400 pb-1">
                 Start Foraging
               </button>
             </div>
           ) : (
             cartItems.map(item => (
               <div key={item.id} className={`flex gap-4 p-4 rounded-xl border transition-all ${isSankofa ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/5'}`}>
                 
                 {/* Product Image */}
                 <div className="w-20 h-20 bg-[#0a0a0a] rounded-lg border border-white/5 flex-shrink-0 overflow-hidden">
                    <OptimizedImage 
                    src={item.image} alt={item.title} className="w-full h-full object-cover" />
                 </div>

                 {/* Details */}
                 <div className="flex-1 flex flex-col justify-between">
                   <div>
                       <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium text-sm md:text-base leading-tight">{item.title}</h4>
                            <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                                <Trash2 size={14} />
                            </button>
                       </div>
                       {/* Size & Container Display */}
                       <p className="text-xs text-gray-400 mt-1">
                           {item.size || 'Standard'} • {item.container || 'Jar'}
                       </p>
                   </div>

                   <div className="flex items-center justify-between mt-3">
                     <span className="text-amber-500 font-bold text-sm">R {(item.price * item.qty).toFixed(2)}</span>
                     
                     {/* Quantity Controls */}
                     <div className="flex items-center gap-3 bg-black/30 rounded-full px-2 py-1 border border-white/5">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-amber-500 transition-colors"><Minus size={14} /></button>
                        <span className="text-sm font-bold w-4 text-center text-white">{item.qty}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-amber-500 transition-colors"><Plus size={14} /></button>
                     </div>
                   </div>
                 </div>
               </div>
             ))
           )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#111]">
                <div className="flex justify-between text-white mb-6 text-xl font-serif">
                    <span>Total</span>
                    <span className="text-amber-500">R {total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    Secure Checkout
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Cart;