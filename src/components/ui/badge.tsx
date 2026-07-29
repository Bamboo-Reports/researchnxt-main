import { cn } from "@/lib/cn";

/**
 * A content-type marker. Squared off rather than pill-shaped so it reads as a
 * plate label from the same family as the section rules.
 */

type BadgeProps = React.ComponentProps<"span"> & {
  tone?: "neutral" | "accent" | "deep";
};

const tones = {
  neutral: "border-line-strong bg-surface text-ink-soft",
  accent: "border-accent/40 bg-accent-soft text-accent",
  deep: "border-deep-line bg-deep text-on-deep",
} as const;

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-figure inline-flex items-center rounded-[3px] border px-2 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
