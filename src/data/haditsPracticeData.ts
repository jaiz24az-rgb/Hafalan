import { HadithChunk } from '../types';

export interface DetailedHadithPractice {
  id: string;
  number: number;
  title: string;
  theme: string;
  gradeLevel: 'kelas_1' | 'kelas_2' | 'kelas_3' | 'kelas_4' | 'kelas_5' | 'kelas_6';
  arabicFull: string;
  latinFull: string;
  translationFull: string;
  rawi: string;
  fawaid: string[]; // Pelajaran / Hikmah Hadits
  chunks: HadithChunk[]; // Potongan kalimat untuk latihan bertahap
  quizFillBlank: {
    sentenceWithBlank: string;
    missingWord: string;
    options: string[];
    correctIndex: number;
  };
}

export const DETAILED_HADITH_LIST: DetailedHadithPractice[] = [
  {
    id: 'hadits_1',
    number: 1,
    title: 'Hadits 1 - Perkataan yang Baik',
    theme: 'Akhlak & Muamalah',
    gradeLevel: 'kelas_1',
    arabicFull: 'الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ',
    latinFull: 'Al-kalimatuth-thayyibatu shadaqah.',
    translationFull: 'Perkataan yang baik itu adalah sedekah.',
    rawi: 'HR. Bukhari no. 2989 & Muslim no. 1009',
    fawaid: [
      'Menjaga lisan dengan berbicara sopan dan santun bernilai pahala sedekah.',
      'Menghindari perkataan kasar, kotor, dan menyakiti teman.',
      'Memberi salam, menyapa ramah, dan ucapan motivasi adalah sedekah lisan.'
    ],
    chunks: [
      { step: 1, arabic: 'الْكَلِمَةُ الطَّيِّبَةُ', latin: 'Al-kalimatuth-thayyibatu', translation: 'Perkataan yang baik' },
      { step: 2, arabic: 'صَدَقَةٌ', latin: 'shadaqah', translation: 'adalah sedekah.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'الْكَلِمَةُ الطَّيِّبَةُ .....',
      missingWord: 'صَدَقَةٌ',
      options: ['صَدَقَةٌ', 'جَنَّةٌ', 'نُورٌ', 'حِكْمَةٌ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_2',
    number: 2,
    title: 'Hadits 2 - Anjuran Berinfak',
    theme: 'Sosial & Kepedulian',
    gradeLevel: 'kelas_1',
    arabicFull: 'أَنْفِقْ يُنْفَقْ عَلَيْكَ',
    latinFull: 'Anfiq yunfaq ‘alaik.',
    translationFull: 'Berinfaklah niscaya engkau akan diberi nafkah/ganti oleh Allah.',
    rawi: 'HR. Bukhari no. 5352 & Muslim no. 993',
    fawaid: [
      'Infak tidak akan mengurangi harta, melainkan menambah keberkahan.',
      'Allah menjamin balasan berlipat bagi orang yang gemar berbagi.'
    ],
    chunks: [
      { step: 1, arabic: 'أَنْفِقْ', latin: 'Anfiq', translation: 'Berinfaklah,' },
      { step: 2, arabic: 'يُنْفَقْ عَلَيْكَ', latin: 'yunfaq ‘alaik', translation: 'niscaya engkau akan diberi infak/rezeki.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'أَنْفِقْ ..... عَلَيْكَ',
      missingWord: 'يُنْفَقْ',
      options: ['يُنْفَقْ', 'يَذْهَبْ', 'يَنْقُصْ', 'يَكْثُرْ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_3',
    number: 3,
    title: 'Hadits 3 - Allah Itu Indah',
    theme: 'Aqidah & Adab',
    gradeLevel: 'kelas_1',
    arabicFull: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ',
    latinFull: 'Innallaaha jamiilun yuhibbul jamaal.',
    translationFull: 'Sesungguhnya Allah itu indah dan menyukai keindahan.',
    rawi: 'HR. Muslim no. 91',
    fawaid: [
      'Agama Islam mengajarkan kerapian, keindahan, dan estetika yang bersih.',
      'Berpenampilan rapi saat ibadah dan sekolah adalah bentuk mencintai keindahan.'
    ],
    chunks: [
      { step: 1, arabic: 'إِنَّ اللَّهَ جَمِيلٌ', latin: 'Innallaaha jamiilun', translation: 'Sesungguhnya Allah itu Maha Indah,' },
      { step: 2, arabic: 'يُحِبُّ الْجَمَالَ', latin: 'yuhibbul jamaal', translation: 'Dia menyukai keindahan.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ .....',
      missingWord: 'الْجَمَالَ',
      options: ['الْجَمَالَ', 'الْمَالَ', 'الْكَلَامَ', 'النَّوْمَ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_4',
    number: 4,
    title: 'Hadits 4 - Berbuat Baik',
    theme: 'Kebaikan Sehari-hari',
    gradeLevel: 'kelas_1',
    arabicFull: 'كُلُّ مَعْرُوفٍ صَدَقَةٌ',
    latinFull: 'Kullu ma’ruufin shadaqah.',
    translationFull: 'Setiap kebaikan adalah sedekah.',
    rawi: 'HR. Bukhari no. 6021 & Muslim no. 1005',
    fawaid: [
      'Sedekah tidak terbatas pada uang; menolong teman, tersenyum, dan membuang duri di jalan juga sedekah.'
    ],
    chunks: [
      { step: 1, arabic: 'كُلُّ مَعْرُوفٍ', latin: 'Kullu ma’ruufin', translation: 'Setiap perbuatan baik' },
      { step: 2, arabic: 'صَدَقَةٌ', latin: 'shadaqah', translation: 'adalah sedekah.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'كُلُّ مَعْرُوفٍ .....',
      missingWord: 'صَدَقَةٌ',
      options: ['صَدَقَةٌ', 'وَاجِبٌ', 'حَسَنَةٌ', 'نُورٌ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_5',
    number: 5,
    title: 'Hadits 5 - Kebersihan Sebagian Iman',
    theme: 'Thaharah & Kebersihan',
    gradeLevel: 'kelas_1',
    arabicFull: 'الطَّهُورُ شَطْرُ الإِيمَانِ',
    latinFull: 'Ath-thahuuru syathrul iimaan.',
    translationFull: 'Kebersihan/kesucian itu separuh dari keimanan.',
    rawi: 'HR. Muslim no. 223',
    fawaid: [
      'Menjaga wudhu, kebersihan pakaian, badan, dan ruang belajar adalah bagian dari iman.'
    ],
    chunks: [
      { step: 1, arabic: 'الطَّهُورُ', latin: 'Ath-thahuuru', translation: 'Kesucian/kebersihan itu' },
      { step: 2, arabic: 'شَطْرُ الإِيمَانِ', latin: 'syathrul iimaan', translation: 'separuh dari iman.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'الطَّهُورُ شَطْرُ .....',
      missingWord: 'الإِيمَانِ',
      options: ['الإِيمَانِ', 'الإِسْلَامِ', 'الصَّلَاةِ', 'الْوُضُوءِ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_6',
    number: 6,
    title: 'Hadits 6 - Adab Makan Tangan Kanan',
    theme: 'Adab Makan & Minum',
    gradeLevel: 'kelas_1',
    arabicFull: 'سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ',
    latinFull: 'Sammi-llaaha wa kul bi yamiinika wa kul mimmaa yaliik.',
    translationFull: 'Sebutlah nama Allah (baca Bismillah), makanlah dengan tangan kananmu, dan makanlah makanan yang dekat darimu.',
    rawi: 'HR. Bukhari no. 5376 & Muslim no. 2022',
    fawaid: [
      'Membaca Bismillah sebelum makan mengusir setan.',
      'Menggunakan tangan kanan dan mengambil makanan terdekat adalah sunnah Nabi ﷺ.'
    ],
    chunks: [
      { step: 1, arabic: 'سَمِّ اللَّهَ', latin: 'Sammi-llaaha', translation: 'Sebutlah nama Allah (Bismillah),' },
      { step: 2, arabic: 'وَكُلْ بِيَمِينِكَ', latin: 'wa kul bi yamiinika', translation: 'dan makanlah dengan tangan kananmu,' },
      { step: 3, arabic: 'وَكُلْ مِمَّا يَلِيكَ', latin: 'wa kul mimmaa yaliik', translation: 'dan makanlah dari apa yang dekat denganmu.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'سَمِّ اللَّهَ وَكُلْ ..... وَكُلْ مِمَّا يَلِيكَ',
      missingWord: 'بِيَمِينِكَ',
      options: ['بِيَمِينِكَ', 'بِشِمَالِكَ', 'سَرِيعًا', 'قَلِيلًا'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_7',
    number: 7,
    title: 'Hadits 7 - Ridha dan Murka Allah',
    theme: 'Birrul Walidain (Bakti Orang Tua)',
    gradeLevel: 'kelas_2',
    arabicFull: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ',
    latinFull: 'Ridhar-rabbi fii ridhal-waalidi wa sakhatur-rabbi fii sakhatil-waalid.',
    translationFull: 'Ridha Allah berada pada ridha orang tua, dan murka Allah berada pada murka orang tua.',
    rawi: 'HR. Tirmidzi no. 1899 & Ibnu Hibban',
    fawaid: [
      'Berbakti dan membahagiakan orang tua adalah jalan utama meraih ridha Allah dan surga-Nya.'
    ],
    chunks: [
      { step: 1, arabic: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ', latin: 'Ridhar-rabbi fii ridhal-waalidi', translation: 'Ridha Allah ada pada ridha orang tua,' },
      { step: 2, arabic: 'وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ', latin: 'wa sakhatur-rabbi fii sakhatil-waalid', translation: 'dan murka Allah ada pada murka orang tua.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي ..... الْوَالِدِ',
      missingWord: 'سَخَطِ',
      options: ['سَخَطِ', 'حُبِّ', 'عَفْوِ', 'طَاعَةِ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_8',
    number: 8,
    title: 'Hadits 8 - Larangan Makan Minum Tangan Kiri',
    theme: 'Adab Makan',
    gradeLevel: 'kelas_2',
    arabicFull: 'لَا يَأْكُلَنَّ أَحَدُكُمْ بِشِمَالِهِ وَلَا يَشْرَبَنَّ بِهَا',
    latinFull: 'Laa ya’kulanna ahadukum bi syimaalihi wa laa yasyrabanna bihaa.',
    translationFull: 'Janganlah sekali-kali salah seorang di antara kalian makan dengan tangan kirinya dan jangan pula minum dengannya.',
    rawi: 'HR. Muslim no. 2020',
    fawaid: [
      'Setan makan dan minum dengan tangan kiri, umat Islam dilarang menyerupai kebiasaan setan.'
    ],
    chunks: [
      { step: 1, arabic: 'لَا يَأْكُلَنَّ أَحَدُكُمْ بِشِمَالِهِ', latin: 'Laa ya’kulanna ahadukum bi syimaalihi', translation: 'Janganlah seorang di antara kalian makan dengan tangan kirinya,' },
      { step: 2, arabic: 'وَلَا يَشْرَبَنَّ بِهَا', latin: 'wa laa yasyrabanna bihaa', translation: 'dan jangan pula minum dengannya.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'لَا يَأْكُلَنَّ أَحَدُكُمْ ..... وَلَا يَشْرَبَنَّ بِهَا',
      missingWord: 'بِشِمَالِهِ',
      options: ['بِشِمَالِهِ', 'بِيَمِينِهِ', 'قَائِمًا', 'مَاشِيًا'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_9',
    number: 9,
    title: 'Hadits 9 - Kemudahan Jalan Menuju Surga',
    theme: 'Menuntut Ilmu',
    gradeLevel: 'kelas_2',
    arabicFull: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ',
    latinFull: 'Man salaka thariiqan yaltamisu fiihi ‘ilman sahhallahu lahu thariiqan ilal jannah.',
    translationFull: 'Barangsiapa menempuh suatu jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.',
    rawi: 'HR. Muslim no. 2699',
    fawaid: [
      'Keutamaan besar siswa dan penuntut ilmu syar’i dan ilmu yang bermanfaat.'
    ],
    chunks: [
      { step: 1, arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا', latin: 'Man salaka thariiqan yaltamisu fiihi ‘ilman', translation: 'Barangsiapa menempuh jalan mencari ilmu,' },
      { step: 2, arabic: 'سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ', latin: 'sahhallahu lahu thariiqan ilal jannah', translation: 'Allah mudahkan baginya jalan menuju surga.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى .....',
      missingWord: 'الْجَنَّةِ',
      options: ['الْجَنَّةِ', 'النَّارِ', 'الْمَدِينَةِ', 'الْبَيْتِ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_12',
    number: 12,
    title: 'Hadits 12 - Berkata Baik atau Diam',
    theme: 'Menjaga Lisan',
    gradeLevel: 'kelas_2',
    arabicFull: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    latinFull: 'Man kaana yu’minu billaahi wal yaumil aakhiri falyaqul khairan au liyashmut.',
    translationFull: 'Barangsiapa beriman kepada Allah dan hari akhir, maka hendaklah ia berkata yang baik atau (jika tidak bisa) diamlah.',
    rawi: 'HR. Bukhari no. 6018 & Muslim no. 47',
    fawaid: [
      'Tanda kesempurnaan iman adalah menimbang kata-kata sebelum berucap.'
    ],
    chunks: [
      { step: 1, arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ', latin: 'Man kaana yu’minu billaahi wal yaumil aakhiri', translation: 'Barangsiapa beriman kepada Allah dan hari akhir,' },
      { step: 2, arabic: 'فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ', latin: 'falyaqul khairan au liyashmut', translation: 'hendaklah berkata yang baik atau diam.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ .....',
      missingWord: 'لِيَصْمُتْ',
      options: ['لِيَصْمُتْ', 'لِيَضْحَكْ', 'لِيَبْكِ', 'لِيَقُمْ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_17',
    number: 17,
    title: 'Hadits 17 - Larangan Marah',
    theme: 'Pengendalian Diri',
    gradeLevel: 'kelas_3',
    arabicFull: 'لَا تَغْضَبْ وَلَكَ الْجَنَّةُ',
    latinFull: 'Laa taghdhab wa lakal jannah.',
    translationFull: 'Janganlah kamu marah, niscaya bagimu surga.',
    rawi: 'HR. Thabrani dalam Mu’jam Al-Ausath no. 2353',
    fawaid: [
      'Menahan amarah adalah bukti kekuatan jiwa seorang muslim sejati.'
    ],
    chunks: [
      { step: 1, arabic: 'لَا تَغْضَبْ', latin: 'Laa taghdhab', translation: 'Janganlah kamu marah,' },
      { step: 2, arabic: 'وَلَكَ الْجَنَّةُ', latin: 'wa lakal jannah', translation: 'maka bagimu surga.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'لَا تَغْضَبْ وَلَكَ .....',
      missingWord: 'الْجَنَّةُ',
      options: ['الْجَنَّةُ', 'الْمَالُ', 'النَّصْرُ', 'الْفَوْزُ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_25',
    number: 25,
    title: 'Hadits 25 - Menutup Aurat',
    theme: 'Adab Berpakaian',
    gradeLevel: 'kelas_5',
    arabicFull: 'إِنَّا نُهِينَا أَنْ نُرَى عَوْرَاتُنَا',
    latinFull: 'Innaa nuhiinaa an nuraa ‘auraatunaa.',
    translationFull: 'Sesungguhnya kami dilarang memperlihatkan aurat kami.',
    rawi: 'HR. Abu Dawud & Ahmad',
    fawaid: [
      'Menjaga aurat adalah kewajiban syariat untuk menjaga kehormatan dan kesucian diri.'
    ],
    chunks: [
      { step: 1, arabic: 'إِنَّا نُهِينَا', latin: 'Innaa nuhiinaa', translation: 'Sesungguhnya kami dilarang' },
      { step: 2, arabic: 'أَنْ نُرَى عَوْرَاتُنَا', latin: 'an nuraa ‘auraatunaa', translation: 'memperlihatkan aurat kami.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'إِنَّا نُهِينَا أَنْ نُرَى .....',
      missingWord: 'عَوْرَاتُنَا',
      options: ['عَوْرَاتُنَا', 'بُيُوتُنَا', 'أَمْوَالُنَا', 'ثِيَابُنَا'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_30',
    number: 30,
    title: 'Hadits 30 - Niat dalam Setiap Amal',
    theme: 'Keikhlasan',
    gradeLevel: 'kelas_5',
    arabicFull: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    latinFull: 'Innamal a’maalu bin-niyyaati wa innamaa likullimri-im maa nawaa.',
    translationFull: 'Sesungguhnya setiap amalan tergantung pada niatnya, dan sesungguhnya setiap orang akan mendapatkan sesuai apa yang dia niatkan.',
    rawi: 'HR. Bukhari no. 1 & Muslim no. 1907',
    fawaid: [
      'Niat ikhlas karena Allah adalah syarat diterimanya setiap amal ibadah.'
    ],
    chunks: [
      { step: 1, arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ', latin: 'Innamal a’maalu bin-niyyaati', translation: 'Sesungguhnya amal itu tergantung niatnya,' },
      { step: 2, arabic: 'وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى', latin: 'wa innamaa likullimri-im maa nawaa', translation: 'dan setiap orang mendapat balasan sesuai niatnya.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'إِنَّمَا الأَعْمَالُ ..... وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      missingWord: 'بِالنِّيَّاتِ',
      options: ['بِالنِّيَّاتِ', 'بِالْأَقْوَالِ', 'بِالْأَمْوَالِ', 'بِالْحَرَكَاتِ'],
      correctIndex: 0
    }
  },
  {
    id: 'hadits_36',
    number: 36,
    title: 'Hadits 36 - Menuntut Ilmu Wajib bagi Setiap Muslim',
    theme: 'Kewajiban Belajar',
    gradeLevel: 'kelas_6',
    arabicFull: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    latinFull: 'Thalabul ‘ilmi fariidhatun ‘alaa kulli muslim.',
    translationFull: 'Menuntut ilmu adalah kewajiban atas setiap muslim.',
    rawi: 'HR. Ibnu Majah no. 224 & disahihkan Al-Albani',
    fawaid: [
      'Menuntut ilmu agama dan ilmu kehidupan yang bermanfaat adalah kewajiban seumur hidup.'
    ],
    chunks: [
      { step: 1, arabic: 'طَلَبُ الْعِلْمِ', latin: 'Thalabul ‘ilmi', translation: 'Menuntut ilmu itu' },
      { step: 2, arabic: 'فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ', latin: 'fariidhatun ‘alaa kulli muslim', translation: 'wajib atas setiap muslim.' }
    ],
    quizFillBlank: {
      sentenceWithBlank: 'طَلَبُ الْعِلْمِ ..... عَلَى كُلِّ مُسْلِمٍ',
      missingWord: 'فَرِيضَةٌ',
      options: ['فَرِيضَةٌ', 'سُنَّةٌ', 'فَضِيلَةٌ', 'خَيْرٌ'],
      correctIndex: 0
    }
  }
];

export function getDetailedHadith(haditsId: string): DetailedHadithPractice | undefined {
  return DETAILED_HADITH_LIST.find((h) => h.id === haditsId);
}
