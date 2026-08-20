import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Skeleton mirroring the shared page opening, a light band on the brand
 * wash: label, heading, lede. Matching the real surface means the
 * transition into content is a fill rather than a flash between surfaces.
 */
export default function Loading() {
  return (
    <main id="main" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <Section spacing="default" className="hero-wash border-b border-line">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="h-4 w-28 rounded bg-line" />
            <div className="h-12 w-full max-w-2xl rounded bg-line" />
            <div className="h-12 w-full max-w-md rounded bg-line" />
            <div className="mt-2 h-5 w-full max-w-xl rounded bg-line" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
