/**
 * Experts view: the interview library.
 *
 * Each interview belongs to a research project (the report it was conducted
 * for) and gets its own page at
 * /resources/experts-view/[project]/[person]. Transcripts are transcribed
 * from the live WordPress articles under researchnxt.com/guide-to-ai/, with
 * em dashes normalised to the house punctuation and the source's American
 * spellings brought into line with the rest of the site.
 *
 * One module per interview, since a full transcript is long; this file is the
 * registry and the lookup helpers.
 */

import { abhishekGupta } from "./implementers-guide-to-ai/abhishek-gupta";
import { akshayMatkar } from "./implementers-guide-to-ai/akshay-matkar";
import { avnishAnand } from "./implementers-guide-to-ai/avnish-anand";
import { diptarupChakraborti } from "./implementers-guide-to-ai/diptarup-chakraborti";
import { gauravSuri } from "./implementers-guide-to-ai/gaurav-suri";
import { hansveenKaur } from "./implementers-guide-to-ai/hansveen-kaur";
import { karthikAnantharaman } from "./implementers-guide-to-ai/karthik-anantharaman";
import { madhavVemuri } from "./implementers-guide-to-ai/madhav-vemuri";
import { manishKumar } from "./implementers-guide-to-ai/manish-kumar";
import { meeraIyer } from "./implementers-guide-to-ai/meera-iyer";
import { nimishThaker } from "./implementers-guide-to-ai/nimish-thaker";
import { prasadPimple } from "./implementers-guide-to-ai/prasad-pimple";
import { sanjivKumarJain } from "./implementers-guide-to-ai/sanjiv-kumar-jain";
import { shwethaIyer } from "./implementers-guide-to-ai/shwetha-iyer";
import { sumanTewary } from "./implementers-guide-to-ai/suman-tewary";
import { varunKaushik } from "./implementers-guide-to-ai/varun-kaushik";
import { abhishekFodikar } from "./automation-campaign-management/abhishek-fodikar";
import { amiteshBaranwal } from "./automation-campaign-management/amitesh-baranwal";
import { anandMohan } from "./automation-campaign-management/anand-mohan";
import { anjuSingh } from "./automation-campaign-management/anju-singh";
import { jyotiKhichar } from "./automation-campaign-management/jyoti-khichar";
import { lijoMathew } from "./automation-campaign-management/lijo-mathew";
import { meghaAgarwal } from "./automation-campaign-management/megha-agarwal";
import { nareshKumar } from "./automation-campaign-management/naresh-kumar";
import { ojasKulkarni } from "./automation-campaign-management/ojas-kulkarni";
import { prasadPimple as prasadPimpleKotak } from "./automation-campaign-management/prasad-pimple";
import { praveenKumar } from "./automation-campaign-management/praveen-kumar";
import { rahulPoojari } from "./automation-campaign-management/rahul-poojari";
import { ridhiMalhotra } from "./automation-campaign-management/ridhi-malhotra";
import { rohitLadsaria } from "./automation-campaign-management/rohit-ladsaria";
import { rohitSrivastav } from "./automation-campaign-management/rohit-srivastav";
import { sunilBarsaiyan } from "./automation-campaign-management/sunil-barsaiyan";
import { varunKaushik as varunKaushikPolicyBoss } from "./automation-campaign-management/varun-kaushik";
import { vinodDangi } from "./automation-campaign-management/vinod-dangi";
import { vipashaSinha } from "./automation-campaign-management/vipasha-sinha";
import { abhrajitDe } from "./cloud-computing-new-normal-beyond/abhrajit-de";
import { arupChoudhury } from "./cloud-computing-new-normal-beyond/arup-choudhury";
import { devangMehta } from "./cloud-computing-new-normal-beyond/devang-mehta";
import { abhishekPatel } from "./navigating-corporate-commute-for-gccs-in-india/abhishek-patel";
import { adityaGupta } from "./navigating-corporate-commute-for-gccs-in-india/aditya-gupta";
import { ashisJain } from "./navigating-corporate-commute-for-gccs-in-india/ashis-jain";
import { garvitaSandhu } from "./navigating-corporate-commute-for-gccs-in-india/garvita-sandhu";
import { protickBasu } from "./navigating-corporate-commute-for-gccs-in-india/protick-basu";
import { aaronFoo } from "./south-east-asia-response-guide/aaron-foo";
import { anilGautam } from "./south-east-asia-response-guide/anil-gautam";
import { johnnyWidodo } from "./south-east-asia-response-guide/johnny-widodo";
import { karunjitKumarDhir } from "./south-east-asia-response-guide/karunjit-kumar-dhir";
import { raviShankar } from "./south-east-asia-response-guide/ravi-shankar";
import { walterDeOude } from "./south-east-asia-response-guide/walter-de-oude";
import { geetanjaliChughKothari } from "./transforming-cx-through-gccs/geetanjali-chugh-kothari";
import { shardaNenwaniGupta } from "./transforming-cx-through-gccs/sharda-nenwani-gupta";
import { vineetDwivedi } from "./transforming-cx-through-gccs/vineet-dwivedi";
import { vivekVeeraraghavan } from "./transforming-cx-through-gccs/vivek-veeraraghavan";
import { abhishekJoshi } from "./ai-led-personalization/abhishek-joshi";
import { akshayMatkar as akshayMatkarCandere } from "./ai-led-personalization/akshay-matkar";
import { avnishAnand as avnishAnandCaratLane } from "./ai-led-personalization/avnish-anand";
import { ayushAgarwal } from "./ai-led-personalization/ayush-agarwal";
import { banwariLalSharma } from "./ai-led-personalization/banwari-lal-sharma";
import { davidRaab } from "./ai-led-personalization/david-raab";
import { divyaDixit } from "./ai-led-personalization/divya-dixit";
import { itiMehrotra } from "./ai-led-personalization/iti-mehrotra";
import { kalpitJain } from "./ai-led-personalization/kalpit-jain";
import { lloydMathias } from "./ai-led-personalization/lloyd-mathias";
import { meeraIyer as meeraIyerMedlife } from "./ai-led-personalization/meera-iyer";
import { rahulMishra } from "./ai-led-personalization/rahul-mishra";
import { raviSanthanam } from "./ai-led-personalization/ravi-santhanam";
import { riteshBhatnagar } from "./ai-led-personalization/ritesh-bhatnagar";
import { riteshGhosal } from "./ai-led-personalization/ritesh-ghosal";
import { rohitSrivastav as rohitSrivastavNetcore } from "./ai-led-personalization/rohit-srivastav";
import { sanjayGupta } from "./ai-led-personalization/sanjay-gupta";
import { scottBrinker } from "./ai-led-personalization/scott-brinker";
import { shwethaIyer as shwethaIyerZee5 } from "./ai-led-personalization/shwetha-iyer";
import { swetaAggarwall } from "./ai-led-personalization/sweta-aggarwall";
import { tvNaarayan } from "./ai-led-personalization/tv-naarayan";
import { ahmedBadr } from "./unlocking-the-power-unified-cx/ahmed-badr";
import { asishChathanath } from "./unlocking-the-power-unified-cx/asish-chathanath";
import { harshilShah } from "./unlocking-the-power-unified-cx/harshil-shah";
import { mohamedRabie } from "./unlocking-the-power-unified-cx/mohamed-rabie";
import { vaishnaviSoundarrajan } from "./unlocking-the-power-unified-cx/vaishnavi-soundarrajan";
import type { ExpertPerspective, ExpertProject } from "./types";

