"use client";

import React, { useState, useEffect, useRef } from "react";

const font5x7: Record<string, string> = {
  A: ".###./#...#/#...#/#####/#...#/#...#/#...#",
  B: "####./#...#/#...#/####./#...#/#...#/####.",
  C: ".###./#...#/#..../#..../#..../#...#/.###.",
  D: "####./#...#/#...#/#...#/#...#/#...#/####.",
  E: "#####/#..../#..../####./#..../#..../#####",
  F: "#####/#..../#..../####./#..../#..../#....",
  G: ".###./#...#/#..../#..##/#...#/#...#/.###.",
  H: "#...#/#...#/#...#/#####/#...#/#...#/#...#",
  I: "#####/..#../..#../..#../..#../..#../#####",
  J: "..###/...#./...#./...#./...#./#..#./.##..",
  K: "#...#/#..#./#.#../##.../#.#../#..#./#...#",
  L: "#..../#..../#..../#..../#..../#..../#####",
  M: "#...#/##.##/#.#.#/#...#/#...#/#...#/#...#",
  N: "#...#/##..#/#.#.#/#..##/#...#/#...#/#...#",
  O: ".###./#...#/#...#/#...#/#...#/#...#/.###.",
  P: "####./#...#/#...#/####./#..../#..../#....",
  Q: ".###./#...#/#...#/#...#/#.#.#/#..#./.##.#",
  R: "####./#...#/#...#/####./#.#../#..#./#...#",
  S: ".####/#..../#..../.###./....#/....#/####.",
  T: "#####/..#../..#../..#../..#../..#../..#..",
  U: "#...#/#...#/#...#/#...#/#...#/#...#/.###.",
  V: "#...#/#...#/#...#/#...#/#...#/.#.#./..#..",
  W: "#...#/#...#/#...#/#...#/#.#.#/##.##/#...#",
  X: "#...#/#...#/.#.#./..#../.#.#./#...#/#...#",
  Y: "#...#/#...#/.#.#./..#../..#../..#../..#..",
  Z: "#####/....#/...#./..#../.#.../#..../#####",
  0: ".###./#...#/#..##/#.#.#/##..#/#...#/.###.",
  1: "..#../.##../..#../..#../..#../..#../.###.",
  2: ".###./#...#/....#/...#./..#../.#.../#####",
  3: "#####/...#./..#../...#./....#/#...#/.###.",
  4: "...#./..##./.#.#./#..#./#####/...#./...#.",
  5: "#####/#..../####./....#/....#/#...#/.###.",
  6: "..##./.#.../#..../####./#...#/#...#/.###.",
  7: "#####/....#/...#./..#../.#.../.#.../.#...",
  8: ".###./#...#/#...#/.###./#...#/#...#/.###.",
  9: ".###./#...#/#...#/.####/....#/...#./.##..",
  ".": "...../...../...../...../...../.##../.##..",
  "!": "..#../..#../..#../..#../..#../...../..#..",
  "?": ".###./#...#/....#/..##./..#../...../..#..",
  "-": "...../...../...../#####/...../...../.....",
  " ": "...../...../...../...../...../...../.....",
};

const CELL_EMPTY = 0;
const CELL_SOLID = 1;
const CELL_BROKEN = 2;
const CHAR_W = 5;
const CHAR_H = 7;
const LETTER_SPACING = 1;
const LINE_GAP = 3;
const REGROW_TIME = 1.4;

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
const getLineWidth = (text: string) => Math.max(0, text.length * 6 - LETTER_SPACING);
const getBlockSize = (lines: string[]) => ({
  w: Math.max(1, ...lines.map(getLineWidth)),
  h: lines.length * CHAR_H + (lines.length - 1) * LINE_GAP,
});

function createBrickGrid(lines: string[], cols: number, rows: number, yFrac: number) {
  const grid = new Uint8Array(cols * rows);
  const totalH = getBlockSize(lines).h;
  const startY = Math.max(0, Math.round(rows * yFrac - totalH / 2));

  lines.forEach((line, lineIdx) => {
    const startX = Math.round((cols - getLineWidth(line)) / 2);
    const rowY = startY + lineIdx * 10;

    Array.from(line.toUpperCase()).forEach((char, charIdx) => {
      const bitmap = font5x7[char];
      if (!bitmap) return;
      const colX = startX + charIdx * 6;
      bitmap.split("/").forEach((pattern, r) => {
        for (let c = 0; c < CHAR_W; c++) {
          if (pattern[c] !== "#") continue;
          const gx = colX + c;
          const gy = rowY + r;
          if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
            grid[gy * cols + gx] = CELL_SOLID;
          }
        }
      });
    });
  });

  return grid;
}

