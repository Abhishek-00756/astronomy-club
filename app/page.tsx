import SpaceScene from "@/components/three/SpaceScene";
import AstronautScene from "@/components/three/AstronautScene";
import MembersDirectory from "@/components/members/MembersDirectory";

export default function Home() {
  return (
    <main className="relative z-10 bg-transparent text-white">
      <section id="home" className="relative min-h-screen overflow-hidden">
        <SpaceScene />

        <div className="pointer-events-none relative z-10 flex min-h-screen justify-center px-6 pt-[6.5vh] text-center sm:px-10 md:pt-[7.5vh]">
          <div className="w-full max-w-5xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-amber-100/85 drop-shadow-[0_0_14px_rgba(255,206,130,0.2)] sm:text-xs md:text-sm">
              Army Institute of Technology • Pune
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] drop-shadow-[0_8px_22px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-[6.35rem]">
              Astronomy
              <span className="block text-white/72">Club</span>
            </h1>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[12vh] left-1/2 z-10 flex w-full -translate-x-1/2 justify-center px-6 sm:bottom-[13vh]">
          <div className="pointer-events-auto flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#about"
              className="rounded-full border border-cyan-200/35 bg-cyan-200/[0.06] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-50 transition duration-300 hover:border-cyan-100/50 hover:bg-cyan-200/[0.1]"
            >
              Explore the Club
            </a>

            <a
              href="/events"
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
        className="relative min-h-screen overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.78]"
      >
        <AstronautScene />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-28 sm:px-10 lg:px-16">
          <article className="max-w-xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
              01 / About the Club
            </p>

            <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
              Curiosity begins
              <span className="block text-white/45">when we look up.</span>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-7 text-white/55 sm:text-base">
              <p>
                Demo copy — the Astronomy Club at Army Institute of Technology,
                Pune is a student community built around a shared curiosity for
                the night sky, space science and the questions that lie beyond
                our everyday view.
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
          </article>
        </div>
      </section>

      <section
        id="members"
        className="relative overflow-hidden border-t border-white/[0.04] bg-[#05070A]/[0.72] py-8"
      >
        <MembersDirectory />
      </section>

      <section
        id="events"
        className="min-h-[78vh] border-t border-white/[0.04] bg-[#05070A]/[0.76] px-6 py-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
              03 / Events
            </p>

            <h2 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Our journey
              <span className="block text-white/42">
                continues beyond the classroom.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
              Observation nights, workshops, talks and student-led astronomy
              experiences will take shape here.
            </p>
          </div>

          <a
            href="/events"
            className="inline-flex h-fit items-center gap-3 rounded-full border border-cyan-100/20 bg-cyan-100/[0.04] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-cyan-50 transition hover:border-cyan-100/40 hover:bg-cyan-100/[0.08]"
          >
            Explore events
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-white/[0.04] bg-[#05070A]/[0.8] px-6 py-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
            04 / Reach Us
          </p>

          <h2 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Stay close to
            <span className="text-white/42"> the next observation.</span>
          </h2>

          <div className="mt-10">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-cyan-100/25 hover:text-white"
            >
              Contact the club
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.05] bg-[#05070A]/[0.88] px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[9px] uppercase tracking-[0.22em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <span>Astronomy Club · Army Institute of Technology · Pune</span>
          <span>Look up. Wonder. Discover.</span>
        </div>
      </footer>
    </main>
  );
}
