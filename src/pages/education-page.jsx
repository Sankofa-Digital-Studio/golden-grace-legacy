import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Heart,
  Droplets,
  Thermometer,
  ShieldCheck,
  X,
  MessageCircle,
  Send,
  Check,
} from 'lucide-react';
import { SectionHeading } from '../components/ui/section-heading';
import { OptimizedImage } from '../components/ui/optimized-image';
import { APPLICATIONS } from '../data/constants';
import { VIEWS } from '../views';

const ACADEMY_LESSONS = [
  {
    icon: <Thermometer size={22} className="text-amber-400" />,
    badge: 'Enzyme Vitality',
    title: 'The 35°C Heat Ceiling',
    summary:
      'Why industrial honey is dead syrup. Active diastase and invertase enzymes degrade permanently when heated above hive temperatures.',
    insight:
      'Golden Grace harvests are strictly cold-strained by gravity. Zero pasteurization, preserving natural bio-active enzymes.',
  },
  {
    icon: <Droplets size={22} className="text-amber-400" />,
    badge: 'Moisture Threshold',
    title: 'The 18% Moisture Law',
    summary:
      'Bees fan their wings until moisture drops below 18%, creating an osmotic environment where harmful bacteria cannot survive.',
    insight:
      'We only pull frames where honey is 100% capped by bees, ensuring natural stability without artificial dehydration.',
  },
  {
    icon: <Sparkles size={22} className="text-amber-400" />,
    badge: 'Floral Terroir',
    title: 'Indigenous Free State Flora',
    summary:
      'The bioactive profile of honey reflects its soil. From medicinal Aloe Ferox to veld wildflowers, each jar carries regional terroir.',
    insight:
      'Single-origin reserves from Virginia and Welkom apiaries are never blended with foreign honey or commercial cane syrup.',
  },
  {
    icon: <ShieldCheck size={22} className="text-amber-400" />,
    badge: 'Hive Sovereignty',
    title: 'Propolis & Comb Integrity',
    summary:
      'Propolis is the immune barrier of the colony—a resinous botanical shield rich in flavonoids and antimicrobial terpenes.',
    insight:
      'Guardian beekeeping leaves natural comb intact and never removes the bees’ essential winter reserve.',
  },
];

const COMMUNITY_TESTIMONIES = [
  {
    quote:
      'The taste of the Aloe Ferox Reserve reminds me of honey straight from the comb in my childhood. You can instantly feel the thickness and living enzymes.',
    author: 'Dr. M. van der Merwe',
    location: 'Bloemfontein, Free State',
    verified: 'Aloe Ferox Reserve 500g',
  },
  {
    quote:
      'Our household completely switched from store-bought honey to Golden Grace. The transparency, women-led initiative, and DFS194 traceability make it sovereign.',
    author: 'Keketso M.',
    location: 'Maseru, Lesotho',
    verified: 'Daily Squeeze Flask',
  },
  {
    quote:
      'As an endurance cyclist, raw honey is my primary fuel. Golden Grace Veld Wildflower gives steady, clean energy with zero stomach distress.',
    author: 'Sipho N.',
    location: 'Johannesburg, Gauteng',
    verified: 'Veld Wildflower Reserve',
  },
];

