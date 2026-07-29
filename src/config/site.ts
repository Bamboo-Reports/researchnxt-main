export const site = {
  name: "Research NXT",
  url: "https://researchnxt.com",
  tagline: "Turnkey research solutions personalized to your marketing goals.",
  description:
    "Research NXT offers custom engagement solutions based on high-quality research to business and marketing leaders.",
  email: "enquiry@researchnxt.com",
  address: {
    lines: [
      "91 Springboard Sky Loft, Creaticity Mall",
      "Opposite Golf Course, Shastrinagar",
      "Pune, Maharashtra 411006",
    ],
    country: "India",
  },
  social: [
    // NOTE: the live WordPress site links to /company/10452329/admin/, which is
    // an admin-only URL that non-admins cannot open. Using the public form.
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/10452329/",
    },
    { label: "Twitter", href: "https://twitter.com/researchnxt" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UC_JAjtvCOHqNUnAe6XI_HQQ",
    },
  ],
  /** Sister property for GCC research; stays a separate site for now. */
  bambooReports: "https://bambooreports.io",
} as const;