export type {
  ExpertInterview,
  ExpertPerspective,
  ExpertProject,
  InterviewBlock,
  InterviewExchange,
} from "./types";

/**
 * The library's three sections, in the order they appear on the page. An
 * `id` is the value interviews carry; `param` names the section's pagination
 * search param and doubles as its anchor.
 */
export const expertPerspectives: {
  id: ExpertPerspective;
  label: string;
  param: string;
}[] = [
  {
    id: "thought-leader",
    label: "Thought Leader's Perspective",
    param: "thought-leaders",
  },
  { id: "buyer", label: "Buyer's Perspective", param: "buyers" },
  { id: "vendor", label: "Vendor's Perspective", param: "vendors" },
];

export const expertProjects: ExpertProject[] = [
  {
    slug: "implementers-guide-to-ai",
    name: "Implementer's Guide to AI",
    lede: "Sixteen conversations with leaders putting AI to work across finance, retail, manufacturing, insurance and healthcare, conducted for the Implementer's Guide to AI.",
    reportSlug: "implementers-guide-to-ai",
  },
  {
    slug: "automation-campaign-management",
    name: "Automation & Campaign Management",
    lede: "Nineteen conversations on marketing automation, campaign management and personalisation, conducted in partnership with Zoho.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the "[Z IND] Report Download" id themselves.
    reportSlug: "automation-campaign-management",
  },
  {
    slug: "unlocking-the-power-unified-cx",
    name: "Unlocking the Power of Unified CX",
    lede: "Five conversations with technology and customer experience leaders in Qatar and the wider Middle East and Africa region.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the "[Z QA] Report Download" id themselves.
    reportSlug: "unlocking-the-power-unified-cx",
  },
  {
    slug: "transforming-cx-through-gccs",
    name: "Transforming CX through GCCs",
    lede: "Four conversations with leaders building global capability centres in India, conducted for the Leaders Speak whitepaper on transforming customer experience through GCCs.",
    // The eBook landing exists now, so the interviews take their download form
    // from it rather than carrying the id themselves.
    reportSlug: "transforming-cx-through-gccs",
  },
  {
    slug: "navigating-corporate-commute-for-gccs-in-india",
    name: "Navigating Corporate Commute for GCCs in India",
    lede: "Five conversations with the administration, workplace and procurement leaders who run employee transport for global capability centres in India.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the "[RM] Microsite Report Download" id.
    reportSlug: "navigating-corporate-commute-for-gccs-in-india",
  },
  {
    slug: "cloud-computing-new-normal-beyond",
    name: "Cloud Computing in the New Normal & Beyond",
    lede: "Three conversations with CIOs and IT leaders on cloud adoption across Indian manufacturing, from the 2021 research programme.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the 2021 report id themselves.
    reportSlug: "cloud-computing-new-normal-beyond",
  },
  {
    slug: "south-east-asia-response-guide",
    name: "Southeast Asia Response Guide",
    lede: "Six conversations with founders and executives across Southeast Asia on rebuilding for the growth phase after the pandemic, from the 2021 research programme.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the 2021 report id themselves.
    reportSlug: "south-east-asia-response-guide",
  },
  {
    slug: "ai-led-personalization",
    name: "AI Led Personalization",
    lede: "Twenty one conversations with marketing leaders, analysts and platform builders on personalisation, from the 2020 AI Led Personalization strategy and trends programme.",
    // The landing exists now, so the interviews take their download form from
    // it rather than carrying the 2020 report id themselves.
    reportSlug: "ai-led-personalization",
  },
];

