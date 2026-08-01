import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Heart, Award } from 'lucide-react';
import { PERSONAL_DATA } from '../data/content';
import { soundManager } from '../utils/sound';

export default function LoveQuiz() {
  const quizData = PERSONAL_DATA.quiz;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quizData.questions[currentIdx];

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return; // Prevent double select

    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQ.correctIndex) {
      soundManager.playFanfare();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playSoftClick();
    }
  };

  const handleNext = () => {
    soundManager.playSoftClick();
    if (currentIdx + 1 < quizData.questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    soundManager.playSoftClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const getResultText = () => {
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage === 100) return quizData.results.perfect;
    if (percentage >= 50) return quizData.results.good;
    return quizData.results.tryAgain;
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Fun Quiz</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-serif"
          >
            {quizData.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base"
          >
            {quizData.subtitle}
          </motion.p>
        </div>

        {/* Quiz Container */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border-rose-500/30 bg-[#0f0a14] shadow-2xl relative overflow-hidden">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-semibold text-rose-300 border-b border-white/5 pb-3">
                <span>Pertanyaan {currentIdx + 1} dari {quizData.questions.length}</span>
                <span>Skor Sementara: {score}</span>
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-2xl font-bold text-white font-serif leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = i === currentQ.correctIndex;
                  let btnStyle = "bg-white/5 border-white/10 text-slate-200 hover:bg-rose-500/10 hover:border-rose-500/30";

                  if (selectedOption !== null) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200 font-semibold";
                    } else {
                      btnStyle = "bg-white/5 border-white/5 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(i)}
                      className={`w-full p-4 rounded-xl border text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-white/10 space-y-4"
                  >
                    <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium space-y-1 ${
                      selectedOption === currentQ.correctIndex
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 text-sm">
                        {selectedOption === currentQ.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Jawaban Kamu Benar! 🎉</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Tettt! Kurang Tepat Nih 😜</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed pt-1">
                        {selectedOption === currentQ.correctIndex
                          ? currentQ.explanation
                          : (currentQ.wrongExplanation || currentQ.explanation)}
                      </p>
                    </div>
                    <button
                      onClick={handleNext}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/20"
                    >
                      {currentIdx + 1 < quizData.questions.length ? "Lanjut ke Pertanyaan Berikutnya ➔" : "Lihat Hasil Akhir 🎉"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Result Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-xl shadow-rose-500/20">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  Hasil Quiz Cel! 🏆
                </h3>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-300 font-mono">
                  {score} / {quizData.questions.length} Benar
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {getResultText()}
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Certified Girlfriend of the Year: Dannisa Winaris</span>
              </div>

              <div>
                <button
                  onClick={handleRestart}
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Coba Ulang Quiz
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
