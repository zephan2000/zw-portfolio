import type { CalloutData } from "../data";

export default function CalloutBlock({ quote, attribution, variant }: CalloutData) {
  const isClient = variant === "client";

  return (
    <blockquote
      className={`pl-4 py-4 my-8 rounded-r-md ${
        isClient
          ? "border-l-[3px] border-accent bg-accent-surface"
          : "border-l-[3px] border-border bg-surface"
      }`}
    >
      <p
        className={`text-base leading-[1.75] italic ${
          isClient ? "text-foreground" : "text-text-secondary"
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-2 text-sm text-text-tertiary">
        &mdash; {attribution}
      </footer>
    </blockquote>
  );
}
