import { cn } from "@/lib/cn";

/**
 * Section opener.
 *
 * The `eyebrow` renders as the site's one repeated brand device — a signal
 * tick, the label in sentence case at reading size, and a dotted rule running
 * out to the edge of the measure, like the header of a plate in a field
 * report. It is deliberately not a tiny tracked all-caps kicker.
 */

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** Use `h1` on hero sections, `h2` (default) for in-page bands. */
  as?: "h1" | "h2" | "h3";
  /** Sizes the title independently of its heading level. */
  size?: keyof typeof titleSizes;
  inverted?: boolean;
  className?: string;
};

const titleSizes = {
  display: "text-display font-display",
  "display-sm": "text-display-sm font-display",
  headline: "text-headline font-display-soft",
  title: "text-title font-display-soft",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  size,
  inverted = false,
  className,
}: SectionHeadingProps) {
  const resolvedSize = size ?? (Tag === "h1" ? "display" : "headline");

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-sm font-semibold",
            inverted ? "text-accent-on-deep" : "text-accent",
          )}
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-[1px] bg-signal"
          />
          {eyebrow}
          <span
            aria-hidden="true"
            className={cn(
              "h-px min-w-8 flex-1",
              inverted ? "rule-ticks-deep" : "rule-ticks",
            )}
          />
        </p>
      ) : null}

      <Tag
        className={cn(
          titleSizes[resolvedSize],
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>

      {lede ? (
        <p
          className={cn(
            "max-w-[64ch] text-lg leading-relaxed",
            align === "center" && "mx-auto",
            inverted ? "text-on-deep" : "text-ink-soft",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
