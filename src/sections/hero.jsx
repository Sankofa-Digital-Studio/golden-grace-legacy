// src/sections/hero.jsx
import React, { useState } from 'react';
import { CheckCircle, Users, Sun, ArrowRight, Play, ChevronDown } from 'lucide-react';
import VideoModal from '../components/common/video-modal';
import VIDEO_SOURCE from '../data/constants';
import { HERO_IMAGES } from '../data/constants';
import ImageCarousel from '../components/ui/image-carousel';

const Hero = ({ navigate }) => {
  const [playVideo, setPlayVideo] = useState(false);

  const scrollToStory = () => {
    document.getElementById('our-origins')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col pt-32 md:pt-0 justify-start md:justify-center items-center">
      {/* --- 1. MODAL LAYER (NEW) --- */}
      {playVideo && <VideoModal videoSrc={VIDEO_SOURCE} onClose={() => setPlayVideo(false)} />}

      {/* --- 2. BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        
        {/* Mobile: Image Carousel */}
        {/* We use the imported HERO_IMAGES here */}
        <div className="block md:hidden absolute inset-0">
            <ImageCarousel images={HERO_IMAGES} />
        </div>

        {/* Desktop: Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hidden md:block w-full h-full object-cover opacity-60"
          poster="/images/hero-bg-slide-1.webp"
        >
          <source src={VIDEO_SOURCE} type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30 pointer-events-none"></div>
      </div>

      {/* --- 3. CONTENT LAYER --- */}
      <div className="relative z-20 text-center px-4 md:px-6 max-w-screen-xl 2xl:max-w-screen-2xl w-full flex flex-col items-center">
        {/* Mobile 'Watch Film' Button (NEW) */}
        <div className="md:hidden mb-6 flex justify-center">
          <button
            onClick={() => setPlayVideo(true)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs text-white border border-white/20 hover:bg-white/20 transition-colors animate-pulse"
          >
            <Play size={12} fill="white" /> Watch Film
          </button>
        </div>

        {/* Existing Content Preserved */}
        <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8 animate-fade-in-up">
          <CheckCircle className="text-amber-400 w-3 h-3 md:w-4 md:h-4 2xl:w-5 2xl:h-5" />
          <span className="text-amber-400 text-[10px] md:text-xs 2xl:text-sm tracking-widest uppercase font-bold">
            100% Raw & Authentic
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl text-white mb-6 md:mb-8 leading-[1.1] animate-fade-in-up delay-100 drop-shadow-2xl">
          Grace In <span className="italic text-amber-400 font-light">Every</span> <br />
          Drop
        </h1>

        <p className="text-gray-100 max-w-md md:max-w-2xl 2xl:max-w-4xl mx-auto mb-8 md:mb-12 font-light text-base md:text-lg 2xl:text-2xl leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg text-shadow-sm px-4">
          Pure South African Goodness. Ethically sourced from the vibrant landscapes of the Free
          State. Non-pasteurized, and harvested with integrity.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center animate-fade-in-up delay-300 w-full md:w-auto mb-16 px-4">
          <button
            onClick={() => navigate('collection')}
            className="w-full md:w-auto bg-amber-500 text-black px-10 py-4 font-bold tracking-widest hover:bg-white transition-all duration-300 active:scale-95 text-sm md:text-base 2xl:text-lg shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]"
          >
            SHOP THE COLLECTION
          </button>
          <button
            onClick={scrollToStory}
            className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors tracking-widest text-xs md:text-sm 2xl:text-lg uppercase group py-2 drop-shadow-md"
          >
            Our Story
            <span className="bg-white/10 p-2 rounded-full group-hover:bg-amber-400 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </span>
          </button>
        </div>

        {/* Feature Grid (Preserved) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl 2xl:max-w-6xl mx-auto animate-fade-in-up delay-500 px-4 md:px-0 w-full">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 p-4 2xl:p-6 rounded-lg flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="bg-amber-500/20 p-3 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Users className="text-amber-400 group-hover:text-black w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-lg 2xl:text-2xl">Queen Bee Impact</h4>
              <p className="text-gray-400 text-xs 2xl:text-base">
                Female-led empowerment in every jar.
              </p>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md border border-white/10 p-4 2xl:p-6 rounded-lg flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="bg-amber-500/20 p-3 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Sun className="text-amber-400 group-hover:text-black w-5 h-5 md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-lg 2xl:text-2xl">Nature's Pharmacy</h4>
              <p className="text-gray-400 text-xs 2xl:text-base">
                Rich in antioxidants, enzymes, and natural healing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <ChevronDown className="text-white/50 w-8 h-8 2xl:w-12 2xl:h-12" />
      </div>
    </section>
  );
};

export default Hero;
