import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { MAINTENANCE_MODE } from './config/maintenance';
import MaintenanceGate from './pages/maintenance-page';

// Layout & Global Components
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Cart from './pages/home-page/sections/cart';
import FilmGrain from './components/ui/film-grain';
import ScrollToTop from './components/common/scroll-to-top';
import WhatsAppWidget from './components/common/whatsapp-widget';
import ErrorBoundary from './components/common/error-boundary';
import ForagerLoader from './components/common/forager-loader';
import { Hexagon } from 'lucide-react';

import HomePage from './pages/home-page/home-page';
import { useNavigation } from './hooks/useNavigation';
import { VIEWS } from './views';
import { useCart } from './context/cart-context';

const StoryPage = lazy(() => import('./pages/story-page'));
const EducationHub = lazy(() => import('./pages/education-page'));
const GiftsPage = lazy(() => import('./pages/gifts-page'));

const Storefront = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { view, navigate, transitioning } = useNavigation(VIEWS.HOME, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (pageId, opts) => {
    navigate(pageId, opts);
  };

  const handleAddToCart = (product, selectedSize) => {
    addToCart(product, selectedSize);
    setShowCart(true);
  };

  // --- RENDER ENGINE ---
  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
      case VIEWS.STORY:
        return <StoryPage onBack={() => navigate(VIEWS.HOME)} onNavigate={handleNavigate} />;
      case VIEWS.EDUCATION:
        return <EducationHub onBack={() => navigate(VIEWS.HOME)} onNavigate={handleNavigate} />;
      case VIEWS.GIFTS:
        return <GiftsPage onBack={() => navigate(VIEWS.HOME)} />;
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <ErrorBoundary>
      {initialLoading && <ForagerLoader onComplete={() => setInitialLoading(false)} />}
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black relative">
        <SpeedInsights />
        <Analytics />
        <FilmGrain />

        {/* 1. VIEW TRANSITIONS */}
        {transitioning && (
          <div className="fixed inset-0 z-[1000] bg-[#050505]/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-500/15 blur-xl rounded-full animate-pulse" />
                <Hexagon size={48} className="text-amber-500 animate-spin-slow opacity-80" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/80 font-black">
                Relocating Hive...
              </p>
            </div>
          </div>
        )}

        {/* 2. LAYOUT ELEMENTS */}
        <div>
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
            <Suspense
              fallback={
                <div className="h-screen bg-[#050505] flex items-center justify-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-amber-500/15 blur-xl rounded-full animate-pulse" />
                    <Hexagon size={48} className="text-amber-500 animate-spin-slow opacity-80" />
                  </div>
                </div>
              }
            >
              {renderView()}
            </Suspense>
          </main>

          <Footer
            onNav={handleNavigate}
            onSubscribe={() => console.log('Subscribed')}
            onOpenModal={(id) => console.log('Open Modal', id)}
          />

          <Cart
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

const App = () => (MAINTENANCE_MODE ? <MaintenanceGate /> : <Storefront />);

export default App;
