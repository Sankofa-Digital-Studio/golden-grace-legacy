import React from 'react';
import { Droplet, Users } from 'lucide-react';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';
const Story = () => (
  <section id="our-origins" className="py-16 px-6 bg-transparent relative z-10">
    <div className="absolute inset-0 bg-honeycomb opacity-[0.50] pointer-events-none -z-10" />
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-20 2xl:gap-32 items-center">
        <div className="space-y-8 md:space-y-12 order-2 lg:order-1">
          <div className="space-y-4 md:space-y-6">
            <SectionHeading
              pre=" Est. 2022 • Virginia, Free State"
              title="Rooted in Community, Driven by"
              italic="grace"
              sub="xs."
            />
          </div>
          <p className="text-gray-400 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light">
            "It started with five hives and a prayer." Golden Grace is more than a brand; it is a
            testimony of resilience. Sourced from the untamed wildflowers of the Free State, our
            honey captures the soul of the South African landscape.
          </p>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="flex gap-4 group p-4 border border-white/5 rounded-lg hover:border-amber-500/20 transition-colors">
              <div className="p-2 bg-amber-900/10 rounded-full h-fit group-hover:bg-amber-500/20 transition-colors">
                <Droplet className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h5 className="text-white font-serif text-base md:text-lg 2xl:text-xl mb-1">
                  Pure Harvest
                </h5>
                <p className="text-gray-500 text-xs 2xl:text-sm leading-relaxed">
                  No sugar feeding. No pasteurization. Just raw nectar.
                </p>
              </div>
            </div>
            <div className="flex gap-4 group p-4 border border-white/5 rounded-lg hover:border-amber-500/20 transition-colors">
              <div className="p-2 bg-amber-900/10 rounded-full h-fit group-hover:bg-amber-500/20 transition-colors">
                <Users className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h5 className="text-white font-serif text-base md:text-lg 2xl:text-xl mb-1">
                  Community First
                </h5>
                <p className="text-gray-500 text-xs 2xl:text-sm leading-relaxed">
                  Creating sustainable livelihoods in Welkom and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto w-full order-1 lg:order-2">
          <div className="absolute inset-0 bg-[#121212] rounded-[2rem] md:rounded-t-[10rem] md:rounded-b-lg overflow-hidden border border-white/5">
           <OptimizedImage 
              src="/images/story/story-1.webp"
              alt="Grace in Every Drop"
              className="w-full h-full object-cover golden-filter"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Story;
