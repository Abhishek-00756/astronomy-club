import type { MemberProfile } from "./MemberGallery";

export default function MemberLanyardCard({
  member,
}: {
  member: MemberProfile;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-8 opacity-0 backdrop-blur-md transition-opacity duration-500 group-focus:opacity-100"
    >
      <div className="relative mt-8 flex min-h-full w-full max-w-xl justify-center">
        <div className="absolute top-0 h-44 w-px bg-white/20" />
        <div className="pointer-events-auto relative mt-44 w-full origin-top translate-y-[-24px] scale-[0.97] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-focus:translate-y-0 group-focus:scale-100">
          <div className="absolute left-1/2 top-[-13px] h-8 w-8 -translate-x-1/2 rounded-full border border-white/20 bg-[#11151d]" />

          <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#eef0f2] text-[#090b10] shadow-[0_35px_120px_rgba(0,0,0,.6)]">
            <div className="relative h-64 overflow-hidden bg-[#ccd1d7] sm:h-72">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[linear-gradient(145deg,#d9dde2,#929aa2)]">
                  <span className="text-7xl font-semibold text-black/15">
                    {member.initials}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex justify-between text-[8px] font-semibold uppercase tracking-[0.28em] text-white/80">
                <span>Astronomy Club</span>
                <span>{member.id}</span>
              </div>

              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                  {member.category}
                </p>
                <p className="mt-1 text-sm text-white/90">{member.role}</p>
              </div>
            </div>

            <div className="relative px-6 py-7 sm:px-8">
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
        </div>
      </div>
    </div>
  );
}
