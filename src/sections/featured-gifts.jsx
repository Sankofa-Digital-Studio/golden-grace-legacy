import React, { useState } from 'react';
import { Gift, X, CheckCircle, ArrowRight, ChevronDown, ChevronUp  } from 'lucide-react';
import OptimizedImage from '../components/ui/optimized-image';
const FeaturedGifts = ({ navigate, isSankofa }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [showForm, setShowForm] = useState(false); // New state for Progressive Disclosure

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setTimeout(() => { setEmail(""); setStatus("idle"); setShowForm(false); }, 3000);
  };

  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5 relative overflow-hidden bg-[#0a0a0a]">
       
       {/* Background Ambience (Sankofa Mode) */}
       {isSankofa && <div className="absolute inset-0 bg-amber-900/5 backdrop-blur-[2px] pointer-events-none" />}

       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          
          {/* MOBILE: Image Comes First (Immersive Card) */}
          <div className="md:hidden relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group mb-6" onClick={() => navigate('gifts')}>
            <OptimizedImage 
               src="/images/gift-mini.webp" 
               alt="Corporate Gifting Presentation"
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                <div>
                    <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded-full mb-3 backdrop-blur-md">
                        <Gift size={12} className="text-amber-500" />
                        <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Golden Grace Gifting</span>
                    </div>
                    <h2 className="text-3xl font-serif text-white leading-tight mb-2">
                    To Give is to <br/>
                    <span className="text-amber-500 italic">Plant a Seed.</span>
                    </h2>
                </div>
             </div>
          </div>

          {/* Left Column (Desktop) / Bottom Content (Mobile) */}
          <div className="text-left space-y-6">
            
            {/* Desktop-Only Header */}
            <div className="hidden md:block">
                <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full mb-4">
                <Gift size={14} className="text-amber-500" />
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Golden Grace Gifting</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                To Give is to <br/>
                <span className="text-amber-500 italic">Plant a Seed.</span>
                </h2>
            </div>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              In our culture, a gift is not just an object; it is a transfer of spirit. 
              Whether for corporate gratitude or personal celebration, gifting Golden Grace 
              means sharing the raw, untamed essence of the Free State.
            </p>

            {/* Actions Row */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => navigate('gifts')} 
                    className="flex justify-center items-center gap-2 text-white bg-white/10 hover:bg-white/20 transition-colors uppercase tracking-widest text-xs md:text-sm font-bold px-6 py-3 rounded-lg border border-white/5"
                >
                    View Catalogue <ArrowRight size={16} />
                </button>
                
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className={`flex justify-center items-center gap-2 transition-all uppercase tracking-widest text-xs md:text-sm font-bold px-6 py-3 rounded-lg border 
                        ${showForm 
                            ? 'bg-amber-500 text-black border-amber-500' 
                            : 'text-amber-500 border-amber-500/30 hover:border-amber-500'}`}
                >
                    Inquire for Occasions {showForm ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
            </div>

            {/* Progressive Disclosure Form */}
            {showForm && (
                <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                    <form onSubmit={handleSubmit} className={`p-5 md:p-6 rounded-xl border transition-all duration-300 ${status === 'error' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/5'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-white font-serif mb-1 text-lg">Tell us your vision</h4>
                            <p className="text-xs md:text-sm text-gray-400">We handle bulk & custom orders personally.</p>
                        </div>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={18}/></button>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                        <input 
                        type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm w-full"
                        />
                        <button 
                        type="submit"
                        className="bg-amber-500 text-black px-4 md:px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors text-xs md:text-sm uppercase tracking-widest shrink-0"
                        >
                        Send
                        </button>
                    </div>
                    {status === 'error' && <p className="text-red-400 text-xs mt-2 flex items-center gap-1 animate-in slide-in-from-left-2"><X size={12}/> Please enter a valid email address.</p>}
                    {status === 'success' && <p className="text-green-400 text-xs mt-2 flex items-center gap-1 animate-in slide-in-from-left-2"><CheckCircle size={12}/> Received! We will connect soon.</p>}
                    </form>
                </div>
            )}
          </div>

          {/* Right Column (Desktop Only - Visual) */}
          <div className="hidden md:block relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => navigate('gifts')}>
            <OptimizedImage 
               src="/images/gift-mini.webp" 
               alt="Corporate Gifting Presentation"
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
               <div className="flex justify-between items-end w-full">
                   <p className="text-white font-serif text-2xl">"The gift of nature is the only true luxury."</p>
                   <div className="bg-white/10 p-3 rounded-full backdrop-blur-md group-hover:bg-amber-500 group-hover:text-black transition-colors">
                       <ArrowRight size={20} />
                   </div>
               </div>
             </div>
          </div>

       </div>
    </section>
  );
};
export default FeaturedGifts;