
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type EventKey = "astrothon" | "shaam-e-shani";

const events: Array<{
  key: EventKey;
  number: string;
  name: string;
  tag: string;
  description: string;
}> = [
  {
    key: "astrothon",
    number: "01",
    name: "Astrothon",
    tag: "Build · Explore · Space",
    description:
      "A focused astronomy and technology experience where students can build, experiment and explore ideas around space.",
  },
  {
    key: "shaam-e-shani",
    number: "02",
    name: "Shaam-e-Shani",
    tag: "Saturn Gazing",
    description:
      "An observation night built around telescope viewing and a closer look at Saturn and the night sky.",
  },
];

function DriftWall() {
  const cards = [
    ["ASTRO", "THON", "amber"],
    ["ORBIT", "LAB", "blue"],
    ["DEEP", "SPACE", "violet"],
    ["LUNAR", "LOG", "slate"],
    ["STAR", "MAP", "amber"],
    ["COSMIC", "CODE", "blue"],
    ["TELESCOPE", "NIGHT", "slate"],
    ["SIGNAL", "01", "violet"],
    ["NEBULA", "FIELD", "blue"],
  ];

  const tones: Record<string, string> = {
    amber: "from-[#d7b36a]/55 via-[#8b6532]/30 to-[#17110a]/80",
    blue: "from-[#5d8eb1]/40 via-[#182e43]/35 to-[#071018]/85",
    violet: "from-[#75639c]/38 via-[#2a203d]/30 to-[#0a0812]/85",
    slate: "from-[#8897a1]/28 via-[#27323a]/30 to-[#080c10]/90",
  };

  return (
    <div className="relative h-full min-h-[560px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080b10]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_44%,rgba(100,185,230,.11),transparent_34%),radial-gradient(circle_at_65%_68%,rgba(213,181,106,.07),transparent_32%)]" />

      <motion.div
        className="absolute inset-[-18%] rotate-[-6deg]"
        animate={{ x: ["-2%", "2%", "-1%", "-2%"], y: ["0%", "1.5%", "-1%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid grid-cols-3 gap-5 opacity-80">
          {cards.map(([title, subtitle, tone], index) => (
            <motion.div
              key={title}
              animate={{
                y: [index % 2 === 0 ? -18 : 14, index % 2 === 0 ? 14 : -18],
                rotate: [index % 3 === 0 ? -3 : 2, index % 3 === 0 ? 2 : -2],
              }}
              transition={{
                duration: 7 + (index % 3),
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.18,
              }}
              className="aspect-[1.18] overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0b1016] shadow-[0_25px_60px_rgba(0,0,0,.34)]"
            >
              <div className={"h-full w-full bg-gradient-to-br " + tones[tone] + " p-5"}>
                <div className="flex h-full flex-col justify-between">
                  <div className="h-20 rounded-xl border border-white/[0.08] bg-white/[0.015] opacity-70" />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-white/38">
                      ASTRONOMY CLUB
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white/82">
                      {title}
                    </p>
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-white/30">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,13,.32),rgba(7,9,13,.78))]" />

      <div className="absolute inset-x-8 bottom-8">
        <p className="text-[9px] uppercase tracking-[0.34em] text-cyan-100/48">
          Astrothon / Drift Field
        </p>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white/88">
          Move through the stories.
        </h3>
      </div>
    </div>
  );
}

function OptionWheel() {
  const labels = [
    "Telescope",
    "Saturn",
    "Rings",
    "Moon",
    "Orbit",
    "Night Sky",
    "Observation",
    "Stargazing",
  ];

  return (
    <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080b10]">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(188,211,227,.09),transparent_35%),radial-gradient(circle_at_62%_44%,rgba(216,179,101,.08),transparent_28%)]" />

      <motion.div
        className="relative h-[420px] w-[420px]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {labels.map((label, i) => {
          const angle = i * (360 / labels.length);

          return (
            <div
              key={label}
              className="absolute left-1/2 top-1/2 w-44 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: "translate(-50%, -50%) rotate(" + angle + "deg) translateY(-165px)",
              }}
            >
              <div className="rounded-full border border-white/[0.09] bg-white/[0.02] px-4 py-3 backdrop-blur-md">
                <p className="text-center text-xs uppercase tracking-[0.18em] text-white/55">
                  {label}
                </p>
              </div>
            </div>
          );
        })}

        <div className="absolute inset-[18%] rounded-full border border-white/[0.11]" />
        <div className="absolute inset-[30%] rounded-full border border-cyan-200/10" />

        <div className="absolute inset-[40%] rounded-full bg-[radial-gradient(circle_at_34%_28%,rgba(233,244,255,.85),rgba(146,180,204,.16)_32%,rgba(6,10,15,.94)_74%)] shadow-[0_0_70px_rgba(125,190,220,.1)]">
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p className="text-[8px] uppercase tracking-[0.32em] text-cyan-100/45">
                Shaam-e-Shani
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white/84">
                Observe.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function EventShowcase() {
  const [active, setActive] = useState<EventKey>("astrothon");
  const selected = events.find((event) => event.key === active)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
      <aside className="lg:pt-6">
        <p className="text-[9px] uppercase tracking-[0.34em] text-cyan-200/48">
          Events
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white">
          What we’ve
          <span className="block text-white/35">been up to.</span>
        </h2>

        <div className="mt-10 space-y-2">
          {events.map((event) => {
            const selectedEvent = active === event.key;

            return (
              <button
                key={event.key}
                type="button"
                onClick={() => setActive(event.key)}
                className={[
                  "group w-full rounded-2xl border px-5 py-5 text-left transition-all duration-300",
                  selectedEvent
                    ? "border-white/16 bg-white/[0.05]"
                    : "border-white/[0.07] bg-white/[0.018] hover:border-white/12 hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.28em] text-cyan-100/38">
                    {event.number}
                  </span>
                  <span
                    className={[
                      "h-2 w-2 rounded-full transition",
                      selectedEvent
                        ? "bg-cyan-200/75 shadow-[0_0_16px_rgba(120,210,245,.45)]"
                        : "bg-white/12",
                    ].join(" ")}
                  />
                </div>

                <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white/88">
                  {event.name}
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/30">
                  {event.tag}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      <section>
        <div className="mb-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/28">
            Selected event
          </p>
          <p className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white/86">
            {selected.name}
          </p>
          <p className="mt-2 max-w-xl text-xs leading-6 text-white/32 md:hidden">
            {selected.description}
          </p>
        </div>

        <p className="mb-4 hidden max-w-xl text-xs leading-6 text-white/32 md:block">
          {selected.description}
        </p>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {active === "astrothon" ? <DriftWall /> : <OptionWheel />}
        </motion.div>
      </section>
    </div>
  );
}
