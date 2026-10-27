/**
 * Database Soal & Materi Edukasi Ceria TK-A (100% Aset Lokal - Instan & Tanpa Buffering)
 * - 4 Kategori Inti: Peta (30 Soal), Rumah & Suku (30 Soal), Membaca (30 Soal), Berhitung (30 Soal)
 * - Semua gambar tersimpan lokal di assets/ agar 0 detik pemuatan dan tidak pernah gagal muncul!
 */

const GAME_DATA = {
  // Koordinat pin pada gambar peta asli pengguna
  mapCoords: {
    sumatera: { pinX: 23.5, pinY: 42.0, name: "Pulau Sumatera", color: "#F25C24" },
    jawa: { pinX: 38.0, pinY: 67.0, name: "Pulau Jawa", color: "#00A859" },
    kalimantan: { pinX: 42.5, pinY: 38.0, name: "Pulau Kalimantan", color: "#0B5377" },
    sulawesi: { pinX: 57.0, pinY: 44.0, name: "Pulau Sulawesi", color: "#D81B60" },
    papua: { pinX: 78.5, pinY: 53.0, name: "Pulau Papua", color: "#00838F" }
  },

  // ==========================================
  // 1. GAME PETA & IKON KOTA INDONESIA (30 SOAL LOKAL)
  // ==========================================
  pulauHilang: [
    {
      id: "peta_1",
      title: "Tugu Monas (DKI Jakarta)",
      category: "Ikon Ibu Kota",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_1.jpg",
      landmarkEmoji: "🏛️",
      clue: "Monumen Nasional berlapis emas di puncaknya, berada di ibu kota Jakarta!",
      question: "Di pulau manakah Tugu Monas yang megah ini berada?",
      soundText: "Perhatikan foto Tugu Monas yang megah ini! Di pulau manakah Monas berada? Sentuh gambar pulaunya!",
      soundFact: "Pintar sekali! Tugu Monas berada di DKI Jakarta di Pulau Jawa yang berwarna hijau!",
      options: ["jawa", "sumatera", "kalimantan", "papua"]
    },
    {
      id: "peta_2",
      title: "Jam Gadang (Bukittinggi)",
      category: "Menara Jam Bersejarah",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_2.jpg",
      landmarkEmoji: "🕰️",
      clue: "Menara jam raksasa berusia ratusan tahun di kota Bukittinggi, Sumatera Barat!",
      question: "Di pulau manakah Jam Gadang yang terkenal ini berada?",
      soundText: "Lihat foto Jam Gadang yang sangat terkenal ini! Di pulau manakah Jam Gadang berada?",
      soundFact: "Hebat sekali! Jam Gadang berada di Sumatera Barat di Pulau Sumatera yang berwarna oranye!",
      options: ["sumatera", "jawa", "sulawesi", "kalimantan"]
    },
    {
      id: "peta_3",
      title: "Orangutan Hutan Tropis",
      category: "Fauna Dilindungi",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_3.jpg",
      landmarkEmoji: "🦧",
      clue: "Hewan pintar berbulu kemerahan yang hidup di hutan hujan tropis lebat!",
      question: "Di pulau manakah Orangutan yang lucu ini tinggal?",
      soundText: "Ada Orangutan yang sangat pintar dan lucu! Di pulau manakah habitat hutan lebat Orangutan?",
      soundFact: "Luar biasa! Orangutan hidup di hutan hujan lebat di Pulau Kalimantan yang berwarna biru tua!",
      options: ["kalimantan", "papua", "jawa", "sulawesi"]
    },
    {
      id: "peta_4",
      title: "Rumah Tongkonan (Tana Toraja)",
      category: "Rumah Adat Beratap Perahu",
      targetIsland: "sulawesi",
      targetIslandName: "Pulau Sulawesi",
      landmarkImg: "assets/landmarks/peta_4.jpg",
      landmarkEmoji: "🏠",
      clue: "Rumah adat beratap melengkung indah mirip perahu layar dengan ukiran tanduk kerbau!",
      question: "Di pulau manakah Rumah Tongkonan beratap perahu ini berada?",
      soundText: "Lihat foto Rumah Tongkonan beratap perahu ini! Di pulau manakah rumah adat ini berada?",
      soundFact: "Pintar! Rumah Tongkonan berada di Tana Toraja di Pulau Sulawesi yang berwarna merah muda!",
      options: ["sulawesi", "sumatera", "jawa", "kalimantan"]
    },
    {
      id: "peta_5",
      title: "Burung Cendrawasih Surga",
      category: "Fauna Cantik Langka",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_5.jpg",
      landmarkEmoji: "🦜",
      clue: "Burung surga berbulu emas dan merah yang sangat mempesona di hutan timur Indonesia!",
      question: "Di pulau manakah Burung Cendrawasih yang indah ini terbang?",
      soundText: "Burung Cendrawasih si burung surga yang sangat indah! Di pulau manakah tempat tinggalnya?",
      soundFact: "Hebat sekali! Burung Cendrawasih adalah fauna kebanggaan di Pulau Papua yang berwarna biru toska!",
      options: ["papua", "jawa", "kalimantan", "sumatera"]
    },
    {
      id: "peta_6",
      title: "Candi Borobudur (Magelang)",
      category: "Candi Buddha Terbesar",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_6.jpg",
      landmarkEmoji: "🛕",
      clue: "Candi batu megah berundak dengan stupa-stupa indah peninggalan zaman kerajaan kuno!",
      question: "Di pulau manakah Candi Borobudur yang tersohor di dunia ini berada?",
      soundText: "Candi Borobudur yang sangat megah dan bertingkat banyak! Di pulau manakah letaknya?",
      soundFact: "Pintar sekali! Candi Borobudur berada di Jawa Tengah di Pulau Jawa!",
      options: ["jawa", "sulawesi", "sumatera", "papua"]
    },
    {
      id: "peta_7",
      title: "Danau Toba & Pulau Samosir",
      category: "Danau Vulkanik Raksasa",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_7.jpg",
      landmarkEmoji: "🌊",
      clue: "Danau kawah vulkanik terbesar di Asia Tenggara dengan pulau Samosir di tengahnya!",
      question: "Di pulau manakah Danau Toba yang sangat indah dan luas ini berada?",
      soundText: "Danau Toba dengan pulau Samosir di tengah perairannya yang luas! Di pulau manakah Danau Toba berada?",
      soundFact: "Luar biasa! Danau Toba berada di Sumatera Utara di Pulau Sumatera!",
      options: ["sumatera", "kalimantan", "jawa", "sulawesi"]
    },
    {
      id: "peta_8",
      title: "Tugu Khatulistiwa (Pontianak)",
      category: "Ikon Garis Tengah Bumi",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_8.jpg",
      landmarkEmoji: "🌐",
      clue: "Monumen yang tepat berada di atas garis nol derajat yang membelah bumi utara dan selatan!",
      question: "Di pulau manakah Tugu Khatulistiwa di kota Pontianak ini berada?",
      soundText: "Tugu Khatulistiwa menandai garis tengah bumi di kota Pontianak! Di pulau manakah tugu ini berada?",
      soundFact: "Benar sekali! Kota Pontianak berada di Kalimantan Barat di Pulau Kalimantan!",
      options: ["kalimantan", "jawa", "sulawesi", "papua"]
    },
    {
      id: "peta_9",
      title: "Taman Laut Bunaken (Manado)",
      category: "Surga Terumbu Karang",
      targetIsland: "sulawesi",
      targetIslandName: "Pulau Sulawesi",
      landmarkImg: "assets/landmarks/peta_9.jpg",
      landmarkEmoji: "🤿",
      clue: "Kawasan laut bening dengan dinding karang raksasa dan aneka ikan badut nemo yang cantik!",
      question: "Di pulau manakah keindahan Taman Laut Bunaken Manado ini berada?",
      soundText: "Ikan-ikan cantik berenang di antara karang indah Bunaken di Manado! Di pulau manakah letaknya?",
      soundFact: "Hebat! Bunaken berada di Manado, Sulawesi Utara di Pulau Sulawesi!",
      options: ["sulawesi", "sumatera", "jawa", "kalimantan"]
    },
    {
      id: "peta_10",
      title: "Rumah Honai Pegunungan",
      category: "Rumah Adat Jerami",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_10.jpg",
      landmarkEmoji: "🛖",
      clue: "Rumah tradisional berbentuk jamur dengan atap tumpukan jerami tebal yang hangat!",
      question: "Di pulau manakah Rumah Honai beratap jerami ini berada?",
      soundText: "Rumah Honai yang bulat dan beratap jerami di daerah pegunungan sejuk! Di pulau manakah rumah ini berada?",
      soundFact: "Pintar sekali! Rumah Honai adalah rumah adat masyarakat di pegunungan Pulau Papua!",
      options: ["papua", "jawa", "kalimantan", "sumatera"]
    },
    {
      id: "peta_11",
      title: "Jembatan Ampera (Palembang)",
      category: "Jembatan Merah Megah",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_11.jpg",
      landmarkEmoji: "🌉",
      clue: "Jembatan merah gagah yang menghubungkan dua seberang Sungai Musi di Palembang!",
      question: "Di pulau manakah Jembatan Ampera di kota Palembang ini berada?",
      soundText: "Jembatan merah Ampera membentang di atas Sungai Musi! Di pulau manakah letaknya?",
      soundFact: "Hebat! Jembatan Ampera berada di kota Palembang di Pulau Sumatera!",
      options: ["sumatera", "jawa", "sulawesi", "kalimantan"]
    },
    {
      id: "peta_12",
      title: "Gunung Bromo Berasap (Jawa Timur)",
      category: "Gunung Berapi Cantik",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_12.jpg",
      landmarkEmoji: "🌋",
      clue: "Gunung berapi aktif berpadang pasir lautan luas yang selalu memancarkan keindahan matahari terbit!",
      question: "Di pulau manakah Gunung Bromo yang terkenal ini berada?",
      soundText: "Gunung Bromo dengan pemandangan matahari terbit yang sangat mempesona! Di pulau manakah Bromo berada?",
      soundFact: "Pintar sekali! Gunung Bromo berada di Jawa Timur di Pulau Jawa!",
      options: ["jawa", "papua", "sumatera", "kalimantan"]
    },
    {
      id: "peta_13",
      title: "Bekantan Si Hidung Panjang",
      category: "Monyet Endemik Hutan Rawa",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_13.jpg",
      landmarkEmoji: "🐒",
      clue: "Monyet lucu berhidung besar dan panjang yang pandai berenang di tepi hutan bakau!",
      question: "Di pulau manakah Bekantan berhidung panjang ini hidup?",
      soundText: "Monyet lucu Bekantan yang punya hidung panjang! Di pulau manakah Bekantan ini tinggal?",
      soundFact: "Luar biasa! Bekantan adalah fauna khas endemik yang hidup di Pulau Kalimantan!",
      options: ["kalimantan", "sumatera", "jawa", "sulawesi"]
    },
    {
      id: "peta_14",
      title: "Benteng Fort Rotterdam (Makassar)",
      category: "Benteng Bersejarah",
      targetIsland: "sulawesi",
      targetIslandName: "Pulau Sulawesi",
      landmarkImg: "assets/landmarks/peta_14.jpg",
      landmarkEmoji: "🏰",
      clue: "Benteng peninggalan Kerajaan Gowa di tepi pantai kota Makassar yang berbentuk seperti penyu!",
      question: "Di pulau manakah Benteng Rotterdam kota Makassar ini berada?",
      soundText: "Benteng bersejarah di pesisir pantai kota Makassar! Di pulau manakah letak benteng ini?",
      soundFact: "Benar sekali! Benteng Rotterdam berada di Makassar di Pulau Sulawesi!",
      options: ["sulawesi", "jawa", "sumatera", "papua"]
    },
    {
      id: "peta_15",
      title: "Danau Sentani (Jayapura)",
      category: "Danau Indah di Bawah Bukit",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_15.jpg",
      landmarkEmoji: "🏞️",
      clue: "Danau tenang berlatar belakang bukit-bukit hijau Teletubbies tempat lukisan kulit kayu khas dibuat!",
      question: "Di pulau manakah Danau Sentani yang permai ini berada?",
      soundText: "Danau Sentani yang indah dinaungi perbukitan hijau! Di pulau manakah Danau Sentani berada?",
      soundFact: "Pintar! Danau Sentani berada di dekat Jayapura di Pulau Papua!",
      options: ["papua", "sumatera", "jawa", "sulawesi"]
    },
    {
      id: "peta_16",
      title: "Gedung Sate (Bandung)",
      category: "Gedung Khas Bersejarah",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_16.jpg",
      landmarkEmoji: "🏢",
      clue: "Gedung putih anggun dengan hiasan tusuk sate di menara puncaknya di Kota Bandung!",
      question: "Di pulau manakah Gedung Sate di kota Bandung ini berada?",
      soundText: "Gedung bersejarah dengan tusuk sate di menara puncaknya di kota Bandung! Di pulau manakah letaknya?",
      soundFact: "Pintar sekali! Gedung Sate berada di kota Bandung, Jawa Barat di Pulau Jawa!",
      options: ["jawa", "sumatera", "kalimantan", "sulawesi"]
    },
    {
      id: "peta_17",
      title: "Harimau Sumatera",
      category: "Kucing Besar Indonesia",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_17.jpg",
      landmarkEmoji: "🐅",
      clue: "Kucing besar gagah bertubuh loreng oranye-hitam yang sangat lincah di hutan Sumatera!",
      question: "Di pulau manakah Harimau Sumatera yang gagah ini tinggal?",
      soundText: "Harimau gagah berbelang loreng ini hidup di pedalaman hutan! Di pulau manakah tempat tinggalnya?",
      soundFact: "Luar biasa! Harimau Sumatera adalah fauna endemik yang sangat dilindungi di Pulau Sumatera!",
      options: ["sumatera", "papua", "kalimantan", "jawa"]
    },
    {
      id: "peta_18",
      title: "Pasar Terapung Lok Baintan (Banjarmasin)",
      category: "Budaya Perahu Tradisional",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_18.jpg",
      landmarkEmoji: "🛶",
      clue: "Pasar unik di mana para pedagang mendayung perahu jukung di atas sungai!",
      question: "Di pulau manakah tradisi pasar terapung di atas sungai ini berada?",
      soundText: "Pedagang berjualan buah di atas perahu jukung di sungai! Di pulau manakah tradisi ini?",
      soundFact: "Hebat sekali! Pasar terapung berada di Banjarmasin di Pulau Kalimantan!",
      options: ["kalimantan", "sulawesi", "jawa", "sumatera"]
    },
    {
      id: "peta_19",
      title: "Pura Tanah Lot (Bali)",
      category: "Pura Karang di Laut",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa & Bali",
      landmarkImg: "assets/landmarks/peta_19.jpg",
      landmarkEmoji: "⛩️",
      clue: "Pura suci indah yang berdiri di atas bongkahan batu karang besar di tengah deburan ombak laut!",
      question: "Di wilayah kepulauan manakah Pura Tanah Lot di atas karang laut ini berada?",
      soundText: "Pura di atas bongkahan batu karang laut yang sangat terkenal! Di pulau manakah Tanah Lot berada?",
      soundFact: "Benar! Pura Tanah Lot berada di pulau Bali yang berdampingan di gugusan Pulau Jawa!",
      options: ["jawa", "sumatera", "kalimantan", "sulawesi"]
    },
    {
      id: "peta_20",
      title: "Puncak Jaya Salju Abadi",
      category: "Puncak Tertinggi Indonesia",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_20.jpg",
      landmarkEmoji: "🏔️",
      clue: "Gunung batu tertinggi di Indonesia yang puncaknya diselimuti gletser salju putih abadi!",
      question: "Di pulau manakah Puncak Jaya bersalju yang sangat tinggi ini berada?",
      soundText: "Puncak gunung tertinggi di tanah air yang diselimuti salju putih! Di pulau manakah letaknya?",
      soundFact: "Hebat sekali! Puncak Jaya berada di Pegunungan Sudirman di Pulau Papua!",
      options: ["papua", "kalimantan", "sumatera", "sulawesi"]
    },
    {
      id: "peta_21",
      title: "Candi Prambanan (Yogyakarta)",
      category: "Candi Hindu Terindah",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_21.jpg",
      landmarkEmoji: "🛕",
      clue: "Kompleks candi Hindu terindah di dekat Yogyakarta dengan menara batu yang menjulang tinggi!",
      question: "Di pulau manakah Candi Prambanan yang menawan ini berdiri?",
      soundText: "Candi Prambanan menjulang tinggi dengan ukiran kisah Ramayana! Di pulau manakah candi ini berada?",
      soundFact: "Pintar sekali! Candi Prambanan berada di perbatasan Yogyakarta dan Jawa Tengah di Pulau Jawa!",
      options: ["jawa", "sumatera", "sulawesi", "papua"]
    },
    {
      id: "peta_22",
      title: "Istana Maimun (Medan)",
      category: "Istana Kesultanan Megah",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_22.jpg",
      landmarkEmoji: "👑",
      clue: "Istana kuning emas megah peninggalan Kesultanan Deli di Kota Medan!",
      question: "Di pulau manakah Istana Maimun kota Medan ini berada?",
      soundText: "Istana megah berwarna kuning emas peninggalan Kesultanan Deli! Di pulau manakah letaknya?",
      soundFact: "Hebat! Istana Maimun berada di Kota Medan, Sumatera Utara di Pulau Sumatera!",
      options: ["sumatera", "jawa", "kalimantan", "sulawesi"]
    },
    {
      id: "peta_23",
      title: "Sungai Kapuas Terpanjang",
      category: "Sungai Terpanjang di Indonesia",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_23.jpg",
      landmarkEmoji: "🌊",
      clue: "Sungai terpanjang di Indonesia yang mengalir membelah hutan dan kota Pontianak!",
      question: "Di pulau manakah Sungai Kapuas yang sangat panjang ini mengalir?",
      soundText: "Sungai Kapuas adalah sungai paling panjang di tanah air! Di pulau manakah sungai ini berada?",
      soundFact: "Benar sekali! Sungai Kapuas mengalir sepanjang 1.143 kilometer di Pulau Kalimantan!",
      options: ["kalimantan", "sumatera", "jawa", "papua"]
    },
    {
      id: "peta_24",
      title: "Taman Nasional Wakatobi",
      category: "Kekayaan Bawah Laut",
      targetIsland: "sulawesi",
      targetIslandName: "Pulau Sulawesi",
      landmarkImg: "assets/landmarks/peta_24.jpg",
      landmarkEmoji: "🪸",
      clue: "Kawasan laut jernih dengan lumba-lumba lucu dan gugusan karang menakjubkan di Sulawesi Tenggara!",
      question: "Di perairan pulau manakah surga Wakatobi ini berada?",
      soundText: "Wakatobi terkenal dengan lumba-lumba dan karang laut yang sangat jernih! Di pulau manakah letaknya?",
      soundFact: "Pintar! Wakatobi berada di perairan Sulawesi Tenggara di Pulau Sulawesi!",
      options: ["sulawesi", "kalimantan", "jawa", "sumatera"]
    },
    {
      id: "peta_25",
      title: "Kepulauan Raja Ampat",
      category: "Gugusan Karang Zamrud",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_25.jpg",
      landmarkEmoji: "🏝️",
      clue: "Gugusan pulau karang zamrud di atas air laut biru toska yang sangat terkenal di dunia!",
      question: "Di kawasan kepulauan manakah Raja Ampat yang mendunia ini berada?",
      soundText: "Raja Ampat memiliki pulau-pulau karang hijau di laut biru jernih! Di pulau manakah letaknya?",
      soundFact: "Luar biasa! Raja Ampat berada di kawasan Papua Barat di Pulau Papua!",
      options: ["papua", "jawa", "sulawesi", "kalimantan"]
    },
    {
      id: "peta_26",
      title: "Badak Jawa Bercula Satu",
      category: "Hewan Langka Dilindungi",
      targetIsland: "jawa",
      targetIslandName: "Pulau Jawa",
      landmarkImg: "assets/landmarks/peta_26.jpg",
      landmarkEmoji: "🦏",
      clue: "Badak langka bertanduk satu yang hidup terlindungi di Taman Nasional Ujung Kulon, Banten!",
      question: "Di pulau manakah Badak bercula satu ini hidup terlindungi?",
      soundText: "Badak bercula satu hewan langka di Taman Nasional Ujung Kulon! Di pulau manakah tempat tinggalnya?",
      soundFact: "Pintar sekali! Badak Jawa bercula satu hidup di ujung barat Pulau Jawa!",
      options: ["jawa", "sumatera", "kalimantan", "papua"]
    },
    {
      id: "peta_27",
      title: "Gajah Sumatera di Way Kambas",
      category: "Satwa Besar Nusantara",
      targetIsland: "sumatera",
      targetIslandName: "Pulau Sumatera",
      landmarkImg: "assets/landmarks/peta_27.jpg",
      landmarkEmoji: "🐘",
      clue: "Pusat konservasi dan perlindungan gajah-gajah berbelalai panjang di Lampung!",
      question: "Di pulau manakah gajah Sumatera yang gagah ini dilindungi?",
      soundText: "Gajah berbelalai panjang di Taman Nasional Way Kambas! Di pulau manakah tempat tinggalnya?",
      soundFact: "Hebat! Gajah Sumatera hidup dan dilatih dengan baik di Taman Nasional Way Kambas di Pulau Sumatera!",
      options: ["sumatera", "jawa", "sulawesi", "kalimantan"]
    },
    {
      id: "peta_28",
      title: "Rumah Betang Panjang Dayak",
      category: "Rumah Adat Kebersamaan",
      targetIsland: "kalimantan",
      targetIslandName: "Pulau Kalimantan",
      landmarkImg: "assets/landmarks/peta_28.jpg",
      landmarkEmoji: "🪵",
      clue: "Rumah panggung kayu ulin sangat panjang tempat ratusan keluarga hidup rukun bersama!",
      question: "Di pulau manakah Rumah Betang panggung panjang ini berada?",
      soundText: "Rumah panggung yang sangat panjang tempat tinggal suku Dayak! Di pulau manakah rumah adat ini berada?",
      soundFact: "Pintar! Rumah Betang panjang adalah rumah adat suku Dayak di pedalaman Pulau Kalimantan!",
      options: ["kalimantan", "jawa", "papua", "sulawesi"]
    },
    {
      id: "peta_29",
      title: "Burung Maleo Berjambul Hitam",
      category: "Fauna Endemik Pasir Hangat",
      targetIsland: "sulawesi",
      targetIslandName: "Pulau Sulawesi",
      landmarkImg: "assets/landmarks/peta_29.jpg",
      landmarkEmoji: "🦃",
      clue: "Burung unik yang mengubur telurnya di pasir pantai hangat agar menetas sendiri!",
      question: "Di pulau manakah Burung Maleo yang bertelur di pasir hangat ini berada?",
      soundText: "Burung Maleo mengubur telurnya di pasir vulkanik hangat! Di pulau manakah burung ini hidup?",
      soundFact: "Hebat sekali! Burung Maleo adalah fauna khas endemik yang hanya ada di Pulau Sulawesi!",
      options: ["sulawesi", "sumatera", "kalimantan", "papua"]
    },
    {
      id: "peta_30",
      title: "Noken Tas Anyaman Tradisional",
      category: "Warisan Budaya Dunia",
      targetIsland: "papua",
      targetIslandName: "Pulau Papua",
      landmarkImg: "assets/landmarks/peta_30.jpg",
      landmarkEmoji: "👜",
      clue: "Tas anyaman serat kayu alami yang dikenakan di dahi oleh mama-mama di pegunungan timur!",
      question: "Di pulau manakah tas tradisional Noken yang unik ini dibuat?",
      soundText: "Tas Noken dirajut dari serat pohon alami dan disangkutkan di dahi kepala! Di pulau manakah asalnya?",
      soundFact: "Pintar sekali! Noken adalah tas rajut khas kebanggaan masyarakat di Pulau Papua!",
      options: ["papua", "jawa", "sumatera", "kalimantan"]
    }
  ],

  // ==========================================
  // 2. RUMAH ADAT & SUKU NUSANTARA (30 SOAL LOKAL INSTAN)
  // Semua gambar tersimpan lokal di assets/rumah_suku/ (0 ms loading, utuh, tanpa terpotong)
  // ==========================================
  rumahSukuAsli: [
    {
      id: "rs_1",
      namaRumah: "Rumah Gadang",
      namaSuku: "Suku Minangkabau",
      asalDaerah: "Sumatera Barat",
      fotoRumah: "assets/rumah_suku/rs_1_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_1_suku.jpg",
      deskripsi: "Rumah Gadang memiliki atap lancip menyerupai tanduk kerbau (gonjong). Suku Minang memakai busana adat Bundo Kanduang bermahkota emas megah.",
      soundQuestion: "Lihat foto asli Rumah Gadang ini. Manakah foto asli suku dan pakaian adat Minangkabau yang tinggal di rumah ini?"
    },
    {
      id: "rs_2",
      namaRumah: "Rumah Joglo",
      namaSuku: "Suku Jawa",
      asalDaerah: "Jawa Tengah & Yogyakarta",
      fotoRumah: "assets/rumah_suku/rs_2_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_2_suku.jpg",
      deskripsi: "Rumah Joglo memiliki atap bertingkat tajug limasan dengan tiang penyangga kayu jati. Suku Jawa memakai busana beskap dan kebaya anggun.",
      soundQuestion: "Lihat foto asli Rumah Joglo khas Jawa. Manakah foto asli suku Jawa dengan busana adat tradisionalnya?"
    },
    {
      id: "rs_3",
      namaRumah: "Rumah Tongkonan",
      namaSuku: "Suku Toraja",
      asalDaerah: "Sulawesi Selatan",
      fotoRumah: "assets/rumah_suku/rs_3_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_3_suku.jpg",
      deskripsi: "Rumah Tongkonan memiliki atap melengkung mirip perahu yang dihiasi deretan tanduk kerbau di tiang utamanya.",
      soundQuestion: "Lihat foto asli Rumah Tongkonan beratap perahu. Manakah foto asli pakaian adat suku dari Sulawesi Selatan ini?"
    },
    {
      id: "rs_4",
      namaRumah: "Rumah Honai",
      namaSuku: "Suku Papua",
      asalDaerah: "Papua Pegunungan",
      fotoRumah: "assets/rumah_suku/rs_4_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_4_suku.jpg",
      deskripsi: "Rumah Honai berbentuk bulat seperti jamur dengan atap tumpukan jerami ilalang kering yang hangat di daerah pegunungan dingin.",
      soundQuestion: "Lihat foto asli Rumah Honai beratap jerami. Manakah foto asli warga suku Papua dengan busana adat tradisionalnya?"
    },
    {
      id: "rs_5",
      namaRumah: "Gapura Candi Bentar (Pura Bali)",
      namaSuku: "Suku Bali",
      asalDaerah: "Pulau Bali",
      fotoRumah: "assets/rumah_suku/rs_5_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_5_suku.jpg",
      deskripsi: "Gapura Candi Bentar merupakan gerbang terbelah dengan ukiran bebatuan khas Bali. Pria Bali mengenakan penutup kepala Udeng putih dan bunga kamboja.",
      soundQuestion: "Lihat foto asli Candi Bentar dari Bali. Manakah foto asli busana adat pria suku Bali yang memakai udeng?"
    },
    {
      id: "rs_6",
      namaRumah: "Rumah Betang Radakng",
      namaSuku: "Suku Dayak",
      asalDaerah: "Kalimantan Barat",
      fotoRumah: "assets/rumah_suku/rs_6_rumah.jpg",
      fotoSuku: "assets/rumah_suku/rs_6_suku.jpg",
      deskripsi: "Rumah Betang Radakng adalah rumah panggung kayu ulin sangat panjang tempat tinggal suku Dayak dengan hiasan bulu enggang.",
      soundQuestion: "Lihat foto asli Rumah Betang Radakng di Kalimantan. Manakah foto asli busana adat suku Dayak bermahkota bulu burung enggang?"
    },
    {
      id: "rs_7",
      namaRumah: "Rumah Bolon Batak",
      namaSuku: "Suku Batak",
      asalDaerah: "Sumatera Utara",
      fotoRumah: "assets/rumah_suku/rs_7_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_7_suku.jpg",
      deskripsi: "Rumah Bolon memiliki atap melengkung tinggi dari kayu kokoh tanpa paku. Suku Batak mengenakan kain tenun Ulos berwibawa.",
      soundQuestion: "Lihat foto asli Rumah Bolon Batak. Manakah foto asli pakaian adat suku Batak dengan kain Ulos?"
    },
    {
      id: "rs_8",
      namaRumah: "Rumoh Aceh (Krong Bade)",
      namaSuku: "Suku Aceh",
      asalDaerah: "Serambi Mekkah, Aceh",
      fotoRumah: "assets/rumah_suku/rs_8_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_8_suku.svg",
      deskripsi: "Rumoh Aceh berbentuk rumah panggung dengan ukiran khas kayu berornamen islami yang anggun.",
      soundQuestion: "Lihat foto asli Rumoh Aceh. Manakah foto asli pakaian adat suku Aceh yang berwibawa?"
    },
    {
      id: "rs_9",
      namaRumah: "Rumah Kebaya Betawi",
      namaSuku: "Suku Betawi",
      asalDaerah: "DKI Jakarta",
      fotoRumah: "assets/rumah_suku/rs_9_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_9_suku.svg",
      deskripsi: "Rumah Kebaya memiliki teras depan luas dengan hiasan renda kayu di pinggir atap mirip lipatan kain kebaya.",
      soundQuestion: "Lihat foto asli Rumah Kebaya Betawi. Manakah foto asli pakaian adat suku Betawi dengan selendang cukin?"
    },
    {
      id: "rs_10",
      namaRumah: "Rumah Kasepuhan Sunda",
      namaSuku: "Suku Sunda",
      asalDaerah: "Jawa Barat & Banten",
      fotoRumah: "assets/rumah_suku/rs_10_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_10_suku.svg",
      deskripsi: "Rumah adat Jawa Barat yang anggun berarsitektur kayu jati dengan keramahan khas masyarakat tanah Pasundan.",
      soundQuestion: "Lihat foto asli rumah adat di Jawa Barat. Manakah foto asli busana adat anggun suku Sunda?"
    },
    {
      id: "rs_11",
      namaRumah: "Rumah Saoraja Bugis",
      namaSuku: "Suku Bugis",
      asalDaerah: "Sulawesi Selatan",
      fotoRumah: "assets/rumah_suku/rs_11_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_11_suku.jpg",
      deskripsi: "Rumah panggung megah kayu ulin para bangsawan suku Bugis yang dikenal sebagai pelaut tangguh Nusantara.",
      soundQuestion: "Lihat foto rumah adat Saoraja. Manakah foto asli busana adat suku Bugis dengan Baju Bodo?"
    },
    {
      id: "rs_12",
      namaRumah: "Rumah Bale Tani Sasak",
      namaSuku: "Suku Sasak",
      asalDaerah: "Lombok, NTB",
      fotoRumah: "assets/rumah_suku/rs_12_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_12_suku.svg",
      deskripsi: "Rumah adat suku Sasak di desa Sade berdinding anyaman bambu dan beratap alang-alang yang sejuk.",
      soundQuestion: "Lihat foto asli rumah adat suku Sasak di Lombok. Manakah foto asli busana adat masyarakat suku Sasak?"
    },
    {
      id: "rs_13",
      namaRumah: "Rumah Bubungan Tinggi",
      namaSuku: "Suku Banjar",
      asalDaerah: "Kalimantan Selatan",
      fotoRumah: "assets/rumah_suku/rs_13_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_13_suku.jpg",
      deskripsi: "Rumah panggung megah beratap curam menjulang tinggi khas suku Banjar di pesisir sungai Kalimantan Selatan.",
      soundQuestion: "Lihat foto asli Rumah Bubungan Tinggi. Manakah foto busana adat suku Banjar yang bermahkotakan melati?"
    },
    {
      id: "rs_14",
      namaRumah: "Rumah Mbaru Niang",
      namaSuku: "Suku Manggarai",
      asalDaerah: "Wae Rebo, Flores, NTT",
      fotoRumah: "assets/rumah_suku/rs_14_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_14_suku.svg",
      deskripsi: "Rumah adat kerucut bertingkat lima yang sangat langka di desa Wae Rebo di atas awan pegunungan Flores.",
      soundQuestion: "Lihat foto rumah adat kerucut Mbaru Niang di Wae Rebo. Manakah foto pakaian adat suku Manggarai?"
    },
    {
      id: "rs_15",
      namaRumah: "Rumah Nuwou Sesat",
      namaSuku: "Suku Lampung",
      asalDaerah: "Provinsi Lampung",
      fotoRumah: "assets/rumah_suku/rs_15_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_15_suku.svg",
      deskripsi: "Rumah panggung musyawarah adat Lampung dengan mahkota siger emas bertingkat sembilan yang sangat tersohor.",
      soundQuestion: "Lihat foto rumah Nuwou Sesat. Manakah foto pakaian adat Lampung dengan mahkota emas Siger?"
    },
    {
      id: "rs_16",
      namaRumah: "Rumah Walewangko",
      namaSuku: "Suku Minahasa",
      asalDaerah: "Sulawesi Utara",
      fotoRumah: "assets/rumah_suku/rs_16_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_16_suku.svg",
      deskripsi: "Rumah panggung kayu dengan dua tangga depan kembar yang kokoh dan tahan gempa.",
      soundQuestion: "Lihat foto Rumah Walewangko bertangga kembar. Manakah foto asli busana adat suku Minahasa?"
    },
    {
      id: "rs_17",
      namaRumah: "Rumah Limas",
      namaSuku: "Suku Palembang",
      asalDaerah: "Sumatera Selatan",
      fotoRumah: "assets/rumah_suku/rs_17_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_17_suku.svg",
      deskripsi: "Rumah kayu berlantai bertingkat (kekijing) yang pernah diabadikan pada pecahan uang kertas sepuluh ribu rupiah.",
      soundQuestion: "Lihat foto Rumah Limas bertingkat ini. Manakah foto busana adat Aesan Gede khas Palembang?"
    },
    {
      id: "rs_18",
      namaRumah: "Rumah Omo Sebua",
      namaSuku: "Suku Nias",
      asalDaerah: "Pulau Nias, Sumatera Utara",
      fotoRumah: "assets/rumah_suku/rs_18_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_18_suku.svg",
      deskripsi: "Rumah panggung raksasa bertiang kayu diagonal yang tahan gempa dan terkenal dengan tradisi lompat batu Fahombo.",
      soundQuestion: "Lihat foto Rumah Omo Sebua di Nias. Manakah foto asli busana adat ksatria suku Nias?"
    },
    {
      id: "rs_19",
      namaRumah: "Rumah Selaso Jatuh Kembar",
      namaSuku: "Suku Melayu Riau",
      asalDaerah: "Provinsi Riau",
      fotoRumah: "assets/rumah_suku/rs_19_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_19_suku.svg",
      deskripsi: "Balai adat Melayu bertangga tinggi dengan ukiran kayu lebah bergayut dan selembayung di ujung atapnya.",
      soundQuestion: "Lihat foto balai adat Selaso Jatuh Kembar. Manakah foto asli pakaian teluk belanga Melayu Riau?"
    },
    {
      id: "rs_20",
      namaRumah: "Rumah Lamin Dayak Kenyah",
      namaSuku: "Suku Dayak Kenyah",
      asalDaerah: "Kalimantan Timur",
      fotoRumah: "assets/rumah_suku/rs_20_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_20_suku.jpg",
      deskripsi: "Rumah panggung raksasa sepanjang 300 meter yang dihiasi ukiran naga dan totem kayu pelindung desa.",
      soundQuestion: "Lihat foto Rumah Lamin berukiran naga ini. Manakah foto asli busana adat suku Dayak?"
    },
    {
      id: "rs_21",
      namaRumah: "Rumah Dulohupa",
      namaSuku: "Suku Gorontalo",
      asalDaerah: "Provinsi Gorontalo",
      fotoRumah: "assets/rumah_suku/rs_21_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_21_suku.svg",
      deskripsi: "Rumah adat persidangan kerajaan Gorontalo beratap pelana dengan pilar-pilar kayu yang megah.",
      soundQuestion: "Lihat foto rumah adat Dulohupa. Manakah foto busana adat pengantin Biliu dari Gorontalo?"
    },
    {
      id: "rs_22",
      namaRumah: "Rumah Boyang",
      namaSuku: "Suku Mandar",
      asalDaerah: "Sulawesi Barat",
      fotoRumah: "assets/rumah_suku/rs_22_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_22_suku.svg",
      deskripsi: "Rumah panggung khas masyarakat Mandar yang terkenal dengan perahu sandeq layar tercepat di dunia.",
      soundQuestion: "Lihat foto Rumah Boyang Mandar. Manakah foto asli pakaian adat tenun sutra Mandar?"
    },
    {
      id: "rs_23",
      namaRumah: "Rumah Sulah Nyanda",
      namaSuku: "Suku Baduy",
      asalDaerah: "Pegunungan Kendeng, Banten",
      fotoRumah: "assets/rumah_suku/rs_23_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_23_suku.svg",
      deskripsi: "Rumah panggung bambu alami yang dibangun selaras dengan alam pegunungan tanpa merusak kontur tanah.",
      soundQuestion: "Lihat foto rumah Sulah Nyanda di tanah Baduy. Manakah foto asli busana tenun sederhana suku Baduy?"
    },
    {
      id: "rs_24",
      namaRumah: "Rumah Uma Lengge",
      namaSuku: "Suku Bima",
      asalDaerah: "Kabupaten Bima, NTB",
      fotoRumah: "assets/rumah_suku/rs_24_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_24_suku.svg",
      deskripsi: "Bangunan lumbung padi dan tempat tinggal tradisional berbentuk kerucut tirus dari kayu dan jerami.",
      soundQuestion: "Lihat foto Uma Lengge berbentuk kerucut unik ini. Manakah foto busana adat Rimpu suku Bima?"
    },
    {
      id: "rs_25",
      namaRumah: "Rumah Rakit",
      namaSuku: "Suku Bangka",
      asalDaerah: "Kepulauan Bangka Belitung",
      fotoRumah: "assets/rumah_suku/rs_25_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_25_suku.svg",
      deskripsi: "Rumah terapung di atas balok bambu besar di tepi sungai dan pesisir laut Bangka Belitung.",
      soundQuestion: "Lihat foto Rumah Rakit terapung. Manakah foto pakaian adat Paksian bermahkota kembang goyang?"
    },
    {
      id: "rs_26",
      namaRumah: "Rumah Tanean Lanjhan",
      namaSuku: "Suku Madura",
      asalDaerah: "Pulau Madura, Jawa Timur",
      fotoRumah: "assets/rumah_suku/rs_26_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_26_suku.svg",
      deskripsi: "Deretan rumah keluarga yang memanjang menghadap satu halaman bersama lambang kerukunan persaudaraan.",
      soundQuestion: "Lihat foto tatanan rumah Tanean Lanjhan. Manakah foto baju garis merah-putih Pesa'an khas Madura?"
    },
    {
      id: "rs_27",
      namaRumah: "Rumah Panggung Asmat",
      namaSuku: "Suku Asmat",
      asalDaerah: "Pesisir Papua Selatan",
      fotoRumah: "assets/rumah_suku/rs_27_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_27_suku.svg",
      deskripsi: "Rumah Jew bertiang kayu bakau tinggi tempat para pemahat kayu Asmat berkumpul menciptakan ukiran magis.",
      soundQuestion: "Lihat foto rumah Jew suku Asmat di pesisir rawa. Manakah foto asli para pemahat ksatria Asmat?"
    },
    {
      id: "rs_28",
      namaRumah: "Rumah Bale Gede",
      namaSuku: "Suku Bali",
      asalDaerah: "Kabupaten Karangasem, Bali",
      fotoRumah: "assets/rumah_suku/rs_28_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_28_suku.svg",
      deskripsi: "Paviliun bertiang dua belas tempat upacara adat keluarga Bali dengan ukiran prada warna keemasan.",
      soundQuestion: "Lihat foto Bale Gede dengan tiang ukir Bali. Manakah foto penari tradisional Bali berbusana legong?"
    },
    {
      id: "rs_29",
      namaRumah: "Rumah Panggung Sentani",
      namaSuku: "Suku Sentani",
      asalDaerah: "Danau Sentani, Papua",
      fotoRumah: "assets/rumah_suku/rs_29_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_29_suku.svg",
      deskripsi: "Rumah panggung kayu di atas air jernih danau yang dinaungi pemandangan bukit-bukit hijau.",
      soundQuestion: "Lihat foto rumah panggung di atas air Danau Sentani. Manakah foto busana adat masyarakat suku Sentani?"
    },
    {
      id: "rs_30",
      namaRumah: "Rumah Tambi",
      namaSuku: "Suku Lore",
      asalDaerah: "Sulawesi Tengah",
      fotoRumah: "assets/rumah_suku/rs_30_rumah.svg",
      fotoSuku: "assets/rumah_suku/rs_30_suku.svg",
      deskripsi: "Rumah panggung berbentuk prisma segitiga yang atap ijuknya menjulur hampir menyentuh tanah.",
      soundQuestion: "Lihat foto Rumah Tambi berbentuk segitiga unik ini. Manakah foto pakaian adat tradisional suku di Sulawesi Tengah?"
    }
  ],

  // ==========================================
  // 3. GAME MELATIH MEMBACA (30 SOAL LENGKAP)
  // Suku kata berpola Konsonan-Vokal (K-V-K-V), gambar cerah & fonik
  // ==========================================
  membaca: [
    { id: "baca_1", word: "BOLA", parts: ["BO", "LA"], missingIndex: 1, targetSyllable: "LA", options: ["LA", "LI", "MA", "KU"], emoji: "⚽", soundPrompt: "Ayo lengkapi kata BOLA! B-O... BO! Ditambah apa agar jadi BOLA?", phonics: "B-O = BO, L-A = LA, BOLA!" },
    { id: "baca_2", word: "BUKU", parts: ["BU", "KU"], missingIndex: 1, targetSyllable: "KU", options: ["KU", "KA", "BA", "SI"], emoji: "📖", soundPrompt: "B-U... BU! Ditambah suku kata apa agar jadi kata BUKU?", phonics: "B-U = BU, K-U = KU, BUKU!" },
    { id: "baca_3", word: "MATA", parts: ["MA", "TA"], missingIndex: 0, targetSyllable: "MA", options: ["MA", "MI", "BA", "PA"], emoji: "👁️", soundPrompt: "Ada gambar MATA! Titik-titik ditambah T-A = TA. Awalan katanya apa ya?", phonics: "M-A = MA, T-A = TA, MATA!" },
    { id: "baca_4", word: "SAPI", parts: ["SA", "PI"], missingIndex: 1, targetSyllable: "PI", options: ["PI", "PO", "SI", "DA"], emoji: "🐮", soundPrompt: "Hewan sapi yang lucu! S-A... SA! Ditambah apa agar jadi SAPI?", phonics: "S-A = SA, P-I = PI, SAPI!" },
    { id: "baca_5", word: "TOPI", parts: ["TO", "PI"], missingIndex: 0, targetSyllable: "TO", options: ["TO", "TI", "BO", "KO"], emoji: "🧢", soundPrompt: "Lengkapi kata TOPI! Titik-titik ditambah P-I = PI. Manakah suku kata TO?", phonics: "T-O = TO, P-I = PI, TOPI!" },
    { id: "baca_6", word: "ROTI", parts: ["RO", "TI"], missingIndex: 1, targetSyllable: "TI", options: ["TI", "TA", "LU", "RI"], emoji: "🍞", soundPrompt: "Roti manis lezat! R-O... RO! Ditambah suku kata apa agar jadi ROTI?", phonics: "R-O = RO, T-I = TI, ROTI!" },
    { id: "baca_7", word: "KUDA", parts: ["KU", "DA"], missingIndex: 1, targetSyllable: "DA", options: ["DA", "DI", "MA", "SA"], emoji: "🐴", soundPrompt: "Hewan lari kencang! K-U... KU! Ditambah apa agar jadi KUDA?", phonics: "K-U = KU, D-A = DA, KUDA!" },
    { id: "baca_8", word: "BAJU", parts: ["BA", "JU"], missingIndex: 1, targetSyllable: "JU", options: ["JU", "JA", "LU", "BU"], emoji: "👕", soundPrompt: "Pakaian rapi! B-A... BA! Ditambah suku kata apa agar jadi BAJU?", phonics: "B-A = BA, J-U = JU, BAJU!" },
    { id: "baca_9", word: "KAKI", parts: ["KA", "KI"], missingIndex: 1, targetSyllable: "KI", options: ["KI", "KU", "MA", "TA"], emoji: "🦶", soundPrompt: "K-A... KA! Ditambah apa agar jadi KAKI untuk berjalan?", phonics: "K-A = KA, K-I = KI, KAKI!" },
    { id: "baca_10", word: "GIGI", parts: ["GI", "GI"], missingIndex: 1, targetSyllable: "GI", options: ["GI", "GA", "DI", "PI"], emoji: "🦷", soundPrompt: "Gigi putih bersih! G-I... GI! Ditambah apa agar jadi GIGI?", phonics: "G-I = GI, G-I = GI, GIGI!" },
    { id: "baca_11", word: "TALI", parts: ["TA", "LI"], missingIndex: 1, targetSyllable: "LI", options: ["LI", "LA", "LU", "MA"], emoji: "🪢", soundPrompt: "T-A... TA! Ditambah suku kata apa agar terbaca TALI?", phonics: "T-A = TA, L-I = LI, TALI!" },
    { id: "baca_12", word: "PITA", parts: ["PI", "TA"], missingIndex: 1, targetSyllable: "TA", options: ["TA", "TI", "KA", "LA"], emoji: "🎀", soundPrompt: "Pita rambut merah manis! P-I... PI! Ditambah apa agar jadi PITA?", phonics: "P-I = PI, T-A = TA, PITA!" },
    { id: "baca_13", word: "PADI", parts: ["PA", "DI"], missingIndex: 1, targetSyllable: "DI", options: ["DI", "DA", "MI", "KU"], emoji: "🌾", soundPrompt: "Padi kuning di sawah! P-A... PA! Ditambah apa agar jadi PADI?", phonics: "P-A = PA, D-I = DI, PADI!" },
    { id: "baca_14", word: "MADU", parts: ["MA", "DU"], missingIndex: 1, targetSyllable: "DU", options: ["DU", "DA", "LU", "SU"], emoji: "🍯", soundPrompt: "Madu manis lebah! M-A... MA! Ditambah suku kata apa agar jadi MADU?", phonics: "M-A = MA, D-U = DU, MADU!" },
    { id: "baca_15", word: "KACA", parts: ["KA", "CA"], missingIndex: 1, targetSyllable: "CA", options: ["CA", "CI", "LA", "MA"], emoji: "🪞", soundPrompt: "Kaca cermin bening! K-A... KA! Ditambah apa agar jadi KACA?", phonics: "K-A = KA, C-A = CA, KACA!" },
    { id: "baca_16", word: "DADU", parts: ["DA", "DU"], missingIndex: 1, targetSyllable: "DU", options: ["DU", "DI", "LA", "KU"], emoji: "🎲", soundPrompt: "Dadu permainan angka! D-A... DA! Ditambah apa agar jadi DADU?", phonics: "D-A = DA, D-U = DU, DADU!" },
    { id: "baca_17", word: "CABI", parts: ["CA", "BI"], missingIndex: 1, targetSyllable: "BI", options: ["BI", "BA", "DI", "LI"], emoji: "🌶️", soundPrompt: "Cabai merah pedas! C-A... CA! Ditambah apa agar jadi CABI?", phonics: "C-A = CA, B-I = BI, CABI!" },
    { id: "baca_18", word: "SAWI", parts: ["SA", "WI"], missingIndex: 1, targetSyllable: "WI", options: ["WI", "WA", "LI", "PI"], emoji: "🥬", soundPrompt: "Sayur sawi hijau segar! S-A... SA! Ditambah apa agar jadi SAWI?", phonics: "S-A = SA, W-I = WI, SAWI!" },
    { id: "baca_19", word: "PALU", parts: ["PA", "LU"], missingIndex: 1, targetSyllable: "LU", options: ["LU", "LI", "LA", "KU"], emoji: "🔨", soundPrompt: "Palu tukang kayu! P-A... PA! Ditambah apa agar jadi PALU?", phonics: "P-A = PA, L-U = LU, PALU!" },
    { id: "baca_20", word: "LABU", parts: ["LA", "BU"], missingIndex: 1, targetSyllable: "BU", options: ["BU", "BA", "DU", "KU"], emoji: "🎃", soundPrompt: "Buah labu kuning! L-A... LA! Ditambah suku kata apa agar jadi LABU?", phonics: "L-A = LA, B-U = BU, LABU!" },
    { id: "baca_21", word: "GULA", parts: ["GU", "LA"], missingIndex: 1, targetSyllable: "LA", options: ["LA", "LI", "MA", "DA"], emoji: "🍬", soundPrompt: "Gula manis sekali! G-U... GU! Ditambah apa agar jadi GULA?", phonics: "G-U = GU, L-A = LA, GULA!" },
    { id: "baca_22", word: "MEJA", parts: ["ME", "JA"], missingIndex: 1, targetSyllable: "JA", options: ["JA", "JI", "KA", "LA"], emoji: "🪑", soundPrompt: "Meja tempat belajar! M-E... ME! Ditambah suku kata apa agar jadi MEJA?", phonics: "M-E = ME, J-A = JA, MEJA!" },
    { id: "baca_23", word: "RAJA", parts: ["RA", "JA"], missingIndex: 1, targetSyllable: "JA", options: ["JA", "JU", "MA", "TA"], emoji: "👑", soundPrompt: "Raja memakai mahkota! R-A... RA! Ditambah apa agar jadi RAJA?", phonics: "R-A = RA, J-A = JA, RAJA!" },
    { id: "baca_24", word: "PIPA", parts: ["PI", "PA"], missingIndex: 1, targetSyllable: "PA", options: ["PA", "PI", "TA", "LA"], emoji: "🚰", soundPrompt: "Pipa air mengalir! P-I... PI! Ditambah apa agar jadi PIPA?", phonics: "P-I = PI, P-A = PA, PIPA!" },
    { id: "baca_25", word: "NASI", parts: ["NA", "SI"], missingIndex: 1, targetSyllable: "SI", options: ["SI", "SA", "MI", "KU"], emoji: "🍚", soundPrompt: "Nasi putih hangat! N-A... NA! Ditambah suku kata apa agar jadi NASI?", phonics: "N-A = NA, S-I = SI, NASI!" },
    { id: "baca_26", word: "BATU", parts: ["BA", "TU"], missingIndex: 1, targetSyllable: "TU", options: ["TU", "TI", "KU", "LA"], emoji: "🪨", soundPrompt: "Batu kali yang keras! B-A... BA! Ditambah apa agar jadi BATU?", phonics: "B-A = BA, T-U = TU, BATU!" },
    { id: "baca_27", word: "TITI", parts: ["TI", "TI"], missingIndex: 1, targetSyllable: "TI", options: ["TI", "TA", "LI", "MI"], emoji: "🐦", soundPrompt: "Burung titi berkicau! T-I... TI! Ditambah apa agar jadi TITI?", phonics: "T-I = TI, T-I = TI, TITI!" },
    { id: "baca_28", word: "SUSU", parts: ["SU", "SU"], missingIndex: 1, targetSyllable: "SU", options: ["SU", "SA", "KU", "DU"], emoji: "🥛", soundPrompt: "Susu sapi sehat dan segar! S-U... SU! Ditambah apa agar jadi SUSU?", phonics: "S-U = SU, S-U = SU, SUSU!" },
    { id: "baca_29", word: "SOTO", parts: ["SO", "TO"], missingIndex: 1, targetSyllable: "TO", options: ["TO", "TI", "KO", "RO"], emoji: "🍲", soundPrompt: "Soto ayam gurih hangat! S-O... SO! Ditambah apa agar jadi SOTO?", phonics: "S-O = SO, T-O = TO, SOTO!" },
    { id: "baca_30", word: "SAPU", parts: ["SA", "PU"], missingIndex: 1, targetSyllable: "PU", options: ["PU", "PA", "KU", "LU"], emoji: "🧹", soundPrompt: "Sapu pembersih lantai! S-A... SA! Ditambah suku kata apa agar jadi SAPU?", phonics: "S-A = SA, P-U = PU, SAPU!" }
  ],

  // ==========================================
  // 4. BELAJAR BERHITUNG HINGGA BELASAN (1 - 20) (30 SOAL LENGKAP)
  // Menghitung interaktif sentuh (tanpa suara saat sentuh gambar),
  // kaya variasi objek kontekstual nyata (mobil & ban, hewan, benda harian),
  // eksplorasi angka belasan (11-20), dan penjumlahan visual ceria.
  // ==========================================
  hitung: [
    // ------------------------------------------------------------------
    // BAGIAN 1: KENDARAAN, BENDA SEKITAR & BAGIAN TUBUH (KONTEKSTUAL & SERU)
    // ------------------------------------------------------------------
    {
      id: "hitung_1",
      heroEmoji: "🚗",
      heroTitle: "Mobil Balap Merah",
      heroDesc: "Brum brum! Berapa banyak ban mobil ini?",
      question: "Mobil balap merah ini rodanya (bannya) ada berapa?",
      soundText: "Lihat mobil balap merah yang keren! Berapa banyak roda bannya ya?",
      parts: [
        { emoji: "🛞", label: "Ban Depan Kiri" },
        { emoji: "🛞", label: "Ban Depan Kanan" },
        { emoji: "🛞", label: "Ban Belakang Kiri" },
        { emoji: "🛞", label: "Ban Belakang Kanan" }
      ],
      options: [2, 3, 4, 5],
      correct: 4
    },
    {
      id: "hitung_2",
      heroEmoji: "🚲",
      heroTitle: "Sepeda Gowes Ceria",
      heroDesc: "Kring kring! Berapa banyak roda sepeda ini?",
      question: "Sepeda gowes ini mempunyai berapa roda?",
      soundText: "Kring kring gowes sepeda! Ada berapa banyak roda pada sepeda ini?",
      parts: [
        { emoji: "🛞", label: "Roda Depan" },
        { emoji: "🛞", label: "Roda Belakang" }
      ],
      options: [1, 2, 3, 4],
      correct: 2
    },
    {
      id: "hitung_3",
      heroEmoji: "🛺",
      heroTitle: "Bajaj Oranye Lincah",
      heroDesc: "Teng teng! Berapa roda bajaj oranye ini?",
      question: "Bajaj oranye yang lincah ini rodanya ada berapa?",
      soundText: "Bajaj oranye melaju di jalan! Ayo hitung, berapa roda bajaj ini?",
      parts: [
        { emoji: "🛞", label: "Roda Depan" },
        { emoji: "🛞", label: "Roda Belakang Kiri" },
        { emoji: "🛞", label: "Roda Belakang Kanan" }
      ],
      options: [2, 3, 4, 5],
      correct: 3
    },
    {
      id: "hitung_4",
      heroEmoji: "🚦",
      heroTitle: "Lampu Lalu Lintas",
      heroDesc: "Merah berhenti, kuning hati-hati, hijau jalan!",
      question: "Ada berapa macam warna pada lampu lalu lintas?",
      soundText: "Lampu lalu lintas di perempatan jalan! Ada berapa warnanya ya?",
      parts: [
        { emoji: "🔴", label: "Merah (Stop)" },
        { emoji: "🟡", label: "Kuning (Siap)" },
        { emoji: "🟢", label: "Hijau (Jalan)" }
      ],
      options: [2, 3, 4, 5],
      correct: 3
    },
    {
      id: "hitung_5",
      heroEmoji: "👕",
      heroTitle: "Kemeja Sekolah Rapi",
      heroDesc: "Kancing bajunya dipasang berurutan dari atas ke bawah",
      question: "Ada berapa kancing pada kemeja sekolah ini?",
      soundText: "Ayo hitung kancing baju kemeja sekolah yang rapi ini!",
      parts: [
        { emoji: "🔘", label: "Kancing 1" },
        { emoji: "🔘", label: "Kancing 2" },
        { emoji: "🔘", label: "Kancing 3" },
        { emoji: "🔘", label: "Kancing 4" }
      ],
      options: [3, 4, 5, 6],
      correct: 4
    },
    {
      id: "hitung_6",
      heroEmoji: "✋",
      heroTitle: "Satu Telapak Tangan Kita",
      heroDesc: "Jari-jemari tangan untuk menulis dan melukis",
      question: "Berapa banyak jari pada satu telapak tangan kita?",
      soundText: "Angkat satu tanganmu! Ada berapa banyak jari di satu tanganmu?",
      parts: [
        { emoji: "👍", label: "Ibu Jari (Jempol)" },
        { emoji: "☝️", label: "Jari Telunjuk" },
        { emoji: "👆", label: "Jari Tengah" },
        { emoji: "🖐️", label: "Jari Manis" },
        { emoji: "🤏", label: "Jari Kelingking" }
      ],
      options: [4, 5, 6, 7],
      correct: 5
    },
    {
      id: "hitung_7",
      heroEmoji: "⏰",
      heroTitle: "Jam Dinding Kamar",
      heroDesc: "Tik tok tik tok, penunjuk waktu belajar dan bermain",
      question: "Ada berapa jarum penunjuk pada jam dinding ini?",
      soundText: "Tik tok suara jam dinding! Ada berapa jarum jamnya?",
      parts: [
        { emoji: "🧭", label: "Jarum Pendek" },
        { emoji: "🧭", label: "Jarum Panjang" }
      ],
      options: [1, 2, 3, 4],
      correct: 2
    },
    {
      id: "hitung_8",
      heroEmoji: "🎂",
      heroTitle: "Kue Ulang Tahun Meriah",
      heroDesc: "Tiup lilinnya bersama teman-teman!",
      question: "Ada berapa batang lilin di atas kue ulang tahun ini?",
      soundText: "Kue ulang tahun manis bertabur ceri! Berapa banyak lilin di atasnya?",
      parts: [
        { emoji: "🕯️", label: "Lilin 1" },
        { emoji: "🕯️", label: "Lilin 2" },
        { emoji: "🕯️", label: "Lilin 3" },
        { emoji: "🕯️", label: "Lilin 4" },
        { emoji: "🕯️", label: "Lilin 5" }
      ],
      options: [4, 5, 6, 7],
      correct: 5
    },
    {
      id: "hitung_9",
      heroEmoji: "🍕",
      heroTitle: "Pizza Keju Lezat",
      heroDesc: "Potongan pizza berbentuk segitiga enak sekali!",
      question: "Pizza keju ini dipotong menjadi berapa potong?",
      soundText: "Nyam nyam pizza keju lezat! Ada berapa potongan pizza semuanya?",
      parts: [
        { emoji: "🍕", label: "Potong 1" },
        { emoji: "🍕", label: "Potong 2" },
        { emoji: "🍕", label: "Potong 3" },
        { emoji: "🍕", label: "Potong 4" },
        { emoji: "🍕", label: "Potong 5" },
        { emoji: "🍕", label: "Potong 6" }
      ],
      options: [4, 5, 6, 7],
      correct: 6
    },
    {
      id: "hitung_10",
      heroEmoji: "🌈",
      heroTitle: "Pelangi Ceria di Langit",
      heroDesc: "Me-Ji-Ku-Hi-Bi-Ni-U warna-warni yang mempesona",
      question: "Ada berapa warna utama pada pelangi yang indah?",
      soundText: "Pelangi warna-warni sehabis hujan! Berapa warna utama pada pelangi?",
      parts: [
        { emoji: "🔴", label: "Merah" },
        { emoji: "🟠", label: "Jingga" },
        { emoji: "🟡", label: "Kuning" },
        { emoji: "🟢", label: "Hijau" },
        { emoji: "🔵", label: "Biru" },
        { emoji: "🟣", label: "Nila" },
        { emoji: "🟪", label: "Ungu" }
      ],
      options: [5, 6, 7, 8],
      correct: 7
    },

    // ------------------------------------------------------------------
    // BAGIAN 2: HEWAN & FITUR TUBUH (SANGAT MENARIK UNTUK ANAK TK-A)
    // ------------------------------------------------------------------
    {
      id: "hitung_11",
      heroEmoji: "🐱",
      heroTitle: "Kucing Belang Manis",
      heroDesc: "Meong meong! Berapa kaki kucing berbulu halus ini?",
      question: "Kucing manis ini mempunyai berapa kaki?",
      soundText: "Meong meong kucing lucu! Berapa banyak kaki yang dimiliki kucing?",
      parts: [
        { emoji: "🐾", label: "Depan Kiri" },
        { emoji: "🐾", label: "Depan Kanan" },
        { emoji: "🐾", label: "Belakang Kiri" },
        { emoji: "🐾", label: "Belakang Kanan" }
      ],
      options: [2, 3, 4, 5],
      correct: 4
    },
    {
      id: "hitung_12",
      heroEmoji: "🐥",
      heroTitle: "Anak Ayam Kuning",
      heroDesc: "Cip cip cip! Anak ayam lincah berlari di halaman",
      question: "Anak ayam kuning ini mempunyai berapa kaki?",
      soundText: "Cip cip anak ayam lucu! Ada berapa kaki anak ayam ini?",
      parts: [
        { emoji: "🦶", label: "Kaki Kiri" },
        { emoji: "🦶", label: "Kaki Kanan" }
      ],
      options: [1, 2, 3, 4],
      correct: 2
    },
    {
      id: "hitung_13",
      heroEmoji: "🐞",
      heroTitle: "Kumbang Kepik Merah",
      heroDesc: "Kumbang kecil sahabat tanaman di kebun bunga",
      question: "Ada berapa bintik hitam di punggung kumbang kepik ini?",
      soundText: "Kumbang kepik merah bertotol hitam! Ayo hitung berapa bintik hitamnya?",
      parts: [
        { emoji: "⚫", label: "Bintik 1" },
        { emoji: "⚫", label: "Bintik 2" },
        { emoji: "⚫", label: "Bintik 3" },
        { emoji: "⚫", label: "Bintik 4" },
        { emoji: "⚫", label: "Bintik 5" },
        { emoji: "⚫", label: "Bintik 6" }
      ],
      options: [4, 5, 6, 7],
      correct: 6
    },
    {
      id: "hitung_14",
      heroEmoji: "🕷️",
      heroTitle: "Laba-Laba Sahabat",
      heroDesc: "Laba-laba pintar membuat jaring benang sutra",
      question: "Berapa banyak kaki yang dimiliki seekor laba-laba?",
      soundText: "Laba-laba membuat sarang di ranting pohon! Ada berapa banyak kakinya?",
      parts: [
        { emoji: "🦵", label: "Kaki 1" },
        { emoji: "🦵", label: "Kaki 2" },
        { emoji: "🦵", label: "Kaki 3" },
        { emoji: "🦵", label: "Kaki 4" },
        { emoji: "🦵", label: "Kaki 5" },
        { emoji: "🦵", label: "Kaki 6" },
        { emoji: "🦵", label: "Kaki 7" },
        { emoji: "🦵", label: "Kaki 8" }
      ],
      options: [6, 7, 8, 9],
      correct: 8
    },
    {
      id: "hitung_15",
      heroEmoji: "👐",
      heroTitle: "Dua Belah Tangan Kita",
      heroDesc: "Sepuluh jari tangan yang rajin mencuci tangan",
      question: "Berapa jumlah semua jari pada kedua tangan kita?",
      soundText: "Buka kedua tanganmu lebar-lebar! Berapa jumlah semua jari tanganmu?",
      itemEmoji: "✋",
      itemCount: 10,
      options: [8, 9, 10, 11],
      correct: 10
    },

    // ------------------------------------------------------------------
    // BAGIAN 3: MENGENAL ANGKA BELASAN (11 SAMPAI 20)
    // ------------------------------------------------------------------
    {
      id: "hitung_16",
      heroEmoji: "🍬",
      heroTitle: "Toples Permen Manis",
      heroDesc: "Permen aneka warna untuk hadiah anak pintar",
      question: "Angka Belasan: Berapa banyak permen manis warna-warni ini?",
      soundText: "Ayo belajar angka belasan! Sentuh permennya dan hitung sampai sebelas!",
      itemEmoji: "🍬",
      itemCount: 11,
      options: [10, 11, 12, 13],
      correct: 11
    },
    {
      id: "hitung_17",
      heroEmoji: "🍓",
      heroTitle: "Keranjang Stroberi Kebun",
      heroDesc: "Stroberi merah ranum baru dipetik dari kebun",
      question: "Angka Belasan: Ada berapa buah stroberi merah segar di sini?",
      soundText: "Stroberi merah kaya vitamin C! Berapa banyak jumlah stroberinya?",
      itemEmoji: "🍓",
      itemCount: 12,
      options: [11, 12, 13, 14],
      correct: 12
    },
    {
      id: "hitung_18",
      heroEmoji: "🦆",
      heroTitle: "Bebek Berenang di Danau",
      heroDesc: "Kwek kwek kwek! Anak bebek berenang mengikuti induknya",
      question: "Angka Belasan: Berapa banyak bebek yang berenang di danau?",
      soundText: "Kwek kwek kwek! Ada berapa banyak anak bebek berenang di danau?",
      itemEmoji: "🦆",
      itemCount: 13,
      options: [12, 13, 14, 15],
      correct: 13
    },
    {
      id: "hitung_19",
      heroEmoji: "🦋",
      heroTitle: "Kupu-Kupu di Taman Bunga",
      heroDesc: "Kupu-kupu terbang mengepakkan sayap cantiknya",
      question: "Angka Belasan: Berapa banyak kupu-kupu cantik yang hinggap?",
      soundText: "Kupu-kupu indah menari di udara! Berapa belas jumlah kupu-kupu ini?",
      itemEmoji: "🦋",
      itemCount: 14,
      options: [13, 14, 15, 16],
      correct: 14
    },
    {
      id: "hitung_20",
      heroEmoji: "⭐",
      heroTitle: "Bintang Emas di Langit Malam",
      heroDesc: "Bintang-bintang berkilauan menemani bulan sabit",
      question: "Angka Belasan: Ada berapa banyak bintang emas yang berkilau?",
      soundText: "Kelap-kelip bintang di langit malam! Ada berapa belas bintang emas di sini?",
      itemEmoji: "⭐",
      itemCount: 15,
      options: [14, 15, 16, 17],
      correct: 15
    },
    {
      id: "hitung_21",
      heroEmoji: "🍌",
      heroTitle: "Tandan Pisang Manis",
      heroDesc: "Pisang kuning lezat kesukaan semua anak ceria",
      question: "Angka Belasan: Ada berapa buah pisang kuning manis di kebun?",
      soundText: "Sentuh buah pisangnya satu per satu untuk berhitung sampai enam belas!",
      itemEmoji: "🍌",
      itemCount: 16,
      options: [15, 16, 17, 18],
      correct: 16
    },
    {
      id: "hitung_22",
      heroEmoji: "🐠",
      heroTitle: "Ikan Badut di Terumbu Karang",
      heroDesc: "Ikan nemo berenang lincah di laut biru jernih",
      question: "Angka Belasan: Ada berapa ikan kecil yang berenang bersama?",
      soundText: "Ikan-ikan kecil berenang gembira! Ayo hitung sampai tujuh belas!",
      itemEmoji: "🐠",
      itemCount: 17,
      options: [16, 17, 18, 19],
      correct: 17
    },
    {
      id: "hitung_23",
      heroEmoji: "🍩",
      heroTitle: "Kotak Donat Toko Roti",
      heroDesc: "Donat bulat bertabur cokelat dan meses warna-warni",
      question: "Angka Belasan: Berapa banyak donat lezat yang baru matang?",
      soundText: "Aroma wangi kue donat cokelat! Hitung satu per satu sampai delapan belas!",
      itemEmoji: "🍩",
      itemCount: 18,
      options: [17, 18, 19, 20],
      correct: 18
    },
    {
      id: "hitung_24",
      heroEmoji: "🏎️",
      heroTitle: "Garasi Mobil Mini",
      heroDesc: "Mobil-mobil balap mini terparkir rapi siap bertanding",
      question: "Angka Belasan: Ada berapa mobil balap mini di garasi?",
      soundText: "Garasi penuh mobil balap keren! Ada berapa mobil mainan semuanya?",
      itemEmoji: "🏎️",
      itemCount: 19,
      options: [17, 18, 19, 20],
      correct: 19
    },
    {
      id: "hitung_25",
      heroEmoji: "🎈",
      heroTitle: "Pesta Balon Ceria",
      heroDesc: "Balon terbang warna-warni menghiasi pesta ulang tahun",
      question: "Hebat! Berapa banyak balon pesta yang terbang di langit?",
      soundText: "Luar biasa! Ayo hitung balon pesta warna-warni sampai genap dua puluh!",
      itemEmoji: "🎈",
      itemCount: 20,
      options: [18, 19, 20, 21],
      correct: 20
    },

    // ------------------------------------------------------------------
    // BAGIAN 4: PENJUMLAHAN CERITA BERGAMBAR CERIA (KONTEKSTUAL & VISUAL)
    // ------------------------------------------------------------------
    {
      id: "hitung_26",
      heroEmoji: "🚗",
      heroTitle: "Balapan Mobil Merah & Biru",
      heroDesc: "Dua mobil merah ditambah dua mobil biru di sirkuit",
      question: "Penjumlahan Mobil: 2 🚗 Merah + 2 🚙 Biru = Berapa mobil?",
      soundText: "Dua mobil merah ditambah dua mobil biru, berapa mobil balap semuanya?",
      isAddition: true,
      emojiA: "🚗",
      labelA: "Merah",
      groupA: 2,
      emojiB: "🚙",
      labelB: "Biru",
      groupB: 2,
      options: [3, 4, 5, 6],
      correct: 4
    },
    {
      id: "hitung_27",
      heroEmoji: "🐱",
      heroTitle: "Anak Kucing Bermain",
      heroDesc: "Tiga kucing putih bermain bersama tiga kucing oranye",
      question: "Penjumlahan Kucing: 3 🐱 Putih + 3 🐈 Oranye = Berapa kucing?",
      soundText: "Tiga anak kucing putih ditambah tiga kucing oranye, jadi berapa kucing semuanya?",
      isAddition: true,
      emojiA: "🐱",
      labelA: "Putih",
      groupA: 3,
      emojiB: "🐈",
      labelB: "Oranye",
      groupB: 3,
      options: [4, 5, 6, 7],
      correct: 6
    },
    {
      id: "hitung_28",
      heroEmoji: "🎈",
      heroTitle: "Balon Pesta Ceria",
      heroDesc: "Lima balon merah dan lima balon kuning diikat bersama",
      question: "Penjumlahan Balon: 5 🎈 Merah + 5 🟡 Kuning = Berapa balon?",
      soundText: "Lima balon merah ditambah lima balon kuning, berapa balon semuanya?",
      isAddition: true,
      emojiA: "🎈",
      labelA: "Merah",
      groupA: 5,
      emojiB: "🟡",
      labelB: "Kuning",
      groupB: 5,
      options: [8, 9, 10, 11],
      correct: 10
    },
    {
      id: "hitung_29",
      heroEmoji: "🍎",
      heroTitle: "Keranjang Apel Segar",
      heroDesc: "Tujuh apel merah ditambah lima apel hijau manis",
      question: "Penjumlahan Belasan: 7 🍎 Merah + 5 🍏 Hijau = Berapa belas apel?",
      soundText: "Tujuh apel merah ditambah lima apel hijau, berapa belas apel semuanya?",
      isAddition: true,
      emojiA: "🍎",
      labelA: "Merah",
      groupA: 7,
      emojiB: "🍏",
      labelB: "Hijau",
      groupB: 5,
      options: [11, 12, 13, 14],
      correct: 12
    },
    {
      id: "hitung_30",
      heroEmoji: "🧁",
      heroTitle: "Pesta Donat & Kue Mangkuk",
      heroDesc: "Sepuluh donat lezat dan lima kue mangkuk di meja pesta",
      question: "Penjumlahan Belasan: 10 🍩 Donat + 5 🧁 Kue = Berapa kue lezat?",
      soundText: "Sepuluh donat cokelat ditambah lima kue mangkuk ceri, berapa belas kue semuanya?",
      isAddition: true,
      emojiA: "🍩",
      labelA: "Donat",
      groupA: 10,
      emojiB: "🧁",
      labelB: "Kue",
      groupB: 5,
      options: [14, 15, 16, 17],
      correct: 15
    }
  ],

  // ==========================================
  // STIKER REWARD (ALBUM KOLEKSI JUARA)
  // ==========================================
  stickers: [
    { id: "stk_1", name: "Bintang Cilik", emoji: "⭐", unlocked: true },
    { id: "stk_2", name: "Peta Nusantara", emoji: "🗺️", unlocked: false },
    { id: "stk_3", name: "Rumah Gadang", emoji: "🏠", unlocked: false },
    { id: "stk_4", name: "Mahkota Adat", emoji: "👑", unlocked: false },
    { id: "stk_5", name: "Pintar Membaca", emoji: "📖", unlocked: false },
    { id: "stk_6", name: "Jago Berhitung", emoji: "🔢", unlocked: false },
    { id: "stk_7", name: "Cendrawasih Emas", emoji: "🦜", unlocked: false },
    { id: "stk_8", name: "Piala Juara Agung", emoji: "🏆", unlocked: false }
  ]
};
