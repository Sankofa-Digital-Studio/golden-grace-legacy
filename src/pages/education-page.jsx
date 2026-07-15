import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/section-heading';
import { OptimizedImage } from '../components/ui/optimized-image';
import { APPLICATIONS } from '../data/constants';

export const EducationHub = ({ onBack, onNavigate }) => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTestimonySubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmissionForm(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white animate-in fade-in duration-1000 pb-24">
      {/* 1. HUB HERO */}
      <header className="relative h-[60vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/sensory/infused-botanicals.webp"
            alt="Macro photography of Aloe Ferox in the Free State"
            className="w-full h-full object-cover opacity-20 scale-110 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-6">
          <button
            onClick={onBack}
            title="Return to the Hive Home"
            className="inline-flex items-center gap-2 text-amber-500 uppercase text-[10px] font-black tracking-[0.5em] mb-4 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft size={14} /> Back to Hive
          </button>

          <h1 className="text-5xl md:text-9xl font-serif leading-none tracking-tighter">
            The Hub <br />
            <span className="italic text-amber-400 font-light">of Grace</span>
          </h1>
          <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase font-black max-w-xs mx-auto">
            Intelligence • Application • Community
          </p>
        </div>
      </header>

      {/* 2. THE ACADEMY (Shortened for brevity in this block) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionHeading
          pre="Hive Intelligence"
          title="The Academy"
          italic="Sessions"
          sub="Evidence-based insights into the biological wonder He created within the hive."
        />
        {/* ... Academy Cards Logic (previously defined) ... */}
      </section>

      {/* 3. NEW: PRACTICAL ALCHEMY (Applications) */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            center
            pre="The Practical Alchemy"
            title="Applications of"
            italic="Grace"
            sub="Beyond the taste lies a world of utility. Here is how you apply the harvest to your daily life."
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
                        <CheckCircle2 size={10} className="text-amber-500/40" /> {item.name}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed font-light pl-4">
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
            sub="Real frames and real testimonies from the Golden Grace family."
          />
          <button
            onClick={() => setShowSubmissionForm(true)}
            title="Share your honey testimony"
            className="px-8 py-4 bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-white transition-all active:scale-95"
          >
            Share Your Grace
          </button>
        </div>

        <div className="columns-1 md:columns-3 gap-8 space-y-8">
          {/* ... Community Feed Items (as previously defined) ... */}
        </div>
      </section>

      {/* SUBMISSION MODAL */}
      {showSubmissionForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
          {/* ... Modal Logic (as previously defined) ... */}
        </div>
      )}
    </main>
  );
};

export default EducationHub;
