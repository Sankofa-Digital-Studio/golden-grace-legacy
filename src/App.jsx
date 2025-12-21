import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Star, Droplet, Hexagon, CheckCircle, ShieldCheck, Award, Heart, Gift, GraduationCap, MapPin, Phone, Mail, Instagram, Twitter, Facebook, MessageCircle, Minus, Plus, Trash2, ExternalLink, ChevronDown, Play, Users, Sun, Maximize2, ArrowLeft, ThermometerSun, Info, BookOpen, Smile, Coffee, Utensils, Quote, Search, Beaker } from 'lucide-react';

/* GOLDEN GRACE HONEY - PHASE 23: REFINED CONTENT & TABS
   Updated: 2025-12-21
   Features: Collection Tabs, Authenticity Facts, Bulk Logic Update, Education Restructure
*/

// --- Utility Components ---

const Toast = ({ message, type = 'success', onClose, onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
        onClick={onNavigate}
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm md:left-auto md:right-6 md:translate-x-0 md:bottom-6 z-[100] animate-fade-in-up cursor-pointer transition-transform active:scale-95`}
    >
      <div className="bg-[#1a1a1a]/95 border border-amber-500/30 text-white px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-2xl flex items-center gap-3 md:gap-4 backdrop-blur-md">
        <div className="bg-amber-500/10 p-2 rounded-full flex-shrink-0">
            {type === 'cart' ? <ShoppingBag className="text-amber-400 w-4 h-4 md:w-5 md:h-5" /> : <CheckCircle className="text-amber-400 w-4 h-4 md:w-5 md:h-5" />}
        </div>
        <div>
          <h4 className="text-xs md:text-sm font-serif font-bold text-amber-400 uppercase tracking-wider">{type === 'cart' ? 'Reserve Updated' : 'Success'}</h4>
          <p className="text-[10px] md:text-xs text-gray-300">{message}</p>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="text-gray-500 hover:text-white ml-auto"
        >
            <X size={16} />
        </button>
      </div>
    </div>
  );
};

const WhatsAppWidget = () => (
    <a 
        href="https://wa.me/27662022100" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
    >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" fill="white" />
        <span className="hidden md:block absolute right-full mr-4 bg-white text-black px-3 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Chat with us</span>
    </a>
);

const Modal = ({ title, content, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg md:max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl p-6 md:p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
                {title && <h2 className="text-xl md:text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">{title}</h2>}
                <div className="text-gray-300 space-y-4 text-sm leading-relaxed font-light">
                    {content}
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-amber-500 text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const ImageModal = ({ image, alt, onClose }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[90vh] w-auto h-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors">
                    <X size={32} />
                </button>
                <img src={image} alt={alt} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10" />
            </div>
        </div>
    );
};

// --- Core Components ---

const Navbar = ({ isScrolled, toggleCart, cartCount, activePage, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
      { id: 'home', label: 'Home' },
      { id: 'collection', label: 'Collection' },
      { id: 'gifts', label: 'Gifts' },
      { id: 'education', label: 'Bee Smart' },
      { id: 'recipes', label: 'Recipes' },
      { id: 'reviews', label: 'Reviews' }
  ];

  const handleNav = (id) => {
      navigate(id);
      setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isOpen || activePage !== 'home' ? 'bg-[#050505]/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/5' : 'bg-transparent py-4 md:py-6 lg:py-8'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 md:gap-3 cursor-pointer group z-50 relative"
          >
            <Hexagon className={`transition-colors duration-500 ${isOpen ? 'text-white' : 'text-amber-400'} fill-amber-400/20 w-8 h-8 md:w-10 md:h-10`} />
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl lg:text-2xl tracking-widest leading-none text-white shadow-black drop-shadow-md">GOLDEN</span>
              <span className="text-amber-500 font-sans text-[0.6rem] md:text-xs lg:text-sm tracking-[0.35em] font-bold shadow-black drop-shadow-md">GRACE</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12 2xl:gap-16">
            {navLinks.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNav(item.id)}
                className={`text-xs xl:text-sm 2xl:text-base tracking-[0.15em] uppercase transition-colors relative group font-medium ${activePage === item.id ? 'text-amber-400' : 'text-white/80 hover:text-amber-400'}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-amber-400 transition-all duration-300 ${activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6 z-50 relative">
            <button onClick={toggleCart} className="text-white hover:text-amber-400 transition-colors relative group drop-shadow-md">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-amber-500 text-black text-[9px] md:text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="lg:hidden text-white active:scale-90 transition-transform" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white z-50">
            <X size={32} />
        </button>
        <div className="flex flex-col items-center gap-6 z-10">
          {navLinks.map((item, i) => (
            <button 
              key={item.id} 
              onClick={() => handleNav(item.id)}
              className={`text-2xl md:text-3xl font-serif text-white hover:text-amber-400 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${100 + (i * 50)}ms` }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// --- Sub-Components ---

const Hero = ({ navigate }) => {
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToStory = () => {
    document.getElementById('our-origins')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[100dvh] w-full overflow-hidden flex items-center justify-center pt-20 md:pt-0">
      <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
            // Use 'hero-bg.jpg' for local fallback or testing
            poster="/images/hero-bg.jpg"
        >
            <source src="https://videos.pexels.com/video-files/7234973/7234973-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30"></div>
      </div>
      
      <div className="relative z-20 text-center px-4 md:px-6 max-w-screen-xl 2xl:max-w-screen-2xl w-full">
        <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8 animate-fade-in-up">
            <CheckCircle className="text-amber-400 w-3 h-3 md:w-4 md:h-4 2xl:w-5 2xl:h-5" />
            <span className="text-amber-400 text-[10px] md:text-xs 2xl:text-sm tracking-widest uppercase font-bold">100% Raw & Authentic</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-8xl 2xl:text-9xl text-white mb-6 md:mb-8 leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
          Grace In <span className="italic text-amber-400 font-light">Every</span> <br />
          Drop
        </h1>
        
        <p className="text-gray-100 max-w-md md:max-w-2xl 2xl:max-w-4xl mx-auto mb-8 md:mb-12 font-light text-base md:text-lg 2xl:text-2xl leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg text-shadow-sm">
          Pure South African Goodness. Ethically sourced from the vibrant landscapes of the Free State. Non-pasteurized, and harvested with integrity.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in-up delay-300 w-full md:w-auto mb-16">
          <button 
            onClick={() => navigate('collection')} // UPDATED: Navigates to collection page/view
            className="w-full md:w-auto bg-amber-500 text-black px-10 py-4 font-bold tracking-widest hover:bg-white transition-all duration-300 active:scale-95 text-sm md:text-base 2xl:text-lg shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
          >
            SHOP THE COLLECTION
          </button>
          <button 
            onClick={scrollToStory} // Keep as scroll if on same page, but better to check
            className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors tracking-widest text-xs md:text-sm 2xl:text-lg uppercase group py-2 drop-shadow-md"
          >
            Our Story 
            <span className="bg-white/10 p-2 rounded-full group-hover:bg-amber-400 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl 2xl:max-w-6xl mx-auto animate-fade-in-up delay-500 px-4 md:px-0">
            <div className="bg-black/30 backdrop-blur-md border border-white/10 p-4 2xl:p-6 rounded-lg flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="bg-amber-500/20 p-3 rounded-full group-hover:bg-amber-500 transition-colors">
                    <Users className="text-amber-400 group-hover:text-black w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
                </div>
                <div className="text-left">
                    <h4 className="text-white font-serif text-lg 2xl:text-2xl">Women-Led Impact</h4>
                    <p className="text-gray-400 text-xs 2xl:text-base">Empowering local communities through every jar sold.</p>
                </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-white/10 p-4 2xl:p-6 rounded-lg flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="bg-amber-500/20 p-3 rounded-full group-hover:bg-amber-500 transition-colors">
                    <Sun className="text-amber-400 group-hover:text-black w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
                </div>
                <div className="text-left">
                    <h4 className="text-white font-serif text-lg 2xl:text-2xl">Nature's Pharmacy</h4>
                    <p className="text-gray-400 text-xs 2xl:text-base">Rich in antioxidants, enzymes, and natural healing.</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <ChevronDown className="text-white/50 w-8 h-8 2xl:w-12 2xl:h-12" />
      </div>
    </section>
  );
};

const TrustBar = () => {
    return (
        <div className="bg-[#0a0a0a] border-y border-white/5 py-6 md:py-8 2xl:py-12 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-amber-500/5 blur-3xl"></div>
             
             <div className="max-w-[1920px] mx-auto px-6 relative z-10">
                <div className="flex md:justify-center overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-8 md:gap-16 2xl:gap-32 pb-4 md:pb-0 no-scrollbar pr-6">
                    
                    <div className="flex items-center gap-3 snap-center flex-shrink-0">
                        <ShieldCheck className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                        <div className="text-left">
                            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">Dept. Agriculture</p>
                            <p className="text-gray-500 text-[10px] 2xl:text-xs">Reg: DFS194</p>
                        </div>
                    </div>
                    
                    <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                    
                    <div className="flex items-center gap-3 snap-center flex-shrink-0">
                        <Award className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                        <div className="text-left">
                            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">B-BBEE Compliant</p>
                            <p className="text-gray-500 text-[10px] 2xl:text-xs">Women-Led Enterprise</p>
                        </div>
                    </div>
                    
                    <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                    
                    <div className="flex items-center gap-3 snap-center flex-shrink-0">
                        <Heart className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
                        <div className="text-left">
                            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">Ethically Sourced</p>
                            <p className="text-gray-500 text-[10px] 2xl:text-xs">Guardian Beekeeping</p>
                        </div>
                    </div>
                </div>
                 <div className="md:hidden text-center mt-2 flex justify-center items-center gap-2 text-[10px] text-white/30 animate-pulse">
                    <span>Swipe</span> <ArrowRight size={10} />
                </div>
            </div>
        </div>
    )
}

const ContentBreak = () => (
    <div className="bg-[#121212] py-16 2xl:py-24 border-t border-b border-white/5">
        <div className="max-w-4xl 2xl:max-w-6xl mx-auto px-6 text-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
                <h3 className="text-amber-500 tracking-widest text-xs 2xl:text-sm font-bold uppercase mb-4">Did You Know?</h3>
                <p className="text-xl md:text-3xl 2xl:text-5xl font-serif text-white leading-relaxed mb-6">
                    "Real honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
                </p>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-8"></div>
            </div>

            {/* AUTHENTICITY / FACT CARD */}
            <div className="bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors">
                 <div className="flex items-start gap-4 mb-4">
                    <div className="bg-amber-500/20 p-3 rounded-full">
                        <Search className="text-amber-400 w-6 h-6 2xl:w-8 2xl:h-8" />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg 2xl:text-2xl mb-1">Authenticity Check</h4>
                        <p className="text-xs 2xl:text-sm text-gray-400">3 Ways to Spot Real Honey</p>
                    </div>
                 </div>
                 <ul className="text-gray-300 text-sm 2xl:text-lg leading-relaxed mb-4 space-y-3">
                    <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">1.</span>
                        <span>The Thumb Test: Put a drop on your thumb. If it spreads, it's not pure. Real honey stays intact.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">2.</span>
                        <span>The Water Test: Pure honey settles at the bottom of a glass of water; fake honey dissolves immediately.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">3.</span>
                        <span>The Heat Test: Pure honey caramelizes when heated; fake honey creates bubbles and doesn't caramelize.</span>
                    </li>
                 </ul>
                 <div className="bg-black/40 p-4 rounded-lg">
                    <p className="text-amber-500 text-xs 2xl:text-sm font-bold uppercase mb-1 flex items-center gap-2">
                        <BookOpen size={14} /> Dictionary
                    </p>
                    <p className="text-gray-400 text-xs 2xl:text-base">
                        <strong className="text-white">Raw:</strong> Unpasteurized, unheated, and unprocessed. Retains all natural enzymes and pollen.
                    </p>
                 </div>
            </div>
        </div>
    </div>
);

// --- PHASE 1: NEW SENSORY SECTION ---
const SensorySection = () => {
    return (
        <section id="sensory" className="py-16 md:py-20 2xl:py-32 bg-[#080808] relative">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-amber-500 tracking-[0.3em] text-xs 2xl:text-sm font-bold uppercase">The Experience</span>
                    <h2 className="text-3xl md:text-5xl 2xl:text-7xl font-serif text-white mt-4">A Symphony of Texture</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-16">
                    {/* Card 1: Liquid */}
                    <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1555422896-c67e81043812?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Liquid Honey Texture"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Liquid Gold</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Smooth, viscous, and clarifying. Sourced from Wildflower, Blue Gum, and Eucalyptus. Flows like silk.
                            </p>
                        </div>
                    </div>
                    {/* Card 2: Creamed */}
                    <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1612475498348-c777248680d4?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Creamed Honey Texture"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Velvet Cream</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Naturally crystallized Sunflower honey whipped into a buttery, spreadable delight.
                            </p>
                        </div>
                    </div>
                     {/* Card 3: Infused */}
                     <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1557685888-2d3621ddf615?q=80&w=2070&auto=format&fit=crop" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Infused Honey"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Botanical Infusions</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Expertly blended with Ginger, Garlic, or Lemon for a potent wellness boost.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ product, delay, onAdd, onImageClick }) => {
  const { title, basePrice, tag, image, desc, isVariable } = product;
  const [size, setSize] = useState('500g');
  const [material, setMaterial] = useState('Plastic');
  const [isPouring, setIsPouring] = useState(false);

  const getPrice = () => {
      let price = basePrice;
      if (isVariable) {
        if (size === '750g') price += 50; 
        if (material === 'Glass') price += 20; 
      }
      return price;
  };

  const handleAdd = (e) => {
      e.stopPropagation();
      setIsPouring(true);
      const finalProduct = {
          ...product,
          id: isVariable ? `${product.id}-${size}-${material}` : product.id,
          title: isVariable ? `${title} (${size}, ${material})` : title,
          price: getPrice()
      };
      onAdd(finalProduct);
      setTimeout(() => setIsPouring(false), 2000); 
  };
  
  return (
    <div 
      className={`group relative w-full bg-[#121212] border border-white/5 md:hover:border-amber-500/30 transition-all duration-500 overflow-hidden flex flex-col rounded-lg snap-center flex-shrink-0 min-w-[280px] md:min-w-0`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/5 blur-[80px] group-hover:bg-amber-500/20 transition-all duration-700"></div>

      <div 
        className="relative h-48 md:h-56 lg:h-64 2xl:h-80 w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => onImageClick(image, title)}
      >
        <img 
            src={image} 
            alt={title} 
            className="h-32 md:h-40 lg:h-48 2xl:h-64 w-auto object-contain golden-filter transition-transform duration-700 group-hover:scale-110" 
            loading="lazy"
        />
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-bold tracking-widest border border-amber-500/30 text-amber-400 rounded-full bg-black/60 backdrop-blur-md">
            {tag}
            </span>
        </div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Maximize2 size={16} className="text-white/70" />
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl 2xl:text-2xl font-serif text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-xs md:text-xs 2xl:text-sm mb-4 line-clamp-2 min-h-[2.5em]">{desc}</p>
        
        {isVariable && (
            <div className="grid grid-cols-2 gap-2 mb-6">
                <select 
                    value={size} 
                    onChange={(e) => setSize(e.target.value)}
                    className="bg-white/5 text-gray-300 text-[10px] md:text-xs p-2 rounded border border-white/10 outline-none focus:border-amber-500"
                >
                    <option value="500g">500g</option>
                    <option value="750g">750g</option>
                </select>
                <select 
                    value={material} 
                    onChange={(e) => setMaterial(e.target.value)}
                    className="bg-white/5 text-gray-300 text-[10px] md:text-xs p-2 rounded border border-white/10 outline-none focus:border-amber-500"
                >
                    <option value="Plastic">Plastic</option>
                    <option value="Glass">Glass (+R20)</option>
                </select>
            </div>
        )}

        <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-amber-400 text-base md:text-lg 2xl:text-xl font-light">R {getPrice().toFixed(2)}</p>
            </div>
            
            <button 
                onClick={handleAdd}
                className={`w-full relative overflow-hidden bg-white text-black uppercase tracking-widest text-[10px] md:text-xs font-bold py-3 transition-colors flex items-center justify-center gap-2 group/btn hover:bg-amber-500`}
            >
                <span className="relative z-10">Add to Cart</span>
                <div 
                    className={`absolute inset-0 bg-amber-500 transition-transform duration-[1500ms] ease-out origin-top ${isPouring ? 'scale-y-100' : 'scale-y-0'}`}
                ></div>
            </button>
        </div>
      </div>
    </div>
  );
};

// --- NEW COLLECTION LOGIC: TABS ---
const Collection = ({ onAddToCart, onImageClick, onBulkEnquire }) => {
  const [activeTab, setActiveTab] = useState('honey');

  const products = {
      honey: [
        { id: 'regular', title: "Regular Raw Honey", basePrice: 150.00, tag: "BESTSELLER", desc: "Sourced from Sunflower, Wildflower, Blue Gum, or Eucalyptus. A pure, liquid amber experience.", image: "/images/prod-regular.jpg", intensity: 3, isVariable: true },
        { id: 'creamed', title: "Creamed Honey", basePrice: 160.00, tag: "ARTISANAL", desc: "Controlled crystallization creates a luxurious, spreadable texture. Perfect for toast.", image: "/images/prod-creamed.jpg", intensity: 2, isVariable: true },
        { id: 'infused', title: "Infused Trio", basePrice: 180.00, tag: "WELLNESS", desc: "Choose from Lemon, Garlic, or Ginger infusions. A powerful boost for your immune system.", image: "/images/prod-infused.jpg", intensity: 4, isVariable: true },
      ],
      accessories: [
        { id: 'bamboo-dipper', title: "Engraved Bamboo Dipper", basePrice: 45.00, tag: "ACCESSORY", desc: "Sustainable bamboo honey dipper engraved with the Golden Grace insignia.", image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=1972&auto=format&fit=crop", isVariable: false },
        { id: 'perspex-dipper', title: "Perspex Dipper", basePrice: 65.00, tag: "MODERN", desc: "Sleek, easy-to-clean perspex dipper for a modern aesthetic.", image: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1974&auto=format&fit=crop", isVariable: false },
      ],
      kitchen: [
        { id: 'coaster', title: "Honeycomb Coaster", basePrice: 30.00, tag: "HOME", desc: "Protect your table with our stylish honeycomb-patterned coasters.", image: "https://images.unsplash.com/photo-1616486029423-aaa478965c97?q=80&w=2070&auto=format&fit=crop", isVariable: false },
        { id: 'board-s', title: "Artisan Chopping Board", basePrice: 250.00, tag: "KITCHEN", desc: "Handcrafted wooden board, perfect for serving cheese and honey.", image: "https://images.unsplash.com/photo-1624823183488-294318723c31?q=80&w=1974&auto=format&fit=crop", isVariable: false },
        { id: 'mug', title: "Sublimation Mug", basePrice: 95.00, tag: "MERCH", desc: "Premium mug with black interior and white exterior, branded with our logo.", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop", isVariable: false }
      ]
  };

  return (
    <section id="collection" className="py-16 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-amber-500 tracking-[0.5em] text-xs 2xl:text-sm font-bold uppercase">The Golden Collection</span>
          <h2 className="text-4xl md:text-7xl 2xl:text-9xl font-serif text-white mt-4 md:mt-6 mb-8">Taste of South Africa</h2>
          
          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                  { id: 'honey', label: 'The Reserve', icon: Droplet },
                  { id: 'accessories', label: 'Apiary Tools', icon: Smile },
                  { id: 'kitchen', label: 'Home & Living', icon: Utensils }
              ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${activeTab === tab.id ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-white border-white/20 hover:border-amber-500/50'}`}
                  >
                      <tab.icon size={16} />
                      <span className="uppercase tracking-widest text-xs font-bold">{tab.label}</span>
                  </button>
              ))}
          </div>
        </div>

        {/* Improved Mobile Carousel Layout */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:pb-0 2xl:gap-16 items-stretch no-scrollbar pr-6">
          {products[activeTab].map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 50} onAdd={onAddToCart} onImageClick={onImageClick} />
          ))}
        </div>
        {/* Carousel Hint */}
        <div className="md:hidden flex justify-center gap-2 text-white/30 text-[10px] uppercase tracking-widest animate-pulse mt-4">
             <span>Swipe for more</span> <ArrowRight size={12} /> 
        </div>

        <div className="mt-16 text-center bg-[#121212] p-8 rounded-lg border border-amber-500/20 max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Need More?</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">We cater for bulk sales. Get cases of 24, 5L buckets, or 20L drums for your business or event.</p>
            <button 
                onClick={onBulkEnquire}
                className="bg-transparent border border-amber-500 text-amber-500 px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-amber-500 hover:text-black transition-colors"
            >
                Enquire for Bulk Pricing
            </button>
        </div>
      </div>
    </section>
  );
};

const FeaturedGifts = ({ navigate }) => (
    <section className="py-16 bg-[#121212] border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <div>
                    <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Gifting</span>
                    <h3 className="text-2xl md:text-4xl font-serif text-white mt-2">Share the Sweetness</h3>
                </div>
                <button onClick={() => navigate('gifts')} className="hidden md:flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm uppercase tracking-widest">
                    View Gift Sets <ArrowRight size={16} />
                </button>
            </div>
            
            {/* FEATURED CARDS WITH MINI JAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 <div 
                    onClick={() => navigate('gifts')}
                    className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer"
                >
                    <img src="https://images.unsplash.com/photo-1549488352-843258fb82fd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gifts" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                        <div>
                             <h4 className="text-xl font-serif text-white mb-2">Corporate & Events</h4>
                             <p className="text-gray-300 text-sm">Bespoke hampers for weddings and business.</p>
                        </div>
                    </div>
                </div>

                <div 
                    onClick={() => navigate('gifts')}
                    className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group cursor-pointer border border-amber-500/20"
                >
                    {/* Using 'gift-mini.jpg' (or Page 28 from PDF) */}
                    <img src="/images/gift-mini.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter" alt="Mini Gift Jar" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
                        <div>
                            <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block">NEW ARRIVAL</span>
                            <h4 className="text-xl font-serif text-white mb-2">The Mini Gift Jar</h4>
                            <p className="text-gray-300 text-sm">A precious token of sweetness. Includes mini dipper & bee charm.</p>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={() => navigate('gifts')} className="md:hidden mt-6 flex items-center gap-2 text-white hover:text-amber-400 transition-colors text-sm uppercase tracking-widest">
                View Gift Sets <ArrowRight size={16} />
            </button>
        </div>
    </section>
);

const FeaturedEducation = ({ navigate }) => (
    <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
             <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Academy</span>
             <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-6">Become a Guardian</h3>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">Join our beekeeping workshops and learn how to sustain the hive for future generations.</p>
             
             {/* Crystallization Section moved here */}
             <div className="mt-8 bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors max-w-4xl mx-auto mb-8">
                 <div className="flex items-start gap-4 mb-4">
                    <div className="bg-amber-500/20 p-3 rounded-full">
                        <ThermometerSun className="text-amber-400 w-6 h-6 2xl:w-8 2xl:h-8" />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg 2xl:text-2xl mb-1">Crystallization is Natural</h4>
                        <p className="text-xs 2xl:text-sm text-gray-400">It's a sign of purity, not spoilage.</p>
                    </div>
                 </div>
                 <p className="text-gray-300 text-sm 2xl:text-lg leading-relaxed mb-4">
                    Raw honey naturally solidifies over time, especially in winter. This preserves the flavor and quality of the nectar.
                 </p>
                 <div className="bg-black/40 p-4 rounded-lg">
                    <p className="text-amber-500 text-xs 2xl:text-sm font-bold uppercase mb-1 flex items-center gap-2">
                        <Info size={14} /> Quick Fix
                    </p>
                    <p className="text-gray-400 text-xs 2xl:text-base">
                        Simply place your jar in a bowl of warm water (not boiling) to return it to liquid gold.
                    </p>
                 </div>
            </div>

             <button 
                onClick={() => navigate('education')}
                className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
            >
                Learn More
            </button>
        </div>
    </section>
);

const StorySection = () => {
    return (
      <section id="our-origins" className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 2xl:gap-32 items-center">
            
            <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <h4 className="text-amber-500 tracking-[0.3em] uppercase text-xs 2xl:text-sm font-bold">Est. 2022 • Virginia, Free State</h4>
                <h2 className="text-3xl md:text-4xl lg:text-6xl 2xl:text-8xl font-serif text-white leading-tight">
                  Rooted in Community, <br />
                  Driven by <span className="text-amber-400">Grace</span>.
                </h2>
              </div>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light">
                "It started with five hives and a prayer." Golden Grace is more than a brand; it is a testimony of resilience. Sourced from the untamed wildflowers of the Free State, our honey captures the soul of the South African landscape.
              </p>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light">
                We don't just bottle sweetness; we nurture an ecosystem. As a proudly black, female-led enterprise, every drop represents empowerment, ethical beekeeping, and a covenant with nature.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {[
                  { icon: Droplet, title: "Pure Harvest", desc: "No sugar feeding. No pasteurization. Just raw nectar." },
                  { icon: Users, title: "Community First", desc: "Creating sustainable livelihoods in Welkom and beyond." }
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4 group p-4 border border-white/5 rounded-lg hover:border-amber-500/20 transition-colors">
                    <div className="p-2 bg-amber-900/10 rounded-full h-fit group-hover:bg-amber-500/20 transition-colors">
                      <feat.icon className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-serif text-base md:text-lg 2xl:text-xl mb-1">{feat.title}</h5>
                      <p className="text-gray-500 text-xs 2xl:text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="relative aspect-square md:aspect-auto md:h-[500px] lg:h-[600px] 2xl:h-[800px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#121212] rounded-[2rem] md:rounded-t-[10rem] md:rounded-b-lg overflow-hidden border border-white/5">
                {/* Using 'story-jar.jpg' (or Page 21 from PDF) */}
                <img 
                  src="/images/story-jar.jpg" 
                  alt="Grace in Every Drop" 
                  className="w-full h-full object-cover golden-filter"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-4 md:p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <p className="text-[10px] md:text-xs text-amber-400 tracking-widest uppercase mb-1">Location</p>
                      <p className="font-serif text-lg md:text-2xl">Welkom, SA</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] md:text-xs text-amber-400 tracking-widest uppercase mb-1">Identity</p>
                      <p className="font-serif text-lg md:text-2xl">Women-Led</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
};

const Founder = () => {
    return (
        <section id="the-visionary" className="py-16 md:py-20 bg-gradient-to-br from-[#121212] to-[#050505] relative border-t border-white/5">
             <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row items-center gap-12 2xl:gap-20">
                    <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-square bg-[#0a0a0a] rounded-full overflow-hidden border-4 border-amber-500/20 relative">
                        {/* Using 'founder-grace.jpg' (or Page 25 from PDF) */}
                        <img 
                            src="/images/founder-grace.jpg" 
                            className="object-cover w-full h-full golden-filter transition-all duration-500 hover:scale-105" 
                            style={{ objectPosition: 'center 20%', padding: '20px 0 0 0', background: '#1a1a1a' }} 
                            alt="Grace Thoso" 
                            loading="lazy"
                        />
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h4 className="text-amber-500 tracking-[0.2em] uppercase text-xs font-bold mb-4">The Managing Director</h4>
                        <h2 className="text-3xl md:text-5xl 2xl:text-7xl font-serif text-white mb-6">Grace Thoso</h2>
                        {/* PERSONALIZED FOUNDER TEXT */}
                        <p className="text-gray-400 text-base md:text-lg 2xl:text-2xl leading-relaxed italic mb-8">
                            "Grace is not merely a leader; she is a phenomenal force. A woman of unwavering faith who serves actively in the five-fold ministry, and a dedicated life coach helping others attain their full potential."
                        </p>
                        <p className="text-gray-400 text-sm md:text-base 2xl:text-xl leading-relaxed mb-8">
                             Her visionary leadership—a true embodiment of "Grace in Every Drop"—combined with her diverse expertise and profound passion, is the driving force behind our steadfast commitment to excellence, sustainable practices, and impactful community contribution.
                        </p>
                        <div className="flex flex-col md:flex-row gap-8 text-sm 2xl:text-lg text-gray-500">
                             <div>
                                <strong className="text-white block mb-1">Vision</strong>
                                <span>To set benchmarks for unparalleled quality.</span>
                             </div>
                             <div>
                                <strong className="text-white block mb-1">Faith</strong>
                                <span>Serving actively in ministry and business.</span>
                             </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}

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
                <a href="https://maps.google.com/?q=170+Constantia+Road,+Dagbreek,+Welkom,+9459,+South+Africa" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
                    <MapPin size={16} className="mt-1 flex-shrink-0 text-amber-500" />
                    <span>170 Constantia Road, Dagbreek<br />Welkom, 9459<br />South Africa</span>
                </a>
                <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10 mt-4 grayscale hover:grayscale-0 transition-all">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3546.657257989394!2d26.7333!3d-27.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDU5JzAwLjAiUyAyNsKwNDQnMDAuMCJF!5e0!3m2!1sen!2sza!4v1630000000000!5m2!1sen!2sza" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen="" 
                        loading="lazy"
                        title="Golden Grace Location"
                    ></iframe>
                </div>
                <a href="tel:+27662022100" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Phone size={16} className="text-amber-500" />
                    <span>+27 66 202 2100</span>
                </a>
                <a href="mailto:goldengracehoney@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                    <Mail size={16} className="text-amber-500" />
                    <span>goldengracehoney@gmail.com</span>
                </a>
            </div>
            <div className="flex gap-4 pt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"><Instagram size={18} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"><Twitter size={18} /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all"><Facebook size={18} /></a>
            </div>
          </div>
          
          <div className="w-full">
                <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Explore</h4>
                <ul className="space-y-4 text-gray-400 font-light text-sm 2xl:text-base">
                    <li><button onClick={() => onNav('collection')} className="hover:text-white transition-colors text-left w-full">The Collection</button></li>
                    <li><button onClick={() => onNav('gifts')} className="hover:text-white transition-colors text-left w-full">Gift Sets</button></li>
                    <li><button onClick={() => onNav('education')} className="hover:text-white transition-colors text-left w-full">Bee Smart</button></li>
                    <li><button onClick={() => onNav('recipes')} className="hover:text-white transition-colors text-left w-full">Recipes</button></li>
                </ul>
          </div>

          <div className="w-full">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-6">Stay Connected</h4>
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
                    <button type="submit" className="text-amber-400 uppercase text-xs font-bold tracking-widest hover:text-white transition-colors">Join</button>
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </form>
          </div>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-xs text-gray-600 border-t border-white/5 pt-8 gap-4">
            <p className="text-center md:text-left">&copy; 2025 Golden Grace Honey (Pty) Ltd. All Rights Reserved.</p>
            <div className="flex gap-6">
                <button onClick={() => onOpenModal('privacy')} className="hover:text-gray-400 transition-colors">Privacy Policy</button>
                <button onClick={() => onOpenModal('terms')} className="hover:text-gray-400 transition-colors">Terms of Service</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

// --- PAGES ---

const HomePage = ({ navigate, onAddToCart, onImageClick, onBulkEnquire }) => (
    <>
        <Hero navigate={navigate} />
        <TrustBar />
        <SensorySection />
        <ContentBreak />
        <StorySection />
        <Collection onAddToCart={onAddToCart} onImageClick={onImageClick} onBulkEnquire={onBulkEnquire} />
        <FeaturedGifts navigate={navigate} />
        <FeaturedEducation navigate={navigate} />
        <FeaturedRecipes navigate={navigate} />
        <FeaturedReviews navigate={navigate} />
        <Founder />
    </>
);

// New Featured Sections for Home Page
const FeaturedRecipes = ({ navigate }) => (
    <section className="py-16 bg-[#121212] border-t border-white/5">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Lifestyle</span>
            <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-6">Nourish & Glow</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">Discover how our raw honey enhances everything from your morning toast to your skincare routine.</p>
            <button 
                onClick={() => navigate('recipes')}
                className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
            >
                View Recipes
            </button>
        </div>
    </section>
);

// UPDATED FEATURED REVIEWS WITH SLIDER EFFECT
const FeaturedReviews = ({ navigate }) => {
    const [currentReview, setCurrentReview] = useState(0);
    const reviews = [
        { name: "Sarah J.", text: "The Blue Gum variety is now a staple in my tea. Absolutely delicious." },
        { name: "Lerato K.", text: "The skincare benefits of their raw honeycomb are undeniable." },
        { name: "David M.", text: "Authentic, raw, and pure. Exactly what I was looking for." }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-[#0a0a0a]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
                <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Community</span>
                <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-10">Love from the Hive</h3>
                
                <div className="relative max-w-3xl mx-auto min-h-[160px] flex items-center justify-center">
                    {reviews.map((review, i) => (
                        <div 
                            key={i} 
                            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${i === currentReview ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                             <div className="flex text-amber-400 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                             <p className="text-xl md:text-2xl font-serif text-white italic mb-4">"{review.text}"</p>
                             <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">- {review.name}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8 mb-8">
                    {reviews.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentReview ? 'bg-amber-500' : 'bg-white/10'}`}></div>
                    ))}
                </div>

                <button 
                    onClick={() => navigate('reviews')}
                    className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    Read All Reviews <ArrowRight size={14} />
                </button>
            </div>
        </section>
    );
};

// ... GiftsPage, EducationPage, RecipesPage, ReviewsPage ... (Keep existing implementations from previous Phase)

const GiftsPage = ({ onBuildBox, onRequestCatalogue }) => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <div className="mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Bespoke Gifting</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">The Art of Giving</h1>
                <p className="text-gray-400 mt-4 md:mt-6 max-w-md md:max-w-2xl lg:max-w-4xl lg:text-xl mx-auto px-4">Curated hampers and personalized honey suites for corporate clients and special occasions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
                {/* Corporate Card */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] md:h-[500px] lg:h-[600px]">
                    <img src="https://images.unsplash.com/photo-1549488352-843258fb82fd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter" alt="Corporate Gifts" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-8 text-center hover:bg-black/50 transition-colors">
                        <Award className="text-amber-500 mb-4" size={48} />
                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif text-white mb-4">Corporate Suites</h3>
                        <p className="text-gray-300 mb-8 max-w-sm lg:max-w-lg lg:text-lg text-sm md:text-base">Impress clients with B-BBEE compliant, locally sourced luxury. Custom branding available.</p>
                        <button 
                            onClick={onRequestCatalogue}
                            className="bg-white text-black px-6 md:px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-amber-500 transition-colors"
                        >
                            Request Catalogue
                        </button>
                    </div>
                </div>
                {/* Personal Card */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] md:h-[500px] lg:h-[600px]">
                    <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter" alt="Personal Gifts" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-8 text-center hover:bg-black/50 transition-colors">
                        <Gift className="text-amber-500 mb-4" size={48} />
                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif text-white mb-4">Celebration Hampers</h3>
                        <p className="text-gray-300 mb-8 max-w-sm lg:max-w-lg lg:text-lg text-sm md:text-base">Weddings, birthdays, or just because. Curate a box of sweetness.</p>
                        <button 
                            onClick={onBuildBox}
                            className="bg-white text-black px-6 md:px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-amber-500 transition-colors"
                        >
                            Build Your Box
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EducationPage = () => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
       <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Bee Smart Academy</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">Guardians of the Hive</h1>
            </div>
             {/* ... Education Content ... */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-32 items-center mb-20">
                <div className="space-y-6 lg:space-y-10 order-2 lg:order-1">
                    <h3 className="text-2xl lg:text-4xl font-serif text-white">Why We Need Bees</h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base lg:text-xl">Bees are responsible for 1 in every 3 bites of food we eat. At Golden Grace, we don't just harvest; we protect. Our training programs empower locals to become stewards of the environment.</p>
                    <ul className="space-y-4 text-gray-300 text-sm md:text-base lg:text-lg">
                        <li className="flex items-center gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Pollination Support</li>
                        <li className="flex items-center gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Biodiversity Protection</li>
                        <li className="flex items-center gap-3"><CheckCircle className="text-amber-500 flex-shrink-0" size={16} /> Sustainable Farming</li>
                    </ul>
                </div>
                <div className="h-[300px] md:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/10 order-1 lg:order-2">
                    <img src="https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover golden-filter" alt="Bee Education" />
                </div>
            </div>

            <div className="bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/5 text-center">
                <GraduationCap className="text-amber-500 mx-auto mb-6" size={48} />
                <h3 className="text-2xl lg:text-4xl font-serif text-white mb-4">Join Our Workshops</h3>
                <p className="text-gray-400 mb-8 max-w-xl lg:max-w-3xl lg:text-lg mx-auto text-sm md:text-base">From beginner beekeeping to advanced hive management. Learn from the experts in the Free State.</p>
                <button className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-white transition-colors">View Course Schedule</button>
            </div>

            {/* Crystallization Section moved here */}
            <div className="mt-20 bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors max-w-4xl mx-auto mb-8">
                 <div className="flex items-start gap-4 mb-4">
                    <div className="bg-amber-500/20 p-3 rounded-full">
                        <ThermometerSun className="text-amber-400 w-6 h-6 2xl:w-8 2xl:h-8" />
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg 2xl:text-2xl mb-1">Crystallization is Natural</h4>
                        <p className="text-xs 2xl:text-sm text-gray-400">It's a sign of purity, not spoilage.</p>
                    </div>
                 </div>
                 <p className="text-gray-300 text-sm 2xl:text-lg leading-relaxed mb-4">
                    Raw honey naturally solidifies over time, especially in winter. This preserves the flavor and quality of the nectar.
                 </p>
                 <div className="bg-black/40 p-4 rounded-lg">
                    <p className="text-amber-500 text-xs 2xl:text-sm font-bold uppercase mb-1 flex items-center gap-2">
                        <Info size={14} /> Quick Fix
                    </p>
                    <p className="text-gray-400 text-xs 2xl:text-base">
                        Simply place your jar in a bowl of warm water (not boiling) to return it to liquid gold.
                    </p>
                 </div>
            </div>
        </div>
    </div>
);

const RecipesPage = () => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Lifestyle</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">Nourish & Glow</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                {/* Recipe 1 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1543363136-3fdb62e11be5?q=80&w=2080&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Toast" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Culinary</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Golden Ricotta Toast</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">A simple yet decadent breakfast using our Sunflower Creamed Honey.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Recipe <ArrowRight size={14} /></button>
                    </div>
                </div>

                {/* Skincare 1 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Mask" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Skincare</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Raw Honey Face Mask</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">Hydrate and heal acne scars with this 2-ingredient natural remedy.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Routine <ArrowRight size={14} /></button>
                    </div>
                </div>

                {/* Recipe 2 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517601278517-456741619dad?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Tea" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Wellness</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Immunity Elixir</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">Our Infused Ginger & Lemon honey creates the ultimate flu-fighter tea.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Recipe <ArrowRight size={14} /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ReviewsPage = () => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Social Proof</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">Love from the Hive</h1>
            </div>
            {/* ... Reviews ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {[
                    { name: "Sarah J.", role: "Verified Buyer", text: "I've never tasted honey this rich before. The Blue Gum variety is now a staple in my tea.", rating: 5 },
                    { name: "David M.", role: "Chef", text: "As a chef, quality ingredients are everything. Golden Grace brings that authentic farm-to-table taste.", rating: 5 },
                    { name: "Lerato K.", role: "Wellness Coach", text: "The skincare benefits of their raw honeycomb are undeniable. My skin is glowing!", rating: 5 },
                    { name: "Michael B.", role: "Corporate Client", text: "We ordered 50 gift sets for our year-end function. The packaging was exquisite.", rating: 5 },
                    { name: "Priya S.", role: "Verified Buyer", text: "Finally, honey that isn't just sugar syrup. You can taste the wildflowers.", rating: 4 },
                    { name: "Thabo N.", role: "Beekeeping Student", text: "The workshop gave me the confidence to start my own hive. Grace is an amazing teacher.", rating: 5 }
                ].map((review, i) => (
                    <div key={i} className="bg-[#121212] p-6 md:p-8 lg:p-10 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors">
                        <div className="flex text-amber-400 mb-4">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base lg:text-lg">"{review.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-serif">
                                {review.name[0]}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">{review.name}</p>
                                <p className="text-gray-500 text-xs">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- Main App Logic ---
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]); 
  const [toast, setToast] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
        }
        return [...prev, { ...product, qty: 1 }];
    });
    // Only show toast if reserve is closed or it's the first item
    if (!showCart) {
        showToast(`Added ${product.title} to your reserve.`, 'cart');
    }
  };

  const decreaseQty = (id) => {
      setCart(prev => {
          const existing = prev.find(item => item.id === id);
          if (existing.qty === 1) {
              return prev.filter(item => item.id !== id); 
          }
          return prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item);
      });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removed from reserve.', 'success');
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Keep toast shorter
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubscribe = (email) => {
    showToast(`Welcome to the Hive, ${email}!`, 'success');
  };

  const handleNavigate = (pageId) => {
      setActivePage(pageId);
      window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
      if(cart.length === 0) return;
      showToast("Proceeding to secure checkout...", 'success');
  }

  const handleBulkEnquire = () => {
      setActiveModal('bulk');
  };

  const handleImageClick = (image, title) => {
      setSelectedImage({ image, title });
  };

  const handleBuildBox = () => {
      setActiveModal('buildBox');
  };

  const handleRequestCatalogue = () => {
      setActiveModal('catalogue');
  };

  // ... (Legal content and router logic maintained) ...
  const legalContent = {
      privacy: ( <> <p>Privacy Policy Content...</p> </> ),
      terms: ( <> <p>Terms Content...</p> </> ),
      bulk: (
          <>
            <p>Thank you for your interest in bulk ordering! We offer special pricing for orders of 24 units or more.</p>
            <h3 className="text-white font-bold mt-4 mb-2">How it works</h3>
            <p>Please contact us directly via WhatsApp or Email to discuss your requirements. We can customize labels for corporate events or weddings.</p>
            <div className="mt-6 flex flex-col gap-3">
                <a href="mailto:goldengracehoney@gmail.com" className="flex items-center gap-2 text-amber-500 hover:text-white"><Mail size={16}/> goldengracehoney@gmail.com</a>
                <a href="https://wa.me/27662022100" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-amber-500 hover:text-white"><MessageCircle size={16}/> Chat on WhatsApp</a>
            </div>
          </>
      ),
      buildBox: (
        <>
          <p>Create a truly unique gift with our "Build Your Box" service.</p>
          <h3 className="text-white font-bold mt-4 mb-2">Step 1: Choose Your Base</h3>
          <p>Select a box size: Mini (2 jars), Midi (3 jars), or Grand (5 items).</p>
          <h3 className="text-white font-bold mt-4 mb-2">Step 2: Select Your Honey</h3>
          <p>Mix and match from our Wildflower, Creamed, and Infused varieties.</p>
          <h3 className="text-white font-bold mt-4 mb-2">Step 3: Add Accessories</h3>
          <p>Include a wooden dipper, beeswax candle, or personalized note.</p>
          <div className="mt-6 flex flex-col gap-3">
               <p className="text-sm text-gray-400">To start building, chat with our gift concierge:</p>
              <a href="https://wa.me/27662022100" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-amber-500 hover:text-white"><MessageCircle size={16}/> Start Building on WhatsApp</a>
          </div>
        </>
    ),
    catalogue: (
        <>
           <p>Our Corporate Catalogue features exclusive pricing and branding options for bulk orders.</p>
           <h3 className="text-white font-bold mt-4 mb-2">What's Inside?</h3>
           <ul className="list-disc list-inside text-gray-400 space-y-1">
               <li>Volume discount tiers</li>
               <li>Custom labeling options (Co-branding)</li>
               <li>Executive gift set configurations</li>
           </ul>
           <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Enter your email to receive the PDF instantly:</p>
              <form className="flex flex-col gap-3">
                  <input type="email" placeholder="Business Email Address" className="bg-white/5 border border-white/10 p-3 rounded text-white outline-none focus:border-amber-500" />
                  <button type="button" className="bg-amber-500 text-black font-bold py-3 rounded hover:bg-white transition-colors">Send Me The Catalogue</button>
              </form>
           </div>
        </>
    )
  };

  const renderPage = () => {
      switch(activePage) {
          case 'home': return <HomePage navigate={handleNavigate} onAddToCart={addToCart} onImageClick={handleImageClick} onBulkEnquire={handleBulkEnquire} />;
          case 'collection': return <div className="pt-20"><Collection onAddToCart={addToCart} onImageClick={handleImageClick} onBulkEnquire={handleBulkEnquire} /></div>; 
          case 'gifts': return <GiftsPage onBuildBox={handleBuildBox} onRequestCatalogue={handleRequestCatalogue} />;
          case 'education': return <EducationPage />;
          case 'recipes': return <RecipesPage />;
          case 'reviews': return <ReviewsPage />;
          default: return <HomePage navigate={handleNavigate} onAddToCart={addToCart} />;
      }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
        {/* CSS Imports & Animations */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
            
            :root {
                --font-sans: 'Montserrat', sans-serif;
                --font-serif: 'Playfair Display', serif;
            }

            .font-sans { font-family: var(--font-sans); }
            .font-serif { font-family: var(--font-serif); }

            .golden-filter {
                filter: sepia(0.2) contrast(1.1) saturate(1.2) brightness(0.9);
                transition: filter 0.5s ease;
            }
            .group:hover .golden-filter {
                filter: sepia(0) contrast(1) saturate(1) brightness(1);
            }

            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

            @keyframes slow-zoom {
                0% { transform: scale(1.1); }
                100% { transform: scale(1.25); }
            }
            .animate-slow-zoom { animation: slow-zoom 20s infinite alternate; }
            
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
            
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #1a1a1a; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
        `}</style>

        {toast && 
            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast(null)} 
                onNavigate={() => { setShowCart(true); setToast(null); }}
            />
        }
        
        {activeModal && (
            <Modal 
                title={activeModal === 'privacy' ? 'Privacy Policy' : activeModal === 'terms' ? 'Terms of Service' : activeModal === 'bulk' ? 'Bulk Orders' : activeModal === 'buildBox' ? 'Build Your Box' : 'Request Catalogue'} 
                content={legalContent[activeModal]} 
                onClose={() => setActiveModal(null)} 
            />
        )}

        {selectedImage && (
            <ImageModal 
                image={selectedImage.image} 
                alt={selectedImage.title} 
                onClose={() => setSelectedImage(null)} 
            />
        )}
        
        <WhatsAppWidget />

        <Navbar 
            isScrolled={isScrolled} 
            toggleCart={() => setShowCart(true)} 
            cartCount={totalItems} 
            activePage={activePage}
            navigate={handleNavigate}
        />
        
        <main>
            {renderPage()}
        </main>

        <Footer 
            onSubscribe={handleSubscribe} 
            onNav={handleNavigate} 
            onOpenModal={setActiveModal}
        />

        {/* Cart Drawer */}
        <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-[#1a1a1a] z-[60] transform transition-transform duration-500 border-l border-white/10 shadow-2xl p-6 md:p-8 flex flex-col ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-serif">Your Reserve</h2>
                    <p className="text-xs text-gray-500 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                        <ShoppingBag size={48} className="mb-4" />
                        <p>Your cart is currently empty.</p>
                        <button 
                            onClick={() => { setShowCart(false); handleNavigate('collection'); }}
                            className="mt-6 text-amber-400 text-sm tracking-widest border-b border-amber-400 pb-1"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 animate-fade-in-up bg-white/5 p-3 rounded-lg">
                                <div className="w-16 h-16 bg-[#0a0a0a] rounded border border-white/5 flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-serif text-white text-sm">{item.title}</h4>
                                    <p className="text-amber-400 text-xs mt-1">R {item.price.toFixed(2)}</p>
                                    
                                    {/* QTY CONTROLS */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button onClick={() => decreaseQty(item.id)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                        <button onClick={() => addToCart(item)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-600 hover:text-red-400 transition-colors self-start"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 uppercase text-xs tracking-widest">Subtotal</span>
                        <span className="text-2xl font-serif text-white">R {cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors text-xs md:text-sm rounded-sm"
                    >
                        Secure Checkout
                    </button>
                    <p className="text-center text-[10px] text-gray-600 mt-3 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Encrypted Transaction
                    </p>
                </div>
            )}
        </div>
        
        {/* Overlay for Cart */}
        {showCart && <div className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm" onClick={() => setShowCart(false)}></div>}

    </div>
  );
};

export default App;