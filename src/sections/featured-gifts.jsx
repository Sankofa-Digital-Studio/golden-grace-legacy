import React, { useState } from 'react';
import { Gift, X, CheckCircle, ArrowRight } from 'lucide-react';

const FeaturedGifts = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, error, success

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }
    
    // Simulate API call
    setStatus("success");
    setTimeout(() => { setEmail(""); setStatus("idle"); }, 3000);
  };

  return (
    <section className="py-24 px-4 border-t border-white/5 relative overflow-hidden bg-[#0a0a0a]">
       
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left: The Soul Copy & Form */}
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">
              <Gift size={14} className="text-amber-500" />
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Graceful Gifting</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              To Give is to <br/>
              <span className="text-amber-500 italic">Plant a Seed.</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              In our culture, a gift is not just an object; it is a transfer of spirit. 
              Whether for corporate gratitude or personal celebration, gifting Golden Grace 
              means sharing the raw, untamed essence of the Free State.
            </p>

            <button 
                onClick={() => navigate('gifts')} 
                className="hidden md:inline-flex items-center gap-2 text-amber-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold mb-4"
            >
                View Gift Catalogue <ArrowRight size={16} />
            </button>

            {/* Validation Form */}
            <form onSubmit={handleSubmit} className={`p-6 rounded-xl border transition-all duration-300 ${status === 'error' ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/5'}`}>
              <h4 className="text-white font-serif mb-2">Inquire for Custom Orders</h4>
              <p className="text-sm text-gray-400 mb-4">Tell us your vision for corporate or bulk gifting.</p>
              
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
                <button 
                  type="submit"
                  className="bg-amber-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors text-sm uppercase tracking-widest"
                >
                  Send
                </button>
              </div>
              {status === 'error' && <p className="text-red-400 text-xs mt-2 flex items-center gap-1 animate-in slide-in-from-left-2"><X size={12}/> Please enter a valid email address.</p>}
              {status === 'success' && <p className="text-green-400 text-xs mt-2 flex items-center gap-1 animate-in slide-in-from-left-2"><CheckCircle size={12}/> Received! We will connect soon.</p>}
            </form>
          </div>

          {/* Right: Visual */}
          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer" onClick={() => navigate('gifts')}>
             {/* Placeholder for Corporate/Special Occasion Image */}
             <img 
               src="/images/featured-gift-intro.webp" 
               alt="Corporate Gifting Presentation"
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
               <p className="text-white font-serif text-2xl">"The gift of nature is the only true luxury."</p>
             </div>
          </div>

          {/* Mobile Only Link */}
          <button 
                onClick={() => navigate('gifts')} 
                className="md:hidden w-full flex justify-center items-center gap-2 text-amber-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
            >
                View Gift Catalogue <ArrowRight size={16} />
            </button>

       </div>
    </section>
  );
};

export default FeaturedGifts;