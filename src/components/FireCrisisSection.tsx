import React, { useState } from 'react';
import { HOTSPOT_PROVINCES, PEAT_FIRE_MECHANICS, IMAGES } from '../data/kalimantanData';
import { Flame, Wind, AlertTriangle, Layers, Activity, Volume2 } from 'lucide-react';
import { SmokeInhalationCalculator, SubterraneanPeatProbe } from './InteractiveMicroWidgets';
import { HotspotRadarMap } from './HotspotRadarMap';
import { soundscape } from '../utils/audioSynth';

interface FireCrisisSectionProps {
  isWildfireSoundPlaying: boolean;
  onToggleWildfireSound: () => void;
}

export const FireCrisisSection: React.FC<FireCrisisSectionProps> = ({
  isWildfireSoundPlaying,
  onToggleWildfireSound,
}) => {
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('KALTENG');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(2);

  const activeProvince =
    HOTSPOT_PROVINCES.find((p) => p.code === selectedProvinceCode) || HOTSPOT_PROVINCES[0];

  const totalHotspotsToday = HOTSPOT_PROVINCES.reduce((sum, p) => sum + p.hotspotsToday, 0);
  const totalHighConfidence = HOTSPOT_PROVINCES.reduce((sum, p) => sum + p.highConfidence, 0);

  return (
    <section id="krisis-karhutla" className="relative bg-[#fcfaf7] py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-mono-data font-bold mb-3">
              <Flame className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>Sistem Pemantauan Karhutla Terkini</span>
              <span aria-hidden="true">·</span>
              <span>Satelit Terra/Aqua &amp; SNPP VIIRS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
              Krisis Kebakaran Hutan &amp; Lahan Gambut Kalimantan
            </h2>
            <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
              Saat musim kemarau tiba, ribuan hektar gambut yang telah dikeringkan kanal berubah menjadi tumpukan mesiu raksasa. Api merambat di bawah permukaan tanah sedalam beberapa meter, memuntahkan kabut asap karsinogenik yang mencekik jutaan penduduk.
            </p>
          </div>

          {/* Sound alert control */}
          <button
            onClick={onToggleWildfireSound}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold tracking-wide transition-all whitespace-nowrap shrink-0 shadow-xs ${
              isWildfireSoundPlaying
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-400'
            }`}
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>{isWildfireSoundPlaying ? 'Hentikan Simulasi Deru Api' : 'Dengarkan Simulasi Deru Api'}</span>
          </button>
        </div>

        {/* High-Impact Visual Banner */}
        <div className="mt-12 relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-sm">
          <div className="h-72 sm:h-96 w-full relative">
            <img
              src={IMAGES.wildfirePeat}
              alt="Kebakaran Lahan Gambut Kalimantan di Malam Hari"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 border border-rose-300 px-3.5 py-1.5 rounded-lg text-xs font-mono-data text-rose-800 font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>STATUS SIAGA MERAH: DARURAT ASAP</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-300 font-mono-data font-bold">
                  Dokumentasi Foto Udara
                </p>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white">
                  Urat-Urat Api di Dalam Kubah Gambut yang Kering
                </h3>
                <p className="text-xs text-stone-200 max-w-xl mt-1">
                  Kebakaran gambut tidak padam oleh hembusan angin; api membakar cadangan karbon purba di bawah tanah dan dapat bertahan hingga berbulan-bulan.
                </p>
              </div>

              {/* Total Aggregate Counter (Bright Card) */}
              <div className="bg-white/95 border border-stone-200 p-4 rounded-2xl shrink-0 text-right shadow-md">
                <span className="text-[11px] uppercase tracking-wider text-stone-600 font-mono-data font-bold block">
                  Total Titik Panas Hari Ini
                </span>
                <span className="text-2xl sm:text-3xl font-serif-display font-bold text-amber-700 tabular-nums">
                  {totalHotspotsToday.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-rose-700 block font-mono-data font-semibold">
                  {totalHighConfidence} Kategori High Confidence (&gt;80%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Active Fire Points Map & Satellite Telemetry Radar */}
        <HotspotRadarMap />

        {/* Hotspot Radar by Province (Bright Luminous Theme) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Province List & Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-lg font-serif-display font-bold text-stone-900 mb-2">
              Sebaran Titik Panas per Provinsi
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Klik salah satu provinsi untuk melihat rincian kabupaten terdampak, indeks kualitas udara (ISPU), dan tingkat resiko:
            </p>

            <div className="space-y-2.5">
              {HOTSPOT_PROVINCES.map((prov) => (
                <button
                  key={prov.code}
                  onClick={() => {
                    soundscape.playTapSound();
                    setSelectedProvinceCode(prov.code);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                    selectedProvinceCode === prov.code
                      ? 'border-amber-500 bg-amber-50/80 shadow-sm'
                      : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-stone-900">{prov.name}</span>
                      <span className="text-[11px] font-mono-data text-stone-500">({prov.code})</span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      ISPU AQI: <span className="font-bold text-stone-900">{prov.ispuAqi}</span> ·{' '}
                      <span
                        className={
                          prov.airQualityStatus === 'Sangat Tidak Sehat'
                            ? 'text-purple-800 font-bold'
                            : prov.airQualityStatus === 'Tidak Sehat'
                            ? 'text-rose-700 font-bold'
                            : prov.airQualityStatus === 'Sedang'
                            ? 'text-amber-800 font-semibold'
                            : 'text-emerald-800 font-bold'
                        }
                      >
                        {prov.airQualityStatus}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-serif-display font-bold text-amber-700 tabular-nums">
                      {prov.hotspotsToday}
                    </span>
                    <span className="text-[10px] text-stone-500 block font-mono-data font-medium">titik panas</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Province Detail Console (Bright White Card) */}
          <div className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-mono-data text-amber-800 uppercase tracking-wider font-bold block">
                    Wilayah Terpilih
                  </span>
                  <h4 className="text-2xl font-serif-display font-bold text-stone-900">
                    {activeProvince.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono-data text-stone-500 block">Koordinat Pusat</span>
                  <span className="text-xs font-mono-data text-emerald-800 font-bold">
                    {activeProvince.coordinates.lat}° S, {activeProvince.coordinates.lng}° E
                  </span>
                </div>
              </div>

              {/* Status Metric Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#faf8f5] p-4 border border-stone-200">
                  <span className="text-xs text-stone-500 block font-mono-data font-medium">Deteksi Hari Ini</span>
                  <span className="mt-1 text-2xl font-serif-display font-bold text-amber-700 tabular-nums">
                    {activeProvince.hotspotsToday}
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Kemarin: {activeProvince.hotspotsYesterday}
                  </span>
                </div>

                <div className="rounded-2xl bg-[#faf8f5] p-4 border border-stone-200">
                  <span className="text-xs text-stone-500 block font-mono-data font-medium">High Confidence</span>
                  <span className="mt-1 text-2xl font-serif-display font-bold text-rose-700 tabular-nums">
                    {activeProvince.highConfidence}
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Keyakinan &gt;80%
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-2xl bg-[#faf8f5] p-4 border border-stone-200">
                  <span className="text-xs text-stone-500 block font-mono-data font-medium">Indeks Udara (ISPU)</span>
                  <span
                    className={`mt-1 text-2xl font-serif-display font-bold tabular-nums ${
                      activeProvince.ispuAqi > 200
                        ? 'text-purple-800'
                        : activeProvince.ispuAqi > 150
                        ? 'text-rose-700'
                        : activeProvince.ispuAqi > 100
                        ? 'text-amber-700'
                        : 'text-emerald-800'
                    }`}
                  >
                    {activeProvince.ispuAqi}
                  </span>
                  <span className="text-[11px] text-stone-700 block mt-0.5 font-bold">
                    {activeProvince.airQualityStatus}
                  </span>
                </div>
              </div>

              {/* Affected Regencies */}
              <div className="mt-6">
                <span className="text-xs font-bold text-stone-700 font-mono-data uppercase block mb-2">
                  Kabupaten Terbanyak Titik Api:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProvince.mainAffectedRegencies.map((regency, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-800"
                    >
                      Kabupaten {regency}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health Advisory */}
              <div className="mt-6 p-4 rounded-2xl border border-amber-300 bg-amber-50/70 text-xs text-stone-800 leading-relaxed">
                <span className="font-bold text-amber-900 block mb-1">
                  Peringatan Dampak Kesehatan:
                </span>
                {activeProvince.ispuAqi > 150
                  ? 'Kadar partikulat PM2.5 melampaui batas aman WHO. Kelompok rentan, balita, dan lansia diwajibkan menggunakan masker respirator N95 serta membatasi aktivitas luar ruangan. Bahaya ISPA akut mengancam.'
                  : 'Kualitas udara dalam batas moderat, namun masyarakat di dekat kubah gambut disarankan tetap waspada terhadap asap kiriman arah mata angin.'}
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Smoke Inhalation Calculator */}
        <div className="mt-14">
          <SmokeInhalationCalculator />
        </div>

        {/* Subterranean Peat Fire Anatomy Simulator */}
        <div className="mt-14 pt-14 border-t border-stone-200">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-mono-data font-bold mb-2">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Anatomi Kebakaran Bawah Tanah</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
              Mengapa Kebakaran Gambut Sangat Sulit Dipadamkan?
            </h3>
            <p className="mt-2 text-sm text-stone-700">
              Berbeda dari kebakaran hutan daun biasa, kebakaran gambut terjadi di bawah tanah dalam kondisi minim oksigen (smoldering combustion). Klik tiap tahapan berikut untuk memahami siklusnya:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {PEAT_FIRE_MECHANICS.map((stage, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundscape.playTapSound();
                  setActiveStageIndex(idx);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  activeStageIndex === idx
                    ? 'border-amber-600 bg-amber-50 shadow-sm'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono-data text-stone-500 mb-2">
                  <span className="text-amber-800 font-bold">Fase 0{idx + 1}</span>
                  <span className="text-[10px] text-stone-500 font-medium">{stage.hazardLevel}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-2">
                  {stage.stage.split('. ')[1]}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Stage Deep Dive */}
          <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono-data text-amber-800 uppercase tracking-wider font-bold block">
                  Penjelasan Mendalam Fase {activeStageIndex + 1}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900 mt-1">
                  {PEAT_FIRE_MECHANICS[activeStageIndex].stage}
                </h4>
              </div>
              <span className="bg-amber-100 border border-amber-300 text-amber-900 text-xs px-3 py-1.5 rounded-lg font-mono-data font-bold shrink-0">
                {PEAT_FIRE_MECHANICS[activeStageIndex].hazardLevel}
              </span>
            </div>

            <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
              {PEAT_FIRE_MECHANICS[activeStageIndex].desc}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 text-xs text-stone-700 flex items-center justify-between flex-wrap gap-2">
              <span>
                💡 <strong className="text-stone-900">Solusi Kunci:</strong> Pembasahan kembali gambut (Rewetting) melalui penyekatan kanal (Canal Blocking) dan revegetasi spesies pohon rawa lokal.
              </span>
              <span className="text-emerald-800 font-mono-data font-bold">Badan Restorasi Gambut &amp; Mangrove (BRGM)</span>
            </div>
          </div>

          {/* Embedded Subterranean Peat Temperature Probe */}
          <div className="mt-8">
            <SubterraneanPeatProbe />
          </div>
        </div>
      </div>
    </section>
  );
};
