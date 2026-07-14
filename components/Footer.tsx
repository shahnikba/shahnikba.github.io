export function Footer() {
  return (
    <footer
      className="mx-auto mt-24 flex max-w-[640px] flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--rule)] px-7 pt-6 pb-12 italic text-[color:var(--muted)] max-[640px]:mt-16 max-[640px]:px-5 max-[640px]:pt-5 max-[640px]:pb-8"
      style={{ fontSize: "var(--size-small)" }}
    >
      <span>© Shahram Nikbakhtian · London</span>
      <span className="flex flex-wrap gap-4">
        <a
          href="mailto:nikbakhtian@gmail.com"
          className="text-[color:var(--muted)]"
          style={{ background: "none", paddingBottom: 0 }}
        >
          nikbakhtian@gmail.com
        </a>
        <a
          href="https://github.com/shahnikba"
          className="text-[color:var(--muted)]"
          style={{ background: "none", paddingBottom: 0 }}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/shahram-nikbakhtian-3920661a"
          className="text-[color:var(--muted)]"
          style={{ background: "none", paddingBottom: 0 }}
        >
          LinkedIn
        </a>
      </span>
    </footer>
  );
}
