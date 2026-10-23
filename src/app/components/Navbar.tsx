"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { portfolioData } from "@/data/portfolioData";

const navItems = [
  "Home",
  "About",
  "Experience",
  "Hackathons",
  "Service",
  "Project",
  "Credentials",
  "Contact",
];

interface NavbarProps {
  visible?: boolean;
}

export default function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tickingRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll tracking and progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 24);
      setScrollProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(handleScroll);
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active link state
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  // Escape key handler
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMobileMenu();
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 w-full z-[100] transition-[transform,opacity,background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          mobileMenuOpen || scrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.7)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-12 md:py-5 max-w-7xl mx-auto w-full">
          {/* Logo Wordmark matching Image 3 */}
          <a
            href="#home"
            aria-label={portfolioData.name}
            onClick={(e) => handleNavClick(e, "home")}
            className="group relative z-50 text-white font-black text-lg md:text-xl tracking-[0.18em] uppercase leading-none rounded-sm outline-none transition-colors duration-200 hover:text-gray-200"
          >
            <span>RAHUL CHANDRA</span>
          </a>

          {/* Desktop Nav Links matching Image 3 */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative block py-1 text-xs uppercase tracking-[0.14em] font-medium transition-colors duration-200 rounded-sm outline-none ${
                      isActive ? "text-[#8ee0c6] font-semibold" : "text-gray-300 hover:text-[#8ee0c6]"
                    }`}
                  >
                    {item}
                    {/* Active Underline matching user reference */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full transition-all duration-300 ${
                        isActive
                          ? "scale-x-100 opacity-100 shadow-[0_0_8px_rgba(142,224,198,0.5)]"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-60"
                      }`}
                      style={{
                        background: "linear-gradient(90deg, #8ee0c6, #8c82f2)",
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#8ee0c6]"
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mobileMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div
          aria-hidden="true"
          className={`h-[2px] w-full origin-left transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(90deg, #8ee0c6, #90b8f8, #8c82f2)",
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-7">
          {navItems.map((item, idx) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <li
                key={item}
                className={`transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${120 + idx * 50}ms` : "0ms" }}
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`block text-2xl font-bold uppercase tracking-[0.2em] transition-colors duration-200 outline-none ${
                    isActive ? "text-white underline underline-offset-8" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
