import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Sparkles, Music, Play, Pause } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { PERSONAL_DATA } from '../data/content';

export default function SoundAmbientBar({ easterEggCount, onEasterEggTrigger }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    // Check music state periodically
    const interval = setInterval(() => {
      setIsPlayingMusic(soundManager.isBgmPlaying());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playSoftClick();
    }
  };

  const handleToggleMusic = () => {
    soundManager.playSoftClick();
    const playing = soundManager.toggleBgm();
    setIsPlayingMusic(playing);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-2.5 bg-[#0b0711]/80 backdrop-blur-md border-b border-rose-500/10 flex items-center justify-between transition-all duration-300">
      {/* Brand / Logo */}
      <div 
        onClick={onEasterEggTrigger}
        className="flex items-center gap-2 cursor-pointer group select-none"
        title="Klik 5x untuk rahasia!"
      >
        <div className="relative w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500/40 animate-pulse" />
          {easterEggCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#0b0711] text-[10px] font-bold flex items-center justify-center">
              {easterEggCount}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-wider text-rose-300 uppercase font-sans flex items-center gap-1">
            {PERSONAL_DATA.nickname} & Me <Sparkles className="w-3 h-3 text-amber-300 inline" />
          </span>
          <span className="text-[10px] text-slate-400">1 Agustus Girlfriend Day</span>
        </div>
      </div>

      {/* Music & Audio Controls */}
      <div className="flex items-center gap-2">
        {/* Background Music Toggle Button */}
        <button
          onClick={handleToggleMusic}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all active:scale-95 ${
            isPlayingMusic 
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-md shadow-rose-500/20' 
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Putar / Pause Lagu Background (LANY - Soft)"
        >
          <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-rose-400 animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span className="max-w-[100px] sm:max-w-[150px] truncate text-[11px]">
            {isPlayingMusic ? "LANY - Soft 🎵" : "Musik 🎵"}
          </span>
          {isPlayingMusic ? (
            <Pause className="w-3 h-3 text-rose-300" />
          ) : (
            <Play className="w-3 h-3 text-rose-300" />
          )}
        </button>

        {/* Mute Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 text-slate-300 transition-all active:scale-95"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-rose-400" />
          )}
        </button>
      </div>
    </header>
  );
}
