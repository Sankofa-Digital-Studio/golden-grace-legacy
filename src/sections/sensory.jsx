import React from 'react';

const Sensory = () => {
    return (
        <section id="sensory" className="py-16 md:py-20 2xl:py-32 bg-[#080808] relative">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-amber-500 tracking-[0.3em] text-xs 2xl:text-sm font-bold uppercase">The Experience</span>
                    <h2 className="text-3xl md:text-5xl 2xl:text-7xl font-serif text-white mt-4">A Symphony of Texture</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-16">
                    {/* Card 1: Liquid */}
                    <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="/images/sensory-liquid.webp" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Liquid Honey Texture"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Liquid Gold</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Smooth, viscous, and clarifying. Sourced from Wildflower, Blue Gum, and Eucalyptus. Flows like silk.
                            </p>
                        </div>
                    </div>
                    {/* Card 2: Creamed */}
                    <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="/images/sensory-creamed.webp"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Creamed Honey Texture"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Velvet Cream</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Naturally crystallized Sunflower honey whipped into a buttery, spreadable delight.
                            </p>
                        </div>
                    </div>
                     {/* Card 3: Infused */}
                     <div className="relative group h-[300px] md:h-[400px] 2xl:h-[600px] overflow-hidden rounded-lg border border-white/5">
                        <img 
                            src="/images/sensory-infused.webp"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter"
                            alt="Infused Honey"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 2xl:p-12">
                            <h3 className="text-xl md:text-2xl 2xl:text-4xl font-serif text-white mb-2">Botanical Infusions</h3>
                            <p className="text-gray-400 text-xs md:text-sm 2xl:text-lg font-light">
                                Expertly blended with Ginger, Garlic, or Lemon for a potent wellness boost.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sensory;