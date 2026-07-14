import Link from "next/link";
import { formatDate } from "@/lib/content";

export type LedgerItem = {
  title: string;
  href: string;
  date?: string;
};

export function Ledger({ items }: { items: LedgerItem[] }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {items.map((item, i) => (
        <li
          key={item.href}
          className="grid items-baseline gap-x-7 py-2.5 max-[640px]:gap-x-5"
          style={{
            gridTemplateColumns: "4.5rem 1fr",
            borderTop: i === 0 ? undefined : "1px solid var(--rule-soft)",
          }}
        >
          <time
            dateTime={item.date}
            className="whitespace-nowrap italic text-[color:var(--muted)]"
            style={{
              fontVariantNumeric: "tabular-nums oldstyle-nums",
              textAlign: "right",
              fontSize: "0.95rem",
            }}
          >
            {formatDate(item.date)}
          </time>
          <Link href={item.href} className="leading-snug text-wrap-balance">
            {item.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}
