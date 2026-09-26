"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  twinkle: number;
};

export default function GlobalStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let stars: Star[] = [];
    let pointerX = 0;
    let pointerY = 0;

    const rebuild = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(
        620,
        Math.max(320, Math.floor((width * height) / 5200)),
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        speed: 0.018 + Math.random() * 0.04,
        size: 0.45 + Math.random() * 0.95,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(width, 1) - 0.5;
      pointerY = event.clientY / Math.max(height, 1) - 0.5;
    };

    const draw = (time: number) => {
      if (document.hidden) {
        frame = requestAnimationFrame(draw);
        return;
      }

      if (time - lastFrame < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }

      lastFrame = time;
      const t = time * 0.001;

      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.z += star.speed * 0.012;

        if (star.z > 1) {
          star.z = 0;
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }

        const depth = 0.35 + star.z * 0.65;
        const px = star.x + pointerX * (5 + star.z * 16);
        const py = star.y + pointerY * (4 + star.z * 11);
        const twinkle =
          0.3 +
          0.2 * Math.sin(t * (1.8 + star.z * 1.5) + star.twinkle);
        const opacity = Math.max(
          0.11,
          twinkle * (0.42 + star.z * 0.5),
        );

        context.globalAlpha = opacity;
        context.fillStyle = "#deeeff";
        context.beginPath();
        context.arc(px, py, star.size * depth, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    rebuild();
    window.addEventListener("resize", rebuild);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-80"
    />
  );
}
