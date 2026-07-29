import { cn } from "@/lib/cn";

/**
 * Vertical band.
 *
 * `deep` is the drenched surface where the brand blue carries the whole band
 * rather than trimming it — the hero and the closing CTA. It carries the
 * `on-deep` class so focus rings switch to the lit accent inside it.
 */

type SectionProps = React.ComponentProps<"section"> & {
  surface?: "default" | "subtle" | "muted" | "deep";
  /** Vertical rhythm. Spacing varies band to band so the page has a pulse. */
  spacing?: "tight" | "default" | "loose" | "none";
  /** Hairline above the section — how bands separate without shadows. */
  bordered?: boolean;
};

const surfaces = {
  default: "bg-surface text-ink",
  subtle: "bg-surface-subtle text-ink",
  muted: "bg-surface-muted text-ink",
  deep: "on-deep bg-deep text-white",
} as const;

const spacings = {
  none: "",
  tight: "py-12 sm:py-16",
  default: "py-20 sm:py-28",
  loose: "py-24 sm:py-36",
} as const;

export function Section({
  surface = "default",
  spacing = "default",
  bordered = false,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        surfaces[surface],
        spacings[spacing],
        bordered && (surface === "deep" ? "border-t border-deep-line" : "border-t border-line"),
        className,
      )}
      {...props}
    />
  );
}
