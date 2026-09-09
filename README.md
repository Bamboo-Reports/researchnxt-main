# Research NXT website

The Research NXT marketing website, built with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Content URLs

Everything the research programmes produce lives under `/resources`, and a
piece of content is addressed by **the programme it belongs to, then itself**.
There are many reports, and a title only has to be unique inside its own
programme, so the programme slug is always the middle segment:

```
/resources/reports-whitepapers/<report>            the report landing
/resources/experts-view/<project>/<person>         one interview
/resources/insights/<project>/<article>            one article
/resources/events/<project>/<event>                one event
/resources/success-stories/<project>/<story>       one client engagement
```

Concretely:

```
/resources/reports-whitepapers/implementors-guide-to-ai
/resources/experts-view/implementors-guide-to-ai/karthik-anantharaman
/resources/insights/implementors-guide-to-ai/ai-is-the-future-and-the-future-is-now
```

The rules that follow from this:

- **`<project>` is the programme slug**, and it matches the report landing's
  slug wherever that report has been built. A programme without a landing still
  gets a slug and is registered in the same place; only the link to the landing
  is dropped.
- **A leaf slug is only ever resolved inside its project**, so two programmes
  may reuse one without colliding. Content modules are therefore stored one
  folder per project (`src/content/insights/<project>/<article>.ts`,
  `src/content/experts-view/<project>/<person>.ts`), and where the same name
  appears in two projects the registry aliases the import rather than renaming
  the route.
- **Do not repeat the project in the leaf slug.** The source article
  "Implementor's Guide to AI: Finance Leaders …" is
  `/resources/insights/implementors-guide-to-ai/finance-leaders-…`, not
  `…/implementors-guide-to-ai-finance-leaders-…`.
- **Images follow the URL**: `public/insights/<project>/<article>.png`.
  (`public/experts/` predates this and is flat, with a company suffix where two
  projects carry the same person.)
- **The library index is the parent path**: `/resources/insights`,
  `/resources/experts-view`, `/resources/events`,
  `/resources/success-stories` and `/resources/reports-whitepapers`, each a
  grid. The intermediate `/resources/<library>/<project>` has no page of its
  own.
- **A moved WordPress URL gets an explicit redirect** in `next.config.mjs`,
  listed one by one. Content prefixes are never redirected as a rule while some
  of their pages still have no target here.

Each project registry (`insightProjects`, `expertProjects`) is the single
source of truth for a programme's slug and display name; add the programme
there first, then the content modules under a folder of that name.

See [PROGRESS.md](./PROGRESS.md) for migration status and implementation notes.
