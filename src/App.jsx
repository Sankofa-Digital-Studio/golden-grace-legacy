import React, { useState, useEffect } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, ShieldCheck, Mail, MessageCircle, X } from 'lucide-react';

// Common Components
import ErrorBoundary from './components/common/error-boundary';
import Loader from './components/common/loader';
import Toast from './components/common/toast';
import Modal from './components/common/modal';
import ImageModal from './components/common/image-modal';
import WhatsAppWidget from './components/common/whatsapp-widget';
import Breadcrumbs from './components/common/breadcrumbs';

// Layout
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

// Pages
import HomePage from './pages/home-page';
import GiftsPage from './pages/gifts-page';
import EducationPage from './pages/education-page';
import RecipesPage from './pages/recipes-page';
import ReviewsPage from './pages/recipes-page';

// Sections (Direct access needed for routing)
import Collection from './sections/collection';

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

  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 2000); return () => clearTimeout(timer); }, []);
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 50); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  const addToCart = (product) => {
    setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        return existing ? prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...prev, { ...product, qty: 1 }];
    });
    if (!showCart) setToast({ message: `Added ${product.title} to your reserve.`, type: 'cart' });
  };

  const decreaseQty = (id) => {
      setCart(prev => {
          const existing = prev.find(item => item.id === id);
          return existing.qty === 1 ? prev.filter(item => item.id !== id) : prev.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item);
      });
  };

  const removeFromCart = (id) => { setCart(prev => prev.filter(item => item.id !== id)); setToast({ message: 'Item removed from reserve.', type: 'success' }); };
  const handleCheckout = () => { if(cart.length > 0) setToast({ message: "Proceeding to secure checkout...", type: 'success' }); }
  const handleNavigate = (pageId) => { if (pageId === activePage) return; setIsPageTransitioning(true); setTimeout(() => { setActivePage(pageId); window.scrollTo(0, 0); setIsPageTransitioning(false); }, 800); };
  const handleReadRecipe = (title) => { setToast({ message: `Loading recipe details for ${title}...`, type: 'success' }); };

  const renderPage = () => {
      switch(activePage) {
          case 'home': return <HomePage navigate={handleNavigate} onAddToCart={addToCart} onImageClick={(image, title) => setSelectedImage({image, title})} onBulkEnquire={() => setActiveModal('bulk')} onScheduleClick={() => setActiveModal('schedule')} />;
          case 'collection': return <div className="pt-20"><Collection onAddToCart={addToCart} onImageClick={(image, title) => setSelectedImage({image, title})} onBulkEnquire={() => setActiveModal('bulk')} /></div>; 
          case 'gifts': return <GiftsPage onBuildBox={() => setActiveModal('buildBox')} onRequestCatalogue={() => setActiveModal('catalogue')} />;
          case 'education': return <EducationPage onScheduleClick={() => setActiveModal('schedule')} />;
          case 'recipes': return <RecipesPage onReadRecipe={handleReadRecipe} />;
          case 'reviews': return <ReviewsPage />;
          default: return <HomePage navigate={handleNavigate} onAddToCart={addToCart} />;
      }
  };

  if (isLoading) return <Loader />;

  return (
    <ErrorBoundary>
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
            {isPageTransitioning && <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center transition-opacity duration-300"><Loader /></div>}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} onNavigate={() => { setShowCart(true); setToast(null); }} />}
            {activeModal && <Modal title="Information" content="Content loading..." onClose={() => setActiveModal(null)} />}
            {selectedImage && <ImageModal image={selectedImage.image} alt={selectedImage.title} onClose={() => setSelectedImage(null)} />}
            
            <WhatsAppWidget />
            <Navbar isScrolled={isScrolled} toggleCart={() => setShowCart(true)} cartCount={cart.reduce((acc, item) => acc + item.qty, 0)} activePage={activePage} navigate={handleNavigate} />
            
            <Breadcrumbs currentPage={activePage} onNavigate={handleNavigate} />

            <main>{renderPage()}</main>
            <Footer onSubscribe={() => setToast({message: `Welcome to the hive!`, type: 'success'})} onNav={handleNavigate} onOpenModal={setActiveModal} />

            {/* Cart Drawer */}
             <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-[#1a1a1a] z-[60] transform transition-transform duration-500 border-l border-white/10 shadow-2xl p-6 md:p-8 flex flex-col ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4"><div><h2 className="text-xl md:text-2xl font-serif">Your Reserve</h2><p className="text-xs text-gray-500 mt-1">{cart.reduce((acc, item) => acc + item.qty, 0)} items</p></div><button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"><X size={24} /></button></div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50"><ShoppingBag size={48} className="mb-4" /><p>Your cart is currently empty.</p><button onClick={() => { setShowCart(false); handleNavigate('collection'); }} className="mt-6 text-amber-400 text-sm tracking-widest border-b border-amber-400 pb-1">Start Shopping</button></div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 animate-fade-in-up bg-white/5 p-3 rounded-lg border border-white/5">
                                    <div className="w-16 h-16 bg-[#0a0a0a] rounded border border-white/5 flex-shrink-0 overflow-hidden"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>
                                    <div className="flex-1"><h4 className="font-serif text-white text-sm">{item.title}</h4><p className="text-amber-400 text-xs mt-1">R {item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center bg-amber-500 text-black rounded-full hover:bg-white transition-colors"><Minus size={14} /></button>
                                            <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                            <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center bg-amber-500 text-black rounded-full hover:bg-white transition-colors"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-400 transition-colors self-start"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {cart.length > 0 && (<div className="mt-8 pt-6 border-t border-white/10"><div className="flex justify-between items-center mb-6"><span className="text-gray-400 uppercase text-xs tracking-widest">Subtotal</span><span className="text-2xl font-serif text-white">R {cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}</span></div><button onClick={handleCheckout} className="w-full bg-amber-500 text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors text-xs md:text-sm rounded-sm">Secure Checkout</button></div>)}
             </div>
             {showCart && <div className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm" onClick={() => setShowCart(false)}></div>}
        </div>
    </ErrorBoundary>
  );
};
export default App;