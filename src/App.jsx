import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Layout & Global Components
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Cart from './pages/home-page/sections/cart';
import ForagerLoader from './components/common/forager-loader';
import FilmGrain from './components/ui/film-grain';
import ScrollToTop from './components/common/scroll-to-top';
import WhatsAppWidget from './components/common/whatsapp-widget';
import ErrorBoundary from './components/common/error-boundary';

// Core Pages (Eager load Home for instant start)
import HomePage from './pages/home-page/home-page';

// Page-Level Modules (Lazy loaded for performance)
const StoryPage = lazy(() => import('./pages/story-page'));
const EducationHub = lazy(() => import('./pages/education-page'));
const GiftsPage = lazy(() => import('./pages/gifts-page'));

/**
 * --- APP ARCHITECTURE v4.2.0 ---
 * Purpose: Single-Page Application (SPA) with state-based routing.
 * Standard: LoAppxs Industrial | Sankofa Digital.
 */
const App = () => {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState('home'); // Routing source of truth
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- GLOBAL EFFECTS ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NAVIGATION ENGINE ---
  const handleNavigate = (pageId) => {
    if (pageId === view) return;
    setIsPageTransitioning(true);
    
    // Mimic "Hive Relocation" delay for smooth transitions
    setTimeout(() => {
      window.scrollTo(0, 0);
      setView(pageId);
      setIsPageTransitioning(false);
    }, 800);
  };

  // --- COMMERCE LOGIC ---
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, {...product, quantity: 1}];
    });
    setShowCart(true); // Open drawer immediately on add
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  // --- RENDER ENGINE ---
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleNavigate} 
            onAddToCart={addToCart}
          />
        );
      case 'full-story':
        return <StoryPage onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
      case 'education':
        return <EducationHub onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
      case 'gifts':
        return <GiftsPage onBack={() => handleNavigate('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={addToCart} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black relative">
        <SpeedInsights />
        <Analytics />
        <FilmGrain />

        {/* 1. LOADERS & TRANSITIONS */}
        {isLoading && <ForagerLoader onComplete={() => setIsLoading(false)} />}
        
        {isPageTransitioning && (
          <div className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/60 font-black">Relocating Hive...</p>
            </div>
          </div>
        )}

        {/* 2. LAYOUT ELEMENTS */}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar 
            isScrolled={isScrolled} 
            activePage={view} 
            navigate={handleNavigate} 
            toggleCart={() => setShowCart(true)} 
            cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
          />

          <ScrollToTop />
          <WhatsAppWidget />

          <main>
            <Suspense fallback={
              <div className="h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              </div>
            }>
              {renderView()}
            </Suspense>
          </main>

          <Footer 
            onNav={handleNavigate} 
            onSubscribe={() => console.log("Subscribed")} 
            onOpenModal={(id) => console.log("Open Modal", id)} 
          />

          <Cart 
            isOpen={showCart} 
            onClose={() => setShowCart(false)} 
            cartItems={cart} 
            onUpdateQuantity={handleUpdateQuantity} 
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;