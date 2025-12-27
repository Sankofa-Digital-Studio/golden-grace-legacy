import React from 'react';

const Founder = () => (
    <section id="the-visionary" className="py-16 md:py-20 bg-gradient-to-br from-[#121212] to-[#050505] relative border-t border-white/5">
         <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 2xl:gap-20">
                <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-square bg-[#0a0a0a] rounded-full overflow-hidden border-4 border-amber-500/20 relative">
                    <img src="/images/story.webp" className="object-cover w-full h-full golden-filter transition-all duration-500 hover:scale-105" style={{ objectPosition: 'center 20%', padding: '20px 0 0 0', background: '#1a1a1a' }} alt="Grace Thoso" loading="lazy" />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                    <h4 className="text-amber-500 tracking-[0.2em] uppercase text-xs font-bold mb-4">The Managing Director</h4>
                    <h2 className="text-3xl md:text-5xl 2xl:text-7xl font-serif text-white mb-6">Grace Thoso</h2>
                    <p className="text-gray-400 text-base md:text-lg 2xl:text-2xl leading-relaxed italic mb-8">"Grace is not merely a leader; she is a phenomenal force. A woman of unwavering faith who serves actively in the five-fold ministry, and a dedicated life coach helping others attain their full potential."</p>
                    <div className="flex flex-col md:flex-row gap-8 text-sm 2xl:text-lg text-gray-500">
                         <div><strong className="text-white block mb-1">Vision</strong><span>To set benchmarks for unparalleled quality.</span></div>
                         <div><strong className="text-white block mb-1">Faith</strong><span>Serving actively in ministry and business.</span></div>
                    </div>
                </div>
            </div>
         </div>
    </section>
);

export default Founder;