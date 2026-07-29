# Progress

Migration of researchnxt.com from WordPress + Elementor (Hostinger) to Next.js, targeting Vercel.

Last updated: 2026-07-29

## Repository maintenance

- Initialized Git and connected `main` to `Bamboo-Reports/rnxt-website`
- Replaced the long project README with a concise setup guide; detailed status remains in this file
- Added `AGENTS.md` and updated `CLAUDE.md` to require agents to record completed work, verification, and remaining issues in `PROGRESS.md` before finishing each task

---

## Decisions made

| Question | Decision |
| --- | --- |
| Content scope | Migrate all ~106 posts (deferred to Phase B) |
| Content storage | Typed TS / MDX in-repo, no CMS |
| Resources IA | One `/resources` hub with type filters, sub-routes retained (Phase B) |
| GCC Intelligence | Real on-site solution page + external CTA to Bamboo Reports |
| Phase A scope | Core marketing pages only; Resources excluded |
| Forms | Non-functional placeholders for now |
| Imagery | Generated gradient placeholders, no asset migration yet |

---

## Phase A — DONE

Twelve routes, every one reachable from the navbar or footer.

### Stage 1 — Scaffold
- `create-next-app` — Next.js 15.5.22, React 19, TypeScript, Tailwind v4, App Router, `src/`
- Design tokens defined once in `src/app/globals.css` under `@theme`
- Root layout with Inter via `next/font`, metadata defaults, skip-to-content link
- Removed boilerplate assets

### Stage 2 — UI primitives
`src/components/ui/` — `Container`, `Section`, `Button`, `Card`, `Badge`, `Placeholder`, `Prose`, `SectionHeading`.
Verified via a temporary `/kitchen-sink` route (since deleted) and by confirming every custom token compiles into the production CSS.

### Stage 3 — Layout chrome and forms
- `config/site.ts` + `config/nav.ts` — single source of truth for nav, footer, address, socials
- `Navbar` — sticky, desktop dropdowns on hover/focus, mobile sheet with focus trap, Escape to close, closes on route change
- `Footer`, `CTABand`, `Logo`, `NavLink` (external-aware)
- `ContactForm` and `ApplicationForm` — complete labelled markup, submit intercepted → `/thank-you`

### Stage 4 — Content layer
All copy transcribed from the live site into typed modules under `src/content/`:
`solutions.ts`, `home.ts`, `about.ts`, `careers.ts`, `contact.ts`, `legal.ts`, `types.ts`.
Legal copy (privacy policy, survey terms, raffle terms) pulled verbatim from the live pages rather than paraphrased.

### Stage 5 — Pages
Built in dependency order: contact → thank-you → legal → about → careers → `solutions/[slug]` → solutions hub → home.
All four solution pages render from one template driven by `content/solutions.ts`.

### Stage 6 — Redirects, SEO, polish
- 17 redirects in `next.config.ts`
- `generateMetadata` per route, `sitemap.ts`, `robots.ts`, Organization JSON-LD
- `not-found.tsx`, `error.tsx`, `loading.tsx`
- ESLint scoped to ignore the vendored `.agents` scripts (were producing 143 unrelated warnings)

### Brand integration (added after logo was supplied)
- Logo inlined as SVG in `components/layout/logo.tsx` — no extra request, no layout shift; "Research" inherits `currentColor` so it flips white on dark surfaces, orange NXT tile stays constant
- Accent token changed from placeholder navy to brand blue `#0079bf` (4.68:1 on white — clears WCAG AA for normal text)
- `--color-brand-orange: #ff7d24` declared, reserved for the mark (fails contrast as body copy)
- Placeholder gradients redrawn from the brand palette
- Default Next favicon replaced with the NXT tile as `src/app/icon.svg`
- Source artwork kept at `public/logo.svg`

### Content edit
- Removed the Diptarup Chakraborti entry from About leadership; the grid now adapts to the entry count so a single card doesn't read as a missing item

---

## IA changes vs the old site

