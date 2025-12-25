import React from 'react';
import { Droplet, Users } from 'lucide-react';

const Story = () => {
    return (
      <section id="our-origins" className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 2xl:gap-32 items-center">
            
            <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <h4 className="text-amber-500 tracking-[0.3em] uppercase text-xs 2xl:text-sm font-bold">Est. 2022 • Virginia, Free State</h4>
                <h2 className="text-3xl md:text-4xl lg:text-6xl 2xl:text-8xl font-serif text-white leading-tight">
                  Rooted in Community, <br />
                  Driven by <span className="text-amber-400">Grace</span>.
                </h2>
              </div>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light">
                "It started with five hives and a prayer." Golden Grace is more than a brand; it is a testimony of resilience. Sourced from the untamed wildflowers of the Free State, our honey captures the soul of the South African landscape.
              </p>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light">
                We don't just bottle sweetness; we nurture an ecosystem. As a proudly black, female-led enterprise, every drop represents empowerment, ethical beekeeping, and a covenant with nature.
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {[
                  { icon: Droplet, title: "Pure Harvest", desc: "No sugar feeding. No pasteurization. Just raw nectar." },
                  { icon: Users, title: "Community First", desc: "Creating sustainable livelihoods in Welkom and beyond." }
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4 group p-4 border border-white/5 rounded-lg hover:border-amber-500/20 transition-colors">
                    <div className="p-2 bg-amber-900/10 rounded-full h-fit group-hover:bg-amber-500/20 transition-colors">
                      <feat.icon className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h5 className="text-white font-serif text-base md:text-lg 2xl:text-xl mb-1">{feat.title}</h5>
                      <p className="text-gray-500 text-xs 2xl:text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="relative aspect-square md:aspect-auto md:h-[500px] lg:h-[600px] 2xl:h-[800px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-[#121212] rounded-[2rem] md:rounded-t-[10rem] md:rounded-b-lg overflow-hidden border border-white/5">
                <img 
                  src="/images/story-jar.webp" 
                  alt="Grace in Every Drop" 
                  className="w-full h-full object-cover golden-filter"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-4 md:p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <p className="text-[10px] md:text-xs text-amber-400 tracking-widest uppercase mb-1">Location</p>
                      <p className="font-serif text-lg md:text-2xl">Welkom, SA</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] md:text-xs text-amber-400 tracking-widest uppercase mb-1">Identity</p>
                      <p className="font-serif text-lg md:text-2xl">Women-Led</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
};

export default Story;