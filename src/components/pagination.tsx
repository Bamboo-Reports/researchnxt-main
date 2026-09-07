import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Numbered pager shared by the resource libraries. Rendered as links so every
 * page is crawlable and shareable; the caller owns the URL scheme through
 * `href`, so a single-param library (`?page=N`) and the multi-section
 * experts-view page (`?<param>=N#fragment`) use the same component.
 */
export function Pagination({
  label,
  current,
  totalPages,
  href,
}: {
  /** Names the nav for assistive tech, e.g. "Insights pages". */
  label: string;
  current: number;
  totalPages: number;
  href: (page: number) => string;
}) {
  if (totalPages < 2) return null;

  const stepLink =
    "relative inline-flex h-9 items-center rounded-full border border-line-strong px-4 before:absolute before:-inset-y-1 before:inset-x-0 before:content-[''] text-sm font-semibold transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-ink hover:bg-surface-muted";

  return (
    <nav
      aria-label={label}
      className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-8"
    >
      {current > 1 ? (
        <Link href={href(current - 1)} rel="prev" className={stepLink}>
          Previous
        </Link>
      ) : (
        <span className={cn(stepLink, "pointer-events-none opacity-40")}>
          Previous
        </span>
      )}

      <ol className="flex flex-wrap items-center justify-center gap-1 px-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => {
            const isCurrent = page === current;
            return (
              <li key={page}>
                <Link
                  href={href(page)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "font-figure relative inline-flex size-9 items-center justify-center rounded-full text-sm font-semibold before:absolute before:-inset-1 before:content-[''] transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)]",
                    isCurrent
                      ? "bg-accent text-white"
                      : "text-ink-soft hover:bg-accent-soft hover:text-accent",
                  )}
                >
                  {page}
                  {isCurrent ? (
                    <span className="sr-only"> (current page)</span>
                  ) : null}
                </Link>
              </li>
            );
          },
        )}
      </ol>

      {current < totalPages ? (
        <Link href={href(current + 1)} rel="next" className={stepLink}>
          Next
        </Link>
      ) : (
        <span className={cn(stepLink, "pointer-events-none opacity-40")}>
          Next
        </span>
      )}
    </nav>
  );
}
