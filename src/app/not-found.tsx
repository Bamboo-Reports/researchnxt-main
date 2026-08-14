import type { Metadata } from "next";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <Section
        spacing="none"
        className="hero-wash flex min-h-[calc(100svh-9rem)] items-center border-b border-line"
      >
        <Container>
          <div className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-24">
            <div className="anim-rise flex max-w-2xl flex-col items-start">
              <div className="mb-7 flex w-full items-center gap-4">
                <span className="h-1 w-8 shrink-0 rounded-[1px] bg-signal" />
                <span className="text-sm font-semibold text-ink-soft">
                  Error 404 · Page not found
                </span>
                <span aria-hidden="true" className="rule-ticks h-px flex-1" />
              </div>

              <h1 className="max-w-[13ch] text-display-sm font-display text-ink">
                This path doesn’t lead to a report.
              </h1>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink-soft sm:text-lg">
                The page may have moved, the address may be incomplete, or the
                link may be out of date. Start again from the homepage or tell
                us what you were looking for.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/" size="lg">
                  Go to homepage
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="secondary"
                  className="group"
                >
                  Contact us
                  <TrailingArrow />
                </Button>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto w-full max-w-xl overflow-hidden border-y border-line bg-surface/70 px-6 py-8 sm:px-9 sm:py-10"
            >
              <div className="mb-10 flex items-center justify-between gap-6 text-xs font-semibold text-ink-muted">
                <span>REQUEST TRACE</span>
                <span>NO MATCH</span>
              </div>

              <div className="relative flex min-h-52 items-center justify-center sm:min-h-64">
                <span className="font-display text-[clamp(7rem,18vw,13rem)] leading-none tracking-[-0.04em] text-accent-soft">
                  404
                </span>

                <svg
                  viewBox="0 0 520 220"
                  fill="none"
                  className="absolute inset-0 size-full"
                >
                  <path
                    d="M20 112H164L212 64"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M308 156L356 112H500"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M236 88L284 136M284 88L236 136"
                    stroke="var(--color-signal)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="112" r="6" fill="var(--color-ink)" />
                  <circle cx="164" cy="112" r="6" fill="var(--color-accent)" />
                  <circle cx="356" cy="112" r="6" fill="var(--color-accent)" />
                  <circle cx="500" cy="112" r="6" fill="var(--color-ink)" />
                </svg>
              </div>

              <div className="mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-xs text-ink-muted">
                <span>ORIGIN</span>
                <span className="rule-ticks h-px" />
                <span>DESTINATION</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
