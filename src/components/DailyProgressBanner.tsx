import React, { useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  Award,
  Flame,
  Star,
  Sparkles,
  User,
  Edit3,
  GraduationCap,
  School,
  Mic
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/soundAndNotification';
import { UserProfile } from '../types';

interface DailyProgressBannerProps {
  totalItems: number;
  completedItems: number;
  streakCount: number;
  onMarkAllToday: () => void;
  onResetToday: () => void;
  currentDate: string;
  profile: UserProfile;
  onOpenProfileModal: () => void;
  onOpenVoiceTestModal?: () => void;
}

export const DailyProgressBanner: React.FC<DailyProgressBannerProps> = ({
  totalItems,
  completedItems,
  streakCount,
  onMarkAllToday,
  onResetToday,
  currentDate,
  profile,
  onOpenProfileModal,
  onOpenVoiceTestModal
}) => {
  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isAllCompleted = totalItems > 0 && completedItems === totalItems;

  const triggerConfetti = () => {
    audioEngine.playChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getGradeLabel = (g: string) => {
    if (g === 'all') return 'Semua Kelas';
    return g.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-emerald-950/10 border border-emerald-600/30 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        
        {/* Left: Student Identity & Progress info & Streak */}
        <div className="space-y-2.5 flex-1">
          
          {/* Student Info Chip & Streak */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-banner-profile"
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-xs transition-all border border-white/20 cursor-pointer shadow-2xs group"
              title="Klik untuk mengubah nama siswa / kelas"
            >
              <User className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Siswa: <span className="underline decoration-amber-300 font-extrabold">{profile.name}</span></span>
              <span className="text-emerald-200 text-[10px] font-normal">({getGradeLabel(profile.grade)})</span>
              <Edit3 className="w-3 h-3 text-emerald-200 ml-0.5 opacity-75 group-hover:opacity-100" />
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              Streak: {streakCount} Hari
            </span>

            {isAllCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold animate-pulse">
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                Target Tercapai 100%!
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Kemajuan Harian: <span className="text-amber-200 font-black">{profile.name}</span></span>
            {isAllCompleted && (
              <button
                onClick={triggerConfetti}
                className="hover:scale-110 transition-transform cursor-pointer"
                title="Rayakan!"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
              </button>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl line-clamp-2">
            {profile.schoolOrMadrasah ? `🏛️ ${profile.schoolOrMadrasah} • ` : ''}
            "Sebaik-baik amalan adalah yang konsisten (dawam) meskipun sedikit." (HR. Bukhari & Muslim)
          </p>

          {/* Progress Bar */}
          <div className="pt-1 max-w-md">
            <div className="flex justify-between items-center text-xs font-medium text-emerald-200 mb-1.5">
              <span>{completedItems} dari {totalItems} Checklist & Tugas Selesai</span>
              <span className="font-bold text-white text-sm">{percentage}%</span>
            </div>
            <div className="w-full bg-emerald-950/40 rounded-full h-3 p-0.5 overflow-hidden border border-emerald-500/30">
              <div
                className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-row md:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0 pt-2 md:pt-0">
          {onOpenVoiceTestModal && (
            <button
              id="btn-banner-voice-test"
              onClick={onOpenVoiceTestModal}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer transition-all border border-amber-200"
              title="Uji bacaan & tajwid dengan rekaman suara AI"
            >
              <Mic className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Tes Hafalan Suara AI</span>
            </button>
          )}

          <button
            id="btn-mark-all-today"
            onClick={() => {
              onMarkAllToday();
              triggerConfetti();
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tandai Semua Selesai</span>
          </button>

          <button
            id="btn-reset-today"
            onClick={onResetToday}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 hover:text-white text-xs font-medium border border-emerald-600/40 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset {currentDate}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
