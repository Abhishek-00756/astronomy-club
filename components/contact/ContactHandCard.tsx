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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative mx-auto w-full max-w-3xl"
      aria-label="Astronomy Club contact card"
    >
      <div className="pointer-events-none absolute -inset-12 rounded-[5rem] bg-[radial-gradient(circle_at_38%_50%,rgba(255,215,140,0.1),transparent_30%),radial-gradient(circle_at_70%_48%,rgba(110,205,255,0.07),transparent_34%)] blur-3xl" />

      <div
        ref={visualRef}
        className="relative mx-auto aspect-square w-full max-w-[560px] origin-center will-change-transform [transform-style:preserve-3d]"
      >
        <img
          src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8zN19oYW5kX21vZGVsX2hvbGRpbmdfYV9tb2NrdXBfb2ZfY2FyZF9pc29sYXRlZF81NTc5MjE2NS1iNzIwLTRkYzEtOGIzOC05YjgxMTJiMDhiNDQucG5n.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain select-none grayscale contrast-[1.18] brightness-[0.62]"
        />

        <div
          aria-hidden="true"
          className="absolute left-[22.5%] top-[31.5%] h-[24.5%] w-[44%] -rotate-0 rounded-[14px] border border-white/25 bg-[linear-gradient(135deg,#f4e6bf_0%,#d9be80_52%,#ad8848_100%)] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute inset-0 rounded-[14px] bg-[radial-gradient(circle_at_76%_28%,rgba(255,255,255,0.22),transparent_20%)]" />
          <div className="absolute left-[10%] top-[16%]">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#171b1f] sm:text-[11px]">
              Astronomy Club
            </p>
            <p className="mt-1 text-[5px] uppercase tracking-[0.18em] text-[#3e4448] sm:text-[6px]">
              Army Institute of Technology · Pune
            </p>
          </div>
          <div className="absolute bottom-[12%] left-[10%]">
            <p className="text-[5px] uppercase tracking-[0.2em] text-[#52575b] sm:text-[6px]">
              Observe · Learn · Explore
            </p>
            <p className="mt-1 text-[4px] uppercase tracking-[0.16em] text-[#62666a] sm:text-[5px]">
              Astronomy · Space · Curiosity
            </p>
          </div>
          <div className="absolute right-[8%] top-[18%] flex h-5 w-5 items-center justify-center rounded-full border border-[#3a3f43]/45 sm:h-7 sm:w-7">
            <span className="h-2 w-2 rounded-full border border-[#3a3f43]/55 sm:h-2.5 sm:w-2.5" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_47%,rgba(255,219,150,0.08),transparent_25%),linear-gradient(90deg,transparent_38%,rgba(0,0,0,0.1)_100%)]"
        />

        <div className="pointer-events-none absolute bottom-[8%] left-[11%] rounded-full border border-white/[0.09] bg-[#070b12]/80 px-3 py-2 backdrop-blur-md sm:px-4">
          <p className="text-[7px] uppercase tracking-[0.26em] text-cyan-100/55 sm:text-[8px]">
            Contact signal
          </p>
        </div>
      </div>
    </div>
  );
}
