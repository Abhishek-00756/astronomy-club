import ContactHandCard from "@/components/contact/ContactHandCard";

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-[#05070A] text-white">
      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-6 pb-20 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="grid min-h-[calc(100vh-10rem)] items-center gap-16 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="order-2 lg:order-1">
            <ContactHandCard />
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

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#d9a94a]/25 hover:bg-white/[0.04]">
                <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                  Social
                </p>

                <div className="mt-5 flex flex-col items-center text-center">
                  <a
                    href="https://www.instagram.com/astro.club_ait/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Astronomy Club Instagram"
                    className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-white/70 shadow-[0_0_28px_rgba(217,169,74,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#d9a94a]/45 hover:bg-[#d9a94a]/[0.08] hover:text-[#e7c273] hover:shadow-[0_0_34px_rgba(217,169,74,0.14)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.65"
                      aria-hidden="true"
                    >
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" />
                      <circle cx="12" cy="12" r="4.1" />
                      <circle cx="17.25" cy="6.75" r="1.05" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  <p className="mt-4 text-sm font-medium tracking-[0.02em] text-white/82 sm:text-base">
                    @astro.club_ait
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/members"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:border-white/20 hover:text-white"
              >
                Meet the team
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
