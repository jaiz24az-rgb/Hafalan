import React, { useState } from 'react';
import {
  Check,
  Search,
  BookOpen,
  Share2,
  Trash2,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  Volume2,
  Mic,
  Award,
  Sparkles
} from 'lucide-react';
import { ChecklistItem, CompletionStatus, DayRecord, ItemProgress } from '../types';
import { audioEngine } from '../utils/soundAndNotification';

interface ChecklistViewProps {
  items: ChecklistItem[];
  dayRecord: DayRecord;
  currentDate: string;
  onToggleItem: (itemId: string, currentCompleted: boolean) => void;
  onUpdateStatus: (itemId: string, status: CompletionStatus) => void;
  onUpdateNote: (itemId: string, note: string, paraf?: string) => void;
  onDeleteItem?: (itemId: string) => void;
  onOpenDetailModal: (item: ChecklistItem) => void;
  onOpenVoiceTestModal?: (item: ChecklistItem) => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  items,
  dayRecord,
  currentDate,
  onToggleItem,
  onUpdateStatus,
  onDeleteItem,
  onOpenDetailModal,
  onOpenVoiceTestModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'uncompleted' | 'completed'>('all');

  // Filter items
  const filteredItems = items.filter((item) => {
    const progress = dayRecord[item.id] || { completed: false };
    
    // Status filter
    if (filterStatus === 'completed' && !progress.completed) return false;
    if (filterStatus === 'uncompleted' && progress.completed) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLatin = item.latin?.toLowerCase().includes(q);
      const matchArabic = item.arabic?.includes(q);
      const matchTrans = item.translation?.toLowerCase().includes(q);
      const matchTarget = item.targetRange?.toLowerCase().includes(q);
      return matchTitle || matchLatin || matchArabic || matchTrans || matchTarget;
    }

    return true;
  });

  // Share to WhatsApp formatted summary
  const shareToWhatsApp = () => {
    const completedCount = items.filter((i) => dayRecord[i.id]?.completed).length;
    const totalCount = items.length;
    let message = `*Mutaba'ah & Checklist Harian Siswa Hebat*\n`;
    message += `📅 Tanggal: ${currentDate}\n`;
    message += `📊 Capaian: ${completedCount}/${totalCount} Selesai (${Math.round(
      (completedCount / (totalCount || 1)) * 100
    )}%)\n\n`;
    message += `*Daftar Tugas & Hafalan Selesai:*\n`;

    items.forEach((item) => {
      const isDone = dayRecord[item.id]?.completed;
      const status = dayRecord[item.id]?.status || (isDone ? 'lancar' : 'belum');
      const icon = isDone ? '✅' : '⏳';
      message += `${icon} ${item.title} [${status.toUpperCase()}]\n`;
    });

    message += `\n_Dicatat melalui Aplikasi Mutaba'ah Siswa Hebat Realtime._`;
    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const getStatusBadge = (status?: CompletionStatus, isCompleted?: boolean) => {
    if (!isCompleted) {
      return (
        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
          Belum
        </span>
      );
    }
    switch (status) {
      case 'mutqin':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            🌟 Mutqin
          </span>
        );
      case 'lancar':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-100 text-teal-800 border border-teal-300">
            ✓ Lancar
          </span>
        );
      case 'proses':
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            ⏳ Proses
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ✓ Selesai
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-checklist"
            type="text"
            placeholder="Cari surat, hadits, doa, arti, atau ayat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Filter & Share Action */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              id="filter-all"
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({items.length})
            </button>
            <button
              id="filter-uncompleted"
              onClick={() => setFilterStatus('uncompleted')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'uncompleted'
                  ? 'bg-white text-amber-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum ({items.filter((i) => !dayRecord[i.id]?.completed).length})
            </button>
            <button
              id="filter-completed"
              onClick={() => setFilterStatus('completed')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                filterStatus === 'completed'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selesai ({items.filter((i) => dayRecord[i.id]?.completed).length})
            </button>
          </div>

          <button
            id="btn-share-whatsapp"
            onClick={shareToWhatsApp}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Bagikan Capaian ke WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kirim WA</span>
          </button>
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">Tidak ada item yang sesuai</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau ganti kategori di tab atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const progress: ItemProgress = dayRecord[item.id] || { completed: false };
            const isCompleted = progress.completed;

            return (
              <div
                key={item.id}
                id={`checklist-card-${item.id}`}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 ${
                  isCompleted
                    ? 'bg-emerald-50/60 border-emerald-200/90 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Row: Checkbox + Title + Category Tag */}
                  <div className="flex items-start gap-3">
                    <button
                      id={`checkbox-item-${item.id}`}
                      onClick={() => onToggleItem(item.id, isCompleted)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs scale-105'
                          : 'bg-white border-2 border-slate-300 hover:border-emerald-500 text-transparent'
                      }`}
                      title={isCompleted ? 'Batal Centang' : 'Tandai Selesai'}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {item.number ? `#${item.number}` : item.category.replace('_', ' ').toUpperCase()}
                        </span>
                        {item.targetRange && (
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                            {item.targetRange}
                          </span>
                        )}
                        {item.defaultTime && (
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {item.defaultTime}
                          </span>
                        )}
                        {item.sourceOrNotes && (
                          <span className="text-[10px] text-slate-400">
                            • {item.sourceOrNotes}
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-sm font-bold leading-snug cursor-pointer transition-colors ${
                          isCompleted
                            ? 'text-emerald-950 line-through decoration-emerald-600/40'
                            : 'text-slate-800 hover:text-emerald-700'
                        }`}
                        onClick={() => onOpenDetailModal(item)}
                      >
                        {item.title}
                      </h4>
                    </div>

                    {/* Delete button if custom */}
                    {item.isCustom && onDeleteItem && (
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Tugas Kustom"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Arabic Snippet Preview */}
                  {item.arabic && (
                    <div
                      onClick={() => onOpenDetailModal(item)}
                      className="mt-2.5 p-2 bg-emerald-900/5 hover:bg-emerald-900/10 rounded-lg text-right cursor-pointer border border-emerald-800/10 transition-colors"
                    >
                      <p className="font-mushaf text-sm sm:text-base text-emerald-950 leading-relaxed font-semibold">
                        {item.arabic.length > 70 ? item.arabic.slice(0, 70) + '...' : item.arabic}
                      </p>
                      {item.latin && (
                        <p className="text-[11px] text-slate-500 text-left mt-1 italic line-clamp-1">
                          "{item.latin}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Translation or Description */}
                  {item.translation && !item.arabic && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.translation}
                    </p>
                  )}

                  {/* Quran Surah Ayah Progress Pill */}
                  {item.category === 'surat' && (
                    <div
                      onClick={() => onOpenDetailModal(item)}
                      className="mt-2.5 flex items-center justify-between p-2 rounded-xl bg-emerald-50/80 border border-emerald-200/80 hover:bg-emerald-100/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-emerald-900">
                        <span className="font-bold">📖 Hafalan Ayat:</span>
                        {progress.completedAyahs && progress.completedAyahs.length > 0 ? (
                          <span className="font-semibold text-emerald-700">
                            {progress.completedAyahs.length} / {progress.totalAyahsCount || item.targetRange?.replace(/\D/g, '') || '?'} Ayat
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Belum dicentang per ayat</span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                        Buka Ayat →
                      </span>
                    </div>
                  )}

                  {/* Hadits Practice Shortcut Pill */}
                  {item.category === 'hadits' && (
                    <div
                      onClick={() => onOpenDetailModal(item)}
                      className="mt-2.5 flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-amber-900">
                        <span className="font-bold">🎯 Latihan Hafalan:</span>
                        <span className="text-[11px] text-amber-800">Potongan Frasa & Kuis</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 flex items-center gap-0.5">
                        Mulai Latihan →
                      </span>
                    </div>
                  )}

                  {/* AI Voice Test Result Badge if tested */}
                  {progress.lastTestScore !== undefined && (
                    <div className="mt-2.5 flex items-center justify-between bg-amber-50/80 border border-amber-200 px-2.5 py-1.5 rounded-lg text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-900">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Skor AI: {progress.lastTestScore}%</span>
                        {progress.lastTestGrade && (
                          <span className="font-semibold text-amber-700">
                            ({progress.lastTestGrade})
                          </span>
                        )}
                      </span>
                      {onOpenVoiceTestModal && (
                        <button
                          onClick={() => onOpenVoiceTestModal(item)}
                          className="text-[11px] font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                        >
                          Tes Ulang
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Status Selector & Detail Modal Button */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {getStatusBadge(progress.status, isCompleted)}

                    {/* Status dropdown if completed */}
                    {isCompleted && (
                      <select
                        id={`select-status-${item.id}`}
                        value={progress.status || 'lancar'}
                        onChange={(e) =>
                          onUpdateStatus(item.id, e.target.value as CompletionStatus)
                        }
                        className="text-[11px] font-medium bg-white text-slate-700 border border-slate-200 rounded-md px-1.5 py-0.5 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="lancar">Lancar</option>
                        <option value="mutqin">Mutqin (Sangat Kuat)</option>
                        <option value="proses">Masih Perlu Diulang</option>
                      </select>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Voice Test Button if recitation */}
                    {onOpenVoiceTestModal && (item.arabic || item.category === 'surat' || item.category === 'hadits' || item.category === 'doa_harian' || item.category === 'doa_sholat') && (
                      <button
                        id={`btn-voice-test-${item.id}`}
                        onClick={() => onOpenVoiceTestModal(item)}
                        className="flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-100/80 hover:bg-amber-200 px-2 py-1 rounded-md border border-amber-300 transition-colors cursor-pointer"
                        title="Tes Hafalan & Tajwid dengan Suara (AI)"
                      >
                        <Mic className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">Uji AI</span>
                      </button>
                    )}

                    {item.arabic && (
                      <button
                        onClick={() => {
                          audioEngine.playChime();
                          onOpenDetailModal(item);
                        }}
                        className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-md transition-colors"
                        title="Dengarkan / Baca Teks"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      id={`btn-detail-${item.id}`}
                      onClick={() => onOpenDetailModal(item)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 px-2 py-1 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
