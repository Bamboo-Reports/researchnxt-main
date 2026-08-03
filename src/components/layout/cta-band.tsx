import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * The recurring closing CTA: one line and one button. The eyebrow and lede are
 * opt-in, so the default band stays a single statement and only the pages that
 * genuinely need more context ask for it.
 */
export function CTABand({
  eyebrow,
  title = "Let's craft a personalised solution for you",
  lede,
  primary = { label: "Contact us", href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string; external?: boolean };
}) {
  return (
    <Section surface="muted" bordered spacing="tight">
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            className="max-w-[20ch]"
          />

          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary ? (
              <Button
                href={secondary.href}
                external={secondary.external}
                variant="secondary"
                className="group"
              >
                {secondary.label}
                <TrailingArrow />
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
