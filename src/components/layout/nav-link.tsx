import Link from "next/link";
import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/cn";

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-3 shrink-0", className)}
    >
      <path d="M4 2h6v6M10 2 2.5 9.5" />
    </svg>
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
}: {
  item: NavItem;
  className?: string;
  children?: React.ReactNode;
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
    >
      {content}
    </Link>
  );
}
