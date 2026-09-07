import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { step } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * The opening band on every page below the homepage.
 *
 * A slim light band on the brand wash, matching the solution, About and
 * Careers heroes: headline, optional lede, optional controls. Solution pages
 * can add artwork beside the same text treatment.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  media,
  backgroundImage,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Buttons or other controls under the lede. */
  children?: React.ReactNode;
  /** Optional artwork beside the copy on desktop, below it on mobile. */
  media?: React.ReactNode;
  /** Optional decorative background with a soft light fade behind the copy. */
  backgroundImage?: string;
}) {
  return (
    <Section spacing={backgroundImage ? "none" : "tight"} className={cn(
      "border-b border-line",
      backgroundImage ? "relative isolate overflow-hidden bg-surface-subtle py-8 sm:py-10" : "hero-wash",
    )}>
      {backgroundImage ? (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              preload
              className="origin-right object-contain object-right lg:scale-125"
            />
          </div>
          <div aria-hidden="true" className="page-hero-background-fade pointer-events-none absolute inset-0" />
        </>
      ) : null}
      <Container>
        <div className={cn(
          media && "grid items-center gap-10 lg:grid-cols-2 lg:gap-12",
          backgroundImage && "relative flex items-center lg:min-h-68",
        )}>
          <div className={cn("anim-rise flex min-w-0 flex-col gap-8", backgroundImage && "max-w-xl lg:max-w-[48%]")} style={step(0)}>
            <SectionHeading
              as="h1"
              size="display-sm"
              eyebrow={eyebrow}
              title={title}
              lede={lede}
            />
            {children}
          </div>
          {media ? <div className="min-w-0">{media}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
