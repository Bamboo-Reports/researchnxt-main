import type { Event } from "../types";

/* The source page's H1 reads "NASSCOM MarTECH Confluence 2019", which is a
   WordPress error: the page title, the URL and every line of the body are
   about the Technology & Leadership Forum. The correct name is used here. */
export const nasscomTechnologyLeadershipForum2019: Event = {
  slug: "nasscom-technology-leadership-forum-2019",
  project: "industry-events",

  metaTitle: "NASSCOM Technology & Leadership Forum 2019",
  metaDescription:
    "#TheNext: Opportunity vs Reality, NASSCOM's flagship three-day forum from 20 to 22 February 2019 at Grand Hyatt, Mumbai. Research NXT joined as Ecosystem Partner.",

  title: "NASSCOM Technology & Leadership Forum 2019",
  lede: "#TheNext: Opportunity vs Reality, Mumbai",
  date: "2019-02-20",
  excerpt:
    "NASSCOM's flagship three-day forum on the business of tech, with more than 1,700 delegates, where Research NXT was an Ecosystem Partner.",

  image: "/events/nasscom-technology-leadership-forum-2019.png",
  imageAlt: "Research NXT at NASSCOM Technology & Leadership Forum 2019",

  body: [
    "Technology is at the heart of businesses today and is reshaping strategy, culture, jobs, policy and everything we do. The business community finally seems to have embraced the technological revolution and has begun adapting to a new era of emerging technologies. These range from artificial intelligence to blockchain and the Internet of Things, amongst others. The adoption rate, however, varies from industry to industry and by the size of the company.",
    "The popularly known NASSCOM India Leadership Forum was re-branded to the NASSCOM Technology & Leadership Forum. The forum brings together technology and leaders to talk not only about tech but about the business of tech. NASSCOM's flagship event was spread across three days, from **20 to 22 February 2019 at Grand Hyatt, Mumbai**.",
    "Research NXT was part of NTLF 2019 as its Ecosystem Partner. The platform brought together global leaders to deliberate on the latest IT trends and opportunities affecting industries across all sectors. Three days of conversations, showcases, networking and connections created an immersive experience for delegates, combining business, technology and leadership. The forum saw more than 1,700 delegates and top leaders from across the world.",
    "To lay emphasis on the theme **#TheNext: Opportunity vs Reality**, the forum took a step back and discussed where things really are in terms of adoption of new technologies, the pace of adoption, the level of disruption and the real impact delivered.",
    "**The key agenda:**",
    {
      list: [
        "**The CEO's technology agenda.** As every company pivots to be a technology and data company, NTLF provided the platform to hear from CEOs on their technology agenda, and why technology is the competitive differentiator.",
        "**The potential-reality debate.** There is a lot of talk on disruptive tech: AI, blockchain, IoT, mixed reality, quantum computing. NTLF took a one, three and five year lens on which technologies are becoming mainstream and which are still at a nascent stage.",
        "**The changing leadership imperative.** New mindsets, new business models and new org structures, to make way for disruptive tech to be at the core of the business.",
        "**India Next.** Each theme at NTLF looked at what it means for India, and how we can solve for India.",
      ],
    },
  ],

  /* The source runs its "Key Speakers" band as four lineup graphics with every
     name, title and company baked into the artwork, which leaves the whole
     line-up unreadable to a screen reader and unsearchable. Read off those
     graphics and set as cards instead, in the order the source groups them:
     evangelists, CEOs, Indian industry leaders, then CXOs.

     The source's "Click to view agenda" link is not carried: it points at
     nasscom.in/ntlf/images/ntlf-agenda.pdf, which now 404s. */
  speakers: [
    {
      name: "Brian David Johnson",
      group: "Evangelists Defining The Next",
      role: "Futurist in Residence",
      company: "Arizona University",
    },
    {
      name: "Vala Afshar",
      group: "Evangelists Defining The Next",
      role: "Chief Digital Evangelist",
      company: "Salesforce",
    },
    {
      name: "Ronald Van Loon",
      group: "Evangelists Defining The Next",
      role: "Director",
      company: "Advertisment",
    },
    {
      name: "Paul Polman",
      group: "CEOs Defining The Next Technology Agenda",
      role: "CEO",
      company: "Unilever",
    },
    {
      name: "Dr Ulrich Spiesshofer",
      group: "CEOs Defining The Next Technology Agenda",
      role: "CEO",
      company: "ABB",
    },
    {
      name: "Shai Weiss",
      group: "CEOs Defining The Next Technology Agenda",
      role: "CEO",
      company: "Virgin Atlantic",
    },
    {
      name: "Uday Kotak",
      group: "Indian Industry Leaders Defining India Next",
      role: "Vice Chairman & MD",
      company: "Kotak Mahindra Bank",
    },
    {
      name: "Samina Vaziralli",
      group: "Indian Industry Leaders Defining India Next",
      role: "Executive Vice-chairman",
      company: "Cipla",
    },
    {
      name: "Nisa Godrej",
      group: "Indian Industry Leaders Defining India Next",
      role: "Chairperson",
      company: "Godrej Consumer Products",
    },
    {
      name: "Karenann Terrell",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "Chief Digital & Technology Officer",
      company: "GSK",
    },
    {
      name: "Paul Daugherty",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "Chief Technology & Innovation Officer",
      company: "Accenture",
    },
    {
      name: "Bryson Koehler",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "CTO",
      company: "Equifax",
    },
    {
      name: "Chandra Dandapani",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "Chief Design & Technology Officer",
      company: "CBRE",
    },
    {
      name: "Bask Iyer",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "CIO",
      company: "VMWare",
    },
    {
      name: "Sebastian Gass",
      group: "CXOs Defining The Next Technologies Of Innovation",
      role: "CIO",
      company: "Chevron",
    },
  ],
};