| New route | Replaces |
| --- | --- |
| `/` | `/` |
| `/solutions` | `/solutions/` — was a bare link list with no content |
| `/solutions/prospect-database` | `/prospect-database/` |
| `/solutions/account-intelligence` | `/account-intelligence/` |
| `/solutions/research-based-marketing` | `/research-based-marketing/` |
| `/solutions/gcc-intelligence` | `/gcc-insights/` — was orphaned, no nav reached it |
| `/about` | `/about-us/` |
| `/careers` | `/career/` |
| `/contact` | `/contact-us/` + four near-identical `*-peq` funnels |
| `/thank-you` | `/pd-datasheet-download/`, `/thank-you-for-early-access-req/` |
| `/privacy-policy` | `/policy/` |
| `/terms/survey` | `/survey-terms/` + `/survey-terms-conditions/` |
| `/terms/raffle` | `/raffle-terms-conditions/` |

Retired with a redirect to `/`: `/element-page/`, `/elementor-41865/` (Elementor scaffolding), `/the-2021-india-cloud-computing-survey/` (expired).

---

## Verified

- `npm run build` clean; route table matches the twelve routes exactly — no extras, no gaps
- `npm run lint` — `src/` warning-free
- All 17 redirects return 308 to the correct destination
- Crawl from `/` reaches all 12 pages, zero broken internal links
  (`/thank-you` is intentionally unreachable by crawl — form-submit only, `noindex`)
- Every external link resolves 200: 5 Resources targets, Bamboo Reports, 3 socials, 12 featured resource URLs
- Every page has exactly one `<h1>`, a title, a meta description and a canonical
- Every custom design token compiles into the production CSS

---

## PENDING

### Incomplete from the Phase A plan

**1. OG images — not done.** No `opengraph-image` file exists and no `images:` is set in any metadata; the `openGraph` block only carries `type`/`siteName`/`locale`. Every LinkedIn and Twitter share currently renders a blank card. This was listed in Stage 6 of the approved plan and was not delivered.

**2. Visual verification — never run.** No browser was available (Chrome extension not connected). Unverified:
   - Responsive pass at 375 / 768 / 1280
   - Keyboard-only pass — the mobile-sheet focus trap and nav dropdown keyboard behaviour are correct by inspection but have never been exercised
   - Lighthouse (targets: 95+ performance, 100 accessibility)

### Phase B — Resources (deferred by design)

- `/resources` hub with type + topic filters
- Detail templates: report, insight (article + interview formats), case study, event
- Migrate ~106 WordPress posts to MDX, with `legacyPaths` frontmatter driving a generated redirect map
- Flip the five Resources entries in `config/nav.ts` from `external: true` to internal hrefs
- Replace the three hardcoded arrays in `content/home.ts` with a `getFeaturedResources()` call

Content-URL redirects (`/blog/…`, `/experts-view/…`, `/microsite/…`, `/case-study/…`, and the other WP category prefixes) are deliberately **absent** from `next.config.ts` — their targets do not exist yet, and redirecting now would break pages that currently work.

### Phase C — Wiring (deferred by design)

- Wire `ContactForm` and `ApplicationForm` to a real backend, including resume upload
- Migrate real imagery from the WordPress media library (replaces `components/ui/placeholder.tsx`)
- Analytics
- Error reporting in `error.tsx`
- Decide whether Bamboo Reports folds into this codebase or stays separate

All Phase C work is marked `TODO(phase-c)` in source.

### Minor

- Legacy URLs redirect in two hops (`/about-us/` → `/about-us` → `/about`) because Next normalises the trailing slash before matching redirects. Search engines follow this fine; fixing it would destabilise trailing-slash handling sitewide for little gain.
- `--color-brand-orange` is declared but unused, so Tailwind drops it from the compiled CSS. Available when wanted.

---

## Findings from the live site worth acting on

- **Broken LinkedIn link.** The live WordPress footer points at `linkedin.com/company/10452329/admin/` — an admin-only URL that 404s for ordinary visitors. `config/site.ts` uses the public form. Worth fixing on the WordPress site too, since it will keep running until cutover.
- **Duplicate legal page.** `/survey-terms/` is a strict subset of `/survey-terms-conditions/` — the latter adds the Salesforce sponsorship intro and the government/Salesforce-employee exclusion. Consolidated to `/terms/survey` with no loss.
- **Redundant Resources sections.** Insights and Experts View both surface the same AI articles; report launches appear under both Events and Reports. The Phase B unified hub resolves this.
- **Eleven-plus URL prefixes** for what are really four content types (`/blog/`, `/martech/`, `/experts-view/`, `/microsite/`, `/case-study/`, `/business-strategy/`, `/cloud-computing/`, `/bambooreports/`, `/guide-to-ai/`, `/interviews/`, `/article/`, `/campaign-management/`, `/customer-experience/`).
