import React, { useState, useMemo } from 'react';
import { ACTIVE_FIRE_HOTSPOTS, ActiveHotspotPoint } from '../data/kalimantanData';
import {
  Flame,
  Radio,
  Search,
  Filter,
  MapPin,
  Crosshair,
  Copy,
  Check,
  AlertTriangle,
  Compass,
  Thermometer,
  Clock,
  Layers,
  ShieldAlert,
  Satellite,
  ChevronRight,
  RefreshCw,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

// Helper to project geographic coordinates to percentage inside the Kalimantan map viewBox
// Kalimantan bounding coordinates: Longitude 108.5°E to 119.5°E, Latitude -4.3°S to 4.5°N
export const projectKalimantanCoords = (lat: number, lng: number) => {
  const minLng = 108.5;
  const maxLng = 119.5;
  const minLat = -4.3;
  const maxLat = 4.5;

  const xPercent = Math.max(5, Math.min(95, ((lng - minLng) / (maxLng - minLng)) * 100));
  const yPercent = Math.max(5, Math.min(95, ((maxLat - lat) / (maxLat - minLat)) * 100));
  return { xPercent, yPercent };
};

export const HotspotRadarMap: React.FC = () => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>('HS-KTG-01');
  const [provinceFilter, setProvinceFilter] = useState<string>('ALL');
  const [landFilter, setLandFilter] = useState<string>('ALL');
  const [sensorFilter, setSensorFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);

  // Filtered hotspots list
  const filteredHotspots = useMemo(() => {
    return ACTIVE_FIRE_HOTSPOTS.filter((h) => {
      if (provinceFilter !== 'ALL' && h.provinceCode !== provinceFilter) return false;
      if (landFilter !== 'ALL' && h.landType !== landFilter) return false;
      if (sensorFilter !== 'ALL' && h.satellite !== sensorFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          h.locationName.toLowerCase().includes(q) ||
          h.regency.toLowerCase().includes(q) ||
          h.provinceName.toLowerCase().includes(q) ||
          h.id.toLowerCase().includes(q) ||
          h.status.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [provinceFilter, landFilter, sensorFilter, searchQuery]);

  // Selected hotspot object
  const selectedHotspot =
    ACTIVE_FIRE_HOTSPOTS.find((h) => h.id === selectedHotspotId) ||
    filteredHotspots[0] ||
    ACTIVE_FIRE_HOTSPOTS[0];

  // Copy GPS coordinate handler
  const handleCopyCoordinates = (lat: number, lng: number) => {
    soundscape.playTapSound();
    const coordString = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    navigator.clipboard.writeText(coordString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const getStatusColor = (status: ActiveHotspotPoint['status']) => {
    switch (status) {
      case 'Bara Aktif Bawah Tanah':
        return {
          bg: 'bg-rose-500',
          border: 'border-rose-600',
          ring: 'ring-rose-400',
          text: 'text-rose-700',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
        };
      case 'Kobaran Asap Tebal':
        return {
          bg: 'bg-amber-500',
          border: 'border-amber-600',
          ring: 'ring-amber-400',
          text: 'text-amber-800',
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
        };
      case 'Pemadaman Regu MPA':
        return {
          bg: 'bg-sky-500',
          border: 'border-sky-600',
          ring: 'ring-sky-400',
          text: 'text-sky-800',
          badge: 'bg-sky-100 text-sky-900 border-sky-300',
        };
      case 'Pendinginan Gambut':
        return {
          bg: 'bg-emerald-500',
          border: 'border-emerald-600',
          ring: 'ring-emerald-400',
          text: 'text-emerald-800',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        };
      default:
        return {
          bg: 'bg-rose-500',
          border: 'border-rose-600',
          ring: 'ring-rose-400',
          text: 'text-rose-700',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
        };
    }
  };

  return (
    <div className="mt-14 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Title & Live Status Indicator */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-rose-700 font-mono-data font-bold mb-1.5">
            <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>Radar Telemetri Geospasial</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>Satelit Terkoneksi 2026</span>
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-stone-900 tracking-tight">
            Titik-Titik Kebakaran Aktif di Seluruh Kalimantan
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            Pemetaan geospasial real-time 15 titik panas beresolusi tinggi (SNPP-VIIRS 375m &amp; Terra/Aqua MODIS). Klik titik pada peta untuk membuka telemetri sensor.
          </p>
        </div>

        {/* Quick Summary Pill & Feed count */}
        <div className="flex items-center gap-3">
          <div className="bg-[#faf8f5] border border-stone-200 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xs">
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono-data text-stone-500 block font-semibold">
                Titik Terpantau
              </span>
              <span className="text-xl font-serif-display font-bold text-rose-700">
                {filteredHotspots.length}{' '}
                <span className="text-xs font-sans-ui text-stone-600 font-normal">
                  / {ACTIVE_FIRE_HOTSPOTS.length} Titik
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Province Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { code: 'ALL', label: 'Semua Wilayah' },
            { code: 'KALTENG', label: 'Kalteng (4)' },
            { code: 'KALBAR', label: 'Kalbar (4)' },
            { code: 'KALSEL', label: 'Kalsel (3)' },
            { code: 'KALTIM', label: 'Kaltim (3)' },
            { code: 'KALTARA', label: 'Kaltara (1)' },
          ].map((item) => (
            <button
              key={item.code}
              onClick={() => {
                soundscape.playTapSound();
                setProvinceFilter(item.code);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                provinceFilter === item.code
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari desa, kabupaten, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-[#faf8f5] text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Secondary filter chips: Land Type */}
      <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
        <span className="flex items-center gap-1 font-mono-data font-semibold text-[11px] text-stone-500 mr-1">
          <Filter className="w-3.5 h-3.5" />
          Tipe Lahan:
        </span>
        {[
          { code: 'ALL', label: 'Semua Tipe' },
          { code: 'Kubah Gambut Dalam (>3m)', label: 'Kubah Gambut (>3m)' },
          { code: 'Rawa Gambut Dangkal', label: 'Rawa Dangkal' },
          { code: 'Semak Belukar Konsesi', label: 'Semak Konsesi' },
          { code: 'Hutan Produksi Terbuka', label: 'Hutan Produksi' },
        ].map((type) => (
          <button
            key={type.code}
            onClick={() => {
              soundscape.playTapSound();
              setLandFilter(type.code);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              landFilter === type.code
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {type.label}
          </button>
        ))}

        {/* Reset Filter Button */}
        {(provinceFilter !== 'ALL' || landFilter !== 'ALL' || searchQuery !== '') && (
          <button
            onClick={() => {
              soundscape.playTapSound();
              setProvinceFilter('ALL');
              setLandFilter('ALL');
              setSearchQuery('');
            }}
            className="ml-auto text-[11px] text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Main Map & Telemetry Console Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Kalimantan SVG Map (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-[#f9f8f4] p-4 sm:p-5 relative overflow-hidden shadow-inner">
          {/* Map Top Bar */}
          <div className="flex items-center justify-between text-xs text-stone-600 mb-3 font-mono-data">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-800" />
              <span className="font-bold text-stone-900">PROYEKSI GEOGRAFIS PULAU BORNEO</span>
            </div>
            <span className="text-[11px] text-stone-500">Koordinat: 4.5°N - 4.3°S / 108.5°E - 119.5°E</span>
          </div>

          {/* Interactive Map Visual Area */}
          <div className="relative aspect-[16/12] w-full rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50/70 via-[#f5f2eb] to-amber-50/50 border border-stone-200">
            {/* SVG Background Layer: Islands, Rivers, Provincial Boundaries */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Subtle terrain gradient */}
                <radialGradient id="canopyGradient" cx="45%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#e2e8f0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.6" />
                </radialGradient>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.75" strokeDasharray="2,2" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width="800" height="600" fill="url(#gridPattern)" />

              {/* Borneo Island Landmass Silhouette */}
              <path
                d="M 120 280 
                   C 100 240, 140 160, 180 130
                   C 230 100, 290 80, 360 70
                   C 430 60, 520 40, 580 50
                   C 630 60, 680 90, 710 140
                   C 730 180, 720 240, 700 300
                   C 680 360, 660 410, 630 460
                   C 600 510, 550 560, 480 570
                   C 410 580, 340 550, 280 530
                   C 220 510, 170 480, 140 430
                   C 110 380, 105 320, 120 280 Z"
                fill="url(#canopyGradient)"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Equator Line (Garis Khatulistiwa 0° Lat ~ Y: 307) */}
              <line
                x1="40"
                y1="307"
                x2="760"
                y2="307"
                stroke="#ea580c"
                strokeWidth="1.2"
                strokeDasharray="6,4"
                strokeOpacity="0.6"
              />
              <text x="50" y="300" fill="#c2410c" fontSize="10" fontFamily="monospace" fontWeight="bold">
                KHATULISTIWA (0° 00' 00")
              </text>

              {/* Major River Arteries */}
              {/* Sungai Kapuas (West) */}
              <path
                d="M 160 305 Q 220 310, 260 280 T 340 260 T 400 270"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
              <text x="210" y="315" fill="#0284c7" fontSize="9" fontFamily="monospace">
                S. Kapuas
              </text>

              {/* Sungai Barito (South) */}
              <path
                d="M 450 560 Q 460 480, 440 400 T 430 310"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
              <text x="465" y="490" fill="#0284c7" fontSize="9" fontFamily="monospace">
                S. Barito
              </text>

              {/* Sungai Mahakam (East) */}
              <path
                d="M 680 340 Q 610 320, 550 300 T 470 280"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeOpacity="0.7"
              />
              <text x="610" y="315" fill="#0284c7" fontSize="9" fontFamily="monospace">
                S. Mahakam
              </text>

              {/* Sungai Kahayan (Kalteng) */}
              <path
                d="M 410 540 Q 400 470, 395 380 T 410 300"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <text x="360" y="470" fill="#0284c7" fontSize="9" fontFamily="monospace">
                S. Kahayan
              </text>

              {/* Provincial Boundaries (Dashed) */}
              {/* Kalbar / Kalteng border */}
              <path
                d="M 280 220 Q 320 330, 330 480"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />
              {/* Kalteng / Kaltim & Kalsel border */}
              <path
                d="M 430 250 Q 470 340, 490 530"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />
              {/* Kaltim / Kaltara border */}
              <path
                d="M 520 160 Q 620 150, 710 140"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4,4"
              />

              {/* Province Labels in Map Background */}
              <text x="180" y="240" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="2">
                KALBAR
              </text>
              <text x="360" y="410" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="2">
                KALTENG
              </text>
              <text x="490" y="470" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="2">
                KALSEL
              </text>
              <text x="560" y="260" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="2">
                KALTIM
              </text>
              <text x="570" y="110" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="2">
                KALTARA
              </text>

              {/* Major Cities Points */}
              <circle cx="160" cy="307" r="3" fill="#475569" />
              <text x="166" y="303" fill="#334155" fontSize="9" fontWeight="bold">
                Pontianak
              </text>

              <circle cx="410" cy="460" r="3" fill="#475569" />
              <text x="416" y="456" fill="#334155" fontSize="9" fontWeight="bold">
                Palangkaraya
              </text>

              <circle cx="475" cy="530" r="3" fill="#475569" />
              <text x="482" y="527" fill="#334155" fontSize="9" fontWeight="bold">
                Banjarmasin
              </text>

              <circle cx="640" cy="340" r="3" fill="#475569" />
              <text x="646" y="337" fill="#334155" fontSize="9" fontWeight="bold">
                Samarinda
              </text>

              <circle cx="610" cy="115" r="3" fill="#475569" />
              <text x="616" y="112" fill="#334155" fontSize="9" fontWeight="bold">
                Tj. Selor
              </text>
            </svg>

            {/* Plotted Interactive Hotspot Pins */}
            {filteredHotspots.map((hotspot) => {
              const { xPercent, yPercent } = projectKalimantanCoords(hotspot.lat, hotspot.lng);
              const isSelected = hotspot.id === selectedHotspot.id;
              const isHovered = hotspot.id === hoveredPointId;
              const styling = getStatusColor(hotspot.status);

              return (
                <div
                  key={hotspot.id}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Selected Crosshair Indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 -m-3 border-2 border-dashed border-rose-600 rounded-full animate-spin [animation-duration:8s] pointer-events-none" />
                  )}

                  {/* Pulsating Ping Ring */}
                  <span
                    className={`absolute -inset-1 rounded-full ${styling.bg} opacity-75 animate-ping`}
                  />

                  {/* Pin Button */}
                  <button
                    onClick={() => {
                      soundscape.playTapSound();
                      setSelectedHotspotId(hotspot.id);
                    }}
                    onMouseEnter={() => setHoveredPointId(hotspot.id)}
                    onMouseLeave={() => setHoveredPointId(null)}
                    aria-label={`Hotspot ${hotspot.id} di ${hotspot.locationName}`}
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                      isSelected
                        ? 'border-white bg-rose-600 scale-125 shadow-lg z-30 ring-4 ring-rose-400/50'
                        : isHovered
                        ? 'border-white bg-amber-600 scale-110 shadow-md z-20 ring-2 ring-amber-300'
                        : `${styling.border} ${styling.bg} shadow-xs`
                    } text-white transition-all transform cursor-pointer`}
                  >
                    <Flame className="w-3.5 h-3.5 fill-current" />
                  </button>

                  {/* Hover or Selected Tooltip Badge */}
                  {(isSelected || isHovered) && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-stone-900/95 text-white px-2.5 py-1.5 rounded-lg shadow-xl text-center pointer-events-none z-40 backdrop-blur-xs animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-mono-data text-amber-300 font-bold">
                        {hotspot.id} · {hotspot.confidence}% Conf.
                      </div>
                      <div className="text-xs font-bold leading-tight truncate">
                        {hotspot.locationName.split(' - ')[0]}
                      </div>
                      <div className="text-[10px] text-stone-300">
                        {hotspot.regency}, {hotspot.provinceCode}
                      </div>
                      {/* Arrow caret */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900/95" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="mt-3 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-stone-600">
            <span className="font-mono-data font-bold text-stone-700">Legenda Status:</span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-2xs" />
                <span>Bara Bawah Tanah</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-2xs" />
                <span>Asap Tebal</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block shadow-2xs" />
                <span>Pemadaman MPA</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs" />
                <span>Pendinginan</span>
              </span>
            </div>
            <span className="font-mono-data text-[10px] text-stone-500">
              Perbarui per 15 Menit
            </span>
          </div>
        </div>

        {/* Selected Hotspot Telemetry Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-[#faf8f5] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Inspector Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono-data bg-stone-900 text-white px-2 py-0.5 rounded-md font-bold">
                    {selectedHotspot.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      getStatusColor(selectedHotspot.status).badge
                    }`}
                  >
                    {selectedHotspot.status}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-serif-display font-bold text-stone-900">
                  {selectedHotspot.locationName}
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Kabupaten {selectedHotspot.regency}, {selectedHotspot.provinceName}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[10px] font-mono-data text-stone-500 block">Sensor Satelit</span>
                <span className="text-xs font-mono-data font-bold text-amber-800 flex items-center gap-1 justify-end">
                  <Satellite className="w-3.5 h-3.5" />
                  {selectedHotspot.satellite}
                </span>
              </div>
            </div>

            {/* GPS Coordinates Bar & Copy Action */}
            <div className="mt-4 p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono-data text-stone-500 block">Koordinat Presisi</span>
                  <span className="text-xs font-mono-data font-bold text-stone-900">
                    {selectedHotspot.lat.toFixed(4)}° S, {selectedHotspot.lng.toFixed(4)}° E
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopyCoordinates(selectedHotspot.lat, selectedHotspot.lng)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title="Salin Koordinat GPS"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin GPS</span>
                  </>
                )}
              </button>
            </div>

            {/* Primary Telemetry Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Brightness Temperature */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-mono-data font-medium">Suhu Kecerahan</span>
                  <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                </div>
                <div className="text-xl font-serif-display font-bold text-rose-700">
                  {selectedHotspot.brightnessTempK} K
                </div>
                <div className="text-[11px] text-stone-600 font-mono-data mt-0.5">
                  ≈ {Math.round(selectedHotspot.brightnessTempK - 273.15)}°C di permukaan
                </div>
              </div>

              {/* Confidence Score */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-mono-data font-medium">Tingkat Keyakinan</span>
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="text-xl font-serif-display font-bold text-amber-800">
                  {selectedHotspot.confidence}%
                </div>
                {/* Visual bar */}
                <div className="w-full bg-stone-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full"
                    style={{ width: `${selectedHotspot.confidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Land Type & Area Estimation */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] font-mono-data text-stone-500 block">Karakteristik Lahan</span>
                <span className="text-xs font-bold text-stone-900 block mt-0.5 leading-snug">
                  {selectedHotspot.landType}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200">
                <span className="text-[10px] font-mono-data text-stone-500 block">Estimasi Area Terbakar</span>
                <span className="text-xs font-bold text-rose-700 block mt-0.5">
                  ± {selectedHotspot.estimatedAreaHa} Hektar
                </span>
              </div>
            </div>

            {/* Field Action Note */}
            <div className="mt-4 p-3.5 rounded-xl border border-amber-300 bg-amber-50/80 text-xs text-stone-800 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-1 font-mono-data text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>TERAKHIR TERDETEKSI: {selectedHotspot.detectionTime.toUpperCase()}</span>
              </div>
              <p>
                {selectedHotspot.landType.includes('Kubah Gambut')
                  ? 'Karakteristik kubah gambut tebal memerlukan teknik suntik air bertekanan tinggi (Peat Soil Injector) sedalam 1,5 - 3 meter untuk meredam bara bawah tanah.'
                  : 'Vegetasi semak dan kayu produksi rentan penjalaran api cepat terbawa angin kencang. Dibutuhkan pembuatan sekat bakar mekanis darurat.'}
              </p>
            </div>
          </div>

          {/* Hotline Emergency Box */}
          <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
            <span className="text-stone-600 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>Posko Siaga Manggala Agni</span>
            </span>
            <a
              href="#aksi-nyata"
              onClick={() => soundscape.playTapSound()}
              className="text-amber-800 font-bold hover:text-amber-950 flex items-center gap-1 underline underline-offset-2"
            >
              <span>Laporkan Titik Api Baru</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Directory Grid of All Filtered Hotspots */}
      <div className="mt-8 pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-serif-display font-bold text-stone-900">
            Daftar Lengkap Titik Api ({filteredHotspots.length} Hasil)
          </h4>
          <span className="text-xs text-stone-500 font-mono-data">
            Klik kartu untuk memfokuskan pin pada radar
          </span>
        </div>

        {filteredHotspots.length === 0 ? (
          <div className="text-center py-10 bg-[#faf8f5] rounded-2xl border border-stone-200">
            <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-900">Tidak ada titik api yang cocok dengan filter</p>
            <p className="text-xs text-stone-600 mt-1">Coba sesuaikan filter provinsi atau kata kunci pencarian Anda.</p>
            <button
              onClick={() => {
                soundscape.playTapSound();
                setProvinceFilter('ALL');
                setLandFilter('ALL');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 bg-amber-700 text-white rounded-xl text-xs font-semibold"
            >
              Tampilkan Semua Titik
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredHotspots.map((point) => {
              const isSelected = point.id === selectedHotspot.id;
              const styling = getStatusColor(point.status);

              return (
                <button
                  key={point.id}
                  onClick={() => {
                    soundscape.playTapSound();
                    setSelectedHotspotId(point.id);
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/80 shadow-xs ring-1 ring-amber-600'
                      : 'border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-data mb-1.5">
                    <span className="font-bold text-stone-900">{point.id}</span>
                    <span className="text-[10px] text-stone-500">{point.detectionTime}</span>
                  </div>

                  <h5 className="text-xs font-bold text-stone-900 line-clamp-1">
                    {point.locationName}
                  </h5>

                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Kab. {point.regency} · <span className="font-semibold text-stone-800">{point.provinceCode}</span>
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] border ${styling.badge}`}>
                      {point.status}
                    </span>
                    <span className="font-mono-data font-bold text-rose-700">
                      {point.brightnessTempK} K
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
