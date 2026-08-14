"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, TrailingArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { isNavGroup, primaryNav, type NavGroup } from "@/config/nav";
import { cn } from "@/lib/cn";
import { AnnouncementBar } from "./announcement-bar";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

export function Navbar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  /* The sheet starts where the header ends. Measured rather than hardcoded:
     the announcement bar's height is content (it can wrap on very narrow
     screens or when the campaign copy changes), so a constant would drift. */
  const [sheetTop, setSheetTop] = useState<number>();

  // Route change closes everything — otherwise a dropdown survives navigation.
  // Adjusted during render rather than in an effect: React re-runs this
  // component before committing, so the menus never paint open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  // Escape closes whichever surface is open.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock the page behind the mobile sheet and trap focus inside it.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const measure = () => setSheetTop(headerRef.current?.offsetHeight);
    measure();
    window.addEventListener("resize", measure);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current
      ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
      ?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measure);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [mobileOpen]);

  // A short close delay keeps the dropdown usable while the pointer crosses
  // the gap between the trigger and the panel.
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[var(--z-sticky)] border-b border-line bg-surface/80 backdrop-blur-md"
    >
      <AnnouncementBar />
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((entry) => {
                if (!isNavGroup(entry)) {
                  return (
                    <li key={entry.label}>
                      <Link
                        href={entry.href}
                        aria-current={isActive(entry.href) ? "page" : undefined}
                        className={cn(
                          "relative inline-flex h-9 items-center rounded-md px-3 text-sm font-semibold transition-colors duration-200",
                          isActive(entry.href)
                            ? "text-ink"
                            : "text-ink-soft hover:text-ink",
                        )}
                      >
                        {entry.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-[1px] bg-signal transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)]",
                            isActive(entry.href) ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                }

                const open = openGroup === entry.label;
                const groupActive =
                  entry.href !== undefined && isActive(entry.href);

                return (
                  <li
                    key={entry.label}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenGroup(entry.label);
                    }}
                    onMouseLeave={scheduleClose}
                    onFocus={() => {
                      cancelClose();
                      setOpenGroup(entry.label);
                    }}
                    onBlur={scheduleClose}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup(open ? null : entry.label)}
                      className={cn(
                        "relative inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition-colors duration-200",
                        open || groupActive
                          ? "text-ink"
                          : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {entry.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-[1px] bg-signal transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)]",
                          groupActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                      <svg
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn(
                          "size-2.5 transition-transform duration-150",
                          open && "rotate-180",
                        )}
                      >
                        <path d="m1 1 4 4 4-4" />
                      </svg>
                    </button>

                    {/* Dropdowns are intentionally label-only: the navigation
                        stays quick to scan instead of becoming a content card. */}
                    {open ? (
                      <div className="absolute left-0 top-full z-[var(--z-dropdown)] w-max min-w-56 pt-2">
                        <div className="anim-menu rounded-lg border border-line bg-surface p-1.5 shadow-xl shadow-ink/10">
                          <ul>
                            {entry.items.map((item) => (
                              <li key={item.label}>
                                <NavLink
                                  item={item}
                                  withIcon={false}
                                  className="group flex w-full justify-between gap-6 rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-surface-muted"
                                >
                                  <span className="text-sm font-semibold text-ink">
                                    {item.label}
                                  </span>
                                  <TrailingArrow className="text-ink-muted group-hover:text-accent" />
                                </NavLink>
                              </li>
                            ))}
                          </ul>

                          {entry.href ? (
                            <GroupOverviewLink group={entry} />
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex">
              Contact us
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-flex size-9 items-center justify-center rounded-md text-ink lg:hidden"
            >
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="size-5"
              >
                {mobileOpen ? (
                  <path d="m5 5 10 10M15 5 5 15" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile sheet */}
      {mobileOpen ? (
        <div
          ref={sheetRef}
          id="mobile-nav"
          className="anim-menu fixed inset-x-0 bottom-0 top-28 z-[var(--z-sheet)] overflow-y-auto border-t border-line bg-surface lg:hidden"
          style={sheetTop !== undefined ? { top: sheetTop } : undefined}
        >
          <Container className="py-8">
            <nav aria-label="Mobile" className="flex flex-col gap-8">
              {primaryNav.map((entry) => {
                if (!isNavGroup(entry)) {
                  return (
                    <Link
                      key={entry.label}
                      href={entry.href}
                      className="-my-2 py-2 text-lg font-semibold text-ink"
                    >
                      {entry.label}
                    </Link>
                  );
                }

                return (
                  <div key={entry.label} className="flex flex-col gap-3">
                    <p className="flex items-center gap-2.5 text-sm font-semibold text-ink-muted">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                      />
                      {entry.label}
                    </p>
                    <ul className="flex flex-col gap-3 border-l border-line pl-4">
                      {entry.items.map((item) => (
                        <li key={item.label}>
                          <NavLink
                            item={item}
                            className="-my-1.5 block py-1.5 text-base font-medium text-ink"
                          />
                        </li>
                      ))}
                      {entry.href ? (
                        <li>
                          <Link
                            href={entry.href}
                            className="-my-1.5 block py-1.5 text-base font-medium text-accent"
                          >
                            All {entry.label.toLowerCase()}
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                );
              })}

              <Button href="/contact" className="w-full">
                Contact us
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function GroupOverviewLink({ group }: { group: NavGroup }) {
  if (!group.href) return null;
  return (
    <Link
      href={group.href}
      className="group mt-1 flex items-center justify-between gap-6 rounded-md border-t border-line px-3 py-2.5 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent-soft"
    >
      All {group.label.toLowerCase()}
      <TrailingArrow />
    </Link>
  );
}
