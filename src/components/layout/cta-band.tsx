import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

/**
 * The recurring closing CTA, and the page's second drenched band. Copy defaults
 * to the line the live site uses on nearly every page, but each page can
 * override it.
 */
export function CTABand({
  eyebrow = "Get started",
  title = "Let's craft a personalized solution for you",
  lede = "Tell us what you are trying to achieve and we will come back within 24 hours on business days.",
  primary = { label: "Get in touch", href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string; external?: boolean };
}) {
  return (
    <Section surface="deep" spacing="default">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            inverted
            eyebrow={eyebrow}
            title={title}
            lede={lede}
            className="max-w-2xl"
          />

          <div className="flex flex-wrap items-center gap-4">
            <Button href={primary.href} size="lg" variant="on-deep">
              {primary.label}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                external={secondary.external}
                size="lg"
                variant="on-deep-quiet"
                className="group"
              >
                {secondary.label}
                <TrailingArrow />
              </Button>
            ) : (
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-semibold text-on-deep underline underline-offset-4 transition-colors duration-200 hover:text-white"
              >
                or email {site.email}
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
