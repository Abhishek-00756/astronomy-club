"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
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

function Lanyard({ dragX, dragY }: { dragX: ReturnType<typeof useMotionValue<number>>; dragY: ReturnType<typeof useMotionValue<number>> }) {
  const strapAngle = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    return Math.max(-22, Math.min(22, x * 0.045 - y * 0.012));
  });

  const strapPull = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    return Math.sqrt(x * x + y * y) * 0.16;
  });

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-0 z-10 flex w-12 -translate-x-1/2 flex-col items-center"
      style={{ rotate: strapAngle }}
    >
      <div
        className="h-[7.5rem] w-[1.25rem] bg-[#050608] shadow-[0_0_0_1px_rgba(255,255,255,.03)] sm:h-36"
        style={{ transform: "translateY(-2px)" }}
      >
        <div className="flex h-full flex-col items-center justify-start gap-7 pt-4">
          <AtomMark />
          <AtomMark />
          <AtomMark />
        </div>
      </div>

      <motion.div
        className="relative h-7 w-8 rounded-b-[0.65rem] border-2 border-[#08090d] bg-[#101218] shadow-[0_5px_18px_rgba(0,0,0,.45)]"
        style={{ y: strapPull }}
      >
        <div className="absolute left-1/2 top-[-0.5rem] h-4 w-5 -translate-x-1/2 rounded-full border-2 border-[#08090d] bg-[#171921]" />
      </motion.div>

      <div className="relative -mt-[0.1rem] h-5 w-2 rounded-b-full bg-[#0a0b10]" />
    </motion.div>
  );
}

export default function MemberLanyardCard({ member, onClose }: Props) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const cardRotate = useTransform(dragX, [-260, 0, 260], [-9, 0, 9]);
  const cardLift = useTransform(dragY, [-220, 0, 520], [-10, 0, 8]);
  const shadowBlur = useTransform(dragY, [-220, 0, 520], [40, 65, 90]);

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
            className="fixed right-5 top-5 z-[130] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-xl text-white/70 backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>

          <div className="relative mt-0 flex min-h-screen w-full max-w-[31rem] justify-center pt-2 sm:pt-5">
            <Lanyard dragX={dragX} dragY={dragY} />

            <motion.div
              initial={{ y: -230, rotate: -2.8, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, rotate: 2, opacity: 0, scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 105,
                damping: 16,
                mass: 1.05,
              }}
              className="relative mt-[11.3rem] w-[min(88vw,31rem)] origin-top sm:mt-[14.2rem]"
            >
              <motion.div
                drag
                dragConstraints={{
                  left: -250,
                  right: 250,
                  top: -90,
                  bottom: 500,
                }}
                dragElastic={0.16}
                dragMomentum
                style={{
                  x: dragX,
                  y: dragY,
                  rotate: cardRotate,
                }}
                whileDrag={{
                  scale: 1.025,
                  cursor: "grabbing",
                }}
                animate={{
                  boxShadow: "0 35px 95px rgba(0,0,0,.5)",
                }}
                transition={{
                  boxShadow: {
                    duration: 0.2,
                  },
                }}
                onDragEnd={() => {
                  dragX.set(0);
                  dragY.set(0);
                }}
                className="cursor-grab touch-none select-none origin-top"
              >
                <motion.div style={{ y: cardLift }}>
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
                      <div className="absolute left-1/2 top-[-1rem] h-8 w-8 -translate-x-1/2 rounded-full border-[4px] border-[#05070A] bg-[#11151d]" />

                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-black/38">
                            Member profile
                          </p>

                          <h2 className="mt-3 max-w-[22rem] text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl">
                            {member.name}
                          </h2>
                        </div>

                        <div className="mt-1 hidden text-black/20 sm:block">
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
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
