import React, { useState, useEffect } from 'react';
import { Users, Sun, ArrowRight, Play, ChevronDown, ShieldCheck } from 'lucide-react';

// SANKOFA ARCHITECTURE: Lowercase paths and named imports per convention
import { VideoModal } from '../../../components/ui/video-modal';
import { ImageCarousel } from '../../../components/ui/image-carousel';
import { VIDEO_SOURCE, HERO_IMAGES } from '../../../data/constants';
import { VIEWS } from '../../../views';

export const Hero = ({ navigate }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [canAutoplayVideo, setCanAutoplayVideo] = useState(false);

  // Network & Viewport Gating Engine:
  // Disables heavy 25MB background video on mobile (< 768px), slow cellular (2G/3G),
  // data-saver mode, or prefers-reduced-motion to preserve viewport performance and mobile data.
  useEffect(() => {
    const evaluateAutoplayEligibility = () => {
      // 1. Viewport constraint: Mobile devices smaller than tablet (< 768px) must never autoplay video
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return false;
      }

      // 2. User accessibility preference: Respect prefers-reduced-motion
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return false;
      }

      // 3. Network Information API constraint: Data Saver or 2G/3G connection
      if (typeof navigator !== 'undefined') {
        const connection =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;

        if (connection) {
          if (connection.saveData) return false;
          const slowTypes = ['slow-2g', '2g', '3g'];
          if (slowTypes.includes(connection.effectiveType)) return false;
        }
      }

      return true;
    };

    setCanAutoplayVideo(evaluateAutoplayEligibility());

    const handleResize = () => {
      setCanAutoplayVideo(evaluateAutoplayEligibility());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll to the legacy story anchor
  const scrollToStory = () => {
    const element = document.getElementById('our-story');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Immediate smooth glide to the Honey Shop collection
  const handleShopClick = () => {
    navigate(VIEWS.HOME, { scrollTo: 'collection' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col pt-24 sm:pt-28 md:pt-32 lg:pt-36 justify-start md:justify-center items-center bg-[#050505]">
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
        {/* Mobile Viewport: Fast-loading, responsive atmospheric carousel */}
        <div className="block md:hidden absolute inset-0">
          <ImageCarousel images={HERO_IMAGES} />
        </div>

        {/* Desktop / Tablet Viewport: Conditional Video Autoplay vs Static High-Res WebP */}
        {canAutoplayVideo ? (
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
        ) : (
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
            style={{ backgroundImage: "url('/images/hero/hero-bg-slide-1.webp')" }}
          />
        )}

        {/* Global Atmosphere: The Onyx Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/30 pointer-events-none" />
      </div>

      {/* --- 3. CONTENT LAYER --- */}
      <div className="relative z-20 text-center px-4 md:px-6 max-w-screen-xl 2xl:max-w-screen-2xl w-full flex flex-col items-center">
        {/* On-Demand Video Trigger: Available whenever video is not autoplaying */}
        {(!canAutoplayVideo || typeof window !== 'undefined') && (
          <div className="mb-4 sm:mb-6 flex justify-center">
            <button
              onClick={() => setPlayVideo(true)}
              title="Watch the harvest film: Evidence of Grace"
              className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-white border border-white/10 hover:bg-white/10 hover:border-amber-500/40 transition-all active:scale-95 shadow-xl"
            >
              <Play size={11} fill="white" className="ml-0.5 text-amber-400" />
              <span>Watch Harvest Film</span>
            </button>
          </div>
        )}

        {/* Super-Headline: Golden Grace Legacy Authority Anchor */}
        <div className="inline-flex items-center gap-2 border border-amber-500/25 bg-amber-500/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 lg:mb-8 animate-fade-in-up shadow-lg">
          <ShieldCheck className="text-amber-400 w-3.5 h-3.5 shrink-0" />
          <span className="text-amber-400 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase font-bold">
            Golden Grace Legacy • Free State Apiary Registry DFS194
          </span>
        </div>

        {/* Primary Display Headline: Legacy Established First */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl text-white mb-6 lg:mb-8 leading-[1.05] md:leading-[0.95] animate-fade-in-up delay-100 drop-shadow-2xl">
          Golden Grace Legacy. <br />
          <span className="italic text-amber-400 font-light underline decoration-amber-500/20 underline-offset-[12px]">
            Grace In Every Drop.
          </span>
        </h1>

        {/* Evocative Stewardship Subtitle */}
        <p className="text-gray-200 max-w-2xl 2xl:max-w-4xl mx-auto mb-8 lg:mb-12 font-light text-base sm:text-lg md:text-xl 2xl:text-2xl leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg px-4">
          Birthed in the uncultivated floral veld of Virginia, Free State. Golden Grace Legacy is a women-led kingdom
          stewardship devoted to ethical apiculture and 100% raw, unheated honey—harvested with patient reverence before
          reaching our boutique seasonal reserves.
        </p>

        {/* Primary CTAs: Immediate Turning Point to Honey Shop while Honoring the Legacy */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 justify-center items-center animate-fade-in-up delay-300 mb-6 lg:mb-10 w-full sm:w-auto px-4">
          <button
            onClick={handleShopClick}
            title="Explore and acquire Golden Grace Honey seasonal harvests"
            className="w-full sm:w-auto bg-amber-500 hover:bg-white text-black px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all shadow-2xl shadow-amber-500/20"
          >
            Enter The Honey Shop
          </button>

          <button
            onClick={scrollToStory}
            title="Discover our founder story and Free State heritage"
            className="flex items-center gap-3 text-white hover:text-amber-400 tracking-[0.3em] text-xs font-black uppercase group active:scale-95 transition-colors py-2"
          >
            The Founder's Calling{' '}
            <span className="bg-white/5 border border-white/10 p-2.5 rounded-full group-hover:bg-amber-400 group-hover:text-black transition-all">
              <ArrowRight size={14} />
            </span>
          </button>
        </div>

        {/* Terroir & Reserve Trust Badges */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-amber-400/80 uppercase mb-8 lg:mb-12 animate-fade-in-up delay-400">
          <span>Strictly Limited Seasonal Quantities</span>
          <span className="text-white/30">•</span>
          <span>Single-Origin Pure Reserve</span>
        </div>

        {/* Impact Cards: Queen Bee Impact & Nature's Pharmacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl lg:max-w-3xl 2xl:max-w-6xl mx-auto animate-fade-in-up delay-500 px-4 md:px-0 w-full mb-8">
          <div
            onClick={scrollToStory}
            title="Learn about our female-led community impact"
            className="backdrop-blur-md border border-white/10 bg-white/5 p-5 lg:p-6 2xl:p-8 rounded-[1.75rem] flex items-center gap-5 transition-all cursor-pointer group hover:border-amber-500/30"
          >
            <div className="bg-amber-500/20 p-3.5 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Users className="text-amber-400 group-hover:text-black w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-lg lg:text-xl 2xl:text-2xl">
                Queen Bee Impact
              </h4>
              <p className="text-gray-400 text-xs lg:text-[11px] 2xl:text-base font-light leading-snug">
                Female-led empowerment & sustainable apiculture in every harvest.
              </p>
            </div>
          </div>

          <div
            onClick={handleShopClick}
            title="Discover the medicinal integrity of raw honey"
            className="backdrop-blur-md border border-white/10 bg-white/5 p-5 lg:p-6 2xl:p-8 rounded-[1.75rem] flex items-center gap-5 transition-all cursor-pointer group hover:border-amber-500/30"
          >
            <div className="bg-amber-500/20 p-3.5 rounded-full group-hover:bg-amber-500 transition-colors flex-shrink-0">
              <Sun className="text-amber-400 group-hover:text-black w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-serif text-lg lg:text-xl 2xl:text-2xl">
                Nature's Pharmacy
              </h4>
              <p className="text-gray-400 text-xs lg:text-[11px] 2xl:text-base font-light leading-snug">
                100% raw, cold-strained unheated enzymes preserving God-given bioactive vitality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Scroll Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-25 hidden md:block">
        <ChevronDown className="text-white" size={24} />
      </div>
    </section>
  );
};

export default Hero;
