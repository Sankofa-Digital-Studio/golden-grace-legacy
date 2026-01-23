import React from "react";
import { Hexagon, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "../config/maintenance";
import FilmGrain from "../components/ui/film-grain";

const waLink = () => {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) return null;
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const MaintenanceGate = () => {
  const link = waLink();

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Brand texture layer (honeycomb, subtle) */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.35] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Soft edge fades (prevents hard cuts) */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl text-center space-y-10">
          {/* Brand header */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
              <Hexagon
                className="w-14 h-14 text-amber-500 fill-amber-500/10 relative z-10"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/20 animate-pulse" />
            </div>

            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">
              Golden Grace Honey
            </p>
          </div>

          {/* Main card */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/[0.02] rounded-[2.5rem] blur-xl" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl p-8 md:p-12 space-y-8">
              {/* Top badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Temporary Route
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif leading-tight">
                The Hive is{" "}
                <span className="italic text-amber-400 font-light">
                  Relocating
                </span>
              </h1>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                We’re refining the experience behind the scenes. The site remains
                live, but for now orders and questions are handled directly via
                WhatsApp — fast, personal, and human.
              </p>

              {/* CTA cluster */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {link ? (
                  <a
                    href={link}
                    className="group inline-flex items-center justify-center gap-3 bg-amber-500 text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all active:scale-95 shadow-xl shadow-amber-500/10"
                    title="Chat with Golden Grace Honey on WhatsApp"
                  >
                    <MessageCircle size={18} />
                    Order / Ask on WhatsApp
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                ) : (
                  <button
                    className="inline-flex items-center justify-center gap-3 bg-amber-500/20 text-amber-200 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] cursor-not-allowed"
                    title="WhatsApp number not set yet"
                    disabled
                  >
                    WhatsApp link not set
                  </button>
                )}

                <a
                  href="mailto:goldengracehoney@gmail.com"
                  className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white hover:border-amber-500/30 transition-all active:scale-95"
                  title="Email Golden Grace Honey"
                >
                  Email Us
                  <ArrowRight size={16} className="opacity-60" />
                </a>
              </div>

              {/* Micro footer */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em]">
                  Thank you for your patience. 🐝
                </p>

                {/* Subtle activity indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-3 text-amber-500/60">
                    <div className="w-10 h-10 border-2 border-amber-500/15 border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black">
                      Refining the craft…
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal / signature line (matches your tone) */}
          <p className="text-amber-500/30 text-[9px] uppercase font-black tracking-[0.5em]">
            Provided by He who created the Veld.
          </p>
        </div>
      </div>
      <FilmGrain />
    </div>
  );
};

export default MaintenanceGate;
