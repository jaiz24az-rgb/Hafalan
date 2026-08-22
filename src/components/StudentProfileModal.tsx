import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  GraduationCap,
  School,
  UserCheck,
  Check,
  Sparkles,
  Users,
  Plus,
  Trash2
} from 'lucide-react';
import { GradeLevel, UserProfile } from '../types';
import { audioEngine } from '../utils/soundAndNotification';

interface StudentProfileModalProps {
  profile: UserProfile;
  onProfileChange: (newProfile: UserProfile) => void;
  onClose: () => void;
}

const SAVED_STUDENTS_KEY = 'checklist_saved_student_list_v1';

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  profile,
  onProfileChange,
  onClose
}) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<GradeLevel>(profile.grade);
  const [schoolOrMadrasah, setSchoolOrMadrasah] = useState(profile.schoolOrMadrasah);
  const [guruOrPembimbing, setGuruOrPembimbing] = useState(profile.guruOrPembimbing);

  // Saved student profiles for quick switching (e.g. for parents with multiple children)
  const [savedProfiles, setSavedProfiles] = useState<{ id: string; name: string; grade: GradeLevel }[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STUDENTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      { id: '1', name: profile.name, grade: profile.grade }
    ];
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedProfile: UserProfile = {
      ...profile,
      name: name.trim(),
      grade,
      schoolOrMadrasah: schoolOrMadrasah.trim(),
      guruOrPembimbing: guruOrPembimbing.trim()
    };

    // Update in saved profiles list
    const exists = savedProfiles.find((s) => s.name.toLowerCase() === name.trim().toLowerCase());
    let newSaved = [...savedProfiles];
    if (!exists) {
      newSaved = [...savedProfiles, { id: 'std_' + Date.now(), name: name.trim(), grade }];
    } else {
      newSaved = savedProfiles.map((s) =>
        s.id === exists.id ? { ...s, name: name.trim(), grade } : s
      );
    }
    setSavedProfiles(newSaved);
    localStorage.setItem(SAVED_STUDENTS_KEY, JSON.stringify(newSaved));

    onProfileChange(updatedProfile);
    audioEngine.playCheckSound();
    onClose();
  };

  const handleSwitchStudent = (saved: { id: string; name: string; grade: GradeLevel }) => {
    setName(saved.name);
    setGrade(saved.grade);
    const updated: UserProfile = {
      ...profile,
      name: saved.name,
      grade: saved.grade
    };
    onProfileChange(updated);
    audioEngine.playChime();
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = savedProfiles.filter((s) => s.id !== id);
    setSavedProfiles(filtered);
    localStorage.setItem(SAVED_STUDENTS_KEY, JSON.stringify(filtered));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white backdrop-blur-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Identitas & Profil Siswa</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-emerald-200">
                Atur nama siswa untuk memantau kemajuan harian mutaba'ah & tugas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Switcher If multiple students saved */}
        {savedProfiles.length > 0 && (
          <div className="p-3 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-emerald-800 shrink-0 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Pilih Siswa:
            </span>
            {savedProfiles.map((std) => {
              const isActive = profile.name.trim().toLowerCase() === std.name.trim().toLowerCase();
              return (
                <div
                  key={std.id}
                  onClick={() => handleSwitchStudent(std)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-100/50'
                  }`}
                >
                  <span>{std.name}</span>
                  <span className={`text-[10px] ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                    ({std.grade.replace('_', ' ')})
                  </span>
                  {savedProfiles.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteSaved(std.id, e)}
                      className={`hover:text-red-400 p-0.5 rounded-sm ${isActive ? 'text-white' : 'text-slate-400'}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nama Lengkap / Panggilan Siswa: <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Al-Fatih / Aisyah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tingkat Kelas:</span>
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="kelas_1">Kelas 1 (An-Naba' s/d An-Nazi'at, Hadits 1-6)</option>
              <option value="kelas_2">Kelas 2 (s/d At-Takwir, Hadits 7-12)</option>
              <option value="kelas_3">Kelas 3 (s/d Al-Insyiqoq, Hadits 13-18)</option>
              <option value="kelas_4">Kelas 4 (s/d Al-Ghasyiyah, Hadits 19-24)</option>
              <option value="kelas_5">Kelas 5 (s/d Ad-Dhuha, Hadits 25-30)</option>
              <option value="kelas_6">Kelas 6 (Lengkap Juz 30, Hadits 31-36)</option>
              <option value="all">🌟 Semua Tingkat (Tampilkan Semua Target)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sekolah / Madrasah:</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: SDIT / MI Al-Hikmah"
                value={schoolOrMadrasah}
                onChange={(e) => setSchoolOrMadrasah(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Guru / Pembimbing Tahfidz:</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Ustadz Ahmad / Orang Tua"
                value={guruOrPembimbing}
                onChange={(e) => setGuruOrPembimbing(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Sync Code Info */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800">Kode Sinkronisasi Cloud: </span>
              <span className="font-mono font-bold text-emerald-800 ml-1">{profile.syncCode}</span>
            </div>
            <span className="text-[10px] text-slate-400">Tersimpan lokal & cloud</span>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Profil Siswa</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
