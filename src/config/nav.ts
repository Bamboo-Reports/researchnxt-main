/**
 * Single source of truth for the navbar and footer.
 *
 * PHASE A NOTE — the Resources links point at the live WordPress URLs because
 * /resources does not exist yet. When Phase B lands, each entry below becomes
 * `href: "/resources/…"` with `external` removed. Nothing else changes: the
 * `external` flag already drives the target/rel/icon treatment in NavLink.
 */

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href?: string;
  items: NavItem[];
};

export const solutionsNav: NavItem[] = [
  {
    label: "Prospect Database",
    href: "/solutions/prospect-database",
  },
  {
    label: "Account Intelligence",
    href: "/solutions/account-intelligence",
  },
  {
    label: "Research-Based Marketing",
    href: "/solutions/research-based-marketing",
  },
  {
    label: "GCC Intelligence",
    href: "https://bambooreports.com/",
    external: true,
  },
];

export const resourcesNav: NavItem[] = [
  {
    label: "Reports & whitepapers",
    href: "https://researchnxt.com/research-report/",
    external: true,
  },
  {
    label: "Experts view",
    href: "https://researchnxt.com/experts-view/",
    external: true,
  },
  {
    label: "Insights",
    href: "https://researchnxt.com/insights/",
    external: true,
  },
  {
    label: "Success stories",
    href: "https://researchnxt.com/success-stories/",
    external: true,
  },
  {
    label: "Events",
    href: "https://researchnxt.com/events/",
    external: true,
  },
];

export const primaryNav: (NavItem | NavGroup)[] = [
  { label: "Solutions", items: solutionsNav },
  { label: "Resources", items: resourcesNav },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const footerNav: NavGroup[] = [
  { label: "Solutions", items: solutionsNav },
  {
    label: "Company",
    items: [
      { label: "About Research NXT", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  { label: "Resources", items: resourcesNav },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function isNavGroup(item: NavItem | NavGroup): item is NavGroup {
  return "items" in item;
}
