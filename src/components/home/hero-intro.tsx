"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The hero's entrance, choreographed as one GSAP timeline: the question line
 * rises in, the headline resolves word by word out of a blur, and the CTA
 * lands last. Children opt in with `data-hero-questions`, `data-hero-word`
 * and `data-hero-cta`; anything unmarked is left alone.
 *
 * The content is visible by default and GSAP only ever animates it FROM a
 * hidden state once the motion flag is set, so a no-JS visit, a failed
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
    if (document.documentElement.dataset.motion !== "on") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-questions]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
      })
        .from(
          "[data-hero-word]",
          {
            y: 34,
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: 0.9,
            stagger: 0.055,
          },
          0.12,
        )
        .from(
          "[data-hero-cta]",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.55",
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
