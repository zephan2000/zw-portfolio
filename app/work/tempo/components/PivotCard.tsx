"use client";

import { useRef, useState, useEffect } from "react";
import type { PivotData } from "../data";

export default function PivotCard({ before, after }: PivotData) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      setStruck(midpoint < window.innerHeight * 0.4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5"
    >
      {/* Before */}
      <div
        className={`transition-opacity duration-500 ${
          struck ? "opacity-40" : "opacity-100"
        }`}
      >
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-red-50 text-red-700 mb-2">
          BEFORE
        </span>
        <h4
          className={`text-sm font-semibold mb-1 transition-colors duration-500 ${
            struck
              ? "text-text-tertiary line-through decoration-text-tertiary"
              : "text-foreground"
          }`}
        >
          {before.label}
        </h4>
        <p
          className={`text-sm leading-relaxed transition-colors duration-500 ${
            struck
              ? "text-text-tertiary line-through decoration-text-tertiary"
              : "text-text-secondary"
          }`}
        >
          {before.description}
        </p>
      </div>

      <div className="border-t border-border" />

      {/* After */}
      <div
        className={`transition-opacity duration-500 ${
          struck ? "opacity-100" : "opacity-40"
        }`}
      >
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-green-50 text-green-700 mb-2">
          AFTER
        </span>
        <h4 className="text-sm font-semibold text-foreground mb-1">
          {after.label}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {after.description}
        </p>
      </div>
    </div>
  );
}
