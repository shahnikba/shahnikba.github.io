import { Ledger } from "@/components/Ledger";
import { listAll } from "@/lib/content";

export const metadata = {
  title: "Work — Shahram Nikbakhtian",
  description: "Long-form notes on the roles that mattered.",
};

export default function WorkIndex() {
  const entries = listAll("work");

  return (
    <main className="mx-auto max-w-[640px] px-7 pt-18 pb-20 max-[640px]:px-5 max-[640px]:pt-12 max-[640px]:pb-14">
      <section className="mb-14">
        <p
          className="m-0 mb-4 italic text-[color:var(--muted)]"
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.14em",
            fontSize: "var(--size-utility)",
          }}
        >
          career · long-form
        </p>
        <h1
          className="m-0 mb-4 text-wrap-balance"
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 5.5vw, var(--size-hero))",
            letterSpacing: "-0.015em",
            lineHeight: 1.05,
          }}
        >
          Work
        </h1>
        <p
          className="m-0 italic text-[color:var(--muted)] text-wrap-balance"
          style={{ fontSize: "1.3rem", lineHeight: 1.4 }}
        >
          Notes on the roles that mattered — one essay per role, not a
          compressed CV timeline.
        </p>
      </section>

      <Ledger
        items={entries.map((e) => ({
          title: e.frontmatter.title,
          href: `/work/${e.frontmatter.slug}/`,
          date: e.frontmatter.date,
        }))}
      />
    </main>
  );
}
