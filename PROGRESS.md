# Progress

Migration of researchnxt.com from WordPress + Elementor (Hostinger) to Next.js, now hosted on Hostinger (staging: lightgrey-weasel-803291.hostingersite.com); the earlier Netlify target and netlify.toml are legacy.

Last updated: 2026-09-09

## Dependency vulnerability fixes prepared, 2026-09-09

A dependency scan flagged 14 unpatched advisories (2 critical, 9 high, 3 moderate): next 16.2.12 (two unauthenticated RCE advisories, fixed in 16.3.3), sharp 0.34.5 (libheif, fixed in 0.35.4), js-yaml 4.3.0 (fixed in 4.3.2), brace-expansion 1.1.16 and 5.0.8 (DoS, fixed in 1.1.18 and 5.0.9) and postcss 8.4.31 pinned by next (fixed in 8.5.18). Bumped `next` and `eslint-config-next` to ^16.3.3 in package.json; next 16.3.3 itself pins postcss 8.5.23 and sharp ^0.35.3. Added npm `overrides` for js-yaml, both brace-expansion majors, postcss and sharp so the transitive copies resolve to patched versions. Fixed versions were confirmed to exist on the registry with `npm view`.

Page 2 of the scan added nanoid 3.3.16 (fixed in 3.3.18, pulled in by postcss) plus further sharp and postcss advisories; added a nanoid override. A read-only `npm audit` against the current lockfile confirmed the same six package groups and nothing beyond them: brace-expansion, js-yaml, nanoid, next, postcss, sharp. Note npm requires postcss >=8.5.23 (not the 8.5.18 the Hostinger scan suggests), which the override already targets.

User then authorized installation. `npm install` completed (2 added, 1 removed, 14 changed); next resolved to 16.3.4, sharp 0.35.4, postcss 8.5.23, js-yaml 4.3.2, nanoid 3.3.18, brace-expansion 1.1.18 and 5.0.9. `npm audit` now reports 0 vulnerabilities and `npm run lint` passes clean. `next build` has NOT been run (no permission asked for it yet) and should be smoke-tested since this crosses a Next minor (16.2 to 16.3). Changes are local and uncommitted; the Hostinger scan should be rerun after redeploy.

## Hero, solution and icon updates prepared for commit/push, 2026-09-07

User authorized committing and pushing all accumulated session work to main: redesigned solution presentation, generated hero backgrounds for solutions/resources/About/Careers with source prompts and retained earlier artwork, About description, Careers application row, Remix icon migration and source/license files, aligned resource-card CTAs, and navbar About Us label. Full-site ESLint and diff whitespace checks passed during implementation; final commit checks repeat them. Browser/build verification remains outstanding under project command restrictions. Git history and origin tracking state record the commit/push result.

## Navbar About Us label, 2026-09-07

Changed the primary navigation label from “About” to “About Us”, covering desktop and mobile navigation through shared config. Destination remains `/about`; footer label is unchanged. Verified by source inspection and `git diff --check`. No project execution required.

## Resource card Read more links aligned, 2026-09-07

Added `h-full` to ResourceCard so it fills its stretched rail item and the existing `mt-auto` on Read more aligns links along the row bottom despite one- versus two-line titles. Applies to homepage report and interview cards using this shared component; copy and links are unchanged. Targeted ResourceCard lint and `git diff --check` passed. Browser verification remains pending under project command restrictions.

## Site icon QA and Remix migration, 2026-09-07

Completed source icon inventory and replaced remaining custom UI glyphs with official Remix Icon v4.6.0 geometry via `src/components/ui/remix-icon.tsx`. Updated shared navigation/menu/close controls, social icons, email, button/external arrows, carousel chevrons, video play button, report theme and offer icons, design preview arrows and 404 close marker. Solutions' already-migrated CapabilityIcon was left unchanged. Brand logos, 404 connecting-line illustration, bullets and brand square/rule decorations remain. Official SVG sources and provenance are in `public/icons/remix/`; Apache-2.0 license remains in public/licenses/remixicon.txt. No dependency installation.

Full-site ESLint and diff whitespace checks passed. Source QA checked decorative aria-hidden/nonfocusable icons, parent accessible labels, arrow direction/rotation and existing interaction handlers. Remaining inline SVG is limited to official Remix renderers, brand logo and 404 illustration. Full rendered/browser/build QA has NOT run under AGENTS.md command restrictions; this remains outstanding rather than claimed complete. Changes are local and uncommitted.

## Solutions adopt regenerated background heroes, 2026-09-07

Generated three new wide solution backgrounds using the built-in image generator, with empty left space and right-side contact archive, company network, and research-to-audience scenes. Saved `public/hero-backgrounds/prospect-database.png` (1932x814), `account-intelligence.png` (1922x818), and `research-based-marketing.png` (1802x873). Exact prompts are in `public/hero-backgrounds/solution-prompts.md`; previous separate-panel art remains in public/solutions.

Switched the shared solution route to PageHero backgroundImage, matching the approved white fade, right alignment, desktop scale and compact minimum height used by Resources/About/Careers. Actual height can grow to accommodate longer solution copy and buttons. Preserved all solution copy, Solution eyebrow/square, CTAs and body layouts. No shared layout changes were needed.

Verified new images visually, checked file dimensions and source references, passed targeted solution-page ESLint and `git diff --check`. No build/server/browser commands run under project restrictions; rendered responsive appearance remains unverified. Changes are local and uncommitted.

## Previous background artwork position restored, 2026-09-07

Reverted the last 5% desktop left shift at user request. All seven background heroes again use the previous right alignment and 125% desktop scale; height, fade and images are unchanged. This supersedes the left-shift entry below. Targeted PageHero ESLint and `git diff --check` passed; browser verification remains pending.

## Background artwork shifted slightly left, 2026-09-07

Moved the shared background hero image 5% left at desktop widths, retaining its existing scale, hero height and fade. Applies to all five resource categories, About and Careers; mobile positioning is unchanged. Targeted PageHero ESLint and `git diff --check` passed. Browser positioning remains unverified under project command restrictions.

## Seven hero backgrounds regenerated for shallow headers, 2026-09-07

Regenerated artwork for all active background heroes: five Resources indexes, About and Careers. Built-in generation prompts requested a 1920x352 panoramic canvas, left-side text whitespace and small right-side scenes with vertical safety margins. The generator returned landscape files approximately 1700x920, not the exact requested ratio. Saved them non-destructively in `public/hero-backgrounds/` and recorded exact prompts and this limitation in `prompts.md`. Solutions remain on their existing separate image panels.

Updated all seven backgroundImage references. PageHero now fits background art by height using object-contain/right alignment with a 25% desktop enlargement, replacing cover cropping and the 65%-width image region. This adapts the new scene whitespace to the existing approximately 352px desktop hero without stretching the illustrations. Existing subtle white fade, copy, CTAs, and labels are retained. Exact 1920x352 raster deliverables were not produced by the generator.

Verified each generated image visually, checked actual PNG dimensions and asset paths, passed targeted ESLint for PageHero and all seven pages, and passed `git diff --check`. No browser/server/build commands run under AGENTS.md restrictions; rendered scene scale, edge blending and responsive crop remain unverified. Changes are local and uncommitted.

## Background hero height and artwork framing adjusted, 2026-09-07

User asked to zoom artwork out, then suggested a slight height increase or regenerating at the banner ratio. Applied the sizing option: raised desktop background hero content minimum from 240px to 272px (approximately 352px total including padding), and narrowed the desktop artwork area from 80vw to 65vw, keeping it aligned right. With object-cover this reduces image enlargement and exposes more vertical scene detail. Responsive image sizes now match. Reuses current assets for Resources, About and Careers; no images regenerated. Targeted PageHero ESLint and `git diff --check` passed. Browser crop/appearance remains unverified under project command restrictions.

## Background hero heights reduced, 2026-09-07

Reduced shared background hero padding from 48/64px to 32/40px per side. Removed mobile/tablet minimum heights and lowered desktop content minimum from 384px to 240px, reducing the typical desktop banner from 512px to 320px while allowing long copy to expand naturally. Applies to all five resource categories, About and Careers. Separate-image solution heroes and other hero variants retain their existing sizing. Targeted PageHero ESLint and `git diff --check` passed. Browser wrapping/cropping remains unverified; no build/server commands run under project restrictions.

## Resource heroes use subtle white background fade, 2026-09-07

Applied the approved About/Careers background treatment to all five resource category indexes: Reports & Whitepapers, Experts View, Insights, Events and Success Stories. Replaced their separate PageHero media panels with backgroundImage props, reusing the shared subtle white fade and responsive background layout. Experts View retains the corrected interview artwork. Resources labels/squares, all copy, listings and pagination are preserved; solution heroes are unchanged.

Verified targeted ESLint across all five resource pages and `git diff --check` passed. Browser cropping, contrast and responsive appearance remain unverified; no build/server commands run under project restrictions. Changes remain local and uncommitted.

## About/Careers fade returned to softer white, 2026-09-07

User rejected the black treatment. Restored light background and original dark heading/description colors for background heroes. Reduced the white fade opacity and made it clear earlier on desktop (transparent by 75%, with 20% opacity at 60%) to expose more artwork than the original pale version. Mobile opacity is also reduced while retaining a reading veil. Only About/Careers currently use this treatment. Targeted PageHero lint and diff whitespace checks passed; rendered contrast and appearance remain unverified under project command restrictions.

## About and Careers black hero fade, 2026-09-07

Changed the background-hero trial from pale to black fades at user request. About/Careers now have a black base, stronger dark overlay behind white headings and near-white descriptions, fading toward the artwork on desktop. Mobile retains a dark veil across the image for readability. Scoped text overrides apply only to background-image heroes; separate-image resource and solution heroes are unchanged. Existing copy and assets are retained.

Verified targeted ESLint for PageHero and `git diff --check` passed. Browser rendering remains unverified; no build/server commands run under project restrictions.

## About and Careers background hero trial, 2026-09-07

On user request, switched only About and Careers to background artwork using an optional `backgroundImage` prop on shared PageHero. Images sit behind the hero with a pale left-to-right fade, limited text measure, and taller hero space. Mobile uses a stronger veil for readability. Solution and resource pages retain their separate artwork panels. All copy and Careers application links remain unchanged; existing artwork is reused.

Verified targeted ESLint for PageHero, About and Careers and `git diff --check`. Browser appearance, cropping and rendered contrast remain unverified; no build/server/browser commands run under project restrictions. Trial is local and uncommitted.

## Careers opening layout connected to application, 2026-09-07

Addressed the isolated single-role presentation: replaced the half-width openings grid with full-width ruled rows, tightened section spacing, increased summary text to base size with readable measure, and placed an “Apply now” anchor alongside each role (below on mobile). Links point to the existing form section via `#application` with scroll margin for the sticky header and role-specific accessible names. Existing role title, summary and form are retained; no role preselection is implied. Targeted ESLint and `git diff --check` passed. Browser layout/anchor verification remains pending; no build/server commands run under project restrictions.

## About hero description added, 2026-09-07

Added user-requested description beneath “About us” via `aboutHero.lede`, using existing positioning: boutique market intelligence for B2B technology leaders, understanding markets, identifying accounts and turning research into business conversations. The existing introduction and generated hero image remain. Targeted ESLint and `git diff --check` passed; browser rendering remains unverified under project command restrictions.

## Experts View interview correction and About/Careers banners, 2026-09-07

Replaced the podcast-style Experts View banner with an editorial face-to-face executive interview illustration, using `public/resources/banners/experts-view-interview.png`. The old artwork remains unused; the new filename avoids stale cached imagery. Exact replacement prompt is in the adjacent `experts-view-interview-prompt.md`.

Generated and integrated About (research analysts examining company models) and Careers (welcoming collaborative workplace) hero images at `public/company/banners/about.png` and `public/company/banners/careers.png`. Both use the existing PageHero media slot, matching resource and solution banners. All original page copy remains; About retains its title-only hero and separate introduction. Artwork is fictional editorial illustration, not real team photography. Built-in image generation was used; exact prompts are in `public/company/banners/prompts.md`, and originals remain in Codex generated_images.

Verified all three generated images visually, copied final assets into the workspace, and passed targeted ESLint for About, Careers and Experts View plus `git diff --check`. No build/server/browser commands run under project restrictions. Rendered responsive layout and runtime image optimization remain unverified. Changes are local and uncommitted.

## All five resource hero images generated and integrated, 2026-09-07

Created coordinated blue/white/orange 1536x1024 artwork using the built-in image generator for Reports & Whitepapers (publications), Experts View (interview setting), Insights (optical prism and research), Events (conference stage), and Success Stories (milestone path). Saved all five PNGs in `public/resources/banners/`; exact prompts and generation method are in `public/resources/banners/prompts.md`. Originals remain in the Codex generated_images directory.

Integrated each image into its resource category index through the existing PageHero media slot. Preserved Resources eyebrow/square, headings, descriptions, metadata, pagination and listings. Images sit beside text on desktop and below on mobile, with intrinsic dimensions, responsive Next Image sizes, preload and empty decorative alt text. No dependencies or client components added.

Verified generated images visually, confirmed files exist, and passed targeted ESLint for all five changed resource pages plus `git diff --check`. No build/server/browser commands run under AGENTS.md restrictions. Rendered desktop/mobile heroes and runtime image optimization remain unverified. Local work is uncommitted.

## Solution hero eyebrow added, 2026-09-07

Added the user-requested “Solution” eyebrow to all three shared solution heroes. PageHero/SectionHeading supplies the existing orange square marker and dotted rule, matching the Resources treatment. Other copy and artwork are unchanged. Targeted ESLint and `git diff --check` passed; no build/server/browser commands run.

## Solution heroes use shared PageHero, 2026-09-07

User requested the hero treatment used on `/resources/reports-whitepapers`, with the generated images added. Replaced custom solution hero markup with shared `PageHero`, retaining all original headings, descriptions and CTA links. Added optional `media` slot to PageHero: artwork sits beside copy on desktop and below it on mobile. Shared heading weight, lede size, tight section spacing, hero wash and text entrance now match the resources hero. Existing PageHero callers without media retain their styling. Removed custom orange rule from solution heroes; no new eyebrow copy was added. Earlier stacked Prospect Database paragraphs and capability improvements are retained.

Verified targeted ESLint for both modified components and `git diff --check` passed. No builds, servers or browser commands were run under AGENTS.md restrictions; rendered responsive layout remains unverified. Changes remain local and uncommitted.

## Prospect introduction paragraphs stacked, 2026-09-07

Changed only the Prospect Database proposition body to two full-width paragraphs stacked vertically at every breakpoint, as requested. Wording is unchanged; the other solution introduction layouts retain their desktop columns. Verified with targeted ESLint and `git diff --check`; browser verification remains pending under project command restrictions.

## Separate solution banner layout restored, 2026-09-07

User preferred the preceding layout. Reverted only the background-image/fade treatment: all three heroes again show copy on the left and a separate rounded artwork panel on the right on desktop, stacked below copy on mobile. Removed `.solution-hero-fade` CSS. Generated assets, original copy, CTAs and earlier page improvements remain. This supersedes the background-banner entry below.

Verified: targeted ESLint and `git diff --check` passed. No build/server/browser commands run; rendered verification remains pending. Changes remain local and uncommitted.

## Solution banners moved behind hero copy, 2026-09-07

