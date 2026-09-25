export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-[#05070A] text-white">
      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-16 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="relative order-2 flex min-h-[30rem] items-center justify-center lg:order-1">
            <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_55%,rgba(92,207,255,0.13),transparent_34%),radial-gradient(circle_at_38%_42%,rgba(255,210,120,0.08),transparent_22%)]" />

            <div className="relative w-full max-w-2xl">
              <div className="absolute -inset-8 rounded-[3rem] border border-white/[0.05] bg-white/[0.012] blur-[1px]" />

              <div className="relative overflow-hidden rounded-[2.6rem] border border-white/[0.08] bg-[#080b11] shadow-[0_40px_120px_rgba(0,0,0,.46)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(142,223,255,0.09),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_46%,rgba(0,0,0,0.28))]" />

                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/039f4797015327.5ebb8187d79bb.jpg"
                  alt="Hand holding a blank business card"
                  className="relative block h-auto w-full object-cover mix-blend-screen opacity-[0.92]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.58),transparent_32%,transparent_68%,rgba(5,7,10,0.42)),linear-gradient(180deg,rgba(5,7,10,0.04),transparent_55%,rgba(5,7,10,0.72))]" />

                <div className="absolute left-[23%] top-[45%] w-[30%] -translate-y-1/2 rotate-[-1deg] text-[#0a0c10]">
                  <p className="text-[7px] font-semibold uppercase tracking-[0.18em] sm:text-[9px]">
                    Astronomy Club
                  </p>
                  <p className="mt-1 text-[12px] font-medium tracking-[-0.02em] sm:text-base">
                    AIT · Pune
                  </p>
                  <p className="mt-2 text-[6px] uppercase tracking-[0.16em] opacity-45 sm:text-[8px]">
                    Observe · Learn · Explore
                  </p>
                </div>

                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[8px] uppercase tracking-[0.24em] text-cyan-100/50">
                    Contact signal
                  </p>
                </div>

                <div className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[8px] uppercase tracking-[0.24em] text-amber-100/55">
                    AIT · Pune
                  </p>
                </div>
              </div>

              <div className="relative mt-4 flex items-center gap-3 pl-2">
                <span className="h-px w-10 bg-cyan-100/20" />
                <p className="text-[8px] uppercase tracking-[0.28em] text-white/25">
                  Send a signal
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 max-w-2xl lg:order-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-cyan-200/55 sm:text-xs">
              04 / Reach Us
            </p>

            <h1 className="mt-6 text-[4.2rem] font-semibold leading-[0.88] tracking-[-0.065em] sm:text-[5.6rem] md:text-[6.6rem]">
              Stay in
              <span className="block text-white/42">touch.</span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
              Have a question, want to collaborate, or want to join the next
              observation? Reach the Astronomy Club at Army Institute of
              Technology, Pune.
            </p>

            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-100/16 hover:bg-white/[0.04]">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Direct
                </p>
                <p className="mt-2 text-base font-medium text-white/82">
                  Official email
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Details to be added
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-100/16 hover:bg-white/[0.04]">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Social
                </p>
                <p className="mt-2 text-base font-medium text-white/82">
                  Instagram
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Official handle to be added
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-100/16 hover:bg-white/[0.04]">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Campus
                </p>
                <p className="mt-2 text-base font-medium text-white/82">
                  AIT · Pune
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Connect through club activities
                </p>
              </div>

              <a
                href="/events"
                className="rounded-2xl border border-cyan-100/16 bg-cyan-100/[0.03] p-5 transition hover:border-cyan-100/30 hover:bg-cyan-100/[0.06]"
              >
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Next
                </p>
                <p className="mt-2 text-base font-medium text-cyan-50/90">
                  Upcoming events ↗
                </p>
                <p className="mt-1 text-xs text-white/30">
                  See what's happening around the club
                </p>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/members"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:border-white/20 hover:text-white"
              >
                Meet the team
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="/events"
                className="inline-flex items-center gap-3 rounded-full border border-cyan-100/22 bg-cyan-100/[0.05] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-cyan-50 transition hover:border-cyan-100/42 hover:bg-cyan-100/[0.08]"
              >
                See events
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
