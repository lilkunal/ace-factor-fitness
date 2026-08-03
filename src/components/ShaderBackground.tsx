import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  r: number;
  speed: number;
};

const BLOBS: Blob[] = [
  { x: 0.18, y: 0.3, r: 0.48, speed: 0.00035 },
  { x: 0.82, y: 0.22, r: 0.42, speed: 0.00028 },
  { x: 0.5, y: 0.75, r: 0.5, speed: 0.00022 },
  { x: 0.12, y: 0.72, r: 0.35, speed: 0.00031 },
];

const BLOOMS = [
  "rgba(245, 230, 66, 0.28)",
  "rgba(255, 215, 0, 0.22)",
  "rgba(255, 69, 0, 0.18)",
  "rgba(255, 140, 0, 0.15)",
];

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let t = 0;
    let raf: number | null = null;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx!.fillStyle = "#050505";
      ctx!.fillRect(0, 0, w, h);

      BLOBS.forEach((b, i) => {
        const phase = t * b.speed * 1000;
        const cx = (b.x + Math.sin(phase + i) * 0.09) * w;
        const cy = (b.y + Math.cos(phase * 0.85 + i * 1.4) * 0.08) * h;
        const radius = b.r * Math.min(w, h);
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, BLOOMS[i % BLOOMS.length]!);
        g.addColorStop(1, "transparent");
        ctx!.globalCompositeOperation = "screen";
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, w, h);
      });
      ctx!.globalCompositeOperation = "source-over";

      const vig = ctx!.createRadialGradient(
        w * 0.5,
        h * 0.45,
        h * 0.15,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.8,
      );
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, w, h);
    }

    function loop(ts: number) {
      t = ts;
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    draw();

    const onResize = () => {
      resize();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);

    if (!reduce) {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!reduce && !raf) {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-shader"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
