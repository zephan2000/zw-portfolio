"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../data";

export default function SideNav() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0]?.href.slice(1) ?? "");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
      <ul className="flex flex-col gap-3.5">
        {NAV_ITEMS.map((item) => {
          const id = item.href.slice(1);
          const isActive = activeId === id;

          return (
            <li key={item.href} className="flex items-center gap-2">
              <span
                className={`w-1 h-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-foreground scale-100"
                    : "bg-transparent scale-0"
                }`}
              />
              <a
                href={item.href}
                className={`block text-sm transition-all duration-200 ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
