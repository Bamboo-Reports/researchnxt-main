import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { step } from "@/lib/motion";

/**
 * The opening band on every page below the homepage.
 *
 * A slim light band on the brand wash, matching the solution, About and
 * Careers heroes: headline, optional lede, optional controls. No navy and no
 * image plate; a background photograph can land on the wash later.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Buttons or other controls under the lede. */
  children?: React.ReactNode;
}) {
  return (
    <Section spacing="tight" className="hero-wash border-b border-line">
      <Container>
        <div className="anim-rise flex flex-col gap-8" style={step(0)}>
          <SectionHeading
            as="h1"
            size="display-sm"
            eyebrow={eyebrow}
            title={title}
            lede={lede}
          />
          {children}
        </div>
      </Container>
    </Section>
  );
}
