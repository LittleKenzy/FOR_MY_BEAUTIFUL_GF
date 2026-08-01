// Web Audio API Synthesizer & Background Music Manager
// Manages UI sound effects + romantic background music playback

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgAudio = null;
    this.isBgmStarted = false;
    
    if (typeof window !== 'undefined') {
      this.bgAudio = new Audio('/music/bg-music.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.45; // Soft romantic volume
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playBgm() {
    if (!this.bgAudio) return;
    this.bgAudio.play().then(() => {
      this.isBgmStarted = true;
    }).catch((err) => {
      console.log("Autoplay blocked by browser until user interaction", err);
    });
  }

  pauseBgm() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
  }

  toggleBgm() {
    if (!this.bgAudio) return false;
    if (this.bgAudio.paused) {
      this.playBgm();
      return true;
    } else {
      this.pauseBgm();
      return false;
    }
  }

  isBgmPlaying() {
    return this.bgAudio && !this.bgAudio.paused;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgAudio) {
      this.bgAudio.muted = this.muted;
    }
    return this.muted;
  }

  playSoftClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio play blocked or unavailable", e);
    }
  }

  playRevealChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch (e) {
      console.warn("Chime blocked", e);
    }
  }

  playSealPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Pop sound error", e);
    }
  }

  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E
      arpeggio.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = this.ctx.currentTime + index * 0.1;
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch (e) {
      console.warn("Fanfare error", e);
    }
  }
}

export const soundManager = new SoundManager();
