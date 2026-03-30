import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Hexagon, ArrowRight } from 'lucide-react';
import { VIEWS } from '../../views';
import { useScrollLock } from '../../hooks/useScrollLock';
const Navbar = ({ isScrolled, toggleCart, cartCount, activePage, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is active to prevent scroll-leaking
  useScrollLock(isOpen);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'full-story', label: 'The Legacy' },
    { id: 'education', label: 'Grace Hub' },
    { id: 'collection', label: 'The Reserve' },
  ];

  /**
   * --- SANKOFA NAVIGATION LOGIC ---
   * Intelligently handles smooth-scrolling to anchors or cross-page navigation.
   */
  const handleNav = (id) => {
    if (id === 'collection') {
      navigate(VIEWS.HOME, { scrollTo: 'collection' });
      setIsOpen(false);
      return;
    } else {
      // Standard page navigation
      navigate(id);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[150] transition-all duration-500 
          ${
            isScrolled || isOpen || activePage !== 'home'
              ? 'bg-[#050505]/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/5'
              : 'bg-transparent py-4 md:py-8'
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* LOGO AREA */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 md:gap-3 cursor-pointer group z-[160] relative"
            title="Golden Grace - Return to Home"
          >
            <Hexagon
              className={`transition-colors duration-500 ${isOpen ? 'text-white' : 'text-amber-400'} fill-amber-400/20 w-8 h-8 md:w-10 md:h-10`}
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-2xl tracking-widest leading-none text-white drop-shadow-md uppercase">
                GOLDEN
              </span>
              <span className="text-amber-500 font-sans text-[0.6rem] md:text-xs tracking-[0.4em] font-black drop-shadow-md uppercase">
                GRACE
              </span>
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-12 xl:gap-16">
            {navLinks.map((item) => (
              <button
                key={item.id}
                title={`Maps to ${item.label}`}
                onClick={() => handleNav(item.id)}
                className={`text-[10px] xl:text-xs tracking-[0.3em] uppercase transition-all relative group font-black
                  ${activePage === item.id ? 'text-amber-400' : 'text-white/60 hover:text-white'}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-amber-400 transition-all duration-500 
                    ${activePage === item.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}
                ></span>
              </button>
            ))}
          </div>

          {/* ACTION CLUSTER */}
          <div className="flex items-center gap-4 md:gap-8 z-[160] relative">
            <button
              title="View your harvest bag"
              onClick={toggleCart}
              className="text-white hover:text-amber-400 transition-all relative group active:scale-90"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 2xl:w-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-black text-[9px] font-black flex items-center justify-center rounded-full animate-bounce shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              title={isOpen ? 'Close Menu' : 'Open Menu'}
              className="lg:hidden text-white active:scale-90 transition-transform p-2 bg-white/5 rounded-full border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU: The Hive Drawer */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[140] flex flex-col justify-center px-10 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] 
          ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="flex flex-col gap-8 z-10 w-full max-w-sm">
          <div className="space-y-2 mb-4">
            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em]">
              The Menu
            </p>
            <div className="h-px w-12 bg-amber-500/40" />
          </div>

          {navLinks.map((item, i) => (
            <button
              key={item.id}
              title={`Go to ${item.label}`}
              onClick={() => handleNav(item.id)}
              className={`flex items-center justify-between text-3xl md:text-5xl font-serif text-left transition-all duration-700 transform 
                ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'} 
                ${activePage === item.id ? 'text-amber-400 italic font-light' : 'text-white'}`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <div className="flex items-center gap-6">
                <Hexagon
                  size={16}
                  className={`flex-shrink-0 transition-all duration-1000 ${activePage === item.id ? 'text-amber-400 fill-amber-400 rotate-90 scale-125' : 'text-white/10'}`}
                />
                {item.label}
              </div>
              {activePage === item.id && <ArrowRight size={24} className="text-amber-500" />}
            </button>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
          <p>&copy; 2026 Golden Grace Honey</p>
          <p className="mt-2 text-amber-500/30 font-bold uppercase tracking-widest">
            Provided by His Grace.
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
