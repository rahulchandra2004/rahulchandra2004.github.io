"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData, HackathonItem } from "@/data/portfolioData";

function HackathonCard({
  hackathon,
  index,
}: {
  hackathon: HackathonItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-xl overflow-hidden flex flex-col bg-white/[0.025] backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.15)] group"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${hackathon.accent}45`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${hackathon.accent}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top accent accent line */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${hackathon.accent}, transparent)`,
        }}
      />

      <div className="p-7 md:p-9 flex flex-col flex-1">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs uppercase font-semibold tracking-wider px-3 py-1 rounded-xl flex items-center gap-1.5"
              style={{ background: `${hackathon.accent}18`, color: hackathon.accent }}
            >
              {hackathon.highlight ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
              {hackathon.type}
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: hackathon.accent }} />
              {hackathon.badge}
            </span>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400">
            {hackathon.period}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
          {hackathon.name}
        </h3>
        <p className="text-sm font-medium mb-1" style={{ color: hackathon.accent }}>
          {hackathon.subtitle}
        </p>
        <p className="text-xs text-gray-400 mb-5">
          Organized by {hackathon.organizers}
        </p>

        {/* Description */}
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300 font-light flex-1 mb-6">
          {hackathon.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-3 border-t border-white/[0.06]">
          {hackathon.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold transition-all hover:translate-x-1"
              style={{ color: hackathon.accent }}
            >
              {link.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Ambient corner glow */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${hackathon.accent}10 0%, transparent 70%)`,
          transform: "translate(30%, 30%)",
        }}
      />
    </motion.div>
  );
}

export default function HackathonsSection() {
  return (
    <section
      id="hackathons"
      className="bg-[#050505] text-white pt-24 pb-20 px-6 md:px-16 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,86,53,0.04) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-3 block">
              High-Velocity Shipping
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                Hackathon{" "}
              </span>
              <span className="font-light italic text-[#c85635] font-serif lowercase">
                battles
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base font-light max-w-sm md:text-right">
            Competing and prototyping under strict time limits, turning novel ideas into verified code, AI agent systems, and national analytics pipelines.
          </p>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.hackathons.map((h, i) => (
            <HackathonCard key={h.id} hackathon={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
