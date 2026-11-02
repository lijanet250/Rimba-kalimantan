import React from 'react';
import { Shield, ExternalLink, Heart, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-stone-200 bg-[#f5f2eb] text-stone-700 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-300">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs shadow-xs">
                🌿
              </span>
              <span className="text-base font-serif-display font-bold text-stone-900">
                RIMBA KALIMANTAN
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-md font-sans-ui">
              Inisiatif edukasi sains, advokasi darurat karhutla, dan seruan perlindungan bentang alam Heart of Borneo. Didedikasikan bagi keselamatan 57 miliar ton karbon gambut, habitat satwa langka, serta kearifan luhur masyarakat adat Dayak.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-mono-data">
              Sumber Data: NASA MODIS Terra/Aqua, SNPP VIIRS, KLHK SiPongi, BRGM, Global Forest Watch.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-data uppercase tracking-wider text-stone-900 font-bold">
              Navigasi Halaman
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('mengapa-dilindungi')}
                  className="hover:text-emerald-800 transition-colors"
                >
                  Mengapa Disebut Paru-Paru Dunia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('keanekaragaman-hayati')}
                  className="hover:text-emerald-800 transition-colors"
                >
                  Keanekaragaman Hayati Unik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('krisis-karhutla')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Pantauan Titik Panas Karhutla
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kondisi-alam')}
                  className="hover:text-emerald-800 transition-colors"
                >
                  Keadaan Hutan Saat Ini
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kesadaran-pribumi')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Kesadaran Rakyat Pribumi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('aksi-kampanye')}
                  className="hover:text-emerald-800 transition-colors"
                >
                  Rekomendasi Aksi Nyata
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Hotline Numbers */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-data uppercase tracking-wider text-amber-900 font-bold">
              Kontak Siaga Kebakaran
            </h4>
            <div className="text-xs space-y-2">
              <div>
                <span className="block text-stone-800 font-bold">Manggala Agni KLHK:</span>
                <span className="font-mono-data text-stone-600">0811-177-3344 / Posko Pusat</span>
              </div>
              <div>
                <span className="block text-stone-800 font-bold">Bebas Pulsa Tanggap Bencana:</span>
                <span className="font-mono-data text-stone-600">Call Center 112 (BPBD Daerah)</span>
              </div>
              <div>
                <span className="block text-stone-800 font-bold">Layanan Satwa Liar BKSDA:</span>
                <span className="font-mono-data text-stone-600">0812-588-4477 (Evakuasi Satwa)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 Inisiatif Rimba Kalimantan · Bersama menjaga paru-paru khatulistiwa tanpa api.
          </p>
          <div className="flex items-center gap-4 text-stone-600 text-xs font-medium">
            <span>Konservasi Hutan</span>
            <span aria-hidden="true">·</span>
            <span>Restorasi Gambut</span>
            <span aria-hidden="true">·</span>
            <span>Hak Masyarakat Adat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
