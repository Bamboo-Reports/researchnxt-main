/**
 * Legal copy transcribed verbatim from the live WordPress pages.
 *
 * Stored as structured data rather than MDX: these documents are strictly
 * heading + paragraph + list, so a typed shape gives us the same result with
 * no MDX toolchain. Phase B introduces MDX for article bodies, where the
 * richer authoring surface actually earns its keep.
 */

export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  effectiveDate?: string;
  intro?: string[];
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Statement",
  effectiveDate: "1 July 2024",
  intro: [
    "At Research NXT (www.researchnxt.com), your privacy is a top priority. This Privacy Statement explains what types of information we collect, how we use and protect that information, and your rights regarding your personal data when you use our website. By using our website, you agree to the terms outlined in this Privacy Statement.",
    "Should you have any questions or require more information about our Privacy Statement, please contact us at privacy@researchnxt.com.",
  ],
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect a variety of information from visitors to our website, including:",
      ],
      list: [
        "Personal information: Name, job title, email address, and demographic data such as postal code.",
        "Survey data: Information you provide when participating in our surveys, which may include your feedback, preferences, and any other information relevant to the survey.",
        "Log file data: Information like your IP address, browser type, referring/exit pages, and the date and time of your visit. This helps us analyse trends and improve the functionality of our website.",
        "Cookies: Data regarding your website preferences and interaction with our site. Cookies help us optimise your browsing experience.",
      ],
    },
    {
      heading: "How we use the information",
      paragraphs: [
        "We gather this information to better understand your needs and provide you with enhanced services, including:",
      ],
      list: [
        "Improving user experience: Analysing data to customise content, improve website functionality, and tailor services to user preferences.",
        "Internal record keeping: Maintaining accurate data about website visitors and user activities for analytics and security.",
        "Surveys and reports: To conduct surveys, publish reports, and allow participants to receive any applicable rewards. Survey participation may involve sharing collected data with third-party sponsors (as outlined in each survey's specific terms).",
        "Marketing and promotions: With your consent, we may use the information you provide to send promotional emails regarding new products, reports, services, or special offers that we think may be of interest to you.",
      ],
    },
    {
      heading: "Surveys and sponsored research activities",
      paragraphs: [
        "As a research organisation, we conduct surveys that may be sponsored by third-party partners. By participating in these surveys:",
      ],
      list: [
        "You may be eligible for incentives, as outlined in the survey's specific terms and conditions.",
        "You will need to refer to the invitation for details regarding terms and privacy specific to each survey.",
        "Data collected during the survey may be shared with the sponsor, but only under the terms agreed to when you participated in the survey.",
      ],
    },
    {
      heading: "Sponsored reports and downloads",
      paragraphs: [
        "We publish reports, some of which are sponsored by our partners. When you download a sponsored report from our website:",
      ],
      list: [
        "You agree to the terms and conditions associated with the report.",
        "By providing your contact information, you consent to the sponsor of the report reaching out to you for follow-up communications, such as marketing and outreach.",
        "We may share your contact details (name, email address) with the report's sponsor.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We are committed to ensuring that your information is secure. To prevent unauthorised access or disclosure, we have implemented appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.",
      ],
    },
    {
      heading: "How we use cookies",
      paragraphs: [
        "Cookies are small files placed on your device to analyse web traffic and tailor content to your preferences. Cookies help us identify which pages are useful to you and improve your browsing experience. You can choose to accept or decline cookies through your browser settings. However, declining cookies may prevent you from fully utilising all features of our website.",
        "We use cookies for:",
      ],
      list: [
        "Analysing web traffic: To identify which pages are being used, allowing us to improve our website's performance.",
        "User preferences: Customising content based on the visitor's previous interaction with our site.",
      ],
    },
    {
      heading: "Links to other websites",
      paragraphs: [
        "Our website may contain links to other websites of interest. However, once you leave our site via these links, we are not responsible for the privacy practices of those external websites. We encourage you to review the privacy statements of any website you visit from ours.",
      ],
    },
    {
      heading: "Controlling your personal information",
      paragraphs: [
        "You have the right to control the use of your personal information. If you have previously consented to us using your personal data for direct marketing purposes, you may opt out at any time by contacting us at privacy@researchnxt.com.",
        "We do not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law. We may share your data with trusted partners, but only if you have consented to this during the collection process or if it is necessary to provide services.",
        "If you would like to know what personal information we hold about you, or if you believe any data we are holding is incorrect or incomplete, please contact us. We will promptly correct any information found to be inaccurate.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Depending on the jurisdiction, you may have rights under applicable data protection laws, including:",
      ],
      list: [
        "The right to access your personal data.",
        "The right to rectify inaccurate information.",
        "The right to request deletion of your personal data.",
        "The right to object to or restrict our processing of your data.",
      ],
    },
    {
      heading: "Updates to this Privacy Statement",
      paragraphs: [
        "We may update this Privacy Statement periodically. When we do, we will post the updated version on this page with the new effective date. Please review this page from time to time to stay informed of any changes.",
      ],
    },
    {
      heading: "Contact us",
      paragraphs: [
        "If you have any questions about this Privacy Statement or the data we collect, please contact us at:",
        "Research NXT, 91 Springboard Sky Loft, Creaticity Mall, Opposite Golf Course, Shastrinagar, Pune, Maharashtra 411006.",
        "Email: privacy@researchnxt.com",
      ],
    },
  ],
};
