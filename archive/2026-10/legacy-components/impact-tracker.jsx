import React from 'react';
import { Recycle } from 'lucide-react';

const ImpactTracker = ({ score, onLogReturn }) => {
  const level = score < 10 ? 'Novice Bee' : score < 50 ? 'Worker Bee' : 'Hive Guardian';
  const nextLevel = score < 10 ? 10 : score < 50 ? 50 : 100;
  const progress = Math.min((score / nextLevel) * 100, 100);

  return (
    <div className="text-center">
      <div className="bg-amber-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
        <span className="text-3xl font-bold text-amber-500 font-serif">{score}</span>
      </div>
      <h3 className="text-2xl font-serif text-white mb-1">{level}</h3>
      <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">Impact Level</p>
      <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mb-8">
        {nextLevel - score} more jars to reach next level
      </p>
      <button
        title="Capture_Return"
        onClick={onLogReturn}
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition-all transform active:scale-95 uppercase text-xs tracking-widest"
      >
        <Recycle size={16} /> Log Jar Return (+1)
      </button>
      <p className="text-[10px] text-gray-500 mt-4 italic">
        * Returns must be verified in-store for point redemption.
      </p>
    </div>
  );
};

export default ImpactTracker;
