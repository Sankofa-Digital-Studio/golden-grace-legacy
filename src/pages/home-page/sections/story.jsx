import React from 'react';
import { MoveRight, Heart  } from 'lucide-react';
import SectionHeading from '../../../components/ui/section-heading';
import OptimizedImage from '../../../components/ui/optimized-image';
import { VIEWS } from '../../../views';
export const Story = ({ onNavigate }) => {
  return (
    <section id="our-story" className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Visual: The Legacy Frame */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-amber-500/5 blur-2xl rounded-[3rem] group-hover:bg-amber-500/10 transition-all duration-1000" />
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <OptimizedImage 
                src="/images/harvest/harvest-25.webp" 
                alt="Heritage beekeepers in Virginia, Free State"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Impact Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-xl">
                        <Heart size={24} />
                    </div>
                    <div>
                        <p className="text-white font-serif text-lg leading-tight">Women-Led</p>
                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Heritage Certified</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Content: The Vision Hook */}
          <div className="space-y-10 order-1 lg:order-2">
            <SectionHeading 
              pre="The Heritage"
              title="A Legacy of"
              italic="Grace"
              sub="Golden Grace is more than a harvest; it is a testimony of providence written by the sun and the soil of the Free State."
            />

            <div className="space-y-6 pt-4">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Born in Virginia, our journey began with five hives and a prayer. While the world settled for processed syrups, we returned to the Veld to protect the unbothered integrity of what He provides.
              </p>
              
              <blockquote className="border-l-2 border-amber-500 pl-8 py-2">
                <p className="text-white font-serif italic text-xl">
                  "Every drop is a blessing provided by Him, stewarded by us."
                </p>
              </blockquote>
            </div>

            <div className="pt-8">
              <button 
               onClick={() => onNavigate(VIEWS.STORY)}
                title="Navigate to the full heritage and founder story"
                className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 hover:bg-amber-500 hover:text-black transition-all active:scale-95 shadow-xl"
              >
                Deepen the Connection <MoveRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


export default Story;
