# Progress

Migration of researchnxt.com from WordPress + Elementor (Hostinger) to Next.js, targeting Netlify.

Last updated: 2026-08-07

## New report-library card for ACM, candidate for a full rollout, 2026-08-07

The user flagged the `/resources/reports-whitepapers` cards as dated. They are
WordPress-era promo tiles: off-brand purple, a "Download Now" button baked
into the pixels. A generator now composes cards in the site's own system, and
the first one is live on the ACM entry pending the user's verdict on a
rollout.

**Composition** (1600x900): the drenched deep band (`#04243a` with a raised
lift and a plate-blue glow), the SectionHeading tick-and-rule device as a
"Research report" eyebrow in `accent-on-deep`, the title in real DM Sans
ExtraBold at display size, the wordmark bottom-left with "Research" recolored
white for the deep surface (the blue letters are 2.6:1 there), and the
report's existing tablet mockup bleeding off the right edge.

**Generator**: `scratchpad/cardgen/generate.mjs` (session scratchpad, not yet
committed), driven by a per-slug config. Runs from the repo root, resolves
`sharp` from the repo's own node_modules, renders text via Pango with
downloaded DM Sans statics (fontsource; note the family name inside the TTFs
is **"DM Sans 9pt"**, and the first render silently fell back to a default
sans until the descriptor said so). Text layers are composited over an SVG
background, and the mock is pre-clipped because sharp refuses composites that
overflow the canvas.

`cardImage` now points at `/covers/automation-campaign-management-card.png`;
the old `-zoho-card.png` is deleted (git history keeps it). Lint clean.

**Revised on user direction to the no-text variant.** The library card sets
the title in HTML below the image, so the title inside the artwork said
everything twice. The shipped card is now just the deep field, the plate-blue
glow (recentred behind the mock) and the tablet mockup centred at height 860.
The generator keeps both compositions behind a `--plain` flag; the full
text treatment remains available for surfaces with no HTML caption, an Open
Graph image being the obvious one.

**Superseded again, direction settled: a portrait book-shelf grid.** The user
will supply each report's own vertical cover to stand as the card, chosen
over keeping the 16:9 slot. The generated field cards and the generator stay
parked (the text variant is still the natural Open Graph image) but are no
longer the library's direction.

What is built and waiting for the files:

- `ReportLanding.cardPortrait?` field, A4 ratio (210:297), full bleed
- The library grid is now 2 / sm:3 / lg:4 columns of `aspect-[210/297]`
  plates. A report with `cardPortrait` shows it full bleed; one without
  shows its landscape `cardImage` letterboxed on a `bg-surface-muted` plate,
  so the shelf stays uniform while covers arrive one by one, and supplying
  one file per report is the entire rollout
- The home page's featured-reports band still uses the landscape `cardImage`
  and is untouched

**All fifteen vertical covers are in and the shelf is complete.** The user
supplied the remaining fourteen at `~/Documents/researchnxt.com/covers/`,
each matched to its slug by filename (all fourteen matched confidently; the
"India GCC CX Report" file is `transforming-cx-through-gccs`, distinct from
the explicitly named State of Consumer Engagement GCC 2019). All aspect
ratios sit within 2 to 4 percent of A4, so the full-bleed crop is negligible.
Each was downscaled with sharp to 1190 wide as
`public/covers/<slug>-portrait.png` and wired via `cardPortrait`, verified
per entry inside its own const block (a naive lookahead first mis-skipped
`publishers-guide-to-smarter-monetization`, caught by the per-block check and
fixed by hand). **One quality note: `ai-led.png` is only 603x822**, below the
1190 target, kept at native size rather than upscaled; a higher-resolution
original would be worth swapping in later. The letterbox fallback in the
library is now dead code in practice but stays for any future report that
launches before its cover art.

**The first vertical cover is in.** The user supplied the ACM report's flat
A4 cover (`report-cover.png`, 5880x8334, found at
`~/Documents/researchnxt.com/` and identical to `~/Downloads/Report Cover
Design.png`). Downscaled with sharp to 1190x1687 (779KB) at
`public/covers/automation-campaign-management-portrait.png` and set as
`cardPortrait`; the ACM card now renders the cover full bleed while the other
fourteen sit letterboxed on plates awaiting their files. The original 8.4MB
source was not committed. Lint clean, not browser-checked.

## Hero mockups updated across all report landings, 2026-08-07

The user supplied a uniform tablet-mockup set at
`~/Documents/researchnxt.com/covers/report-mockup-for-hero/`, fourteen files
at 1600x1893 with transparency, one per report except
`automation-campaign-management`, which already had its tablet mock as the
hero. Each was matched to its slug by filename; the two ambiguous names were
verified by reading the artwork ("b2c-consumer-engagment" is the B2C
Consumer Engagement in the GCC Region cover, so
`state-of-consumer-engagement-gcc-2019`; "b2c-marketing-auto" is the 2017
India report).

- Downscaled with sharp to 768 wide (the template's render ceiling is 24rem)
  and written **over the existing `hero.cover` paths**, so no content entries
  changed except one: the consumer-engagement hero was a `.jpg`, and the new
  transparent mock requires PNG, so its `cover` now points at `.png` and the
  stale jpg is deleted
- The hero template's intrinsic-size hint was 768x768 from the old square
  implementors mock; every cover in the set is the same frame now, so it
  reads 768x909. ACM's mock is 1200x1441 (ratio 0.833 vs the set's 0.845),
  a sub-percent placeholder mismatch that height:auto absorbs
- All fifteen `hero.cover` paths verified on disk; lint clean; not
  browser-checked

## Home Featured reports band follows the shelf, 2026-08-07

On user direction the home page's four featured-report cards now carry the
same vertical covers as the library: `featuredReports` maps
`cardPortrait ?? cardImage`, and `ResourceCard` gained a `portrait` flag
that switches its plate from `aspect-video` to the A4 `aspect-[210/297]`
frame. Only the reports band passes it; the Experts view band keeps its
16:9 interview banners, and those are the only two callers. Lint clean, not
browser-checked.

## Single quick reads now render as a spotlight band, 2026-08-07

The user flagged that three report landings looked wrong where the quick
reads band has only one article: the rail rendered it as a lone quarter-width
card centred under the band heading, reading as a starved carousel.

The fix is in the template, not the data, and is generic: when
`quickReads.items.length === 1` the band switches to the **spotlight
grammar** the launch-event and success-story bands already use, image beside
text on a two-column grid, with the band heading, the article title at
`text-title`, and a secondary "Read the article" button. The rail is
untouched for two or more items. An `href`-less item (the PHASE B inert
state) renders the image without a link and drops the button.

Affects four landings, the three the user named plus one more with the same
shape found by counting every landing's items:
`navigating-corporate-commute-for-gccs-in-india`,
`unlocking-the-power-unified-cx`, `transforming-cx-through-gccs`, and
`ai-led-personalization`. Lint and the impeccable detector are clean.
**Not browser-checked**; the long Rethinking the Daily Commute title wraps to
about four lines at the 26ch cap, worth an eyeball.

### Two and three items also leave the rail

Follow-up on the user flagging `automation-campaign-management`, which has
two. The rail earns its arrows only once it can overflow, and at three or
fewer cards it is just a worse grid, so the band now branches on count: **one**
is the spotlight above, **two** sit as a centred pair at half width
(`max-w-4xl`, `sm:grid-cols-2`, plain `ReportCard`s), **three** use the
existing `ReportCardGrid` three-up, **four or more** keep the scrolling rail.
Affected: `automation-campaign-management` and
`abm-best-practices-report-india-2018` (two each);
`cloud-computing-new-normal-beyond` and `south-east-asia-response-guide`
(three each); the 5- and 7-item landings keep the rail. Lint clean, not
browser-checked.

## Marketing automation roundtable published under Events, 2026-08-07

The last outstanding item from the campaign-management article batch. It was
archived but unpublished because the user wanted it under Events, which was a
placeholder at the time. Events is now a real route, so it is live at
`/resources/events/automation-campaign-management/marketing-automation-roundtable`,
taking the library to **eight events**.

- **Slug shortened** from the source's
  `redefining-marketing-excellence-highlights-from-the-marketing-automation-roundtable`
  to `marketing-automation-roundtable`, the same trim the sector articles got,
  since the project segment already carries the programme
- **Two redirects, not one.** WordPress serves this write-up from both
  `/events/…` and `/campaign-management/…`; both now point here. Redirect map
  is 171 rules with no duplicate sources
- **The inert card is finally wired**: the "Redefining Marketing Excellence"
  quick read on the Automation & Campaign Management report landing had
  carried a banner and no link since it was first built. It now has its `href`

### No date, on user direction

Neither the recap, the events listing, nor the page metadata states when the
roundtable ran, so `Event.date` became **optional** rather than showing the
write-up's publication date (2025-01-13), which is a different fact. Both
templates omit the `<time>` when it is absent, and on the detail page the
breadcrumb separator goes with it so the trail ends at the programme instead
of a dangling slash. The registry sort stands an undated event in as `"9999"`
so it still sorts newest-first, which is correct here.

**Lead on the real date, not acted on:** the event photograph is named
`WhatsApp-Image-2024-12-07-at-14.20.35`, which puts the roundtable at
**7 December 2024**. That is a filename, not a stated fact, so it was not
published as the date. Worth one confirmation, after which `date:
"2024-12-07"` is a one-line change.

### Page order follows the source post exactly

On user direction the page is laid out in the source's own order, verified by
sorting the landmarks in the fetched HTML by character offset rather than by
eye:

| Source | Ours |
|---|---|
| LinkedIn video, before any text | `video`, rendered in place of the banner |
| two intro paragraphs | same |
| photo: the room | inline `image` block |
| Setting the Stage, Diving Into the Research | same |
| photo: handbook presentation | inline `image` block |
| Solutions in Action, Interactive Insightful Inspiring | same |
| photo: panellist | inline `image` block |
| A Step Forward | same |
| photo: speaker group | inline `image` block |
| download form | `jotformId`, but moved to the sticky aside, see below |

- **`Event.body` gained two block types**: `heading`, mirroring what an
  insights article already supports, and `image`, which is what lets the
  photographs sit between sections instead of being swept into a gallery at
  the end. The short-lived `gallery` field was removed again, superseded
- **The video opens the page in place of the banner**, per the source.
  `?compact=1` and the 710x450 ratio the source uses; not lazy, since it is
  now above the fold. Other events keep the banner, since the branch is on
  `event.video`. The banner is still the library card and Open Graph image,
  upgraded from the 1024x576 crop to the full 1920x1080 collage
- **The form is Jotform 243521499246462**, read off the source page and
  matching the archive, mounted through the existing `JotformEmbed` client
  component. It sits in a **sticky right-hand column, as on the interview
  pages**, rather than as a band at the foot: on user direction, and it is the
  better place, since a recap this long would otherwise bury the one action
  below five sections of prose. The events template now shares the interview
  template's exact measurements, `lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]`
  with `gap-12 lg:gap-16`, and the aside carries no panel and no heading of
  its own because the embed brings its own framing
- **That aside is now shared.** It previously held only the `facts` list, so
  it is now `facts || jotformId`, stacking both where an event has both. No
  event does yet: this one has a form and no facts, the four programme
  launches have facts and no form
- Alt text for all four photographs was written from looking at each image,
  not guessed from filenames

### The mp4 in the repo root is not this video

`69ebff20daba6852824524.mp4` was checked before being used and is **not** the
roundtable footage: it is 4.5 seconds, 3200x2400, 120fps, silent, and a frame
grab shows the Shinkei landing page. It is the animated-hero design reference,
unrelated to this event, and is still untracked.

### Dropped on user direction

The hero standfirst "Hosted by Zoho and Research NXT at Hilton Mumbai" is
gone, so the hero is breadcrumb and title only. `Event.lede` became optional
and the template omits the paragraph when it is absent; the other seven events
keep theirs. The line was redundant anyway, since the opening paragraph names
both the hosts and the venue a moment later.


The `speakers` band ("Who spoke") is not on this event: the six speakers are
named in the body already. The array was built and then removed, including the
four cross-links to their published interviews in this same programme. The
field stays on the type, and the other events still use it. The "also the
form" instruction was initially read as another removal, which was wrong: the
events templates had never had a form, and what was wanted was the source's
download form added. It is in.

Verified: all five image paths resolve, the body block order was diffed
against the source HTML landmark by landmark, no duplicate redirect sources,
eight modules against eight registry entries, and lint clean.
**Not browser-checked**, so the inline photographs, the LinkedIn embed and the
Jotform are all unrendered. The two third-party embeds are the parts most
worth looking at live.

## Preview article retitled to two lines, 2026-08-07

"AI is the Future, and the Future is Now" was 38 characters, the shortest
title in the Insights band by a wide margin: its four siblings run 56 to 105
and wrap to two or three lines, so this one card sat on a single line and
broke the row's rhythm. It is now:

> AI is the Future, and the Future is Now: A Preview of the Implementor's
> Guide to AI

83 characters, two lines at card width. **The subtitle is not invented copy**:
the live WordPress URL is `…/ai-is-the-future-and-the-future-is-now-a-preview-of-the-implementors-guide-to-ai`,
so this is the source's own framing restored. Chosen by the user from three
options.

- The **URL slug is unchanged**, since a redirect already points at it
- **`metaTitle` deliberately keeps the short form.** 83 characters plus the
  `| Research NXT` template would be truncated in a search result. The
  divergence is commented in the module, and follows the precedent set by the
  Karthik Anantharaman interview, whose title also differs from its `metaTitle`
- `thumbnailAlt` stopped duplicating the title and now reads "Implementor's
  Guide to AI, a preview of the handbook", matching the three sector articles,
  which all describe the edition rather than repeat the headline
- The two cards that carry this title, the report landing's quick reads and the
  `quickReads` array in `content/home.ts`, were updated so no stale copy remains

### "The Four Waves of AI" checked, one word changed

Audited for the same problem and it did **not** have it: at 56 characters it
already wraps to two lines at both the library card width (~394px) and the
home card width (~288px). No consistency fix was needed, and none was
invented. The only genuine nit was "A Ready Guide", which is unidiomatic
outside Indian English, so on the user's pick it is now **"The Four Waves of
AI: A Practical Guide for Business Leaders"**. The article's own body already
calls the whitepaper "a practical toolkit for business leaders", so the word
is the source's.

