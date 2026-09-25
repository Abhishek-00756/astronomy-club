"use client";

import { useEffect, useRef } from "react";

export default function ContactHandCard() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const visual = visualRef.current;
    if (!host || !visual) return;

    const apply = () => {
      rafRef.current = null;
      const { x, y } = target.current;
      visual.style.transform =
        `translate3d(${x * 12}px, ${y * 9}px, 0) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    const onPointerLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(apply);
      }
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={hostRef} className="relative mx-auto w-full max-w-3xl">
      <div className="pointer-events-none absolute inset-0 rounded-[4rem] bg-[radial-gradient(circle_at_46%_50%,rgba(255,215,140,0.1),transparent_28%),radial-gradient(circle_at_72%_48%,rgba(120,200,230,0.08),transparent_34%)] blur-2xl" />

      <div
        ref={visualRef}
        className="relative aspect-[1.62] origin-center will-change-transform [transform-style:preserve-3d]"
      >
        <svg
          viewBox="0 0 1100 680"
          className="absolute inset-0 h-full w-full overflow-visible"
          role="img"
          aria-label="Hand presenting an Astronomy Club card"
        >
          <defs>
            <linearGradient id="handTone" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b9c1c8" />
              <stop offset="42%" stopColor="#858f99" />
              <stop offset="100%" stopColor="#4d5660" />
            </linearGradient>

            <linearGradient id="handHighlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e5ebef" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#a8b1b9" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="cardGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4e6bf" />
              <stop offset="52%" stopColor="#d8be80" />
              <stop offset="100%" stopColor="#ad8a4b" />
            </linearGradient>

            <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="26" stdDeviation="26" floodColor="#000000" floodOpacity="0.42" />
            </filter>

            <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="520"
            cy="340"
            r="250"
            fill="none"
            stroke="#74d8ff"
            strokeOpacity="0.05"
            strokeWidth="1.5"
          />
          <circle
            cx="520"
            cy="340"
            r="205"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.035"
            strokeWidth="1"
          />

          <g filter="url(#softShadow)">
            <rect
              x="125"
              y="184"
              width="635"
              height="330"
              rx="34"
              fill="url(#cardGold)"
              stroke="#fff3d2"
              strokeOpacity="0.45"
              strokeWidth="2"
            />

            <rect
              x="126"
              y="185"
              width="633"
              height="328"
              rx="33"
              fill="url(#cardGold)"
              opacity="0.35"
            />

            <text
              x="176"
              y="246"
              fill="#15191d"
              fontSize="25"
              fontWeight="700"
              letterSpacing="5"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              ASTRONOMY CLUB
            </text>

            <text
              x="176"
              y="279"
              fill="#41484e"
              fontSize="14"
              letterSpacing="2.6"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              ARMY INSTITUTE OF TECHNOLOGY · PUNE
            </text>

            <text
              x="176"
              y="452"
              fill="#4c5257"
              fontSize="13"
              letterSpacing="3"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              OBSERVE · LEARN · EXPLORE
            </text>

            <text
              x="176"
              y="478"
              fill="#5d6368"
              fontSize="10"
              letterSpacing="2.3"
              fontFamily="Arial, Helvetica, sans-serif"
            >
              ASTRONOMY · SPACE · CURIOSITY
            </text>

            <circle
              cx="703"
              cy="266"
              r="28"
              fill="none"
              stroke="#252a2e"
              strokeOpacity="0.5"
              strokeWidth="2.5"
            />
            <circle
              cx="703"
              cy="266"
              r="9"
              fill="none"
              stroke="#252a2e"
              strokeOpacity="0.55"
              strokeWidth="2"
            />
            <circle cx="703" cy="266" r="3.5" fill="#252a2e" opacity="0.8" />
          </g>

          <g filter="url(#handGlow)" fill="url(#handTone)">
            <path
              d="M1094 604
                 C1029 590 968 569 914 534
                 C859 499 816 464 777 427
                 C748 399 724 361 700 332
                 C683 311 657 299 631 303
                 C613 306 601 317 600 333
                 C599 348 607 363 617 375
                 C579 348 555 315 547 279
                 C541 252 523 236 500 237
                 C479 238 463 252 460 273
                 C456 299 470 323 486 344
                 C452 318 425 289 413 255
                 C404 230 386 217 365 221
                 C342 225 329 244 333 268
                 C338 297 359 325 383 347
                 C351 329 323 310 299 284
                 C281 266 260 262 243 273
                 C224 285 220 306 231 326
                 C249 358 281 385 319 406
                 L451 491
                 C491 517 531 546 578 568
                 C645 599 728 622 823 637
                 C918 652 1016 650 1094 642
                 C1113 640 1117 609 1094 604 Z"
            />

            <path
              d="M615 378
                 C598 364 584 346 575 327
                 C563 303 559 280 563 262
                 C568 239 583 223 602 217
                 C623 211 644 220 655 239
                 C669 262 671 289 670 313
                 L661 337
                 C654 352 639 367 615 378 Z"
              fill="#aab3ba"
            />

            <path
              d="M332 269
                 C345 298 370 330 397 351
                 C420 369 444 386 470 404"
              fill="none"
              stroke="url(#handHighlight)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.5"
            />

            <path
              d="M450 492
                 C526 540 607 581 702 605
                 C787 627 877 637 970 634"
              fill="none"
              stroke="#d7dee3"
              strokeOpacity="0.2"
              strokeWidth="8"
              strokeLinecap="round"
            />

            <path
              d="M618 376
                 C594 350 581 323 579 297"
              fill="none"
              stroke="#edf2f5"
              strokeOpacity="0.28"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        </svg>

        <div className="pointer-events-none absolute -bottom-1 left-[12%] rounded-full border border-white/[0.09] bg-[#070b12]/80 px-3 py-2 backdrop-blur-md sm:px-4">
          <p className="text-[7px] uppercase tracking-[0.26em] text-cyan-100/55 sm:text-[8px]">
            Contact signal
          </p>
        </div>
      </div>
    </div>
  );
}
