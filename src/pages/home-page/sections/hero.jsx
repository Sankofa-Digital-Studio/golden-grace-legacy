import React, { useState } from 'react';
import { CheckCircle, Users, Sun, ArrowRight, Play, ChevronDown } from 'lucide-react';

// SANKOFA ARCHITECTURE: Lowercase paths and named imports per convention
import { VideoModal } from '../../../components/ui/video-modal';
import { ImageCarousel } from '../../../components/ui/image-carousel';
import { VIDEO_SOURCE, HERO_IMAGES } from '../../../data/constants';
import { VIEWS } from '../../../views';

export const Hero = ({ navigate }) => {
  const [playVideo, setPlayVideo] = useState(false);

  // Logic: Direct smooth scroll to the story anchor
  const scrollToStory = () => {
    const element = document.getElementById('our-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Logic: Navigate to collection reveal
  const handleCtaClick = () => {
    navigate(VIEWS.HOME, { scrollTo: 'collection' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col pt-32 md:pt-40 lg:pt-48 justify-start md:justify-center items-center bg-[#050505]">
      {/* --- 1. MODAL LAYER (The Video Sanctuary) --- */}
      {playVideo && (
        <VideoModal
          videoSrc={VIDEO_SOURCE}
          poster="/images/harvest/harvest-11.webp"
          onClose={() => setPlayVideo(false)}
        />
      )}

      {/* --- 2. BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: Atmospheric Image Carousel */}
        <div className="block md:hidden absolute inset-0">
          <ImageCarousel images={HERO_IMAGES} />
        </div>

        {/* Desktop: Cinematic Video Loop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
          poster="/images/hero/hero-bg-slide-1.webp"
        >
          {VIDEO_SOURCE && <source src={VIDEO_SOURCE} type="video/mp4" />}
        </video>

        {/* Global Atmosphere: The Onyx Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30 pointer-events-none" />
      </div>

      {/* --- 3. CONTENT LAYER --- */}
      <div className="relative z-20 text-center px-4 md:px-6 max-w-screen-xl 2xl:max-w-screen-2xl w-full flex flex-col items-center">
        {/* Mobile-Only Video Trigger */}
        <div className="md:hidden mb-8 flex justify-center">
          <button
            onClick={() => setPlayVideo(true)}
            title="Watch the harvest film: Evidence of Grace"
            className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white border border-white/10 hover:bg-white/10 transition-all animate-pulse active:scale-95 shadow-2xl"
          >
            <Play size={12} fill="white" className="ml-0.5" /> Watch Film
          </button>
        </div>

        {/* Purity Badge: Restored with better desktop spacing */}
        <button
          onClick={handleCtaClick}
          title="Explore the reserve collection"
          className="inline-flex items-center gap-2 border border-amber-500/20 bg-amber-500/5 backdrop-blur-md px-5 py-2 rounded-full mb-8 lg:mb-12 animate-fade-in-up hover:bg-amber-500/10 transition-colors group active:scale-95"
        >
          <CheckCircle className="text-amber-400 w-4 h-4" />
          <span className="text-amber-400 text-[10px] tracking-[0.5em] uppercase font-black group-hover:text-amber-300">
            100% Raw & Authentic
          </span>
        </button>

        {/* Primary Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl text-white mb-8 lg:mb-12 leading-[1] md:leading-[0.9] animate-fade-in-up delay-100 drop-shadow-2xl">
          Grace In{' '}
          <span className="italic text-amber-400 font-light underline decoration-amber-500/20 underline-offset-[12px]">
            Every
          </span>{' '}
          <br /> Drop
        </h1>

        {/* Narrative Sub-copy */}
        <p className="text-gray-200 max-w-2xl 2xl:max-w-4xl mx-auto mb-12 lg:mb-16 font-light text-lg md:text-xl 2xl:text-3xl leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg px-4">
          Pure South African Goodness. Ethically sourced from the vibrant landscapes of the Free
          State. Non-pasteurized, and harvested with unbothered integrity.
        </p>

        {/* Primary CTAs: Provoking Label Update */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center animate-fade-in-up delay-300 mb-16 lg:mb-24 w-full md:w-auto px-4">
          <button
            onClick={handleCtaClick}
            title="Secure your portion from our boutique collection"
            className="w-full md:w-auto bg-amber-500 text-black px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-white active:scale-90 transition-all shadow-2xl shadow-amber-500/10"
          >
            Enter the Reserve
          </button>

          <button
            onClick={scrollToStory}
            title="Deepen your connection with our legacy"
            className="flex items-center gap-3 text-white hover:text-amber-400 tracking-[0.4em] text-xs font-black uppercase group active:scale-95 transition-colors"
          >
            The Legacy{' '}
            <span className="bg-white/5 border border-white/10 p-3 rounded-full group-hover:bg-amber-400 group-hover:text-black transition-all">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>

        {/* RESTORED & SCALED: Queen Bee Impact & Nature's Pharmacy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl lg:max-w-3xl 2xl:max-w-6xl mx-auto animate-fade-in-up delay-500 px-4 md:px-0 w-full mb-12">
          <div
            title="Learn about our female-led community impact"
            className="backdrop-blur-md border border-white/10 bg-white/5 p-6 lg:p-6 2xl:p-10 rounded-[2rem] flex items-center gap-6 transition-all cursor-pointer group hover:border-amber-500/30"
          >
            <div className="bg-amber-500/20 p-4 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Users className="text-amber-400 group-hover:text-black w-6 h-6 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-xl lg:text-xl 2xl:text-3xl">
                Queen Bee Impact
              </h4>
              <p className="text-gray-400 text-xs lg:text-[10px] 2xl:text-lg font-light leading-snug">
                Female-led empowerment in every jar.
              </p>
            </div>
          </div>

          <div
            title="Discover the medicinal integrity of raw honey"
            className="backdrop-blur-md border border-white/10 bg-white/5 p-6 lg:p-6 2xl:p-10 rounded-[2rem] flex items-center gap-6 transition-all cursor-pointer group hover:border-amber-500/30"
          >
            <div className="bg-amber-500/20 p-4 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Sun className="text-amber-400 group-hover:text-black w-6 h-6 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-xl lg:text-xl 2xl:text-3xl">
                Nature's Pharmacy
              </h4>
              <p className="text-gray-400 text-xs lg:text-[10px] 2xl:text-lg font-light leading-snug">
                Rich in antioxidants and natural healing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Centered Scroll Hint positioned to not overlap cards on laptop screens */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-20 hidden md:block">
        <ChevronDown className="text-white" size={28} />
      </div>
    </section>
  );
};

export default Hero;
