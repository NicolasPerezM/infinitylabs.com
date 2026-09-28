"use client";

import { useEffect, useRef, useState } from "react";
import type { Stage } from "@/content/operating-model";

/**
 * RibbonField — the brand's signature system graphic (DEC-015, v2).
 *
 * The operating loop drawn as a plotter ribbon: parallel ink strands follow the loop's centerline,
 * twist once (Möbius principle) with depth shading (front face dark, back face light, wider when
 * nearer), ruler ticks along the path, pointer displacement, and colour packets with a directional
 * tail travelling Discover → Build → Operate. Nodes pulse when a packet passes. An `active` stage
 * keeps its segment coloured (used by the operating-model scrollytelling).
 *
 * Canvas 2D only. Theme-aware (reads --surface-primary). Pauses off-screen / hidden tab.
 * Reduced motion → one static frame. Touch → no pointer displacement.
 */

const SEGMENTS: [number, number][][] = [
  [[0.203, 0.227], [0.406, 0.091], [0.652, 0.136], [0.725, 0.341]],
  [[0.725, 0.341], [0.812, 0.545], [0.609, 0.75], [0.362, 0.818]],
  [[0.362, 0.818], [0.174, 0.864], [0.101, 0.591], [0.138, 0.386]],
  [[0.138, 0.386], [0.152, 0.307], [0.171, 0.255], [0.203, 0.227]],
];
const ASPECT = 690 / 440;
const NODES: { id: Stage; s: number; color: [number, number, number] }[] = [
  { id: "discover", s: 0, color: [166, 98, 230] },
  { id: "build", s: 0.335, color: [90, 190, 255] },
  { id: "operate", s: 0.67, color: [93, 231, 200] },
];
const RANGE: Record<Stage, [number, number]> = { discover: [0, 0.335], build: [0.335, 0.67], operate: [0.67, 1] };

type Pt = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type NodePosition = { id: Stage; x: number; y: number };

function bezier(p: [number, number][], t: number): Pt {
  const mt = 1 - t;
  const a = mt * mt * mt, b = 3 * mt * mt * t, c = 3 * mt * t * t, d = t * t * t;
  return { x: a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0], y: a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1] };
}

function sampleLoop(n: number): Pt[] {
  const raw: Pt[] = [];
  for (const seg of SEGMENTS) for (let i = 0; i < 120; i++) raw.push(bezier(seg, i / 120));
  const cum = [0];
  for (let i = 1; i < raw.length; i++) cum.push(cum[i - 1] + Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y));
  const total = cum[cum.length - 1] + Math.hypot(raw[0].x - raw[raw.length - 1].x, raw[0].y - raw[raw.length - 1].y);
  const out: Pt[] = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    const target = (i / n) * total;
    while (j < cum.length - 2 && cum[j + 1] < target) j++;
    const a = raw[j], b = raw[(j + 1) % raw.length];
    const span = (cum[j + 1] ?? total) - cum[j] || 1e-6;
    const t = Math.min(1, Math.max(0, (target - cum[j]) / span));
    out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  }
  return out;
}

function stageColor(s: number): [number, number, number] {
  const stops: [number, [number, number, number]][] = [[0, [166, 98, 230]], [0.335, [90, 190, 255]], [0.67, [93, 231, 200]], [1, [166, 98, 230]]];
  const v = ((s % 1) + 1) % 1;
  for (let i = 0; i < stops.length - 1; i++) {
    const [s0, c0] = stops[i], [s1, c1] = stops[i + 1];
    if (v >= s0 && v <= s1) {
      const t = (v - s0) / (s1 - s0);
      return [c0[0] + (c1[0] - c0[0]) * t, c0[1] + (c1[1] - c0[1]) * t, c0[2] + (c1[2] - c0[2]) * t];
    }
  }
  return stops[0][1];
}

const rgb = (c: [number, number, number]) => `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`;

