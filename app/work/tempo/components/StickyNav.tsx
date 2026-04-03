"use client";

import { NAV_ITEMS } from "../data";

export default function StickyNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex-shrink-0 px-3 py-1 text-xs rounded-full border border-border text-text-secondary hover:text-foreground hover:border-foreground/20 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
