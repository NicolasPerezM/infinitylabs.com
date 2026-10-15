"use client";

import { Fragment, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { flushSync } from "react-dom";
import type { StepKind } from "@/content/solutions";
import { fill } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { KindGlyph } from "./KindGlyph";
import { KIND_STYLE, type KindLabels } from "./WorkflowDiagram";

/**
 * The AI Opportunity Sprint as one object that changes state (DEC-029). It replaces the three
 * frames of DEC-026/027, which read like a textbook. One axonometric scene, drawn the way the
 * brand draws (hairlines, hatching, hidden edges dashed, mono for what the system writes):
 *
 *   Mapear   — four processes lie on the floor as a plan: steps sized by what they cost, value-stream
 *              triangles where work waits.
 *   Puntuar  — every step becomes an opportunity placed in three dimensions (feasibility × data
 *              readiness on the floor, value as height, with drop lines so position can be read).
 *              The volume that clears all three thresholds is hatched; the three inside are A, B, C.
 *              Risk and change effort, the other two criteria, are in the key. The third dimension is
 *              the point: the featured discard would look like a winner on a value × feasibility chart.
 *   Diseñar  — discards fall to the floor as marks (they are documented, so they stay); A, B and C
 *              rise into typed flows drawn as ribbons, with dashed integrations down to the systems.
 *
 * Plays once when seen, then the phases drive it; drag rotates it. Illustrative data, captioned once.
 * Reduced motion: no play, phases switch instantly. No JS and print: the final state.
 */

// ---- illustrative data --------------------------------------------------------------------------
// Four processes × six steps. Score: [feasibility, value, data readiness, risk, change effort], 0..1.
type Score = [number, number, number, number, number];
const SCORES: Score[] = [
  [0.3, 0.25, 0.7, 0.3, 0.3], [0.55, 0.45, 0.62, 0.4, 0.5], [0.8, 0.9, 0.8, 0.3, 0.4], [0.7, 0.35, 0.4, 0.2, 0.3], [0.2, 0.6, 0.3, 0.7, 0.7], [0.45, 0.2, 0.85, 0.2, 0.2],
  [0.65, 0.7, 0.25, 0.5, 0.5], [0.92, 0.74, 0.72, 0.4, 0.5], [0.35, 0.8, 0.5, 0.8, 0.6], [0.15, 0.3, 0.2, 0.6, 0.8], [0.5, 0.55, 0.65, 0.3, 0.4], [0.75, 0.15, 0.55, 0.2, 0.2],
  [0.25, 0.85, 0.75, 0.5, 0.7], [0.6, 0.4, 0.35, 0.4, 0.4], [0.72, 0.68, 0.92, 0.3, 0.5], [0.4, 0.7, 0.15, 0.6, 0.5], [0.85, 0.45, 0.8, 0.2, 0.3], [0.1, 0.1, 0.5, 0.3, 0.9],
  [0.55, 0.25, 0.3, 0.4, 0.4], [0.3, 0.5, 0.9, 0.5, 0.6], [0.88, 0.86, 0.28, 0.4, 0.5], [0.65, 0.3, 0.6, 0.3, 0.3], [0.2, 0.75, 0.45, 0.7, 0.6], [0.48, 0.62, 0.52, 0.5, 0.5],
];
const STEPS = 6;
const LANE_Z = [0.17, 0.39, 0.61, 0.83];
const STEP_X = [0.1, 0.26, 0.42, 0.58, 0.74, 0.9];
/** [lane, step]: work waits right before this step. */
const WAITS: [number, number][] = [[0, 2], [1, 1], [1, 4], [2, 3], [3, 2], [3, 5]];
/** Thresholds: minimum for feasibility, value, data readiness; maximum for risk and change effort. */
const T = { f: 0.6, v: 0.6, d: 0.55, r: 0.6, e: 0.65 };
const passes = (s: Score) => s[0] >= T.f && s[1] >= T.v && s[2] >= T.d && s[3] <= T.r && s[4] <= T.e;
/** The opportunities that clear all five, by value: A, B, C. */
const KEPT = SCORES.map((s, i) => ({ s, i })).filter(({ s }) => passes(s)).sort((a, b) => b.s[1] - a.s[1]).map(({ i }) => i);
/** High value, high feasibility, data not ready: a winner in two dimensions, a discard in three. */
const FEATURED = 20;
const LETTERS = ["A", "B", "C"];

/** [from lane, from step, to lane, to step]: work handed from one process to another. */
const HANDOFFS: [number, number, number, number][] = [[0, 3, 1, 4], [1, 2, 2, 1], [2, 4, 3, 5]];

// Phase 3: the designed flows (one per kept opportunity) and the step that integrates with the system
// it runs on (a block on the floor, right below that step).
const FLOWS: { kinds: StepKind[]; y: number; z: number; link: number }[] = [
  { kinds: ["input", "ai", "deterministic", "human", "output"], y: 0.98, z: 0.2, link: 2 },
  { kinds: ["input", "deterministic", "ai", "human", "output"], y: 0.74, z: 0.5, link: 4 },
  { kinds: ["input", "agent", "deterministic", "human", "output"], y: 0.5, z: 0.8, link: 2 },
];
const FX = [0.1, 0.3, 0.5, 0.7, 0.9];
const RIBBON = [-0.018, -0.006, 0.006, 0.018];
const BLOCK = { w: 0.2, d: 0.13, h: 0.05 };
/** Where the discards are filed in phase 3: a register of 7 × 3 on the free corner of the floor. */
const REGISTER = { x0: 0.06, dx: 0.045, z0: 0.46, dz: 0.1, cols: 7 };
const DISCARDS = SCORES.map((_, i) => i).filter((i) => !KEPT.includes(i));

// ---- projection -----------------------------------------------------------------------------------
type V3 = [number, number, number];
type Cam = { yaw: number; pitch: number; k: number; cx: number; cy: number };
type P2 = { x: number; y: number; z: number };

const D2R = Math.PI / 180;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const seg = (v: number, a: number, b: number) => smooth(clamp01((v - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const f1 = (n: number) => n.toFixed(1);

/** Camera per phase: yaw and pitch in degrees, and how tall the content is (for the fit). */
const CAMS = [
  { yaw: -10, pitch: 60, top: 0.12 },
  { yaw: -40, pitch: 28, top: 1.05 },
  { yaw: -30, pitch: 22, top: 1.08 },
];

function camera(s: number, yawOff: number, w: number, h: number): Cam {
  const i = s < 1 ? 0 : 1;
  const t = smooth(clamp01(s - i));
  const a = CAMS[i], b = CAMS[i + 1];
  const yaw = (lerp(a.yaw, b.yaw, t) + yawOff) * D2R;
  const pitch = lerp(a.pitch, b.pitch, t) * D2R;
  const top = lerp(a.top, b.top, t);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const padX = w < 560 ? 28 : 56, padT = 30, padB = 30;
  // Rotation-invariant fit: the floor's diagonal for width, so dragging never zooms.
  const ext = top * cp + Math.SQRT2 * sp;
  const k = Math.min((w - padX * 2) / Math.SQRT2, (h - padT - padB) / ext);
  const cy = padT + (h - padT - padB - ext * k) / 2 + (top * cp + (Math.SQRT2 / 2) * sp) * k;
  return { yaw, pitch, k, cx: w / 2, cy };
}

function proj(c: Cam, [x, y, z]: V3): P2 {
  const X = x - 0.5, Z = z - 0.5;
  const cyw = Math.cos(c.yaw), syw = Math.sin(c.yaw), cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
  const X1 = X * cyw - Z * syw, Z1 = X * syw + Z * cyw;
  return { x: c.cx + X1 * c.k, y: c.cy + (Z1 * sp - y * cp) * c.k, z: Z1 * cp + y * sp };
}

const line = (a: P2, b: P2) => `M${f1(a.x)} ${f1(a.y)}L${f1(b.x)} ${f1(b.y)}`;
const poly = (ps: P2[]) => `M${ps.map((p) => `${f1(p.x)} ${f1(p.y)}`).join("L")}Z`;

/** A label laid along a projected edge, upright, pushed away from `away`. */
function edgeLabel(a: P2, b: P2, t: number, off: number, away: P2) {
  const x = lerp(a.x, b.x, t), y = lerp(a.y, b.y, t);
  let ang = Math.atan2(b.y - a.y, b.x - a.x) / D2R;
  if (ang > 90) ang -= 180;
  if (ang < -90) ang += 180;
  let nx = -(b.y - a.y), ny = b.x - a.x;
  const l = Math.hypot(nx, ny) || 1;
  nx /= l; ny /= l;
  if ((x - away.x) * nx + (y - away.y) * ny < 0) { nx = -nx; ny = -ny; }
  return { x: x + nx * off, y: y + ny * off, ang };
}

/** Chevron at the end of an axis, pointing from a to b. */
function chevron(a: P2, b: P2) {
  const dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 1;
  const ux = dx / l, uy = dy / l;
  const p = (s: number, n: number) => `${f1(b.x - ux * s - uy * n)} ${f1(b.y - uy * s + ux * n)}`;
  return `M${p(5, 3.5)}L${f1(b.x)} ${f1(b.y)}L${p(5, -3.5)}`;
}

// Axis-aligned box: faces facing the camera are drawn, the edges they do not share are hidden (dashed).
const FACES: { n: V3; c: number[] }[] = [
  { n: [0, 1, 0], c: [4, 5, 6, 7] },
  { n: [0, -1, 0], c: [0, 1, 2, 3] },
  { n: [1, 0, 0], c: [1, 2, 6, 5] },
  { n: [-1, 0, 0], c: [0, 3, 7, 4] },
  { n: [0, 0, 1], c: [3, 2, 6, 7] },
  { n: [0, 0, -1], c: [0, 1, 5, 4] },
];
const EDGES: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

function box(c: Cam, lo: V3, hi: V3) {
  const corners: V3[] = [
    [lo[0], lo[1], lo[2]], [hi[0], lo[1], lo[2]], [hi[0], lo[1], hi[2]], [lo[0], lo[1], hi[2]],
    [lo[0], hi[1], lo[2]], [hi[0], hi[1], lo[2]], [hi[0], hi[1], hi[2]], [lo[0], hi[1], hi[2]],
  ];
  const p = corners.map((q) => proj(c, q));
  const view: V3 = [Math.sin(c.yaw) * Math.cos(c.pitch), Math.sin(c.pitch), Math.cos(c.yaw) * Math.cos(c.pitch)];
  const front = FACES.filter((f) => f.n[0] * view[0] + f.n[1] * view[1] + f.n[2] * view[2] > 0);
  const seen = new Set<string>();
  front.forEach((f) => f.c.forEach((v, i) => seen.add([v, f.c[(i + 1) % 4]].sort().join())));
  return {
    faces: front.map((f) => ({ top: f.n[1] === 1, d: poly(f.c.map((i) => p[i])) })),
    edges: EDGES.map(([a, b]) => ({ d: line(p[a], p[b]), hidden: !seen.has([a, b].sort().join()) })),
    top: p.slice(4).reduce((m, q) => (q.y < m.y ? q : m)),
    right: p.reduce((m, q) => (q.x > m.x ? q : m)),
  };
}

// ---- component ------------------------------------------------------------------------------------
export type SpaceLabels = {
  value: string; feasibility: string; data: string; risk: string; effort: string;
  threshold: string; cost: string; wait: string; pass: string; discard: string; discards: string; integration: string; drag: string;
  map: string; score: string; design: string;
  processes: string[]; systems: string[]; illustrative: string;
};
type Phase = { name: string; short: string; description?: string };
type Props = { phases: Phase[]; phaseLabel: string; labels: SpaceLabels; kinds: KindLabels; /** Each phase's full description (offer page). */ detail?: boolean };

const PER_PHASE_MS = 1800;

export function OpportunitySpace({ phases, phaseLabel, labels, kinds, detail = false }: Props) {
  const hatch = `h${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 760, h: 544 });
  const [s, setS] = useState(2);
  const [yawOff, setYawOff] = useState(0);
  const [ready, setReady] = useState(false);
  const [dragged, setDragged] = useState(false);
  const sRef = useRef(2);
  const raf = useRef(0);
  const timers = useRef<number[]>([]);
  const reduced = useRef(false);
  const drag = useRef<number | null>(null);

  const stopPlay = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const animateTo = (target: number) => {
    cancelAnimationFrame(raf.current);
    const from = sRef.current;
    const dur = Math.abs(target - from) * PER_PHASE_MS;
    if (reduced.current || dur === 0) {
      sRef.current = target;
      setS(target);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      sRef.current = from + (target - from) * p;
      setS(sRef.current);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }));
    ro.observe(el);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReady(true);
    // Printing or saving as PDF shows the outcome, whatever state the scene is in.
    const onPrint = () => {
      stopPlay();
      cancelAnimationFrame(raf.current);
      sRef.current = 2;
      flushSync(() => setS(2));
    };
    window.addEventListener("beforeprint", onPrint);
    if (reduced.current || !("IntersectionObserver" in window)) {
      return () => {
        ro.disconnect();
        window.removeEventListener("beforeprint", onPrint);
      };
    }
    // Play once from the map when the stage is seen: map → score → design.
    sRef.current = 0;
    setS(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timers.current.push(window.setTimeout(() => animateTo(1), 1100));
        timers.current.push(window.setTimeout(() => animateTo(2), 1100 + PER_PHASE_MS + 2600));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("beforeprint", onPrint);
      stopPlay();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const go = (i: number) => {
    stopPlay();
    animateTo(i);
  };
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current === null) return;
    const dx = e.clientX - drag.current;
    drag.current = e.clientX;
    if (dx === 0) return;
    setYawOff((v) => Math.max(-70, Math.min(70, v - dx * 0.35)));
    setDragged(true);
  };
  const onUp = () => {
    drag.current = null;
  };

  // ---- scene at s (0 map · 1 score · 2 design) ----
  const { w, h } = size;
  const wide = w >= 560;
  const c = camera(s, yawOff, w, h);
  const t2 = s - 1;
  const active = Math.round(s);
  const center = proj(c, [0.5, 0, 0.5]);
  const mapOp = 1 - seg(s, 0, 0.3);
  const axisOp = seg(s, 0.35, 0.85) * (1 - seg(t2, 0, 0.35));
  const volOp = seg(s, 0.72, 0.98) * (1 - seg(t2, 0, 0.3));
  const letterOp = seg(s, 0.85, 1) * (1 - seg(t2, 0.05, 0.3));
  const innerGrid = lerp(0.35, 1, seg(s, 0.2, 0.8)) * lerp(1, 0.55, seg(t2, 0, 0.5));
  const blockOp = seg(t2, 0.55, 0.85);
  const linkOp = seg(t2, 0.78, 1);
  const registerOp = seg(t2, 0.6, 0.85);

  const fog = (z: number) => 0.55 + 0.45 * clamp01((z + 0.75) / 1.5);
  const mark = Math.min(3.2, Math.max(2.2, c.k * 0.0105)); // half-size of a discard's ×, so the register never overlaps

  const ops = SCORES.map((sc, i) => {
    const lane = Math.floor(i / STEPS), step = i % STEPS;
    const d = i / (SCORES.length - 1);
    const k = KEPT.indexOf(i);
    const mv = seg(s, 0.08 + 0.22 * d, 0.5 + 0.22 * d);
    const rs = seg(s, 0.48 + 0.22 * d, 0.78 + 0.22 * d);
    // phase 3: a discard falls to the floor, then is filed in the register
    const drop = k >= 0 ? 0 : seg(t2, 0.02 + 0.15 * d, 0.3 + 0.15 * d);
    const file = k >= 0 ? 0 : seg(t2, 0.28 + 0.22 * d, 0.55 + 0.22 * d);
    const slot = DISCARDS.indexOf(i);
    const lift = k >= 0 ? seg(t2, 0.15 + 0.08 * k, 0.55 + 0.08 * k) : 0;
    let fx = lerp(STEP_X[step], sc[0], mv), fz = lerp(LANE_Z[lane], sc[2], mv);
    if (slot >= 0) {
      fx = lerp(fx, REGISTER.x0 + (slot % REGISTER.cols) * REGISTER.dx, file);
      fz = lerp(fz, REGISTER.z0 + Math.floor(slot / REGISTER.cols) * REGISTER.dz, file);
    }
    const y = sc[1] * rs * (1 - drop);
    const head3: V3 = k >= 0 ? [lerp(fx, FX[0], lift), lerp(y, FLOWS[k].y, lift), lerp(fz, FLOWS[k].z, lift)] : [fx, y, fz];
    const foot = proj(c, [fx, 0, fz]);
    const head = proj(c, head3);
    return { i, k, mv, rs, drop, lift, foot, head, r1: 2.4 + sc[1] * 4.2, merge: k >= 0 ? seg(t2, 0.5 + 0.07 * k, 0.6 + 0.07 * k) : 0 };
  });
  const byDepth = [...ops].sort((a, b) => a.head.z - b.head.z);

  const vol = box(c, [T.f, T.v, T.d], [1, 1, 1]);
  const o = proj(c, [0, 0, 0]);
  const xEnd = proj(c, [1.06, 0, 0]), zEnd = proj(c, [0, 0, 1.06]), yEnd = proj(c, [0, 1.06, 0]);
  const xLab = edgeLabel(o, proj(c, [1, 0, 0]), 0.62, 14, center);
  const zLab = edgeLabel(o, proj(c, [0, 0, 1]), 0.62, 14, center);
  const featured = ops[FEATURED];

  const mono = { fontFamily: "var(--font-mono)" } as const;
  const counts = [
    fill(labels.map, { processes: LANE_Z.length, steps: SCORES.length, waits: WAITS.length }),
    fill(labels.score, { criteria: 5, pass: KEPT.length, fail: SCORES.length - KEPT.length }),
    fill(labels.design, {
      flows: FLOWS.length,
      approvals: FLOWS.reduce((n, f) => n + f.kinds.filter((x) => x === "human").length, 0),
      integrations: FLOWS.length,
    }),
  ];

  return (
    <figure className="reveal">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <ol className="order-2 flex flex-col lg:order-1 lg:col-span-4 lg:justify-center">
          {phases.slice(0, 3).map((p, i) => (
            <li key={p.name} className={cn("relative border-t py-5 transition-colors duration-500", active === i ? "border-text-primary" : "border-border-subtle")}>
              <h3>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active === i ? "step" : undefined}
                  className="flex flex-col items-start gap-1 text-left after:absolute after:inset-0 after:content-['']"
                >
                  <span className="text-small text-text-tertiary">{fill(phaseLabel, { n: i + 1 })}</span>
                  <span className={cn("text-heading font-semibold transition-colors duration-500", active === i ? "text-text-primary" : "text-text-secondary")}>{p.name}</span>
                </button>
              </h3>
              <p className={cn("mt-1.5 text-text-secondary", detail ? "text-small" : "text-body")}>{detail ? (p.description ?? p.short) : p.short}</p>
            </li>
          ))}
        </ol>

        <div className="order-1 min-w-0 lg:order-2 lg:col-span-8">
          <div
            ref={stageRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="relative h-[22rem] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[28rem] lg:h-[34rem]"
          >
            <svg aria-hidden width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 overflow-visible [print-color-adjust:exact]">
              <defs>
                <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="5" stroke="var(--border-strong)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* floor */}
              <g fill="none" strokeWidth="1">
                {[0, 1, 2, 3, 4, 5].map((n) => {
                  const u = n / 5;
                  const edge = n === 0 || n === 5;
                  return (
                    <g key={n} stroke={edge ? "var(--border-strong)" : "var(--border-subtle)"} opacity={edge ? 1 : innerGrid}>
                      <path d={line(proj(c, [u, 0, 0]), proj(c, [u, 0, 1]))} />
                      <path d={line(proj(c, [0, 0, u]), proj(c, [1, 0, u]))} />
                    </g>
                  );
                })}
              </g>

              {/* phase 1: the processes as a plan */}
              {mapOp > 0.01 && (
                <g opacity={mapOp}>
                  {LANE_Z.map((z, l) => {
                    const a = proj(c, [STEP_X[0], 0, z]), b = proj(c, [STEP_X[STEPS - 1] + 0.06, 0, z]);
                    return (
                      <g key={l} stroke="var(--border-strong)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d={line(a, b)} />
                        <path d={chevron(a, b)} />
                      </g>
                    );
                  })}
                  {HANDOFFS.map(([l0, s0, l1, s1]) => (
                    <path key={`${l0}${s0}`} d={line(proj(c, [STEP_X[s0], 0, LANE_Z[l0]]), proj(c, [STEP_X[s1], 0, LANE_Z[l1]]))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  ))}
                  {WAITS.map(([l, st]) => {
                    const p = proj(c, [(STEP_X[st - 1] + STEP_X[st]) / 2, 0, LANE_Z[l]]);
                    return <path key={`${l}-${st}`} d={`M${f1(p.x)} ${f1(p.y - 5.5)}L${f1(p.x + 5)} ${f1(p.y + 3.5)}L${f1(p.x - 5)} ${f1(p.y + 3.5)}Z`} fill="var(--surface-primary)" stroke="var(--text-secondary)" strokeWidth="1.1" strokeLinejoin="round" />;
                  })}
                  {wide &&
                    LANE_Z.map((z, l) => {
                      const p = proj(c, [STEP_X[0] - 0.03, 0, z - 0.085]);
                      return (
                        <text key={l} x={p.x} y={p.y} fontSize="11.5" fill="var(--text-tertiary)">
                          {labels.processes[l]}
                        </text>
                      );
                    })}
                </g>
              )}

              {/* phase 3: the systems the flows run on, and the register where the discards are filed */}
              {blockOp > 0.01 && (
                <g opacity={blockOp}>
                  {FLOWS.map((fl, k) => {
                    const x = FX[fl.link];
                    const b = box(c, [x - BLOCK.w / 2, 0, fl.z - BLOCK.d / 2], [x + BLOCK.w / 2, BLOCK.h, fl.z + BLOCK.d / 2]);
                    return (
                      <g key={k}>
                        {b.faces.map((f, n) => (
                          <path key={n} d={f.d} fill={f.top ? `url(#${hatch})` : "var(--surface-primary)"} />
                        ))}
                        {b.edges.filter((e) => !e.hidden).map((e, n) => (
                          <path key={n} d={e.d} stroke="var(--text-tertiary)" strokeWidth="1" fill="none" />
                        ))}
                        <text x={b.right.x + 7} y={b.right.y + 3.5} fontSize="10" letterSpacing="0.08em" fill="var(--text-secondary)" style={mono}>
                          {labels.systems[k].toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
              {registerOp > 0.01 && (() => {
                const p = proj(c, [REGISTER.x0 - 0.06, 0, REGISTER.z0 + REGISTER.dz]);
                return (
                  <text x={p.x} y={p.y + 3.5} textAnchor="end" opacity={registerOp} fontSize="10" letterSpacing="0.08em" fill="var(--text-tertiary)" style={mono}>
                    {fill(labels.discards, { n: DISCARDS.length }).toUpperCase()}
                  </text>
                );
              })()}

              {/* phase 2: the volume that clears the three spatial thresholds (back faces first) */}
              {volOp > 0.01 && (
                <g opacity={volOp}>
                  {vol.faces.map((f, n) => (
                    <path key={n} d={f.d} fill="var(--state-discover-soft)" fillOpacity={f.top ? 0.9 : 0.55} />
                  ))}
                </g>
              )}

              {/* opportunities, far to near */}
              {byDepth.map((op) => {
                const keep = op.k >= 0;
                const fg = fog(op.head.z);
                const stick = op.rs * (1 - op.drop) * (1 - clamp01(op.lift * 4));
                const filled = op.mv * (1 - op.drop) * (1 - op.merge);
                const violet = keep ? seg(s, 0.8, 1) : 0;
                const r = lerp(op.r1, keep ? 5.5 : 4.2, op.mv);
                return (
                  <g key={op.i}>
                    {stick > 0.02 && (
                      <>
                        <path d={line(op.foot, op.head)} stroke={keep ? "var(--state-discover)" : "var(--text-tertiary)"} strokeWidth="1" opacity={stick * (keep ? 0.8 : 0.5 * fg)} />
                        <circle cx={op.foot.x} cy={op.foot.y} r="1.6" fill="var(--text-tertiary)" opacity={stick * 0.6} />
                      </>
                    )}
                    {/* phase 1 look: open circle sized by cost */}
                    {op.mv < 0.99 && <circle cx={op.head.x} cy={op.head.y} r={r} fill="var(--surface-primary)" stroke="var(--text-secondary)" strokeWidth="1.2" opacity={1 - op.mv} />}
                    {filled > 0.01 && <circle cx={op.head.x} cy={op.head.y} r={r} fill="var(--text-tertiary)" opacity={filled * (keep ? 1 - violet : 0.6 * fg)} />}
                    {violet > 0.01 && filled > 0.01 && <circle cx={op.head.x} cy={op.head.y} r={r} fill="var(--state-discover)" opacity={violet * filled} />}
                    {/* phase 3: a discard is a mark on the floor; it stays documented */}
                    {op.drop > 0.01 && (
                      <path
                        d={`M${f1(op.foot.x - mark)} ${f1(op.foot.y - mark)}l${f1(mark * 2)} ${f1(mark * 2)}m0 ${f1(-mark * 2)}l${f1(-mark * 2)} ${f1(mark * 2)}`}
                        stroke={op.i === FEATURED ? "var(--text-secondary)" : "var(--text-tertiary)"}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        opacity={op.drop * (op.i === FEATURED ? 0.95 : 0.6)}
                      />
                    )}
                  </g>
                );
              })}

              {/* volume edges: visible solid, hidden dashed */}
              {volOp > 0.01 && (
                <g opacity={volOp} fill="none" stroke="var(--state-discover)" strokeWidth="1">
                  {vol.edges.map((e, n) => (
                    <path key={n} d={e.d} strokeDasharray={e.hidden ? "3 3" : undefined} opacity={e.hidden ? 0.45 : 0.85} />
                  ))}
                  <text x={vol.top.x} y={vol.top.y - 9} textAnchor="middle" fontSize="10" letterSpacing="0.1em" fill="var(--state-discover-text)" stroke="none" style={mono}>
                    {labels.threshold.toUpperCase()}
                  </text>
                </g>
              )}

              {/* axes */}
              {axisOp > 0.01 && (
                <g opacity={axisOp} fill="none" stroke="var(--text-tertiary)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d={line(o, xEnd)} />
                  <path d={chevron(o, xEnd)} />
                  <path d={line(o, zEnd)} />
                  <path d={chevron(o, zEnd)} />
                  <path d={line(o, yEnd)} />
                  <path d={chevron(o, yEnd)} />
                  <g fill="var(--text-tertiary)" stroke="none" fontSize="10" letterSpacing="0.1em" style={mono}>
                    <text x={xLab.x} y={xLab.y} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${f1(xLab.ang)} ${f1(xLab.x)} ${f1(xLab.y)})`}>
                      {labels.feasibility.toUpperCase()}
                    </text>
                    <text x={zLab.x} y={zLab.y} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${f1(zLab.ang)} ${f1(zLab.x)} ${f1(zLab.y)})`}>
                      {labels.data.toUpperCase()}
                    </text>
                    <text x={yEnd.x} y={yEnd.y - 10} textAnchor="middle">
                      {labels.value.toUpperCase()}
                    </text>
                  </g>
                </g>
              )}

              {/* letters on the three that pass, the ring on the featured discard */}
              {letterOp > 0.01 && (
                <g opacity={letterOp} fontSize="11" style={mono}>
                  {KEPT.map((i, k) => (
                    <text key={i} x={ops[i].head.x + 9} y={ops[i].head.y - 6} fill="var(--text-primary)" fontWeight="500">
                      {LETTERS[k]}
                    </text>
                  ))}
                  <circle cx={featured.head.x} cy={featured.head.y} r="8.5" fill="none" stroke="var(--text-secondary)" strokeWidth="1" />
                  <path d={`M${f1(featured.head.x + 11)} ${f1(featured.head.y - 14)}l6 6m0 -6l-6 6`} stroke="var(--text-primary)" strokeWidth="1.3" strokeLinecap="round" />
                </g>
              )}

              {/* phase 3: integrations, then the designed flows as ribbons with typed steps */}
              {linkOp > 0.01 && (
                <g opacity={linkOp} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 3" fill="none">
                  {FLOWS.map((fl, k) => (
                    <path key={k} d={line(proj(c, [FX[fl.link], fl.y, fl.z]), proj(c, [FX[fl.link], BLOCK.h, fl.z]))} />
                  ))}
                </g>
              )}
              {FLOWS.map((fl, k) => {
                const start = 0.5 + 0.07 * k;
                const draw = seg(t2, start, start + 0.35);
                if (draw <= 0.001) return null;
                const x1 = lerp(FX[0], FX[FX.length - 1], draw);
                const nodeR = wide ? 10 : 8;
                const g = wide ? 13 : 11;
                const lead = proj(c, [FX[0] - 0.06, fl.y, fl.z]);
                const labOp = seg(t2, start + 0.05, start + 0.25);
                return (
                  <g key={k}>
                    {RIBBON.map((dy, n) => (
                      <path key={n} d={line(proj(c, [FX[0], fl.y + dy, fl.z]), proj(c, [x1, fl.y + dy, fl.z]))} stroke="var(--text-tertiary)" strokeWidth={n === 0 || n === RIBBON.length - 1 ? 1 : 0.7} opacity={n === 0 || n === RIBBON.length - 1 ? 0.75 : 0.4} fill="none" />
                    ))}
                    {fl.kinds.map((kind, n) => {
                      const at = start + 0.35 * (n / (fl.kinds.length - 1));
                      const on = seg(t2, at - 0.03, at + 0.03);
                      if (on <= 0.01) return null;
                      const p = proj(c, [FX[n], fl.y, fl.z]);
                      const st = KIND_STYLE[kind];
                      const io = kind === "input" || kind === "output";
                      return (
                        <g key={n} opacity={on} style={{ color: st.color }}>
                          <circle cx={p.x} cy={p.y} r={nodeR} fill={kind === "human" ? st.soft : "var(--surface-primary)"} stroke={st.color} strokeWidth="1.3" strokeDasharray={io ? "2.5 2" : undefined} />
                          <g transform={`translate(${f1(p.x - g / 2)} ${f1(p.y - g / 2)})`}>
                            <KindGlyph kind={kind} size={g} />
                          </g>
                        </g>
                      );
                    })}
                    <text x={lead.x} y={lead.y + 4} textAnchor="end" opacity={labOp}>
                      {wide && (
                        <tspan fontSize="11.5" fill="var(--text-tertiary)">
                          {labels.processes[Math.floor(KEPT[k] / STEPS)]}
                        </tspan>
                      )}
                      <tspan dx={wide ? 8 : 0} fontSize="11" fontWeight="500" fill="var(--text-primary)" style={mono}>
                        {LETTERS[k]}
                      </tspan>
                    </text>
                  </g>
                );
              })}
            </svg>
            {ready && !dragged && (
              <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 flex print:hidden items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-text-tertiary">
                <svg viewBox="0 0 16 8" width="16" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4h14M4 1 1 4l3 3M12 1l3 3-3 3" />
                </svg>
                {labels.drag}
              </span>
            )}
          </div>

          {/* the key changes with the phase; all three share one cell so nothing below moves */}
          <div className="mt-6 grid border-t border-border-subtle pt-4">
            {[0, 1, 2].map((n) => (
              <div key={n} aria-hidden={active !== n} className={cn("col-start-1 row-start-1 flex flex-col gap-4 transition-[opacity,visibility] duration-500", active === n ? "visible opacity-100" : "invisible opacity-0")}>
                <p className="label-mono text-text-tertiary">{counts[n]}</p>
                {n === 0 && (
                  <ul className="flex flex-wrap gap-x-7 gap-y-2 text-small text-text-secondary">
                    <li className="flex items-center gap-2.5">
                      <svg aria-hidden viewBox="0 0 36 14" width="36" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2">
                        <circle cx="4" cy="7" r="2.6" />
                        <circle cx="14.5" cy="7" r="4" />
                        <circle cx="28" cy="7" r="6" />
                      </svg>
                      {labels.cost}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <svg aria-hidden viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="var(--text-secondary)" strokeWidth="1.1" strokeLinejoin="round">
                        <path d="M6 1.5 10.8 10H1.2Z" />
                      </svg>
                      {labels.wait}
                    </li>
                  </ul>
                )}
                {n === 1 && (
                  <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    <ScoreCard id={KEPT[0]} mark="A" title={labels.pass} labels={labels} tone="keep" className="hidden sm:block" />
                    <ScoreCard id={FEATURED} mark="×" title={labels.discard} labels={labels} tone="discard" />
                  </div>
                )}
                {n === 2 && (
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-text-secondary">
                    {(["ai", "deterministic", "agent", "human"] as StepKind[]).map((kind) => (
                      <li key={kind} className="flex items-center gap-2">
                        <KindGlyph kind={kind} size={15} className="shrink-0" />
                        <span>{kinds[kind]}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <svg aria-hidden viewBox="0 0 6 16" width="6" height="16" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 3">
                        <path d="M3 0v16" />
                      </svg>
                      {labels.integration}
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-6 text-small text-text-tertiary">{labels.illustrative}</figcaption>
    </figure>
  );
}

/** One opportunity's five scores as bullet bars: the bar is the score, the tick is the threshold. */
function ScoreCard({ id, mark, title, labels, tone, className }: { id: number; mark: string; title: string; labels: SpaceLabels; tone: "keep" | "discard"; className?: string }) {
  const sc = SCORES[id];
  const rows = [
    { label: labels.value, v: sc[1], t: T.v, max: false },
    { label: labels.feasibility, v: sc[0], t: T.f, max: false },
    { label: labels.data, v: sc[2], t: T.d, max: false },
    { label: labels.risk, v: sc[3], t: T.r, max: true },
    { label: labels.effort, v: sc[4], t: T.e, max: true },
  ];
  return (
    <div className={cn("min-w-0", className)}>
      <p className="flex items-baseline gap-2 text-small leading-snug">
        <span className={cn("font-mono font-medium", tone === "keep" ? "text-discover-text" : "text-text-primary")}>{mark}</span>
        <span className="text-text-secondary">{title}</span>
      </p>
      <dl aria-hidden className="mt-3 grid grid-cols-[minmax(0,auto)_minmax(3rem,1fr)] items-center gap-x-3 gap-y-2">
        {rows.map((r) => {
          const fail = r.max ? r.v > r.t : r.v < r.t;
          return (
            <Fragment key={r.label}>
              <dt className={cn("truncate font-mono text-[0.64rem] uppercase tracking-[0.06em]", fail ? "text-text-primary" : "text-text-tertiary")}>{r.label}</dt>
              <dd className="relative h-3">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-subtle" />
                <span className={cn("absolute left-0 top-1/2 h-[3px] -translate-y-1/2", tone === "keep" ? "bg-discover" : fail ? "bg-text-primary" : "bg-text-tertiary")} style={{ width: `${r.v * 100}%` }} />
                <span className="absolute top-0 h-3 w-px bg-text-primary" style={{ left: `${r.t * 100}%` }} />
              </dd>
            </Fragment>
          );
        })}
      </dl>
    </div>
  );
}
