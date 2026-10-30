"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "12 DOF Humanoid Robot",
    category: "Robotics · Bipedal Systems",
    description:
      "Active development of a 12 Degrees of Freedom bipedal humanoid robot. Implementing advanced locomotion control utilizing Finite State Machines (FSM) and Central Pattern Generators (CPG) for stable, dynamic walking gaits and autonomous balance.",
    tags: ["Robotics", "FSM", "CPG", "Embedded Systems"],
    accent: "#a0f0c8",
    year: "2025",
    status: "Active",
    githubUrl: "https://github.com/rahulchandra2004",
  },
  {
    id: "02",
    title: "Facial Emotion Recognition",
    category: "Computer Vision · Deep Learning",
    description:
      "Real-time facial emotion recognition system using CNN and CvT (Compact Vision Transformer) models with DeepFace and OpenCV for emotion classification, complete with a live GUI overlay.",
    tags: ["CNN", "CvT", "DeepFace", "OpenCV", "Python"],
    accent: "#f0a0c8",
    year: "2025",
    status: "Completed",
    githubUrl: "https://github.com/rahulchandra2004/machine_learning-emotion-detection-model",
  },
  {
    id: "04",
    title: "Quick Commerce Dashboard",
    category: "Data Visualization · Power BI",
    description:
      "Interactive Power BI dashboard tracking orders, revenue, and delivery times across platforms like Swiggy Instamart and Blinkit. Built during Microsoft AICTE Elevate internship.",
    tags: ["Power BI", "DAX", "Data Modeling", "Swiggy", "Blinkit"],
    accent: "#f0d8a0",
    year: "2026",
    status: "Completed",
    githubUrl: "https://github.com/rahulchandra2004/Quick-Commerce-Dashboard",
  },
  {
    id: "05",
    title: "Energy & Weather Forecasting",
    category: "Time Series · Deep Learning",
    description:
      "Temporal deep learning models (LSTM, RNN) for energy consumption forecasting paired with regression models for live weather data stream analysis and prediction.",
    tags: ["LSTM", "RNN", "TensorFlow", "Time Series", "Regression"],
    accent: "#a0d4f0",
    year: "2025",
    status: "Completed",
    githubUrl: "https://github.com/rahulchandra2004/energy-consumption-prediction",
    githubUrl2: "https://github.com/rahulchandra2004/Weather-Data-Analysis-and-Prediction",
  },
  {
    id: "06",
    title: "MNIST Digit Recognition",
    category: "ML · Image Classification",
    description:
      "Implemented and benchmarked CNN, DNN, and RNN digit classification models trained with TensorFlow/Keras on the MNIST dataset, comparing architectures for accuracy and efficiency.",
    tags: ["TensorFlow", "Keras", "CNN", "DNN", "RNN", "MNIST"],
    accent: "#c8f0a0",
    year: "2025",
    status: "Completed",
    githubUrl: "https://github.com/rahulchandra2004/mnist-digit-recognition",
  },
  {
    id: "07",
    title: "Gas Leakage Detection System",
    category: "IoT · Embedded Systems",
    description:
      "Real-time gas leakage detection system using C++, Arduino, and GSM module to trigger instant SMS alerts when dangerous gas levels are detected, a safety-critical IoT solution.",
    tags: ["C++", "Arduino", "GSM", "IoT", "Embedded Systems"],
    accent: "#f0c8a0",
    year: "2025",
    status: "Completed",
    githubUrl: "https://github.com/rahulchandra2004/gas-leakage-detection-system",
  },
];

function StatusBadge({ status, accent }: { status: string; accent: string }) {
  const isActive = status === "Active";
  return (
    <span
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{
        background: `${accent}15`,
        color: accent,
        border: `1px solid ${accent}30`,
      }}
    >
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
      )}
      {status}
    </span>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}33`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${project.accent}12, 0 0 0 1px ${project.accent}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="p-7 md:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-mono font-bold tracking-widest" style={{ color: project.accent }}>
            {project.id}
          </span>
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} accent={project.accent} />
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
              {project.year}
            </span>
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] mb-2 font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
          {project.category}
        </p>

        <h3 className="font-bold tracking-tight leading-tight mb-4"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#ffffff" }}>
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.42)", lineHeight: "1.75" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.45)",
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link(s) */}
        <div className="flex flex-wrap gap-4">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: project.accent }}
          >
            View on GitHub →
          </motion.a>
          {"githubUrl2" in project && project.githubUrl2 && (
            <motion.a
              href={project.githubUrl2}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Weather repo →
            </motion.a>
          )}
        </div>
      </div>

      {/* Corner glow */}
      <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${project.accent}10 0%, transparent 70%)`, transform: "translate(30%, 30%)" }} />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36" style={{ background: "#0d0d10" }}>
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,240,200,0.04) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,110,246,0.04) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4 font-medium" style={{ color: "var(--accent)" }}>
            Selected Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-bold tracking-tight leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#ffffff" }}>
              My{" "}
              <span style={{
                background: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Projects</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed md:text-right md:pb-3"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              From bipedal robots to real-time emotion recognition: projects that push
              the boundary of intelligent systems.
            </p>
          </div>
          <div className="mt-10 h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(160,240,200,0.3), rgba(123,110,246,0.3), transparent)" }} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
