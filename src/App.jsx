import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Mail,
  MessageCircle,
  X,
  Recycle
} from 'lucide-react';

// Common Components
import ErrorBoundary from './components/common/error-boundary';
import Loader from './components/common/loader';
import Toast from './components/common/toast';
import Modal from './components/common/modal';
import ImageModal from './components/common/image-modal';
import WhatsAppWidget from './components/common/whatsapp-widget';
import Breadcrumbs from './components/common/breadcrumbs';
import ScrollToTop from './components/common/scroll-to-top';
import ImpactTracker from './components/common/impact-tracker';

// Layout
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

// Pages
import HomePage from './pages/home-page';
import GiftsPage from './pages/gifts-page';
import EducationPage from './pages/education-page';
import RecipesPage from './pages/recipes-page';
import ReviewsPage from './pages/reviews-page';

// Sections (Direct access needed for routing)
import Collection from './sections/collection';
import Cart from './sections/cart';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // NEW: Sustainability Tracker State (persisted in localStorage)
  const [impactScore, setImpactScore] = useState(() => {
    const saved = localStorage.getItem('impactScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save Impact Score
  useEffect(() => {
    localStorage.setItem('impactScore', impactScore);
  }, [impactScore]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
        : [...prev, { ...product, qty: 1 }];
    });
    if (!showCart) setToast({ message: `Added ${product.title} to your reserve.`, type: 'cart' });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      return existing.qty === 1
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item));
    });
  };

  const handleUpdateQuantity = (id, delta) => {
      setCart(prev => prev.map(item => {
          if (item.id === id) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : item; 
          }
          return item;
      }));
  };

  const handleRemoveItem = (id) => {
      setCart(prev => prev.filter(item => item.id !== id));
      setToast({ message: 'Item removed from reserve.', type: 'success' });
  };
  const handleNavigate = (pageId) => {
    if (pageId === activePage) return;
    setIsPageTransitioning(true);
    setTimeout(() => {
      setActivePage(pageId);
      window.scrollTo(0, 0);
      setIsPageTransitioning(false);
    }, 800);
  };
  const handleReadRecipe = (title) => {
    setToast({ message: `Loading recipe details for ${title}...`, type: 'success' });
  };

  // NEW: Log Jar Return
  const handleLogReturn = () => {
    setImpactScore((prev) => prev + 1);
    setToast({ message: 'Jar return logged! Impact score updated.', type: 'success' });
  };

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
        return <BeeSmartPage onScheduleClick={() => setActiveModal('schedule')} />;
      case 'recipes':
        return <RecipesPage onReadRecipe={handleReadRecipe} />;
      case 'reviews':
        return <ReviewsPage onWriteReview={() => setActiveModal('review')} />;
      default:
        return <HomePage navigate={handleNavigate} onAddToCart={addToCart} />;
    }
  };

  // Modal Content Logic with Sustainability
  const getModalContent = () => {
    if (activeModal === 'sustainability') {
      const level =
        impactScore < 10 ? 'Novice Bee' : impactScore < 50 ? 'Worker Bee' : 'Hive Guardian';
      const nextLevel = impactScore < 10 ? 10 : impactScore < 50 ? 50 : 100;
      const progress = Math.min((impactScore / nextLevel) * 100, 100);

      return (
        <div className="text-center">
          <div className="bg-amber-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <span className="text-3xl font-bold text-amber-500 font-serif">{score}</span>
          </div>
          <h3 className="text-2xl font-serif text-white mb-1">{level}</h3>
          <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">Impact Level</p>

          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mb-8">
            {nextLevel - impactScore} more jars to reach next level
          </p>

          <button
            onClick={handleLogReturn}
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition-colors uppercase text-xs tracking-widest"
          >
            <Recycle size={16} /> Log Jar Return (+1)
          </button>
          <p className="text-[10px] text-gray-500 mt-4">
            * Returns must be verified in-store for point redemption.
          </p>
        </div>
      );
    }
    return 'Content loading...';
  };

  if (isLoading) return <Loader />;

  return (
    <ErrorBoundary>
      <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
        {isPageTransitioning && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center transition-opacity duration-300">
            <Loader />
          </div>
        )}
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

        {/* Cart Drawer */}
        <Cart 
                isOpen={showCart} 
                onClose={() => setShowCart(false)} 
                cartItems={cart} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        {/* {showCart && (
          <div
            className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          ></div>
        )} */}
      </div>
    </ErrorBoundary>
  );
};

export default App;
