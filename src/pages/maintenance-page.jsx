import React from "react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "../../config/maintenance";

const buildWaLink = () => {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const MaintenanceGate = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">
          Golden Grace Honey
        </p>

        <h1 className="text-3xl md:text-5xl font-serif leading-tight">
          The Hive is{" "}
          <span className="italic text-amber-400 font-light">Relocating</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          We’re refining the experience behind the scenes. The site is live, but the
          storefront is temporarily routed through WhatsApp so orders and questions
          still get handled immediately.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={buildWaLink()}
            className="bg-amber-500 text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all active:scale-95"
          >
            Order / Ask on WhatsApp
          </a>

          <a
            href="mailto:hello@goldengrace.co.za"
            className="bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white hover:border-amber-500/40 transition-all active:scale-95"
          >
            Email Us
          </a>
        </div>

        <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] pt-6">
          Thank you for your patience. 🐝
        </p>
      </div>
    </div>
  );
};

export default MaintenanceGate;
