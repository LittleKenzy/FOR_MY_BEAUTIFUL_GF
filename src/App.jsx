import React, { useState, useEffect } from 'react';
import SoundAmbientBar from './components/SoundAmbientBar';
import HeroSection from './components/HeroSection';
import TogetherCounter from './components/TogetherCounter';
import MemoryTimeline from './components/MemoryTimeline';
import PolaroidScrapbook from './components/PolaroidScrapbook';
import ReasonsReveal from './components/ReasonsReveal';
import ScratchCardSurprise from './components/ScratchCardSurprise';
import LoveQuiz from './components/LoveQuiz';
import LoveLetterEnvelope from './components/LoveLetterEnvelope';
import FinaleSection from './components/FinaleSection';
import EasterEggModal from './components/EasterEggModal';
import RandomLoveFortune from './components/RandomLoveFortune';
import AudioWelcomeOverlay from './components/AudioWelcomeOverlay';
import CustomCursor from './components/CustomCursor';
import { soundManager } from './utils/sound';

export default function App() {
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  useEffect(() => {
    // Attempt auto-start + fallback gesture
    soundManager.playBgm();

    const handleFirstInteraction = () => {
      soundManager.playBgm();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('pointerdown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, []);

  const handleEasterEggTrigger = () => {
    soundManager.playSoftClick();
    const nextCount = easterEggClicks + 1;
    setEasterEggClicks(nextCount);

    if (nextCount >= 5) {
      soundManager.playFanfare();
      setIsEasterEggOpen(true);
      setEasterEggClicks(0);
    }
  };

  const scrollToCounter = () => {
    const el = document.getElementById('together-counter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0711] text-slate-100 font-sans relative selection:bg-rose-500 selection:text-white">
      {/* Interactive Audio Welcome Overlay Curtain */}
      <AudioWelcomeOverlay onEnter={() => soundManager.playBgm()} />

      {/* Ambient Radial Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(159,18,57,0.18),rgba(255,255,255,0))]" />

      {/* Top Ambient Navigation */}
      <SoundAmbientBar 
        easterEggCount={easterEggClicks}
        onEasterEggTrigger={handleEasterEggTrigger}
      />

      {/* Daily Random Surprise Note */}
      <RandomLoveFortune />

      {/* Desktop Mouse Trail */}
      <CustomCursor />

      {/* Mobile-First Story Experience Flow */}
      <main className="space-y-4">
        <HeroSection onExplore={scrollToCounter} />
        <TogetherCounter />
        <ScratchCardSurprise />
        <MemoryTimeline />
        <PolaroidScrapbook />
        <ReasonsReveal />
        <LoveQuiz />
        <LoveLetterEnvelope />
        <FinaleSection onEasterEggTrigger={handleEasterEggTrigger} />
      </main>

      {/* Secret Easter Egg Modal */}
      <EasterEggModal 
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      {/* Mobile Story Footer */}
      <footer className="py-8 px-4 border-t border-white/5 text-center text-xs text-slate-500 space-y-1 relative z-10">
        <p>Crafted with endless love for Dannisa Winaris ("Cel") ❤️</p>
        <p>© 2026 Girlfriend Day Special Edition</p>
      </footer>
    </div>
  );
}
