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
