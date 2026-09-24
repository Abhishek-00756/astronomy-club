"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { MemberProfile } from "./MemberGallery";

type Props = {
  member: MemberProfile | null;
  onClose: () => void;
};

export default function MemberLanyard({ member, onClose }: Props) {
  useEffect(() => {
    if (!member) return;

    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-md sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            aria-label="Close member profile"
            onClick={onClose}
            className="fixed right-5 top-5 z-[130] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xl text-white/70 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>

          <motion.div
            initial={{ y: -90, rotate: -3, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
            exit={{ y: -35, rotate: 2, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="mt-8 w-full max-w-xl origin-top"
          >
            <motion.div
              animate={{ rotate: [-1, 1, -0.6, 0.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="origin-top"
            >
              <div className="mx-auto h-44 w-px bg-white/20" />
              <div className="mx-auto -mt-1 h-8 w-8 rounded-full border border-white/20 bg-[#10131a] shadow-lg" />

              <div className="mx-auto mt-2 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#eef0f2] text-[#0b0d12] shadow-[0_35px_100px_rgba(0,0,0,.55)]">
                <div className="relative h-72 overflow-hidden bg-[#cfd3d8]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#d7dbe0,#939aa2)]">
                      <span className="text-7xl font-semibold text-black/15">
                        {member.initials}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex justify-between text-[8px] font-semibold uppercase tracking-[0.28em] text-white/75">
                    <span>Astronomy Club</span>
                    <span>{member.id}</span>
                  </div>

                  <div className="absolute bottom-5 left-5">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                      {member.category}
                    </p>
                    <p className="mt-1 text-sm text-white/85">{member.role}</p>
                  </div>
                </div>

                <div className="relative px-6 pb-7 pt-7 sm:px-8 sm:pb-9">
                  <div className="absolute left-1/2 top-[-13px] h-7 w-7 -translate-x-1/2 rounded-full border-4 border-[#05070A] bg-[#12161e]" />

                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
                    Member profile
                  </p>

                  <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                    {member.name}
                  </h2>

                  {member.domain && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
                      {member.domain}
                    </p>
                  )}

                  {member.bio && (
                    <p className="mt-5 text-sm leading-7 text-black/60 sm:text-base">
                      {member.bio}
                    </p>
                  )}

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-black/10 bg-black/[0.035] p-4">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-black/35">
                        Role
                      </p>
                      <p className="mt-1 text-sm font-medium">{member.role}</p>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-black/[0.035] p-4">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-black/35">
                        Member ID
                      </p>
                      <p className="mt-1 text-sm font-medium">{member.id}</p>
                    </div>

                    {member.regNo && (
                      <div className="rounded-2xl border border-black/10 bg-black/[0.035] p-4 sm:col-span-2">
                        <p className="text-[8px] uppercase tracking-[0.2em] text-black/35">
                          Registration Number
                        </p>
                        <p className="mt-1 text-sm font-medium">{member.regNo}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
