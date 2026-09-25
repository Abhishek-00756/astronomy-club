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
        `translate3d(${x * 10}px, ${y * 8}px, 0) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.current.x =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.current.y =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;

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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={hostRef} className="relative -ml-8 w-full max-w-3xl sm:-ml-12 lg:-ml-20">
      <div className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-[radial-gradient(circle_at_35%_50%,rgba(255,215,140,0.1),transparent_26%),radial-gradient(circle_at_62%_50%,rgba(96,202,255,0.12),transparent_34%)] blur-2xl" />

      <div
        ref={visualRef}
        className="relative aspect-[1.55] will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/039f4797015327.5ebb8187d79bb.jpg"
          alt="Hand presenting an Astronomy Club card"
          className="absolute inset-0 h-full w-full object-contain opacity-[0.9] grayscale invert brightness-[0.46] contrast-[1.15] drop-shadow-[0_30px_65px_rgba(0,0,0,0.45)]" style={{ transform: "scaleX(-1)" }}
          draggable={false}
        />

        <div className="absolute left-[37%] top-[28%] h-[48%] w-[45%] overflow-hidden rounded-[1rem] border border-white/[0.12] bg-[linear-gradient(135deg,#f2e6c8_0%,#d2b778_42%,#a88748_100%)] shadow-[0_16px_35px_rgba(0,0,0,0.24)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(255,255,255,0.34),transparent_34%),linear-gradient(135deg,transparent,rgba(7,10,16,0.1))]" />

          <div className="relative flex h-full flex-col justify-between p-4 text-[#0a0d14] sm:p-5">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] sm:text-[10px]">
                Astronomy Club
              </p>
              <p className="mt-1 text-[6px] uppercase tracking-[0.19em] opacity-55 sm:text-[8px]">
                Army Institute of Technology · Pune
              </p>
            </div>

            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[6px] uppercase tracking-[0.2em] opacity-55 sm:text-[8px]">
                  Observe · Learn · Explore
                </p>
                <p className="mt-1 text-[5px] uppercase tracking-[0.14em] opacity-45 sm:text-[7px]">
                  Astronomy · Space · Curiosity
                </p>
              </div>

              <div className="h-6 w-6 rounded-full border border-[#0a0d14]/35 bg-[#0a0d14]/8 sm:h-8 sm:w-8">
                <div className="m-[6px] h-2 w-2 rounded-full border border-[#0a0d14]/55 sm:m-2 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-2 left-[11%] rounded-full border border-white/[0.09] bg-[#070b12]/75 px-3 py-2 backdrop-blur-md sm:-bottom-3 sm:px-4">
          <p className="text-[7px] uppercase tracking-[0.26em] text-cyan-100/55 sm:text-[8px]">
            Contact signal
          </p>
        </div>
      </div>
    </div>
  );
}
