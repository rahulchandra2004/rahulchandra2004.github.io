"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MarqueeRowProps {
  items: string[];
  copies: number;
  duration: number;
  reverse?: boolean;
}

function MarqueeRow({ items, copies, duration, reverse }: MarqueeRowProps) {
  const fullItems = Array.from({ length: copies }, () => items).flat();
  return (
    <div className="marquee-row" aria-hidden="true">
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {[...fullItems, ...fullItems].map((item, idx) => (
          <span
            key={idx}
            className="mx-1 md:mx-1.5 inline-flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 md:px-4 md:py-2 text-[13px] md:text-[14px] font-mono tracking-wide text-gray-300 transition-colors duration-300 hover:border-[#c85635]/40 hover:bg-[#c85635]/5 hover:text-white"
          >
            <span className="h-1 w-1 shrink-0 bg-[#c85635]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const txt = textRef.current;
    if (!sec || !txt) return;

    const ctx = gsap.context(() => {
      // Intro title reveal
      gsap.from("[data-intro]", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          once: true,
        },
      });

      // Word-by-word lighting scrub on scroll
      const words = txt.querySelectorAll(".word");
      if (words.length) {
        gsap.fromTo(
          words,
          { color: "#52525b", opacity: 0.25 },
          {
            color: "#ffffff",
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: txt,
              start: "top 85%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      }
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#050505] text-white pt-24 pb-0 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,92,61,0.05) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full z-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left Column: Heading */}
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.32em] text-[#c85635] mb-4 md:mb-6">
              About me
            </span>
            <h2
              data-intro
              className="text-[18vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700 drop-shadow-2xl leading-[0.85]"
            >
              Intro
            </h2>
          </div>

          {/* Right Column: Bio Card with scroll scrub */}
          <div className="relative bg-white/5 backdrop-blur-md px-5 py-7 md:p-10 lg:p-12 rounded-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-[#c85635]/40 hover:shadow-[0_12px_45px_rgba(200,86,53,0.08)] transition-all duration-300 text-left">
            <p
              ref={textRef}
              lang="en"
              className="text-gray-300 text-[15px] sm:text-base md:text-lg lg:text-xl leading-[1.7] md:leading-relaxed font-light text-pretty"
            >
              {portfolioData.bioWords.map((item, idx) => (
                <React.Fragment key={idx}>
                  <span className={`word inline-block ${item.className || ""}`}>
                    {item.text}
                  </span>
                  {idx < portfolioData.bioWords.length - 1 && " "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* The Stack Marquee Shelf */}
      <div className="relative mt-auto -mx-6 md:-mx-16 pt-10 pb-2 bg-[#030303]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c85635]/20 to-transparent" />
        <div className="flex items-center gap-4 px-6 md:px-16 mb-6">
          <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.32em] text-[#c85635] whitespace-nowrap">
            The stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#c85635]/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-2.5 md:gap-3">
          {portfolioData.stackRows.map((row) => (
            <MarqueeRow
              key={row.label}
              items={row.items}
              copies={row.copies}
              duration={row.duration}
              reverse={row.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
