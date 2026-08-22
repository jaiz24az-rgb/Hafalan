import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  BookOpen,
  Award,
  UserCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { AppRecords, ChecklistItem, GradeLevel, ItemCategory, UserProfile } from '../types';
import {
  DOA_SEHARI_HARI,
  DOA_SHOLAT_PRAKTIK,
  GRADE_TARGET_DESCRIPTIONS,
  HADITS_SISWA_HEBAT,
  SURAT_JUZ_30,
  TUGAS_PEKERJAAN_RUMAH
} from '../data/curriculumData';

interface ReportModalProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  records: AppRecords;
  customItems: ChecklistItem[];
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  profile,
  onProfileChange,
  records,
  customItems,
  onClose
}) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<ItemCategory | 'semua'>('surat');

  const handlePrint = () => {
    window.print();
  };

  const getItemsForReport = (): ChecklistItem[] => {
    switch (selectedCurriculum) {
      case 'surat':
        return SURAT_JUZ_30;
      case 'hadits':
        return HADITS_SISWA_HEBAT;
      case 'doa_harian':
        return DOA_SEHARI_HARI;
      case 'doa_sholat':
        return DOA_SHOLAT_PRAKTIK;
      case 'tugas_rumah':
        return TUGAS_PEKERJAAN_RUMAH;
      case 'tugas_kustom':
        return customItems;
      case 'semua':
      default:
        return [
          ...SURAT_JUZ_30,
          ...HADITS_SISWA_HEBAT,
          ...DOA_SEHARI_HARI,
          ...DOA_SHOLAT_PRAKTIK,
          ...TUGAS_PEKERJAAN_RUMAH
        ];
    }
  };

  const items = getItemsForReport();

  // Find latest completion record for each item across all stored dates
  const getItemSummary = (itemId: string) => {
    let latestDate: string | null = null;
    let completed = false;
    let status = 'belum';
    let paraf = '';
    let note = '';

    const dates = Object.keys(records).sort().reverse();
    for (const d of dates) {
      const rec = records[d]?.[itemId];
      if (rec && rec.completed) {
        latestDate = d;
        completed = true;
        status = rec.status || 'lancar';
        paraf = rec.paraf || '';
        note = rec.note || '';
        break;
      }
    }

    return { latestDate, completed, status, paraf, note };
  };

  const totalCompleted = items.filter((i) => getItemSummary(i.id).completed).length;
  const gradeTarget = GRADE_TARGET_DESCRIPTIONS[profile.grade] || GRADE_TARGET_DESCRIPTIONS['kelas_1'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-4 print:shadow-none print:border-none print:my-0 print:rounded-none">
        
        {/* Screen Header (Hidden on Print) */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-4 sm:p-6 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white backdrop-blur-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Buku Catatan Mutaba'ah Siswa Hebat
              </h3>
              <p className="text-xs text-emerald-200">
                Format resmi rekapitulasi capaian hafalan dan paraf pembimbing sesuai standar buku fisik.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation (Hidden on Print) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto print:hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Pilihan:
          </span>
          {[
            { id: 'surat', label: 'Surat Juz 30' },
            { id: 'hadits', label: '36 Hadits Pilihan' },
            { id: 'doa_harian', label: "36 Do'a Harian" },
            { id: 'doa_sholat', label: "Do'a Sholat & Praktik" },
            { id: 'tugas_rumah', label: 'Pekerjaan Rumah (10)' },
            { id: 'semua', label: 'Semua Kurikulum' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCurriculum(cat.id as ItemCategory | 'semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCurriculum === cat.id
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-4 text-slate-800">
          
          {/* Document Header matching physical book */}
          <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900">
              LEMBAR MUTABA'AH SISWA HEBAT
            </h2>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
              Checklist Target Hafalan Al-Qur'an Juz 30, Hadits, & Do'a Harian
            </p>
          </div>

          {/* Student Identity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs print:bg-transparent print:border-slate-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 w-28 shrink-0">Nama Siswa:</span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
                  className="flex-1 font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 w-28 shrink-0">Kelas / Tingkat:</span>
                <span className="font-bold text-emerald-800 uppercase">
                  {profile.grade.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 w-28 shrink-0">Madrasah/Sekolah:</span>
                <input
                  type="text"
                  value={profile.schoolOrMadrasah}
                  onChange={(e) =>
                    onProfileChange({ ...profile, schoolOrMadrasah: e.target.value })
                  }
                  className="flex-1 font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 w-28 shrink-0">Guru Pembimbing:</span>
                <input
                  type="text"
                  value={profile.guruOrPembimbing}
                  onChange={(e) =>
                    onProfileChange({ ...profile, guruOrPembimbing: e.target.value })
                  }
                  className="flex-1 font-bold text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Grade Target Info Summary */}
          {profile.grade !== 'all' && (
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 print:border-slate-300">
              <span className="font-bold">Target Kelas ({profile.grade.replace('_', ' ').toUpperCase()}): </span>
              <span>Surat: {gradeTarget.surat} • Hadits: {gradeTarget.hadits} • Do'a: {gradeTarget.doa}</span>
            </div>
          )}

          {/* Official Rekap Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-300 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-300">
                  <th className="p-2 border-r border-slate-300 text-center w-12 font-bold">No</th>
                  <th className="p-2 border-r border-slate-300 font-bold">Materi / Judul Hafalan</th>
                  <th className="p-2 border-r border-slate-300 text-center w-28 font-bold">Target / Jml</th>
                  <th className="p-2 border-r border-slate-300 text-center w-28 font-bold">Tgl Setor</th>
                  <th className="p-2 border-r border-slate-300 text-center w-24 font-bold">Kualitas</th>
                  <th className="p-2 border-r border-slate-300 text-center w-28 font-bold">Paraf</th>
                  <th className="p-2 font-bold">Catatan / Evaluasi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const sum = getItemSummary(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-200 ${
                        sum.completed ? 'bg-emerald-50/30' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="p-2 border-r border-slate-300 text-center font-medium text-slate-600">
                        {item.number || index + 1}
                      </td>
                      <td className="p-2 border-r border-slate-300">
                        <div className="font-bold text-slate-900">{item.title}</div>
                        {item.latin && (
                          <div className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1">
                            {item.latin}
                          </div>
                        )}
                      </td>
                      <td className="p-2 border-r border-slate-300 text-center text-slate-600">
                        {item.targetRange || '-'}
                      </td>
                      <td className="p-2 border-r border-slate-300 text-center font-mono">
                        {sum.latestDate || '-'}
                      </td>
                      <td className="p-2 border-r border-slate-300 text-center">
                        {sum.completed ? (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              sum.status === 'mutqin'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}
                          >
                            {sum.status.toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-2 border-r border-slate-300 text-center font-medium text-slate-700">
                        {sum.paraf || (sum.completed ? '✓' : '-')}
                      </td>
                      <td className="p-2 text-slate-600 text-[11px]">
                        {sum.note || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Signature Footer */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs print:pt-12">
            <div className="space-y-16">
              <p className="font-semibold text-slate-700">Mengetahui, Orang Tua / Wali</p>
              <p className="font-bold text-slate-900 underline">( ............................................ )</p>
            </div>
            <div className="space-y-16">
              <p className="font-semibold text-slate-700">Guru / Pembimbing Tahfidz</p>
              <p className="font-bold text-slate-900 underline">
                ( {profile.guruOrPembimbing || '............................................'} )
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
