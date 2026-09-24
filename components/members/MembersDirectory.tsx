"use client";

import { useState } from "react";
import DitherVeil from "@/components/members/DitherVeil";
import FlowingCategories from "@/components/members/FlowingCategories";
import MemberGalleryInteractive, {
  type MemberProfile,
} from "@/components/members/MemberGalleryInteractive";
import { secretaries } from "@/data/members/secretaries/members";
import { teMembers } from "@/data/members/te/members";
import { jointSecretaries } from "@/data/members/joint-secretaries/members";
import { feMembers } from "@/data/members/fe/members";

type CategoryKey =
  | "secretaries"
  | "te"
  | "joint-secretaries"
  | "fe";

const categorySources: Record<CategoryKey, {
  title: string;
  copy: string;
  role: string;
  category: MemberProfile["category"];
  members: typeof secretaries;
}> = {
  secretaries: {
    title: "Secretaries",
    copy: "The people keeping the club connected, organized and moving.",
    role: "Secretary",
    category: "Secretaries",
    members: secretaries,
  },
  te: {
    title: "TE Members",
    copy: "Senior student members contributing ideas, builds, observations and events.",
    role: "TE Member",
    category: "TE Members",
    members: teMembers,
  },
  "joint-secretaries": {
    title: "Joint Secretaries",
    copy: "A close-working layer supporting coordination across the club.",
    role: "Joint Secretary",
    category: "Joint Secretaries",
    members: jointSecretaries,
  },
  fe: {
    title: "FE Members",
    copy: "New voices bringing fresh curiosity into the astronomy community.",
    role: "FE Member",
    category: "FE Members",
    members: feMembers,
  },
};

function toProfiles(
  source: (typeof secretaries),
  role: string,
  category: MemberProfile["category"],
): MemberProfile[] {
  return source.map((member) => ({
    id: member.id,
    name: member.name,
    role,
    category,
    initials: member.id.replace("-", ""),
    image: member.photo,
    note: member.bio || (member.domain ? `Domain · ${member.domain}` : ""),
    bio: member.bio,
    domain: member.domain,
    regNo: member.regNo,
  }));
}

export default function MembersDirectory({
  showIntro = true,
}: {
  showIntro?: boolean;
}) {
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey>("secretaries");

  const source = categorySources[activeCategory];
  const activeMembers = toProfiles(
    source.members,
    source.role,
    source.category,
  );

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
          onChange={(id) => setActiveCategory(id as CategoryKey)}
        />

        <div className="mt-16 flex flex-col gap-5 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.26em] text-cyan-100/42">
              {source.title}
            </p>
            <h4 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Meet the {source.title.toLowerCase()}.
            </h4>
          </div>

          <p className="max-w-lg text-sm leading-6 text-white/38">
            {source.copy}
          </p>
        </div>

        <MemberGalleryInteractive members={activeMembers} />
      </div>
    </>
  );
}
