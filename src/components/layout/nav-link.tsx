import Link from "next/link";
import { RemixIcon } from "@/components/ui/remix-icon";
import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/cn";

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <RemixIcon name="arrow-right-up-line" className={cn("size-4 shrink-0", className)} />
  );
}

/**
 * Renders an internal Next link or an external anchor based on `item.external`.
 * External links announce themselves to screen readers and show an icon, so a
 * Phase B flip from external to internal needs no component change.
 */
export function NavLink({
  item,
  className,
  children,
  withIcon = true,
  style,
}: {
  item: NavItem;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /**
   * Set false when the caller stacks its children in a column and wants to
   * place the external icon itself. Left on, the icon becomes its own row and
   * opens a gap under every item. The screen-reader note is announced either
   * way.
   */
  withIcon?: boolean;
}) {
  const content = (
    <>
      {children ?? item.label}
      {item.external && withIcon ? <ExternalIcon /> : null}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center gap-1.5", className)}
        style={style}
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn("inline-flex items-center gap-1.5", className)}
      style={style}
    >
      {content}
    </Link>
  );
}
