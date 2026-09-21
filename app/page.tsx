import SpaceScene from "@/components/three/SpaceScene";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070A]">
      <SpaceScene />

      <div className="relative z-10 flex min-h-screen justify-center px-6 pt-[15vh] text-center text-white">
        <div className="w-full max-w-5xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/65 sm:text-xs md:text-sm">
            Army Institute of Technology • Pune
          </p>

          <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[6.8rem]">
            Astronomy
            <span className="block text-white/72">Club</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/45 md:text-base">
            Look up. Wonder. Discover.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-full border border-cyan-200/35 bg-cyan-200/[0.06] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-cyan-50 transition duration-300 hover:border-cyan-100/50 hover:bg-cyan-200/[0.1]">
              Explore Events
            </button>

            <button className="rounded-full border border-white/12 bg-white/[0.035] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/72 backdrop-blur-sm transition duration-300 hover:bg-white/[0.07]">
              About the Club
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/25">
        Scroll to explore
      </div>
    </main>
  );
}
