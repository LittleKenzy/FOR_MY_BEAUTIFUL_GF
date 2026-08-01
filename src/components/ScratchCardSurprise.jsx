import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function ScratchCardSurprise() {
  const [activeVoucherIdx, setActiveVoucherIdx] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const voucher = PERSONAL_DATA.scratchVouchers[activeVoucherIdx];

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set scratch foil gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#e11d48');
    grad.addColorStop(0.5, '#f43f5e');
    grad.addColorStop(1, '#9f1239');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text overlay on foil
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ GOSOK DENGAN JARIMU DI SINI ✨', canvas.width / 2, canvas.height / 2 + 5);

    setIsScratched(false);
  };

  useEffect(() => {
    initCanvas();
  }, [activeVoucherIdx]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    soundManager.playSoftClick();

    // Check scratch percentage
    if (!isScratched) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearedPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) clearedPixels++;
      }
      const percent = (clearedPixels / (canvas.width * canvas.height)) * 100;
      if (percent > 45) {
        setIsScratched(true);
        soundManager.playFanfare();
      }
    }
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDrawing.current) scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (isDrawing.current && e.touches[0]) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const nextVoucher = () => {
    soundManager.playSoftClick();
    setActiveVoucherIdx((prev) => (prev + 1) % PERSONAL_DATA.scratchVouchers.length);
  };

  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Scratch Voucher</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white font-serif"
          >
            Kupon Kejutan Spesial Cel 🎟️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm"
          >
            Usap/gosok lapisan merah di bawah ini dengan jarimu untuk mengklaim hadiah rahasia! 👇
          </motion.p>
        </div>

        {/* Scratch Voucher Container */}
        <div className="p-6 rounded-3xl glass-panel border border-amber-400/30 bg-[#120a1c] shadow-2xl relative space-y-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">
              OFFICIAL VOUCHER #{activeVoucherIdx + 1}
            </span>
            <button
              onClick={nextVoucher}
              className="text-xs text-rose-300 hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Kupon Lain</span>
            </button>
          </div>

          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 text-slate-900 p-6 flex flex-col justify-between shadow-inner select-none touch-none">
            {/* Hidden Reward underneath foil */}
            <div className="space-y-2 text-center">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block font-sans">
                {voucher.code}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                {voucher.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 font-sans leading-relaxed px-2">
                "{voucher.reward}"
              </p>
            </div>

            {/* Canvas Foil Layer */}
            <canvas
              ref={canvasRef}
              width={380}
              height={176}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-500 ${
                isScratched ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          {isScratched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold text-center flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Selamat! Kupon berhasil diklaim. Tunjukkan ke aku kapanpun yaaa! 🎉</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
