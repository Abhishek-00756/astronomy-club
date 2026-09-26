import EventShowcase from "@/components/events/EventShowcase";

export default function EventsPage() {
  return (
    <main className="relative z-10 min-h-screen overflow-hidden bg-[#05070A]/[0.82] text-white">
      <section className="mx-auto min-h-screen max-w-[1400px] px-6 pb-24 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="mb-14 max-w-4xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-cyan-200/55 sm:text-xs">
            03 / Events
          </p>

          <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] sm:text-7xl md:text-[6.8rem]">
            From ideas
            <span className="block text-white/35">to nights under stars.</span>
          </h1>
        </div>

        <EventShowcase />
      </section>
    </main>
  );
}
