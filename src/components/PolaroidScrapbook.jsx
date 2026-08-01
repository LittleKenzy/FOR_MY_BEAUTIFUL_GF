import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Move, RotateCcw, Heart, Eye } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function PolaroidScrapbook() {
  const containerRef = useRef(null);
  const [photos, setPhotos] = useState(PERSONAL_DATA.polaroidPhotos);
  const [activePhoto, setActivePhoto] = useState(null);
  const [topId, setTopId] = useState(null);

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (activePhoto) {
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
  }, [activePhoto]);

  const handleDragStart = (id) => {
    soundManager.playSoftClick();
    setTopId(id);
  };

  const handlePhotoClick = (photo) => {
    soundManager.playRevealChime();
    setActivePhoto(photo);
  };

  const resetPositions = () => {
    soundManager.playSoftClick();
    setPhotos([...PERSONAL_DATA.polaroidPhotos]);
  };

  return (
    <section className="py-16 px-3 sm:px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Interactive Scrapbook Desk</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            Meja Foto Polaroid <span className="text-rose-400">Cel</span> 📸
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-base max-w-lg mx-auto"
          >
            Geser & susun foto-foto ini di layar HP-mu! Tap foto untuk memperbesar & membaca pesan dibaliknya. 💬
          </motion.p>
        </div>

        {/* Mobile-First Interactive Desk Area */}
        <div 
          ref={containerRef}
          className="relative w-full h-[450px] sm:h-[550px] rounded-3xl glass-panel border border-rose-500/20 bg-gradient-to-b from-[#140c1e]/80 to-[#0b0711]/95 p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-2xl touch-none"
        >
          {/* Mobile Hint Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] text-rose-300/80 pointer-events-none select-none">
            <Move className="w-3.5 h-3.5 animate-bounce" />
            <span>Seret foto pakai jarimu</span>
          </div>

          <button
            onClick={resetPositions}
            className="absolute top-3 right-3 z-40 px-3 py-1 rounded-full bg-white/10 hover:bg-rose-500/20 border border-white/10 text-[11px] text-slate-300 flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Rapikan Foto</span>
          </button>

          {/* Draggable Polaroid Cards */}
          {photos.map((photo, idx) => {
            const isTop = topId === photo.id;
            return (
              <motion.div
                key={photo.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                onDragStart={() => handleDragStart(photo.id)}
                onClick={() => handlePhotoClick(photo)}
                className={`absolute w-44 sm:w-64 p-2.5 bg-slate-100 rounded-sm shadow-2xl cursor-grab active:cursor-grabbing select-none transition-shadow touch-none ${
                  isTop ? 'z-30 scale-105' : 'z-10'
                }`}
                style={{
                  rotate: photo.rotation || 0,
                  left: `${10 + (idx % 2) * 42}%`,
                  top: `${12 + Math.floor(idx / 2) * 42}%`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
              >
                {/* Washi Tape Accent */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-200/70 backdrop-blur-xs transform -rotate-3 border border-amber-300/40 shadow-xs" />

                {/* Photo Frame */}
                <div className="relative h-44 sm:h-64 bg-slate-900 rounded-sm overflow-hidden mb-2">
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-full object-cover pointer-events-none" 
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white/80">
                    <Eye className="w-3 h-3" />
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="px-1 space-y-0.5 text-center">
                  <h4 className="font-handwriting text-lg sm:text-xl text-slate-800 font-bold leading-tight">
                    {photo.title}
                  </h4>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-sans tracking-wide block">
                    {photo.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Polaroid Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activePhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden overscroll-none touch-none"
            >
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto p-4 bg-slate-50 rounded-md shadow-2xl text-slate-900 space-y-4 no-scrollbar overscroll-contain"
              >
                <div className="relative h-64 bg-slate-900 rounded-sm overflow-hidden">
                  <img 
                    src={activePhoto.image} 
                    alt={activePhoto.title}
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="text-center space-y-2 pt-1">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {activePhoto.title}
                  </h3>
                  <span className="text-xs font-semibold text-rose-600 tracking-wider block">
                    {activePhoto.date}
                  </span>
                  <p className="font-handwriting text-lg text-slate-700 leading-relaxed px-2 bg-amber-50 py-2.5 rounded-lg border border-amber-200">
                    "{activePhoto.note}"
                  </p>
                </div>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-rose-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Tutup Polaroid
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
