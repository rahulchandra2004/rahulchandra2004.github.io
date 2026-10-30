"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi",
    period: "Jan 2024 to Apr 2028",
    accent: "#a0f0c8",
    icon: "degree",
    details: ["Computer Engineering", "Robotics & Automation", "Machine Learning"],
  },
  {
    degree: "Higher Secondary Education",
    institution: "Central Academy Sr. Sec. School",
    period: "Jun 2020 to May 2023",
    accent: "#cfc9bc",
    icon: "school",
    details: ["Science Stream", "Mathematics & Physics"],
  },
];

const certifications = [
  { name: "Gemini Certified University Student", org: "Google for Education", accent: "#a0f0c8", link: "https://www.credential.net/4a181fdd-d149-4031-8ae5-31b253325631" },
  { name: "Oracle Cloud Infrastructure Certified Foundations Associate", org: "Oracle", accent: "#f0d8a0", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=B6A1D0A5370B2EB9EB273914BCC136E13F9AB4858F128F572A303840CAFF7A60" },
  { name: "Microsoft Elevate AICTE: Power BI, AI & ML, Azure", org: "Microsoft × AICTE", accent: "#7b6ef6" },
  { name: "TCS iON Career Edge", org: "TCS", accent: "#7b6ef6" },
  { name: "Cybersecurity Job Simulation", org: "Deloitte", accent: "#f0a0c8" },
  { name: "AI Fundamentals", org: "Cisco & IBM", accent: "#f0d8a0" },
  { name: "AI Upskilling Program", org: "Qualcomm Academy", accent: "#a0d4f0" },
  { name: "Data Science Certification", org: "HP LIFE", accent: "#c8f0a0" },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36"
      style={{ background: "#0c0c0e" }}
    >
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,110,246,0.04) 0%, transparent 70%)", transform: "translate(30%, -50%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Education ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            Education
          </p>
          <h2 className="font-bold tracking-tight leading-none mb-10"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff" }}>
            Academic{" "}
            <span style={{
              background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Background</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${edu.accent}33`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 50px ${edu.accent}10`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-3xl mt-0.5">{edu.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-base leading-tight mb-1">{edu.degree}</h3>
                    <p className="text-sm font-medium" style={{ color: edu.accent }}>{edu.institution}</p>
                  </div>
                </div>
                <span
                  className="text-xs font-mono px-3 py-1.5 rounded-full inline-block mb-4"
                  style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >{edu.period}</span>
                <div className="flex flex-wrap gap-2">
                  {edu.details.map((d) => (
                    <span key={d} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: `${edu.accent}12`, border: `1px solid ${edu.accent}25`, color: edu.accent }}>
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-full mb-16"
            style={{ background: "linear-gradient(90deg, rgba(160,240,200,0.3), rgba(123,110,246,0.3), transparent)" }} />

          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--violet)" }}>
            Honors & Certifications
          </p>
          <h2 className="font-bold tracking-tight leading-none mb-12"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff" }}>
            Credentials &amp;{" "}
            <span style={{
              background: "linear-gradient(135deg, #7b6ef6 0%, #a0f0c8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Recognition</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => {
              const CardWrapper = cert.link ? motion.a : motion.div;
              return (
                <CardWrapper
                  href={cert.link}
                  target={cert.link ? "_blank" : undefined}
                  rel={cert.link ? "noopener noreferrer" : undefined}
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl p-5 flex items-start gap-4"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.25s ease",
                    cursor: cert.link ? "pointer" : "default",
                  }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${cert.accent}10`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center text-sm font-bold mt-0.5"
                  style={{ background: `${cert.accent}18`, color: cert.accent }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm leading-snug mb-1">{cert.name}</p>
                  <p className="text-xs" style={{ color: cert.accent }}>{cert.org}</p>
                </div>
              </CardWrapper>
            )})}
          </div>
        </motion.div>

        {/* ── Contact CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-6 font-medium text-[#c85635]">
            Let&apos;s connect
          </p>
          <h2 className="font-bold tracking-tight mb-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff", lineHeight: 1.05 }}>
            Open to internships
            <br />and collaborations
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:rahulpc1981@gmail.com"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl font-semibold text-sm tracking-wide inline-flex items-center gap-2 bg-[#c85635] text-white shadow-[0_0_40px_rgba(200,86,53,0.2)]"
            >
              <span>rahulpc1981@gmail.com</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/rahul-chandra-padamuttam-6b5888330"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl font-medium text-sm tracking-wide inline-flex items-center gap-2"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(160,240,200,0.3)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <span>Connect on LinkedIn</span>
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
