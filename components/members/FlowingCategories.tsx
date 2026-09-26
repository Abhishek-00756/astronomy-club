"use client";

import { useState } from "react";

type Category = {
  id: string;
  label: string;
  eyebrow: string;
};

const categories: Category[] = [
  { id: "secretaries", label: "Secretaries", eyebrow: "01" },
  { id: "te", label: "TE Members", eyebrow: "02" },
  { id: "joint-secretaries", label: "Joint Secretaries", eyebrow: "03" },
  { id: "fe", label: "FE Members", eyebrow: "04" },
];

type FlowingCategoriesProps = {
  active: string;
  onChange: (id: string) => void;
};

export default function FlowingCategories({
  active,
  onChange,
}: FlowingCategoriesProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? active;

  return (
    <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.018] p-2">
      <div className="flex min-h-20 flex-col gap-2 lg:flex-row">
        {categories.map((category) => {
          const isHighlighted = highlighted === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active === category.id}
              onClick={() => onChange(category.id)}
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "group relative overflow-hidden rounded-[1.4rem] border text-left transition-[flex,background-color,border-color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                "min-h-24 px-6 py-5 lg:flex-1",
                isHighlighted
                  ? "border-cyan-200/22 bg-white/[0.065] lg:flex-[1.9]"
                  : "border-transparent bg-transparent lg:flex-[1]",
              ].join(" ")}
            >
              <span className="absolute inset-y-0 left-0 w-px bg-white/10" />
              <span
                className={[
                  "absolute inset-x-0 bottom-0 h-px origin-left bg-cyan-100/60 transition-transform duration-500",
                  isHighlighted ? "scale-x-100" : "scale-x-0",
                ].join(" ")}
              />
              <span className="text-[9px] uppercase tracking-[0.24em] text-white/25">
                {category.eyebrow}
              </span>

              <span className="mt-4 block overflow-hidden">
                <span
                  className={[
                    "block text-xl font-medium tracking-[-0.03em] sm:text-2xl",
                    isHighlighted ? "text-white" : "text-white/52",
                  ].join(" ")}
                >
                  {category.label}
                </span>
              </span>

              <span
                className={[
                  "pointer-events-none absolute right-5 top-5 h-2 w-2 rounded-full border border-cyan-100/40 transition-all duration-500",
                  isHighlighted
                    ? "scale-100 bg-cyan-100/55"
                    : "scale-75 bg-transparent opacity-40",
                ].join(" ")}
              />

              <span
                className={[
                  "pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-cyan-200/[0.055] blur-2xl transition-transform duration-700",
                  isHighlighted ? "translate-x-2 translate-y-2" : "translate-x-6 -translate-y-6",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
