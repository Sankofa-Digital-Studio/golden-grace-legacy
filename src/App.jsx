import React, { useState, useEffect } from 'react';
import { ShoppingBag, Minus, Plus, Trash2, ShieldCheck, Mail, MessageCircle, X } from 'lucide-react';

// Common Components
import ErrorBoundary from './components/common/error-boundary';
import Loader from './components/common/loader';
import Toast from './components/common/toast';
import Modal from './components/common/modal';
import ImageModal from './components/common/image-modal';
import WhatsAppWidget from './components/common/whatsapp-widget';

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
  // --- Global State ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]); 
  const [toast, setToast] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Effects ---
  
  // Fake Loading Simulation for Bee Loader (Remove in real production if not needed)
  useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
  }, []);

  // Scroll listener for Navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Cart Logic ---

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
        setToast({ message: `Added ${product.title} to your reserve.`, type: 'cart' });
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
    setToast({ message: 'Item removed from reserve.', type: 'success' });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
      if(cart.length === 0) return;
      setToast({ message: "Proceeding to secure checkout...", type: 'success' });
  }

  // --- Navigation Logic ---

  const handleNavigate = (pageId) => {
      setActivePage(pageId);
      window.scrollTo(0, 0);
  };

  // --- Content Data (Modals) ---
  
  const legalContent = {
      privacy: ( <> <p>Privacy Policy Content: We respect your data...</p> </> ),
      terms: ( <> <p>Terms Content: By using this site...</p> </> ),
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
    ),
    schedule: (
        <>
            <h3 className="text-white font-bold mt-4 mb-2">Upcoming Workshops</h3>
            <p className="text-gray-400 mb-4">Our Summer 2026 beekeeping workshops are currently being scheduled. Topics will include:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Introduction to Urban Beekeeping</li>
                <li>Sustainable Harvesting Techniques</li>
                <li>Hive Management & Safety</li>
            </ul>
            <p className="text-sm text-gray-500">Join our mailing list below to be notified when registration opens.</p>
        </>
    )
  };

  // --- Router Logic ---
  const renderPage = () => {
      switch(activePage) {
          case 'home': return <HomePage navigate={handleNavigate} onAddToCart={addToCart} onImageClick={(image, title) => setSelectedImage({image, title})} onBulkEnquire={() => setActiveModal('bulk')} onScheduleClick={() => setActiveModal('schedule')} />;
          case 'collection': return <div className="pt-20"><Collection onAddToCart={addToCart} onImageClick={(image, title) => setSelectedImage({image, title})} onBulkEnquire={() => setActiveModal('bulk')} /></div>; 
          case 'gifts': return <GiftsPage onBuildBox={() => setActiveModal('buildBox')} onRequestCatalogue={() => setActiveModal('catalogue')} />;
          case 'education': return <EducationPage onScheduleClick={() => setActiveModal('schedule')} />;
          case 'recipes': return <RecipesPage />;
          case 'reviews': return <ReviewsPage />;
          default: return <HomePage navigate={handleNavigate} onAddToCart={addToCart} />;
      }
  };

  if (isLoading) return <Loader />;

  return (
    <ErrorBoundary>
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
            {/* Global Overlays */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} onNavigate={() => { setShowCart(true); setToast(null); }} />}
            {activeModal && <Modal title={activeModal === 'privacy' ? 'Privacy Policy' : activeModal === 'terms' ? 'Terms of Service' : activeModal === 'bulk' ? 'Bulk Orders' : activeModal === 'buildBox' ? 'Build Your Box' : activeModal === 'catalogue' ? 'Request Catalogue' : 'Course Schedule'} content={legalContent[activeModal]} onClose={() => setActiveModal(null)} />}
            {selectedImage && <ImageModal image={selectedImage.image} alt={selectedImage.title} onClose={() => setSelectedImage(null)} />}
            
            <WhatsAppWidget />
            
            {/* Main Layout */}
            <Navbar isScrolled={isScrolled} toggleCart={() => setShowCart(true)} cartCount={cart.reduce((acc, item) => acc + item.qty, 0)} activePage={activePage} navigate={handleNavigate} />
            
            <main>
                {renderPage()}
            </main>

            <Footer onSubscribe={(email) => setToast({message: `Welcome ${email}`, type: 'success'})} onNav={handleNavigate} onOpenModal={setActiveModal} />

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
             
             {/* Cart Overlay */}
             {showCart && <div className="fixed inset-0 bg-black/80 z-[55] backdrop-blur-sm" onClick={() => setShowCart(false)}></div>}
        </div>
    </ErrorBoundary>
  );
};

export default App;