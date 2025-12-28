import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Hexagon } from 'lucide-react';

const Navbar = ({ isScrolled, toggleCart, cartCount, activePage, navigate }) => {
 const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : 'unset'; }, [isOpen]);
  const navLinks = [{ id: 'home', label: 'Home' }, { id: 'collection', label: 'The Reserve' }, { id: 'gifts', label: 'Gifting' }, { id: 'education', label: 'Bee Smart' }, { id: 'recipes', label: 'Lifestyle' }, { id: 'reviews', label: 'Hive Mind' }];
  const handleNav = (id) => { navigate(id); setIsOpen(false); };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isOpen || activePage !== 'home' ? 'bg-[#050505]/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/5' : 'bg-transparent py-4 md:py-6 lg:py-8'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <div onClick={() => handleNav('home')} className="flex items-center gap-2 md:gap-3 cursor-pointer group z-50 relative">
            <Hexagon className={`transition-colors duration-500 ${isOpen ? 'text-white' : 'text-amber-400'} fill-amber-400/20 w-8 h-8 md:w-10 md:h-10`} />
            <div className="flex flex-col"><span className="font-serif text-lg md:text-xl lg:text-2xl tracking-widest leading-none text-white shadow-black drop-shadow-md">GOLDEN</span><span className="text-amber-500 font-sans text-[0.6rem] md:text-xs lg:text-sm tracking-[0.35em] font-bold shadow-black drop-shadow-md">GRACE</span></div>
          </div>
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 2xl:gap-16">
            {navLinks.map((item) => (
              <button title='Active_Page' key={item.id} onClick={() => handleNav(item.id)} className={`text-xs xl:text-sm 2xl:text-base tracking-[0.15em] uppercase transition-colors relative group font-medium ${activePage === item.id ? 'text-amber-400' : 'text-white/80 hover:text-amber-400'}`}>
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-amber-400 transition-all duration-300 ${activePage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 md:gap-6 z-50 relative">
            <button title='Cart' onClick={toggleCart} className="text-white hover:text-amber-400 transition-colors relative group drop-shadow-md">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7" />
              {cartCount > 0 && (<span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-amber-500 text-black text-[9px] md:text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce">{cartCount}</span>)}
            </button>
            <button title='Close' className="lg:hidden text-white active:scale-90 transition-transform" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 bg-[#080808] z-40 flex flex-col justify-center px-8 transition-all duration-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="flex flex-col gap-6 z-10 w-full max-w-md">
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">Menu</p>
          {navLinks.map((item, i) => (
            <button title='Active_Page' key={item.id} onClick={() => handleNav(item.id)} className={`flex items-center gap-4 text-2xl md:text-3xl font-serif text-left transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} ${activePage === item.id ? 'text-amber-400' : 'text-white'}`} style={{ transitionDelay: `${100 + (i * 50)}ms` }}>
              <Hexagon size={16} className={`flex-shrink-0 ${activePage === item.id ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />{item.label}
            </button>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-gray-500 text-xs"><p>&copy; 2025 Golden Grace Honey</p></div>
      </div>
    </>
  );
};

export default Navbar;
