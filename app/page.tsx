import SpaceScene from "@/components/three/SpaceScene";
import AstronautScene from "@/components/three/AstronautScene";
import MembersDirectory from "@/components/members/MembersDirectory";
import ContactHandCard from "@/components/contact/ContactHandCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="relative z-10 bg-transparent text-white">
      <section id="home" className="relative min-h-screen overflow-hidden">
        <SpaceScene />

        <div className="pointer-events-none relative z-10 flex min-h-screen justify-center px-6 pt-[10vh] text-center sm:px-10 md:pt-[10.5vh]">
          <div className="w-full max-w-5xl">
            <p className="relative top-7 mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-amber-100/85 drop-shadow-[0_0_14px_rgba(255,206,130,0.2)] sm:text-xs md:text-sm">
              Army Institute of Technology • Pune
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] drop-shadow-[0_8px_22px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-[6.35rem]">
              Astronomy
              <span className="block text-white/72">Club</span>
            </h1>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[3.5vh] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center px-6 sm:bottom-[4.5vh]">
          <div className="pointer-events-auto flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#about"
              className="rounded-full border border-cyan-200/35 bg-cyan-200/[0.06] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-50 transition duration-300 hover:border-cyan-100/50 hover:bg-cyan-200/[0.1]"
            >
              Explore the Club
            </a>

            <a
              href="#events"
              className="rounded-full border border-white/12 bg-white/[0.035] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/72 backdrop-blur-sm transition duration-300 hover:bg-white/[0.07]"
            >
              Upcoming Events
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/25">
          Scroll to explore
        </div>
      </section>

      <section
        id="about"
        className="lazy-section relative min-h-[78vh] overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.3]"
      >
        <AstronautScene />

        <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
          <ScrollReveal className="max-w-2xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
              01 / About the Club
            </p>

            <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
              Curiosity begins
              <span className="block text-white/45">when we look up.</span>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-7 text-white/55 sm:text-base">
              <p>
                The Astronomy Club at Army Institute of Technology, Pune is a
                student community built around a shared curiosity for the night
                sky, space science and the questions that lie beyond our
                everyday view.
              </p>

              <p>
                From observing the sky to discussing missions, astronomy and
                exploration, the club brings students together to learn,
                experiment, create and experience the universe beyond the
                classroom.
              </p>
            </div>

            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:border-cyan-100/25 hover:text-white"
            >
              Read more
              <span aria-hidden="true">↗</span>
            </a>

            <p className="mt-7 text-[10px] uppercase tracking-[0.18em] text-white/20">
              Astronaut model by Aimok via Sketchfab · CC BY
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="members"
        className="lazy-section relative overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.3] py-4"
      >
        <ScrollReveal>
          <MembersDirectory />
        </ScrollReveal>
      </section>

      <section
        id="events"
        className="lazy-section relative overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.3] px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
                03 / Events
              </p>

              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl md:text-7xl">
                Our events
                <span className="block text-white/42">bring the sky closer.</span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
                From astronomy and technology experiences to telescope nights,
                the club creates opportunities to learn, observe and explore
                together.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <ScrollReveal delay={0.05}>
              <a
                href="/events"
                className="group block rounded-[1.8rem] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan-100/20 hover:bg-white/[0.045]"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-cyan-100/42">
                  01 / Astrothon
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white/90">
                  Astrothon
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/38">
                  A focused astronomy and technology experience built around
                  ideas, experimentation and space.
                </p>
                <span className="mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-cyan-50/70">
                  View event
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <a
                href="/events"
                className="group block rounded-[1.8rem] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-amber-100/20 hover:bg-white/[0.045]"
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-100/48">
                  02 / Shaam-e-Shani
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-white/90">
                  Shaam-e-Shani
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/38">
                  A Saturn-gazing night focused on telescope observation and
                  experiencing the night sky together.
                </p>
                <span className="mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-amber-50/70">
                  View event
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="lazy-section relative overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.34] px-6 py-16 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="grid items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
                04 / Reach Us
              </p>

              <h2 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                Stay in
                <span className="block text-white/42">touch.</span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/45">
                Have a question, want to collaborate, or want to join the next
                observation? Reach the Astronomy Club at Army Institute of
                Technology, Pune.
              </p>

              <a
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-cyan-100/25 hover:text-white"
              >
                Contact the club
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="https://www.instagram.com/astro.club_ait/"
                target="_blank"
                rel="noreferrer"
                className="ml-3 mt-8 inline-flex items-center gap-3 rounded-full border border-[#d9a94a]/25 bg-[#d9a94a]/[0.035] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#e7c273]/80 transition hover:border-[#d9a94a]/45 hover:bg-[#d9a94a]/[0.07] hover:text-[#f1d38f]"
              >
                Instagram
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="lg:justify-self-end">
              <div className="w-full max-w-[650px]">
                <ContactHandCard />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="lazy-section border-t border-white/[0.05] bg-[#05070A]/[0.45] px-6 py-10 sm:px-10 lg:px-16">
        <ScrollReveal className="mx-auto flex max-w-7xl flex-col gap-3 text-[9px] uppercase tracking-[0.22em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>Astronomy Club · Army Institute of Technology · Pune</span>
          <a href="https://www.instagram.com/astro.club_ait/" target="_blank" rel="noreferrer" className="transition hover:text-white/55">
            @astro.club_ait
          </a>
        </ScrollReveal>
      </footer>
    </main>
  );
}
