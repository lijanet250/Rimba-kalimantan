/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyProtectSection } from './components/WhyProtectSection';
import { BiodiversitySection } from './components/BiodiversitySection';
import { FireCrisisSection } from './components/FireCrisisSection';
import { NatureConditionSection } from './components/NatureConditionSection';
import { StopBurningConsciousnessSection } from './components/StopBurningConsciousnessSection';
import { CampaignActionSection } from './components/CampaignActionSection';
import { Footer } from './components/Footer';
import { soundscape } from './utils/audioSynth';
import { VolumeX, Flame, TreePine } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isRainforestAudio, setIsRainforestAudio] = useState<boolean>(false);
  const [isWildfireAudio, setIsWildfireAudio] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle rainforest peaceful soundscape
  const toggleRainforestAudio = () => {
    if (isRainforestAudio) {
      soundscape.stopAll();
      setIsRainforestAudio(false);
    } else {
      soundscape.startRainforest(0.35);
      setIsRainforestAudio(true);
      setIsWildfireAudio(false);
    }
  };

  // Toggle wildfire ember rumble soundscape
  const toggleWildfireAudio = () => {
    if (isWildfireAudio) {
      soundscape.stopAll();
      setIsWildfireAudio(false);
    } else {
      soundscape.startWildfire(0.4);
      setIsWildfireAudio(true);
      setIsRainforestAudio(false);
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      soundscape.stopAll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans-ui selection:bg-emerald-600/20 selection:text-emerald-950">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-stone-200 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Bar with 3-Zone Contract */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        isAudioPlaying={isRainforestAudio || isWildfireAudio}
        onToggleAudio={toggleRainforestAudio}
      />

      {/* Main Content Sections (All bright, high-contrast, zero black backgrounds) */}
      <main>
        {/* 1. Hero with Ancient Mist Rainforest Visual & Key Numbers */}
        <HeroSection
          onExplore={handleNavigate}
          isAudioPlaying={isRainforestAudio}
          onToggleAudio={toggleRainforestAudio}
        />

        {/* 2. Mengapa Disebut Paru-Paru Dunia & Mengapa Harus Dilindungi + Resiko Kepunahan Orangutan */}
        <WhyProtectSection />

        {/* 3. Keanekaragaman Hayati, Ekosistem Unik, & Kantong Semar Endemik */}
        <BiodiversitySection />

        {/* 4. Krisis Kebakaran (Karhutla Tracker), ISPU Udara, & Simulator Kedalaman Gambut */}
        <FireCrisisSection
          isWildfireSoundPlaying={isWildfireAudio}
          onToggleWildfireSound={toggleWildfireAudio}
        />

        {/* 5. Keadaan Hutan Kalimantan Saat Ini, Deforestasi Slider, & Paradoks Air Bersih */}
        <NatureConditionSection />

        {/* 6. Kesadaran Rakyat Pribumi Berhenti Membakar Hutan (PLTB & Ikrar Warga) */}
        <StopBurningConsciousnessSection />

        {/* 7. Rekomendasi Aksi Nyata, Petisi Digital, Adopsi Pohon, & Kuis Edukasi */}
        <CampaignActionSection />
      </main>

      {/* Floating Sound Controller Pill (Bright white card, zero black background) */}
      {(isRainforestAudio || isWildfireAudio) && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-2xl border border-stone-300 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md text-xs">
          {isRainforestAudio ? (
            <>
              <TreePine className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span className="text-stone-900 font-semibold">Suara Rimba Aktif</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
              <span className="text-stone-900 font-semibold">Simulasi Deru Karhutla</span>
            </>
          )}

          <button
            onClick={() => {
              soundscape.stopAll();
              setIsRainforestAudio(false);
              setIsWildfireAudio(false);
            }}
            className="ml-2 rounded-lg p-1 hover:bg-stone-100 text-stone-500 hover:text-stone-900"
            title="Matikan Suara"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
