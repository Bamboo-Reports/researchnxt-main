import { Container } from "@/components/ui/container";
import { footerNav, legalNav } from "@/config/nav";
import { site } from "@/config/site";
import { NavLink } from "./nav-link";
import { Logo } from "./logo";

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
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.social.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.label} className="flex flex-col gap-5">
                <h2 className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-[1px] bg-signal"
                  />
                  {group.label}
                </h2>
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
