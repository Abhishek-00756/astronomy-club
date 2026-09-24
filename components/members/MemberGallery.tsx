"use client";

import {
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type MemberProfile = {
  id: string;
  name: string;
  role: string;
  category: string;
  initials: string;
  image?: string;
  note?: string;
  bio?: string;
  domain?: string;
  regNo?: string;
};

type MemberGalleryProps = {
  members: MemberProfile[];
};

export default function MemberGallery({ members }: MemberGalleryProps) {
  const rows: MemberProfile[][] = [];

  for (let i = 0; i < members.length; i += 4) {
    rows.push(members.slice(i, i + 4));
  }

  return (
    <div className="mt-10 space-y-5">
      {rows.map((row, rowIndex) => (
        <GalleryRow key={row[0]?.id ?? rowIndex} members={row} />
      ))}

      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {members.map((member, index) => (
          <MemberPhoto
            key={member.id}
            member={member}
            index={index}
            active
            onActivate={() => undefined}
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
        <MemberPhoto
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

function MemberPhoto({
  member,
  index,
  active,
  onActivate,
}: {
  member: MemberProfile;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const resetPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "18%");
  };

  return (
    <article
      onMouseEnter={onActivate}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onActivate();
      }}
      className="group relative min-w-0 cursor-pointer [perspective:1200px] outline-none focus-visible:ring-2 focus-visible:ring-cyan-100/35"
      style={{
        flex: active ? "2.3 1 0%" : "0.9 1 0%",
        transition: "flex 700ms cubic-bezier(.22,1,.36,1)",
      }}
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="relative h-full overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#0a0d13] shadow-[0_25px_70px_rgba(0,0,0,.28)] transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:border-cyan-100/22 group-hover:shadow-[0_35px_95px_rgba(0,0,0,.42)]">
        <div className="absolute inset-0 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(128,199,255,0.24),transparent_27%),linear-gradient(145deg,#121b2b,#070a0f_70%)]" />
              <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,.4)_0.75px,transparent_.9px)] [background-size:8px_8px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030509] via-transparent to-transparent" />
            </>
          )}

          <div
            className={[
              "pointer-events-none absolute inset-[-30%] transition-opacity duration-500",
              active ? "opacity-100" : "opacity-45",
            ].join(" ")}
            style={{
              background:
                "radial-gradient(circle at var(--mx) var(--my), rgba(231,249,255,.21), transparent 17%)",
              mixBlendMode: "screen",
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030509] via-transparent to-transparent" />
        </div>

        <div
          className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-[8px] uppercase tracking-[0.25em] text-white/34"
          style={{ transform: "translateZ(35px)" }}
        >
          <span>{member.category}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div
          className="absolute inset-x-5 bottom-5 z-10"
          style={{ transform: "translateZ(45px)" }}
        >
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

          {member.regNo && (
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/24">
              Reg. No. {member.regNo}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
