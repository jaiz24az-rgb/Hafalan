// Authentic Qari & Sunnah MP3 Recitations for Doa Sholat, Doa Sehari-hari, and Quran
// Sources: Hisnul Muslim Audio Collection (Accredited Arab Reciter), EveryAyah & QuranicAudio

export interface AuthenticAudioEntry {
  id: string;
  audioUrl: string;
  sourceTitle: string;
  reciter: string;
}

// Complete Mapping for Doa Sholat HPT Muhammadiyah (sholat_1 to sholat_26)
export const AUTHENTIC_DOA_SHOLAT_AUDIO: Record<string, AuthenticAudioEntry> = {
  // 1. Takbiratul Ihram
  sholat_1: {
    id: 'sholat_1',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n27.mp3',
    sourceTitle: 'Takbir & Doa Istiftah',
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 2. Doa Iftitah Allahumma Baa'id (Utama Tarjih)
  sholat_2: {
    id: 'sholat_2',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n27.mp3',
    sourceTitle: "Do'a Iftitah (Allaahumma Baa'id)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 3. Doa Iftitah Wajjahtu (Alternatif Tarjih)
  sholat_3: {
    id: 'sholat_3',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n29.mp3',
    sourceTitle: "Do'a Iftitah (Wajjahtu)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 4. Ta'awwudz & Basmalah Sirr
  sholat_4: {
    id: 'sholat_4',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
    sourceTitle: "Ta'awwudz & Basmalah",
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 5. Surat Al-Fatihah
  sholat_5: {
    id: 'sholat_5',
    audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/1.mp3',
    sourceTitle: 'Surat Al-Fatihah 7 Ayat Lengkap',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 6. Doa Ruku' Utama (Subhaanakallaahumma Rabbanaa wa bihamdika...)
  sholat_6: {
    id: 'sholat_6',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n33.mp3',
    sourceTitle: "Do'a Ruku' Utama Tarjih",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 7. Doa Ruku' Alternatif (Subbuuhun Qudduus / Subhaana Rabbiyal 'Azhiim)
  sholat_7: {
    id: 'sholat_7',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n32.mp3',
    sourceTitle: "Do'a Ruku' Alternatif (Subhaana Rabbiyal 'Azhiim)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 8. Tasmi' & Doa I'tidal Utama (Sami'allaahu liman hamidah... Rabbanaa wa lakal hamdu...)
  sholat_8: {
    id: 'sholat_8',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n35.mp3',
    sourceTitle: "Tasmi' & Do'a I'tidal",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 9. Doa I'tidal Lanjutan (Mil-as-samaawaati...)
  sholat_9: {
    id: 'sholat_9',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n36.mp3',
    sourceTitle: "Do'a I'tidal Mil-as-Samaawaati",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 10. Doa Sujud Utama (Subhaanakallaahumma Rabbanaa wa bihamdika...)
  sholat_10: {
    id: 'sholat_10',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n33.mp3',
    sourceTitle: "Do'a Sujud Utama Tarjih",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 11. Doa Sujud Alternatif (Subhaana Rabbiyal A'laa)
  sholat_11: {
    id: 'sholat_11',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n40.mp3',
    sourceTitle: "Do'a Sujud (Subhaana Rabbiyal A'laa)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 12. Doa Duduk Antara Dua Sujud Pokok (Allaahummaghfir lii warhamnii...)
  sholat_12: {
    id: 'sholat_12',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n47.mp3',
    sourceTitle: "Do'a Duduk Antara Dua Sujud (Allaahummaghfir lii)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 13. Doa Duduk Antara Dua Sujud Alternatif (Rabbighfir lii)
  sholat_13: {
    id: 'sholat_13',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n46.mp3',
    sourceTitle: "Do'a Duduk Antara Dua Sujud (Rabbighfir lii)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 14. Doa Sujud Tilawah (Sajada wajhiya...)
  sholat_14: {
    id: 'sholat_14',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n49.mp3',
    sourceTitle: "Do'a Sujud Tilawah",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 15. Doa Tasyahud (Tahiyyat Awal & Akhir)
  sholat_15: {
    id: 'sholat_15',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n51.mp3',
    sourceTitle: "Do'a Tasyahud (At-Tahiyyaatu Lillaah)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 16. Sholawat Ibrahimiyyah
  sholat_16: {
    id: 'sholat_16',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n55.mp3',
    sourceTitle: 'Shalawat Ibrahimiyyah Tasyahud',
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 17. Doa Isti'adzah 4 Perkara Sebelum Salam
  sholat_17: {
    id: 'sholat_17',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n56.mp3',
    sourceTitle: "Do'a Perlindungan 4 Perkara Sebelum Salam",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 18. Doa Permohonan Ampunan Sebelum Salam (Doa Abu Bakar)
  sholat_18: {
    id: 'sholat_18',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n58.mp3',
    sourceTitle: "Do'a Mohon Ampun Sebelum Salam (Do'a Abu Bakar)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 19. Salam Penutup Sholat
  sholat_19: {
    id: 'sholat_19',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n60.mp3',
    sourceTitle: 'Salam Penutup Sholat',
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 20. Istighfar & Doa Keselamatan (Allaahumma Antas Salaam)
  sholat_20: {
    id: 'sholat_20',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n66.mp3',
    sourceTitle: "Dzikir Istighfar & Allaahumma Antas Salaam",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 21. Dzikir Tahlil & Pujian Kekuasaan Allah
  sholat_21: {
    id: 'sholat_21',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n67.mp3',
    sourceTitle: "Dzikir Tahlil Ba'da Sholat",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 22. Tasbih, Tahmid, Takbir 33x
  sholat_22: {
    id: 'sholat_22',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n68.mp3',
    sourceTitle: 'Tasbih, Tahmid, Takbir Ba’da Sholat',
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 23. Membaca Ayat Kursi
  sholat_23: {
    id: 'sholat_23',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3',
    sourceTitle: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 24. Membaca Mu'awwidzatain (Al-Ikhlas, Al-Falaq, An-Nas)
  sholat_24: {
    id: 'sholat_24',
    audioUrl: 'https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/112.mp3',
    sourceTitle: 'Surat Al-Ikhlas, Al-Falaq, An-Naas',
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 25. Doa Tambahan Setelah Sholat (Allaahumma a'innii...)
  sholat_25: {
    id: 'sholat_25',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n69.mp3',
    sourceTitle: "Do'a Allaahumma A'innii 'Alaa Dzikrik",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 26. Doa Qunut Subuh & Witir
  sholat_26: {
    id: 'sholat_26',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n116.mp3',
    sourceTitle: "Do'a Qunut",
    reciter: 'Qari Syaikh Hisnul Muslim'
  }
};

// Complete Mapping for 36 Doa Sehari-hari (doa_1 to doa_36)
export const AUTHENTIC_DOA_HARIAN_AUDIO: Record<string, AuthenticAudioEntry> = {
  // 1. Do'a Bepergian (Safar)
  doa_1: {
    id: 'doa_1',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n207.mp3',
    sourceTitle: "Do'a Bepergian / Safar",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 2. Do'a Naik Kendaraan Laut / Udara (QS. Hud: 41)
  doa_2: {
    id: 'doa_2',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/011041.mp3',
    sourceTitle: "Do'a Bismillaahi Majraahaa (QS. Hud: 41)",
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 3. Do'a Ketika Kendaraan Mulai Berjalan
  doa_3: {
    id: 'doa_3',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n207.mp3',
    sourceTitle: "Do'a Berangkat Kendaraan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 4. Do'a Memohon Tambahan Ilmu (QS. Thaha: 114)
  doa_4: {
    id: 'doa_4',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/020114.mp3',
    sourceTitle: "Do'a Rabbi Zidnii 'Ilmaa (QS. Thaha: 114)",
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 5. Do'a Masuk Kamar Mandi (WC)
  doa_5: {
    id: 'doa_5',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n10.mp3',
    sourceTitle: "Do'a Masuk Kamar Mandi (WC)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 6. Do'a Keluar Kamar Mandi (WC)
  doa_6: {
    id: 'doa_6',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n11.mp3',
    sourceTitle: "Do'a Keluar Kamar Mandi (Ghufraanaka)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 7. Do'a Sebelum Makan
  doa_7: {
    id: 'doa_7',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n182.mp3',
    sourceTitle: "Do'a Sebelum Makan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 8. Do'a Sesudah Makan
  doa_8: {
    id: 'doa_8',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n184.mp3',
    sourceTitle: "Do'a Sesudah Makan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 9. Do'a Masuk Masjid
  doa_9: {
    id: 'doa_9',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n20.mp3',
    sourceTitle: "Do'a Masuk Masjid",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 10. Do'a Keluar Masjid
  doa_10: {
    id: 'doa_10',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n21.mp3',
    sourceTitle: "Do'a Keluar Masjid",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 11. Do'a Sebelum Tidur
  doa_11: {
    id: 'doa_11',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n99.mp3',
    sourceTitle: "Do'a Sebelum Tidur (Bismikallaahumma)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 12. Do'a Bangun Tidur
  doa_12: {
    id: 'doa_12',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n1.mp3',
    sourceTitle: "Do'a Bangun Tidur (Alhamdu Lillaahilladzii Ahyaanaa)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 13. Do'a Sebelum Wudhu
  doa_13: {
    id: 'doa_13',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n12.mp3',
    sourceTitle: "Do'a Sebelum Wudhu (Tasmiyah)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 14. Do'a Sesudah Wudhu
  doa_14: {
    id: 'doa_14',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n13.mp3',
    sourceTitle: "Do'a Sesudah Wudhu (Asyhadu allaa ilaaha illallaah)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 15. Do'a Sesudah Mendengar Adzan
  doa_15: {
    id: 'doa_15',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n26.mp3',
    sourceTitle: "Do'a Sesudah Adzan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 16. Do'a Menjenguk Orang Sakit
  doa_16: {
    id: 'doa_16',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n147.mp3',
    sourceTitle: "Do'a Menjenguk Orang Sakit (Laa ba'sa thahuurun)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 17. Do'a Kedua Orang Tua (QS. Al-Isra: 24)
  doa_17: {
    id: 'doa_17',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/017024.mp3',
    sourceTitle: "Do'a Kedua Orang Tua (QS. Al-Isra: 24)",
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 18. Do'a Saat Turun Hujan
  doa_18: {
    id: 'doa_18',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n170.mp3',
    sourceTitle: "Do'a Saat Turun Hujan (Allaahumma shayyiban naafi'aa)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 19. Do'a Kebaikan Dunia & Akhirat (QS. Al-Baqarah: 201)
  doa_19: {
    id: 'doa_19',
    audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3',
    sourceTitle: "Do'a Sapu Jagat (QS. Al-Baqarah: 201)",
    reciter: 'Syaikh Misyari Rasyid Al-Afasy'
  },
  // 20. Do'a Penutup Majelis (Kafaratul Majelis)
  doa_20: {
    id: 'doa_20',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n195.mp3',
    sourceTitle: "Do'a Kafaratul Majelis (Subhaanakallaahumma)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 21. Do'a Memohon Petunjuk & Ketakwaan
  doa_21: {
    id: 'doa_21',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n254.mp3',
    sourceTitle: "Do'a Mohon Hidayah & Ketakwaan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 22. Do'a Bercermin & Memperbagus Akhlak
  doa_22: {
    id: 'doa_22',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n206.mp3',
    sourceTitle: "Do'a Bercermin & Memperbagus Akhlak",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 23. Do'a Memakai Pakaian
  doa_23: {
    id: 'doa_23',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n2.mp3',
    sourceTitle: "Do'a Memakai Pakaian",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 24. Do'a Melepaskan Pakaian
  doa_24: {
    id: 'doa_24',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n6.mp3',
    sourceTitle: "Do'a Melepas Pakaian",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 25. Do'a Mendengar Suara Petir
  doa_25: {
    id: 'doa_25',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n167.mp3',
    sourceTitle: "Do'a Mendengar Petir",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 26. Do'a Bersin & Adab Menjawabnya
  doa_26: {
    id: 'doa_26',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n191.mp3',
    sourceTitle: "Do'a Bersin (Alhamdulillah & Yarhamukallah)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 27. Do'a Keluar Rumah
  doa_27: {
    id: 'doa_27',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n16.mp3',
    sourceTitle: "Do'a Keluar Rumah (Bismillaahi Tawakkaltu)",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 28. Do'a Masuk Rumah
  doa_28: {
    id: 'doa_28',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n18.mp3',
    sourceTitle: "Do'a Masuk Rumah",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 29. Do'a Sayyidul Istighfar
  doa_29: {
    id: 'doa_29',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n77.mp3',
    sourceTitle: "Do'a Sayyidul Istighfar",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 30. Do'a Perlindungan dari 4 Keburukan
  doa_30: {
    id: 'doa_30',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n255.mp3',
    sourceTitle: "Do'a Perlindungan dari Kejelekan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 31. Do'a Keteguhan Hati & Iman
  doa_31: {
    id: 'doa_31',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n256.mp3',
    sourceTitle: "Do'a Ya Muqallibal Quluub",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 32. Do'a Perlindungan dari Kesyirikan
  doa_32: {
    id: 'doa_32',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n203.mp3',
    sourceTitle: "Do'a Terhindar dari Syirik",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 33. Do'a Menghilangkan Rasa Sakit pada Tubuh
  doa_33: {
    id: 'doa_33',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n142.mp3',
    sourceTitle: "Do'a Mengobati Rasa Sakit",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 34. Do'a Tertimpa Musibah
  doa_34: {
    id: 'doa_34',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n152.mp3',
    sourceTitle: "Do'a Innaa Lillaahi wa Innaa Ilaihi Raaji'uun",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 35. Do'a Kesenangan & Kesusahan
  doa_35: {
    id: 'doa_35',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n184.mp3',
    sourceTitle: "Do'a Pujian Syukur atas Segala Keadaan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  },
  // 36. Do'a Berjalan Menanjak & Menurun
  doa_36: {
    id: 'doa_36',
    audioUrl: 'https://archive.org/download/HisnulMuslimAudio_201510/n209.mp3',
    sourceTitle: "Dzikir Takbir & Tasbih di Perjalanan",
    reciter: 'Qari Syaikh Hisnul Muslim'
  }
};

export function getAuthenticAudioEntry(itemId?: string, arabicText?: string): AuthenticAudioEntry | null {
  if (itemId) {
    if (AUTHENTIC_DOA_SHOLAT_AUDIO[itemId]) {
      return AUTHENTIC_DOA_SHOLAT_AUDIO[itemId];
    }
    if (AUTHENTIC_DOA_HARIAN_AUDIO[itemId]) {
      return AUTHENTIC_DOA_HARIAN_AUDIO[itemId];
    }
  }

  // Also check if text matches specific common prayers
  if (arabicText) {
    const clean = arabicText.trim();
    for (const entry of Object.values(AUTHENTIC_DOA_SHOLAT_AUDIO)) {
      if (entry.audioUrl && (entry.sourceTitle.includes(clean) || clean.includes(entry.sourceTitle))) {
        return entry;
      }
    }
    for (const entry of Object.values(AUTHENTIC_DOA_HARIAN_AUDIO)) {
      if (entry.audioUrl && (entry.sourceTitle.includes(clean) || clean.includes(entry.sourceTitle))) {
        return entry;
      }
    }
  }

  return null;
}
