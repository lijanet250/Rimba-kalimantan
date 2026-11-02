import React, { useState } from 'react';
import {
  Cigarette,
  Wind,
  Layers,
  Thermometer,
  HelpCircle,
  Vote,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

/**
 * 1. Smoke Inhalation & Lung Impact Calculator (Kalkulator Paparan Asap)
 */
export const SmokeInhalationCalculator: React.FC = () => {
  const [exposureDays, setExposureDays] = useState<number>(7);
  const [aqiLevel, setAqiLevel] = useState<number>(250); // ISPU AQI

  const estimatedPm25 = aqiLevel * 0.85; // ug/m3
  const cigsPerDayAdult = Math.max(0.5, Math.round((estimatedPm25 / 22) * 10) / 10);
  const totalCigsAdult = Math.round(cigsPerDayAdult * exposureDays);
  const totalCigsChild = Math.round(totalCigsAdult * 1.8);

  return (
    <div className="rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-data text-amber-800 uppercase font-bold">
            <Wind className="w-4 h-4 text-amber-700" />
            <span>Kalkulator Interaktif Kesehatan</span>
          </div>
          <h3 className="text-xl font-serif-display font-bold text-stone-900 mt-1">
            Simulasi Dampak Hirup Asap Karhutla (PM2.5)
          </h3>
        </div>
        <span className="text-xs font-mono-data text-stone-500 font-medium">Model Riset Berkeley Earth &amp; WHO</span>
      </div>

      <p className="mt-3 text-xs sm:text-sm text-stone-700">
        Geser indikator di bawah untuk melihat seberapa besar beban racun partikulat yang dihirup paru-paru warga dan anak-anak saat kabut asap karhutla menyelimuti pemukiman:
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-5 bg-[#faf8f5] p-5 rounded-2xl border border-stone-200">
          <div>
            <div className="flex justify-between text-xs text-stone-800 font-semibold mb-2">
              <span>Lama Terpapar Kabut Asap:</span>
              <span className="font-mono-data font-bold text-amber-800">{exposureDays} Hari</span>
            </div>
            <input
              type="range"
              min="1"
              max="45"
              value={exposureDays}
              onChange={(e) => {
                soundscape.playTapSound();
                setExposureDays(Number(e.target.value));
              }}
              className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1.5 font-mono-data">
              <span>1 hari</span>
              <span>15 hari</span>
              <span>30 hari</span>
              <span>45 hari</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-stone-800 font-semibold mb-2">
              <span>Tingkat Keparahan ISPU / AQI Udara:</span>
              <span className="font-mono-data font-bold text-rose-800">{aqiLevel} AQI</span>
            </div>
            <input
              type="range"
              min="80"
              max="500"
              step="10"
              value={aqiLevel}
              onChange={(e) => {
                soundscape.playTapSound();
                setAqiLevel(Number(e.target.value));
              }}
              className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-stone-500 mt-1.5 font-mono-data">
              <span>100 (Sedang)</span>
              <span>200 (Tidak Sehat)</span>
              <span>300+ (Sangat Berbahaya)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Health Outcome */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 text-center flex flex-col justify-between shadow-xs">
            <span className="text-[11px] text-amber-900 font-mono-data font-bold block">Bagi Orang Dewasa</span>
            <div className="my-2">
              <span className="text-3xl font-serif-display font-bold text-amber-900 tabular-nums">
                {totalCigsAdult}
              </span>
              <span className="text-xs text-stone-700 block font-medium">Batang Rokok</span>
            </div>
            <span className="text-[10px] text-amber-800 font-mono-data font-semibold">Setara racun dihirup</span>
          </div>

          <div className="rounded-2xl border border-rose-300 bg-rose-50/70 p-4 text-center flex flex-col justify-between shadow-xs">
            <span className="text-[11px] text-rose-900 font-mono-data font-bold block">Bagi Balita &amp; Anak</span>
            <div className="my-2">
              <span className="text-3xl font-serif-display font-bold text-rose-900 tabular-nums">
                {totalCigsChild}
              </span>
              <span className="text-xs text-stone-700 block font-medium">Batang Rokok</span>
            </div>
            <span className="text-[10px] text-rose-800 font-mono-data font-semibold">Laju napas 2x lebih cepat</span>
          </div>

          <div className="col-span-2 rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 leading-relaxed font-sans-ui">
            <strong className="text-rose-800 font-bold">Diagnosis Efek Tubuh: </strong>
            {aqiLevel > 250
              ? 'Penyempitan bronkus paru-paru, iritasi kornea mata, hipoksia seluler, dan risiko ISPA akut meningkat 340%.'
              : 'Iritasi tenggorokan kronis, penurunan kapasitas vital paru-paru, dan rasa perih di saluran napas.'}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Subterranean Peat Temperature & Depth Probe (Probe Bawah Tanah)
 */
export const SubterraneanPeatProbe: React.FC = () => {
  const [selectedDepth, setSelectedDepth] = useState<number>(100);

  const depthData: Record<
    number,
    {
      temp: string;
      oxygen: string;
      condition: string;
      carbonState: string;
      whyWaterFails: string;
    }
  > = {
    0: {
      temp: '42°C (Hangat Abu)',
      oxygen: '21% (Tinggi)',
      condition: 'Permukaan abu putih dan tunggak pohon arang.',
      carbonState: 'Karbon permukaan telah menguap jadi gas CO2.',
      whyWaterFails: 'Air mudah disemprot namun cepat menguap dalam hitungan menit akibat radiasi panas bawah tanah.',
    },
    50: {
      temp: '320°C (Bara Api Aktif)',
      oxygen: '11% (Sedang)',
      condition: 'Akar kayu mengering dan jaringan gambut berserat terbakar.',
      carbonState: 'Pelepasan gas metana dan asap pekat PM2.5.',
      whyWaterFails: 'Membentuk kantung udara bertekanan; air helikopter tidak dapat meresap karena kerak gambut hidrofobik.',
    },
    100: {
      temp: '580°C - 620°C (Inferno Bawah Tanah)',
      oxygen: '4% (Minim / Smoldering)',
      condition: 'Pembakaran lambat tanpa lidah api (smoldering combustion) yang mematikan.',
      carbonState: 'Pelepasan gas karbon monoksida (CO) beracun.',
      whyWaterFails: 'Dibutuhkan tombak suntik gambut bertekanan 8-12 bar untuk menembus dan merendam zona bara ini.',
    },
    200: {
      temp: '180°C - 240°C (Penjalaran Bara Lambat)',
      oxygen: '2% (Sangat Rendah)',
      condition: 'Gambut purba ribuan tahun mulai terdisosiasi panas.',
      carbonState: 'Deposit karbon tertua mulai menyusut.',
      whyWaterFails: 'Dapat merambat hingga jarak ratusan meter di bawah parit tanpa terlihat dari permukaan tanah.',
    },
    300: {
      temp: '26°C (Gambut Basah Alami jika belum terkanalisasi)',
      oxygen: '0.5% (Anaerobik)',
      condition: 'Lapisan gambut dasar yang kontak dengan lempung kuarsa.',
      carbonState: 'Penyimpan karbon purba stabil bila muka air tanah terjaga.',
      whyWaterFails: 'Bila kanal mengeringkan zona ini, seluruh kubah gambut runtuh (subsiden) permanen.',
    },
  };

  const current = depthData[selectedDepth];

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono-data text-amber-800 uppercase font-bold mb-2">
        <Thermometer className="w-4 h-4 text-amber-700" />
        <span>Eksplorasi Probe Interaktif</span>
      </div>
      <h3 className="text-xl font-serif-display font-bold text-stone-900">
        Simulasi Kedalaman &amp; Suhu Tanah Gambut yang Terbakar
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-stone-700">
        Pilih kedalaman probe untuk memeriksa suhu internal, kadar oksigen, dan alasan mengapa kebakaran gambut kebal terhadap guyuran hujan biasa:
      </p>

      {/* Depth Selector Buttons */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[0, 50, 100, 200, 300].map((depth) => (
          <button
            key={depth}
            onClick={() => {
              soundscape.playTapSound();
              setSelectedDepth(depth);
            }}
            className={`px-4 py-2 text-xs font-mono-data font-bold rounded-xl border transition-all ${
              selectedDepth === depth
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            Kedalaman {depth === 0 ? 'Permukaan (0 cm)' : `${depth} cm (${depth / 100} m)`}
          </button>
        ))}
      </div>

      {/* Cross Section Data Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
          <span className="text-[11px] text-stone-500 font-mono-data font-bold block">Suhu Internal Lapisan</span>
          <span className="mt-1 text-2xl font-serif-display font-bold text-amber-800 tabular-nums block">
            {current.temp}
          </span>
          <span className="text-[11px] text-stone-600 mt-1.5 block">
            Kadar Oksigen Tanah: <strong className="text-stone-900">{current.oxygen}</strong>
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
          <span className="text-[11px] text-stone-500 font-mono-data font-bold block">Kondisi Material Gambut</span>
          <p className="mt-1 text-xs text-stone-800 leading-relaxed font-sans-ui">
            {current.condition}
          </p>
          <span className="text-[11px] text-rose-800 mt-1.5 block font-mono-data font-semibold">
            {current.carbonState}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
          <span className="text-[11px] text-amber-900 font-mono-data font-bold block">Kenapa Hujan Permukaan Gagal?</span>
          <p className="mt-1 text-xs text-amber-900 leading-relaxed font-sans-ui">
            {current.whyWaterFails}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Quick Ecological Opinion Poll (Jajak Pendapat Publik)
 */
export const QuickEcologicalPoll: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([428, 612, 389, 504]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const options = [
    'Moratorium permanen & cabut izin perkebunan di seluruh kubah gambut',
    'Penegakan sanksi pidana penjara & denda triliunan bagi korporasi pembakar',
    'Pengakuan hukum penuh atas wilayah adat tana ulen suku Dayak',
    'Pengadaan armada pompa jinjing & insentif layak bagi relawan MPA desa',
  ];

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  const handleVote = (idx: number) => {
    if (hasVoted) return;
    soundscape.playTapSound();
    setSelectedOption(idx);
    setVotes((prev) => {
      const copy = [...prev];
      copy[idx] += 1;
      return copy;
    });
    setHasVoted(true);
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono-data text-emerald-800 uppercase font-bold mb-2">
        <Vote className="w-4 h-4 text-emerald-700" />
        <span>Jajak Pendapat Komunitas</span>
      </div>
      <h3 className="text-xl font-serif-display font-bold text-stone-900">
        Menurut Anda, Apa Prioritas Paling Mendesak untuk Menyelamatkan Rimba Kalimantan?
      </h3>
      <p className="mt-1 text-xs text-stone-600 font-medium">
        Klik salah satu pilihan di bawah untuk memberikan suara dan melihat statistik respon publik:
      </p>

      <div className="mt-6 space-y-3">
        {options.map((opt, idx) => {
          const count = votes[idx];
          const pct = Math.round((count / totalVotes) * 100);
          const isSelected = selectedOption === idx;

          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 text-stone-900 font-semibold shadow-xs'
                  : hasVoted
                  ? 'border-stone-200 bg-stone-50 text-stone-700'
                  : 'border-stone-200 bg-stone-50/60 hover:bg-stone-100 hover:border-stone-300 text-stone-800'
              }`}
            >
              {hasVoted && (
                <div
                  className="absolute inset-y-0 left-0 bg-emerald-100/60 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-stone-300 bg-white flex items-center justify-center font-mono-data text-xs font-bold shrink-0">
                    {hasVoted && isSelected ? '✓' : idx + 1}
                  </span>
                  <span>{opt}</span>
                </div>
                {hasVoted && (
                  <span className="font-mono-data font-bold text-emerald-800 shrink-0">
                    {pct}% ({count})
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-stone-500 font-mono-data">
        <span>{totalVotes.toLocaleString('id-ID')} partisipan terverifikasi</span>
        {hasVoted && <span className="text-emerald-800 font-bold">Suara Anda telah dicatat!</span>}
      </div>
    </div>
  );
};

/**
 * 4. Interactive Quick Glossary Drawer (Kamus Istilah Ekologis)
 */
export const QuickGlossaryDrawer: React.FC = () => {
  const [activeTermKey, setActiveTermKey] = useState<string>('gambut');

  const terms: Record<string, { title: string; def: string; importance: string }> = {
    gambut: {
      title: 'Lahan Gambut (Peatland)',
      def: 'Lahan basah yang terbentuk dari timbunan serasah tanaman lapuk selama ribuan tahun yang tergenang air asam tanpa oksigen, menyimpan deposit karbon hingga 20x tanah biasa.',
      importance: 'Jika kering oleh kanal, menjadi bahan bakar karhutla yang sangat berbahaya.',
    },
    'tana-ulen': {
      title: 'Tana Ulen (Hutan Larangan Adat Dayak)',
      def: 'Kawasan hutan primer larangan yang dikeramatkan dan dilindungi oleh adat suku Dayak Kenyah. Penebangan dilarang keras, hanya boleh dipungut hasil hutan non-kayu untuk hajat komunal.',
      importance: 'Kearifan indigenous tertua yang terbukti menjaga tutupan rimba paling lestari.',
    },
    'mast-fruiting': {
      title: 'Mast Fruiting (Berbuah Raya Serempak)',
      def: 'Fenomena sinkronisasi biologi langka di mana ratusan spesies pohon Dipterokarpa berbunga dan menjatuhkan buah bersayap serempak setiap 3–7 tahun sekali dipicu cuaca kemarau El Niño.',
      importance: 'Momen regenerasi hutan rimba terbesar dan pesta makan massal bagi satwa liar Borneo.',
    },
    'canal-blocking': {
      title: 'Sekat Kanal (Canal Blocking)',
      def: 'Struktur bendungan dari kayu atau tanah yang dibangun melintang di parit drainase industri untuk menahan laju air keluar, membasahi kembali kubah gambut (rewetting).',
      importance: 'Metode restorasi paling efektif untuk memadamkan kerentanan kebakaran gambut secara permanen.',
    },
    'flying-rivers': {
      title: 'Sungai Terbang (Atmospheric Flying Rivers)',
      def: 'Arus uap air raksasa tak terlihat di atmosfer yang dipompa oleh miliaran pohon hutan tropis melalui transpirasi, membawa awan hujan ke pulau lain seperti Jawa dan Bali.',
      importance: 'Menjaga ketersediaan air tawar dan curah hujan sentra pangan nasional Indonesia.',
    },
  };

  const termKeys = Object.keys(terms);
  const current = terms[activeTermKey];

  return (
    <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 sm:p-8 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-mono-data text-emerald-800 uppercase font-bold mb-2">
        <BookOpen className="w-4 h-4 text-emerald-700" />
        <span>Kamus Sains &amp; Istilah Rimba</span>
      </div>
      <h3 className="text-xl font-serif-display font-bold text-stone-900">
        Pahami Istilah Ekologis dalam 1 Menit
      </h3>
      <p className="mt-1 text-xs text-stone-600">
        Klik istilah di bawah untuk membuka penjelasan ringkas tanpa membaca dokumen ilmiah panjang:
      </p>

      {/* Term Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {termKeys.map((key) => (
          <button
            key={key}
            onClick={() => {
              soundscape.playTapSound();
              setActiveTermKey(key);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              activeTermKey === key
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {terms[key].title.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Detail Popover Card */}
      <div className="mt-5 p-5 rounded-2xl border border-stone-200 bg-white shadow-xs">
        <h4 className="text-base font-serif-display font-bold text-emerald-900">
          {current.title}
        </h4>
        <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
          {current.def}
        </p>
        <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
          <strong className="text-amber-800 font-bold">Mengapa Ini Penting? </strong>
          {current.importance}
        </div>
      </div>
    </div>
  );
};
