"use client";

import { useEffect, useRef } from "react";

export default function ContactHandCard() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const visual = visualRef.current;
    if (!host || !visual) return;

    const apply = () => {
      rafRef.current = null;
      const { x, y } = target.current;
      visual.style.transform =
        `translate3d(${x * 12}px, ${y * 8}px, 0) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    const onPointerLeave = () => {
      target.current.x = 0;
      target.current.y = 0;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative mx-auto w-full max-w-3xl"
      aria-label="Astronomy Club contact card"
    >
      <div className="pointer-events-none absolute -inset-12 rounded-[5rem] bg-[radial-gradient(circle_at_38%_50%,rgba(255,215,140,0.12),transparent_30%),radial-gradient(circle_at_72%_48%,rgba(110,205,255,0.08),transparent_34%)] blur-3xl" />

      <div
        ref={visualRef}
        className="relative mx-auto aspect-[1.65] w-full max-w-[760px] origin-center will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src="/contact-hand-card.webp"
          alt="Hand presenting an Astronomy Club card"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain select-none"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_45%,rgba(255,221,150,0.06),transparent_23%),linear-gradient(90deg,transparent_45%,rgba(0,0,0,0.12)_100%)] mix-blend-screen"
        />

        <div className="pointer-events-none absolute -bottom-1 left-[12%] rounded-full border border-white/[0.09] bg-[#070b12]/80 px-3 py-2 backdrop-blur-md sm:px-4">
          <p className="text-[7px] uppercase tracking-[0.26em] text-cyan-100/55 sm:text-[8px]">
            Contact signal
          </p>
        </div>
      </div>
    </div>
  );
}