/**
 * Every published interview, sorted alphabetically by title. The library, each
 * perspective section and the sibling band on an interview page all read from
 * this one list, so they stay in the same order.
 *
 * Some people appear in more than one project, so their modules are namespaced
 * by project folder and aliased here; the routes stay distinct because a person
 * slug is only ever resolved inside its project.
 */
export const expertInterviews = [
  // Implementer's Guide to AI
  abhishekGupta,
  akshayMatkar,
  avnishAnand,
  diptarupChakraborti,
  gauravSuri,
  hansveenKaur,
  karthikAnantharaman,
  madhavVemuri,
  manishKumar,
  meeraIyer,
  nimishThaker,
  prasadPimple,
  sanjivKumarJain,
  shwethaIyer,
  sumanTewary,
  varunKaushik,

  // Automation & Campaign Management
  abhishekFodikar,
  amiteshBaranwal,
  anandMohan,
  anjuSingh,
  jyotiKhichar,
  lijoMathew,
  meghaAgarwal,
  nareshKumar,
  ojasKulkarni,
  prasadPimpleKotak,
  praveenKumar,
  rahulPoojari,
  ridhiMalhotra,
  rohitLadsaria,
  rohitSrivastav,
  sunilBarsaiyan,
  varunKaushikPolicyBoss,
  vinodDangi,
  vipashaSinha,

  // Unlocking the Power of Unified CX
  ahmedBadr,
  asishChathanath,
  harshilShah,
  mohamedRabie,
  vaishnaviSoundarrajan,

  // Transforming CX through GCCs
  geetanjaliChughKothari,
  shardaNenwaniGupta,
  vineetDwivedi,
  vivekVeeraraghavan,

  // Navigating Corporate Commute for GCCs in India
  abhishekPatel,
  adityaGupta,
  ashisJain,
  garvitaSandhu,
  protickBasu,

  // Cloud Computing in the New Normal & Beyond
  abhrajitDe,
  arupChoudhury,
  devangMehta,

  // Southeast Asia Response Guide
  aaronFoo,
  anilGautam,
  johnnyWidodo,
  karunjitKumarDhir,
  raviShankar,
  walterDeOude,

  // AI Led Personalization
  abhishekJoshi,
  akshayMatkarCandere,
  avnishAnandCaratLane,
  ayushAgarwal,
  banwariLalSharma,
  davidRaab,
  divyaDixit,
  itiMehrotra,
  kalpitJain,
  lloydMathias,
  meeraIyerMedlife,
  rahulMishra,
  raviSanthanam,
  riteshBhatnagar,
  riteshGhosal,
  rohitSrivastavNetcore,
  sanjayGupta,
  scottBrinker,
  shwethaIyerZee5,
  swetaAggarwall,
  tvNaarayan,
].sort((a, b) => a.title.localeCompare(b.title, "en"));

export function getExpertProject(slug: string) {
  return expertProjects.find((project) => project.slug === slug);
}

export function getExpertInterview(project: string, person: string) {
  return expertInterviews.find(
    (interview) => interview.project === project && interview.slug === person,
  );
}

/** Interviews belonging to a project, in publication order. */
export function getProjectInterviews(project: string) {
  return expertInterviews.filter((interview) => interview.project === project);
}

/** Interviews in one library section, in publication order. */
export function getPerspectiveInterviews(perspective: ExpertPerspective) {
  return expertInterviews.filter(
    (interview) => interview.perspective === perspective,
  );
}

/** Path to an interview page. */
export function interviewHref(interview: { project: string; slug: string }) {
  return `/resources/experts-view/${interview.project}/${interview.slug}`;
}
