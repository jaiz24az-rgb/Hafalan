import React, { useState } from 'react';
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
  Mic
} from 'lucide-react';
import { ChecklistItem, CompletionStatus, DayRecord } from '../types';
import { audioEngine } from '../utils/soundAndNotification';

interface ItemDetailModalProps {
  item: ChecklistItem | null;
  dayRecord: DayRecord;
  currentDate: string;
  onClose: () => void;
  onSaveProgress: (itemId: string, completed: boolean, status: CompletionStatus, note: string, paraf: string) => void;
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

  const handleSave = () => {
    if (completed && !currentProgress.completed) {
      audioEngine.playCheckSound();
    }
    onSaveProgress(item.id, completed, status, note, paraf);
    onClose();
  };

  const handlePlaySound = () => {
    audioEngine.playChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-100 text-xs font-semibold backdrop-blur-xs">
                {item.number ? `#${item.number}` : item.category.toUpperCase()}
              </span>
              {item.targetRange && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-950/40 text-emerald-200 text-xs">
                  {item.targetRange}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {item.title}
            </h3>
            {item.sourceOrNotes && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {item.sourceOrNotes.toLowerCase().includes('tarjih') && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/50 text-emerald-200 text-[10px] font-semibold border border-emerald-400/20">
                    📖 Putusan Tarjih Muhammadiyah
                  </span>
                )}
                <p className="text-xs text-emerald-200/90">{item.sourceOrNotes}</p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
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
                  onClick={handlePlaySound}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Chime</span>
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
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {item.translation}
                </p>
              )}
            </div>
          )}

          {/* Form Setoran / Mutabaah for the Selected Date */}
          <div className="bg-emerald-900/5 rounded-2xl p-4 sm:p-5 border border-emerald-800/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Catatan Setoran ({currentDate})</span>
              </h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-emerald-900">
                  Tandai Selesai / Sudah Disetor
                </span>
              </label>
            </div>

            {completed && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kualitas Hafalan / Nilai:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CompletionStatus)}
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="mutqin">🌟 Mutqin (Sangat Lancar & Kuat)</option>
                    <option value="lancar">✓ Lancar (Memenuhi Target)</option>
                    <option value="proses">⏳ Sedang Proses / Perlu Diulang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Paraf Guru / Orang Tua:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ustadz Ahmad / Ibu"
                    value={paraf}
                    onChange={(e) => setParaf(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Catatan Pembimbing / Evaluasi Makhraj & Tajwid:
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Alhamdulillah lancar, perhatikan mad jaiz dan dengung..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Evaluasi</span>
          </button>
        </div>

      </div>
    </div>
  );
};
