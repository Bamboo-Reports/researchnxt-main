"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A measured figure that counts up the first time it is seen.
 *
 * Values arrive as written strings — "500k+", "1.5k+", "250+" — so the numeric
 * head is parsed off and animated while the suffix stays put. The server
 * renders the final value, and the count only starts once the element is in
 * view and motion is allowed, so the number is never blank or wrong at rest.
 */

/** Splits "500k+" into its numeric head and the suffix that stays put. */
const VALUE = /^([\d.,]+)([\s\S]*)$/;

/** Decelerating, so the figure settles rather than snapping. */
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function FigureValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      document.documentElement.dataset.motion !== "on"
    ) {
      return;
    }

    const match = VALUE.exec(value);
    if (!match) return;

    const [, head, tail] = match;
    const target = Number(head.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const decimals = head.includes(".") ? head.split(".")[1].length : 0;
    const grouped = head.includes(",");
    let frame = 0;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return grouped
        ? `${Number(fixed).toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${tail}`
        : `${fixed}${tail}`;
    };

    const run = () => {
      const start = performance.now();
      const duration = 900;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(format(target * easeOutQuart(progress)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={cn("font-figure tabular-nums", className)}>
      {display}
    </span>
  );
}
