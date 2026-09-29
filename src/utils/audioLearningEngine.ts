// Audio Learning Engine for Quran Murottal, Hadith Recitations & Doa
// Integrates EveryAyah CDN, QuranicAudio, Hisnul Muslim Qari Audio, and Gemini Qari Tartil TTS

import { getAuthenticAudioEntry, AuthenticAudioEntry } from '../data/authenticAudioMap';

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
  voiceName?: 'Charon' | 'Fenrir' | 'Aoede' | 'Kore' | 'Puck' | 'Zephyr';
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

    this.isSpeakingSpeech = false;
  }

  // Play direct audio URL (e.g. from Hisnul Muslim Qari or QuranicAudio CDN) with full repeat and speed support
  public playDirectAudioUrl(
    audioUrl: string,
    options: AudioPlaybackOptions = {}
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

    const audio = new Audio(audioUrl);
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
          console.warn('Direct audio play error:', err);
          if (onError) onError(err);
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
      console.warn('Audio stream failed for:', audioUrl, e);
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
      if (onError) onError(e);
    };

    playNext();

    return () => {
      audio.pause();
      if (this.currentAudio === audio) {
        this.currentAudio = null;
      }
    };
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

  // Play any authentic Arabic text (Doa Sholat, Doa Harian, Hadits) with high-clarity Qari Voice
  public playArabicText(
    arabicText: string,
    options: AudioPlaybackOptions = {},
    itemId?: string
  ): () => void {
    this.stopAll();

    const cleanText = arabicText ? arabicText.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim() : '';
    if (!cleanText) {
      if (options.onError) options.onError(new Error('Teks Arab kosong'));
      return () => {};
    }

    // 1. Check if there is an authentic human Qari audio file mapped for this item
    const authenticEntry = getAuthenticAudioEntry(itemId, cleanText);
    if (authenticEntry && authenticEntry.audioUrl) {
      return this.playDirectAudioUrl(authenticEntry.audioUrl, options);
    }

    const {
      speed = 1.0,
      repeatCount = 1,
      voiceName = 'Charon',
      onStart,
      onEnd,
      onError,
      onRepeatProgress
    } = options;

    const abortController = new AbortController();
    this.activeAbortController = abortController;

    const cacheKey = `v2:${voiceName}:${cleanText}`;

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
            console.warn('Audio playback error:', err);
            if (onError) onError(err);
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
        console.warn('Audio element error:', e);
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onError) onError(e);
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

    // Fetch from high quality server Qari Tartil TTS endpoint
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
        console.warn('Fetch Arabic Qari audio failed:', err);
        if (onError) onError(err);
      });

    return () => {
      abortController.abort();
      this.stopAll();
    };
  }

  // Universal Player for any Checklist Item (Surah, Doa Sholat, Doa Harian, Hadits)
  public playItem(
    item: { id?: string; category?: string; number?: number; arabic?: string; title?: string },
    options: AudioPlaybackOptions = {}
  ): () => void {
    if (item.category === 'surat') {
      const surahNum = item.number || 78;
      return this.playFullSurah(surahNum, options);
    }

    return this.playArabicText(item.arabic || '', options, item.id);
  }

  // Returns true if authentic recorded human Qari audio exists
  public isAuthenticQariRecording(item: { id?: string; category?: string; arabic?: string }): boolean {
    if (item.category === 'surat') return true;
    return getAuthenticAudioEntry(item.id, item.arabic) !== null;
  }

  // Get metadata about the reciter and audio source for display in UI
  public getAudioMeta(item: { id?: string; category?: string; number?: number; arabic?: string; title?: string }): {
    isAuthenticHuman: boolean;
    reciter: string;
    description: string;
  } {
    if (item.category === 'surat') {
      return {
        isAuthenticHuman: true,
        reciter: 'Syaikh Misyari Rasyid Al-Afasy & Syaikh Al-Minsyawi',
        description: 'Murottal Al-Qur’an Resmi Berstandar Tajwid Internasional'
      };
    }

    const authentic = getAuthenticAudioEntry(item.id, item.arabic);
    if (authentic) {
      return {
        isAuthenticHuman: true,
        reciter: authentic.reciter,
        description: `Pelafalan Asli Sunnah: ${authentic.sourceTitle}`
      };
    }

    return {
      isAuthenticHuman: false,
      reciter: 'Qari Tartil Bertajwid (Karakter Syaikh Khusyuk & Berwibawa)',
      description: 'Lafadz Tartil Fashahah Tajwid dengan Waqaf & Makhraj Jelas'
    };
  }
}

export const audioLearningEngine = AudioLearningEngine.getInstance();
