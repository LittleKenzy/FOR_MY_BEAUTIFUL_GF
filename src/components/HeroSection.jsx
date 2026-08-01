import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, Lock, Unlock } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function HeroSection({ onExplore }) {
  const [isUnlocked, setIsUnlocked] = React.useState(false);

  const handleUnlock = () => {
    soundManager.playRevealChime();
    soundManager.playBgm();
    setIsUnlocked(true);
    setTimeout(() => {
      onExplore();
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating subtle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-400/20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full text-center relative z-10 space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{PERSONAL_DATA.hero.badge}</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-slate-300 text-lg sm:text-2xl font-light tracking-wider uppercase font-sans">
            {PERSONAL_DATA.hero.mainTitlePrefix}
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-400 to-amber-200 font-serif leading-tight text-glow-rose">
            {PERSONAL_DATA.hero.mainTitleHighlight}
          </h1>
          <p className="text-rose-300 font-handwriting text-2xl sm:text-4xl font-semibold tracking-wide">
            {PERSONAL_DATA.hero.nicknameNote}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans px-4"
        >
          {PERSONAL_DATA.hero.teaserSubtitle}
        </motion.p>

        {/* Interactive Lock / Unlock CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={handleUnlock}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-semibold text-base sm:text-lg shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            {isUnlocked ? (
              <Unlock className="w-5 h-5 text-amber-300 animate-bounce" />
            ) : (
              <Lock className="w-5 h-5 text-rose-200 group-hover:rotate-12 transition-transform" />
            )}
            <span>{PERSONAL_DATA.hero.unlockButtonText}</span>
            <Heart className="w-5 h-5 text-rose-200 fill-rose-200 group-hover:scale-125 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs"
      >
        <span>{PERSONAL_DATA.hero.scrollHint}</span>
        <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
