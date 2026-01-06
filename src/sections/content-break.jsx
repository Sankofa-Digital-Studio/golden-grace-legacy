import React from 'react';
import { Search, BookOpen } from 'lucide-react';

const ContentBreak = () => (
  <div className="bg-[#121212] py-16 2xl:py-24 border-t border-b border-white/5">
    <div className="max-w-4xl 2xl:max-w-6xl mx-auto px-6 text-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      <div>
        <h3 className="text-amber-500 tracking-widest text-xs 2xl:text-sm font-bold uppercase mb-4">
          Did You Know?
        </h3>
        <p className="text-xl md:text-3xl 2xl:text-5xl font-serif text-white leading-relaxed mb-6">
          "Real honey never spoils. Archaeologists have found pots of honey in ancient Egyptian
          tombs that are over 3,000 years old and still perfectly edible."
        </p>
        <div className="h-1 w-20 bg-amber-500 mx-auto mt-8"></div>
      </div>
      <div className="bg-white/5 p-6 2xl:p-10 rounded-xl border border-white/10 text-left hover:border-amber-500/30 transition-colors">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-amber-500/20 p-3 rounded-full">
            <Search className="text-amber-400 w-6 h-6 2xl:w-8 2xl:h-8" />
          </div>
          <div>
            <h4 className="text-white font-serif text-lg 2xl:text-2xl mb-1">Authenticity Check</h4>
            <p className="text-xs 2xl:text-sm text-gray-400">3 Ways to Spot Real Honey</p>
          </div>
        </div>
        <ul className="text-gray-300 text-sm 2xl:text-lg leading-relaxed mb-4 space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">1.</span>
            <span>
              The Thumb Test: Put a drop on your thumb. If it spreads, it's not pure. Real honey
              stays intact.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">2.</span>
            <span>
              The Water Test: Pure honey settles at the bottom of a glass of water; fake honey
              dissolves immediately.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">3.</span>
            <span>
              The Heat Test: Pure honey caramelizes when heated; fake honey creates bubbles and
              doesn't caramelize.
            </span>
          </li>
        </ul>
        <div className="bg-black/40 p-4 rounded-lg">
          <p className="text-amber-500 text-xs 2xl:text-sm font-bold uppercase mb-1 flex items-center gap-2">
            <BookOpen size={14} /> Dictionary
          </p>
          <p className="text-gray-400 text-xs 2xl:text-base">
            <strong className="text-white">Raw:</strong> Unpasteurized, unheated, and unprocessed.
            Retains all natural enzymes and pollen.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ContentBreak;
