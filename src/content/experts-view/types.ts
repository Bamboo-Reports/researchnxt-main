/**
 * Experts view content types.
 *
 * Kept apart from `index.ts` so each interview module can import the type
 * without importing the registry that imports it back.
 */

/** A research project the interviews were conducted for. */
export type ExpertProject = {
  slug: string;
  name: string;
  lede: string;
  /**
   * Slug of the report landing in `content/resources`, once it exists. When
   * set, the interview pages link to it and take their download form from it,
   * so the form is configured in exactly one place.
   */
  reportSlug?: string;
  /**
   * Jotform id for the download form, for a project whose report landing has
   * not been built yet. Ignored once `reportSlug` resolves to a landing.
   */
  jotformId?: string;
};

/**
 * One block of an answer. A plain string is a paragraph; `**` inside it marks
 * bold emphasis. An object is a list, numbered when `ordered` is set.
 */
export type InterviewBlock = string | { list: string[]; ordered?: boolean };

export type InterviewExchange = {
  question: string;
  answer: InterviewBlock[];
};

/**
 * A key point from the top of the article. Some source articles label each
 * point ("Key highlights"), others just list them ("Key takeaways"), so a
 * plain string is allowed.
 */
export type InterviewHighlight =
  string | { title: string; description: string };

/**
 * Which section of the library an interview sits under. The library is
 * organised by who is speaking, not by which report commissioned the
 * conversation.
 */
export type ExpertPerspective = "buyer" | "thought-leader" | "vendor";

export type ExpertInterview = {
  /** Person slug; the last segment of the URL. */
  slug: string;
  /** Slug of the project in `expertProjects`. */
  project: string;
  /** Library section. */
  perspective: ExpertPerspective;

  metaTitle: string;
  metaDescription: string;

  title: string;
  /** Role and company are omitted where the source article does not name them. */
  person: {
    name: string;
    role?: string;
    company?: string;
  };

  /** Path under /public. */
  thumbnail: string;
  thumbnailAlt: string;

  /** Standfirst paragraphs above the highlights. */
  intro: string[];
  /** Empty when the source article carries no highlights list. */
  highlights: InterviewHighlight[];
  /** Omitted when the source article carries no pull quote. */
  pullQuote?: string;
  exchanges: InterviewExchange[];
};
