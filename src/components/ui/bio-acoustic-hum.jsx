import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Info } from 'lucide-react';

export const BioAcousticHum = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtx = useRef(null);
  const oscillator = useRef(null);
  const gainNode = useRef(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start Hive Hum (432Hz resonance)
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      oscillator.current = audioCtx.current.createOscillator();
      gainNode.current = audioCtx.current.createGain();
      
      oscillator.current.type = 'sine';
      oscillator.current.frequency.setValueAtTime(432, audioCtx.current.currentTime);
      gainNode.current.gain.setValueAtTime(0, audioCtx.current.currentTime);
      gainNode.current.gain.linearRampToValueAtTime(0.05, audioCtx.current.currentTime + 1); // Soft fade in
      
      oscillator.current.connect(gainNode.current);
      gainNode.current.connect(audioCtx.current.destination);
      oscillator.current.start();
      setIsPlaying(true);
    } else {
      // Stop Hum
      if (gainNode.current) {
        gainNode.current.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 0.5);
        setTimeout(() => {
          oscillator.current?.stop();
          audioCtx.current?.close();
        }, 500);
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => { oscillator.current?.stop(); audioCtx.current?.close(); };
  }, []);

  return (
    <div className="min-w-[90vw] md:min-w-0 snap-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 h-[500px] flex flex-col items-center justify-between relative group overflow-hidden transition-all duration-700 hover:border-amber-500/30">
      <div className="text-center space-y-1 z-10 mb-4">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest">Hive Resonance</p>
        <h4 className="text-xl font-serif text-white italic">Bio-Acoustic Hum</h4>
      </div>
       <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full flex items-center gap-2 z-20">
         <Info size={12} className="text-amber-500" />
         <span className="text-[9px] text-white uppercase font-bold tracking-widest">Listen to the frequency of the workers.</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        <div className={`absolute w-40 h-40 bg-amber-500/5 rounded-full blur-3xl transition-all duration-700 ${isPlaying ? 'scale-[2.5] opacity-100 animate-pulse' : 'scale-100 opacity-0'}`} />
        <button onClick={toggleAudio} title={isPlaying ? "Mute Hive soundscape" : "Play meditative Hive frequency"} className={`relative z-20 w-28 h-28 rounded-full border flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-amber-500 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.5)] scale-110 active:scale-95' : 'bg-white/5 border-white/10 hover:border-amber-500/50 active:scale-90'}`}>
          {isPlaying ? <Volume2 className="text-black animate-bounce" size={40} /> : <VolumeX className="text-gray-500" size={40} />}
        </button>
        <div className="absolute bottom-4 flex items-end gap-1.5 h-16 pointer-events-none">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <div key={i} className={`w-1.5 bg-amber-500/30 rounded-full transition-all duration-500 ${isPlaying ? 'animate-vibration' : 'h-1'}`} style={{ animationDelay: `${i * 0.08}s`, height: isPlaying ? `${40 + Math.random() * 60}%` : '4px' }} />
            ))}
        </div>
      </div>
      <div className="text-center px-4 z-10">
        <p className="text-gray-400 text-xs leading-relaxed italic mb-2 pr-4">"The 432Hz meditative hum of a healthy colony in peak summer forage."</p>
        <span className="text-[9px] text-amber-500/60 font-black uppercase tracking-[0.2em] border border-amber-500/10 px-2 py-0.5 rounded">Programmatic Audio</span>
      </div>
    </div>
  );
};
export default BioAcousticHum;
