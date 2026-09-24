import AstronautScene from "@/components/three/AstronautScene";

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen bg-[#05070A]/[0.78] text-white">
      <section className="relative min-h-screen overflow-hidden border-b border-white/[0.05]">
        <AstronautScene />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
              01 / About the Club
            </p>
            <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] sm:text-7xl md:text-[6.8rem]">
              Curiosity begins
              <span className="block text-white/42">when we look up.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-white/50 sm:text-base">
              <p>
                Demo copy — replace this with the official Astronomy Club
                description, its purpose, history and activities.
              </p>
              <p>
                The visual language keeps the night sky, motion and exploration
                at the center while leaving the club&apos;s story easy to read.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
