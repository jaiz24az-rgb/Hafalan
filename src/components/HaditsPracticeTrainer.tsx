import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  BookOpen,
  Award,
  Eye,
  EyeOff,
  Layers,
  HelpCircle,
  Mic,
  RotateCcw,
  Check,
  ChevronRight,
  Play,
  Pause,
  Repeat,
  Gauge,
  Headphones,
  VolumeX
} from 'lucide-react';
import { DetailedHadithPractice, getDetailedHadith } from '../data/haditsPracticeData';
import { audioEngine } from '../utils/soundAndNotification';
import { audioLearningEngine, PlaybackSpeed, RepeatCount } from '../utils/audioLearningEngine';
import { ChecklistItem } from '../types';

interface HaditsPracticeTrainerProps {
  item: ChecklistItem;
  onOpenVoiceTestModal?: (item: ChecklistItem) => void;
}

export const HaditsPracticeTrainer: React.FC<HaditsPracticeTrainerProps> = ({
  item,
  onOpenVoiceTestModal
}) => {
  const detailed = getDetailedHadith(item.id);
  const [activeTab, setActiveTab] = useState<'chunks' | 'quiz' | 'fawaid'>('chunks');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [revealedChunks, setRevealedChunks] = useState<number[]>([0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Audio state
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [repeatCount, setRepeatCount] = useState<RepeatCount>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playingTarget, setPlayingTarget] = useState<'chunk' | 'full' | null>(null);
  const [currentRepetition, setCurrentRepetition] = useState<{ current: number; total: number }>({ current: 1, total: 1 });

  const currentStopFnRef = useRef<(() => void) | null>(null);

  // Fallback chunks if not detailed
  const chunks = detailed?.chunks || [
    { step: 1, arabic: item.arabic || '', latin: item.latin || '', translation: item.translation || '' }
  ];

  const fullArabicText = detailed?.arabicFull || item.arabic || '';

  useEffect(() => {
    return () => {
      if (currentStopFnRef.current) {
        currentStopFnRef.current();
      }
      audioLearningEngine.stopAll();
    };
  }, []);

  const stopAudio = () => {
    if (currentStopFnRef.current) {
      currentStopFnRef.current();
      currentStopFnRef.current = null;
    }
    audioLearningEngine.stopAll();
    setIsPlayingAudio(false);
    setPlayingTarget(null);
  };

  const handlePlayAudioChunk = (arabicText: string, stepIndex: number) => {
    if (isPlayingAudio && playingTarget === 'chunk' && currentStep === stepIndex) {
      stopAudio();
      return;
    }

    stopAudio();
    setIsPlayingAudio(true);
    setPlayingTarget('chunk');

    const stopFn = audioLearningEngine.playSpeechArabic(arabicText, {
      speed: playbackSpeed,
      repeatCount,
      onRepeatProgress: (curr, total) => {
        setCurrentRepetition({ current: curr, total });
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setPlayingTarget(null);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setPlayingTarget(null);
      }
    });

    currentStopFnRef.current = stopFn;
  };

  const handlePlayFullHadith = () => {
    if (isPlayingAudio && playingTarget === 'full') {
      stopAudio();
      return;
    }

    stopAudio();
    setIsPlayingAudio(true);
    setPlayingTarget('full');

    const stopFn = audioLearningEngine.playSpeechArabic(fullArabicText, {
      speed: playbackSpeed,
      repeatCount,
      onRepeatProgress: (curr, total) => {
        setCurrentRepetition({ current: curr, total });
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setPlayingTarget(null);
        audioEngine.playCelebrationSound();
      },
      onError: () => {
        setIsPlayingAudio(false);
        setPlayingTarget(null);
      }
    });

    currentStopFnRef.current = stopFn;
  };

  const handleNextStep = () => {
    if (currentStep < chunks.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (!revealedChunks.includes(next)) {
        setRevealedChunks([...revealedChunks, next]);
      }
      audioEngine.playCheckSound();
    }
  };

  const handleSelectOption = (index: number) => {
    if (!detailed?.quizFillBlank) return;
    setSelectedAnswer(index);
    const correct = index === detailed.quizFillBlank.correctIndex;
    setIsAnswerCorrect(correct);
    if (correct) {
      audioEngine.playCelebrationSound();
    } else {
      audioEngine.playChime();
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  return (
    <div className="space-y-4">
      {/* Audio Learning Toolbar for Hadith */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl border border-emerald-700/50 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/30">
            <Headphones className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
              <span>Audio Pelafalan Hadits yang Benar</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                Tutor Suara
              </span>
            </h5>
            <p className="text-[11px] text-slate-300">
              Dengarkan pengucapan fashahah, waqaf, dan harakat yang tepat.
            </p>
          </div>
        </div>

        {/* Speed & Repeat Settings */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/40 text-xs">
            <Gauge className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            <span className="text-[11px] text-slate-300 mr-1 font-medium">Tempo:</span>
            {([0.75, 1.0] as PlaybackSpeed[]).map((spd) => (
              <button
                key={`h-spd-${spd}`}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {spd === 0.75 ? '0.75x (Lambat)' : '1.0x (Normal)'}
              </button>
            ))}
          </div>

          {/* Repeat Tikrar */}
          <div className="flex items-center gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-700/40 text-xs">
            <Repeat className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            <span className="text-[11px] text-slate-300 mr-1 font-medium">Ulang:</span>
            {([1, 3, 5] as RepeatCount[]).map((rep) => (
              <button
                key={`h-rep-${rep}`}
                type="button"
                onClick={() => setRepeatCount(rep)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all text-xs cursor-pointer ${
                  repeatCount === rep
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
                title={rep > 1 ? `Ulangi suara ${rep} kali (Metode Tikrar)` : 'Putar 1 kali'}
              >
                {rep}x
              </button>
            ))}
          </div>

          {/* Full Hadith Play Button */}
          <button
            type="button"
            onClick={handlePlayFullHadith}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
              isPlayingAudio && playingTarget === 'full'
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlayingAudio && playingTarget === 'full' ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda Matan Penuh</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Putar Matan Penuh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('chunks')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chunks'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Latihan Potongan Frasa ({chunks.length} Tahap)</span>
        </button>

        {detailed?.quizFillBlank && (
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kuis Sambung Lafadz</span>
          </button>
        )}

        {detailed?.fawaid && detailed.fawaid.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('fawaid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'fawaid'
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pelajaran / Fawaid</span>
          </button>
        )}
      </div>

      {/* TAB 1: Chunk by Chunk Practice */}
      {activeTab === 'chunks' && (
        <div className="space-y-4">
          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">
              💡 Metode Menghafal: Dengarkan dan tirukan pelafalan per potongan frasa secara bertahap.
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800 font-bold text-[11px]">
              Tahap {currentStep + 1} dari {chunks.length}
            </span>
          </div>

          {/* Current Active Chunk Highlight Card */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl shadow-lg border border-emerald-700 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-700/60 pb-2">
              <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Potongan Frasa Ke-{currentStep + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePlayAudioChunk(chunks[currentStep].arabic, currentStep)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isPlayingAudio && playingTarget === 'chunk'
                      ? 'bg-amber-400 text-slate-950 animate-pulse shadow-md'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {isPlayingAudio && playingTarget === 'chunk' ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Jeda Suara</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengarkan Lafadz</span>
                    </>
                  )}
                </button>
                {repeatCount > 1 && isPlayingAudio && (
                  <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[10px]">
                    Ulang {currentRepetition.current}/{currentRepetition.total}
                  </span>
                )}
              </div>
            </div>

            <p className="font-mushaf arabic-mushaf-text text-2xl sm:text-3xl text-right text-amber-200 font-bold tracking-wide">
              {chunks[currentStep].arabic}
            </p>

            <div className="pt-2 border-t border-emerald-700/60 space-y-1">
              <p className="text-xs text-emerald-200 italic font-medium">
                "{chunks[currentStep].latin}"
              </p>
              <p className="text-xs text-white/90">
                <strong>Artinya: </strong>
                {chunks[currentStep].translation}
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 disabled:opacity-40 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ← Frasa Sebelumnya
            </button>

            {currentStep < chunks.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <span>Lanjut Frasa Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  Semua frasa selesai dipelajari!
                </span>
                {onOpenVoiceTestModal && (
                  <button
                    type="button"
                    onClick={() => onOpenVoiceTestModal(item)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Uji Suara AI</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Full Assembled Hadith Overview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Susunan Lengkap Matan Hadits:
              </span>
              <button
                type="button"
                onClick={handlePlayFullHadith}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Putar Lengkap</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 text-right">
              {chunks.map((c, i) => (
                <button
                  key={`chunk-part-${i}`}
                  type="button"
                  onClick={() => {
                    setCurrentStep(i);
                    handlePlayAudioChunk(c.arabic, i);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-sm font-mushaf font-bold transition-all cursor-pointer ${
                    currentStep === i
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-emerald-950 border border-slate-200 hover:border-emerald-400'
                  }`}
                  title="Klik untuk menyimak potongan frasa ini"
                >
                  {c.arabic}
                </button>
              ))}
            </div>
            {detailed?.rawi && (
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                📌 Takhrij / Perawi: <strong>{detailed.rawi}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Quiz Fill in the blank */}
      {activeTab === 'quiz' && detailed?.quizFillBlank && (
        <div className="space-y-4 p-4 sm:p-5 bg-amber-50/60 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Lengkapi Kalimat Hadits yang Hilang:
            </span>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Ulangi Kuis
            </button>
          </div>

          <div className="p-4 bg-white rounded-xl border border-amber-200 text-center shadow-xs">
            <p className="font-mushaf arabic-mushaf-text text-2xl text-emerald-950 font-bold leading-loose">
              {detailed.quizFillBlank.sentenceWithBlank}
            </p>
            <p className="text-xs text-slate-600 italic mt-2">
              Pilihlah kata yang tepat untuk melengkapi hadits di atas.
            </p>
          </div>

          {/* Option Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {detailed.quizFillBlank.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === detailed.quizFillBlank.correctIndex;

              let btnStyle = 'bg-white hover:bg-amber-100 text-slate-800 border-slate-200';
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs';
                } else if (isSelected) {
                  btnStyle = 'bg-red-500 text-white font-bold border-red-500';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={`quiz-opt-${idx}`}
                  type="button"
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3 rounded-xl border text-sm font-mushaf font-bold text-center transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Quiz Feedback */}
          {selectedAnswer !== null && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between ${
                isAnswerCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
              }`}
            >
              <span>
                {isAnswerCorrect
                  ? '🎉 Mumtaz! Jawaban Anda Benar!'
                  : `❌ Kurang tepat. Jawaban yang benar adalah "${detailed.quizFillBlank.missingWord}".`}
              </span>
              <button
                type="button"
                onClick={handleResetQuiz}
                className="px-2.5 py-1 bg-white rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Fawaid / Pelajaran Hadits */}
      {activeTab === 'fawaid' && detailed?.fawaid && (
        <div className="space-y-3 p-4 bg-teal-50/60 rounded-2xl border border-teal-200">
          <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-700" />
            Fawaid & Kandungan Makna Hadits:
          </h4>
          <ul className="space-y-2">
            {detailed.fawaid.map((f, i) => (
              <li key={`fawaid-${i}`} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
