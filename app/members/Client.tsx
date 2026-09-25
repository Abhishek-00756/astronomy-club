"use client";

import Link from "next/link";
import MembersDirectory from "@/components/members/MembersDirectory";

export default function MembersPageClient() {
  return (
    <main className="relative z-10 min-h-screen bg-transparent text-white">
      <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#05070A]/[0.72]">
        <div className="mx-auto flex min-h-[72vh] w-full max-w-7xl items-center px-6 py-32 sm:px-10 lg:px-16">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/30 transition hover:text-white/60"
            >
              <span aria-hidden="true">←</span>
              Back to home
            </Link>

            <p className="mt-14 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
              02 / The People
            </p>

            <h1 className="mt-5 max-w-4xl text-6xl font-semibold tracking-[-0.06em] sm:text-7xl md:text-[6.8rem]">
              The people
              <span className="block text-white/42">behind the stars.</span>
            </h1>
          </div>
        </div>
      </section>

      <MembersDirectory showIntro={false} />
    </main>
  );
}
