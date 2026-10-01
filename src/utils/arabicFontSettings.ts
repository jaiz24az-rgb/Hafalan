// Utility for managing user-controlled Arabic font size scaling
export type ArabicFontSize = 'normal' | 'besar' | 'sangat_besar' | 'jumbo';

export interface ArabicFontConfig {
  size: ArabicFontSize;
  label: string;
  shortLabel: string;
  percent: string;
  description: string;
  snippetClass: string;
  detailClass: string;
  heroClass: string;
}

export const ARABIC_FONT_SIZES: ArabicFontConfig[] = [
  {
    size: 'normal',
    label: 'Normal (100%)',
    shortLabel: 'Normal',
    percent: '100%',
    description: 'Ukuran standar tulisan Arab yang jelas',
    snippetClass: 'text-xl sm:text-2xl',
    detailClass: 'text-2xl sm:text-3xl',
    heroClass: 'text-3xl sm:text-4xl'
  },
  {
    size: 'besar',
    label: 'Besar (125%)',
    shortLabel: 'Besar',
    percent: '125%',
    description: 'Ukuran lebih besar, nyaman & mudah dibaca (Rekomendasi)',
    snippetClass: 'text-2xl sm:text-3xl',
    detailClass: 'text-3xl sm:text-4xl',
    heroClass: 'text-4xl sm:text-5xl'
  },
  {
    size: 'sangat_besar',
    label: 'Sangat Besar (155%)',
    shortLabel: 'Sangat Besar',
    percent: '155%',
    description: 'Harakat, tajwid, dan lekukan huruf terbaca sangat jelas',
    snippetClass: 'text-3xl sm:text-4xl',
    detailClass: 'text-4xl sm:text-5xl',
    heroClass: 'text-5xl sm:text-6xl'
  },
  {
    size: 'jumbo',
    label: 'Ekstra Jumbo (190%)',
    shortLabel: 'Jumbo',
    percent: '190%',
    description: 'Ukuran maksimal ekstra besar untuk kemudahan anak & lansia',
    snippetClass: 'text-4xl sm:text-5xl',
    detailClass: 'text-5xl sm:text-6xl',
    heroClass: 'text-6xl sm:text-7xl'
  }
];

const STORAGE_KEY = 'mutabaah_arabic_font_size';
const DEFAULT_SIZE: ArabicFontSize = 'besar';

export function loadArabicFontSize(): ArabicFontSize {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ArabicFontSize;
    if (saved && ['normal', 'besar', 'sangat_besar', 'jumbo'].includes(saved)) {
      return saved;
    }
  } catch (err) {
    console.warn('Could not read font size from localStorage:', err);
  }
  return DEFAULT_SIZE;
}

export function saveArabicFontSize(size: ArabicFontSize): void {
  try {
    localStorage.setItem(STORAGE_KEY, size);
    applyArabicFontSize(size);
  } catch (err) {
    console.warn('Could not save font size to localStorage:', err);
  }
}

export function applyArabicFontSize(size: ArabicFontSize): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-arabic-size', size);
  }
}

export function getArabicFontConfig(size: ArabicFontSize): ArabicFontConfig {
  return ARABIC_FONT_SIZES.find((s) => s.size === size) || ARABIC_FONT_SIZES[1];
}

export function getNextArabicFontSize(current: ArabicFontSize): ArabicFontSize {
  const currentIndex = ARABIC_FONT_SIZES.findIndex((s) => s.size === current);
  if (currentIndex < ARABIC_FONT_SIZES.length - 1) {
    return ARABIC_FONT_SIZES[currentIndex + 1].size;
  }
  return current;
}

export function getPrevArabicFontSize(current: ArabicFontSize): ArabicFontSize {
  const currentIndex = ARABIC_FONT_SIZES.findIndex((s) => s.size === current);
  if (currentIndex > 0) {
    return ARABIC_FONT_SIZES[currentIndex - 1].size;
  }
  return current;
}
