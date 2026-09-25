export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-[#05070A] text-white">
      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-cyan-200/55 sm:text-xs">
              04 / Reach Us
            </p>

            <h1 className="mt-6 text-[4.15rem] font-semibold leading-[0.88] tracking-[-0.065em] sm:text-[5.7rem] md:text-[6.8rem]">
              Stay in
              <span className="block text-white/42">orbit.</span>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
              Have a question, want to collaborate, or want to join the next
              observation? Send a signal to the Astronomy Club at Army Institute
              of Technology, Pune.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/events"
                className="inline-flex items-center gap-3 rounded-full border border-cyan-100/22 bg-cyan-100/[0.05] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-cyan-50 transition hover:border-cyan-100/45 hover:bg-cyan-100/[0.09]"
              >
                See upcoming events
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="/members"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:border-white/20 hover:text-white"
              >
                Meet the team
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Direct
                </p>
                <p className="mt-2 text-sm font-medium text-white/78">
                  Official email
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Details to be added
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Social
                </p>
                <p className="mt-2 text-sm font-medium text-white/78">
                  Instagram
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Official handle to be added
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Campus
                </p>
                <p className="mt-2 text-sm font-medium text-white/78">
                  AIT · Pune
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Find us through the club
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-square overflow-hidden rounded-[2.4rem] border border-white/[0.09] bg-[radial-gradient(circle_at_50%_45%,rgba(100,190,255,0.13),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012)_58%,rgba(0,0,0,0.28))] shadow-[0_40px_120px_rgba(0,0,0,.42)]">
              <div className="absolute inset-[13%] rounded-full border border-cyan-100/10" />
              <div className="absolute inset-[22%] rounded-full border border-white/[0.07]" />
              <div className="absolute inset-[32%] rounded-full border border-cyan-100/[0.07]" />

              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-[#070b12]/90 shadow-[0_0_80px_rgba(96,202,255,0.12)] backdrop-blur-md">
                <div className="absolute inset-5 rounded-full border border-cyan-100/10" />
                <div className="absolute inset-10 rounded-full border border-white/[0.07]" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_25px_rgba(142,223,255,0.9)]" />
                <div className="absolute inset-x-0 bottom-8 text-center">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-cyan-100/48">
                    Astronomy Club
                  </p>
                  <p className="mt-2 text-lg font-medium tracking-[-0.03em] text-white/82">
                    Send a signal
                  </p>
                </div>
              </div>

              <div className="absolute left-[17%] top-[23%] h-2 w-2 rounded-full bg-cyan-100/80 shadow-[0_0_16px_rgba(142,223,255,0.8)]" />
              <div className="absolute right-[19%] top-[29%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,.7)]" />
              <div className="absolute bottom-[21%] left-[28%] h-1.5 w-1.5 rounded-full bg-amber-100/75 shadow-[0_0_14px_rgba(255,213,135,.7)]" />

              <div className="absolute left-[13%] top-[17%] rounded-full border border-white/[0.08] bg-black/25 px-3 py-2 backdrop-blur-sm">
                <p className="text-[8px] uppercase tracking-[0.24em] text-white/35">
                  Online
                </p>
              </div>

              <div className="absolute bottom-[13%] right-[11%] rounded-full border border-cyan-100/10 bg-black/25 px-3 py-2 backdrop-blur-sm">
                <p className="text-[8px] uppercase tracking-[0.24em] text-cyan-100/40">
                  Pune · AIT
                </p>
              </div>

              <div className="absolute inset-x-8 bottom-8 flex items-center justify-between border-t border-white/[0.08] pt-5">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.26em] text-white/28">
                    Contact field
                  </p>
                  <p className="mt-1 text-xs text-white/48">
                    Questions · collaboration · observations
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-amber-100/75 shadow-[0_0_18px_rgba(255,213,135,0.75)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.05] px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-100/42">
              Start the conversation
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Bring your question.
              <span className="block text-white/40">We'll take it from there.</span>
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-6">
              <p className="text-[8px] uppercase tracking-[0.24em] text-white/30">
                Ask
              </p>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Astronomy, observations, club activities and collaborations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-6">
              <p className="text-[8px] uppercase tracking-[0.24em] text-white/30">
                Visit
              </p>
              <p className="mt-3 text-sm leading-6 text-white/64">
                Connect with the Astronomy Club at AIT Pune during club
                activities and observation sessions.
              </p>
            </div>

            <a
              href="/events"
              className="rounded-2xl border border-cyan-100/14 bg-cyan-100/[0.03] px-5 py-6 transition hover:border-cyan-100/28 hover:bg-cyan-100/[0.06]"
            >
              <p className="text-[8px] uppercase tracking-[0.24em] text-cyan-100/45">
                Next
              </p>
              <p className="mt-3 text-sm font-medium text-cyan-50/85">
                Explore events ↗
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
