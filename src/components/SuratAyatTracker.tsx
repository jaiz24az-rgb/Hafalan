import React, { useState, useEffect, useRef } from 'react';
import {
  Check,
  CheckCircle2,
  Volume2,
  Sparkles,
  BookOpen,
  CheckSquare,
  Square,
  RotateCcw,
  Eye,
  EyeOff,
  Mic,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Repeat,
  Gauge,
  Headphones,
  SkipForward,
  SkipBack,
  VolumeX
} from 'lucide-react';
import { QuranAyah } from '../types';
import { audioEngine } from '../utils/soundAndNotification';
import {
  audioLearningEngine,
  QARI_LIST,
  PlaybackSpeed,
  RepeatCount,
  getQuranAyahAudioUrl
} from '../utils/audioLearningEngine';

interface SuratAyatTrackerProps {
  surahTitle: string;
  surahNumber?: number;
  targetRange?: string;
  ayahs: QuranAyah[];
  completedAyahs: number[];
  onToggleAyah: (ayahNumber: number) => void;
  onSetBatchAyahs: (uptoAyah: number) => void;
  onSelectAllAyahs: () => void;
  onClearAllAyahs: () => void;
  onOpenVoiceTestRange?: (startAyah: number, endAyah: number) => void;
}

export const SuratAyatTracker: React.FC<SuratAyatTrackerProps> = ({
  surahTitle,
  surahNumber = 1,
  targetRange,
  ayahs,
  completedAyahs,
  onToggleAyah,
  onSetBatchAyahs,
  onSelectAllAyahs,
  onClearAllAyahs,
  onOpenVoiceTestRange
}) => {
  const [hideArabicAll, setHideArabicAll] = useState(false);
  const [hideTranslationAll, setHideTranslationAll] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'uncompleted' | 'completed'>('all');

  // Audio Learning Player State
  const [selectedQariFolder, setSelectedQariFolder] = useState<string>('Husary_128kbps');
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [repeatMode, setRepeatMode] = useState<RepeatCount>(1);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState<boolean>(false);
  const [currentRepetition, setCurrentRepetition] = useState<{ current: number; total: number }>({ current: 1, total: 1 });
  const [audioError, setAudioError] = useState<string | null>(null);

  const totalAyahs = ayahs.length;
  const completedCount = completedAyahs.length;
  const progressPercent = totalAyahs > 0 ? Math.round((completedCount / totalAyahs) * 100) : 0;

  const currentStopFnRef = useRef<(() => void) | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (currentStopFnRef.current) {
        currentStopFnRef.current();
      }
      audioLearningEngine.stopAll();
    };
  }, []);

  // Scroll active ayah into view during playback
  useEffect(() => {
    if (currentPlayingAyah !== null && ayahRefs.current[currentPlayingAyah]) {
      ayahRefs.current[currentPlayingAyah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentPlayingAyah]);

  // Handle playing a specific Ayah
  const playAyah = (ayahNum: number, continuous: boolean = false) => {
    const targetAyah = ayahs.find((a) => a.number === ayahNum);
    if (!targetAyah) {
      stopAudio();
      return;
    }

    if (currentStopFnRef.current) {
      currentStopFnRef.current();
      currentStopFnRef.current = null;
    }

    setCurrentPlayingAyah(ayahNum);
    setIsPlayingContinuous(continuous);
    setAudioError(null);

    const stopFn = audioLearningEngine.playQuranAyah(
      surahNumber,
      ayahNum,
      targetAyah.arabic,
      {
        qariFolder: selectedQariFolder,
        speed: playbackSpeed,
        repeatCount: continuous ? 1 : repeatMode, // When continuous, play each ayah once then next
        onStart: () => {
          // playing
        },
        onRepeatProgress: (curr, total) => {
          setCurrentRepetition({ current: curr, total });
        },
        onEnd: () => {
          if (continuous) {
            // Find next ayah
            const currentIndex = ayahs.findIndex((a) => a.number === ayahNum);
            if (currentIndex >= 0 && currentIndex < ayahs.length - 1) {
              const nextAyah = ayahs[currentIndex + 1];
              // Small delay between continuous verses
              setTimeout(() => {
                playAyah(nextAyah.number, true);
              }, 400);
            } else {
              // Reached the end of surah
              setCurrentPlayingAyah(null);
              setIsPlayingContinuous(false);
              audioEngine.playVictorySound();
            }
          } else {
            setCurrentPlayingAyah(null);
          }
        },
        onError: (err) => {
          console.warn('Audio playback error:', err);
          setAudioError('Menggunakan pelafalan alternatif (Web Speech)');
        }
      }
    );

    currentStopFnRef.current = stopFn;
  };

  const stopAudio = () => {
    if (currentStopFnRef.current) {
      currentStopFnRef.current();
      currentStopFnRef.current = null;
    }
    audioLearningEngine.stopAll();
    setCurrentPlayingAyah(null);
    setIsPlayingContinuous(false);
  };

  const handleTogglePlayAyah = (ayahNum: number) => {
    if (currentPlayingAyah === ayahNum) {
      stopAudio();
    } else {
      playAyah(ayahNum, false);
    }
  };

  const handlePlayFullSurah = () => {
    if (isPlayingContinuous) {
      stopAudio();
    } else {
      if (ayahs.length > 0) {
        playAyah(ayahs[0].number, true);
      }
    }
  };

  const handleNextAyah = () => {
    if (currentPlayingAyah === null) {
      if (ayahs.length > 0) playAyah(ayahs[0].number, isPlayingContinuous);
      return;
    }
    const idx = ayahs.findIndex((a) => a.number === currentPlayingAyah);
    if (idx < ayahs.length - 1) {
      playAyah(ayahs[idx + 1].number, isPlayingContinuous);
    }
  };

  const handlePrevAyah = () => {
    if (currentPlayingAyah === null) return;
    const idx = ayahs.findIndex((a) => a.number === currentPlayingAyah);
    if (idx > 0) {
      playAyah(ayahs[idx - 1].number, isPlayingContinuous);
    }
  };

  const filteredAyahs = ayahs.filter((ayah) => {
    const isDone = completedAyahs.includes(ayah.number);
    if (filterMode === 'completed') return isDone;
    if (filterMode === 'uncompleted') return !isDone;
    return true;
  });

  const selectedQari = QARI_LIST.find((q) => q.folder === selectedQariFolder) || QARI_LIST[0];

  return (
    <div className="space-y-4">
      {/* 1. Capaian Hafalan Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-emerald-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white/20 text-emerald-100 text-[11px] font-semibold">
                📖 Per-Ayat Tracker
              </span>
              <span className="text-xs text-emerald-200">{targetRange || `${totalAyahs} Ayat`}</span>
            </div>
            <h4 className="text-base font-bold text-white">
              Capaian Hafalan: {completedCount} dari {totalAyahs} Ayat ({progressPercent}%)
            </h4>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onSelectAllAyahs}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Hafal Semua</span>
            </button>
            <button
              type="button"
              onClick={onClearAllAyahs}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-emerald-100 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-emerald-950/60 rounded-full h-3 overflow-hidden p-0.5 border border-emerald-600/40">
          <div
            className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Audio Belajar & Murottal Player Box */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-emerald-700/50 shadow-lg space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/30">
              <Headphones className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                <span>Contoh Bacaan Tartil & Murottal</span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                  Audio Qari
                </span>
              </h5>
              <p className="text-[11px] text-slate-300">
                Dengarkan lafaz yang benar dengan makhorijul huruf & hukum tajwid presisi untuk belajar.
              </p>
            </div>
          </div>

          {/* Qari Selector Dropdown */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedQariFolder}
              onChange={(e) => {
                stopAudio();
                setSelectedQariFolder(e.target.value);
              }}
              className="bg-emerald-950/80 border border-emerald-600/50 text-white text-xs rounded-xl px-2.5 py-1.5 font-medium focus:ring-2 focus:ring-emerald-400 cursor-pointer"
            >
              {QARI_LIST.map((qari) => (
                <option key={qari.id} value={qari.folder} className="bg-slate-900 text-white">
                  🎙️ {qari.name} ({qari.subname})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audio Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Main Play Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayFullSurah}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                isPlayingContinuous
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/30'
              }`}
            >
              {isPlayingContinuous ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Jeda Putar Surah</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Putar Semua Ayat Berurutan</span>
                </>
              )}
            </button>

            {currentPlayingAyah !== null && (
              <div className="flex items-center gap-1 bg-emerald-950/70 border border-emerald-700/60 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={handlePrevAyah}
                  className="p-1.5 hover:bg-emerald-800/60 rounded-lg text-emerald-200 text-xs transition-colors cursor-pointer"
                  title="Ayat Sebelumnya"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-amber-300 px-2">
                  Ayat {currentPlayingAyah}
                </span>
                <button
                  type="button"
                  onClick={handleNextAyah}
                  className="p-1.5 hover:bg-emerald-800/60 rounded-lg text-emerald-200 text-xs transition-colors cursor-pointer"
                  title="Ayat Berikutnya"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={stopAudio}
                  className="p-1.5 hover:bg-red-900/60 rounded-lg text-red-300 text-xs transition-colors cursor-pointer ml-1"
                  title="Hentikan Audio"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Speed and Tikrar Settings */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Speed Control */}
            <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/40 text-xs">
              <Gauge className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              <span className="text-[11px] text-slate-300 mr-1 font-medium">Tempo:</span>
              {([0.75, 1.0, 1.25] as PlaybackSpeed[]).map((spd) => (
                <button
                  key={`spd-${spd}`}
                  type="button"
                  onClick={() => {
                    setPlaybackSpeed(spd);
                    if (currentPlayingAyah !== null) {
                      playAyah(currentPlayingAyah, isPlayingContinuous);
                    }
                  }}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {spd === 0.75 ? '0.75x (Lambat)' : `${spd}x`}
                </button>
              ))}
            </div>

            {/* Repeat Tikrar Mode */}
            <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/40 text-xs">
              <Repeat className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              <span className="text-[11px] text-slate-300 mr-1 font-medium">Ulang:</span>
              {([1, 3, 5] as RepeatCount[]).map((rep) => (
                <button
                  key={`rep-${rep}`}
                  type="button"
                  onClick={() => setRepeatMode(rep)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                    repeatMode === rep
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                  title={rep > 1 ? `Ulangi setiap ayat ${rep} kali (Metode Tikrar hafalan)` : 'Putar 1 kali'}
                >
                  {rep}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active playback banner */}
        {currentPlayingAyah !== null && (
          <div className="bg-emerald-800/40 border border-emerald-600/40 px-3 py-2 rounded-xl flex items-center justify-between text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span>
                Sedang Memutar: <strong>Ayat {currentPlayingAyah}</strong> • {selectedQari.name}
              </span>
              {repeatMode > 1 && !isPlayingContinuous && (
                <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[10px]">
                  Pengulangan {currentRepetition.current}/{currentRepetition.total}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-300 italic">
              {playbackSpeed === 0.75 ? 'Tempo lambat untuk menyimak tajwid' : 'Tempo standar'}
            </span>
          </div>
        )}
      </div>

      {/* 3. Controls: Filter & Visibility Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600">Tampilkan:</span>
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2 py-1 rounded-md font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Semua ({totalAyahs})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('uncompleted')}
            className={`px-2 py-1 rounded-md font-medium transition-all ${
              filterMode === 'uncompleted'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Belum ({totalAyahs - completedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('completed')}
            className={`px-2 py-1 rounded-md font-medium transition-all ${
              filterMode === 'completed'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Selesai ({completedCount})
          </button>
        </div>

        {/* Hide/Show Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHideArabicAll(!hideArabicAll)}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              hideArabicAll
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {hideArabicAll ? <EyeOff className="w-3 h-3 text-amber-700" /> : <Eye className="w-3 h-3" />}
            <span>{hideArabicAll ? 'Tutup Arab' : 'Buka Arab'}</span>
          </button>
          <button
            type="button"
            onClick={() => setHideTranslationAll(!hideTranslationAll)}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              hideTranslationAll
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {hideTranslationAll ? <EyeOff className="w-3 h-3 text-amber-700" /> : <Eye className="w-3 h-3" />}
            <span>{hideTranslationAll ? 'Tutup Arti' : 'Buka Arti'}</span>
          </button>
        </div>
      </div>

      {/* 4. Verses List */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
        {filteredAyahs.map((ayah) => {
          const isDone = completedAyahs.includes(ayah.number);
          const isPlaying = currentPlayingAyah === ayah.number;

          return (
            <div
              key={`ayah-${ayah.number}`}
              ref={(el) => {
                ayahRefs.current[ayah.number] = el;
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                isPlaying
                  ? 'bg-amber-50/90 border-amber-400 ring-2 ring-amber-300 shadow-md scale-[1.005]'
                  : isDone
                  ? 'bg-emerald-50/70 border-emerald-300/80 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:border-emerald-200'
              }`}
            >
              {/* Ayah Header Row */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleAyah(ayah.number)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 border border-slate-200'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Ayat {ayah.number}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSetBatchAyahs(ayah.number)}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer"
                    title={`Tandai hafalan sudah sampai ayat ${ayah.number}`}
                  >
                    ⚡ Hafal s.d. Ayat {ayah.number}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Play Single Ayah Audio Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePlayAyah(ayah.number)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-500 text-slate-950 shadow-md animate-pulse'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                    title="Dengarkan contoh bacaan ayat ini"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Jeda</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current text-emerald-700" />
                        <span>Dengar</span>
                      </>
                    )}
                  </button>

                  {onOpenVoiceTestRange && (
                    <button
                      type="button"
                      onClick={() => onOpenVoiceTestRange(ayah.number, ayah.number)}
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs transition-colors cursor-pointer"
                      title={`Uji suara AI ayat ${ayah.number}`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Arabic Text */}
              {hideArabicAll ? (
                <div className="py-3 text-center bg-slate-50 rounded-xl text-slate-400 text-xs italic">
                  🔒 Teks Arab disembunyikan untuk latihan hafalan
                </div>
              ) : (
                <p
                  className={`font-serif text-xl sm:text-2xl text-right leading-loose font-bold my-1 tracking-wide transition-colors ${
                    isPlaying ? 'text-amber-950' : 'text-emerald-950'
                  }`}
                >
                  {ayah.arabic}{' '}
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-sans align-middle ml-2 font-bold ${
                      isPlaying
                        ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {ayah.number}
                  </span>
                </p>
              )}

              {/* Latin */}
              {ayah.latin && (
                <p className="text-xs text-slate-600 font-medium italic mt-1.5">
                  {ayah.latin}
                </p>
              )}

              {/* Translation */}
              {!hideTranslationAll && ayah.translation && (
                <p className="text-xs text-slate-700 bg-slate-50/80 p-2 rounded-lg border border-slate-100 mt-1.5 leading-relaxed">
                  <span className="font-semibold text-slate-500">Arti: </span>
                  {ayah.translation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
