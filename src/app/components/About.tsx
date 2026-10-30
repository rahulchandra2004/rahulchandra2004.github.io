"use client";

import { motion } from "framer-motion";
import SkillsGraph from "./SkillsGraph";

const skillGroups = [
  {
    label: "Languages",
    accent: "#a0f0c8",
    skills: ["Python", "C++", "Java", "C"],
  },
  {
    label: "ML / AI",
    accent: "#7b6ef6",
    skills: ["TensorFlow", "Keras", "Scikit-Learn", "Deep Learning", "Generative AI", "Prompt Engineering"],
  },
  {
    label: "Data Science",
    accent: "#f0a0c8",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Visualization", "Excel Analytics"],
  },
  {
    label: "Cloud & Platforms",
    accent: "#f0d8a0",
    skills: ["AWS", "IBM Watson Studio", "Cognitive Class", "Power BI", "Azure"],
  },
  {
    label: "Hardware / IoT",
    accent: "#a0d4f0",
    skills: ["Arduino", "Sensors", "Embedded Systems", "Edge Computing"],
  },
  {
    label: "Tools & Other",
    accent: "#c8f0a0",
    skills: ["GitHub", "OpenCV", "Technical Program Mgmt", "Cybersecurity Awareness"],
  },
];

function SkillGroup({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full" style={{ background: group.accent }} />
        <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: group.accent }}>
          {group.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.05, borderColor: group.accent }}
            className="text-sm px-3 py-1.5 rounded-full font-medium transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(255,255,255,0.08)`,
              color: "rgba(255,255,255,0.65)",
              cursor: "default",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36" style={{ background: "#0c0c0e" }}>
      {/* Ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,110,246,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            About me
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="font-bold tracking-tight leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#ffffff" }}>
              Technical{" "}
              <span style={{
                background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Skills</span>
            </h2>
          </div>
          <div className="mt-10 h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(160,240,200,0.3), rgba(123,110,246,0.3), transparent)" }} />
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-8 md:items-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex-1">
            <h3 className="font-bold text-xl text-white mb-3">Rahul Chandra Padamuttam</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
              3rd-year B.Tech Computer Engineering student at the National Institute of Advanced
              Manufacturing Technology, Ranchi. Passionate about machine learning, robotics, and open-source.
              Actively interning and building real-world projects from bipedal robots to computer vision systems.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Location", text: "Ongole, Andhra Pradesh, India" },
                { label: "Email", text: "rahulpc1981@gmail.com" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                  <span className="font-mono text-gray-400">{item.label}:</span>
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 md:flex-col">
            <a href="https://www.linkedin.com/in/rahul-chandra-padamuttam-6b5888330" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-center"
              style={{
                background: "rgba(200,86,53,0.1)", border: "1px solid rgba(200,86,53,0.3)",
                color: "var(--accent)", transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(160,240,200,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(160,240,200,0.1)"; }}
            >LinkedIn</a>
            <a href="https://github.com/rahulchandra2004" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-center"
              style={{
                background: "rgba(123,110,246,0.1)", border: "1px solid rgba(123,110,246,0.2)",
                color: "var(--violet)", transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(123,110,246,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(123,110,246,0.1)"; }}
            >GitHub</a>
          </div>
        </motion.div>

        {/* 3D Skills Interactive Matrix (Desktop Only) */}
        <div className="mt-8 hidden md:block">
          <SkillsGraph />
        </div>

        {/* Static Skills Grid (Mobile Only) */}
        <div className="grid grid-cols-1 md:hidden gap-4 mt-8">
          {skillGroups.map((group, index) => (
            <SkillGroup key={group.label} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
