import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  Eye,
  EyeOff,
  BookOpen,
  Award,
  Calendar,
  Sparkles,
  Save,
  Mic,
  ListOrdered,
  Layers,
  GraduationCap,
  Play,
  Pause,
  Repeat,
  Gauge,
  Headphones
} from 'lucide-react';
import { ChecklistItem, CompletionStatus, DayRecord } from '../types';
import { audioEngine } from '../utils/soundAndNotification';
import { getSurahAyahs, QURAN_JUZ_30_DATA } from '../data/quranAyatData';
import { SuratAyatTracker } from './SuratAyatTracker';
import { HaditsPracticeTrainer } from './HaditsPracticeTrainer';
import { audioLearningEngine, PlaybackSpeed, RepeatCount } from '../utils/audioLearningEngine';

interface ItemDetailModalProps {
  item: ChecklistItem | null;
  dayRecord: DayRecord;
  currentDate: string;
  onClose: () => void;
  onSaveProgress: (
    itemId: string,
    completed: boolean,
    status: CompletionStatus,
    note: string,
    paraf: string,
    completedAyahs?: number[],
    lastAyahMemorized?: number,
    totalAyahsCount?: number
  ) => void;
  onOpenVoiceTestModal?: (item: ChecklistItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  dayRecord,
  currentDate,
  onClose,
  onSaveProgress,
  onOpenVoiceTestModal
}) => {
  if (!item) return null;

  const currentProgress = dayRecord[item.id] || { completed: false };
  const [completed, setCompleted] = useState<boolean>(currentProgress.completed || false);
  const [status, setStatus] = useState<CompletionStatus>(currentProgress.status || 'lancar');
  const [note, setNote] = useState<string>(currentProgress.note || '');
  const [paraf, setParaf] = useState<string>(currentProgress.paraf || '');
  const [hideArabic, setHideArabic] = useState<boolean>(false);
  const [hideTranslation, setHideTranslation] = useState<boolean>(false);

  // Audio learning controls for overview
  const [speed, setSpeed] = useState<PlaybackSpeed>(1.0);
  const [repeat, setRepeat] = useState<RepeatCount>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentRep, setCurrentRep] = useState<{ current: number; total: number }>({ current: 1, total: 1 });
  const stopAudioRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (stopAudioRef.current) stopAudioRef.current();
      audioLearningEngine.stopAll();
    };
  }, []);

  // Quran Verses setup
  const isSurat = item.category === 'surat';
  const surahAyahs = isSurat ? getSurahAyahs(item.id, item.number, item.targetRange) : [];
  const hasAyahs = surahAyahs.length > 0;
  const surahNumber = item.number || QURAN_JUZ_30_DATA[item.id]?.surahNumber || (isSurat ? (parseInt(item.id.replace(/\D/g, ''), 10) || 1) : 1);

  const [completedAyahs, setCompletedAyahs] = useState<number[]>(
    currentProgress.completedAyahs || (currentProgress.completed && hasAyahs ? surahAyahs.map(a => a.number) : [])
  );

  // Tab mode
  const initialTab = hasAyahs ? 'ayahs' : (item.category === 'hadits' ? 'hadits_practice' : 'overview');
  const [activeViewTab, setActiveViewTab] = useState<'overview' | 'ayahs' | 'hadits_practice'>(initialTab);

  // Toggle single ayah
  const handleToggleAyah = (num: number) => {
    let next: number[];
    if (completedAyahs.includes(num)) {
      next = completedAyahs.filter(n => n !== num);
      audioEngine.playUncheckSound();
    } else {
      next = [...completedAyahs, num].sort((a, b) => a - b);
      audioEngine.playCheckSound();
    }
    setCompletedAyahs(next);

    // Auto mark surah completed if all ayahs done
    if (surahAyahs.length > 0 && next.length === surahAyahs.length) {
      setCompleted(true);
    }
  };

  // Batch mark up to ayah X
  const handleSetBatchAyahs = (uptoAyah: number) => {
    const next = surahAyahs.filter(a => a.number <= uptoAyah).map(a => a.number);
    setCompletedAyahs(next);
    audioEngine.playCheckSound();
    if (next.length === surahAyahs.length) {
      setCompleted(true);
    }
  };

  // Select all ayahs
  const handleSelectAllAyahs = () => {
    const all = surahAyahs.map(a => a.number);
    setCompletedAyahs(all);
    setCompleted(true);
    audioEngine.playCelebrationSound();
  };

  // Clear all ayahs
  const handleClearAllAyahs = () => {
    setCompletedAyahs([]);
    audioEngine.playUncheckSound();
  };

  const handleSave = () => {
    if (completed && !currentProgress.completed) {
      audioEngine.playCheckSound();
    }

    const lastAyah = completedAyahs.length > 0 ? Math.max(...completedAyahs) : undefined;
    const totalCount = surahAyahs.length > 0 ? surahAyahs.length : undefined;

    onSaveProgress(
      item.id,
      completed,
      status,
      note,
      paraf,
      hasAyahs ? completedAyahs : undefined,
      lastAyah,
      totalCount
    );
    onClose();
  };

  const handleTogglePlayOverviewSound = () => {
    if (isPlayingAudio) {
      if (stopAudioRef.current) stopAudioRef.current();
      audioLearningEngine.stopAll();
      setIsPlayingAudio(false);
      return;
    }

    if (!item.arabic) return;

    setIsPlayingAudio(true);
    const stopFn = audioLearningEngine.playSpeechArabic(item.arabic, {
      speed,
      repeatCount: repeat,
      onRepeatProgress: (c, t) => setCurrentRep({ current: c, total: t }),
      onEnd: () => {
        setIsPlayingAudio(false);
        audioEngine.playChime();
      },
      onError: () => setIsPlayingAudio(false)
    });
    stopAudioRef.current = stopFn;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4 sm:my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-xs font-bold backdrop-blur-xs">
                {item.number ? `#${item.number}` : item.category.toUpperCase()}
              </span>
              {item.targetRange && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-200 text-xs font-medium">
                  {item.targetRange}
                </span>
              )}
              {hasAyahs && (
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950 text-[11px] font-bold">
                  {surahAyahs.length} Ayat Lengkap
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Header Navigation */}
        {(hasAyahs || item.category === 'hadits') && (
          <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 bg-slate-100 border-b border-slate-200 shrink-0">
            {hasAyahs && (
              <button
                type="button"
                onClick={() => setActiveViewTab('ayahs')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-t border-x ${
                  activeViewTab === 'ayahs'
                    ? 'bg-white text-emerald-800 border-slate-200 shadow-2xs'
                    : 'bg-slate-200/60 hover:bg-slate-200 text-slate-600 border-transparent'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
                <span>📖 Seluruh Ayat & Audio ({completedAyahs.length}/{surahAyahs.length})</span>
              </button>
            )}

            {item.category === 'hadits' && (
              <button
                type="button"
                onClick={() => setActiveViewTab('hadits_practice')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-t border-x ${
                  activeViewTab === 'hadits_practice'
                    ? 'bg-white text-emerald-800 border-slate-200 shadow-2xs'
                    : 'bg-slate-200/60 hover:bg-slate-200 text-slate-600 border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>🎯 Latihan & Audio Hadits</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveViewTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer border-t border-x ${
                activeViewTab === 'overview'
                  ? 'bg-white text-emerald-800 border-slate-200 shadow-2xs'
                  : 'bg-slate-200/60 hover:bg-slate-200 text-slate-600 border-transparent'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
              <span>📋 Catatan & Penilaian</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto grow">
          
          {/* TAB 1: Quran Verses List & Checkbox */}
          {activeViewTab === 'ayahs' && hasAyahs && (
            <SuratAyatTracker
              surahTitle={item.title}
              surahNumber={surahNumber}
              targetRange={item.targetRange}
              ayahs={surahAyahs}
              completedAyahs={completedAyahs}
              onToggleAyah={handleToggleAyah}
              onSetBatchAyahs={handleSetBatchAyahs}
              onSelectAllAyahs={handleSelectAllAyahs}
              onClearAllAyahs={handleClearAllAyahs}
              onOpenVoiceTestRange={(start, end) => {
                if (onOpenVoiceTestModal) {
                  onClose();
                  onOpenVoiceTestModal(item);
                }
              }}
            />
          )}

          {/* TAB 2: Hadith Practice Trainer */}
          {activeViewTab === 'hadits_practice' && item.category === 'hadits' && (
            <HaditsPracticeTrainer
              item={item}
              onOpenVoiceTestModal={(it) => {
                if (onOpenVoiceTestModal) {
                  onClose();
                  onOpenVoiceTestModal(it);
                }
              }}
            />
          )}

          {/* TAB 3 / DEFAULT: Overview & Evaluation Form */}
          {activeViewTab === 'overview' && (
            <div className="space-y-5">
              {/* AI Voice Test Callout */}
              {onOpenVoiceTestModal && (item.arabic || item.category === 'surat' || item.category === 'hadits' || item.category === 'doa_harian' || item.category === 'doa_sholat') && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Tes Akurasi Bacaan & Tajwid dengan Suara AI
                    </span>
                    <p className="text-xs text-amber-800/80">
                      Rekam suara hafalan Anda untuk dianalisis makhraj, tajwid, dan kelancarannya secara otomatis.
                    </p>
                    {currentProgress.lastTestScore !== undefined && (
                      <div className="pt-1 text-xs font-semibold text-emerald-800">
                        🏆 Hasil Terakhir: <strong>{currentProgress.lastTestScore}% ({currentProgress.lastTestGrade || 'Selesai'})</strong>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenVoiceTestModal(item);
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Mulai Tes Suara</span>
                  </button>
                </div>
              )}

              {/* Audio Player Toolbar for Overview */}
              {item.arabic && (
                <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-emerald-700/40 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-300">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-200 flex items-center gap-1">
                        Contoh Audio Pelafalan
                      </span>
                      <p className="text-[10px] text-slate-300">
                        Dengarkan contoh bacaan makhraj & harakat
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Speed */}
                    <div className="flex items-center gap-1 bg-emerald-950 p-1 rounded-lg border border-emerald-700/40 text-xs">
                      <Gauge className="w-3 h-3 text-emerald-400" />
                      {([0.75, 1.0] as PlaybackSpeed[]).map((s) => (
                        <button
                          key={`ov-spd-${s}`}
                          type="button"
                          onClick={() => setSpeed(s)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            speed === s ? 'bg-amber-400 text-slate-950' : 'text-slate-300'
                          }`}
                        >
                          {s === 0.75 ? '0.75x' : '1.0x'}
                        </button>
                      ))}
                    </div>

                    {/* Repeat */}
                    <div className="flex items-center gap-1 bg-emerald-950 p-1 rounded-lg border border-emerald-700/40 text-xs">
                      <Repeat className="w-3 h-3 text-emerald-400" />
                      {([1, 3, 5] as RepeatCount[]).map((r) => (
                        <button
                          key={`ov-rep-${r}`}
                          type="button"
                          onClick={() => setRepeat(r)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            repeat === r ? 'bg-emerald-500 text-white' : 'text-slate-300'
                          }`}
                        >
                          {r}x
                        </button>
                      ))}
                    </div>

                    {/* Play Button */}
                    <button
                      type="button"
                      onClick={handleTogglePlayOverviewSound}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-amber-400 text-slate-950 animate-pulse shadow-md'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Jeda</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Putar Suara</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Practice Toggle Buttons (Uji Hafalan) */}
              {item.arabic && (
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Mode Uji Hafalan Mandiri:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setHideArabic(!hideArabic)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                        hideArabic ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {hideArabic ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{hideArabic ? 'Buka Arab' : 'Tutup Arab'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHideTranslation(!hideTranslation)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                        hideTranslation ? 'bg-amber-100 text-amber-900 font-bold' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {hideTranslation ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{hideTranslation ? 'Buka Arti' : 'Tutup Arti'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Arabic Text Display */}
              {item.arabic && (
                <div className="bg-emerald-50/50 rounded-2xl p-5 sm:p-6 border border-emerald-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-100/80 pb-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Lafadz / Teks Arab
                    </span>
                    <button
                      type="button"
                      onClick={handleTogglePlayOverviewSound}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'Sedang Diputar...' : 'Dengarkan'}</span>
                    </button>
                  </div>

                  {hideArabic ? (
                    <div className="py-8 text-center bg-white/60 rounded-xl border border-dashed border-emerald-300 text-emerald-700 text-sm font-medium">
                      🔒 Teks Arab disembunyikan untuk melatih ingatan hafalan Anda.
                    </div>
                  ) : (
                    <p className="font-serif text-xl sm:text-2xl text-right leading-loose text-emerald-950 font-bold tracking-wide">
                      {item.arabic}
                    </p>
                  )}

                  {/* Latin Transliteration */}
                  {item.latin && (
                    <div className="pt-2 border-t border-emerald-100/60">
                      <p className="text-xs font-medium text-emerald-900/70 mb-0.5">Transliterasi:</p>
                      <p className="text-sm font-medium text-slate-700 italic">
                        "{item.latin}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Translation */}
              {item.translation && (
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Arti & Terjemahan
                  </h4>
                  {hideTranslation ? (
                    <p className="text-xs text-amber-700 italic bg-amber-50 p-2 rounded-md">
                      🔒 Terjemahan disembunyikan untuk menguji pemahaman makna.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.translation}
                    </p>
                  )}
                </div>
              )}

              {/* Checklist & Status Toggle */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-slate-800 block">Status Hafalan Hari Ini</span>
                    <span className="text-xs text-slate-500">Tandai jika siswa telah menyetorkan hafalan</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !completed;
                      setCompleted(next);
                      if (next) {
                        audioEngine.playCheckSound();
                        if (hasAyahs && completedAyahs.length === 0) {
                          setCompletedAyahs(surahAyahs.map((a) => a.number));
                        }
                      } else {
                        audioEngine.playUncheckSound();
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      completed
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${completed ? 'text-white' : 'text-slate-400'}`} />
                    <span>{completed ? 'Hafal / Selesai' : 'Belum Selesai'}</span>
                  </button>
                </div>

                {/* Quality / Lancar Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">
                    Tingkat Kelancaran:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['lancar', 'mutqin', 'proses'] as CompletionStatus[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatus(st)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                          status === st
                            ? st === 'lancar'
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-800 ring-2 ring-emerald-300'
                              : st === 'mutqin'
                              ? 'bg-amber-100 border-amber-400 text-amber-800 ring-2 ring-amber-300'
                              : 'bg-red-100 border-red-400 text-red-800 ring-2 ring-red-300'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {st === 'proses' ? 'Perlu Diulang' : st === 'mutqin' ? 'Mutqin (Kuat)' : 'Lancar'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">
                    Catatan Pembimbing / Orang Tua:
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Perhatikan panjang mad pada ayat ke-3 dan dengung nun tasydid..."
                    rows={3}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden resize-none bg-slate-50"
                  />
                </div>

                {/* Paraf Guru / Orang Tua */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">
                    Nama / Inisial Paraf Penilai:
                  </label>
                  <input
                    type="text"
                    value={paraf}
                    onChange={(e) => setParaf(e.target.value)}
                    placeholder="Contoh: Ust. Ahmad / Ibu"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden bg-slate-50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Capaian</span>
          </button>
        </div>
      </div>
    </div>
  );
};
