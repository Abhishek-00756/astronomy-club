"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

function AtomMark() {
  return (
    <span className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[#0a0b10]">
      <span className="absolute h-5 w-5 rounded-full border-[1.5px] border-[#0a0b10] rotate-45 transition-transform duration-500 group-hover:rotate-[62deg]" />
      <span className="absolute h-5 w-5 rounded-full border-[1.5px] border-[#0a0b10] -rotate-45 transition-transform duration-500 group-hover:-rotate-[62deg]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#0a0b10] transition-transform duration-300 group-hover:scale-125" />
    </span>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const current =
    links.find((link) =>
      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
    )?.href ?? "/";

  const highlighted = hovered ?? current;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex justify-center px-3 sm:top-6">
      <nav className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-1 rounded-full border-[1.5px] border-white/80 bg-[#090a0f]/90 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,.4)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label="Astronomy Club home"
          className="mr-0.5"
        >
          <AtomMark />
        </Link>

        <div className="flex items-center overflow-x-auto">
          {links.map((link) => {
            const isHighlighted = highlighted === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
                className="relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/65 sm:px-5 sm:text-xs"
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{
                      type: "spring",
                      stiffness: 560,
                      damping: 38,
                      mass: 0.65,
                    }}
                  />
                )}
                <span
                  className={[
                    "relative z-10 transition-colors duration-300",
                    isHighlighted ? "text-[#090a0f]" : "hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
