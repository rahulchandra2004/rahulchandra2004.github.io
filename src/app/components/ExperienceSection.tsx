"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData, ExperienceItem } from "@/data/portfolioData";

function ExperienceCard({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5 md:gap-8 items-start group"
    >
      {/* Timeline Node */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
        <div
          className="w-3 h-3 rounded-full z-10 transition-transform duration-300 group-hover:scale-125"
          style={{
            background: exp.accent,
            boxShadow: `0 0 12px ${exp.accent}60`,
          }}
        />
        {index < portfolioData.experiences.length - 1 && (
          <div
            className="w-px flex-1 mt-3"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
              minHeight: "75px",
            }}
          />
        )}
      </div>

      {/* Card Body */}
      <div
        className="flex-1 rounded-xl p-6 md:p-8 mb-6 bg-white/[0.025] backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:bg-white/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${exp.accent}40`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${exp.accent}12`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <span
              className="text-[11px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-xl mb-2.5 inline-block font-mono"
              style={{ background: `${exp.accent}18`, color: exp.accent }}
            >
              {exp.type}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm md:text-base font-medium mt-1 text-gray-300" style={{ color: exp.accent }}>
              {exp.org}
            </p>
          </div>

          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400">
            {exp.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-400 mb-5 font-light">
          {exp.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="bg-[#050505] text-white pt-24 pb-16 px-6 md:px-16 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,86,53,0.03) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />

      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-3 block">
              Career & Internships
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                Where I&apos;ve{" "}
              </span>
              <span className="font-light italic text-[#c85635] font-serif lowercase">
                worked
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base font-light max-w-sm md:text-right">
            From leading campus robotics teams to specialized research in bipedal locomotion and enterprise machine learning pipelines.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative">
          {portfolioData.experiences.map((exp, idx) => (
            <ExperienceCard key={`${exp.org}-${idx}`} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
