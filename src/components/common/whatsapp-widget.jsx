import React, { useState } from 'react';
import { MessageCircle, X, Package, Gift, Building2, MessageSquare, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../config/maintenance';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    {
      id: 'track',
      label: 'Track My Order',
      icon: <Package size={14} className="text-amber-400" />,
      text: 'Hi Golden Grace! I would like to check the dispatch and tracking status of my order.',
    },
    {
      id: 'gifting',
      label: 'Corporate Gifting Suites',
      icon: <Gift size={14} className="text-amber-400" />,
      text: 'Hi Golden Grace! I am inquiring about bespoke corporate gifting hampers and customized dippers.',
    },
    {
      id: 'bulk',
      label: 'Bulk & Wholesale Honey',
      icon: <Building2 size={14} className="text-amber-400" />,
      text: 'Hi Golden Grace! I am inquiring about bulk supply or wholesale stockist opportunities.',
    },
    {
      id: 'concierge',
      label: 'Chat with Concierge',
      icon: <MessageSquare size={14} className="text-[#25D366]" />,
      text: 'Grace to you! I have a question about your raw Free State honey harvest.',
    },
  ];

  const getWhatsAppUrl = (text) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* 1. SHORTCUT POPUP CARD */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Concierge Shortcuts"
          className="mb-3 w-80 sm:w-88 rounded-3xl bg-[#0a0a0a]/95 border border-amber-500/30 shadow-2xl shadow-black/90 backdrop-blur-xl p-5 text-white animate-fade-in-up"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageCircle size={18} fill="currentColor" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
                  <span>Golden Grace Concierge</span>
                  <Sparkles size={11} className="text-amber-400" />
                </h4>
                <p className="text-[10px] text-gray-400">Virginia, Free State • Active Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close concierge menu"
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Dialogue Intro */}
          <div className="my-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 leading-relaxed">
            Grace in every drop. How may our stewards assist your harvest inquiry today?
          </div>

          {/* Quick-Action Shortcut Pills */}
          <div className="space-y-1.5">
            {shortcuts.map((sc) => (
              <a
                key={sc.id}
                href={getWhatsAppUrl(sc.text)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  {sc.icon}
                  <span className="text-gray-200 group-hover:text-amber-300 transition-colors font-medium text-[11px]">
                    {sc.label}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 group-hover:text-amber-400 font-mono">
                  ➔
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Open WhatsApp Concierge Shortcuts"
        className="bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" fill="white" />
        )}
        {!isOpen && (
          <span className="hidden md:block absolute right-full mr-3.5 bg-slate-900 border border-slate-800 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            WhatsApp Concierge
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
