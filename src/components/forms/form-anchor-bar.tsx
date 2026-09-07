"use client";

import { useEffect, useState } from "react";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * A bar pinned to the bottom of the viewport that jumps to the page's
 * download form, for the widths where the form sits below the article rather
 * than beside it. It is visible by default and steps aside once the form
 * itself is on screen, so the two never compete.
 */
export function FormAnchorBar({
  target,
  cta,
}: {
  /** Id of the form's wrapper, without the hash. */
  target: string;
  cta: string;
}) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById(target);
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, [target]);

  return (
    <>
      {/* Keeps the footer's last lines clear of the bar. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
      <div
        hidden={formInView}
        className="fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <Container className="flex h-16 items-center">
          <Button href={`#${target}`} className="group w-full">
            {cta}
            <TrailingArrow />
          </Button>
        </Container>
      </div>
    </>
  );
}
