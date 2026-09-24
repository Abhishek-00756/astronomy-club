"use client";

import Link from "next/link";
import { useState } from "react";
import DitherVeil from "@/components/members/DitherVeil";
import FlowingCategories from "@/components/members/FlowingCategories";
import MemberGallery, {
  type MemberProfile,
} from "@/components/members/MemberGallery";

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

export default function MembersPageClient() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof membersByCategory>("secretaries");

  const activeMembers = membersByCategory[activeCategory];
  const meta = categoryMeta[activeCategory];

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-6 py-28 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <Link
              href="/#members"
              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/30 transition hover:text-white/55"
            >
              <span aria-hidden="true">←</span>
              Back to the club
            </Link>

            <p className="mt-14 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
              02 / The People
            </p>

            <h1 className="mt-5 max-w-4xl text-6xl font-semibold tracking-[-0.06em] sm:text-7xl md:text-[6.8rem]">
              The people
              <span className="block text-white/42">behind the stars.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              A dedicated member space with flowing category navigation,
              cinematic portraits and a subtle dithered field in between.
              Add the official names and photos when the committee list is ready.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute right-[-8%] top-[18%] h-80 w-80 rounded-full bg-cyan-300/[0.06] blur-[110px]" />
        <div className="pointer-events-none absolute left-[12%] top-[22%] h-56 w-56 rounded-full bg-indigo-400/[0.05] blur-[100px]" />
      </section>

      <DitherVeil />

      <section className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
          Browse the club
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">
          One sky.
          <span className="text-white/42"> Different paths into it.</span>
        </h2>

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
            <h3 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Meet the {meta.title.toLowerCase()}.
            </h3>
          </div>

          <p className="max-w-lg text-sm leading-6 text-white/38">
            {meta.copy}
          </p>
        </div>

        <MemberGallery members={activeMembers} />
      </section>

      <section className="border-t border-white/[0.05] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.08] bg-white/[0.02] px-6 py-12 sm:px-10 md:flex md:items-end md:justify-between md:gap-10">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-cyan-100/42">
              Member portraits
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Drop in the real photos and this becomes the finished directory.
            </h2>
          </div>

          <p className="mt-6 max-w-md text-sm leading-6 text-white/38 md:mt-0">
            The portrait cards already have the tilt, depth, glare and gallery
            motion. The only missing data is the official member information
            and image files.
          </p>
        </div>
      </section>
    </main>
  );
}
