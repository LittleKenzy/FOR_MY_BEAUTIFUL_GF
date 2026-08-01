import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, Music, Volume2, Star } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function FinaleSection({ onEasterEggTrigger }) {
  const [celebrated, setCelebrated] = useState(false);

  const triggerConfetti = () => {
    soundManager.playFanfare();
    setCelebrated(true);

    // Custom heart + sparkles confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#ec4899', '#f3c669']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#e11d48', '#d946ef', '#ffffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffe4e6', '#fda4af', '#f43f5e']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Floating Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 p-0.5 shadow-2xl shadow-rose-500/30 flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-[#0b0711] flex items-center justify-center">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
        </motion.div>

        {/* Finale Text */}
        <div className="space-y-4">
          <h2 
            onClick={onEasterEggTrigger}
            className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-amber-200 font-serif leading-tight text-glow-rose cursor-pointer select-none"
            title="Klik 5x untuk easter egg!"
          >
            {PERSONAL_DATA.finale.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-xl max-w-xl mx-auto font-sans leading-relaxed">
            {PERSONAL_DATA.finale.subtitle}
          </p>
        </div>

        {/* Interactive Confetti CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-4"
        >
          <button
            onClick={triggerConfetti}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-600/30 hover:shadow-rose-600/60 transition-all flex items-center gap-3 mx-auto cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{PERSONAL_DATA.finale.ctaButtonText}</span>
            <Gift className="w-5 h-5 text-amber-200" />
          </button>
        </motion.div>

        {celebrated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl glass-panel border border-rose-500/30 max-w-md mx-auto text-rose-300 text-sm font-serif"
          >
            🎉 Happy Girlfriend Day, Cel! I love you so much! 🎉
          </motion.div>
        )}

        {/* Secret Easter Egg Hint */}
        <div className="pt-8 text-xs text-slate-500 italic">
          {PERSONAL_DATA.finale.secretHint}
        </div>
      </div>
    </section>
  );
}
