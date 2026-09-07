"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { syncMotionPreference } from "@/lib/motion";

/**
 * The hero's animated field: the four CSS layers documented with the
 * `.hero-field` block in globals.css, wrapped so GSAP can move them as one.
 *
 * The ambient wave loops stay pure CSS on the layers themselves. GSAP adds
 * what CSS cannot: the field settles from a slight over-scale as the copy
 * arrives, and on fine-pointer devices it leans a few pixels toward the
 * cursor with a lagged follow, which composes with the CSS loops because
 * the parallax lives on this wrapper, not the layers.
 *
 * Everything is gated behind `data-motion="on"`; without it this renders
 * exactly the static field. The layers are oversized far past the viewport,
 * so neither the settle scale nor the parallax can expose an edge.
 */
export function HeroField() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!syncMotionPreference()) return;

    const el = ref.current;
    if (!el) return;

    const teardown: (() => void)[] = [];
    const ctx = gsap.context(() => {
      gsap.from(el, { scale: 1.06, duration: 1.8, ease: "expo.out" });

      if (!matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" });
      const lean = (event: PointerEvent) => {
        xTo((event.clientX / window.innerWidth - 0.5) * -24);
        yTo((event.clientY / window.innerHeight - 0.5) * -16);
      };
      window.addEventListener("pointermove", lean);
      teardown.push(() => window.removeEventListener("pointermove", lean));
    }, ref);

    return () => {
      teardown.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="hero-field" />
      <div className="hero-field-streaks" />
      <div className="hero-field-sweep" />
      <div className="hero-field-grain" />
    </div>
  );
}
