"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  c: readonly [number, number, number];
  w: number;
};

const COLORS = [
  [167, 139, 250], /* violet */
  [34, 211, 238],  /* cyan */
  [232, 121, 249], /* magenta */
] as const;

export default function Orbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;
    const orbs: Orb[] = [];

    function makeOrb(seedY?: number): Orb {
      return {
        x: Math.random() * W,
        y: seedY !== undefined ? seedY : Math.random() * H,
        r: 1.2 + Math.random() * 2.6,
        vy: 0.12 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 0.14,
        a: 0.25 + Math.random() * 0.45,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: Math.random() * Math.PI * 2,
      };
    }

    function drawOrb(o: Orb) {
      const g = ctx!.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5);
      g.addColorStop(0, "rgba(" + o.c[0] + "," + o.c[1] + "," + o.c[2] + "," + o.a + ")");
      g.addColorStop(1, "rgba(" + o.c[0] + "," + o.c[1] + "," + o.c[2] + ",0)");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2);
      ctx!.fill();
    }

    function resize() {
      const oldW = W;
      const oldH = H;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* keep the field covering the whole viewport after resize:
         rescale existing orbs, then top up / trim to the new density */
      if (oldW && oldH) {
        for (const o of orbs) {
          o.x *= W / oldW;
          o.y *= H / oldH;
        }
      }
      const target = Math.min(64, Math.floor((W * H) / 26000));
      while (orbs.length < target) orbs.push(makeOrb());
      if (orbs.length > target) orbs.length = target;
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, W, H);
      for (const o of orbs) drawOrb(o);
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.w += 0.008;
        o.x += o.vx + Math.sin(o.w) * 0.12;
        o.y -= o.vy;
        if (o.y < -20) orbs[i] = makeOrb(H + 20);
        drawOrb(orbs[i]);
      }
      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      resize();
      if (reduced) drawStatic();
    }

    resize();
    window.addEventListener("resize", onResize);

    if (reduced) {
      /* static scatter, no animation loop */
      drawStatic();
    } else {
      frame();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
