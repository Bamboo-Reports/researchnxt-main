export type Stat = {
  value: string;
  label: string;
};

export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

/** Glyph names rendered by `CapabilityIcon`; one per capability card. */
export type CapabilityIconName =
  | "target"
  | "list-search"
  | "append"
  | "cleanse"
  | "account"
  | "competitor"
  | "content"
  | "campaign"
  | "funnel";

export type Capability = {
  /** May contain "\n" to force a chosen line break, so short titles can match
      the two-line rhythm of their neighbours in the grid. */
  title: string;
  icon?: CapabilityIconName;
  description?: string;
  points?: Array<
    | string
    | {
        label: string;
        tooltip: string;
      }
  >;
};

/**
 * All internal solution pages share one template; only this data differs.
 * Section order in the template: hero → proposition → outcome →
 * capabilities → (optional) detail.
 */
export type SolutionPage = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;

  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    primary: CTA;
    secondary?: CTA;
  };

  /** Section titles may wrap a key phrase in `**` markers; the template
      renders that segment in the brand accent, echoing the old site's
      two-tone headlines. */
  proposition: {
    title: string;
    /** Keeps the title on one desktop line by clamping its size against the
        viewport, as the outcome statement does. Only for titles short enough
        to fit at a readable size (roughly 65 characters). */
    singleLine?: boolean;
    body: string[];
  };

  capabilities: {
    eyebrow?: string;
    title: string;
    lede?: string;
    body?: string[];
    items: Capability[];
  };

  /** Optional numbers band — e.g. the data points covered in an ICP assessment. */
  detail?: {
    title: string;
    lede?: string;
    stats: Stat[];
  };

  /**
   * Closing statement. When the copy reads as an equation ("X = Y") the
   * template splits on " = " and draws the equals sign as an orange mark.
   */
  outcome: {
    statement: string;
    description?: string;
  };
};

export type JobOpening = {
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
};

export type FeaturedResource = {
  title: string;
  summary: string;
  href: string;
  kind: string;
  /**
   * PHASE A: every featured item points at the live WordPress URL, since the
   * /resources routes do not exist yet. Phase B replaces this whole array with
   * a `getFeaturedResources()` call against the MDX content layer.
   */
  external: true;
};
