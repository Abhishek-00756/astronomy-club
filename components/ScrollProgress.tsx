"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-px bg-white/[0.05]"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-cyan-200/0 via-cyan-100/70 to-amber-100/75 transition-[width] duration-150"
        style={{ width: (progress * 100) + "%" }}
      />
    </div>
  );
}
