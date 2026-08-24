import { QuranAyah } from '../types';
import { QURAN_JUZ_30_DATA } from '../data/quranAyatData';

interface EQuranAyatItem {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

interface EQuranSurahResponse {
  code: number;
  message: string;
  data: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
    ayat: EQuranAyatItem[];
  };
}

// In-memory runtime cache for surah ayahs
const memorySurahCache: Record<number, QuranAyah[]> = {};

/**
 * Get surah ayahs with instant offline fallback + automatic API fetch & localStorage cache
 */
export async function fetchSurahAyahs(
  surahNumber: number,
  fallbackTargetRange?: string
): Promise<QuranAyah[]> {
  // 1. Check in-memory runtime cache
  if (memorySurahCache[surahNumber] && memorySurahCache[surahNumber].length > 0) {
    return memorySurahCache[surahNumber];
  }

  // 2. Check pre-bundled offline dataset
  const staticKey = `surat_${surahNumber}`;
  if (QURAN_JUZ_30_DATA[staticKey] && QURAN_JUZ_30_DATA[staticKey].ayahs?.length > 0) {
    const ayahs = QURAN_JUZ_30_DATA[staticKey].ayahs;
    // Check if it's real authentic text (not placeholder 'الآية')
    if (!ayahs[0].arabic.startsWith('الآية')) {
      memorySurahCache[surahNumber] = ayahs;
      return ayahs;
    }
  }

  // 3. Check persistent localStorage cache
  try {
    const cached = localStorage.getItem(`quran_ayat_cache_v2_${surahNumber}`);
    if (cached) {
      const parsed = JSON.parse(cached) as QuranAyah[];
      if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0].arabic.startsWith('الآية')) {
        memorySurahCache[surahNumber] = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read from localStorage:', e);
  }

  // 4. Fetch from official EQuran.id API (Kemenag RI Standard)
  try {
    const res = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`, {
      headers: { Accept: 'application/json' },
      cache: 'force-cache'
    });

    if (res.ok) {
      const json = (await res.json()) as EQuranSurahResponse;
      if (json.data && Array.isArray(json.data.ayat) && json.data.ayat.length > 0) {
        const mappedAyahs: QuranAyah[] = json.data.ayat.map((item) => ({
          number: item.nomorAyat,
          arabic: item.teksArab,
          latin: item.teksLatin,
          translation: item.teksIndonesia
        }));

        // Cache in memory and localStorage
        memorySurahCache[surahNumber] = mappedAyahs;
        try {
          localStorage.setItem(`quran_ayat_cache_v2_${surahNumber}`, JSON.stringify(mappedAyahs));
        } catch {
          // ignore storage quota errors
        }

        return mappedAyahs;
      }
    }
  } catch (err) {
    console.warn(`EQuran API failed for Surah ${surahNumber}, trying secondary fallback:`, err);
  }

  // 5. Secondary fallback: AlQuran Cloud API
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`,
      { cache: 'force-cache' }
    );
    if (res.ok) {
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length >= 2) {
        const arabicData = json.data[0].ayahs;
        const indoData = json.data[1].ayahs;
        const count = Math.min(arabicData.length, indoData.length);
        const mappedAyahs: QuranAyah[] = [];

        for (let i = 0; i < count; i++) {
          mappedAyahs.push({
            number: arabicData[i].numberInSurah || i + 1,
            arabic: arabicData[i].text,
            latin: `Ayat ${arabicData[i].numberInSurah || i + 1}`,
            translation: indoData[i].text
          });
        }

        if (mappedAyahs.length > 0) {
          memorySurahCache[surahNumber] = mappedAyahs;
          try {
            localStorage.setItem(`quran_ayat_cache_v2_${surahNumber}`, JSON.stringify(mappedAyahs));
          } catch {
            // ignore
          }
          return mappedAyahs;
        }
      }
    }
  } catch (err) {
    console.warn(`AlQuran Cloud API fallback also failed:`, err);
  }

  // 6. Final safety fallback
  let total = 7;
  if (fallbackTargetRange) {
    const match = fallbackTargetRange.match(/(\d+)\s*Ayat/i);
    if (match) total = parseInt(match[1], 10);
  }
  const fallbackList: QuranAyah[] = [];
  for (let i = 1; i <= total; i++) {
    fallbackList.push({
      number: i,
      arabic: `بِسْمِ اللَّهِ (Ayat ${i})`,
      latin: `Ayat ${i}`,
      translation: `Ayat ke-${i}`
    });
  }
  return fallbackList;
}
