import React from 'react';
import { ShoppingBag, Minus, Plus, Trash2, X, MoveRight, Sparkles, Hexagon } from 'lucide-react';
import OptimizedImage from '../../../components/ui/optimized-image';
import BeeCloseButton from '../../../components/ui/bee-close-button';
import { useScrollLock } from '../../../hooks/useScrollLock';

export const Cart = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemove,
  onNavigate,
}) => {
  useScrollLock(isOpen);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 75; // Free shipping over R500
  const total = subtotal + shipping;

  return (
    <>
      {/* 1. OVERLAY */}

      <div
        className={`fixed inset-0 z-[800] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <BeeCloseButton onClose={onClose} />
      </div>

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
           <BeeCloseButton onClose={onClose} />
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
                <button
                  onClick={() => onNavigate('checkout')}
                  title="Proceed to guest checkout"
                  className="w-full bg-amber-500 hover:bg-white text-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 group shadow-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                    Experience the Drip
                  </span>
                  <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
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
