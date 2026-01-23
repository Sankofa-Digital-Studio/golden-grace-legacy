import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Mail,
  ArrowRight,

  Sparkles
} from 'lucide-react';
import LESOTHO_SELLERS from '../../data/constants';

// Custom Brand Icons (SVG)
const FacebookIcon = ({ size = 18 }) => (
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
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = ({ size = 18 }) => (
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
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const TwitterIcon = ({ size = 18 }) => (
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
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4 1.2 8.3-.3 9.3-1.5 1.5.5 3.8 1.6 3.8 1.6s-1.5-2.5-2-3.5c1.5 1 4 2.5 4 2.5z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
const [language, setLanguage] = useState('en');
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-24">
        {/* 1. THE KINGDOM NEXUS: Regional Connectivity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Globe size={18} className="text-amber-500" />
              </div>
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Kingdom Connections
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Sourced in the Veld, <br />
              <span className="italic text-amber-400 font-light">Shared with the Kingdom.</span>
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
              Our reach extends beyond the Free State. Through our Kingdom Connections, Golden Grace
              is proudly represented by authorized stewards in Lesotho, bridging the gap between
              high-altitude purity and lowland grace.
            </p>

            {/* Lesotho Partners List */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['Maseru Central', 'Leribe Plateau', 'Teyateyaneng'].map((place) => (
                <div
                  key={place}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                >
                  <MapPin size={12} className="text-amber-500" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                    {place}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Visual Map of the Region */}
          <div className="relative aspect-video bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden flex items-center justify-center group hover:border-amber-500/20 transition-all">
            <div className="absolute inset-0 opacity-20 bg-[url('/images/ui/map-pattern.svg')] bg-center bg-no-repeat grayscale group-hover:grayscale-0 transition-all" />
            <div className="relative text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                <MapPin className="text-amber-500 animate-bounce" size={24} />
              </div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.5em]">
                The Free State — Lesotho Corridor
              </p>
            </div>
          </div>
        </div>

        {/* 2. HARVEST DISPATCHES & SOCIAL HIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-white/5">
          {/* Subscription: Framed as Alerts, not Spam */}
          <div className="space-y-6">
            <h4 className="text-white font-serif text-xl">Harvest Dispatches</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Nature dictates our timeline. Join the list to receive immediate alerts when a new
              seasonal harvest is pulled from the hive.
            </p>
            <form className="relative max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                title="Enter your email for harvest alerts"
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all"
              />
              <button
                type="submit"
                title="Subscribe to harvest alerts"
                className="absolute right-2 top-2 bottom-2 bg-amber-500 text-black px-6 rounded-full flex items-center justify-center hover:bg-white transition-all active:scale-95"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Contact & Socials */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
                Digital Hive
              </h4>
              <div className="flex flex-col gap-3">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer">
                  <InstagramIcon size={14} />
                </div>
                {/** Change Icon to X */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer">
                  <TwitterIcon size={14} />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer">
                  <FacebookIcon size={14} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest">
                Connect
              </h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@goldengrace.co.za"
                  title="Email us"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs"
                >
                  <Mail size={14} /> hello@goldengrace.co.za
                </a>
                <p className="text-gray-600 text-[10px] uppercase font-bold tracking-tighter">
                  Virginia, Free State, ZA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LEGAL SOVEREIGNTY & CREDITS */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-gray-600 text-[9px] uppercase font-black tracking-[0.4em]">
              &copy; {currentYear} Golden Grace Honey. All Rights Reserved.
            </p>
            <p className="text-amber-500/40 text-[9px] uppercase font-black tracking-[0.4em] flex items-center gap-2">
              <Sparkles size={10} /> Provided by He who created the Veld.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <button
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'st' : 'en'))}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              <Globe size={12} />
              <span>{language === 'en' ? 'English' : 'Sesotho'}</span>
            </button>
          </div>
          {/* Legal Links (No Nav links, just Legal) */}
          <div className="flex gap-8">
            <a
              href="#"
              title="Privacy Policy"
              className="text-gray-600 hover:text-white transition-colors text-[9px] uppercase font-black tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              title="Terms and Conditions"
              className="text-gray-600 hover:text-white transition-colors text-[9px] uppercase font-black tracking-widest"
            >
              Terms
            </a>
            <a
              href="#"
              title="Shipping & Returns"
              className="text-gray-600 hover:text-white transition-colors text-[9px] uppercase font-black tracking-widest"
            >
              Shipping
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-600 text-[9px] uppercase font-black tracking-[0.5em]">
              Designed and Created with soul by{' '}
              <span className="text-white hover:text-amber-500 transition-colors cursor-pointer">
                Sankofa Digital Group
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
