"use client";

import { motion } from "framer-motion";

const hackathons = [
  {
    id: "01",
    name: "Agents of SigNoz",
    subtitle: "Observe Your AI Solutions",
    organizers: "WeMakeDevs × SigNoz",
    period: "Jul 20 – Jul 26, 2026",
    type: "Online Hackathon",
    status: "Participated",
    accent: "#7b6ef6",
    description:
      "Engineered 'OmniSRE', a closed-loop AI observability and autonomous self-healing system. Leveraged OpenTelemetry and SigNoz to monitor AI agents and automatically remediate pipeline failures.",
    tags: ["AI Agents", "SigNoz", "OpenTelemetry", "Observability", "WeMakeDevs"],
    links: [
      { label: "View Repository", href: "https://github.com/rahulchandra2004/omnisre-signoz-hackathon" },
      { label: "Read Article", href: "https://dev.to/rahulchandra2004/omnisre-closed-loop-ai-observability-and-autonomous-self-healing-1lf4" },
      { label: "Hackathon Page", href: "https://archive.wemakedevs.org/hackathons/signoz/" },
    ],
    badge: "Global Hackathon",
    highlight: true,
  },
  {
    id: "02",
    name: "UIDAI Data Hackathon 2026",
    subtitle: "Aadhaar Lifecycle Analysis",
    organizers: "UIDAI · DigiInfra · NIC · data.gov.in",
    period: "2026",
    type: "Government Hackathon",
    status: "Participated",
    accent: "#f0a050",
    description:
      "Built an end-to-end data pipeline on Aadhaar lifecycle datasets for the national UIDAI hackathon. Applied anomaly detection algorithms, engineered completeness metrics, and created advanced visualizations using Python and Pandas.",
    tags: ["Python", "Pandas", "Anomaly Detection", "Data Engineering", "UIDAI", "Aadhaar"],
    links: [
      { label: "View Repository", href: "https://github.com/rahulchandra2004/UIDAI-Data-Hackathon-2026" },
      { label: "Hackathon Page", href: "https://event.data.gov.in/challenge/uidai-data-hackathon-2026/" },
    ],
    badge: "🇮🇳 Government of India",
    highlight: false,
  },
];

function HackathonCard({
  hackathon,
  index,
}: {
  hackathon: (typeof hackathons)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: hackathon.highlight
          ? `linear-gradient(135deg, rgba(123,110,246,0.08) 0%, rgba(12,12,14,1) 60%)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hackathon.accent}30`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${hackathon.accent}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 70px ${hackathon.accent}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${hackathon.accent}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${hackathon.accent}, transparent)` }} />

      <div className="p-8 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-7">
          <div className="flex flex-col gap-2">
            {/* Type badge */}
            <span
              className="text-xs uppercase font-semibold tracking-widest px-3 py-1 rounded-full w-fit"
              style={{ background: `${hackathon.accent}18`, color: hackathon.accent }}
            >
              {hackathon.type}
            </span>
            {/* Participation badge */}
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              {hackathon.badge}
            </span>
          </div>
          <span
            className="text-xs font-mono px-3 py-1.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {hackathon.period}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-black tracking-tight leading-tight mb-1"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#ffffff" }}
        >
          {hackathon.name}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-medium mb-1" style={{ color: hackathon.accent }}>
          {hackathon.subtitle}
        </p>

        {/* Organizers */}
        <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
          Organized by {hackathon.organizers}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 mb-7"
          style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.8" }}
        >
          {hackathon.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${hackathon.accent}10`,
                border: `1px solid ${hackathon.accent}22`,
                color: hackathon.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-5">
          {hackathon.links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: hackathon.accent }}
            >
              {link.label} →
            </motion.a>
          ))}
        </div>
      </div>

      {/* Corner glow */}
      <div
        className="absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${hackathon.accent}12 0%, transparent 70%)`,
          transform: "translate(30%, 30%)",
        }}
      />
    </motion.div>
  );
}



export default function Communities() {
  return (
    <section
      id="community"
      className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36"
      style={{ background: "#0c0c0e" }}
    >
      {/* Ambient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(123,110,246,0.05) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,160,80,0.04) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            Hackathons
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-bold tracking-tight leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#ffffff" }}
            >
              Hackathon{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7b6ef6 0%, #a0f0c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Battles
              </span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed lg:text-right lg:pb-3"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              Competing, building, and shipping under pressure, hackathons where ideas become prototypes in days.
            </p>
          </div>
          <div className="mt-10 h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(123,110,246,0.4), rgba(160,240,200,0.3), transparent)" }} />
        </motion.div>

        {/* Hackathon cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((h, i) => (
            <HackathonCard key={h.id} hackathon={h} index={i} />
          ))}
        </div>


      </div>
    </section>
  );
}
