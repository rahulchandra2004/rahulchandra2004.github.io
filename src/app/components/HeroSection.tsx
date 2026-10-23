"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import HeroCanvas from "./HeroCanvas";
import { portfolioData } from "@/data/portfolioData";

interface HeroSectionProps {
  onPreloadComplete?: () => void;
}

export default function HeroSection({ onPreloadComplete }: HeroSectionProps) {
  const [displayText, setDisplayText] = useState(portfolioData.wordmark);
  const [scrambleStarted, setScrambleStarted] = useState(false);
  const [initialOverlayVisible, setInitialOverlayVisible] = useState(true);
  const [canvasPlay, setCanvasPlay] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftHalfRef = useRef<HTMLSpanElement>(null);
  const rightHalfRef = useRef<HTMLSpanElement>(null);
  const roleTextRef = useRef<HTMLParagraphElement>(null);
  const actionBtnsRef = useRef<HTMLDivElement>(null);
  const anchorImgRef = useRef<HTMLImageElement>(null);
  const onCompleteRef = useRef(onPreloadComplete);

  useEffect(() => {
    onCompleteRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  const heroMaskImg = "/assets/rahul_hero.png?v=sunglasses_grey_v5";
  const thumbs = useMemo(
    () => [
      "/assets/ecommerce-DVISmkX7.jpg",
      "/assets/expense-sbI4i9tg.jpg",
      "/assets/habitflow-BhEplUHh.jpg",
      "/assets/mindpixel-Bx0qpjdU.jpg",
    ],
    []
  );

  // Preload main image
  const imgPreloaded = useMemo(
    () =>
      new Promise<void>((resolve) => {
        if (typeof window === "undefined") return resolve();
        const img = new Image();
        img.src = heroMaskImg;
        if (img.complete) resolve();
        else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      }),
    [heroMaskImg]
  );

  // Auto start scramble after small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrambleStarted(true);
      setInitialOverlayVisible(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Text flip / scramble animation from RAHUL to PORTFOLIO
  useEffect(() => {
    if (!scrambleStarted) return;
    const targetWord = "PORTFOLIO";
    const initialWord = portfolioData.wordmark;
    let step = 0;
    let intervalId: NodeJS.Timeout;
    let cancelled = false;
    let ctx: gsap.Context;

    imgPreloaded.then(() => {
      if (cancelled) return;
      intervalId = setInterval(() => {
        setDisplayText(() =>
          targetWord
            .split("")
            .map((char, idx) => {
              if (idx < Math.floor(step)) return targetWord[idx];
              if (idx < initialWord.length) return initialWord[idx];
              return "";
            })
            .join("")
        );

        if (step >= 9) {
          clearInterval(intervalId);
          setDisplayText("PORTFOLIO");

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = "auto";
                onCompleteRef.current?.();
              },
            });

            const isMobile = window.innerWidth < 768;
            tl.to(
              containerRef.current,
              {
                top: isMobile ? "22%" : "74%",
                duration: 2.2,
                ease: "power3.inOut",
              },
              "+=0.25"
            );

            tl.fromTo(
              [roleTextRef.current, actionBtnsRef.current],
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.4, stagger: 0.25, ease: "power3.out" },
              "-=1.2"
            );

            tl.call(() => setCanvasPlay(true), undefined, "-=1.5");

            const offset = isMobile ? window.innerWidth * 0.26 : Math.min(360, window.innerWidth * 0.24);
            tl.to(leftHalfRef.current, { x: -offset, duration: 2.2, ease: "power3.out" }, "<");
            tl.to(rightHalfRef.current, { x: offset, duration: 2.2, ease: "power3.out" }, "<");
          });
        }
        step += 1 / 3;
      }, 65);
    });

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      ctx?.revert();
    };
  }, [scrambleStarted, imgPreloaded]);

  const displayHeadingClass =
    "flex items-baseline text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase select-none";
  const metallicGradientClass =
    "text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: "radial-gradient(circle, #222222 0%, #000000 80%)" }}
    >
      {/* Dark frosted overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />

      {/* Main Big Center Display Text */}
      <div
        ref={containerRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={headingRef}
          className={`${displayHeadingClass} ${metallicGradientClass} transition-opacity duration-300 ${
            scrambleStarted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span ref={leftHalfRef} className="inline-block">
            {displayText.slice(0, 4)}
          </span>
          <span ref={rightHalfRef} className="inline-block">
            {displayText.slice(4)}
          </span>
        </h1>

        {/* Initial wordmark overlay before scramble */}
        {initialOverlayVisible && (
          <div className="absolute top-0 left-0 transition-opacity duration-300 opacity-100">
            <div className={`${displayHeadingClass} ${metallicGradientClass}`}>
              {portfolioData.wordmark}
            </div>
          </div>
        )}

        {/* Subtitle / Role Tag */}
        <p
          ref={roleTextRef}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-8 text-white text-base md:text-2xl lg:text-3xl drop-shadow-md z-10 opacity-0 w-max pointer-events-auto"
        >
          <span className="font-bold">{portfolioData.role.bold}</span>{" "}
          <span className="font-light italic text-gray-300 font-serif">
            {portfolioData.role.light}
          </span>
        </p>

        {/* Action Button Pill */}
        <div
          ref={actionBtnsRef}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-12 md:left-auto md:right-16 flex items-center gap-2 md:gap-4 pointer-events-auto z-10 opacity-0 w-max"
        >
          <a
            href="#contact"
            aria-label="Go to contact"
            className="group w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#8ee0c6]/40 flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-[#8ee0c6]/15 hover:border-[#8ee0c6] shadow-[0_0_15px_rgba(142,224,198,0.2)] transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4 text-[#8ee0c6] transition-transform duration-300 group-hover:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-[#8ee0c6]/40 flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-[#8ee0c6]/15 hover:border-[#8ee0c6] shadow-[0_0_15px_rgba(142,224,198,0.2)] transition-all cursor-pointer group"
          >
            <span className="text-[#8ee0c6] text-xs md:text-base italic font-light font-serif tracking-wider group-hover:text-white transition-colors">
              Contact
            </span>
          </a>
        </div>
      </div>

      {/* Sizing Anchor Mask Image (invisible - WebGL canvas draws the pixel mosaic) */}
      <div className="absolute inset-x-0 top-[28vh] md:top-[2vh] z-10 text-center text-white flex flex-col items-center w-full pointer-events-none">
        <img
          ref={anchorImgRef}
          src={heroMaskImg}
          alt=""
          aria-hidden="true"
          className="invisible w-auto max-w-none h-[110vh] md:h-[143vh]"
        />
      </div>

      {/* Interactive WebGL particle mosaic canvas */}
      <HeroCanvas
        src={heroMaskImg}
        thumbs={thumbs}
        anchorRef={anchorImgRef}
        play={true}
        label={`Portrait of ${portfolioData.name} made of tiles from his projects`}
        className="z-10"
      />
    </section>
  );
}
