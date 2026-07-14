import Link from "next/link";
import { notFound } from "next/navigation";
import { listSlugs, loadEntry } from "@/lib/content";
import { MdxContent } from "@/components/MdxContent";
import "katex/dist/katex.min.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return listSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = loadEntry("projects", slug);
  if (!entry) return {};
  return {
    title: `${entry.frontmatter.title} — Shahram Nikbakhtian`,
    description: entry.frontmatter.summary ?? "",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = loadEntry("projects", slug);
  if (!entry) notFound();
  const { frontmatter, content } = entry;

  return (
    <main className="mx-auto max-w-[640px] px-7 pt-14 pb-20 max-[640px]:px-5 max-[640px]:pt-10 max-[640px]:pb-14">
      <Link
        href="/projects/"
        className="text-[color:var(--muted)] italic"
        style={{
          background: "none",
          paddingBottom: 0,
          fontSize: "var(--size-utility)",
          fontVariant: "small-caps",
          letterSpacing: "0.14em",
        }}
      >
        ← projects
      </Link>

      <header className="mt-8 mb-10">
        <p
          className="m-0 mb-3 italic text-[color:var(--muted)]"
          style={{ fontSize: "var(--size-small)" }}
        >
          {frontmatter.meta ?? ""}
        </p>
        <h1
          className="m-0 mb-3 text-wrap-balance"
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: "clamp(1.9rem, 4.5vw, 2.4rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          {frontmatter.title}
        </h1>
        {frontmatter.summary && (
          <p
            className="m-0 italic text-[color:var(--muted)] text-wrap-balance"
            style={{ fontSize: "1.15rem", lineHeight: 1.45 }}
          >
            {frontmatter.summary}
          </p>
        )}
      </header>

      <article className="prose">
        <MdxContent source={content} />
      </article>
    </main>
  );
}
