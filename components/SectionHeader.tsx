import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeader({
  children,
  seeAllHref,
  seeAllLabel = "all",
}: {
  children: ReactNode;
  seeAllHref?: string;
  seeAllLabel?: string;
}) {
  return (
    <h2
      className="mt-16 mb-5 flex items-baseline justify-between border-b border-[color:var(--rule)] pb-2 text-[color:var(--fg)]"
      style={{
        fontFamily: "var(--serif)",
        fontWeight: 400,
        fontVariant: "small-caps",
        letterSpacing: "0.14em",
        fontSize: "0.9rem",
      }}
    >
      <span>{children}</span>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-[color:var(--muted)]"
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.12em",
            fontSize: "0.72rem",
            background: "none",
            paddingBottom: 0,
          }}
        >
          {seeAllLabel} →
        </Link>
      )}
    </h2>
  );
}
