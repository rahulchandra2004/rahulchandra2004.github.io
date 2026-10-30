"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, ProjectItem } from "@/data/portfolioData";

export default function SelectedWorkSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = portfolioData.projectCategories;

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="project"
      className="bg-[#050505] w-full text-white pt-10 md:pt-14 pb-20 px-6 md:px-16 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,86,53,0.04) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-6 lg:gap-0 mb-8 md:mb-10">
        <div className="w-full lg:w-7/12 overflow-visible">
          <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.32em] text-[#c85635] mb-3 block">
            Featured Engineering
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
              Selected{" "}
            </span>
            <span className="font-light italic text-[#c85635] font-serif lowercase">
              work
            </span>
          </h2>
        </div>

        <div className="w-full lg:w-4/12 flex flex-col items-start lg:mt-4">
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
            Engineering robust intelligent systems, autonomous robotics pipelines, and modern web
            architectures tailored for real-world impact and reliability.
          </p>
          <a
            href="#contact"
            className="cursor-pointer px-6 py-2.5 rounded-xl bg-[#c85635] text-white font-semibold text-xs md:text-sm flex items-center gap-2 shadow-[0_4px_20px_rgba(200,86,53,0.25)] hover:bg-[#b34a2c] hover:scale-[1.02] transition-all"
          >
            Get in touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-white"
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

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 mb-8 md:mb-12 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === "All"
              ? portfolioData.projects.length
              : portfolioData.projects.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-[#c85635] text-white font-bold shadow-lg shadow-[rgba(200,86,53,0.25)]"
                  : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-[#c85635]/40 hover:text-[#c85635] hover:bg-[#c85635]/5"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-lg font-mono ${
                  isSelected ? "bg-black/30 text-white font-bold" : "bg-white/10 text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects List */}
      <motion.div layout className="flex flex-col gap-12 lg:gap-20 w-full">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: ProjectItem, idx: number) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.article
                layout
                key={project.id}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center justify-between gap-10 lg:gap-16 w-full group overflow-hidden py-4`}
              >
                {/* Project Image Frame - Slides in from the side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] group-hover:border-white/25 transition-colors"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-gray-200">
                      {project.category}
                    </span>
                  </div>

                  {project.status && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[#c85635] flex items-center gap-1.5">
                        {(project.status === "Active" || project.status === "Ongoing") && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c85635] animate-pulse" />
                        )}
                        {project.status} • {project.year}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Project Info - Slides in from opposite side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                  className="w-full lg:w-5/12 flex flex-col items-start"
                >
                  <span className="text-[#c85635] text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">
                    0{idx + 1}
                  </span>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[1.05] uppercase mb-4">
                    {project.title}{" "}
                    {project.titleItalic && (
                      <span className="text-[#c85635] font-light italic font-serif lowercase">
                        {project.titleItalic}
                      </span>
                    )}
                    {project.titleSuffix && (
                      <span className="block text-xl md:text-2xl text-gray-400 font-semibold tracking-normal mt-1">
                        {project.titleSuffix}
                      </span>
                    )}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-xl border border-[#c85635]/25 bg-[#c85635]/10 text-[#cfc9bc] font-mono hover:border-[#c85635]/45 hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer px-6 py-2.5 rounded-xl bg-[#c85635] text-white text-xs md:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(200,86,53,0.25)] hover:bg-[#b34a2c] hover:scale-[1.02]"
                      >
                        {project.liveLabel}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </a>
                    )}

                    {project.repo && project.repo !== project.live && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer px-6 py-2.5 rounded-xl border border-[#cfc9bc]/40 text-[#cfc9bc] text-xs md:text-sm font-medium hover:border-[#cfc9bc] hover:bg-[#cfc9bc]/10 hover:text-white transition-all inline-flex items-center gap-2"
                      >
                        GitHub Repo
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}

                    {project.repo2 && (
                      <a
                        href={project.repo2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer px-5 py-2.5 rounded-xl border border-white/20 text-gray-400 text-xs hover:text-[#c85635] hover:border-[#c85635]/40 transition-colors inline-flex items-center gap-1.5"
                      >
                        Related Repo →
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
