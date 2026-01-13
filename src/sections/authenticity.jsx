import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, Check , Lightbulb, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
import { HONEY_TESTS } from '../data/constants'; 
import { DICTIONARY_TERMS } from '../data/constants';

const Authenticity = ({ onNavigate }) => {
  const [openTerm, setOpenTerm] = useState(null);

  const toggleTerm = (index) => {
    setOpenTerm(openTerm === index ? null : index);
  };

  return (
    <section id="authenticity" className="py-24 px-6 bg-transparent relative z-10">
      
      {/* Background Ambience */}
     <div className="absolute inset-0 bg-honeycomb opacity-[0.22] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* PART 1: DID YOU KNOW? */}
        <div className="mb-20">
          <div className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden border bg-amber-900/10 border-amber-500/20">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
             <Lightbulb className="mx-auto text-amber-400 mb-6 w-10 h-10" />
             <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">Did You Know?</h3>
             <p className="text-lg md:text-xl font-light italic leading-relaxed max-w-3xl mx-auto text-amber-100/80">
               "Real honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
             </p>
          </div>
        </div>

        {/* PART 2: AUTHENTICITY CHECK */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Authenticity Check</h2>
            <p className="text-gray-400">Don't take our word for it. Test it yourself.</p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {HONEY_TESTS.map((test, index) => (
              <div key={index} className="min-w-[85vw] md:min-w-0 snap-center p-8 rounded-xl transition-all duration-300 group flex flex-col h-full border bg-white/5 border-white/10 hover:bg-white/10">
                <div className="bg-black/40 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {test.icon}
                </div>
                <h4 className="text-xl font-serif text-white mb-3">{test.title}</h4>
                <p className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">Step 1</p>
                <p className="text-gray-300 text-sm mb-4 min-h-[40px]">{test.instruction}</p>
                <div className="border-t border-white/10 pt-4 mt-auto">
                    <p className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">The Truth</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{test.result}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-1 mt-2 md:hidden">
              <div className="w-1 h-1 rounded-full bg-white/50"></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
          </div>
        </div>

        {/* PART 3: THE DICTIONARY */}
        <div id="authenticity-dictionary" className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <BookOpen className="text-amber-500" />
            <h3 className="text-2xl font-serif text-white">The Dictionary</h3>
          </div>

          <div className="space-y-4 mb-12">
            {DICTIONARY_TERMS.map((item, index) => {
              const isOpen = openTerm === index;
              return (
                <div 
                  key={index}
                  onClick={() => toggleTerm(index)}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 
                    ${isOpen ? 'bg-white/5 border-amber-500/50' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className={`text-lg font-serif ${isOpen ? 'text-amber-400' : 'text-white'}`}>{item.term}</span>
                        <span className="hidden md:inline-block text-[10px] text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded">{item.phonetic}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="text-amber-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                  </div>
                  
                  {isOpen && (
                    <div className="px-5 pb-6 animate-in slide-in-from-top-2 duration-200">
                      <p className="text-white font-medium mb-6 text-lg">"{item.definition}"</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                              <div className="flex items-center gap-2 text-red-400 mb-2 font-bold text-xs uppercase tracking-widest">
                                  <AlertTriangle size={14} /> The Industry Standard
                              </div>
                              <p className="text-sm text-gray-400 leading-relaxed">{item.truth}</p>
                          </div>
                          
                          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                              <div className="flex items-center gap-2 text-green-400 mb-2 font-bold text-xs uppercase tracking-widest">
                                  <Check size={14} /> The Golden Grace Standard
                              </div>
                              <p className="text-sm text-gray-300 leading-relaxed font-medium">{item.ourStandard}</p>
                          </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button 
                onClick={() => onNavigate('education')} 
                className="inline-flex items-center gap-2 bg-amber-500 text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
                Discover the Why <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Authenticity;