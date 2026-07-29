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
  description?: string;
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
    description: "ICP assessment, list building and data enrichment.",
  },
  {
    label: "Account Intelligence",
    href: "/solutions/account-intelligence",
    description: "Key account reports, battle cards, competitor intelligence.",
  },
  {
    label: "Research-based Marketing",
    href: "/solutions/research-based-marketing",
    description: "Original research, thought leadership and ABM campaigns.",
  },
  {
    label: "GCC Intelligence",
    href: "/solutions/gcc-intelligence",
    description: "Research on India's global capability centre ecosystem.",
  },
];

export const resourcesNav: NavItem[] = [
  {
    label: "Reports & Whitepapers",
    href: "https://researchnxt.com/research-report/",
    description: "Original research reports and downloadable guides.",
    external: true,
  },
  {
    label: "Experts View",
    href: "https://researchnxt.com/experts-view/",
    description: "Interviews with thought leaders, buyers and vendors.",
    external: true,
  },
  {
    label: "Insights",
    href: "https://researchnxt.com/insights/",
    description: "Short reads on B2B marketing and technology.",
    external: true,
  },
  {
    label: "Success Stories",
    href: "https://researchnxt.com/success-stories/",
    description: "How we have delivered for our clients.",
    external: true,
  },
  {
    label: "Events",
    href: "https://researchnxt.com/events/",
    description: "Report launches, roundtables and summit appearances.",
    external: true,
  },
];

export const primaryNav: (NavItem | NavGroup)[] = [
  { label: "Solutions", href: "/solutions", items: solutionsNav },
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
      { label: "Get in touch", href: "/contact" },
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
