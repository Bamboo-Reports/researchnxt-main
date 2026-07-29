import { Container } from "@/components/ui/container";
import { DataPlate } from "@/components/ui/data-plate";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { step } from "@/lib/motion";

/**
 * The opening band on every page below the homepage.
 *
 * Inner pages get the same drenched surface as the hero and the closing CTA, so
 * the deep blue reads as the site's own colour rather than as an occasional
 * accent. The headline wipes up line by line on load, matching the homepage.
 *
 * `title` is split on spaces only when `lines` is supplied; otherwise it is set
 * as one block, because most inner headlines are short enough not to need a
 * chosen break.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  plateSeed,
  plateLabel,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Adds the page's plate alongside the copy at large sizes. */
  plateSeed?: string;
  plateLabel?: string;
  /** Buttons or other controls under the lede. */
  children?: React.ReactNode;
}) {
  return (
    <Section surface="deep" spacing="default">
      <Container>
        <div
          className={
            plateSeed
              ? "grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16"
              : ""
          }
        >
          <div className="anim-rise flex flex-col gap-8" style={step(0)}>
            <SectionHeading
              as="h1"
              size="display-sm"
              inverted
              eyebrow={eyebrow}
              title={title}
              lede={lede}
            />
            {children}
          </div>

          {plateSeed ? (
            <DataPlate
              seed={plateSeed}
              aspect="square"
              label={plateLabel}
              className="hidden border border-deep-line bg-deep-raised lg:block"
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
