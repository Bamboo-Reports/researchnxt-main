"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveals a block the first time it scrolls into view.
 *
 * The default render is fully visible: the animation class is only added once
 * the observer fires, and the keyframes themselves are gated behind
 * `[data-motion="on"]`. So a headless render, a print, a no-JS visit or a
 * reduced-motion preference all ship the content rather than a blank band —
 * the reveal enhances a visible default instead of gating it.
 *
 * Motion is spent on lists, where sibling stagger reads as rhythm. There is
 * deliberately no fade-and-rise wrapper around every section on the site.
 */

type Mode = "stagger" | "rise";

const modes: Record<Mode, string> = {
  stagger: "anim-stagger",
  rise: "anim-rise",
};

type RevealProps = {
  mode?: Mode;
  /** Renders as something other than a div — `ul`/`ol`/`dl` keep list semantics. */
  as?: "div" | "ul" | "ol" | "dl" | "section";
  /** Fires slightly before the block is fully on screen. */
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function Reveal({
  mode = "stagger",
  as: Tag = "div",
  rootMargin = "0px 0px -12% 0px",
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    // Without IntersectionObserver the block simply stays in its visible
    // default state, which is the correct fallback.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed, rootMargin]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(revealed && modes[mode], className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