Changed in the four display strings only (`title`, `metaTitle`, `thumbnailAlt`
and the report landing's quick-read card). **The slug, the redirect
destination and the `.png` filename all still read `…-a-ready-guide-…`** and
must stay that way: the slug is the published URL and the image is named after
it. Seven such path occurrences verified intact.

Lint clean. Not browser-checked, so every two-line wrap here is calculated from
the card widths, not observed.

## Renamed the programme to "Implementor's Guide to AI", 2026-08-07

On user direction the programme slug and its display name change from
"implementer" to "implementor" throughout the site. The live WordPress site
spells it both ways (the microsite headline says "Implementer's", one article
URL says "implementors"), and an earlier entry in this file recorded
"implementors" as the source's typo. That reading is superseded: the user
confirmed "implementor" is the report's name and to ignore the WordPress
spelling.

Renamed, 145 references in all:

- **Slug** `implementers-guide-to-ai` to `implementors-guide-to-ai`, which
  moves three public URL families: the report landing, the 16 interviews under
  `/resources/experts-view/`, and the 5 articles under `/resources/insights/`
- **Directories** `src/content/experts-view/`, `src/content/insights/`,
  `public/insights/` and `public/voices/`, all via `git mv` so history follows
- **Assets** `public/covers/implementors-guide-to-ai{,-card}.png` and the three
  `public/report-sections/implementors-guide-{landscape,strategy,governance}.png`
- **Display copy** every "Implementer's Guide to AI" to "Implementor's Guide to
  AI": the report hero and meta titles, the cover alt, the description line,
  the four sector-article headlines, and both registries' project names
- The `implementersGuideToAI` binding in `resources.ts` follows the slug

**Deliberately not renamed.** Three redirect *sources* in `next.config.ts`
still read `/guide-to-ai/implementers-guide-to-ai-…`, because those are real
URLs on the live WordPress site today; changing them would stop inbound links
resolving. Only the destinations moved. For the same reason `transcripts/` is
untouched: it is a verbatim archive of WordPress source, and the folder
`…-a-preview-of-the-implementors-guide-to-ai` already records the source's own
inconsistency. Entries above this one in this file keep the old spelling
because they are a historical log.

Verified: all 21 relative module imports resolve on disk, all 26 referenced
image assets exist, all 21 content modules carry the new `project` value, both
registries and the landing `slug` agree, and `npm run lint` is clean. **Not
typechecked or browser-checked** (needs permission to run `tsc` or a server).

## Interview cards drop the name-and-company byline, 2026-08-07

On the home page's Experts view band, `featuredInterviews` no longer sets the
"Scott Brinker, HubSpot" style summary; `summary` is now the empty string, so
`ResourceCard` skips the body line entirely (same as the quick-read cards).
The banner artwork already names each person. Cards keep one hierarchy: image,
clamped title, "Read more". Lint clean.

Same treatment for the Featured reports band on user request: `featuredReports`
no longer carries the report lede as the card summary, so both home resource
bands share one card anatomy of artwork, clamped title, "Read more".

Also applied to the `/resources/reports-whitepapers` library on user request:
its cards drop the `report.hero.lede` paragraph and now run cover, clamped
title, "View the report", matching the home cards and the experts-view
library's card anatomy. The ledes still open each report's own landing page.

## Why-band title widened to two lines, 2026-08-07

The "We have been evolving consistently…" heading was capped at `max-w-4xl`,
which wrapped it onto three lines at desktop. The cap is removed so the title
uses the full container and settles onto two lines there; the base `text-wrap:
balance` on headings keeps the two lines even. Narrower viewports still wrap
to three, which is expected. Lint clean; not eyeballed in a browser (no dev
server run).

## Home page consistency audit and fixes, 2026-08-07

A code-level audit of the home page (fonts, spacing, colour, contrast) via the
impeccable skill. Fonts and spacing were already consistent: every band opens
with `SectionHeading` on a `mb-12` gap, both resource grids share `gap-8` and
the card system, and all display type goes through the `.font-display*`
utilities. Four issues found and fixed:

- **Focus rings were invisible on the orange hero.** The hero section carried
  `on-deep`, whose ring colour `accent-on-deep` is 1.42:1 on the orange field.
  New `.on-signal` scope in `globals.css` sets a white ring (3.2:1, clears the
  3:1 non-text minimum); the hero section now uses it. Verified the class swap
  affects nothing else: `on-deep` only controls the focus ring colour
- **Skip link failed AA**: `focus:text-ink` on `focus:bg-accent` was 4.13:1,
  and inconsistent with the system (accent fills carry white everywhere else).
  Now `focus:text-white`
- **Accent token darkened `#0079bf` → `#0073b6`** (user-approved). Small accent
  text (eyebrows, "All reports", "Read more") sat at 4.28:1 on the
  surface-subtle band, below AA. The new value is visually indistinguishable
  and clears 4.5:1 on white, surface and subtle. CLAUDE.md and the token
  comment updated to record the derivation from the logo blue
- **The two view-all links now carry `TrailingArrow`**, matching every other
  accent link affordance on the site; they already had the `group` hover class
  but rendered no arrow

Verified with the impeccable detector (one advisory: the `rule-ticks` dotted
hairline, a false positive, it is the committed brand device, not a grid
background) and `npm run lint`, which is clean. Not verified in a browser: no
dev server was run (needs permission). Known remaining deviations, deliberate:
the interviews band uses raw `bg-white` (commented as intentional), and the
hero question line sets `font-semibold` by hand rather than a display utility.

## Home page now reads from the registries, 2026-08-06

Both resource bands on the home page were hand-maintained lists, and half their
cards still pointed at WordPress. They are derived now.

- **Latest reports** is `latestReports(4)`, a new helper that sorts
  `reportLandings` by a new required `ReportLanding.published` field. All 15
  landings carry a date. Adding a landing updates the band; nothing to maintain
- **Experts view** names four interviews as `[project, person]` pairs resolved
  through `getExpertInterview`, so the title, banner and URL come from the
  registry and a wrong slug fails the build. Chosen for range rather than
  recency: Scott Brinker and David Raab, plus one operator each from the two
  newest programmes
- `FeaturedResource` gained an optional `image`, and `ResourceCard` now renders
  the real cover or interview banner, falling back to the placeholder plate.
  Every card on the home page carries real artwork
- **No WordPress links remain on the home page.** The four `external: true`
  entries are gone; the flag stays on the type for the Resources links that
  still point at WordPress elsewhere

## Redirect gap closed: all 110 interviews now redirect, 2026-08-06

The 58 unredirected interviews are done, and every published interview has a
redirect from its WordPress URL.

Mapping was done by fetching each candidate page and matching the person named
on it against the registry, not by reading slugs, because many of these
WordPress slugs are topic-based. Three cases the automatic match could not
settle, resolved by hand:

- `campaign-management/leveraging-automation-…-higher-education` is Dr Sunil
  Barsaiyan. WordPress writes "Dr." with a stop and the registry writes "Dr",
  so the name match missed
- **Naresh Kumar has two WordPress URLs** carrying the same interview,
  `campaign-management-and-automation-in-2024` and
  `marketing-automation-is-not-just-a-tool-…`. Both redirect to the one page
- **The six `/business-strategy/` pages are the Southeast Asia interviews**,
  slugged by topic. "Digital-First Approach" is Johnny Widodo, "Rise of Self
  Service Platforms" is Walter de Oude, and so on. Slug-based mapping would
  have got every one of these wrong

Also picked up on the way: `bambooreports/transforming-cx-through-gcc-ebook` is
the eBook download page for the GCC CX programme, so it redirects to that
report landing.

The redirect map is now 168 rules, with no duplicate sources.

### Still without a target

- Five Arabic translations under `/customer-experience/` (`-ar` and `-qa`
  suffixes). There are no Arabic pages here to send them to
- `bambooreports/2024-outlook-…-copy`, a variant of the published GCC CX
  outlook article under a different headline. Not the same text, so it was not
  pointed at the published one
- `guide-to-ai/unlocking-the-next-wave-of-growth…`, an August 2025 article, and
  the other unlisted articles noted in the Insights audit below

## Insights audit against researchnxt.com/insights/, 2026-08-06

The `/insights/` listing shows exactly ten articles. `/insights/page/2/` and
beyond return the same ten, so ten is the whole set, not a first page. Nine
were already published; one was missing.

- `ai-led-personalization/artificial-intelligence-what-can-business-professionals-expect-in-2020`,
  published 28 January 2020, filed under the AI Led Personalization programme
  because that is its WordPress category (`ai-led-2020`) and the closing
  paragraph announces that research

Another H1 error on the source page: it reads "From Smart Analytics to Smart
Basket, MarTech at Bigbasket", copied from an unrelated interview. The page
title and the entire body are about AI in 2020, and that is the title used.

### The listing is narrower than what exists

`/insights/` is an Elementor archive with a hand-picked query, not everything
article-shaped on the site. Posts it does **not** list, and which remain
unpublished, include:

- Eight 2016 and 2017 `/blog/` posts predating the research programmes: Game of
  Drones, Predictive Healthcare, Safer Air Travel, Smart Farming, Evolution of
  AI, and two conference recaps
- Six `/business-strategy/` pages from 2021 that read as fragments of the
  published "5 Major Business Rebound Strategies" article
- `campaign-management/redefining-marketing-excellence…`, the January 2025
  roundtable already sitting as a hrefless quick-read card on the ACM landing
- `guide-to-ai/unlocking-the-next-wave-of-growth…`, an August 2025 article
- Three `/sf-ai-interview/` pieces from October 2024

None of these is on the Insights listing, so none was published. Worth a
decision on whether the migrated Insights library should mirror that listing or
carry everything article-shaped.

*(The 58-interview redirect gap recorded here was closed the same day; see
"Redirect gap closed" above.)*

## Success stories audit against researchnxt.com/success-stories/, 2026-08-06

The listing carries five case studies. Three were already published with their
programmes; the two missing ones are now in, and the library is complete.

- `ai-led-personalization/netcore`, the thought leadership campaign that
  produced the first book on AI in marketing during the pandemic. Four
  deliverable tiles, the four research facts, and three quotes: Rohit
  Shrivastav of Netcore plus David Raab and Scott Brinker, both of whom have
  published interviews in this programme, so their expert thumbnails are reused
- `prospect-database/zycus`, five-plus years of prospect data append and
  enrichment. Three deliverable tiles and Preeti Shetty's testimonial

The AI Led Personalization landing now carries a spotlight band pointing at its
story, matching the other four programmes that have one.

### Netcore appears twice, under two different engagements

The 2017 B2C marketing automation campaign and the 2020 AI in marketing
campaign are separate case studies for the same client. Both keep the slug
`netcore`, which is fine because a story slug only resolves inside its project,
and the registry aliases the second import as `netcoreAiLed`, the same way the
interview registry handles people who appear in more than one programme.

### Zycus belongs to no research programme

It is an ongoing prospect data engagement, not a piece of research, so it is
filed under `prospect-database`, the solution it belongs to. That slug is
registered in `insightProjects` without a `reportSlug`, alongside
`industry-events`. Its `facts` array is empty because the source page states no
research focus, geography or timeframe.

### Two source problems worth knowing about

- **The Zycus and 2017 Netcore testimonial cards carry the same quote**,
  "Research NXT is our partner of choice for prospect databases…", attributed
  to Preeti Shetty on one and Kalpit Jain on the other. The wording fits the
  Zycus engagement exactly and fits a thought leadership report poorly, so the
  Netcore attribution looks like the copied one. Both are carried as published;
  worth checking with the clients before either is corrected
- **The 2020 Netcore case study links the same HubSpot document as the 2017
  one** (`view/60024016`). One of the two is almost certainly pointing at the
  wrong file on WordPress. Carried as found

## Events audit against researchnxt.com/events/, 2026-08-06

The WordPress events listing carries seven events. Four were already published
with their programmes; the three missing ones are now in.

- `industry-events/hysea-bizsummit-2020`, HYSEA's first business summit,
  Hyderabad. Research NXT's CEO on the closing 10X marketing panel
- `industry-events/nasscom-martech-confluence-2017`, 31 August 2017, ITC Grand
  Mumbai. Research NXT as Ecosystem Partner
- `industry-events/nasscom-technology-leadership-forum-2019`, 20 to 22 February
  2019, Grand Hyatt Mumbai. Research NXT as Ecosystem Partner

All seven WordPress event URLs now redirect. `/resources/events` lists seven.

### These three belong to no research programme

They are conference participations, not report launches, so they sit under a
new `industry-events` project slug. It is registered in `insightProjects`
without a `reportSlug`, so the breadcrumb names it without linking, the same
arrangement the 2018 ABM programme used before its landing was built.

### Two type changes this needed

- `Event.facts` is now **optional**. The four programme events state a research
  focus, geography and timeframe; a conference participation has none, and
  inventing them would be fabrication. Where facts are absent the template
  drops the aside and the body runs the full width
- `Event.body` now accepts `{ list }` blocks alongside paragraphs, for the two
  NASSCOM agendas. Same shape `SuccessStory.body` already uses

### Source correction

The page at `/events/nasscom-ntlf-thenext` has the H1 "NASSCOM MarTECH
Confluence 2019", which is wrong: the page title, the URL and every line of the
body are about the Technology & Leadership Forum. Published under the correct
name.

### Noted, not an event

The events listing also links **"Redefining Marketing Excellence: Highlights
from the Marketing Automation Roundtable"** (January 2025), which lives under
`/campaign-management/`, not `/events/`. It is an article, and it already
appears as a hrefless quick-read card on the Automation & Campaign Management
landing. It stays unpublished; it belongs in Insights, not here.

## Interview audit against the WordPress sitemap, 2026-08-06

Diffed every `/experts-view/`, `/interviews/` and `/martech/` URL in
`post-sitemap.xml` against the redirect map. 56 source URLs, and the diff found
two real gaps.

### Four interviews belonging to published programmes were missing

None of them was linked from its programme's landing page, which is why the
per-report migrations did not pick them up.

- `avlesh-singh` → State of Consumer Engagement, GCC 2019. The sponsor's own
  interview; he names the GCC study in it, so the programme is not in doubt
- `tanmay-chandresa` → eTutoring Best Practices Whitepaper 2016. Tagged `etwp`
  on WordPress, and eSolve is the whitepaper's sponsor
- `rickard-lawson` (Strossle) and `allison-munro` (Piano Software) → Content
  Marketing Done Right. Same 2019 interview series, and the sidebar on the
  Ranjit Behera page lists Rickard alongside the five the landing does link

The GCC and eTutoring landings now run a one-card experts band each, and the
Content Marketing landing's band goes from five cards to seven. That band is
therefore **wider than the source page's**, deliberately: the two extra
interviews belong to the programme and are published under it, so leaving them
off the landing would hide them.

### Twenty one AI Led Personalization interviews had no redirects

Published with their landing in an earlier session, but their WordPress URLs
were never added to `next.config.ts`, so the old links still served from
WordPress. All 21 added. This was a pre-existing gap, not from the 2026-08-06
migrations.

The redirect map is now 103 rules. After this, exactly one WordPress interview
URL has no target.

### `experts-view/rajesh-pantina-inmobi`, filed on user direction

"Doing Mobile Video Right with Rajesh Pantina, InMobi", 29 May 2020. It carries
no WordPress tags and no landing page links it, so its programme could not be
inferred from the source. Filed under **A Publisher's Guide to Smarter
Monetization** on the user's instruction, which the content supports: one
exchange is entirely about how InMobi enables publishers to monetise their real
estate, ad formats and ad quality.

That landing now runs a one-card experts band, and the `publishers-guide-to-smarter-monetization`
programme is registered in `expertProjects`. Its transcript carries the same
WordPress splice fault as the 2018 ABM and 2017 B2C ones: an answer from the
Meera Iyer Medlife interview, attributed to "Meera", sits under a question
about millennial segmentation. Both the foreign answer and the stray question
are dropped.

**Every WordPress interview URL now has a target: 111 published, 111
redirected.**

## Corporate Gifting 2019 and eTutoring 2016, published 2026-08-06

Two more standalone landings. Neither source page links interviews, articles,
an event or a case study, so both are landing-only, like the publisher guide.

- **Corporate Gifting Trends Report: India, 2019**
  `/resources/reports-whitepapers/corporate-gifting-trends-india-2019`,
  Jotform **83171595973469**. Description plus six highlights
- **eTutoring Best Practices Whitepaper 2016**
  `/resources/reports-whitepapers/etutoring-best-practices-whitepaper-2016`,
  Jotform **81703041906450**. The oldest report migrated. Description only: the
  source page runs no highlights
- Both source pages carry a "Table of Content" band that is **empty on the live
  site**, so there is no contents list to transcribe
- Both cover artworks name a sponsor, GIFTEX on the gifting report and "Sponsored
  By: eSolve" on the whitepaper, but **neither page runs a credit band**, so
  none was invented. Add `credits` to either landing if those sponsorships
  should be stated on the page

## A Publisher's Guide to Smarter Monetization, published 2026-08-06

- **Report landing** `/resources/reports-whitepapers/publishers-guide-to-smarter-monetization`,
  Jotform **200331930902443**, one redirect
- The smallest landing migrated. The source page is a description, two
  highlights and the download form: no interviews, no articles, no event, no
  case study, no facts and no sponsor. The landing carries nothing the page
  does not, so it runs `description` and `highlights` and no other band
- The source highlight reads "$385 Bn billion worth of ad budgets", a doubled
  unit. Corrected to "$385 billion"

## B2C Marketing Automation Report: India, 2017, full programme published 2026-08-06

The largest programme migrated so far. Transcribed from
`/research-report/b2c-marketing-automation-report-india-2017/` and the twenty
pages it links. Programme slug is `b2c-marketing-automation-india-2017`.

- **Report landing** `/resources/reports-whitepapers/b2c-marketing-automation-india-2017`,
  Jotform **81703707306453**. The 2017 microsite runs no highlights list and no
  chapter band, so the landing carries the description, the four facts, the
  eighteen interviews, both spotlight bands and the Netcore credit
- **Eighteen interviews** under `/resources/experts-view/b2c-marketing-automation-india-2017/`,
  covering banking, insurance, mutual funds, lending, grocery, FMCG, media,
  footwear, medical devices and cable, plus four from the Netcore team
- **One event**, the launch webinar of 7 September 2017, and **one success
  story**, the Netcore MQL campaign, which is the microsite's "Client
  Testimonial"
- **Twenty one redirects**, one per source URL
- No articles: this programme published interviews and a webinar, not blogs

### Six of the interviews are video, not transcript

`kalpit-jain`, `kamini-rupani`, `veerchand-bothra`, `anil-menghani`,
`abhishek-gupta` and `meera-iyer` are video interviews on the live site: the
page carries a summary and a biography, and the conversation itself is in the
recording. Those modules carry the summary and biography as `intro`, the
listed topics as `highlights` where the source lists them, and an empty
`exchanges` array. The interview template now skips the transcript wrapper when
`exchanges` is empty, so those pages do not render a stray empty container.

### Six name collisions, the most in any programme so far

Aliased in the registry with suffixed thumbnails, following the
`prasadPimpleKotak` precedent:

- `prasadPimpleHdfcLife`, `meeraIyerBigbasket`, `karthikAnantharamanBpl` are
  disambiguated by company, since the existing records are Kotak Life,
  SkinQ/Medlife and Apollo Hospitals
- `kalpitJainB2cMas`, `abhishekGuptaB2cMas` and `varunKaushikB2cMas` are
  disambiguated by programme instead, because the company does not separate
  them: the existing Kalpit Jain is also Netcore, the existing Varun Kaushik is
  also PolicyBoss, and the two Abhishek Gupta records are Edelweiss Life
  Insurance against Edelweiss Financial Services

### Source corruption

- The Pradeep Dwivedi page repeats one exchange, "Any specific tool that you
  are using for bulk emailing?", twice with an identical answer. Carried once
- This page is also the origin of the stray "Pradeep" answer spliced into the
  2018 ABM Diptarup Chakraborti transcript, which confirms that fix was right

### `spotlight` became `spotlights`

The 2017 microsite points at both its launch webinar and its case study, so the
single band added earlier is now a list. Bands alternate their image side so
two in a row do not read as one block. The three earlier landings each carry a
one-item list; nothing about them changed on the page.

## ABM Best Practices Report: India, 2018, full programme published 2026-08-06

Transcribed from `/microsite/abm-best-practices-report-india-2018/` and the
seven pages it links. Programme slug is `abm-best-practices-report-india-2018`.

- **Report landing** `/resources/reports-whitepapers/abm-best-practices-report-india-2018`,
  Jotform **80661672684465**. Six report highlights, the four research facts, the
  four interviews, the two blogs, the InsideView testimonial and credit
- **Four interviews** under `/resources/experts-view/abm-best-practices-report-india-2018/`:
  `ojas-kulkarni`, `sushant-shetty` (Epsilon, the one `vendor` perspective in
  this set), `diptarup-chakraborti` (Zycus), `satinder-juneja` (LTI)
- **Two blogs** published as Insights: `steps-to-define-your-key-accounts` and
  `how-to-implement-an-effective-abm-strategy`, both carrying Jotform
  **200772027851452**, the same form the leaf pages embed on the live site
- **Nine redirects** added, one per source URL. The leaf pages sat under
  `/martech/`, `/interviews/` and `/blog/`, so they are listed individually

### Source corruption worth knowing about

- **Three of the four interview pages carry the same H1**, "Best Practices to
  Define and Target Your Key Accounts", which is only correct for the Diptarup
  Chakraborti page. Titles were taken from the microsite's own link labels
  instead, which match both the URL slugs and the actual subject of each
  conversation
- **The Diptarup transcript has an answer from a different interview spliced
  into it**, attributed to "Pradeep" and sitting under a stray question about
  drip marketing. Both the foreign answer and the stray question are dropped;
  the surrounding Q and A are restored to their intended pairing
- Two more name collisions, handled the established way: the new interviews are
  aliased `diptarupChakrabortiZycus` and `ojasKulkarniAbm` in the registry, with
  thumbnails at `diptarup-chakraborti-zycus.png` and `ojas-kulkarni-abm.png`.
  The existing Diptarup is at MoveInSync and the existing Ojas at Cedar
  Consulting, so both are genuinely different records for the same people at
  different employers

### The spotlight band replaced the launch band

`ReportLanding.launch` was generalised to `spotlight` before it shipped
anywhere else. It is one band that points at one other page: a launch event via
`eventCard`, or a client success story via the new `successStoryCard`. Both
helpers resolve from their registry and throw on a bad slug.

- Content Marketing Done Right uses it for the NASSCOM launch event
- The GCC 2019 landing now uses it for the WebEngage story, which is more
  accurate than the quick reads rail it was in; that landing runs no rail at
  all now, since the programme published no articles
- The ABM landing uses it for the InsideView story, alongside its own blogs rail

`successStoryCard` takes an optional image override, because a landing that
already runs the testimonial artwork as a voice card should not repeat it in
the spotlight card. The GCC landing passes `webengage-card.png` for that reason.

- **Second success story**
  `/resources/success-stories/abm-best-practices-report-india-2018/insideview`,
  the "Client Testimonial" band from
  `/microsite/abm-best-practices-report-india-2018/`, published from the linked
  `/case-study/abm-case-study/` page. It carries the four facts from the
  microsite, four deliverable tiles, the research aims, three quotes (Sesha Rao
  of InsideView, Diptarup Chakraborti of Zycus, Satinder Juneja of LTI) and the
  external HubSpot case study link
- `SuccessStory.body` now accepts a `{ list }` block alongside paragraphs, for
  the case study's "the research was aimed at" list. The WebEngage story is
  unaffected
- The microsite states its research focus as "B2C", which is wrong for an ABM
  study aimed at B2B marketing leaders, as the case study's own copy confirms.
  Corrected to **B2B** here rather than carried over
- `public/logos/trusted/insideview.png` is cropped from the white logo panel in
  the testimonial card, the same way the WebEngage mark was
- **Still open:** the Zycus and Netcore `/case-study/` pages are not published,
  so `/case-study/` is not redirected as a rule

## Launch event band on the report landings, 2026-08-06

- The Content Marketing Done Right landing carries the "Check out the Launch
  Event" section its source page has, pointing at the NASSCOM MarTech event.
  This started as a `launch` field and was generalised to `spotlight` the same
  day; see the ABM notes above
- The Southeast Asia and AI Led Personalization landings also have published
  launch events, but their source microsites run no such section, so they were
  left alone

## State of Consumer Engagement, GCC 2019, published 2026-08-06

Transcribed from `/microsite/state-of-consumer-engagement-report-gcc-2019/` and
the WebEngage case study it links. Programme slug is
`state-of-consumer-engagement-gcc-2019`.

- **Report landing** `/resources/reports-whitepapers/state-of-consumer-engagement-gcc-2019`,
  Jotform **92538569205465**. The microsite links no articles and no interviews,
  so the landing runs `highlights` and the new `facts` band and no chapter or
  expert band
- **Success stories is now a real library**, not the Phase B placeholder. New
  content model in `src/content/success-stories/`, index at
  `/resources/success-stories`, leaf at
  `/resources/success-stories/[project]/[story]`, both added to `sitemap.ts`.
  The placeholder route `src/app/resources/[slug]/` and the `resourcePages`
  array it read are deleted, since Success stories was the last entry
- **First story:** `/resources/success-stories/state-of-consumer-engagement-gcc-2019/webengage`,
  the "Client Testimonial" band from the microsite published in full. It carries
  the four facts, three deliverable tiles, the WebEngage description, three
  quotes (Avlesh Singh, Shahin Riaz, Devam Saxena) and an external link to the
  full case study, which is a HubSpot document on the live site and stays
  off-site here

### Type and template changes this needed

- `ReportLanding` gained an optional `facts` band, and `quickReads` and
  `expertInsights` became optional. All three are guarded in
  `src/app/resources/reports-whitepapers/[slug]/page.tsx`; the seven existing
  landings are unaffected
- The GCC programme is registered in `insightProjects` despite having no
  articles, because the events and success-story routes resolve a programme's
  display name through `getInsightProject`

### Source oddities and asset notes

- The case study's own headline reads "Event promotion through contextual noise
  and market engagement." on WordPress, which does not parse. It is kept
  verbatim as the story's lede rather than rewritten; worth a copy fix
- The landing's hero cover is `webengage-header-image.jpg` (1599×980), the
  highest resolution mockup on the source pages. `case-study-header.png` is the
  same scene cropped wide and is used for the success story's card on the
  landing, so the testimonial artwork does not appear twice on one page
- `public/logos/trusted/webengage.png` is cropped from the white logo panel in
  the testimonial card; no standalone mark exists on the source pages
- **Still open:** two more `/case-study/` pages exist on WordPress, Zycus and
  Netcore. They are not published, so `/case-study/` is not redirected as a
  rule. Note the published Netcore story came from
  `/b2c-mas-report-india-2017/`, a different page from `/case-study/netcore-case-study/`

## Content Marketing Done Right (2019 programme), published 2026-08-06

Transcribed from the WordPress microsite at
`/research-report/content-marketing-done-right-trends-and-best-practices-report/`
and the thirteen pages it links to. Programme slug is
`content-marketing-done-right`, registered in `expertProjects`,
`insightProjects` and `reportLandings`.

- **Report landing** `/resources/reports-whitepapers/content-marketing-done-right`.
  Runs `highlights` (the five "Report Highlights" labels) and no `expect`,
  because the source page lists findings as short labels with no chapter band.
  No `credits`: NASSCOM was the launch event's partner, not a research sponsor,
  so nothing was invented. Its own Jotform is **90447985712467**, a different
  form from the one every leaf page carries
- **Five interviews** under `/resources/experts-view/content-marketing-done-right/`:
  `ranjit-behera` (BankBazaar), `sooraj-divakaran`, `apurva-chamaria`
  (RateGain), `amit-kapoor` (Cigniti), `gaurav-suri` (UTI Mutual Fund). All
  `buyer` perspective. The interviews and articles take their download form
  from the landing via `reportSlug`
- **Seven articles** under `/resources/insights/content-marketing-done-right/`,
  each carrying Jotform **200772027851452**, which is the form the live pages
  embed. Source titles kept verbatim, including the 2017 omni-channel piece the
  microsite lists alongside the 2019 set
- **One event** `/resources/events/content-marketing-done-right/content-marketing-report-launch`,
  the NASSCOM MarTech Confluence launch on 28 November 2019. The Event type has
  no quotes field, so the two pull quotes on the source page were dropped rather
  than bolted on; the three speakers are carried, with no interview links since
  a speaker slug only resolves inside its own project
- **Fourteen redirects** added to `next.config.ts`, one per source URL. The
  articles sat under three WordPress prefixes (`/blog/`, `/martech/`,
  `/experts-view/`), so they are listed individually
- **Assets.** `public/covers/content-marketing-done-right-card.png` is the
  1200×628 WordPress featured image as supplied. The hero cover is composited
  from it: the tablet mockup lifted onto a flat grey field so the baked-in
  headline and "Download Report" band do not appear twice on the page. The
  live page has no standalone cover artwork
- **Name correction:** the WordPress title reads "Ranjit Behra"; the interview
  banner and the launch event page read "Ranjit Behera", which is what is used
  here, including the asset name
- **Collision:** a different Gaurav Suri (Finlabs India) already exists under
  `implementers-guide-to-ai`. The new thumbnail is
  `public/experts/gaurav-suri-uti.png` and the registry aliases the import as
  `gauravSuriUti`, following the `prasadPimpleKotak` precedent
- The article at `/martech/content-marketing-impacts-seo-strategy` carries the
  wrong H1 on WordPress ("An Insight into RateGain's Content Marketing
  Strategy"). The correct title, the one the microsite links it under, is used
- Verified with `npx tsc --noEmit` and `npm run lint`, both clean. No dev
  server or build was run
- **Still open:** the user mentioned finding "a couple more reports" but
  supplied only this one URL. The WordPress `/research-report/` index renders
  no links to scrape, so the remaining landings need their URLs from the user

## Repository maintenance

- Replaced the Automation & Campaign Management handbook card banner used by `/resources/reports-whitepapers` with the supplied Zoho artwork from `https://researchnxt.com/wp-content/uploads/2024/07/ZOHO-IND.png`, stored locally as `public/covers/automation-campaign-management-card.png` for the existing Next Image pipeline. Verified the downloaded asset is a 1022×552 PNG; no project commands were run
- Renamed the ACM card asset reference to `/covers/automation-campaign-management-zoho-card.png` so Next/browser caches cannot continue serving the previous banner at the old path; the new asset is the same supplied 1022×552 Zoho PNG
- Updated the ACM “Research sponsor” credit to show the Zoho Campaigns and Zoho Marketing Automation logos, with a `+` separator; the Salesforce report retains its single sponsor logo
- Shortened the ACM “Solutions” chapter description to two explicit lines: “Explore functional challenges” and “in multi-channel campaign management”
- Archived the five "quick reads and toolkits" articles linked from the Implementer's Guide report landing, under `transcripts/guide-to-ai-articles/` with the source list `transcripts/source-lists/guide-to-ai-articles.txt`. This is the first archive holding articles rather than interviews, so `transcripts/README.md` gained a section for it. One folder per source URL slug, each with an `article.md` (title, source URL, banner, Jotform id, then the body with its headings, lists and emphasis) and the original Open Graph banner as `thumbnail.png` (1200x628 for the three sector pieces, 1800x942 for the Four Waves, 2560x1340 for the preview). **Each article carries its own download form**, which is why the id is recorded per article: 252512579059463 (preview, the same form as the report landing), 253343061174450 (finance), 253070747406456 (manufacturing), 253342944388466 (retail), 251140437587458 (Four Waves). Bodies were extracted from the fetched HTML between the article `h1` and the "Recent Updates" band, with source-bold paragraphs promoted to headings; checked for page-chrome leakage and for emphasis runs glued to the following word. Copy is kept as written, em dashes and American spellings included, since normalisation belongs at publication. Only `curl` and a local extraction script were run; no project commands, builds, or servers
- **Published the five articles as the Insights library**, so `/resources/insights` is a real page rather than a placeholder. New content module `src/content/insights/` in the same shape as experts-view: `types.ts` (an `ArticleBlock` is a paragraph string with `**` emphasis, a `{ heading }`, or a `{ list, ordered? }`), one module per article, and `index.ts` as the registry, sorted newest first with the title breaking the tie between the two articles that share 2025-12-01. New routes: `src/app/resources/insights/page.tsx`, a paginated 3x2 grid (six per page, `?page=N` clamped to a real page, page 1 canonicalising to the bare path, `rel=prev`/`next`, `aria-current`) mirroring the experts-view library, and `src/app/resources/insights/[slug]/page.tsx`, the article at reading measure with **its own Jotform** in a sticky aside, since unlike the interviews each article has a different form. The banners were copied to `public/insights/<slug>.png`. `insights` was removed from the `resourcePages` placeholder list so the static route owns the URL; the navbar and footer already pointed at `/resources/insights` and now resolve to real content
- Supporting changes for the Insights launch: the five quick-reads cards on the report landing carry `href` and `image` at last, so no card on that page is inert any more; `sitemap.ts` gained the library and the five articles; `next.config.ts` gained five one-by-one redirects from the live `/guide-to-ai/…` URLs (the rest of that prefix is interviews and still has no target, so no prefix rule); and three homepage cards that pointed at WordPress for content we now host are internal links with `external` dropped, which required `FeaturedResource.external` to become optional. **Slug decision:** the four sector and whitepaper articles keep their source slugs verbatim; the preview article was shortened from `ai-is-the-future-and-the-future-is-now-a-preview-of-the-implementors-guide-to-ai` to `ai-is-the-future-and-the-future-is-now`, dropping a tail that also carries the source's "implementors" typo. Its redirect covers the old URL
- The download aside lost its heading, its "Free download, sent straight to your work email." line and its white panel on **both** the insights article template and the interview template, matching the report landing: the Jotform embed now sits directly on the page, still sticky, still `#download`. On the interview page that also drops the sentence naming the project the interview belonged to
- **URL shape changed on user direction, and the rule is now written down.** Articles moved from `/resources/insights/<article>` to **`/resources/insights/<project>/<article>`**, matching the interviews at `/resources/experts-view/<project>/<person>`. `Insight` gained a `project` field, the modules moved to `src/content/insights/<project>/`, and the registry gained `insightProjects` (slug, display name, optional `reportSlug`) with `getInsight(project, slug)` and `getProjectInsights`. The route moved to `app/resources/insights/[project]/[slug]`, its breadcrumb now reads Insights / programme / date and links the report landing, and the sibling band is scoped to the programme. The three sector slugs dropped their redundant `implementers-guide-to-ai-` prefix, since the project already carries it, and images moved to `public/insights/<project>/<slug>.png`. Report landing, homepage, sitemap and the five redirects follow. **The convention is documented in the new "Content URLs" section of `README.md`**, with a pointer from `CLAUDE.md`, since there will be more reports and more landings
- Added the **quote carousel** to the report landing, between the expert insights and the credits band, on user direction. The 16 quote cards were pulled from `researchnxt.com/microsite/implementer-guide-to-ai/`, downscaled from 3494px to 1748px wide with the `sharp` that ships with Next (12MB to 8.7MB), and renamed from the source's person-first-names to slugs under `public/voices/implementers-guide-to-ai/`. Two source filenames are misleading and were resolved by reading the artwork: `RE-Manish-Kumar-1.png` is **Sanjiv Jain** (CIO, Krishna Maruti Group), and `RE-Abhishek-1.png` is Abhishek Gupta. The quote and attribution are baked into the artwork, so `ReportLanding.voices` carries both as text and the component composes them into the alt text; nothing is repeated visibly. The carousel is `src/components/quote-carousel.tsx` and after two rounds of user feedback it is now a **client component**, the site's first outside the navbar, forms and motion pair (CLAUDE.md's list is updated). The rail stays a native scroll-snap container, so swipe, trackpad and keyboard scrolling are the platform's own and a no-JS visit still gets a scrollable row; the script adds the chrome that must know where the rail is: prev/next arrow buttons (disabled at the ends), a **lit current dot** (accent pill) that follows actual scroll position via a rAF-throttled scroll listener rather than the last button pressed, and a hidden scrollbar (`scrollbar-width:none` plus the WebKit pseudo), which was the "gutter" still visible under the rail. One card shows at a time, the whole band is capped at `max-w-3xl` after the user found the cards too big, and `scrollTo` falls back to instant under `prefers-reduced-motion`. **The "In their words" heading is removed on user direction** and `voices.title` was dropped from the type and data; the band now reads as an unheaded breather between the expert insights and the credits, with the carousel labelled for assistive tech instead. **The section title "In their words" is new copy** — the microsite runs these cards with no heading at all
- The quick-reads band became a **horizontal rail** on user direction: one row, four cards in view at `lg` (two at `sm`, one below, widened from three on a follow-up), scrolling for the rest. New `src/components/report-card-rail.tsx`, a client component built with the same grammar as the quote carousel so the page has one scrolling idiom: native scroll-snap rail, hidden scrollbar, prev/next arrows under the row that step one card and disable at the ends (tracked by a rAF-throttled scroll listener plus a `ResizeObserver`, since a resize moves the end), `prefers-reduced-motion` gets instant steps, and a no-JS visit still gets a scrollable row. Card widths are `calc` quarters/halves minus their share of the `gap-8` so exactly N cards sit in view with no partial peek; the arrows carry the scroll affordance. The card markup itself was extracted to `src/components/report-card.tsx` (with `h-full` so rail cards bottom-align), shared by the rail and by `ReportCardGrid`, which shrank to a thin wrapper still used by the expert-insights tabs. CLAUDE.md's client-component list now names the two rails
- **Eighth report landing published: `/resources/reports-whitepapers/ai-led-personalization`**, from `researchnxt.com/microsite/ai-led-personalization-2020/`, the richest of the 2020-21 microsites and the last project without a landing. **Every project now has one.** It runs nine bands: a **"The journey" figure strip** (new optional `ReportLanding.figures`, rendered through `StatsBento` so 180 / 4 / 18 / 300+ count up on the accent feature tile), six **core insights** through the `highlights` list built for Southeast Asia, the launch event as the single quick read, **the interviews grouped by industry segment in a five-tab rail** (Thought Leaders, OTT Industry, E-Commerce & Direct to Consumer, Digital-First Business, Banking & Financials), the client testimonial as a one-card voices band, and Netcore credited under the source's own label "In association with". No Jotform on the microsite, so the landing uses the project's 2020 form (200151888635458), and `expertProjects` swapped its `jotformId` for `reportSlug`, the last of those
- Two notes on that landing. **Kalpit Jain is published but absent from the microsite**, so he is absent from the groups too: 20 cards for 21 interviews, matching the source rather than quietly completing it. And **no Netcore logo exists** in the repo, on the microsite, or as a clean download; rather than invent one, the mark was cropped from Netcore's own co-branded testimonial artwork and checked visually
- **Second event published**: the AI Led Personalization eBook launch at `/resources/events/ai-led-personalization/ai-led-ebook-launch`, with its keynote, fireside chat and two panels as body copy, the fact list, and fifteen speakers of whom thirteen link to their published interviews. Its live URL redirects. Worth recording: **the source page's hero heading is wrong**, reading "Southeast Asia Response Guide - 2021", evidently copied from the other launch page; its own title, fact list and programme are all the AI report, so the archived note flags the error rather than reproducing it
- Browser-verified: landing and event 200, redirect 308, 9 sections, five tab labels correct, 4 journey tiles with the accent feature tile, 6 highlights, 1 quick read, 1 voice card, 20 interview cards, zero failed images
- **Seventh report landing published: `/resources/reports-whitepapers/south-east-asia-response-guide`**, from `researchnxt.com/microsite/business-strategy-2021/`. Structurally the odd one out, and the template grew to fit rather than the content being bent: **no chapter band** but a ten-item **"Report highlights"** list (new optional `ReportLanding.highlights`, rendered as a two-column tick list, since the source gives bare labels and padding them into cards would fake a depth they do not have); **two sponsors** under the source's own label "Brought to you by" (Linkedpreneur and beyond99, through the existing `logos[]` shape); quotes carried as **text beside speaker photographs** rather than as baked cards, so the voices band reuses the interview thumbnails already in `public/experts/`; and a **launch event sitting in the quick reads** beside the two articles. No Jotform on the microsite, so the landing uses the project's 2021 form (211602133570442), and `expertProjects` swapped its `jotformId` for `reportSlug`
- **Events is a real library now**, which the Automation & Campaign Management roundtable had been waiting on. New `src/content/events/` (types, one module per event, registry with `getEvent`/`eventHref`), `/resources/events` as a card grid, and `/resources/events/[project]/[event]` for the event itself: breadcrumb with the programme and date, banner, and the source's own fact list (research focus, format, geography, timeframe) in a sticky aside, then a "Who spoke" band where each speaker **links to their published interview** when one exists, which all six here do. `events` came out of the `resourcePages` placeholder list, leaving only Success stories; the sitemap gained the library and the event. An event carries no invented prose: this source page has none, and `body` is optional
- Both quick reads published: "5 Major Business Rebound Strategies" and "Key Takeaways from The Best of Business Strategies", archived under `transcripts/business-strategy-articles/` with redirects. **Both are pure infographic**, a title and one 800x2000 PNG with no body copy whatsoever, so both are rebuilt as `points` blocks. The `points` block gained an optional `items` array for this: the takeaways infographic stacks three or four short lines under each heading rather than writing a sentence, and flattening those into prose would have invented connective tissue. Also deduped the date formatter into `src/lib/date.ts`, since the insights article page and both event pages needed the same one
- Browser-verified: seven landing routes plus the events library and event page all 200, three redirects 308, landing shows 7 sections with 10 highlights and no chapter band, 3 quick reads (two articles and the event), 6 quote slides, 6 interview cards, 2 sponsor logos, zero failed images; event page renders breadcrumb, facts aside and speakers
- **Sixth report landing published: `/resources/reports-whitepapers/cloud-computing-new-normal-beyond`**, from the 2021 microsite. That page's body copy is **baked into images**, so nothing usable could be scraped, and an earlier pass filled the gap with copy written from the article text: a description, and a "What to expect from the report" band of three chapters. **Both were inventions and both are gone.** The description is now the user's verbatim copy, and the chapter band is removed entirely, which made `ReportLanding.expect` optional; the other five landings still carry theirs. It carries no Jotform, so the landing uses the project's 2021 report form (211600107593446).
- The offer band went through two reworks on user direction (impeccable). The first cut floated a centred headline over three disconnected tick cards; a second pass made it a white plate with the promises as ruled rows. Then the user shared a screenshot of **the original microsite band, a four-cell colour strip with icons**, and the final version honours that structure in the site's grammar: **the StatsBand bento strip**, sponsor on the accent feature tile (white bar device, label, and the mark's **white variant**, `motherson-mind-white.svg`, the same Brandfetch `theme/light` file that was earlier wrongly used on the light credits band, now on the surface it was made for) and each promise on a quiet bordered tile under a **drawn line icon**: heads in conversation for consulting, a checked cloud for the assessment, a ticket for the waiver. The icons are three inline paths in the house stroke (`OfferIcon` in the landing template), not an icon library. `offer.items` became `{ icon, text }` with a typed icon name. Verified rendered at 1440: accent tile, white mark, three icons and promises all correct. Dev server left running at the user's request
- What that microsite has instead is an **"*Exclusive offer from" band**, now a new optional `ReportLanding.offer` (label, sponsor mark, items): MIND's three promises to readers, quoted rather than paraphrased since they are the sponsor's commitments. It renders as a centred label with the MIND mark beneath and the three items as tick-led cards, in the band position the chapters used to hold This closes the last `jotformId` in `expertProjects`: **all six projects with landings now resolve their form through one**. Chapter cards here carry **no illustrations** (the microsite has none to lift), which the template already handled since `expect.sections[].image` was optional. Sponsor is the user-supplied Motherson/MIND SVG; card banner is the user-supplied `image-4-1`. Three interviews, single group, no quote cards, so no voices band
- **All three quick reads published**, archived under `transcripts/cloud-computing-articles/` with redirects from their live `/cloud-computing/` and `/blog/` URLs. **The interesting part: two of them are almost entirely one tall infographic** (1024x2560 JPEG). Rather than ship a flat image nobody can select, search, translate or read on a phone, `ArticleBlock` gained two kinds: **`figures`**, which renders through the site's existing `StatsBento` tiles (so the counts animate with `FigureValue` like the About and solution pages), and **`points`**, a `dl` of named trends. "Top 5 Cloud Computing Trends" is now 8 live stat tiles (80/29/33/28 and the 41/25/11/23 market-share split) plus a heading and source line; "Top 5 Cloud Adoption Trends" is 5 named points. The source JPEGs stay in the archive as `infographic.jpg` and are transcribed in the archive markdown too
- **The Motherson mark was invisible and the check that passed it was wrong.** Brandfetch's `theme/light` variant is the mark *for* light-on-dark use: solid `#FFFFFF`, so it rendered white on the white credits band. The user caught it and supplied `theme/dark`, which is Motherson red `#DA2020`, now installed. The canvas probe used earlier only counted non-transparent pixels, which a white logo passes perfectly, so **the probe was replaced with one that composites onto white and counts pixels differing from the background**. Re-audited all six sponsor marks that way: motherson 4,125 ink pixels, salesforce 4,118, routematic 4,853, zoho 2,910, zoho-crmplus 3,511, bamboo 3,320. All genuinely visible on a light surface. Any future logo needs this check, not an alpha count
- Browser-verified: all six routes 200, three redirects 308, the rebuilt infographics render (8 stat tiles with correct values; 5 `dt`/`dd` pairs), landing shows 7 sections, 3 quick reads with no arrows, 3 interview cards, zero failed images. The Motherson SVG again measured 0x0 until forced eager (lazy, below fold) and paints 4,570 opaque pixels. Also removed `public/covers/automation-campaign-management-card.png`, a byte-identical orphan left over after the user renamed that card to `-zoho-card.png`
- **Fifth report landing published: `/resources/reports-whitepapers/transforming-cx-through-gccs`**, from `researchnxt.com/bambooreports/transforming-cx-through-gcc-ebook/`. This one is **an eBook landing, not a research microsite**, and differs in four ways worth knowing: it carries **no Jotform at all** (so the landing uses the eBook's own form id 241762483249463, which `expertProjects` had been holding), **no quote cards** (so the landing has no voices band, the first without one), its chapter icons are **SVGs** (rasterised to PNG with sharp at density 300, since the chapter `Image` does not pass `unoptimized`), and its "This E-book will acquaint you with" bullets stand in for the chapter band, which is why that band's title differs from the other four. Sponsor is the user-supplied Bamboo Reports SVG under the label "Brought to you by", which is what the source page calls it. Assets: mockup cover, user-supplied `Group-1-100-1` banner as the library card. Four interviews, single group, so the plain grid. This closes the last `jotformId` TODO in `expertProjects`; every project now resolves its form through a landing
- **The quick read is published** on user direction: "2024 Outlook on Maturing Digital CX and the Role of Indian GCCs", archived under `transcripts/bambooreports-articles/` and live at `/resources/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024`, with its live URL 308ing there. The source page ends at a "Research NXT offers custom engagement solutions" band rather than the usual "Recent Updates", so extraction was bounded on that; the extractor also over-promoted two long paragraphs to headings (a `:`-suffix heuristic), which was corrected by hand during transcription. Tense fixed as with the other launch pieces: the source says the eBook is "in the process of" being crafted
- Browser-verified: all four routes 200, redirect 308, 6 sections (no voices band), 4 interview cards, 1 linked quick read, 3 chapter icons, zero failed images among 10, Bamboo mark renders 111x48
- **Fourth report landing published: `/resources/reports-whitepapers/navigating-corporate-commute-for-gccs-in-india`**, transcribed from its microsite, so all five 2024-25 microsites now have a landing except none remaining. Form: the "[RM]" Jotform 260490193043452, and `expertProjects` swapped its `jotformId` for `reportSlug`, closing the last of those four TODOs. Assets: tablet mockup as cover, the user-supplied `Group-4-7` banner as the library card, three chapter icons as `report-sections/gcc-*.png`, and five quote cards (2560x1014 here, not the usual 3494x1384) read off the artwork into `voices/navigating-corporate-commute-for-gccs-in-india/`. Sponsor is the user-supplied Routematic mark, downscaled from 1920px to 600px. Single expert-insights group, so the plain grid rather than a tab rail
- **The quick read is published** on user direction: "Rethinking the Daily Commute: Why Unified Mobility Is Becoming a Strategic Priority for GCCs in India", archived under `transcripts/gcc-commute-articles/` and live at `/resources/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute`. **Its leaf slug is shortened to the first clause**: the source slug runs 99 characters and would have made a URL nobody could read or share, and the full live URL redirects to it. Same pre-launch copy repair as the other two launch pieces, flagged: the source calls the report "upcoming" and ends on "Stay Tuned for the Official Launch!", so those lines are present tense and the launch heading is dropped
- Browser-verified: all five routes 200, redirect 308, 8 sections, no tab rail, 5 interview cards, 1 linked quick read with no arrows, 5 quote slides, zero failed images among 16. The Routematic sponsor mark initially measured 0x0 and looked broken; it is `loading="lazy"` and simply sits below the fold, and rendered 193x48 from its 600x149 source once forced eager. Worth remembering before filing a lazy image as a defect
- **Third report landing published: `/resources/reports-whitepapers/unlocking-the-power-unified-cx`**, transcribed from the English face of `researchnxt.com/microsite/unlocking-the-power-of-unified-cx/` (the microsite's Arabic toggle and Arabic edition are not carried; note the live slug has "of", ours matches the project slug without it). Form: the "[Z QA]" Jotform 250201862296454; `expertProjects` swapped its `jotformId` for `reportSlug`, closing that TODO, so the five interview pages now take the form from the landing. Assets: tablet mockup as cover, three chapter icons as `report-sections/ucx-*.png`, five quote cards read off the artwork into `voices/unlocking-the-power-unified-cx/`. The library `cardImage` is the user-supplied `ZOHO-MEA` "Power of Unified CX / Download Now" banner, matching the other two landings' card artwork (it was briefly the article banner until the user sent the real one). The user confirmed the slug without "of" and that the Arabic edition stays out. One quote card names Harshil Shah's company as **Lals Group** while his published interview says LTC International Qatar (LTC is a Lals Group business); the voices data carries what the artwork says
- Template growth for this landing: **a single expert-insights group now renders as a plain card grid** rather than a one-tab rail, since this microsite lists its five interviews flat; and the sponsor credits use the user's dual-shape (`logo` or `logos: {name, logo}[]` with a "+" separator, a shape the user had hand-built for the ACM landing's Campaigns + Marketing Automation marks while this session ran). This landing's credits carry the user-supplied **Zoho wordmark SVG (Wikimedia) plus the Zoho CRM Plus product SVG**, saved locally as `logos/trusted/zoho.svg` and `zoho-crmplus.svg`, both checked for external refs and scripts (clean, namespaces only). Screenshot capture kept failing this session, so the SVGs were verified by canvas paint probe: both rasterise thousands of opaque pixels, same order as the known-good Salesforce mark
- **The quick read is published**: "Unified Customer Experience: The Next Frontier for Businesses in Qatar" archived under `transcripts/customer-experience-articles/` and live at `/resources/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar` on user direction, with its live URL 308ing there and the landing card linked. Same pre-launch copy repair as the Four Waves article, flagged: the source announces the report as "in the making" and closes with "Stay Tuned for the Official Launch!", which reads false beside a live download form, so those lines are present tense and the launch heading is dropped. Browser-verified: all routes 200, redirect 308, 8 sections, no tab rail, 5 interview cards, single centred quick read with no arrows, 5 quote slides, zero failed images among 17
- Fixed the tab rail scattering the user saw on the ACM landing: the labels sat in grid rows 1-4 while the panel spanned every row, so a tall panel (10 cards, ~1,125px) stretched the label rows apart and flung "Marketing Automation and CRM" and the rest to the bottom of the band. The grid now declares `lg:grid-rows-[repeat(6,auto)_1fr]`: the labels take content-sized rows and the empty `1fr` filler row absorbs all the panel's extra height, so the rail stays clustered at the top. Verified on the dev server: label gaps 64/44/64px (two-line labels 64, one-line 44), cluster 228px tall beside an 1,149px panel, tab click still swaps panels (10 cards, 3 columns). Screenshot capture kept landing mid-composite this session, so verification is by measurement
- Two layout fixes on user direction, plus the defect the first one exposed. **The quick-reads rail hides its arrows and centres the cards when the row already fits** (the ACM landing has only two), measured rather than counted, since how many fit depends on the breakpoint. **The expert-insights tabs moved from a centred row to a left rail at `lg`**: the ACM group names are full phrases ("Personalisation and Customer Engagement") and four of those wrapped into a ragged centred row. The rail gives each name one line and a shared left edge, with the active one marked by the same signal bar as the nav turned on its side; below `lg` it stacks above the cards. Implemented as one CSS grid with explicit row/column placement, since `peer-checked` needs the inputs, labels and panels to stay siblings. `ReportCardGrid` dropped from four columns to three, because it now sits beside the rail rather than across the container
- **The defect:** centring the rail made it stop reporting overflow. `justify-content: center` on an overflowing scroll container collapses `scrollWidth` to `clientWidth`, so the measurement that decides whether to centre fed back on itself and a five-card row lost its arrows. Overflow is now measured from the cards' own widths plus the gaps, which no justification can distort. Confirmed after the fix: 5 cards at 268px in a 1168px rail, `justify: normal`, arrows present with Previous disabled at the start; 2 cards centred with no arrows
- **QA notes from that pass.** Verified at 1536px on both landings: tab labels all share one left edge at 240px wide, clicking the fourth radio shows the fourth panel with its 6 cards in a 3-column grid, no failed images. **Two things went wrong with the tooling and are worth recording**: a stale `next dev` process kept serving port 3000 and produced several minutes of misleading measurements, so kill by `next-server` and confirm the port before trusting a QA reading; and screenshot capture on the Salesforce landing repeatedly froze the renderer (30s CDP timeouts), most likely the 16 quote PNGs plus 30-odd card images all being optimised on the fly in dev. **Not verified: the narrow-viewport layout.** Chrome would not resize the window below about 500px this session, so the stacked tab rail and single-column rail are source-level only
- Handled the three quick reads on the Automation & Campaign Management landing, which had only ever had their banners pulled, never their text. Both remaining articles are archived under `transcripts/campaign-management-articles/` with the source list `transcripts/source-lists/campaign-management-articles.txt`; they carry no article `<h1>` of their own, so the extractor bounded the body by the last nav item and the "Recent Updates" band rather than by a heading. Outcomes per the user: **"Automate, Target, Win in 2024" is published** at `/resources/insights/automation-campaign-management/automate-target-win-in-2024` (the first insight outside the Implementer's Guide, so `insightProjects` gained the ACM programme), with a redirect from its live `/campaign-management/…` URL and the landing card now linking to it; **"Campaign Management and Automation in 2024" was dropped entirely** as a duplicate of Naresh Kumar's published interview, and its GIF banner deleted; and **"Redefining Marketing Excellence" is archived but not published**, since the user wants it under Events, which is still a placeholder with no route. Its card keeps the banner without a link until that page exists
- The ACM landing's `cardImage` swapped to the user-supplied `ZOHO-IND.png` "Campaign Management / Download Now" banner, which matches the other landing's card artwork; the tablet mockup stays as the hero `cover`
- **Second report landing published: `/resources/reports-whitepapers/automation-campaign-management`**, transcribed from `researchnxt.com/microsite/automation-campaign-management-for-functional-experts/`, so the template now drives two reports. Form: the "[Z IND] Report Download" Jotform 243521499246462 the project already carried. Assets pulled from the microsite: the tablet mockup as `covers/automation-campaign-management.png`, the dark team photo as the library `cardImage`, the three chapter icons as `report-sections/acm-*.png`, the three quick-read banners (one is a GIF), and **18 quote cards** downscaled to 1748px into `voices/automation-campaign-management/`, named for the person rather than the source's first-name filenames. All 18 quotes were read off the artwork for alt text, as with the Salesforce set
- Two structural notes on that landing: its expert-insights groups are **themes, not maturity stages** ("Personalisation and Customer Engagement", "Marketing Automation and CRM", "Data-Driven Marketing and Analytics", "Content Strategy and Campaign Management"), which is how the microsite tabs them, and an interview appears under every theme it covers, so the same card shows up in more than one group (32 cards over 19 interviews). The groups are declared as **person slugs** run through a new `interviewCard()` helper that reads the title, href and thumbnail from the experts-view registry, so the cards cannot drift from the interviews and a typo throws at build rather than rendering a dead card. `resources.ts` now imports from `content/experts-view`, which is safe: nothing under experts-view imports resources
- With the landing built, **`expertProjects` for `automation-campaign-management` swapped its `jotformId` for `reportSlug`**, which is exactly the TODO that entry carried; its 19 interview pages now take the download form from the landing. The three quick reads are WordPress articles not yet transcribed into `content/insights`, so those cards carry their banners but no link, the same interim state the Implementer's Guide cards were in
- Verified in the browser (dev server, 1440 wide): both landings 200, the new page renders all seven bands, 4 theme tabs, 32 interview links, 18 quote slides, 3 quick reads, zero failed images among 58, and the library page shows both report cards with their banners. Dev server stopped after the pass
- **First browser QA of the report landing** (impeccable polish, dev server run with the user's permission, checked at 1440 and 502 wide; Chrome's window minimum blocked a true 390 pass). Verified working: hero pair with the live Jotform, justified description at measure, three chapter cards level, the quick-reads rail stepping exactly one card with arrows disabling at both ends, all four expert-insights tabs switching, the quote carousel's arrows, dots and lit-dot tracking (confirmed programmatically: scrollLeft and `aria-current` agree after both arrow and dot navigation), and the credits and footer. Several alarming screenshots turned out to be `html { scroll-behavior: smooth }` mid-animation captures, not defects; zero console errors; no failed images. Three real defects found and fixed: the Salesforce sponsor mark rendered tiny beside the wordmark because height-capping starves its nearly square aspect (now `h-12` in an `h-14` box, confirmed balanced in a second render); and the quote and card images shipped full-width variants because neither carried `sizes` (the quote rail now declares its 48rem cap, the cards their four-across width). Dev server stopped after the pass
- **`/resources/reports-whitepapers` is now a real library page** on user direction: PageHero plus the same card grammar as the insights library, one card per entry in `reportLandings`, currently just the Implementer's Guide. The card uses a new `ReportLanding.cardImage` field, `public/covers/implementers-guide-to-ai-card.png` (the 1024x553 banner the user supplied from WordPress), because the hero `cover` is an upright mockup that crops badly to a card plate. `reports-whitepapers` came out of the `resourcePages` placeholder list, and the index route joined the sitemap. Rendering confirmed in the same QA session
- **One copy edit to flag in the Four Waves article.** The source was written before the Implementer's Guide launched, so it called that report "upcoming" and invited readers to "pre-register" for it. Published beside a live download form that would read as false, so the sentence is now present tense and the pre-register paragraph is dropped. Nothing else was rewritten: the rest is the source copy with em dashes converted to house punctuation and the decorative italics dropped, the same normalisation the interviews get. Lint, `tsc --noEmit` and the impeccable detector are clean; **no browser check, no build, no dev server**
- Added the previously missing Apollo Hospitals interview to `transcripts/sf-interview-transcript/` with the complete 10-question Q&A, source URL, and original 1280×720 Open Graph thumbnail. Added its URL to `transcripts/source-lists/sf-interview-links.txt`; the Salesforce archive now has 16 interview directories/32 files matching the 16 links rendered by the live Implementer’s Guide microsite. Verified transcript word count, image metadata, source-list membership, and `git diff --check`; no project commands, tests, builds, or servers were run
- Added the AI-Led Personalization 2020 interview archive under `transcripts/ai-led-personalization-2020/` and its source list at `transcripts/source-lists/ai-led-personalization-2020-interviews.txt`. The microsite's Journey counters claim 22 interviews, while its rendered library exposes 20 unique `/experts-view/` links (three thought leaders and 17 marketing leaders); all 20 rendered interviews were archived. Subsequently added Kalpit Jain's valid but unlinked interview, likely accounting for one of the counter's two missing entries. Because the page has no Open Graph image metadata, its original 1200x627 in-article Kalpit Jain banner is used as `thumbnail.png`. The archive now contains 21 directories/42 files, 21 valid images, 21 source links, retained interview dialogue in every transcript (including older pages with plain questions or malformed source emphasis), and zero page-chrome leakage. No project commands, tests, builds, or servers were run
- Added the `transcripts/south-east-asia-response-guide/` archive for the six supplied Business Strategy interviews and the source list `transcripts/source-lists/south-east-asia-response-guide-interviews.txt`. Each slug-named directory contains a structured `transcript.md` and the original Open Graph JPEG banner as `thumbnail.jpg` (five at 1280x720 and the Last-Mile Delivery banner at its source-provided 1024x576). These older pages render most questions as plain paragraphs, so completeness was verified through non-empty named-speaker answer blocks in every transcript rather than bold question headings. Confirmed six directories/twelve files, valid JPEG metadata, source links, and zero page-chrome leakage. The authoritative `business-strategy-interviews` WordPress tag contains exactly these six posts, so none are missing. No project commands, tests, builds, or servers were run
- Added the `transcripts/cloud-computing/` archive for the three supplied cloud-computing interviews and the source list `transcripts/source-lists/cloud-computing-interviews.txt`. Each slug-named directory contains a structured `transcript.md` and the original 1200x630 PNG banner as `thumbnail.png`. Verified three directories/six files, valid PNG metadata, source links and non-empty Q&A in all transcripts, and zero page-chrome leakage. Audited the live WordPress `cloud-computing` tag: its other two posts are standalone trend articles, so the three supplied pages are the complete interview set. No project commands, tests, builds, or servers were run
- Added the `transcripts/routematic/` archive for the five supplied GCC Commute interviews and the source list `transcripts/source-lists/routematic-interviews.txt`. Each slug-named directory contains a structured `transcript.md` and the original 1280x720 JPEG banner as `thumbnail.jpg`. Verified against the authoritative WordPress `routematic-interview` tag, which contains exactly these five posts; confirmed five directories/ten files, valid JPEG metadata, source links and non-empty Q&A in every transcript, and zero Recent Updates/navigation/form/footer leakage. No project commands, tests, builds, or servers were run
- Added the `transcripts/gcc-transforming-customer-experience-through-gccs/` interview archive for the four supplied Bamboo Reports digital-CX interviews, plus the source list `transcripts/source-lists/gcc-transforming-customer-experience-through-gccs-interviews.txt`. Each slug-named directory contains a structured `transcript.md` and the original 1280x720 Open Graph banner as `thumbnail.png`. Verified four directories/eight files, valid PNG metadata, source links and non-empty Q&A in all four transcripts, and zero Recent Updates/navigation/form/footer leakage. Audited the live WordPress `digital-cx` tag: it contains these four `buyer`-tagged interviews plus one standalone outlook article (`indian-gccs-digital-cx-outlook-2024`), so no interview was omitted. No project commands, tests, builds, or servers were run
- Added a separate English-only Zoho Qatar interview archive. Created `transcripts/source-lists/zoho-qatar-interviews.txt` with the five supplied English URLs and `transcripts/zoho-qatar-interview-transcript/` with five slug-named directories, each containing a structured `transcript.md` and the original 1920x1080 Open Graph banner as `thumbnail.png`. The live English pages link to separate Arabic routes; extraction now starts at each English `<h1>`, excluding the preceding Arabic language-switch link. Verified against the authoritative WordPress `qatarcx-interview` tag, which contains exactly the same five English posts; all five transcripts have source links and non-empty Q&A, all five images are valid PNGs, and there are zero Arabic Unicode/language-switch, navigation, form, Recent Updates, or footer matches. The set comprises four `buyer`-tagged pages and one `vendor`-tagged page. No project commands, tests, builds, or servers were run
- Audited the complete live WordPress `zohorbm-interview` tag through the REST API and reconciled it against both `transcripts/source-lists/zoho-interviews.txt` and `transcripts/zoho-interview-transcript/`. The tag contains 19 posts; the earlier archive had 17. Added the two omitted source URLs and archives: Naresh Kumar's vendor interview, “Marketing automation is not just a tool for efficiency but a driver of business success” (1920x1080 banner), and Anju Singh's buyer interview, “Crafting Authentic Digital Strategies in Higher Education” (1280x720 banner). The reference file now has 32 rows representing all 19 unique tagged interviews, and the archive has 19 directories/38 files. Verified exact set equality across the live tag, unique reference slugs, and archive folders; 19 valid PNGs, 19 source links, non-empty Q&A in every transcript, and zero navigation/form/Recent Updates/footer leakage. No project commands, tests, builds, or servers were run
- Archived all 15 Salesforce interview URLs listed in `transcripts/source-lists/sf-interview-links.txt` under `transcripts/sf-interview-transcript/`, with one slug-named directory per interview containing a structured `transcript.md` and the page's original Open Graph thumbnail as `thumbnail.png`. The Markdown retains the title, source URL, thumbnail link, introduction, highlights, pull quote, and complete Q&A while excluding site navigation, the download form, Recent Updates, and footer chrome. Verified 15 directories/30 files, valid PNG metadata for every image (1280x720 or 1920x1080), non-empty Q&A in every transcript, and zero excluded-chrome string matches. No project commands, tests, builds, or servers were run; the temporary extraction inputs/scripts remain outside the repository in `/tmp` only
- Added `netlify.toml`, Netlify's recognized repository configuration format, with `npm run build`, the `.next` publish directory, and Node.js 20 for the Next.js 16 deployment runtime; verified by source and diff inspection. No build or deployment was run because project commands require explicit permission
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

- Reverted the proposed three-perspective reorganisation of `/resources/experts-view` after visual/product review. Restored the original Implementer's Guide project heading, paginated six-card grid, page-aware metadata/canonical URLs, and previous interview data shape; removed all temporary buyer/thought-leader/vendor classification fields. Verified with `npm run lint` and `git diff --check`, both clean. The Salesforce and Zoho transcript archives were not affected
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
- Revamped the shared solution-page template (`/solutions/prospect-database`, `/solutions/account-intelligence`, `/solutions/research-based-marketing`): the hero is now a slim light band (`spacing="tight"`, white surface, bottom hairline) with no navy and no `DataPlate` image placeholder, ready to take a background image later; the existing CTA buttons remain (a "Solutions" eyebrow was trialled and then removed as redundant; the hero opens directly with the headline unless a page supplies its own `hero.eyebrow`). The capability grid gained per-card stroke icons (new `src/components/ui/capability-icon.tsx`, nine glyphs referenced by an `icon` name on each capability in `content/solutions.ts`) rendered as accent-blue chips, and uses CSS subgrid (`grid-rows-subgrid row-span-3`) so icon, title and points rows share baselines regardless of how many lines a title wraps to (fixes the misaligned ICP Assessment column). Column count now matches item count (2/3/4) so the three-item research page no longer leaves an empty fourth column. The outcome statement stays mid-page (hero → proposition → outcome → capabilities, per user direction) as a light muted band at `spacing="tight"` (py-12/16, reduced from the default py-20/28 after feedback that the band was too tall; navy was explicitly rejected here too): the "X = Y" copy is split on the equals sign and drawn with an orange two-bar equals mark (full sentence kept for screen readers). Per follow-up feedback the band has no "The outcome" label and no CTA button, and the statement renders on a single line at desktop widths via the same viewport-clamped type treatment the old template used (`lg:flex-nowrap` + `text-[clamp(1rem,1.65vw,2rem)]`), wrapping only below `lg`. Capability titles may now carry a chosen `"\n"` break (rendered via `sm:whitespace-pre-line`, collapsing to a space in the mobile single column) so short titles match their neighbours' two-line rhythm: applied to the three research-page titles ("Thought Leadership Content", "ABM Campaigns", "Targeted Leads Campaigns") and to the prospect page's "Net New Append & Account Coverage" (breaking before the ampersand so "&" opens the second line). On the prospect page, per user direction the short "ICP Assessment" title was instead expanded to "ICP Assessment & Market Sizing" (reflecting its market-data-availability points) so it wraps to two lines naturally rather than via a forced break. Removed the now-dead `beforeCapabilities`/`singleLine` outcome flags and the unused `cta` field from `SolutionPage` types/content.
- Restored the old WordPress heading structure on the solution pages per a user-supplied screenshot: proposition and capabilities titles now carry a `**`-marked key phrase (in `content/solutions.ts`) rendered in the brand-blue accent by an `accentedTitle()` helper in the template, standing in for the old site's orange headline phrase (orange fails contrast as text, so it moved to a short `bg-signal` rule instead). The proposition section changed from the side-by-side claim/evidence grid to the old stacked structure: two-tone headline, short orange rule, then the paragraphs. The section runs the full container width per follow-up feedback (the initial `max-w-3xl` / `max-w-[68ch]` constraints were removed), and the same was then applied to the hero copy block and the capabilities heading/body (their `max-w-3xl` / `max-w-[68ch]` caps removed too). `SectionHeading`'s own internal 64ch lede measure still applies where that component is used, as it is a sitewide component default. Added an opt-in `proposition.singleLine` flag (used by the account-intelligence page) that keeps the proposition title on one desktop line via `lg:whitespace-nowrap` and `lg:text-[clamp(1.25rem,2.5vw,2.125rem)]`; the estimate says the 64-character title fits at the 34px cap inside the 78rem container, but this is sized by arithmetic, not a browser check, so verify visually and nudge the clamp cap down if it clips.
- Removed the "What you get" eyebrow from all three capability sections per user direction; the sections now open directly with the two-tone title. The hero eyebrow was already gone, so neither remaining band on these pages uses the eyebrow device
- Retired the `/solutions` hub page at user request: deleted `src/app/solutions/page.tsx`, removed the `href` from the navbar "Solutions" group (the navbar already supports label-only dropdown groups; the four solution links remain in the dropdown and footer), dropped `/solutions` from the sitemap, and deleted the now-orphaned `solutionsHub` content export. An initial `/solutions` → `/` redirect was later removed so the retired URL now uses the branded 404; the `/solutions/[slug]` pages are unaffected.
- Added a light brand-colour gradient to the three solution-page heroes as a stand-in until real background images land: new `.hero-wash` utility in `globals.css` (declared entirely from tokens: a 115° `accent-soft` → `surface` base, a soft `plate`-blue radial in the lower-left, and a 12% `signal`-orange radial in the upper-right corner via `color-mix`), applied on the hero `Section` in the solution template. The wash is deliberately faint so ink text keeps AA contrast; declared later in the utilities layer than Tailwind's `bg-surface` so its `background` shorthand wins. Verified with `npm run lint` (clean); the gradient's rendered strength needs a browser look
- Trialled the two-tone headline device on the homepage hero and reverted it at user request; the home headline is back to plain ink with no `**` markers. The refactor survives: `accentedTitle()` now lives in shared `src/components/ui/accented-title.tsx` and the solution template imports it from there. Verified with `npm run lint` (clean)
- Lightened the rotating hero questions after feedback they were too bold: `font-display-soft` (weight 700, display optical size) was first dropped to `font-medium` (500), then settled on `font-semibold` (600, body optical size) after 500 read too thin; size stays `text-title`. The first question now carries a chosen `"\n"` break after "leads" ("Is the quality of your marketing leads / impacting revenue?") and the third after "impacting" ("Is a bad prospect database impacting / marketing ROI?"), honoured from `sm` up via `sm:whitespace-pre-line` and collapsing to a space in the narrow mobile column. The second question has no chosen break. Verified with `npm run lint` (clean)
- Revamped `/about` and `/careers` in the solution-page style, using the user's freshly updated content in `content/about.ts` / `content/careers.ts` (careers now has two openings with `slug`/`title`/`summary` only; the `JobOpening` type was already slimmed accordingly). Both pages dropped the deep-navy `PageHero` for the same slim `hero-wash` light hero band (`spacing="tight"`, bottom hairline, no image plate, background-image-ready). Every major section now opens in the proposition style: headline rendered through the shared `accentedTitle()` (no `**` markers set yet, so titles render plain until content adds them) over the short orange `bg-signal` rule, with paragraphs full width (about's former `max-w-[78ch]` caps removed). About keeps its StatsBand and the leadership monogram card; careers keeps the openings grid (summary's `max-w-[64ch]` cap removed) and the application-form band. `PageHero` remains in use by contact, thank-you and not-found, which were out of scope. Verified with `npm run lint` (clean) and tsc (no new errors)
- Added the supplied `santosh.png` (1200x1200) to the About leadership card: moved from the repo root into `public/santosh.png`, referenced via a new `image` field on the leadership person in `content/about.ts`, and rendered as a square `rounded-md` portrait through `next/image` (`fill` in an `aspect-square` box) instead of the small monogram circle, per user direction not to limit it to the circle. After two rounds of "bigger" feedback the portrait settled at a 20rem photo column from `sm`, 26rem from `lg`, and full-width up to `max-w-sm` on mobile; the leadership card's old `sm:max-w-3xl` wrapper cap was removed so the bio column keeps a workable measure beside the larger photo. The text social links were replaced with user-supplied brand SVG marks in a new `src/components/ui/social-icon.tsx` (LinkedIn in its own #0A66C2 brand blue; the X mark's supplied white fill changed to `currentColor` so it renders ink on the light surface), matched by label regex, rendered at `size-5` with sr-only "name on channel (opens in a new tab)" text. The `MonogramPlate` remains as the fallback for any person without an `image`. The card had been externally extended with `role` and `affiliations` fields, which are untouched. Verified with `npm run lint` (clean) and tsc (no new errors)
- Restructured the About hero per user direction: the h1 is now "About Us" with "The Go-to-Partners for B2B Tech Marketing Leaders" demoted to the lede beneath it (`aboutHero` gained a `lede` field in `content/about.ts`). Verified with `npm run lint` (clean)
- Changed the careers hero headline from "Together with Research NXT" to "Careers" per user direction; the lede is unchanged
- Fixed the sitewide heading-size bug behind "the h1 looks smaller than its subtext": `cn()` runs `tailwind-merge`, which does not know the project's custom type roles, classified `text-display` / `text-display-sm` / `text-headline` / `text-title` as text **colours**, and silently dropped them whenever a real colour like `text-ink` / `text-white` followed in the same `cn()` call. Every `SectionHeading` title (all page heroes plus most section headings) was therefore rendering at the 16px body size. Fix: `extendTailwindMerge` in `src/lib/cn.ts` registers the four roles in the `font-size` class group. Verified live in Chrome against the running dev server: solution h1 "Prospect Database" 16px → 60px, About "About Us" 60px with "Who we are?" h2 at 44px, Careers "Careers" 60px. Impeccable detector on the changed file: no findings; `npm run lint` clean
- Redesigned the shared `StatsBand` twice after "too generic" feedback: first as a ruled ledger (label, dotted leader, right-aligned figure), then per user request as a bento grid. Final form: on the subtle band, a `gap-3` tile grid where the first stat is a double-height feature tile on a light accent-soft→surface gradient with a `text-7xl` figure, the second a wide white tile, the third a solid `bg-accent` blue tile (tick in white/60, label white/85), and the fourth a quiet white tile; all tiles `rounded-md` with hairline borders, orange signal tick top-left, `FigureValue` count-up retained, staggered by `Reveal`. Tile roles are positional (index-based), so the stats array should lead with its strongest figure. The old `surface`/deep variant prop was removed. Per follow-up feedback that the figures belong to the "Who we are?" story, the grid was split out as an embeddable `StatsBento` (grid only) rendered inside the About "Who we are?" section after the paragraphs (`mt-6`), while `StatsBand` remains as a thin Section+Container wrapper around it for any page wanting a standalone strip (currently none). Verified with `npm run lint` and tsc (clean); needs a browser look
- Changed the homepage reports-section eyebrow from "Research" to "Featured Reports" per user direction; the "Latest reports and guides" title is unchanged
- Started Phase B early with placeholder Resources pages at user request: new `/resources/[slug]` template renders five internal pages (reports-whitepapers, experts-view, insights, success-stories, events) from a new `src/content/resources.ts` module (slug, navLabel, metaTitle, title, lede per page; all ledes are stand-in copy awaiting the user's real content). Each page shows the shared light `PageHero` (eyebrow "Resources") plus a "This page is being prepared" note with a Contact us button. The pages carry `robots: { index: false }` and are deliberately absent from the sitemap until real content lands (both marked with PHASE B comments). `resourcesNav` in `config/nav.ts` now points at the internal routes with the `external` flags removed (navbar, footer, and the homepage "All reports"/"All interviews" links all follow automatically) and the stale PHASE A note was dropped. Verified both sample routes return 200 on the dev server; lint and tsc clean
- Built the first report landing page as a reusable template at `/resources/reports-whitepapers/[slug]` (each report gets its own landing page; only the data differs). First entry: `implementers-guide-to-ai`, the Salesforce-partnered Implementer's Guide to AI, with copy transcribed from researchnxt.com/microsite/implementer-guide-to-ai/ into a new `ReportLanding` type + `reportLandings` array in `content/resources.ts` (hero note/title/lede/cover/CTA, `**`-emphasised description paragraphs, the three ordered report chapters, and the Quick reads (5) and Expert insights (16) card lists). The supplied `mock-00991-892b0-768x768.png` cover moved from `cover/` to `public/covers/implementers-guide-to-ai.png` and renders beside the hero copy on the brand wash. Chapter cards use "Section 1/2/3" labels (real reading order). Both card sections use the homepage `resource-placeholder.svg` image treatment and render without links for now; adding `href` to an item in the content makes it a link when article pages exist (PHASE B comment in the template). Page closes with a CTA band reusing the "Get the report" action (currently → /contact until a real download form lands). Verified in the browser (hero with cover, chapters, both grids render correctly); route returns 200; lint and tsc clean. The `cover/` directory at the repo root still holds the original PNG and can be deleted if unwanted
- Restructured the report landing after reviewing the live microsite in the browser at the user's direction: (1) the hero now carries the download form beside the copy+cover (new placeholder client component `src/components/forms/download-form.tsx` with First/Last name, Job title, Company, Work email, Phone, Company size select with stand-in ranges, Country defaulting to India, and a consent checkbox built from data-driven `ConsentSegment[]` linking the Research NXT Privacy Policy and the Salesforce Privacy Statement; intercepted submit with inline confirmation, `TODO(phase-c)` for the real backend and report file; the live form's original consent typo "and you that you have read" was corrected). (2) Expert insights are now grouped by the microsite's four AI maturity stages, with the exact grouping extracted from the live page's tab DOM via the browser (Exploring 2, Experimenting 2, Implementing 6, Deployed 6); stages render as stacked labelled groups rather than JS tabs so everything stays visible without client state. (3) Added a credits band ("Research sponsor" Salesforce mark from `/logos/trusted/salesforce.png`, "Research partner" site logo) before the closing CTA, which now anchors to `#download`. The quote carousel on the live site was deliberately not reproduced. Verified in the browser (hero form, staged groups, credits, CTA all render); lint and tsc clean
- Tightened the report landing to the microsite's exact content per user direction ("use the content as is, do not add anything extra"): removed the invented "In partnership with Salesforce" eyebrow and the "Implementer's Guide to AI" hero headline; the hero is now cover image + the "Explore the comprehensive framework…" line (doubling as the page h1 at `text-headline`) beside the form, matching the live page. Removed the closing CTA band and the visible "Download the report" form heading (kept as sr-only for structure). The `hero.note`/`hero.title` content fields remain for metadata and form-id use
- The real download form will be a Jotform embed: `download.jotformId?` added to the content type; when set, the template renders the Jotform iframe (`form.jotform.com/{id}`, 36rem min-height) in place of the interim placeholder `DownloadForm`, which remains the fallback. The user supplied Jotform 252512579059463 ("[SF IND] Microsite Report Download"): implemented as a new client component `src/components/forms/jotform-embed.tsx` — the iframe embed plus Jotform's resize-handler script (loaded once, shared across embeds; the snippet's `window.parent.scrollTo(0,0)` on load was deliberately dropped since the form sits mid-page) — chosen over the raw `<script src=…/jsform/…>` variant, which relies on document.write and breaks React. The form id is set on the implementers-guide entry; the placeholder `DownloadForm` remains the fallback for reports without an id. Verified in the browser: the real Jotform renders in the hero card with all fields and the Download button. The card chrome around the form (border, white background, padding) was subsequently removed at user request; the Jotform now sits directly on the hero wash. Further per user direction: the description paragraphs run full container width (75ch cap removed) and the "What to expect from the report" and "Quick reads and toolkits for AI adoption" headings are centre-aligned (the "Insights shared by experts" heading stays left-aligned, as only those two were requested), and the three chapter cards (icon, Landscape/Strategy/Governance name, description) are centre-aligned within their columns, matching the microsite. The hero report cover's border and rounding were also removed, so the transparent-background mock sits directly on the wash
- Redesigned the report hero composition (frontend-design pass): the framework line now opens the hero as the statement (h1, `max-w-[30ch]`) with the short orange signal rule beneath, the Jotform self-centres in the right column, and the signature move is the cover mock stepping through the hero's bottom hairline into the white description band (`lg:translate-y-14` on the image, `spacing="none"` with custom padding on the section, `lg:pt-28` on the description section to clear it; overlap disabled below `lg` where the layout stacks). No copy added or changed. Verified in the browser at desktop: statement/rule/form compose cleanly and the cover crosses the boundary as intended; lint clean. The framework line was then removed from the hero at user request: the hero is now cover (centred, `w-64`/`sm:w-96`, keeping the `lg:translate-y-14` boundary-break) + Jotform only, with the report title as an sr-only h1 for accessibility/SEO; the line survives as the meta description
- Added the three chapter illustrations the user supplied from the live site (wp-content uploads 1/2/3-1024x1024.png) as `public/report-sections/implementers-guide-{landscape,strategy,governance}.png`, referenced via a new optional `image` field on expect sections and rendered as `size-24` marks above each chapter card, matching the microsite's icon treatment. The "Section 1/2/3" labels were subsequently removed at user request (field deleted from the type and content; cards are now icon, name, description). Verified in the browser (chapter icons render, quick reads and staged insights unaffected); lint clean and route 200
- "Why Research NXT" variant exploration concluded: four variants were previewed live (depth rows, bento tiles, proof ledger, accent spine); the user rejected the ledger and spine, had the depth rows refined (centred symmetric taper, stronger tint ramp, progressive heights), then chose the bento tiles. Final state on the homepage: the bento grid alone, no option labels, with the "7+ years of experience" feature tile highlighted in flat solid `bg-accent` blue with white text (the user confirmed solid over the trialled subtle gradient) and the other three tiles quiet white with hairline borders. Matching change on About: `StatsBento`'s feature tile ("500k+ Custom prospect lists") is now the solid blue highlight (`inverted = feature`) and the remaining tiles are white, replacing the earlier gradient feature and blue third tile. Lint clean
- Redesigned the homepage "Why Research NXT" section as a modern homage to the old site's iceberg illustration: the four differentiators are now full-width rows that "descend" like water, each row's tint one step deeper (surface → accent-soft → plate/30 → solid `bg-accent` with white text) and each row wider than the one above at `lg` (70% → 80% → 90% → 100%), so the stack silhouettes the mass beneath the surface without any illustration; the strongest claim ("Enterprise trusted") forms the saturated base. Rows are `rounded-md` with hairline borders on the light steps, title in `text-title font-display-soft` on a fixed 16rem column with the description beside it, staggered by the existing `Reveal`. No copy changed. Verified in the browser (renders as intended) and `npm run lint` clean
- Language QA pass across all user-facing copy: converted American to British spellings in content files, the CTA band and the site config (personalised/personalisation, maximise, optimisation, standardised, revolutionising, analyse/Analysing, optimise, customise/Customising, organisation, unauthorised, utilising, training programme) and normalised Title Case headings/labels/buttons to sentence case everywhere: solution capability titles and every bullet/tooltip, section titles ("**Data append & management:** guaranteed campaign success", "Positions we are currently hiring for", "What are you looking for in your next job?", "Our culture", legal headings and list lead-ins), outcome statements, hero ledes/CTAs ("Get a free database quality assessment"), homepage eyebrows ("Featured reports", "Trusted by"), nav labels ("Reports & whitepapers", "Experts view", "Success stories"), stat labels, "Contact us"/"Apply now" buttons, and the legal effective date ("1 July 2024"). Kept as proper nouns: Research NXT, the three solution names (nav label unified to "Research-Based Marketing"), GCC Intelligence, published report/interview titles, LinkedIn (fixed "Linkedin"), B2B/ICP/ABM/CXO/SWOT/MQL/TAT, and "Privacy Policy" as a document reference. Alongside: fixed typos ("offer's"→"offers", "Hight"→"High", "Creditable"→"Credible", "marketplace have"→"marketplace has", "MQL's"→"MQLs", "Research Report's"→"Research reports", "LookaLike"→"Lookalike", "ResearchNXT"→"Research NXT"), changed the careers form "Resume" label to "CV", careers metadata title "Career"→"Careers", and added the missing full stop to the careers lede. One regression caught and fixed during the pass: the spelling sweep briefly rewrote the Lloyd Mathias interview URL (ai-led-personalization) — restored, and confirmed no other hrefs were touched. Verified in the browser (sentence-cased solution page renders correctly, navbar shows "Contact us"); `npm run lint` and tsc clean
- Site-wide polish pass (Impeccable polish flow) with live browser verification against the dev server at desktop width: walked /, all three solution pages, /about, /careers, /contact, /privacy-policy and the 404. Findings and fixes: (1) `/contact` and `/privacy-policy` were the last pages on the deep-navy `PageHero` while every other page had moved to the slim light hero; `PageHero` itself was rewritten to the shared light `hero-wash` band (headline, optional eyebrow/lede/children, no navy, no `DataPlate`), so both pages inherit the site-wide treatment. (2) The now-identical inline hero markup in the solution template, About and Careers was deduplicated back to `<PageHero>` (with the solution CTA buttons passed as children), removing three copies and the pages' unused `SectionHeading` imports. (3) Confirmed externally-made changes are consistent: `/thank-you` was deleted deliberately (no dangling references anywhere; removed the leftover empty route directory), the 404 page was redesigned on the light system, and forms/tooltips render correctly. Everything else surveyed (type hierarchy after the cn() fix, outcome equation band, bento stats mid-count-up, leadership card with photo and social marks, ledger-free spacing rhythm) rendered correctly. Verified: contact and privacy heroes confirmed light in the browser; Impeccable detector over the four changed files returned no findings; `npm run lint` and `npx tsc --noEmit` fully clean (the two old `NavItem.description` errors disappeared with the external not-found/thank-you changes). Mobile-width browser verification was attempted but the window resize did not take effect in this environment; responsive checks remain by-inspection only
- Final source QC of the three solution pages: `npm run lint` clean; `npx tsc --noEmit` shows only the two pre-existing unrelated `NavItem.description` errors (`not-found.tsx`, `thank-you/page.tsx`); no leftover `beforeCapabilities`/`singleLine` (outcome) or eyebrow strings; band borders form single hairlines (hero `border-b`, then `border-t` on outcome and capabilities only); all six section titles carry valid `**` accent markers and no meta fields contain markers; every capability has an icon; the tooltip-point rendering (added outside this session) type-checks against the union `points` type and keeps `aria-describedby`/`role="tooltip"` wiring. Known copy oddities transcribed verbatim from WordPress and left untouched pending a copy decision: the prospect "Data Cleansing & Enrichment" bullets mis-split ("Check and Update your existing" / "Databases Run Regular Data Enrichment Projects") and the research "ABM Campaigns" bullets mis-split ("Interview Series with Key" / "Account Executives"). Browser/visual verification (subgrid alignment, icon rendering, one-line clamps at wide viewports) remains pending since no dev server or build was run The capabilities `SectionHeading` receives the same accented title node. Verified with `npm run lint` (clean); no other consumers of these title strings exist (the hub page and metadata use their own fields) Verified with `npm run lint` (clean) and `npx tsc --noEmit` (only two pre-existing, unrelated errors in `not-found.tsx` / `thank-you/page.tsx` about `NavItem.description`, present before this change). No build or browser check was run; subgrid alignment and icon rendering still need a visual pass
- Swapped the hero background to the user-supplied `hero2.jpg` (6000x4000, 1.8 MB source, moved from repo root into `public/`; `next/image` serves optimized sizes at request time so the raw weight is not shipped). Same full-bleed scrim treatment; `public/hero.webp` is kept in case of another revert. Verified with `npm run lint` (clean); crop/scrim fit over the new photo needs a browser look
- Report-landing hero redesign (Impeccable pass), converged through live user direction. An initial navy `surface="deep"` drench with restored headline/partnership eyebrow/proof-figures was built and then stripped step by step per successive user messages: no navy, no "In partnership with Salesforce", no eyebrow, no proof line ("1,500+ survey responses…"), no visible title (the cover artwork carries it), and finally "on hero only the report cover and the form stays". Final state: light `hero-wash` band (`py-14 sm:py-20`), cover centred in the left column at `w-64`/`sm:w-80`/`lg:w-[28rem]` (larger than before at desktop; the earlier `lg:translate-y-14` boundary-break is gone and the description band's compensating `lg:pt-28` was removed), sr-only h1 kept, and the form now sits in a raised white panel (`rounded-lg border border-line bg-white`) with a visible header ("Get the full report" / "Free download, sent straight to your work email.") and a dotted `rule-ticks` divider above the Jotform. Note: a previous session removed card chrome around the Jotform at user request; the user watched this panel in two screenshots while directing other removals and did not object, but it is the first thing to strip if they push back. Supporting changes: new `delay(ms)` helper in `src/lib/motion.ts` (sets `--delay` for `anim-rise`, since `step()`'s `--i` is ignored by that keyframe) used to sequence cover then form on load; `hero.note` field and value deleted from `ReportLanding` (the transient `hero-drench` CSS utility and `facts` field from mid-session iterations were fully reverted). Verified in the browser at desktop 1536px (hero band, panel, seam to the description band all correct); lint clean after every step. Mobile could not be visually verified — the tiling WM ignores window resize — but below `lg` the layout is the same single-column stack that shipped before
- Published the first two Experts view interviews from the archived Salesforce transcripts, and turned `/resources/experts-view` from a placeholder into a real library. Route shape confirmed with the user: the library stays inside the Resources hierarchy at `/resources/experts-view`, with each interview at `/resources/experts-view/[project]/[person]` (project = the report the interview was conducted for). Live: `/resources/experts-view/implementers-guide-to-ai/hansveen-kaur` and `.../madhav-vemuri`, the first two transcript directories alphabetically (confirmed with the user against the alternative reading of "first two" as file-creation order). New content module `src/content/experts-view.ts` holds an `expertProjects` list (currently only `implementers-guide-to-ai`, pointing at its report landing) and an `expertInterviews` list; each interview carries person name/role/company, the AI maturity stage it sits under in the report, thumbnail, standfirst, key highlights, pull quote, and the full Q&A as `InterviewBlock[]` (a plain string is a paragraph with `**` emphasis; an object is a list, numbered when `ordered`). Transcript text is verbatim apart from house-style normalisation: em dashes replaced with commas/colons/full stops per the no-em-dash convention, `hyper-personalization` → `hyper-personalisation`, list labels sentence-cased, and a few garbled clauses from the WordPress source repaired ("maintenance was dominantly time based or reactive: equipment failures led to repairs", "IT and OT systems"). The transcript spells the interviewee "Hansveen" in the title and "Hansween" in the speaker labels; the page uses "Hansveen" throughout and does not render per-answer speaker labels.
- Trimmed on user direction after the first pass: the AI maturity stage badge ("Implementing") was dropped from both the interview hero and the library cards, and the `stage` field deleted from the content type and both entries (the stage grouping still exists on the report landing, which is where it belongs); the "Get the Implementer's Guide to AI" button was removed from the library page; and the person credit line (name, role, company) was removed from the interview hero and from every card, since the thumbnails already carry it. Cards are now thumbnail, title, "Read the interview". The one surviving credit is the pull quote's attribution inside the article, kept because it attributes a quotation rather than repeating a byline.
- Interview page layout: slim `hero-wash` band with a breadcrumb (Experts view / Implementer's Guide to AI) and the title as h1; then a two-column body where the article runs at `max-w-[68ch]` (16:9 thumbnail, standfirst, highlights `dl`, pull quote on an orange `border-signal` spine, then the Q&A) and the report's own download form sits in a sticky `lg:top-24` panel beside it, reusing the exact "Get the full report" panel and Jotform embed from the report landing by reading `getReportLanding(project)` rather than duplicating the form config. A "More from this project" band closes the page with the sibling interviews. The library page groups interviews under their research project with a card grid (thumbnail, stage badge, title, person) and a link to the project's report.
- Supporting changes: the two OG thumbnails were copied from `transcripts/sf-interview-transcript/` into `public/experts/{hansveen-kaur,madhav-vemuri}.png` (1920x1080); `experts-view` was removed from the `resourcePages` placeholder list in `content/resources.ts` so the new static route owns the URL (the other four placeholders are unchanged and still noindexed); `ReportCardItem` gained an optional `image`, and `ReportCardGrid` on the report landing now actually renders a `<Link>` when an item has an `href` (it previously ignored `href` entirely, despite the PHASE B comment saying otherwise) — the two published interviews are wired up there with their thumbnails, so the Implementer's Guide "Insights shared by experts" grid links into them; the report page's local `emphasised()` helper moved to a shared `src/components/ui/emphasis.tsx` (`<Emphasised text={...} />`) now used by both templates; and `sitemap.ts` gained `/resources/experts-view`, the report landings, and the interview routes (the report landing had never been in the sitemap).
- Verified: `npm run lint` clean, and `npx tsc --noEmit` reports no errors in `src/` (the two remaining errors are stale `.next/types/validator.ts` entries for the deleted `/solutions` and `/thank-you` routes, and predate this change). **Not verified: nothing was rendered in a browser and no build was run** — the layout, the sticky form column, the thumbnail crops and the mobile stack are all by-inspection only.
- Published the remaining 13 transcripts, so all 15 Salesforce interviews in `transcripts/sf-interview-transcript/` are now live under `/resources/experts-view/implementers-guide-to-ai/[person]`. The content module was split into a directory to stay navigable: `src/content/experts-view/types.ts` (types only, so an interview module can import the type without importing the registry that imports it back), `index.ts` (the project list, the `expertInterviews` registry and the lookup helpers, re-exporting the types so `@/content/experts-view` resolves exactly as before and no page had to change), and one module per interview named for its person slug. The 15 slugs, in library order, follow the report's own maturity stages: **Exploring** diptarup-chakraborti (MoveInSync), nimish-thaker (Spacewood); **Experimenting** avnish-anand (CaratLane), meera-iyer (SkinQ); **Implementing** hansveen-kaur (Voltas Beko), manish-kumar, akshay-matkar (Pressto), madhav-vemuri, prasad-pimple (Kotak Life), abhishek-gupta (Edelweiss Life); **Deployed** sanjiv-kumar-jain (Krishna Maruti), shwetha-iyer (Kissht), gaurav-suri (Finlabs India), varun-kaushik (PolicyBoss), suman-tewary (Allianz Partners). All 15 OG thumbnails are in `public/experts/`, and all 15 are now linked with their thumbnails from the report landing's "Insights shared by experts" grid.
- Transcription rules applied to all 13: verbatim apart from house style. Em dashes and en dashes replaced with commas, colons or full stops (the file-level check below asserts zero remain); American spellings brought into line with the site's British convention (`personalization`, `modeling`, `Organizing`, `program`); ALL-CAPS acronym glosses unwrapped where they read as noise; and the WordPress source's mangled bold runs and missing spaces repaired (`Metaare`, `campaignsmore`, `images.Currently`, `decisions.Efforts`, `AI-Generated Images for Marketing**** Cost Efficiency:**`, `A**phased deployment**`, `for**Aetna India**`). A handful of garbled clauses were lightly repaired for sense, all of them noted here so they can be checked against the source if it matters: "maintenance was dominantly time based or reactive: equipment failures led to repairs" (Madhav), "IT and OT systems" (Madhav), "as the applications stabilise" and "we get quality enhancements" (Sanjiv, where the source read "quantity"), "identify patterns and trends that would otherwise go undetected" (Gaurav), "idiot-proof" softened to "foolproof" (Varun). Where the source article names no role or company, `person.role` / `person.company` are now optional and omitted: only Manish Kumar is in that position, so his pull-quote attribution renders as the name alone.
- Note on the registry: `manish-kumar.ts` covers "AI's Role in Engineering & Infrastructure: Insights from Manish", whose source article gives only a first name in the title; the standfirst names him as Manish Kumar and that is what the page uses. `diptarup-chakraborti.ts` is the MoveInSync CMO, unrelated to the Diptarup Chakraborti removed from the About leadership section in an earlier task.
- Verified for the full set with a scratch script (`node` over the 15 modules, outside the repo): 15 interview modules, every `slug` matches its filename, every `thumbnail` path exists under `public/`, every module is exported and present in the registry, zero em/en dashes anywhere in the content, and `question:`/`answer:` counts balance in every file. Exchange counts per interview were cross-checked against the question counts in the source transcripts and all 15 match: 13, 7, 14, 13, 11, 8, 10, 8, 8, 9, 9, 9, 19, 7, 9. Prettier was run over the new content files, then `npm run lint` (clean) and `npx tsc --noEmit` (no errors in `src/`; only the two stale `.next/types/validator.ts` entries for the deleted `/solutions` and `/thank-you` routes).
- Paginated the library on user direction: `/resources/experts-view` now shows six interviews per page in a `sm:grid-cols-2 lg:grid-cols-3` grid (3x2 at desktop), so the 15 interviews fall across three pages. Pagination is a `?page=N` search param read through the async `searchParams` prop, which makes the route dynamic; the value is clamped to a real page rather than 404ing on junk input, and page 1 canonicalises to the bare `/resources/experts-view` (no `?page=1`). The pager renders real `<Link>`s so every page is crawlable and shareable, with `rel="prev"`/`rel="next"`, `aria-current="page"` plus an sr-only "(current)" on the active number, and disabled-looking `<span>`s at the ends instead of dead links. `generateMetadata` now sets a per-page title and canonical. The per-project section loop was replaced by a single flat grid taking its heading from the sole project, since paginating across project groups would be contradictory; a comment marks that a second project will want grouping or a filter here. Only page 1 is in the sitemap.
- Reorganised the library by perspective on user direction: it no longer groups by research project. `ExpertInterview` gained a required `perspective` field typed `"buyer" | "thought-leader" | "vendor"`, and `expertPerspectives` in the registry defines the three sections in page order, each with its display label and a `param` string that names both its pagination search param and its anchor id. Tagging as instructed: `madhav-vemuri` is `thought-leader`, the other 14 are `buyer`, and nothing is `vendor` yet. **The Vendor's Perspective band therefore does not render** — sections with no interviews are filtered out, since an empty heading reads as a broken page. Tag any interview `vendor` and the band appears with no other change.
- Each section paginates independently at six per page in the same 3x2 grid, using its own param (`?buyers=2`, `?thought-leaders=2`), so paging one section leaves the others where they were; links carry a `#<param>` fragment to the section's `Section id`, and the bands alternate default and subtle surfaces for separation. Buyer's Perspective is 14 interviews across 3 pages; Thought Leader's is 1, so its pager is suppressed (`totalPages < 2` renders nothing). The canonical in `generateMetadata` carries only the page params actually in play. Verified with `npm run lint` and `npx tsc --noEmit`, both clean; still no browser check.
- Published all 19 Zoho interviews from `transcripts/zoho-interview-transcript/` as a second research project, `automation-campaign-management`, so the library now holds **34 interviews across two projects**. Routes follow the same shape: `/resources/experts-view/automation-campaign-management/[person]`, e.g. `.../vipasha-sinha`. The folder was archived with 17 transcripts and the user added two more mid-task (Naresh Kumar, Zoho; Anju Singh, Ashoka University), both included.
- Structural change forced by the second project: **Prasad Pimple (Kotak Life) and Varun Kaushik (PolicyBoss) appear in both projects**, so person-slug filenames collided. Interview modules now live in per-project folders (`src/content/experts-view/<project>/<person>.ts`) and the registry aliases the duplicate pair (`prasadPimpleKotak`, `varunKaushikPolicyBoss`). The routes were always distinct, since a person slug is only ever resolved inside its project; only the module filenames needed namespacing. Their thumbnails are `prasad-pimple-kotak.png` and `varun-kaushik-policyboss.png` to avoid the same collision under `public/experts/`.
- Perspective tagging as instructed: Vipasha Sinha and Naresh Kumar (both Zoho) are `vendor`, everything else in this project is `buyer`. **The Vendor's Perspective band therefore renders now**, so all three library sections are live: Buyer's 31, Thought Leader's 1, Vendor's 2. Note that Abhishek Fodikar is Research NXT's own Marketing Specialist, tagged `buyer` per the blanket instruction; flag if he should sit elsewhere.
- Project and form model: `ExpertProject` lost its hardcoded `reportHref` and gained optional `reportSlug` and `jotformId`. When `reportSlug` resolves to a report landing, the interview page links to it and takes its download form from there, so the form stays configured in one place; when it does not, the project carries its own Jotform id. The Zoho project has no report landing yet, so it carries the user-supplied **"[Z IND] Report Download" form, id 243521499246462**, rendered through the existing `JotformEmbed` client component (which drops the snippet's `window.parent.scrollTo(0,0)`, correct for a mid-page form). Its breadcrumb ends in plain text rather than a link to a page that does not exist; a `TODO` marks where to set `reportSlug` once the report lands. The form panel is skipped entirely, leaving a single-column article, if a project has neither.
- `InterviewHighlight` is now `string | { title, description }`: the Zoho articles list untitled "Key takeaways" bullets where the Salesforce ones use labelled highlights. The highlights block on the interview page moved from a `dl` to a `ul` so both shapes render as valid markup.
- Transcription followed the same rules as the first batch (em and en dashes converted, British spellings, WordPress artefacts repaired such as `Metaare`, `images.Currently`, `mobile leadoptimisation`, `alot of potential .We`, `usingA/B testing`). Two judgement calls worth knowing: **the source article for Abhishek Fodikar carries the wrong pull quote** (it duplicates Dr Sunil Barsaiyan's line about tailoring campaigns to the student journey, which appears nowhere in Fodikar's own answers), so the page uses a genuine line from his interview instead, "Personalisation, even in automated messages, is key to keeping things relevant and engaging"; and Rahul Poojari's transcript is a rough verbatim record, so several clauses were lightly repaired for sense.
- Verified with the scratch script extended to walk both project folders: 34 interview modules, 34 unique `project/slug` routes with no collisions, every slug matches its filename, every `project` field matches its folder, every thumbnail exists under `public/experts/` (34 files), every module is in the registry, zero em or en dashes, and balanced `question:`/`answer:` counts. `npm run lint` and `npx tsc --noEmit` both clean. Still no browser check.
- Sorted the whole library alphabetically on user direction: `expertInterviews` now ends in `.sort((a, b) => a.title.localeCompare(b.title, "en"))`, replacing the maturity-stage ordering. Sorting once in the registry means the library grid, each perspective section, the pagination and the sibling band on an interview page all inherit the same order, and a new interview lands in position without touching the array. The array literal is still grouped by project for readability. Titles were chosen as the sort key because the title is the only thing a card shows.
- Published the five Qatar/MEA interviews from `transcripts/zoho-qatar-interview-transcript/` as a third project, `unlocking-the-power-unified-cx` (slug taken from the URL the user supplied), so the library now holds **39 interviews across three projects**. Routes: `/resources/experts-view/unlocking-the-power-unified-cx/[person]` for vaishnavi-soundarrajan, ahmed-badr (MBK Holding), asish-chathanath (Marble Medical Hospital), harshil-shah (LTC International Qatar) and mohamed-rabie (HyperThink Systems and Risin Ventures). Perspective tagging as instructed: Vaishnavi Soundarrajan (Zoho) is `vendor`, the other four `buyer`, which brings the library to Buyer's 35, Thought Leader's 1, Vendor's 3.
- The project carries its own download form: the user supplied **"[Z QA] Report Download", id 250201862296454**, set as the project's `jotformId`. All three projects now resolve a form: Implementer's Guide via `reportSlug` from its report landing, and the two Zoho projects via their own ids ("[Z IND]" 243521499246462 for India, "[Z QA]" 250201862296454 for Qatar/MEA), each with a TODO marking where to switch to `reportSlug` when their landings exist. The India form was never reused for Qatar; they are separate regions and separate reports.
- Verified across all three projects: 39 interview modules, 39 unique `project/slug` routes, slugs match filenames, projects match folders, 39 thumbnails present in `public/experts/`, every module in the registry, zero em or en dashes, balanced `question:`/`answer:` counts. Lint and `tsc --noEmit` clean. Still no browser check.
- Published the four GCC interviews from `transcripts/gcc-transforming-customer-experience-through-gccs/` as a fourth project, so the library now holds **43 interviews across four projects**. All four are tagged `buyer` per user instruction, bringing the library to Buyer's 39, Thought Leader's 1, Vendor's 3. People: geetanjali-chugh-kothari (Future Generali India Life Insurance), sharda-nenwani-gupta (GBS Bayer India), vineet-dwivedi (Alcon Global Services), vivek-veeraraghavan (Northern Trust). The project carries the user-supplied eBook form, **id 241762483249463**, as its `jotformId`, with the usual TODO for switching to `reportSlug` once a landing exists.
- The project slug was initially `transformin-cx-through-gccs`, missing the "g", because that is how the user typed the URL; they confirmed it was a typo and it is now **`transforming-cx-through-gccs`**. The fix touched the registry `slug`, the folder name under `content/experts-view/`, and the `project` field in the four interview modules. Nothing external pointed at the old spelling, so no redirect is needed.
- These transcripts came from the older `researchnxt.com/bambooreports/` articles and needed more normalisation than the Zoho sets: American spellings throughout converted to British (organization, personalized, recognizing, prioritize, analyze, digitalization and so on), the inline `> quote [Tweet](...)` pull-quote blocks stripped of their Twitter share links and promoted to the page's `pullQuote`, and the unclosed quotation mark around the whitepaper title in every standfirst closed. Two structural fixes: Vineet Dwivedi's source has two consecutive question headings with a single answer between them, merged here into one question; and his article ends with a "Books that Vineet recommends" list, which is carried as a final exchange whose heading is that phrase rather than an invented question. Book titles use `**` since the emphasis helper only handles bold.
- Verified across all four projects: 43 interview modules, 43 unique `project/slug` routes, slugs match filenames, projects match folders, 43 thumbnails in `public/experts/`, every module registered, zero em or en dashes, balanced `question:`/`answer:` counts. Lint and `tsc --noEmit` clean. Still no browser check.
- Published the five Routematic interviews from `transcripts/routematic/` as a fifth project, `navigating-corporate-commute-for-gccs-in-india`, so the library now holds **48 interviews across five projects**. All five tagged `buyer` per user instruction, bringing the library to Buyer's 44, Thought Leader's 1, Vendor's 3. People: abhishek-patel (Searce), aditya-gupta (NEC Corporation), ashis-jain (Vesuvius India), garvita-sandhu (PayU), protick-basu (ANSR). These are the first thumbnails that are `.jpg` rather than `.png`; the `thumbnail` field already carried the full path so nothing needed changing.
- **The slug the user typed contained a space:** "navigating-corporate-commute-for gccs-in-india". A space cannot sit in a clean URL segment, so it was normalised to a hyphen. Flagged to the user.
- The form id first supplied for this project duplicated the one already used by `transforming-cx-through-gccs`; the user then sent its own, **"[RM] Microsite Report Download", id 260490193043452**, which is what the project now carries. Every project therefore resolves a distinct download form: Implementer's Guide via `reportSlug` from its report landing, and the other four via their own ids (`[Z IND]` 243521499246462, `[Z QA]` 250201862296454, GCC CX eBook 241762483249463, `[RM]` 260490193043452), each with a TODO marking where to switch to `reportSlug` when its landing exists.
- Two template changes this batch, driven by the source articles rather than by preference: `pullQuote` is now optional and `highlights` may be empty, because Abhishek Patel's article carries neither a takeaways list nor a quote, and two others carry no quote. The interview page drops the highlights band and the blockquote rather than rendering a heading over nothing or an empty quote. Abhishek Patel's article ends with a Research NXT "Closing view" paragraph, carried as a final exchange under that heading rather than attributed to him as an answer.
- Verified across all five projects: 48 interview modules, 48 unique `project/slug` routes, slugs match filenames, projects match folders, 48 thumbnails present, every module registered, zero em or en dashes, balanced `question:`/`answer:` counts. Lint and `tsc --noEmit` clean. Still no browser check.
- Published two more archives from the 2021 research programmes, taking the library to **57 interviews across seven projects**. All nine are `buyer` per user instruction, so the sections now read Buyer's 53, Thought Leader's 1, Vendor's 3.
  - `cloud-computing-new-normal-beyond` (3): abhrajit-de (Genus Power Infrastructure), arup-choudhury (Eveready Industries India), devang-mehta (Blue Star Diamonds). Form: "Cloud Computing in the New Normal & Beyond, 2021", id 211600107593446.
  - `south-east-asia-response-guide` (6): aaron-foo (iCar Asia), anil-gautam (DHL eCommerce Malaysia), johnny-widodo (OLX Group Indonesia), karunjit-kumar-dhir (SCIKEY), ravi-shankar (AirAsia), walter-de-oude (Singlife and Aviva Singlife). Form: "Southeast Asia Response Guide, 2021", id 211602133570442.
- Both sets are older WordPress articles and needed the heaviest normalisation so far: American spellings throughout, the inline `> quote [Tweet](...)` blocks stripped of their share links and the first one promoted to the page's `pullQuote`, and unbolded interviewer questions treated as questions like the rest. The Southeast Asia articles open with a bold standfirst line above the intro paragraph; both are carried as `intro` paragraphs, the standfirst first. Where a source repeated the same pull quote twice (Ravi Shankar) only one instance is used.
- Verified across all seven projects: 57 interview modules, 57 unique `project/slug` routes, slugs match filenames, projects match folders, 57 thumbnails present in `public/experts/` (a mix of `.png` and `.jpg`), every module registered, zero em or en dashes, balanced `question:`/`answer:` counts. Lint and `tsc --noEmit` clean. Still no browser check.
- Published the 2020 AI Led Personalization archive from `transcripts/ai-led-personalization-2020/` as an eighth project, `ai-led-personalization`, taking the library to **78 interviews across eight projects**. Form: "AI Led Personalization - Strategy and trends Report, India - 2020", id 200151888635458. Perspective tagging per user instruction: lloyd-mathias, scott-brinker and david-raab are `thought-leader`; kalpit-jain and rohit-srivastav (both Netcore) are `vendor`; the other 16 are `buyer`. Sections now read Thought Leader's 4, Buyer's 69, Vendor's 5. People: abhishek-joshi (MX Player), akshay-matkar (Candere), avnish-anand (CaratLane), ayush-agarwal (Seniority), banwari-lal-sharma (CarWale), david-raab (CDP Institute), divya-dixit (ALTBalaji), iti-mehrotra (5paisa Capital), kalpit-jain (Netcore), lloyd-mathias, meera-iyer (Medlife), rahul-mishra (ShemarooME), ravi-santhanam (HDFC Bank), ritesh-bhatnagar (U2opia Mobile / Woo), ritesh-ghosal (Croma), rohit-srivastav (Netcore), sanjay-gupta (Uber), scott-brinker (chiefmartec), shwetha-iyer (ZEE5), sweta-aggarwall (SBI Card), tv-naarayan (PayPal).
- Kalpit Jain (Group CEO, Netcore) was missing from the archive when the batch was first published and the user added his folder afterwards; he is now live at `.../ai-led-personalization/kalpit-jain` as `vendor`, taking the project to 21 and the library to 78. Rohit Srivastav (Head of Growth, Netcore) also stays `vendor` per the user, so the project has two. The other Rohit Srivastav (Head of Marketing, FleetPanda) in `automation-campaign-management` is a different person and stays `buyer`.
- His transcript needed two repairs beyond the usual normalisation: "water collars or velvet rope marketing" is garbled in the source and is carried as "velvet rope marketing" only, and the closing answer has a run of broken clauses ("we are had", "sitting out of where we are", a stray quote mark) which were repaired minimally.
- The sibling band at the foot of an interview page is now headed **"More interviews"** rather than "More from this project", on user direction. The eyebrow above it already carries the project name, so the context was not lost. It keeps its three-column grid and stays uncapped, so a 21-interview project lists all 20 siblings. A horizontally scrolling row and then a drifting marquee were both built and both reverted at the user's request; the `.no-scrollbar` utility and the `interviews-rail-*` CSS block that supported them were removed again, so `globals.css` is back to its committed state.
- **The eight source archives moved under `transcripts/`** and the `refrences/` folder with them, as `transcripts/source-lists/` (the typo is gone). Moved with `git mv`, so history follows. `transcripts/README.md` records the archive-folder to project-slug mapping, since the two names differ for six of the eight. Nothing under `src/` ever imported from these folders, so the move is inert for the build; path references in this file were rewritten.
- **Library section order changed on user direction:** `expertPerspectives` now runs Thought Leader's, Buyer's, Vendor's. That order drives the section bands, their pagination params and their anchors on `/resources/experts-view`; nothing else reads it.
- Five people in this set already appear in other projects, so their modules are namespaced by project folder as usual and the registry aliases them (`akshayMatkarCandere`, `avnishAnandCaratLane`, `meeraIyerMedlife`, `shwethaIyerZee5`, `rohitSrivastavNetcore`); their thumbnails carry the same suffixes under `public/experts/`. Same normalisation as the other 2020/2021 sets: American spellings converted, `> quote [Tweet](...)` blocks stripped of share links with the first promoted to `pullQuote`, unbolded interviewer questions treated as questions. Source defects repaired and flagged: Sanjay Gupta's transcript carries a stray Medlife pull quote (dropped), Banwari Lal Sharma's has a duplicated garbled sentence (reconstructed), and Abhishek Fodikar's carries another interviewee's quote (replaced with a line from his own answers).
- Verified across all eight projects: 78 interview modules, 78 unique `project/slug` routes, slugs match filenames, projects match folders, 78 thumbnails present in `public/experts/`, every module registered, zero em or en dashes, balanced `question:`/`answer:` counts. Lint and `tsc --noEmit` clean (the only tsc output is stale `.next/types/validator.ts` module-resolution noise, not from `src/`). Still no browser check.
- Published the Apollo Hospitals interview added to `transcripts/sf-interview-transcript/`, taking `implementers-guide-to-ai` to 16 and the library to **79 interviews across eight projects**. Live at `/resources/experts-view/implementers-guide-to-ai/karthik-anantharaman`: Dr. Karthik Anantharaman, Vice President of International Sales & Marketing at Apollo Hospitals, tagged `buyer` per user instruction, so the sections now read Thought Leader's 4, Buyer's 70, Vendor's 5. The 1280x720 OG thumbnail was copied to `public/experts/karthik-anantharaman.png`. Normalisation as usual: the two em dashes became a colon and a comma, American spellings converted (`program` to `programme`, `specialties` kept as the medical sense), curly quotes straightened, and the source's numbered section headings inside the third answer carried as bold paragraphs the way `gaurav-suri` does. The title drops the source's "Transforming Global Healthcare:" prefix, which is kept in `metaTitle`. Two supporting edits: the "How Apollo Hospitals Leverages AI to Revolutionise Patient Care and International Outreach" card in the report landing's "Insights shared by experts" grid (Deployed stage) was already present without a link and now carries its `href` and `image`, and `expertProjects[0].lede` reads "Sixteen conversations" rather than "Fifteen". The report description's "15+ expert interviews" is transcribed source copy and was left alone. Verified 79 modules, 79 thumbnails, perspective counts, zero em dashes or curly quotes in the new module; `npm run lint` and `tsc --noEmit` clean. No build, dev server, or browser check was run
- Report landing changes on user direction, all in `/resources/reports-whitepapers/[slug]` and its data: the hero form lost its "Get the full report" heading, the "Free download, sent straight to your work email." line, the tick rule and the white bordered panel around it, so the Jotform embed now sits directly on the hero wash; the form itself is untouched. All three chapter descriptions (Landscape, Strategy, Governance) are hard-wrapped to three lines of roughly equal length with `\n`, wording unchanged, and the chapter paragraph gained `whitespace-pre-line`; the longest line is about 39 characters, which still fits the single-column card below the `sm` breakpoint. A description without a `\n` wraps on its own as before, and the field's doc comment records this. The Salesforce sponsor mark is now the vector `public/logos/trusted/salesforce.svg` supplied by the user rather than the 600x334 PNG, rendered with `unoptimized` because the image optimiser is not configured for SVG (`dangerouslyAllowSVG` is unset in `next.config.ts`). `logos/trusted/salesforce.png` stays in place for the homepage logo strip. Lint and `tsc --noEmit` clean; no browser check
- Second round on the same page, again on user direction: the "Insights shared by experts" heading is now centred, and the four maturity-stage groups became **tabs** instead of four stacked grids. The tabs are a native radio group, not React state, so the page stays a server component and every stage is still reachable with no JS (arrow keys come for free). `peer-checked/name:` compiles to a sibling selector, so the inputs, labels and panels are all siblings in one flex container with the panels set to `w-full`; Tailwind needs literal peer names, so `expert-insights-tabs.tsx` carries a fixed six-entry style table and slices the groups to it. The active tab takes the brand orange underline, matching the nav. The focus ring had to move inside the `peer-focus-visible` variant: in Tailwind v4 `outline-2` sets `outline-style` as well as the width, so having it on the label unconditionally drew a permanent accent rectangle around every tab, which is what the user saw. `ReportCardGrid` moved out of the page into `src/components/report-card-grid.tsx` because both the quick-reads band and the tabs need it
- The credits band was two centred flex columns whose logos sat at different heights; it is now a two-column grid with each mark centred in a fixed `h-10` box, so labels line up on one line and marks on another regardless of aspect ratio. The Salesforce SVG renders at `h-9` against the Research NXT wordmark's `h-5`, since its cloud sits above the word
- Hero height came down: padding `py-14 sm:py-20` to `py-10 sm:py-12`, gap `12` to `10`, cover `w-64 sm:w-80 lg:w-[28rem]` to `w-56 sm:w-72 lg:w-[24rem]`. The floor is the Jotform iframe's fixed 539px, which the embed sets itself, so the band cannot get much shorter than that without touching the form
- Spacing and hierarchy pass over the whole report landing (impeccable `layout`), after the user said the page carried too much negative space. Every band moved from `spacing="default"` (py-20/28) to `tight` (py-12/16) and the section headings from `mb-12` to `mb-10`/`mb-8`, so the bands now separate by surface and hairline rather than by air; the page comment records why this page runs tighter than the site rhythm. Hero: padding to `py-8 sm:py-10`, and the columns are sized and centred as a pair (`lg:grid-cols-[24rem_26rem] lg:justify-center`) instead of letting the cover float in a `1fr` column, which was the widest patch of dead space on the page. Description: held to a 68ch measure instead of the full 78rem page width (it was well past the readable measure), opening paragraph promoted to `text-xl text-ink` against `text-lg text-ink-soft` so the band has a lead, and justified with `hyphens-auto` on user direction. Chapters: `sm:grid-cols-3` to `md:grid-cols-3` because three columns at 640px left about 180px per card, illustration `size-24` to `size-20`, and the internal rhythm changed from a flat `gap-3` to generous above the name and tight above the copy. The hard-wrapped chapter copy is now `whitespace-normal lg:whitespace-pre-line`: the 39-character lines only fit from `lg`, and below that they would have overflowed the column. Expert insights: the tab row gained a hairline baseline and the labels bottom padding, so the active orange underline lands flush on it and the four words read as a tab bar. Detector (`--scope layout`) clean, lint and `tsc` clean
- **`/resource-placeholder.svg` is likely broken in the card grid** for the same optimiser reason: it is passed to `next/image` without `unoptimized`, which returns 400 for SVG unless `dangerouslyAllowSVG` is set. It only shows on cards with no `image`, which today is the five inert quick-reads cards. Not touched, since it was outside the ask
- Known gaps on the report landing: the five quick-reads cards are still inert (no `href`), the template's header comment lists a closing CTA that no longer renders, and `hero.lede` is set in the data but never rendered (the cover carries the title and the `h1` is `sr-only`)
- **Homepage hero field rebuilt** after the user judged the first drifting-orange attempt "nowhere close" to their Shinkei reference video (`69ebff20daba6852824524.mp4`, untracked in the repo root). The old field (heavily blurred low-opacity bands under a dark maroon radial scrim) was replaced wholesale in `globals.css`. New structure, prototyped standalone in the session scratchpad and iterated against extracted video frames via headless Chrome screenshots before porting: `.hero-field` vivid base wash (saturated `#ff5505` range, creamy light pooled bottom-left and top-right, deep `#be2a00` pockets opposite), `.hero-field-streaks` whose two pseudo-elements draw identical 45-degree beam gradients but are each masked to alternating 88px horizontal bands with the second copy offset 44px, quantising beam edges into the reference's staircase steps (the two copies must animate on their shared parent, never independently, or the complementary masks tear into horizontal bars), `.hero-field-sweep` a broad blur(34px) light band counter-drifting for two-speed evolution, then the SVG grain at 0.6. The dark scrim is gone; white copy sits straight on the field as in the reference, with the base wash's deep pocket weighted through the copy column (display headline ≥3:1; the rotating questions moved from `text-white/85` to full white in `page.tsx`, dots to `bg-white/60`). Drift is `linear` easing deliberately, not an `--ease-out-*` token: an infinite alternate ambient loop visibly stalls and lurches with ease-out. **Drift trap, hit and fixed in-session:** the first cut translated equal x/y, which moves a repeating 45-degree stripe exactly along its own invariant axis, so the animation ran with zero visible change (the user reported "it doesn't animate"). The user then asked for constant motion (the alternate loop eased into reversals), so the streak system now flows one-directionally and seamlessly: the gradient axis periods were made commensurate (440/880/880px, the third layer phase-shifted 440px via `background-position` so the two 880 layers never coincide), and `hero-flow` translates exactly one common horizontal period, 880 x sqrt(2) = 1244.51px, per `linear infinite` cycle so the wrap lands pixel-identical (8s per cycle, sped up three times from 40s on user direction, about 156px/s); pseudo-element insets widened to `-35% -1400px` to cover the travel. The user then asked for two-directional motion, first tried as `alternate` (back-and-forth), then clarified to "both direction in the same time", so the final state is two layers counter-flowing simultaneously: the stepped streak system flows one way (`hero-flow`, -1244.51px per 8s, linear infinite, seamless), and `.hero-field-sweep` was rebuilt from non-repeating soft bands into two repeating 45-degree gradients at the same commensurate 880px axis period (phase-split 440px, blur(30px), inset `-35% -1400px`) flowing the opposite way (`hero-flow-back`, +1244.51px per 13s, linear infinite, also seamless). Both wraps are pixel-identical so the counter-flow never stutters; the 8s vs 13s pace difference keeps the layers visibly crossing.
- **Final hero motion and palette, from the user's written brief** (warm amber/orange/golden palette, textured semi-translucent diagonal stripes drifting seamlessly along their axis top-to-bottom and right-to-left, shimmering light/grain/opacity shifts): the whole field was reworked once more. Orientation finding that drove it: CSS `repeating-linear-gradient(45deg)` draws "\\" stripes and `135deg` draws "/" (verified by rendering both headlessly), so the previous 45deg stripes were mirrored against the reference; everything is now 135deg ("/", lower-left to upper-right). Palette moved from red-orange to amber/gold: base `#e06000/#ff7a14` with golden radials (`rgba(255,232,190)`, `rgba(255,214,130)`) and deep amber pockets (`rgba(178,74,0)`); stripe layers golden cream `rgba(255,228,170)`, deep amber `rgba(164,68,0)`, golden `rgba(255,186,90)`; sweep gold/amber. Motion is now three seamless pieces: `hero-flow-axis` glides the stepped stripe system along its own 135-degree axis, translate3d(-352px, 352px) per 5s linear cycle (down-left; the gradient is direction-invariant so the visible flow is the staircase steps crawling, and 352px = exactly two 176px mask periods so the wrap is pixel-identical); `hero-cross` pans the blurred golden sweep perpendicular across the stripes, translate3d(622.25px, 622.25px) per 18s (one full 880px axis period resolved to screen axes, also exact); `hero-shimmer` breathes the streak system's opacity 1 to 0.82 over 9s ease-in-out alternate. Pseudo insets widened to `-600px -1400px` (streaks) and `-900px -1400px` (sweep) to cover the travel. Wrap seamlessness verified by pinning all animations except the flow at equal phase and diffing frames one cycle apart: residual is uniform trace-level render dither, no localized seam. Lint clean throughout.
- **The amber/along-axis rework was then reverted in full on user direction**: after seeing it, the user said the previous version looked nicer and clarified that "bi-directional" meant waves moving one side and the other, which is exactly the counter-flow build. Final shipped state is therefore the red-orange 45-degree counter-flow version: base `#e83f00/#ff5505/#ec4200` wash with creamy corner radials and deep `rgba(190,42,0)`/`rgba(198,46,0)` pockets; stepped beams (`rgba(255,228,195)` light, `rgba(178,36,0)` deep, `rgba(255,168,80)` mid at 440/880/880px periods, insets `-35% -1400px`) flowing via `hero-flow` -1244.51px per 8s linear infinite; blurred sweep (`rgba(255,210,155,0.3)` / `rgba(198,46,0,0.28)`, blur(30px)) counter-flowing via `hero-flow-back` +1244.51px per 13s. The 135-degree/golden keyframes (`hero-flow-axis`, `hero-cross`, `hero-shimmer`) no longer exist in the file. The orientation note stands for future reference: CSS `repeating-linear-gradient(45deg)` draws "\\" stripes, `135deg` draws "/"; the shipped field uses 45deg and the user prefers its look. Lint clean after the revert.
- Grain strengthened on user request: `.hero-field-grain` layer opacity 0.6 to 0.85 and the SVG turbulence rect opacity 0.55 to 0.7; verified visibly present in a headless render without muddying the headline. Same two values are the knobs if it needs further tuning.
- **Hero copy recomposed centred on user direction** ("centerd", matching the reference's centred layout), with an authored entrance. The user floated GSAP; declined for now because the effects are expressible with the existing CSS machinery at zero dependency cost and package installs need explicit permission; revisit only if they insist. Changes: `page.tsx` hero column is now `mx-auto flex max-w-3xl flex-col items-center text-center` with the entrance sequenced by the existing `delay()` helper (questions `anim-rise` at 0ms, headline at 180ms, CTA `anim-rise` at 430ms); headline measure widened 19ch to 22ch with `text-balance` for the centred wrap. `HeroQuestions` gained a `centered` prop (justify-center on rows, text-center on copy, justify-center on the dot controls); only the homepage uses the component. New CSS: `hero-headline-in` keyframes + `.anim-hero-headline` (rise from 1.75rem with blur(10px) to sharp over 760ms ease-out-expo, `--delay`-aware, `both` fill, motion-gated) as the page's one authored arrival; the question rotator's swap transition gained a 6px blur dimension on the same 520ms ease-out-expo curve. All still visible-by-default without the motion flag. Lint clean. Not browser-verified this session.
- **GSAP adopted on explicit user approval** (`gsap@^3.15.0` installed; the user chose "Install GSAP" when asked and confirmed "go with GSAP"). The hero entrance moved from the CSS `anim-rise`/`anim-hero-headline` sequencing to a GSAP timeline in the new client component `src/components/home/hero-intro.tsx`: question line rises (0.7s), headline resolves **word by word** out of a 10px blur (0.9s, 0.055s stagger; the h1 in `page.tsx` splits `hero.headline` into `data-hero-word` spans with real whitespace between so the accessible name stays one sentence), CTA lands last, all `expo.out` matching the site's ease-out-expo convention. Safety contract, also recorded in CLAUDE.md: content is visible by default and GSAP only animates FROM hidden states after checking `data-motion === "on"` in `useLayoutEffect`, with `gsap.context(...).revert()` cleanup, so no-JS, failed-bundle and reduced-motion visits get the finished layout; ambient loops (the hero field) stay CSS. The `hero-headline-in` keyframes were removed from `globals.css` as dead code (`anim-rise` stays, other pages use it); the rotator's blur-swap CSS remains. CLAUDE.md's client-component list updated (HeroQuestions, HeroIntro). Lint clean and `npx tsc --noEmit` fully clean (the two long-standing `NavItem.description` errors are gone). Entrance not yet watched in a browser; the word-stagger timing (0.055s) and blur amount are the tuning knobs.
- **Second GSAP pass on user request ("with GSAP can we make it better?"), four upgrades.** (1) The four field layer divs moved from `page.tsx` into a new client component `src/components/home/hero-field.tsx`: the ambient wave loops stay CSS on the layers, and GSAP animates only their shared wrapper, a 1.06-to-1 scale settle over 1.8s on load, plus, on `(pointer: fine)` devices, a lagged pointer parallax (`gsap.quickTo`, max -24px x / -16px y toward the cursor, 1.1s power3.out follow). The wrapper is `pointer-events-none absolute inset-0 -z-10`; the layers' oversized insets mean neither scale nor parallax can expose an edge. (2) The question rotator's swap moved from CSS transitions to GSAP inside `HeroQuestions` (`useLayoutEffect` on `active`, so no pre-paint flash): outgoing lifts -14px into blur(6px) over 0.38s power2.in, incoming resolves from +20px/blur(8px) over 0.6s expo.out after 0.16s, with `gsap.killTweensOf` first so rapid dot clicks rebase cleanly. The `.q-rotator` CSS was reduced to base states only (hidden inactive / shown active, no transition, comment explains the division of labour or the two systems fight); the no-JS stacked-list fallback is untouched. (3) Magnetic CTA in `HeroIntro`, fine pointers only: the button leans toward the cursor while hovered (x 0.22 / y 0.35 of offset from centre) and glides back on pointerleave, via quickTo. (4) All effects still early-return unless `data-motion="on"`; listeners and tweens are torn down (`ctx.revert()` plus explicit removeEventListener arrays). CLAUDE.md client list now names three hero components. Lint and `tsc --noEmit` clean. Still not watched live; knobs: parallax magnitudes (-24/-16), magnetic pull factors (0.22/0.35), swap durations.
- **Magnetic CTA removed on user direction** ("remove the animation from the CTA"): the pointermove/pointerleave quickTo follow and its teardown array are gone from `HeroIntro`, which is back to owning only the entrance timeline. The CTA's entrance rise in that timeline was kept, read as in scope for the load choreography rather than "the animation on the CTA"; strip it too if the user pushes back. Lint clean.
- **Question rotator is now a typewriter, on user request.** Implementation is a character reveal, not text mutation: `QuestionChars` in `hero-questions.tsx` renders every non-whitespace character as a `data-q-char` span (spaces and `\n` stay raw text nodes, `pre-line` needs them intact), so every character's space is reserved from the start and the centred multi-line text never reflows mid-type, and screen readers read whole questions since the characters are real DOM text. GSAP reveals the incoming question's chars at 0.02s/char (`duration 0.01, ease "none"`) while the outgoing question fades over 0.24s; first mount types the opening question once at 0.55s delay (as the hero block rises); interrupts are handled by killing both items' and both char-sets' tweens. `DWELL` raised 4400 to 5200ms so the ~1s of typing still leaves a full read. The previous lift-into-blur swap was replaced entirely. Also on user request, the second question gained a manual line break in `content/home.ts`: "Is your customer engagement\nbased on account intelligence?", matching the other two questions' hand-broken lines (note: the break only renders from `sm` up, the `whitespace-pre-line` is `sm:`-prefixed). Lint and tsc clean; not watched live. Knobs: `CHAR_STAGGER` (0.02) and the outgoing fade duration.
- Two follow-ups on user direction: the second question's break moved to after "based on" ("Is your customer engagement based on\naccount intelligence?"), and `DWELL` came down 5200 to 3800ms to tighten the rotation. Important coupling found while doing it: the dot's progress-pill fill duration is hardcoded in `globals.css` (`.q-dwell` animation) and was still 4400ms, silently mismatched since the 5200 change; it is now 3800ms with a comment pinning it to `DWELL` in `hero-questions.tsx`. Lint clean.
- **Hero vertical-rhythm sanity check, on user request ("distance between the questions, indicators and the answer seems off").** Root cause measured, not guessed: the dot controls are 44px touch targets holding 6px dots, so ~19px of invisible padding sits above and below the visible dots; with controls `mt-2` and headline `mt-7` the true visible gaps were question-to-dots 27px and dots-to-headline 47px, making the dots-to-headline hole the largest gap in the stack, larger than the 36px before the CTA, which inverts the grouping. Confirmed by rendering current vs proposed side by side headlessly. Fixes: controls `mt-2` to `-mt-1` (visible gap ~15px; hit area untouched, comments in the JSX explain the invisible-padding arithmetic), headline `mt-7` to `mt-3` (visible ~31px), CTA `mt-9` unchanged at 36px so the reading order's gaps now step 15 < 31 < 36. Also, centred rotator items changed from `items-start` to `items-end` so question text hugs the bottom of the shared grid cell: if line counts ever differ (natural wrap below `sm`), the gap to the dots stays constant and slack accumulates above instead. Lint clean; not watched live. The sweep layer stays `alternate` (4%,-1.5% to -4%,1.5%, 12s, sped up three times from 52s in the same steps): it is not periodic so it cannot wrap, and its reversal hides inside the 34px blur. Verified by injecting negative `animation-delay` into the prototype and diffing headless-Chrome frames: phase 0 vs 10s differs strongly (mean 34.9, motion real), phase 0 vs 40s nearly identical (residual only from the mid-phase sweep, wrap seamless). Note `--virtual-time-budget` proved unreliable for advancing compositor animations; negative `animation-delay` is the dependable way to sample phases headlessly. Still gated behind `data-motion` with the reduced-motion kill switch. `page.tsx` renders four aria-hidden layer divs (field, streaks, sweep, grain). Lint clean; detector clean on both files; prototype verified at 1600x1000 and 420x820. **Not yet verified in the running app** (no dev server was started; the user had one running when they judged the previous field)
- Known gaps: the intermediate URL `/resources/experts-view/implementers-guide-to-ai` has no page and will 404 (only the library and the leaf interviews exist); the five quick-reads cards on the report landing remain inert; `expertProjects[0].lede` and the library lede are written copy, not transcribed from the live site, so they may want a review. **Still not verified in a browser**: nothing was rendered and no build was run, so the layout, the sticky form column, the thumbnail crops, the long-transcript scroll and the mobile stack are all by-inspection only.

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
All three local solution pages render from one template driven by `content/solutions.ts`; GCC Intelligence remains an external Bamboo Reports link.

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
| `/solutions/prospect-database` | `/prospect-database/` |
| `/solutions/account-intelligence` | `/account-intelligence/` |
| `/solutions/research-based-marketing` | `/research-based-marketing/` |
| `https://bambooreports.com/` | `/gcc-insights/` and the retired `/solutions/gcc-intelligence` route redirect externally |
| `/about` | `/about-us/` |
| `/careers` | `/career/` |
| `/contact` | `/contact-us/` + four near-identical `*-peq` funnels |
| `/privacy-policy` | `/policy/` |

Retired with a redirect to `/`: `/element-page/`, `/elementor-41865/` (Elementor scaffolding), `/the-2021-india-cloud-computing-survey/` (expired).

Removed with no replacement: `/solutions`, `/thank-you`, `/terms/survey`, and `/terms/raffle`; these routes now use the branded 404 and their legacy confirmation/terms URLs are intentionally not redirected.

---

## Verified

- Final pre-commit check for the new internal Resources routes, Implementer’s Guide report landing, Jotform integration, report imagery, navigation, and motion updates: `npm run lint` clean and `git diff --check` clean; all current tracked and untracked files are ready for the requested `dev` commit and push.
- Final pre-commit check for the current About/Careers, 404, thank-you removal, route/config, homepage/navigation, and shared UI/content changes: `npm run lint` clean and `git diff --check` clean; all current changes are ready for the requested `dev` commit and push.
- Removed the `/solutions` → `/` redirect so the retired `/solutions` hub now reaches the branded 404, while the three `/solutions/[slug]` pages remain active; verified by redirect, route-file, and dynamic-slug inspection. No project commands were run for this change.
- Replaced the generic fallback with a branded global 404 page for all unknown routes: a responsive Research NXT “broken request trace” instrument graphic, explicit 404 status and recovery copy, Home/Contact actions, and `noindex` metadata. Per follow-up direction it uses the current light `hero-wash` structure with no navy background, and the secondary “Explore our solutions” section was removed. Verified by source and diff inspection, a clean `npm run lint`, and the Impeccable detector (no findings); browser rendering remains unverified because no dev server was authorized.
- Removed the `/thank-you` page, its `robots.txt` rule, and the two legacy redirects that targeted it. Contact and career form submissions now show the existing confirmation copy inline instead of navigating to a separate route. The app now has 8 locally rendered pages, all represented in the sitemap; verified by source/reference inspection, diff review, and a clean `npm run lint`.
- Audited the currently active App Router pages: 8 locally rendered, public/indexable sitemap routes. Confirmed `/solutions` is retired to the branded 404, GCC Intelligence redirects externally, and only the three local solution slugs are generated. Verified by route-file, content, sitemap, and redirect inspection; no project commands were run.
- Updated Santosh Abraham’s `/about` leadership profile with the supplied Founder and Lead Analyst title, 22+ years of experience, current product/data/client leadership scope, weekly analyst-team dataset work, and FLAME University, MIDAS, and NASSCOM roles; verified by source inspection, diff review, and a clean `npm run lint`.
- Removed Diptarup Chakraborti and the now-empty “Our Mentors” section from `/about` because he is no longer with Research NXT; verified by source inspection and diff review. No project commands were run for this change.
- Restored `/careers` to the content of the original `researchnxt.com/career/` page: original “Together with Research NXT” introduction, current-opening titles and summaries, and general application heading/action. Removed invented benefits, job metadata/responsibilities, accordion instructions, fallback email copy, and closing CTA; verified against the indexed live source, by source inspection, and with a clean `npm run lint`.
- Restored `/about` to the content of the original `researchnxt.com/about-us/` page: original hero, “Who we are?”, statistics, culture, and leadership copy plus the original leadership social links. Removed rewritten culture principles, the extra closing CTA, and other added page copy; verified against the live source, by source inspection, and with a clean `npm run lint`.
- Added accessible hover/focus/tap tooltips to “Company Information” and “Contact Information” under both “ICP Assessment & Market Sizing” and “Custom List Building & Contact Discovery” on `/solutions/prospect-database`; the tooltips expose “12 Firmographic Data Points” and “8 Data Points” without duplicating visible copy. Verified by source inspection, diff review, and a clean `npm run lint`.
- Corrected the single-line solution statements so the longest Research-Based Marketing statement fits within the desktop viewport instead of clipping horizontally, while retaining readable wrapping below the desktop breakpoint; verified against the supplied 1908px-wide screenshot and by source inspection. No project commands were run for this change.
- Removed the introductory datasheet download actions from `/solutions/account-intelligence` and `/solutions/research-based-marketing`, and removed the now-unused shared proposition-action support; verified by source inspection and diff review. No project commands were run for this change.
- Kept the central statements on `/solutions/account-intelligence` and `/solutions/research-based-marketing` on one responsive line, matching the prospect-database treatment; verified by source inspection and diff review. No project commands were run for this adjustment.
- Restored `/solutions/account-intelligence` and `/solutions/research-based-marketing` to the wording and content order of their original Research NXT pages, removed rewritten copy and closing CTA bands, and retained the original hero and introductory datasheet actions; verified against both live sources, by source inspection, and with a clean `npm run lint`.
- Removed the closing CTA band from `/solutions/prospect-database` while retaining its hero CTA; verified by source inspection and diff review. No project commands were run for this change.
- Kept “Hyper-focused B2B Campaign Data = Meaningful Brand Connects” on one responsive line on `/solutions/prospect-database` without changing other solution statements; verified by source inspection and diff review. No project commands were run for this adjustment.
- Restored `/solutions/prospect-database` to the wording and content order of the original `researchnxt.com/prospect-database/` page, removing rewritten copy and extra page-specific claims/CTAs; verified against the live source, by source inspection, diff review, and a clean `npm run lint`.
- Removed the shared “Also from Research NXT” / “Other solutions” cross-link section from all solution detail pages; cleaned up the unused `next/link` import and verified by source inspection and diff review. No project commands were run for this change.
- Removed the full metrics/detail strip from `/solutions/account-intelligence` (the `1.5k+` account maps, `250+` CXO interviews, and `20+` reports section); verified by source inspection and diff review. No project commands were run for this change.
- Removed the full metrics/detail strip from `/solutions/prospect-database` (the `12` firmographic, `8` contact, and `500k+` records section); verified by source inspection and diff review. No project commands were run for this change.
- The last production build/crawl verification predates the current route removals; a fresh build has not been run because project commands require explicit permission
- `npm run lint` — `src/` warning-free
- The redirect map now contains 13 rules; the earlier redirect-response verification predates the current removals
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

- `/resources` hub with type + topic filters; four internal category placeholder pages now exist (Experts view has graduated to a real page), but the hub does not
- Remaining detail templates: insight (article format), case study, event; the reusable report landing template (Implementer’s Guide) and the interview template (Experts view) now exist
- Migrate ~106 WordPress posts to MDX, with `legacyPaths` frontmatter driving a generated redirect map
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
