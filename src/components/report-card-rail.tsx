"use client";

import { useEffect, useRef, useState } from "react";
import { RemixIcon } from "@/components/ui/remix-icon";
import { ReportCard } from "@/components/report-card";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import type { ReportCardItem } from "@/content/resources";

/** The report rails on the detail pages: one `ReportCard` per item. */
export function ReportCardRail({
  items,
  label,
}: {
  items: ReportCardItem[];
  label: string;
}) {
  return (
    <CardRail
      label={label}
      items={items.map((item) => ({
        key: item.title,
        node: <ReportCard item={item} />,
      }))}
    />
  );
}

/**
 * A single row of cards, four in view at a time, scrolling horizontally.
 *
 * Same construction as the quote carousel so the page has one scrolling
 * grammar: the rail is a native scroll-snap container (swipe, trackpad and
 * keyboard scrolling are the platform's own, and a no-JS visit still gets a
 * scrollable row), the scrollbar is hidden, and the script adds only the
 * chrome that must know where the rail is: the two arrows, stepping one card
 * and disabling at the ends.
 *
 * Card widths are quarters at `lg` and halves at `sm`, minus their share of
 * the gap, so exactly four (or two) sit in view with no partial card and the
 * arrows are the scroll affordance. On a phone the card is narrower than the
 * rail so the next one peeks in from the edge, which is the cue that the row
 * scrolls; the arrows still step it.
 */
export function CardRail({
  items,
  label,
  grid,
}: {
  /**
   * `className` lands on the card's `li`, so a caller whose cards share
   * subgrid rows can keep them level once the rail becomes a grid.
   */
  items: { key: string; node: ReactNode; className?: string }[];
  label: string;
  /**
   * Set to make the rail a phone-only device: from `sm` the row becomes a
   * plain grid with these column and gap classes (`sm:grid-cols-2
   * lg:grid-cols-4 sm:gap-3`) and the arrows go away. Four text blocks
   * stacked on a phone ran two screens tall; a swipeable row keeps each
   * section to one.
   */
  grid?: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // A row that already fits needs no arrows and reads better centred, so the
  // controls only appear once there is somewhere to scroll to. Measured
  // rather than counted, since how many cards fit depends on the breakpoint.
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const read = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Measured from the cards themselves, not from `scrollWidth`: once
        // the row is centred, a browser reports no scrollable overflow even
        // when the content is wider, and the two would feed back on each
        // other into a row that never shows its arrows.
        const cards = [...rail.children];
        const content =
          cards.reduce((w, card) => w + card.getBoundingClientRect().width, 0) +
          GAP * Math.max(0, cards.length - 1);

        setOverflowing(content > rail.clientWidth + 1);
        setAtStart(rail.scrollLeft <= 1);
        setAtEnd(rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1);
      });
    };

    read();
    rail.addEventListener("scroll", read, { passive: true });
    // A resize can change how many cards fit, which moves the end.
    const observer = new ResizeObserver(read);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", read);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const step = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.querySelector("li");
    if (!rail || !card) return;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + GAP),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const arrow =
    "relative inline-flex size-10 before:absolute before:-inset-1 before:content-[''] shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="flex flex-col gap-8">
      <ul
        ref={railRef}
        tabIndex={0}
        aria-label={label}
        className={cn(
          "flex snap-x snap-mandatory gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Centring a scrollable row can clip its leading edge, so it only
          // applies once the cards genuinely fit.
          !overflowing && "justify-center",
          grid &&
            cn(
              "sm:grid sm:snap-none sm:justify-normal sm:overflow-visible",
              grid,
            ),
        )}
      >
        {items.map((item) => (
          <li
            key={item.key}
            className={cn(
              "w-[82%] shrink-0 snap-start",
              grid
                ? "sm:w-auto"
                : "sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-6rem)/4)]",
              item.className,
            )}
          >
            {item.node}
          </li>
        ))}
      </ul>

      {overflowing ? (
        <div
          className={cn(
            "flex items-center justify-center gap-3",
            grid && "sm:hidden",
          )}
        >
          <button
            type="button"
            aria-label="Previous cards"
            disabled={atStart}
            onClick={() => step(-1)}
            className={arrow}
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next cards"
            disabled={atEnd}
            onClick={() => step(1)}
            className={arrow}
          >
            <ArrowIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** The rail's gap-8, in pixels, for the arrow step. */
const GAP = 32;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <RemixIcon name="arrow-right-s-line" className={cn("size-4", className)} />
  );
}
