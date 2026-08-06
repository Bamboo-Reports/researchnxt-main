import type { ExpertInterview } from "../types";

/* The source page has an answer from a different interview spliced into it,
   attributed to "Meera" and about Medlife's customer segments, sitting under a
   question about millennial segmentation. Both the foreign answer and the
   stray question are dropped, the same WordPress fault the 2018 ABM and 2017
   B2C transcripts carry. */
export const rajeshPantina: ExpertInterview = {
  slug: "rajesh-pantina",
  project: "publishers-guide-to-smarter-monetization",
  perspective: "vendor",

  metaTitle: "Doing Mobile Video Right with Rajesh Pantina, InMobi",
  metaDescription:
    "Rajesh Pantina, Head of Marketing for Asia Pacific at InMobi, on why 10 to 15 seconds is the optimum mobile video ad, the rise of vertical and gaming inventory, and how publishers monetise their real estate.",

  title: "Doing Mobile Video Right with Rajesh Pantina, InMobi",
  person: {
    name: "Rajesh Pantina",
    role: "Head of Marketing, Asia Pacific",
    company: "InMobi",
  },

  thumbnail: "/experts/rajesh-pantina.jpg",
  thumbnailAlt: "Rajesh Pantina, Head of Marketing for Asia Pacific at InMobi",

  intro: [
    "Rajesh Pantina, Head of Marketing for the Asia Pacific at InMobi, discusses how InMobi provides not just media buying but also value-added services and deep insights into audience behaviour. We discuss the latest trends in the digital space, including the importance of leveraging mobile video, the rise of programmatic, and the growing focus on ad quality and brand safety. He shares his views on the post-pandemic scenario for marketers, and how brands should respond as digital becomes top of mind for advertisers.",
  ],

  highlights: [],

  pullQuote:
    "The biggest learning that we have had is that 10 to 15 seconds is the most optimum duration of video ads that anybody should be creating on mobile.",

  exchanges: [
    {
      question:
        "We would like to start with your journey as a marketer, your current role at InMobi, and what you have experienced from a marketing standpoint in terms of how things have changed over time.",
      answer: [
        "I currently handle marketing for the Asia Pacific at InMobi, and that is the entirety of B2B marketing. I look at the regions of Japan, Korea, India, Southeast Asia and ANZ.",
        "My tryst with marketing started right out of B-school. I am a graduate of the Indian School of Business in Hyderabad, and right out of B-school I joined InMobi. I was initially part of the digital marketing team, working on marketing intelligence, infrastructure and paid marketing.",
        "From there I immediately transitioned into what I really wanted to do, which was product marketing. I used to look at marketing for performance and monetisation solutions, and did that for a good two years across markets including North America, and even China for a while. Then I moved into a regional role in India where I focused on how companies can grow with marketing as a growth lever. After that, I picked up the mantle for Asia Pacific marketing in April last year.",
      ],
    },
    {
      question:
        "Could you give a brief about the InMobi business? You now have Glance, which is a consumer-facing product, so what do you provide to marketers on the B2B side and the B2C side?",
      answer: [
        "InMobi started off about 11 years ago as an in-app advertising platform. What we were trying to do was help advertisers who wanted to showcase their ads to consumers buy quality inventory on apps where consumers are spending time. Today we are InMobi Group, which has three companies.",
        {
          list: [
            "**InMobi Marketing Cloud**, our traditional in-app advertising platform, to which we have added our mobile market research platform, InMobi Pulse. That makes it the most unified marketing cloud for advertisers: people can not just target or deliver ads, but also get insights including the voice of the consumer, and use a lot of second-party data to gather insights about consumers. That completes the cycle of understanding and then offering media for the client.",
            "**Trufactor**, our data business, created after the acquisition of Sprint's Pinsight Media in North America. We are focused largely on North America as a market, providing anonymous data to government bodies, or planning bodies looking at constructing infrastructure, or telecom networks trying to understand how to introduce 5G. So it goes beyond advertising as a use case.",
            "**Glance**, our first B2C offering. It is a LockFeed, a newsfeed on your lock screen, where consumers need not go into any app specifically but can immediately get the latest videos and news, all personalised based on their interests and the engagement they show on the platform day to day.",
          ],
        },
      ],
    },
    {
      question:
        "We recently published a study on content marketing best practices in India, launched at NASSCOM last year. One key observation was the usage of video: video-based content strategies are the most popular that marketers opt for. So how is InMobi helping marketers with video-based content strategy?",
      answer: [
        "Before I go into precisely what InMobi does for video advertisers, let me give a bit of context on the evolution of media advertising. Video has been there for a while and the science of video advertising is well understood, because with the advent of TV, video has been preferred over print and audio and has been attractive to advertisers for a long time.",
        "Video always combines the visual and auditory elements to provide multiple cues to trigger consumer responses. However, what is important to understand is the changing preferences and behaviours when it comes to video on digital media. That has been a big revelation for advertisers, because digital has taken time to become popular, and understanding how video influences and impacts consumers has required a bit of evangelisation.",
        "There have been a few macro factors that have influenced consumer behaviour: 4G adoption and smartphone accessibility, which have made the availability of video that much better. These have played a huge role not just in popularising video, but in bringing a lot of consumers from TV on to the new medium of digital.",
        "The age of information overload has inculcated a behaviour of either discovery or search. People are continuously sifting through the content overload, and there is a resultant decrease in attention spans. Microsoft research had shown a decrease in attention span from 12 seconds to 8 seconds just between 2000 and 2017. So how video content consumption is different on digital is exactly what every advertiser is trying to understand and use to their advantage. Facebook moved from a text or image based feed completely to a video feed and introduced a new video section. Videos mean huge dwell times for advertisers.",
        "What InMobi does is help advertisers leverage mobile video to the fullest, by designing mobile-first creatives. The same commercial used on TV will definitely not work on a mobile platform. The biggest learning that we have had is that **10 to 15 seconds is the most optimum duration of video ads that anybody should be creating on mobile**. We have been actively trying to evangelise this for the past two to three years with our Doing Mobile Video Right campaign.",
        "We started with North America, one of the more advanced ad economies, where we saw adoption kick off in a big fashion. Then we saw that there were other elements to video, including that interactive videos worked really well, where within the video there could be several pauses where people could click. Towards the end of a 10 or 15 second video, and this is very different from what happens on television, there can be end cards. Through end cards, people could play an interactive game or browse a carousel of latest products which on clicking direct people to the web. So there are ways to attach more dynamic interaction with the brand. It becomes imperative for advertisers to start thinking of mobile-first video, and not just as a one-shot commercial transferred to mobile.",
        "Another altered consumption we see in digital is the vertical format video. Snapchat, IGTV and TikTok are the platforms where it is really big. We have seen 99% growth in vertical video adoption among advertisers in the last quarter alone. Advertisers are waking up to the fact that the way the phone is held is vertical. Unless it is for gaming, vertical is the way to go; the majority of the time is spent in the vertical direction. So we have been helping our advertisers build vertical videos, figuring out how they can best transpose their videos and actively use them as vertical video.",
        "When it comes to video advertising, one of the hottest app inventories in the industry is gaming. It has been widely used by mobile app install campaigns, and even more by gaming brands themselves. But with COVID we have been seeing a rise in interest in using gaming inventory for branding campaigns too. Say a shampoo brand wants to see how it can target women on casual games such as Candy Crush, because a lot of casual and hyper-casual games are played by women, a huge target audience for personal care brands.",
        "What we are trying to do is provide these advertisers the right kind of comfort in saying this is brand safe. It is not going to appear against ISIS or COVID-19 or death related videos, so you do not get any wrong associations. At the same time we are helping them use this inventory through more programmatic and automated channels, which puts transparency and control in the hands of the advertisers compared with conventional ad networks.",
      ],
    },
    {
      question:
        "You mentioned how you are helping marketers with vertical video. Is there a video production option with InMobi, or do you give them guidelines on the right size and format of video they need to create as an ad?",
      answer: [
        "Where InMobi is different is the value-added service. If you look at something like Facebook Ads Manager, it gives you a certain template. It asks you to input six or seven images and ends up creating an automated video. While that helps a lot of the smaller advertisers and is very useful for kick-starting campaigns, the big spender needs some hand-holding to bridge the gap between conventional advertising and digital. So what we provide is the value-added service of our creative service teams.",
        "These teams sit with the brands right from the time of the creative brief, to say this is the larger concept and this is how you should think about mobile as a medium, and how you can better engage people or derive ROI from it.",
        "One example is L'Oréal, an award-winning case study we have done. L'Oréal was looking at one of the biggest problem statements: how do you drive consumer engagement at scale? Looking at it from the audience standpoint, we wanted to see how you can reach millions of people and also get them to try something at the same time. We created a video showcasing how Deepika Padukone, its brand ambassador, endorses the product, and immediately after we would have an augmented reality unit within the ad. This AR unit would capture the contours of the consumer's face, and there would be a catalogue of lipsticks at the bottom, so people could try different shades exactly fitted to the contours of their lips. That had phenomenal engagement for L'Oréal. These services are a huge value add, and they really open the eyes of advertisers.",
      ],
    },
    {
      question:
        "As someone at the forefront providing solutions and observing how markets are responding, what sort of AI implementation have you seen in marketing, and what kind of solutions do you have in that space?",
      answer: [
        "If you look at the role of AI, I feel it is to enhance experiences for clients and help them build personalisation at scale. Every marketer is affected by the basic formula: profit equals revenue minus costs. AI, by building a great experience, drives revenue up, and by driving personalisation at scale keeps costs low.",
        "What we have been trying to do especially on the creative front is a few experiments over the last year where we analysed millions of ad events. Because we serve millions of ads daily across the globe, we can put that data to work on the creative itself, to see how AI could provide a guide or recommendations to advertisers on their creative.",
        "What we saw was that there is a highly optimal ratio of creative size to CTA type, which helps people identify the CTAs in the first place and also drives them to click. People ended up uploading the creative onto the platform to get a score. Within the CTA there are a couple of elements: the font size or colour, and the placement. We started giving people different CTAs which apply to different verticals.",
        "Look at the consumer science behind it, which Procter & Gamble has been practising for years. Why do we need to have a Tide in both orange and green packets? A more price-conscious consumer looks at green as more suited to a value-for-money product, whereas orange is slightly premium. We noticed that in the food vertical, orange and red CTAs worked really well and people actively engaged with them. Similarly, in the taxi or transport vertical, in India and every other market except China, black was something people associated very easily with taxis. But in China we saw that yellow was the preferred CTA colour.",
        "Getting these kinds of insights without AI is definitely not possible. AI can summarise a lot of these things beautifully and give you direct action items in a very short span of time. But what has really sealed the role of AI for marketers today, especially in ecommerce or the app vertical, is product recommendation, or dynamic creative optimisation.",
        "If you look at any Amazon ad, it is dynamic, based on whether you are installing the app or are at various stages of the shopping journey. People who visited specific pages or a certain category will see an ad with the catalogue of items in the price range they are searching for. At the same time, if you are someone adding things to a wish list or a cart and then postponing your shopping, dynamic creative optimisation picks up that you are part of a segment very close to finishing their journey, and you can be nudged to take that step now. Dynamic creative optimisation combines both segmentation and creative in a very beautiful fashion to drive maximum impact.",
      ],
    },
    {
      question:
        "Do you have any observations on how marketers are optimising or changing strategies in the current pandemic scenario?",
      answer: [
        "One of the key things we should be working on is enabling advertisers as quickly as possible with insights, given that we sit on data from across the globe. We have been trying to deep dive into second-party data as well as consumer surveys. We need to understand consumer sentiment and app usage trends, so that advertisers can get the messaging right, but also get the distribution right.",
        "A couple of thoughts came from the insights. We feel brands should not stop advertising. Brands should help people in their daily lives, or at least communicate and let customers know what they are doing to ensure business continuity or help the community at large.",
        "When it comes to app usage, we saw it skyrocket for the majority of apps. News, of course, is huge. Gaming has increased in a big fashion, especially in India where it has shot up, because 65% of our population is under 35, so there are a lot of mobile-savvy people. Mobile is their primary screen. There are huge spikes in gaming, but also in OTT, image and video apps, and the new wave of social apps such as TikTok.",
        "We are working with a lot of agencies and advertisers alike to drive purpose-led brand communication, because nobody wants brands to seem insensitive or creepy at these times. There are two categories of brands: those relevant to consumers and those not. Within relevance there are two types. One is the essentials, cooking or food, ready to eat, disinfectants and sanitisers. The second is the relevant but not essential, helping you with productivity, collaboration or daily stress relief, which is video or OTT brands. For the essentials, the biggest thing they should do is drive reassurance, both in terms of business continuity and in making sure consumer safety is important.",
      ],
    },
    {
      question:
        "On the publisher side, how are you enabling publishers for monetisation? Are there similar insights to what you are sharing with your advertisers?",
      answer: [
        "Definitely. At any point in time we are working with both sides of the market. We need good publishers to garner high demand.",
        "With publishers, we help monetise their real estate with the best kind of ad service and the best kind of ad format and relevance. Take the example of gaming: some of our most finicky publishers are gaming publishers. If you look at how gaming app developers work, they know their consumers better than anybody else, because they know exactly when to place a payment gateway and when to place a certain kind of obstacle in the game. They are great at understanding consumer behaviour, and therefore they are really finicky about the kinds of ads and how consumers are shown ads.",
        "It means that InMobi, as a monetisation specialist, should be able to drive significant revenues for our customers, and revenue is a key part of the conversation. Then we can work with them in a more consultative manner and help them understand where it will be a good point to introduce ads, and why a particular ad format would be preferable to another. You need to help publishers derive more value out of users at the end of the day, and over a period of time help them maximise ROI by providing a better medium for all the data and insights on audience.",
        "Very similar to how brand safety is important for advertisers, ad quality is highly important for publishers as well. We use all the technical capability, sellers.json and ads.txt, which enables publishers to ensure that the ad is of quality.",
      ],
    },
    {
      question:
        "From a marketing technology perspective, what are the top three trends that marketers should consider going forward?",
      answer: [
        "One of the biggest issues we are seeing day to day is the meme becoming a reality. The meme asks: what catalysed digital transformation in your company, the CEO, the CFO or the CMO? No, it was COVID-19. Sadly that is the truth today. COVID-19 has brought people to a new reality: if you are not digitally equipped enough, you might not have a chance to be in front of the consumer in the future. So digital transformation has become a huge project for every brand. Every good retail brand is trying to see how it can get an ecommerce setup ready. Website projects are some of the biggest projects happening today.",
        "The other trend is marketing automation, specifically the programmatic ecosystem evolving and growing across several regions. In America today, 80% of advertising is programmatic, led by automation. Even in regions like India and Southeast Asia it is being driven by programmatic. That is what is going to drive a lot of personalisation at scale, and even the big brands focused on traditional mediums are now starting to look at digital as a big trend.",
        "The final trend: while advertisement will remain a mainstay, lock screen marketing is becoming a very subtle and natural way for brands to drive better responses from consumers. That is becoming really huge. In the content marketing space, a subsector of that is the micro-influencer market, with something like TikTok growing huge in the consumer consumption segment.",
      ],
    },
  ],
};
