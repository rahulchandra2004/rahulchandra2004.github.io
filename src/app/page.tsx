"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Mantra from "./components/Mantra";
import IntroSection from "./components/IntroSection";
import ExperienceSection from "./components/ExperienceSection";
import HackathonsSection from "./components/HackathonsSection";
import ServicesSection from "./components/ServicesSection";
import SelectedWorkSection from "./components/SelectedWorkSection";
import CredentialsSection from "./components/CredentialsSection";
import ContactFooterSection from "./components/ContactFooterSection";

export default function Home() {
  const [preloadDone, setPreloadDone] = useState(false);

  // Safety fallback: reveal full page after 5.5s if preloader animation is interrupted
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloadDone(true);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative selection:bg-white/20 selection:text-white">
      {/* Sticky Top Navbar: hidden until image loads and PORTFOLIO moves down */}
      <Navbar visible={preloadDone} />

      {/* Hero & Preloader */}
      <HeroSection onPreloadComplete={() => setPreloadDone(true)} />

      {/* Main Content Sections */}
      {preloadDone && (
        <div className="animate-fade-in-up">
          <Mantra />
          <IntroSection />
          <ExperienceSection />
          <HackathonsSection />
          <ServicesSection />
          <SelectedWorkSection />
          <CredentialsSection />
          <ContactFooterSection />
        </div>
      )}
    </main>
  );
}
