import React, { useState } from 'react';
import { X, Plus, ListTodo, Clock, Calendar, Tag } from 'lucide-react';
import { ChecklistItem, ItemCategory } from '../types';
import { audioEngine } from '../utils/soundAndNotification';

interface AddTaskModalProps {
  onAddTask: (item: ChecklistItem) => void;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('tugas_kustom');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [targetRange, setTargetRange] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ChecklistItem = {
      id: 'task_' + Date.now(),
      title: title.trim(),
      category,
      timeEstimate: timeEstimate.trim() || undefined,
      targetRange: targetRange.trim() || undefined,
      translation: notes.trim() || undefined,
      isCustom: true
    };

    onAddTask(newItem);
    audioEngine.playCheckSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Tambah Tugas Harian Baru</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Tugas / Aktivitas: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Belajar PR Matematika Hal. 24"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="tugas_rumah">Pekerjaan Rumah & Bantuan</option>
                <option value="tugas_kustom">Tugas Harian / PR Sekolah</option>
                <option value="ibadah_wajib">Ibadah Sunnah / Dzikir</option>
                <option value="surat">Surat Pilihan Juz 30</option>
                <option value="hadits">Hadits Siswa Hebat</option>
                <option value="doa_harian">Doa Harian</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target / Waktu:
              </label>
              <input
                type="text"
                placeholder="Contoh: 30 Menit / 1 Lembar"
                value={targetRange}
                onChange={(e) => setTargetRange(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Catatan / Petunjuk Pengerjaan (Opsional):
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Kerjakan no 1 sampai 10 dengan teliti..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Simpan Tugas
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
