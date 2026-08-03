# Progress

Migration of researchnxt.com from WordPress + Elementor (Hostinger) to Next.js, targeting Vercel.

Last updated: 2026-08-03

## Repository maintenance

- Git was already initialized on `main`; updated the `origin` fetch/push URL from `Bamboo-Reports/rnxt-website` to `git@github.com:Bamboo-Reports/researchnxt-main.git`
- Verified `git remote -v` reports the new `origin` URL for both fetch and push
- Preserved the destination repository's unrelated placeholder commit with a merge commit while retaining the complete local project, avoiding a force push
- Verified before old-repository retirement that `Bamboo-Reports/rnxt-website` contains only `main` (no additional branches or tags), its tip `43ad444` exactly matches the migrated commit, and that commit is an ancestor of the new repository's `main`
- The old `Bamboo-Reports/rnxt-website` repository was subsequently deleted by the owner; `Bamboo-Reports/researchnxt-main` is now the authoritative GitHub repository
- Ran `git pull --ff-only origin main` after migration; Git confirmed the local branch was already up to date
- Created and switched to local branch `dev` from the up-to-date `main`; future edits will be made on `dev`
- Confirmed on 2026-08-03 that the active working branch remains `dev`, not `main`
- Replaced the long project README with a concise setup guide; detailed status remains in this file
- Added `AGENTS.md` and updated `CLAUDE.md` to require agents to record completed work, verification, and remaining issues in `PROGRESS.md` before finishing each task

## Dev branch changes

