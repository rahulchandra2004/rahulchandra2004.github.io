"use client";

import React, { useEffect, useRef } from "react";

// Cell pitch for slightly more pixelated, stylized square mosaic tiles
const Hi = (e: number) => Math.min(4.5, Math.max(3.2, e / 230));
const Ui = 0.06;

const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 aHome;   // 0..1 inside anchor rect
in vec3 aAir;    // x,y 0..1 over canvas, z = depth
in vec4 aInfo;   // brightness, delay, duration, phase
in vec2 aCell;   // x = pitch, y = isDust (0 tile, 1 dust)

uniform vec2 uRes;       // canvas, CSS px
uniform vec4 uRect;      // anchor x, y, w, h in canvas CSS px
uniform float uCell;     // tile pitch, CSS px
uniform float uDpr;
uniform float uTime;     // seconds
uniform float uReveal;   // seconds since play
uniform float uScatter;  // 0 = face, 1 = blown back into air
uniform vec2 uMouse;     // CSS px

out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;
out float vDust;

float inOut(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float bright = aInfo.x;
  float delay  = aInfo.y;
  float dur    = aInfo.z;
  float phase  = aInfo.w;
  float depth  = aAir.z;
  float isDust = aCell.y;

  vec2 drift = vec2(sin(uTime * 0.31 + phase * 6.283), cos(uTime * 0.23 + phase * 9.1))
             * (6.0 + 22.0 * (1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  float appear = smoothstep(0.0, 0.8, uReveal - delay * 0.35);
  float fly    = isDust > 0.5 ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  float q = clamp(uScatter * 1.7 - phase * 0.7, 0.0, 1.0);
  q = q * q;

  float k = e * (1.0 - q);
  vec2 pos = mix(air, home, k);

  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.18 * sin(3.14159 * k) * (phase - 0.5);

  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m / ml : vec2(0.0)) * (1.0 - smoothstep(0.0, 120.0, ml)) * 22.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.2, 0.9, depth);
  float tile  = uCell * (0.94 + 0.20 * bright);
  float size  = mix(speck, tile, land);

  float dustA = isDust > 0.5 ? mix(0.55, 0.22, smoothstep(2.0, 4.0, uReveal)) : 1.0;
  vAlpha  = appear * mix(0.25 + 0.55 * (1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vPhase  = phase;
  vDust   = isDust;

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float uTime;

in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;
in float vDust;
out vec4 outColor;

void main() {
  // Square pixel tile geometry with tactile bevel
  vec2 uv = abs(gl_PointCoord - vec2(0.5));
  float maxCoord = max(uv.x, uv.y);
  
  // Sharp square tile edges with micro-bevel: 1.0 inside, falling to 0.0 at boundary
  float tileMask = 1.0 - smoothstep(0.42, 0.49, maxCoord);
  float innerHighlight = (1.0 - smoothstep(0.0, 0.42, maxCoord)) * 0.16;

  // Pure silver-grey / metallic monochrome palette:
  // Dark obsidian slate for sunglasses & deep shadows (~0.08 - 0.16)
  // Brushed titanium / cool silver for midtones (~0.65 - 0.80)
  // Specular silver-white for diamond highlights & reflections (~0.95 - 1.0)
  float b = vBright;
  vec3 darkSlate  = vec3(0.08, 0.09, 0.12);
  vec3 coolSilver = vec3(0.70, 0.74, 0.82);
  vec3 pureWhite  = vec3(0.98, 0.99, 1.00);

  vec3 greyTone = mix(darkSlate, coolSilver, smoothstep(0.12, 0.58, b));
  greyTone = mix(greyTone, pureWhite, smoothstep(0.58, 0.96, b));

  // Subtle metallic micro-twinkle across silver tiles
  float shimmer = 0.96 + 0.06 * sin(uTime * 2.2 + vPhase * 37.0);
  vec3 tileColor = (greyTone * shimmer + innerHighlight);

  // Floating ambient specks (circular)
  float circleDist = length(gl_PointCoord - vec2(0.5));
  float circleMask = 1.0 - smoothstep(0.35, 0.50, circleDist);
  vec3 dustColor = vec3(0.80, 0.86, 0.96);

  bool isDust = vDust > 0.5;
  vec3 rgb = isDust ? dustColor : tileColor;
  float shapeMask = isDust ? circleMask : tileMask;
  float alpha = vAlpha * shapeMask;

  if (alpha < 0.02) discard;

  outColor = vec4(rgb * alpha, alpha);
}
`;

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compilation failed");
  }
  return shader;
}

function smoothHermite(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function generateParticles(faceImg: HTMLImageElement, width: number, bottomFraction: number) {
  const cell = Hi(width);
  const cols = Math.max(30, Math.round(width / cell));
  const rows = Math.round((cols * faceImg.naturalHeight) / faceImg.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return {
      count: 0,
      cell,
      home: new Float32Array(),
      air: new Float32Array(),
      info: new Float32Array(),
      cellAttr: new Float32Array(),
    };
  }

  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(faceImg, 0, 0, cols, rows);
  const imgData = ctx.getImageData(0, 0, cols, rows).data;

  const home: number[] = [];
  const air: number[] = [];
  const info: number[] = [];
  const cellAttr: number[] = [];

  const addParticle = (x: number, y: number, b: number, isDust: boolean) => {
    home.push(x, y);
    air.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random());
    const delay = 0.45 + Math.random() * 1.3 + y * 0.55;
    const dur = 1.95 + Math.random() * 0.75;
    info.push(b, delay, dur, Math.random());
    cellAttr.push(cell, isDust ? 1 : 0);
  };

  const luminance = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const idx = i * 4;
    luminance[i] =
      ((0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2]) / 255) *
      (imgData[idx + 3] / 255);
  }

  const validLum = Array.from(luminance).filter((v) => v >= 0.01).sort((a, b) => a - b);
  const low = validLum[Math.floor(validLum.length * 0.01)] ?? 0;
  const high = validLum[Math.floor(validLum.length * 0.99)] ?? 1;
  const maxRow = Math.min(rows, Math.ceil(rows * bottomFraction));

  for (let r = 0; r < maxRow; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const alpha = imgData[idx * 4 + 3] / 255;
      if (alpha < 0.05) continue;

      const val = luminance[idx];
      const normalized = Math.min(1, Math.max(0, (val - low) / (high - low || 1)));
      const b = 0.35 * normalized + 0.65 * smoothHermite(0.05, 0.6, normalized);

      addParticle(
        (c + 0.5) / cols,
        (r + 0.5) / rows,
        Math.max(0.12, b),
        false
      );
    }
  }

  const total = home.length / 2;
  const dustCount = Math.round(total * Ui);
  for (let i = 0; i < dustCount; i++) {
    addParticle(0.5, 0.5, 0.3, true);
  }

  return {
    count: home.length / 2,
    cell,
    home: new Float32Array(home),
    air: new Float32Array(air),
    info: new Float32Array(info),
    cellAttr: new Float32Array(cellAttr),
  };
}

interface HeroCanvasProps {
  src: string;
  thumbs?: string[];
  anchorRef: React.RefObject<HTMLImageElement>;
  play: boolean;
  className?: string;
  label?: string;
}

export default function HeroCanvas({
  src,
  anchorRef,
  play,
  className = "",
  label = "Hero interactive canvas",
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(performance.now() / 1000);

  useEffect(() => {
    if (play) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      startTimeRef.current = performance.now() / 1000 - (reduced ? 100 : 0);
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !anchor) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    const fallback = () => {
      anchor.style.visibility = "visible";
      canvas.style.display = "none";
    };

    if (!gl) return fallback();

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
      gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "link error");
      }
    } catch (err) {
      console.error(err);
      return fallback();
    }

    const getU = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: getU("uRes"),
      rect: getU("uRect"),
      cell: getU("uCell"),
      dpr: getU("uDpr"),
      time: getU("uTime"),
      reveal: getU("uReveal"),
      scatter: getU("uScatter"),
      mouse: getU("uMouse"),
    };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const attrDefs = [
      { name: "aHome", size: 2 },
      { name: "aAir", size: 3 },
      { name: "aInfo", size: 4 },
      { name: "aCell", size: 2 },
    ];

    const buffers = attrDefs.map(({ name, size }) => {
      const buf = gl.createBuffer();
      const loc = gl.getAttribLocation(program, name);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      }
      return buf;
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let particleCount = 0;
    let particleCell = 2.4;
    let lastAnchorWidth = -1;
    let faceImage: HTMLImageElement | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rebuildParticles = () => {
      if (!faceImage) return;
      const anchorRect = anchor.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      let w = anchorRect.width;
      let h = anchorRect.height;
      if (w < 10 && faceImage.naturalWidth > 0) {
        h = h >= 10 ? h : (canvasRect.height || window.innerHeight) * 1.35;
        w = h * (faceImage.naturalWidth / faceImage.naturalHeight);
      }

      if (w < 10 || Math.abs(w - lastAnchorWidth) < 1) return;
      lastAnchorWidth = w;

      const topPos = anchorRect.height >= 10 ? anchorRect.top : (canvasRect.height * 0.02);
      const bottomFrac = Math.max(0, Math.min(1, (canvasRect.bottom - topPos) / (h || 1)));
      const res = generateParticles(faceImage, w, bottomFrac);
      particleCount = res.count;
      particleCell = res.cell;

      gl.bindVertexArray(vao);
      [res.home, res.air, res.info, res.cellAttr].forEach((data, i) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[i]);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      });
    };

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onPointerLeave = () => {
      mouse.tx = mouse.ty = -9999;
      mouse.x = mouse.y = -9999;
    };

    let animId = 0;
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cRect = canvas.getBoundingClientRect();
      const nw = Math.round(cRect.width * dpr);
      const nh = Math.round(cRect.height * dpr);
      if (canvas.width !== nw || canvas.height !== nh) {
        canvas.width = nw;
        canvas.height = nh;
      }

      if (faceImage && (!particleCount || lastAnchorWidth < 10)) {
        rebuildParticles();
      }

      if (!particleCount) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        animId = requestAnimationFrame(render);
        return;
      }

      const aRect = anchor.getBoundingClientRect();
      let aLeft = aRect.left - cRect.left;
      let aTop = aRect.top - cRect.top;
      let aW = aRect.width;
      let aH = aRect.height;

      if (aW < 10 && faceImage && faceImage.naturalWidth > 0) {
        aH = aH >= 10 ? aH : cRect.height * 1.35;
        aW = aH * (faceImage.naturalWidth / faceImage.naturalHeight);
        aLeft = (cRect.width - aW) / 2;
        aTop = cRect.height * 0.02;
      }

      const now = performance.now() / 1000;
      const reveal = Math.max(0, now - startTimeRef.current);
      const scatter = reducedMotion ? 0 : Math.min(1, Math.max(0, -cRect.top / (cRect.height * 0.7)));

      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(uniforms.res, cRect.width, cRect.height);
      gl.uniform4f(uniforms.rect, aLeft, aTop, aW, aH);
      gl.uniform1f(uniforms.cell, particleCell);
      gl.uniform1f(uniforms.dpr, dpr);
      gl.uniform1f(uniforms.time, now);
      gl.uniform1f(uniforms.reveal, reveal);
      gl.uniform1f(uniforms.scatter, scatter);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);

      gl.drawArrays(gl.POINTS, 0, particleCount);
      animId = requestAnimationFrame(render);
    };

    // Load asset
    loadImg(src)
      .then((mainImg) => {
        faceImage = mainImg;
        rebuildParticles();
      })
      .catch((err) => {
        console.error("HeroCanvas load error:", err);
        fallback();
      });

    const onResize = () => {
      lastAnchorWidth = -1;
      rebuildParticles();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteProgram(program);
      gl.deleteVertexArray(vao);
      buffers.forEach((buf) => gl.deleteBuffer(buf));
    };
  }, [src, anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
    />
  );
}
