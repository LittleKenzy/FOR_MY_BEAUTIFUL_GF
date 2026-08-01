import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw, X } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function RandomLoveFortune() {
  const [isVisible, setIsVisible] = useState(true);
  const [note, setNote] = useState('');

  const pickRandomNote = () => {
    const notes = PERSONAL_DATA.dailySurpriseNotes;
    const random = notes[Math.floor(Math.random() * notes.length)];
    setNote(random);
  };

  useEffect(() => {
    pickRandomNote();
  }, []);

  const handleNext = () => {
    soundManager.playRevealChime();
    pickRandomNote();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-40">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          className="p-4 rounded-2xl glass-panel border border-rose-500/40 bg-[#160b24]/90 backdrop-blur-xl shadow-2xl space-y-3 relative"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Kejutan Random Cel Hari Ini ✨</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-serif leading-relaxed italic pr-4">
            "{note}"
          </p>

          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={handleNext}
              className="text-[11px] font-semibold text-rose-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Ambil Pesan Rahasia Lain</span>
            </button>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
