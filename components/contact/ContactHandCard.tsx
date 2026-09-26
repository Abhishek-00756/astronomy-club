"use client";

import { useEffect, useRef } from "react";

export default function ContactHandCard() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const visual = visualRef.current;
    if (!host || !visual) return;

    const animate = () => {
      rafRef.current = null;

      current.current.x += (target.current.x - current.current.x) * 0.085;
      current.current.y += (target.current.y - current.current.y) * 0.085;

      const { x, y } = current.current;
      visual.style.transform =
        `translate3d(${x * 10}px, ${y * 8}px, 0) rotateX(${-y * 4}deg) rotateY(${x * 6}deg) scale3d(1.01, 1.01, 1.01)`;

      if (
        Math.abs(target.current.x - current.current.x) > 0.001 ||
        Math.abs(target.current.y - current.current.y) > 0.001
      ) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const request = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      request();
    };

    const onPointerLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      request();
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative mx-auto w-full max-w-3xl"
      aria-label="Interactive 3D Astronomy Club gold card"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[4rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,202,108,0.16),transparent_36%),radial-gradient(circle_at_40%_55%,rgba(87,191,255,0.06),transparent_55%)] blur-3xl" />

      <div
        ref={visualRef}
        className="relative mx-auto aspect-[1.77] w-full max-w-[700px] origin-center will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src="/contact-gold-card.webp"
          alt="High quality 3D gold Astronomy Club card"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-contain"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(255,239,183,0.05),transparent_28%)] mix-blend-screen"
        />
      </div>
    </div>
  );
}
