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
      current.current.x += (target.current.x - current.current.x) * 0.09;
      current.current.y += (target.current.y - current.current.y) * 0.09;

      const { x, y } = current.current;
      visual.style.transform =
        `translate3d(${x * 12}px, ${y * 9}px, 0) rotateX(${-y * 5}deg) rotateY(${x * 8}deg)`;

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
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[5rem] bg-[radial-gradient(circle_at_45%_48%,rgba(255,197,92,0.22),transparent_30%),radial-gradient(circle_at_60%_48%,rgba(104,205,255,0.06),transparent_55%)] blur-3xl" />

      <div
        ref={visualRef}
        className="relative mx-auto aspect-[1.62] w-full max-w-[650px] origin-center transition-transform duration-300 [transform-style:preserve-3d]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-[3.2%] translate-y-[10px] rounded-[30px] bg-[#806126] shadow-[0_34px_55px_rgba(0,0,0,0.58)]"
          style={{ transform: "translateZ(-28px)" }}
        />

        <div
          className="absolute inset-[2%] rounded-[30px] border border-[#f9e6ad]/55 bg-[linear-gradient(145deg,#fff4c8_0%,#ecd69a_14%,#c9a85d_48%,#9b7635_82%,#e0c47f_100%)] shadow-[inset_2px_2px_0_rgba(255,255,255,0.42),inset_-5px_-6px_0_rgba(76,51,9,0.28),0_30px_65px_rgba(0,0,0,0.42)]"
          style={{ transform: "translateZ(-8px)" }}
        />

        <div
          className="absolute inset-0 overflow-hidden rounded-[30px] border border-[#fff1bf]/85 bg-[linear-gradient(135deg,#fff0b9_0%,#e6cb86_22%,#c8a35a_54%,#a27c3c_78%,#d7b96f_100%)] shadow-[inset_1px_1px_0_rgba(255,255,255,0.55),inset_-1px_-2px_0_rgba(49,33,8,0.36),0_24px_60px_rgba(0,0,0,0.36)]"
          style={{ transform: "translateZ(0px)" }}
        >
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(75,53,17,0.45)_0.6px,transparent_0.6px)] [background-size:5px_5px]" />
          <div className="absolute -inset-x-1/3 top-[-35%] h-[170%] rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-65 blur-[1px]" />
          <div className="absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(0deg,rgba(75,48,10,0.18),transparent)]" />

          <div className="absolute left-[8%] top-[13%]">
            <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#1c1c1b] sm:text-[16px]">
              Astronomy Club
            </p>
            <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.22em] text-[#4b4437] sm:text-[9px]">
              Army Institute of Technology · Pune
            </p>
          </div>

          <div className="absolute left-[8%] bottom-[14%]">
            <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#5d5443] sm:text-[10px]">
              Observe · Learn · Explore
            </p>
            <p className="mt-1 text-[6px] uppercase tracking-[0.2em] text-[#6c634f] sm:text-[7px]">
              Astronomy · Space · Curiosity
            </p>
          </div>

          <div className="absolute right-[8%] top-[12%] h-9 w-9 rounded-full border border-[#3c3527]/45 sm:h-12 sm:w-12">
            <div className="absolute inset-[27%] rounded-full border border-[#3c3527]/50" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3c3527]/70 sm:h-2 sm:w-2" />
          </div>

          <div className="absolute bottom-[12%] right-[8%] h-2 w-[24%] rounded-full bg-[#ffffff]/18 blur-[2px]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.24),transparent_18%),radial-gradient(circle_at_76%_36%,rgba(255,241,183,0.16),transparent_20%)] mix-blend-screen"
          style={{ transform: "translateZ(18px)" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[12%] -bottom-[6%] h-[18%] rounded-full bg-black/45 blur-2xl"
        />
      </div>
    </div>
  );
}
