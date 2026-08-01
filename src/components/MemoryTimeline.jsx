import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Calendar, X, Heart, ArrowRight } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const scrollYRef = useRef(0);

  // Lock background body scroll when modal is active on mobile/desktop without losing scroll position
  useEffect(() => {
    if (selectedMemory) {
      scrollYRef.current = window.scrollY;
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      if (scrollYRef.current !== undefined) {
        window.scrollTo(0, scrollYRef.current);
      }
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedMemory]);

  const handleOpenModal = (item) => {
    soundManager.playRevealChime();
    setSelectedMemory(item);
  };

  const handleCloseModal = () => {
    soundManager.playSoftClick();
    setSelectedMemory(null);
  };

  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-b from-transparent via-rose-950/20 to-transparent">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Jejak Kenangan Kita</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            Timeline Cerita Bersama <span className="text-rose-400">Cel</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-md mx-auto"
          >
            Geser ke samping atau klik kartu untuk membaca potongan kisah spesial kita! 📖
          </motion.p>
        </div>

        {/* Horizontal Scroll / Drag Container */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {PERSONAL_DATA.timeline.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleOpenModal(item)}
                className="flex-none w-72 sm:w-80 snap-center glass-panel rounded-2xl p-5 border-white/10 hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo Preview */}
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-800">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0711] via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-rose-300 border border-white/10">
                      {item.tag}
                    </span>
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-rose-300 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors font-serif">
                      {item.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5 text-xs text-rose-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Modal Popup */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden overscroll-none touch-none"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border-rose-500/30 bg-[#0f0a14] p-6 sm:p-8 space-y-6 shadow-2xl no-scrollbar overscroll-contain"
              >
                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-rose-500/40 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shrink-0">
                  <img 
                    src={selectedMemory.image} 
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a14] via-transparent to-transparent" />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-rose-400 font-semibold">
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                      {selectedMemory.tag}
                    </span>
                    <span>{selectedMemory.date}</span>
                    <span>•</span>
                    <span>{selectedMemory.location}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif leading-tight">
                    {selectedMemory.title}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedMemory.extendedStory || selectedMemory.description}
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Simpan Dalam Hati 💖
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
