import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Mail,
  ArrowRight,
  Sparkles,
  Check,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { LESOTHO_SELLERS } from '../../data/constants';
import { VIEWS } from '../../views';

// Modern SVG Icons with proper accessible semantics
const XIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const Footer = ({ onNav, onSubscribe }) => {
  const currentYear = new Date().getFullYear();
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    if (onSubscribe) onSubscribe(email);
  };

  const navigateTo = (viewName, scrollToId) => {
    if (onNav) {
      onNav(viewName, { scrollTo: scrollToId });
    } else if (scrollToId) {
      const el = document.getElementById(scrollToId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] pt-24 pb-14 px-6 border-t border-white/5 relative overflow-hidden text-gray-400">
      {/* Bioluminescent Honeycomb Ambient Glow seam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* ============================================================== */}
        {/* 1. THE KINGDOM NEXUS: Regional Terroir & Cross-Border Outposts */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Globe size={13} className="text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold">
                Kingdom Connections • Free State ➔ Lesotho
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight">
              Sourced in the Free State Veld, <br />
              <span className="italic text-amber-400 font-light">
                Shared with the Mountain Kingdom.
              </span>
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
              Golden Grace originates in the uncultivated floral veld of Virginia DFS194. Through our
              cross-border Kingdom stewardship, our pure raw reserves are safeguarded and
              represented by authorized stewards across the Kingdom of Lesotho — uniting highveld
              mineral terroir with mountain hospitality.
            </p>

            {/* Lesotho Outposts List */}
            <div className="pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-3">
                Authorized Regional Outposts:
              </p>
              <div className="flex flex-wrap gap-3">
                {(LESOTHO_SELLERS || [
                  { name: 'Maseru Central', location: 'Kingsway Rd' },
                  { name: 'Leribe Hub', location: 'Hlotse Market' },
                  { name: 'Mafeteng Depo', location: 'Main Rank' },
                ]).map((seller) => (
                  <div
                    key={seller.name}
                    className="group flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 rounded-full transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 animate-pulse" />
                    <MapPin size={12} className="text-amber-500" />
                    <span className="text-white text-[11px] font-medium tracking-wide">
                      {seller.name}
                    </span>
                    <span className="text-gray-500 text-[10px] font-mono">
                      ({seller.location})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upgraded Terroir Corridor Telemetry Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-6 sm:p-8 bg-[#0a0a0a] border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl group">
              {/* Subtle Map Topo background */}
              <div className="absolute inset-0 opacity-15 bg-[url('/images/ui/map-pattern.svg')] bg-cover bg-center pointer-events-none group-hover:opacity-25 transition-opacity duration-700" />
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                      Apiary Registry DFS194
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    Unbroken Cold Chain
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-amber-400 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                        Free State Goldfields Apiary
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Wild Aloe Ferox & Highveld Flora • 1,320m Altitude
                      </p>
                    </div>
                  </div>

                  <div className="ml-3 h-5 border-l border-dashed border-amber-500/30" />

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-emerald-400 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                        Kingdom of Lesotho Outposts
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-snug">
                        Maseru • Leribe • Mafeteng • Up to 1,800m Altitude
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase text-gray-500">
                  <span>Harvest Purity: 100% Raw</span>
                  <span className="text-amber-400 font-semibold">Moisture: &lt;17.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. DUAL-BRAND ARCHITECTURE: Honey Shop vs Legacy Heritage      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-14 border-t border-white/5">
          {/* Column A: Golden Grace Honey (The Shop) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h4 className="text-white font-serif text-lg tracking-wide">Golden Grace Honey</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Direct-from-comb unheated raw honey jars, flasks, and artisanal gifting.
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'collection')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  All Seasonal Harvests
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'collection')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Hexagonal Glass Jars (375g / 500g)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'collection')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  The Daily Squeeze Flask (500g)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'collection')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  The Legacy Gift Set & Spoon
                </button>
              </li>
              <li>
                <span className="text-[10px] font-mono text-amber-500/80 uppercase tracking-widest block pt-1">
                  Complimentary Courier on R850+
                </span>
              </li>
            </ul>
          </div>

          {/* Column B: Golden Grace Legacy (Heritage & Standards) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400/50" />
              <h4 className="text-white font-serif text-lg tracking-wide">Golden Grace Legacy</h4>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              The ethical standard, apicultural heritage, and women-led Free State collective.
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.STORY)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Our Free State Heritage & Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'authenticity')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Authenticity & Lab Verification
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('home', 'sensory')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Botanical Terroir Compass
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.EDUCATION)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Raw Honey Education Hub
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.GIFTS)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Bespoke & Corporate Gifting Suites
                </button>
              </li>
              <li>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block pt-1">
                  Women-Led Apiculture
                </span>
              </li>
            </ul>
          </div>

          {/* Column C: Harvest Dispatches Subscription */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg tracking-wide">Harvest Dispatches</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Nature dictates our pull. Receive quiet alerts the day seasonal reserves are harvested
              from the hive.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
                <Check size={14} className="shrink-0 text-emerald-400" />
                <span>You are on the private harvest dispatch register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <label htmlFor="footer-dispatch-email" className="sr-only">
                  Email address for harvest dispatches
                </label>
                <input
                  id="footer-dispatch-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="steward@domain.co.za"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-4 pr-12 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Submit email for seasonal harvest alerts"
                  className="absolute right-1.5 top-1.5 bottom-1.5 w-8 h-8 bg-amber-500 hover:bg-amber-400 text-black rounded-full flex items-center justify-center transition-transform active:scale-90"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <p className="text-[10px] font-mono text-gray-600">
              No promotions. Seasonal apiary alerts only.
            </p>
          </div>

          {/* Column D: Direct Concierge & Digital Hive */}
          <div className="space-y-4">
            <h4 className="text-white font-serif text-lg tracking-wide">Private Concierge</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Inquire regarding bulk honey orders, bespoke gifting, or regional consignment.
            </p>

            <a
              href="https://wa.me/27794301648?text=Hello%20Golden%20Grace%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20reserve%20harvest."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs transition-colors"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Concierge</span>
            </a>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                  Orders & Consignments:
                </span>
                <a
                  href="mailto:info@goldengracelegacy.co.za"
                  className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors"
                  title="Email info@goldengracelegacy.co.za"
                >
                  <Mail size={12} className="text-amber-500 shrink-0" />
                  <span className="break-all font-mono text-[11px]">info@goldengracelegacy.co.za</span>
                </a>
              </div>

              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                  Founder & Stewardship:
                </span>
                <a
                  href="mailto:grace@goldengracelegacy.co.za"
                  className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors"
                  title="Email grace@goldengracelegacy.co.za"
                >
                  <Mail size={12} className="text-amber-500 shrink-0" />
                  <span className="break-all font-mono text-[11px]">grace@goldengracelegacy.co.za</span>
                </a>
              </div>

              <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-amber-500/80">
                <Globe size={11} className="text-amber-500 shrink-0" />
                <span>goldenlegacy.co.za</span>
              </div>
              <p className="text-[10px] font-mono text-gray-600 uppercase">
                Virginia, Free State, South Africa
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                Digital Hive:
              </p>
              <div className="flex gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Golden Grace Instagram"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all text-gray-400"
                >
                  <InstagramIcon size={13} />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Golden Grace X profile"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all text-gray-400"
                >
                  <XIcon size={12} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Golden Grace Facebook"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all text-gray-400"
                >
                  <FacebookIcon size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. LEGAL SOVEREIGNTY, LOCALIZATION & CREDITS                  */}
        {/* ============================================================== */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span>&copy; {currentYear} Golden Grace Legacy & Honey • goldenlegacy.co.za</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-amber-500/60 flex items-center gap-1.5">
              <Sparkles size={11} className="text-amber-500" />
              Provided by He who created the Veld.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-wider">
            {/* Language switch */}
            <button
              type="button"
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'st' : 'en'))}
              className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors"
              aria-label="Toggle language between English and Sesotho"
            >
              <Globe size={11} className="text-amber-500" />
              <span>{language === 'en' ? 'English (EN)' : 'Sesotho (ST)'}</span>
            </button>

            <span className="text-gray-700">|</span>

            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Terms of Supply
            </span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">
              Raw Honey Notice
            </span>
          </div>

          <div className="text-center md:text-right text-[9px] uppercase tracking-widest text-gray-600">
            Crafted with soul by{' '}
            <span className="text-gray-400 font-semibold hover:text-amber-400 transition-colors">
              Sankofa Digital Studio
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;