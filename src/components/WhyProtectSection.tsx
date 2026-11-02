import React, { useState } from 'react';
import { CORE_PILLARS, ENDEMIC_SPECIES, IMAGES } from '../data/kalimantanData';
import {
  Volume2,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  HeartPulse,
  Flame,
  Globe,
  Trees,
} from 'lucide-react';
import { soundscape } from '../utils/audioSynth';
import { QuickGlossaryDrawer } from './InteractiveMicroWidgets';

export const WhyProtectSection: React.FC = () => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('orangutan');
  const [activeLungTab, setActiveLungTab] = useState<number>(0);

  const activeSpecies = ENDEMIC_SPECIES.find((s) => s.id === selectedSpeciesId) || ENDEMIC_SPECIES[0];

  // 5 Scientific Reasons Why Kalimantan is Called the "Lungs of the Earth"
  const lungsOfTheEarthReasons = [
    {
      id: 1,
      title: '1. Pabrik Oksigen Murni Tanpa Henti di Khatulistiwa',
      subtitle: 'Fotosintesis 365 Hari Sepanjang Tahun Tanpa Musim Dingin',
      desc: 'Berbeda dengan hutan di Eropa atau Amerika Utara yang menggugurkan daun di musim dingin, hutan hujan Kalimantan berdiri tegak di garis khatulistiwa. Miliaran daun pohon Dipterokarpa setinggi 70 meter aktif berfotosintesis menyerap karbon dioksida (CO2) dan menghembuskan miliaran ton oksigen (O2) murni ke atmosfer bumi setiap hari tanpa jeda.',
      metric: '365 Hari Aktif',
      highlight: 'Sirkulasi fotosintesis tak pernah berhenti berdenyut',
    },
    {
      id: 2,
      title: '2. Bank & Spons Karbon Raksasa (57 Miliar Ton Karbon)',
      subtitle: 'Kubah Gambut Menyimpan Karbon 20x Lebih Padat Dibanding Hutan Biasa',
      desc: 'Bagaikan paru-paru yang menghirup udara kotor dan menguncinya, kubah gambut Kalimantan sedalam 8–12 meter menahan lebih dari 57 Miliar Ton Karbon purba yang terkumpul selama 12.000 tahun. Jika hutan ini terbakar, karbon raksasa ini terlepas ke atmosfer bagai bom iklim yang memanaskan bumi secara drastis.',
      metric: '57 Miliar Ton',
      highlight: 'Setara akumulasi emisi ratusan tahun dunia industri',
    },
    {
      id: 3,
      title: '3. "Sungai Terbang di Angkasa" (Atmospheric Flying Rivers)',
      subtitle: 'Memompa Jutaan Ton Air Murni Pengatur Hujan Nusantara & Asia',
      desc: 'Satu pohon raksasa di Kalimantan mampu menyedot air tanah dan melepaskan hingga 500 liter uap air ke atmosfer setiap hari melalui evapotranspirasi. Uap air raksasa ini membentuk awan hujan sabuk khatulistiwa yang berhembus memberi curah hujan tawar ke pulau Jawa, Sumatra, dan Asia Tenggara untuk menyokong sawah dan lumbung pangan.',
      metric: 'Triliunan Liter Uap Air',
      highlight: 'Mengatur pola musim hujan dan ketersediaan air tawar regional',
    },
    {
      id: 4,
      title: '4. Pendingin & Termostat Alami Planet Bumi (Thermal Buffer)',
      subtitle: 'Meredam Sengatan Panas Radiasi Matahari Tropis',
      desc: 'Hamparan kanopi hijau lebat hutan Kalimantan bekerja bagai pendingin udara (air conditioner) alami raksasa. Hutan menyerap radiasi matahari tanpa memantulkannya menjadi panas inframerah berlebih, menjaga suhu daratan Kalimantan 4°C - 8°C lebih sejuk dibanding area sawit atau tambang terbuka di sekitarnya.',
      metric: 'Pendingin -8°C',
      highlight: 'Mencegah lonjakan suhu ekstrem di wilayah khatulistiwa',
    },
    {
      id: 5,
      title: '5. Paru-Paru Tertua di Bumi (Berusia 130 Juta Tahun)',
      subtitle: 'Lebih Purba Dibandingkan Hutan Amazon di Amerika Selatan',
      desc: 'Hutan Kalimantan telah menjalankan fungsi "bernapas" dan menyeimbangkan iklim bumi sejak era Dinosaurus (Zaman Kapur). Ia selamat dari kepunahan massal purba dan zaman es, menjadikannya sistem penopang kehidupan darat paling teruji dan paling sempurna dalam sejarah planet bumi.',
      metric: '130+ Juta Tahun',
      highlight: 'Lebih tua 75 juta tahun dari formasi hutan Amazon',
    },
  ];

  return (
    <section id="mengapa-dilindungi" className="relative bg-[#fcfaf7] py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-3">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>Pilar Ekologis &amp; Peran Biosfer</span>
            <span aria-hidden="true">·</span>
            <span>Urgensi Eksistensial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
            Mengapa Hutan Kalimantan Disebut Paru-Paru Dunia?
          </h2>
          <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
            Istilah &ldquo;Paru-Paru Dunia&rdquo; bukanlah kiasan puitis semata, melainkan fakta biofisika nyata. Hutan Kalimantan adalah mesin fotosintesis raksasa, penyimpan cadangan karbon purba terbesar, dan pengatur sirkulasi air tawar yang menopang kehidupan seluruh planet bumi.
          </p>
        </div>

        {/* 5 Scientific Reasons: Interactive Explorer */}
        <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                Fungsi Vital Respirasi Planet Bumi
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-0.5">
                5 Alasan Ilmiah Mengapa Kalimantan Adalah Paru-Paru Bumi
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-mono-data">
              Klik salah satu fungsi untuk melihat bukti sainsnya:
            </span>
          </div>

          {/* Interactive Indicator Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {lungsOfTheEarthReasons.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  soundscape.playTapSound();
                  setActiveLungTab(idx);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                  activeLungTab === idx
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                Fungsi 0{idx + 1}: {item.title.split('. ')[1].split(' (')[0]}
              </button>
            ))}
          </div>

          {/* Active Lung Reason Display Card */}
          <div className="mt-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Bukti Ekologis 0{activeLungTab + 1}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-900 mt-1">
                  {lungsOfTheEarthReasons[activeLungTab].title}
                </h4>
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                  {lungsOfTheEarthReasons[activeLungTab].subtitle}
                </p>
              </div>

              <div className="bg-white border border-stone-200 px-4 py-2 rounded-xl shrink-0 shadow-xs text-right">
                <span className="text-[10px] text-stone-500 font-mono-data uppercase block">Kapasitas Vital</span>
                <span className="text-lg font-serif-display font-bold text-emerald-800">
                  {lungsOfTheEarthReasons[activeLungTab].metric}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-sans-ui">
              {lungsOfTheEarthReasons[activeLungTab].desc}
            </p>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600 font-medium">
              <span>Kesimpulan: <strong className="text-stone-900">{lungsOfTheEarthReasons[activeLungTab].highlight}</strong></span>
              <span className="text-emerald-800 font-mono-data font-bold">Riset Ekologi Sundaland</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid: Alasan Melindungi Kalimantan */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold">
              Kedaulatan &amp; Kemanusiaan
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 mt-1">
              4 Alasan Mutlak Mengapa Kita Wajib Melindungi Hutan Kalimantan
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Kehilangan rimba Kalimantan bukan hanya bencana lokal; ia menghancurkan daya dukung kehidupan di nusantara dan mengancam masa depan umat manusia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 hover:border-emerald-600 hover:shadow-md transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs font-mono-data text-stone-500">
                    <span className="text-emerald-800 font-bold text-sm">{pillar.number}</span>
                    <span className="text-stone-800 font-bold">{pillar.highlightMetric}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-serif-display font-bold text-stone-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs text-emerald-700 font-semibold tracking-wide">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-4 text-sm text-stone-600 leading-relaxed font-sans-ui">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 italic bg-stone-50/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 rounded-b-3xl">
                  <span className="text-emerald-800 not-italic font-bold">Catatan Riset: </span>
                  {pillar.ecologicalFact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wildlife & Endemic Species Spotlight */}
        <div className="mt-20 pt-16 border-t border-stone-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-2">
                <span>Spesies Kunci &amp; Endemik</span>
                <span aria-hidden="true">·</span>
                <span>Borneo Sanctuary</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
                Mereka yang Bergantung pada Sejengkal Ranting Terakhir
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-md font-medium">
              Pilih satwa di bawah untuk membaca peran ekologis vital, estimasi populasi liar tersisa, serta dengarkan panggilan suaranya.
            </p>
          </div>

          {/* Interactive Species Selector Buttons (Segmented Controls) */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 border border-stone-200 rounded-2xl mb-8">
            {ENDEMIC_SPECIES.map((species) => (
              <button
                key={species.id}
                onClick={() => {
                  soundscape.playTapSound();
                  setSelectedSpeciesId(species.id);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                  selectedSpeciesId === species.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
                }`}
              >
                {species.name}
              </button>
            ))}
          </div>

          {/* Active Species Detail Card with Audio Button */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 items-center shadow-sm">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-inner">
              <img
                src={IMAGES.orangutanWild}
                alt={activeSpecies.name}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white flex items-center justify-between">
                <div>
                  <span className="font-serif-display italic font-semibold">{activeSpecies.latinName}</span>
                  <span className="mx-2 text-stone-300">·</span>
                  <span className="text-emerald-300 font-mono-data">{activeSpecies.localName}</span>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-800 font-bold font-mono-data uppercase tracking-wider">
                      Status:
                    </span>
                    <span className="text-rose-700 font-semibold">
                      {activeSpecies.status}
                    </span>
                    <span className="text-stone-400">/</span>
                    <span className="text-stone-600 font-mono-data font-medium">
                      {activeSpecies.populationEstimate}
                    </span>
                  </div>

                  {/* Micro-interaction: Play animal sound button */}
                  <button
                    onClick={() => {
                      if (activeSpecies.id === 'orangutan') soundscape.playAnimalSound('orangutan');
                      else if (activeSpecies.id === 'enggang') soundscape.playAnimalSound('enggang');
                      else if (activeSpecies.id === 'bekantan') soundscape.playAnimalSound('bekantan');
                      else soundscape.playAnimalSound('orangutan');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 hover:border-emerald-400 transition-colors shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Dengarkan Suara Satwa</span>
                  </button>
                </div>

                <h4 className="mt-3 text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
                  {activeSpecies.name}
                </h4>

                <div className="mt-4 space-y-3.5 text-sm text-stone-700">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 font-mono-data uppercase block">
                      Peran Ekologis Tak Tergantikan:
                    </span>
                    <p className="mt-1 leading-relaxed text-stone-700">{activeSpecies.keyRole}</p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-stone-600 font-mono-data uppercase block">
                      Habitat Alami:
                    </span>
                    <p className="mt-1 text-stone-600">{activeSpecies.habitat}</p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-rose-700 font-mono-data uppercase block">
                      Faktor Ancaman Terbesar:
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                      {activeSpecies.threats.map((threat, idx) => (
                        <span key={idx} className="bg-stone-100 border border-stone-300 text-stone-800 font-medium px-2.5 py-1 rounded-md">
                          {threat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl text-xs text-stone-800">
                <span className="font-bold text-amber-900">Keajaiban Biologis: </span>
                {activeSpecies.funFact}
              </div>
            </div>
          </div>
        </div>

        {/* Resiko Kepunahan Orangutan Kalimantan & Efek Domino Ekologis */}
        <div className="mt-16 rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50/40 via-white to-amber-50/30 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-rose-800 font-mono-data font-bold">
              Kedaruratan Satwa Payung (Umbrella Species)
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
              Resiko Nyata Kepunahan Orangutan Kalimantan (*Pongo pygmaeus*)
            </h3>
            <p className="mt-2 text-sm text-stone-700 leading-relaxed font-sans-ui">
              Orangutan Kalimantan kini berstatus <strong>Kritis Terancam Punah (Critically Endangered)</strong> menurut Daftar Merah IUCN. Lebih dari 100.000 individu musnah dalam kurun 16 tahun terakhir. Jika kepunahan ini berlanjut, kita tidak hanya kehilangan kerabat terdekat manusia (97% kesamaan DNA), tetapi memicu keruntuhan ekosistem hutan tropis tertua di bumi:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-rose-700 uppercase block mb-1">
                Faktor Resiko 01
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Siklus Reproduksi Terlambat di Dunia
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Betina hanya melahirkan 1 bayi setiap <strong>7 hingga 8 tahun sekali</strong>—jarak kelahiran terpanjang di antara seluruh mamalia darat. Kematian satu induk betina dewasa akibat kebakaran atau perburuan membutuhkan waktu hampir dua dekade untuk dapat digantikan oleh generasi baru di alam liar.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-amber-800 uppercase block mb-1">
                Faktor Resiko 02
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Fragmentasi Kanopi &amp; Isolasi Kantung
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Orangutan adalah satwa arboreal (hidup 90% di atas pohon). Pembukaan jalan tambang dan blok kebun sawit memutus jembatan kanopi alami, memaksa kelompok orangutan terkurung dalam petak hutan sempit (&lt;500 Ha) yang memicu malnutrisi dan perkawinan sedarah (inbreeding depression).
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-rose-800 uppercase block mb-1">
                Faktor Resiko 03
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Terjebak &amp; Terpanggang dalam Karhutla
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Orangutan memiliki insting alami takut pada air dan tidak bisa menyeberangi kanal drainase yang dalam. Saat kebakaran gambut mengepung kubah hutan rawa, mereka terperangkap di puncak pohon sarang, mengalami lemas karbon monoksida, dan terpanggang hidup-hidup.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-mono-data font-bold text-emerald-800 uppercase block mb-1">
                Efek Domino Kehancuran
              </span>
              <h4 className="text-base font-serif-display font-bold text-stone-900">
                Hutan Rimba Kehilangan &quot;Petaninya&quot;
              </h4>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed font-sans-ui">
                Lebih dari <strong>500 spesies pohon hutan</strong> Kalimantan mengandalkan orangutan untuk menyebarkan biji-biji besar yang tidak bisa ditelan burung. Tanpa orangutan, pohon-pohon raksasa penghasil oksigen dan penyerap karbon dunia ini tidak bisa beregenerasi alami dan perlahan punah.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Glossary Drawer Micro-Widget */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <QuickGlossaryDrawer />
        </div>
      </div>
    </section>
  );
};
