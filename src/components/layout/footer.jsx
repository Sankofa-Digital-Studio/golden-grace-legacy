import React, { useState } from 'react';
import { Zap, Globe, Hexagon, MapPin, Phone, Mail, Leaf } from 'lucide-react';
import  LESOTHO_SELLERS  from '../../data/lesotho-sellers';

// Custom Brand Icons (SVG) - Kept from your original code for continuity
const FacebookIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>);
const InstagramIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>);
const TwitterIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4 1.2 8.3-.3 9.3-1.5 1.5.5 3.8 1.6 3.8 1.6s-1.5-2.5-2-3.5c1.5 1 4 2.5 4 2.5z" /></svg>);

const Footer = ({ onSubscribe, onNav, onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en'); // 'en' or 'st' (Sesotho)

  const handleSubmit = (e) => { e.preventDefault(); if (email) onSubscribe(email); };

  return (
    <footer className="bg-[#020202] text-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2"><Hexagon className="text-amber-400 fill-amber-400/20" size={28} /><span className="text-xl md:text-2xl font-serif">GOLDEN GRACE</span></div>
            <div className="text-gray-500 font-light text-sm 2xl:text-base space-y-4">
                <div className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-amber-500" /><span>170 Constantia Road, Dagbreek<br />Welkom, 9459<br />South Africa</span></div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-amber-500" /><span>+27 66 202 2100</span></div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-amber-500" /><span>goldengracehoney@gmail.com</span></div>
            </div>
            <div className="flex gap-4 pt-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><InstagramIcon /></div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><TwitterIcon /></div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all cursor-pointer"><FacebookIcon /></div>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="w-full">
                <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Explore</h4>
                <ul className="space-y-4 text-gray-400 font-light text-sm 2xl:text-base">
                    <li><button onClick={() => onNav('collection')} className="hover:text-white">The Collection</button></li>
                    <li><button onClick={() => onNav('gifts')} className="hover:text-white">Gift Sets</button></li>
                    <li><button onClick={() => onNav('education')} className="hover:text-white">Bee Smart</button></li>
                    <li><button onClick={() => onNav('recipes')} className="hover:text-white">Recipes</button></li>
                </ul>
          </div>

          {/* Column 3: Kingdom Connections (NEW) */}
          <div className="w-full">
             <h4 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-6">
               <Globe size={14} className="text-amber-500"/> Kingdom Connections (Lesotho)
             </h4>
             <ul className="space-y-3 text-gray-400 text-sm">
               {LESOTHO_SELLERS.map((seller, i) => (
                 <li key={i} className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-white">{seller.name}</span>
                   <span className="text-gray-500 text-xs italic">{seller.location}</span>
                 </li>
               ))}
             </ul>
             
             {/* Language Toggle (NEW) */}
             <div className="mt-8 pt-4 border-t border-white/10">
                <button 
                    onClick={() => setLanguage(prev => prev === 'en' ? 'st' : 'en')}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-widest border border-white/10 px-4 py-2 rounded-lg w-full justify-center"
                >
                    <Globe size={14} />
                    Change Language: <span className="text-amber-500">{language === 'en' ? 'English' : 'Sesotho'}</span>
                </button>
             </div>
          </div>

          {/* Column 4: Newsletter & Dev Credit */}
          <div className="w-full">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Stay Connected</h4>
            <p className="text-gray-500 text-sm mb-4">Join the hive for harvest updates.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex border-b border-white/20 pb-2">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm" />
                    <button type="submit" className="text-amber-400 uppercase text-xs font-bold tracking-widest hover:text-white">Join</button>
                </div>
            </form>
             
             {/* Sustainability & Dev Credit (UPDATED) */}
             <div className="mt-8 space-y-4">
                <button onClick={() => onOpenModal('sustainability')} className="flex items-center gap-2 text-xs text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest w-full">
                    <Leaf size={14} /> Sustainability Tracker
                </button>
                
                <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-600 text-[10px] mb-1">Created with soul by</p>
                    <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs border border-amber-500/20 px-3 py-1 rounded-full bg-amber-500/5">
                        <Zap size={10} /> Sankofa Digital
                    </div>
                </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-xs text-gray-600 border-t border-white/5 pt-8 gap-4">
            <p className="text-center md:text-left">&copy; 2025 Golden Grace Honey (Pty) Ltd. All Rights Reserved.</p>
            <div className="flex gap-6"><button onClick={() => onOpenModal('privacy')} className="hover:text-gray-400">Privacy Policy</button><button onClick={() => onOpenModal('terms')} className="hover:text-gray-400">Terms of Service</button></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;