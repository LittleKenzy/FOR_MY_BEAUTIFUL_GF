import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Coffee, PhoneCall, Laugh, Clock } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';

export default function TogetherCounter() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(PERSONAL_DATA.specialDate);

    const updateCounter = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - startDate.getTime());

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMetricIcon = (iconName) => {
    switch (iconName) {
      case 'Calendar': return <Calendar className="w-5 h-5 text-rose-400" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'PhoneCall': return <PhoneCall className="w-5 h-5 text-purple-400" />;
      case 'Laugh': return <Laugh className="w-5 h-5 text-pink-400" />;
      default: return <Heart className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="together-counter" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Time Counter</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            Sudah Berapa Lama Kita Bersama, <span className="text-rose-400">Cel</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto"
          >
            Dihitung secara real-time sejak jadian kita tanggal <span className="text-rose-300 font-semibold">{PERSONAL_DATA.specialDateLabel}</span>.
          </motion.p>
        </div>

        {/* Real-time Ticker Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Hari', value: timeElapsed.days, color: 'from-rose-500/20 to-pink-500/10' },
            { label: 'Jam', value: timeElapsed.hours, color: 'from-purple-500/20 to-indigo-500/10' },
            { label: 'Menit', value: timeElapsed.minutes, color: 'from-amber-500/20 to-rose-500/10' },
            { label: 'Detik', value: timeElapsed.seconds, color: 'from-pink-500/20 to-purple-500/10' }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden p-6 rounded-2xl glass-panel border border-rose-500/20 bg-gradient-to-br ${item.color} text-center group hover:border-rose-500/40 transition-all`}
            >
              <span className="block text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-200 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-rose-300 mt-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Relationship Custom Metrics Grid */}
        <div className="grid grid-cols-2 max-w-lg mx-auto gap-4 pt-4">
          {PERSONAL_DATA.metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-xl glass-panel border-white/5 hover:border-rose-500/30 transition-all flex flex-col items-center text-center gap-2"
            >
              <div className="p-2 rounded-lg bg-white/5">
                {getMetricIcon(metric.icon)}
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white font-serif">
                {metric.value}
              </span>
              <span className="text-xs text-slate-400">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
