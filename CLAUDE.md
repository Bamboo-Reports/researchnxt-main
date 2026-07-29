# CLAUDE.md

Guidance for Claude Code working in this repository.

## Do not start servers

**Never run `npm run dev`, `next dev`, `next start`, or any other dev/production
server unless the user explicitly asks for it.** The user manages their own
server processes. Starting one competes for ports with the session they already
have open.

To verify work, use `npm run build` and `npm run lint` — both are non-interactive
and prove type-safety, lint cleanliness and the full route table without binding
a port.

If a check genuinely requires a running server (redirect behaviour, rendered
HTML, link crawling), ask first.

## Project

Next.js rebuild of researchnxt.com, migrating off WordPress + Elementor toward
Vercel. See `README.md` for the phase breakdown and what is deliberately still
a placeholder.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · no component
library.

## Conventions

- **Design tokens live in one place** — `src/app/globals.css` under `@theme`.
  Components reference tokens (`bg-accent`, `text-ink-soft`, `border-line`),
  never raw hex. The accent is the brand blue `#0079bf` from the logo.
- **`text-accent` is for light surfaces only.** Inside a `Section surface="deep"`
  band the accent blue drops to 2.6:1. Use `text-accent-on-deep` there, and
  `text-on-deep` for body copy.
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
- **Server components by default.** The navbar, the two forms and the two motion
  components (`Reveal`, `FigureValue`) are the only client components.
- Run `npm run lint` before considering work done; `src/` must be warning-free.

## Phase markers

Placeholder code carries explicit markers so it is greppable:

- `PHASE A` / `Phase B` comments — Resources links that point at the live
  WordPress site until `/resources` exists.
- `TODO(phase-c)` — forms that render but do not submit, and error reporting.
