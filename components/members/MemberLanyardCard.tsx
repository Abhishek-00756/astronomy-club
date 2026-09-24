"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import type { MemberProfile } from "./MemberGallery";

type Props = {
  member: MemberProfile | null;
  onClose: () => void;
};

function AtomMark() {
  return (
    <span className="relative inline-flex h-4 w-4 items-center justify-center text-white">
      <span className="absolute h-3.5 w-1.5 rounded-full border border-white/90 rotate-[38deg]" />
      <span className="absolute h-3.5 w-1.5 rounded-full border border-white/90 -rotate-[38deg]" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/95" />
    </span>
  );
}

function Rope({
  dragX,
  dragY,
  anchorY,
}: {
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  anchorY: number;
}) {
  const [viewportSize, setViewportSize] = useState({ width: 1280, height: 900 });
  const ropeX = useSpring(dragX, { stiffness: 155, damping: 18, mass: 0.7 });
  const ropeY = useSpring(dragY, { stiffness: 155, damping: 18, mass: 0.7 });

  useEffect(() => {
    const update = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const path = useTransform([ropeX, ropeY], ([x, y]) => {
    const startX = viewportSize.width / 2;
    const endX = startX + Number(x);
    const endY = anchorY + Number(y);

    const dx = Number(x);
    const dy = Number(y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const direction = Math.sign(dx) || 1;
    const stretch = Math.min(1, distance / 360);
    const sag = 92 + Math.min(125, distance * 0.22);

    const control1X = startX + dx * (0.06 + stretch * 0.08);
    const control1Y = Math.min(135, 72 + sag * 0.18 + Math.max(0, dy) * 0.06);
    const control2X = endX - direction * (92 + stretch * 135);
    const control2Y = Math.max(120, endY - sag);

    return `M ${startX} 0 C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
  });

  const clipX = useTransform(
    dragX,
    (value) => `${viewportSize.width / 2 + value}px`,
  );
  const clipY = useTransform(
    dragY,
    (value) => `${anchorY + value - 3}px`,
  );
  const clipRotate = useTransform(dragX, [-280, 0, 280], [-16, 0, 16]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[110]">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewportSize.width} ${viewportSize.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="astronomy-lanyard-pattern"
            width="58"
            height="88"
            patternUnits="userSpaceOnUse"
          >
            <g transform="translate(29 42)">
              <path
                d="M0-11 L2.8-2.8 L11 0 L2.8 2.8 L0 11 L-2.8 2.8 L-11 0 L-2.8-2.8 Z"
                fill="rgba(255,255,255,.92)"
              />
              <circle
                cx="0"
                cy="0"
                r="13"
                fill="none"
                stroke="rgba(255,255,255,.34)"
                strokeWidth="1.2"
              />
              <circle
                cx="9"
                cy="-5"
                r="2"
                fill="rgba(255,255,255,.9)"
              />
            </g>
          </pattern>
        </defs>

        <motion.path
          d={path}
          fill="none"
          stroke="#050608"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          fill="none"
          stroke="url(#astronomy-lanyard-pattern)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,.055)"
          strokeWidth="1"
        />
      </svg>

      <motion.div
        className="absolute h-10 w-11 -translate-x-1/2 -translate-y-1/2 rounded-b-[0.7rem] border-2 border-[#08090d] bg-[#101218] shadow-[0_7px_20px_rgba(0,0,0,.5)]"
        style={{
          left: clipX,
          top: clipY,
          rotate: clipRotate,
        }}
      >
        <div className="absolute left-1/2 top-[-0.75rem] h-5 w-7 -translate-x-1/2 rounded-full border-2 border-[#08090d] bg-[#171921]" />
        <div className="absolute bottom-[-0.6rem] left-1/2 h-3 w-2 -translate-x-1/2 rounded-b-full bg-[#0a0b10]" />
      </motion.div>
    </div>
  );
}

export default function MemberLanyardCard({ member, onClose }: Props) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const cardRotate = useTransform(dragX, [-280, 0, 280], [-10, 0, 10]);
  const anchorY = 256;

  useEffect(() => {
    if (!member) return;

    dragX.set(0);
    dragY.set(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [member, onClose, dragX, dragY]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[120] flex min-h-screen items-start justify-center overflow-hidden bg-[#06070b]/62 px-4 py-0 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close member profile"
            className="fixed right-5 top-5 z-[140] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-xl text-white/70 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>

          <Rope dragX={dragX} dragY={dragY} anchorY={anchorY} />

          <div className="relative mt-0 flex min-h-screen w-full max-w-[31rem] justify-center pt-2 sm:pt-5">
            <motion.div
              initial={{ y: -230, rotate: -2.8, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 105,
                damping: 16,
                mass: 1.05,
              }}
              className="relative mt-[15.6rem] w-[min(88vw,31rem)] origin-top sm:mt-[15.8rem]"
            >
              <motion.div
                drag
                dragConstraints={{
                  left: -280,
                  right: 280,
                  top: -120,
                  bottom: 480,
                }}
                dragElastic={0.12}
                dragMomentum={false}
                style={{
                  x: dragX,
                  y: dragY,
                  rotate: cardRotate,
                }}
                whileDrag={{
                  scale: 1.025,
                  cursor: "grabbing",
                }}
                onDragStart={() => {
                  animate(dragX, dragX.get(), { duration: 0 });
                  animate(dragY, dragY.get(), { duration: 0 });
                }}
                onDragEnd={() => {
                  animate(dragX, 0, {
                    type: "spring",
                    stiffness: 85,
                    damping: 12,
                    mass: 0.9,
                  });
                  animate(dragY, 0, {
                    type: "spring",
                    stiffness: 85,
                    damping: 12,
                    mass: 0.9,
                  });
                }}
                className="origin-top cursor-grab touch-none select-none"
              >
                <div className="relative">
                  <div className="absolute left-1/2 top-[-0.85rem] z-20 h-8 w-8 -translate-x-1/2 rounded-full border-[4px] border-[#05070A] bg-[#11151d] shadow-lg" />

                  <div className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-[#f0f1f2] text-[#0b0c10] shadow-[0_35px_90px_rgba(0,0,0,.5)] sm:rounded-[1.5rem]">
                    <div className="relative h-72 overflow-hidden bg-[#cfd3d8] sm:h-[19rem]">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 88vw, 496px"
                          quality={78}
                          draggable={false}
                          className="pointer-events-none object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#d9dde2,#929aa3)]">
                          <span className="text-7xl font-semibold tracking-[-0.08em] text-black/15">
                            {member.initials}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />

                      <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.28em] text-white/80">
                        <span>Astronomy Club</span>
                        <span>{member.id}</span>
                      </div>

                      <div className="absolute bottom-5 left-5">
                        <p className="text-[9px] uppercase tracking-[0.26em] text-white/72">
                          {member.category}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white/90">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="relative px-6 pb-7 pt-7 sm:px-8 sm:pb-8">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/38">
                            Member profile
                          </p>

                          <h2 className="mt-3 max-w-[22rem] text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl">
                            {member.name}
                          </h2>
                        </div>

                        <div className="mt-1 hidden sm:block">
                          <AtomMark />
                        </div>
                      </div>

                      {member.domain && (
                        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                          {member.domain}
                        </p>
                      )}

                      {member.bio && (
                        <p className="mt-5 max-w-xl text-sm leading-6 text-black/60 sm:text-[15px] sm:leading-7">
                          {member.bio}
                        </p>
                      )}

                      <div className="mt-7 flex flex-wrap gap-2">
                        <span className="rounded-full border border-black/10 bg-black/[0.035] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-black/50">
                          {member.role}
                        </span>
                        <span className="rounded-full border border-black/10 bg-black/[0.035] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-black/50">
                          {member.id}
                        </span>
                        {member.regNo && (
                          <span className="rounded-full border border-black/10 bg-black/[0.035] px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-black/50">
                            Reg. {member.regNo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
