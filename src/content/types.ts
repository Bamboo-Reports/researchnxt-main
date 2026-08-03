export type Stat = {
  value: string;
  label: string;
};

export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type Capability = {
  title: string;
  description: string;
  points?: string[];
};

/**
 * All internal solution pages share one template; only this data differs.
 * Section order in the template: hero → proposition → capabilities →
 * (optional) detail → outcome → CTA band.
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

  proposition: {
    title: string;
    body: string[];
  };

  capabilities: {
    title: string;
    lede?: string;
    items: Capability[];
  };

  /** Optional numbers band — e.g. the data points covered in an ICP assessment. */
  detail?: {
    title: string;
    lede?: string;
    stats: Stat[];
  };

  outcome: {
    statement: string;
    description: string;
  };

  cta: {
    title: string;
    lede: string;
    primary: CTA;
    secondary?: CTA;
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
