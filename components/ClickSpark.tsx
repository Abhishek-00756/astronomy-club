"use client";

import { useEffect } from "react";

const directions = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ClickSpark() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0) return;

      const root = document.createElement("span");
      root.className = "click-spark";

      root.style.left = `${event.clientX}px`;
      root.style.top = `${event.clientY}px`;

      const core = document.createElement("span");
      core.className = "click-spark__core";
      root.appendChild(core);

      directions.forEach((angle, index) => {
        const ray = document.createElement("span");
        ray.className = "click-spark__ray";
        ray.style.setProperty("--angle", `${angle}deg`);
        ray.style.setProperty("--delay", `${index * 12}ms`);
        root.appendChild(ray);
      });

      document.body.appendChild(root);

      requestAnimationFrame(() => {
        root.classList.add("click-spark--active");
      });

      window.setTimeout(() => {
        root.remove();
      }, 650);
    };

    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
