import type { CalloutData } from "../data";

export default function CalloutBlock({ quote, attribution, variant }: CalloutData) {
  const isClient = variant === "client";

  return (
    <blockquote
      className={`pl-4 py-4 mt-8 rounded-r-md border-l-[3px] ${
        isClient
          ? "border-accent bg-accent-surface"
          : "border-self-accent bg-self-surface"
      }`}
    >
      <p className="text-base leading-[1.75] italic text-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-2 text-sm text-text-tertiary">
        &mdash; {attribution}
      </footer>
    </blockquote>
  );
}