/** Is the resolved --surface-primary of this element dark? */
function surfaceIsDark(el: HTMLElement): boolean {
  const v = getComputedStyle(el).getPropertyValue("--surface-primary").trim();
  const m = v.match(/^#([0-9a-f]{6})$/i);
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

type Props = {
  stage?: Rect;
  stageMobile?: Rect;
  active?: Stage | null;
  density?: "full" | "light";
  onLayout?: (box: Rect, nodes: NodePosition[]) => void;
  className?: string;
};

export function RibbonField({ stage = { x: 0.4, y: 0.04, w: 0.62, h: 0.92 }, stageMobile = { x: 0.02, y: 0.5, w: 0.96, h: 0.5 }, active = null, density = "full", onLayout, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<Stage | null>(active);
  const repaintRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  // keep the latest `active` readable from the animation loop without re-running it
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const light = density === "light";
    const N = coarse || light ? 240 : 360;
    const K = light ? 18 : coarse ? 16 : 24;
    const base = sampleLoop(N);

    let W = 0, H = 0, dpr = 1, box: Rect = { x: 0, y: 0, w: 1, h: 1 };
    let raf = 0, visible = true, running = true;
    let dark = surfaceIsDark(parent);
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const start = performance.now();
    const pts: Pt[] = base.map(() => ({ x: 0, y: 0 }));
    const nrm: Pt[] = base.map(() => ({ x: 0, y: 0 }));
    const tan: Pt[] = base.map(() => ({ x: 0, y: 0 }));

    function layout() {
      const rect = parent.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const st = W < 768 ? stageMobile : stage;
      const sx = st.x * W, sy = st.y * H, sw = st.w * W, sh = st.h * H;
      let w = sw, h = sw / ASPECT;
      if (h > sh) { h = sh; w = sh * ASPECT; }
      box = { x: sx + (sw - w) / 2, y: sy + (sh - h) / 2, w, h };
      onLayout?.(box, NODES.map((n) => {
        const p = base[Math.round(n.s * N) % N];
        return { id: n.id, x: box.x + p.x * box.w, y: box.y + p.y * box.h };
      }));
      setReady(true);
    }

    function frame(now: number) {
      if (!running) return;
      const t = (now - start) / 1000;
      const ink = dark ? "244,244,249" : "15,16,32";
      const inkMul = dark ? 0.85 : 1;
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      // centerline with breathing + pointer displacement
      const R = Math.min(W, H) * 0.26, push = Math.min(W, H) * 0.035;
      const breathe = reduced ? 0 : Math.sin(t * 0.6) * 0.012;
      const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      for (let i = 0; i < N; i++) {
        const b = base[i];
        let x = box.x + b.x * box.w, y = box.y + b.y * box.h;
        x += (x - cx) * breathe;
        y += (y - cy) * breathe;
        if (mouse.active && !coarse) {
          const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
          if (d < R && d > 0.001) {
            const k = 1 - d / R;
            const f = k * k * (3 - 2 * k) * push; // smoothstep falloff
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        pts[i].x = x;
        pts[i].y = y;
      }
      for (let i = 0; i < N; i++) {
        const a = pts[(i - 1 + N) % N], c = pts[(i + 1) % N];
        let tx = c.x - a.x, ty = c.y - a.y;
        const l = Math.hypot(tx, ty) || 1;
        tx /= l; ty /= l;
        tan[i].x = tx; tan[i].y = ty;
        nrm[i].x = -ty; nrm[i].y = tx;
      }

      ctx!.clearRect(0, 0, W, H);
      const halfBase = Math.min(box.w, box.h) * (light ? 0.09 : 0.11);
      const twist = reduced ? 0.6 : 0.6 + t * 0.05;

      // depth: 0 (far, top) → 1 (near, bottom); facing: cos of the twist angle (front/back face)
      const depth = (i: number) => Math.min(1, Math.max(0, (pts[i].y - box.y) / box.h));
      const facing = (i: number) => Math.cos(Math.PI * (i / N) + twist);
      const strandPoint = (i: number, u: number): Pt => {
        const ang = Math.PI * (i / N) + twist;
        const half = halfBase * (0.8 + 0.4 * depth(i));
        const off = u * half * Math.cos(ang);
        const shear = u * half * 0.3 * Math.sin(ang);
        return { x: pts[i].x + nrm[i].x * off + tan[i].x * shear, y: pts[i].y + nrm[i].y * off + tan[i].y * shear };
      };

      // 0) ruler ticks along the outer edge of the path
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = `rgba(${ink},${(0.22 * inkMul).toFixed(3)})`;
      const tickEvery = Math.round(N / 36);
      ctx!.beginPath();
      for (let i = 0; i < N; i += tickEvery) {
        const major = (i / tickEvery) % 4 === 0;
        const half = halfBase * (0.8 + 0.4 * depth(i)) * Math.abs(Math.cos(Math.PI * (i / N) + twist));
        const len = major ? 10 : 5;
        const ox = nrm[i].x * (half + 6), oy = nrm[i].y * (half + 6);
        ctx!.moveTo(pts[i].x - ox, pts[i].y - oy);
        ctx!.lineTo(pts[i].x - ox - nrm[i].x * len, pts[i].y - oy - nrm[i].y * len);
      }
      ctx!.stroke();

      // 1) ink strands, shaded by facing and depth; drawn in two passes (back face first)
      ctx!.lineCap = "round";
      for (const pass of [0, 1]) {
        for (let k = 0; k < K; k++) {
          const u = (k / (K - 1)) * 2 - 1;
          const edge = Math.abs(u);
          ctx!.beginPath();
          let open = false;
          for (let i = 0; i <= N; i++) {
            const ii = i % N;
            const front = facing(ii) >= 0;
            if ((pass === 1) !== front) { open = false; continue; }
            const p = strandPoint(ii, u);
            if (!open) { ctx!.moveTo(p.x, p.y); open = true; } else ctx!.lineTo(p.x, p.y);
          }
          const a = (pass === 1 ? 0.09 + 0.24 * edge * edge : 0.04 + 0.1 * edge * edge) * inkMul;
          ctx!.lineWidth = pass === 1 ? 1.1 : 0.8;
          ctx!.strokeStyle = `rgba(${ink},${a.toFixed(3)})`;
          ctx!.stroke();
        }
      }

      // 2) active segment: steady colour over its range
      const act = activeRef.current;
      if (act) {
        const [s0, s1] = RANGE[act];
        const c0 = stageColor(s0), c1 = stageColor(s1);
        const steps = Math.round((s1 - s0) * N);
        ctx!.lineWidth = 1.3;
        for (let k = 0; k < K; k += 1) {
          const u = (k / (K - 1)) * 2 - 1;
          const edge = Math.abs(u);
          ctx!.beginPath();
          let first: Pt | null = null, last: Pt | null = null;
          for (let q = 0; q <= steps; q++) {
            const i = (Math.round(s0 * N) + q) % N;
            const p = strandPoint(i, u);
            if (q === 0) { ctx!.moveTo(p.x, p.y); first = p; } else ctx!.lineTo(p.x, p.y);
            last = p;
          }
          if (first && last) {
            const g = ctx!.createLinearGradient(first.x, first.y, last.x, last.y);
            const a = 0.3 + 0.5 * edge;
            g.addColorStop(0, `rgba(${rgb(c0)},${a.toFixed(2)})`);
            g.addColorStop(1, `rgba(${rgb(c1)},${a.toFixed(2)})`);
            ctx!.strokeStyle = g;
            ctx!.stroke();
          }
        }
      }

      // 3) colour packets with a directional tail (two, half a loop apart)
      const period = 11;
      const tail = 0.13, headLen = 0.025;
      const heads = reduced ? [0.16, 0.66] : [(t / period) % 1, (t / period + 0.5) % 1];
      ctx!.lineWidth = 1.5;
      for (const head of heads) {
        const s0 = head - tail, s1 = head + headLen;
        const steps = Math.round((s1 - s0) * N);
        for (let k = 0; k < K; k++) {
          const u = (k / (K - 1)) * 2 - 1;
          const edge = Math.abs(u);
          const a = 0.35 + 0.6 * edge;
          ctx!.beginPath();
          let first: Pt | null = null, last: Pt | null = null;
          for (let q = 0; q <= steps; q++) {
            const s = s0 + (q / steps) * (s1 - s0);
            const i = ((Math.round(s * N) % N) + N) % N;
            const p = strandPoint(i, u);
            if (q === 0) { ctx!.moveTo(p.x, p.y); first = p; } else ctx!.lineTo(p.x, p.y);
            last = p;
          }
          if (first && last) {
            const g = ctx!.createLinearGradient(first.x, first.y, last.x, last.y);
            const cT = stageColor(s0), cH = stageColor(head), cE = stageColor(s1);
            g.addColorStop(0, `rgba(${rgb(cT)},0)`);
            g.addColorStop(0.84, `rgba(${rgb(cH)},${a.toFixed(2)})`);
            g.addColorStop(1, `rgba(${rgb(cE)},0)`);
            ctx!.strokeStyle = g;
            ctx!.stroke();
          }
        }
      }

      // 4) stage nodes + pulse when a packet passes
      for (const n of NODES) {
        const i = Math.round(n.s * N) % N;
        const p = pts[i];
        const c = rgb(n.color);
        const isActive = act === n.id;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, isActive ? 20 : 13, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c},${isActive ? 0.22 : 0.16})`;
        ctx!.fill();
        for (const head of heads) {
          let d = Math.abs(head - n.s);
          d = Math.min(d, 1 - d);
          if (d < 0.035) {
            const k = 1 - d / 0.035;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, 8 + (1 - k) * 22, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(${c},${(k * 0.6).toFixed(2)})`;
            ctx!.lineWidth = 1.2;
            ctx!.stroke();
          }
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgb(${c})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${ink},0.6)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    }

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    repaintRef.current = () => frame(performance.now());

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) frame(performance.now());
    });
    ro.observe(parent);
    layout();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) kick();
    });
    io.observe(parent);

    // theme changes (data-theme on <html>) re-evaluate the ink colour
    const mo = new MutationObserver(() => {
      dark = surfaceIsDark(parent);
      if (reduced) frame(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (!mouse.active) { mouse.x = mouse.tx; mouse.y = mouse.ty; mouse.active = true; }
    };
    const onLeave = () => { mouse.active = false; mouse.tx = -9999; mouse.ty = -9999; };
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (visible && !reduced) kick();
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    kick();

    return () => {
      running = false;
      repaintRef.current = null;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- geometry props are static per mount; `active` is read through a ref
  }, []);

  // reduced motion: repaint the static frame when the active stage changes
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) repaintRef.current?.();
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: ready ? 1 : 0, transition: "opacity 900ms var(--ease-expo)" }}
    />
  );
}
