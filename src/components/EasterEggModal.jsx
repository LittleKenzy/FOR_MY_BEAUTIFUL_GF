import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, X, Award } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function EasterEggModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const data = PERSONAL_DATA.easterEgg;

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-amber-400/50 bg-gradient-to-b from-[#1c1229] to-[#0b0711] p-6 sm:p-8 space-y-6 shadow-2xl text-center no-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0b0711] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-300 font-serif">
              {data.title}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {data.message}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 text-amber-300" />
            <span>{data.giftNote}</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all"
          >
            Simpan Dalam Hati 💖
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
