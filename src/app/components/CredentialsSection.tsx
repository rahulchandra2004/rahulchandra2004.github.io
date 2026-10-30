"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData, EducationItem, CertificationItem } from "@/data/portfolioData";

export default function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="bg-[#050505] text-white pt-24 pb-24 px-6 md:px-16 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,86,53,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-500 mb-3 block">
              Academic & Industry Standing
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800">
                Education &{" "}
              </span>
              <span className="font-light italic text-[#c85635] font-serif lowercase">
                credentials
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm md:text-base font-light max-w-sm md:text-right">
            Verified university degrees, enterprise cloud certifications, and technical accreditations from Google, Oracle, Microsoft, and IBM.
          </p>
        </div>

        {/* ── Academic Background Cards ── */}
        <div className="mb-20">
          <h3 className="text-xs uppercase tracking-[0.28em] text-[#c85635] font-semibold mb-6 flex items-center gap-3">
            <span>Degrees & Academics</span>
            <span className="h-px flex-1 bg-white/10" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.educationList.map((edu: EducationItem, i: number) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-xl p-7 md:p-8 bg-white/[0.025] backdrop-blur-md border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.15)] group"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${edu.accent}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 50px ${edu.accent}10`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    {edu.icon === "degree" ? (
                      <span
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-lg"
                        style={{ background: `${edu.accent}18`, color: edu.accent }}
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 1.5 9 1.5 12 0v-5" />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-lg"
                        style={{ background: `${edu.accent}18`, color: edu.accent }}
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                          <path d="M8 7h8M8 11h6" />
                        </svg>
                      </span>
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-medium mt-1" style={{ color: edu.accent }}>
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400">
                    {edu.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.details.map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2.5 py-1 rounded-xl font-mono"
                      style={{
                        background: `${edu.accent}12`,
                        border: `1px solid ${edu.accent}25`,
                        color: edu.accent,
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Verified Certifications Grid ── */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.28em] text-[var(--accent)] font-semibold mb-6 flex items-center gap-3">
            <span>Verified Certifications & Accreditations</span>
            <span className="h-px flex-1 bg-white/10" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.certificationsList.map((cert: CertificationItem, i: number) => {
              const CardTag = cert.link ? "a" : "div";

              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <CardTag
                    href={cert.link}
                    target={cert.link ? "_blank" : undefined}
                    rel={cert.link ? "noopener noreferrer" : undefined}
                    className={`h-full rounded-xl p-5 flex flex-col justify-between bg-white/[0.025] backdrop-blur-md border border-white/[0.07] hover:border-white/20 transition-all duration-300 group ${
                      cert.link ? "cursor-pointer" : ""
                    }`}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}45`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${cert.accent}12`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border"
                          style={{
                            background: `${cert.accent}18`,
                            borderColor: `${cert.accent}35`,
                            color: cert.accent,
                          }}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>

                        {cert.link && (
                          <span className="text-[11px] font-mono text-gray-500 group-hover:text-white transition-colors flex items-center gap-1">
                            Verify ↗
                          </span>
                        )}
                      </div>

                      <h5 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-white transition-colors">
                        {cert.name}
                      </h5>
                    </div>

                    <p className="text-xs font-medium pt-3 border-t border-white/[0.05]" style={{ color: cert.accent }}>
                      {cert.org}
                    </p>
                  </CardTag>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
