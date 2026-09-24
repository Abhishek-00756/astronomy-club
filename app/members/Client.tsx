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

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Explore the club committee and student members through the same
              flowing categories, dithered field and cinematic portrait gallery
              used on the home page.
            </p>
          </div>
        </div>
      </section>

      <MembersDirectory showIntro={false} />

      <section className="border-t border-white/[0.05] bg-[#05070A]/[0.78] px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/[0.08] bg-white/[0.02] px-6 py-12 sm:px-10">
          <p className="text-[9px] uppercase tracking-[0.28em] text-cyan-100/42">
            Member portraits
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Add the official names and photos when the current committee list is ready.
          </h2>
        </div>
      </section>
    </main>
  );
}
