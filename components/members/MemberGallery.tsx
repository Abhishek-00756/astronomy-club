"use client";

import { useRef } from "react";

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
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {members.map((member, index) => (
        <MemberPhoto key={member.id} member={member} index={index} />
      ))}
    </div>
  );
}

function MemberPhoto({
  member,
  index,
}: {
  member: MemberProfile;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - y) * 9}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 11}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const resetPointer = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "15%");
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="group relative [perspective:1200px]"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#0a0d13] shadow-2xl transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] [transform:rotateX(var(--rx))_rotateY(var(--ry))] [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:border-cyan-100/18">
        <div className="relative aspect-[4/5] overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover grayscale-[0.12] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:grayscale-0"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(128,199,255,0.28),transparent_26%),radial-gradient(circle_at_25%_75%,rgba(109,110,255,0.18),transparent_32%),linear-gradient(160deg,#162033,#080a0f_70%)]" />
              <div className="absolute inset-x-0 top-1/2 h-[55%] -translate-y-1/2 bg-[radial-gradient(circle_at_50%_18%,rgba(239,246,255,0.2),transparent_13%),radial-gradient(ellipse_at_50%_70%,rgba(8,11,17,0.92),transparent_44%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="translate-y-8 text-5xl font-semibold tracking-[-0.05em] text-white/25 transition duration-700 group-hover:translate-y-5 group-hover:text-white/36 sm:text-6xl">
                  {member.initials}
                </span>
              </div>
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[8px] uppercase tracking-[0.28em] text-white/25">
                <span>{member.category}</span>
                <span>0{index + 1}</span>
              </div>
            </>
          )}

          <div
            className="pointer-events-none absolute inset-[-20%] opacity-0 transition duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--mx) var(--my), rgba(231,249,255,.24), transparent 19%)",
              mixBlendMode: "screen",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#040609] via-[#040609]/48 to-transparent" />
        </div>

        <div className="relative z-10 -mt-16 px-5 pb-5 [transform:translateZ(30px)]">
          <p className="text-[9px] uppercase tracking-[0.24em] text-cyan-100/45">
            {member.role}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            {member.name}
          </h3>
          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/24">
            {member.note ?? "Portrait will be added here"}
          </p>
        </div>
      </div>
    </article>
  );
}
