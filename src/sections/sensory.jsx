import React from 'react';
import SectionHeading from '../components/ui/section-heading';
const Sensory = () => (
  <section id="sensory" className="py-16 md:py-20 2xl:py-32 bg-[#080808] relative">
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
      <SectionHeading
        pre="Liquid Soul"
        title="Sensory"
        italic="whispers"
        sub="Feel the texture, see the shimmer, and taste the unfiltered truth of raw honey."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-16">
        <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
          <img
            src="/images/sensory/liquid-gold.webp"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
            alt="Liquid Honey Texture"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
              Liquid Gold
            </h3>
            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
              Smooth, viscous, and clarifying. Sourced from Wildflower, Blue Gum, and Eucalyptus.
              Flows like silk.
            </p>
          </div>
        </div>
        <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
          <img
            src="/images/sensory/creamed-goodness.webp"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
            alt="Creamed Honey Texture"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
              Velvet Cream
            </h3>
            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
              Naturally crystallized Sunflower honey whipped into a buttery, spreadable delight.
            </p>
          </div>
        </div>
        <div className="relative group aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
          <img
            src="/images/sensory/infused-botanicals.webp"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
            alt="Infused Honey"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">
              Botanical Infusions
            </h3>
            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
              Expertly blended with Ginger, Garlic, or Lemon for a potent wellness boost.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Sensory;
