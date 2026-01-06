import React from 'react';
import { ShieldCheck, Award, Heart, ArrowRight } from 'lucide-react';

const TrustBar = () => (
  <div className="bg-[#0a0a0a] border-y border-white/5 py-6 md:py-8 2xl:py-12 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-amber-500/5 blur-3xl"></div>
    <div className="max-w-[1920px] mx-auto px-6 relative z-10">
      <div className="flex md:justify-center overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-8 md:gap-16 2xl:gap-32 pb-4 md:pb-0 no-scrollbar pr-6">
        <div className="flex items-center gap-3 snap-center flex-shrink-0">
          <ShieldCheck className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
          <div className="text-left">
            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">
              Dept. Agriculture
            </p>
            <p className="text-gray-500 text-[10px] 2xl:text-xs">Reg: DFS194</p>
          </div>
        </div>
        <div className="w-px h-8 bg-white/10 hidden md:block"></div>
        <div className="flex items-center gap-3 snap-center flex-shrink-0">
          <Award className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
          <div className="text-left">
            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">
              B-BBEE Compliant
            </p>
            <p className="text-gray-500 text-[10px] 2xl:text-xs">Women-Led Enterprise</p>
          </div>
        </div>
        <div className="w-px h-8 bg-white/10 hidden md:block"></div>
        <div className="flex items-center gap-3 snap-center flex-shrink-0">
          <Heart className="text-amber-500 w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10" />
          <div className="text-left">
            <p className="text-white text-xs 2xl:text-sm font-bold uppercase tracking-wider">
              Ethically Sourced
            </p>
            <p className="text-gray-500 text-[10px] 2xl:text-xs">Guardian Beekeeping</p>
          </div>
        </div>
      </div>
      <div className="md:hidden text-center mt-2 flex justify-center items-center gap-2 text-[10px] text-white/30 animate-pulse">
        <span>Swipe</span> <ArrowRight size={10} />
      </div>
    </div>
  </div>
);

export default TrustBar;
