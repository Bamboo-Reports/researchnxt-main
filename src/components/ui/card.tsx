import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * A card here is a plate with its caption, not a boxed panel: structure comes
 * from a hairline rule that lights up on hover rather than from a border
 * drawn around every item. Bordered panels are still available via
 * `surface="panel"` for the few places that genuinely need a container.
 */

type CardProps = React.ComponentProps<"div"> & {
  /** When set, the whole card becomes a link with a hover affordance. */
  href?: string;
  external?: boolean;
  surface?: "plain" | "panel" | "deep";
};

const surfaces = {
  plain: "border-t border-line pt-5",
  panel: "rounded-lg border border-line bg-surface p-6",
  deep: "on-deep rounded-lg border border-deep-line bg-deep p-6 text-white",
} as const;

const hovers = {
  plain: "hover:border-accent",
  panel: "hover:border-accent hover:bg-surface-subtle",
  deep: "hover:border-accent",
} as const;

export function Card({
  href,
  external,
  surface = "plain",
  className,
  style,
  children,
  ...props
}: CardProps) {
  const classes = cn(
    "group flex flex-col transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)]",
    surfaces[surface],
    href && hovers[surface],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "text-title font-display-soft transition-colors duration-200 group-hover:text-accent",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-ink-soft", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-accent",
        className,
      )}
      {...props}
    />
  );
}
