import React, { useState } from 'react';
import {
  Type,
  ZoomIn,
  ZoomOut,
  Sliders,
  Check,
  Sparkles,
  X
} from 'lucide-react';
import {
  ArabicFontSize,
  ARABIC_FONT_SIZES,
  getArabicFontConfig,
  getNextArabicFontSize,
  getPrevArabicFontSize
} from '../utils/arabicFontSettings';

interface ArabicFontSizeControlProps {
  currentSize: ArabicFontSize;
  onSizeChange: (size: ArabicFontSize) => void;
  variant?: 'toolbar' | 'compact' | 'button';
  className?: string;
}

export const ArabicFontSizeControl: React.FC<ArabicFontSizeControlProps> = ({
  currentSize,
  onSizeChange,
  variant = 'toolbar',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentConfig = getArabicFontConfig(currentSize);

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = getNextArabicFontSize(currentSize);
    onSizeChange(next);
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prev = getPrevArabicFontSize(currentSize);
    onSizeChange(prev);
  };

  const isMin = currentSize === ARABIC_FONT_SIZES[0].size;
  const isMax = currentSize === ARABIC_FONT_SIZES[ARABIC_FONT_SIZES.length - 1].size;

  return (
    <>
      {/* 1. COMPACT VARIANT (for small spaces / modals) */}
      {variant === 'compact' && (
        <div className={`inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs ${className}`}>
          <button
            type="button"
            disabled={isMin}
            onClick={handleZoomOut}
            className="p-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 disabled:opacity-35 transition-colors cursor-pointer"
            title="Kecilkan Font Arab"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-2 py-0.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer flex items-center gap-1"
            title="Klik untuk memilih ukuran font Arab"
          >
            <span className="font-mushaf text-sm leading-none">ع</span>
            <span>{currentConfig.shortLabel}</span>
          </button>

          <button
            type="button"
            disabled={isMax}
            onClick={handleZoomIn}
            className="p-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-slate-100 disabled:opacity-35 transition-colors cursor-pointer"
            title="Perbesar Font Arab"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. BUTTON VARIANT (for Navbar) */}
      {variant === 'button' && (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
            currentSize !== 'normal'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          } ${className}`}
          title="Atur Ukuran Tulisan Font Arab"
        >
          <span className="font-mushaf text-sm font-bold text-emerald-700 leading-none">ع</span>
          <span className="hidden sm:inline">Font Arab:</span>
          <span className="font-bold text-emerald-800">{currentConfig.shortLabel}</span>
        </button>
      )}

      {/* 3. TOOLBAR VARIANT (default for ChecklistView) */}
      {variant === 'toolbar' && (
        <div className={`flex items-center bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs ${className}`}>
          {/* Zoom Out Button */}
          <button
            type="button"
            disabled={isMin}
            onClick={handleZoomOut}
            className="px-2 py-1 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer flex items-center gap-0.5 text-xs font-bold"
            title="Kecilkan Font Arab (A-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
            <span className="text-[11px]">A-</span>
          </button>

          {/* Central Status & Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 hover:bg-emerald-50/80 rounded-lg transition-colors cursor-pointer group"
            title="Klik untuk memilih ukuran font Arab (Normal, Besar, Sangat Besar, Jumbo)"
          >
            <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-mushaf text-sm font-bold leading-none shrink-0 group-hover:scale-105 transition-transform">
              ع
            </span>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-slate-400 font-medium">Font Arab</span>
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                <span>{currentConfig.shortLabel}</span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-1 rounded-sm">
                  {currentConfig.percent}
                </span>
              </span>
            </div>
          </button>

          {/* Zoom In Button */}
          <button
            type="button"
            disabled={isMax}
            onClick={handleZoomIn}
            className="px-2 py-1 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer flex items-center gap-0.5 text-xs font-bold"
            title="Perbesar Font Arab (A+)"
          >
            <span className="text-[11px]">A+</span>
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* POPUP / MODAL SETTING DIALOG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center font-mushaf text-xl font-bold text-amber-300">
                  ع
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5">
                    Pengaturan Ukuran Font Arab
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </h3>
                  <p className="text-xs text-emerald-100/80">
                    Sesuaikan ukuran tulisan agar nyaman dan mudah dibaca
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              {/* Live Preview Card */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl shadow-md border border-emerald-700/60 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-700/60 pb-1.5">
                  <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    Pratinjau Teks Langsung ({currentConfig.label})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                    {currentConfig.percent}
                  </span>
                </div>

                {/* The Arabic Text itself */}
                <div className="text-right py-2">
                  <p className="font-mushaf arabic-mushaf-text arabic-card-snippet font-bold text-amber-200 tracking-wide transition-all duration-200">
                    الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ
                  </p>
                  <p className="font-mushaf arabic-mushaf-text arabic-card-snippet font-bold text-emerald-100/90 tracking-wide mt-1 transition-all duration-200">
                    وَتُمِيطُ الأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-800/80">
                  <p className="text-xs text-emerald-200/90 italic">
                    "Al-kalimatuth-thayyibatu shadaqah. Wa tumiithul adzaa 'anith-thariiqi shadaqah."
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Artinya: Perkataan yang baik adalah sedekah. Dan menyingkirkan duri/gangguan dari jalan adalah sedekah.
                  </p>
                </div>
              </div>

              {/* Size Selector Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Pilih Tingkat Ukuran Font:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ARABIC_FONT_SIZES.map((cfg) => {
                    const isSelected = currentSize === cfg.size;
                    return (
                      <button
                        key={cfg.size}
                        type="button"
                        onClick={() => onSizeChange(cfg.size)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900">
                              {cfg.shortLabel}
                            </span>
                            <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700">
                              {cfg.percent}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {cfg.description}
                          </p>
                        </div>

                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stepper Bar */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-600">
                  Ubah Cepat:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isMin}
                    onClick={() => handleZoomOut()}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>Lebih Kecil</span>
                  </button>
                  <button
                    type="button"
                    disabled={isMax}
                    onClick={() => handleZoomIn()}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Lebih Besar</span>
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                💡 Ukuran font yang dipilih akan tersimpan otomatis dan berlaku untuk kartu checklist, modul latihan hadits, doa sholat, doa harian, dan surat Al-Qur'an.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Selesai & Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
