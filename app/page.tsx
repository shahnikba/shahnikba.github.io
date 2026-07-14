import Link from "next/link";
import { Ledger } from "@/components/Ledger";
import { SectionHeader } from "@/components/SectionHeader";
import { listAll } from "@/lib/content";
import { FEATURED } from "@/data/featured";

export default function Home() {
  const recentWriting = listAll("writing").slice(0, 6);

  return (
    <main className="mx-auto max-w-[640px] px-7 pt-18 pb-20 max-[640px]:px-5 max-[640px]:pt-12 max-[640px]:pb-14">
      {/* Hero */}
      <section className="mb-14">
        <p
          className="m-0 mb-4 italic text-[color:var(--muted)]"
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.14em",
            fontSize: "var(--size-utility)",
          }}
        >
          notes · projects · work · est. 2019
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
          Shahram Nikbakhtian
        </h1>
        <p
          className="m-0 italic text-[color:var(--muted)] text-wrap-balance"
          style={{ fontSize: "1.3rem", lineHeight: 1.4 }}
        >
          Applied mathematics at the interface of financial markets and machine
          learning.
        </p>
      </section>

      {/* Bio */}
      <section className="prose">
        <p>
          I&rsquo;m Head of Trading at Hercle, running the crypto
          systematic-trading division. Before Hercle I was Director of Quant/ML
          Trading at Oxford Algorithms, and before that Head of AI/ML at Huma
          — where our UK Biobank sleep-timing study was peer-reviewed and
          picked up by the BBC, The Washington Post, and The Guardian.
        </p>
        <p>
          In 2021 I founded Ainemox, a one-person crypto market-making firm
          that traded over a billion dollars across five exchanges on a stack I
          wrote in pure C and C++, with no external libraries. Before healthcare
          and crypto, ten years at BNP Paribas: interest-rate exotics, credit
          arbitrage on the desk that Volcker eventually closed, and the eFX
          high-frequency market-making desk. I was the first person in the
          finance industry to port hybrid IR/FX pricing to CUDA GPU, back in
          2008.
        </p>
        <p>
          I write here about causality, optimisation, applied machine learning,
          and the occasional worked example. Everything is a draft.
        </p>
      </section>

      {/* Recent writing */}
      <SectionHeader seeAllHref="/writing/">Recent writing</SectionHeader>
      <Ledger
        items={recentWriting.map((e) => ({
          title: e.frontmatter.title,
          href: `/writing/${e.frontmatter.slug}/`,
          date: e.frontmatter.date,
        }))}
      />

      {/* Featured work */}
      <SectionHeader seeAllHref="/work/" seeAllLabel="all work">
        Featured work
      </SectionHeader>
      <div className="flex flex-col gap-9">
        {FEATURED.map((item, i) => (
          <article
            key={item.href}
            className={
              i === 0
                ? ""
                : "border-t border-[color:var(--rule-soft)] pt-9"
            }
          >
            <h3
              className="m-0 mb-1 text-wrap-balance"
              style={{
                fontFamily: "var(--serif)",
                fontSize: "var(--size-subhead)",
                fontWeight: 500,
                letterSpacing: "-0.005em",
                lineHeight: 1.25,
              }}
            >
              <Link
                href={item.href}
                className="text-[color:var(--fg)]"
                style={{ background: "none", paddingBottom: 0 }}
              >
                {item.title}
              </Link>
            </h3>
            <p
              className="m-0 mb-2 italic text-[color:var(--muted)]"
              style={{ fontSize: "var(--size-small)" }}
            >
              {item.meta}
            </p>
            <p className="m-0 text-[color:var(--fg)]" style={{ lineHeight: 1.55 }}>
              {item.blurb}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
