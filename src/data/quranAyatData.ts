import { QuranAyah } from '../types';

export interface SurahDetailData {
  surahNumber: number;
  name: string;
  arabicName: string;
  totalAyah: number;
  revelationType: 'Makkiyyah' | 'Madaniyyah';
  translationName: string;
  bismillah: string;
  ayahs: QuranAyah[];
}

export const QURAN_JUZ_30_DATA: Record<string, SurahDetailData> = {
  surat_1: {
    surahNumber: 1,
    name: 'Al-Fatihah',
    arabicName: 'الفاتحة',
    totalAyah: 7,
    revelationType: 'Makkiyyah',
    translationName: 'Pembukaan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Bismillaahir-rahmaanir-rahiim',
        translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        latin: 'Alhamdulillaahi Rabbil ‘aalamiin',
        translation: 'Segala puji bagi Allah, Tuhan seluruh alam.'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        latin: 'Ar-rahmaanir-rahiim',
        translation: 'Yang Maha Pengasih lagi Maha Penyayang.'
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        latin: 'Maaliki yaumid-diin',
        translation: 'Pemilik hari pembalasan.'
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        latin: 'Iyyaaka na’budu wa iyyaaka nasta’iin',
        translation: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.'
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        latin: 'Ihdinash-shiraathal mustaqiim',
        translation: 'Tunjukilah kami jalan yang lurus.'
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        latin: 'Shiraathal-ladziina an’amta ‘alaihim ghairil maghdhuubi ‘alaihim waladh-dhaalliin',
        translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.'
      }
    ]
  },

  surat_78: {
    surahNumber: 78,
    name: "An-Naba'",
    arabicName: 'النبأ',
    totalAyah: 40,
    revelationType: 'Makkiyyah',
    translationName: 'Berita Besar',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'عَمَّ يَتَسَاءَلُونَ', latin: '‘Amma yatasaa-aluun', translation: 'Tentang apakah mereka saling bertanya-tanya?' },
      { number: 2, arabic: 'عَنِ النَّبَإِ الْعَظِيمِ', latin: '‘Anin-naba-il ‘azhiim', translation: 'Tentang berita yang besar (hari berbangkit),' },
      { number: 3, arabic: 'الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ', latin: 'Alladzii hum fiihi mukhtalifuun', translation: 'yang dalam hal itu mereka berselisih.' },
      { number: 4, arabic: 'كَلَّا سَيَعْلَمُونَ', latin: 'Kallaa saya’lamuun', translation: 'Sekali-kali tidak! Kelak mereka akan mengetahui,' },
      { number: 5, arabic: 'ثُمَّ كَلَّا سَيَعْلَمُونَ', latin: 'Tsumma kallaa saya’lamuun', translation: 'kemudian sekali-kali tidak! Kelak mereka akan mengetahui.' },
      { number: 6, arabic: 'أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا', latin: 'Alam naj’alil ardha mihaadaa', translation: 'Bukankah Kami telah menjadikan bumi sebagai hamparan,' },
      { number: 7, arabic: 'وَالْجِبَالَ أَوْتَادًا', latin: 'Wal jibaala autaadaa', translation: 'dan gunung-gunung sebagai pasak?' },
      { number: 8, arabic: 'وَخَلَقْنَاكُمْ أَزْوَاجًا', latin: 'Wa khalaqnaakum azwaajaa', translation: 'Dan Kami menciptakan kamu berpasang-pasangan,' },
      { number: 9, arabic: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا', latin: 'Wa ja’alnaa naumakum subaataa', translation: 'dan Kami menjadikan tidurmu untuk istirahat,' },
      { number: 10, arabic: 'وَجَعَلْنَا اللَّيْلَ لِبَاسًا', latin: 'Wa ja’alnal laila libaasaa', translation: 'dan Kami menjadikan malam sebagai pakaian,' },
      { number: 11, arabic: 'وَجَعَلْنَا النَّهَارَ مَعَاشًا', latin: 'Wa ja’alnan nahaara ma’aasyaa', translation: 'dan Kami menjadikan siang untuk mencari penghidupan,' },
      { number: 12, arabic: 'وَبَنَيْنَا فَوْقَكُمْ سَبْعًا شِدَادًا', latin: 'Wa banainaa fauqakum sab’an syidaadaa', translation: 'dan Kami membangun di atas kamu tujuh (langit) yang kokoh,' },
      { number: 13, arabic: 'وَجَعَلْنَا سِرَاجًا وَهَّاجًا', latin: 'Wa ja’alnaa siraajaw-wahhaajaa', translation: 'dan Kami menjadikan pelita yang terang benderang (matahari),' },
      { number: 14, arabic: 'وَأَنْزَلْنَا مِنَ الْمُعْصِرَاتِ مَاءً ثَجَّاجًا', latin: 'Wa anzalnaa minal mu’shiraati maa-an tsajjaajaa', translation: 'dan Kami turunkan dari awan air hujan yang tercurah dengan lebat,' },
      { number: 15, arabic: 'لِنُخْرِجَ بِهِ حَبًّا وَنَبَاتًا', latin: 'Linukhrija bihii habbaw-wanabaataa', translation: 'untuk Kami tumbuhkan dengan air itu biji-bijian dan tanam-tanaman,' },
      { number: 16, arabic: 'وَجَنَّاتٍ أَلْفَافًا', latin: 'Wa jannaatin alfaafaa', translation: 'dan kebun-kebun yang rindang.' },
      { number: 17, arabic: 'إِنَّ يَوْمَ الْفَصْلِ كَانَ مِيقَاتًا', latin: 'Inna yaumal fashli kaana miiqaataa', translation: 'Sungguh, hari keputusan adalah suatu waktu yang telah ditetapkan,' },
      { number: 18, arabic: 'يَوْمَ يُنْفَخُ فِي الصُّورِ فَتَأْتُونَ أَفْوَاجًا', latin: 'Yauma yunfakhu fish-shuuri fata’tuuna afwaajaa', translation: '(yaitu) pada hari (ketika) sangkakala ditiup, lalu kamu datang berbondong-bondong,' },
      { number: 19, arabic: 'وَفُتِحَتِ السَّمَاءُ فَكَانَتْ أَبْوَابًا', latin: 'Wa futihatis-samaa-u fakaanat abwaabaa', translation: 'dan langit pun dibukalah, maka terdapatlah beberapa pintu,' },
      { number: 20, arabic: 'وَسُيِّرَتِ الْجِبَالُ فَكَانَتْ سَرَابًا', latin: 'Wa suyyiratil jibaalu fakaanat saraabaa', translation: 'dan gunung-gunung pun dijalankan sehingga menjadi fatamorgana.' },
      { number: 21, arabic: 'إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًا', latin: 'Inna jahannama kaanat mirshaadaa', translation: 'Sungguh, (neraka) Jahannam itu (sebagai) tempat mengintai,' },
      { number: 22, arabic: 'لِلطَّاغِينَ مَآبًا', latin: 'Lith-thaaghiina ma-aabaa', translation: 'menjadi tempat kembali bagi orang-orang yang melampaui batas.' },
      { number: 23, arabic: 'لَابِثِينَ فِيهَا أَحْقَابًا', latin: 'Laabitsiina fiihaa ahqaabaa', translation: 'Mereka tinggal di sana berabad-abad lamanya.' },
      { number: 24, arabic: 'لَا يَذُوقُونَ فِيهَا بَرْدًا وَلَا شَرَابًا', latin: 'Laa yadzuuquuna fiihaa bardaw-walaa syaraabaa', translation: 'Mereka tidak merasakan kesejukan di dalamnya dan tidak (pula mendapat) minuman,' },
      { number: 25, arabic: 'إِلَّا حَمِيمًا وَغَسَّاقًا', latin: 'Illaa hamiimaw-wa ghassaaqaa', translation: 'selain air yang mendidih dan nanah,' },
      { number: 26, arabic: 'جَزَاءً وِفَاقًا', latin: 'Jazaa-aw-wifaaqaa', translation: 'sebagai pembalasan yang setimpal.' },
      { number: 27, arabic: 'إِنَّهُمْ كَانُوا لَا يَرْجُونَ حِسَابًا', latin: 'Innahum kaanuu laa yarjuuna hisaabaa', translation: 'Sesungguhnya mereka dahulu tidak pernah mengharapkan perhitungan.' },
      { number: 28, arabic: 'وَكَذَّبُوا بِآيَاتِنَا كِذَّابًا', latin: 'Wa kadzdzabuu bi-aayaatinaa kidzdzaabaa', translation: 'Dan mereka benar-benar mendustakan ayat-ayat Kami.' },
      { number: 29, arabic: 'وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ كِتَابًا', latin: 'Wa kulla syai-in ahshainaahu kitaabaa', translation: 'Dan segala sesuatu telah Kami catat dalam suatu Kitab.' },
      { number: 30, arabic: 'فَذُوقُوا فَلَنْ نَزِيدَكُمْ إِلَّا عَذَابًا', latin: 'Fadzuuquu falan naziidakum illaa ‘adzaabaa', translation: 'Maka rasakanlah! Maka Kami tidak akan menambah kepadamu selain azab.' },
      { number: 31, arabic: 'إِنَّ لِلْمُتَّقِينَ مَفَازًا', latin: 'Inna lil muttaqiina mafaazaa', translation: 'Sungguh, bagi orang-orang yang bertakwa mendapat kemenangan,' },
      { number: 32, arabic: 'حَدَائِقَ وَأَعْنَابًا', latin: 'Hadaa-iqa wa a’naabaa', translation: '(yaitu) kebun-kebun dan buah anggur,' },
      { number: 33, arabic: 'وَكَوَاعِبَ أَتْرَابًا', latin: 'Wa kawaa’iba atraabaa', translation: 'dan gadis-gadis sebaya,' },
      { number: 34, arabic: 'وَكَأْسًا دِهَاقًا', latin: 'Wa ka’san dihaaqaa', translation: 'dan gelas-gelas yang penuh (berisi minuman).' },
      { number: 35, arabic: 'لَا يَسْمَعُونَ فِيهَا لَغْوًا وَلَا كِذَّابًا', latin: 'Laa yasma’uuna fiihaa laghwaw-walaa kidzdzaabaa', translation: 'Di sana mereka tidak mendengar percakapan yang sia-sia maupun dusta.' },
      { number: 36, arabic: 'جَزَاءً مِنْ رَبِّكَ عَطَاءً حِسَابًا', latin: 'Jazaa-am-mir-Rabbika ‘athaa-an hisaabaa', translation: 'Sebagai balasan dan pemberian yang cukup dari Tuhanmu,' },
      { number: 37, arabic: 'رَبِّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الرَّحْمَٰنِ ۖ لَا يَمْلِكُونَ مِنْهُ خِطَابًا', latin: 'Rabbis-samaawaati wal ardhi wa maa bainahumar-Rahmaan, laa yamlikuuna minhu khithaabaa', translation: 'Tuhan (yang memelihara) langit dan bumi dan apa yang ada di antara keduanya; Yang Maha Pengasih; mereka tidak berhak berbicara dengan-Nya.' },
      { number: 38, arabic: 'يَوْمَ يَقُومُ الرُّوحُ وَالْمَلَائِكَةُ صَفًّا ۖ لَا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ الرَّحْمَٰنُ وَقَالَ صَوَابًا', latin: 'Yauma yaquumur-ruuhu wal malaa-ikatu shaffaa, laa yatakallamuuna illaa man adzina lahur-Rahmaanu wa qaala shawaabaa', translation: 'Pada hari ketika ruh dan para malaikat berdiri bershaf-shaf, mereka tidak berkata-kata, kecuali siapa yang telah diberi izin kepadanya oleh Tuhan Yang Maha Pengasih dan dia hanya mengatakan yang benar.' },
      { number: 39, arabic: 'ذَٰلِكَ الْيَوْمُ الْحَقُّ ۖ فَمَنْ شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ مَآبًا', latin: 'Dzaalikal yaumul haqqu faman syaa-at-takhadza ilaa Rabbihii ma-aabaa', translation: 'Itulah hari yang pasti terjadi. Maka barangsiapa menghendaki, niscaya dia menempuh jalan kembali kepada Tuhannya.' },
      { number: 40, arabic: 'إِنَّا أَنْذَرْنَاكُمْ عَذَابًا قَرِيبًا يَوْمَ يَنْظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ الْكَافِرُ يَا لَيْتَنِي كُنْتُ تُرَابًا', latin: 'Innaa andzarnaakum ‘adzaaban qariibaa, yauma yanzhurul mar-u maa qaddamat yadaahu wa yaquulul kaafiru yaa laitanii kuntu turaabaa', translation: 'Sesungguhnya Kami telah memperingatkan kepadamu (hai orang kafir) azab yang dekat, pada hari manusia melihat apa yang telah diperbuat oleh kedua tangannya; dan orang kafir berkata: “Alangkah baiknya sekiranya dahulu aku jadi tanah.”' }
    ]
  },

  surat_79: {
    surahNumber: 79,
    name: "An-Nazi'at",
    arabicName: 'النازعات',
    totalAyah: 46,
    revelationType: 'Makkiyyah',
    translationName: 'Malaikat yang Mencabut',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَالنَّازِعَاتِ غَرْقًا', latin: 'Wan-naazi’aati gharqaa', translation: 'Demi (malaikat-malaikat) yang mencabut (nyawa) dengan keras,' },
      { number: 2, arabic: 'وَالنَّاشِطَاتِ نَشْطًا', latin: 'Wan-naasyithaati nasythaa', translation: 'dan (malaikat-malaikat) yang mencabut (nyawa) dengan lemah-lembut,' },
      { number: 3, arabic: 'وَالسَّابِحَاتِ سَبْحًا', latin: 'Was-saabihaati sabhaa', translation: 'dan (malaikat-malaikat) yang turun dari langit dengan cepat,' },
      { number: 4, arabic: 'فَالسَّابِقَاتِ سَبْقًا', latin: 'Fas-saabiqaati sabqaa', translation: 'dan (malaikat-malaikat) yang mendahului dengan kencang,' },
      { number: 5, arabic: 'فَالْمُدَبِّرَاتِ أَمْرًا', latin: 'Fal mudabbiraati amraa', translation: 'dan (malaikat-malaikat) yang mengatur urusan (dunia).' },
      { number: 6, arabic: 'يَوْمَ تَرْجُفُ الرَّاجِفَةُ', latin: 'Yauma tarjufur-raajifah', translation: '(Sungguh, kamu akan dibangkitkan) pada hari ketika tiupan pertama mengguncangkan alam,' },
      { number: 7, arabic: 'تَتْبَعُهَا الرَّادِفَةُ', latin: 'Tatba’uhar-raadifah', translation: 'tiupan pertama itu diiringi oleh tiupan kedua.' },
      { number: 8, arabic: 'قُلُوبٌ يَوْمَئِذٍ وَاجِفَةٌ', latin: 'Quluubuy-yauma-idziw-waajifah', translation: 'Hati manusia pada hari itu sangat takut,' },
      { number: 9, arabic: 'أَبْصَارُهَا خَاشِعَةٌ', latin: 'Abshaaruhaa khaasyi’ah', translation: 'pandangannya tunduk.' },
      { number: 10, arabic: 'يَقُولُونَ أَإِنَّا لَمَرْدُودُونَ فِي الْحَافِرَةِ', latin: 'Yaquuluuna a-innaa lamarduuduuna fil haafirah', translation: '(Orang-orang kafir) berkata: “Apakah sesungguhnya kami benar-benar dikembalikan kepada kehidupan semula?' },
      { number: 11, arabic: 'أَإِذَا كُنَّا عِظَامًا نَخِرَةً', latin: 'A-idzaa kunnaa ‘izhaaman nakhirah', translation: 'Apakah (akan dibangkitkan juga) apabila kami telah menjadi tulang-belulang yang hancur?”' },
      { number: 12, arabic: 'قَالُوا تِلْكَ إِذًا كَرَّةٌ خَاسِرَةٌ', latin: 'Qaaluu tilka idzan karratun khaasirah', translation: 'Mereka berkata: “Kalau demikian, itu adalah suatu pengembalian yang merugikan.”' },
      { number: 13, arabic: 'فَإِنَّمَا هِيَ زَجْرَةٌ وَاحِدَةٌ', latin: 'Fa-innamaa hiya zajratuw-waahidah', translation: 'Maka pengembalian itu hanyalah dengan satu kali tiupan saja,' },
      { number: 14, arabic: 'فَإِذَا هُمْ بِالسَّاهِرَةِ', latin: 'Fa-idzaa hum bis-saahirah', translation: 'maka seketika itu mereka hidup kembali di bumi yang baru.' },
      { number: 15, arabic: 'هَلْ أَتَاكَ حَدِيثُ مُوسَىٰ', latin: 'Hal ataaka hadiitsu Muusaa', translation: 'Sudahkah sampai kepadamu kisah Musa?' },
      { number: 16, arabic: 'إِذْ نَادَاهُ رَبُّهُ بِالْوَادِ الْمُقَدَّسِ طُوًى', latin: 'Idz naadaahu Rabbuhu bil waadil muqaddasi thuwaa', translation: 'Ketika Tuhannya memanggilnya di lembah suci, yaitu Lembah Thuwa;' },
      { number: 17, arabic: 'اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ', latin: 'Idzhab ilaa Fir’auna innahuu thaghaa', translation: '“Pergilah engkau kepada Fir‘aun! Sesungguhnya dia telah melampaui batas,' },
      { number: 18, arabic: 'فَقُلْ هَلْ لَكَ إِلَىٰ أَنْ تَزَكَّىٰ', latin: 'Faqul hal laka ilaa an tazakkaa', translation: 'maka katakanlah (kepadanya): Adakah keinginan bagimu untuk membersihkan diri (dari kesesatan),' },
      { number: 19, arabic: 'وَأَهْدِيَكَ إِلَىٰ رَبِّكَ فَتَخْشَىٰ', latin: 'Wa ahdiyaka ilaa Rabbika fatakhsyaa', translation: 'dan engkau akan kupimpin ke jalan Tuhanmu agar engkau takut kepada-Nya?”' },
      { number: 20, arabic: 'فَأَرَاهُ الْآيَةَ الْكُبْرَىٰ', latin: 'Fa-araahul aayatal kubraa', translation: 'Lalu Musa memperlihatkan kepadanya mukjizat yang besar.' },
      { number: 21, arabic: 'فَكَذَّبَ وَعَصَىٰ', latin: 'Fakadzdzaba wa ‘ashaa', translation: 'Tetapi Fir‘aun mendustakan dan mendurhakai.' },
      { number: 22, arabic: 'ثُمَّ أَدْبَرَ يَسْعَىٰ', latin: 'Tsumma adbara yas’aa', translation: 'Kemudian dia berpaling seraya berusaha menantang (Musa).' },
      { number: 23, arabic: 'فَحَشَرَ فَنَادَىٰ', latin: 'Fahasjara fanaadaa', translation: 'Maka dia mengumpulkan (pembesar-pembesarnya) lalu berseru,' },
      { number: 24, arabic: 'فَقَالَ أَنَا رَبُّكُمُ الْأَعْلَىٰ', latin: 'Faqaala ana Rabbukumul a’laa', translation: 'seraya berkata: “Akulah tuhanmu yang paling tinggi.”' },
      { number: 25, arabic: 'فَأَخَذَهُ اللَّهُ نَكَالَ الْآخِرَةِ وَالْأُولَىٰ', latin: 'Fa-akhadzahullaahu nakaalal aakhirati wal uulaa', translation: 'Maka Allah mengazabnya dengan azab di akhirat dan azab di dunia.' },
      { number: 26, arabic: 'إِنَّ فِي ذَٰلِكَ لَعِبْرَةً لِمَنْ يَخْشَىٰ', latin: 'Inna fii dzaalika la’ibratal limay-yakhsyaa', translation: 'Sungguh, pada yang demikian itu terdapat pelajaran bagi orang yang takut (kepada Allah).' },
      { number: 27, arabic: 'أَأَنْتُمْ أَشَدُّ خَلْقًا أَمِ السَّمَاءُ ۚ بَنَاهَا', latin: 'A-antum asyaddu khalqan amis-samaa-u banaahaa', translation: 'Apakah penciptaan kamu yang lebih hebat ataukah langit yang telah dibangun-Nya?' },
      { number: 28, arabic: 'رَفَعَ سَمْكَهَا فَسَوَّاهَا', latin: 'Rafa’a samkahaa fasawwaahaa', translation: 'Dia telah meninggikan bangunannya lalu menyempurnakannya,' },
      { number: 29, arabic: 'وَأَغْطَشَ لَيْلَهَا وَأَخْرَجَ ضُحَاهَا', latin: 'Wa aghthasya lailahaa wa akhraja dhuhaahaa', translation: 'dan Dia menjadikan malamnya gelap gulita, dan menjadikan siangnya terang benderang.' },
      { number: 30, arabic: 'وَالْأَرْضَ بَعْدَ ذَٰلِكَ دَحَاهَا', latin: 'Wal ardha ba’da dzaalika dahaahaa', translation: 'Dan bumi setelah itu dihamparkan-Nya.' },
      { number: 31, arabic: 'أَخْرَجَ مِنْهَا مَاءَهَا وَمَرْعَاهَا', latin: 'Akhraja minhaa maa-ahaa wa mar’aahaa', translation: 'Darinya Dia memancarkan mata airnya, dan menumbuhkan tumbuh-tumbuhannya.' },
      { number: 32, arabic: 'وَالْجِبَالَ أَرْسَاهَا', latin: 'Wal jibaala arsaahaa', translation: 'Dan gunung-gunung dipancangkan-Nya dengan teguh;' },
      { number: 33, arabic: 'مَتَاعًا لَكُمْ وَلِأَنْعَامِكُمْ', latin: 'Mataa’al lakum wa li-an’aamikum', translation: '(semua itu) untuk kesenanganmu dan untuk hewan-hewan ternakmu.' },
      { number: 34, arabic: 'فَإِذَا جَاءَتِ الطَّامَّةُ الْكُبْرَىٰ', latin: 'Fa-idzaa jaa-atith-thaammatul kubraa', translation: 'Maka apabila malapetaka yang sangat besar (hari kiamat) telah datang,' },
      { number: 35, arabic: 'يَوْمَ يَتَذَكَّرُ الْإِنْسَانُ مَا سَعَىٰ', latin: 'Yauma yatadzakkarul insaanu maa sa’aa', translation: 'pada hari (ketika) manusia teringat akan apa yang telah dikerjakannya,' },
      { number: 36, arabic: 'وَبُرِّزَتِ الْجَحِيمُ لِمَنْ يَرَىٰ', latin: 'Wa burrizatil jahiimu limay-yaraa', translation: 'dan neraka diperlihatkan dengan jelas kepada setiap orang yang melihat.' },
      { number: 37, arabic: 'فَأَمَّا مَنْ طَغَىٰ', latin: 'Fa-ammaa man thaghaa', translation: 'Maka adapun orang yang melampaui batas,' },
      { number: 38, arabic: 'وَآثَرَ الْحَيَاةَ الدُّنْيَا', latin: 'Wa aatsaral hayaatad-dunyaa', translation: 'dan lebih mengutamakan kehidupan dunia,' },
      { number: 39, arabic: 'فَإِنَّ الْجَحِيمَ هِيَ الْمَأْوَىٰ', latin: 'Fa-innal jahiima hiyal ma’waa', translation: 'maka sungguh, nerakalah tempat tinggal(nya).' },
      { number: 40, arabic: 'وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ', latin: 'Wa ammaa man khaafa maqaama Rabbihii wa nahan-nafsa ‘anil hawaa', translation: 'Dan adapun orang yang takut kepada keagungan Tuhannya dan menahan diri dari (keinginan) hawa nafsunya,' },
      { number: 41, arabic: 'فَإِنَّ الْجَنَّةَ هِيَ الْمَأْوَىٰ', latin: 'Fa-innal jannata hiyal ma’waa', translation: 'maka sungguh, surgalah tempat tinggal(nya).' },
      { number: 42, arabic: 'يَسْأَلُونَكَ عَنِ السَّاعَةِ أَيَّانَ مُرْسَاهَا', latin: 'Yas-aluunaka ‘anis-saa’ati ayyaana mursaahaa', translation: 'Mereka (orang-orang kafir) bertanya kepadamu tentang hari kiamat: “Kapankah terjadinya?”' },
      { number: 43, arabic: 'فِيمَ أَنْتَ مِنْ ذِكْرَاهَا', latin: 'Fiima anta min dzikraahaa', translation: 'Untuk apa engkau perlu menyebutkannya (waktunya)?' },
      { number: 44, arabic: 'إِلَىٰ رَبِّكَ مُنْتَهَاهَا', latin: 'Ilaa Rabbika muntahaahaa', translation: 'Kepada Tuhanmulah (dikembalikan) kesudahannya (ketentuan waktunya).' },
      { number: 45, arabic: 'إِنَّمَا أَنْتَ مُنْذِرُ مَنْ يَخْشَاهَا', latin: 'Innamaa anta mundziru may-yakhsyaahaa', translation: 'Engkau (Muhammad) hanyalah pemberi peringatan bagi siapa yang takut kepadanya (hari kiamat).' },
      { number: 46, arabic: 'كَأَنَّهُمْ يَوْمَ يَرَوْنَهَا لَمْ يَلْبَثُوا إِلَّا عَشِيَّةً أَوْ ضُحَاهَا', latin: 'Ka-annahum yauma yaraunahaa lam yalbasCrashCourseuu illaa ‘asyiyyatan au dhuhaahaa', translation: 'Pada hari mereka melihat hari kiamat itu, (mereka merasa) seakan-akan hanya tinggal (di dunia) pada waktu sore atau pagi hari.' }
    ]
  },

  surat_80: {
    surahNumber: 80,
    name: "'Abasa",
    arabicName: 'عبس',
    totalAyah: 42,
    revelationType: 'Makkiyyah',
    translationName: 'Ia Bermuka Masam',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'عَبَسَ وَتَوَلَّىٰ', latin: '‘Abasa wa tawallaa', translation: 'Dia (Muhammad) bermuka masam dan berpaling,' },
      { number: 2, arabic: 'أَنْ جَاءَهُ الْأَعْمَىٰ', latin: 'An jaa-ahul a’maa', translation: 'karena telah datang seorang buta kepadanya (Abdullah bin Ummi Maktum).' },
      { number: 3, arabic: 'وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ', latin: 'Wa maa yudriika la’allahuu yazzakkaa', translation: 'Tahukah engkau barangkali ia ingin membersihkan dirinya (dari dosa),' },
      { number: 4, arabic: 'أَوْ يَذَّكَّرُ فَتَنْفَعَهُ الذِّكْرَىٰ', latin: 'Au yadzdzakkaru fatanfa’ahudz-dzikraa', translation: 'atau dia (ingin) mendapatkan pengajaran, lalu pengajaran itu memberi manfaat kepadanya?' },
      { number: 5, arabic: 'أَمَّا مَنِ اسْتَغْنَىٰ', latin: 'Ammaa manis-taghnaa', translation: 'Adapun orang yang merasa dirinya serba cukup,' },
      { number: 6, arabic: 'فَأَنْتَ لَهُ تَصَدَّىٰ', latin: 'Fa-anta lahuu tashaddaa', translation: 'maka engkau melayaninya,' },
      { number: 7, arabic: 'وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ', latin: 'Wa maa ‘alaika allaa yazzakkaa', translation: 'padahal tidak ada (celaan) atasmu kalau dia tidak membersihkan diri.' },
      { number: 8, arabic: 'وَأَمَّا مَنْ جَاءَكَ يَسْعَىٰ', latin: 'Wa ammaa man jaa-aka yas’aa', translation: 'Dan adapun orang yang datang kepadamu dengan bersegera (untuk mendapatkan pengajaran),' },
      { number: 9, arabic: 'وَهُوَ يَخْشَىٰ', latin: 'Wa huwa yakhsyaa', translation: 'sedang dia takut (kepada Allah),' },
      { number: 10, arabic: 'فَأَنْتَ عَنْهُ تَلَهَّىٰ', latin: 'Fa-anta ‘anhu talahhaa', translation: 'engkau malah mengabaikannya.' },
      { number: 11, arabic: 'كَلَّا إِنَّهَا تَذْكِرَةٌ', latin: 'Kallaa innahaa tadzkirah', translation: 'Sekali-kali jangan (begitu)! Sungguh, ajaran-ajaran itu suatu peringatan,' },
      { number: 12, arabic: 'فَمَنْ شَاءَ ذَكَرَهُ', latin: 'Faman syaa-a dzakarah', translation: 'maka barangsiapa menghendaki, tentulah dia memperhatikannya,' },
      { number: 13, arabic: 'فِي صُحُفٍ مُكَرَّمَةٍ', latin: 'Fii shuhufim-mukarramah', translation: 'di dalam lembaran-lembaran yang dimuliakan (Al-Qur’an),' },
      { number: 14, arabic: 'مَرْفُوعَةٍ مُطَهَّرَةٍ', latin: 'Marfuu’atim-muthahharah', translation: 'yang ditinggikan lagi disucikan,' },
      { number: 15, arabic: 'بِأَيْدِي سَفَرَةٍ', latin: 'Bi-aidii safarah', translation: 'di tangan para utusan (malaikat),' },
      { number: 16, arabic: 'كِرَامٍ بَرَرَةٍ', latin: 'Kiraamim-bararah', translation: 'yang mulia lagi berbakti.' },
      { number: 17, arabic: 'قُتِلَ الْإِنْسَانُ مَا أَكْفَرَهُ', latin: 'Qutilal insaanu maa akfarah', translation: 'Binasalah manusia; alangkah amat sangat kekafirannya!' },
      { number: 18, arabic: 'مِنْ أَيِّ شَيْءٍ خَلَقَهُ', latin: 'Min ayyi syai-in khalaqah', translation: 'Dari apakah Allah menciptakannya?' },
      { number: 19, arabic: 'مِنْ نُطْفَةٍ خَلَقَهُ فَقَدَّرَهُ', latin: 'Min nuthfatin khalaqahuu faqaddarah', translation: 'Dari setetes mani, Allah menciptakannya lalu menentukannya.' },
      { number: 20, arabic: 'ثُمَّ السَّبِيلَ يَسَّرَهُ', latin: 'Tsummas-sabiila yassarah', translation: 'Kemudian jalan (kehidupannya) dimudahkan-Nya,' },
      { number: 21, arabic: 'ثُمَّ أَمَاتَهُ فَأَقْبَرَهُ', latin: 'Tsumma amaatahuu fa-aqbarah', translation: 'kemudian Dia mematikannya lalu memasukkannya ke dalam kubur,' },
      { number: 22, arabic: 'ثُمَّ إِذَا شَاءَ أَنْشَرَهُ', latin: 'Tsumma idzaa syaa-a ansyarah', translation: 'kemudian jika Dia menghendaki, Dia membangkitkannya kembali.' },
      { number: 23, arabic: 'كَلَّا لَمَّا يَقْضِ مَا أَمَرَهُ', latin: 'Kallaa lammaa yaqdhi maa amarah', translation: 'Sekali-kali jangan; manusia itu belum melaksanakan apa yang diperintahkan Allah kepadanya.' },
      { number: 24, arabic: 'فَلْيَنْظُرِ الْإِنْسَانُ إِلَىٰ طَعَامِهِ', latin: 'Falyanzhuril insaanu ilaa tha’aamih', translation: 'Maka hendaklah manusia itu memperhatikan makanannya.' },
      { number: 25, arabic: 'أَنَّا صَبَبْنَا الْمَاءَ صَبًّا', latin: 'Annaa shababnal maa-a shabbaa', translation: 'Sesungguhnya Kami benar-benar telah mencurahkan air (dari langit),' },
      { number: 26, arabic: 'ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا', latin: 'Tsumma syaqaqnal ardha syaqqaa', translation: 'kemudian Kami belah bumi dengan sebaik-baiknya,' },
      { number: 27, arabic: 'فَأَنْبَتْنَا فِيهَا حَبًّا', latin: 'Fa-ambatnaa fiihaa habbaa', translation: 'lalu Kami tumbuhkan padanya biji-bijian,' },
      { number: 28, arabic: 'وَعِنَبًا وَقَضْبًا', latin: 'Wa ‘inabaw-wa qadhbaa', translation: 'dan anggur serta sayur-sayuran,' },
      { number: 29, arabic: 'وَزَيْتُونًا وَنَخْلًا', latin: 'Wa zaituunaw-wa nakhlaa', translation: 'dan zaitun serta pohon kurma,' },
      { number: 30, arabic: 'وَحَدَائِقَ غُلْبًا', latin: 'Wa hadaa-iqa ghulbaa', translation: 'dan kebun-kebun yang lebat,' },
      { number: 31, arabic: 'وَفَاكِهَةً وَأَبًّا', latin: 'Wa faakihatuw-wa abbaa', translation: 'serta buah-buahan dan rumput-rumputan,' },
      { number: 32, arabic: 'مَتَاعًا لَكُمْ وَلِأَنْعَامِكُمْ', latin: 'Mataa’al lakum wa li-an’aamikum', translation: '(semua itu) untuk kesenanganmu dan untuk hewan-hewan ternakmu.' },
      { number: 33, arabic: 'فَإِذَا جَاءَتِ الصَّاخَّةُ', latin: 'Fa-idzaa jaa-atish-shaakhkhah', translation: 'Dan apabila datang suara yang memekakkan (tiupan sangkakala),' },
      { number: 34, arabic: 'يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ', latin: 'Yauma yafirrul mar-u min akhiih', translation: 'pada hari ketika manusia lari dari saudaranya,' },
      { number: 35, arabic: 'وَأُمِّهِ وَأَبِيهِ', latin: 'Wa ummihii wa abiih', translation: 'dari ibu dan bapaknya,' },
      { number: 36, arabic: 'وَصَاحِبَتِهِ وَبَنِيهِ', latin: 'Wa shaahibatihii wa baniih', translation: 'dari istri dan anak-anaknya.' },
      { number: 37, arabic: 'لِكُلِّ امْرِئٍ مِنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ', latin: 'Likullimri-im-minhum yauma-idzin sya’nuy-yughniih', translation: 'Setiap orang dari mereka pada hari itu mempunyai urusan yang cukup menyibukkannya.' },
      { number: 38, arabic: 'وُجُوهٌ يَوْمَئِذٍ مُسْفِرَةٌ', latin: 'Wujuuhuy-yauma-idzim-musfirah', translation: 'Banyak muka pada hari itu berseri-seri,' },
      { number: 39, arabic: 'ضَاحِكَةٌ مُسْتَبْشِرَةٌ', latin: 'Dhaahikatum-mustabsyirah', translation: 'tertawa dan gembira ria,' },
      { number: 40, arabic: 'وَوُجُوهٌ يَوْمَئِذٍ عَلَيْهَا غَبَرَةٌ', latin: 'Wa wujuuhuy-yauma-idzin ‘alaihaa ghabarah', translation: 'dan banyak (pula) muka pada hari itu tertutup debu (suram),' },
      { number: 41, arabic: 'تَرْهَقُهَا قَتَرَةٌ', latin: 'Tarhaquhaa qatarah', translation: 'tertutup oleh kegelapan.' },
      { number: 42, arabic: 'أُولَٰئِكَ هُمُ الْكَفَرَةُ الْفَجَرَةُ', latin: 'Ulaa-ika humul kafaratu fa-jaratu', translation: 'Mereka itulah orang-orang kafir lagi durhaka.' }
    ]
  },

  surat_87: {
    surahNumber: 87,
    name: "Al-A'la",
    arabicName: 'الأعلى',
    totalAyah: 19,
    revelationType: 'Makkiyyah',
    translationName: 'Yang Maha Tinggi',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى', latin: 'Sabbi-hisma Rabbikal a’laa', translation: 'Sucikanlah nama Tuhanmu Yang Maha Tinggi,' },
      { number: 2, arabic: 'الَّذِي خَلَقَ فَسَوَّىٰ', latin: 'Alladzii khalaqa fasawwaa', translation: 'yang menciptakan lalu menyempurnakan (ciptaan-Nya),' },
      { number: 3, arabic: 'وَالَّذِي قَدَّرَ فَهَدَىٰ', latin: 'Walladzii qaddara fahadaa', translation: 'dan yang menentukan kadar (masing-masing) dan memberi petunjuk,' },
      { number: 4, arabic: 'وَالَّذِي أَخْرَجَ الْمَرْعَىٰ', latin: 'Walladzii akhrajal mar’aa', translation: 'dan yang menumbuhkan rumput-rumputan,' },
      { number: 5, arabic: 'فَجَعَلَهُ غُثَاءً أَحْوَىٰ', latin: 'Faja’alahuu ghutsaa-an ahwaa', translation: 'lalu dijadikan-Nya rumput-rumput itu kering kehitam-hitaman.' },
      { number: 6, arabic: 'سَنُقْرِئُكَ فَلَا تَنْسَىٰ', latin: 'Sanuqri-uka falaa tansaa', translation: 'Kami akan membacakan (Al-Qur’an) kepadamu (Muhammad) maka kamu tidak akan lupa,' },
      { number: 7, arabic: 'إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ', latin: 'Illaa maa syaa-Allaah, innahuu ya’lamul jahra wa maa yakhfaa', translation: 'kecuali kalau Allah menghendaki. Sungguh Dia mengetahui yang terang dan yang tersembunyi.' },
      { number: 8, arabic: 'وَنُيَسِّرُكَ لِلْيُسْرَىٰ', latin: 'Wa nuyassiruka lilyusraa', translation: 'Dan Kami akan memudahkan bagimu jalan kemudahan (dalam segala urusan),' },
      { number: 9, arabic: 'فَذَكِّرْ إِنْ نَفَعَتِ الذِّكْرَىٰ', latin: 'Fadzakkir in nafa’atidz-dzikraa', translation: 'oleh sebab itu berikanlah peringatan, karena peringatan itu bermanfaat.' },
      { number: 10, arabic: 'سَيَذَّكَّرُ مَنْ يَخْشَىٰ', latin: 'Sayadzdzakkaru may-yakhsyaa', translation: 'Orang yang takut (kepada Allah) akan mendapat pelajaran,' },
      { number: 11, arabic: 'وَيَتَجَنَّبُهَا الْأَشْقَى', latin: 'Wa yatajannabuhal asyqaa', translation: 'dan orang-orang yang celaka (kafir) akan menjauhinya.' },
      { number: 12, arabic: 'الَّذِي يَصْلَى النَّارَ الْكُبْرَىٰ', latin: 'Alladzii yashlan-naaral kubraa', translation: '(Yaitu) orang yang akan memasuki api yang besar (neraka).' },
      { number: 13, arabic: 'ثُمَّ لَا يَمُوتُ فِيهَا وَلَا يَحْيَىٰ', latin: 'Tsumma laa yamuutu fiihaa wa laa yahyaa', translation: 'Kemudian dia tidak akan mati di dalamnya dan tidak (pula) hidup.' },
      { number: 14, arabic: 'قَدْ أَفْلَحَ مَنْ تَزَكَّىٰ', latin: 'Qad aflaha man tazakkaa', translation: 'Sungguh beruntung orang yang menyucikan diri (dengan beriman),' },
      { number: 15, arabic: 'وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ', latin: 'Wa dzakarasma Rabbihii fashallaa', translation: 'dan mengingat nama Tuhannya, lalu dia shalat.' },
      { number: 16, arabic: 'بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا', latin: 'Bal tu’tsiruunal hayaatad-dunyaa', translation: 'Tetapi kamu (orang-orang kafir) memilih kehidupan duniawi,' },
      { number: 17, arabic: 'وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ', latin: 'Wal aakhiratu khairuw-wa abqaa', translation: 'sedang kehidupan akhirat adalah lebih baik dan lebih kekal.' },
      { number: 18, arabic: 'إِنَّ هَٰذَا لَفِي الصُّحُفِ الْأُولَىٰ', latin: 'Inna haadzaa lafish-shuhuful uulaa', translation: 'Sesungguhnya ini benar-benar tertera dalam kitab-kitab yang terdahulu,' },
      { number: 19, arabic: 'صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ', latin: 'Shuhufi Ibraahiima wa Muusaa', translation: '(yaitu) Kitab-kitab Ibrahim dan Musa.' }
    ]
  },

  surat_93: {
    surahNumber: 93,
    name: 'Adh-Dhuha',
    arabicName: 'الضحى',
    totalAyah: 11,
    revelationType: 'Makkiyyah',
    translationName: 'Waktu Dhuha',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَالضُّحَىٰ', latin: 'Wadh-dhuhaa', translation: 'Demi waktu dhuha (ketika matahari naik sepenggalah),' },
      { number: 2, arabic: 'وَاللَّيْلِ إِذَا سَجَىٰ', latin: 'Wal laili idzaa sajaa', translation: 'dan demi malam apabila telah sunyi,' },
      { number: 3, arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ', latin: 'Maa wadda’aka Rabbuka wa maa qalaa', translation: 'Tuhanmu tidak meninggalkan engkau (Muhammad) dan tidak (pula) membencimu,' },
      { number: 4, arabic: 'وَلَلْآخِرَةُ خَيْرٌ لَكَ مِنَ الْأُولَىٰ', latin: 'Wa lal-aakhiratu khairul laka minal uulaa', translation: 'dan sungguh, akhirat itu lebih baik bagimu daripada yang permulaan (dunia).' },
      { number: 5, arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', latin: 'Wa lasaufa yu’thiika Rabbuka fatardhaa', translation: 'Dan kelak Tuhanmu pasti memberikan karunia-Nya kepadamu, sehingga kamu menjadi puas.' },
      { number: 6, arabic: 'أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ', latin: 'Alam yajidka yatiiman fa-aawaa', translation: 'Bukankah Dia mendapatimu sebagai seorang yatim, lalu Dia melindungimu,' },
      { number: 7, arabic: 'وَوَجَدَكَ ضَالًّا فَهَدَىٰ', latin: 'Wa wajadaka dhaallan fahadaa', translation: 'dan Dia mendapatimu sebagai seorang yang bingung, lalu Dia memberikan petunjuk,' },
      { number: 8, arabic: 'وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ', latin: 'Wa wajadaka ‘aa-ilan fa-aghnaa', translation: 'dan Dia mendapatimu sebagai seorang yang berkekurangan, lalu Dia memberikan kecukupan?' },
      { number: 9, arabic: 'فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ', latin: 'Fa-ammal yatiima falaa taqhar', translation: 'Maka terhadap anak yatim janganlah engkau berlaku sewenang-wenang.' },
      { number: 10, arabic: 'وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ', latin: 'Wa ammas-saa-ila falaa tanhar', translation: 'Dan terhadap orang yang meminta-minta janganlah engkau menghardik(nya).' },
      { number: 11, arabic: 'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ', latin: 'Wa ammaa bini’mati Rabbika fahaddits', translation: 'Dan terhadap nikmat Tuhanmu hendaklah engkau nyatakan (dengan bersyukur).' }
    ]
  },

  surat_94: {
    surahNumber: 94,
    name: 'Asy-Syarh / Al-Insyirah',
    arabicName: 'الشرح',
    totalAyah: 8,
    revelationType: 'Makkiyyah',
    translationName: 'Kelapangan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ', latin: 'Alam nasyrah laka shadrak', translation: 'Bukankah Kami telah melapangkan dadamu (Muhammad)?' },
      { number: 2, arabic: 'وَوَضَعْنَا عَنْكَ وِزْرَكَ', latin: 'Wa wadha’naa ‘anka wizrak', translation: 'dan Kami telah menurunkan bebanmu darimu,' },
      { number: 3, arabic: 'الَّذِي أَنْقَضَ ظَهْرَكَ', latin: 'Alladzii anqadha zhahrak', translation: 'yang memberatkan punggungmu,' },
      { number: 4, arabic: 'وَرَفَعْنَا لَكَ ذِكْرَكَ', latin: 'Wa rafa’naa laka dzikrak', translation: 'dan Kami tinggikan sebutan (nama)mu bagimu.' },
      { number: 5, arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', latin: 'Fa-inna ma’al ‘usri yusraa', translation: 'Maka sesungguhnya beserta kesulitan ada kemudahan,' },
      { number: 6, arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', latin: 'Inna ma’al ‘usri yusraa', translation: 'sesungguhnya beserta kesulitan itu ada kemudahan.' },
      { number: 7, arabic: 'فَإِذَا فَرَغْتَ فَانْصَبْ', latin: 'Fa-idzaa faraghta fanshab', translation: 'Maka apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain),' },
      { number: 8, arabic: 'وَإِلَىٰ رَبِّكَ فَارْغَبْ', latin: 'Wa ilaa Rabbika farghab', translation: 'dan hanya kepada Tuhanmulah engkau berharap.' }
    ]
  },

  surat_95: {
    surahNumber: 95,
    name: 'At-Tin',
    arabicName: 'التين',
    totalAyah: 8,
    revelationType: 'Makkiyyah',
    translationName: 'Buah Tin',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَالتِّينِ وَالزَّيْتُونِ', latin: 'Wat-tiini waz-zaituun', translation: 'Demi (buah) Tin dan (buah) Zaitun,' },
      { number: 2, arabic: 'وَطُورِ سِينِينَ', latin: 'Wa thuuri siiniin', translation: 'demi Gunung Sinai,' },
      { number: 3, arabic: 'وَهَٰذَا الْبَلَدِ الْأَمِينِ', latin: 'Wa haadzal baladil amiin', translation: 'dan demi negeri yang aman ini (Mekah).' },
      { number: 4, arabic: 'لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ', latin: 'Laqad khalaqnal insaana fii ahsani taqwiim', translation: 'Sungguh, Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya,' },
      { number: 5, arabic: 'ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ', latin: 'Tsumma radadnaahu asfala saafiliin', translation: 'kemudian Kami kembalikan dia ke tempat yang serendah-rendahnya,' },
      { number: 6, arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ', latin: 'Illal-ladziina aamanuu wa ‘amilush-shaalihaati falahum ajrun ghairu mamnuun', translation: 'kecuali orang-orang yang beriman dan mengerjakan kebajikan; maka bagi mereka pahala yang tidak putus-putusnya.' },
      { number: 7, arabic: 'فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ', latin: 'Famaa yukadzdzibuka ba’du bid-diin', translation: 'Maka apa yang menyebabkan mereka mendustakanmu tentang hari pembalasan setelah itu?' },
      { number: 8, arabic: 'أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ', latin: 'Alaisallaahu bi-ahkamil haakimiin', translation: 'Bukankah Allah adalah Hakim yang paling adil?' }
    ]
  },

  surat_96: {
    surahNumber: 96,
    name: "Al-'Alaq",
    arabicName: 'العلق',
    totalAyah: 19,
    revelationType: 'Makkiyyah',
    translationName: 'Segumpal Darah',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', latin: 'Iqra’ bismi Rabbikal-ladzii khalaq', translation: 'Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan,' },
      { number: 2, arabic: 'خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ', latin: 'Khalaqal insaana min ‘alaq', translation: 'Dia telah menciptakan manusia dari segumpal darah.' },
      { number: 3, arabic: 'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ', latin: 'Iqra’ wa Rabbukal akram', translation: 'Bacalah, dan Tuhanmulah Yang Maha Mulia,' },
      { number: 4, arabic: 'الَّذِي عَلَّمَ بِالْقَلَمِ', latin: 'Alladzii ‘allama bil qalam', translation: 'Yang mengajar (manusia) dengan perantaraan pena,' },
      { number: 5, arabic: 'عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ', latin: '‘Allamal insaana maa lam ya’lam', translation: 'Dia mengajarkan manusia apa yang tidak diketahuinya.' },
      { number: 6, arabic: 'كَلَّا إِنَّ الْإِنْسَانَ لَيَطْغَىٰ', latin: 'Kallaa innal insaana layathghaa', translation: 'Sekali-kali tidak! Sungguh, manusia benar-benar melampaui batas,' },
      { number: 7, arabic: 'أَنْ رَآهُ اسْتَغْنَىٰ', latin: 'Ar-ra-aahus-taghnaa', translation: 'apabila melihat dirinya serba cukup.' },
      { number: 8, arabic: 'إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ', latin: 'Inna ilaa Rabbikar-ruj’aa', translation: 'Sungguh, hanya kepada Tuhanmulah tempat kembali(mu).' },
      { number: 9, arabic: 'أَرَأَيْتَ الَّذِي يَنْهَىٰ', latin: 'A-ra-aital-ladzii yanhaa', translation: 'Bagaimana pendapatmu tentang orang yang melarang,' },
      { number: 10, arabic: 'عَبْدًا إِذَا صَلَّىٰ', latin: '‘Abdan idzaa shallaa', translation: 'seorang hamba ketika dia melaksanakan shalat?' },
      { number: 11, arabic: 'أَرَأَيْتَ إِنْ كَانَ عَلَى الْهُدَىٰ', latin: 'A-ra-aita in kaana ‘alal hudaa', translation: 'Bagaimana pendapatmu jika dia (yang dilarang) berada di atas petunjuk,' },
      { number: 12, arabic: 'أَوْ أَمَرَ بِالتَّقْوَىٰ', latin: 'Au amara bit-taqwaa', translation: 'atau dia menyuruh bertakwa (kepada Allah)?' },
      { number: 13, arabic: 'أَرَأَيْتَ إِنْ كَذَّبَ وَتَوَلَّىٰ', latin: 'A-ra-aita in kadzdzaba wa tawallaa', translation: 'Bagaimana pendapatmu jika dia (yang melarang) mendustakan dan berpaling?' },
      { number: 14, arabic: 'أَلَمْ يَعْلَمْ بِأَنَّ اللَّهَ يَرَىٰ', latin: 'Alam ya’lam bi-annallaaha yaraa', translation: 'Tidakkah dia mengetahui bahwa sesungguhnya Allah melihat (segala perbuatannya)?' },
      { number: 15, arabic: 'كَلَّا لَئِنْ لَمْ يَنْتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ', latin: 'Kallaa la-il lam yantahi lanasfa’am bin-naashiyah', translation: 'Sekali-kali tidak! Sungguh, jika dia tidak berhenti (berbuat demikian) niscaya Kami tarik ubun-ubunnya (ke dalam neraka),' },
      { number: 16, arabic: 'نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ', latin: 'Naashiyatin kaadzibatin khaathi-ah', translation: '(yaitu) ubun-ubun orang yang mendustakan lagi durhaka.' },
      { number: 17, arabic: 'فَلْيَدْعُ نَادِيَهُ', latin: 'Falyad’u naadiyah', translation: 'Maka biarlah dia memanggil golongannya (untuk menolongnya),' },
      { number: 18, arabic: 'سَنَدْعُ الزَّبَانِيَةَ', latin: 'Sanad’uz-zabaaniyah', translation: 'Kelak Kami akan memanggil malaikat Zabaniyah (penyiksa).' },
      { number: 19, arabic: 'كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ ۩', latin: 'Kallaa laa tuthi’hu wasjud waqtarib', translation: 'Sekali-kali tidak! Janganlah engkau patuh kepadanya; dan sujudlah serta dekatkanlah (dirimu kepada Allah).' }
    ]
  },

  surat_97: {
    surahNumber: 97,
    name: 'Al-Qadr',
    arabicName: 'القدر',
    totalAyah: 5,
    revelationType: 'Makkiyyah',
    translationName: 'Kemuliaan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', latin: 'Innaa anzalnaahu fii lailatil qadr', translation: 'Sesungguhnya Kami telah menurunkannya (Al-Qur’an) pada malam kemuliaan.' },
      { number: 2, arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ', latin: 'Wa maa adraaka maa lailatul qadr', translation: 'Dan tahukah kamu apakah malam kemuliaan itu?' },
      { number: 3, arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ', latin: 'Lailatul qadri khairum-min alfi syahr', translation: 'Malam kemuliaan itu lebih baik daripada seribu bulan.' },
      { number: 4, arabic: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ', latin: 'Tanazzalul malaa-ikatu war-ruuhu fiihaa bi-idzni Rabbihim min kulli amr', translation: 'Pada malam itu turun para malaikat dan Ruh (Jibril) dengan izin Tuhannya untuk mengatur segala urusan.' },
      { number: 5, arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ', latin: 'Salaamun hiya hattaa mathla’il fajr', translation: 'Sejahteralah (malam itu) sampai terbit fajar.' }
    ]
  },

  surat_99: {
    surahNumber: 99,
    name: 'Az-Zalzalah',
    arabicName: 'الزلزلة',
    totalAyah: 8,
    revelationType: 'Madaniyyah',
    translationName: 'Goncangan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا', latin: 'Idzaa zulzilatil ardhu zilzaalahaa', translation: 'Apabila bumi diguncangkan dengan guncangan yang dahsyat,' },
      { number: 2, arabic: 'وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا', latin: 'Wa akhrajatil ardhu atsqaalahaa', translation: 'dan bumi telah mengeluarkan beban-beban berat (yang dikandung)nya,' },
      { number: 3, arabic: 'وَقَالَ الْإِنْسَانُ مَا لَهَا', latin: 'Wa qaalal insaanu maa lahaa', translation: 'dan manusia bertanya: “Apa yang terjadi padanya?”' },
      { number: 4, arabic: 'يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا', latin: 'Yauma-idzin tuhadditsu akhbaarahaa', translation: 'Pada hari itu bumi menyampaikan berita (tentang apa yang telah diperbuat manusia di atasnya),' },
      { number: 5, arabic: 'بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا', latin: 'Bi-anna Rabbaka auhaa lahaa', translation: 'karena sesungguhnya Tuhanmu telah memerintahkan (yang demikian itu) kepadanya.' },
      { number: 6, arabic: 'يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ', latin: 'Yauma-idziy-yashdurun-naasu ashtaatal liyuraw a’maalahum', translation: 'Pada hari itu manusia keluar dari kuburnya dalam keadaan berkelompok-kelompok, untuk diperlihatkan kepada mereka (balasan) semua perbuatannya.' },
      { number: 7, arabic: 'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ', latin: 'Famay-ya’mal mitsqaala dzarratin khairay-yarah', translation: 'Maka barangsiapa mengerjakan kebaikan seberat zarrah, niscaya dia akan melihat (balasan)nya.' },
      { number: 8, arabic: 'وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ', latin: 'Wa may-ya’mal mitsqaala dzarratin syarray-yarah', translation: 'Dan barangsiapa mengerjakan kejahatan seberat zarrah, niscaya dia akan melihat (balasan)nya pula.' }
    ]
  },

  surat_100: {
    surahNumber: 100,
    name: "Al-'Adiyat",
    arabicName: 'العاديات',
    totalAyah: 11,
    revelationType: 'Makkiyyah',
    translationName: 'Kuda Perang yang Berlari Kencang',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَالْعَادِيَاتِ ضَبْحًا', latin: 'Wal ‘aadiyaati dhabhaa', translation: 'Demi kuda perang yang berlari kencang terengah-engah,' },
      { number: 2, arabic: 'فَالْمُورِيَاتِ قَدْحًا', latin: 'Fal muuriyaati qadhaa', translation: 'dan kuda yang memercikkan bunga api (dengan pukulan kuku kakinya),' },
      { number: 3, arabic: 'فَالْمُغِيرَاتِ صُبْحًا', latin: 'Fal mughiiraati shubhaa', translation: 'dan kuda yang menyerang dengan tiba-tiba pada waktu pagi,' },
      { number: 4, arabic: 'فَأَثَرْنَ بِهِ نَقْعًا', latin: 'Fa-atsarna bihii naq’aa', translation: 'lalu menerbangkan debu,' },
      { number: 5, arabic: 'فَوَسَطْنَ بِهِ جَمْعًا', latin: 'Fawasathna bihii jam’aa', translation: 'lalu menyerbu ke tengah-tengah kumpulan musuh,' },
      { number: 6, arabic: 'إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ', latin: 'Innal insaana li-Rabbihii lakanuud', translation: 'sungguh, manusia itu sangat ingkar (tidak bersyukur) kepada Tuhannya,' },
      { number: 7, arabic: 'وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ', latin: 'Wa innahuu ‘alaa dzaalika lasyahiid', translation: 'dan sesungguhnya manusia itu menyaksikan (sendiri) keingkarannya,' },
      { number: 8, arabic: 'وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ', latin: 'Wa innahuu lihubbil khairi lasyadiid', translation: 'dan sesungguhnya cintanya kepada harta benar-benar berlebihan.' },
      { number: 9, arabic: 'أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ', latin: 'Afalaa ya’lamu idzaa bu’tsira maa fil qubuur', translation: 'Maka tidakkah dia mengetahui apabila apa yang di dalam kubur dikeluarkan,' },
      { number: 10, arabic: 'وَحُصِّلَ مَا فِي الصُّدُورِ', latin: 'Wa hush-shila maa fish-shuduur', translation: 'dan apa yang tersimpan di dalam dada dilahirkan (dan dinyatakan)?' },
      { number: 11, arabic: 'إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ', latin: 'Inna Rabbahum bihim yauma-idzil lakhabiir', translation: 'Sungguh, Tuhan mereka pada hari itu Maha Mengetahui keadaan mereka.' }
    ]
  },

  surat_101: {
    surahNumber: 101,
    name: "Al-Qari'ah",
    arabicName: 'القارعة',
    totalAyah: 11,
    revelationType: 'Makkiyyah',
    translationName: 'Hari Kiamat yang Mengguncang',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'الْقَارِعَةُ', latin: 'Al-qaari’ah', translation: 'Hari Kiamat,' },
      { number: 2, arabic: 'مَا الْقَارِعَةُ', latin: 'Mal qaari’ah', translation: 'apakah hari Kiamat itu?' },
      { number: 3, arabic: 'وَمَا أَدْرَاكَ مَا الْقَارِعَةُ', latin: 'Wa maa adraaka mal qaari’ah', translation: 'Dan tahukah kamu apakah hari Kiamat itu?' },
      { number: 4, arabic: 'يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ', latin: 'Yauma yakuunun-naasu kal faraasyil mabtsuuts', translation: 'Pada hari itu manusia seperti laron yang berterbangan,' },
      { number: 5, arabic: 'وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ', latin: 'Wa takuunul jibaalu kal ‘ihnil manfuusy', translation: 'dan gunung-gunung seperti bulu yang dihambur-hamburkan.' },
      { number: 6, arabic: 'فَأَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ', latin: 'Fa-ammaa man tsaqulat mawaaziinuh', translation: 'Maka adapun orang yang berat timbangan (kebaikan)nya,' },
      { number: 7, arabic: 'فَهُوَ فِي عِيشَةٍ رَاضِيَةٍ', latin: 'Fahuwa fii ‘iisyatir-raadhiyah', translation: 'maka dia berada dalam kehidupan yang memuaskan (senang).' },
      { number: 8, arabic: 'وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ', latin: 'Wa ammaa man khaffat mawaaziinuh', translation: 'Dan adapun orang yang ringan timbangan (kebaikan)nya,' },
      { number: 9, arabic: 'فَأُمُّهُ هَاوِيَةٌ', latin: 'Fa-ummuhuu haawiyah', translation: 'maka tempat kembalinya adalah neraka Hawiyah.' },
      { number: 10, arabic: 'وَمَا أَدْرَاكَ مَا هِيَهْ', latin: 'Wa maa adraaka maa hiyah', translation: 'Dan tahukah kamu apakah neraka Hawiyah itu?' },
      { number: 11, arabic: 'نَارٌ حَامِيَةٌ', latin: 'Naarun haamiyah', translation: '(Yaitu) api yang sangat panas.' }
    ]
  },

  surat_102: {
    surahNumber: 102,
    name: 'At-Takatsur',
    arabicName: 'التكاثر',
    totalAyah: 8,
    revelationType: 'Makkiyyah',
    translationName: 'Bermegah-megahan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'أَلْهَاكُمُ التَّكَاثُرُ', latin: 'Al-haakumut-takaatsur', translation: 'Bermegah-megahan telah melalaikan kamu,' },
      { number: 2, arabic: 'حَتَّىٰ زُرْتُمُ الْمَقَابِرَ', latin: 'Hattaa zurtumul maqaabir', translation: 'sampai kamu masuk ke dalam kubur.' },
      { number: 3, arabic: 'كَلَّا سَوْفَ تَعْلَمُونَ', latin: 'Kallaa saufa ta’lamuun', translation: 'Sekali-kali tidak! Kelak kamu akan mengetahui (akibat perbuatanmu itu),' },
      { number: 4, arabic: 'ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ', latin: 'Tsumma kallaa saufa ta’lamuun', translation: 'kemudian sekali-kali tidak! Kelak kamu akan mengetahui.' },
      { number: 5, arabic: 'كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ', latin: 'Kallaa lau ta’lamuuna ‘ilmal yaqiin', translation: 'Sekali-kali tidak! Sekiranya kamu mengetahui dengan pasti (niscaya kamu tidak akan bermegah-megahan),' },
      { number: 6, arabic: 'لَتَرَوُنَّ الْجَحِيمَ', latin: 'Latarawunnal jahiim', translation: 'pasti kamu benar-benar akan melihat neraka Jahim,' },
      { number: 7, arabic: 'ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ', latin: 'Tsumma latarawunnahaa ‘ainal yaqiin', translation: 'kemudian kamu benar-benar akan melihatnya dengan mata kepala sendiri,' },
      { number: 8, arabic: 'ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ', latin: 'Tsumma latus-alunna yauma-idzin ‘anin-na’iim', translation: 'kemudian kamu benar-benar akan ditanya pada hari itu tentang kenikmatan (yang megah di dunia itu).' }
    ]
  },

  surat_103: {
    surahNumber: 103,
    name: "Al-'Asr",
    arabicName: 'العصر',
    totalAyah: 3,
    revelationType: 'Makkiyyah',
    translationName: 'Masa / Waktu',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَالْعَصْرِ', latin: 'Wal ‘ashr', translation: 'Demi masa.' },
      { number: 2, arabic: 'إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ', latin: 'Innal insaana lafii khusr', translation: 'Sungguh, manusia berada dalam kerugian,' },
      { number: 3, arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', latin: 'Illal-ladziina aamanuu wa ‘amilush-shaalihaati wa tawaashau bil haqqi wa tawaashau bish-shabr', translation: 'kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.' }
    ]
  },

  surat_104: {
    surahNumber: 104,
    name: 'Al-Humazah',
    arabicName: 'الهمزة',
    totalAyah: 9,
    revelationType: 'Makkiyyah',
    translationName: 'Pengumpat',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ', latin: 'Wailul-likulli humazatil-lumazah', translation: 'Celakalah bagi setiap pengumpat lagi pencela,' },
      { number: 2, arabic: 'الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ', latin: 'Alladzii jama’a maalaw-wa ‘addadah', translation: 'yang mengumpulkan harta dan menghitung-hitungnya,' },
      { number: 3, arabic: 'يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ', latin: 'Yahsabu anna maalahuu akhladah', translation: 'dia mengira bahwa hartanya itu dapat mengekalkannya.' },
      { number: 4, arabic: 'كَلَّا ۖ لَيُنْبَذَنَّ فِي الْحُطَمَةِ', latin: 'Kallaa layumbadzanna fil huthamah', translation: 'Sekali-kali tidak! Sungguh, dia benar-benar akan dilemparkan ke dalam (neraka) Huthamah.' },
      { number: 5, arabic: 'وَمَا أَدْرَاكَ مَا الْحُطَمَةُ', latin: 'Wa maa adraaka mal huthamah', translation: 'Dan tahukah kamu apakah (neraka) Huthamah itu?' },
      { number: 6, arabic: 'نَارُ اللَّهِ الْمُوقَدَةُ', latin: 'Naarullaahil muuqadah', translation: '(Yaitu) api (azab) Allah yang dinyalakan,' },
      { number: 7, arabic: 'الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ', latin: 'Allatii tath-thali’u ‘alal af-idah', translation: 'yang (membakar) naik sampai ke hati.' },
      { number: 8, arabic: 'إِنَّهَا عَلَيْهِمْ مُؤْصَدَةٌ', latin: 'Innahaa ‘alaihim mu’shadah', translation: 'Sungguh, api itu ditutup rapat atas diri mereka,' },
      { number: 9, arabic: 'فِي عَمَدٍ مُمَدَّدَةٍ', latin: 'Fii ‘amadim-mumaddadah', translation: '(sedang mereka itu) diikat pada tiang-tiang yang panjang.' }
    ]
  },

  surat_105: {
    surahNumber: 105,
    name: 'Al-Fil',
    arabicName: 'الفيل',
    totalAyah: 5,
    revelationType: 'Makkiyyah',
    translationName: 'Gajah',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', latin: 'Alam tara kaifa fa’ala Rabbuka bi-ash-haabil fiil', translation: 'Tidakkah engkau (Muhammad) perhatikan bagaimana Tuhanmu telah bertindak terhadap pasukan bergajah?' },
      { number: 2, arabic: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ', latin: 'Alam yaj’al kaidahum fii tadhliil', translation: 'Bukankah Dia telah menjadikan tipu daya mereka (untuk menghancurkan Ka‘bah) itu sia-sia?' },
      { number: 3, arabic: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ', latin: 'Wa arsala ‘alaihim thairan abaabiil', translation: 'dan Dia mengirimkan kepada mereka burung yang berbondong-bondong,' },
      { number: 4, arabic: 'تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ', latin: 'Tarmiihim bihijaaratim-min sijjiil', translation: 'yang melempari mereka dengan batu (berasal) dari tanah yang terbakar,' },
      { number: 5, arabic: 'فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ', latin: 'Faja’alahum ka’ashfim-ma’kuul', translation: 'lalu Dia menjadikan mereka seperti daun-daun yang dimakan (ulat).' }
    ]
  },

  surat_106: {
    surahNumber: 106,
    name: 'Quraisy',
    arabicName: 'قريش',
    totalAyah: 4,
    revelationType: 'Makkiyyah',
    translationName: 'Suku Quraisy',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'لِإِيلَافِ قُرَيْشٍ', latin: 'Li-iilaafi Quraiys', translation: 'Karena kebiasaan orang-orang Quraisy,' },
      { number: 2, arabic: 'إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ', latin: 'Iilaafihim rihlatasy-syitaa-i wash-shaif', translation: '(yaitu) kebiasaan mereka bepergian pada musim dingin dan musim panas.' },
      { number: 3, arabic: 'فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ', latin: 'Falya’buduu Rabba haadzal bait', translation: 'Maka hendaklah mereka menyembah Tuhan (pemilik) rumah ini (Ka‘bah),' },
      { number: 4, arabic: 'الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ', latin: 'Alladzii ath’amahum min juu’iw-wa aamanahum min khauf', translation: 'yang telah memberi makanan kepada mereka untuk menghilangkan lapar dan mengamankan mereka dari rasa takut.' }
    ]
  },

  surat_107: {
    surahNumber: 107,
    name: "Al-Ma'un",
    arabicName: 'الماعون',
    totalAyah: 7,
    revelationType: 'Makkiyyah',
    translationName: 'Barang-barang yang Berguna',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ', latin: 'A-ra-aital-ladzii yukadzdzibu bid-diin', translation: 'Tahukah kamu (orang) yang mendustakan agama?' },
      { number: 2, arabic: 'فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ', latin: 'Fadzaalikal-ladzii yadu’‘ul yatiim', translation: 'Maka itulah orang yang menghardik anak yatim,' },
      { number: 3, arabic: 'وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ', latin: 'Wa laa yahudh-dhu ‘alaa tha’aamil miskiin', translation: 'dan tidak mendorong memberi makan orang miskin.' },
      { number: 4, arabic: 'فَوَيْلٌ لِلْمُصَلِّينَ', latin: 'Fawailul-lil mushalliin', translation: 'Maka celakalah orang-orang yang shalat,' },
      { number: 5, arabic: 'الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ', latin: 'Alladziina hum ‘an shalaatihim saahuun', translation: '(yaitu) orang-orang yang lalai terhadap shalatnya,' },
      { number: 6, arabic: 'الَّذِينَ هُمْ يُرَاءُونَ', latin: 'Alladziina hum yuraa-uun', translation: 'yang berbuat riya,' },
      { number: 7, arabic: 'وَيَمْنَعُونَ الْمَاعُونَ', latin: 'Wa yamna’uunal maa’uun', translation: 'dan enggan (memberikan) bantuan.' }
    ]
  },

  surat_108: {
    surahNumber: 108,
    name: 'Al-Kautsar',
    arabicName: 'الكوثر',
    totalAyah: 3,
    revelationType: 'Makkiyyah',
    translationName: 'Nikmat yang Berlimpah',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', latin: 'Innaa a’thainaakal kautsar', translation: 'Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.' },
      { number: 2, arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', latin: 'Fashalli li-Rabbika wanhar', translation: 'Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah.' },
      { number: 3, arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', latin: 'Inna syaani-aka huwal abtar', translation: 'Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah).' }
    ]
  },

  surat_109: {
    surahNumber: 109,
    name: 'Al-Kafirun',
    arabicName: 'الكافرون',
    totalAyah: 6,
    revelationType: 'Makkiyyah',
    translationName: 'Orang-orang Kafir',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ', latin: 'Qul yaa ayyuhal kaafiruun', translation: 'Katakanlah (Muhammad): “Wahai orang-orang kafir!' },
      { number: 2, arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ', latin: 'Laa a’budu maa ta’buduun', translation: 'Aku tidak akan menyembah apa yang kamu sembah.' },
      { number: 3, arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ', latin: 'Wa laa antum ‘aabiduuna maa a’bud', translation: 'Dan kamu bukan penyembah apa yang aku sembah.' },
      { number: 4, arabic: 'وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ', latin: 'Wa laa ana ‘aabidum-maa ‘abadtum', translation: 'Dan aku tidak pernah menjadi penyembah apa yang kamu sembah,' },
      { number: 5, arabic: 'وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ', latin: 'Wa laa antum ‘aabiduuna maa a’bud', translation: 'dan kamu tidak pernah (pula) menjadi penyembah apa yang aku sembah.' },
      { number: 6, arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ', latin: 'Lakum diinukum wa liya diin', translation: 'Untukmu agamamu, dan untukkulah agamaku.”' }
    ]
  },

  surat_110: {
    surahNumber: 110,
    name: 'An-Nasr',
    arabicName: 'النصر',
    totalAyah: 3,
    revelationType: 'Madaniyyah',
    translationName: 'Pertolongan',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', latin: 'Idzaa jaa-a nashrullaahi wal fath', translation: 'Apabila telah datang pertolongan Allah dan kemenangan,' },
      { number: 2, arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', latin: 'Wa ra-aitan-naasa yadkhuluuna fii diinillaahi afwaajaa', translation: 'dan engkau melihat manusia berbondong-bondong masuk agama Allah,' },
      { number: 3, arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا', latin: 'Fasabbih bihamdi Rabbika wastaghfirh, innahuu kaana tawwaabaa', translation: 'maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat.' }
    ]
  },

  surat_111: {
    surahNumber: 111,
    name: 'Al-Lahab / Al-Masad',
    arabicName: 'المسد',
    totalAyah: 5,
    revelationType: 'Makkiyyah',
    translationName: 'Gejolak Api / Sabut',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', latin: 'Tabbat yadaa abii lahabiw-watabb', translation: 'Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia!' },
      { number: 2, arabic: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ', latin: 'Maa aghnaa ‘anhu maaluhuu wa maa kasab', translation: 'Tidaklah berguna baginya hartanya dan apa yang dia usahakan.' },
      { number: 3, arabic: 'سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ', latin: 'Sayashlaa naaran dzaata lahab', translation: 'Kelak dia akan masuk ke dalam api yang bergejolak (neraka),' },
      { number: 4, arabic: 'وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ', latin: 'Wamra-atuhuu hammaalatal hathab', translation: 'dan (begitu pula) istrinya, pembawa kayu bakar (penyebar fitnah),' },
      { number: 5, arabic: 'فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ', latin: 'Fii jiidihaa hablum-mim-masad', translation: 'di lehernya ada tali dari sabut yang dipintal.' }
    ]
  },

  surat_112: {
    surahNumber: 112,
    name: 'Al-Ikhlas',
    arabicName: 'الإخلاص',
    totalAyah: 4,
    revelationType: 'Makkiyyah',
    translationName: 'Kemurnian Keesaan Allah',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', latin: 'Qul Huwallaahu Ahad', translation: 'Katakanlah (Muhammad): “Dialah Allah, Yang Maha Esa.' },
      { number: 2, arabic: 'اللَّهُ الصَّمَدُ', latin: 'Allaahush-Shamad', translation: 'Allah tempat meminta segala sesuatu.' },
      { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', latin: 'Lam yalid wa lam yuulad', translation: '(Allah) tidak beranak dan tidak pula diperanakkan,' },
      { number: 4, arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', latin: 'Wa lam yakul-lahuu kufuwan ahad', translation: 'dan tidak ada sesuatu yang setara dengan Dia.”' }
    ]
  },

  surat_113: {
    surahNumber: 113,
    name: 'Al-Falaq',
    arabicName: 'الفلق',
    totalAyah: 5,
    revelationType: 'Makkiyyah',
    translationName: 'Waktu Subuh',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', latin: 'Qul a’uudzu bi-Rabbil falaq', translation: 'Katakanlah: “Aku berlindung kepada Tuhan yang menguasai subuh (fajar),' },
      { number: 2, arabic: 'مِنْ شَرِّ مَا خَلَقَ', latin: 'Min syarri maa khalaq', translation: 'dari kejahatan (makhluk yang) Dia ciptakan,' },
      { number: 3, arabic: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', latin: 'Wa min syarri ghaasiqin idzaa waqab', translation: 'dan dari kejahatan malam apabila telah gelap gulita,' },
      { number: 4, arabic: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', latin: 'Wa min syarrin-naffaatsaati fil ‘uqad', translation: 'dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),' },
      { number: 5, arabic: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', latin: 'Wa min syarri haasidin idzaa hasad', translation: 'dan dari kejahatan orang yang dengki apabila dia dengki.”' }
    ]
  },

  surat_114: {
    surahNumber: 114,
    name: 'An-Nas',
    arabicName: 'الناس',
    totalAyah: 6,
    revelationType: 'Makkiyyah',
    translationName: 'Manusia',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ayahs: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', latin: 'Qul a’uudzu bi-Rabbin-naas', translation: 'Katakanlah: “Aku berlindung kepada Tuhannya manusia,' },
      { number: 2, arabic: 'مَلِكِ النَّاسِ', latin: 'Malikin-naas', translation: 'Raja manusia,' },
      { number: 3, arabic: 'إِلَٰهِ النَّاسِ', latin: 'Ilaahin-naas', translation: 'Sembahan manusia,' },
      { number: 4, arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', latin: 'Min syarril waswaasil khannaas', translation: 'dari kejahatan (bisikan) setan yang bersembunyi,' },
      { number: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', latin: 'Alladzii yuwaswisu fii shuduurin-naas', translation: 'yang membisikkan (kejahatan) ke dalam dada manusia,' },
      { number: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', latin: 'Minal jinnati wan-naas', translation: 'dari (golongan) jin dan manusia.”' }
    ]
  }
};

// Helper to get or generate fallback full ayahs for any surah
export function getSurahAyahs(itemId: string, surahNumber?: number, targetRange?: string): QuranAyah[] {
  if (QURAN_JUZ_30_DATA[itemId]) {
    return QURAN_JUZ_30_DATA[itemId].ayahs;
  }

  // Parse total ayat from target range like "40 Ayat" or "25 Ayat"
  let total = 7;
  if (targetRange) {
    const match = targetRange.match(/(\d+)\s*Ayat/i);
    if (match) {
      total = parseInt(match[1], 10);
    }
  }

  // Generate numbered list
  const list: QuranAyah[] = [];
  for (let i = 1; i <= total; i++) {
    list.push({
      number: i,
      arabic: `الآية ${i}`,
      latin: `Ayat ${i}`,
      translation: `Terjemahan ayat ke-${i}`
    });
  }
  return list;
}
