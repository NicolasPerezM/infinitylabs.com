"use client";

import { useEffect, useRef, useState } from "react";

/**
 * RibbonField — the hero signature graphic (DEC-015).
 *
 * The operating loop drawn as a plotter-style ribbon: 24 parallel ink strands follow the
 * loop's centerline, twist once (Möbius principle) and are displaced by the pointer.
 * Two "packets" of colour travel the loop in the only permitted order
 * (Discover violet → Build sky → Operate mint): gradient with meaning, never decoration.
 *
 * Canvas 2D only, no WebGL. Pauses off-screen and when the tab is hidden.
 * Reduced motion → one static frame. Touch devices → no pointer displacement.
 */

// Loop geometry, normalised from the OperatingLoop SVG (viewBox 690×440).
const SEGMENTS: [number, number][][] = [
  [[0.203, 0.227], [0.406, 0.091], [0.652, 0.136], [0.725, 0.341]], // discover → build
  [[0.725, 0.341], [0.812, 0.545], [0.609, 0.75], [0.362, 0.818]], // build → operate
  [[0.362, 0.818], [0.174, 0.864], [0.101, 0.591], [0.138, 0.386]], // operate → return
  [[0.138, 0.386], [0.152, 0.307], [0.171, 0.255], [0.203, 0.227]], // → discover
];
const ASPECT = 690 / 440;
const NODES = [
  { id: "discover", s: 0, color: [166, 98, 230] },
  { id: "build", s: 0.335, color: [90, 190, 255] },
  { id: "operate", s: 0.67, color: [93, 231, 200] },
] as const;

type Pt = { x: number; y: number };
export type RibbonBox = { x: number; y: number; w: number; h: number };
export type NodePosition = { id: string; x: number; y: number };

function bezier(p: [number, number][], t: number): Pt {
  const mt = 1 - t;
  const a = mt * mt * mt, b = 3 * mt * mt * t, c = 3 * mt * t * t, d = t * t * t;
  return { x: a * p[0][0] + b * p[1][0] + c * p[2][0] + d * p[3][0], y: a * p[0][1] + b * p[1][1] + c * p[2][1] + d * p[3][1] };
}

/** Uniformly (by arc length) sampled closed loop in normalised coordinates. */
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
  // violet → sky → mint → violet, matching the node positions
  const stops: [number, [number, number, number]][] = [
    [0, [166, 98, 230]],
    [0.335, [90, 190, 255]],
    [0.67, [93, 231, 200]],
    [1, [166, 98, 230]],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [s0, c0] = stops[i], [s1, c1] = stops[i + 1];
    if (s >= s0 && s <= s1) {
      const t = (s - s0) / (s1 - s0);
      return [c0[0] + (c1[0] - c0[0]) * t, c0[1] + (c1[1] - c0[1]) * t, c0[2] + (c1[2] - c0[2]) * t];
    }
  }
  return stops[0][1];
}

type Props = {
  /** Where the loop lives inside the canvas, as fractions of the container (desktop / mobile). */
  stage?: { x: number; y: number; w: number; h: number };
  stageMobile?: { x: number; y: number; w: number; h: number };
  tone?: "paper" | "ink";
  onLayout?: (box: RibbonBox, nodes: NodePosition[]) => void;
  className?: string;
};

