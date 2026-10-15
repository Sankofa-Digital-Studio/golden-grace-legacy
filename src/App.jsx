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

import HomePage from './pages/home-page/home-page';
import { useNavigation } from './hooks/useNavigation';
import { VIEWS } from './views';
import { useCart } from './context/cart-context';

const StoryPage = lazy(() => import('./pages/story-page'));
const EducationHub = lazy(() => import('./pages/education-page'));
const GiftsPage = lazy(() => import('./pages/gifts-page'));

const Storefront = () => {
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
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black relative">
        <SpeedInsights />
        <Analytics />
        <FilmGrain />

        {/* 1. VIEW TRANSITIONS */}
        {transitioning && (
          <div className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/60 font-black">
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
                  <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
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
