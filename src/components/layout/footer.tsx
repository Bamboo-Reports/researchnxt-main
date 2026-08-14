import { Container } from "@/components/ui/container";
import { footerNav, legalNav } from "@/config/nav";
import { site } from "@/config/site";
import { NavLink } from "./nav-link";
import { Logo } from "./logo";
import { SocialIcon } from "@/components/ui/social-icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface-subtle">
      <Container>
        <div className="grid gap-14 py-16 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          {/* Identity and contact */}
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              {site.description}
            </p>
            <address className="not-italic text-sm leading-relaxed text-ink-soft">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                {site.email}
              </a>
            </address>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {site.social.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.label}
                    className="block text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    <SocialIcon label={channel.label} className="size-5" />
                  </a>
                </li>
              ))}
              {/* Email sits with the channels as a fourth way in. */}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  aria-label={`Email ${site.email}`}
                  className="block text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7L22 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.label} className="flex flex-col gap-5">
                {/* Not a heading: three extra page-level h2s after the main
                    content pollute the document outline on every route. */}
                <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                  />
                  {group.label}
                </p>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <NavLink
                        item={item}
                        className="text-sm text-ink-soft transition-colors duration-200 hover:text-accent"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.label}>
                <NavLink
                  item={item}
                  className="transition-colors duration-200 hover:text-ink"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