User requested background images with a fade. All three solution heroes now use their generated banner as an absolutely positioned decorative Next Image, with a pale horizontal gradient above the image and existing copy/CTAs above both. Desktop artwork occupies the right 75% and fades into the solid left text surface. Small screens use a stronger pale veil across the full image to preserve readability. Removed the separate image panel; copy and links are unchanged. CSS is scoped to `.solution-hero-fade` and image sizes reflect the new background width.

Verified by source review, targeted ESLint and `git diff --check`. Browser rendering, crop and visual contrast remain unverified; no build/server commands run under project command restrictions. Changes remain local and uncommitted.

## Generated solution hero banners, 2026-09-07

Generated three coordinated blue/white/orange 1536x1024 editorial 3D illustrations using the built-in image generation tool. Saved final assets as `public/solutions/prospect-database-banner.png`, `public/solutions/account-intelligence-banner.png`, and `public/solutions/research-based-marketing-banner.png`. Exact prompts and generation method are recorded in `public/solutions/banner-prompts.md`. Original generated files remain in the Codex generated_images directory.

Updated the shared solution hero to group the existing heading, description and CTA on the left with the relevant banner on the right at desktop widths; mobile stacks artwork below copy. Images use Next Image with intrinsic dimensions, responsive sizes, preload and decorative empty alt text. All existing copy, links, capability layouts and Remix icons remain intact.

Verified all three generated artworks visually, checked asset presence, and passed targeted ESLint and `git diff --check`. No build/server/browser commands were run under AGENTS.md command restrictions. Rendered desktop/mobile layout and image optimization remain unverified. Local changes are uncommitted.

## Three solution pages presentation refresh, 2026-09-07

Updated the shared `/solutions/[slug]` template for prospect-database, account-intelligence and research-based-marketing. Added split desktop heroes, readable two-column proposition paragraphs, brand-blue outcome bands, and always-visible responsive capabilities instead of the mobile carousel. Prospect capabilities use a two-column icon-led layout, account intelligence uses paired tinted panels, and marketing uses open desktop columns. All existing solution copy, order, links, metadata and tooltip text are retained; `src/content/solutions.ts` is unchanged. CTA height can expand for wrapping on narrow screens.

Replaced all nine hand-drawn capability glyphs with official Remix Icon v4.6.0 SVG paths, adapted to the existing server-rendered component without dependencies. Upstream Apache-2.0 license is stored at `public/licenses/remixicon.txt`; source names and attribution are in the component.

Verified: targeted ESLint passed for both TSX files, source review confirmed copy bindings remain, and `git diff --check` passed. Build, browser, and skill setup/detector scripts were not run under AGENTS.md command restrictions. Desktop/mobile rendering, exact wrapping and tooltip behavior remain unverified. Changes are local and uncommitted.

## Shared animation recovery prepared for push, 2026-09-07

User authorized committing and pushing the shared motion-preference recovery, homepage entrance, and restored step/delay exports to main. Targeted lint and diff whitespace checks passed. The missing-export cause is corrected by inspection; a production build and browser verification have not been run under project command restrictions. The staging hydration mismatch remains undiagnosed. Git history and origin tracking state record the commit/push outcome.

## Motion helper exports restored after build regression, 2026-09-07

The shared motion update accidentally replaced existing `src/lib/motion.ts`, removing `step` and `delay` and causing the user-reported missing-export build failure. Restored both helpers verbatim from HEAD while retaining `syncMotionPreference`. Inspected all motion-module imports: existing consumers require step/delay and new animation consumers require syncMotionPreference; all three are now exported. Targeted lint and diff whitespace checks passed. Build was not rerun under project command restrictions. Changes remain local and uncommitted.

## Shared animation recovery and homepage entrance, 2026-09-07

Audited remaining animation gates. FigureValue, HeroField and HeroQuestions still exited on missing root motion flags; now they and HeroIntro use `syncMotionPreference` to read the browser preference directly and synchronize the CSS flag. Added MotionPreference in the root layout to restore CSS animation activation after client mount on every route, including direct inner-page visits, and synchronize later preference changes. Existing inline startup remains as the early path. User clarified the whole page should enter: current homepage had no page-level entrance class, so applied the existing `anim-rise` to main while retaining HeroIntro's word sequence. Reduced-motion rules remain in force.

Verified: targeted ESLint and diff whitespace checks passed; search finds no remaining `dataset.motion !==` early exits. Browser/build/server checks were not run under project permissions. These are local uncommitted changes; deployment animation and the underlying React #418 cause remain unverified. CSS activation recovery does not claim to solve the hydration mismatch.

## Hero animation fix prepared for commit and push, 2026-09-07

User authorized committing and pushing HeroIntro's direct motion-preference check and flag restoration to `main`, together with diagnosis notes. Targeted lint and diff whitespace checks passed. Browser/deployment verification and the underlying React #418 diagnosis remain outstanding. Commit/push result is recorded by Git history and origin tracking state.

## Hero entrance resilient to missing motion flag, 2026-09-07

User reproduced missing `data-motion` in Guest mode. Downloaded staging HTML read-only and confirmed the expected inline motion script is present, ruling out omission from the response. Exact reason the flag is absent afterward remains unproven; user previously reported React #418. Updated HeroIntro to read the actual reduced-motion preference directly and restore the root motion flag before constructing its GSAP entrance timeline. It no longer silently exits solely because the early script flag is missing. Reduced-motion users still skip the entrance. This is a resilience fix, not a verified resolution of the hydration mismatch.

Verified: targeted ESLint and diff whitespace checks passed. No build/server/browser execution under project permissions. Fix is local, not committed or pushed. Next: deploy this fix when authorized and verify entrance; investigate any remaining #418 separately.

## Staging animation console evidence, 2026-09-07

User reports `reducedMotion: false`, missing root motion flag, and active logo CSS animation after the fix. Console shows extension-resource failures, React #418 hydration mismatch, and favicon 404; no supplied CSP violation. Official React error documentation confirms #418 means server/client HTML mismatch and client regeneration; browser extensions are one possible cause, not proven here. HeroIntro checks the root flag once in useLayoutEffect and exits when absent, explaining the skipped entrance. Next diagnostic: compare staging in a Guest/extension-free browser and check whether #418 and missing flag persist. No further UI change or development commands run. Logo fix was pushed as `68eca23`; current work is diagnosis of the separate entrance issue.

## Logo scrolling fix prepared for push, 2026-09-07

User authorized committing and pushing the CSS motion-gate fix to `main`. Scope is `src/app/globals.css` and these progress notes. Diff whitespace check passed. Browser animation and deployment verification remain outstanding; no build or server commands run. Git history and origin tracking state record the commit/push result.

## Trusted logos scrolling independent of JavaScript, 2026-09-07

User confirmed the intended appearance is the scrolling strip. Replaced logo-specific `[data-motion="on"]` selectors with a `prefers-reduced-motion: no-preference` CSS media query. The existing 38-second seamless strip now activates without the layout startup script; hover still pauses it. Reduced-motion visitors retain the complete static grid, and changing the preference updates via CSS. Other motion gates are untouched. Source/diff inspection verified the selector replacement and duplicate-list override; no build/server/browser commands run under project restrictions. Not yet committed, pushed or deployed; live cause and animation remain unverified.

## Staging Trusted by screenshot diagnosis, 2026-09-07

User supplied staging screenshot showing logos in a static grid. Source inspection confirms this is the default `.trusted-logos-list` layout; the horizontal marquee requires the root `data-motion="on"` flag. Layout's inline motion gate sets that flag only when reduced motion is not requested and JavaScript executes successfully. Screenshot is consistent with the fallback, but does not establish whether reduced motion, blocked JavaScript, or another deployment condition caused it. Web fetch of staging failed; live DOM/browser state was not verified. No UI change made. Next: establish whether the user wants the static grid restyled or expects the scrolling strip, and inspect live motion preference/root flag if needed.

## Homepage changes prepared for commit and push, 2026-09-07

User authorized committing and pushing the accumulated homepage work on `main` to `origin`. Scope includes headline copy, selected engagement/Why Research NXT layouts, mobile solutions grid, spacing fixes, comparison routes and spotlight components. Targeted lint and diff whitespace checks passed as recorded below. Browser QA remains unperformed; no new build/server/test permission was inferred from the commit request. Commit and push are the current handoff operation; confirm their result from Git history and remote tracking state.

## Homepage source QA and spacing fixes, 2026-09-07

Used Impeccable polish guidance for a bounded source review of the homepage, heading/button patterns, resource cards/rails, and logo strip. Removed the hero's bottom border because the next section already supplies a top border. Restored Why Research NXT to shared SectionHeading so its orange marker, dotted rule and spacing match other labels, retaining full-width heading text. Resource heading/CTA rows now stack until `md` to reduce tablet crowding. Mobile heading-to-content gaps are 2rem, retaining prior desktop spacing. Resource and solution links have 44px minimum height; Bamboo CTA text has its own shrinkable wrapping span beside the arrow. Existing selected layouts/copy and mobile 2x2 solutions without descriptions are preserved.

Verified: ESLint passed for the homepage and its home components, resource rail/card and SectionHeading; `git diff --check` passed. This is source QA only. Browser viewport, exact line wrapping, overflow, focus and interactive verification remain pending permission to run the relevant development/browser commands under AGENTS.md. No server/build/test commands were run. Next: obtain permission for a desktop/mobile browser pass and fix any rendered defects it reveals.

## Why Research NXT orange marker restored, 2026-09-07

Restored the decorative orange square beside the homepage Why Research NXT eyebrow using the existing `bg-signal`, size, radius, and spacing from SectionHeading. Verified by source inspection and `git diff --check`. No build/server/browser commands run; rendered appearance remains unverified. Requested fix complete.

## Engagement Stepped journey applied, 2026-09-07

User selected round-two option 1. Homepage engagement now uses the preview's Stepped journey: four open stages descending across desktop with connected blue rules, stacking on mobile. All descriptions and outcomes remain visible. Replaced the prior expandable layout and updated comparison-page status. This resolves the pending engagement selection below.

Verified: targeted ESLint for homepage and engagement preview, plus diff whitespace check, passed. No build/server/browser commands run under project permissions; rendered verification remains outstanding. Implementation complete.

## Engagement round two and mobile solutions copy, 2026-09-07

User requested more distinctive engagement alternatives. Replaced `/design/engagement` with (1) Stepped journey, four descending open stages on desktop that stack on mobile; (2) The handoff, three research stages leading into a large blue Qualified pipeline destination; and (3) Stage spotlight, manually selected stage/outcome presentation. Added `src/components/home/engagement-spotlight.tsx` with native selector buttons, pressed states, unique panel ID and live region. No autoplay. Existing copy retained. Homepage engagement remains expandable pending user selection; earlier preview options are superseded.

Also hid What we do descriptions below `sm` on user direction. The mobile 2x2 grid retains markers, titles, and links; subgrid spans use three rows on mobile and four from `sm` to avoid an empty description row. Desktop descriptions remain visible.

Verified: targeted ESLint passed for the new preview, spotlight and homepage; diff whitespace checks passed. No build, server, or browser commands run under project restrictions. Rendered appearance and spotlight interaction remain unverified. Next: user selects a round-two engagement option at `/design/engagement`.

## Why Research NXT heading width, 2026-09-07

Removed the homepage heading's `max-w-4xl` constraint so the existing balanced headline can use the full container and target two lines on desktop. Copy and font scale are unchanged; mobile continues to wrap naturally. Targeted ESLint and diff whitespace checks passed. Browser line count remains unverified because no server/browser commands were run under project permissions.

## Why Research NXT: Experience leads applied, 2026-09-07

User selected round-two option 1. Replaced the homepage differentiator bento/carousel with the chosen Experience leads composition: white section, large blue 7+ years statement with a curved top-right corner on desktop, and three open supporting reasons alongside (stacked on mobile). Preserved supplied claims and descriptions. Comparison page status now identifies option 1 as applied. This resolves the pending selection below.

Verified: targeted ESLint for the homepage and comparison page and `git diff --check` passed. No server/build/browser commands run per project permissions; browser visual verification remains outstanding. Requested implementation complete.

## Why Research NXT round two and mobile solutions grid, 2026-09-07

User rejected the first Why Research NXT studies because they were not visually different enough. Replaced `/design/why-research-nxt` with three new compositions: (1) a large 7+ experience statement on a shaped blue panel with supporting reasons alongside, (2) staggered oversized typographic statements, and (3) a manually selected reason spotlight. New `src/components/home/reason-spotlight.tsx` uses native buttons, pressed states, and a live region, with no autoplay. Existing claims are retained. Homepage Why Research NXT is unchanged pending selection; earlier options are superseded.

Also changed homepage What we do from CardRail to a semantic static grid: two columns on mobile/tablet, four on desktop, with no previous/next controls or horizontal carousel. All four solutions and links remain; chosen title line breaks now apply on mobile too. Other rails are unaffected.

Verified: targeted ESLint passed for all three changed TSX files; diff whitespace check passed. No build/server/browser commands run under project permissions, so rendered responsive layout and spotlight interaction remain unverified. Next: user chooses a round-two Why Research NXT option at `/design/why-research-nxt`.

## Why Research NXT layout alternatives, 2026-09-07

Added comparison route `/design/why-research-nxt` in `src/app/design/why-research-nxt/page.tsx`. Three variations preserve the differentiators headline and all four reasons from `src/content/home.ts`: (1) an open two-column list beside the heading, (2) a full brand-blue band with four open columns, and (3) native expandable reasons with the first initially open. All adapt to mobile. Frontend-design and Impeccable guidance informed reducing card framing and comparing spatial hierarchy, colour emphasis, and disclosure. Homepage remains unchanged pending the user's selection. Preview has noindex/nofollow metadata and is not linked in site navigation.

Verified: targeted ESLint and `git diff --check` passed. No build, server, or browser commands run under project permissions; visual verification remains outstanding. Skill scripts remain skipped under the same command restrictions. Next: user chooses option 1, 2, or 3, then apply it to the homepage.

## Engagement option 3 selected and applied, 2026-09-07

User chose Expandable steps. Applied the preview's option 3 layout to the homepage in `src/app/page.tsx`: native details/summary rows, first step open initially, names and outcomes always visible, plus/minus indicators, and independently expandable descriptions. Preserved all engagement copy. Updated the comparison page's status text; it remains available at `/design/engagement`. This supersedes the pending selection and vertical sequence described below.

Verified: targeted ESLint passed for the homepage and comparison page; `git diff --check` passed. No build/server/browser commands run under project permissions, so visual and interactive browser verification remains outstanding. Requested implementation is complete.

## Engagement layout alternatives, 2026-09-07

Added `src/app/design/engagement/page.tsx`, a comparison page at `/design/engagement` with three alternatives: an open horizontal timeline (vertical on smaller screens), deliverable-led rows, and native expandable steps with the first description initially open. All use the existing engagement copy and brand tokens. Frontend-design and Impeccable guidance informed varying structure rather than card styling. The homepage remains on the previously implemented vertical sequence until the user chooses. Preview metadata requests no indexing; the page is not linked in site navigation.

Verified: targeted ESLint and diff whitespace checks passed. No server, build, or browser commands run under project restrictions; rendered desktop/mobile appearance remains unverified. Next: user compares the options on their running site at `/design/engagement` and chooses one to apply to the homepage. Skill scripts remain skipped under the same command restrictions documented below.

## Homepage engagement sequence simplified, 2026-09-07

