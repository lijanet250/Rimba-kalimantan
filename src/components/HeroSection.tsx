import React from 'react';
import { ArrowDown, Flame, TreePine } from 'lucide-react';
import { IMAGES } from '../data/kalimantanData';

interface HeroSectionProps {
  onExplore: (sectionId: string) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-900">
      {/* Background Hero Image with measured sunrise scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.heroRainforest}
          alt="Bentang Hutan Hujan Primer Kalimantan di Pagi Hari"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/20" />
      </div>

      {/* Top Editorial Kicker & Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 pt-16 pb-12 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Metadata line without pill box */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-mono-data mb-4 font-semibold drop-shadow-sm">
            <span>Inisiatif Ekologi Nasional</span>
            <span aria-hidden="true">·</span>
            <span>Heart of Borneo</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300">Laporan Krisis 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-bold leading-[1.12] text-white tracking-tight text-balance drop-shadow-md">
            Benteng Terakhir Khatulistiwa: Mengapa Kita Tak Boleh Kehilangan Rimba Kalimantan.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-100 leading-relaxed font-sans-ui max-w-2xl font-normal drop-shadow-sm">
            Hutan hujan purba berusia 130 juta tahun—lebih tua dari Amazon. Di bawah kanopi megahnya tersembunyi kubah gambut penahan 57 miliar ton karbon bumi dan habitat terakhir satwa paling menakjubkan di nusantara.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onExplore('mengapa-dilindungi')}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold tracking-wide text-white hover:bg-emerald-500 transition-colors shadow-lg"
            >
              <span>Mengapa Harus Dilindungi?</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => onExplore('krisis-karhutla')}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-950/60 px-5 py-3 text-sm font-semibold tracking-wide text-amber-200 hover:bg-amber-900/80 transition-colors backdrop-blur-sm"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Pantau Karhutla Terkini</span>
            </button>

            <button
              onClick={onToggleAudio}
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/20 px-4 py-3 text-xs font-semibold text-white hover:bg-white/30 transition-colors backdrop-blur-sm shadow-sm"
            >
              <TreePine className="w-4 h-4 text-emerald-300" />
              <span>{isAudioPlaying ? 'Matikan Suara Rimba' : 'Dengarkan Suara Rimba'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quantitative Rigor Strip (Bright alabaster card surface) */}
      <div className="relative z-10 w-full border-t border-stone-200 bg-[#faf8f5]/95 backdrop-blur-md shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-mono-data font-semibold">Usia Ekosistem</p>
              <p className="mt-1 text-2xl lg:text-3xl font-serif-display font-bold text-emerald-800 tabular-nums">
                130+ Juta Thn
              </p>
              <p className="text-xs text-stone-600 mt-0.5">Lebih purba dibanding lembah Amazon</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-mono-data font-semibold">Deposit Karbon Gambut</p>
              <p className="mt-1 text-2xl lg:text-3xl font-serif-display font-bold text-amber-700 tabular-nums">
                57 Miliar Ton
              </p>
              <p className="text-xs text-stone-600 mt-0.5">Tersimpan di kedalaman hingga 12 meter</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-mono-data font-semibold">Kekayaan Hayati</p>
              <p className="mt-1 text-2xl lg:text-3xl font-serif-display font-bold text-emerald-800 tabular-nums">
                50% Spesies RI
              </p>
              <p className="text-xs text-stone-600 mt-0.5">15.000 jenis flora &amp; satwa endemik</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 font-mono-data font-semibold">Hutan Primer Tersisa</p>
              <p className="mt-1 text-2xl lg:text-3xl font-serif-display font-bold text-rose-700 tabular-nums">
                43% Saja
              </p>
              <p className="text-xs text-stone-600 mt-0.5">Penurunan drastis dalam 3 dekade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
