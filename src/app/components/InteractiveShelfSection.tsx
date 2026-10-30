"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { portfolioData, ShelfItem } from "@/data/portfolioData";

interface ShelfCardProps {
  item: ShelfItem;
  isActive: boolean;
  rackLevel: number;
  onSelect: () => void;
}

function ShelfCard({ item, isActive, rackLevel, onSelect }: ShelfCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isActive) {
      if (!videoLoaded) {
        vid.src = `/reels/${item.slug}.mp4`;
        setVideoLoaded(true);
      }
      vid
        .play()
        .then(() => setVideoPlaying(true))
        .catch(() => {});
    } else {
      vid.pause();
      setVideoPlaying(false);
    }
  }, [isActive, videoLoaded, item.slug]);

  const scaleClasses = [
    "scale-100 opacity-100",
    "scale-90 opacity-50",
    "scale-[0.81] opacity-25",
  ];
  const levelClass = scaleClasses[Math.min(rackLevel, 2)];

  return (
    <div
      className={`relative shrink-0 snap-start flex flex-col origin-top transition-[scale,opacity] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] w-[280px] sm:w-[320px] lg:w-[360px] ${levelClass}`}
    >
      {/* Reel Pill Badge */}
      {videoPlaying && rackLevel === 0 && (
        <span className="absolute -top-3 left-0 z-20 px-2 py-0.5 bg-[#c85635] text-white text-[10px] font-bold tracking-widest uppercase rounded-sm">
          Reel
        </span>
      )}

      <div
        onClick={onSelect}
        className="block w-full text-left cursor-pointer bg-[#0d0d0f] border-2 border-[var(--accent)]/55 overflow-hidden transition-colors"
      >
        {/* Aspect Ratio Reel / Preview Frame */}
        <div className="relative w-full aspect-[9/16] bg-[#0a0a0c] overflow-hidden">
          <img
            src={`/reels/${item.slug}.jpg`}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Card Metadata */}
        <div className="px-4 py-4 border-t border-white/5 bg-[#0a0a0c]">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="text-lg font-bold text-white truncate">{item.name}</h3>
            <span className="text-sm text-gray-300 font-medium shrink-0 font-mono">
              ${item.price}
            </span>
          </div>
          <p className="text-gray-400 text-xs mb-3 truncate">{item.tagline}</p>

          <div className="flex items-center justify-between gap-3 text-[9px] tracking-[0.15em] text-gray-500 font-mono uppercase">
            <span>{item.category}</span>
            <span>{item.sizeKb} KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveShelfSection() {
  const rackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = portfolioData.shelfItems;

  const updateActiveCard = useCallback(() => {
    const rack = rackRef.current;
    if (!rack) return;
    const scrollLeft = rack.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(rack.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - rack.offsetLeft - scrollLeft);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const rack = rackRef.current;
    if (!rack) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveCard);
    };

    rack.addEventListener("scroll", onScroll, { passive: true });
    updateActiveCard();
    return () => {
      cancelAnimationFrame(rafId);
      rack.removeEventListener("scroll", onScroll);
    };
  }, [updateActiveCard]);

  const scrollToIndex = useCallback((idx: number) => {
    const rack = rackRef.current;
    if (!rack) return;
    const targetIdx = Math.max(0, Math.min(rack.children.length - 1, idx));
    const child = rack.children[targetIdx] as HTMLElement;
    if (child) {
      rack.scrollTo({
        left: child.offsetLeft - rack.offsetLeft,
        behavior: "smooth",
      });
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  const totalKb = useMemo(
    () => items.reduce((acc, it) => acc + it.sizeKb, 0).toFixed(1),
    [items]
  );

  return (
    <section
      id="components"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="bg-[#050505] w-full text-white pt-16 md:pt-28 pb-24 overflow-hidden outline-none"
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 px-6 md:px-16">
        {/* Left Information Panel */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
          <div className="bg-white/[0.05] p-6 border-t-2 border-white/80 rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.28em] text-gray-400 mb-3 block font-mono">
              Shelf Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none mb-4">
              INTERACTIVE COMPONENTS
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Modular UI components, tactile micro-interactions, and motion-rich design elements built
              for high framerates and fluid user touchpoints.
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-gray-400">
              <span>{items.length} Modules</span>
              <span>{totalKb} KB Total</span>
            </div>
          </div>

          {/* Drag & Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-xs text-gray-500 font-mono">
              ← Drag or scroll to explore →
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="Previous component"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Next component"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Right Carousel Rack */}
        <div className="w-full min-w-0">
          <div
            ref={rackRef}
            className="flex items-start gap-6 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((item, idx) => {
              const rackLevel = Math.abs(idx - activeIndex);
              return (
                <ShelfCard
                  key={item.slug}
                  item={item}
                  isActive={idx === activeIndex}
                  rackLevel={rackLevel}
                  onSelect={() => scrollToIndex(idx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
