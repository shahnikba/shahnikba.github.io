import { Ledger } from "@/components/Ledger";
import { listAll } from "@/lib/content";

export const metadata = {
  title: "Writing — Shahram Nikbakhtian",
  description: "Notes on causality, optimisation, applied ML, and the occasional worked example.",
};

export default function WritingIndex() {
  const entries = listAll("writing");

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
          notes · essays · drafts
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
          Writing
        </h1>
        <p
          className="m-0 italic text-[color:var(--muted)] text-wrap-balance"
          style={{ fontSize: "1.3rem", lineHeight: 1.4 }}
        >
          Notes on causality, optimisation, applied ML, and the occasional
          worked example. Everything is a draft.
        </p>
      </section>

      <Ledger
        items={entries.map((e) => ({
          title: e.frontmatter.title,
          href: `/writing/${e.frontmatter.slug}/`,
          date: e.frontmatter.date,
        }))}
      />
    </main>
  );
}
