import type { Event } from "../types";

/**
 * The Bamboo Reports GCC roundtable, Bengaluru, 13 November 2025. Authored
 * from the recap supplied by the user (h1b-roundtable.md), not transcribed
 * from a WordPress page; the images were pulled from the draft's temporary
 * hosts into `public/events/h1b-shock-strategic-reset/` so nothing on the
 * page depends on catbox or ufs.sh.
 *
 * `project` is `bamboo-reports`: the roundtable belongs to the Bamboo
 * Reports GCC research rather than to any of the marketing report
 * programmes. There is deliberately no insights record for it, so its page
 * renders no report band, like the conference participations.
 */
export const h1bShockStrategicReset: Event = {
  slug: "h1b-shock-strategic-reset",
  project: "bamboo-reports",

  metaTitle: "H-1B Shock or Strategic Reset? The Bamboo Reports Roundtable",
  metaDescription:
    "Roundtable recap on how India's GCCs are shifting from delivery hubs to decision engines. Key signals, panellists, and playbook prompts from the Bengaluru discussion.",

  title:
    "H-1B shock or strategic reset? Bengaluru roundtable reveals India's GCC power shift",
  lede: "Hosted by Research NXT and Bamboo Reports, leaders across marketing, strategy, sales and GCC operations debated how global delivery and decision-making are being rebuilt around India.",
  date: "2025-11-13",
  excerpt:
    "Leaders across marketing, strategy, sales and GCC operations debated how global delivery and decision-making are being rebuilt around India, from the H-1B reset to GCCs running budgets in-market.",

  image: "/events/h1b-shock-strategic-reset/hero.jpg",
  imageAlt: "Roundtable discussion on India's GCC power shift",

  facts: [
    { label: "Format", value: "Executive roundtable" },
    { label: "Venue", value: "Hilton Bengaluru" },
    { label: "Hosted by", value: "Research NXT and Bamboo Reports" },
  ],

  body: [
    { heading: "Highlights" },
    {
      list: [
        "**India's advantage is strategic.** The H-1B policy shift is less a shock and more a reset. Leaders see India moving from execution to value-creation as global models rebalance.",
        "**GCCs are decision engines.** Roles across R&D, customer support, engineering, marketing, and procurement are already being run from India with budget and innovation control.",
        "**Scale beats regional rivals.** Vietnam and Southeast Asia are rising, but when enterprises need 10k to 50k people with enterprise-grade consistency, India still wins on depth and scale.",
      ],
    },

    { heading: "This is not outsourcing shock. It is intelligent insourcing." },
    "Participants agreed the proposed 25% outsourcing tax is already forcing operating model shifts. For many, it is accelerating something bigger: India moving up the value chain from scalable execution to accurate decision-making and value creation. Past models left Indian teams on the periphery; this moment is about owning budgets, innovation, and enterprise-grade delivery in-market.",
    {
      list: [
        "**India vs Southeast Asia:** Vietnam can build strong 5k-member teams, but for 10k to 50k enterprise-grade scale with consistency, India still leads. Capability plus scale remains the differentiator.",
        "**What changes inside GCCs:** Decision rights are shifting to India across R&D, engineering, marketing, customer support, and procurement. Leaders are pushing for strategic roles to sit in-market to avoid translation layers.",
      ],
    },

    { heading: "What leaders are already acting on" },
    {
      list: [
        "Value creation is catching up with capability; Indian leaders are influencing budgets and procurement directly.",
        "Internal marketing is mandatory: if HQ does not see the wins, budgets stay limited.",
        "Talent depth is India's edge, but strategic roles must sit in-market to avoid translation layers.",
        "Outsourcing tax chatter has already triggered operating model redesigns toward India-led teams.",
      ],
    },

    { heading: "How GCC teams and vendors should respond" },
    {
      list: [
        "Design GCC-specific ABM and city-hub strategies for faster leadership buy-in.",
        "Run internal storytelling campaigns so HQ sees India as a strategy hub, not just delivery.",
        "Double down on employer brand and ecosystem positioning to lock in senior talent.",
      ],
    },
    "The panel brought together a cross-section of marketing, sales, digital transformation, and GCC leaders who unpacked the shift from outsourcing to intelligent insourcing.",
  ],

  /* The recap's closing takeaway, set under the speaker cards so the panel
     is introduced before the piece signs off. */
  bodyAfterSpeakers: [
    {
      heading:
        "Global capability centres are in India because capability is higher.",
    },
    "The Bengaluru roundtable made one point clear: the outsourcing era is ending. As GCCs take on strategic mandates and own budgets, India is positioned to be the primary strategy hub for global enterprises. The call to action is simple: market your wins internally, elevate strategic roles in India, and treat capability plus scale as the advantage to defend.",
  ],

  gallery: {
    title: "Moments from the Bengaluru roundtable",
    /* Alt text is empty on all sixteen, the HYSEA precedent: they are a
       record of the room, and sixteen captions reading "leaders at the
       roundtable" would add noise for a screen reader, not information. */
    images: [
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-1.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-2.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-3.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-4.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-5.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-6.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-7.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-8.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-9.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-10.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-11.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-12.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-13.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-14.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-15.webp", alt: "" },
      { src: "/events/h1b-shock-strategic-reset/gallery/glimpse-16.webp", alt: "" },
    ],
  },

  /* A to Z by name, on user direction. No LinkedIn profiles: the draft
     supplies none, and a URL guessed from a name risks the wrong person. */
  speakers: [
    {
      name: "Anisha Chawla",
      role: "Lead Global Events",
      company: "Amagi",
      image: "/events/h1b-shock-strategic-reset/speakers/anisha-chawla.jpg",
    },
    {
      name: "Diptarup Chakrabarti",
      role: "Fractional CMO",
      image:
        "/events/h1b-shock-strategic-reset/speakers/diptarup-chakrabarti.jpg",
    },
    {
      name: "Glen Mary George",
      role: "Marketing Director",
      company: "Bloom Value Corporation",
      image: "/events/h1b-shock-strategic-reset/speakers/glen-mary-george.jpg",
    },
    {
      name: "Kieran Thakky",
      role: "Director Marketing Global",
      company: "Harman",
      image: "/events/h1b-shock-strategic-reset/speakers/kieran-thakky.jpg",
    },
    {
      /* The draft lists no title for Madhav, only "Inpace / X ABB"; carried
         as the line under the name rather than inventing a job title. */
      name: "Madhav Vemuri",
      role: "Inpace, formerly ABB",
      image: "/events/h1b-shock-strategic-reset/speakers/madhav-vemuri.jpg",
    },
    {
      name: "Pamela Kundu",
      role: "Sales Director",
      company: "Celonis",
      image: "/events/h1b-shock-strategic-reset/speakers/pamela-kundu.jpg",
    },
    {
      name: "Prem Kumar",
      role: "VP Sales & Demand Generation",
      company: "NLB Services",
      image: "/events/h1b-shock-strategic-reset/speakers/prem-kumar.png",
    },
    {
      name: "Randeep Singh",
      role: "Head Captive Business",
      company: "Yethi Consulting",
      image: "/events/h1b-shock-strategic-reset/speakers/randeep-singh.jpg",
    },
    {
      name: "Ritesh Kapoor",
      role: "VP Marketing & Comms",
      company: "Accenture",
      image: "/events/h1b-shock-strategic-reset/speakers/ritesh-kapoor.jpg",
    },
    {
      name: "Shivam Gupta",
      role: "Growth Marketing Lead",
      company: "Routematics",
      image: "/events/h1b-shock-strategic-reset/speakers/shivam-gupta.jpeg",
    },
    {
      name: "Shivendra Tripathi",
      role: "Associate Director Performance Marketing",
      company: "Facilio",
      image:
        "/events/h1b-shock-strategic-reset/speakers/shivendra-tripathi.jpg",
    },
    {
      name: "Souvik Mukherjee",
      role: "Marketing & Communications Lead",
      company: "Tietoevry India Private Limited",
      image: "/events/h1b-shock-strategic-reset/speakers/souvik-mukherjee.jpg",
    },
    {
      name: "Tarun Devasia",
      role: "CMO",
      company: "Ramco",
      image: "/events/h1b-shock-strategic-reset/speakers/tarun-devasia.jpg",
    },
    {
      name: "Vinod Kumar",
      role: "SVP Head Marketing",
      company: "247.ai",
      image: "/events/h1b-shock-strategic-reset/speakers/vinod-kumar.jpg",
    },
    {
      name: "Vivek Veeraraghavan",
      role: "Senior VP Digital Transformation APAC",
      company: "Northern Trust",
      image:
        "/events/h1b-shock-strategic-reset/speakers/vivek-veeraraghavan.jpg",
    },
  ],
};
