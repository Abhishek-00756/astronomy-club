"use client";

import { useEffect, useRef } from "react";

export default function DitherVeil() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let visible = false;
    let points: Array<{
      x: number;
      y: number;
      phase: number;
      size: number;
    }> = [];

    let pointer = { x: 0.5, y: 0.5, active: false };

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const density = Math.min(
        1500,
        Math.max(700, Math.floor((width * height) / 420)),
      );

      points = Array.from({ length: density }, (_, index) => ({
        x: Math.random(),
        y: Math.random(),
        phase: (index * 0.61803398875) % (Math.PI * 2),
        size: Math.random() > 0.84 ? 1.35 : 0.75,
      }));
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const draw = (time: number) => {
      if (!visible || document.hidden) {
        frame = requestAnimationFrame(draw);
        return;
      }

      if (time - lastFrame < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }

      lastFrame = time;
      const t = time * 0.00035;

      context.clearRect(0, 0, width, height);

      const veil = context.createRadialGradient(
        width * 0.48,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.72,
      );

      veil.addColorStop(0, "rgba(155, 215, 255, 0.08)");
      veil.addColorStop(0.45, "rgba(110, 150, 255, 0.035)");
      veil.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = veil;
      context.fillRect(0, 0, width, height);

      for (const point of points) {
        const wave =
          Math.sin(point.x * 18 + t * 8 + point.phase) * 0.055 +
          Math.sin(point.y * 30 - t * 6) * 0.045;

        const px = point.x + wave;
        const py =
          point.y + Math.sin(point.x * 9 + t * 5) * 0.018;

        const dx = px - pointer.x;
        const dy = py - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = pointer.active
          ? Math.max(0, 1 - distance / 0.28)
          : 0;

        const driftX = influence * dx * -0.05;
        const driftY = influence * dy * -0.05;

        const star =
          0.12 +
          Math.max(0, 0.5 - Math.abs(px - 0.5)) * 0.28 +
          Math.sin(point.phase + t * 4) * 0.07;

        if (star < 0.14) continue;

        context.globalAlpha =
          influence > 0.12 ? 0.7 : Math.max(0.15, star);

        context.fillStyle = "#d6e6ff";

        context.beginPath();
        context.arc(
          (px + driftX) * width,
          (py + driftY) * height,
          point.size + influence * 0.9,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { rootMargin: "120px" },
    );

    observer.observe(canvas);
    rebuild();

    window.addEventListener("resize", rebuild);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", rebuild);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="relative h-[24rem] overflow-hidden border-y border-white/[0.06] bg-[#06080d] sm:h-[28rem]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(86,191,255,0.07),transparent_44%),linear-gradient(180deg,rgba(5,7,10,0.86),transparent_28%,transparent_72%,rgba(5,7,10,0.92))]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-10 sm:px-10 lg:px-16">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-cyan-200/50">
            Between the stars
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/40 sm:text-base">
            A living field of light sits between the stories of the people
            who make the club move.
          </p>
        </div>
      </div>
    </div>
  );
}
