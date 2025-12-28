import React from 'react';
import { Hexagon } from 'lucide-react';

const Loader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white">
    <div className="relative">
      <Hexagon className="text-amber-500 w-16 h-16 animate-spin-slow" strokeWidth={1.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-amber-400/20 rounded-full animate-pulse"></div>
      </div>
    </div>
    <p className="mt-4 text-amber-500 font-serif tracking-widest text-sm animate-pulse">
      LOADING HIVE...
    </p>
  </div>
);

export default Loader;
