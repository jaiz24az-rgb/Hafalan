// Audio Learning Engine for Quran Murottal, Hadith Recitations & Doa
// Integrates EveryAyah CDN, QuranicAudio, and High-Clarity Gemini Arabic Audio TTS

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
    id: 'alafasy',
    name: 'Syaikh Misyari Rasyid Al-Afasy',
    subname: 'Murottal Irama Lembut Ramah Anak',
    folder: 'Alafasy_128kbps',
    isChildFriendly: true,
    isUmmiStyle: false,
    recommendedFor: 'Irama merdu, vokal jelas dan sangat disukai anak-anak'
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

export function getQuranAyahAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  qariFolder: string = 'Minshawy_Teacher_128kbps'
): string {
  const surahStr = formatThreeDigits(surahNumber);
  const ayahStr = formatThreeDigits(ayahNumber);
  return `https://everyayah.com/data/${qariFolder}/${surahStr}${ayahStr}.mp3`;
}

export function getQuranFullSurahAudioUrl(surahNumber: number): string {
  return `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${surahNumber}.mp3`;
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25;
export type RepeatCount = 1 | 3 | 5 | 999;

export interface AudioPlaybackOptions {
  qariFolder?: string;
  speed?: PlaybackSpeed;
  repeatCount?: RepeatCount;
  voiceName?: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  onRepeatProgress?: (currentRep: number, totalRep: number) => void;
}

export class AudioLearningEngine {
  private static instance: AudioLearningEngine;
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeakingSpeech: boolean = false;
  private activeAbortController: AbortController | null = null;
  private blobUrlCache: Map<string, string> = new Map();

  private constructor() {}

  public static getInstance(): AudioLearningEngine {
    if (!AudioLearningEngine.instance) {
      AudioLearningEngine.instance = new AudioLearningEngine();
    }
    return AudioLearningEngine.instance;
  }

  public stopAll() {
    if (this.activeAbortController) {
      this.activeAbortController.abort();
      this.activeAbortController = null;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio.onplay = null;
      this.currentAudio.onended = null;
      this.currentAudio.onerror = null;
      this.currentAudio = null;
    }

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.isSpeakingSpeech = false;
  }

  // Play Ayah using EveryAyah Qari Audio with automatic fallback to high-clarity Arabic TTS
  public playQuranAyah(
    surahNumber: number,
    ayahNumber: number,
    arabicFallbackText: string,
    options: AudioPlaybackOptions = {}
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
    let hasStarted = false;

    const playNextRepetition = () => {
      if (this.currentAudio !== audio) return;

      playedTimes++;
      if (onRepeatProgress) {
        onRepeatProgress(playedTimes, repeatCount === 999 ? 999 : repeatCount);
      }
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('EveryAyah playback failed, falling back to Arabic Voice engine:', err);
          this.playArabicText(arabicFallbackText, {
            speed,
            repeatCount,
            onStart,
            onEnd,
            onError,
            onRepeatProgress
          });
        });
      }
    };

    audio.onplay = () => {
      if (!hasStarted) {
        hasStarted = true;
        if (onStart) onStart();
      }
    };

    audio.onended = () => {
      if (this.currentAudio !== audio) return;

      if (playedTimes < targetRep) {
        // Pause between repetitions for learner contemplation
        setTimeout(() => {
          if (this.currentAudio === audio) {
            playNextRepetition();
          }
        }, 600);
      } else {
        this.currentAudio = null;
        if (onEnd) onEnd();
      }
    };

    audio.onerror = () => {
      console.warn('EveryAyah network error, falling back to Arabic Voice engine');
      this.playArabicText(arabicFallbackText, {
        speed,
        repeatCount,
        onStart,
        onEnd,
        onError,
        onRepeatProgress
      });
    };

    playNextRepetition();

    return () => {
      audio.pause();
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    };
  }

  // Play Full Surah Murottal recitation
  public playFullSurah(
    surahNumber: number,
    options: AudioPlaybackOptions = {}
  ): () => void {
    this.stopAll();

    const { speed = 1.0, onStart, onEnd, onError } = options;
    const audioUrl = getQuranFullSurahAudioUrl(surahNumber);
    const audio = new Audio(audioUrl);
    this.currentAudio = audio;
    audio.playbackRate = speed;

    audio.onplay = () => {
      if (onStart) onStart();
    };

    audio.onended = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn('Full surah audio error, trying secondary source...', e);
      // Secondary fallback
      const backupUrl = `https://server8.mp3quran.net/afs/${formatThreeDigits(surahNumber)}.mp3`;
      const backupAudio = new Audio(backupUrl);
      this.currentAudio = backupAudio;
      backupAudio.playbackRate = speed;
      backupAudio.onplay = () => onStart && onStart();
      backupAudio.onended = () => {
        this.currentAudio = null;
        if (onEnd) onEnd();
      };
      backupAudio.onerror = (err) => {
        this.currentAudio = null;
        if (onError) onError(err);
      };
      backupAudio.play().catch((err) => {
        this.currentAudio = null;
        if (onError) onError(err);
      });
    };

    audio.play().catch((err) => {
      if (audio.onerror) {
        audio.onerror(new Event('error'));
      } else {
        if (onError) onError(err);
      }
    });

    return () => {
      audio.pause();
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    };
  }

  // Play any authentic Arabic text (Doa Sholat, Doa Harian, Hadits) with high-clarity AI Voice
  public playArabicText(
    arabicText: string,
    options: AudioPlaybackOptions = {}
  ): () => void {
    this.stopAll();

    const cleanText = arabicText ? arabicText.trim() : '';
    if (!cleanText) {
      if (options.onError) options.onError(new Error('Teks Arab kosong'));
      return () => {};
    }

    const {
      speed = 1.0,
      repeatCount = 1,
      voiceName = 'Puck',
      onStart,
      onEnd,
      onError,
      onRepeatProgress
    } = options;

    const abortController = new AbortController();
    this.activeAbortController = abortController;

    const cacheKey = `${voiceName}:${cleanText}`;

    const playWithAudioElement = (audioSrc: string) => {
      if (abortController.signal.aborted) return;

      const audio = new Audio(audioSrc);
      this.currentAudio = audio;
      audio.playbackRate = speed;

      let playedTimes = 0;
      const targetRep = repeatCount === 999 ? Infinity : repeatCount;
      let hasStarted = false;

      const playNext = () => {
        if (this.currentAudio !== audio) return;

        playedTimes++;
        if (onRepeatProgress) {
          onRepeatProgress(playedTimes, repeatCount === 999 ? 999 : repeatCount);
        }

        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio element play error, falling back to Web Speech:', err);
            this.playSpeechSynthesisArabic(cleanText, options);
          });
        }
      };

      audio.onplay = () => {
        if (!hasStarted) {
          hasStarted = true;
          if (onStart) onStart();
        }
      };

      audio.onended = () => {
        if (this.currentAudio !== audio) return;

        if (playedTimes < targetRep) {
          setTimeout(() => {
            if (this.currentAudio === audio) {
              playNext();
            }
          }, 600);
        } else {
          this.currentAudio = null;
          if (onEnd) onEnd();
        }
      };

      audio.onerror = (e) => {
        console.warn('Audio element failed, falling back to Web Speech:', e);
        this.playSpeechSynthesisArabic(cleanText, options);
      };

      playNext();
    };

    // Check if we already cached the blob URL in memory
    if (this.blobUrlCache.has(cacheKey)) {
      playWithAudioElement(this.blobUrlCache.get(cacheKey)!);
      return () => {
        abortController.abort();
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio = null;
        }
      };
    }

    // Fetch from high quality server TTS endpoint
    fetch('/api/tts/arabic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, voice: voiceName }),
      signal: abortController.signal
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Server TTS error: ${response.status}`);
        }
        const blob = await response.blob();
        if (abortController.signal.aborted) return;

        const blobUrl = URL.createObjectURL(blob);
        this.blobUrlCache.set(cacheKey, blobUrl);
        playWithAudioElement(blobUrl);
      })
      .catch((err) => {
        if (abortController.signal.aborted) return;
        console.warn('Fetch Arabic audio failed, falling back to Web Speech Synthesis:', err);
        this.playSpeechSynthesisArabic(cleanText, options);
      });

    return () => {
      abortController.abort();
      this.stopAll();
    };
  }

  // Fallback using Browser Speech Synthesis with async voice matching
  public playSpeechSynthesisArabic(
    arabicText: string,
    options: AudioPlaybackOptions = {}
  ): () => void {
    if (!('speechSynthesis' in window)) {
      if (options.onError) options.onError(new Error('Browser tidak mendukung Speech Synthesis'));
      return () => {};
    }

    const {
      speed = 1.0,
      repeatCount = 1,
      onStart,
      onEnd,
      onError,
      onRepeatProgress
    } = options;

    let currentRep = 0;
    const targetRep = repeatCount === 999 ? Infinity : repeatCount;
    this.isSpeakingSpeech = true;

    const findArabicVoice = (): SpeechSynthesisVoice | null => {
      const voices = window.speechSynthesis.getVoices();
      return (
        voices.find(
          (v) =>
            v.lang.startsWith('ar') ||
            v.name.toLowerCase().includes('arabic') ||
            v.name.toLowerCase().includes('maged') ||
            v.name.toLowerCase().includes('tariq') ||
            v.name.toLowerCase().includes('laila')
        ) || null
      );
    };

    const speakOnce = () => {
      if (!this.isSpeakingSpeech) return;
      currentRep++;

      if (onRepeatProgress) {
        onRepeatProgress(currentRep, repeatCount === 999 ? 999 : repeatCount);
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(arabicText);
      utterance.lang = 'ar-SA';
      utterance.rate = speed === 0.75 ? 0.75 : speed === 1.25 ? 1.05 : 0.85;
      utterance.pitch = 1.05;

      const voice = findArabicVoice();
      if (voice) {
        utterance.voice = voice;
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
        console.warn('SpeechSynthesis error:', e);
        this.isSpeakingSpeech = false;
        if (onError) onError(e);
      };

      window.speechSynthesis.speak(utterance);
    };

    // If voices are not yet loaded, wait for voiceschanged
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        speakOnce();
      };
      // Timeout fallback in case voiceschanged never fires
      setTimeout(() => {
        if (this.isSpeakingSpeech && currentRep === 0) {
          speakOnce();
        }
      }, 250);
    } else {
      speakOnce();
    }

    return () => {
      this.isSpeakingSpeech = false;
      window.speechSynthesis.cancel();
    };
  }
}

export const audioLearningEngine = AudioLearningEngine.getInstance();
