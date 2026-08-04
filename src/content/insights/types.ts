/**
 * Insights: the article library.
 *
 * An article belongs to a research project (the report it was written around)
 * and gets its own page at /resources/insights/[project]/[article]. Unlike an
 * expert interview, an article carries its own download form: the sector
 * editions of a report each have a separate Jotform.
 */

export type InsightProject = {
  slug: string;
  name: string;
  lede: string;
  /** Slug of the report landing in `content/resources`, once it exists. */
  reportSlug?: string;
};

/**
 * A block of an article body. A plain string is a paragraph carrying `**bold**`
 * emphasis; an object is a subheading, a list, or a pulled quote from someone
 * interviewed for the piece.
 */
export type InsightBlock =
  | string
  | { heading: string }
  | { list: string[]; ordered?: boolean }
  | { quote: string; attribution: string };

export type InsightArticle = {
  slug: string;
  project: string;

  metaTitle: string;
  metaDescription: string;

  title: string;
  thumbnail: string;
  thumbnailAlt: string;

  /** Standfirst paragraphs above the body. */
  intro: string[];
  body: InsightBlock[];

  /**
   * The article's own download form. Each sector edition of a report has a
   * separate Jotform, so this is not inherited from the project.
   */
  download: {
    jotformId: string;
    /** Accessible name for the iframe, from the source embed. */
    formTitle: string;
    /** One line under the panel heading, naming what is being downloaded. */
    blurb: string;
  };
};
