import React, { useEffect } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, X, MoveRight, Sparkles, Hexagon } from 'lucide-react';
import OptimizedImage from '../../../components/ui/optimized-image';
import { WHATSAPP_NUMBER } from '../../../config/maintenance';
import { buildWhatsAppOrderUrl } from '../../../utils/whatsapp-order';

// Optional: BeeCloseButton if you implemented it in Step 5 (otherwise use X)
// import BeeCloseButton from '../components/ui/bee-close-button';

// const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, isSankofa }) => {
//   if (!isOpen) return null;

//   // Calculate Total
//   const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

//   return (
//     <div className="fixed inset-0 z-[150] flex justify-end">

//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <div className={`relative w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

//         {/* Header */}
//         <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111]">
//           <div>
//             <h2 className="text-2xl font-serif text-white">Your Reserve</h2>
//             <p className="text-xs text-gray-500 mt-1">{cartItems.reduce((acc, item) => acc + item.qty, 0)} items selected</p>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Items List */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
//            {cartItems.length === 0 ? (
//              <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
//                <ShoppingBag size={48} className="mb-4" />
//                <p>Your reserve is currently empty.</p>
//                <button onClick={onClose} className="mt-6 text-amber-400 text-sm tracking-widest border-b border-amber-400 pb-1">
//                  Start Foraging
//                </button>
//              </div>
//            ) : (
//              cartItems.map(item => (
//                <div key={item.id} className={`flex gap-4 p-4 rounded-xl border transition-all ${isSankofa ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/5'}`}>

//                  {/* Product Image */}
//                  <div className="w-20 h-20 bg-[#0a0a0a] rounded-lg border border-white/5 flex-shrink-0 overflow-hidden">
//                     <OptimizedImage
//                     src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                  </div>

//                  {/* Details */}
//                  <div className="flex-1 flex flex-col justify-between">
//                    <div>
//                        <div className="flex justify-between items-start">
//                             <h4 className="text-white font-medium text-sm md:text-base leading-tight">{item.title}</h4>
//                             <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
//                                 <Trash2 size={14} />
//                             </button>
//                        </div>
//                        {/* Size & Container Display */}
//                        <p className="text-xs text-gray-400 mt-1">
//                            {item.size || 'Standard'} • {item.container || 'Jar'}
//                        </p>
//                    </div>

//                    <div className="flex items-center justify-between mt-3">
//                      <span className="text-amber-500 font-bold text-sm">R {(item.price * item.qty).toFixed(2)}</span>

//                      {/* Quantity Controls */}
//                      <div className="flex items-center gap-3 bg-black/30 rounded-full px-2 py-1 border border-white/5">
//                         <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-amber-500 transition-colors"><Minus size={14} /></button>
//                         <span className="text-sm font-bold w-4 text-center text-white">{item.qty}</span>
//                         <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-amber-500 transition-colors"><Plus size={14} /></button>
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              ))
//            )}
//         </div>

//         {/* Footer Actions */}
//         {cartItems.length > 0 && (
//             <div className="p-6 border-t border-white/10 bg-[#111]">
//                 <div className="flex justify-between text-white mb-6 text-xl font-serif">
//                     <span>Total</span>
//                     <span className="text-amber-500">R {total.toFixed(2)}</span>
//                 </div>
//                 <button className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition-colors text-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]">
//                     Secure Checkout
//                 </button>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

export const Cart = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemove }) => {
  // Lock background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 75; // Free shipping over R500
  const total = subtotal + shipping;
  const whatsappOrderUrl = buildWhatsAppOrderUrl({
    number: WHATSAPP_NUMBER,
    cartItems,
    shipping,
    total,
  });

  return (
    <>
      {/* 1. OVERLAY */}
      <div
        className={`fixed inset-0 z-[800] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* 2. DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/5 z-[900] shadow-2xl transition-transform duration-700 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-amber-500" size={20} />
              <h2 className="text-white font-serif text-2xl">Your Harvest Bag</h2>
            </div>
            <button
              onClick={onClose}
              title="Close harvest bag"
              className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full" />
                  <Hexagon size={64} className="text-white/5 relative z-10" />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-serif text-xl italic">"The Hive is quiet."</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest leading-relaxed">
                    You haven't selected any harvests yet. <br />
                    Return to the reserve to experience the grace.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] pt-4 border-b border-amber-500/20 pb-1"
                >
                  Explore The Reserve
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-6 group animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-serif text-lg leading-tight">{item.title}</h4>
                      <button
                        onClick={() => onRemove(item.id, item.selectedSize)}
                        title={`Remove ${item.title} from bag`}
                        className="text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">
                      {item.selectedSize} • {item.vessel}
                    </p>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-white font-serif">R{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER SUMMARY */}
          {cartItems.length > 0 && (
            <div className="p-8 bg-[#050505] border-t border-white/5 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">R{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>Shipping (National)</span>
                  <span className={shipping === 0 ? 'text-green-500' : 'text-white'}>
                    {shipping === 0 ? 'Complimentary' : `R${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg text-white font-serif pt-4 border-t border-white/5">
                  <span>Total Harvest</span>
                  <span className="text-amber-500">R{total}</span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Send this itemised order to Golden Grace Honey on WhatsApp"
                  className="w-full bg-amber-500 hover:bg-white text-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 group shadow-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                    Order on WhatsApp
                  </span>
                  <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </a>
                <p className="text-[8px] text-gray-600 text-center uppercase font-black tracking-[0.3em] flex items-center justify-center gap-2">
                  <Sparkles size={8} className="text-amber-500/40" />A harvest provided by Him.
                  Bottled for you.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Cart;
