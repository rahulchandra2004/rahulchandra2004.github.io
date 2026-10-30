"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";
import Overlay from "./Overlay";

// ─── Config ───────────────────────────────────────────────────────────────────
const FRAME_COUNT = 144;
const FRAME_BASE = "/sequence/";

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_BASE}frame_${padded}_delay-0.042s.webp`;
}

// ─── Cover-scale helper (object-fit: cover math) ──────────────────────────────
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}

// ─── Scroll Hint ──────────────────────────────────────────────────────────────
function ScrollHint({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
    >
      <span
        className="text-xs font-light"
        style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.3em" }}
      >
        SCROLL
      </span>
      <div className="w-px h-10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full"
          animate={{
            height: ["0%", "100%", "0%"],
            top: ["0%", "0%", "100%"],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "var(--accent)" }}
        />
      </div>
    </motion.div>
  );
}

// ─── ScrollyCanvas ────────────────────────────────────────────────────────────
export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const dprRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Render a specific frame index ─────────────────────────────────────────
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    drawCover(ctx, img, w, h);
  }, []);

  // ── Preload all frames ───────────────────────────────────────────────────
  useEffect(() => {
    imagesRef.current = [];
    loadedRef.current = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedRef.current += 1;
        if (i === 0) renderFrame(0);
      };
      imagesRef.current[i] = img;
    }
  }, [renderFrame]);

  // ── Canvas resize ────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Scroll → frame index ─────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      renderFrame(frameIndex);
    });
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "120vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas: fills full viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 object-cover"
          style={{ 
            background: "#0c0c0e",
            filter: "blur(6px) brightness(0.4)" 
          }}
        />

        {/* Radial vignette for cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(12,12,14,0.65) 100%)",
          }}
        />

        {/* Bottom fade-out into projects section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(12,12,14,0.8) 60%, #0c0c0e 100%)",
          }}
        />

        {/* Parallax text overlays */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Scroll hint */}
        <ScrollHint scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
