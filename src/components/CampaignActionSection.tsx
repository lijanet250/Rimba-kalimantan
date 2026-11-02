import React, { useState } from 'react';
import { IMAGES, TREE_SPECIES, QUIZ_QUESTIONS } from '../data/kalimantanData';
import {
  CheckCircle2,
  TreePine,
  FileCheck,
  AlertOctagon,
  HelpCircle,
  Share2,
  Users,
  Award,
  Send,
  Sparkles,
  ShoppingBag,
  Smartphone,
  Sprout,
  ShieldAlert,
} from 'lucide-react';
import { QuickEcologicalPoll } from './InteractiveMicroWidgets';
import { soundscape } from '../utils/audioSynth';

export const CampaignActionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rekomendasi' | 'petisi' | 'adopsi' | 'relawan' | 'lapor' | 'kuis'>('rekomendasi');

  // Petition state
  const [signerName, setSignerName] = useState<string>('');
  const [signerCity, setSignerCity] = useState<string>('');
  const [signerPledge, setSignerPledge] = useState<string>('Tidak membeli produk turunan perusakan gambut');
  const [hasSigned, setHasSigned] = useState<boolean>(false);
  const [totalSignatures, setTotalSignatures] = useState<number>(142850);
  const [certificateId, setCertificateId] = useState<string>('');

  // Tree adoption state
  const [selectedTreeId, setSelectedTreeId] = useState<string>('ulin');
  const [treeCount, setTreeCount] = useState<number>(3);
  const [adopterName, setAdopterName] = useState<string>('');
  const [adoptionSuccess, setAdoptionSuccess] = useState<boolean>(false);

  const selectedTree = TREE_SPECIES.find((t) => t.id === selectedTreeId) || TREE_SPECIES[0];
  const totalCo2Absorption = selectedTree.co2AbsorptionPerYearKg * treeCount * 40;

  // Fire report state
  const [reportLocation, setReportLocation] = useState<string>('Kalimantan Tengah');
  const [reportRegency, setReportRegency] = useState<string>('Pulang Pisau');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Interactive Checklist of Real Actions
  const [actionChecklist, setActionChecklist] = useState<Record<string, boolean>>({
    consumer: true,
    digital: true,
    donation: false,
    reporting: false,
  });

  const toggleChecklist = (key: string) => {
    soundscape.playTapSound();
    setActionChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSignPetition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim() || !signerCity.trim()) return;
    soundscape.playTapSound();
    setTotalSignatures((prev) => prev + 1);
    setCertificateId(`BORNEO-${Math.floor(100000 + Math.random() * 900000)}`);
    setHasSigned(true);
  };

  const handleAdoptTree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adopterName.trim()) return;
    soundscape.playTapSound();
    setAdoptionSuccess(true);
  };

  const handleAnswerQuiz = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    soundscape.playTapSound();
    setSelectedAnswer(optionIdx);
    setShowExplanation(true);
    if (optionIdx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    soundscape.playTapSound();
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    soundscape.playTapSound();
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  return (
    <section id="aksi-kampanye" className="relative bg-white py-20 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-800 font-mono-data font-bold mb-3">
            <span>Gerakan Advokasi Sipil</span>
            <span aria-hidden="true">·</span>
            <span>Aksi Nyata, Bukan Retorika</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-stone-900 tracking-tight text-balance">
            Rekomendasi Aksi Nyata &amp; Kampanye Lindungi Rimba
          </h2>
          <p className="mt-4 text-base text-stone-700 leading-relaxed font-sans-ui">
            Menyelamatkan rimba Kalimantan bukan hanya tugas pemerintah atau penjaga hutan; setiap orang dari kita memiliki peran nyata dalam keseharian untuk menghentikan kehancuran paru-paru khatulistiwa.
          </p>
        </div>

        {/* Action Category Tabs (Clean Segmented Buttons) */}
        <div className="mt-10 flex flex-wrap gap-2 p-1.5 bg-stone-100 border border-stone-200 rounded-2xl">
          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('rekomendasi');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rekomendasi'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Rekomendasi Aksi Nyata (5 Langkah)</span>
          </button>

          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('petisi');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'petisi'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Tandatangani Petisi ({totalSignatures.toLocaleString('id-ID')})</span>
          </button>

          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('adopsi');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'adopsi'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <TreePine className="w-4 h-4" />
            <span>Simulasi Adopsi Bibit Rimba</span>
          </button>

          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('relawan');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'relawan'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Garda Penjaga Hutan Dayak</span>
          </button>

          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('lapor');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'lapor'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-amber-600" />
            <span>Laporkan Titik Api</span>
          </button>

          <button
            onClick={() => {
              soundscape.playTapSound();
              setActiveTab('kuis');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'kuis'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Kuis Edukasi Rimba</span>
          </button>
        </div>

        {/* Tab 0: Rekomendasi Aksi Nyata (Explicit User Request) */}
        {activeTab === 'rekomendasi' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Action 1 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Konsumen Cerdas
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  1. Boikot Produk Perusak Gambut
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Periksa bahan produk pangan dan kosmetik: pilih yang bersertifikasi <em>RSPO (Roundtable on Sustainable Palm Oil)</em> atau <em>NDPE (No Deforestation, No Peat, No Exploitation)</em>. Jangan beli kayu tanpa sertifikat SVLK legal.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Memutus rantai pendanaan korporasi pembakar lahan.
                </div>
              </div>

              {/* Action 2 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Warga Digital &amp; Netizen
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  2. Viralkan Pengawasan Titik Api
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Gunakan ponsel Anda: pantau peta satelit SiPongi KLHK dan Global Forest Watch saat musim kemarau. Viralkan titik api di konsesi perusahaan ke media sosial agar aparat tidak mendiamkan kejahatan lingkungan.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Tekanan publik memaksa penegakan hukum cabut izin konsesi.
                </div>
              </div>

              {/* Action 3 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Komunitas Desa &amp; Petani
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  3. Terapkan Tani Tanpa Bakar (PLTB)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Alihkan cara pembersihan kebun ke sistem mulsa kompos cacah serasah. Buat sekat parit basah di sekitar lahan kebun dan jangan biarkan puntung rokok terbuang di gambut kering.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Mencegah kebakaran melompat tak terkendali ke hutan desa.
                </div>
              </div>

              {/* Action 4 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <TreePine className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Donasi &amp; Restorasi
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  4. Adopsi Bibit Pohon &amp; Bantu Pompa MPA
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Sisihkan sedikit rezeki untuk mendanai bibit pohon asli (Ulin, Meranti, Tengkawang) dan donasi selang pemadam api serta masker respirator N95 bagi relawan Masyarakat Peduli Api di pelosok.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Mempercepat revegetasi lahan kritis dan menyelamatkan nyawa relawan.
                </div>
              </div>

              {/* Action 5 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Perlindungan Adat
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  5. Dukung Hak Kelola Hutan Adat Dayak
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Dukung pengesahan RUU Masyarakat Adat dan penetapan SK Hutan Adat bagi komunitas Dayak. Riset membuktikan wilayah adat yang diakui hukum memiliki laju deforestasi terendah di seluruh Nusantara.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Benteng pertahanan hutan diserahkan ke penjaga aslinya.
                </div>
              </div>

              {/* Action 6 */}
              <div className="rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 mb-4 shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Aksi Pendidikan Generasi
                </span>
                <h3 className="text-lg font-serif-display font-bold text-stone-900 mt-1">
                  6. Edukasi Keluarga &amp; Lingkungan
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-ui">
                  Ceritakan tentang orangutan, keajaiban kantong semar, dan bahaya hilangnya gambut kepada anak-anak, sekolah, dan forum komunitas kita. Kesadaran kolektif adalah awal perubahan peradaban.
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-medium text-emerald-800">
                  Dampak: Mencetak generasi muda yang mencintai dan membela rimba Borneo.
                </div>
              </div>
            </div>

            {/* Interactive Action Checklist for the User */}
            <div className="rounded-3xl border border-emerald-300 bg-emerald-50/60 p-6 sm:p-8 shadow-xs">
              <div className="max-w-2xl">
                <span className="text-xs font-mono-data text-emerald-800 font-bold uppercase block">
                  Komitmen Pribadi
                </span>
                <h4 className="text-xl font-serif-display font-bold text-stone-900 mt-1">
                  Ceklis Aksi Nyata Saya Hari Ini
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Centang aksi nyata yang siap Anda jalankan mulai minggu ini:
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => toggleChecklist('consumer')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    actionChecklist.consumer
                      ? 'bg-white border-emerald-500 shadow-xs text-stone-900 font-semibold'
                      : 'bg-white/60 border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={actionChecklist.consumer}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-700 cursor-pointer"
                  />
                  <span className="text-xs">Mengecek sertifikasi minyak sawit bebas perusakan gambut</span>
                </label>

                <label
                  onClick={() => toggleChecklist('digital')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    actionChecklist.digital
                      ? 'bg-white border-emerald-500 shadow-xs text-stone-900 font-semibold'
                      : 'bg-white/60 border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={actionChecklist.digital}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-700 cursor-pointer"
                  />
                  <span className="text-xs">Menyuarakan isu karhutla &amp; gambut di media sosial</span>
                </label>

                <label
                  onClick={() => toggleChecklist('donation')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    actionChecklist.donation
                      ? 'bg-white border-emerald-500 shadow-xs text-stone-900 font-semibold'
                      : 'bg-white/60 border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={actionChecklist.donation}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-700 cursor-pointer"
                  />
                  <span className="text-xs">Mendukung perlengkapan relawan Masyarakat Peduli Api</span>
                </label>

                <label
                  onClick={() => toggleChecklist('reporting')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    actionChecklist.reporting
                      ? 'bg-white border-emerald-500 shadow-xs text-stone-900 font-semibold'
                      : 'bg-white/60 border-stone-200 text-stone-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={actionChecklist.reporting}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-emerald-700 cursor-pointer"
                  />
                  <span className="text-xs">Menyimpan nomor hotline darurat karhutla di ponsel saya</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Digital Petition & Certificate (Bright White Style) */}
        {activeTab === 'petisi' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                Petisi Nasional &amp; Internasional
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-1">
                Deklarasi Darurat Perlindungan Gambut &amp; Hutan Adat
              </h3>
              <p className="mt-3 text-sm text-stone-700 leading-relaxed font-sans-ui">
                Kami menuntut penegakan hukum tanpa pandang bulu terhadap korporasi pembakar lahan, moratorium permanen pembukaan kanal drainase baru di seluruh kubah gambut, serta pengakuan mutlak atas wilayah kelola hutan adat masyarakat Dayak.
              </p>

              {!hasSigned ? (
                <form onSubmit={handleSignPetition} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={signerName}
                        onChange={(e) => setSignerName(e.target.value)}
                        placeholder="e.g. Raden Aji Santoso"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                        Kota / Domisili
                      </label>
                      <input
                        type="text"
                        required
                        value={signerCity}
                        onChange={(e) => setSignerCity(e.target.value)}
                        placeholder="e.g. Palangka Raya / Jakarta"
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                      Komitmen Aksi Pribadi Saya
                    </label>
                    <select
                      value={signerPledge}
                      onChange={(e) => setSignerPledge(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="Tidak membeli produk turunan perusakan gambut">
                        Memboikot produk dari produsen perusak lahan gambut
                      </option>
                      <option value="Menyuarakan isu karhutla di media sosial dan komunitas">
                        Aktif menyuarakan bahaya asap karhutla di jaringan sosial
                      </option>
                      <option value="Mendukung hak kelola hutan masyarakat adat Dayak">
                        Mendukung legalisasi hutan adat tana ulen masyarakat Dayak
                      </option>
                      <option value="Mengurangi jejak emisi karbon pribadi">
                        Mengurangi konsumsi energi dan jejak karbon rumah tangga
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-bold tracking-wide text-white hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    Tandatangani Deklarasi Sekarang
                  </button>
                  <p className="text-[11px] text-stone-500 text-center">
                    Data Anda dilindungi dan disalurkan secara kolektif ke Kementerian LHK &amp; Koalisi Penyelamat Gambut.
                  </p>
                </form>
              ) : (
                <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                  <h4 className="text-lg font-serif-display font-bold text-stone-900">
                    Terima Kasih, {signerName}!
                  </h4>
                  <p className="text-xs text-stone-700 mt-1 max-w-md mx-auto">
                    Suara Anda telah dicatat dalam register deklarasi bersama{' '}
                    <strong className="text-emerald-800">{totalSignatures.toLocaleString('id-ID')} pendukung</strong> lainnya.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Tautan petisi berhasil disalin untuk dibagikan!');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-stone-800 hover:bg-stone-50 shadow-xs"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Salin Tautan Kampanye</span>
                    </button>
                    <button
                      onClick={() => setHasSigned(false)}
                      className="text-xs text-stone-500 hover:text-stone-800 underline"
                    >
                      Isi atas nama lain
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Official Digital Certificate Preview (Bright Parchment Style) */}
            <div className="lg:col-span-5 rounded-3xl border border-emerald-300 bg-gradient-to-b from-[#faf8f5] to-white p-6 sm:p-8 text-stone-900 shadow-sm relative overflow-hidden">
              <div className="border border-emerald-400/80 rounded-2xl p-6 bg-white shadow-xs text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                <span className="text-[10px] tracking-widest font-mono-data uppercase text-emerald-800 font-bold block">
                  Piagam Penjaga Rimba Borneo
                </span>
                <h4 className="mt-1 text-xl font-serif-display font-bold text-stone-900">
                  Sertifikat Komitmen Ekologis
                </h4>
                <div className="w-12 h-0.5 bg-emerald-600 mx-auto my-3" />

                <p className="text-xs text-stone-500">Diberikan secara hormat kepada:</p>
                <p className="text-lg font-serif-display font-bold text-emerald-900 my-1">
                  {signerName || 'Sahabat Rimba Nusantara'}
                </p>
                <p className="text-[11px] text-stone-600 font-mono-data">
                  Domisili: {signerCity || 'Nusantara'}
                </p>

                <p className="mt-4 text-xs text-stone-700 italic border-t border-b border-stone-200 py-3 font-serif-display">
                  &ldquo;Telah menyatakan ikrar berdiri teguh melindungi 57 miliar ton karbon gambut dan keselamatan hutan tropis Kalimantan demi generasi masa depan bumi.&rdquo;
                </p>

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono-data text-stone-500">
                  <span>No. Register: {certificateId || 'BORNEO-739211'}</span>
                  <span>Tahun 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Virtual Tree Adoption */}
        {activeTab === 'adopsi' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                Reboisasi Berkelanjutan Bersama Komunitas
              </span>
              <h3 className="text-2xl font-serif-display font-bold text-stone-900 mt-1">
                Adopsi &amp; Tanam Bibit Pohon Asli Kalimantan
              </h3>
              <p className="mt-2 text-sm text-stone-700 leading-relaxed font-sans-ui">
                Pilih spesies pohon kanopi asli hutan Kalimantan untuk ditanam di kawasan gambut terdegradasi melalui persemaian bibit mandiri warga desa dampingan:
              </p>

              {/* Tree Selector Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TREE_SPECIES.map((tree) => (
                  <button
                    key={tree.id}
                    onClick={() => {
                      soundscape.playTapSound();
                      setSelectedTreeId(tree.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedTreeId === tree.id
                        ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                        : 'border-stone-200 bg-stone-50/70 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs font-mono-data text-emerald-800 font-bold block">
                      {tree.status}
                    </span>
                    <h4 className="text-sm font-serif-display font-bold text-stone-900 mt-0.5">
                      {tree.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 italic font-serif-display">
                      {tree.latinName}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                      {tree.indigenousUse}
                    </p>
                  </button>
                ))}
              </div>

              {/* Quantity Slider */}
              <div className="mt-6 p-4 rounded-2xl border border-stone-200 bg-[#faf8f5]">
                <div className="flex justify-between items-center text-xs text-stone-700 mb-2 font-semibold">
                  <span>Jumlah Bibit yang Ingin Diadopsi:</span>
                  <span className="text-base font-serif-display font-bold text-emerald-800 tabular-nums">
                    {treeCount} Pohon
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={treeCount}
                  onChange={(e) => {
                    soundscape.playTapSound();
                    setTreeCount(Number(e.target.value));
                  }}
                  className="w-full h-2.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Adoption Form */}
              {!adoptionSuccess ? (
                <form onSubmit={handleAdoptTree} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                      Nama Dedikasi Bibit (Nama Anda / Keluarga)
                    </label>
                    <input
                      type="text"
                      required
                      value={adopterName}
                      onChange={(e) => setAdopterName(e.target.value)}
                      placeholder="e.g. Keluarga Pratama untuk Rimba"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition-colors shadow-sm"
                  >
                    Konfirmasi Dedikasi Adopsi Pohon
                  </button>
                </form>
              ) : (
                <div className="mt-6 p-5 rounded-2xl border border-emerald-300 bg-emerald-50/70 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                  <h4 className="text-base font-serif-display font-bold text-stone-900">
                    Dedikasi Tersimpan: {treeCount} Bibit {selectedTree.name}
                  </h4>
                  <p className="text-xs text-stone-700 mt-1">
                    Bibit atas nama <strong>{adopterName}</strong> akan dipetakan koordinat GPS penanamannya di zona penyangga restorasi gambut Pulang Pisau.
                  </p>
                </div>
              )}
            </div>

            {/* Ecological Impact Calculator Display */}
            <div className="lg:col-span-5 rounded-3xl border border-stone-200 bg-[#fbf9f5] p-6 sm:p-8 shadow-xs">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-mono-data font-bold block">
                Kalkulator Manfaat Ekologis
              </span>
              <h4 className="text-xl font-serif-display font-bold text-stone-900 mt-1">
                Dampak {treeCount} Bibit {selectedTree.name}
              </h4>

              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-xs text-stone-500 font-mono-data font-bold block">Serapan CO2 Kumulatif</span>
                  <span className="text-2xl font-serif-display font-bold text-emerald-800 tabular-nums">
                    {totalCo2Absorption.toLocaleString('id-ID')} kg CO2e
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Estimasi serapan dalam masa hidup 40 tahun
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-xs text-stone-500 font-mono-data font-bold block">Waktu Capai Kematangan Kanopi</span>
                  <span className="text-2xl font-serif-display font-bold text-amber-800 tabular-nums">
                    {selectedTree.maturityYears} Tahun
                  </span>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    Menyokong sarang satwa liar dan lebah madu raksasa
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200">
                  <span className="text-xs text-stone-500 font-mono-data font-bold block">Peran bagi Ekosistem Gambut</span>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    {selectedTree.ecologicalRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dayak Forest Guardians & Masyarakat Peduli Api */}
        {activeTab === 'relawan' && (
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
                <img
                  src={IMAGES.dayakRangers}
                  alt="Relawan Masyarakat Peduli Api dan Penjaga Hutan Dayak"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-xs text-white">
                  <span className="text-amber-300 font-mono-data font-bold">Masyarakat Peduli Api (MPA)</span>
                  <p className="text-[11px] text-stone-200 mt-0.5">
                    Petugas garis depan yang menerjang panas tanah gambut 600°C dengan mesin pompa jinjing dan selang darurat.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-mono-data font-bold block">
                  Pahlawan Sunyi Garis Depan
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 mt-1">
                  Masyarakat Peduli Api &amp; Penjaga Hutan Adat Dayak
                </h3>
                <p className="mt-4 text-sm text-stone-700 leading-relaxed font-sans-ui">
                  Ketika satelit mendeteksi titik merah, bukan robot yang memadamkannya, melainkan warga desa lokal—para pemuda dan tetua adat Dayak yang tergabung dalam Masyarakat Peduli Api (MPA). Berjalan kaki berkilo-kilometer menembus rawa gambut pekat dengan beban selang 25 kilogram, mereka bertaruh nyawa menyuntikkan air ke bawah tanah agar asap tidak membunuh jutaan anak-anak.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
                    <span className="text-xs text-emerald-800 font-bold font-mono-data block">
                      Kearifan Tana Ulen
                    </span>
                    <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                      Sistem zona larangan adat Dayak yang mengharamkan penebangan pohon di hulu bukit dan sumber mata air.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200">
                    <span className="text-xs text-amber-800 font-bold font-mono-data block">
                      Tantangan Alat Pemadaman
                    </span>
                    <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                      Banyak regu MPA masih kekurangan selang tahan panas, nosel injeksi gambut dalam, dan masker respirator anti racun.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3 text-xs text-stone-700">
                  <span className="text-stone-500 font-mono-data font-bold">Mitra Kolaborator Lapangan:</span>
                  <span className="bg-stone-100 border border-stone-200 px-3 py-1 rounded-lg">Aliansi Masyarakat Adat Nusantara (AMAN)</span>
                  <span className="bg-stone-100 border border-stone-200 px-3 py-1 rounded-lg">Manggala Agni KLHK</span>
                  <span className="bg-stone-100 border border-stone-200 px-3 py-1 rounded-lg">Yayasan Penyelamatan Orangutan Borneo (BOSF)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Citizen Fire Report Simulator */}
        {activeTab === 'lapor' && (
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800 font-mono-data font-bold mb-1">
              <AlertOctagon className="w-4 h-4 text-amber-700" />
              <span>Sistem Cepat Tanggap Karhutla Warga</span>
            </div>
            <h3 className="text-2xl font-serif-display font-bold text-stone-900">
              Formulir Pantau &amp; Laporkan Titik Asap
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-700">
              Melihat kepulan asap mencurigakan di lahan gambut atau perbatasan konsesi? Kirimkan laporan cepat untuk diteruskan ke posko darurat Manggala Agni dan BPBD terdekat:
            </p>

            {!reportSubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  soundscape.playTapSound();
                  setReportSubmitted(true);
                }}
                className="mt-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                      Provinsi Kejadian
                    </label>
                    <select
                      value={reportLocation}
                      onChange={(e) => setReportLocation(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:bg-white focus:outline-none"
                    >
                      <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                      <option value="Kalimantan Barat">Kalimantan Barat</option>
                      <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                      <option value="Kalimantan Timur">Kalimantan Timur</option>
                      <option value="Kalimantan Utara">Kalimantan Utara</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                      Kabupaten / Kecamatan / Desa
                    </label>
                    <input
                      type="text"
                      required
                      value={reportRegency}
                      onChange={(e) => setReportRegency(e.target.value)}
                      placeholder="e.g. Pulang Pisau, Kahayan Hilir"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-data text-stone-700 font-bold uppercase mb-1">
                    Keterangan Kepulan Asap &amp; Akses Jalan
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Contoh: Asap tebal membubung di belakang kebun warga Km 14, tanah gambut mulai ambles dan berbau menyengat, sumber air parit mengering."
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-600 py-3 text-sm font-bold text-white hover:bg-amber-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Laporan Siaga ke Posko</span>
                </button>
              </form>
            ) : (
              <div className="mt-6 p-6 rounded-2xl border border-amber-300 bg-amber-50/70 text-center">
                <CheckCircle2 className="w-10 h-10 text-amber-700 mx-auto mb-2" />
                <h4 className="text-lg font-serif-display font-bold text-stone-900">
                  Laporan Berhasil Diteruskan
                </h4>
                <p className="text-xs text-stone-700 mt-1 max-w-md mx-auto">
                  Informasi di <strong>{reportRegency}, {reportLocation}</strong> telah disinkronkan ke pangkalan data relawan siaga.
                </p>
                <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-amber-900">
                  <span>Kontak Darurat Langsung Posko Manggala Agni: </span>
                  <strong className="font-mono-data">0811-523-8899 / Bebas Pulsa BPBD 112</strong>
                </div>
                <button
                  onClick={() => setReportSubmitted(false)}
                  className="mt-4 text-xs text-stone-500 hover:text-stone-900 underline"
                >
                  Buat laporan baru
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Interactive Eco-Quiz */}
        {activeTab === 'kuis' && (
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
            {!quizCompleted ? (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 text-xs font-mono-data text-stone-600">
                  <span className="text-emerald-800 font-bold">
                    Pertanyaan {currentQuizIndex + 1} dari {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="font-semibold">Skor Anda: {quizScore}</span>
                </div>

                <h3 className="mt-6 text-xl font-serif-display font-bold text-stone-900">
                  {QUIZ_QUESTIONS[currentQuizIndex].question}
                </h3>

                <div className="mt-6 space-y-3">
                  {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                    let btnClass = 'border-stone-200 bg-stone-50 hover:bg-white hover:border-stone-400 text-stone-800';

                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnClass = 'border-rose-500 bg-rose-50 text-rose-900';
                      } else {
                        btnClass = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerQuiz(idx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center font-mono-data text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-6 p-5 rounded-2xl border border-stone-200 bg-[#faf8f5] text-xs text-stone-800">
                    <p className="font-bold text-emerald-800 mb-1">
                      {selectedAnswer === QUIZ_QUESTIONS[currentQuizIndex].correctIndex
                        ? 'Tepat Sekali! 🎉'
                        : 'Belum Tepat, Ini Fakta Sebenarnya: 💡'}
                    </p>
                    <p className="leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuizIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextQuiz}
                      className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs"
                    >
                      {currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-2xl font-serif-display font-bold text-stone-900">
                  Kuis Selesai!
                </h3>
                <p className="text-sm text-stone-700 mt-2">
                  Anda menjawab benar{' '}
                  <strong className="text-emerald-800 font-bold text-lg">
                    {quizScore} dari {QUIZ_QUESTIONS.length}
                  </strong>{' '}
                  pertanyaan.
                </p>
                <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                  {quizScore === 5
                    ? 'Luar biasa! Pengetahuan Anda tentang ekosistem dan krisis lahan gambut Kalimantan sangat mendalam.'
                    : 'Terima kasih telah belajar tentang rimba Kalimantan. Setiap fakta yang Anda ketahui adalah modal menyuarakan perlindungannya!'}
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  Ulangi Kuis
                </button>
              </div>
            )}
          </div>
        )}

        {/* Embedded Public Opinion Poll */}
        <div className="mt-16 pt-16 border-t border-stone-200">
          <QuickEcologicalPoll />
        </div>
      </div>
    </section>
  );
};