- Removed the dedicated Solutions section from the homepage, including its unused homepage-only content data and component imports; global navigation, the hero CTA, and all `/solutions` routes remain intact
- Restyled the homepage Experts view as the same plated, responsive four-card resource grid used by Latest reports and guides, while retaining a distinct white section surface
- Replaced the homepage Recognition/ecosystem band with a “Trusted By” logo section adapted from Bamboo Reports’ `/platform` page; imported all 17 customer marks, added an accessible motion-gated marquee, and retained a wrapping grid fallback for reduced motion and no JavaScript
- Changed the homepage “Trusted By” band from the muted surface to pure white (`#ffffff`), scoped to that section only
- Replaced the plated Report, Guide, and Interview thumbnails with one generic, text-free placeholder image rendered through Next.js `Image`; card content and non-thumbnail badges remain unchanged
- Removed the entire four-metric band from the homepage hero (`500k+`, `1.5k+`, `250+`, and `20+`) plus both hero CTAs, and cleaned up their homepage-only data/imports; the hero headline and rotating questions remain intact
- Reworked the homepage hero hierarchy: the three rotating diagnostic questions now appear first, followed by a ruled handoff to the main promise as the page’s `<h1>`; removed the navy background and decorative evidence field in favor of a pure-white editorial surface
- Refined that white hero into a true viewport-scale composition after review: compressed the rotating questions into a blue-accented diagnostic rail and restored the oversized promise as the dominant lower anchor, removing the previous stacked-section treatment
- Replaced the unsuccessful full-viewport hero with a bounded, cohesive problem-to-promise composition informed by the original site: question first, a short blue-rule handoff, then one fluid oversized headline; retained the white background and kept imagery, CTAs, and metrics absent
- Verified the final hero refinement with `npm run lint` and the Impeccable post-edit detector on `src/app/page.tsx` plus `src/components/home/hero-questions.tsx`; both completed cleanly with no detector findings. No build or dev server was run
- Assessed the current hero typography after feedback that the promise is too large: recommended replacing its `text-display` role (44–88px) with the established `text-display-sm` role (36–60px), retaining display weight and clear scale contrast with the rotating questions. Assessment only; no source edit or project command was run
- Reduced the hero promise to the established `text-display-sm` scale (36–60px), widened its measure to 22ch for calmer wrapping, and added a primary “Let's craft a personalized solution” CTA using the deploy-safe internal `/contact` route (which resolves to `http://localhost:3000/contact` locally)
- Replaced all exact user-facing “Get in touch” labels with “Contact Us” across desktop/mobile navigation, footer navigation, CTA bands, solution CTAs, and the not-found page; destinations remain `/contact`
- Re-ran lint and the Impeccable post-edit detector after the hero type/CTA and contact-label changes; both completed cleanly with no detector findings. No build or dev server was run
- Removed the redundant “The challenge” label from the homepage hero and deleted its unused content field, allowing the rotating question to open the section directly
- Verified the label removal with lint and the Impeccable detector; both completed cleanly. No build or dev server was run
- Retired the internal GCC Intelligence solution page: removed it from generated solution data, static params, cross-links, and sitemap input; the Solutions dropdown and hub card now link externally to `https://bambooreports.com/`, and both `/gcc-insights` plus `/solutions/gcc-intelligence` permanently redirect there
- Updated the central `site.bambooReports` value from the obsolete `.io` address to `https://bambooreports.com/`, keeping every Bamboo Reports CTA and GCC link consistent
- Simplified the desktop Solutions and Resources dropdowns to label-only rows by removing all navigation description fields and the description rendering; mobile navigation remains label-only as before
- Verified the GCC routing/link and dropdown simplification changes with `npm run lint`; lint completed cleanly. A production build was not run because it requires explicit permission
- Trialed Schibsted Grotesk globally through `next/font/google`, then reverted to DM Sans after visual review. Restored the DM Sans variable loader, CSS token, and optical-size roles; no other `dev` changes were reverted
- Verified the DM Sans restoration with `npm run lint` and the Impeccable type-scoped detector; both completed cleanly. No build or dev server was run
- Prepared the complete current `dev` worktree for publication, including all tracked UI/configuration changes and untracked homepage/logo/placeholder assets. Final pre-commit `git diff --check` passed; the most recent lint run was clean. No production build was run
- Added a repository command policy to `AGENTS.md` and `CLAUDE.md`: lint and read-only inspection are allowed, while builds, servers, tests, installs, migrations, generation, deployments, and similar project commands require explicit user permission
- Decluttered the hero after feedback that it had too many lines: removed the orange tick bar and the full-width accent rule above the promise, promoted the promise to the `text-display` role as the single dominant element, demoted the rotating questions to a quiet `text-title` / `text-ink-soft` opener (measure widened to 44ch), and replaced the three bar-shaped rotator controls with dots where the active one stretches into a pill filled by the dwell progress. No copy was added or changed
- Verified the hero declutter with `npm run lint` (clean) and the Impeccable post-edit detector on both touched files (no findings). No build or dev server was run
- Shortened the hero CTA label from "Let's craft a personalized solution" to "Let's craft your solution" per user feedback that the button was too big; destination remains `/contact`
- Audited the full homepage (a11y, performance, theming, responsive, implementation integrity) with the Impeccable audit flow; detector returned zero findings and token discipline was confirmed clean
- Removed the navy from the homepage per user direction: `CTABand` no longer renders as a `surface="deep"` drenched band; it is now a bordered `surface="muted"` light band with the standard accent primary button, `secondary` variant for the optional second button, and an accent-coloured email link. This component is shared, so every page's closing band is now light. Other pages' own deep page heroes were not touched
- Fixed the double hairline between the hero and the reports band (hero drew `border-b` while the next section drew `border-t`; the hero border was removed)
- Removed the redundant orange tick from each differentiator item; the items keep their `border-t` rule and the section eyebrow already carries the signal tick
- Changed the resource-card link label from "Read More" to sentence-case "Read more" and added a screen-reader-only "(opens in a new tab)" note on external resource cards
- Verified the audit fixes with the Impeccable detector (no findings) and `npm run lint` (clean). No build or dev server was run
- Replaced the CTA band's default "Contact Us" button with a Google Calendar appointment-scheduling button (new client component `src/components/scheduling-button.tsx`, joining the small set of client components). It injects Google's scheduling script/stylesheet and mounts their button labelled "Schedule a meeting" in the brand accent `#0079bf`; the user-supplied snippet's "Map Your GCC Universe" label was not reused as it belongs to another property. Pages passing an explicit `primary` (the four solution pages) keep their own buttons and are unaffected; careers now also gets the scheduler
- Restyled the CTA band's email fallback from a large inline link to a quiet `text-xs` muted line beneath the action ("or email" with only the address in accent); it renders whenever no `secondary` button is passed and doubles as the no-JavaScript fallback for the scheduler
- Trimmed the first differentiator description to "A sustained track record of research-based solutions for B2B marketers." so it wraps to two lines like its neighbours
- Verified with the Impeccable detector (no findings) and `npm run lint` (clean). The Google button renders only in a browser, so its live appearance is unverified; no build or dev server was run
- Restyled the injected Google scheduling button after feedback that its font looked wrong: a scoped `.scheduling-button button` override in `globals.css` forces the site font family and Button `lg` geometry with `!important` to outrank Google's stylesheet; colour still comes from the `load()` config. Browser verification of the restyled button remains pending
- Reverted the Google Calendar scheduler entirely at user request: deleted `src/components/scheduling-button.tsx`, removed its import and the `.scheduling-button` CSS override, and restored the default `primary = { label: "Contact Us", href: "/contact" }` button in the CTA band
- Removed the "or email enquiry@researchnxt.com" line from the CTA band entirely at user request, along with the now-unused `site` import; the band's actions are now just the primary button plus the optional secondary button. Verified with `npm run lint` (clean)
- Changed the shared `Button` base from `rounded-md` to `rounded-full` per user feedback that the CTA looked squarish; this applies to every button site-wide (hero CTA, CTA bands, forms) so all controls keep one radius. Verified with `npm run lint` (clean)
- Reduced the CTA band's vertical padding from `spacing="default"` (py-20/28) to `spacing="tight"` (py-12/16) per user feedback that the Get started section was too tall; applies to the closing band on every page. Verified with `npm run lint` (clean)
- Removed every `size="lg"` button usage (hero CTA, CTA bands, solution-page hero buttons, contact-form submit, mobile-nav CTA) so all in-page buttons render at the default 44px height, per user feedback that the Contact Us button was too big and sizes should be consistent. The desktop navbar CTA keeps `size="sm"` as compact nav chrome. Verified with `npm run lint` (clean)
- Reduced the CTA band to a single line per user request: the `eyebrow` ("Get started") and `lede` defaults were removed so both are now opt-in props, leaving "Let's craft a personalized solution for you" plus the button. Title now renders at `size="title"` and the row is `lg:items-center` so the line and button align. Pages that pass their own eyebrow/lede (careers, the four solution pages) still render them; only the bare `<CTABand />` usages (home, about, solutions hub) become one line
- Added the supplied `hero.webp` (1672x941 photo of two colleagues reviewing research charts) as the homepage hero image: moved from the repo root into `public/`, and rebuilt the hero as a two-column grid (copy left, photo right) that stacks on mobile. Rendered through `next/image` with `priority` for LCP, explicit `sizes`, descriptive alt text, and an `aspect-[4/3]`/`sm:aspect-[16/10]` object-cover crop. The headline dropped back to `text-display-sm` to suit the narrower column, and section padding eased to py-16/20/24
- Verified with the Impeccable detector (no findings) and `npm run lint` (clean). The hero layout and image crop have not been checked in a browser; no build or dev server was run
- Reworked the hero again after a screenshot showed the two-column split reading badly: the photo is now a full-bleed `next/image` `fill` background behind the whole band (`relative isolate overflow-hidden`, image at `-z-20`, scrims at `-z-10`, content above). A white scrim keeps the copy legible: a flat `bg-white/88` below the `sm` breakpoint, and a left-to-right gradient (`from-white from-30%` through `via-white/90` to near-transparent) above it, so the type sits on white and the room clears on the right. Image alt is empty since it is now atmosphere, not content; `object-[68%_center]` biases the crop toward the subjects on small screens
- Fixed the marooned one-line CTA band from the same screenshot: the `size="title"` override was removed so the line returns to the `headline` scale, the measure tightened to `max-w-[20ch]`, and the button group is `shrink-0` with `lg:gap-16`, closing the large dead gap between the small line and the far-right button
- Verified both with the Impeccable detector (no findings) and `npm run lint` (clean). Browser verification still pending on the user's side
- Rebuilt the hero to the user's HubSpot-style reference: the full-bleed photo now shows its entire frame on desktop (the section carries `lg:aspect-[1672/941]` so the band matches the image ratio, `flex items-center` centres the copy vertically), all copy is centre-aligned over the photo, and legibility comes from a neutral `bg-ink/55` dim (deliberately not navy, per the earlier no-navy direction) with white headline and `on-deep` focus rings. `HeroQuestions` gained an `inverted` prop: centre-aligned question in `text-on-deep`, dot controls in `white/40` with `accent-on-deep` hover. Below `lg` the image still object-covers (biased `68%` toward the subjects) since a 375px-wide full frame would be too short to hold the copy
- Verified with the Impeccable detector (no findings) and `npm run lint` (clean); browser check of the dim strength and crop still pending
- Reverted the HubSpot-style centred dark hero at user request, back to the previous full-bleed version: left-aligned copy on the white scrim (flat `bg-white/88` on mobile, left-to-right white gradient from `sm` up) with the ink headline, and `HeroQuestions` returned to its pre-`inverted` form (the prop and its light styles were removed)
- Removed the closing CTA band from the homepage at user request (deleted `<CTABand />` and its import from `src/app/page.tsx`); the homepage now ends at the Trusted By band. All other pages keep their CTA bands. Verified with `npm run lint` (clean)
- Swapped the hero background to the user-supplied `hero2.jpg` (6000x4000, 1.8 MB source, moved from repo root into `public/`; `next/image` serves optimized sizes at request time so the raw weight is not shipped). Same full-bleed scrim treatment; `public/hero.webp` is kept in case of another revert. Verified with `npm run lint` (clean); crop/scrim fit over the new photo needs a browser look

---

## Decisions made

| Question | Decision |
| --- | --- |
| Content scope | Migrate all ~106 posts (deferred to Phase B) |
| Content storage | Typed TS / MDX in-repo, no CMS |
| Resources IA | One `/resources` hub with type filters, sub-routes retained (Phase B) |
| GCC Intelligence | External link to Bamboo Reports; no internal solution page |
| Phase A scope | Core marketing pages only; Resources excluded |
| Forms | Non-functional placeholders for now |
| Imagery | Generated gradient placeholders, no asset migration yet |

---

## Phase A — DONE

Twelve routes, every one reachable from the navbar or footer.

### Stage 1 — Scaffold
- `create-next-app` — Next.js 15.5.22, React 19, TypeScript, Tailwind v4, App Router, `src/`
- Design tokens defined once in `src/app/globals.css` under `@theme`
- Root layout with DM Sans via `next/font`, metadata defaults, skip-to-content link
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
| `https://bambooreports.com/` | `/gcc-insights/` and the retired `/solutions/gcc-intelligence` route redirect externally |
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
