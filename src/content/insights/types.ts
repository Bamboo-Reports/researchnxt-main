/**
 * Insights content types.
 *
 * Kept apart from `index.ts` so each article module can import the type
 * without importing the registry that imports it back, the same arrangement
 * the experts-view library uses.
 */

/**
 * One block of an article. A plain string is a paragraph; `**` inside it marks
 * bold emphasis. `heading` opens a section, and a `list` object is a list,
 * numbered when `ordered` is set.
 *
 * `figures` and `points` exist because two of the 2021 cloud articles carry
 * their whole argument inside a single tall infographic JPEG. Rebuilding those
 * as blocks makes the numbers selectable, searchable, translatable and legible
 * to a screen reader, and lets them reflow on a phone, none of which a
 * flattened image can do. The source image stays in the archive.
 */
export type ArticleBlock =
  | string
  | { heading: string }
  | { list: string[]; ordered?: boolean }
  /** A set of measured figures, rendered as the site's stat tiles. */
  | { figures: { value: string; label: string }[]; source?: string }
  /**
   * Named points, each a short title with either a paragraph, a few sub
   * points, or both. The 2021 Southeast Asia infographics stack three short
   * lines under each heading rather than writing a sentence.
   */
  | {
      points: { title: string; description?: string; items?: string[] }[];
    };

/**
 * A research programme articles were written for. The slug is the middle
 * segment of an article URL, and matches the report landing's slug wherever
 * one exists, so `/resources/insights/<project>` reads as the same programme
 * as `/resources/reports-whitepapers/<project>`.
 */
export type InsightProject = {
  slug: string;
  name: string;
  /**
   * Slug of the report landing in `content/resources`, when the programme has
   * one. The article breadcrumb links to it, as do event pages' report bands.
   */
  reportSlug?: string;
};

export type Insight = {
  /** Last segment of the URL. */
  slug: string;
  /** Slug of the project in `insightProjects`. */
  project: string;

  metaTitle: string;
  metaDescription: string;

  title: string;
  /** Publication date on the source article, ISO `YYYY-MM-DD`. */
  published: string;
  /** One or two sentences for the library card. */
  excerpt: string;

  /** Path under /public. */
  thumbnail: string;
  thumbnailAlt: string;

  /**
   * Every one of these articles carries its own download form on the live
   * site, so the id travels with the article rather than being taken from a
   * report landing.
   */
  jotformId: string;

  body: ArticleBlock[];
};
