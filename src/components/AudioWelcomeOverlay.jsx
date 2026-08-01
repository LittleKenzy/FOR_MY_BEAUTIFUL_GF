import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart, Sparkles, Play } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { PERSONAL_DATA } from '../data/content';

export default function AudioWelcomeOverlay({ onEnter }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleStartExperience = () => {
    soundManager.playBgm();
    soundManager.playRevealChime();
    setIsOpen(false);
    if (onEnter) onEnter();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        onClick={handleStartExperience}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0711]/95 backdrop-blur-2xl cursor-pointer select-none"
      >
        {/* Glowing Background Radial */}
        <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-md w-full glass-panel rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#180e25] to-[#0b0711] p-8 text-center space-y-6 shadow-2xl">
          {/* Animated Music Badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-xl shadow-rose-500/30 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-[#0b0711] flex items-center justify-center">
              <Music className="w-9 h-9 text-rose-400 animate-pulse" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Special Experience for Cel
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif pt-2">
              Website Girlfriend Day <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-400 to-amber-200">
                {PERSONAL_DATA.girlfriendName}
              </span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm font-sans pt-1">
              Sentuh layar di mana saja untuk mengaktifkan musik <br />
              <span className="text-rose-300 font-semibold font-serif">"LANY - Soft"</span> & memulai perjalanan! 🎵❤️
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartExperience}
            className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 text-white fill-white" />
            <span>Mulai Musik & Buka Kejutan 🗝️</span>
          </motion.button>

          <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Sentuh tombol di atas atau ketuk layar di mana saja</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
