import Link from "next/link";
import { RemixIcon } from "@/components/ui/remix-icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg";

const variants = {
  primary: "bg-accent text-white border border-transparent hover:bg-accent-hover",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-surface-muted",
  ghost:
    "bg-transparent text-accent border border-transparent hover:bg-accent-soft",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
} as const;

/**
 * Press feedback is the point: 120ms is under the ~80-150ms band where an
 * interaction still reads as instant, so the button acknowledges the click
 * before the navigation resolves.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,border-color,color,transform] duration-150 " +
  "[transition-timing-function:var(--ease-out-quart)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
};

/** Renders as a Next `<Link>` when `href` is present, otherwise a `<button>`. */
type ButtonProps = BaseProps &
  (
    | ({ href: string; external?: boolean } & Omit<
        React.ComponentProps<typeof Link>,
        "href" | "className"
      >)
    | ({ href?: undefined; external?: never } & Omit<
        React.ComponentProps<"button">,
        "className"
      >)
  );

export function Button({
  variant = "primary",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, external, ...rest } = props;
    if (external) {
      const { children, ...anchorRest } = rest as React.ComponentProps<"a">;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    return <Link href={href} className={classes} {...rest} />;
  }

  // The union forbids `external` without `href`, so there is nothing to strip.
  return (
    <button className={classes} {...(props as React.ComponentProps<"button">)} />
  );
}

/**
 * The arrow that trails a link or button label. Kept as one component so the
 * travel distance and easing are identical everywhere it appears.
 */
export function TrailingArrow({ className }: { className?: string }) {
  return (
    <RemixIcon
      name="arrow-right-line"
      className={cn(
        "size-4 shrink-0 transition-[transform,color] duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:translate-x-1",
        className,
      )}
    />
  );
}
