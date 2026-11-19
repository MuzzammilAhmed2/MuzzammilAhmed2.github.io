"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: number };
type Pulse = { a: number; b: number; t: number; speed: number };

/**
 * Hero background: drifting data nodes, linked when close, with light pulses travelling along links.
 * Canvas 2D, capped DPR, pauses off-screen / in background tabs, and draws one still frame for reduced motion.
 */
export default function DataNetwork({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const rgb = (v: string) => css.getPropertyValue(v).trim().split(/\s+/).join(",");
    const palette = [rgb("--accent-rgb"), rgb("--accent-2-rgb"), rgb("--accent-3-rgb")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    let w = 0, h = 0, raf = 0, running = false, visible = true;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = small ? 110 : 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(small ? 34 : 80, (w * h) / (small ? 9000 : 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8, c: Math.floor(Math.random() * 3),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${palette[a.c]},${(1 - d / LINK) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (!reduce && pulses.length < (small ? 6 : 14) && Math.random() < 0.0009) pulses.push({ a: i, b: j, t: 0, speed: 0.008 + Math.random() * 0.012 });
          }
        }
      }
      // pulses travelling along links
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k], a = nodes[p.a], b = nodes[p.b];
        if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK) { pulses.splice(k, 1); continue; }
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `rgba(${palette[1]},0.95)`); g.addColorStop(1, `rgba(${palette[1]},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
        p.t += p.speed;
        if (p.t >= 1) pulses.splice(k, 1);
      }
      // nodes
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 120;
        ctx.fillStyle = `rgba(${palette[n.c]},${near ? 1 : 0.75})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, near ? n.r + 1.2 : n.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        // gentle pull away from the cursor
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) { n.vx += (dx / d) * 0.02; n.vy += (dy / d) * 0.02; }
        n.vx = Math.max(-0.5, Math.min(0.5, n.vx * 0.995)); n.vy = Math.max(-0.5, Math.min(0.5, n.vy * 0.995));
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => { if (!running && visible && !document.hidden && !reduce) { running = true; raf = requestAnimationFrame(step); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    resize();
    draw();
    start();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => { resize(); draw(); }, 150); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      stop(); io.disconnect(); clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
