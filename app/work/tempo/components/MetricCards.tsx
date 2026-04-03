"use client";

import { useRef, useState, useEffect } from "react";
import { METRICS } from "../data";

export default function MetricCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      setStruck(midpoint < window.innerHeight * 0.45);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-baseline justify-between gap-8 mb-10 flex-wrap"
    >
      {METRICS.map((m) => (
        <div key={m.label} className="text-center">
          <div className="flex items-baseline gap-2 justify-center mb-1">
            {m.before && (
              <span
                className={`font-serif text-xl md:text-2xl transition-all duration-500 ${
                  struck
                    ? "text-text-tertiary line-through decoration-text-tertiary"
                    : "text-foreground"
                }`}
              >
                {m.before}
              </span>
            )}
            <span
              className={`font-serif text-3xl md:text-5xl transition-all duration-500 ${
                m.before
                  ? struck
                    ? "text-emerald-700"
                    : "text-text-tertiary"
                  : "text-foreground"
              }`}
            >
              {m.after}
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}