Replaced the four engagement cards and their mobile carousel in `src/app/page.tsx` with an ordered vertical sequence connected by a thin rule. Desktop places the introduction beside the process; mobile stacks the introduction and all four steps. Stage outcomes sit beside the names on wider screens and below them on phones. All original content is retained; Engage and Qualified pipeline receive blue text emphasis. Existing DM Sans typography and brand tokens are reused. Frontend-design and Impeccable distill guidance informed removing card surfaces and presenting the stages as one process.

Verified: targeted ESLint passed for `src/app/page.tsx` and `src/content/home.ts`; diff whitespace check passed. No build, server, or browser verification run under the user's project command restrictions. Impeccable setup script was skipped under those restrictions; incumbent source and tokens were read directly. Implementation complete; visual verification remains outstanding.

## Homepage hero copy updated, 2026-09-07

Changed `hero.headline` in `src/content/home.ts` to "Know your market, name your accounts". The third line remains "Reach the people inside them." Verified the content and diff by read-only inspection. No builds, servers, or tests run, per project command permissions; browser layout remains unverified. No implementation work remains for this copy change.

## Careers: Trainee Research Associate removed, 2026-09-07

User direction. The opening is deleted from `openings` in
`src/content/careers.ts`; the Sales Development Representative role
remains. Nothing else referenced the slug.

## Report landings on phones: form-only hero, mockup above About, 2026-09-07

User direction. Below `lg` the report landing hero is the download form
alone; the tablet mockup (`hero.cover`, the 768x909 render every report
has) is rendered a second time at the top of the About band, `lg:hidden`,
centred at w-52 / sm:w-64, without `priority`. The hero's mockup column is
`hidden lg:flex` and the sr-only h1 moved out of it so assistive tech
still gets the title on phones. Desktop is unchanged. Lint and tsc clean;
verified at 390px (form-only hero, mockup centred above the first
paragraph, no horizontal overflow) and at 1920px (hero mockup shown,
About copy hidden).

## Phone layout: rails for stacked sections, form anchor bar, 2026-09-07

User direction: on a phone the four Latest reports covers stacked one per
screen, so the next section was several swipes away; "we can add arrows
maybe"; then "check other sections where we would need to do such stuff";
then a sticky bottom bar on interviews and articles anchored to the form.

- `CardRail` (in `report-card-rail.tsx`) grew two things. Items may carry
  a `className` for their `li`. An optional `grid` prop makes the rail a
  phone-only device: from `sm` the `ul` becomes a grid with the given
  column and gap classes, the `li` widths reset, and the arrows hide, so
  tablets and desktops keep exactly the grids they had (subgrid rows and
  the bento spans verified at 1200px). On a phone the card is 82% of the
  rail so the next one peeks in as the scroll cue, and the arrows step it.
- Home Latest reports moved from the 4-up grid onto the rail (portrait
  ResourceCards). Converted to phone rail / grid-from-sm: home What we do,
  How we work (step cards) and Why Research NXT (bento); About milestones,
  engagement-mode stations and their assurances; the solution pages'
  capability cards. Those sections lost the `Reveal` stagger, as the
  other rails never had it.
- Measured at 376x815 through a same-origin iframe (px, before to after):
  Latest reports about 2000 to 940; What we do 1270 to 532; How we work
  1209 to 600; Why 1129 to 649; About milestones 1118 to 476; modes 1263
  to 690; solution capabilities 1578 to 752.
- New client component `src/components/forms/form-anchor-bar.tsx`
  (`FormAnchorBar`): a bar fixed to the bottom of the viewport below
  `lg` (where the form sits under the article instead of beside it),
  with a title and a button linking to `#download`. Visible by default;
  an IntersectionObserver hides it while the form is on screen. Renders
  a spacer so the footer clears it, and pads for the iOS safe area.
  Mounted on the interview page (only when the interview has a form) and
  the article page. Copy is `downloadBar` in `content/resources.ts`. On
  user direction the bar is a single full-width button, "Get the full
  report", with no title beside it, and the same label is now every
  report landing's `submitLabel`.
  CLAUDE.md's client-component list updated.
- Verified: lint and tsc clean; bar visible on load, hidden once the
  form is in view; arrows on all five home rails once the tab has a
  frame (they never appear in a hidden tab, see below).

## Mobile menu fix and QA sweep, 2026-09-07

User reported the menu did not work on mobile. Cause: the sticky header
carried `backdrop-blur-md`, and a backdrop filter makes its element the
containing block for `fixed` descendants, so the mobile sheet was sized
against the 112px header instead of the viewport and collapsed. Fix in
`src/components/layout/navbar.tsx`: the blur, background and border moved
to an inner div; the header itself is only sticky. Verified against the
user's running dev server (port 3000) through same-origin iframes at 320,
390, 600 and 1200px: the sheet opens with all twelve links, closes on
navigation, restores body scroll, and no page scrolls sideways.

Browser QA at phone width, every route, plus a source audit. Fixed:

