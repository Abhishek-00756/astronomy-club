"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ContactHandCard() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.7 });
  const springY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.7 });

  const rotateY = useTransform(springX, [-1, 1], [-22, 22]);
  const rotateX = useTransform(springY, [-1, 1], [16, -16]);
  const translateX = useTransform(springX, [-1, 1], [-24, 24]);
  const translateY = useTransform(springY, [-1, 1], [-18, 18]);
  const shadowX = useTransform(springX, [-1, 1], [-28, 28]);
  const shineLeft = useTransform(springX, [-1, 1], ["-25%", "105%"]);
  const highlightOpacity = useTransform(springX, [-1, 0, 1], [0.7, 1, 0.7]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(Math.max(-1, Math.min(1, x)));
    my.set(Math.max(-1, Math.min(1, y)));
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-3xl [perspective:1400px]"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
        mx.set(Math.max(-1, Math.min(1, x)));
        my.set(Math.max(-1, Math.min(1, y)));
      }}
      onTouchEnd={reset}
    >
      <div className="pointer-events-none absolute inset-[-12%] rounded-[5rem] bg-[radial-gradient(circle_at_45%_48%,rgba(255,197,92,0.24),transparent_30%),radial-gradient(circle_at_60%_48%,rgba(104,205,255,0.08),transparent_52%)] blur-3xl" />

      <motion.div
        className="relative mx-auto aspect-[1.62] w-full max-w-[650px] [transform-style:preserve-3d] cursor-pointer"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformPerspective: 1600,
        }}
        initial={{ rotateZ: 0, scale: 0.98 }}
        animate={{
          rotateZ: [0, 0.8, 0, -0.8, 0],
          scale: [0.985, 1.015, 0.985],
        }}
        transition={{
          rotateZ: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-[4%] translate-y-[14px] rounded-[30px] bg-[#76531d]"
          style={{
            x: shadowX,
            transform: "translateZ(-44px) scale(0.97)",
            boxShadow: "0 42px 70px rgba(0,0,0,.62)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-[2%] rounded-[30px] border border-[#fff1c7]/55 bg-[linear-gradient(145deg,#fff0b8_0%,#f1d487_14%,#d2ae63_34%,#b88735_58%,#8b6328_82%,#d9b864_100%)]"
          style={{
            transform: "translateZ(-22px) scale(0.985)",
            boxShadow:
              "inset 3px 3px 0 rgba(255,255,255,.4), inset -6px -7px 0 rgba(72,45,6,.24), 0 28px 60px rgba(0,0,0,.45)",
          }}
        />

        <div
          className="absolute inset-0 overflow-hidden rounded-[30px] border border-[#fff3c4]/90 bg-[linear-gradient(135deg,#fff3bf 0%,#f2d784 18%,#d5b064 40%,#b98739 63%,#936a2d 82%,#e0c077 100%)]"
          style={{
            transform: "translateZ(0px)",
            boxShadow:
              "inset 2px 2px 0 rgba(255,255,255,.52), inset -2px -3px 0 rgba(53,34,5,.34), 0 24px 52px rgba(0,0,0,.36)",
          }}
        >
          <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(73,51,14,.42)_0.6px,transparent_0.6px)] [background-size:5px_5px]" />

          <div className="absolute -inset-x-1/3 top-[-30%] h-[165%] rotate-[20deg] bg-[linear-gradient(90deg,transparent,rgba(255,244,200,.42),transparent)] opacity-70 blur-[1px]" />

          <motion.div
            aria-hidden="true"
            className="absolute -top-[20%] h-[140%] w-[28%] bg-gradient-to-r from-transparent via-white/55 to-transparent blur-2xl"
            style={{
              left: shineLeft,
              rotate: 18,
            }}
          />

          <div className="absolute inset-x-0 top-0 h-[27%] bg-[linear-gradient(180deg,rgba(255,255,255,.24),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(0deg,rgba(74,48,11,.2),transparent)]" />

          <div className="absolute left-[8%] top-[13%]">
            <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-[#181817] sm:text-[16px]">
              Astronomy Club
            </p>
            <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.22em] text-[#494336] sm:text-[9px]">
              Army Institute of Technology · Pune
            </p>
          </div>

          <div className="absolute bottom-[12%] left-[8%]">
            <p className="text-[6px] font-medium uppercase tracking-[0.24em] text-[#62523a] sm:text-[7px]">
              SECRETARY
            </p>
            <p className="mt-1 text-[12px] font-semibold tracking-[0.04em] text-[#252019] sm:text-[15px]">
              Ishaan M
            </p>
          </div>

          <div className="absolute bottom-[12%] right-[8%] text-right">
            <p className="text-[6px] font-medium uppercase tracking-[0.24em] text-[#62523a] sm:text-[7px]">
              SECRETARY
            </p>
            <p className="mt-1 text-[12px] font-semibold tracking-[0.04em] text-[#252019] sm:text-[15px]">
              Manisha
            </p>
          </div>

          <div className="absolute right-[8%] top-[12%] h-9 w-9 rounded-full border border-[#3a3325]/48 sm:h-12 sm:w-12">
            <div className="absolute inset-[27%] rounded-full border border-[#3a3325]/52" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a3325]/70 sm:h-2 sm:w-2" />
          </div>

          <div className="absolute bottom-[12%] right-[8%] h-2 w-[24%] rounded-full bg-white/20 blur-[2px]" />
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,.25),transparent_18%),radial-gradient(circle_at_76%_34%,rgba(255,241,183,.18),transparent_21%)] mix-blend-screen"
          style={{
            transform: "translateZ(42px) scale(1.002)",
            opacity: highlightOpacity,
          }}
        />
      </motion.div>

      <div className="pointer-events-none mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[8px] uppercase tracking-[0.26em] text-white/30">
        Move your cursor over the card
      </div>
    </div>
  );
}
