/**
 * Single source of truth for the navbar and footer.
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

/**
 * PHASE B: these now point at internal placeholder pages under /resources
 * (see `src/content/resources.ts`); real content replaces the placeholders.
 */
export const resourcesNav: NavItem[] = [
  {
    label: "Reports & whitepapers",
    href: "/resources/reports-whitepapers",
  },
  {
    label: "Experts view",
    href: "/resources/experts-view",
  },
  {
    label: "Insights",
    href: "/resources/insights",
  },
  {
    label: "Success stories",
    href: "/resources/success-stories",
  },
  {
    label: "Events",
    href: "/resources/events",
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
