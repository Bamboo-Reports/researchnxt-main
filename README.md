# researchnxt.com

Next.js rebuild of researchnxt.com, migrating off WordPress + Elementor (Hostinger) toward Vercel.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · no component library.

```bash
npm run build
npm run lint
npm run dev     # http://localhost:3000
```

## Phase A — what is built

The core marketing pages. Ten routes, every one reachable from the navbar or footer:

| Route | Replaces |
| --- | --- |
| `/` | `/` |
| `/solutions` | `/solutions/` (was a bare link list with no content) |
| `/solutions/prospect-database` | `/prospect-database/` |
| `/solutions/account-intelligence` | `/account-intelligence/` |
| `/solutions/research-based-marketing` | `/research-based-marketing/` |
| `/solutions/gcc-intelligence` | `/gcc-insights/` (was orphaned — no nav reached it) |
| `/about` | `/about-us/` |
| `/careers` | `/career/` |
| `/contact` | `/contact-us/` + four near-identical `*-peq` funnels |
| `/thank-you` | `/pd-datasheet-download/`, `/thank-you-for-early-access-req/` |
| `/privacy-policy` | `/policy/` |

Retired with a redirect to `/`: `/element-page/` and `/elementor-41865/`
(Elementor scaffolding) and `/the-2021-india-cloud-computing-survey/` (expired).

**Survey and raffle terms are currently out of scope.** The `/terms/[slug]`
route and its content were pulled, so `/survey-terms/`,
`/survey-terms-conditions/` and `/raffle-terms-conditions/` have no target and
are deliberately absent from the redirect map: pointing them at the privacy
policy would answer a question the reader did not ask. Restore the route, the
`legalNav` entries, the sitemap entries and those three redirect rules together
when the terms pages come back.

The full redirect map is in `next.config.ts`. Sources are written without a
trailing slash — Next normalises `/about-us/` to `/about-us` before matching, so
legacy WordPress URLs resolve in two hops.

## Phase A placeholders — read before shipping

Three things are deliberately not real yet.

**Forms do not submit.** `ContactForm` and `ApplicationForm` render complete,
styled, labelled markup, then intercept `onSubmit` and route to `/thank-you`.
No network request is made. Both files open with a `TODO(phase-c)` marker.

**Images are generated blocks.** `components/ui/data-plate.tsx` hashes a seed
string to a deterministic gradient drawn from the brand palette, so the same
content always gets the same block. Replacing that one component swaps in real
imagery everywhere. `MonogramPlate` in the same file handles people, who get
initials on the deep surface rather than an abstract colour field.

**Resources links point at the live WordPress site.** `/resources` does not exist
yet, so the five Resources entries in `config/nav.ts` and the three featured
lists in `content/home.ts` carry `external: true` with absolute
`researchnxt.com` URLs. Phase B flips each to an internal href; no component
changes, because the `external` flag already drives the target/rel/icon
treatment in `NavLink`.

## Layout

```
src/
  app/                 routes, sitemap.ts, robots.ts, icon.svg, error/not-found/loading
  components/
    ui/                Container Section Button Card Badge DataPlate Prose SectionHeading
    layout/            Navbar Footer CTABand PageHero Logo NavLink
    motion/            Reveal (in-view stagger) FigureValue (count-up)
    home/              EvidenceField (the hero's gradient ground)
    forms/             ContactForm ApplicationForm + field primitives
  config/              site.ts (identity, address, socials) · nav.ts (nav + footer)
  content/             typed page copy, transcribed from the live site
  lib/                 cn.ts · motion.ts (stagger index helpers)
```

### Design system

Design tokens are defined once in `src/app/globals.css` under `@theme`: colours,
the fluid type scale, the easing curves, the container width. Components
reference tokens, never raw hex.

**Colour is Committed, not decorative.** The body is a cool blue-cast off-white
(deliberately not cream). The hero, every inner-page opener and the closing CTA
are *drenched*: `--color-deep` `#04243a` carries the whole band. The accent is
the brand blue `#0079bf`, which clears WCAG AA on the body surface; inside a
deep band it drops to 2.6:1, so `--color-accent-on-deep` `#58b6ea` is the only
accent allowed to carry text there. Brand orange `#ff7d24` is the single signal
mark (section tick, active nav underline, required-field marker) and never
carries text on any surface, where it would fail contrast.

**Type is one family.** DM Sans, variable on both weight and optical size. The
display voice is `opsz 40 / weight 800`; body is `opsz 14 / weight 400`. That
axis, not a second typeface, is what makes headings and body read as different
voices. `.font-figure` sets tabular numerals so columns of figures align.

**Structure is hairlines.** Sections open with a signal tick, a sentence-case
label and a dotted rule, rather than a tracked all-caps kicker. Lists are ruled
rows whose rule turns accent on hover. Boxed cards are used only where a grid of
plate-plus-caption items genuinely is the right affordance.

### Motion

Motion is gated behind `data-motion="on"`, set on `<html>` by an inline script
before first paint and skipped entirely when `prefers-reduced-motion` is set. So
a headless render, a print, a no-JS visit or a reduced-motion preference ships
the page fully visible with no animation, and reveals always enhance an
already-visible default rather than gating content.

The budget is spent deliberately: one orchestrated hero load (the headline wipes
up line by line, then the questions stagger, then the buttons), sibling stagger
on lists as they first scroll into view via `Reveal`, figures that count up once
via `FigureValue`, and interaction feedback (button press, hover rules, nav
underline, dropdown grow). There is no fade-and-rise wrapper around every
section, which is the tell rather than the choreography.

All four solution pages render from one template
(`app/solutions/[slug]/page.tsx`) driven by `content/solutions.ts`. Adding a
fifth solution means adding a data object, nothing else.

## Verified

- `npm run build` — clean, and the route table matches the ten routes above exactly.
- `npm run lint` — `src/` is warning-free.
- Every page has exactly one `<h1>`, a title, a meta description and a canonical.
- Contrast was derived at token level: every text/background pairing in the
  palette clears 4.5:1, and orange is confined to non-text marks.

Carried over from the Phase A pass, and unchanged by the design work: the
redirect map, the internal link crawl and the external link check.

## Not verified

**The design pass has not been looked at in a browser.** No server was started
in the session that built it, so the responsive behaviour at 375 / 768 / 1280,
the hero load choreography and the Lighthouse numbers are all unconfirmed.
Layouts were written mobile-first and the type scale is fluid, but this needs a
visual pass before it ships.

## Not yet done

- **Phase B** — `/resources` hub with type filters, report/insight/case-study/event
  templates, and migration of the ~106 WordPress posts to MDX. Post URLs
  (`/blog/…`, `/experts-view/…`, `/microsite/…`, `/case-study/…`) are
  deliberately absent from the redirect map until their targets exist —
  redirecting them now would break pages that currently work.
- **Phase C** — wire forms to a backend, migrate the WordPress media library,
  analytics.

## Note on the LinkedIn URL

The live WordPress footer links to `linkedin.com/company/10452329/admin/`, an
admin-only URL that 404s for ordinary visitors. `config/site.ts` uses the public
form instead.
