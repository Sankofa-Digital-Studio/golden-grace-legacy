import React, { useState, useEffect } from 'react';
import { Recycle, Hexagon, Home } from 'lucide-react';

// Common Components
import ErrorBoundary from './components/common/error-boundary';
import ForagerLoader from './components/common/forager-loader'; // REPLACED generic Loader
import Toast from './components/common/toast';
import Modal from './components/common/modal';
import ImageModal from './components/common/image-modal';
import WhatsAppWidget from './components/common/whatsapp-widget';
import Breadcrumbs from './components/common/breadcrumbs';
import ScrollToTop from './components/common/scroll-to-top';

// Layout
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

// Pages
import HomePage from './pages/home-page/home-page';
import GiftsPage from './pages/gifts-page';
import EducationPage from './pages/education-page';
import RecipesPage from './pages/recipes-page';
import ReviewsPage from './pages/reviews-page';

// Sections
import Collection from './pages/home-page/sections/collection';
import Cart from './pages/home-page/sections/cart';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { StoryPage } from './pages/story-page';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initial state for ForagerLoader
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('home');
  // Sustainability Tracker State
  const [impactScore, setImpactScore] = useState(() => {
    const saved = localStorage.getItem('impactScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Handle Global Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save Impact Score
  useEffect(() => {
    localStorage.setItem('impactScore', impactScore);
  }, [impactScore]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
        : [...prev, { ...product, qty: 1 }];
    });
    if (!showCart) setToast({ message: `Added ${product.title} to your reserve.`, type: 'cart' });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setToast({ message: 'Item removed from reserve.', type: 'success' });
  };

  const handleNavigate = (pageId) => {
    if (pageId === activePage) return;
    setIsPageTransitioning(true);
    // Mimic foraging sequence for page transitions
    setTimeout(() => {
      setActivePage(pageId);
      window.scrollTo(0, 0);
      setIsPageTransitioning(false);
    }, 1200);
  };

  const handleLogReturn = () => {
    setImpactScore((prev) => prev + 1);
    setToast({ message: 'Jar return logged! Impact score updated.', type: 'success' });
  };

  {
    view === 'home' && <Home onNavigate={setView} />;
  }
  {
    view === 'full-story' && <StoryPage onBack={() => setView('home')} onNavigate={setView} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            navigate={handleNavigate}
            onAddToCart={addToCart}
            onImageClick={(image, title) => setSelectedImage({ image, title })}
            onBulkEnquire={() => setActiveModal('bulk')}
            onScheduleClick={() => setActiveModal('schedule')}
          />
        );
      case 'collection':
        return (
          <div className="pt-20">
            <Collection
              onAddToCart={addToCart}
              onImageClick={(image, title) => setSelectedImage({ image, title })}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onBulkEnquire={() => setActiveModal('bulk')}
            />
          </div>
        );
      case 'gifts':
        return (
          <GiftsPage
            onBuildBox={() => setActiveModal('buildBox')}
            onRequestCatalogue={() => setActiveModal('catalogue')}
          />
        );
      case 'education':
        return <EducationPage onScheduleClick={() => setActiveModal('schedule')} />;
      case 'recipes':
        return (
          <RecipesPage
            onReadRecipe={(title) => setToast({ message: `Loading ${title}...`, type: 'success' })}
          />
        );
      case 'reviews':
        return <ReviewsPage onWriteReview={() => setActiveModal('review')} />;
      case 'full-story':
        return <StoryPage onBack={() => setView('home')} onNavigate={setView} />;
      case 'education-hub':
        return <EducationHub onBack={() => setView('home')} onNavigate={setView} />;

      default:
        return <HomePage navigate={handleNavigate} onAddToCart={addToCart} />;
    }
  };

  const getModalContent = () => {
    if (activeModal === 'sustainability') {
      const level =
        impactScore < 10 ? 'Novice Bee' : impactScore < 50 ? 'Worker Bee' : 'Hive Guardian';
      const nextLevel = impactScore < 10 ? 10 : impactScore < 50 ? 50 : 100;
      const progress = Math.min((impactScore / nextLevel) * 100, 100);

      return (
        <div className="text-center p-4">
          <div className="bg-amber-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center border-2 border-amber-500 shadow-xl">
            <span className="text-3xl font-bold text-amber-500 font-serif">{impactScore}</span>
          </div>
          <h3 className="text-2xl font-serif text-white mb-1">{level}</h3>
          <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-widest">Impact Level</p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-gray-500 mb-8">
            {nextLevel - impactScore} more jars to reach next level
          </p>
          <button
            onClick={handleLogReturn}
            title="Log a jar return"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all uppercase text-xs tracking-widest active:scale-95"
          >
            <Recycle size={16} /> Log Jar Return (+1)
          </button>
        </div>
      );
    }
    return 'Content loading...';
  };

  return (
    <ErrorBoundary>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
        <SpeedInsights />
        <Analytics />

        {/* 1. INITIAL ENTRANCE SEQUENCE */}
        {isLoading && <ForagerLoader onComplete={() => setIsLoading(false)} />}

        {/* 2. PAGE TRANSITION OVERLAY */}
        {isPageTransitioning && (
          <div className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <Hexagon size={48} className="text-amber-500 animate-spin-slow" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-amber-500/60 font-bold">
                Relocating Hive...
              </p>
            </div>
          </div>
        )}

        {/* 3. MAIN CONTENT LAYER */}
        <div
          className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        >
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
              onNavigate={() => {
                setShowCart(true);
                setToast(null);
              }}
            />
          )}

          {activeModal && (
            <Modal
              title={activeModal === 'sustainability' ? 'My Impact Tracker' : 'Information'}
              content={getModalContent()}
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
          <ScrollToTop />

          <Navbar
            isScrolled={isScrolled}
            toggleCart={() => setShowCart(true)}
            cartCount={cart.reduce((acc, item) => acc + item.qty, 0)}
            activePage={activePage}
            navigate={handleNavigate}
          />

          <Breadcrumbs currentPage={activePage} onNavigate={handleNavigate} />

          <main>{renderPage()}</main>

          <Footer
            onSubscribe={() => setToast({ message: `Welcome to the hive!`, type: 'success' })}
            onNav={handleNavigate}
            onOpenModal={setActiveModal}
          />

          <Cart
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
