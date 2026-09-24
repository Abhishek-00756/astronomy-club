"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

function AtomMark() {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0b10]">
      <span className="absolute h-5 w-5 rounded-full border-[1.5px] border-[#0a0b10] rotate-45" />
      <span className="absolute h-5 w-5 rounded-full border-[1.5px] border-[#0a0b10] -rotate-45" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#0a0b10]" />
    </span>
  );
}

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex justify-center px-4 sm:top-6">
      <nav className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border-[1.5px] border-white/80 bg-[#0a0b10]/88 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,.35)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label="Astronomy Club home"
          className="mr-0.5"
        >
          <AtomMark />
        </Link>

        <div className="flex items-center overflow-x-auto">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/72 sm:px-5 sm:text-xs"
              >
                {active && (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 rounded-full border border-white/16 bg-white/[0.075]"
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 38,
                      mass: 0.7,
                    }}
                  />
                )}
                <span className="relative z-10 transition-colors duration-300 hover:text-white">
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
