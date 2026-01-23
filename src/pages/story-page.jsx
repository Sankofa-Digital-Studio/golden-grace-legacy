import { useEffect } from 'react';
import { Users, Sparkles, Heart, MapPin, ArrowLeft } from 'lucide-react';
import SectionHeading from '../components/ui/section-heading';
import OptimizedImage from '../components/ui/optimized-image';

export const StoryPage = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-[#050505] text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 1. HERO HEADER */}
      <header className="relative h-[60vh] md:h-[70vh] flex items-end pb-20 px-6">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/harvest/harvest-23.webp"
            alt="Sunrise over the Virginia honey belts"
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" /> */}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
            Grace is <br />
            <span className="italic text-amber-400 font-light">The Foundation.</span>
          </h1>
        </div>
      </header>

      {/* 2. THE FOUNDER'S JOURNEY */}
      <div className="absolute inset-0 bg-honeycomb opacity-[0.04] pointer-events-none -z-10" />
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12 ">
          <SectionHeading
            pre="The Hand Behind the Hive"
            title="The Founder's"
            italic="Testimony"
            sub="A journey that began with five hives and an uncompromising commitment to God's providence."
          />
          <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
            <p>
              In 2022, amidst the quiet landscapes of Virginia, Free State, Golden Grace was birthed
              from a simple realization: the world had forgotten what real honey tasted like. More
              importantly, it had forgotten the prayer required to harvest it.
            </p>
            <p>
              Our founder set out not to build a factory, but to steward a sanctuary. Every drop you
              hold is a result of manual labor, heat-guarded processing, and a deep respect for the
              bees—the master architects provided by Him.
            </p>
          </div>

          {/* The Spiritual Anchor */}
          <div className="p-10 bg-amber-500/5 border border-amber-500/20 rounded-[2.5rem] relative group">
            <Sparkles
              size={40}
              className="text-amber-500/20 absolute top-8 right-8 group-hover:scale-110 transition-transform"
            />
            <h4 className="text-white font-serif text-2xl mb-4">A Higher Calling</h4>
            <p className="text-gray-400 text-sm leading-relaxed italic">
              "We do not own these fields; we are merely the guardians of what God has placed here.
              When we say Golden Grace, we refer to the unmerited favor He has shown us through the
              abundance of the Veld."
            </p>
          </div>
        </div>

        <div className="relative pt-12 lg:pt-0">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
            <OptimizedImage
              src="/images/harvest/harvest-6.webp"
              alt="Manual harvest detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY & WOMEN EMPOWERMENT */}
      <section className="py-24 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <SectionHeading
            center
            pre="Impact Beyond the Jar"
            title="Empowering the"
            italic="Queen Bee"
            sub="A movement led by women, for the community of Virginia and beyond."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users />,
                label: 'Female Led',
                desc: 'Training local women in traditional, sustainable beekeeping.',
              },
              {
                icon: <MapPin />,
                label: 'Virginia Core',
                desc: 'Investing directly into the Free State economy.',
              },
              {
                icon: <Heart />,
                label: 'Health Focus',
                desc: 'Ensuring raw nutrition reaches every South African home.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 bg-black/40 border border-white/10 rounded-[2rem] hover:border-amber-500/30 transition-all group"
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  {item.icon}
                </div>
                <h4 className="text-white font-serif text-xl mb-3">{item.label}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER PIVOT */}
      <footer className="py-32 text-center">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.6em] mb-8 animate-pulse">
          Experience the blessing
        </p>
        <button
          onClick={() => onNavigate('collection')}
          className="text-4xl md:text-7xl font-serif italic text-white hover:text-amber-400 transition-colors"
        >
          Shop the Collection
        </button>
      </footer>
    </main>
  );
};

export default StoryPage