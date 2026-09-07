"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { syncMotionPreference } from "@/lib/motion";

/**
 * The hero's entrance, choreographed as one GSAP timeline: the headline
 * resolves word by word out of a blur, the lede follows, and the CTA lands
 * last. Children opt in with `data-hero-word`, `data-hero-lede` and
 * `data-hero-cta`; anything unmarked is left alone.
 *
 * The content is visible by default and GSAP only ever animates it FROM a
 * hidden state when the browser allows motion, so a no-JS visit, a failed
 * bundle or a reduced-motion preference ships the finished layout with no
 * animation at all. `gsap.context` scopes the selectors to this subtree and
 * reverts every inline style on unmount.
 */
export function HeroIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Read the preference directly: the early inline script's flag can be
    // absent after hydration recovery. Do not silently skip the entrance.
    if (!syncMotionPreference()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-word]", {
        y: 34,
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.055,
      })
        .from(
          "[data-hero-lede]",
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.6",
        )
        .from(
          "[data-hero-cta]",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.45",
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
