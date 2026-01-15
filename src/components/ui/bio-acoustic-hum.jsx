import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';
import OptimizedImage from '../ui/optimized-image';
const BioAcousticHum = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtx = useRef(null);
  const oscillator = useRef(null);
  const gainNode = useRef(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      oscillator.current = audioCtx.current.createOscillator();
      gainNode.current = audioCtx.current.createGain();
      oscillator.current.type = 'sine';
      oscillator.current.frequency.setValueAtTime(432, audioCtx.current.currentTime);
      gainNode.current.gain.setValueAtTime(0, audioCtx.current.currentTime);
      gainNode.current.gain.linearRampToValueAtTime(0.04, audioCtx.current.currentTime + 1);
      oscillator.current.connect(gainNode.current);
      gainNode.current.connect(audioCtx.current.destination);
      oscillator.current.start();
      setIsPlaying(true);
    } else {
      if (gainNode.current) {
        gainNode.current.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 0.5);
        setTimeout(() => { oscillator.current?.stop(); audioCtx.current?.close(); }, 500);
      }
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center relative rounded-[2.5rem] overflow-hidden h-[540px] flex flex-col items-center justify-between group border border-white/10 transition-all duration-700 hover:border-amber-500/40">
      
      {/* VISUAL SOUL: Velvet Cream Texture */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src="/images/sensory/creamed-goodness.webp" 
          alt="Creamed Honey Texture" 
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] opacity-30 golden-filter" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="text-center space-y-1 z-10 pt-8">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Living Frequency</p>
        <h4 className="text-xl font-serif text-white italic">The Bio-Acoustic Hum</h4>
      </div>
      
      <div className="bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Listen to the colony's vibration.</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10">
        <div className={`absolute w-40 h-40 bg-amber-500/10 rounded-full blur-3xl transition-all duration-700 ${isPlaying ? 'scale-[2.5] opacity-100 animate-pulse' : 'scale-100 opacity-0'}`} />
        <button onClick={toggleAudio} title={isPlaying ? "Stop Hive Hum" : "Play Hive Hum"} className={`relative z-20 w-24 h-24 rounded-full border flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-amber-500 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110' : 'bg-white/10 backdrop-blur-md border-white/20 hover:border-amber-500/50'}`}>
          {isPlaying ? <Volume2 className="text-black" size={32} /> : <VolumeX className="text-gray-400" size={32} />}
        </button>
      </div>

      <div className="w-full p-8 z-10 bg-black/40 backdrop-blur-md">
        <p className="text-gray-300 text-xs text-center italic">"The meditative 432Hz hum of a healthy colony."</p>
      </div>
    </div>
  );
};

export default BioAcousticHum;
