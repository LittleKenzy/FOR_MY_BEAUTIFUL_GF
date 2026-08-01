import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, Smile, ShieldCheck, Crown, Heart } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function ReasonsReveal() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-300" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-400" />;
      case 'Smile': return <Smile className="w-6 h-6 text-pink-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      case 'Crown': return <Crown className="w-6 h-6 text-amber-400" />;
      default: return <Heart className="w-6 h-6 text-rose-400" />;
    }
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Why Cel is So Special</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            Alasan Kenapa Cel Selalu Di Hati ❤️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto"
          >
            Bukan sekadar kata manis generik, tapi hal-hal nyata & unik dari Dannisa Winaris yang bikin selalu jatuh cinta lagi.
          </motion.p>
        </div>

        {/* Reasons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAL_DATA.reasonsToLove.map((reason, idx) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              onViewportEnter={() => soundManager.playSoftClick()}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`p-6 rounded-2xl glass-panel border border-rose-500/20 bg-gradient-to-br ${reason.color} flex flex-col justify-between space-y-4 hover:border-rose-500/40 transition-all duration-300 group shadow-lg`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-white/30 font-mono group-hover:text-rose-400/80 transition-colors">
                    {reason.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/10 group-hover:rotate-12 transition-transform">
                    {getIcon(reason.icon)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-serif group-hover:text-rose-300 transition-colors">
                  {reason.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="pt-3 flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Precious Detail</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
