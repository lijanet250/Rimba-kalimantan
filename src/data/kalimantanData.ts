export interface SpeciesData {
  id: string;
  name: string;
  latinName: string;
  localName: string;
  status: 'Kritis Terancam Punah' | 'Genting' | 'Rentan';
  populationEstimate: string;
  habitat: string;
  threats: string[];
  keyRole: string;
  funFact: string;
}

export interface HotspotProvince {
  name: string;
  code: string;
  hotspotsToday: number;
  hotspotsYesterday: number;
  highConfidence: number;
  mainAffectedRegencies: string[];
  ispuAqi: number;
  airQualityStatus: 'Baik' | 'Sedang' | 'Tidak Sehat' | 'Sangat Tidak Sehat' | 'Berbahaya';
  coordinates: { lat: number; lng: number };
}

export interface TreeSpecies {
  id: string;
  name: string;
  latinName: string;
  co2AbsorptionPerYearKg: number;
  maturityYears: number;
  indigenousUse: string;
  ecologicalRole: string;
  status: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const IMAGES = {
  heroRainforest: '/src/assets/images/kalimantan_hero_rainforest_1793592603055.jpg',
  wildfirePeat: '/src/assets/images/kalimantan_wildfire_peat_1793592605135.jpg',
  orangutanWild: '/src/assets/images/kalimantan_orangutan_wild_1793592605177.jpg',
  riverDeforestation: '/src/assets/images/kalimantan_river_deforestation_1793592606006.jpg',
  dayakRangers: '/src/assets/images/kalimantan_dayak_rangers_1793592607542.jpg',
  uniqueFlora: '/src/assets/images/kalimantan_unique_flora_1793592741542.jpg',
};

export interface UniqueEcosystem {
  id: string;
  name: string;
  localTerm: string;
  characteristics: string;
  wonderFact: string;
  indicatorSpecies: string[];
  ecologicalImportance: string;
}

export interface BiodiversityFact {
  id: string;
  title: string;
  category: 'Fauna Ajaib' | 'Flora Purba' | 'Fenomena Alam' | 'Farmakope Rimba';
  fact: string;
  metric?: string;
  significance: string;
}

export const UNIQUE_ECOSYSTEMS: UniqueEcosystem[] = [
  {
    id: 'kerangas',
    name: 'Hutan Kerangas (Heath Forest)',
    localTerm: 'Kerangas (Bahasa Iban: "Tanah yang tak dapat ditanami padi")',
    characteristics: 'Tumbuh di atas pasir kuarsa putih asam yang sangat miskin nutrisi nitrogen dan fosfor, dengan dedaunan kaku berduri atau tebal lilin.',
    wonderFact: 'Karena tanahnya sangat miskin nutrisi hara, tanaman berevolusi menjadi karnivora pemakan serangga (Nepenthes pitcher plants) dan bersimbiosis dengan kotoran kelelawar.',
    indicatorSpecies: ['Kantong Semar (Nepenthes bicalcarata)', 'Pohon Pelawan Merah', 'Semut Camponotus'],
    ecologicalImportance: 'Mengunci tanah pasir rapuh dari erosi badai tropis dan menyaring air tanah menjadi sangat jernih bagai cermin kristal.',
  },
  {
    id: 'gambut-dalam',
    name: 'Rawa Gambut Air Hitam (Deep Peat Swamp)',
    localTerm: 'Danau Air Hitam / Rawa Gambut',
    characteristics: 'Terbentuk dari akumulasi serasah daun dan batang pohon berusia 8.000–12.000 tahun yang terendam air tannin asam pekat (pH 3–4) tanpa oksigen.',
    wonderFact: 'Menjadi habitat Paedocypris progenetica—salah satu spesies ikan bertulang belakang terkecil di bumi (panjang hanya 7,9 mm saat dewasa), serta Buaya Senyulong.',
    indicatorSpecies: ['Buaya Senyulong (Tomistoma schlegelii)', 'Ikan Siluk / Arwana Super Red', 'Jelutung Rawa'],
    ecologicalImportance: 'Menyimpan hingga 1.500 ton karbon per hektar dan berfungsi sebagai spons hidrologis raksasa penahan banjir regional.',
  },
  {
    id: 'karst-sangkulirang',
    name: 'Karst Sangkulirang-Mangkalihat',
    localTerm: 'Dinding Batu Bertoreh Prasejarah',
    characteristics: 'Gugusan menara batugamping purba dengan tebing vertikal terjal, lorong gua bawah tanah ribuan kilometer, dan aliran sungai tersembunyi.',
    wonderFact: 'Menyimpan jejak seni cadas telapak tangan manusia purba tertua di dunia (~40.000 tahun) serta mikro-spesies siput dan kepiting gua buta tak berpigmen.',
    indicatorSpecies: ['Walet Sarang Putih (Aerodramus fuciphagus)', 'Anggrek Hitam Liar', 'Kelelawar Tapal Kuda'],
    ecologicalImportance: 'Tandon air alami raksasa yang menyuplai 5 daerah aliran sungai besar di Kalimantan Timur.',
  },
  {
    id: 'dipterokarpa',
    name: 'Hutan Dipterokarpa Dataran Rendah',
    localTerm: 'Rimba Raya Tajuk Bertingkat',
    characteristics: 'Kanopi pohon raksasa setinggi 50–70 meter yang menjulang menutupi langit dengan kanopi bertingkat (stratified multilayer canopy).',
    wonderFact: 'Memiliki fenomena mistis "Mast Fruiting" (Berbuah Raya): ratusan spesies pohon berbunga dan berbuah serentak hanya sekali tiap 3–7 tahun dipicu oleh anomali El Niño.',
    indicatorSpecies: ['Meranti Merah (Shorea)', 'Pohon Bengkirai', 'Orangutan Kalimantan', 'Katak Terbang'],
    ecologicalImportance: 'Pusat fotosintesis dan pemrosesan oksigen terbesar di kawasan Sundaland, menaungi jutaan interaksi ekologis rantai makanan.',
  },
  {
    id: 'hutan-lumut',
    name: 'Hutan Lumut & Kabut Dataran Tinggi',
    localTerm: 'Rimba Abadi Muller-Schwaner',
    characteristics: 'Terletak di ketinggian di atas 1.500 mdpl dengan kabut abadi, suhu sejuk 14–18°C, dan setiap dahan diselimuti lumut basah tebal puluhan sentimeter.',
    wonderFact: 'Lumut di hutan ini dapat menyerap air kabut 300% dari bobot keringnya tanpa hujan, bertindak sebagai spons pengatur aliran anak-anak sungai pedalaman.',
    indicatorSpecies: ['Nepenthes rajah raksasa', 'Burung Ciung-mungkal Kalimantan', 'Anggrek Epifit Langka'],
    ecologicalImportance: 'Pengatur hulu sungai utama (Kapuas, Mahakam, Barito) agar tidak kering di musim kemarau panjang.',
  },
];

export const BIODIVERSITY_WONDERS: BiodiversityFact[] = [
  {
    id: 'gliders',
    title: 'Mamalia dan Amfibi Terbang Borneo',
    category: 'Fauna Ajaib',
    fact: 'Karena kerapatan kanopi pohon raksasa Dipterokarpa setinggi 60 meter, satwa Kalimantan berevolusi dengan kemampuan melayang (gliding): dari Katak Terbang Wallace (Rhacophorus nigropalmatus) dengan selaput kaki parasut, Kubung Malaya (Galeopterus), Ular Terbang (Chrysopelea), hingga 14 spesies Tupai Terbang.',
    metric: '14+ Spesies',
    significance: 'Adaptasi evolusioner unik yang membuktikan kanopi hutan yang saling terhubung tidak boleh terputus.',
  },
  {
    id: 'carnivorous-pitcher',
    title: 'Kantong Semar Pemangsa Serangga & Toilet Alami',
    category: 'Flora Purba',
    fact: 'Kalimantan adalah pusat keanekaragaman kantong semar (Nepenthes) terbesar di dunia dengan 30+ spesies endemik. Sebagian spesies seperti Nepenthes lowii bahkan berevolusi menjadi "toilet alami" bagi tupai pohon dan kelelawar wol kecil; tanaman memberi nektar manis di penutupnya dan mendapatkan nutrisi nitrogen dari kotoran hewan tersebut.',
    metric: '30+ Endemik',
    significance: 'Simbol adaptasi genius terhadap tanah pasir asam yang kekurangan nutrisi.',
  },
  {
    id: 'rafflesia-titanum',
    title: 'Bunga Parasit Terbesar di Muka Bumi',
    category: 'Flora Purba',
    fact: 'Rimba Kalimantan adalah habitat Rafflesia (seperti Rafflesia keithii dan arnoldii) dengan diameter kelopak hingga lebih dari 1 meter dan bobot 11 kg. Bunga ini tidak memiliki daun, batang, klorofil, atau akar sejati; hidup sepenuhnya sebagai parasit tak kasat mata di dalam sulur liana Tetrastigma sebelum mekar secara spektakuler.',
    metric: '100+ cm Diameter',
    significance: 'Sensitif ekstrem terhadap gangguan mikro-iklim kanopi; jika inang liana ditebang, bunga musnah selamanya.',
  },
  {
    id: 'luminescent-fungi',
    title: 'Jamur Fosfor & Rimba yang Bercahaya dalam Gelap',
    category: 'Fenomena Alam',
    fact: 'Di lantai hutan primer Kalimantan yang lembap, jamur bioluminesen Mycena chlorophos memancarkan cahaya hijau terang (panjang gelombang 530 nm) melalui reaksi enzim luciferase di kegelapan malam untuk menarik serangga malam agar menyebarkan sporanya.',
    metric: '24 Jam Pendar',
    significance: 'Indikator kelembapan tanah purba yang belum terpapar pengeringan kanal industri.',
  },
  {
    id: 'medicinal-pharmacy',
    title: 'Farmakope Terbesar: Gudang Obat Masa Depan Dunia',
    category: 'Farmakope Rimba',
    fact: 'Senyawa Calanolide A yang diekstrak dari pohon Calophyllum lanigerum di hutan Kalimantan terbukti secara klinis memiliki aktivitas penghambat replikasi virus HIV-1 dan tuberkulosis. Lebih dari 80% tumbuhan obat suku Dayak belum diteliti komposisi biokimia modernnya.',
    metric: '80% Belum Diteliti',
    significance: 'Potensi penemuan obat kanker, antibiotik baru, dan senyawa antivirus yang hilang jika hutan musnah terbakar.',
  },
  {
    id: 'wild-fruit-ancestors',
    title: 'Bank Genetik Nenek Moyang Buah Nusantara',
    category: 'Farmakope Rimba',
    fact: 'Kalimantan adalah pusat asal-usul genetik durian dunia dengan lebih dari 16 spesies durian liar (seperti Lahung Durio dulcis berbulu merah, Lay Durio kutejensis, Kerantungan), serta puluhan mangga hutan (Kasturi Mangifera casturi) dan rambutan liar.',
    metric: '16 Spesies Durian',
    significance: 'Ketahanan pangan masa depan bumi terhadap hama dan perubahan iklim global bergantung pada plasma nutfah liar ini.',
  },
];

export const CORE_PILLARS = [
  {
    id: 'peatland',
    number: '01',
    title: 'Kubah Gambut: Bank Karbon Raksasa Bumi',
    subtitle: 'Menahan 57 Miliar Ton Karbon yang Terancam Meledak ke Atmosfer',
    description:
      'Lahan gambut tropis Kalimantan terbentuk selama ribuan tahun dengan ketebalan hingga 12 meter. Gambut ini adalah spons raksasa yang menyerap miliaran ton karbon. Ketika dikeringkan oleh kanal atau dibakar, karbon purba ini terlepas menjadi CO2 dalam jumlah kolosal, mempercepat krisis iklim global.',
    highlightMetric: '57 Miliar Ton',
    metricLabel: 'Karbon tersimpan di gambut Kalimantan',
    ecologicalFact:
      'Satu hektar lahan gambut tropis Kalimantan menyimpan karbon hingga 10-20 kali lipat lebih banyak dibandingkan satu hektar hutan hujan tanah mineral.',
  },
  {
    id: 'biodiversity',
    number: '02',
    title: 'Sanctuary Terakhir Keanekaragaman Hayati Khatulistiwa',
    subtitle: 'Rumah bagi 15.000 Spesies Tumbuhan dan Satwa yang Tak Ada di Tempat Lain',
    description:
      'Hutan Kalimantan berusia lebih dari 130 juta tahun—jauh lebih tua dari hutan Amazon. Di dalamnya bernaung Orangutan Borneo, Bekantan hidung panjang, Macan Dahan, hingga Burung Enggang Gading yang disakralkan. Kehilangan rimba berarti kepunahan permanen keajaiban evolusi bumi.',
    highlightMetric: '130+ Juta Tahun',
    metricLabel: 'Usia formasi hutan hujan tertua di dunia',
    ecologicalFact:
      'Diperkirakan lebih dari 3 spesies baru ditemukan setiap bulan di pedalaman Borneo oleh para peneliti biologi internasional.',
  },
  {
    id: 'hydrology',
    number: '03',
    title: 'Menara Air & Pengatur Iklim Mikro Nusantara',
    subtitle: 'Nadi Kehidupan Sungai Kapuas, Mahakam, dan Barito untuk 15 Juta Jiwa',
    description:
      'Hutan lebat di dataran tinggi Heart of Borneo bertindak bagai atap raksasa yang menangkap awan dan mendistribusikan air bersih melalui urat nadi sungai-sungai terpanjang Indonesia. Hilangnya hutan memicu bencana ganda: banjir bandang mematikan saat musim hujan dan kekeringan ekstrem saat kemarau.',
    highlightMetric: '1.143 KM',
    metricLabel: 'Panjang Sungai Kapuas, urat nadi air tawar',
    ecologicalFact:
      'DAS Kapuas dan Mahakam menyokong kebutuhan air tawar, irigasi pangan, serta moda transportasi utama untuk komunitas pedalaman.',
  },
  {
    id: 'indigenous',
    number: '04',
    title: 'Benteng Kebudayaan & Ruang Hidup Masyarakat Adat Dayak',
    subtitle: 'Kearifan Ekologis Tana Ulen yang Menjaga Keseimbangan Generasi',
    description:
      'Masyarakat Adat Dayak bukan perusak rimba; mereka adalah perawat sejati hutan adat selama ratusan tahun lewat hukum adat seperti Tana Ulen, Simpu, dan pantangan membakar sembarangan. Menghancurkan rimba Kalimantan berarti melenyapkan identitas kultural dan kearifan ekologis leluhur nusantara.',
    highlightMetric: '450+ Suku Dayak',
    metricLabel: 'Komunitas adat penjaga rimba leluhur',
    ecologicalFact:
      'Kawasan hutan yang dikelola secara sah oleh masyarakat hukum adat terbukti memiliki tingkat deforestasi terendah di seluruh pulau Kalimantan.',
  },
];

export const ENDEMIC_SPECIES: SpeciesData[] = [
  {
    id: 'orangutan',
    name: 'Orangutan Kalimantan',
    latinName: 'Pongo pygmaeus',
    localName: 'Kahiyo / Mawas',
    status: 'Kritis Terancam Punah',
    populationEstimate: '± 57.000 individu tersisa di alam liar',
    habitat: 'Hutan Dipterokarpa dan Rawa Gambut dataran rendah',
    threats: ['Fragmentasi habitat oleh sawit & tambang', 'Kebakaran gambut', 'Perburuan & konflik satwa liar'],
    keyRole: 'Penebar benih utama (Gardener of the Rainforest); tanpa orangutan, regenerasi pohon-pohon besar hutan tropis akan terhenti.',
    funFact: 'Memiliki 97% DNA serupa dengan manusia dan dapat mengingat rute berbuah puluhan pohon di wilayah jelajah seluas ratusan hektar.',
  },
  {
    id: 'bekantan',
    name: 'Bekantan',
    latinName: 'Nasalis larvatus',
    localName: 'Monyet Belanda / Raseng',
    status: 'Genting',
    populationEstimate: '± 16.000 individu',
    habitat: 'Hutan mangrove pesisir dan hutan rawa riparian tepi sungai',
    threats: ['Konversi hutan mangrove menjadi tambak udang', 'Pencemaran sungai', 'Kebakaran semak riparian'],
    keyRole: 'Penjaga integritas ekosistem mangrove dan muara sungai yang membentengi pesisir dari abrasi gelombang laut.',
    funFact: 'Merupakan perenang ulung yang memiliki selaput di antara jemari kakinya dan mampu menyelam hingga kedalaman 20 meter.',
  },
  {
    id: 'enggang',
    name: 'Burung Enggang Gading',
    latinName: 'Rhinoplax vigil',
    localName: 'Tingang / Rangkong Gading',
    status: 'Kritis Terancam Punah',
    populationEstimate: 'Populasi menurun drastis (< 5.000 pasang)',
    habitat: 'Kanopi hutan primer kanopi tinggi pedalaman',
    threats: ['Perburuan liar untuk paruh merah gading', 'Penebangan pohon berlubang alami untuk sarang'],
    keyRole: 'Burung penjelajah kanopi yang menyebarkan biji buah pohon beringin dan ara hingga radius belasan kilometer.',
    funFact: 'Menjadi simbol suci kesetiaan dan kepemimpinan dalam kebudayaan Dayak. Burung jantan akan menutup pasangannya di dalam lubang pohon selama mengerami telur dan setia memberi makan.',
  },
  {
    id: 'macan-dahan',
    name: 'Macan Dahan Kalimantan',
    latinName: 'Neofelis diardi',
    localName: 'Tuyu / Rimau Rambat',
    status: 'Rentan',
    populationEstimate: '± 3.800 individu dewasa',
    habitat: 'Hutan lebat kanopi rapat dari dataran rendah hingga perbukitan',
    threats: ['Hilangnya koridor kanopi pohon kontinu', 'Penurunan mangsa alami (kancil, rusa)', 'Jerat pemburu liar'],
    keyRole: 'Predator puncak arboreal yang menjaga populasi herbivora hutan agar vegetasi bawah hutan tidak over-grazed.',
    funFact: 'Memiliki taring terpanjang relatif terhadap ukuran tengkoraknya di antara seluruh spesies kucing liar di dunia.',
  },
  {
    id: 'gajah-kerdil',
    name: 'Gajah Kerdil Borneo',
    latinName: 'Elephas maximus borneensis',
    localName: 'Nenek / Gajah Mini Kalimantan',
    status: 'Genting',
    populationEstimate: '± 1.000 - 1.500 individu (terkonsentrasi di Kalut & Sabah)',
    habitat: 'Lembah sungai dataran rendah dan hutan dataran banjir',
    threats: ['Penyempitan koridor jelajah oleh perkebunan monokultur', 'Keracunan pupuk kimia & pagar kejut'],
    keyRole: 'Membuka jalur migrasi di hutan lebat bagi satwa lain dan memecah kayu mati untuk nutrisi tanah.',
    funFact: 'Merupakan subspesies gajah terkecil di Asia dengan telinga lebih besar, ekor lebih panjang menjuntai hingga tanah, dan temperamen yang lebih jinak.',
  },
];

export const HOTSPOT_PROVINCES: HotspotProvince[] = [
  {
    name: 'Kalimantan Tengah',
    code: 'KALTENG',
    hotspotsToday: 412,
    hotspotsYesterday: 368,
    highConfidence: 189,
    mainAffectedRegencies: ['Pulang Pisau', 'Kotawaringin Timur', 'Kapuas', 'Katingan'],
    ispuAqi: 238,
    airQualityStatus: 'Sangat Tidak Sehat',
    coordinates: { lat: -2.21, lng: 113.92 },
  },
  {
    name: 'Kalimantan Barat',
    code: 'KALBAR',
    hotspotsToday: 298,
    hotspotsYesterday: 310,
    highConfidence: 142,
    mainAffectedRegencies: ['Ketapang', 'Kubu Raya', 'Sambas', 'Mempawah'],
    ispuAqi: 174,
    airQualityStatus: 'Tidak Sehat',
    coordinates: { lat: -0.02, lng: 109.34 },
  },
  {
    name: 'Kalimantan Selatan',
    code: 'KALSEL',
    hotspotsToday: 215,
    hotspotsYesterday: 185,
    highConfidence: 94,
    mainAffectedRegencies: ['Banjar', 'Tanah Laut', 'Barito Kuala', 'Tapin'],
    ispuAqi: 156,
    airQualityStatus: 'Tidak Sehat',
    coordinates: { lat: -3.31, lng: 114.59 },
  },
  {
    name: 'Kalimantan Timur',
    code: 'KALTIM',
    hotspotsToday: 134,
    hotspotsYesterday: 118,
    highConfidence: 61,
    mainAffectedRegencies: ['Paser', 'Kutai Kartanegara', 'Berau', 'Kutai Barat'],
    ispuAqi: 89,
    airQualityStatus: 'Sedang',
    coordinates: { lat: -0.50, lng: 117.15 },
  },
  {
    name: 'Kalimantan Utara',
    code: 'KALTARA',
    hotspotsToday: 48,
    hotspotsYesterday: 52,
    highConfidence: 19,
    mainAffectedRegencies: ['Nunukan', 'Bulungan', 'Tana Tidung'],
    ispuAqi: 42,
    airQualityStatus: 'Baik',
    coordinates: { lat: 3.12, lng: 116.07 },
  },
];

export interface ActiveHotspotPoint {
  id: string;
  locationName: string;
  regency: string;
  provinceCode: 'KALTENG' | 'KALBAR' | 'KALSEL' | 'KALTIM' | 'KALTARA';
  provinceName: string;
  lat: number;
  lng: number;
  satellite: 'SNPP-VIIRS' | 'Terra-MODIS' | 'Aqua-MODIS';
  confidence: number; // e.g. 96
  brightnessTempK: number; // Kelvin
  landType: 'Kubah Gambut Dalam (>3m)' | 'Rawa Gambut Dangkal' | 'Semak Belukar Konsesi' | 'Hutan Produksi Terbuka';
  detectionTime: string;
  status: 'Bara Aktif Bawah Tanah' | 'Kobaran Asap Tebal' | 'Pemadaman Regu MPA' | 'Pendinginan Gambut';
  estimatedAreaHa: number;
}

export const ACTIVE_FIRE_HOTSPOTS: ActiveHotspotPoint[] = [
  {
    id: 'HS-KTG-01',
    locationName: 'Desa Garung - Tumbang Nusa Km 34',
    regency: 'Pulang Pisau',
    provinceCode: 'KALTENG',
    provinceName: 'Kalimantan Tengah',
    lat: -2.38,
    lng: 114.12,
    satellite: 'SNPP-VIIRS',
    confidence: 96,
    brightnessTempK: 354,
    landType: 'Kubah Gambut Dalam (>3m)',
    detectionTime: '8 menit lalu',
    status: 'Bara Aktif Bawah Tanah',
    estimatedAreaHa: 14.5,
  },
  {
    id: 'HS-KTG-02',
    locationName: 'Kec. Baamang Hulu - Lingkar Utara',
    regency: 'Kotawaringin Timur (Sampit)',
    provinceCode: 'KALTENG',
    provinceName: 'Kalimantan Tengah',
    lat: -2.48,
    lng: 112.95,
    satellite: 'Terra-MODIS',
    confidence: 91,
    brightnessTempK: 342,
    landType: 'Rawa Gambut Dangkal',
    detectionTime: '18 menit lalu',
    status: 'Kobaran Asap Tebal',
    estimatedAreaHa: 8.2,
  },
  {
    id: 'HS-KTG-03',
    locationName: 'Blok C Eks-PLG Seberang Mantangai',
    regency: 'Kapuas',
    provinceCode: 'KALTENG',
    provinceName: 'Kalimantan Tengah',
    lat: -2.64,
    lng: 114.46,
    satellite: 'SNPP-VIIRS',
    confidence: 98,
    brightnessTempK: 368,
    landType: 'Kubah Gambut Dalam (>3m)',
    detectionTime: '24 menit lalu',
    status: 'Bara Aktif Bawah Tanah',
    estimatedAreaHa: 26.0,
  },
  {
    id: 'HS-KTG-04',
    locationName: 'Zona Penyangga TN Sebangau',
    regency: 'Katingan',
    provinceCode: 'KALTENG',
    provinceName: 'Kalimantan Tengah',
    lat: -2.85,
    lng: 113.45,
    satellite: 'Aqua-MODIS',
    confidence: 88,
    brightnessTempK: 338,
    landType: 'Kubah Gambut Dalam (>3m)',
    detectionTime: '42 menit lalu',
    status: 'Pemadaman Regu MPA',
    estimatedAreaHa: 5.7,
  },
  {
    id: 'HS-KLB-01',
    locationName: 'Desa Sungai Pelang - Parit Haji Husin',
    regency: 'Ketapang',
    provinceCode: 'KALBAR',
    provinceName: 'Kalimantan Barat',
    lat: -1.94,
    lng: 109.98,
    satellite: 'SNPP-VIIRS',
    confidence: 95,
    brightnessTempK: 358,
    landType: 'Kubah Gambut Dalam (>3m)',
    detectionTime: '11 menit lalu',
    status: 'Kobaran Asap Tebal',
    estimatedAreaHa: 19.3,
  },
  {
    id: 'HS-KLB-02',
    locationName: 'Desa Limbung - Sekitar Bandara Supadio',
    regency: 'Kubu Raya',
    provinceCode: 'KALBAR',
    provinceName: 'Kalimantan Barat',
    lat: -0.15,
    lng: 109.41,
    satellite: 'Terra-MODIS',
    confidence: 92,
    brightnessTempK: 346,
    landType: 'Rawa Gambut Dangkal',
    detectionTime: '30 menit lalu',
    status: 'Pemadaman Regu MPA',
    estimatedAreaHa: 6.4,
  },
  {
    id: 'HS-KLB-03',
    locationName: 'Kec. Paloh Perbatasan Semak',
    regency: 'Sambas',
    provinceCode: 'KALBAR',
    provinceName: 'Kalimantan Barat',
    lat: 1.72,
    lng: 109.30,
    satellite: 'SNPP-VIIRS',
    confidence: 84,
    brightnessTempK: 332,
    landType: 'Semak Belukar Konsesi',
    detectionTime: '55 menit lalu',
    status: 'Pendinginan Gambut',
    estimatedAreaHa: 4.1,
  },
  {
    id: 'HS-KLB-04',
    locationName: 'Sungai Pinyuh KM 8',
    regency: 'Mempawah',
    provinceCode: 'KALBAR',
    provinceName: 'Kalimantan Barat',
    lat: 0.28,
    lng: 109.16,
    satellite: 'Aqua-MODIS',
    confidence: 89,
    brightnessTempK: 339,
    landType: 'Semak Belukar Konsesi',
    detectionTime: '1 jam lalu',
    status: 'Bara Aktif Bawah Tanah',
    estimatedAreaHa: 7.8,
  },
  {
    id: 'HS-KLS-01',
    locationName: 'Desa Kayu Bawang - Liang Anggang',
    regency: 'Banjar',
    provinceCode: 'KALSEL',
    provinceName: 'Kalimantan Selatan',
    lat: -3.44,
    lng: 114.70,
    satellite: 'SNPP-VIIRS',
    confidence: 94,
    brightnessTempK: 350,
    landType: 'Rawa Gambut Dangkal',
    detectionTime: '15 menit lalu',
    status: 'Bara Aktif Bawah Tanah',
    estimatedAreaHa: 11.2,
  },
  {
    id: 'HS-KLS-02',
    locationName: 'Kec. Bati-Bati Arah Pelaihari',
    regency: 'Tanah Laut',
    provinceCode: 'KALSEL',
    provinceName: 'Kalimantan Selatan',
    lat: -3.61,
    lng: 114.80,
    satellite: 'Terra-MODIS',
    confidence: 87,
    brightnessTempK: 336,
    landType: 'Semak Belukar Konsesi',
    detectionTime: '36 menit lalu',
    status: 'Kobaran Asap Tebal',
    estimatedAreaHa: 5.9,
  },
  {
    id: 'HS-KLS-03',
    locationName: 'Rawa Margasari - Candi Laras',
    regency: 'Tapin',
    provinceCode: 'KALSEL',
    provinceName: 'Kalimantan Selatan',
    lat: -2.86,
    lng: 115.04,
    satellite: 'SNPP-VIIRS',
    confidence: 93,
    brightnessTempK: 348,
    landType: 'Kubah Gambut Dalam (>3m)',
    detectionTime: '48 menit lalu',
    status: 'Bara Aktif Bawah Tanah',
    estimatedAreaHa: 13.0,
  },
  {
    id: 'HS-KTM-01',
    locationName: 'Perbatasan Hutan Tanaman Industri',
    regency: 'Paser',
    provinceCode: 'KALTIM',
    provinceName: 'Kalimantan Timur',
    lat: -1.78,
    lng: 116.05,
    satellite: 'SNPP-VIIRS',
    confidence: 86,
    brightnessTempK: 334,
    landType: 'Hutan Produksi Terbuka',
    detectionTime: '22 menit lalu',
    status: 'Pemadaman Regu MPA',
    estimatedAreaHa: 4.8,
  },
  {
    id: 'HS-KTM-02',
    locationName: 'Muara Kaman Hulu Sungai Belayan',
    regency: 'Kutai Kartanegara',
    provinceCode: 'KALTIM',
    provinceName: 'Kalimantan Timur',
    lat: -0.21,
    lng: 116.78,
    satellite: 'Terra-MODIS',
    confidence: 90,
    brightnessTempK: 341,
    landType: 'Rawa Gambut Dangkal',
    detectionTime: '1 jam lalu',
    status: 'Kobaran Asap Tebal',
    estimatedAreaHa: 9.5,
  },
  {
    id: 'HS-KTM-03',
    locationName: 'Kec. Kelay Pinggiran Konsesi',
    regency: 'Berau',
    provinceCode: 'KALTIM',
    provinceName: 'Kalimantan Timur',
    lat: 2.08,
    lng: 117.20,
    satellite: 'Aqua-MODIS',
    confidence: 82,
    brightnessTempK: 329,
    landType: 'Hutan Produksi Terbuka',
    detectionTime: '2 jam lalu',
    status: 'Pendinginan Gambut',
    estimatedAreaHa: 3.2,
  },
  {
    id: 'HS-KTR-01',
    locationName: 'Kec. Sebuku Jalur Logging Lama',
    regency: 'Nunukan',
    provinceCode: 'KALTARA',
    provinceName: 'Kalimantan Utara',
    lat: 4.10,
    lng: 117.12,
    satellite: 'SNPP-VIIRS',
    confidence: 81,
    brightnessTempK: 327,
    landType: 'Hutan Produksi Terbuka',
    detectionTime: '1 jam lalu',
    status: 'Pendinginan Gambut',
    estimatedAreaHa: 2.4,
  },
];

export const PEAT_FIRE_MECHANICS = [
  {
    stage: '01. Pengeringan Gambut Melalui Kanal',
    desc: 'Pembukaan kanal drainase industri menurunkan muka air tanah hingga >1 meter, membuat material gambut organik purba mengering bagai tumpukan arang mesiu.',
    hazardLevel: 'Pemicu Awal',
  },
  {
    stage: '02. Penyalaan di Permukaan (Surface Fire)',
    desc: 'Percikan api membakar semak belukar permukaan secara cepat lalu segera merembes ke bawah permukaan tanah melalui celah akar kering.',
    hazardLevel: 'Deteksi Satelit Mudah',
  },
  {
    stage: '03. Pembakaran Tanpa Lidah Api (Smoldering Underground)',
    desc: 'Api membakar gambut sedalam 0,5 hingga 3 meter di bawah permukaan dengan oksigen rendah. Mengeluarkan panas mencapai 600°C tanpa api terbuka terlihat.',
    hazardLevel: 'Sangat Mematikan',
  },
  {
    stage: '04. Pelepasan Kabut Asap Beracun & Gas Berbahaya',
    desc: 'Menghasilkan partikel ultra-halus PM2.5, Karbon Monoksida (CO), Metana, dan Polisiklik Aromatik Hidrokarbon yang menyebabkan krisis ISPA jutaan warga dan anak-anak.',
    hazardLevel: 'Kedaruratan Kesehatan',
  },
  {
    stage: '05. Ketahanan Luar Biasa terhadap Pemadaman',
    desc: 'Hujan deras biasa di permukaan seringkali gagal memadamkan api yang merayap di bawah tanah. Dibutuhkan teknik water-bombing masif dan suntik gambut bertekanan tinggi.',
    hazardLevel: 'Pemadaman Sulit',
  },
];

export const DEFORESTATION_STATS = {
  totalLostSince2000Ha: '9.420.000 Ha',
  remainingPrimaryForestPercent: '43%',
  peatlandDegradedPercent: '61%',
  annualDeforestationRateHa: '185.000 Ha/tahun',
  drivers: [
    { name: 'Monokultur Kelapa Sawit Skala Industri', share: 38, color: '#f59e0b' },
    { name: 'Pertambangan Batubara & Logam Terbuka', share: 27, color: '#ef4444' },
    { name: 'Kebakaran Gambut Berulang (Karhutla)', share: 21, color: '#ea580c' },
    { name: 'Infrastruktur Jalan & Perambahan Ilegal', share: 14, color: '#84cc16' },
  ],
};

export const TREE_SPECIES: TreeSpecies[] = [
  {
    id: 'ulin',
    name: 'Pohon Ulin (Kayu Besi Borneo)',
    latinName: 'Eusideroxylon zwageri',
    co2AbsorptionPerYearKg: 38,
    maturityYears: 100,
    indigenousUse: 'Tiang rumah adat lamin Dayak yang tahan ratusan tahun di air dan tanah rawa.',
    ecologicalRole: 'Pilar utama struktur kanopi hutan primer dan penahan erosi lereng terjal.',
    status: 'Rentan (IUCN Red List)',
  },
  {
    id: 'meranti',
    name: 'Meranti Merah Raksasa',
    latinName: 'Shorea leprosula',
    co2AbsorptionPerYearKg: 45,
    maturityYears: 60,
    indigenousUse: 'Bahan kano perahu sungai tradisional dan getah obat luka luar alami.',
    ecologicalRole: 'Pohon emergent yang dapat mencapai tinggi 60 meter, menjadi tempat sarang lebah madu hutan dan enggang.',
    status: 'Genting',
  },
  {
    id: 'tengkawang',
    name: 'Pohon Tengkawang (Mentega Hijau)',
    latinName: 'Shorea stenoptera',
    co2AbsorptionPerYearKg: 32,
    maturityYears: 25,
    indigenousUse: 'Buah tengkawang diolah menjadi mentega nabati lezat dan bahan kosmetik ramah hutan oleh ibu-ibu Dayak.',
    ecologicalRole: 'Sumber makanan utama primata, babi hutan, dan burung saat musim berbuah raya.',
    status: 'Hampir Terancam',
  },
  {
    id: 'gaharu',
    name: 'Pohon Gaharu Hutan',
    latinName: 'Aquilaria microcarpa',
    co2AbsorptionPerYearKg: 28,
    maturityYears: 20,
    indigenousUse: 'Gubal wangi aromaterapi sakral untuk upacara adat dan ritual doa leluhur.',
    ecologicalRole: 'Membentuk mikoriza tanah yang menyuburkan mikroba tanah gambut dataran.',
    status: 'Kritis Terancam Punah',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Mengapa memadamkan kebakaran di lahan gambut Kalimantan jauh lebih sulit daripada kebakaran hutan biasa?',
    options: [
      'Karena angin di Kalimantan bertiup terlalu kencang',
      'Karena api membakar lapisan gambut purba di bawah tanah (smoldering) hingga kedalaman beberapa meter',
      'Karena daun pohon di Kalimantan tahan terhadap air',
      'Karena tanah gambut tidak dapat dialiri air sungai',
    ],
    correctIndex: 1,
    explanation:
      'Tepat! Kebakaran gambut (smoldering subterranean fire) merambat tanpa nyala api terbuka di bawah permukaan tanah sedalam 1–3 meter. Air hujan ringan di permukaan seringkali tidak bisa menembus kedalaman ini.',
  },
  {
    id: 2,
    question: 'Berapa perkiraan usia hutan hujan tropis Kalimantan dibanding hutan Amazon di Amerika Selatan?',
    options: [
      'Hutan Kalimantan berusia 130 juta tahun (lebih tua dari Amazon yang berusia ~55 juta tahun)',
      'Hutan Kalimantan berusia sama dengan Amazon (sekitar 10 juta tahun)',
      'Hutan Amazon lebih tua 50 juta tahun dibanding Kalimantan',
      'Keduanya baru terbentuk setelah zaman es terakhir (12.000 tahun)',
    ],
    correctIndex: 0,
    explanation:
      'Benar! Hutan hujan Kalimantan berumur lebih dari 130 juta tahun, menjadikannya salah satu ekosistem darat tertua di bumi yang selamat melewati zaman dinosaurus.',
  },
  {
    id: 3,
    question: 'Mengapa Orangutan Kalimantan (Pongo pygmaeus) dijuluki "Petani Hutan" (Gardener of the Forest)?',
    options: [
      'Karena mereka suka menanam padi liar',
      'Karena mereka menyeleksi dahan kering untuk membuat sarang tidur',
      'Karena mereka menjelajah jauh dan menyebarkan biji buah-buahan besar hutan melalui kotorannya',
      'Karena mereka membantu warga menyiram bibit tanaman',
    ],
    correctIndex: 2,
    explanation:
      'Tepat sekali! Orangutan mengonsumsi ratusan jenis buah liar. Biji-biji besar yang tidak bisa disebarkan oleh burung dibawa di saluran cernanya dan dijatuhkan berkilo-kilometer jauhnya, meregenerasi hutan rimba secara alami.',
  },
  {
    id: 4,
    question: 'Apa fungsi utama "Kanal Drainase" yang sering dibuat di lahan gambut sebelum terjadi karhutla?',
    options: [
      'Untuk jalur wisata kano tradisional',
      'Untuk mengeringkan air rawa gambut alami agar sawit atau tanaman komersial dapat ditanam',
      'Untuk menyiram satwa liar saat musim kemarau',
      'Untuk menyimpan cadangan air hujan pemadam api',
    ],
    correctIndex: 1,
    explanation:
      'Tepat. Sawit dan akasia tidak bisa tumbuh di air rawa gambut yang basah, sehingga pengembang membuat parit kanalisasi masif untuk membuang air. Akibatnya kubah gambut mengering dan berubah jadi bahan bakar yang sangat mudah meledak terbakar.',
  },
  {
    id: 5,
    question: 'Apa nama kearifan lokal Masyarakat Adat Dayak yang menjaga zona hutan primer terlarang untuk dieksploitasi?',
    options: [
      'Tana Ulen',
      'Subak',
      'Sasi',
      'Panglima Laot',
    ],
    correctIndex: 0,
    explanation:
      'Benar! Tana Ulen adalah kawasan hutan larangan adat Dayak Kenyah/Kayan yang dijaga ketat. Tidak boleh ditebang sembarangan, hanya boleh dimanfaatkan untuk kepentingan bersama yang sangat mendesak.',
  },
];