- Experts-view library overflowed horizontally on phones: the pager's
  page-number list did not wrap (Buyer's perspective has 16 pages).
  `pagination.tsx` now wraps and centres the numbers.
- External-link icon dropped onto its own line in the mobile sheet
  (`block` overrode NavLink's `inline-flex`); the sheet links are `flex`.
- Solutions and Resources never showed the active underline, because the
  groups have no `href`; a group is now active when any child route is.
- `aria-controls="mobile-nav"` pointed at nothing while closed; it is set
  only while the sheet is rendered. The toggle got a 44px hit area.
- Sticky asides on interview, article and event pages pinned at 96px
  under a 112px header; now `lg:top-32`.
- Download-form internal links announced "(opens in a new tab)".
- Solution-page capability tooltips were read twice (tooltip text was in
  the button name and its description); `aria-label` on the button.
- Touch targets: quote-carousel dots 24px to 40px, About founder social
  icons padded to 40px like the footer's.
- Required-field marker was `text-signal` (orange text, against the
  rule); now `text-accent`. Logo's raw `#FF7D24` now `var(--color-signal)`.
- Latent duplicate React key in the experts-view grid (same person slug
  in two programmes within one section); keyed on project/slug.
- Stale comments: Phase B notes in `next.config.ts`, `nav.ts`,
  `report-card.tsx` and the quick-reads block in `resources.ts`; the
  three library page comments that still said "newest first".

Found but deliberately not touched (user's call):

- Dead code: `hero-questions.tsx` and `hero-field.tsx` are imported by
  nothing (CLAUDE.md still lists them as live client components), with
  their `.q-rotator*` and `.hero-field*` CSS in `globals.css`, plus
  `.on-signal`, `.anim-wipe`/`wipe-up` and the `Textarea` field.
- Unused assets: `public/hero2.jpg` (1.8 MB) and
  `public/logos/trusted/insideview.png`.
- Copy hardcoded in JSX on the four detail templates, `not-found.tsx`
  and `error.tsx`, against the "copy lives in src/content" rule.
- Test-environment note: `requestAnimationFrame` does not fire in a
  hidden Chrome tab, so rail arrows and GSAP hero motion appear frozen
  under automation; both work once the tab is visible.

## Libraries shelved by project order, 2026-09-07

User direction: sort the experts-view perspectives (starting with Buyer's
perspective), the reports and whitepapers shelf, and anything else that
can take it, by research programme, most recent first: Routematic
(corporate commute), Salesforce (Implementor's Guide to AI), Zoho Qatar
(Unified CX), Zoho India (Automation & Campaign Management), Transforming
CX through GCCs, Cloud Computing, AI Led Personalization, Southeast Asia,
then the rest as they were.

- New `src/content/project-order.ts` holds that list once (`projectOrder`)
  with `projectRank(slug)` and a `byProject` comparator. Slugs not on the
  list (industry-events, prospect-database, bamboo-reports) rank last.
- `expertInterviews` now sorts by project rank, then title, so every
  perspective section, its pagination and the sibling band on an
  interview page read Routematic first. `expertProjects` reordered to
  match (display only; lookups are by slug).
- `reportLandings` sorts by project rank, so the reports shelf and the
  sitemap follow it. `latestReports(count)` is now the head of that shelf
  rather than a publication-date sort, so the home page "Latest reports"
  band shows Routematic, Salesforce, Zoho Qatar, Zoho India. Note the
  hand order differs from the dates only in the 2020-2021 tail (cloud,
  then AI led, then Southeast Asia).
- `insights` sorts by project rank, then newest first within a project;
  `insightProjects` reordered to match.
- Success stories sort by project rank too, then newest first within a
  project; the prospect database story is not a research programme, so
  it sits last.
- Events went back to a plain chronology on user direction ("H-1B is the
  newest then redefining marketing excellence and then rest"). The
  undated marketing automation roundtable gained `published: "2025-01-13"`
  (the write-up's go-live date, a new optional `Event` field, never
  rendered) so the sort can place it second; the listing runs
  `date ?? published`, newest first.
- The home page Experts view band ("Perspectives from the people doing
  the work") is no longer hand-picked. On user direction it now reads
  the Buyer's perspective section of the sorted library, keeps the first
  two buyers from each programme (`BUYERS_PER_PROJECT`), and renders
  them as a scrolling rail, so the latest buyers sit in view, the rest scroll, and the band
  updates itself as programmes are added. `report-card-rail.tsx` was
  split for this: `CardRail` is the generic scroll-snap row taking
  `{ key, node }` items, and `ReportCardRail` is the `ReportCard` wrapper
  the three detail pages still use. The home rail drops the `Reveal`
  stagger, matching the other rails.
- Removed `src/app/loading.tsx` on user direction: the root loading
  skeleton (grey placeholder bars on the hero wash) flashed on every
  route change and read as stale UI. Pages are static content, so
  navigation has nothing to wait on; no other route carries a
  `loading.tsx`.
- Verified: `npm run lint` and `tsc --noEmit` clean. Not run: dev server
  or build (no permission asked).

## Full UI/UX QA round two: fixes applied, 2026-08-14

Three parallel code audits (component usage, a11y/UX states,
responsive/copy) swept the whole site; the browser was too janky for a
visual crawl (renderer at ~1fps under automation, established earlier),
so this round is source-driven. Fixes applied, lint/tsc/detector clean:

- Detail heroes normalised to PageHero rhythm: all four resource detail
  templates now use Section spacing="tight" (dropping the identical
  manual padding), gap-8 and 64ch ledes. Ledes still absent on
  insights/experts-view detail (content decision, open).
- A11y: report CardSpotlight's image-only link now carries the item
  title as alt (was nameless); form fields no longer suppress the
  keyboard focus ring; Breadcrumbs render ol/li; footer link columns
  are a nav aria-label="Footer"; sr-only "(opens in a new tab)" now
  emitted centrally by Button/Card external branches (ResourceCard's
  own copy removed to avoid doubling) and added to footer socials
  (via aria-label), announcement bar, speaker LinkedIn links, the
  SlideShare deck link and download-form external segments.
- Touch targets: footer social/mail links padded to 40px (-m-2.5
  p-2.5), pagination steps/numbers and both carousel arrow sets get
  before-pseudo expansion to ~44px, mobile sheet links get padded hit
  areas without layout shift.
- Mobile sheet top offset is now MEASURED from the header
  (headerRef.offsetHeight on open + resize) instead of the hardcoded
  top-28 that was 1px short and broke if the announcement strip
  wrapped.
- Empty states: all five libraries carry `empty` copy in their content
  modules and render it on zero items (experts-view when all sections
  are empty).
- Consistency: three success-story arrow CTAs got their missing
  `group` (arrows never animated); "Research focus"/"Timeframe of
  research" casing unified across content; experts-view perspective
  headings sentence-cased; solutions.ts GCC link label matches nav;
  curly apostrophes normalised in solutions.ts (not-found.tsx keeps
  its JSX-safe curly form, that is why it differed); iframe titles are
  noun phrases ("Report download form", "Handbook download form");
  About portrait alts emptied (name already adjacent); 404 min-h calc
  corrected 9rem->7rem and its CTA matches error.tsx ("Back to home");
  RuledHeading extracted to ui/ruled-heading.tsx and shared by
  about+careers; dead CTABand and CardFooter deleted; announcement bar
  aligned to the site container (px-gutter, max-w-page); reports shelf
  base gap tightened (gap-x-5) for 360px cards; homepage
  differentiators band and About story band went subtle to break
  double/triple default-surface runs.

Deliberately not done (need decisions or a visual pass): ledes on
insights/experts detail heroes, surface rhythm inside the events
detail and report microsite tails (conditional band chains), report
CTA verb unification ("View the report" vs "Read the full report"),
VideoEmbed focus handoff to the iframe, JotformEmbed's fixed 539px
no-scroll fallback, hero photo crop/sizes at mobile, centralising
detail-page CTA strings.

## Hero veil reshaped after "very faded" feedback, 2026-08-14

Verified in the browser against the user's running dev server (Chrome
automation, localhost:3000): the flat white sheet
(from-surface-bright/70 via-45 to-surface) was indeed fogging the whole
photograph. Replaced by a `.hero-veil` utility in globals: a radial
pool of light (72%->34%->transparent, 48x26rem at 50% 36%) behind the
centred text block carries the ink type's contrast, a whisper-tint
linear layer (22%->8%) keeps the high key, and the fade to
`--color-surface` is compressed to the bottom ~12% for the seam into
the next band. Sky and hills confirmed vivid in screenshots.

Perf side-quest, resolved as environmental: the entrance animation
crawled and Runtime.evaluate froze during checking, so the word blur
tween, the Ken Burns drift and the navbar backdrop-blur were each
suspected and temporarily removed. The controlled test (all animations
killed via injected CSS) still showed ~916ms avg frames with a 27s max,
proving the dev machine/environment was the bottleneck, not the page,
so ALL THREE were restored verbatim. Net change from this pass is the
veil only. The user should judge motion feel in a normal browsing
session, not under automation.

## Hero recomposed on the Bamboo HeroV2 pattern, 2026-08-14

On user direction ("check how bamboo-reports-web done here in hero
section do it similarly") the hero now mirrors Bamboo's HeroV2, ported
into this site's idiom: the photo drifts (Ken Burns `hero-image-drift`,
28s alternate scale 1→1.07, added to globals GATED behind
`data-motion="on"` so the static image is the default); a white veil
(`from-surface-bright/70 via-45 to-surface`) fades the photo into the
page, replacing the previous white-text-on-ink-scrim treatment (h1 back
to ink, lede to ink-soft, section underpaint back to hero-wash); the
headline's payoff line "Reach the people inside them." is now
`hero.headlineAccent` in home.ts, rendered as its own block line in
text-accent (as Bamboo sets "GCC GTM enablement"); and the band closes
on a `data-hero-rail` nav, the four whatWeDo solutions on a ruled
hairline rail (divide-y, lg 4-up divide-x, title + clamp-2 description
+ TrailingArrow, GCC external in a new tab), which HeroIntro's timeline
now lands last. The user then removed the rail (it duplicated the
"What we do" band below): the nav, its HeroIntro tween and the
data-hero-rail marker are gone, the hero is back to the centred
max-w-3xl stack with symmetric py, and everything else from the Bamboo
port stays (photo drift, white veil to-surface, ink type, accent payoff
line). Lint, tsc and detector (pre-existing advisory only) clean;
browser look pending.

## Homepage hero photo added, 2026-08-14

The user supplied `hero-updated.png` (1672x941, a golden-hour field of
hills under a blue sky, echoing the brand blue+orange) and asked for it
as the hero image, "png as is", so it was moved to
`public/hero-updated.png` unconverted (new filename, honouring the
never-overwrite-images rule; it is ~1.9MB, next/image still serves
optimised derivatives). The homepage hero Section is now
relative/overflow-hidden with a `fill` priority Image behind the
centred composition and a top-to-bottom veil
(`surface-bright/80 → /45 → /15`) so the ink headline keeps AA over
the sky while the field shows through at the foot. The OG fallback in layout.tsx still points at /hero.webp, unchanged.
Then on user direction the type went white: the light veil flipped to
an ink scrim (`from-ink/60 via-ink/40 to-ink/15`, strongest behind the
headline over the bright sky), h1 `text-white`, lede `text-white/90`,
and the pre-load fallback changed from `hero-wash` to `bg-ink` so the
white type never flashes on a light ground. Primary CTA (bg-accent,
white label) unchanged. Lint clean; needs a browser look for scrim
strength, and note the accent focus ring may sit low-contrast over the
photo if that shows up in review.

## Homepage hero: ledger tried, centred kept, 2026-08-14

The hero placement went through a design pass (impeccable +
frontend-design skills): three options with ASCII previews (three-line
ledger, left-aligned stack, refined centred). The user first picked the
ledger, saw it, and reverted: "centered one should've looked better".
The centred `max-w-3xl` composition is restored byte-for-byte
(headline string in home.ts, 22ch balanced h1 at display-sm, 52ch lede,
mt-6/mt-9 rhythm, lg:py-36), with the page comment now recording that
centred was KEPT over a ledger variant after a side-by-side review, so
a later pass does not re-propose it. HeroIntro untouched throughout.
The lede was then tightened on user request: "We size opportunities,
map target universes and carry the research through to qualified
conversations a sales team can act on" became "We turn research into
qualified conversations your sales team can act on"; the dropped
sizing/mapping detail is covered by the What we do band below. Lint
and tsc clean.

## QA round three: sentence case, navy code deleted, figure scale, 2026-08-14

User decisions applied. (1) Privacy effective date confirmed correct as
"1 July 2024", unchanged. (2) Consent lines around the Jotforms:
explicitly ignored, closed. (3) Sentence case is the nav convention:
solutionsNav and solutions.ts navLabels ("Prospect database", "Account
intelligence", "Research-based marketing", "GCC intelligence"; the home
What we do cards derive from navLabel so they follow), footer "About
us"/"Contact us"/"Privacy policy", legalNav, the legal document title
(h1/tab now "Privacy policy"; running prose keeps "Privacy Policy" as
the document's name), aboutHero "About us", and the about fact value
"GCC intelligence". Solution page headlines/metaTitles keep their title
case as display copy. (4) All navy deep code deleted: evidence-field.tsx
and data-plate.tsx removed; deep variants stripped from Section, Card,
Badge, Button (on-deep/on-deep-quiet) and the unused `inverted` prop
from SectionHeading; globals lost --color-deep/-raised/-line,
--color-accent-on-deep, --color-on-deep, .on-deep focus rule and
.rule-ticks-deep; not-found.tsx's two decorative circles now use
--color-ink; CLAUDE.md's deep bullet rewritten (bg-bamboo-navy is the
one navy left, announcement strip only). (6) Figures joined the type
scale: new fluid --text-figure-sm/--text-figure/--text-figure-lg tokens
replace the raw text-3xl..text-7xl ladders on the About facts and both
stats bands; src/ has no raw step sizes left. Lint, tsc and detector
(one pre-existing advisory) clean. Still open: hero consolidation
passes (user deferred), browser verification of recent changes.

## QA round two: OG images, home copy migration, small fixes, 2026-08-14

User decisions applied: `enquiry@researchnxt.com` is the only published
address (the three `privacy@` mentions in legal.ts are replaced; the
effective date still awaits the user). Open Graph wired site-wide:
layout gains a `/hero.webp` fallback image, a new `src/lib/og.ts`
helper returns the full openGraph block (Next merges shallowly, so
pages must carry siteName/type themselves), and the five resource
detail templates pass their own artwork (insight/interview thumbnail,
event image, story image, report cover); solutions pages have no
artwork and inherit the fallback. Homepage band copy moved to a new
`homeBands` export in home.ts (Featured reports / Experts view /
Trusted by headings+ledes, "All reports", "All interviews",
"Visit Bamboo Reports", "Explore"). Dedicated `metaDescription` fields
added for about/careers/contact (their ledes ran ~230 chars or read
wrong as snippets) and pages point at them. The Prospect Database
lede/metaDescription no longer says "TAT" and gained its full stop.
Footer column labels are `<p>` not `h2`; contact sidebar labels are
`h3`. sitemap.ts stamps real `published`/`date` values on
insight/event/story routes and omits lastModified elsewhere instead of
faking `new Date()`. The ReportCardRail aria-label duplication was
judged legitimate (it names the scroll region) and left alone. Still
awaiting user: legal effective date, nav casing scheme, consent lines
around the Jotforms, deep-variant deletion, hero consolidation, About
figure type sizes. Lint and tsc clean.

## Sticky announcement bar; report microsites keep no breadcrumb, 2026-08-14

A campaign strip now rides inside the sticky navbar header, above the
nav row: "The Q2 India GCC report: every GCC move, tracked." with a
"Register for free" pill linking to
bambooreports.com/reports/india-gcc-report-q2-2026?src=rnxt-announce
(new tab). Ported from bamboo-reports-web's AnnouncementBar; copy lives
in `src/content/announcement.ts`, component in
`src/components/layout/announcement-bar.tsx`. On user direction it uses
Bamboo Reports' own ledger navy, added as a distinct `--color-bamboo-navy`
token (hsl(205 78% 13%)); this is a sanctioned cross-brand exception to
the no-navy rule (memory updated), the site's own surfaces stay
non-navy. Knock-ons handled: the mobile nav sheet's fixed top moved
16→28 (bar ~3rem + nav 4rem) and every `scroll-mt-24` anchor offset
became `scroll-mt-32`. Separately, the breadcrumb added to the report
landing pages earlier today was removed on user direction (the
microsites' hero stays clean); the other four detail templates keep
theirs. Lint and tsc clean; not browser-verified (dev server needs user
permission).

## Breadcrumbs restored properly, shared component, 2026-08-14

On user direction the detail-page breadcrumbs came back, done right this
time: one shared `src/components/breadcrumbs.tsx` (items of
label+optional href, "/" separators, unlinked current-less trail, same
type treatment as the old hand-rolled navs) instead of four divergent
copies. All five resource detail templates now carry it: events and
success stories run Library / Programme (programme omitted when the
record has none, e.g. the Bamboo Reports roundtable), insights and
experts-view run Library / Programme with the programme linking to its
report landing (restoring the outbound links the QA flagged as lost;
insights got its `reportHref` lookup back, experts-view reuses its
`report`), and report landings run a single back-link to the shelf,
placed above the cover grid. No dates anywhere, per the earlier
decision. Type-doc comments in insights/experts-view types.ts updated
to match. Lint and tsc clean.

## Pagination: shared pager, events and reports now page, 2026-08-14

The numbered pager that insights and experts-view each carried locally
is extracted to `src/components/pagination.tsx` (label, current,
totalPages, and an `href(page)` callback so both the single-param
`?page=N` scheme and experts-view's multi-section `?<param>=N#fragment`
scheme fit); both pages now use it. Events (9 cards) pages at 6 like
insights, and reports (18 cards) pages at 12, three rows of the
four-column shelf; both follow the insights pattern exactly
(resolvePage clamp, page 1 canonicalises to the bare path, "page N"
metadata titles, Reveal keyed on the page so the stagger replays). Lint
and tsc clean; not yet verified in a browser since dev-server runs need
user permission.

## Contact: Jotform replaces the dead placeholder form, 2026-08-14

The contact page now takes enquiries through Jotform (form
92022271643449, iframe titled "Business enquiry form"), via the shared
`JotformEmbed`. The never-submitting `ContactForm`
(`src/components/forms/contact-form.tsx`) and its `formConfirmation`
copy in `contact.ts` are deleted; `forms/fields.tsx` stays
(download-form still uses it). The page lede's "respond within 24
hours" promise is now backed by a real submission path. Lint and tsc
clean.

## QA fixes: the no-input batch applied, 2026-08-14

Everything from the audit that needed no user decision is fixed; lint
and tsc clean, detector back to its single pre-existing advisory (the
deliberate global grid wash).

Applied: social icons consolidated into `src/components/ui/social-icon`
(now monochrome currentColor including LinkedIn, YouTube added with an
evenodd play cutout; `layout/social-icons.tsx` deleted, footer uses the
shared component). Privacy document renamed "Privacy Policy" throughout
`legal.ts` to match every link (email/date left for the user). Careers
Jotform iframe title now "Job application form". Dead code deleted:
`src/lib/date.ts` (formatDate) and the unreferenced `quickReads` export
in `home.ts`. Stale breadcrumb/date comments rewritten in
insights/index.ts, insights/types.ts, experts-view/types.ts, the h1b
event file (which confirms bamboo-reports is deliberately unregistered,
so that audit item was not a bug), events/types.ts and the three
listing-page headers. `sizes` added to insights and experts-view cards;
events card intrinsic ratio fixed to 1280x720. Experts-view detail title
got the `max-w-[24ch]` clamp the other templates have.
"Research-based Marketing" navLabel recapitalised; footer "Contact us"
now "Contact Us". Homepage's raw `bg-white` band replaced by a new
`surface="bright"` Section variant backed by a `--color-surface-bright`
token. Reports shelf stagger capped at two rows. Two serial commas
dropped (h1b lede+excerpt, experts-view lede). Listing-page copy moved
to content: new `eventsLibrary`/`insightsLibrary`/`expertsViewLibrary`/
`successStoriesLibrary` (in each library's index.ts) and
`reportsLibrary` (resources.ts) hold title/lede/cardCta, pages read
them; careers band headings moved to `careersBands` in careers.ts.

Deferred for user decision: contact form Jotform id (dead placeholder
still live on the primary CTA path), careers-page consent line, where
insights/experts-view detail pages should link out now breadcrumbs are
gone, pagination for events (9 items) and reports (18), detail-hero
consolidation onto PageHero and lede presence, homepage band copy
migration, nav casing scheme overall, "All interviews" label, OG
images, deep-variant deletion, notFound policy, footer/contact heading
levels, raw sizes on About figures and stats-band, legal effective date
and privacy@ address.

## Site-wide QA audit run, findings reported, fixes pending, 2026-08-14

A full content/design QA swept every page (hero sections excluded on
user direction; they will be reworked separately): the impeccable
detector over src (one advisory, the deliberate global grid wash,
dismissed), mechanical greps for the CLAUDE.md rules, and three parallel
audit agents (core pages; the five listing pages; the six detail
templates). Findings are reported in chat and NOT yet fixed. Highest
severity: the contact form (primary CTA target) is the dead phase-c
placeholder that claims "we respond within 24 hours" while submitting
nowhere, while careers now has a live Jotform; insights and experts-view
detail pages lost their only outbound links when breadcrumbs were
removed; privacy page h1 says "Privacy Statement" behind links saying
"Privacy Policy"; duplicate social icon components
(ui/social-icon.tsx with raw LinkedIn hex, used by about + event detail,
vs the new layout/social-icons.tsx monochrome set in the footer);
events library (9 items) exceeds the 6-per-page size with no
pagination; `src/lib/date.ts` formatDate is dead code; missing `sizes`
on insights/experts-view listing images; bamboo-reports programme slug
unregistered in insightProjects; listing-page ledes/CTA labels
hard-coded in JSX against the copy-in-content rule; assorted stale
comments describing removed breadcrumbs/dates; no per-page openGraph
images anywhere. Full ranked list in the conversation of 2026-08-14.

## Careers: Jotform replaces the placeholder application form, 2026-08-14

The careers page now takes applications through Jotform (form
242812511285048, "[RNXT] Job Application Leads"), rendered with the
existing `JotformEmbed` component, which already implements the
user-supplied iframe plus resize-handler snippet (minus the
scrollTo(0,0), dropped deliberately as the component documents). The
never-submitting `ApplicationForm` placeholder
(`src/components/forms/application-form.tsx`) was deleted; nothing else
used it. The form band then dropped its two-column split on user
direction: the "What are you looking for in your next job?" heading is
centred and the Jotform runs full container width below it. Lint clean.

## Footer: social icons and About label, 2026-08-14

The footer's social row now renders brand marks instead of text labels:
user-supplied Twitter/X, LinkedIn and YouTube SVGs live in
`src/components/layout/social-icons.tsx`, redrawn monochrome in
`currentColor` (per the no-raw-hex token rule; the supplied X mark was
white and LinkedIn/YouTube carried brand hex) so they inherit the same
`text-ink-soft`/`hover:text-ink` treatment the labels had. The YouTube
play triangle became an evenodd cutout since the mark is now one colour.
Links keep `aria-label`; icons are `aria-hidden` at `size-5`. Also the
footer Company column's "About Research NXT" is now "About Us"
(`src/config/nav.ts`). A mailto envelope icon joined the social row as
a fourth item beside YouTube (user first asked for it on the address
email, then moved it here): stroked `currentColor` SVG at `size-5`,
`aria-hidden`, link labelled "Email enquiry@researchnxt.com". The
address block's text mailto link stays as it was. Lint clean.

## Breadcrumbs removed from all resource detail pages, 2026-08-14

On user direction, the hero breadcrumb nav ("Library / programme /
date") is gone from every resource detail page: events (done first,
below), then experts-view (`[project]/[person]/page.tsx`), insights
(`[project]/[slug]/page.tsx`) and success stories
(`[project]/[story]/page.tsx`). Each hero now opens straight on the
title. Unused leftovers were removed per file: insights lost its
`report`/`reportHref` block and the `Link`, `getReportLanding` and
`formatDate` imports; experts-view lost `reportHref` and the `Link`
import (`report` stays for the download form); success stories lost only
the `formatDate` import (its report band still uses `Link` and
`reportHref`). Lint clean.

## Events library: dates removed from cards, 2026-08-14

On user direction, event dates no longer render anywhere and the event
detail hero lost its breadcrumb entirely: the `<time>` block was removed
from the `/resources/events` listing cards
(`src/app/resources/events/page.tsx`), then the whole
"Events / programme / date" breadcrumb nav was removed from the
detail-page hero (`src/app/resources/events/[project]/[event]/page.tsx`),
so the hero opens straight on the title. The now-unused `formatDate`
imports went with them; `programme`/`reportHref` stay, still used by the
report band lower on the page. The `date` field in
`src/content/events.ts` still exists but nothing renders it. Lint clean.

## About: How we work replaced by How to engage us; navy purged site-wide, 2026-08-13

**About page:** the "How we work / Four habits behind every engagement"
section is gone (the `howWeWork` export with it), replaced from a
user-supplied mockup by `engagementModes`: eyebrow "How to engage us",
title "Three ways in, sized to the decision in front of you", three
bordered mode cards (Data products, Research programmes, Pipeline
programmes); the mockup's timeframe kickers ("24 to 48 hours", "6 to 12
weeks", "Project or retainer") were dropped on user direction (the
`timeframe` fields are deleted from content too), so each card opens
straight on its name. The layout then went through a four-way variant
review (tiles, stations, ledger, soft panels behind the temporary
picker); the user chose **stations** (`ModesStations`): no boxes, the
three modes as columns on one continuous rule with the signal tick, the
page's joined-timeline grammar. The other variants and the picker are
deleted. Then an
assurance row of three ruled stations (Sourcing you can put through
review; 95%+ contact accuracy; Consent captured before handover). The
mockup's tracked all-caps kickers became sentence case per CLAUDE.md.
Verified in SSR output; lint clean.

**Navy (bg-deep) no longer renders anywhere**, on user direction ("we
don't want this anywhere"), and a memory was saved
(no-navy-deep-surfaces): the homepage Engage card moved to `bg-accent`
(stats-bento feature treatment, white text, outcome in white not
orange), error.tsx and loading.tsx moved from the deep band to the
light hero wash with standard buttons, and VideoEmbed's letterbox and
hover scrim moved from `bg-deep` to `bg-ink`. The deep tokens and the
Section/Button/Badge/Card deep variants and `EvidenceField` still exist
in code but nothing renders them. The engagement step cards also lost
`lg:auto-rows-fr` and a step of padding (user: boxes too tall with dead
space); subgrid alone keeps their rows level.

## Homepage hero recomposed, 2026-08-13

Three user-directed changes, in sequence, all uncommitted (the pushed
branch `content/h1b-roundtable-and-about` predates them):

- **New copy.** Headline "Know the market. Name the accounts. Reach the
  people inside them." with a new `hero.lede` beneath it ("A boutique
  market intelligence firm... qualified conversations a sales team can act
  on."). The lede got its own `data-hero-lede` step in the HeroIntro GSAP
  timeline, between the word resolve and the CTA.
- **The three rotating questions are gone** ("Is the quality of your
  marketing leads...", etc). `hero.questions` deleted from content, the
  `HeroQuestions` usage and its timeline step removed. The component file
  stays (still listed in CLAUDE.md's client components) but nothing
  renders it now.
- **The orange beam field is retired from the band**, on user direction
  ("plain white with some light gradients for now"). The hero now uses the
  same `hero-wash` treatment as every inner-page hero, with ink copy and
  the primary CTA instead of white-on-orange. `HeroField` and its CSS
  remain in the repo unused, should the field come back.

Verified live: light wash renders, headline/lede/CTA present and
sequenced; note that in an occluded Chrome tab the GSAP entrance crawls
(rAF throttling), which is a background-tab artifact, not a bug. SSR HTML
carries the new copy. Lint clean. Worth flagging: `site.tagline` and the
homepage meta description still carry the old "turnkey research
solutions" line; not changed because the user has not asked.

**What we do band added**, on user direction, after the Experts View
section and before Why Research NXT: eyebrow "What we do", title "From
market data to qualified pipeline", and the four solutions as stations on
one rule (the About page's joined-timeline grammar) on the muted surface.
`home.whatWeDo` derives its items from the solutions registry
(`navLabel` + `metaDescription` for the three internal pages, plus
`gccIntelligenceLink` out to Bamboo Reports with an external "Visit
Bamboo Reports" link), so solution copy stays described in one place.
Verified live in section order with all four cards. Card titles carry a
chosen "\n" break (two-line rhythm, `sm:whitespace-pre-line`), and the
Account Intelligence card reads a shortened `cardDescriptions` override
("Heightened target account control, whitespace opportunities, and
sharper selling propositions.") because its meta description ran long;
the page's own SEO description is untouched.

**How an engagement runs band added** after What we do, from a
user-supplied mockup, adapted to house rules: sentence-case eyebrow (the
mockup's tracked all-caps kicker is against CLAUDE.md), title "From a
definition workshop to a conversation your sales team can take", four
step cards (Define, Build, Validate, Engage) numbered with the tick
device because the order is the information, each closing on its outcome
line in accent semibold. The Engage card is the band's one saturated
moment on `bg-deep`, with body in `text-on-deep` and the "Qualified
pipeline" outcome in `text-accent-on-deep`, NOT the mockup's orange text,
because brand orange is never text on any surface. Subgrid rows keep
labels, names, copy and outcomes aligned across the row. Verified in SSR
output; lint clean.

## Bamboo Reports GCC roundtable published under events, 2026-08-13

## Bamboo Reports GCC roundtable published under events, 2026-08-13

New event page at
`/resources/events/bamboo-reports/h1b-shock-strategic-reset`, authored from
the user-supplied draft `h1b-roundtable.md` (repo root, untracked scratch
input like `sf-covers/`). The H-1B / GCC roundtable, Hilton Bengaluru,
13 November 2025.

**New project segment `bamboo-reports`.** The roundtable belongs to the
Bamboo Reports GCC research, not to any marketing report programme, so
`getInsightProject` finds nothing and the breadcrumb runs Events / date.
That exposed a template bug: the first breadcrumb separator rendered
unconditionally, so a programme-less event showed "Events / / date". The
separator now renders inside the programme conditional
(`src/app/resources/events/[project]/[event]/page.tsx`); conference
participations were already programme-carrying (industry-events resolves a
programme), so nothing else changes.

**All images are local**, on user direction: the draft pointed at catbox
and ufs.sh, and everything was downloaded to
`public/events/h1b-shock-strategic-reset/` (hero.jpg 1920x1080, fifteen
800x800 headshots under `speakers/`, sixteen webp photos under `gallery/`,
~12MB total). No remote image hosts are referenced.

**Content mapping** (`src/content/events/bamboo-reports/h1b-shock-strategic-reset.ts`):
the draft's H3s became the body's heading blocks; highlights, the two
context points, signals and playbook prompts are `list` blocks with `**`
emphasis; the final takeaway is `bodyAfterSpeakers` so it lands under the
panel. Facts: Format / Venue / Hosted by. The draft's em dashes became
colons per the house rule. Gallery of sixteen with empty alts (HYSEA
precedent). Fifteen speakers in draft order, no LinkedIn links (the draft
supplies none, and guessed URLs risk the wrong person); Madhav Vemuri's
line is "Inpace, formerly ABB" because the draft lists "Inpace / X ABB"
with no title. The draft's suggested live path /roundtables/... was not
used: content URLs follow /resources/events/<project>/<leaf>.

Verified in the browser: breadcrumb "Events / 13 November 2025", all 8
headings, 15 speaker cards, 16 gallery images, 3 facts, 32 images total
with zero broken, no horizontal overflow; the event lists second on
/resources/events (after the undated recap, per the newest-first sort).
Lint clean.

**"Who spoke" redesigned: tiles, chosen from a four-way variant review.**
Candidates (behind the temporary variant picker, since deleted): the
incumbent hairline discs, a five-across portrait wall, a compact
two-column roster ledger, and tiles. The user chose tiles:
`SpeakersTiles` renders each speaker on a white bordered card (56px disc,
name, role, company), three across, for EVERY event with speakers.
Shared pieces extracted on the way: `SpeakerNameLink`,
`SpeakerInterviewLink`, `SpeakerGroupTitle`, so group subheadings (NTLF),
LinkedIn names and interview links all survive. The rejected variants and
`src/components/dev/variant-picker.tsx` are deleted. Verified live:
picker gone, 15 tiles render on the roundtable.

The closing takeaway moved below the gallery, on user direction: the
`bodyAfterSpeakers` block left the speakers band and renders as its own
subtle band after the gallery (heading promoted h3 to h2 now that it
opens a band). An event with no gallery, the 2017 webinar, still gets the
block directly after its speakers, so its reading order is unchanged.
Verified live: the page now runs Who spoke, Moments, then the takeaway.

Two follow-ups on user direction, both verified live: the gallery band
moved below the speakers band in the event template (so "Who spoke"
precedes "Moments from..."; the gallery dropped its subtle surface since
it now sits beside the subtle speakers band; this reorders HYSEA's
gallery below its speakers too), and this event's speakers are sorted
A to Z by name in the content module rather than the draft's running
order.

Also on user direction: the About page's fifth fact value changed from
"Built in-house" to "GCC Intelligence" (label unchanged).

## About page: final QA pass, 2026-08-13

Full-page QA in Chrome against the running dev server (already up on
localhost:3000; not started by the agent), plus computed-style checks via
the JS console.

**One defect found and fixed.** `TeamSplit` wrapped its two columns in
`<article className="contents">`; a `display: contents` element generates
no box, so the `.anim-stagger > *` entrance landed on it and never
visually ran: the band appeared without its reveal (content stayed
visible, per the motion rule, but the stagger was dead). The wrapper is
now a `Fragment`, the columns sit directly under the `Reveal`, and both
were confirmed live running `rise-in` to opacity 1. A comment in
`TeamSplit` warns against reintroducing a contents wrapper there.

**Checked and healthy:** no horizontal overflow at any tested width
(scrollWidth == clientWidth); page height ~4,186px with contiguous
sections (65 / 255 / 965 / 1548 / 2115 / 2800), no dead gaps; heading
outline is one h1 then h2 per band, h3 for cards and the founder, h4 for
Advisory board and Team; all type resolves to DM Sans (thesis 60px/800,
band headlines 44px/700, body 16px/26px, small 14px); the fact figures
render on the tabular face and the two-line title rhythm holds across the
timeline and habits rows; the portrait loads with correct alt; zero
console errors. Desktop (~1500px) screenshots confirmed every band's
layout: thesis + facts split, story, the joined timeline rule, habits,
and the team split with the two-line CMO role.

**Not verified:** phone-width layout. The window manager pinned the
browser window size, so sub-sm widths could not be tested; code-wise all
grids collapse to one column and the "\n" breaks collapse to spaces
below sm, and there is no horizontal overflow at the widths that were
testable.

## About page: variant review resolved, 2026-08-13

Both open layouts were chosen through a temporary Prev/Next variant picker
rendered in the page; the picker (`src/components/dev/variant-picker.tsx`)
and every rejected variant are now deleted and the page is final again.

**Facts: `FactsSplit`.** The founding story (2017, founded and
bootstrapped, with its detail line) on an accent-soft panel at left, the
four measurements as ruled cells beside it. Rejected: ruled ledger, stats
bento, measurement strip, lead-and-grid.

**Team: `TeamSplit`**, the same grammar as the facts band so the two ends
of the page rhyme: the founder's identity (portrait, name, role, socials)
on an accent-soft panel left; bio, affiliations and the advisory board
block as ruled blocks right. Rejected across two rounds: plate, mirrored,
panel, dossier (round one, all portrait-beside-text), then editorial and
roster (round two). Shared helpers kept: `PersonPortrait`,
`AffiliationsList`, `PersonSocials`.

Post-selection tweaks on user direction: the first advisor's role reads
"Former MD of..." rather than "Former managing director of..."; the second
advisor's role carries a forced two-line break ("Former four-time SaaS\n
chief marketing officer.", rendered `whitespace-pre-line`); and the
analyst-team note ("Behind every engagement...") sits under its own "Team"
header (`advisoryBoard.noteTitle`) as the last ruled block of the right
column, below the Advisory board block, mirroring its heading style. It
briefly ran inside the founder's bio copy between those two placements.
With "Team" now a sub-header, the section eyebrow changed from "The team"
to "The people" so the two labels stop colliding.

Lint and the impeccable detector are clean.

## About page rebuilt on new positioning copy, 2026-08-13

The About page was still the transcription of the old WordPress page ("Who we
are?", "Our culture", the 500k+/1.5k+ stats). Replaced wholesale with new
copy supplied by the user: pipeline-first positioning ("Research that ends in
a pipeline, not a PDF."), the firm's story, a timeline, working habits, the
founder plus an advisory board, and an ecosystem recognition band.

`src/content/about.ts` was rewritten; the old `whoWeAre`, `culture`,
`aboutStats` and `leadership` exports are gone (nothing else imported them).
New exports: `aboutHero`, `aboutFacts` + `aboutPhoto`, `story`, `milestones`,
`howWeWork`, `team`, `advisoryBoard`, `recognition`. Copy is the user's
verbatim, sentence case on labels; no em dashes anywhere in it.

Page structure (`src/app/about/page.tsx`), all house devices, no new
components:

- **Hero**: the "About Us" title alone, no lede, on user direction (a
  boutique-firm lede sat under it briefly and was reverted). The pipeline
  headline opens the page body as `aboutIntro`, now at `text-display-sm`
  in the display face: it is the page's thesis, so it carries the page's
  largest type below the hero, over the short orange rule with the
  boutique-firm paragraph beneath.
- **Fact ledger**: the five facts (2017 founded and bootstrapped, 50+
  clients, 2018 NASSCOM partner, 60,000+ subscribers, Built in-house Bamboo
  Reports) ran as a stats bento first (feature tile on the accent, then
  quiet tiles; an event photograph sat beside it briefly and was removed);
  the user then asked for something other than a bento, and a full-page
  overhaul through the impeccable and frontend-design skills replaced it
  with a ruled ledger: one hairline row per fact, the figure in a 16rem
  display column left, the claim right, `items-baseline` so figure and
  claim share a baseline. Only the founding row carries a `detail` line.
  `AboutFact.count` still marks which values count up (50+ and 60,000+
  through `FigureValue`; 2017 and 2018 are dates and stay still). The
  page-wide overhaul direction: the page was four repeats of
  heading-plus-card-grid, so cards gave way to ruled lines as the page's
  device, matching the site's field-report grammar.
- **Our story**: three paragraphs at the container's full width (a 72ch cap
  was removed on user direction) and a secondary "Visit Bamboo Reports"
  button out to bambooreports.com.
- **What shaped the firm**: four milestone stations (2017, 2018, 2022,
  Today) on the muted surface. The horizontal gap went to zero with padding
  inside each column instead, so the columns' top rules join into one
  continuous timeline; the tick and accent year mark the stations along it.
  Subgrid rows keep titles and copy aligned.
- **How we work**: the same station treatment as the timeline: one shared
  rule, each habit's station marked by the orange signal dash. The stations
  were briefly numbered 1 to 4; removed on user direction. Both this row
  and the timeline had titles wrapping to a mix of one and two lines; on
  user direction every milestone and habit title now carries a chosen "\n"
  break (the solutions-page pattern, rendered `sm:whitespace-pre-line`) so
  all eight cards share a two-line rhythm; the breaks collapse to spaces in
  the single mobile column.
  The "None of this is exotic" paragraph sits under the SectionHeading as
  its own full-width paragraph rather than as the heading's lede, whose
  64ch cap the user asked to escape.
- **The team**: Santosh's card keeps its previous layout (photo, role, bio,
  affiliations, socials) with the new role "Founder & CEO", the shorter bio,
  and affiliations trimmed to FLAME and MIDAS. The advisory board sits inside
  the same band, reworked on user direction (via the impeccable and
  frontend-design skills) from two bare hairline blurbs plus an orphan
  paragraph into one plate: each advisor's copy is split verbatim at its
  sentence break into a role headline (`font-display-soft`) over a
  credential line under a hairline, on white bordered tiles whose hairlines
  stay level via subgrid, and the analyst-team note closes the plate as a
  full-width tile on `bg-accent-soft` with the signal tick. Content shape
  changed with it: `advisoryBoard.members` is now `{ role, credential }[]`
  rather than strings.
- **In the room**: REMOVED FROM THE PAGE for now, on user direction, so the
  page closes on the team band. The `recognition` export stays in
  `src/content/about.ts` with the awards folded into its prose (it earlier
  ran deep navy with award tiles, then as a light one-paragraph band);
  restoring the band is one import away.

Two-tone `**` accents were added to section titles (PDF, technology,
engagement, accountable), rendered through `accentedTitle`; every band on
the page is now a light surface, so `text-accent` clears contrast wherever
they appear. Metadata description reads from `aboutIntro.lede`.

Verified: `npm run lint` clean. Not run (needs permission): a dev-server
visual check and `tsc`; worth a look in the browser, particularly the proof
band at tablet widths and the photo crop at `lg`.

## Two NASSCOM industry events checked; deck embedded, 2026-08-12

**NTLF 2019** (`researchnxt.com/events/nasscom-ntlf-thenext/`). The source
runs a "Key Speakers" band as four lineup graphics with all fifteen names,
titles and companies baked into the artwork: unreadable to a screen reader,
unsearchable, and unusable at a phone's width. Read off the graphics and set
as cards instead, under the four headings the source groups them by
(evangelists, CEOs, Indian industry leaders, CXOs), on user direction. The
source's "Click to view agenda" link is not carried: the PDF it points at now
404s.

`Event.speakers[]` gained `group`; the band renders one subheading and grid
per run of speakers sharing a group, and a list where nobody has one renders
exactly as before. Where a speaker has no portrait the card now shows an
initials disc, so a row keeps one rhythm instead of some cards starting with
a disc and some with the name. Honorifics are dropped from the initials, so
"Dr Ulrich Spiesshofer" reads US.

**MarTech Confluence 2017**
(`researchnxt.com/events/nasscom-martech-confluence-2017/`). The source sets
a photo collage between its two lists, which is a collage from the *2016*
confluence, so the alt text says so rather than implying it pictures 2017.
Neither page has a video, gallery, deck or LinkedIn link.

A closer copy check then found two more: the opening paragraph had dropped
the source's closing sentence, "It is all about re-imagining customer
experience with intelligent marketing", and "Research NXT is excited to be
part of" had lost the "excited". Both restored, in the past tense the rest of
these write-ups use. The lead-in above the four themes,
"The themes the confluence ran on:", was written for this page and is not on
the source, which runs the themes straight after the collage: removed.

Not carried, on purpose: the source's closing "Click here to register",
"book an appointment with our analysts at the confluence" and
"For registrations & further information" blocks. They are 2017 calls to
action for an event nine years past, and republishing them would invite
readers to register for something that has already happened.

**The deck embed.** The content-marketing launch's deck pointed at the
SlideShare *public page*, which sends `X-Frame-Options: SAMEORIGIN`, so the
frame came back "refused to connect". `deck` now takes the `embed_code/key/…`
URL in `href` and the public page in `page`, for the link beneath the frame.
The deck also moved out of the sessions band into its own band for every
event, so it renders whether or not the event has recordings, and a lone
session now stacks with its title beneath the film rather than stranding the
caption in an empty right column.

## HYSEA BizSUMMIT 2020 checked against its source, 2026-08-12

Checked against `researchnxt.com/events/hysea-bizsummit-2020/`. No video on
this one (confirmed with the `youtube_url` sweep, not just the iframe check).

**The photo gallery was missing.** The source runs a "Hysea BizSummit 2020
Glimpse" band of eight photographs. `Event` gained a `gallery`, kept apart
from `body`'s single-`image` block because eight photos belong in a grid
under a heading, not stacked full width down the reading column. Files in
`public/events/hysea-bizsummit-2020/`. Alt text is empty on all eight: they
are a record of the room, and captioning each "attendees at the summit"
would add noise for a screen reader rather than information.

**Speaker portraits were missing**, now in
`public/events/speakers/industry-events/`, with roles split from
organisations onto the `company` line.

**"Full Presentation of Event Launch" was missing, and could not have
rendered.** The source embeds a SlideShare deck; `Event.deck` already
existed, but the template only rendered it *inside* the sessions band, so an
event with a deck and no sessions dropped it silently. Added a standalone
deck band, gated on `!hasSessions`, so the content-marketing launch (the only
other event with a deck, and it has sessions) is untouched and still shows
its deck once. The deck is embedded there, at the slides' own 4:3 on the
reading measure rather than the source's 300px square, with a link out
beneath it. SlideShare sends no `X-Frame-Options` and no `frame-ancestors`,
so the frame is permitted.

**Four of the five LinkedIn links on the source point at the wrong person.**
Walking the speaker markup in order: Madhuri Duggirala's card links to Jay
Magdani, Subhendu Pattnaik's to Jay Magdani, Satinder Juneja's to Diptarup
Chakraborti, Ankush Garg's to Jay Magdani. Only Santosh Abraham's is his own.
The correct four were supplied by the user and are carried instead, so this
page's profiles are deliberately **not** the source's. Worth fixing on the
live WordPress page too: it currently misattributes four named people.

## Southeast Asia launch event checked against its source, 2026-08-12

Checked against
`researchnxt.com/events/business-strategy-report-launch-event/`. Four gaps.

**A third missing recording**, found by the `youtube_url` sweep described
below: `7OkdfqgIuhg`, visible, now opening the page.

**Speaker portraits.** None were set. The source's own cards use hexagon
framed cut-outs on transparent grounds, which crop badly to the card disc;
on user direction the portraits came from the report landing's voices band
instead (`/voices/south-east-asia-response-guide/*.jpg`, 400x400 clean
cut-outs of the same six people), so the two pages now share one set.

**Roles split from organisations** on every card, using the `company` line
added for the 2017 webinar. Where the source runs the two together in a
phrase ("CEO of Singlife", "Managing Director at DHL eCommerce") they are
split at the preposition, so all six read the same way down the column
rather than two of them keeping the organisation inline.

**The closing report panel was missing.** The source ends on "SOUTHEAST ASIA
RESPONSE GUIDE - 2021", the four research facts and "Read Full Report". Now a
`reportBand` with the facts verbatim, hyphens and en dash included. The
event's own top-level `facts` were dropped in the same move: they were the
same four in house style, sitting in the sidebar, while the source puts them
under the report's name.

The interview links are gone from these cards too, as with the 2017 webinar.
**No LinkedIn links were added: the source links no profile on any of these
six cards.** The three LinkedIn URLs in that page's markup belong to David
Raab, Scott Brinker and Avnish Anand, none of whom spoke here. A profile URL
guessed from a name would risk pointing at the wrong person, which is the
case the `linkedIn` field's own comment warns about.

## Elementor video widgets: two recordings recovered, 2026-08-12

**The "no recording on this source page" findings below were partly wrong.**
Detection searched the markup for iframes, `youtube.com/embed` and `youtu.be`.
An Elementor page carries its YouTube recording in the video widget's
`data-settings` attribute as a `youtube_url` key and renders the player from
script, so none of those searches finds it. Re-swept every source page for
`widget_type="video"` and `youtube_url`, checking each widget for
`elementor-hidden-*` the way the Zycus Wistia embeds needed:

- 2017 report launch webinar: `KNjOpqdyrZo`, visible. **Was missing.**
- 2017 Netcore case study: `5EW2XHDtPLI`, visible. **Was missing.**
- AI-led Netcore case study: `SzqSS9Gd1G4`, hidden at every breakpoint. Its
  visible embed is the Wistia one already carried. Correct as it stood.
- Zycus case study: `sGZOD1bam7E`, hidden at every breakpoint. Correct as it
  stood.
- WebEngage and ABM case studies: genuinely no video widget. Correct.

Both missing recordings are now carried. `Event.video` widened from a
LinkedIn-only shape to a union with `{ youTubeId, caption, poster }`, played
through `VideoEmbed` so the player is not pulled in until clicked; the poster
still came from the source's own `image_overlay` to
`public/events/b2c-marketing-automation-report-launch-still.jpg`. The case
study uses the existing `SuccessStory.video` with `host: "youtube"`.

The rule is written into `Event.video`'s doc comment: search for
`youtube_url`, not just iframes, and check the widget's hidden classes.

Also on the 2017 webinar, on user direction: speaker portraits added from the
source (`public/events/speakers/b2c-marketing-automation-india-2017/`, four
square head shots), Santosh Abraham's LinkedIn set, and the "Read the
interview" links dropped from this event's cards, since the source links each
card to LinkedIn alone and two ways through one card is one too many. Done by
clearing `interview` on these speakers only, so the other events keep theirs
(the Southeast Asia launch still runs twelve). Both write-up blocks lost
their `max-w-[68ch]` cap and run the container width, and a panel of exactly
four speakers runs as one row (`lg:grid-cols-4`) rather than leaving one card
alone on a second; three or five keep the three-across shelf.

`Event.speakers[]` gained an optional `company`, set on its own line under
the job title, which is the split the source page makes ("VP & Head of
Marketing | PolicyBoss.com"). The four speakers here use it. Everywhere else
`role` still carries both, so no other event changed.

## 2017 report launch webinar checked against its source, 2026-08-12

Checked against
`researchnxt.com/events/webinar-marketing-automation-transform-the-way-you-do-marketing/`.
No invented copy on this one. Three gaps; the recording it was first reported
to lack is covered in the entry above, along with the speaker LinkedIn links
and the write-up order.

**The three takeaways were prose.** The source sets "Tune in to this 45 min
Panel discussion and learn from experts:" followed by three bullets; they had
been folded into the tail of a paragraph. Now a `{ list }` block, so they
read as the three points they are.

**The client testimonial band was missing.** The source closes on "Client
Testimonial", the Kalpit Jain artwork, "Download Case Study", and the four
engagement facts. The `Event` type already had `clientStory` for exactly this
(the AI-led launch uses it), so it is now set: the case study artwork, the
way through to the story, and the facts verbatim from the source with its
pipes, capitals and en dash. The event's own top-level `facts` were dropped
in the same move, since they were the same four in house style and the source
puts them under the testimonial rather than beside the write-up.

## 2017 Netcore success story checked; ABM landing credits, 2026-08-12

Checked against
`researchnxt.com/b2c-mas-report-india-2017/b2c-market-automation-case-study/`.
This completes the pass over all five success stories.

**A quote from the wrong case study.** The story led with a Kalpit Jain
quote whose text was the Zycus testimonial, "Research NXT is our partner of
choice for prospect databases...", pasted here and re-attributed. It is on
neither source page and "Kalpit" appears nowhere on this one. Removed. His
name stays in the image alt: the poster artwork is
`Kalpit-Jain-Case-Study-Featured-IMG`, so he is who it pictures.

**The banner-as-avatar fault, now cleared everywhere.** Meera Iyer and Prasad
Pimple pointed at `/experts/*` key art (1024x500) cropped into 44px discs.
The source page uses square head shots, pulled from it to
`public/success-stories/b2c-marketing-automation-india-2017/`. The
`/experts/*` files stay where they are: they are the interviews' own
thumbnails and correct in that role.

Added the source's "View entire interview" links under both quotes, and its
launch event band, pointing at the published report launch webinar. Renamed
the second fact's label from "Engagement" to "Format", which is what the
source calls it. No recording on this source page either.

## ABM report landing, 2026-08-12

Removed the landing's one voices card: it was the case study's poster artwork
with the baked-in sentence read out as a Sesha Rao quote, and that sentence
is on neither source page. The credits mark for "In association with" is now
the supplied full InsideView lockup at
`public/logos/trusted/insideview-lockup.png`, replacing a 417x92 crop; saved
under a new name rather than over the old file, so the image cache cannot
serve the old one. The story's own `logo` field was pointed at it too, for
consistency, though nothing reads that field since the hero mark was removed.

## InsideView success story checked against its source page, 2026-08-12

Checked against `researchnxt.com/case-study/abm-case-study/`.

**No recording on the source page**, same as WebEngage: no Wistia, no
YouTube embed, and the only iframe is Google Tag Manager. The artwork stays a
still. Three of the five case studies front a recording (both Netcore pages
and Zycus); this one and WebEngage do not.

**A fourth quote the source page does not carry.** "Research NXT did a
fantastic job by creating one of the most comprehensive pieces of research on
Account Based Marketing..." was set as a Sesha Rao quote; "Sesha" appears
nowhere on the source. Baked into the poster artwork like the others, and
removed on user direction. His name stays in the image alt text, which is who
the artwork pictures.

**No research parameters either.** The four facts on this story duplicated
`abmBestPracticesIndia2018.facts` on the report landing, and the source case
study lists none: it names the report and points at it instead. Cleared to
`facts: []`. The report band still runs, because the programme has a report,
so the band is now the cover and the link.

That exposed three template gaps, all fixed: the facts `<dl>` rendered empty
when a story has no facts, the band never named the report, and it had
nothing to say in place of the parameters. It now sets `report.hero.title` as
its heading, which is what the source pages put above their report details,
and falls back from the facts list to the deliverables read again as a plain
tick list, which is what a source page with no parameters sets there. On
InsideView that band is now the report's name, "100+ Surveys, 6 Marketing
leader interviews, 200+ Targeted downloads, 25 Product demos", and the link,
matching the source. Stories that do state parameters are untouched.

Added the "View entire interview" links the source runs under both quotes,
pointing at the published Diptarup Chakraborti and Satinder Juneja
interviews. Also hyphenated "first-of-its-kind" in the third body bullet to
match the source.

## WebEngage success story checked, case study link moved, 2026-08-12

Checked against `researchnxt.com/case-study/webengage-case-study/`.

**No recording on the source page.** Searched its markup for Wistia, Vimeo,
YouTube and any iframe: the only YouTube references are the footer's social
icons, and the single iframe is Google Tag Manager. The artwork stays a still,
which is what it already was.

**A third quote the source page does not carry.** "We want marketers in the
GCC region to refer to this study as a benchmark report..." was set as an
Avlesh Singh quote, but the string "Avlesh" appears nowhere on the source
page; like the Netcore and Zycus sentences, it is baked into the poster
artwork. Removed on user direction, leaving the two participant quotes the
source does carry, Shahin Riaz and Devam Saxena. His name stays in the
image's alt text, which is correct: he is who the artwork pictures.

**The case study link moved, for every story.** It now follows the opening
paragraph rather than sitting at the foot of the page, which is where the
source pages put their "Download Full Case Study" button. That retires the
`!hasReportBand` fallback: the link no longer lives in the report band at
all, so the band carries only "Read the full report". Body blocks render
through a `Fragment` so the button can be injected after the first one.

## Zycus success story checked against its source page, 2026-08-12

Same pass as the Netcore story, against
`researchnxt.com/case-study/zycus-prospect-database-case-study/`.

**A recording that was not there.** The page showed the poster as a still
with its baked-in play button; the source backs it with Wistia. It now runs
one recording, `v0tjz7ihsh`.

Worth knowing for the next transcription: the source markup contains two
Wistia embeds, `a78fa476gp` and `v0tjz7ihsh`, and this was first read as two
videos on the strength of the ids alone. The first sits in an Elementor
widget carrying `elementor-hidden-desktop elementor-hidden-tablet
elementor-hidden-phone`, so it is hidden at every breakpoint and never plays.
Read the widget's classes, not just the embed ids. The Netcore page was
rechecked the same way and genuinely has one visible embed.

**Another quote the source page does not carry.** "Research NXT is our
partner of choice for prospect databases..." is baked into the poster
artwork, not page copy (confirmed absent from the source HTML). Removed on
user direction, which leaves the story with no In their words band at all,
as the source page has none. The source names the speaker under the
recordings without setting any of her words as text, so `testimonial.quote`
is now optional and the attribution stands alone: Preeti Shetty, Senior
Manager, Zycus, which is also how the source styles the role (it was
"Senior Manager, CRM Technology").

**An empty report band, introduced by the Netcore work.** The band was
rendered unconditionally, so on Zycus, which produced no report and states no
research parameters, it came out as an empty definition list beside an empty
image column. It is now gated on `hasReportBand` (a report or at least one
fact), and the case study link falls back to the copy column when there is no
band to hold it.

Deliverables now use the source page's own heading and description pairing,
and `StatsCards` picks its column count from the number of stats, so three
deliverables fill their row instead of leaving a fourth slot empty. Card
figures dropped a step to `text-3xl`/`sm:text-4xl` so a worded value
("On demand") sits level with the numerals beside it.

Checked the other three stories after these changes: all still render their
still image, no empty bands, quotes intact.

## Netcore success story rebuilt against its source page, 2026-08-12

Checked `/resources/success-stories/ai-led-personalization/netcore` against
`researchnxt.com/case-study/netcore-case-study/` on user direction. Five
faults, all fixed; copy is the source page's own throughout, nothing
paraphrased or invented.

**A play button that did nothing.** The hero artwork has a play button baked
into it and was rendered as a still `Image`. The source page backs it with a
Wistia recording (`mizyu760l7`). `VideoEmbed` now takes a `host` of
`"youtube" | "wistia"` (YouTube stays the default, which the events use) and
`SuccessStory` takes a `video`, so the poster fronts a real player.

**A quote the source page does not carry.** "Research NXT has the knowledge
and experience of providing marketing solutions that we were seeking in a
vendor" is baked into the poster artwork, not page copy, and was set as the
client testimonial. Replaced with the testimonial the page actually runs
under the recording, attributed as published: Rohit Srivastav, Head of Growth
Marketing, Netcore. The name was also misspelt "Shrivastav" (the interview
record has it right).

**Wrong portraits for David Raab and Scott Brinker.** Both were pointed at
`/experts/*` interview key art, which is 16:9 with baked titling, then
cropped into a 44px disc: a sliver of banner and no face. The source page
uses square head shots, pulled from it to
`public/success-stories/ai-led-personalization/{david-raab,scott-brinker}-portrait.png`
(195x195). `quotes[].image` is documented as head-shot-only for this reason,
and `quotes[].href` was added for the source page's "View entire interview"
link under each.

**A stretched Netcore lockup in the hero.** The mark was rendered in a
hard-coded 432x91 box whatever the file's ratio, so the 720x232 lockup came
out squashed. Removed on user direction: the client is named in the title and
carried by the testimonial artwork. Nothing else reads `SuccessStory.logo`
now; the field is left in place as content.

**Order and layout, per user direction.** The page now runs: body copy at
full width, the recording, the client testimonial at full width in normal
weight (it briefly ran at `text-title` display weight, which read as a pull
quote), Key deliverables, In their words, then the report band. The
programme facts moved out of the sidebar into that closing band: report cover
left, the four facts and the actions right, matching the source page's report
details section. The cover is resolved from the reports registry through the
programme's `reportSlug`, so it stays described in one place.

A "Check out the Launch Event" band closes the page, below the report band,
carrying the source page's two sentences beside the event artwork, both
artwork and link pointing at
`/resources/events/ai-led-personalization/ai-led-ebook-launch`. Added as
`SuccessStory.launchEvent`, which holds only the story's own heading, copy
and link label: the event's title, artwork and URL are resolved from the
events registry by slug, the way the report landings resolve theirs, and an
unknown slug throws rather than rendering a dead band.

Key deliverables moved off `StatsBento` onto a new `StatsCards` export in
`components/stats-band.tsx`: four equal bordered cards. The bento promotes
its first tile to a double-height accent feature, which claims a ranking
among four peer deliverables that the source page does not make. `StatsBento`
is untouched and still used by About and the solution pages.

Other stories are unaffected: with no `video` or `testimonial` they keep the
still image in the copy column. Note for later: the 2017 B2C Netcore story
has the same banner-as-avatar fault (`meera-iyer-bigbasket.jpg` and
`prasad-pimple-hdfc-life.png` are 1024x500), not yet fixed.

## Reports library shelf gains edition cards, 2026-08-12

The reports-whitepapers library previously mapped `reportLandings` directly,
so every card had to be a landing page. Added a `reportShelf` list in
`src/content/resources.ts`: it is built from `reportLandings` (title, href,
portrait, cardImage), and edition entries, industry cuts of a report whose
full story lives in an insights article, are spliced in so their card links
straight to that article instead of a landing of its own.

Three editions shelved, in order directly after the main Implementor's
Guide, each linking to its insights article and carrying a 1414x2000
portrait cover (the A4 ratio the shelf expects) copied from the untracked
`sf-covers/` drop into `public/covers/`:

- "Financial Edition" (`fins.png` →
  `implementors-guide-to-ai-finance-edition-portrait.png`) →
  `.../finance-leaders-transition-from-caution-to-customer-centric-scale`
- "Manufacturing Edition" (`mfg.png` →
  `implementors-guide-to-ai-manufacturing-edition-portrait.png`) →
  `.../manufacturing-automotive-energy-leaders-move-from-pilots-to-scale`
- "Retail & Consumer Goods Edition" (`rcg.png` →
  `implementors-guide-to-ai-retail-consumer-goods-edition-portrait.png`) →
  `.../retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale`

The library page (`src/app/resources/reports-whitepapers/page.tsx`) now maps
`reportShelf`; keys switched from slug to href. Lint clean. `sf-covers/`
itself is untracked scratch input, not site content.

## Report highlights become a card plate, 2026-08-07

The figure-led treatment of `HighlightsBand` was a ledger: a fixed 8.5rem
figure column with the claim set beside it. On
`/resources/reports-whitepapers/content-marketing-done-right` that left a
gulf between a short number and its sentence, and the one unfigured finding
sat in the middle of the run carrying a lone signal dash where a number
should be. Replaced with a card plate, on user direction, asking for icons
and cards.

Each finding is now its own bordered card on the subtle ground: theme glyph
in the accent chip, the figure at `text-display-sm` on the tabular face
still counting up through `FigureValue`, the claim beneath. Never more than
three across, because these claims are sentences and a fourth column
squeezes them to two words a line: 2 or 4 findings go two up, everything
else two up then three.

The unfigured finding is not a row of the plate but its headline, so it
leads at full width in an accent-soft card. On the content-marketing page
that is exactly right: "First of its kind Content Marketing Technology Stack
for the Indian market" is the claim the report is selling.

The index treatment for all-label sets is untouched.

### Glyph keywords extended

`THEME_KEYWORDS` was tuned against the two all-label reports, so figure-led
claims mostly fell through to the compass default. Added eleven rules
covering the figure sets: technology stack, video, social media or channel,
plan/intend/next year, budget or gifting, effectiveness, optimisation,
sales alignment, ABM, email, mobile. Checked against every highlight the
seven reports carry. The ABM plate no longer shows the same target three
times.

Verified in Chrome on the content-marketing page (5 findings, lead card plus
2x2) and the ABM page (6 findings, 3x2).

---

## Content marketing launch page diffed against its live post, 2026-08-07

`/resources/events/content-marketing-done-right/content-marketing-report-launch`
against `researchnxt.com/events/content-marketing-report-event-launch/`.
Four things the source publishes were missing.

- **The launch recording.** YouTube `xXwLZXt3uRw`, poster from the source's
  own overlay, saved as
  `public/events/content-marketing-report-launch/session-report-launch.png`.
  Uses the `sessions` field added for the ai-led launch.
- **The two interview quotes.** Amit Kapoor (Cigniti) and Ranjit Behera
  (BankBazaar), each card linking to the published interview. New `quotes`
  field on the `Event` type. Names and roles come from the interviews
  themselves: the source page writes them as "Amit Kumar" and "Ranjit
  Behra", both wrong.
- **Speaker portraits.** Three, normalised the same way as the ai-led set.
- **The report panel.** Cover, name and "Read the full report", using the
  `reportBand` field. `facts` on `reportBand` is now optional, because this
  event already lists the same four beside its write-up and the ai-led one
  does not.

### Then reshaped on user direction

The write-up band went the same way as the ai-led one, in stages:

- **Banner image removed.** An event that leads with recordings does not
  need a still above them, so the banner is dropped whenever `sessions` is
  set. `hasPiece` in the template is what decides this.
- **The two write-up paragraphs moved below the deck link**, inside the
  sessions band. Same rule: where the recordings lead, the write-up follows
  them.
- **The four facts moved into the report band**, verbatim from the source
  panel this time ("Research Focus: B2B", "Jun 2019 – Nov 2019", pipes and
  capitals as written), and off the event's own `facts`. With no piece and
  no facts left, the write-up band drops entirely.

The template gained a third layout on the way: where an event has facts but
no piece, they spread four across the width instead of sitting in a 23rem
column beside nothing. Nothing currently uses it, since this event's facts
then moved to the report band, but it is what keeps the aside honest.

### Quote card portraits

The interviews' own thumbnails are composed banners: the photograph on the
left, the name, role and client logo set beside it. Cropping one to a circle
gives you a disc of set copy. So the quote cards carry a square cut of the
same photograph, taken from the left 49% of the banner, which stops short of
the divider. Saved as
`public/events/content-marketing-report-launch/quote-<slug>.jpg` and set on
the quote rather than read off the interview record.

### LinkedIn on the speakers

All three profiles are on the source page and are now on the cards, the same
treatment as the ai-led launch. Santosh Abraham's matches the URL the user
supplied for the ai-led page.

**The slide deck is a link, not an embed.** The source runs the "Full
Presentation of Event Launch" as a 300px-square SlideShare iframe with an
empty anchor under it. New `deck` field renders it as a named link to
`slideshare.net/AkshaykumarRokade/nasscom-martech-researchnxt` instead.

---

## AI-led ebook launch page filled in from the live post, 2026-08-07

Diffed `/resources/events/ai-led-personalization/ai-led-ebook-launch` against
`researchnxt.com/events/ai-led-ebook-launch/`. The local page carried the
title, lede, facts and the speaker list, and nothing else the source publishes.
Four things were missing; all four are now in.

### The four session recordings

The source page is built around them, and they were not on ours at all. They
are now a "Watch the sessions" band, in the source's running order, with the
YouTube ids and the poster stills taken from the source's own player overlays:

| Session | YouTube id |
| --- | --- |
| Keynote, David Raab, Founder, CDP Institute | `K73A41ed_Fw` |
| Panel discussion, Customer engagement as a driver of growth | `X0SgCIUiu5M` |
| Fireside chat, Building the right foundation: marketing with data | `l4S6q9UjN8Q` |
| Panel discussion, Personalization a competitive advantage | `YNjogt0zGso` |

Posters saved under `public/events/ai-led-ebook-launch/session-*.png`,
unmodified from the source. The keynote leads the band at two-thirds width
with its label set beside it; the other three run three up beneath.

New `sessions` field on the `Event` type, so any other event with published
recordings gets the same band for free.

### `VideoEmbed`, a new client component

`src/components/media/video-embed.tsx`. Four YouTube iframes to show four
still frames would load the player and its cookies on every visit, so the
poster is the default and the iframe (on `youtube-nocookie.com`, autoplay on)
replaces it only on the click that means to watch. This is the sixth entry on
the client-component list in `CLAUDE.md`, which has been updated.

### Speaker portraits

All fifteen headshots pulled from the source, centre-cropped square with a
slight upward bias so no head is clipped, resized to 560px and saved as
progressive JPEG at `public/events/ai-led-ebook-launch/speaker-<slug>.jpg`.
The 6.5MB Rahul Mishra original is now 41KB. Contact-sheet checked: all
fifteen crops frame the face. `alt=""` on each, because the name is the next
line down.

### Speaker cards: LinkedIn, no interview link

The source links every speaker card to a LinkedIn profile, which we did not
carry over at all. All fifteen names now link out, and the "Read the
interview" line is gone on user direction, so the card is portrait, name to
LinkedIn, role.

Two exceptions worth knowing:

- **Ravi Santhanam has no link.** The source page's card for him points at
  TV Naarayan's profile (`naarayan-t-v-4b59621`), so there is no correct URL
  to carry over. Field left unset; the name renders as plain text.
- **Santosh Valecha and Santosh Abraham** were supplied by the user
  (`santushv`, `santoshabraham`). The source has none for Abraham and a
  different one for Valecha (`santosh-v-valecha`).

`interview` stays on the `Event` type and the template still renders it: the
south-east Asia and B2C automation report launches both set it, and both
still show their interview links.

### The report band and the client story band

Two bands below the speakers, on user direction, both from the source page:

- **The report band.** Report name over its subtitle, the four engagement
  facts as a tick list, "Read the full report" to
  `/resources/reports-whitepapers/ai-led-personalization`, the tablet cover
  mockup at right. New `reportBand` field; the href resolves from the
  programme's `reportSlug` rather than living in content.
- **The client success story band.** Netcore's testimonial artwork and "Read
  the story" at left, the engagement facts at right, on the report landing's
  own measurements so the two pages carry one band. New `clientStory` field
  pointing at the success-story slug inside the event's project.

Facts on both are verbatim from the source, pipes, capitals and en dash
included, which is how the report landing already carries them.

### The write-up band removed on user direction

A report panel and a client-story link were added to the aside first, then
removed along with everything else above the sessions: on user direction the
whole two-column band is gone from this event, banner image, body paragraph,
facts list, report panel and story link. The page now runs title, sessions,
speakers.

Done in content, not by deleting template code: `body`, `facts` and the
short-lived `reportCta` are off `aiLedEbookLaunch`, `reportCta` is off the
`Event` type again, and the band itself is gated on

```
event.video || event.body?.length || event.facts?.length || event.jotformId
```

so it drops banner and all when there is nothing to put in it. Every other
event has body or facts, so all seven render exactly as before, verified on
`content-marketing-report-launch` (banner, body and the four facts all still
there).

`image` and `imageAlt` stay on the event, because the events library card
still uses them.

### Verified

`npm run lint` clean, `tsc --noEmit` clean. Checked in Chrome at 1489px: all
four posters render, the keynote player loads and reports 1:07:21 on click,
the fifteen portraits render with their LinkedIn marks, the report band and
the client story band both render, the page goes straight from the title to
the sessions with no banner, and `scrollWidth === clientWidth` so nothing
overflows.
Not checked at 375 / 768.

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

## Experts bands sized to their count, orphan rows gone, 2026-08-07

The user flagged `unlocking-the-power-unified-cx`, where the five-interview
"Insights shared by industry professionals" band rendered 3 + 2 in the 3-up
grid. Same defect family as the quick reads: orphan rows and starved singles.

One rule now covers both bands, in a shared `CardCountLayout`: **full rows
keep the 3-up grid** (any multiple of 3, so the 18-interview B2C grid is
untouched), **a pair sits centred at half width**, and **any count that
would leave an orphan row scrolls as a rail** (which centres and drops its
arrows when everything fits, so exactly 4 reads as a clean full row, not a
carousel). **A single item becomes a `CardSpotlight`**, the extracted
component both bands now share, with "Read the interview" as the label on
the experts side. The quick-reads band was refactored onto the same two
components with identical behaviour (one change: a future multiple-of-3
count keeps the grid rather than railing).

Resulting experts layouts: rail for unified-cx (5), navigating-commute (5),
transforming-cx (4), abm (4), content-marketing (7); spotlight for the three
one-interview landings (consumer-engagement, publishers-guide, etutoring);
grids and tabs everywhere else unchanged. Verified per landing by counting
the registry; lint clean; not browser-checked.

## AI-led landing diffed against its microsite, two gaps closed, 2026-08-07

Checked `/resources/reports-whitepapers/ai-led-personalization` band by band
against `researchnxt.com/microsite/ai-led-personalization-2020/`. Matching
already: the Journey figures (180 days, 4, 18, 300+), the description, the
six Core Insights (now the specimen plate), the interviews (ours runs 20 to
the microsite's 16, the deliberate publish-everything-in-the-programme
precedent), the Netcore client testimonial spotlight, and the credits.

Two source bands were missing and are now in:

- **"Check out the Launch Event"**: a spotlight pointing at the published
  `ai-led-ebook-launch` event via `eventCard`, first in the spotlights array,
  the same event-then-story pair the B2C 2017 landing runs. Description
  written from the event record's own facts (David Raab keynote, three
  sessions, 300+ attendees), not invented
- **The closing facts**: the `facts` band existed on the type and template
  all along, this entry never carried it. One extraction trap: the page's
  Engagement fact had to be read after the Research Focus offset, because
  "Customer Engagement is the significant driver of growth" matches
  "Engagement" first

**Revised to verbatim on user direction** ("use the content as is from the
ref website do not change that"). The first pass normalised the copy to
house style; it now carries the source exactly: labels "Research Focus" and
"Timeframe of Research" in source caps, "AI Powered Business Strategies of
B2C Brands", "Interviews | Virtual Event | Social Media Promotion" with the
literal pipes, "April 2020 – Sept 2020" with the en dash, spotlight title
"Check out the Launch Event", and the spotlight description as the
microsite's own two sentences ("Netcore and Research NXT culminated their 6
month journey…") instead of copy written from the event record. Note this
verbatim ruling sits alongside the older carried-as-published precedent and
overrides house normalisation for microsite content on this landing.

**The Rohit Shrivastav quote card is removed on user direction.** It was the
landing's only voice, so the whole voices band goes with it, along with the
now-unreferenced `public/voices/ai-led-personalization/rohit-srivastav.png`.
It was the baked-artwork rendition of the microsite's Client Testimonial,
which the landing now expresses through the success-story spotlight with the
facts beside it, so the page no longer said it twice.

**Netcore mark replaced and the credits band re-proportioned.** The user
supplied the full Netcore lockup (the wordmark plus "Experience the
Infinite", 1997x671 with alpha). It replaces both previous files: the
netcore.ai SVG added earlier this session, and `netcore.png`, which turned
out to be a poor screenshot crop with a dark bar baked into the top edge.
Trimmed, downscaled to 720w as `netcore-lockup.png`, and pointed at from all
four references (both landings' credits and both Netcore success stories);
the two old files are deleted.

The sizing complaint was real and structural. Marks were scaled by **height
alone** (`h-12`), but the sponsor set runs from Salesforce at 1.43:1 to a
5.38:1 wordmark, so matching heights made the wide marks more than twice the
optical size of the tall ones, and the Research NXT wordmark, stuck at the
navbar's `h-5`, rendered 118x20 beside a 258x48 sponsor. Now every mark is
bounded on **both** axes (`max-h-12 max-w-44 object-contain`, in an `h-16`
row), and `Logo` gained a `markClassName` prop so the partner wordmark can
size to `h-7`. Computed result across all eleven marks: everything lands
inside 176x48, and the partner reads 165x28. The paired-sponsor variant
(Linkedpreneur + beyond99) gets half the budget each. Navbar and footer
`<Logo />` calls are unaffected, since the prop defaults to `h-5`.

**The launch event was on the page twice.** The landing already pointed at
the event through a hand-built one-item `quickReads` band titled "Check out
the launch event" (rendering as the card spotlight, so: that heading plus
the event's own title). The spotlight added earlier in this session was a
second pointer at the same event. On user direction the quick-reads band is
deleted and the spotlight keeps the slot, since it carries the microsite's
own two sentences rather than repeating the event title. The programme
published no articles, so the landing now legitimately runs no quick reads.

Because the microsite runs the launch event **above** the interviews,
spotlights gained an optional `beforeInterviews` flag, and the template
splits them into a leading and a trailing group around the experts band.
Only this one spotlight sets it; every other landing's spotlights still
close the page. The band JSX was extracted into a `SpotlightBand` component
so both slots render from one definition rather than a copy.

**Client success story band, final state.** The written description is gone
on user direction (`ReportLanding` spotlights' `description` is now optional
and the template omits the paragraph when absent; every other spotlight
across five landings keeps theirs). The band's columns were also coming out
reversed: spotlights zigzag by `bandIndex`, and the story is the second one,
so its content column was being pushed right and the facts left. The
alternation is now suppressed for facts-variant bands, which are
directional, so artwork and action stay left and facts stay right as the
microsite sets them. The band therefore reads: heading, testimonial artwork,
"Read the story", with the four facts opposite.

**Client success story band, earlier state, superseded above.** The left column
now runs heading, description, then the microsite's own testimonial card
artwork (the user-supplied 1024x576 with Rohit Shrivastav's quote and a play
badge baked in, saved as
`public/success-stories/ai-led-personalization/netcore-card.png` and passed
through `successStoryCard`'s existing image override), with "Read the story"
directly below the image; the facts hold the right column. The template's
facts-variant spotlight gained the in-column image, linked like the
right-hand cards are. Note the artwork's play badge implies a video; the
link goes to the success story page, which is what the CTA says, so it was
left as supplied. The credits' Netcore mark is now the official SVG from
netcore.ai (`/logos/trusted/netcore.svg`), scoped to this landing's "In
association with"; the B2C landing keeps the old PNG.

**Structure revised too, on user direction.** The facts do not stand as
their own band above the credits (the user asked for that section's
removal); on the microsite they sit to the right of the client testimonial.
Spotlight entries gained an optional `facts` list which renders as a 2x2
ruled definition list in place of the card's image, with the button still
carrying the link, and the ai-led facts moved into the "Client success
story" spotlight. The standalone facts band remains in the template and
still serves `state-of-consumer-engagement-gcc-2019`, verified per entry.
Lint clean, not browser-checked; worth an eyeball that the story spotlight
reads well with a text column on each side.

Lint clean, event reference verified against the registry, not
browser-checked.

## Testimonial photos updated and the theme index becomes a specimen plate, 2026-08-07

**South-east testimonial portraits, round two.** The user supplied six
current profile photos to replace the 2021 microsite cut-outs. The six URLs
arrived in exactly the data's order, verified by building a face-match
contact sheet against the old portraits before wiring anything. Saved as
`.jpg` under the same slugs (new filenames, so no cache serves the old
artwork, per the project rule) and the six `portrait` paths updated; the old
`.png` cut-outs are deleted.

**The contents-plate index lasted one look.** The user showed the old
WordPress band, ten white cards with stock line icons, and asked for a
better showcase. The icons' instinct is right (visual anchors for a scan),
the floating cards are the template the craft rules refuse. Rebuilt as a
**ruled specimen plate**:

- One hairline mesh (`gap-px` over a `bg-line` ground inside a rounded
  border), cells on the band surface, so the grid reads as one ruled
  instrument plate rather than ten cards
- Each cell: the theme's glyph in the exact icon chip the solutions pages
  use (`size-11 bg-accent-soft text-accent`, 1.6 stroke, round caps), then
  the label semibold
- **Sixteen new house-stroke glyphs** drawn into a `THEME_GLYPHS` table in
  the template, chosen per label by an ordered keyword list where the
  specific beats the general ("Service Delivery Innovations" is a bulb
  before "delivery" makes it a route; "Data is the currency" is coins
  before "data" makes it a chart). Dry-run over both index reports: every
  label unique and sensible, `compass` as the unmatched fallback
- Columns divide the count exactly (10 gets five, 6 gets three), so the
  plate is always a full rectangle, no orphan cells

The figure ledger for stat-led reports is untouched. Lint clean, not
browser-checked; the sixteen glyphs are hand-drawn SVG and want one visual
pass.

## South-east testimonials fixed and the highlights band redesigned, 2026-08-07

### The south-east voices band had the wrong artwork

The user caught it against the source
(`/microsite/business-strategy-2021/`): the migrated voices band carried the
16:9 interview thumbnails (`/experts/*.jpg`) as full-width slides, quotes
only in alt text. The microsite actually runs text quotes beside cut-out
portraits, and those portrait files exist on WordPress (`Anil.png`,
`ravi.png`, `jhonney.png`, `aron.png`, `karunjit.png`, `walter.png`; the
similarly named `*-300x169.jpg` files are the interview video thumbnails,
which is presumably how the mix-up happened). All six cut-outs are now at
`public/voices/south-east-asia-response-guide/<slug>.png` (320w) and the six
voices swapped `image` for `portrait`, so they render in the redesigned
text-testimonial card. Block comment corrected.

### "Report highlights" redesigned, frontend-design pass

The user called the tick-list band generic. The redesign reads the copy and
picks one of two treatments in a new `HighlightsBand` (template-only, no
data changes):

- **Findings ledger**, when items lead with figures: each row pulls its
  number out into the tabular `font-figure` face at `text-headline` on a
  fixed shared column (fixed, not auto, so rows measure identically and the
  digits align, which is the token's stated purpose), counting up via the
  existing `FigureValue`, with the claim reading as a sentence beside it.
  A mixed-in unfigured row (corporate-gifting's "Pharma is the top buyer…",
  content-marketing's "First of its kind…") carries the signal dash in the
  figure column instead
- **Theme index**, when no item carries a figure: the labels set at
  `text-title font-display-soft` with the signal tick, wrapping as a centred
  field, since the themes are the content and boxing them would fake depth.
  **Rejected on sight by the user** ("what is this shitty way"): centred
  flex-wrap gave the rows no shared edges and the band read as scattered.
  Rebuilt as a **contents plate**: two-column grid, labels left-aligned off
  one shared edge, each row trailing the `rule-ticks` dotted line out to its
  column's right edge, the same device every `SectionHeading` opens with, so
  the ten themes read as the report's table of contents. Lesson: centred
  flex-wrap of variable-width labels has no structure; this system builds
  structure from shared edges and rules

The parser (`FIGURE_LEAD`) was dry-run against every real highlight in the
registry: ledger for content-marketing (4/5), consumer-engagement (5/5),
abm (6/6), publishers-guide (2/2 including "$385 billion"), corporate-gifting
(5/6); index for south-east (0/10) and ai-led (0/6). Lint clean, not
browser-checked; the ledger's figure column width (6.5rem, 8.5rem at sm) is
the thing to eyeball against "$385 billion".

## GCC CX testimonials added to the transforming-cx landing, 2026-08-07

The user caught four testimonials on the live source
(`/bambooreports/transforming-cx-through-gcc-ebook/`) that the migrated
landing never carried; the entry even had a comment asserting "this page runs
no quote cards", which was wrong about the page even if right about the
cards: the source runs them as **plain text testimonials**, not baked
artwork, which is presumably how the migration missed them.

- `ReportLanding.voices` items' `image` is now optional, and `QuoteCarousel`
  gained a text mode: no artwork renders a panel-grammar `figure` with the
  quote at `text-title` and a name, role, company `figcaption`, `h-full` so
  short quotes match the tallest card. Both keys switched from `voice.image`
  to `voice.name`. Image-carrying voices bands (b2c, south-east, unified-cx
  and the implementors guide) render exactly as before
- The four quotes were extracted from the raw source HTML, not a summary,
  and are **quoted as written**, American spellings included, matching the
  south-east precedent. The speakers are exactly the landing's four
  interviewees. Attributions as the page states them: Vineet Dwivedi (Global
  Head, Alcon Global Services), Sharda Nenwani Gupta (MD & Global Business
  Services Head, India, no company on the page though her interview says GBS
  Bayer India), Geetanjali Chugh Kothari (CMO, Future Generali India Life
  Insurance), Vivek Veeraraghavan (SVP of Digital Transformation APAC,
  Northern Trust)
- The band sits where voices always sits, between the interviews and the
  credits, with no heading of its own

Lint clean. Not browser-checked; the new text-card mode is the thing to look
at, especially that the four cards hold one height in the rail.

### Testimonial card redesigned with the speakers' portraits

The first text-card design (a plain bordered panel) was rejected by the
user, who also pointed out the source page does carry the speakers'
photographs, which the first extraction pass missed because they sit in the
slider markup above each quote. Redesign, via the frontend-design pass:

- **The panel box is gone.** The card now uses the site's own quote grammar,
  the `border-l-2 border-signal` spine the interview pull quotes carry, so
  the testimonial reads as the same device readers meet on the interview
  pages. Structure from the spine, not a border, per the design system
- **The four cut-out portraits** (removebg PNGs from the source slider,
  downscaled to 320w under `public/voices/transforming-cx-through-gccs/`)
  sit on an `accent-soft` disc beside the quote, `object-cover object-top`
  since the crops vary. New optional `portrait` field on voices items, read
  only when `image` (baked artwork) is absent
- Attribution is now name on its own semibold line, role and company below,
  rather than a comma run-on
- Cards centre within the rail height so short quotes sit level with long

Also on user direction: this landing's credits label "Brought to you by"
becomes **"GCC insights by"** (the Southeast Asia landing's identical label
is untouched). Lint clean, portraits verified on disk, not browser-checked.

## Multi-row card stacks become single-row rails site-wide, 2026-08-07

Follow-up on the user flagging `south-east-asia-response-guide`: its six
interviews sat as a 3+3 double grid. The preference is now clear, one
scrolling row over stacked rows, so the rule tightened and the same
structure was hunted down everywhere.

- **`CardCountLayout` keeps the grid only for exactly three.** Anything above
  three rails, including full-row multiples: south-east (6) and the B2C 2017
  landing's 18-interview grid are now single-row rails. B2C at 18 is the one
  to eyeball, that is a long scroll, though the band itself stays short
- **The "More insights" and "More interviews" sibling bands** on the article
  and interview pages now use `ReportCardRail` instead of their 3-up grids.
  These were the worst offenders: uncapped, so an ACM interview page stacked
  its 18 siblings six rows deep. Their inline card markup was `ReportCard`'s
  anatomy plus a "Read the…" action line, which the rail's cards drop, one
  small anatomy change
- **Left alone, deliberately**: the multi-group tab panels (a native-radio
  `peer-checked` structure where the rail's overflow measurement would run
  against `display:none` panels and misreport; tabs already exist to keep
  that band short), the event pages' "Who spoke" name lists (text cards, not
  plates), and every library index page (a library is a browsing surface;
  orphan rows there are the honest shape of a growing collection)

Mishap recorded: a blank-line cleanup `sed` stripped every blank line from
the insights article page; caught in the diff, restored from HEAD, and the
change reapplied with proper edits. Lint clean, three-file diff verified
tight. Not browser-checked.

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

### Stale-cache follow-up: hero covers renamed to `<slug>-hero.png`

The user saw the old implementors-guide and ai-led mocks even after
Ctrl+Shift+R. Every file on disk was pixel-verified against its source (all
fourteen matched, avg diff about 1 unit at 64x64), so the stale bytes were
coming from Next's dev image-optimizer cache (`.next/cache/images`), which
in-place overwrites do not reliably bust and browser refreshes cannot reach.
Fix: all fifteen hero covers renamed via `git mv` to `<slug>-hero.png` with
the registry paths updated, so every URL is new to every cache layer.
Lesson recorded for next time: **never ship a changed image at an unchanged
URL**; rename first.

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
