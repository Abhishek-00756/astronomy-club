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

              <a
                href="https://www.instagram.com/astro.club_ait/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Astronomy Club Instagram"
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#d9a94a]/35 hover:bg-[#d9a94a]/[0.045]"
              >
                <div className="flex items-start justify-between">
                  <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                    Social
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/55 transition group-hover:border-[#d9a94a]/40 group-hover:text-[#e3bb67]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[15px] w-[15px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-base font-medium text-white/82">
                  Instagram
                </p>
                <p className="mt-1 text-xs text-white/30">
                  @astro.club_ait
                </p>
              </a>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-100/16 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between">
                  <p className="text-[8px] uppercase tracking-[0.28em] text-cyan-100/45">
                    Campus
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/45">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[15px] w-[15px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      aria-hidden="true"
                    >
                      <path d="M20 10.2c0 5.2-8 10.3-8 10.3S4 15.4 4 10.2a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </span>
                </div>
                <p className="mt-2 text-base font-medium text-white/82">
                  AIT · Pune
                </p>
                <p className="mt-1 text-xs text-white/30">
                  Connect through club activities
                </p>
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
