// Audio Learning Engine for Quran Murottal & Hadith Recitations

export interface QariOption {
  id: string;
  name: string;
  subname: string;
  folder: string;
  isChildFriendly?: boolean;
  isUmmiStyle?: boolean;
  recommendedFor: string;
}

export const QARI_LIST: QariOption[] = [
  {
    id: 'ummi_minshawy_teacher',
    name: 'Metode Ummi / Talaqqi Anak (Al-Minsyawi & Santri Cilik)',
    subname: 'Guru Membaca & Suara Anak Mengulang',
    folder: 'Minshawy_Teacher_128kbps',
    isChildFriendly: true,
    isUmmiStyle: true,
    recommendedFor: 'Metode Ummi & Talaqqi: Guru melafalkan ayat lalu diulang oleh paduan suara anak-anak'
  },
  {
    id: 'husary_muallim',
    name: 'Talaqqi Kelas Anak (Al-Husary & Paduan Santri)',
    subname: 'Makhraj Tajwid & Suara Murid',
    folder: 'Husary_Muallim_128kbps',
    isChildFriendly: true,
    isUmmiStyle: true,
    recommendedFor: 'Talaqqi interaktif: Guru membacakan fashahah tajwid lalu diikuti santri anak'
  },
  {
    id: 'alafasy',
    name: 'Syaikh Misyari Rasyid Al-Afasy',
    subname: 'Murottal Irama Lembut Ramah Anak',
    folder: 'Alafasy_128kbps',
    isChildFriendly: true,
    isUmmiStyle: false,
    recommendedFor: 'Irama merdu, vokal jelas dan sangat disukai anak-anak'
  },
  {
    id: 'husary',
    name: 'Syaikh Mahmud Khalil Al-Husary',
    subname: 'Tartil Muallim Solo',
    folder: 'Husary_128kbps',
    isChildFriendly: false,
    isUmmiStyle: false,
    recommendedFor: 'Standar emas makhorijul huruf & hukum tajwid presisi'
  },
  {
    id: 'minshawy',
    name: 'Syaikh Muhammad Shiddiq Al-Minsyawi',
    subname: 'Tartil Khusyuk Solo',
    folder: 'Minshawy_Murattal_128kbps',
    isChildFriendly: false,
    isUmmiStyle: false,
    recommendedFor: 'Tartil klasik dengan penghayatan makna yang mendalam'
  },
  {
    id: 'hudhaify',
    name: 'Syaikh Ali Al-Hudzaify',
    subname: 'Imam Masjid Nabawi',
    folder: 'Hudaify_128kbps',
    isChildFriendly: false,
    isUmmiStyle: false,
    recommendedFor: 'Tempo stabil dan waqaf-ibtida yang sangat rapi'
  }
];

export function formatThreeDigits(num: number): string {
  return String(num).padStart(3, '0');
}

