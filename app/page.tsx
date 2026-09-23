import SpaceScene from "@/components/three/SpaceScene";
import AstronautScene from "@/components/three/AstronautScene";

export default function Home() {
  return (
    <main className="bg-[#05070A] text-white">
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
      >
        <SpaceScene />

        <div className="pointer-events-none relative z-10 flex min-h-screen justify-center px-6 pt-[8vh] text-center sm:pt-[9vh] md:pt-[10vh]">
          <div className="w-full max-w-5xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/65 sm:text-xs md:text-sm">
              Army Institute of Technology • Pune
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.35rem]">
              Astronomy
              <span className="block text-white/72">Club</span>
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/45 md:text-base">
              Look up. Wonder. Discover.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#about"
                className="pointer-events-auto rounded-full border border-cyan-200/35 bg-cyan-200/[0.06] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-50 transition duration-300 hover:border-cyan-100/50 hover:bg-cyan-200/[0.1]"
              >
                Explore the Club
              </a>

              <a
                href="#events"
                className="pointer-events-auto rounded-full border border-white/12 bg-white/[0.035] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/72 backdrop-blur-sm transition duration-300 hover:bg-white/[0.07]"
              >
                Upcoming Events
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/25">
          Scroll to explore
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen overflow-hidden border-t border-white/[0.04] bg-[#05070A]"
      >
        <AstronautScene />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16">
          <article className="max-w-xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
              01 / About the Club
            </p>

            <h2 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
              Curiosity begins
              <span className="block text-white/45">
                when we look up.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-7 text-white/55 sm:text-base">
              <p>
                Demo copy — the Astronomy Club at Army Institute of
                Technology, Pune is a student community built around a
                shared curiosity for the night sky, space science and
                the questions that lie beyond our everyday view.
              </p>

              <p>
                From observing the sky to discussing missions,
                astronomy and exploration, the club brings students
                together to learn, experiment, create and experience
                the universe beyond the classroom.
              </p>
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-white/25">
              Replace this demo copy with the club&apos;s official description.
            </p>
          </article>
        </div>
      </section>

      <section
        id="events"
        className="min-h-screen bg-[#05070A] px-6 py-28 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
            02 / Events
          </p>

          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Our journey
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
            Events, observation nights, workshops and student-led
            astronomy experiences will live here.
          </p>
        </div>
      </section>
    </main>
  );
}
