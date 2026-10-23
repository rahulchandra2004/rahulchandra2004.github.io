"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Mantra() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 md:px-12 py-24 md:py-36 bg-[#050505] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(160,240,200,0.04) 0%, rgba(123,110,246,0.03) 40%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center flex flex-col items-center max-w-5xl"
      >
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gray-500 mb-6">
          Philosophy & Vision
        </span>

        {/* Decorative quote mark */}
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.25, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-7xl md:text-8xl font-black leading-none mb-4 block text-[var(--accent)] font-serif select-none"
        >
          &ldquo;
        </motion.span>

        <p
          className="font-bold tracking-tight text-center leading-[1.2] md:leading-[1.18]"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3.6rem)",
            color: "#ffffff",
          }}
        >
          Not your normal{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #a0f0c8 0%, #7b6ef6 100%)",
            }}
          >
            AI engineer
          </span>
          {" "}—
          <br className="hidden sm:inline" />
          <span className="text-gray-400 font-light"> I don&apos;t just write code,</span>{" "}
          <span className="text-white">I engineer</span>
          <br />
          <span
            className="text-transparent bg-clip-text font-black"
            style={{
              backgroundImage: "linear-gradient(135deg, #7b6ef6 0%, #a0f0c8 100%)",
            }}
          >
            end-to-end intelligence
          </span>
          <br className="hidden sm:inline" />
          <span className="text-gray-400 font-light"> bridging open-source algorithms</span>{" "}
          <span className="text-white">and</span>{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #f0d8a0 0%, #f0a0c8 100%)",
            }}
          >
            physical robotics.
          </span>
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-12 bg-white/20" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
            Rahul Chandra Padamuttam
          </span>
          <span className="h-px w-12 bg-white/20" />
        </div>
      </motion.div>
    </section>
  );
}
