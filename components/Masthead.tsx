import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { label: "Writing", href: "/writing/" },
  { label: "Work", href: "/work/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
];

export function Masthead() {
  return (
    <header className="mx-auto flex max-w-[1040px] items-baseline justify-between gap-8 border-b border-[color:var(--rule)] px-7 pt-6 pb-5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3 max-[640px]:px-5 max-[640px]:pt-5 max-[640px]:pb-4">
      <Link
        href="/"
        className="italic"
        style={{ fontSize: "var(--size-small)", background: "none", paddingBottom: 0 }}
      >
        shahnikba.github.io
      </Link>
      <nav aria-label="Primary">
        <ul
          className="m-0 flex list-none items-baseline gap-7 p-0 max-[640px]:gap-5"
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.08em",
            fontSize: "var(--size-utility)",
          }}
        >
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[color:var(--muted)]"
                style={{ background: "none", paddingBottom: 0 }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
