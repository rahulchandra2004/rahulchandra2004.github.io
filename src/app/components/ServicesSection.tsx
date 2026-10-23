"use client";

import React, { useState } from "react";
import { portfolioData, ServiceItem } from "@/data/portfolioData";

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const toggleRow = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="service"
      className="bg-[#050505] text-white pt-16 pb-0 px-6 md:px-16 flex flex-col relative overflow-hidden"
    >
      {/* Top Section Header matching user reference */}
      <div className="flex flex-col md:flex-row items-end md:items-start justify-end w-full pb-8 md:pb-12">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-2xl leading-[0.95] text-right uppercase">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
              WHAT WE
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="line block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">
              CAN DO
            </span>
          </span>
        </h2>
      </div>

      {/* Accordion List matching user reference image */}
      <div className="z-10 relative mt-0 -mx-6 md:-mx-16 border-t border-white/15">
        {portfolioData.services.map((service: ServiceItem, idx: number) => {
          const isOpen = activeIdx === idx;
          const isHovered = hoverIdx === idx;
          const isLit = isOpen || isHovered;

          return (
            <div
              key={service.id}
              data-service-row
              className={`relative border-b border-white/15 cursor-pointer transition-colors duration-200 select-none ${
                isLit
                  ? "bg-[#cfc9bc] text-[#121212]"
                  : "bg-transparent text-white hover:bg-white/[0.04]"
              }`}
              onClick={() => toggleRow(idx)}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              {/* Main Row Header (Always visible) */}
              <div className="flex items-center justify-between px-6 md:px-16 py-6 md:py-8">
                <div className="flex items-center gap-6 sm:gap-12 md:gap-20">
                  {/* Number */}
                  <span
                    className={`text-lg sm:text-xl md:text-2xl font-bold font-mono tracking-wider transition-colors duration-200 ${
                      isLit ? "text-[#121212]/80" : "text-gray-400"
                    }`}
                  >
                    {service.id}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-wider transition-colors duration-200 ${
                      isLit ? "text-[#121212]" : "text-white"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Arrow Icon matching reference (↘) */}
                <div className="flex items-center justify-center flex-shrink-0 ml-4">
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
                      isLit ? "text-[#121212]" : "text-gray-400"
                    } ${isOpen ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    {/* Diagonal arrow down-right ↘ */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10M7 7l10 10" />
                  </svg>
                </div>
              </div>

              {/* Expandable Capabilities & Description */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`px-6 md:px-16 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-8 border-t ${
                    isLit ? "border-[#121212]/15 text-[#121212]" : "border-white/10 text-gray-300"
                  }`}
                >
                  {/* Capabilities */}
                  <div>
                    <h4
                      className={`text-xs font-mono uppercase tracking-widest font-semibold mb-3 ${
                        isLit ? "text-[#121212]/70" : "text-[#8ee0c6]"
                      }`}
                    >
                      Core Capabilities
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base font-light">
                      {service.capabilities.map((cap, capIdx) => (
                        <li key={capIdx} className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isLit ? "bg-[#121212]" : "bg-[#8ee0c6]"
                            }`}
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description & Action */}
                  <div className="flex flex-col justify-between items-start gap-5">
                    <p className="text-sm md:text-base font-light leading-relaxed">
                      {service.description}
                    </p>
                    <a
                      href="#project"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-300 ${
                        isLit
                          ? "bg-[#121212] text-white hover:bg-black"
                          : "bg-[#8ee0c6] text-black hover:bg-[#7bcfb4]"
                      }`}
                    >
                      <span>View Projects</span>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
