"use client";

import { useState } from "react";
import { BEFORE_AFTER_STEPS, BEFORE_AFTER_STATS } from "../data";

export default function BeforeAfter() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const isAfter = mode === "after";

  return (
    <div className="my-8">
      {/* Toggle */}
      <div className="flex bg-[var(--background)] rounded-lg p-[3px] gap-[2px] w-fit mb-5">
        <button
          onClick={() => setMode("before")}
          className={`text-xs font-medium px-4 py-[5px] rounded-md border transition-colors ${
            !isAfter
              ? "bg-surface text-foreground border-border"
              : "bg-transparent text-text-secondary border-transparent hover:text-foreground"
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setMode("after")}
          className={`text-xs font-medium px-4 py-[5px] rounded-md border transition-colors ${
            isAfter
              ? "bg-surface text-foreground border-border"
              : "bg-transparent text-text-secondary border-transparent hover:text-foreground"
          }`}
        >
          After
        </button>
      </div>

      {/* Steps list */}
      <div className="border border-border rounded-lg overflow-hidden">
        {BEFORE_AFTER_STEPS.map((step) => {
          const isElim = isAfter && step.transition === "elim";
          const isMod = isAfter && step.transition === "mod";
          const isAuto = isAfter && step.transition === "auto";

          return (
            <div
              key={step.id}
              className={`flex items-start gap-[10px] px-[14px] py-[10px] border-b border-border last:border-b-0 transition-colors duration-300 ${
                isElim ? "bg-[var(--background)]" : "bg-surface"
              }`}
            >
              {/* Number circle */}
              <span
                className={`flex-shrink-0 w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[11px] font-medium mt-[1px] transition-colors duration-300 ${
                  isElim
                    ? "text-text-tertiary border-border"
                    : isMod
                    ? "bg-accent-surface border-accent text-accent"
                    : isAuto
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "text-text-secondary border-border"
                }`}
              >
                {step.id}
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span
                  className={`block text-[13px] leading-[1.4] transition-colors duration-300 ${
                    isElim || isMod || isAuto
                      ? "text-text-tertiary line-through"
                      : "text-foreground"
                  }`}
                >
                  {step.before}
                </span>
                {/* New text for mod/auto */}
                {step.after && (
                  <span
                    className={`block text-[13px] leading-[1.4] mt-1 transition-all duration-350 ease-out ${
                      isMod
                        ? "opacity-100 text-accent"
                        : isAuto
                        ? "opacity-100 text-emerald-700"
                        : "opacity-0 h-0 overflow-hidden"
                    }`}
                  >
                    {step.after}
                  </span>
                )}
              </div>

              {/* Badge */}
              {step.badge && (
                <span
                  className={`text-[10px] px-2 py-[2px] rounded-full border whitespace-nowrap flex-shrink-0 mt-[2px] transition-all duration-300 ${
                    isElim
                      ? "bg-[var(--background)] text-text-secondary border-border opacity-35"
                      : isMod
                      ? "bg-accent-surface text-accent border-accent"
                      : isAuto
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-[var(--background)] text-text-secondary border-border"
                  }`}
                >
                  {isAfter && step.afterBadge ? step.afterBadge : step.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {BEFORE_AFTER_STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--background)] rounded-lg px-3 py-[10px]"
          >
            <p className="text-[11px] text-text-secondary mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className={`font-medium leading-none transition-all duration-300 ${
                  isAfter
                    ? "text-[13px] text-text-tertiary line-through"
                    : "text-xl text-foreground"
                }`}
              >
                {stat.before}
              </span>
              <span
                className={`text-xl font-medium text-emerald-700 leading-none transition-opacity duration-400 ease-out ${
                  isAfter ? "opacity-100" : "opacity-0"
                }`}
              >
                {stat.after}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
