"use client";

import { useState } from "react";
import DitherVeil from "@/components/members/DitherVeil";
import FlowingCategories from "@/components/members/FlowingCategories";
import MemberGallery, { type MemberProfile } from "@/components/members/MemberGallery";

const membersByCategory: Record<string, MemberProfile[]> = {
  secretaries: [
    { id: "s1", name: "Name to be added", role: "Secretary", category: "Secretaries", initials: "S1", note: "Add portrait + short bio" },
    { id: "s2", name: "Name to be added", role: "Secretary", category: "Secretaries", initials: "S2", note: "Add portrait + short bio" },
    { id: "s3", name: "Name to be added", role: "Secretary", category: "Secretaries", initials: "S3", note: "Add portrait + short bio" },
    { id: "s4", name: "Name to be added", role: "Secretary", category: "Secretaries", initials: "S4", note: "Add portrait + short bio" },
  ],
  te: [
    { id: "t1", name: "Name to be added", role: "TE Member", category: "TE Members", initials: "T1", note: "Add portrait + short bio" },
    { id: "t2", name: "Name to be added", role: "TE Member", category: "TE Members", initials: "T2", note: "Add portrait + short bio" },
    { id: "t3", name: "Name to be added", role: "TE Member", category: "TE Members", initials: "T3", note: "Add portrait + short bio" },
    { id: "t4", name: "Name to be added", role: "TE Member", category: "TE Members", initials: "T4", note: "Add portrait + short bio" },
  ],
  "joint-secretaries": [
    { id: "j1", name: "Name to be added", role: "Joint Secretary", category: "Joint Secretaries", initials: "J1", note: "Add portrait + short bio" },
    { id: "j2", name: "Name to be added", role: "Joint Secretary", category: "Joint Secretaries", initials: "J2", note: "Add portrait + short bio" },
    { id: "j3", name: "Name to be added", role: "Joint Secretary", category: "Joint Secretaries", initials: "J3", note: "Add portrait + short bio" },
    { id: "j4", name: "Name to be added", role: "Joint Secretary", category: "Joint Secretaries", initials: "J4", note: "Add portrait + short bio" },
  ],
  fe: [
    { id: "f1", name: "Name to be added", role: "FE Member", category: "FE Members", initials: "F1", note: "Add portrait + short bio" },
    { id: "f2", name: "Name to be added", role: "FE Member", category: "FE Members", initials: "F2", note: "Add portrait + short bio" },
    { id: "f3", name: "Name to be added", role: "FE Member", category: "FE Members", initials: "F3", note: "Add portrait + short bio" },
    { id: "f4", name: "Name to be added", role: "FE Member", category: "FE Members", initials: "F4", note: "Add portrait + short bio" },
  ],
};

const categoryMeta = {
  secretaries: {
    title: "Secretaries",
    copy: "The people keeping the club connected, organized and moving.",
  },
  te: {
    title: "TE Members",
    copy: "Senior student members contributing ideas, builds, observations and events.",
  },
  "joint-secretaries": {
    title: "Joint Secretaries",
    copy: "A close-working layer supporting coordination across the club.",
  },
  fe: {
    title: "FE Members",
    copy: "New voices bringing fresh curiosity into the astronomy community.",
  },
} as const;

type MembersDirectoryProps = {
  showIntro?: boolean;
};

export default function MembersDirectory({
  showIntro = true,
}: MembersDirectoryProps) {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof membersByCategory>("secretaries");

  const activeMembers = membersByCategory[activeCategory];
  const meta = categoryMeta[activeCategory];

  return (
    <>
      {showIntro && (
        <div className="mx-auto max-w-7xl px-6 pt-28 sm:px-10 lg:px-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
            02 / The People
          </p>

          <h2 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl md:text-7xl">
            Meet the
            <span className="block text-white/45">people behind the club.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Explore the current member structure through flowing categories,
            cinematic portraits and a dithered field between each layer.
          </p>
        </div>
      )}

      <div className={showIntro ? "mt-14" : "mt-0"}>
        <DitherVeil />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
          Browse the club
        </p>

        <h3 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">
          One sky.
          <span className="text-white/42"> Different paths into it.</span>
        </h3>

        <FlowingCategories
          active={activeCategory}
          onChange={(id) =>
            setActiveCategory(id as keyof typeof membersByCategory)
          }
        />

        <div className="mt-16 flex flex-col gap-5 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.26em] text-cyan-100/42">
              {meta.title}
            </p>
            <h4 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Meet the {meta.title.toLowerCase()}.
            </h4>
          </div>

          <p className="max-w-lg text-sm leading-6 text-white/38">
            {meta.copy}
          </p>
        </div>

        <MemberGallery members={activeMembers} />
      </div>
    </>
  );
}
