import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Skeleton mirroring the shared page opening, which is now a deep band: label,
 * heading, lede. Matching the real surface means the transition into content is
 * a fill rather than a flash from light to dark.
 */
export default function Loading() {
  return (
    <main id="main" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <Section surface="deep" spacing="default">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="h-4 w-28 rounded bg-deep-raised" />
            <div className="h-12 w-full max-w-2xl rounded bg-deep-raised" />
            <div className="h-12 w-full max-w-md rounded bg-deep-raised" />
            <div className="mt-2 h-5 w-full max-w-xl rounded bg-deep-raised" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
