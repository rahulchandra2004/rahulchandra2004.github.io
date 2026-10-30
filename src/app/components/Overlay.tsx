"use client";

import { useTransform, motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const RobotModel = dynamic(() => import("./RobotModel"), { ssr: false });

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

function AnimatedWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────
function HeroSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 md:px-20 pointer-events-none gap-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center md:items-start md:justify-center w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs uppercase font-medium mb-6"
          style={{ color: "var(--accent)", letterSpacing: "0.35em" }}
        >
          Portfolio · 2026
        </motion.p>

        {/* Full name: all bold white */}
        <h1
          className="font-black leading-[1.0] tracking-tighter mb-5"
          style={{ fontSize: "clamp(3.2rem, 9vw, 9.5rem)", color: "#ffffff" }}
        >
          <AnimatedWord text="Rahul" delay={0.1} />
          <br />
          <AnimatedWord text="Chandra" delay={0.28} />
          <br />
          <AnimatedWord text="Padamuttam" delay={0.44} />
        </h1>

        <p
          className="font-light tracking-wide max-w-lg"
          style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.05rem)", color: "rgba(255,255,255,0.45)" }}
        >
          <AnimatedWord text="B.Tech" delay={0.62} />
          &nbsp;
          <AnimatedWord text="Computer" delay={0.68} />
          &nbsp;
          <AnimatedWord text="Engineering" delay={0.74} />
          &nbsp;·&nbsp;
          <AnimatedWord text="NIAMT" delay={0.80} />
          &nbsp;
          <AnimatedWord text="Ranchi" delay={0.86} />
        </p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 h-px w-28 origin-center md:origin-left"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
        />
      </div>

      <div className="flex-1 w-full h-[40vh] md:h-[60vh] pointer-events-auto relative hidden md:block">
        <RobotModel />
      </div>
    </motion.div>
  );
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  return (
    <div className="absolute inset-0 z-10">
      <HeroSection scrollYProgress={scrollYProgress} />
    </div>
  );
}