export function getQuranAyahAudioUrl(surahNumber: number, ayahNumber: number, qariFolder: string = 'Minshawy_Teacher_128kbps'): string {
  const surahStr = formatThreeDigits(surahNumber);
  const ayahStr = formatThreeDigits(ayahNumber);
  return `https://everyayah.com/data/${qariFolder}/${surahStr}${ayahStr}.mp3`;
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25;
export type RepeatCount = 1 | 3 | 5 | 999;

export class AudioLearningEngine {
  private static instance: AudioLearningEngine;
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeakingSpeech: boolean = false;

  private constructor() {}

  public static getInstance(): AudioLearningEngine {
    if (!AudioLearningEngine.instance) {
      AudioLearningEngine.instance = new AudioLearningEngine();
    }
    return AudioLearningEngine.instance;
  }

  public stopAll() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeakingSpeech = false;
  }

  // Play Ayah using EveryAyah Qari Audio with fallback to Web Speech Synthesis
  public playQuranAyah(
    surahNumber: number,
    ayahNumber: number,
    arabicFallbackText: string,
    options: {
      qariFolder?: string;
      speed?: PlaybackSpeed;
      repeatCount?: RepeatCount;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: unknown) => void;
      onRepeatProgress?: (currentRep: number, totalRep: number) => void;
    } = {}
  ): () => void {
    this.stopAll();

    const {
      qariFolder = 'Minshawy_Teacher_128kbps',
      speed = 1.0,
      repeatCount = 1,
      onStart,
      onEnd,
      onError,
      onRepeatProgress
    } = options;

    const audioUrl = getQuranAyahAudioUrl(surahNumber, ayahNumber, qariFolder);
    const audio = new Audio(audioUrl);
    this.currentAudio = audio;
    audio.playbackRate = speed;

    let playedTimes = 0;
    const targetRep = repeatCount === 999 ? Infinity : repeatCount;

    const playNextRepetition = () => {
      playedTimes++;
      if (onRepeatProgress) {
        onRepeatProgress(playedTimes, repeatCount === 999 ? 999 : repeatCount);
      }
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn('Audio play failed, falling back to speech synthesis:', err);
        this.playSpeechArabic(arabicFallbackText, {
          speed,
          repeatCount,
          onStart,
          onEnd,
          onRepeatProgress
        });
      });
    };

    audio.onplay = () => {
      if (playedTimes === 0 && onStart) onStart();
    };

    audio.onended = () => {
      if (playedTimes < targetRep) {
        // Pause between repetitions for better learning assimilation (600ms)
        setTimeout(() => {
          if (this.currentAudio === audio) {
            playNextRepetition();
          }
        }, 600);
      } else {
        if (onEnd) onEnd();
        this.currentAudio = null;
      }
    };

    audio.onerror = () => {
      console.warn('Audio network error, falling back to Web Speech Synthesis');
      this.playSpeechArabic(arabicFallbackText, {
        speed,
        repeatCount,
        onStart,
        onEnd,
        onError,
        onRepeatProgress
      });
    };

    playNextRepetition();

    // Return stop callback
    return () => {
      audio.pause();
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    };
  }

  // Play Arabic text using Web Speech Synthesis with rich pronunciation parameters
  public playSpeechArabic(
    arabicText: string,
    options: {
      speed?: PlaybackSpeed;
      repeatCount?: RepeatCount;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: unknown) => void;
      onRepeatProgress?: (currentRep: number, totalRep: number) => void;
    } = {}
  ): () => void {
    this.stopAll();

    const {
      speed = 1.0,
      repeatCount = 1,
      onStart,
      onEnd,
      onError,
      onRepeatProgress
    } = options;

    if (!('speechSynthesis' in window)) {
      if (onError) onError(new Error('Browser tidak mendukung Speech Synthesis'));
      return () => {};
    }

    let currentRep = 0;
    const targetRep = repeatCount === 999 ? Infinity : repeatCount;
    this.isSpeakingSpeech = true;

    const speakOnce = () => {
      if (!this.isSpeakingSpeech) return;
      currentRep++;
      if (onRepeatProgress) {
        onRepeatProgress(currentRep, repeatCount === 999 ? 999 : repeatCount);
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = 'ar-SA';
      // Rate calibration: 0.75x = 0.75, 1.0x = 0.88, 1.25x = 1.05 for natural Arabic pacing
      utterance.rate = speed === 0.75 ? 0.7 : speed === 1.25 ? 1.05 : 0.85;
      utterance.pitch = 1.1; // Slightly higher pitch for child/learner friendliness

      // Try finding Arabic voice if installed
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic') || v.name.toLowerCase().includes('maged') || v.name.toLowerCase().includes('tariq') || v.name.toLowerCase().includes('laila'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onstart = () => {
        if (currentRep === 1 && onStart) onStart();
      };

      utterance.onend = () => {
        if (!this.isSpeakingSpeech) return;
        if (currentRep < targetRep) {
          setTimeout(() => {
            if (this.isSpeakingSpeech) speakOnce();
          }, 600);
        } else {
          this.isSpeakingSpeech = false;
          if (onEnd) onEnd();
        }
      };

      utterance.onerror = (e) => {
        this.isSpeakingSpeech = false;
        if (onError) onError(e);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakOnce();

    return () => {
      this.isSpeakingSpeech = false;
      window.speechSynthesis.cancel();
    };
  }
}

export const audioLearningEngine = AudioLearningEngine.getInstance();
