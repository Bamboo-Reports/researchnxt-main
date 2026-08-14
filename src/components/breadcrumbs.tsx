import Link from "next/link";

export type Crumb = {
  label: string;
  /** Omitted for a trail segment that has no page of its own. */
  href?: string;
};

/**
 * The trail above a detail page's title: the library the piece lives in, then
 * the programme it belongs to, linking to the programme's report landing when
 * one exists. The current page is not repeated; the title below carries it.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-ink-muted"
    >
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-x-3">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          {item.href ? (
            <Link
              href={item.href}
              className="text-accent transition-colors duration-200 hover:text-accent-hover"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
