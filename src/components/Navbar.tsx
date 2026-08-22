import React from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bell,
  RefreshCw,
  Printer,
  Plus,
  BookOpen,
  Sparkles,
  User,
  GraduationCap,
  Mic
} from 'lucide-react';
import { GradeLevel, UserProfile } from '../types';

interface NavbarProps {
  currentDate: string; // YYYY-MM-DD
  onDateChange: (newDate: string) => void;
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  onOpenReminderModal: () => void;
  onOpenSyncModal: () => void;
  onOpenReportModal: () => void;
  onOpenAddTaskModal: () => void;
  onOpenProfileModal: () => void;
  onOpenVoiceTestModal?: () => void;
  activeRemindersCount: number;
  isSyncing: boolean;
  syncStatus: 'synced' | 'local' | 'syncing' | 'error';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDate,
  onDateChange,
  profile,
  onProfileChange,
  onOpenReminderModal,
  onOpenSyncModal,
  onOpenReportModal,
  onOpenAddTaskModal,
  onOpenProfileModal,
  onOpenVoiceTestModal,
  activeRemindersCount,
  isSyncing,
  syncStatus
}) => {
  // Date Helpers
  const shiftDate = (offsetDays: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + offsetDays);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
  };

  const setToday = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onDateChange(`${yyyy}-${mm}-${dd}`);
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const isToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return currentDate === `${yyyy}-${mm}-${dd}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
          
          {/* Logo and Student Name Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-slate-800 text-lg sm:text-xl tracking-tight flex items-center gap-1.5">
                    Mutaba'ah Siswa Hebat
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </h1>
                </div>
                {/* Student Name Quick Button */}
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center gap-1 text-xs text-emerald-800 font-bold hover:text-emerald-950 transition-colors cursor-pointer group"
                  title="Klik untuk ganti siswa / ubah data identitas"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="underline decoration-emerald-400 group-hover:decoration-emerald-700">
                    {profile.name}
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">
                    ({profile.grade === 'all' ? 'Semua Tingkat' : profile.grade.replace('_', ' ').toUpperCase()})
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 md:hidden">
              {onOpenVoiceTestModal && (
                <button
                  id="btn-mobile-voice-test"
                  onClick={onOpenVoiceTestModal}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg relative"
                  title="Tes Hafalan Suara AI"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
              <button
                id="btn-mobile-profile"
                onClick={onOpenProfileModal}
                className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg"
                title="Profil Siswa"
              >
                <User className="w-4 h-4" />
              </button>
              <button
                id="btn-mobile-sync"
                onClick={onOpenSyncModal}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative"
                title="Sinkronisasi"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                <span
                  className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                    syncStatus === 'synced' ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                />
              </button>
              <button
                id="btn-mobile-reminder"
                onClick={onOpenReminderModal}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative"
                title="Pengingat"
              >
                <Bell className="w-4 h-4" />
                {activeRemindersCount > 0 && (
                  <span className="absolute top-1 right-1 px-1 min-w-[16px] h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeRemindersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Center Date Navigator */}
          <div className="flex items-center justify-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/80 shadow-xs">
            <button
              id="btn-prev-day"
              onClick={() => shiftDate(-1)}
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
              title="Hari Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-2">
              <CalendarIcon className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="date"
                value={currentDate}
                onChange={(e) => e.target.value && onDateChange(e.target.value)}
                className="text-xs sm:text-sm font-semibold text-slate-800 bg-transparent border-0 focus:ring-0 cursor-pointer p-0"
              />
              <span className="text-xs text-slate-500 hidden lg:inline">
                ({formatDateDisplay(currentDate)})
              </span>
            </div>

            <button
              id="btn-next-day"
              onClick={() => shiftDate(1)}
              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
              title="Hari Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {!isToday() && (
              <button
                id="btn-today"
                onClick={setToday}
                className="text-[11px] font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-2 py-1 rounded-md transition-colors ml-1 cursor-pointer"
              >
                Hari Ini
              </button>
            )}
          </div>

          {/* Right Controls: Student Profile, Grade, Reminder, Sync, Report, Add Task */}
          <div className="flex items-center gap-2 justify-end">
            
            {/* Student Profile Quick Button */}
            <button
              id="btn-profile"
              onClick={onOpenProfileModal}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Ganti atau Sunting Data Siswa"
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span className="max-w-[110px] truncate">{profile.name}</span>
            </button>

            {/* Grade Selector */}
            <div className="flex items-center gap-1.5">
              <select
                id="select-grade"
                value={profile.grade}
                onChange={(e) =>
                  onProfileChange({ ...profile, grade: e.target.value as GradeLevel })
                }
                className="text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">🌟 Semua Kelas</option>
                <option value="kelas_1">Kelas 1 (An-Naba - Nazi'at, Hadits 1-6)</option>
                <option value="kelas_2">Kelas 2 (s/d At-Takwir, Hadits 7-12)</option>
                <option value="kelas_3">Kelas 3 (s/d Al-Insyiqoq, Hadits 13-18)</option>
                <option value="kelas_4">Kelas 4 (s/d Al-Ghasyiyah, Hadits 19-24)</option>
                <option value="kelas_5">Kelas 5 (s/d Ad-Dhuha, Hadits 25-30)</option>
                <option value="kelas_6">Kelas 6 (Juz 30 Lengkap, Hadits 31-36)</option>
              </select>
            </div>

            {/* Desktop Voice Test Button */}
            {onOpenVoiceTestModal && (
              <button
                id="btn-desktop-voice-test"
                onClick={onOpenVoiceTestModal}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/90 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-lg shadow-2xs transition-all cursor-pointer"
                title="Uji Hafalan & Tajwid dengan Suara (AI)"
              >
                <Mic className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                <span>Tes Suara AI</span>
              </button>
            )}

            {/* Desktop Reminder Button */}
            <button
              id="btn-desktop-reminder"
              onClick={onOpenReminderModal}
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pengingat</span>
              {activeRemindersCount > 0 && (
                <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full">
                  {activeRemindersCount}
                </span>
              )}
            </button>

            {/* Sync Button */}
            <button
              id="btn-desktop-sync"
              onClick={onOpenSyncModal}
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isSyncing ? 'animate-spin text-emerald-600' : 'text-slate-500'
                }`}
              />
              <span>Sync</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  syncStatus === 'synced'
                    ? 'bg-emerald-500'
                    : syncStatus === 'error'
                    ? 'bg-red-400'
                    : 'bg-amber-400'
                }`}
              />
            </button>

            {/* Printable Report */}
            <button
              id="btn-report"
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Cetak Buku Mutaba'ah"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Rekap</span>
            </button>

            {/* Add Custom Task */}
            <button
              id="btn-add-task"
              onClick={onOpenAddTaskModal}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tugas</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
