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
    "id": "hadits_1",
    "number": 1,
    "title": "Hadits 1 - Perkataan yang Baik",
    "theme": "Akhlak & Muamalah",
    "gradeLevel": "kelas_1",
    "arabicFull": "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    "latinFull": "Al-kalimatuth-thayyibatu shadaqah.",
    "translationFull": "Perkataan yang baik itu adalah sedekah.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Menjaga lisan dengan berbicara sopan dan santun bernilai pahala sedekah.",
      "Menghindari perkataan kasar, kotor, dan menyakiti teman.",
      "Memberi salam, menyapa ramah, dan ucapan motivasi adalah sedekah lisan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الْكَلِمَةُ الطَّيِّبَةُ",
        "latin": "Al-kalimatuth-thayyibatu",
        "translation": "Perkataan yang baik itu"
      },
      {
        "step": 2,
        "arabic": "صَدَقَةٌ",
        "latin": "shadaqah",
        "translation": "adalah sedekah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الْكَلِمَةُ الطَّيِّبَةُ .....",
      "missingWord": "صَدَقَةٌ",
      "options": [
        "صَدَقَةٌ",
        "جَنَّةٌ",
        "نُورٌ",
        "حِكْمَةٌ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_2",
    "number": 2,
    "title": "Hadits 2 - Anjuran Berinfak",
    "theme": "Sosial & Kepedulian",
    "gradeLevel": "kelas_1",
    "arabicFull": "أَنْفِقْ يُنْفَقْ عَلَيْكَ",
    "latinFull": "Anfiq yunfaq ‘alaik.",
    "translationFull": "Berinfaklah niscaya engkau akan diberi nafkah/infak.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Infak tidak akan mengurangi harta, melainkan menambah keberkahan.",
      "Allah menjamin balasan berlipat bagi orang yang gemar berbagi."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "أَنْفِقْ",
        "latin": "Anfiq",
        "translation": "Berinfaklah,"
      },
      {
        "step": 2,
        "arabic": "يُنْفَقْ عَلَيْكَ",
        "latin": "yunfaq ‘alaik",
        "translation": "niscaya engkau akan diberi nafkah/ganti oleh Allah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "أَنْفِقْ ..... عَلَيْكَ",
      "missingWord": "يُنْفَقْ",
      "options": [
        "يُنْفَقْ",
        "يَذْهَبْ",
        "يَنْقُصْ",
        "يَكْثُرْ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_3",
    "number": 3,
    "title": "Hadits 3 - Allah Itu Indah",
    "theme": "Aqidah & Adab",
    "gradeLevel": "kelas_1",
    "arabicFull": "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    "latinFull": "Innallaaha jamiilun yuhibbul jamaal.",
    "translationFull": "Sesungguhnya Allah itu indah dan menyukai keindahan.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Agama Islam mengajarkan kerapian, keindahan, dan estetika yang bersih.",
      "Berpenampilan rapi saat ibadah dan sekolah adalah bentuk mencintai keindahan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِنَّ اللَّهَ جَمِيلٌ",
        "latin": "Innallaaha jamiilun",
        "translation": "Sesungguhnya Allah itu Maha Indah,"
      },
      {
        "step": 2,
        "arabic": "يُحِبُّ الْجَمَالَ",
        "latin": "yuhibbul jamaal",
        "translation": "Dia menyukai keindahan."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ .....",
      "missingWord": "الْجَمَالَ",
      "options": [
        "الْجَمَالَ",
        "الْمَالَ",
        "الْكَلَامَ",
        "النَّوْمَ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_4",
    "number": 4,
    "title": "Hadits 4 - Berbuat Baik",
    "theme": "Kebaikan Sehari-hari",
    "gradeLevel": "kelas_1",
    "arabicFull": "كُلُّ مَعْرُوفٍ صَدَقَةٌ",
    "latinFull": "Kullu ma’ruufin shadaqah.",
    "translationFull": "Setiap kebaikan adalah sedekah.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Sedekah tidak terbatas pada uang; menolong teman, tersenyum, dan membuang duri di jalan juga sedekah."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "كُلُّ مَعْرُوفٍ",
        "latin": "Kullu ma’ruufin",
        "translation": "Setiap perbuatan baik"
      },
      {
        "step": 2,
        "arabic": "صَدَقَةٌ",
        "latin": "shadaqah",
        "translation": "adalah sedekah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "كُلُّ مَعْرُوفٍ .....",
      "missingWord": "صَدَقَةٌ",
      "options": [
        "صَدَقَةٌ",
        "وَاجِبٌ",
        "حَسَنَةٌ",
        "نُورٌ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_5",
    "number": 5,
    "title": "Hadits 5 - Kebersihan",
    "theme": "Thaharah & Kebersihan",
    "gradeLevel": "kelas_1",
    "arabicFull": "الطَّهُورُ شَطْرُ الإِيمَانِ",
    "latinFull": "Ath-thahuuru syathrul iimaan.",
    "translationFull": "Kebersihan/kesucian itu sebagian dari iman.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Menjaga wudhu, kebersihan pakaian, badan, dan ruang belajar adalah bagian dari iman."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الطَّهُورُ",
        "latin": "Ath-thahuuru",
        "translation": "Kebersihan dan kesucian itu"
      },
      {
        "step": 2,
        "arabic": "شَطْرُ الإِيمَانِ",
        "latin": "syathrul iimaan",
        "translation": "separuh dari keimanan."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الطَّهُورُ شَطْرُ .....",
      "missingWord": "الإِيمَانِ",
      "options": [
        "الإِيمَانِ",
        "الإِسْلَامِ",
        "الصَّلَاةِ",
        "الْوُضُوءِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_6",
    "number": 6,
    "title": "Hadits 6 - Makan dengan Tangan Kanan",
    "theme": "Adab Makan & Minum",
    "gradeLevel": "kelas_1",
    "arabicFull": "سَمِّ اللَّهَ وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ",
    "latinFull": "Sammi-llaaha wa kul bi yamiinika wa kul mimmaa yaliik.",
    "translationFull": "Sebutlah nama Allah, makanlah dengan tangan kananmu, dan makanlah yang terdekat darimu.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Membaca Bismillah sebelum makan mengusir godaan setan.",
      "Menggunakan tangan kanan dan mengambil makanan terdekat adalah sunnah Nabi ﷺ."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "سَمِّ اللَّهَ",
        "latin": "Sammi-llaaha",
        "translation": "Sebutlah nama Allah (Bismillah),"
      },
      {
        "step": 2,
        "arabic": "وَكُلْ بِيَمِينِكَ",
        "latin": "wa kul bi yamiinika",
        "translation": "dan makanlah dengan tangan kananmu,"
      },
      {
        "step": 3,
        "arabic": "وَكُلْ مِمَّا يَلِيكَ",
        "latin": "wa kul mimmaa yaliik",
        "translation": "dan makanlah yang terdekat darimu."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "سَمِّ اللَّهَ وَكُلْ ..... وَكُلْ مِمَّا يَلِيكَ",
      "missingWord": "بِيَمِينِكَ",
      "options": [
        "بِيَمِينِكَ",
        "بِشِمَالِكَ",
        "سَرِيعًا",
        "قَلِيلًا"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_7",
    "number": 7,
    "title": "Hadits 7 - Ridha dan Murka Allah",
    "theme": "Birrul Walidain",
    "gradeLevel": "kelas_2",
    "arabicFull": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
    "latinFull": "Ridhar-rabbi fii ridhal-waalidi wa sakhatur-rabbi fii sakhatil-waalid.",
    "translationFull": "Ridha Allah berada pada ridha orang tua, dan murka Allah berada pada murka orang tua.",
    "rawi": "HR. Tirmidzi",
    "fawaid": [
      "Berbakti dan membahagiakan orang tua adalah jalan utama meraih ridha Allah dan surga-Nya."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ",
        "latin": "Ridhar-rabbi fii ridhal-waalidi",
        "translation": "Ridha Allah ada pada ridha orang tua,"
      },
      {
        "step": 2,
        "arabic": "وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
        "latin": "wa sakhatur-rabbi fii sakhatil-waalid",
        "translation": "dan murka Allah ada pada murka orang tua."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي ..... الْوَالِدِ",
      "missingWord": "سَخَطِ",
      "options": [
        "سَخَطِ",
        "حُبِّ",
        "عَفْوِ",
        "طَاعَةِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_8",
    "number": 8,
    "title": "Hadits 8 - Larangan Makan Minum Tangan Kiri",
    "theme": "Adab Makan & Minum",
    "gradeLevel": "kelas_2",
    "arabicFull": "لَا يَأْكُلَنَّ أَحَدُكُمْ بِشِمَالِهِ وَلَا يَشْرَبَنَّ بِهَا",
    "latinFull": "Laa ya’kulanna ahadukum bi syimaalihi wa laa yasyrabanna bihaa.",
    "translationFull": "Janganlah salah seorang di antara kalian makan dengan tangan kiri dan jangan minum dengannya.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Umat Islam dilarang makan dan minum dengan tangan kiri karena menyerupai kebiasaan setan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يَأْكُلَنَّ أَحَدُكُمْ بِشِمَالِهِ",
        "latin": "Laa ya’kulanna ahadukum bi syimaalihi",
        "translation": "Janganlah seseorang makan dengan tangan kirinya,"
      },
      {
        "step": 2,
        "arabic": "وَلَا يَشْرَبَنَّ بِهَا",
        "latin": "wa laa yasyrabanna bihaa",
        "translation": "dan jangan pula minum dengannya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يَأْكُلَنَّ أَحَدُكُمْ ..... وَلَا يَشْرَبَنَّ بِهَا",
      "missingWord": "بِشِمَالِهِ",
      "options": [
        "بِشِمَالِهِ",
        "بِيَمِينِهِ",
        "قَائِمًا",
        "مَاشِيًا"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_9",
    "number": 9,
    "title": "Hadits 9 - Balasan Mencari Ilmu",
    "theme": "Menuntut Ilmu",
    "gradeLevel": "kelas_2",
    "arabicFull": "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    "latinFull": "Man salaka thariiqan yaltamisu fiihi ‘ilman sahhallahu lahu thariiqan ilal jannah.",
    "translationFull": "Barangsiapa menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Keutamaan besar siswa dan penuntut ilmu syar’i dan ilmu yang bermanfaat."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا",
        "latin": "Man salaka thariiqan yaltamisu fiihi ‘ilman",
        "translation": "Barangsiapa menempuh jalan mencari ilmu,"
      },
      {
        "step": 2,
        "arabic": "سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
        "latin": "sahhallahu lahu thariiqan ilal jannah",
        "translation": "Allah mudahkan baginya jalan menuju surga."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى .....",
      "missingWord": "الْجَنَّةِ",
      "options": [
        "الْجَنَّةِ",
        "النَّارِ",
        "الْمَدِينَةِ",
        "الْبَيْتِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_10",
    "number": 10,
    "title": "Hadits 10 - Dilarang Bernafas di Tempat Minum",
    "theme": "Adab Minum",
    "gradeLevel": "kelas_2",
    "arabicFull": "إِذَا شَرِبَ أَحَدُكُمْ فَلَا يَتَنَفَّسْ فِي الإِنَاءِ",
    "latinFull": "Idzaa syariba ahadukum falaa yatanaffas fil inaa’.",
    "translationFull": "Jika salah seorang di antara kalian minum, janganlah bernafas di dalam bejana.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Menjaga kebersihan air minum dengan tidak bernafas di dalam gelas.",
      "Minum perlahan dalam dua atau tiga tegukan sambil bernafas di luar wadah."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِذَا شَرِبَ أَحَدُكُمْ",
        "latin": "Idzaa syariba ahadukum",
        "translation": "Jika salah seorang di antara kalian minum,"
      },
      {
        "step": 2,
        "arabic": "فَلَا يَتَنَفَّسْ فِي الإِنَاءِ",
        "latin": "falaa yatanaffas fil inaa’",
        "translation": "janganlah ia bernafas di dalam bejana."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِذَا شَرِبَ أَحَدُكُمْ فَلَا يَتَنَفَّسْ فِي .....",
      "missingWord": "الإِنَاءِ",
      "options": [
        "الإِنَاءِ",
        "الْمَسْجِدِ",
        "الْبَيْتِ",
        "الطَّرِيقِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_11",
    "number": 11,
    "title": "Hadits 11 - Jangan Berbuat Namimah (Adu Domba)",
    "theme": "Menjaga Lisan",
    "gradeLevel": "kelas_2",
    "arabicFull": "لَا يَدْخُلُ الْجَنَّةَ نَمَّامٌ",
    "latinFull": "Laa yadkhulul jannata nammaam.",
    "translationFull": "Tidak akan masuk surga orang yang suka mengadu domba.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Mengadu domba (namimah) merusak tali persaudaraan dan termasuk dosa besar.",
      "Menjadi juru damai dan menyatukan teman yang berselisih."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يَدْخُلُ الْجَنَّةَ",
        "latin": "Laa yadkhulul jannata",
        "translation": "Tidak akan masuk surga"
      },
      {
        "step": 2,
        "arabic": "نَمَّامٌ",
        "latin": "nammaam",
        "translation": "orang yang suka mengadu domba."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يَدْخُلُ الْجَنَّةَ .....",
      "missingWord": "نَمَّامٌ",
      "options": [
        "نَمَّامٌ",
        "مُؤْمِنٌ",
        "صَادِقٌ",
        "كَرِيمٌ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_12",
    "number": 12,
    "title": "Hadits 12 - Berkata yang Baik atau Diam",
    "theme": "Menjaga Lisan",
    "gradeLevel": "kelas_2",
    "arabicFull": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    "latinFull": "Man kaana yu’minu billaahi wal yaumil aakhiri falyaqul khairan au liyashmut.",
    "translationFull": "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Tanda kesempurnaan iman adalah berpikir sebelum berucap.",
      "Jika perkataan tidak membawa kebaikan atau manfaat, lebih baik diam."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ",
        "latin": "Man kaana yu’minu billaahi wal yaumil aakhiri",
        "translation": "Barangsiapa beriman kepada Allah dan hari akhir,"
      },
      {
        "step": 2,
        "arabic": "فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        "latin": "falyaqul khairan au liyashmut",
        "translation": "hendaklah ia berkata baik atau diam."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ .....",
      "missingWord": "لِيَصْمُتْ",
      "options": [
        "لِيَصْمُتْ",
        "لِيَضْحَكْ",
        "لِيَبْكِ",
        "لِيَقُمْ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_13",
    "number": 13,
    "title": "Hadits 13 - Larangan Menyiksa Binatang",
    "theme": "Menyayangi Makhluk",
    "gradeLevel": "kelas_3",
    "arabicFull": "عُذِّبَتِ امْرَأَةٌ فِي هِرَّةٍ حَبَسَتْهَا حَتَّى مَاتَتْ",
    "latinFull": "Uddzibatim-ra-atun fii hirratin habasathaa hattaa maatat.",
    "translationFull": "Seorang wanita disiksa karena seekor kucing yang ia kurung sampai mati.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Islam mengajarkan kasih sayang kepada seluruh makhluk ciptaan Allah termasuk hewan.",
      "Menyiksa atau mengurung hewan tanpa memberi makan mendatangkan siksa."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "عُذِّبَتِ امْرَأَةٌ فِي هِرَّةٍ",
        "latin": "Uddzibatim-ra-atun fii hirratin",
        "translation": "Seorang wanita disiksa karena seekor kucing,"
      },
      {
        "step": 2,
        "arabic": "حَبَسَتْهَا حَتَّى مَاتَتْ",
        "latin": "habasathaa hattaa maatat",
        "translation": "ia mengurungnya hingga kucing itu mati."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "عُذِّبَتِ امْرَأَةٌ فِي هِرَّةٍ حَبَسَتْهَا حَتَّى .....",
      "missingWord": "مَاتَتْ",
      "options": [
        "مَاتَتْ",
        "نَامَتْ",
        "أَكَلَتْ",
        "شَرِبَتْ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_14",
    "number": 14,
    "title": "Hadits 14 - Perintah Menjawab Adzan",
    "theme": "Adab Sholat & Adzan",
    "gradeLevel": "kelas_3",
    "arabicFull": "إِذَا سَمِعْتُمُ النِّدَاءَ فَقُولُوا مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ",
    "latinFull": "Idzaa sami’tumun-nidaa-a faquuluu mitsla maa yaquulul mu-adzdzin.",
    "translationFull": "Apabila kalian mendengar adzan, ucapkanlah seperti apa yang diucapkan muadzin.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Menjawab adzan merupakan amalan sunnah yang berlimpah pahala dan syafaat.",
      "Mendengarkan panggilan adzan dengan tenang dan khusyuk."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِذَا سَمِعْتُمُ النِّدَاءَ",
        "latin": "Idzaa sami’tumun-nidaa-a",
        "translation": "Apabila kalian mendengar panggilan adzan,"
      },
      {
        "step": 2,
        "arabic": "فَقُولُوا مِثْلَ مَا يَقُولُ الْمُؤَذِّنُ",
        "latin": "faquuluu mitsla maa yaquulul mu-adzdzin",
        "translation": "maka ucapkanlah seperti yang diucapkan muadzin."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِذَا سَمِعْتُمُ النِّدَاءَ فَقُولُوا مِثْلَ مَا يَقُولُ .....",
      "missingWord": "الْمُؤَذِّنُ",
      "options": [
        "الْمُؤَذِّنُ",
        "الإِمَامُ",
        "الْمُعَلِّمُ",
        "الأَمِيرُ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_15",
    "number": 15,
    "title": "Hadits 15 - Cintailah Saudaramu",
    "theme": "Ukhuwah Islamiyah",
    "gradeLevel": "kelas_3",
    "arabicFull": "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    "latinFull": "Laa yu’minu ahadukum hattaa yuhibba li-akhiihi maa yuhibbu linafsih.",
    "translationFull": "Tidak sempurna iman salah seorang di antara kalian sampai ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Kesempurnaan iman tercermin dari kecintaan dan empati kepada sesama muslim.",
      "Menghindari sifat dengki dan iri atas kenikmatan yang diperoleh teman."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يُؤْمِنُ أَحَدُكُمْ",
        "latin": "Laa yu’minu ahadukum",
        "translation": "Tidak sempurna iman salah seorang di antara kalian,"
      },
      {
        "step": 2,
        "arabic": "حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        "latin": "hattaa yuhibba li-akhiihi maa yuhibbu linafsih",
        "translation": "sampai ia mencintai saudaranya seperti ia mencintai dirinya sendiri."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ .....",
      "missingWord": "لِنَفْسِهِ",
      "options": [
        "لِنَفْسِهِ",
        "لِمَالِهِ",
        "لِبَيْتِهِ",
        "لِوَلَدِهِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_16",
    "number": 16,
    "title": "Hadits 16 - Pahala Langkah ke Masjid",
    "theme": "Keutamaan Sholat Berjamaah",
    "gradeLevel": "kelas_3",
    "arabicFull": "أَعْظَمُ النَّاسِ أَجْرًا فِي الصَّلَاةِ أَبْعَدُهُمْ فَأَبْعَدُهُمْ مَمْشًى",
    "latinFull": "A’zhamun-naasi ajran fish-shalaati ab’aduhum fa-ab’aduhum mamsyaa.",
    "translationFull": "Orang yang paling besar pahalanya dalam shalat adalah yang paling jauh jarak berjalannya ke masjid.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Setiap langkah kaki menuju masjid menghapus dosa dan meninggikan derajat di sisi Allah.",
      "Semangat berjalan kaki ke masjid sekalipun jaraknya cukup jauh."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "أَعْظَمُ النَّاسِ أَجْرًا فِي الصَّلَاةِ",
        "latin": "A’zhamun-naasi ajran fish-shalaati",
        "translation": "Orang yang paling besar pahalanya dalam shalat adalah"
      },
      {
        "step": 2,
        "arabic": "أَبْعَدُهُمْ فَأَبْعَدُهُمْ مَمْشًى",
        "latin": "ab’aduhum fa-ab’aduhum mamsyaa",
        "translation": "yang paling jauh dan paling jauh langkahnya ke masjid."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "أَعْظَمُ النَّاسِ أَجْرًا فِي الصَّلَاةِ أَبْعَدُهُمْ فَأَبْعَدُهُمْ .....",
      "missingWord": "مَمْشًى",
      "options": [
        "مَمْشًى",
        "بَيْتًا",
        "مَالًا",
        "عُمْرًا"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_17",
    "number": 17,
    "title": "Hadits 17 - Adab Duduk",
    "theme": "Adab Duduk & Majelis",
    "gradeLevel": "kelas_3",
    "arabicFull": "لَا يُقِيمُ الرَّجُلُ الرَّجُلَ مِنْ مَجْلِسِهِ ثُمَّ يَجْلِسُ فِيهِ",
    "latinFull": "Laa yuqiimur-rajulur-rajula min majlisihii tsumma yajlisu fiih.",
    "translationFull": "Janganlah seseorang menyuruh orang lain berdiri dari tempat duduknya lalu ia menempatinya.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Menghormati hak orang lain yang sudah lebih dulu duduk di suatu tempat.",
      "Melapangkan tempat duduk bagi yang baru datang tanpa mengusir orang lain."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يُقِيمُ الرَّجُلُ الرَّجُلَ",
        "latin": "Laa yuqiimur-rajulur-rajula",
        "translation": "Janganlah seseorang menyuruh berdiri orang lain"
      },
      {
        "step": 2,
        "arabic": "مِنْ مَجْلِسِهِ",
        "latin": "min majlisihii",
        "translation": "dari tempat duduknya,"
      },
      {
        "step": 3,
        "arabic": "ثُمَّ يَجْلِسُ فِيهِ",
        "latin": "tsumma yajlisu fiih",
        "translation": "lalu dia sendiri duduk di tempat itu."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يُقِيمُ الرَّجُلُ الرَّجُلَ مِنْ مَجْلِسِهِ ثُمَّ ..... فِيهِ",
      "missingWord": "يَجْلِسُ",
      "options": [
        "يَجْلِسُ",
        "يَقُومُ",
        "يَنَامُ",
        "يَمْشِي"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_18",
    "number": 18,
    "title": "Hadits 18 - Memuliakan Tamu",
    "theme": "Memuliakan Tamu",
    "gradeLevel": "kelas_3",
    "arabicFull": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
    "latinFull": "Man kaana yu’minu billaahi wal yaumil aakhiri falyukrim dhaifah.",
    "translationFull": "Barangsiapa beriman kepada Allah dan hari akhir, maka hendaklah ia memuliakan tamunya.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Menyambut tamu dengan wajah ramah dan jamuan terbaik merupakan tanda keimanan.",
      "Menghargai setiap tamu yang berkunjung ke rumah."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ",
        "latin": "Man kaana yu’minu billaahi wal yaumil aakhiri",
        "translation": "Barangsiapa beriman kepada Allah dan hari akhir,"
      },
      {
        "step": 2,
        "arabic": "فَلْيُكْرِمْ ضَيْفَهُ",
        "latin": "falyukrim dhaifah",
        "translation": "maka hendaklah ia memuliakan tamunya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ .....",
      "missingWord": "ضَيْفَهُ",
      "options": [
        "ضَيْفَهُ",
        "جَارَهُ",
        "أَخَاهُ",
        "نَفْسَهُ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_19",
    "number": 19,
    "title": "Hadits 19 - Menyingkirkan Duri",
    "theme": "Kebersihan & Ketertiban Umum",
    "gradeLevel": "kelas_4",
    "arabicFull": "وَتُمِيطُ الأَذَى عَنِ الطَّرِيقِ صَدَقَةٌ",
    "latinFull": "Wa tumiithul adzaa ‘anith-thariiqi shadaqah.",
    "translationFull": "Menyingkirkan gangguan dari jalan adalah sedekah.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Menyingkirkan batu, duri, atau sampah dari jalanan bernilai sedekah.",
      "Peduli terhadap keselamatan pejalan kaki dan lingkungan sekitar."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "وَتُمِيطُ الأَذَى عَنِ الطَّرِيقِ",
        "latin": "Wa tumiithul adzaa ‘anith-thariiq",
        "translation": "Dan kamu menyingkirkan gangguan dari jalan"
      },
      {
        "step": 2,
        "arabic": "صَدَقَةٌ",
        "latin": "shadaqah",
        "translation": "adalah bernilai sedekah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "وَتُمِيطُ الأَذَى عَنِ الطَّرِيقِ .....",
      "missingWord": "صَدَقَةٌ",
      "options": [
        "صَدَقَةٌ",
        "سُنَّةٌ",
        "وَاجِبٌ",
        "نَافِلَةٌ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_20",
    "number": 20,
    "title": "Hadits 20 - Muslim Sejati",
    "theme": "Karakter Muslim Sejati",
    "gradeLevel": "kelas_4",
    "arabicFull": "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    "latinFull": "Al-muslimu man salimal muslimuuna min lisaanihii wa yadih.",
    "translationFull": "Seorang muslim adalah orang yang muslim lainnya selamat dari gangguan lisan dan tangannya.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Muslim sejati tidak menyakiti orang lain dengan perkataan maupun tindakannya.",
      "Menjaga kedamaian, lisan, dan tangan agar orang lain merasa aman."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ",
        "latin": "Al-muslimu man salimal muslimuun",
        "translation": "Muslim sejati adalah yang kaum muslimin selamat"
      },
      {
        "step": 2,
        "arabic": "مِنْ لِسَانِهِ وَيَدِهِ",
        "latin": "min lisaanihii wa yadih",
        "translation": "dari gangguan lisan dan tangannya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَ .....",
      "missingWord": "يَدِهِ",
      "options": [
        "يَدِهِ",
        "عَيْنِهِ",
        "رِجْلِهِ",
        "بَيْتِهِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_21",
    "number": 21,
    "title": "Hadits 21 - Kewajiban Mengikuti Sunnah Rasul",
    "theme": "Mengikuti Sunnah Nabi",
    "gradeLevel": "kelas_4",
    "arabicFull": "فَمَنْ رَغِبَ عَنْ سُنَّتِي فَلَيْسَ مِنِّي",
    "latinFull": "Fa man raghiba ‘an sunnatii fa laisa minnii.",
    "translationFull": "Barangsiapa membenci sunnahku, maka ia bukan termasuk golonganku.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Mengikuti tuntunan Rasulullah ﷺ adalah kunci diterimanya amal ibadah.",
      "Tidak berlebihan (ghuluw) dan tidak meremehkan sunnah Nabi."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "فَمَنْ رَغِبَ عَنْ سُنَّتِي",
        "latin": "Faman raghiba ‘an sunnatii",
        "translation": "Maka barangsiapa membenci/menolak sunnahku,"
      },
      {
        "step": 2,
        "arabic": "فَلَيْسَ مِنِّي",
        "latin": "falaisa minnii",
        "translation": "maka ia bukan dari golonganku."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "فَمَنْ رَغِبَ عَنْ سُنَّتِي فَلَيْسَ .....",
      "missingWord": "مِنِّي",
      "options": [
        "مِنِّي",
        "مَعِي",
        "عَنِّي",
        "فِيَّ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_22",
    "number": 22,
    "title": "Hadits 22 - Menutup Aib Sesama Muslim",
    "theme": "Menjaga Kehormatan Sahabat",
    "gradeLevel": "kelas_4",
    "arabicFull": "مَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ",
    "latinFull": "Man satara musliman satarahullaahu fid-dunyaa wal aakhirah.",
    "translationFull": "Barangsiapa menutup aib seorang muslim, niscaya Allah akan menutup aibnya di dunia dan di akhirat.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Barangsiapa menutup aib saudaranya, Allah akan menutup aibnya di dunia dan akhirat.",
      "Tidak menyebarkan kekurangan teman atau ghibah."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "مَنْ سَتَرَ مُسْلِمًا",
        "latin": "Man satara musliman",
        "translation": "Barangsiapa menutupi aib seorang muslim,"
      },
      {
        "step": 2,
        "arabic": "سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ",
        "latin": "satarahul-laahu fid-dunyaa wal aakhirah",
        "translation": "Allah akan menutupi aibnya di dunia dan akhirat."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "مَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَ .....",
      "missingWord": "الآخِرَةِ",
      "options": [
        "الآخِرَةِ",
        "الْقَبْرِ",
        "الْبَيْتِ",
        "الْمَسْجِدِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_23",
    "number": 23,
    "title": "Hadits 23 - Keutamaan Belajar Al-Qur'an",
    "theme": "Keutamaan Belajar Al-Qur'an",
    "gradeLevel": "kelas_4",
    "arabicFull": "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    "latinFull": "Khairukum man ta’allamal Qur-aana wa ‘allamah.",
    "translationFull": "Sebaik-baik kalian adalah orang yang mempelajari Al-Qur’an dan mengajarkannya.",
    "rawi": "HR. Bukhari",
    "fawaid": [
      "Manusia terbaik adalah yang tekun belajar membaca dan memahami Al-Qur'an lalu mengajarkannya.",
      "Menjadikan Al-Qur'an pedoman hidup sehari-hari."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ",
        "latin": "Khairukum man ta’allamal Qur-aan",
        "translation": "Sebaik-baik kalian adalah yang mempelajari Al-Qur’an,"
      },
      {
        "step": 2,
        "arabic": "وَعَلَّمَهُ",
        "latin": "wa ‘allamah",
        "translation": "dan yang mengajarkannya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَ .....",
      "missingWord": "عَلَّمَهُ",
      "options": [
        "عَلَّمَهُ",
        "قَرَأَهُ",
        "حَفِظَهُ",
        "كَتَبَهُ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_24",
    "number": 24,
    "title": "Hadits 24 - Tolong Menolong",
    "theme": "Tolong Menolong & Gotong Royong",
    "gradeLevel": "kelas_4",
    "arabicFull": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    "latinFull": "Wallaahu fii ‘aunil ‘abdi maa kaanal ‘abdu fii ‘auni akhiih.",
    "translationFull": "Allah senantiasa menolong hamba-Nya selama hamba tersebut menolong saudaranya.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Pertolongan Allah akan selalu menyertai hamba yang suka membantu saudaranya.",
      "Saling membantu dalam kebaikan dan ketakwaan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ",
        "latin": "Wallaahu fii ‘aunil ‘abdi",
        "translation": "Dan Allah senantiasa menolong hamba-Nya,"
      },
      {
        "step": 2,
        "arabic": "مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
        "latin": "maa kaanal ‘abdu fii ‘auni akhiih",
        "translation": "selama hamba itu suka menolong saudaranya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ .....",
      "missingWord": "أَخِيهِ",
      "options": [
        "أَخِيهِ",
        "نَفْسِهِ",
        "جَارِهِ",
        "أُمِّهِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_25",
    "number": 25,
    "title": "Hadits 25 - Larangan Berbisik-bisik",
    "theme": "Adab Berbicara",
    "gradeLevel": "kelas_5",
    "arabicFull": "إِذَا كُنْتُمْ ثَلَاثَةً فَلَا يَتَنَاجَى اثْنَانِ دُونَ صَاحِبِهِمَا",
    "latinFull": "Idzaa kuntum tsalaatsatan falaa yatanaajats-naani duuna shaahibihimaa.",
    "translationFull": "Jika kalian bertiga, janganlah dua orang berbisik-bisik tanpa mengikutsertakan yang ketiga.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Menjaga perasaan teman dengan tidak berbisik berdua saat ada orang ketiga.",
      "Berbicara terbuka agar tidak timbul prasangka buruk atau rasa tersisih."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِذَا كُنْتُمْ ثَلَاثَةً",
        "latin": "Idzaa kuntum tsalaatsatan",
        "translation": "Jika kalian bertiga,"
      },
      {
        "step": 2,
        "arabic": "فَلَا يَتَنَاجَى اثْنَانِ",
        "latin": "falaa yatanaajats-naani",
        "translation": "maka janganlah dua orang berbisik-bisik"
      },
      {
        "step": 3,
        "arabic": "دُونَ صَاحِبِهِمَا",
        "latin": "duuna shaahibihimaa",
        "translation": "tanpa menyertakan teman yang ketiga."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِذَا كُنْتُمْ ثَلَاثَةً فَلَا يَتَنَاجَى اثْنَانِ دُونَ .....",
      "missingWord": "صَاحِبِهِمَا",
      "options": [
        "صَاحِبِهِمَا",
        "أُمِّهِمَا",
        "أَبِيهِمَا",
        "مُعَلِّمِهِمَا"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_26",
    "number": 26,
    "title": "Hadits 26 - Keutamaan Jabat Tangan",
    "theme": "Keutamaan Berjabat Tangan",
    "gradeLevel": "kelas_5",
    "arabicFull": "مَا مِنْ مُسْلِمَيْنِ يَلْتَقِيَانِ فَيَتَصَافَحَانِ إِلَّا غُفِرَ لَهُمَا قَبْلَ أَنْ يَفْتَرِقَا",
    "latinFull": "Maa min muslimaini yaltaqiyaani fa yatashaafahaani illaa ghufira lahumaa qabla an yaftariqaa.",
    "translationFull": "Tidaklah dua muslim bertemu lalu berjabat tangan melainkan dosa keduanya diampuni sebelum berpisah.",
    "rawi": "HR. Abu Dawud",
    "fawaid": [
      "Berjabat tangan saat bertemu menggugurkan dosa-dosa kecil di antara sesama muslim.",
      "Menyebarkan salam dan kehangatan dalam pergaulan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "مَا مِنْ مُسْلِمَيْنِ يَلْتَقِيَانِ فَيَتَصَافَحَانِ",
        "latin": "Maa min muslimaini yaltaqiyaani fayatashaafahaan",
        "translation": "Tidaklah dua muslim bertemu lalu saling berjabat tangan,"
      },
      {
        "step": 2,
        "arabic": "إِلَّا غُفِرَ لَهُمَا قَبْلَ أَنْ يَفْتَرِقَا",
        "latin": "illaa ghufira lahumaa qabla an yaftariqaa",
        "translation": "melainkan diampuni dosa keduanya sebelum mereka berpisah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "مَا مِنْ مُسْلِمَيْنِ يَلْتَقِيَانِ فَيَتَصَافَحَانِ إِلَّا غُفِرَ لَهُمَا قَبْلَ أَنْ .....",
      "missingWord": "يَفْتَرِقَا",
      "options": [
        "يَفْتَرِقَا",
        "يَنَامَا",
        "يَأْكُلَا",
        "يَجْلِسَا"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_27",
    "number": 27,
    "title": "Hadits 27 - Larangan Bersikap Sombong",
    "theme": "Larangan Bersikap Sombong",
    "gradeLevel": "kelas_5",
    "arabicFull": "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ",
    "latinFull": "Laa yadkhulul jannata man kaana fii qalbihi mitsqaalu dzarratin min kibr.",
    "translationFull": "Tidak akan masuk surga orang yang di dalam hatinya terdapat seberat biji sawi dari kesombongan.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Kesombongan adalah menolak kebenaran dan merendahkan orang lain.",
      "Sifat tawadhu (rendah hati) adalah perhiasan penuntut ilmu."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يَدْخُلُ الْجَنَّةَ",
        "latin": "Laa yadkhulul jannah",
        "translation": "Tidak akan masuk surga"
      },
      {
        "step": 2,
        "arabic": "مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ كِبْرٍ",
        "latin": "man kaana fii qalbihii mitsqaalu dzarratin min kibir",
        "translation": "siapa saja yang di hatinya terdapat seberat zarrah kesombongan."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يَدْخُلُ الْجَنَّةَ مَنْ كَانَ فِي قَلْبِهِ مِثْقَالُ ذَرَّةٍ مِنْ .....",
      "missingWord": "كِبْرٍ",
      "options": [
        "كِبْرٍ",
        "حَسَدٍ",
        "ظُلْمٍ",
        "خَوْفٍ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_28",
    "number": 28,
    "title": "Hadits 28 - Mukmin yang Kuat",
    "theme": "Mukmin yang Kuat",
    "gradeLevel": "kelas_5",
    "arabicFull": "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ",
    "latinFull": "Al-mu’minul qawiyyu khairun wa ahabbu ilallaahi minal mu’minidh-dha’iif.",
    "translationFull": "Mukmin yang kuat lebih baik dan lebih dicintai Allah daripada mukmin yang lemah.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Mukmin yang kuat iman, fisik, dan keilmuannya lebih dicintai Allah.",
      "Rajin berolahraga, belajar giat, dan menjaga kesehatan badan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ",
        "latin": "Al-mu’minul qawiyyu khairun wa ahabbu ilallaah",
        "translation": "Mukmin yang kuat lebih baik dan lebih dicintai Allah"
      },
      {
        "step": 2,
        "arabic": "مِنَ الْمُؤْمِنِ الضَّعِيفِ",
        "latin": "minal mu’minidh-dha’iif",
        "translation": "daripada mukmin yang lemah."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ .....",
      "missingWord": "الضَّعِيفِ",
      "options": [
        "الضَّعِيفِ",
        "الْكَبِيرِ",
        "الصَّغِيرِ",
        "الْبَعِيدِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_29",
    "number": 29,
    "title": "Hadits 29 - Allah Menilai dari Hati dan Amal",
    "theme": "Keikhlasan Hati & Amal",
    "gradeLevel": "kelas_5",
    "arabicFull": "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    "latinFull": "Innallaaha laa yanzhuru ilaa shuwarikum wa amwaalikum wa laakin yanzhuru ilaa quluubikum wa a’maalikum.",
    "translationFull": "Sesungguhnya Allah tidak melihat bentuk rupa dan harta kalian, tetapi Dia melihat hati dan amal perbuatan kalian.",
    "rawi": "HR. Muslim",
    "fawaid": [
      "Allah tidak melihat rupa fisik dan banyaknya harta, melainkan kesucian hati dan amal kebaikan.",
      "Menjaga niat tulus ikhlas semata-mata karena Allah."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ",
        "latin": "Innallaaha laa yanzhuru ilaa shuwarikum wa amwaalikum",
        "translation": "Sesungguhnya Allah tidak melihat rupa dan harta kalian,"
      },
      {
        "step": 2,
        "arabic": "وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
        "latin": "wa laakin yanzhuru ilaa quluubikum wa a’maalikum",
        "translation": "tetapi Allah melihat hati dan amal perbuatan kalian."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى ..... وَأَعْمَالِكُمْ",
      "missingWord": "قُلُوبِكُمْ",
      "options": [
        "قُلُوبِكُمْ",
        "بُيُوتِكُمْ",
        "أَوْلَادِكُمْ",
        "ثِيَابِكُمْ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_30",
    "number": 30,
    "title": "Hadits 30 - Sikap Kepada yang Lebih Tua",
    "theme": "Adab Pergaulan Antargenerasi",
    "gradeLevel": "kelas_5",
    "arabicFull": "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا",
    "latinFull": "Laisa minnaa man lam yarham shaghiiranaa wa yuwaqqir kabiiranaa.",
    "translationFull": "Bukan dari golongan kami orang yang tidak menyayangi yang muda dan tidak menghormati yang tua.",
    "rawi": "HR. Tirmidzi",
    "fawaid": [
      "Menyayangi yang lebih muda dan menghormati yang lebih tua adalah cerminan akhlak mulia.",
      "Berbicara santun kepada orang tua dan bersikap ramah serta membimbing adik-adik."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَيْسَ مِنَّا",
        "latin": "Laisa minnaa",
        "translation": "Bukan dari golongan kami"
      },
      {
        "step": 2,
        "arabic": "مَنْ لَمْ يَرْحَمْ صَغِيرَنَا",
        "latin": "man lam yarham shaghiiranaa",
        "translation": "orang yang tidak menyayangi yang muda di antara kami,"
      },
      {
        "step": 3,
        "arabic": "وَيُوَقِّرْ كَبِيرَنَا",
        "latin": "wa yuwaqqir kabiiranaa",
        "translation": "dan tidak menghormati yang lebih tua di antara kami."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَ ..... كَبِيرَنَا",
      "missingWord": "يُوَقِّرْ",
      "options": [
        "يُوَقِّرْ",
        "يَضْرِبْ",
        "يَتْرُكْ",
        "يَسْمَعْ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_31",
    "number": 31,
    "title": "Hadits 31 - Orang yang Dibenci Allah",
    "theme": "Menjauhi Pertengkaran",
    "gradeLevel": "kelas_6",
    "arabicFull": "إِنَّ أَبْغَضَ الرِّجَالِ إِلَى اللَّهِ الْأَلَدُّ الْخَصِمُ",
    "latinFull": "Inna abghadhar-rijaali ilallaahil aladdul khashim.",
    "translationFull": "Sesungguhnya orang yang paling dibenci Allah adalah orang yang paling keras dalam bermusuhan.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Orang yang paling dibenci Allah adalah orang yang suka bertengkar dan keras kepala dalam debat batil.",
      "Menghindari perdebatan yang menimbulkan permusuhan dan dendam."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "إِنَّ أَبْغَضَ الرِّجَالِ إِلَى اللَّهِ",
        "latin": "Inna abghadhar-rijaali ilallaah",
        "translation": "Sesungguhnya orang yang paling dibenci di sisi Allah adalah"
      },
      {
        "step": 2,
        "arabic": "الْأَلَدُّ الْخَصِمُ",
        "latin": "al-aladdul khashim",
        "translation": "orang yang sangat keras dalam membantah dan bertengkar."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "إِنَّ أَبْغَضَ الرِّجَالِ إِلَى اللَّهِ ..... الْخَصِمُ",
      "missingWord": "الْأَلَدُّ",
      "options": [
        "الْأَلَدُّ",
        "الْكَرِيمُ",
        "الصَّادِقُ",
        "الْمُؤْمِنُ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_32",
    "number": 32,
    "title": "Hadits 32 - Larangan Bermusuhan Sesama Muslim",
    "theme": "Larangan Mendiamkan Saudara",
    "gradeLevel": "kelas_6",
    "arabicFull": "لَا يَحِلُّ لِمُسْلِمٍ أَنْ يَهْجُرَ أَخَاهُ فَوْقَ ثَلَاثِ لَيَالٍ",
    "latinFull": "Laa yahillu li muslimin an yahjura akhaahu fauqa tsalaatsi layaal.",
    "translationFull": "Tidak halal bagi seorang muslim mendiamkan (memusuhi) saudaranya lebih dari tiga malam.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Haram mendiamkan (memboikot) sesama muslim karena urusan duniawi lebih dari 3 hari.",
      "Yang terbaik di antara keduanya adalah yang lebih dahulu memulai mengucapkan salam."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "لَا يَحِلُّ لِمُسْلِمٍ",
        "latin": "Laa yahillu limuslimin",
        "translation": "Tidak halal bagi seorang muslim"
      },
      {
        "step": 2,
        "arabic": "أَنْ يَهْجُرَ أَخَاهُ",
        "latin": "an yahjura akhaahu",
        "translation": "mendiamkan saudaranya"
      },
      {
        "step": 3,
        "arabic": "فَوْقَ ثَلَاثِ لَيَالٍ",
        "latin": "fauqa tsalaatsi layaal",
        "translation": "lebih dari tiga malam berturut-turut."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "لَا يَحِلُّ لِمُسْلِمٍ أَنْ يَهْجُرَ أَخَاهُ فَوْقَ ..... لَيَالٍ",
      "missingWord": "ثَلَاثِ",
      "options": [
        "ثَلَاثِ",
        "خَمْسِ",
        "سَبْعِ",
        "عَشْرِ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_33",
    "number": 33,
    "title": "Hadits 33 - Orang Mukmin Itu Cermin Mukmin Lain",
    "theme": "Cermin Kebaikan",
    "gradeLevel": "kelas_6",
    "arabicFull": "الْمُؤْمِنُ مِرْآةُ الْمُؤْمِنِ",
    "latinFull": "Al-mu’minu mir-aatul mu’min.",
    "translationFull": "Seorang mukmin adalah cermin bagi mukmin lainnya.",
    "rawi": "HR. Abu Dawud",
    "fawaid": [
      "Seorang mukmin adalah cermin bagi mukmin lainnya; mengingatkan kekeliruan dengan bijak.",
      "Saling menasihati dalam kebenaran dan kesabaran secara tulus."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الْمُؤْمِنُ",
        "latin": "Al-mu’minu",
        "translation": "Seorang mukmin itu"
      },
      {
        "step": 2,
        "arabic": "مِرْآةُ الْمُؤْمِنِ",
        "latin": "mir-aatul mu’min",
        "translation": "adalah cermin bagi mukmin yang lain."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الْمُؤْمِنُ ..... الْمُؤْمِنِ",
      "missingWord": "مِرْآةُ",
      "options": [
        "مِرْآةُ",
        "صَدِيقُ",
        "أَخُو",
        "عَوْنُ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_34",
    "number": 34,
    "title": "Hadits 34 - Kewajiban Bertakwa Kepada Allah",
    "theme": "Taqwa & Tobat",
    "gradeLevel": "kelas_6",
    "arabicFull": "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا",
    "latinFull": "Ittaqillaaha haitsumaa kunta wa atbi’is-sayyi-atal hasanata tamhuhaa.",
    "translationFull": "Bertakwalah kepada Allah di mana pun engkau berada, dan iringilah keburukan dengan kebaikan niscaya akan menghapusnya.",
    "rawi": "HR. Tirmidzi",
    "fawaid": [
      "Bertakwa kepada Allah di mana pun berada, baik saat ramai maupun sendirian.",
      "Segera mengiringi kesalahan dengan amal kebaikan yang menghapusnya."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
        "latin": "Ittaqillaaha haitsumaa kunta",
        "translation": "Bertakwalah kepada Allah di mana pun kamu berada,"
      },
      {
        "step": 2,
        "arabic": "وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا",
        "latin": "wa atbi’is-sayyi-atal hasanata tamhuhaa",
        "translation": "dan iringilah perbuatan buruk dengan kebaikan, niscaya kebaikan itu akan menghapusnya."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ وَأَتْبِعِ السَّيِّئَةَ ..... تَمْحُهَا",
      "missingWord": "الْحَسَنَةَ",
      "options": [
        "الْحَسَنَةَ",
        "الصَّدَقَةَ",
        "الصَّلَاةَ",
        "التَّوْبَةَ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_35",
    "number": 35,
    "title": "Hadits 35 - Tanda-Tanda Orang Munafik",
    "theme": "Menjauhi Sifat Munafik",
    "gradeLevel": "kelas_6",
    "arabicFull": "آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ",
    "latinFull": "Aayatul munaafiqi tsalaatsun: Idzaa haddatsa kadzaba, wa idzaa wa’ada akhlafa, wa idza’tumina khaana.",
    "translationFull": "Tanda orang munafik ada tiga: apabila berbicara berdusta, apabila berjanji mengingkari, dan apabila dipercaya berkhianat.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Menghindari tanda kemunafikan: jika berbicara berdusta, berjanji mengingkari, dan diberi amanah berkhianat.",
      "Senantiasa jujur, amanah, dan menepati janji."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "آيَةُ الْمُنَافِقِ ثَلَاثٌ:",
        "latin": "Aayatul munaafiqi tsalaats:",
        "translation": "Tanda-tanda orang munafik itu ada tiga:"
      },
      {
        "step": 2,
        "arabic": "إِذَا حَدَّثَ كَذَبَ،",
        "latin": "idzaa haddatsa kadzab,",
        "translation": "apabila berbicara ia berdusta,"
      },
      {
        "step": 3,
        "arabic": "وَإِذَا وَعَدَ أَخْلَفَ،",
        "latin": "wa idzaa wa’ada akhlaf,",
        "translation": "apabila berjanji ia mengingkari,"
      },
      {
        "step": 4,
        "arabic": "وَإِذَا اؤْتُمِنَ خَانَ",
        "latin": "wa idza’tumina khaan",
        "translation": "dan apabila dipercaya ia berkhianat."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ .....، وَإِذَا اؤْتُمِنَ خَانَ",
      "missingWord": "أَخْلَفَ",
      "options": [
        "أَخْلَفَ",
        "وَفَى",
        "سَكَتَ",
        "غَضِبَ"
      ],
      "correctIndex": 0
    }
  },
  {
    "id": "hadits_36",
    "number": 36,
    "title": "Hadits 36 - Persaudaraan Sesama Muslim",
    "theme": "Ukhuwah & Keadilan",
    "gradeLevel": "kelas_6",
    "arabicFull": "الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ",
    "latinFull": "Al-muslimu akhul muslimi laa yazhlimuhuu wa laa yuslimuh.",
    "translationFull": "Seorang muslim adalah saudara bagi muslim lainnya, tidak menzaliminya dan tidak membiarkannya celaka.",
    "rawi": "HR. Bukhari & Muslim",
    "fawaid": [
      "Sesama muslim bersaudara, haram berbuat zalim dan menelantarkan saudaranya.",
      "Membela kebenaran dan menolong saudara yang kesusahan."
    ],
    "chunks": [
      {
        "step": 1,
        "arabic": "الْمُسْلِمُ أَخُو الْمُسْلِمِ",
        "latin": "Al-muslimu akhul muslim",
        "translation": "Seorang muslim itu saudara bagi muslim lainnya,"
      },
      {
        "step": 2,
        "arabic": "لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ",
        "latin": "laa yazhlimuhuu wa laa yuslimuh",
        "translation": "ia tidak menzaliminya dan tidak menyerahkannya kepada musuh."
      }
    ],
    "quizFillBlank": {
      "sentenceWithBlank": "الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا ..... وَلَا يُسْلِمُهُ",
      "missingWord": "يَظْلِمُهُ",
      "options": [
        "يَظْلِمُهُ",
        "يُحِبُّهُ",
        "يَنْصُرُهُ",
        "يُكْرِمُهُ"
      ],
      "correctIndex": 0
    }
  }
];

export function getDetailedHadith(haditsId: string): DetailedHadithPractice | undefined {
  return DETAILED_HADITH_LIST.find((h) => h.id === haditsId);
}
