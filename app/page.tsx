import SpaceScene from "@/components/three/SpaceScene";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070A]">
      <SpaceScene />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-24 pt-8 text-center text-white">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
            Army Institute of Technology • Pune
          </p>

          <h1 className="text-5xl font-semibold tracking-[-0.045em] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
            Astronomy
            <span className="block text-white/70">
              Club
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base text-white/50 md:text-lg">
            Look up. Wonder. Discover.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-7 py-3 text-sm font-medium text-cyan-100 transition duration-300 hover:bg-cyan-300/20">
              Explore Events
            </button>

            <button className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white/80 transition duration-300 hover:bg-white/10">
              About the Club
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/30">
        Scroll to explore
      </div>
    </main>
  );
}