import React from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md shadow-xs transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left text-lg font-serif-display font-semibold tracking-tight text-emerald-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs shadow-xs">
            🌿
          </span>
          <span className="text-stone-900 font-serif-display tracking-wide font-bold">RIMBA KALIMANTAN</span>
        </button>

        {/* Zone 2: Navigation Links (single line, no wrap) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs tracking-wider uppercase font-semibold text-stone-600">
          <button
            onClick={() => onNavigate('mengapa-dilindungi')}
            className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'mengapa-dilindungi' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Paru-Paru Dunia
          </button>
          <button
            onClick={() => onNavigate('keanekaragaman-hayati')}
            className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'keanekaragaman-hayati' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Biodiversitas
          </button>
          <button
            onClick={() => onNavigate('krisis-karhutla')}
            className={`hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeSection === 'krisis-karhutla' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : ''
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Titik Api Aktif
          </button>
          <button
            onClick={() => onNavigate('kondisi-alam')}
            className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'kondisi-alam' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Keadaan Hutan &amp; Air
          </button>
          <button
            onClick={() => onNavigate('kesadaran-pribumi')}
            className={`hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'kesadaran-pribumi' ? 'text-amber-800 font-bold border-b-2 border-amber-600 pb-0.5' : ''
            }`}
          >
            Kesadaran Pribumi
          </button>
          <button
            onClick={() => onNavigate('aksi-kampanye')}
            className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'aksi-kampanye' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700 pb-0.5' : ''
            }`}
          >
            Aksi Nyata
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Audio Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Matikan Suara Rimba' : 'Dengarkan Suasana Rimba Tropis'}
            className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 hover:border-stone-400 transition-colors whitespace-nowrap shrink-0"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span className="hidden sm:inline font-medium text-emerald-800">Suara Aktif</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Suara Rimba</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate('aksi-kampanye')}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold tracking-wide text-white hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Ambil Sikap
          </button>
        </div>
      </div>

      {/* Mobile sub-bar for easy one-tap access */}
      <div className="flex lg:hidden overflow-x-auto border-t border-stone-200 bg-stone-50 px-4 py-2 gap-4 text-[11px] uppercase tracking-wider text-stone-600 no-scrollbar">
        <button onClick={() => onNavigate('mengapa-dilindungi')} className="whitespace-nowrap shrink-0 hover:text-emerald-800 font-medium">
          Mengapa Dilindungi
        </button>
        <button onClick={() => onNavigate('keanekaragaman-hayati')} className="whitespace-nowrap shrink-0 hover:text-emerald-800 font-medium">
          Biodiversitas
        </button>
        <button onClick={() => onNavigate('krisis-karhutla')} className="whitespace-nowrap shrink-0 text-amber-700 font-semibold">
          Karhutla
        </button>
        <button onClick={() => onNavigate('kondisi-alam')} className="whitespace-nowrap shrink-0 hover:text-emerald-800 font-medium">
          Kondisi Alam
        </button>
        <button onClick={() => onNavigate('aksi-kampanye')} className="whitespace-nowrap shrink-0 text-emerald-800 font-bold">
          Aksi Nyata
        </button>
      </div>
    </header>
  );
};
