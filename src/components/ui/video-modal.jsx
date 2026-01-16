import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Square, 
  Activity, Info 
} from 'lucide-react';
import BeeCloseButton from './BeeCloseButton';


const VideoModal = ({ videoSrc, poster, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(VIDEO_CHAPTERS[0]);

  // INDUSTRIAL RULE: Prevent background scroll when immersive is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((current / duration) * 100);

    // Dynamic Chapter Tracking
    const currentChapter = [...VIDEO_CHAPTERS].reverse().find(c => current >= c.time);
    if (currentChapter && currentChapter.id !== activeChapter.id) {
        setActiveChapter(currentChapter);
    }
  };

  const seekToChapter = (time) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    if (!isPlaying) togglePlay();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-0 md:p-6 overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. THE VIEWPORT CONTAINER */}
      <div className="relative w-full h-full md:max-w-5xl md:h-auto md:aspect-video bg-black rounded-none md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group">
        
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover md:object-contain"
          onClick={togglePlay}
          title="Golden Grace Harvest Documentary"
        />

        {/* 2. TOP INTERFACE: Brand Exit & Chapter Info */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30 bg-gradient-to-b from-black/90 to-transparent">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Movement: {activeChapter.title}</p>
            </div>
            <h3 className="text-white font-serif italic text-lg opacity-90">{activeChapter.desc}</h3>
          </div>
          
          {/* Top Brand Exit */}
          <div className="scale-110">
            <BeeCloseButton onClose={onClose} />
          </div>
        </div>

        {/* 3. CENTER OVERLAY: Play/Pause State Visualizer */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            title="Start playback"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] z-20 transition-transform active:scale-90"
          >
            <Play className="text-black fill-black ml-1" size={36} />
          </button>
        )}

        {/* 4. BOTTOM INTERFACE: Narrative Navigation */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-black via-black/60 to-transparent">
          
          {/* Chapter Scrubber Bar */}
          <div className="flex gap-1.5 mb-6 h-1">
            {VIDEO_CHAPTERS.map((chapter, idx) => {
                const nextTime = VIDEO_CHAPTERS[idx+1]?.time || 108; // duration 108s
                const chapterWidth = ((nextTime - chapter.time) / 108) * 100;
                const isPassed = videoRef.current?.currentTime >= chapter.time;
                
                return (
                    <div 
                        key={chapter.id}
                        onClick={() => seekToChapter(chapter.time)}
                        className="h-full relative cursor-pointer group/chap flex-1"
                        style={{ width: `${chapterWidth}%` }}
                    >
                        <div className={`h-full rounded-full transition-all duration-500 
                            ${activeChapter.id === chapter.id ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : isPassed ? 'bg-amber-800' : 'bg-white/10 group-hover/chap:bg-white/30'}`} 
                        />
                        <span className="absolute -top-6 left-0 text-[8px] text-white/60 uppercase font-black tracking-tighter opacity-0 group-hover/chap:opacity-100 transition-opacity">
                            {chapter.title}
                        </span>
                    </div>
                );
            })}
          </div>

          {/* Quick Controls Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
               <button onClick={togglePlay} title={isPlaying ? "Pause" : "Play"} className="text-white hover:text-amber-500 transition-colors">
                 {isPlaying ? <Pause size={22} /> : <Play size={22} />}
               </button>
               <button onClick={() => setIsMuted(!isMuted)} title={isMuted ? "Unmute" : "Mute"} className="text-white hover:text-amber-500 transition-colors">
                 {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
               </button>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Activity size={12} className="text-amber-500 animate-pulse" />
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Evidence of Integrity</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. GLOBAL EXIT: Return to Site (Thumb Zone) */}
      <div className="fixed bottom-10 left-0 right-0 flex flex-col items-center gap-6 z-[1100]">
          <div className="max-w-xs text-center px-6 opacity-0 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
             <p className="text-[10px] text-gray-500 italic">"Observe the manual, heat-guarded process from the heart of the Free State."</p>
          </div>
          
          <button
            onClick={onClose}
            title="Exit video and return to site"
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full text-white hover:bg-red-600/10 hover:border-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <Square size={16} className="fill-current text-white/80 group-hover:text-red-400 transition-colors" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Return to Site</span>
          </button>
      </div>
    </div>
  );
};

export default VideoModal;