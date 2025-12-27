import React, { useState } from 'react';
import { Hexagon, MapPin, Phone, Mail, Leaf } from 'lucide-react';
const FacebookIcon = ({ size = 24, className, ...props }) => (
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
        className={className} 
        {...props}
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const InstagramIcon = ({ size = 24, className, ...props }) => (
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
        className={className} 
        {...props}
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const TwitterIcon = ({ size = 24, className, ...props }) => (
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
        className={className} 
        {...props}
    >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5 4 1.2 8.3-.3 9.3-1.5 1.5.5 3.8 1.6 3.8 1.6s-1.5-2.5-2-3.5c1.5 1 4 2.5 4 2.5z" />
    </svg>
);

const Footer = ({ onSubscribe, onNav, onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      onSubscribe(email);
      setEmail('');
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <footer className="bg-[#020202] text-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Hexagon className="text-amber-400 fill-amber-400/20" size={28} />
              <span className="text-xl md:text-2xl font-serif">GOLDEN GRACE</span>
            </div>
            <div className="text-gray-500 font-light text-sm 2xl:text-base space-y-4">
              <a
                href="https://maps.google.com/?q=170+Constantia+Road,+Dagbreek,+Welkom,+9459,+South+Africa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors"
              >
                <MapPin size={16} className="mt-1 flex-shrink-0 text-amber-500" />
                <span>
                  170 Constantia Road, Dagbreek
                  <br />
                  Welkom, 9459
                  <br />
                  South Africa
                </span>
              </a>
              <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 mt-4 grayscale hover:grayscale-0 transition-all">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.657257989394!2d26.7333!3d-27.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDU5JzAwLjAiUyAyNsKwNDQnMDAuMCJF!5e0!3m2!1sen!2sza!4v1630000000000!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Golden Grace Location"
                ></iframe>
              </div>
              <a
                href="tel:+27662022100"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-amber-500" />
                <span>+27 66 202 2100</span>
              </a>
              <a
                href="mailto:goldengracehoney@gmail.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-amber-500" />
                <span>goldengracehoney@gmail.com</span>
              </a>
            </div>
            <div className="flex gap-4 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
              >
                <TwitterIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm 2xl:text-base">
              <li>
                <button
                  onClick={() => onNav('collection')}
                  className="hover:text-white transition-colors text-left w-full"
                >
                  The Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('gifts')}
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Gift Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('education')}
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Bee Smart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNav('recipes')}
                  className="hover:text-white transition-colors text-left w-full"
                >
                  Recipes
                </button>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">
              Stay Connected
            </h4>
            <p className="text-gray-500 text-sm mb-4">Join the hive for harvest updates.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex border-b border-white/20 pb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm"
                />
                <button
                  type="submit"
                  className="text-amber-400 uppercase text-xs font-bold tracking-widest hover:text-white transition-colors"
                >
                  Join
                </button>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </form>
            <div className="mt-8 pt-4 border-t border-white/10">
                <button 
                    onClick={() => onOpenModal('sustainability')} 
                    className="flex items-center gap-2 text-xs text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest"
                >
                    <Leaf size={14} /> Sustainability Tracker
                </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-xs text-gray-600 border-t border-white/5 pt-8 gap-4">
          <p className="text-center md:text-left">
            &copy; 2025 Golden Grace Honey (Pty) Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => onOpenModal('privacy')}
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenModal('terms')}
              className="hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
