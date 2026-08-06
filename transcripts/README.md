# Source transcripts

Archived copies of the interview articles from the live WordPress site, one
folder per research project. These are **input material, not build input**:
nothing under `src/` imports from here.

Every interview has been transcribed into a typed module under
`src/content/experts-view/<project>/<person>.ts` and is published at
`/resources/experts-view/<project>/<person>`. The archives stay in the repo so
a transcription can be checked against its source without going back to
WordPress.

| Archive folder | Published project slug |
| --- | --- |
| `sf-interview-transcript/` | `implementers-guide-to-ai` |
| `zoho-interview-transcript/` | `automation-campaign-management` |
| `zoho-qatar-interview-transcript/` | `unlocking-the-power-unified-cx` |
| `gcc-transforming-customer-experience-through-gccs/` | `transforming-cx-through-gccs` |
| `routematic/` | `navigating-corporate-commute-for-gccs-in-india` |
| `cloud-computing/` | `cloud-computing-new-normal-beyond` |
| `south-east-asia-response-guide/` | `south-east-asia-response-guide` |
| `ai-led-personalization-2020/` | `ai-led-personalization` |

Each interview directory holds a `transcript.md` and the original Open Graph
banner. The banners were copied into `public/experts/` at publication, renamed
to the person slug, with a company suffix where two projects carry the same
name.

`source-lists/` holds the per-project lists of source URLs the archives were
built from.

## Articles

`guide-to-ai-articles/` is the one archive that holds **articles, not
interviews**: the five quick reads and toolkits linked from the Implementer's
Guide to AI report landing, taken from `researchnxt.com/guide-to-ai/`. One
folder per article, named for the source URL slug, each holding an
`article.md` and the original Open Graph banner as `thumbnail.png`.

The front matter of each `article.md` records the source URL, the banner, and
**the article's own Jotform id** — every one of the five carries a different
download form, so the id travels with the article rather than being taken from
the report:

| Article | Jotform |
| --- | --- |
| AI is the Future, and the Future is Now | 252512579059463 |
| Finance Leaders Transition from Caution to Customer-Centric Scale | 253343061174450 |
| Manufacturing, Automotive & Energy Leaders Move from Pilots to Scale | 253070747406456 |
| Retail & Consumer Goods Leaders Shift from Experiments to Loyalty-Led Scale | 253342944388466 |
| The Four Waves of AI | 251140437587458 |

All five are published at
`/resources/insights/implementers-guide-to-ai/<slug>`, transcribed into
`src/content/insights/implementers-guide-to-ai/<slug>.ts`. Source copy is kept
as written here, including the em dashes and decorative italics the house
style drops at publication.

`campaign-management-articles/` is the same kind of archive for the quick
reads on the Automation & Campaign Management landing, taken from
`researchnxt.com/campaign-management/`. Both carry Jotform 243521499246462,
the same form as the report:

| Article | Status |
| --- | --- |
| Automate, Target, Win in 2024 | published at `/resources/insights/automation-campaign-management/automate-target-win-in-2024` |
| Redefining Marketing Excellence: Marketing Automation Roundtable | archived only; bound for Events, which has no route yet |

These pages have no article `<h1>` of their own (the title sits in the page
header), so the body was bounded by the last nav item and the "Recent Updates"
band rather than by a heading.

A third quick read on that microsite, "Campaign Management and Automation in
2024: Insights from Naresh Kumar and Santosh Abraham", was **deliberately not
archived**: it duplicates Naresh Kumar's published interview, "Marketing
Automation is Not Just a Tool for Efficiency but a Driver of Business
Success".

`business-strategy-articles/` holds the two quick reads on the Southeast Asia
Response Guide landing, from `researchnxt.com/business-strategy/`. **Both are
pure infographic**: each source page is a title and one 800x2000 PNG with no
body copy at all, archived as `infographic.png` and transcribed into the
markdown. On the site they are rebuilt as `points` blocks.

`events/` holds the source for the one published event, the Southeast Asia
Response Guide launch, at `/resources/events/south-east-asia-response-guide/business-strategy-report-launch`.

`cloud-computing-articles/` holds the three quick reads on the Cloud Computing
in the New Normal & Beyond landing, from `researchnxt.com/cloud-computing/`
and `/blog/`. All three carry Jotform 211600107593446, the project's 2021
report form. **Two of them are mostly infographic**: "Top 5 Cloud Computing
Trends" and "Top 5 Cloud Adoption Trends" each carry their whole argument in
one 1024x2560 JPEG, archived here as `infographic.jpg` beside the article and
transcribed into the markdown as text. On the site those are rebuilt as real
blocks (`figures` and `points` in `content/insights/types.ts`) rather than
shipped as a flat image, so the numbers are selectable, searchable and reflow
on a phone.

`bambooreports-articles/` holds the one quick read on the Transforming CX
through GCCs eBook landing, taken from `researchnxt.com/bambooreports/`, and
published at
`/resources/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024`.
Neither the source article nor the eBook landing carries a Jotform, so the
published article uses the eBook's own form id (241762483249463). The source
page ends at a "Research NXT offers custom engagement solutions" band rather
than the usual "Recent Updates", so the extractor was bounded on that instead.

`gcc-commute-articles/` is the same kind of archive for the one quick read on
the Navigating Corporate Commute landing, taken from
`researchnxt.com/gcc-commute/`. It carries Jotform 260490193043452, the same
form as its report, and is published at
`/resources/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute`
(the source slug is long enough to be unusable as a leaf, so it was shortened
to its first clause and the full URL redirects).

`customer-experience-articles/` is the same kind of archive for the one quick
read on the Unlocking the Power of Unified CX landing, taken from
`researchnxt.com/customer-experience/`. It carries Jotform 250201862296454,
the same form as its report, and is published at
`/resources/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar`.
The source page opens with the microsite's Arabic-language toggle, which
leaked into extraction as a heading and is dropped from the archive; the
Arabic edition itself is not archived.
