import React from 'react';
import { Droplet, Users } from 'lucide-react';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';
import { Sparkles, Heart, MapPin } from 'lucide-react';
const Story = () => {
  return (
    <section id="our-story" className="py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header: Shifted from "About Us" to "The Legacy" */}
        <div className="mb-20">
          <SectionHeading 
            pre="A Legacy of Resilience"
            title="Rooted in"
            italic="Purpose"
            sub="Golden Grace is not just a brand; it is a testimony of resilience harvested from the heart of the Free State."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: The Visual Soul */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-500/5 blur-2xl rounded-[3rem] group-hover:bg-amber-500/10 transition-all duration-1000" />
            
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <OptimizedImage 
                src="/images/harvest/harvest-25.webp" 
                alt="The beekeepers of Golden Grace in the Free State veld"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Floating Stat Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-white font-serif text-lg leading-tight">Women-Led</p>
                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Impact Certified</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: The Narrative Purpose */}
          <div className="space-y-10">
            
            <div className="space-y-6">
                <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                    Beyond the <span className="italic text-amber-400 font-light">Industry</span> Standard.
                </h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                    While the world settled for processed syrups, we returned to the source. In the small town of Virginia, Free State, we recognized that the true gold wasn't just in the jars—it was in the **integrity** of the harvest and the hands that pulled it.
                </p>
            </div>

            {/* Purpose Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-amber-500/20 transition-colors group">
                    <Sparkles className="text-amber-500 group-hover:animate-pulse" size={20} />
                    <h4 className="text-white font-serif text-xl">God’s Grace</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">Every drop is a blessing from the Veld, harvested with gratitude to Him for the abundance of nature.</p>
                </div>
                
                <div className="space-y-3 p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-amber-500/20 transition-colors group">
                    <Heart className="text-amber-500 group-hover:scale-110 transition-transform" size={20} />
                    <h4 className="text-white font-serif text-xl">The Queen Bee</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">Empowering female beekeepers in the Free State to lead, harvest, and build local legacies.</p>
                </div>
            </div>

            <div className="pt-6">
                <blockquote className="border-l-2 border-amber-500 pl-8 space-y-2">
                    <p className="text-white font-serif italic text-xl md:text-2xl leading-snug">
                        "We don't just sell honey; we share a piece of South African resilience, raw and unbothered."
                    </p>
                    <cite className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] not-italic block pt-2">
                        — The Golden Grace Vision
                    </cite>
                </blockquote>
            </div>

            <div className="pt-8">
                <button 
                    title="Experience the full collection"
                    className="group flex items-center gap-6 text-white hover:text-amber-500 transition-all active:scale-95"
                >
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Our Connection to the Land</span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                        <MapPin size={18} className="group-hover:translate-y-[-2px] transition-transform" />
                    </div>
                </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Story;
