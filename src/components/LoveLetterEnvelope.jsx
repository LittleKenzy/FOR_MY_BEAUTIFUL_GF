import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Move, Feather } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function LoveLetterEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  const letterData = PERSONAL_DATA.loveLetter;
  const fullText = letterData.paragraphs;

  const handleOpenEnvelope = () => {
    soundManager.playSealPop();
    soundManager.playRevealChime();
    setIsOpen(true);
  };

  // Typewriter streaming effect
  useEffect(() => {
    if (!isOpen) return;

    if (currentParagraph < fullText.length) {
      const paragraphText = fullText[currentParagraph];
      if (currentLetterIdx < paragraphText.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => {
            const copy = [...prev];
            if (!copy[currentParagraph]) copy[currentParagraph] = '';
            copy[currentParagraph] += paragraphText[currentLetterIdx];
            return copy;
          });
          setCurrentLetterIdx((prev) => prev + 1);
        }, 25);
        return () => clearTimeout(timer);
      } else {
        const nextParaTimer = setTimeout(() => {
          setCurrentParagraph((prev) => prev + 1);
          setCurrentLetterIdx(0);
        }, 400);
        return () => clearTimeout(nextParaTimer);
      }
    }
  }, [isOpen, currentParagraph, currentLetterIdx, fullText]);

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Feather className="w-3.5 h-3.5 text-rose-400" />
            <span>Digital Love Letter</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            Surat Cinta Khusus Cel ✉️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-md mx-auto"
          >
            Klik atau seret Segel Lilin (Wax Seal) di bawah ini untuk membuka dan membaca isi suratnya! 💌
          </motion.p>
        </div>

        {/* Envelope / Letter Interactive Canvas */}
        <div className="relative min-h-[480px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope View */
              <motion.div
                key="closed-envelope"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0, y: -40 }}
                onClick={handleOpenEnvelope}
                className="relative w-full max-w-lg h-72 sm:h-80 bg-gradient-to-br from-[#9f1239] via-[#be123c] to-[#e11d48] rounded-3xl p-6 shadow-2xl border border-rose-400/30 cursor-pointer group flex flex-col justify-between overflow-hidden"
              >
                {/* Envelope Fold Triangles */}
                <div className="absolute top-0 left-0 right-0 h-36 bg-white/10 backdrop-blur-xs rounded-b-[100px] border-b border-white/20 group-hover:h-40 transition-all duration-500" />
                
                {/* Recipient Stamp */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 border border-white/20 text-rose-100 text-xs font-mono tracking-widest uppercase">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{letterData.stampText}</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
                </div>

                {/* Wax Seal Button in Center */}
                <div className="relative z-20 mx-auto text-center space-y-2">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 mx-auto rounded-full wax-seal flex items-center justify-center cursor-pointer shadow-2xl border-2 border-rose-300/40"
                  >
                    <Heart className="w-9 h-9 text-rose-100 fill-rose-100 animate-pulse" />
                  </motion.div>
                  <span className="block text-xs font-semibold text-rose-100 tracking-wider group-hover:scale-105 transition-transform">
                    Buka Segel Cinta 🗝️
                  </span>
                </div>

                <div className="relative z-10 text-center text-xs text-rose-200/80 font-serif italic">
                  Khusus Untuk Dannisa Winaris
                </div>
              </motion.div>
            ) : (
              /* Opened Love Letter Content */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-2xl bg-[#fffdf7] text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-200/60 relative overflow-hidden font-serif space-y-6"
              >
                {/* Paper texture aesthetic header */}
                <div className="flex items-center justify-between border-b-2 border-rose-200 pb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    <span className="text-sm font-bold text-rose-700 uppercase tracking-widest font-sans">
                      Special Letter for Cel
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-sans">1 Agustus 2026</span>
                </div>

                {/* Recipient */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  {letterData.recipient}
                </h3>

                {/* Typewriter Paragraphs */}
                <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed min-h-[220px]">
                  {displayedText.map((para, i) => (
                    <p key={i} className="font-serif">
                      {para}
                    </p>
                  ))}
                  {currentParagraph < fullText.length && (
                    <span className="inline-block w-2 h-5 bg-rose-600 animate-pulse ml-1" />
                  )}
                </div>

                {/* Sender Signature */}
                <div className="pt-6 border-t border-amber-200/80 flex flex-col items-end space-y-1 text-right">
                  <span className="text-xs text-slate-500 font-sans">{letterData.sender}</span>
                  <span className="font-handwriting text-3xl font-bold text-rose-600">
                    {letterData.signature}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
