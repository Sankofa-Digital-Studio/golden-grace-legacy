import React, { useState } from 'react';
import { Zap, Globe, Hexagon, MapPin, Phone, Mail, Leaf } from 'lucide-react';
import  LESOTHO_SELLERS  from '../../data/constants';

// Custom Brand Icons (SVG)
const FacebookIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>);
const InstagramIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>);
const TwitterIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4 1.2 8.3-.3 9.3-1.5 1.5.5 3.8 1.6 3.8 1.6s-1.5-2.5-2-3.5c1.5 1 4 2.5 4 2.5z" /></svg>);

const Footer = ({ onSubscribe, onNav, onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubmit = (e) => { e.preventDefault(); if (email) onSubscribe(email); };

  return (
    <footer className="bg-[#020202] text-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          
          {/* Column 1: Brand Info & Sankofa Soul */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
                <Hexagon className="text-amber-400 fill-amber-400/20" size={28} />
                <span className="text-xl md:text-2xl font-serif">GOLDEN GRACE</span>
            </div>
            
            <div className="text-gray-500 font-light text-sm 2xl:text-base space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-2"><MapPin size={14} className="text-amber-500 shrink-0" /><span>Welkom, Free State, ZA</span></div>
                <div className="flex items-center justify-center md:justify-start gap-2"><Phone size={14} className="text-amber-500 shrink-0" /><span>+27 66 202 2100</span></div>
                <div className="flex items-center justify-center md:justify-start gap-2"><Mail size={14} className="text-amber-500 shrink-0" /><span>goldengracehoney@gmail.com</span></div>
            </div>

            <div className="flex justify-center md:justify-start gap-4 pt-2">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><InstagramIcon size={14} /></div>
                {/** Change Icon to X */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><TwitterIcon size={14} /></div> 
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><FacebookIcon size={14} /></div>
            </div>
          </div>

          {/* Column 2: Explore Links (HIDDEN ON MOBILE - Reduced Clutter) - Consider Removing in totallity */}
          <div className="hidden md:block w-full">
                <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Explore</h4>
                <ul className="space-y-4 text-gray-400 font-light text-sm 2xl:text-base">
                    <li><button onClick={() => onNav('collection')} className="hover:text-white transition-colors">The Collection</button></li>
                    <li><button onClick={() => onNav('gifts')} className="hover:text-white transition-colors">Gift Sets</button></li>
                    <li><button onClick={() => onNav('education')} className="hover:text-white transition-colors">Bee Smart</button></li>
                    <li><button onClick={() => onNav('recipes')} className="hover:text-white transition-colors">Recipes</button></li>
                </ul>
          </div>

          {/* Column 3: Kingdom Connections (Visible on Mobile) */}
          <div className="w-full text-center md:text-left border-t border-white/5 pt-8 md:border-none md:pt-0">
             <h4 className="text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2 mb-6">
               <Globe size={14} className="text-amber-500"/> Kingdom Connections (Lesotho)
             </h4>
             <ul className="space-y-3 text-gray-400 text-sm">
               {LESOTHO_SELLERS.map((seller, i) => (
                 <li key={i} className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-none md:pb-0">
                   <span className="text-white">{seller.name}</span>
                   <span className="text-gray-500 text-xs italic">{seller.location}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 4: Newsletter (Visible on Mobile) */}
          <div className="w-full text-center md:text-left border-t border-white/5 pt-8 md:border-none md:pt-0">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Stay Connected</h4>
            <p className="text-gray-500 text-sm mb-4">Join the hive for harvest updates.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto md:mx-0">
                <div className="flex border-b border-white/20 pb-2">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm text-center md:text-left" />
                    <button type="submit" className="text-amber-400 uppercase text-xs font-bold tracking-widest hover:text-white">Join</button>
                </div>
            </form>
             
             {/* Sustainability Tracker */}
             <div className="mt-8">
                <button onClick={() => onOpenModal('sustainability')} className="inline-flex items-center gap-2 text-xs text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest border border-green-500/20 px-4 py-2 rounded-full hover:bg-green-500/10">
                    <Leaf size={14} /> Sustainability Tracker
                </button>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar: Copyright + Language + Legal */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-[10px] md:text-xs text-gray-600 border-t border-white/5 pt-8 gap-6">
            
             <p className="text-center md:text-left"> Created with soul by Sankofa Digital.</p>
             <p className="text-center md:text-left">&copy; 2026 Golden Grace Honey (Pty) Ltd.</p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Language Toggle - Moved to Bottom Bar for Space Efficiency */}
                <button 
                    onClick={() => setLanguage(prev => prev === 'en' ? 'st' : 'en')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                >
                    <Globe size={12} />
                    <span>{language === 'en' ? 'English' : 'Sesotho'}</span>
                </button>

                <div className="flex gap-4">
                    <button onClick={() => onOpenModal('privacy')} className="hover:text-gray-400 transition-colors">Privacy</button>
                    <button onClick={() => onOpenModal('terms')} className="hover:text-gray-400 transition-colors">Terms</button>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;