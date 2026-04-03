import Link from "next/link";

const NAV_LINKS = [
  { label: "Resources", href: "/resources" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work", hasDropdown: true },
  { label: "More", href: "#", hasDropdown: true },
];

export default function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
      {/* Logo */}
      <Link href="/" className="text-foreground" aria-label="Home">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <text
            x="4"
            y="32"
            fontFamily="var(--font-serif)"
            fontSize="32"
            fontWeight="400"
            fill="currentColor"
          >
            Z
          </text>
        </svg>
      </Link>

      {/* Pill nav */}
      <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/80 backdrop-blur-md px-2 py-1.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-text-secondary hover:text-foreground transition-colors rounded-full hover:bg-background"
          >
            {link.label}
            {link.hasDropdown && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="opacity-50"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
