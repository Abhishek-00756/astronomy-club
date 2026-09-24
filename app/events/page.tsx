export default function EventsPage() {
  return (
    <main className="relative z-10 min-h-screen bg-[#05070A]/[0.78] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-cyan-200/55">
            03 / Events
          </p>
          <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] sm:text-7xl md:text-[6.8rem]">
            Look up.
            <span className="block text-white/42">Then go observe.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            This page is ready for the upcoming-event timeline, observation
            nights, workshops, talks and the full past-events archive.
          </p>
        </div>
      </section>
    </main>
  );
}
