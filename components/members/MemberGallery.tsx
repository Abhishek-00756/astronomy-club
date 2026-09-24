"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export type MemberProfile = {
  id: string;
  name: string;
  role: string;
  category: string;
  initials: string;
  image?: string;
  note?: string;
};

type MemberGalleryProps = {
  members: MemberProfile[];
};

export default function MemberGallery({ members }: MemberGalleryProps) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? "");

  return (
    <div className="mt-10">
      <div className="hidden h-[31rem] gap-3 lg:flex">
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

      <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
        {members.map((member, index) => (
          <MemberPhoto
            key={member.id}
            member={member}
            index={index}
            active
            onActivate={() => setActiveId(member.id)}
          />
        ))}
      </div>
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
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "18%");
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={onActivate}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onActivate();
      }}
      className="relative min-w-0 cursor-pointer [perspective:1200px] outline-none focus-visible:ring-2 focus-visible:ring-cyan-100/35"
      style={{
        flex: active ? "2.2 1 0%" : "0.85 1 0%",
        transition:
          "flex 700ms cubic-bezier(.22,1,.36,1)",
      }}
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-[#0a0d13] shadow-2xl transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] hover:border-cyan-100/22 hover:shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.15] transition duration-1000 ease-out hover:grayscale-0"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(128,199,255,0.31),transparent_25%),radial-gradient(circle_at_24%_82%,rgba(106,102,255,0.19),transparent_34%),linear-gradient(145deg,#182337,#080a0f_68%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_40%,rgba(245,250,255,0.16),transparent_10%),radial-gradient(ellipse_at_52%_88%,rgba(5,8,13,0.97),transparent_42%)]" />
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.38)_0.7px,transparent_0.8px)] [background-size:7px_7px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="translate-y-9 text-[5rem] font-semibold tracking-[-0.08em] text-white/18 transition duration-700 group-hover:translate-y-6 sm:text-[6.5rem]">
                  {member.initials}
                </span>
              </div>
            </>
          )}

          <div
            className={[
              "pointer-events-none absolute inset-[-30%] transition-opacity duration-500",
              active ? "opacity-100" : "opacity-55",
            ].join(" ")}
            style={{
              background:
                "radial-gradient(circle at var(--mx) var(--my), rgba(231,249,255,.22), transparent 18%)",
              mixBlendMode: "screen",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#040609] via-[#040609]/55 to-transparent" />
        </div>

        <div
          className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-white/28"
          style={{ transform: "translateZ(35px)" }}
        >
          <span>{member.category}</span>
          <span>0{index + 1}</span>
        </div>

        <div
          className="absolute inset-x-5 bottom-5 z-10"
          style={{ transform: "translateZ(42px)" }}
        >
          <p className="text-[9px] uppercase tracking-[0.24em] text-cyan-100/48">
            {member.role}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
            {member.name}
          </h3>
          <p className="mt-3 max-w-xs text-[10px] uppercase tracking-[0.16em] text-white/25">
            {member.note ?? "Portrait will be added here"}
          </p>
        </div>
      </div>
    </article>
  );
}