export function RibbonField({
  stage = { x: 0.4, y: 0.04, w: 0.62, h: 0.92 },
  stageMobile = { x: 0.02, y: 0.5, w: 0.96, h: 0.5 },
  tone = "paper",
  onLayout,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const N = coarse ? 220 : 360;
    const K = coarse ? 16 : 24;
    const base = sampleLoop(N);

    let W = 0, H = 0, dpr = 1, box: RibbonBox = { x: 0, y: 0, w: 1, h: 1 };
    let raf = 0, visible = true, running = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const start = performance.now();
    const pts: Pt[] = base.map(() => ({ x: 0, y: 0 }));
    const nrm: Pt[] = base.map(() => ({ x: 0, y: 0 }));
    const tan: Pt[] = base.map(() => ({ x: 0, y: 0 }));

    const inkRGB = tone === "paper" ? "15,16,32" : "244,244,249";

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
      // fit the loop's aspect inside the stage rect
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
      // smooth pointer
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      // centerline in px with pointer displacement + gentle breathing
      const R = Math.min(W, H) * 0.24, push = Math.min(W, H) * 0.035;
      const breathe = reduced ? 0 : Math.sin(t * 0.6) * 0.012;
      for (let i = 0; i < N; i++) {
        const b = base[i];
        let x = box.x + b.x * box.w, y = box.y + b.y * box.h;
        // breathing: scale around the loop centre
        x += (x - (box.x + box.w / 2)) * breathe;
        y += (y - (box.y + box.h / 2)) * breathe;
        if (mouse.active && !coarse) {
          const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy);
          if (d < R && d > 0.001) {
            const f = Math.pow(1 - d / R, 2) * push;
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
      const half = Math.min(box.w, box.h) * 0.11;
      const twist = reduced ? 0 : t * 0.05; // slow rotation of the twist point around the loop

      // strand offset along normal (cos) + shear along tangent (sin) = one twist per loop
      const strandPoint = (i: number, u: number): Pt => {
        const s = i / N;
        const ang = Math.PI * s + twist;
        const off = u * half * Math.cos(ang);
        const shear = u * half * 0.32 * Math.sin(ang);
        return { x: pts[i].x + nrm[i].x * off + tan[i].x * shear, y: pts[i].y + nrm[i].y * off + tan[i].y * shear };
      };

      // 1) ink strands
      ctx!.lineWidth = 1;
      ctx!.lineCap = "round";
      for (let k = 0; k < K; k++) {
        const u = (k / (K - 1)) * 2 - 1;
        const edge = Math.abs(u);
        const alpha = 0.07 + 0.2 * edge * edge;
        ctx!.strokeStyle = `rgba(${inkRGB},${alpha.toFixed(3)})`;
        ctx!.beginPath();
        for (let i = 0; i <= N; i++) {
          const p = strandPoint(i % N, u);
          if (i === 0) ctx!.moveTo(p.x, p.y); else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }

      // 2) colour packets travelling the loop (two, half a loop apart)
      const period = 11;
      const win = 0.075; // half-width of the packet window in loop fraction
      const heads = reduced ? [0.12, 0.62] : [(t / period) % 1, (t / period + 0.5) % 1];
      ctx!.lineWidth = 1.4;
      for (const head of heads) {
        const s0 = head - win, s1 = head + win;
        for (let k = 0; k < K; k++) {
          const u = (k / (K - 1)) * 2 - 1;
          const edge = Math.abs(u);
          const alpha = 0.35 + 0.55 * edge;
          ctx!.beginPath();
          let first = true;
          let firstPt: Pt | null = null, lastPt: Pt | null = null;
          const steps = Math.round(win * 2 * N);
          for (let q = 0; q <= steps; q++) {
            const s = s0 + (q / steps) * (s1 - s0);
            const i = ((Math.round(s * N) % N) + N) % N;
            const p = strandPoint(i, u);
            if (first) { ctx!.moveTo(p.x, p.y); first = false; firstPt = p; } else ctx!.lineTo(p.x, p.y);
            lastPt = p;
          }
          if (firstPt && lastPt) {
            const g = ctx!.createLinearGradient(firstPt.x, firstPt.y, lastPt.x, lastPt.y);
            const c0 = stageColor(((s0 % 1) + 1) % 1), cm = stageColor(((head % 1) + 1) % 1), c1 = stageColor(((s1 % 1) + 1) % 1);
            g.addColorStop(0, `rgba(${c0.map(Math.round).join(",")},0)`);
            g.addColorStop(0.5, `rgba(${cm.map(Math.round).join(",")},${alpha.toFixed(2)})`);
            g.addColorStop(1, `rgba(${c1.map(Math.round).join(",")},0)`);
            ctx!.strokeStyle = g;
            ctx!.stroke();
          }
        }
      }

      // 3) stage nodes
      for (const n of NODES) {
        const i = Math.round(n.s * N) % N;
        const p = pts[i];
        const rgb = n.color.join(",");
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 13, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb},0.16)`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgb(${rgb})`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${inkRGB},0.6)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (reduced) frame(performance.now());
    });
    ro.observe(parent);
    layout();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(parent);

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (!mouse.active) { mouse.x = mouse.tx; mouse.y = mouse.ty; mouse.active = true; }
    };
    const onLeave = () => { mouse.active = false; mouse.tx = -9999; mouse.ty = -9999; };
    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); } else if (visible && !reduced) { raf = requestAnimationFrame(frame); }
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- geometry props are static per mount
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: ready ? 1 : 0, transition: "opacity 900ms var(--ease-expo)" }}
    />
  );
}
