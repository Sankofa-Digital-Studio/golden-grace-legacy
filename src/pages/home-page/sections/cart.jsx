import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  X,
  MoveRight,
  Sparkles,
  Hexagon,
  CreditCard,
  Lock,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../../config/maintenance';
import { buildWhatsAppOrderUrl } from '../../../utils/whatsapp-order';
import { openPaystackCheckout, buildPostCheckoutWhatsAppUrl } from '../../../utils/paystack';

export const Cart = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemove,
  onClearCart,
}) => {
  const [email, setEmail] = useState(() => {
    return (typeof window !== 'undefined' && window.localStorage.getItem('gg_customer_email')) || '';
  });
  const [phone, setPhone] = useState(() => {
    return (typeof window !== 'undefined' && window.localStorage.getItem('gg_customer_phone')) || '';
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [emailError, setEmailError] = useState('');

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

  const FREE_SHIPPING_THRESHOLD = 500;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || cartItems.length === 0 ? 0 : 75; // Free shipping over R500
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const total = subtotal + shipping;

  const whatsappOrderUrl = buildWhatsAppOrderUrl({
    number: WHATSAPP_NUMBER,
    cartItems,
    shipping,
    total,
  });

  const handlePaystackCheckout = () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email for your invoice and waybill tracking.');
      return;
    }
    setEmailError('');

    try {
      window.localStorage.setItem('gg_customer_email', email);
      if (phone) window.localStorage.setItem('gg_customer_phone', phone);
    } catch {
      // Ignore quota errors
    }

    setIsProcessing(true);
    const orderItems = [...cartItems];

    openPaystackCheckout({
      email,
      phone,
      amountInRands: total,
      items: orderItems,
      onSuccess: (paymentResult) => {
        setIsProcessing(false);
        setCompletedOrder({
          reference: paymentResult.reference,
          total,
          items: orderItems,
          email,
          phone,
        });
        onClearCart?.();
      },
      onClose: () => {
        setIsProcessing(false);
      },
    });
  };

  const handleContinueForaging = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <>
      {/* 1. OVERLAY */}
      <div
        className={`fixed inset-0 z-[800] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[460px] bg-[#0a0a0a] border-l border-white/5 z-[900] shadow-2xl transition-transform duration-700 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-amber-500" size={20} />
              <h2 className="text-white font-serif text-2xl">
                {completedOrder ? 'Order Confirmed' : 'Your Harvest Bag'}
              </h2>
            </div>
            <button
              onClick={onClose}
              title="Close harvest bag"
              className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* COMPLETED ORDER VIEW */}
          {completedOrder ? (
            <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6 text-center pt-4">
                <div className="inline-flex p-4 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 block mb-1">
                    Payment Verified via Paystack
                  </span>
                  <h3 className="text-2xl font-serif text-white">Harvest Reserved</h3>
                  <p className="text-xs text-gray-400 mt-2">
                    Reference: <span className="font-mono text-amber-400 font-bold">{completedOrder.reference}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Total Paid</span>
                    <span className="text-white font-bold">R{completedOrder.total}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Receipt Sent To</span>
                    <span className="text-white truncate max-w-[200px]">{completedOrder.email}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Items Count</span>
                    <span className="text-white">
                      {completedOrder.items.reduce((acc, i) => acc + i.quantity, 0)} items
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-gray-300 text-left leading-relaxed">
                  <p className="font-semibold text-amber-400 mb-1">Dispatch Protocol:</p>
                  Cold-filtered in Virginia, Free State. Your jars are packed in insulated thermal cushioning for rapid door delivery.
                </div>
              </div>

              {/* Action Buttons for Completed Order */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                {/* Task 5: WhatsApp Notification Dispatch Hook */}
                <a
                  href={buildPostCheckoutWhatsAppUrl({
                    orderRef: completedOrder.reference,
                    total: completedOrder.total,
                    items: completedOrder.items,
                    email: completedOrder.email,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-lg transition duration-300"
                >
                  <MessageCircle size={16} />
                  <span>Notify Concierge on WhatsApp</span>
                </a>

                <button
                  onClick={handleContinueForaging}
                  className="w-full py-3.5 rounded-2xl text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:bg-white/5 transition"
                >
                  Continue Foraging
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* GOAL GRADIENT: COMPLIMENTARY COURIER PROGRESS METER */}
              {cartItems.length > 0 && (
                <div className="px-8 py-4 bg-amber-500/[0.04] border-b border-amber-500/15 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-green-400 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-amber-400" /> Complimentary Courier Unlocked!
                      </span>
                    ) : (
                      <span className="text-gray-300">
                        Add <span className="text-amber-400 font-bold">R{amountToFreeShipping}</span> for Complimentary Courier
                      </span>
                    )}
                    <span className="text-gray-500 font-mono text-[9px]">{freeShippingPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ease-out rounded-full ${
                        subtotal >= FREE_SHIPPING_THRESHOLD
                          ? 'bg-gradient-to-r from-amber-400 to-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]'
                          : 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500'
                      }`}
                      style={{ width: `${freeShippingPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* ITEM LIST */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
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
                      className="flex gap-4 group animate-in fade-in slide-in-from-right-4 duration-500"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden border border-white/10 shrink-0 flex items-center justify-center">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-serif text-base leading-tight">{item.title}</h4>
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

                        <div className="flex justify-between items-center pt-3">
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)
                              }
                              className="text-gray-400 hover:text-white"
                            >
                              <Minus size={11} />
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
                              <Plus size={11} />
                            </button>
                          </div>
                          <p className="text-white font-serif text-sm">R{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* FOOTER SUMMARY & CHECKOUT OPTIONS */}
              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 bg-[#050505] border-t border-white/5 space-y-5">
                  <div className="space-y-2">
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
                    <div className="flex justify-between text-base text-white font-serif pt-3 border-t border-white/5">
                      <span>Total Harvest</span>
                      <span className="text-amber-500">R{total}</span>
                    </div>
                  </div>

                  {/* Customer Information Inputs for Paystack Invoicing */}
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        Recipient Email (For Paystack Receipt & Courier Waybill)
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60"
                      />
                      {emailError && (
                        <p className="text-[10px] text-rose-400 font-medium">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        WhatsApp Number (Optional for Waybill SMS/Chat)
                      </label>
                      <input
                        type="tel"
                        placeholder="079 430 1648"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60"
                      />
                    </div>
                  </div>

                  {/* Checkout Action Stack */}
                  <div className="space-y-2.5">
                    {/* 1. PAYSTACK INSTANT 1-CLICK CHECKOUT */}
                    <button
                      onClick={handlePaystackCheckout}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 py-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 active:scale-98 shadow-xl shadow-amber-500/10 font-bold"
                    >
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
                        <Lock size={13} />
                        <span>Pay R{total} with Paystack</span>
                      </div>
                      <span className="text-[9px] font-normal tracking-wide text-slate-900/80 mt-0.5">
                        Card • Apple Pay • Instant EFT (Capitec, Nedbank, FNB, Absa)
                      </span>
                    </button>

                    {/* 2. WHATSAPP CONCIERGE (FOR BESPOKE / CORPORATE BUYERS) */}
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Send this itemised order to Golden Grace Honey on WhatsApp"
                      className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/10 text-xs font-semibold uppercase tracking-wider"
                    >
                      <MessageCircle size={15} className="text-[#25D366]" />
                      <span>Order via WhatsApp Concierge</span>
                    </a>
                  </div>

                  {/* Risk Reversal & Transit Reassurance */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black uppercase tracking-widest text-amber-400">Thermal Safe</p>
                      <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Padded Transit</p>
                    </div>
                    <div className="space-y-0.5 border-x border-white/5">
                      <p className="text-[8px] font-black uppercase tracking-widest text-amber-400">100% Raw</p>
                      <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Non-Irradiated</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] font-black uppercase tracking-widest text-amber-400">Tracked</p>
                      <p className="text-[8px] text-gray-500 uppercase tracking-tighter">Direct Courier</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Cart;
