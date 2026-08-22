// Web Audio API Synthesizer and Web Push Notification Engine

class AudioNotificationEngine {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Melodi Nada Adzan Pendek
  playAdzanTone() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [
        { freq: 440, dur: 0.6, delay: 0 },
        { freq: 523.25, dur: 0.8, delay: 0.65 },
        { freq: 587.33, dur: 0.9, delay: 1.5 },
        { freq: 659.25, dur: 1.2, delay: 2.45 },
        { freq: 587.33, dur: 0.8, delay: 3.7 },
        { freq: 523.25, dur: 1.4, delay: 4.55 }
      ];

      notes.forEach(({ freq, dur, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.25, now + delay + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.1);
      });
    } catch {
      // Audio context might be restricted before first user gesture
    }
  }

  // Bell Chime Halus
  playChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.9);
      });
    } catch {
      // ignore audio restriction
    }
  }

  // Gentle Tone
  playGentle() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4); // A5

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // ignore
    }
  }

  // Victory / High Score Fanfare
  playVictorySound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const fanfare = [
        { freq: 523.25, dur: 0.15, delay: 0 },      // C5
        { freq: 659.25, dur: 0.15, delay: 0.15 },   // E5
        { freq: 783.99, dur: 0.15, delay: 0.3 },    // G5
        { freq: 1046.5, dur: 0.45, delay: 0.45 }    // C6
      ];

      fanfare.forEach(({ freq, dur, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.25, now + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.05);
      });
    } catch {
      // ignore
    }
  }

  playCelebrationSound() {
    this.playVictorySound();
  }

  // Success / Checklist Checked Audio
  playCheckSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  // Uncheck Audio
  playUncheckSound() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.1);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }

  playSound(soundType: 'chime' | 'adzan' | 'gentle' | 'bell') {
    switch (soundType) {
      case 'adzan':
        this.playAdzanTone();
        break;
      case 'chime':
      case 'bell':
        this.playChime();
        break;
      case 'gentle':
      default:
        this.playGentle();
        break;
    }
  }
}

export const audioEngine = new AudioNotificationEngine();

// Notification Permission Helper
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return 'denied';
  }
}

// Send Real Push / Desktop Notification
export function sendPushNotification(title: string, options?: NotificationOptions & { soundType?: 'chime' | 'adzan' | 'gentle' | 'bell' }) {
  if (options?.soundType) {
    audioEngine.playSound(options.soundType);
  } else {
    audioEngine.playChime();
  }

  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    try {
      const notification = new Notification(title, {
        icon: '/vite.svg',
        badge: '/vite.svg',
        silent: true, // We trigger custom sound synthesis
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } catch {
      // Notification failed in iframe or unsupported environment
    }
  }
}
