import { TrailingArrow } from "@/components/ui/button";
import { announcement } from "@/content/announcement";

/**
 * The campaign strip riding inside the sticky header, above the nav row.
 * Ported from Bamboo Reports' AnnouncementBar in that site's own ledger navy
 * (the `bamboo-navy` token), on user direction, so the strip reads as Bamboo
 * Reports speaking. The site's own surfaces still never go navy.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-bamboo-navy px-gutter py-2 text-white">
      <div className="mx-auto flex min-h-8 max-w-page items-center justify-center gap-3 text-center text-sm font-semibold">
        <span className="hidden sm:inline">{announcement.message}</span>
        <span className="sm:hidden">{announcement.messageShort}</span>
        <a
          href={announcement.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex min-h-8 flex-none items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-bamboo-navy transition-colors duration-200 before:absolute before:-inset-x-1 before:-inset-y-2 before:content-[''] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-bamboo-navy sm:text-sm"
        >
          <span className="hidden sm:inline">{announcement.cta}</span>
          <span className="sm:hidden">{announcement.ctaShort}</span>
          <span className="sr-only"> (opens in a new tab)</span>
          <TrailingArrow />
        </a>
      </div>
    </div>
  );
}
