import React, { useState } from 'react';
import { UNIQUE_ECOSYSTEMS, BIODIVERSITY_WONDERS, IMAGES } from '../data/kalimantanData';
import { Compass, Shield, HeartPulse, Droplets } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

export const BiodiversitySection: React.FC = () => {
  const [selectedEcosystemId, setSelectedEcosystemId] = useState<string>('kerangas');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [revealedWonders, setRevealedWonders] = useState<Record<string, boolean>>({
    gliders: true,
    'carnivorous-pitcher': true,
  });

  const activeEcosystem =
    UNIQUE_ECOSYSTEMS.find((e) => e.id === selectedEcosystemId) || UNIQUE_ECOSYSTEMS[0];

  const categories = ['Semua', 'Fauna Ajaib', 'Flora Purba', 'Fenomena Alam', 'Farmakope Rimba'];

  const filteredWonders =
    activeCategory === 'Semua'
      ? BIODIVERSITY_WONDERS
      : BIODIVERSITY_WONDERS.filter((item) => item.category === activeCategory);

  return (
    <section id="keanekaragaman-hayati" className="relative bg-white py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-3">
            <span>Keajaiban Biosfer 130 Juta Tahun</span>
            <span aria-hidden="true">·</span>
            <span>Mahakarya Alam Khatulistiwa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
            Fakta Menakjubkan &amp; Keanekaragaman Hayati Kalimantan
          </h2>
          <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
            Sebagai salah satu hotspot biodiversitas terkaya di dunia, Kalimantan adalah laboratorium evolusi hidup. Di sini, satwa belajar melayang di udara, tanaman berburu serangga di tanah pasir asam, dan jamur berpendar menembus pekatnya malam rimba.
          </p>
        </div>

        {/* Feature Hero Card: Unique Flora & Ecosystem Context (Bright Luminous Style) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 sm:p-8 shadow-sm">
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 min-h-[340px] shadow-sm">
            <img
              src={IMAGES.uniqueFlora}
              alt="Kantong Semar Pemangsa Serangga di Rimba Kalimantan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="font-serif-display italic font-semibold">Nepenthes villosa / bicalcarata</span>
              <span className="mx-2 text-stone-300">·</span>
              <span className="text-emerald-300 font-mono-data font-bold">Kantong Semar Endemik</span>
              <p className="text-[11px] text-stone-200 mt-1">
                Kanopi hutan lumut dataran tinggi Kalimantan menyimpan 30+ spesies kantong semar yang tidak ditemukan di belahan bumi lain.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono-data uppercase font-bold mb-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Jelajahi Ekosistem Unik Kalimantan</span>
              </div>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                5 Lab Alam Berbeda dalam Satu Pulau
              </h3>
              <p className="text-sm text-stone-600 mt-2">
                Kalimantan bukan hanya hutan homogen; ia terdiri dari rangkaian mikrokosmos spektakuler dengan adaptasi biologi yang ekstrem:
              </p>

              {/* Ecosystem Interactive Tabs */}
              <div className="mt-5 flex flex-wrap gap-1.5 p-1 bg-stone-200/70 rounded-xl border border-stone-300">
                {UNIQUE_ECOSYSTEMS.map((eco) => (
                  <button
                    key={eco.id}
                    onClick={() => {
                      soundscape.playTapSound();
                      setSelectedEcosystemId(eco.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      selectedEcosystemId === eco.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'
                    }`}
                  >
                    {eco.name.split(' (')[0]}
                  </button>
                ))}
              </div>

              {/* Active Ecosystem Details */}
              <div className="mt-5 space-y-3.5 bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-lg font-serif-display font-bold text-emerald-900">
                    {activeEcosystem.name}
                  </h4>
                  <span className="text-xs text-stone-500 font-mono-data">
                    {activeEcosystem.localTerm}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                  {activeEcosystem.characteristics}
                </p>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-amber-800 font-mono-data uppercase block">
                    Fakta Mengagumkan:
                  </span>
                  <p className="text-xs text-stone-800 mt-1 leading-relaxed bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                    {activeEcosystem.wonderFact}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-500 font-mono-data font-medium">Spesies Indikator:</span>
                  {activeEcosystem.indicatorSpecies.map((sp, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-2 py-0.5 rounded text-[11px]"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
              <span>Peran Ekologis Vital: <strong className="text-stone-800">{activeEcosystem.ecologicalImportance}</strong></span>
            </div>
          </div>
        </div>

        {/* Curated Wonder Facts Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                Fakta Unik yang Jarang Diketahui Dunia
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Katalog keajaiban evolusi tumbuhan, satwa, dan fenomena langka rimba Borneo.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundscape.playTapSound();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWonders.map((wonder) => {
              const isRevealed = revealedWonders[wonder.id] !== false;

              return (
                <div
                  key={wonder.id}
                  className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-[#fbf9f5] p-6 hover:border-emerald-600 hover:shadow-md transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-data pb-3 border-b border-stone-200">
                      <span className="text-emerald-800 font-bold uppercase tracking-wider">
                        {wonder.category}
                      </span>
                      {wonder.metric && (
                        <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {wonder.metric}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 mt-4">
                      <h4 className="text-lg font-serif-display font-bold text-stone-900">
                        {wonder.title}
                      </h4>
                      {wonder.id === 'gliders' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundscape.playAnimalSound('frog');
                          }}
                          title="Dengarkan Suara Katak Terbang"
                          className="px-2 py-1 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-800 hover:bg-emerald-200 shrink-0 text-xs font-semibold shadow-xs"
                        >
                          🔊 Katak
                        </button>
                      )}
                    </div>

                    {isRevealed ? (
                      <p className="mt-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                        {wonder.fact}
                      </p>
                    ) : (
                      <p className="mt-3 text-xs text-stone-400 italic">
                        Klik tombol di bawah untuk membuka fakta ini...
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px] truncate max-w-[180px] font-medium">
                      {wonder.significance}
                    </span>
                    <button
                      onClick={() => {
                        soundscape.playTapSound();
                        setRevealedWonders((prev) => ({
                          ...prev,
                          [wonder.id]: !prev[wonder.id],
                        }));
                      }}
                      className="text-emerald-800 hover:text-emerald-900 font-bold whitespace-nowrap text-xs underline decoration-emerald-500"
                    >
                      {isRevealed ? 'Ringkas' : 'Baca Rahasia'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Wealth Is Vital To Conserve */}
        <div className="mt-16 rounded-3xl border border-stone-200 bg-[#f8f5ee] p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold">
              Nilai Nyata bagi Peradaban
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
              Mengapa Kekayaan Biodiversitas Ini Mutlak Harus Diselamatkan?
            </h3>
            <p className="mt-3 text-sm text-stone-700 leading-relaxed font-sans-ui">
              Melindungi keanekaragaman hayati Kalimantan bukanlah sekadar romantisme pecinta alam; ini adalah langkah strategis mutlak untuk mempertahankan daya dukung hidup peradaban manusia:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                1. Gudang Farmakope &amp; Obat Kanker Masa Depan
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Lebih dari 80% tumbuhan obat pedalaman Dayak belum diurai struktur kimianya oleh sains modern. Senyawa pencegah kanker, antimikroba baru, dan terapi antivirus ada di getah dan dedaunan hutan ini. Sekali punah terbakar, resep obat mujarab ini musnah selamanya.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                2. &quot;Sungai Terbang di Angkasa&quot; (Flying Rivers)
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Evapotranspirasi miliaran pohon Dipterokarpa dan gambut memompa jutaan ton uap air murni ke atmosfer setiap hari. Aliran uap ini mengatur pola musim hujan di Jawa, Sumatra, dan Selat Karimata. Tanpa hutan Kalimantan, pulau Jawa dan sentra pangan kita terancam kekeringan permanen.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                3. Garis Depan Penahan Pandemi Zoonosis
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Hutan rimba yang utuh mengurung patogen liar dan virus di dalam habitat alami mereka. Ketika rimba dibabat dan dibakar, satwa liar mengalami stres, kontak dengan manusia meningkat pesat di perbatasan konsesi, dan risiko wabah penyakit baru melompat ke populasi manusia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
