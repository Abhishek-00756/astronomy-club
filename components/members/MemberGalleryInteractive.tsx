"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import type { MemberProfile } from "./MemberGallery";
import MemberLanyardCard from "./MemberLanyardCard";

export default function MemberGalleryInteractive({
  members,
}: {
  members: MemberProfile[];
}) {
  const rows: MemberProfile[][] = [];

  for (let i = 0; i < members.length; i += 4) {
    rows.push(members.slice(i, i + 4));
  }

  return (
    <div className="mt-10 space-y-5">
      {rows.map((row, rowIndex) => (
        <GalleryRow
          key={row[0]?.id ?? rowIndex}
          members={row}
        />
      ))}

      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {members.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            mobile
          />
        ))}
      </div>
    </div>
  );
}

function GalleryRow({ members }: { members: MemberProfile[] }) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");

  return (
    <div className="hidden h-[30rem] gap-3 lg:flex">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          index={index}
          active={activeId === member.id}
          onActivate={() => setActiveId(member.id)}
        />
      ))}
    </div>
  );
}

function MemberCard({
  member,
  index,
  active = true,
  mobile = false,
  onActivate,
}: {
  member: MemberProfile;
  index: number;
  active?: boolean;
  mobile?: boolean;
  onActivate?: () => void;
}) {
  const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const reset = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "18%");
  };

  return (
    <article
      onMouseEnter={onActivate}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onClick={(event) => {
        onActivate?.();
        event.currentTarget.focus();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.focus();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}`}
      className={`group relative min-w-0 cursor-pointer outline-none  focus-visible:ring-2 focus-visible:ring-cyan-100/35 ${mobile ? "min-h-[28rem]" : ""}`}
      style={{
        flex: mobile ? "1 1 0%" : active ? "2.3 1 0%" : "0.9 1 0%",
        transition: mobile
          ? undefined
          : "flex 700ms cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div className="relative h-full min-h-[28rem] overflow-hidden [perspective:1200px] rounded-[1.7rem] border border-white/[0.09] bg-[#0a0d13] shadow-[0_25px_70px_rgba(0,0,0,.28)] transition duration-700 [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] group-focus:border-cyan-100/30 group-hover:-translate-y-1 group-hover:border-cyan-100/22">
        <div className="absolute inset-0 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_25%,rgba(128,199,255,.24),transparent_28%),linear-gradient(145deg,#121b2b,#070a0f_70%)]">
              <span className="text-6xl font-semibold text-white/15">
                {member.initials}
              </span>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-[-30%]"
            style={{
              background:
                "radial-gradient(circle at var(--mx) var(--my), rgba(231,249,255,.21), transparent 17%)",
              mixBlendMode: "screen",
              opacity: active ? 1 : 0.45,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#030509] via-transparent to-transparent" />
        </div>

        <div className="absolute inset-x-5 top-5 z-10 flex justify-between text-[8px] uppercase tracking-[0.25em] text-white/34">
          <span>{member.category}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="absolute inset-x-5 bottom-5 z-10">
          <p className="text-[9px] uppercase tracking-[0.24em] text-cyan-100/48">
            {member.role}
          </p>
          <h3 className="mt-2 max-w-[18rem] text-2xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-3xl">
            {member.name}
          </h3>
          {member.domain && (
            <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-cyan-100/48">
              {member.domain}
            </p>
          )}
          {member.bio && (
            <p className="mt-2 max-w-[19rem] text-xs leading-5 text-white/54">
              {member.bio}
            </p>
          )}
        </div>
      </div>

      <MemberLanyardCard member={member} />
    </article>
  );
}
