import type { NextConfig } from "next";

/**
 * Phase A redirect map — every WordPress URL for a core page, plus the pages
 * being retired. Sources are written without a trailing slash: Next normalises
 * `/about-us/` to `/about-us` before matching, so both forms are covered.
 *
 * Content URLs (/blog/…, /experts-view/…, /microsite/…, /case-study/… and the
 * other WP category prefixes) are deliberately NOT here — their targets do not
 * exist until Phase B, and redirecting them now would break working pages.
 */
const redirectMap: { source: string; destination: string }[] = [
  // Core page renames
  { source: "/about-us", destination: "/about" },
  { source: "/career", destination: "/careers" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/policy", destination: "/privacy-policy" },

  // GCC Intelligence now lives entirely on Bamboo Reports.
  { source: "/gcc-insights", destination: "https://bambooreports.com/" },
  {
    source: "/solutions/gcc-intelligence",
    destination: "https://bambooreports.com/",
  },

  // NOTE: the survey and raffle terms routes were pulled for now, so the three
  // legacy WordPress terms URLs have no target and are deliberately absent
  // here. Redirecting them at the privacy policy would send readers to a
  // document that does not answer what they came for. Restore these rules
  // alongside the routes when the terms pages come back.

  // Four near-identical pre-engagement funnels collapse into one contact page
  { source: "/prospect-database-peq", destination: "/contact" },
  { source: "/account-intelligence-peq", destination: "/contact" },
  { source: "/research-based-marketing-peq", destination: "/contact" },
  { source: "/pre-engagement-questionnaire", destination: "/contact" },

  // The five /guide-to-ai/ articles that are now published under Insights.
  // The rest of that prefix is interviews and still has no target, so it stays
  // out of this map; these five are listed one by one rather than as a rule.
  {
    source:
      "/guide-to-ai/ai-is-the-future-and-the-future-is-now-a-preview-of-the-implementors-guide-to-ai",
    destination:
      "/resources/insights/implementers-guide-to-ai/ai-is-the-future-and-the-future-is-now",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-finance-leaders-transition-from-caution-to-customer-centric-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/finance-leaders-transition-from-caution-to-customer-centric-scale",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/manufacturing-automotive-energy-leaders-move-from-pilots-to-scale",
  },
  {
    source:
      "/guide-to-ai/implementers-guide-to-ai-retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
    destination:
      "/resources/insights/implementers-guide-to-ai/retail-consumer-goods-leaders-shift-from-experiments-to-loyalty-led-scale",
  },
  {
    source:
      "/guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
    destination:
      "/resources/insights/implementers-guide-to-ai/the-four-waves-of-ai-a-ready-guide-for-business-leaders",
  },

  // The one /campaign-management/ article published under Insights so far.
  {
    source:
      "/campaign-management/how-marketing-automation-supercharges-your-campaigns",
    destination:
      "/resources/insights/automation-campaign-management/automate-target-win-in-2024",
  },

  // The one /customer-experience/ article published under Insights so far.
  {
    source:
      "/customer-experience/unified-customer-experience-the-next-frontier-for-businesses-in-qatar",
    destination:
      "/resources/insights/unlocking-the-power-unified-cx/unified-customer-experience-the-next-frontier-for-businesses-in-qatar",
  },

  // The one /gcc-commute/ article published under Insights so far.
  {
    source:
      "/gcc-commute/rethinking-the-daily-commute-why-unified-mobility-is-becoming-a-strategic-priority-for-gccs-in-india",
    destination:
      "/resources/insights/navigating-corporate-commute-for-gccs-in-india/rethinking-the-daily-commute",
  },

  // The one /bambooreports/ article published under Insights so far. The rest
  // of that prefix is the GCC CX interviews and the eBook microsite.
  {
    source: "/bambooreports/indian-gccs-digital-cx-outlook-2024",
    destination:
      "/resources/insights/transforming-cx-through-gccs/indian-gccs-digital-cx-outlook-2024",
  },

  // The three 2021 cloud articles published under Insights.
  {
    source:
      "/cloud-computing/top-5-cloud-computing-trends-that-india-needs-to-know",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-computing-trends",
  },
  {
    source: "/cloud-computing/top-5-cloud-adoption-trends-in-2021",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/top-5-cloud-adoption-trends",
  },
  {
    source:
      "/blog/the-new-normal-accelerate-india-inc-s-need-for-cloud-computing-in-2021-beyond",
    destination:
      "/resources/insights/cloud-computing-new-normal-beyond/the-new-normal-cloud-computing",
  },

  // The 2021 Southeast Asia articles and launch event.
  {
    source: "/business-strategy/5-major-business-rebound-strategies",
    destination:
      "/resources/insights/south-east-asia-response-guide/5-major-business-rebound-strategies",
  },
  {
    source:
      "/business-strategy/key-takeaways-from-the-best-of-business-strategies",
    destination:
      "/resources/insights/south-east-asia-response-guide/key-takeaways-business-strategies",
  },
  {
    source: "/events/business-strategy-report-launch-event",
    destination:
      "/resources/events/south-east-asia-response-guide/business-strategy-report-launch",
  },

  {
    source: "/events/ai-led-ebook-launch",
    destination: "/resources/events/ai-led-personalization/ai-led-ebook-launch",
  },

  // The 2019 Content Marketing Done Right programme: the report landing, its
  // five interviews, its seven articles and the NASSCOM MarTech launch event.
  // The articles sat under three different WordPress prefixes, so each is
  // listed one by one rather than as a rule.
  {
    source:
      "/research-report/content-marketing-done-right-trends-and-best-practices-report",
    destination: "/resources/reports-whitepapers/content-marketing-done-right",
  },
  {
    source: "/experts-view/content-marketing-fintech-bankbazaar",
    destination:
      "/resources/experts-view/content-marketing-done-right/ranjit-behera",
  },
  {
    source: "/experts-view/how-to-scale-up-content-marketing",
    destination:
      "/resources/experts-view/content-marketing-done-right/sooraj-divakaran",
  },
  {
    source: "/experts-view/insight-rategain-content-marketing-strategy",
    destination:
      "/resources/experts-view/content-marketing-done-right/apurva-chamaria",
  },
  {
    source:
      "/experts-view/how-to-use-technology-for-an-effective-content-marketing-strategy",
    destination:
      "/resources/experts-view/content-marketing-done-right/amit-kapoor",
  },
  {
    source:
      "/experts-view/content-marketing-at-indias-leading-asset-management-company",
    destination:
      "/resources/experts-view/content-marketing-done-right/gaurav-suri",
  },
  {
    source: "/blog/insights-evolution-content-marketing-india",
    destination:
      "/resources/insights/content-marketing-done-right/evolution-of-content-marketing-in-india",
  },
  {
    source: "/martech/insights-combine-content-marketing-social-media",
    destination:
      "/resources/insights/content-marketing-done-right/combine-your-social-media-and-content-marketing",
  },
  {
    source: "/martech/content-marketing-impacts-seo-strategy",
    destination:
      "/resources/insights/content-marketing-done-right/how-content-marketing-impacts-your-seo-strategy",
  },
  {
    source: "/blog/best-practices-for-your-2019-content-marketing-strategy",
    destination:
      "/resources/insights/content-marketing-done-right/best-practices-for-your-2019-content-marketing-strategy",
  },
  {
    source: "/blog/content-marketing-and-crm",
    destination:
      "/resources/insights/content-marketing-done-right/content-marketing-and-crm-boost-email-campaigns",
  },
  {
    source: "/blog/7-must-have-features-for-content-marketing-system",
    destination:
      "/resources/insights/content-marketing-done-right/7-must-have-features-for-a-content-marketing-system",
  },
  {
    source: "/blog/omni-channel-marketing-strategy",
    destination:
      "/resources/insights/content-marketing-done-right/how-to-implement-a-killer-omni-channel-marketing-strategy",
  },
  {
    source: "/events/content-marketing-report-event-launch",
    destination:
      "/resources/events/content-marketing-done-right/content-marketing-report-launch",
  },

  // The 2019 GCC consumer engagement microsite and the WebEngage case study
  // it links, now the first entry in the Success stories library. The other
  // four /case-study/ pages still have no target, so the prefix is not
  // redirected as a rule.
  {
    source: "/microsite/state-of-consumer-engagement-report-gcc-2019",
    destination:
      "/resources/reports-whitepapers/state-of-consumer-engagement-gcc-2019",
  },
  {
    source: "/case-study/webengage-case-study",
    destination:
      "/resources/success-stories/state-of-consumer-engagement-gcc-2019/webengage",
  },

  // The 2018 ABM programme: the microsite landing, its four interviews, its
  // two blogs and the InsideView case study. The leaf pages sat under three
  // different WordPress prefixes, so each is listed one by one.
  {
    source: "/microsite/abm-best-practices-report-india-2018",
    destination:
      "/resources/reports-whitepapers/abm-best-practices-report-india-2018",
  },
  {
    source: "/case-study/abm-case-study",
    destination:
      "/resources/success-stories/abm-best-practices-report-india-2018/insideview",
  },
  {
    source: "/martech/leveraging-technology-in-account-based-marketing",
    destination:
      "/resources/experts-view/abm-best-practices-report-india-2018/ojas-kulkarni",
  },
  {
    source: "/martech/sushant-shetty-sales-director-epsilon",
    destination:
      "/resources/experts-view/abm-best-practices-report-india-2018/sushant-shetty",
  },
  {
    source: "/interviews/diptarup-chakraborti-vp-marketing-zycus",
    destination:
      "/resources/experts-view/abm-best-practices-report-india-2018/diptarup-chakraborti",
  },
  {
    source: "/martech/satinder-juneja-head-marketing-lntinfotech",
    destination:
      "/resources/experts-view/abm-best-practices-report-india-2018/satinder-juneja",
  },
  {
    source: "/martech/abm-essentials-defining-your-key-target-accounts",
    destination:
      "/resources/insights/abm-best-practices-report-india-2018/steps-to-define-your-key-accounts",
  },
  {
    source: "/blog/how-to-implement-an-effective-abm-strategy",
    destination:
      "/resources/insights/abm-best-practices-report-india-2018/how-to-implement-an-effective-abm-strategy",
  },

  // The 2017 B2C Marketing Automation programme: the report landing, its
  // eighteen interviews, the launch webinar and the Netcore case study.
  // Listed one by one, as every other content prefix is.
  {
    source: "/research-report/b2c-marketing-automation-report-india-2017",
    destination:
      "/resources/reports-whitepapers/b2c-marketing-automation-india-2017",
  },
  {
    source: "/b2c-mas-report-india-2017/b2c-market-automation-case-study",
    destination:
      "/resources/success-stories/b2c-marketing-automation-india-2017/netcore",
  },
  {
    source:
      "/events/webinar-marketing-automation-transform-the-way-you-do-marketing",
    destination:
      "/resources/events/b2c-marketing-automation-india-2017/report-launch-webinar",
  },
  {
    source: "/experts-view/how-marketing-automation-evolved-in-india",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/kalpit-jain",
  },
  {
    source: "/experts-view/prasad-pimple-avp-marketing-hdfc-life",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/prasad-pimple",
  },
  {
    source: "/experts-view/harkirat-singh-md-woodland",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/harkirat-singh",
  },
  {
    source: "/experts-view/what-you-should-know-before-evaluating-mas",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/anil-menghani",
  },
  {
    source: "/experts-view/molly-kapoor-head-marketing-birla-sun-life",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/molly-kapoor",
  },
  {
    source: "/experts-view/binu-george-evp-asianet-cable-services",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/binu-george",
  },
  {
    source:
      "/experts-view/best-practices-on-product-innovation-with-marketing-technology",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/abhishek-gupta",
  },
  {
    source: "/experts-view/amit-shah-president-yesbank",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/amit-shah",
  },
  {
    source: "/experts-view/sachin-sharma-director-it-ops-religare-finvest",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/sachin-sharma",
  },
  {
    source: "/experts-view/veerchand-bothra-cio-netcore-solutions",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/veerchand-bothra",
  },
  {
    source: "/experts-view/meera-iyer-head-of-marketing-bigbasket",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/meera-iyer",
  },
  {
    source:
      "/experts-view/deepak-malhotra-it-business-partner-sales-and-marketing-kellogg",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/deepak-malhotra",
  },
  {
    source: "/experts-view/karun-thareja-cmo-faircent",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/karun-thareja",
  },
  {
    source: "/experts-view/pradeep-dwivedi-ceo-sakal",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/pradeep-dwivedi",
  },
  {
    source: "/experts-view/kamini-rupani-cmo-netcore",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/kamini-rupani",
  },
  {
    source: "/experts-view/varun-kaushik-policyboss",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/varun-kaushik",
  },
  {
    source:
      "/experts-view/dr-karthik-anantharaman-cmo-bpl-medical-technologies",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/karthik-anantharaman",
  },
  {
    source: "/experts-view/pratik-mazumder-cmo-times-internet",
    destination:
      "/resources/experts-view/b2c-marketing-automation-india-2017/pratik-mazumder",
  },

  // The 2020 publisher monetization guide. A standalone landing: the source
  // page links no interviews, articles, event or case study.
  {
    source:
      "/research-report/a-publishers-guide-to-smarter-monetization-ad-revenue-optimization-techniques-2020",
    destination:
      "/resources/reports-whitepapers/publishers-guide-to-smarter-monetization",
  },

  // The 2019 corporate gifting microsite and the 2016 e-tutoring whitepaper.
  // Both are standalone landings: neither source page links interviews,
  // articles, an event or a case study.
  {
    source: "/microsite/corporate-gifting-trends-report-india-2019",
    destination:
      "/resources/reports-whitepapers/corporate-gifting-trends-india-2019",
  },
  {
    source: "/research-report/etutoring-best-practices-whitepaper-2016",
    destination:
      "/resources/reports-whitepapers/etutoring-best-practices-whitepaper-2016",
  },

  // The four interviews that belong to programmes published here but were
  // not linked from their landing pages, found by diffing the WordPress
  // post sitemap against this map.
  {
    source: "/experts-view/experts-view-avlesh-singh-webengage",
    destination:
      "/resources/experts-view/state-of-consumer-engagement-gcc-2019/avlesh-singh",
  },
  {
    source: "/interviews/etutoring_industry_insights",
    destination:
      "/resources/experts-view/etutoring-best-practices-whitepaper-2016/tanmay-chandresa",
  },
  {
    source: "/martech/content-based-marketing-rickard-lawson",
    destination:
      "/resources/experts-view/content-marketing-done-right/rickard-lawson",
  },
  {
    source: "/martech/content-based-marketing-allison-munro-piono-software",
    destination:
      "/resources/experts-view/content-marketing-done-right/allison-munro",
  },

  // The twenty one AI Led Personalization interviews. These were published
  // with the landing but their WordPress URLs were never redirected, so
  // the old links still served from WordPress.
  {
    source: "/experts-view/abhishek-joshi-mxplayer-al-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/abhishek-joshi",
  },
  {
    source: "/experts-view/ai-and-cdp-interview-david-raab",
    destination: "/resources/experts-view/ai-led-personalization/david-raab",
  },
  {
    source: "/experts-view/ai-in-marketing-interview-scott-brinker",
    destination: "/resources/experts-view/ai-led-personalization/scott-brinker",
  },
  {
    source:
      "/experts-view/akshay-matkar-candere-kalayn-jewellers-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/akshay-matkar",
  },
  {
    source: "/experts-view/avnish-anand-caratelane-al-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/avnish-anand",
  },
  {
    source: "/experts-view/ayush-agarwal-seniority-rpg-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/ayush-agarwal",
  },
  {
    source: "/experts-view/banwari-lal-sharma-carwale-ai-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/banwari-lal-sharma",
  },
  {
    source: "/experts-view/divya-dixit-altbalaji-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/divya-dixit",
  },
  {
    source: "/experts-view/iti-mehrotra-5paisa-com-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/iti-mehrotra",
  },
  {
    source: "/experts-view/kalpit-jain-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/kalpit-jain",
  },
  {
    source: "/experts-view/lloyd-mathias-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/lloyd-mathias",
  },
  {
    source: "/experts-view/meera-iyer-medilife-com-al-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/meera-iyer",
  },
  {
    source: "/experts-view/rahul-mishra-shemaroome-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/rahul-mishra",
  },
  {
    source: "/experts-view/ravi-santhanam-cmo-hdfcbank-ai-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/ravi-santhanam",
  },
  {
    source:
      "/experts-view/ritesh-bhatnagar-utopia-mobile-woo-al-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/ritesh-bhatnagar",
  },
  {
    source: "/experts-view/ritesh-goshal-croma-al-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/ritesh-ghosal",
  },
  {
    source: "/experts-view/rohit-srivastav-netcore-ai-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/rohit-srivastav",
  },
  {
    source: "/experts-view/sanjay-gupta-uber-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/sanjay-gupta",
  },
  {
    source: "/experts-view/shwetha-iyer-zee5-al-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/shwetha-iyer",
  },
  {
    source: "/experts-view/sweta-aggarwall-sbi-al-led-personalization",
    destination:
      "/resources/experts-view/ai-led-personalization/sweta-aggarwall",
  },
  {
    source: "/experts-view/tv-naarayan-paypal-ai-led-personalization",
    destination: "/resources/experts-view/ai-led-personalization/tv-naarayan",
  },

  // The three conference participations in the WordPress events listing.
  // They belong to no research programme, so they sit under /industry-events/.
  {
    source: "/events/hysea-bizsummit-2020",
    destination: "/resources/events/industry-events/hysea-bizsummit-2020",
  },
  {
    source: "/events/nasscom-martech-confluence-2017",
    destination:
      "/resources/events/industry-events/nasscom-martech-confluence-2017",
  },
  {
    source: "/events/nasscom-ntlf-thenext",
    destination:
      "/resources/events/industry-events/nasscom-technology-leadership-forum-2019",
  },

  // The last two /case-study/ pages. Zycus is an ongoing prospect data
  // engagement rather than a research programme, so it is filed under the
  // solution it belongs to.
  {
    source: "/case-study/netcore-case-study",
    destination: "/resources/success-stories/ai-led-personalization/netcore",
  },
  {
    source: "/case-study/zycus-prospect-database-case-study",
    destination: "/resources/success-stories/prospect-database/zycus",
  },

  // The one article on researchnxt.com/insights/ that was not yet published.
  {
    source:
      "/blog/artificial-intelligence-what-can-business-professionals-expect-in-2020",
    destination:
      "/resources/insights/ai-led-personalization/artificial-intelligence-what-can-business-professionals-expect-in-2020",
  },

  // The 58 interviews published before the redirect habit was established.
  // Each WordPress URL was matched to its interview by finding the person
  // named on the source page, since many of these slugs are topic-based.
  {
    source:
      "/bambooreports/geetanjali-chugh-kothari-thoughts-on-digital-customer-experience",
    destination:
      "/resources/experts-view/transforming-cx-through-gccs/geetanjali-chugh-kothari",
  },
  {
    source:
      "/bambooreports/sharda-nenwani-gupta-thoughts-on-digital-customer-experience",
    destination:
      "/resources/experts-view/transforming-cx-through-gccs/sharda-nenwani-gupta",
  },
  {
    source: "/bambooreports/transforming-cx-through-gcc-ebook",
    destination: "/resources/reports-whitepapers/transforming-cx-through-gccs",
  },
  {
    source:
      "/bambooreports/vineet-dwivedi-thoughts-on-digital-customer-experience",
    destination:
      "/resources/experts-view/transforming-cx-through-gccs/vineet-dwivedi",
  },
  {
    source:
      "/bambooreports/vivek-veeraraghavan-thoughts-on-digital-customer-experience",
    destination:
      "/resources/experts-view/transforming-cx-through-gccs/vivek-veeraraghavan",
  },
  {
    source: "/business-strategy/digital-first-approach",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/johnny-widodo",
  },
  {
    source: "/business-strategy/focus-on-the-last-mile-delivery",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/anil-gautam",
  },
  {
    source: "/business-strategy/increase-in-ancillary-revenues",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/ravi-shankar",
  },
  {
    source: "/business-strategy/redesigning-supply-chain",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/aaron-foo",
  },
  {
    source: "/business-strategy/remote-virtual-work-force",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/karunjit-kumar-dhir",
  },
  {
    source: "/business-strategy/rise-of-self-service-platforms",
    destination:
      "/resources/experts-view/south-east-asia-response-guide/walter-de-oude",
  },
  {
    source:
      "/campaign-management/balancing-creativity-and-automation-insights-into-effective-marketing-strategies-and-trends",
    destination:
      "/resources/experts-view/automation-campaign-management/abhishek-fodikar",
  },
  {
    source: "/campaign-management/campaign-management-and-automation-in-2024",
    destination:
      "/resources/experts-view/automation-campaign-management/naresh-kumar",
  },
  {
    source:
      "/campaign-management/cracking-the-code-of-demand-generation-with-hackerranks-senior-manager",
    destination:
      "/resources/experts-view/automation-campaign-management/ridhi-malhotra",
  },
  {
    source:
      "/campaign-management/crafting-authentic-digital-strategies-in-higher-education-insights-from-ashoka-universitys-marketing-leader",
    destination:
      "/resources/experts-view/automation-campaign-management/anju-singh",
  },
  {
    source:
      "/campaign-management/digital-transformation-in-higher-education-automation-campaign-performance-and-student-engagement-insights",
    destination:
      "/resources/experts-view/automation-campaign-management/praveen-kumar",
  },
  {
    source:
      "/campaign-management/driving-b2b-marketing-with-data-automation-and-thought-leadership",
    destination:
      "/resources/experts-view/automation-campaign-management/ojas-kulkarni",
  },
  {
    source:
      "/campaign-management/from-traditional-marketing-to-automation-navigating-digital-strategies-in-the-financial-sector",
    destination:
      "/resources/experts-view/automation-campaign-management/anand-mohan",
  },
  {
    source:
      "/campaign-management/how-accurate-attribution-of-channels-is-crucial-for-determining-campaign-budgets-and-effectively-reaching-customers",
    destination:
      "/resources/experts-view/automation-campaign-management/rahul-poojari",
  },
  {
    source:
      "/campaign-management/leveraging-automation-transforming-digital-marketing-strategies-in-higher-education",
    destination:
      "/resources/experts-view/automation-campaign-management/sunil-barsaiyan",
  },
  {
    source:
      "/campaign-management/marketing-automation-is-not-just-a-tool-for-efficiency-but-a-driver-of-business-success",
    destination:
      "/resources/experts-view/automation-campaign-management/naresh-kumar",
  },
  {
    source:
      "/campaign-management/mastering-b2b-digital-campaigns-insights-on-email-marketing-audience-segmentation-and-cross-channel-integration-from-the-indian-express",
    destination:
      "/resources/experts-view/automation-campaign-management/lijo-mathew",
  },
  {
    source:
      "/campaign-management/mastering-digital-marketing-integration-strategies-for-consistency-real-time-optimisation-and-personalisation",
    destination:
      "/resources/experts-view/automation-campaign-management/amitesh-baranwal",
  },
  {
    source:
      "/campaign-management/mastering-e-commerce-strategies-for-personalisation-automation-and-customer-loyalty-in-a-competitive-landscape",
    destination:
      "/resources/experts-view/automation-campaign-management/megha-agarwal",
  },
  {
    source:
      "/campaign-management/navigating-saas-marketing-strategies-for-differentiation-and-data-driven-success",
    destination:
      "/resources/experts-view/automation-campaign-management/rohit-srivastav",
  },
  {
    source:
      "/campaign-management/optimising-crm-and-marketing-automation-for-effective-lead-generation-and-engagement",
    destination:
      "/resources/experts-view/automation-campaign-management/rohit-ladsaria",
  },
  {
    source:
      "/campaign-management/patient-acquisition-and-engagement-a-deep-dive-into-digital-marketing-strategies-in-healthcare",
    destination:
      "/resources/experts-view/automation-campaign-management/jyoti-khichar",
  },
  {
    source:
      "/campaign-management/personalisation-beyond-the-basics-how-kotak-life-engages-customers",
    destination:
      "/resources/experts-view/automation-campaign-management/prasad-pimple",
  },
  {
    source:
      "/campaign-management/real-estate-digital-marketing-balancing-ai-personalization-and-customer-trust",
    destination:
      "/resources/experts-view/automation-campaign-management/vinod-dangi",
  },
  {
    source:
      "/campaign-management/revolutionising-insurance-marketing-automation-personalisation-and-data-driven-strategies-at-policyboss",
    destination:
      "/resources/experts-view/automation-campaign-management/varun-kaushik",
  },
  {
    source:
      "/campaign-management/transforming-email-marketing-and-driving-innovation-with-zoho-campaigns-lead-marketer",
    destination:
      "/resources/experts-view/automation-campaign-management/vipasha-sinha",
  },
  {
    source: "/cloud-computing/abhrajit-de-thoughts-on-cloud-computing",
    destination:
      "/resources/experts-view/cloud-computing-new-normal-beyond/abhrajit-de",
  },
  {
    source: "/cloud-computing/arup-choudhury-thoughts-on-cloud-computing",
    destination:
      "/resources/experts-view/cloud-computing-new-normal-beyond/arup-choudhury",
  },
  {
    source: "/cloud-computing/devang-mehta-thoughts-on-cloud-computing",
    destination:
      "/resources/experts-view/cloud-computing-new-normal-beyond/devang-mehta",
  },
  {
    source:
      "/customer-experience/bridging-cultures-and-redefining-customer-experience-across-mea-with-zoho",
    destination:
      "/resources/experts-view/unlocking-the-power-unified-cx/vaishnavi-soundarrajan",
  },
  {
    source:
      "/customer-experience/customer-centric-growth-how-mbk-holding-combines-innovation-and-strategy-to-elevate-cx",
    destination:
      "/resources/experts-view/unlocking-the-power-unified-cx/ahmed-badr",
  },
  {
    source:
      "/customer-experience/empowering-startups-with-unified-cx-insights-from-a-seasoned-innovator-in-the-middle-east",
    destination:
      "/resources/experts-view/unlocking-the-power-unified-cx/mohamed-rabie",
  },
  {
    source:
      "/customer-experience/innovating-retail-it-how-ltc-international-delivers-exceptional-customer-experiences",
    destination:
      "/resources/experts-view/unlocking-the-power-unified-cx/harshil-shah",
  },
  {
    source:
      "/customer-experience/transforming-healthcare-with-technology-insights-from-marble-medical-hospitals-it-manager",
    destination:
      "/resources/experts-view/unlocking-the-power-unified-cx/asish-chathanath",
  },
  {
    source:
      "/gcc-commute/enhancing-transport-governance-through-practical-controls-and-continuous-oversight",
    destination:
      "/resources/experts-view/navigating-corporate-commute-for-gccs-in-india/abhishek-patel",
  },
  {
    source:
      "/gcc-commute/from-operational-support-to-strategic-administration-designing-equitable-and-compliant-transport-frameworks",
    destination:
      "/resources/experts-view/navigating-corporate-commute-for-gccs-in-india/garvita-sandhu",
  },
  {
    source:
      "/gcc-commute/from-process-efficiency-to-strategic-procurement-transforming-vendor-ecosystems-at-vesuvius-india-ltd",
    destination:
      "/resources/experts-view/navigating-corporate-commute-for-gccs-in-india/ashis-jain",
  },
  {
    source:
      "/gcc-commute/from-tactical-support-to-strategic-enabler-how-employee-transport-shapes-gcc-scale-trust-and-performance",
    destination:
      "/resources/experts-view/navigating-corporate-commute-for-gccs-in-india/protick-basu",
  },
  {
    source:
      "/gcc-commute/strengthening-corporate-mobility-through-governance-technology-and-safety-first-operations",
    destination:
      "/resources/experts-view/navigating-corporate-commute-for-gccs-in-india/aditya-gupta",
  },
  {
    source:
      "/guide-to-ai/ai-driven-branding-digital-marketing-insights-from-hansveen-kaur",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/hansveen-kaur",
  },
  {
    source:
      "/guide-to-ai/ai-in-manufacturing-driving-digital-transformation-and-intelligent-operations",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/madhav-vemuri",
  },
  {
    source: "/guide-to-ai/ai-led-transformation-in-automotive-manufacturing",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/sanjiv-kumar-jain",
  },
  {
    source:
      "/guide-to-ai/ais-role-in-engineering-infrastructure-insights-from-manish",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/manish-kumar",
  },
  {
    source: "/guide-to-ai/how-ai-powers-kisshts-customer-centric-approach",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/shwetha-iyer",
  },
  {
    source:
      "/guide-to-ai/how-apollo-hospitals-leverages-ai-to-revolutionise-patient-care-and-international-outreach",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/karthik-anantharaman",
  },
  {
    source:
      "/guide-to-ai/how-carat-lane-is-redefining-customer-experience-in-the-jewellery-industry",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/avnish-anand",
  },
  {
    source:
      "/guide-to-ai/how-edelweiss-life-insurance-is-redefining-industry-standards-through-innovation-and-ai",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/abhishek-gupta",
  },
  {
    source:
      "/guide-to-ai/how-policyboss-is-leveraging-ai-to-redefine-distribution-personalisation-and-customer-experience",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/varun-kaushik",
  },
  {
    source:
      "/guide-to-ai/how-spacewood-leverages-ai-to-redefine-customer-experience",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/nimish-thaker",
  },
  {
    source:
      "/guide-to-ai/insights-on-data-unification-customer-experience-and-ethical-innovation",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/prasad-pimple",
  },
  {
    source:
      "/guide-to-ai/skinqs-ai-powered-vision-and-strategic-marketing-insights",
    destination: "/resources/experts-view/implementers-guide-to-ai/meera-iyer",
  },
  {
    source:
      "/guide-to-ai/transforming-customer-engagement-decision-making-and-operational-efficiency",
    destination: "/resources/experts-view/implementers-guide-to-ai/gaurav-suri",
  },
  {
    source:
      "/guide-to-ai/transforming-insurance-sales-and-distribution-at-allianz-partners",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/suman-tewary",
  },
  {
    source:
      "/guide-to-ai/transforming-retail-with-ai-insights-from-presstos-marketing-evolution",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/akshay-matkar",
  },
  {
    source:
      "/guide-to-ai/transforming-saas-reviving-storytelling-and-redefining-the-future-of-creativity",
    destination:
      "/resources/experts-view/implementers-guide-to-ai/diptarup-chakraborti",
  },

  {
    source: "/experts-view/rajesh-pantina-inmobi",
    destination:
      "/resources/experts-view/publishers-guide-to-smarter-monetization/rajesh-pantina",
  },

  // Elementor scaffolding and an expired 2021 survey — no equivalent content
  { source: "/element-page", destination: "/" },
  { source: "/elementor-41865", destination: "/" },
  { source: "/the-2021-india-cloud-computing-survey", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return redirectMap.map((entry) => ({ ...entry, permanent: true }));
  },
};

export default nextConfig;
