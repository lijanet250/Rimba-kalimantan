import React, { useState } from 'react';
import { IMAGES, DEFORESTATION_STATS } from '../data/kalimantanData';
import { Eye, PieChart, Sliders, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

export const NatureConditionSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Ecological policy projection simulator
  const [moratoriumEnforcement, setMoratoriumEnforcement] = useState<number>(75);
  const [peatRewettingTarget, setPeatRewettingTarget] = useState<number>(60);

  const projectedLossAvoidedHa = Math.round(
    (moratoriumEnforcement * 1400) + (peatRewettingTarget * 1100)
  );
  const projectedCarbonAvoidedMt = Math.round(
    (projectedLossAvoidedHa * 420) / 1000
  );
  const projectedForestSurvival = Math.min(
    78,
    Math.round(43 + (moratoriumEnforcement * 0.22) + (peatRewettingTarget * 0.18))
  );

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - container.left;
    const percentage = Math.max(0, Math.min(100, (offset / container.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section id="kondisi-alam" className="relative bg-[#faf8f5] py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-3">
            <span>Kondisi Ekologi 2026</span>
            <span aria-hidden="true">·</span>
            <span>Analisis Citra Satelit &amp; Lapangan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
            Keadaan Hutan Kalimantan Saat Ini: Jejak Luka di Jantung Khatulistiwa
          </h2>
          <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
            Dari 54 juta hektar luas daratan pulau Kalimantan, tutupan hutan primer alami kini hanya tersisa sekitar <strong>43% (± 23,2 juta hektar)</strong>. Lebih dari 9,4 juta hektar telah lenyap sejak tahun 2000 akibat kombinasi konversi perkebunan monokultur, lubang tambang batubara terbuka, dan kebakaran gambut berulang.
          </p>
        </div>

        {/* 4 Summary Metric Badges (Bright Alabaster Style) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-stone-500 font-mono-data font-bold block">Hutan Primer Tersisa</span>
            <span className="text-2xl font-serif-display font-bold text-emerald-800 tabular-nums mt-1 block">
              43% (23,2 Jt Ha)
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Terkonsentrasi di Heart of Borneo</span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-stone-500 font-mono-data font-bold block">Lahan Terdegradasi</span>
            <span className="text-2xl font-serif-display font-bold text-rose-800 tabular-nums mt-1 block">
              9,42 Juta Ha
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Kehilangan sejak tahun 2000</span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-stone-500 font-mono-data font-bold block">Gambut Kritis</span>
            <span className="text-2xl font-serif-display font-bold text-amber-800 tabular-nums mt-1 block">
              61% Gambut
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Terdampak kanalisasi drainase</span>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-stone-500 font-mono-data font-bold block">Lubang Bekas Tambang</span>
            <span className="text-2xl font-serif-display font-bold text-stone-900 tabular-nums mt-1 block">
              1.700+ Void
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Terbengkalai tanpa reklamasi</span>
          </div>
        </div>

        {/* Interactive Before/After Visual Comparison (Bright Clean Container) */}
        <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                Visualisasi Komparasi Bentang Alam
              </span>
              <h3 className="text-xl font-serif-display font-bold text-stone-900 mt-0.5">
                Rimba Primordial vs Fragmentasi Industri
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              Geser penanda di tengah untuk membandingkan zona hutan utuh dengan area konsesi industri.
            </p>
          </div>

          {/* Interactive Split View Container */}
          <div
            className="relative h-80 sm:h-[450px] w-full overflow-hidden rounded-2xl cursor-ew-resize select-none border border-stone-300 shadow-inner"
            onMouseMove={(e) => {
              if (isDragging || e.buttons === 1) handleSliderMove(e);
            }}
            onTouchMove={handleSliderMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            {/* Background: Deforested side with generated high-res image */}
            <img
              src={IMAGES.riverDeforestation}
              alt="Perambahan Hutan dan Konsesi Industri Kalimantan"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute top-4 right-4 bg-white/95 border border-rose-300 px-3.5 py-1.5 rounded-xl text-xs font-mono-data text-rose-800 font-bold shadow-sm pointer-events-none">
              Sisi Kanan: Deforestasi &amp; Tambang
            </div>

            {/* Foreground: Pristine side (Clipped) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={IMAGES.heroRainforest}
                alt="Hutan Primer Kalimantan yang Utuh"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover object-center max-w-none"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute inset-0 bg-emerald-900/10" />
              <div className="absolute top-4 left-4 bg-white/95 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-mono-data text-emerald-800 font-bold shadow-sm pointer-events-none">
                Sisi Kiri: Rimba Alami Utuh
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white">
                ⇄
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-600 font-mono-data font-semibold">
            <span>Rimba Alami ({sliderPos.toFixed(0)}%)</span>
            <span>Area Terdegradasi ({(100 - sliderPos).toFixed(0)}%)</span>
          </div>
        </div>

        {/* Drivers of Deforestation & Key 2026 Hotspots */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Driver Breakdown */}
          <div className="lg:col-span-6 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
            <span className="text-xs uppercase tracking-wider text-amber-800 font-mono-data font-bold block">
              Penyebab Utama Kehilangan Tutupan Hutan
            </span>
            <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-1">
              Faktor Pendorong Deforestasi
            </h3>
            <p className="text-xs text-stone-600 mt-2">
              Berdasarkan riset terintegrasi Kementerian LHK dan Global Forest Watch:
            </p>

            <div className="mt-6 space-y-4">
              {DEFORESTATION_STATS.drivers.map((driver, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-800 font-bold">{driver.name}</span>
                    <span className="font-mono-data font-bold tabular-nums text-stone-900">
                      {driver.share}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${driver.share}%`, backgroundColor: driver.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <span>Kehilangan Kumulatif Sejak 2000:</span>
              <span className="text-rose-800 font-mono-data font-bold text-sm">
                {DEFORESTATION_STATS.totalLostSince2000Ha}
              </span>
            </div>
          </div>

          {/* 3 Urgent Ecological Pressure Points 2026 */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono-data text-rose-800 font-bold mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Titik Kritis 1: Daerah Aliran Sungai</span>
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                DAS Kapuas &amp; Pendangkalan Danau Sentarum
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Aktivitas tambang emas liar (PETI) dengan merkuri di hulu sungai dan penebangan bukit menyebabkan sungai terpanjang di Indonesia mengalami sedimentasi parah, memicu banjir bandang musiman yang melumpuhkan kota Sintang dan Putussibau.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono-data text-amber-800 font-bold mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Titik Kritis 2: Penyangga Ibu Kota Baru</span>
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Koridor Ekologi Satwa IKN Nusantara
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Pembangunan ibu kota baru di Penajam Paser Utara dan Kutai Kartanegara menghadapi tantangan besar menjaga koridor hijau hutan alam. Teluk Balikpapan harus dipertahankan agar habitat Pesut Mahakam yang tersisa kurang dari 80 ekor dan Bekantan pesisir tidak terputus total.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono-data text-stone-700 font-bold mb-1">
                <AlertTriangle className="w-4 h-4 text-stone-600" />
                <span>Titik Kritis 3: Warisan Tambang Batubara</span>
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Ribuan Void Tambang Terbuka Tanpa Reklamasi
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Lebih dari 1.700 lubang bekas tambang batubara (void) yang ditinggalkan tanpa reklamasi terisi air asam tambang beracun di Kalimantan Timur dan Selatan, mengancam air tanah dan menelan korban jiwa warga sekitar.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Ecological Scenario Simulator */}
        <div className="mt-16 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-2">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>Simulator Proyeksi Kebijakan 2040</span>
            </div>
            <h3 className="text-2xl font-serif-display font-bold text-stone-900">
              Apa yang Terjadi Jika Kita Bertindak Sekarang?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-700">
              Uji skenario penegakan hukum moratorium pembukaan sawit primer dan skala pembasahan kanal gambut untuk melihat proyeksi penyelamatan hutan:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Console */}
            <div className="lg:col-span-6 space-y-6 bg-[#faf8f5] p-6 rounded-2xl border border-stone-200">
              <div>
                <div className="flex justify-between text-xs text-stone-900 font-bold mb-2">
                  <span>Ketegasan Moratorium Sawit &amp; Tambang:</span>
                  <span className="font-mono-data font-bold text-emerald-800">{moratoriumEnforcement}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={moratoriumEnforcement}
                  onChange={(e) => {
                    soundscape.playTapSound();
                    setMoratoriumEnforcement(Number(e.target.value));
                  }}
                  className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="text-[11px] text-stone-500 mt-1.5 block">
                  Penegakan sanksi cabut izin konsesi di hutan primer &amp; gambut lindung.
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-stone-900 font-bold mb-2">
                  <span>Target Sekat Kanal &amp; Pembasahan Gambut:</span>
                  <span className="font-mono-data font-bold text-amber-800">{peatRewettingTarget}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={peatRewettingTarget}
                  onChange={(e) => {
                    soundscape.playTapSound();
                    setPeatRewettingTarget(Number(e.target.value));
                  }}
                  className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <span className="text-[11px] text-stone-500 mt-1.5 block">
                  Pembangunan sekat kanal hidrologis untuk membasahi kembali kubah gambut rawan terbakar.
                </span>
              </div>
            </div>

            {/* Dynamic Results Display */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-5 text-center shadow-xs">
                <span className="text-[11px] text-stone-600 font-mono-data font-bold block">Hutan Terselamatkan</span>
                <span className="mt-2 text-2xl font-serif-display font-bold text-emerald-800 tabular-nums block">
                  +{projectedLossAvoidedHa.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-stone-500 block mt-1 font-medium">Hektar per tahun</span>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-5 text-center shadow-xs">
                <span className="text-[11px] text-stone-600 font-mono-data font-bold block">Emisi CO2 Dicegah</span>
                <span className="mt-2 text-2xl font-serif-display font-bold text-amber-800 tabular-nums block">
                  {projectedCarbonAvoidedMt.toLocaleString('id-ID')} Mt
                </span>
                <span className="text-[10px] text-stone-500 block mt-1 font-medium">Karbon tak terlepas</span>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-5 text-center shadow-xs">
                <span className="text-[11px] text-stone-600 font-mono-data font-bold block">Proyeksi Tutupan 2040</span>
                <span className="mt-2 text-2xl font-serif-display font-bold text-emerald-900 tabular-nums block">
                  {projectedForestSurvival}%
                </span>
                <span className="text-[10px] text-stone-500 block mt-1 font-medium">Kondisi stabil bertahan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mengapa Kalimantan Membutuhkan Air Bersih (Paradoks Pulau Seribu Sungai) */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-blue-800 font-mono-data font-bold mb-2">
              <span>Krisis Sumber Daya Air</span>
              <span aria-hidden="true">·</span>
              <span>Paradoks Pulau Seribu Sungai</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
              Mengapa Kalimantan Sangat Membutuhkan Air Bersih?
            </h3>
            <p className="mt-3 text-sm text-stone-700 leading-relaxed font-sans-ui">
              Kalimantan dikelilingi sungai-sungai terpanjang di Nusantara—Sungai Kapuas (1.143 km), Mahakam (980 km), dan Barito (909 km). Namun di balik bentang perairan yang melimpah, jutaan rakyat Kalimantan justru menjerit mengalami krisis air bersih layak minum akibat pencemaran masif dan rusaknya spons gambut alami:
            </p>
          </div>

          {/* 4 Core Water Crisis Reasons */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-rose-700 uppercase block mb-1">
                Pencemar 01
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Limbah Merkuri Tambang Emas Liar (PETI)
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Ribuan rakit tambang emas tanpa izin di hulu sungai Kapuas dan Melawi menggunakan merkuri (raksa) cair untuk mengikat butiran emas, lalu membuang limbah logam berat langsung ke aliran sungai. Air yang dulunya diminum langsung kini beracun dan memicu kerusakan ginjal serta sindrom Minamata.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-amber-800 uppercase block mb-1">
                Pencemar 02
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Air Asam Tambang Batubara (Acid Mine Drainage)
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Lebih dari 1.700 lubang tambang terbuka (void) di Kaltim dan Kalsel menghasilkan air asam beracun dengan pH ekstrem (2–3) yang kaya sulfat, besi, dan mangan. Saat hujan lebat, air asam meluap merembes ke air tanah dan mematikan ribuan sumur warga sekitar.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-blue-800 uppercase block mb-1">
                Pencemar 03
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Intrusi Air Laut Asin saat Kemarau (Rob)
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Saat hutan hulu gundul dan kubah gambut mengering, debit air sungai anjlok saat kemarau. Akibatnya, air laut dari muara merangsek puluhan kilometer ke hulu kota Pontianak dan Banjarmasin, membuat intake PDAM payau dan air keran warga asin berhari-hari.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-emerald-800 uppercase block mb-1">
                Pencemar 04
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Air Gambut Asam Alami &amp; Lumpur Erosi
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Sebagian besar air permukaan di dataran rendah adalah air gambut berwarna cokelat kemerahan pekat asam (pH 3–4) yang membutuhkan teknologi koagulasi mahal. Tanpa instalasi air bersih, warga terpaksa mengonsumsi air keruh yang memicu diare dan penyakit kulit.
              </p>
            </div>
          </div>

          {/* Interactive Water Sample Tester Simulator */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 p-6 sm:p-8 shadow-xs">
            <span className="text-xs uppercase font-mono-data text-blue-800 font-bold block mb-1">
              Simulasi Laboratorium Kualitas Air
            </span>
            <h4 className="text-lg sm:text-xl font-serif-display font-bold text-stone-900">
              Uji Kelayakan Sampel Air di Berbagai Wilayah Kalimantan
            </h4>
            <p className="text-xs text-stone-600 mt-1">
              Pilih salah satu sumber air di bawah untuk memeriksa parameter pH, kandungan logam berat, dan kelayakannya bagi 16 juta penduduk:
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200">
                <span className="text-xs text-stone-500 font-mono-data block">Sampel 1: Air Hulu Heart of Borneo</span>
                <span className="text-lg font-serif-display font-bold text-emerald-800 mt-1 block">pH 6.8 - 7.2 (Sangat Jernih)</span>
                <p className="text-xs text-stone-600 mt-1">
                  Air pegunungan murni berkat kanopi hutan Dipterokarpa yang lebat. Layak diminum langsung. <strong>Status: Sangat Layak</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-300">
                <span className="text-xs text-rose-700 font-mono-data font-bold block">Sampel 2: Air Sungai Hilir Tambang PETI</span>
                <span className="text-lg font-serif-display font-bold text-rose-800 mt-1 block">Merkuri &gt;0.05 mg/L (Beracun)</span>
                <p className="text-xs text-stone-600 mt-1">
                  Tercemar senyawa raksa (Hg) pemisah emas. Mengendap di ikan konsumsi warga. <strong>Status: Berbahaya / Beracun</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-300">
                <span className="text-xs text-amber-800 font-mono-data font-bold block">Sampel 3: Air Void Tambang Batubara</span>
                <span className="text-lg font-serif-display font-bold text-amber-900 mt-1 block">pH 2.8 (Asam Ekstrem)</span>
                <p className="text-xs text-stone-600 mt-1">
                  Kaya besi terlarut dan asam sulfat. Menyebabkan iritasi lambung parah. <strong>Status: Tidak Layak Konsumsi</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