interface GameState {
  width: number;
  height: number;
  cell: number;
  cols: number;
  rows: number;
  grid: Uint8Array;
  standing: number;
  ox: number;
  oy: number;
  gap: number;
  accent: string;
  layer: HTMLCanvasElement;
  layerCtx: CanvasRenderingContext2D;
  layerDirty: boolean;
  radius: number;
  paddle: { x: number; y: number; w: number; h: number };
  ball: { x: number; y: number; vx: number; vy: number };
  baseSpeed: number;
  serving: boolean;
  serveDelay: number;
  lives: number;
  phase: "idle" | "attract" | "playing" | "over" | "won";
  clock: number;
  regrow: { cell: number; at: number }[];
  last: number;
  acc: number;
}

export default function BreakoutSection() {
  const lines = ["Hello", "World"];
  const caption = "Break it if you can. It still ships.";
  const startingLives = 3;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState | null>(null);

  const [phase, setPhase] = useState<"idle" | "attract" | "playing" | "over" | "won">("attract");
  const [lives, setLives] = useState(startingLives);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    let animId = 0;

    const renderBricksLayer = () => {
      const game = gameRef.current;
      if (!game) return;
      const { layerCtx, cell, gap, cols, rows, grid, ox, oy } = game;
      layerCtx.clearRect(0, 0, game.width, game.height);
      const brickSize = cell - gap;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const state = grid[r * cols + c];
          if (state !== CELL_EMPTY) {
            layerCtx.fillStyle = state === CELL_SOLID ? "#f2efe9" : "rgba(242,239,233,0.07)";
            layerCtx.fillRect(ox + c * cell, oy + r * cell, brickSize, brickSize);
          }
        }
      }
      game.layerDirty = false;
    };

    const renderFrame = () => {
      const game = gameRef.current;
      if (!game) return;

      if (game.layerDirty) renderBricksLayer();

      ctx.clearRect(0, 0, game.width, game.height);
      ctx.drawImage(game.layer, 0, 0, game.width, game.height);

      if (game.phase !== "playing" && game.phase !== "attract") return;

      // Draw paddle
      const { paddle, ball, radius } = game;
      ctx.fillStyle = game.accent;
      const px = paddle.x - paddle.w / 2;

      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(px, paddle.y, paddle.w, paddle.h, paddle.h / 2)
        : ctx.fillRect(px, paddle.y, paddle.w, paddle.h);
      ctx.fill();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const initGame = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w < 40 || h < 40) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const blockSize = getBlockSize(lines);
      const approxScale = Math.min((w * (w < 520 ? 0.94 : 0.88)) / blockSize.w, (h * 0.56) / blockSize.h);
      const cellSize = clamp(Math.floor(approxScale), 4, 26);
      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);
      const grid = createBrickGrid(lines, cols, rows, clamp(0.3 + (h / w) * 0.12, 0.3, 0.44));

      let standing = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === CELL_SOLID) standing++;
      }

      const layer = document.createElement("canvas");
      layer.width = canvas.width;
      layer.height = canvas.height;
      const layerCtx = layer.getContext("2d")!;
      layerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gameRef.current = {
        width: w,
        height: h,
        cell: cellSize,
        cols,
        rows,
        grid,
        standing,
        ox: (w - cols * cellSize) / 2,
        oy: (h - rows * cellSize) / 2,
        gap: Math.max(1, Math.round(cellSize * 0.22)),
        accent: "#e8e4dc",
        layer,
        layerCtx,
        layerDirty: true,
        radius: clamp(cellSize * 0.5, 4, 9),
        paddle: {
          x: w / 2,
          w: clamp(w * 0.26, 64, 200),
          h: clamp(cellSize * 0.8, 5, 14),
          y: h - Math.max(26, cellSize * 2.4),
        },
        ball: { x: w / 2, y: 0, vx: 0, vy: 0 },
        baseSpeed: clamp(h * 0.46, 150, 420),
        serving: true,
        serveDelay: 0.6,
        lives: startingLives,
        phase: "attract",
        clock: 0,
        regrow: [],
        last: 0,
        acc: 0,
      };

      setPhase("attract");
      setLives(startingLives);
      renderFrame();
    };

    const getCollidingBricks = () => {
      const g = gameRef.current;
      if (!g) return [];
      const { ball, radius, cell, cols, rows, ox, oy, grid } = g;
      const minC = Math.floor((ball.x - radius - ox) / cell);
      const maxC = Math.floor((ball.x + radius - ox) / cell);
      const minR = Math.floor((ball.y - radius - oy) / cell);
      const maxR = Math.floor((ball.y + radius - oy) / cell);
      const hits: number[] = [];

      for (let r = Math.max(0, minR); r <= Math.min(rows - 1, maxR); r++) {
        for (let c = Math.max(0, minC); c <= Math.min(cols - 1, maxC); c++) {
          if (grid[r * cols + c] === CELL_SOLID) {
            hits.push(r * cols + c);
          }
        }
      }
      return hits;
    };

    const handleCollision = (axis: "x" | "y", dt: number) => {
      const g = gameRef.current;
      if (!g) return;
      const { ball } = g;

      if (axis === "x") ball.x += ball.vx * dt;
      else ball.y += ball.vy * dt;

      const hits = getCollidingBricks();
      if (!hits.length) return;

      const isAttract = g.phase === "attract";
      hits.forEach((idx) => {
        g.grid[idx] = CELL_BROKEN;
        g.standing--;
        if (isAttract) {
          g.regrow.push({ cell: idx, at: g.clock + REGROW_TIME });
        }
      });
      g.layerDirty = true;

      if (axis === "x") {
        ball.x -= ball.vx * dt;
        ball.vx = -ball.vx;
      } else {
        ball.y -= ball.vy * dt;
        ball.vy = -ball.vy;
      }
    };

    const resetServe = () => {
      const g = gameRef.current;
      if (!g) return;
      g.serving = true;
      g.serveDelay = 0.8;
      g.ball.vx = 0;
      g.ball.vy = 0;
    };

    const setGamePhase = (newPhase: "idle" | "attract" | "playing" | "over" | "won") => {
      if (gameRef.current) gameRef.current.phase = newPhase;
      setPhase(newPhase);
    };

    const tick = (dt: number) => {
      const g = gameRef.current;
      if (!g) return;
      const { ball, paddle, radius } = g;
      const isAttract = g.phase === "attract";

      // Regrow broken bricks in attract mode
      g.clock += dt;
      while (g.regrow.length && g.regrow[0].at <= g.clock) {
        const item = g.regrow.shift()!;
        if (g.grid[item.cell] === CELL_BROKEN) {
          g.grid[item.cell] = CELL_SOLID;
          g.standing++;
          g.layerDirty = true;
        }
      }

      // Attract mode AI paddle tracks ball
      if (isAttract && !g.serving) {
        paddle.x = clamp(paddle.x + (ball.x - paddle.x) * Math.min(1, dt * 7), paddle.w / 2, g.width - paddle.w / 2);
      }

      // Serving ball
      if (g.serving) {
        ball.x = paddle.x;
        ball.y = paddle.y - radius - 1;
        if (Number.isFinite(g.serveDelay)) {
          g.serveDelay -= dt;
          if (g.serveDelay <= 0) {
            g.serving = false;
            ball.vx = g.baseSpeed * 0.35 * (Math.random() < 0.5 ? -1 : 1);
            ball.vy = -g.baseSpeed;
          }
        }
        return;
      }

      // Physics step
      handleCollision("x", dt);
      handleCollision("y", dt);

      // Walls
      if (ball.x - radius < 0) {
        ball.x = radius;
        ball.vx = Math.abs(ball.vx);
      }
      if (ball.x + radius > g.width) {
        ball.x = g.width - radius;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y - radius < 0) {
        ball.y = radius;
        ball.vy = Math.abs(ball.vy);
      }

      // Paddle hit
      const hitPaddleX = Math.abs(ball.x - paddle.x) <= paddle.w / 2 + radius;
      const hitPaddleY = ball.vy > 0 && ball.y + radius >= paddle.y && ball.y - radius <= paddle.y + paddle.h;
      if (hitPaddleX && hitPaddleY) {
        const offset = clamp((ball.x - paddle.x) / (paddle.w / 2), -1, 1) * 1.05;
        const curSpeed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.01, g.baseSpeed * 1.45);
        ball.vx = Math.sin(offset) * curSpeed;
        ball.vy = -Math.cos(offset) * curSpeed;
        ball.y = paddle.y - radius - 0.5;
      }

      // Bottom fall
      if (ball.y - radius > g.height) {
        if (isAttract) {
          resetServe();
        } else {
          g.lives--;
          setLives(g.lives);
          if (g.lives <= 0) setGamePhase("over");
          else resetServe();
        }
      }

      if (!isAttract && g.standing === 0) {
        setGamePhase("won");
      }
    };

    const FIXED_STEP = 1 / 120;
    const loop = (timestamp: number) => {
      animId = requestAnimationFrame(loop);
      const g = gameRef.current;
      if (!g) return;

      const dt = g.last ? Math.min((timestamp - g.last) / 1000, 4 * FIXED_STEP) : 0;
      g.last = timestamp;

      if (g.phase === "playing" || g.phase === "attract") {
        g.acc += dt;
        let iters = 0;
        while (g.acc >= FIXED_STEP && iters < 4) {
          tick(FIXED_STEP);
          g.acc -= FIXED_STEP;
          iters++;
        }
        if (iters === 4) g.acc = 0;
      }

      renderFrame();
    };

    initGame();
    animId = requestAnimationFrame(loop);

    const resizeObserver = new ResizeObserver(() => {
      initGame();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  const launchPlayerGame = () => {
    const g = gameRef.current;
    if (!g) return;
    if (g.phase !== "playing") {
      g.phase = "playing";
      g.lives = startingLives;
      g.serving = true;
      g.serveDelay = 0.5;
      setPhase("playing");
      setLives(startingLives);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    const g = gameRef.current;
    if (!container || !g) return;
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    g.paddle.x = clamp(mx, g.paddle.w / 2, g.width - g.paddle.w / 2);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const g = gameRef.current;
    if (!g) return;
    const step = 28;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      g.paddle.x = clamp(g.paddle.x - step, g.paddle.w / 2, g.width - g.paddle.w / 2);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      g.paddle.x = clamp(g.paddle.x + step, g.paddle.w / 2, g.width - g.paddle.w / 2);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      launchPlayerGame();
    }
  };

  return (
    <section id="play" className="bg-[#050505] text-white py-24 md:py-32 px-4 sm:px-6 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="relative">
          {caption && (
            <p className="mb-5 inline-block pb-1 border-b-2 border-[var(--accent)] text-xs sm:text-sm font-medium tracking-wide text-white/80">
              {caption}
            </p>
          )}

          <div
            ref={containerRef}
            role="application"
            aria-roledescription="brick breaker"
            aria-label="Playable headline breakout game. Arrow keys move the paddle, click to launch the ball."
            tabIndex={0}
            onPointerMove={onPointerMove}
            onPointerDown={launchPlayerGame}
            onKeyDown={onKeyDown}
            style={{ touchAction: phase === "playing" ? "none" : "auto" }}
            className={`relative w-full aspect-[5/6] sm:aspect-[4/3] lg:aspect-[16/9] select-none outline-none rounded-sm border border-white/10 bg-[#0a0a0c] overflow-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] ${
              phase === "playing" ? "cursor-none" : "cursor-pointer"
            }`}
          >
            <canvas ref={canvasRef} aria-hidden="true" className="block w-full h-full" />

            {/* Lives Indicator when playing */}
            {phase === "playing" && (
              <div className="absolute top-3 right-3 flex gap-1.5" aria-hidden="true">
                {Array.from({ length: startingLives }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < lives ? "bg-[var(--accent)]" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Controls Bar when not actively playing */}
            {phase !== "playing" && (
              <div className="absolute bottom-4 right-4 flex items-center gap-4 pointer-events-none">
                {(phase === "over" || phase === "won") && (
                  <span
                    className={`bg-[#050505] px-2 py-1 text-xs sm:text-sm tracking-widest uppercase ${
                      phase === "won" ? "text-[var(--accent)]" : "text-white/50"
                    }`}
                  >
                    {phase === "won" ? "Cleared!" : "Game Over"}
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    launchPlayerGame();
                  }}
                  className="pointer-events-auto cursor-pointer px-5 py-2 bg-[#050505] border border-[var(--accent)]/50 text-[var(--accent)] text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {phase === "over" || phase === "won" ? "Again" : "Play"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
