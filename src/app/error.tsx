"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(phase-c): report to an error tracker once analytics is wired up.
    console.error(error);
  }, [error]);

  return (
    <main id="main">
      <Section surface="deep" spacing="loose">
        <Container width="narrow">
          <SectionHeading
            as="h1"
            size="display-sm"
            inverted
            eyebrow="Something went wrong"
            title="This page failed to load"
            lede="Try again. If it keeps happening, let us know and we will look into it."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={reset} variant="on-deep">
              Try again
            </Button>
            <Button href="/" variant="on-deep-quiet">
              Back to home
            </Button>
          </div>
          {error.digest ? (
            <p className="font-figure mt-8 text-xs text-on-deep">
              Reference: {error.digest}
            </p>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
