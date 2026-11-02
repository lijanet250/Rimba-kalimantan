import React, { useState } from 'react';
import {
  Flame,
  HeartHandshake,
  Baby,
  Sprout,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  ChevronRight,
  Wind,
} from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

export const StopBurningConsciousnessSection: React.FC = () => {
  // Interactive Citizen Pledge Checkboxes
  const [pledges, setPledges] = useState<Record<string, boolean>>({
    noBurnClearance: true,
    noCigaretteLitter: true,
    reportNeighborFire: false,
    adoptOrganicMulch: false,
  });

  const [pledgerName, setPledgerName] = useState<string>('');
  const [pledgerVillage, setPledgerVillage] = useState<string>('');
  const [pledgeConfirmed, setPledgeConfirmed] = useState<boolean>(false);
  const [totalCitizenPledges, setTotalCitizenPledges] = useState<number>(38420);

  // Interactive Solution Tab (Alternatif Tanpa Bakar)
  const [activeAlternativeTab, setActiveAlternativeTab] = useState<'pltb' | 'cuka-kayu' | 'agroforestri'>('pltb');

  const togglePledge = (key: string) => {
    soundscape.playTapSound();
    setPledges((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgerName.trim()) return;
    soundscape.playTapSound();
    setTotalCitizenPledges((prev) => prev + 1);
    setPledgeConfirmed(true);
  };

  return (
    <section id="kesadaran-pribumi" className="relative bg-[#f8f6f0] py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-mono-data font-bold mb-3">
            <Flame className="w-4 h-4 text-amber-700" />
            <span>Seruan Kesadaran Pribumi Nusantara</span>
            <span aria-hidden="true">·</span>
            <span>Hentikan Membakar Tanah Leluhur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
            Saudaraku Rakyat Pribumi: Yang Kita Bakar Bukan Semak, Tapi Napas Anak-Cucu Sendiri
          </h2>
          <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
            Membakar hutan dan lahan gambut mungkin terasa sebagai cara tercepat dan termurah untuk membuka kebun. Namun renungkanlah: satu korek api yang kita nyalakan hari ini memicu bara bawah tanah berminggu-minggu, meracuni paru-paru balita kita dengan kabut asap beracun, dan memusnahkan kesuburan tanah gambut untuk selamanya.
          </p>
        </div>

        {/* 3 Realities We Must Face (Bright High-Impact Cards) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Health Toll on Our Own Family */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-amber-500 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 border border-amber-300 text-amber-800 mb-4 shadow-xs">
              <Baby className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-bold text-stone-900">
              1. Korban Pertama Adalah Keluarga Kita
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
              Saat langit Kalimantan menguning pekat oleh asap, rumah sakit di Palangka Raya, Sampit, dan Pontianak sesak oleh tangis bayi yang sesak napas karena ISPA dan pneumonia. Partikel PM2.5 masuk langsung ke pembuluh darah anak-anak kita, merusak pertumbuhan otak dan paru-paru mereka.
            </p>
          </div>

          {/* Card 2: Ancient Dayak Customary Wisdom vs Reckless Fire */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-bold text-stone-900">
              2. Leluhur Dayak Tak Pernah Membakar Gambut
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
              Adat Dayak asli memiliki hukum ketat: ladang gilir balik hanya di tanah mineral berbukit dengan sekat bakar selebar 4 meter, diawasi puluhan warga bergiliran, dan dilarang keras saat angin kencang. Membakar lahan gambut dalam bukanlah adat Dayak—itu adalah kecerobohan yang diharamkan leluhur.
            </p>
          </div>

          {/* Card 3: Soil Destruction */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-rose-500 hover:shadow-md transition-all">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 border border-rose-300 text-rose-800 mb-4 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif-display font-bold text-stone-900">
              3. Tanah yang Terbakar Menjadi Mandul
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
              Abu pembakaran hanya memberi nutrisi sesaat selama 1-2 panen. Setelah itu, panas 600°C membunuh semua cacing, bakteri penyubur, dan jamur mikoriza alami. Tanah gambut ambles puluhan sentimeter, menjadi asam pekat, dan tak lagi bisa ditanami kecuali dengan pupuk kimia mahal.
            </p>
          </div>
        </div>

        {/* Practical Alternatives to Burning (PLTB - Pembukaan Lahan Tanpa Bakar) */}
        <div className="mt-14 rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                Solusi Nyata &amp; Ramah Lingkungan
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-1">
                Cara Bertani Tanpa Membakar Lahan (PLTB)
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Sudah banyak petani mandiri dan kelompok tani di Kalimantan yang berhasil panen melimpah tanpa menyulut api sama sekali.
            </p>
          </div>

          {/* Alternative Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => {
                soundscape.playTapSound();
                setActiveAlternativeTab('pltb');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeAlternativeTab === 'pltb'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              1. Pengomposan &amp; Mulsa Organik
            </button>
            <button
              onClick={() => {
                soundscape.playTapSound();
                setActiveAlternativeTab('cuka-kayu');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeAlternativeTab === 'cuka-kayu'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              2. Asap Cair (Cuka Kayu) Penolak Hama
            </button>
            <button
              onClick={() => {
                soundscape.playTapSound();
                setActiveAlternativeTab('agroforestri');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeAlternativeTab === 'agroforestri'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              3. Agroforestri Tanaman Ramah Air (Paludikultur)
            </button>
          </div>

          {/* Active Alternative Content */}
          <div className="mt-6 p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90">
            {activeAlternativeTab === 'pltb' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Tebas, Cacah, dan Jadikan Mulsa Penutup Tanah
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                    Semak belukar dan rumput liar tidak perlu dibakar. Cukup ditebas dan dicacah menggunakan mesin pencacah mini atau parang, lalu disebar merata di atas bedengan sebagai <em>mulsa organik</em>.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Menjaga kelembapan tanah agar tidak mengering saat musim kemarau
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Menekan pertumbuhan gulma liar baru hingga 70%
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Berubah menjadi pupuk humus subur yang tahan bertahun-tahun
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white border border-stone-200 text-xs text-stone-700">
                  <span className="font-bold text-emerald-800 font-mono-data uppercase block mb-1">
                    Kisah Nyata Petani Gambut:
                  </span>
                  &ldquo;Dulu kami kira sawi dan cabai hanya subur di abu bakaran. Setelah mencoba sistem mulsa cacah kompos di Pulang Pisau, hasil panen cabai kami justru berlipat dua kali dan tanah kami tetap gembur basah walau kemarau 2 bulan tanpa api!&rdquo;
                  <span className="block mt-2 font-semibold text-stone-900 font-mono-data">
                    — Pak Yustinus, Petani Sayur Mandiri Kalteng
                  </span>
                </div>
              </div>
            )}

            {activeAlternativeTab === 'cuka-kayu' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Teknologi Asap Cair Pirolisis Tertutup (Wood Vinegar)
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                    Ranting kayu dan tempurung kelapa tidak dibakar di lahan terbuka, melainkan dimasukkan ke dalam drum pembakaran tertutup (pirolisis). Asapnya disuling menjadi cairan cuka kayu yang sangat bernilai ekonomi tinggi.
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Pestisida nabati alami pembasmi serangga dan jamur tanaman
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Penghilang bau kandang ternak dan pengawet kayu alami
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      Dapat dijual seharga Rp 15.000 - Rp 25.000 per liter sebagai pemasukan tambahan
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white border border-stone-200 text-xs text-stone-700">
                  <span className="font-bold text-emerald-800 font-mono-data uppercase block mb-1">
                    Efisiensi Tanpa Asap Liar:
                  </span>
                  Asap tidak mencemari atmosfer dan tidak memicu karhutla, melainkan menjadi pundi rupiah yang menguntungkan kelompok tani desa.
                </div>
              </div>
            )}

            {activeAlternativeTab === 'agroforestri' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Paludikultur: Menanam Tanaman yang Suka Air Basah
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans-ui">
                    Mengapa mengeringkan gambut dengan kanal jika ada tanaman bernilai tinggi yang justru hidup subur di lahan gambut basah alami?
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <strong>Pohon Jelutung Rawa:</strong> Menghasilkan getah mahal untuk industri permen karet dan kosmetik.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <strong>Sagu Tropis:</strong> Sumber karbohidrat pangan tahan bencana dengan nilai panen tinggi.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <strong>Rotan &amp; Tengkawang:</strong> Hasil hutan non-kayu yang menjaga tutupan kanopi tetap utuh.
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-white border border-stone-200 text-xs text-stone-700">
                  <span className="font-bold text-emerald-800 font-mono-data uppercase block mb-1">
                    Kunci Perlindungan Abadi:
                  </span>
                  Bila gambut tetap basah tergenang, api mustahil menyala, dan warga tetap dapat panen berkesinambungan tanpa merusak alam.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Pledge: Ikrar Rakyat Pribumi Tolak Api */}
        <div className="mt-14 rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-mono-data font-bold mb-2">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              <span>Ikrar Nyata Rakyat Pribumi</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900">
              Kukuhkan Komitmen: Saya Berhenti Membakar &amp; Menjaga Rimba
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-700">
              Pilih poin komitmen moral di bawah ini. Bergabunglah bersama{' '}
              <strong className="text-emerald-800">{totalCitizenPledges.toLocaleString('id-ID')} warga</strong> yang telah bersumpah menolak api sembarangan:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Checkboxes */}
            <div className="lg:col-span-7 space-y-3">
              <label
                onClick={() => togglePledge('noBurnClearance')}
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  pledges.noBurnClearance
                    ? 'bg-emerald-50 border-emerald-400 text-stone-900'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={pledges.noBurnClearance}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-stone-900 font-semibold">
                    1. Saya berjanji TIDAK AKAN membersihkan kebun dengan menyulut api
                  </strong>
                  <span className="text-stone-600 text-xs">
                    Memilih cara tebas cacah mulsa atau pengomposan mandiri demi mencegah kobaran meluas.
                  </span>
                </div>
              </label>

              <label
                onClick={() => togglePledge('noCigaretteLitter')}
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  pledges.noCigaretteLitter
                    ? 'bg-emerald-50 border-emerald-400 text-stone-900'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={pledges.noCigaretteLitter}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-stone-900 font-semibold">
                    2. Saya TIDAK AKAN membuang puntung rokok di semak atau gambut kering
                  </strong>
                  <span className="text-stone-600 text-xs">
                    Memastikan puntung rokok benar-benar padam dengan air sebelum dibuang ke tempat aman.
                  </span>
                </div>
              </label>

              <label
                onClick={() => togglePledge('reportNeighborFire')}
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  pledges.reportNeighborFire
                    ? 'bg-emerald-50 border-emerald-400 text-stone-900'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={pledges.reportNeighborFire}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-stone-900 font-semibold">
                    3. Saya berani MENEGUR dan MELAPORKAN oknum pembakar liar
                  </strong>
                  <span className="text-stone-600 text-xs">
                    Tidak mendiamkan orang yang sengaja membakar lahan untuk kepentingan sepihak.
                  </span>
                </div>
              </label>

              <label
                onClick={() => togglePledge('adoptOrganicMulch')}
                className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                  pledges.adoptOrganicMulch
                    ? 'bg-emerald-50 border-emerald-400 text-stone-900'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={pledges.adoptOrganicMulch}
                  onChange={() => {}}
                  className="mt-0.5 h-4 w-4 rounded accent-emerald-600 cursor-pointer"
                />
                <div className="text-xs sm:text-sm">
                  <strong className="block text-stone-900 font-semibold">
                    4. Saya akan MENYEBARKAN cara bertani tanpa bakar ke tetangga &amp; kerabat
                  </strong>
                  <span className="text-stone-600 text-xs">
                    Membagikan ilmu pengomposan dan mulsa agar seluruh desa bebas dari kepungan asap.
                  </span>
                </div>
              </label>
            </div>

            {/* Submission Form / Certificate of Pledge */}
            <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              {!pledgeConfirmed ? (
                <form onSubmit={handleConfirmPledge} className="space-y-4">
                  <span className="text-xs uppercase font-mono-data text-amber-800 font-bold block">
                    Kukuhkan Ikrar Pribadi Anda
                  </span>
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Cap Ikrar Warga Bebas Asap
                  </h4>

                  <div>
                    <label className="block text-xs font-mono-data text-stone-600 uppercase mb-1">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      value={pledgerName}
                      onChange={(e) => setPledgerName(e.target.value)}
                      placeholder="e.g. Antonius Dayak / Budi Santoso"
                      className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-data text-stone-600 uppercase mb-1">
                      Desa / Kecamatan / Kota
                    </label>
                    <input
                      type="text"
                      required
                      value={pledgerVillage}
                      onChange={(e) => setPledgerVillage(e.target.value)}
                      placeholder="e.g. Desa Buntoi, Pulang Pisau"
                      className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700 transition-colors shadow-sm"
                  >
                    Kukuhkan Janji Tolak Api
                  </button>
                  <p className="text-[11px] text-stone-500 text-center">
                    Ikrar moral ini dicatat untuk memperkuat gerakan kampung mandiri peduli api bebas kabut asap.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 mx-auto mb-3 shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Ikrar Terpatri di Bumi Kalimantan
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Terima kasih, <strong>{pledgerName}</strong> dari <em>{pledgerVillage}</em>.
                  </p>
                  <p className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-sans-ui">
                    &ldquo;Satu keluarga yang berhenti menyulut api adalah ribuan helaan napas bersih yang diselamatkan bagi balita dan tetangga kita.&rdquo;
                  </p>
                  <button
                    onClick={() => setPledgeConfirmed(false)}
                    className="mt-4 text-xs text-stone-500 hover:text-stone-800 underline"
                  >
                    Ubah data ikrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
