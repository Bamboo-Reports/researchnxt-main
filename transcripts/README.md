# Source transcripts and articles

Archived copies of the interview and article pages from the live WordPress
site, one folder per research project. These are **input material, not build
input**: nothing under `src/` imports from here. The archives stay in the repo
so a transcription can be checked against its source without going back to
WordPress.

## Interview archives

Every interview has been transcribed into a typed module under
`src/content/experts-view/<project>/<person>.ts` and is published at
`/resources/experts-view/<project>/<person>`.

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

## Article archives

Every article has been transcribed into a typed module under
`src/content/insights/<project>/<article>.ts` and is published at
`/resources/insights/<project>/<article>`.

| Archive folder | Published project slug |
| --- | --- |
| `sf-articles/` | `implementers-guide-to-ai` |
| `zoho-articles/` | `automation-campaign-management` |
| `zoho-qatar-articles/` | `unlocking-the-power-unified-cx` |
| `gcc-transforming-customer-experience-through-gccs-articles/` | `transforming-cx-through-gccs` |
| `routematic-articles/` | `navigating-corporate-commute-for-gccs-in-india` |

Each article directory holds an `article.md` and its banner. Unlike an
interview, an article carries **its own download form**: the `## Form
reference` block in each `article.md` is the source of the Jotform id and
iframe title used by the published page. Banners were copied into
`public/insights/` at publication, renamed to the article slug.

Published article slugs are **not always the source folder name**. Where a
source slug repeated the project name or ran too long to read in a URL, it was
shortened; the original WordPress URL is recorded at the top of every
`article.md`.

## Source lists

`source-lists/` holds the per-project lists of source URLs the archives were
built from, `*-interviews.txt` for interviews and `*-article-links.txt` for
articles.
