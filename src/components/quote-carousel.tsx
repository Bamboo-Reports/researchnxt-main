"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { ReportLanding } from "@/content/resources";

/**
 * The quote cards from a report's participants, one at a time.
 *
 * The rail is still a native scroll-snap container, so a swipe, a trackpad
 * and a shift-wheel all work exactly as the platform does them, and with
 * JavaScript off the cards remain a scrollable row. What the script adds is
 * the chrome that needs to know where the rail is: the arrows, the lit dot,
 * and a hidden scrollbar, since the dots replace it as the position signal.
 *
 * The artwork bakes the quote and the attribution into the image, so the alt
 * text carries both; the visible band repeats neither.
 */
export function QuoteCarousel({
  voices,
}: {
  voices: NonNullable<ReportLanding["voices"]>;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = voices.items.length;

  // The lit dot follows the rail, not the last button pressed, so it stays
  // honest under swipes and keyboard scrolling too.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const read = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = rail.clientWidth;
        if (width > 0) {
          setIndex(
            Math.min(count - 1, Math.max(0, Math.round(rail.scrollLeft / width))),
          );
        }
      });
    };

    rail.addEventListener("scroll", read, { passive: true });
    return () => {
      rail.removeEventListener("scroll", read);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const goTo = useCallback((next: number) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({
      left: next * rail.clientWidth,
      // Snapping instantly under reduced motion; the browser ignores
      // `smooth` there anyway, this just states it.
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const arrow =
    "relative inline-flex size-10 before:absolute before:-inset-1 before:content-[''] shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <ul
        ref={railRef}
        // Focusable so arrow keys scroll it; labelled so the stop makes sense.
        tabIndex={0}
        aria-label="Quotes from the research participants"
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {voices.items.map((voice) => (
          <li key={voice.name} className="w-full shrink-0 snap-center">
            {voice.image ? (
              <Image
                src={voice.image}
                alt={[`"${voice.quote}"`, voice.name, voice.role, voice.company]
                  .filter(Boolean)
                  .join(", ")}
                width={1748}
                height={692}
                // The band is capped at max-w-3xl, so tell the optimiser the
                // real rendered width instead of letting it assume
                // full-viewport and ship the 1748px original.
                sizes="(min-width: 48rem) 48rem, 100vw"
                className="w-full rounded-lg"
              />
            ) : (
              /* No baked artwork from the source: the quote is set as text
                 in the site's own quote grammar, the signal spine the
                 interview pull quotes carry, with the speaker's cut-out
                 portrait grounded on a plate disc beside it. No panel box:
                 structure comes from the spine, as everywhere else.
                 `h-full` with centring keeps a short quote sitting level
                 with the longest one's card, so the dots never jump. */
              <figure className="flex h-full flex-col items-center justify-center gap-7 px-1 py-2 sm:flex-row sm:items-center sm:gap-10">
                {voice.portrait ? (
                  <div className="relative size-32 shrink-0 overflow-hidden rounded-full bg-accent-soft sm:size-40">
                    <Image
                      src={voice.portrait}
                      alt=""
                      width={320}
                      height={320}
                      sizes="10rem"
                      // Cut-out headshots vary in crop; covering from the top
                      // keeps every face centred on its disc.
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 border-l-2 border-signal pl-6">
                  <blockquote className="text-title font-display-soft text-ink">
                    &ldquo;{voice.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-sm leading-relaxed text-ink-soft">
                    <span className="block font-semibold text-ink">
                      {voice.name}
                    </span>
                    {voice.role}
                    {voice.company ? `, ${voice.company}` : null}
                  </figcaption>
                </div>
              </figure>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous quote"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          className={arrow}
        >
          <ArrowIcon className="rotate-180" />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-0.5">
          {voices.items.map((voice, dot) => (
            <button
              key={voice.name}
              type="button"
              aria-label={voice.name}
              aria-current={dot === index ? "true" : undefined}
              onClick={() => goTo(dot)}
              className="group inline-flex size-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-2 rounded-full transition-all duration-200 [transition-timing-function:var(--ease-out-quart)]",
                  dot === index
                    ? "w-5 bg-accent"
                    : "bg-line-strong group-hover:bg-ink-muted",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next quote"
          disabled={index === count - 1}
          onClick={() => goTo(index + 1)}
          className={arrow}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
