import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export type Kind = "writing" | "work" | "projects";

export type Frontmatter = {
  slug: string;
  title: string;
  date?: string; // ISO YYYY-MM-DD
  summary?: string;
  meta?: string; // small italic meta line under title
  draft?: boolean;
};

export type Entry = {
  kind: Kind;
  frontmatter: Frontmatter;
  content: string;
};

const ROOT = (kind: Kind) => join(process.cwd(), "content", kind);

export function listSlugs(kind: Kind): string[] {
  try {
    return readdirSync(ROOT(kind))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function loadEntry(kind: Kind, slug: string): Entry | null {
  try {
    const raw = readFileSync(join(ROOT(kind), `${slug}.mdx`), "utf-8");
    const parsed = matter(raw);
    // gray-matter parses YAML ISO dates into Date objects; coerce back to
    // a YYYY-MM-DD string so downstream sort/format code stays simple.
    const data = { ...parsed.data } as Record<string, unknown>;
    if (data.date instanceof Date) {
      data.date = data.date.toISOString().slice(0, 10);
    }
    return {
      kind,
      frontmatter: { slug, ...data } as Frontmatter,
      content: parsed.content,
    };
  } catch {
    return null;
  }
}

export function listAll(kind: Kind): Entry[] {
  return listSlugs(kind)
    .map((slug) => loadEntry(kind, slug))
    .filter((e): e is Entry => e !== null && e.frontmatter.draft !== true)
    .sort((a, b) => {
      const da = a.frontmatter.date ?? "";
      const db = b.frontmatter.date ?? "";
      return db.localeCompare(da);
    });
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const m = months[parseInt(month, 10) - 1] ?? "";
  return `${day} ${m} ${year}`;
}
