# CLAUDE.md

Guidance for Claude Code working in this repository.

## Progress tracking

Always update `PROGRESS.md` before finishing a task. Record the current state of the work, including what changed, what was verified, and anything that remains incomplete or blocked. Keep the file accurate enough for another agent to continue without relying on chat history.

## Project command permission

Do not run project or development commands unless the user explicitly gives
permission. This includes builds, development or production servers, tests,
package installation or updates, database migrations, code generation,
deployments, and similar commands.

Lint checks are the sole standing exception and may be run without asking first.
Read-only shell inspection and Git status/diff checks are also allowed. If any
other command is needed to verify or complete work, ask the user before running
it.

## Project

Next.js rebuild of researchnxt.com, migrating off WordPress + Elementor. It is
hosted on Hostinger's Node.js hosting, which builds from this repo with
`npm run build` (webpack, because the build host's glibc is too old for Next
16.3's native Turbopack binary) and runs `npm start`. See `README.md` for the
phase breakdown and what is deliberately still a placeholder.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · no component
library.

## Conventions

- **Content URLs are `/resources/<library>/<project>/<leaf>`** — the programme
  a piece belongs to is always the middle segment, and a leaf slug never
  repeats it. The full rule, including where modules and images go and how
  redirects are handled, is the "Content URLs" section of `README.md`. Read it
  before adding a report, an interview or an article.
- **Design tokens live in one place** — `src/app/globals.css` under `@theme`.
  Components reference tokens (`bg-accent`, `text-ink-soft`, `border-line`),
  never raw hex. The accent is the logo's brand blue darkened one step to
  `#0073b6` so accent text clears WCAG AA on the tinted bands.
- **No navy drench surfaces.** The `deep` tokens and component variants were
  removed on user direction; saturated moments use `bg-accent` with white
  text. The only navy in the codebase is `bg-bamboo-navy`, reserved for the
  cross-brand Bamboo Reports announcement strip.
- **Brand orange is `bg-signal`, never text.** It is the single signal mark:
  section tick, active nav underline, required-field marker. It fails contrast
  as copy on every surface the site uses, light or deep.
- **Type is DM Sans only**, variable on weight and optical size. Use the
  `.font-display` / `.font-display-soft` / `.font-figure` utilities rather than
  hand-setting weights, and the `text-display` / `text-headline` / `text-title`
  scale rather than raw `text-4xl`.
- **No tracked all-caps kickers.** Sections open with the tick-plus-rule device
  in `SectionHeading`; pass `eyebrow`, do not hand-roll a mini-caps label.
- **Motion is gated behind `data-motion="on"`.** Never write an animation that
  hides content by default: the visible state is the default, and `Reveal` adds
  the animating class only once in view. Easing comes from the `--ease-out-*`
  tokens; no bounce or elastic.
- **No em dashes in user-facing copy.** Content strings, labels and JSX text use
  commas, colons or full stops instead.
- **Copy lives in `src/content/`**, not in JSX. Page components read typed data
  modules so copy edits never touch markup.
- **Nav and site identity live in `src/config/`** — `nav.ts` and `site.ts` are
  the single source of truth for the navbar, footer, address and socials.
- **Server components by default.** The navbar, the two forms, the form anchor
  bar (`FormAnchorBar`), the two motion
  components (`Reveal`, `FigureValue`), the two scrolling rails
  (`QuoteCarousel`, `ReportCardRail`), the three hero components
  (`HeroQuestions`, `HeroIntro`, `HeroField`) and `VideoEmbed`, which keeps a
  YouTube recording a poster until it is clicked, are the only client
  components.
- **GSAP is in the stack for authored motion** (`HeroIntro` owns the hero
  entrance timeline). Content must stay visible by default: GSAP animates
  FROM hidden states only when `data-motion="on"`, never hides content in
  CSS awaiting a script. CSS keyframes remain the tool for ambient loops.
- Run `npm run lint` before considering work done; `src/` must be warning-free.

## Phase markers

Placeholder code carries explicit markers so it is greppable:

- `PHASE A` / `Phase B` comments — Resources links that point at the live
  WordPress site until `/resources` exists.
- `TODO(phase-c)` — forms that render but do not submit, and error reporting.