export const EducationHub = ({ onBack, onNavigate }) => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', testimony: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReturn = () => {
    if (onBack) {
      onBack();
    } else if (onNavigate) {
      onNavigate(VIEWS.HOME);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.testimony) return;
    setSubmitted(true);
  };

  const resetModal = () => {
    setShowSubmissionForm(false);
    setSubmitted(false);
    setFormData({ name: '', location: '', testimony: '' });
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white animate-in fade-in duration-1000 pb-24">
      {/* 1. HUB HERO */}
      <header className="relative h-[60vh] md:h-[65vh] flex items-center justify-center border-b border-white/5 overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/sensory/infused-botanicals.webp"
            alt="Macro photography of Aloe Ferox in the Free State"
            className="w-full h-full object-cover opacity-20 scale-110 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
          <button
            onClick={handleReturn}
            title="Return to the Hive Home"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-400 hover:text-white transition-all text-xs font-mono uppercase tracking-widest mb-4 active:scale-95 shadow-xl backdrop-blur-md"
          >
            <ArrowLeft size={14} /> Back to Storefront
          </button>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-none tracking-tighter">
            The Hub <br />
            <span className="italic text-amber-400 font-light">of Grace.</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm tracking-[0.35em] uppercase font-mono max-w-md mx-auto">
            Intelligence • Application • Community
          </p>
        </div>
      </header>

      {/* 2. THE ACADEMY SESSIONS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionHeading
          pre="Hive Intelligence"
          title="The Academy"
          italic="Sessions"
          sub="Evidence-based biological realities of unadulterated raw honey. What separates true hive medicine from commercial sucrose."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {ACADEMY_LESSONS.map((lesson, idx) => (
            <div
              key={idx}
              className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-7 space-y-5 hover:border-amber-500/40 transition-all group flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-500/5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    {lesson.icon}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {lesson.badge}
                  </span>
                </div>
                <h4 className="text-xl font-serif text-white group-hover:text-amber-400 transition-colors">
                  {lesson.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {lesson.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest block font-bold">
                  Golden Grace Standard:
                </span>
                <p className="text-gray-300 text-[11px] leading-relaxed italic">
                  "{lesson.insight}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRACTICAL ALCHEMY (Applications) */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            center
            pre="The Practical Alchemy"
            title="Applications of"
            italic="Grace"
            sub="Beyond the taste lies biological utility. How to apply raw, enzyme-active honey into daily wellness rituals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {APPLICATIONS.map((app, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 space-y-8 hover:border-amber-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                    {app.icon}
                  </div>
                  <span className="text-gray-600 text-[8px] font-black uppercase tracking-widest">
                    Guide {i + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">
                    {app.category}
                  </p>
                  <h4 className="text-2xl font-serif text-white">{app.title}</h4>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  {app.items.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-amber-500" /> {item.name}
                      </p>
                      <p className="text-gray-400 text-xs leading-relaxed font-light pl-5">
                        {item.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE GATHERING (Community Wall) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <SectionHeading
            pre="The Collective Witness"
            title="The"
            italic="Gathering"
            sub="Real testimonies and culinary experiences from households enjoying Golden Grace reserves."
          />
          <button
            onClick={() => setShowSubmissionForm(true)}
            title="Share your honey testimony"
            className="px-8 py-4 bg-amber-500 hover:bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full transition-all active:scale-95 shadow-xl shadow-amber-500/10 shrink-0"
          >
            Share Your Grace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMUNITY_TESTIMONIES.map((testimony, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6 flex flex-col justify-between hover:border-amber-500/30 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Sparkles size={14} />
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
                    {testimony.verified}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic font-light">
                  "{testimony.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="text-white font-semibold">{testimony.author}</p>
                  <p className="text-gray-500 text-[10px]">{testimony.location}</p>
                </div>
                <Heart size={14} className="text-amber-500/40 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM EXIT & CONVERSION BAR */}
      <div className="mt-12 pt-16 border-t border-white/5 text-center space-y-6 px-6">
        <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.4em]">
          Knowledge Applied • Pure Unheated Reserves
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReturn}
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white uppercase tracking-widest transition-colors py-3 px-6 rounded-full border border-white/10 hover:border-white/30"
          >
            <ArrowLeft size={14} /> Back to Storefront
          </button>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate(VIEWS.HOME, { scrollTo: 'collection' });
              } else {
                handleReturn();
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-black text-black bg-amber-500 hover:bg-white uppercase tracking-widest transition-all py-3 px-8 rounded-full shadow-lg shadow-amber-500/20 active:scale-95"
          >
            Taste In The Honey Shop →
          </button>
        </div>
      </div>

      {/* SUBMISSION MODAL */}
      {showSubmissionForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative max-w-lg w-full bg-[#0a0a0a] border border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-amber-500/10 space-y-6">
            <button
              onClick={resetModal}
              title="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                  <Check size={28} />
                </div>
                <h3 className="text-2xl font-serif text-white">Thank You for Your Testimony</h3>
                <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto">
                  Your reflection has been submitted to the hive steward. We cherish the blessing
                  shared by our community.
                </p>
                <button
                  onClick={resetModal}
                  className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all"
                >
                  Return to Hub
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-amber-500 text-[10px] font-mono uppercase tracking-[0.3em] font-bold">
                    Community Reflection
                  </span>
                  <h3 className="text-2xl font-serif text-white">Share Your Grace</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Witness how pure Free State honey has blessed your home, health, or palate.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maria Botha"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
                      City / Region
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Virginia, Free State"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1">
                      Your Testimony / Experience
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.testimony}
                      onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                      placeholder="Share your experience with the harvest..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-amber-500/10"
                  >
                    <Send size={14} />
                    <span>Submit Testimony</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default EducationHub;
