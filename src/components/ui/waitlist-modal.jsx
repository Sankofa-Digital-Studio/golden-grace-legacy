import React, { useState } from 'react';
import { X, Bell, CheckCircle2, Sparkles, Send } from 'lucide-react';

/**
 * WaitlistModal - Task 10 Priority P0
 * Pre-order waitlist for limited/seasonal varietals like Highland Cosmos.
 */
export const WaitlistModal = ({ isOpen, onClose, product }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const varietal = product?.title || 'Highland Cosmos';
  const batch = product?.batch || 'Batch 2026/FS-03';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!contact.trim()) {
      setError('Please provide an email or WhatsApp number.');
      return;
    }

    try {
      const existing = JSON.parse(window.localStorage.getItem('gg_waitlist_leads') || '[]');
      existing.push({
        id: Date.now(),
        name,
        contact,
        varietal,
        batch,
        createdAt: new Date().toISOString(),
      });
      window.localStorage.setItem('gg_waitlist_leads', JSON.stringify(existing));
    } catch {
      // Ignore quota
    }

    setSubmitted(true);
    setError('');
  };

  const handleDone = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-in-up">
        <button
          onClick={onClose}
          aria-label="Close waitlist dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-serif text-white">Waitlist Confirmed</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Thank you, <span className="font-semibold text-white">{name}</span>. You have secured priority allocation for{' '}
              <span className="text-amber-400 font-semibold">{varietal} ({batch})</span>.
            </p>
            <p className="text-[11px] text-gray-500">
              Our beekeeping stewards will send you early-access ordering before public release.
            </p>
            <button
              onClick={handleDone}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-black hover:bg-white transition-colors"
            >
              Return to Reserve
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Bell size={14} />
              <span>Seasonal Bloom Waitlist</span>
            </div>

            <div>
              <h3 id="waitlist-title" className="text-xl font-serif text-white">
                Reserve {varietal}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Highland Cosmos is harvested only during the late summer bloom on the Free State plains. Join the private waitlist to receive allocation the morning frames are pulled.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-gray-300 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400 shrink-0" />
              <span>Next harvest: Estimated 150 limited reserve jars.</span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mpho Mokoena"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                  WhatsApp Number or Email
                </label>
                <input
                  type="text"
                  placeholder="082 123 4567 or you@domain.co.za"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              {error && <p className="text-[11px] text-rose-400">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-98"
            >
              <Send size={14} />
              <span>Join Priority Waitlist</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
