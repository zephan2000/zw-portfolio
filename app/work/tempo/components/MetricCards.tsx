"use client";

import { useRef, useState, useEffect } from "react";
import { METRICS } from "../data";

export default function MetricCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // Start revealing when the top of the container enters the bottom 80% of viewport
      // Fully revealed when the container midpoint hits 45% of viewport
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.45;
      const pos = rect.top + rect.height / 2;
      const p = Math.min(1, Math.max(0, (start - pos) / (start - end)));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
    >
      {METRICS.map((m, i) => {
        // Each card has a staggered threshold: card 0 appears first, card 2 last
        const stagger = i * 0.25;
        const cardProgress = Math.min(
          1,
          Math.max(0, (progress - stagger) / (1 - stagger))
        );

        return (
          <div
            key={m.label}
            className="bg-surface border border-border rounded-lg p-4 text-center"
            style={{
              opacity: 0.15 + cardProgress * 0.85,
              transform: `translateY(${(1 - cardProgress) * 12}px)`,
              transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
            }}
          >
            <p className="font-serif text-2xl md:text-3xl text-foreground mb-1">
              {m.value}
            </p>
            <p className="text-xs text-text-tertiary">{m.label}</p>
          </div>
        );
      })}
    </div>
  );
}
