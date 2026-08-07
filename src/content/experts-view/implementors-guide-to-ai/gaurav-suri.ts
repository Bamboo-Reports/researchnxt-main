import type { ExpertInterview } from "../types";

export const gauravSuri: ExpertInterview = {
  slug: "gaurav-suri",
  project: "implementors-guide-to-ai",
  perspective: "buyer",

  metaTitle:
    "AI in Financial Services: Transforming Customer Engagement, Decision-Making, and Operational Efficiency",
  metaDescription:
    "Gaurav Suri, Chief Evangelist at Finlabs India, on the single customer view, AI in fraud and risk, the nine challenges of BFSI adoption, and the metrics that prove ROI.",

  title:
    "Transforming Customer Engagement, Decision-Making, and Operational Efficiency",
  person: {
    name: "Gaurav Suri",
    role: "Chief Evangelist",
    company: "Finlabs India",
  },

  thumbnail: "/experts/gaurav-suri.png",
  thumbnailAlt: "Gaurav Suri, Chief Evangelist at Finlabs India",

  intro: [
    "Delve into the transformative impact of AI on the financial services industry in this captivating interview with Gaurav Suri, Chief Evangelist at Finlabs India Pvt Ltd. Blending deep domain expertise with innovative strategies, Gaurav reveals how AI is revolutionising content personalisation, customer engagement, and operational efficiency. The conversation tackles pressing challenges, including data quality, talent acquisition, regulatory compliance, and scalability, while emphasising the critical role of fostering a culture of continuous learning and collaboration.",
  ],

  highlights: [
    {
      title: "Transformative Role of AI in Financial Services",
      description:
        "AI enhances customer engagement through unified profiles, tailored financial advice, and seamless service delivery. It improves decision-making via fraud detection, risk management, and trend analysis while driving operational efficiency through automation and predictive resource planning.",
    },
    {
      title: "Importance of Data Quality and Privacy",
      description:
        "Building a robust, unified dataset is essential for AI success, requiring integration, deduplication, and standardisation of data. Progressive profiling, transparent consent management, and compliance with data privacy regulations like GDPR and India's Personal Data Protection Bill are critical for maintaining trust and ethical use of data.",
    },
    {
      title: "Addressing AI Implementation Challenges",
      description:
        "Key hurdles include fragmented data, legacy systems, talent shortages, and compliance complexities. These can be mitigated through investments in scalable infrastructure, fostering in-house expertise, collaborating with universities and fintech startups, and implementing bias mitigation strategies in AI models.",
    },
    {
      title: "Measuring Success and ROI for AI Initiatives",
      description:
        "Performance indicators include revenue growth, cost savings, enhanced customer satisfaction, improved retention rates, and operational metrics like error reduction and processing speed. Monitoring risk metrics, such as fraud detection rates and compliance adherence, ensures alignment with business goals.",
    },
    {
      title: "Fostering a Culture of Innovation and Collaboration",
      description:
        "Encouraging cross-functional training, investing in R&D, and fostering external collaborations with universities and fintech firms drive innovation. Strategic alignment of AI initiatives with business goals and clear success metrics ensure impactful and sustainable outcomes.",
    },
  ],

  pullQuote:
    "AI has the potential to revolutionise organisational processes and outcomes, but its implementation demands careful planning, robust governance, and ongoing vigilance to overcome challenges and maximise its benefits.",

  exchanges: [
    {
      question:
        "Could you walk us through your professional journey and current role, and provide an overview of your organisation's focus and operations?",
      answer: [
        "As a Chief Evangelist, my role is to help drive growth for the business and identify new opportunities. The company offers a range of products, with a primary focus on wealth management. These products manage the entire customer lifecycle, encompassing financial planning and transactions, all through a fully enabled, end-to-end, intermediary-directed approach.",
        "In addition, the organisation integrates learning and education into the financial services sales process through an LMS stack, Learn Genie, seamlessly fitting with its product suite. We provide bespoke solutions and services, particularly in wealth management, financial planning, and smaller banking projects. The emphasis lies on leveraging deep domain expertise to build cutting-edge technology and elevate industry standards.",
        "Separately, I actively support a not-for-profit initiative called Caregiver Saathi, which focuses on family caregivers, those looking after family members with chronic illnesses. It aims to create an ecosystem to assist family caregivers in managing long-term, home-based care. I dedicate a significant portion of my time to helping streamline operations and back-end processes for this initiative.",
      ],
    },
    {
      question:
        "In our previous discussion, we explored content marketing strategies and your focus on simplifying complex financial concepts. Since then, how have your strategies evolved, particularly in terms of using technology for content personalisation and customer engagement?",
      answer: [
        "In the early days, learning was integral to the product discovery and sales process. Content served as a guide, helping users understand, engage, and make informed decisions. Over time, our focus shifted to integrating AI and other emerging technologies to enhance customer experiences and operational efficiency.",
        "We have leveraged AI-driven tools like conversational AI, machine learning, predictive analytics, and natural language processing to enhance customer engagement and streamline operations. Robotic process automation has improved processes such as email management, while optical character recognition has optimised computer vision tasks.",
        "A robust data foundation has been key, ensuring we capture relevant signals to understand and predict customer behaviour. This enables us to offer personalised content and experiences tailored to individual needs at scale.",
        "True personalisation involves creating dynamic, evolving experiences, going beyond basic customisation. By linking customer history across touchpoints, we can deliver tailored solutions that meet specific preferences.",
        "Conversational AI plays a pivotal role in virtual assistants and chatbots, supporting tasks such as language assistance, voice-based navigation, sentiment analysis, and guiding users through processes. These tools improve both user engagement and operational efficiency.",
        "AI-powered marketing tools have enhanced campaigns by enabling real-time micro-segmentation, improving lead generation by 10-20%. We also piloted virtual branches using AR and VR, offering users in remote locations immersive experiences to interact with advisors and services. Virtual relationship managers for distribution partners further streamlined interactions and support.",
      ],
    },
    {
      question:
        "How do you see AI transforming the financial services industry, particularly in enhancing customer engagement, improving decision-making, and driving operational efficiency?",
      answer: [
        "Customer engagement in financial services hinges on creating a seamless and personalised experience, and AI plays a pivotal role in enabling this transformation. The journey begins with developing a single customer view, which is critical but challenging due to organisational silos and fragmented data systems. Establishing a unified data foundation allows for more personalised and efficient interactions.",
        "**Customer engagement**",
        {
          list: [
            "**Streamlined service:** AI helps unify touchpoints like WhatsApp, chatbots, contact centres, email, and branch calls into a cohesive system. By linking customer profiles through identifiers like mobile numbers, service interactions become more efficient. For instance, a CRM system integrated with AI eliminates repetitive validation steps, allowing for immediate issue resolution and personalised support.",
            "**Enhanced user experience:** Robo-advisors and AI-powered frameworks enable unbiased, data-driven financial advice. With insights from transaction data, credit card usage, and other customer behaviours, financial institutions can deliver tailored product recommendations and proactive nudges based on life events like address changes, signifying potential financial transitions.",
            "**24x7 support:** Asynchronous DIY help using chatbots and conversational commerce has seen the frequency and number of interactions go up.",
          ],
        },
        "**Decision-making**",
        {
          list: [
            "**Fraud detection:** AI excels at real-time fraud detection by analysing customer behaviour and identifying anomalies. For example, unexpected credit card transactions trigger immediate validation calls, preventing fraudulent activity while maintaining customer trust.",
            "**Risk management:** Advanced analytical models use data from multiple sources to refine credit scoring, evaluate borrower creditworthiness, and identify patterns that may signal risk. These insights enhance the decision-making process for loans and investments.",
            "**Trend analysis:** AI-driven analytics help identify early trends, such as increased mutual fund participation in Tier 2 and Tier 3 cities. These insights inform targeted marketing strategies and product development. Its ability to process vast amounts of data and identify patterns and trends that would otherwise go undetected is of great help.",
          ],
        },
        "**Operational efficiency**",
        {
          list: [
            "**Automation of repetitive tasks:** Robotic process automation and AI simplify data entry, document verification, and transaction processing, enabling employees to focus on outlier cases requiring human intervention.",
            "**Process optimisation:** AI accelerates processes like loan or credit card issuance by validating and scoring applications in real time, reducing turnaround times.",
            "**Resource planning:** Predictive models analyse call centre data to optimise staffing schedules, ensuring adequate resources during peak times while minimising idle time.",
          ],
        },
        "In summary, AI's role in financial services is transformative, driving efficiency, enhancing decision-making, and personalising customer experiences. It allows organisations to anticipate needs, manage risks, and deliver tailored services, fostering stronger customer relationships and operational excellence.",
      ],
    },
    {
      question:
        "How has the quality of customer data available to financial institutions improved, and how are new data privacy norms impacting the development of AI use cases?",
      answer: [
        "Maintaining high-quality data is an ongoing process, akin to nurturing a living organism. It requires daily effort to ensure the data remains accurate, relevant, and actionable. The first step in this process involves integrating data from various touchpoints, transactions, customer interactions, and social media, into a unified dataset. This eliminates silos and creates a cohesive view of the customer. Data cleansing is equally essential, involving deduplication, correcting inaccuracies, and standardising information. For example, mismatched identifiers, such as different last names in joint accounts, often create duplicate records, which need to be resolved systematically. Structuring data into interconnected tables further ensures consistency across platforms. With digitisation becoming more pervasive, especially in financial services, the quality of data has significantly improved over time.",
        "From a privacy, compliance, and security perspective, organisations must adopt a disciplined approach. **Data minimisation is key:** only collect the information necessary for a specific purpose. Progressive profiling, where data is collected incrementally during customer interactions, ensures relevance without overburdening the system. Transparency and **explicit consent** are equally important, with organisations needing to clearly document how data will be used and its benefits for customers. **Access control**, implemented through role-based permissions, limits unnecessary handling of sensitive data. **Compliance** with regulations like GDPR, CCPA, and India's Personal Data Protection Bill is critical and can be supported through regular audits, thorough documentation, and third-party assessments. **Anonymisation and pseudonymisation** should be applied wherever possible to protect personal information, removing or masking personally identifiable information.",
        "Security measures are vital in safeguarding data. Multi-factor authentication, real-time monitoring, and redundancy in backup systems help protect against cyber threats. Fraud detection systems play a crucial role, using advanced monitoring and alert mechanisms to flag suspicious activities. For example, anomalies during a minor-to-major account transition can signal potential fraud, enabling timely intervention.",
        "The increasing reliance on algorithms and AI models introduces new challenges in maintaining integrity and avoiding biases. Ethical hacking and rigorous testing ensure these models are secure and free from manipulation. Bias detection is another essential step: evaluating algorithm outputs to identify and correct any potential biases, such as those related to caste, geography, or other demographic factors.",
        "In a highly sensitive domain like financial services, building robust data systems and maintaining stringent processes is not just about compliance: it is about fostering trust and ensuring operational resilience. By addressing quality, privacy, and security comprehensively, organisations can create a data-driven environment that supports better decision-making and customer engagement.",
      ],
    },
    {
      question:
        "Do you believe organisations should have an ethics committee to oversee the design and use of AI, especially as it is implemented for customer-facing use cases? Is this a critical role, or do you see it as an evolving need?",
      answer: [
        "I believe the Reserve Bank of India's proposed framework for Responsible and Accessible AI is a significant step in this direction. The framework emphasises AI enablement, regulatory approaches, and risk identification while recommending robust governance and compliance structures.",
        "This conversation needs to happen at the board level, given the pervasive integration of AI across virtually all processes. It cannot be left to isolated initiatives or departmental actions. An ethics or oversight committee is crucial, not just to uphold ethical standards but to provide continuous monitoring and ensure fairness in AI applications.",
        "For instance, test cases can quickly identify biases in algorithms, such as approving credit cards or loans based on race, gender, or socioeconomic data. Building fairness-aware models for bias mitigation and conducting regular data audits are essential measures. These findings should be reported to the oversight committee to ensure accountability.",
        "Additionally, adopting frameworks like explainable AI is important. This approach provides clear justifications for AI-driven decisions, helping to build trust and transparency. In these early days, explainable AI is being embraced by leading organisations globally and serves as a vital tool to ensure ethical AI implementation.",
      ],
    },
    {
      question:
        "What are the biggest challenges you have observed when organisations attempt to integrate AI into their business models, especially in the financial services industry?",
      answer: [
        "The starting point for AI adoption poses a significant challenge, particularly in discerning whether AI is a passing fad or a serious strategic imperative. This process requires deep organisational commitment, beginning with identifying use cases and fostering nimble, cross-functional collaboration. Below are the key challenges faced during AI implementation:",
        {
          ordered: true,
          list: [
            "**Data quality and availability:** AI systems depend on high-quality, diverse, and comprehensive data. Fragmented or siloed data leads to inaccurate insights and decisions. Efforts like deduplication, standardisation, and creating unified data structures are essential but resource-intensive.",
            "**Talent and expertise:** While outsourcing AI development during the pilot stage may work, long-term success demands building in-house talent. This investment is critical as AI becomes integral to operations.",
            "**Regulatory compliance:** In heavily regulated sectors like BFSI, non-compliance can result in legal, reputational, and financial penalties. Adapting AI models to new regulations, while ensuring they continue to deliver compliant outcomes, is a complex and ongoing challenge.",
            "**Legacy systems:** Large organisations often struggle to integrate AI with legacy systems. This is costly, time-consuming, and can delay implementation due to competing business priorities.",
            "**Ethical and bias concerns:** Historical data used to train AI models can perpetuate biases, leading to unfair or discriminatory outcomes. For example, models trained on data favouring a specific demographic can fail to generalise across broader populations. Continuous monitoring and balancing algorithms are essential to mitigate these risks.",
            "**Scalability and maintenance:** Scaling AI models while maintaining performance over time requires regular updates, monitoring, and refinement. Without scalability, pilots risk becoming obsolete and ineffective.",
            "**Change management:** Embedding AI disrupts traditional processes and roles, often encountering resistance within organisations. Effective change management requires shifting mindsets, breaking silos, and energising teams through storytelling, senior leadership involvement, and tailored training programmes.",
            "**Security risks:** Increased reliance on technology heightens vulnerability to cyberattacks, data breaches, and model tampering. Robust cybersecurity measures, frequent audits, and employee training are crucial to safeguarding systems and preventing reputational or financial damage.",
            "**Emerging threats:** Sophisticated scams using AI, such as deepfakes, pose new risks. Organisations must proactively train employees and adopt security frameworks to address these evolving threats.",
          ],
        },
        "AI has the potential to revolutionise organisational processes and outcomes, but its implementation demands careful planning, robust governance, and ongoing vigilance to overcome challenges and maximise its benefits. Security, ethics, and change management must be core to any AI strategy to ensure sustainable success.",
      ],
    },
    {
      question:
        "How have you overcome challenges related to workforce readiness, skill availability, and scalability when deploying AI solutions across departments in your organisation?",
      answer: [
        "Initially, during the pilot stage, outsourcing AI projects can be a practical approach to build an understanding of the required skill sets, timeframes, and the rarity of expertise. This phase allows organisations to identify use cases, prioritise them, and assess their potential impact across various functions. As the pilot progresses, it becomes clear what specific skills are needed, paving the way for talent acquisition strategies.",
        "Many large financial institutions address skill gaps by partnering with universities, AI research institutes, and incubation hubs, such as those at IITs. Collaboration with fintech companies or smaller, agile organisations is also a valuable strategy, as it enables knowledge exchange, acquisition of expertise, and faster learning. Some firms even acquire smaller companies to bring in specialised skill sets and foster innovation.",
        "However, overcoming challenges is not solely about acquiring talent. It also involves organisational culture and foundational work. Key efforts include:",
        {
          list: [
            "**Defining risk boundaries:** Clearly outlining acceptable risks and building safeguards, such as bias mitigation mechanisms.",
            "**Investing in infrastructure:** Ensuring robust, AI-compatible systems are in place to support scaling. For example, transitioning to cloud infrastructure can offer flexibility and scalability. In one of my previous organisations, adopting cloud solutions facilitated a seamless shift to remote work during the pandemic, proving the value of forward-thinking infrastructure investments.",
          ],
        },
        "Ultimately, overcoming these hurdles requires a combination of talent acquisition, strategic collaboration, cultural alignment, and foundational technological readiness.",
      ],
    },
    {
      question:
        "After implementing new technologies or AI-driven systems, how do you measure their impact on ROI? What performance indicators do you use to evaluate the success of these initiatives?",
      answer: [
        "There are several metrics to measure the success of AI-driven initiatives, and these can be categorised into different areas based on their focus.",
        "**1. Business performance metrics**",
        {
          list: [
            "**Revenue growth:** Measuring additional revenue generated through personalised marketing campaigns or improved customer interaction points.",
            "**Cost savings:** Tracking reductions in manual labour, faster go-to-market times, and the ability to run multiple campaigns simultaneously, which reduces operational expenses.",
          ],
        },
        "**2. Customer-centric metrics**",
        {
          list: [
            "**Net Promoter Score and customer satisfaction:** Assessing improvements in customer satisfaction and loyalty after deploying conversational AI, chatbots, or virtual agents.",
            "**Customer retention:** Monitoring long-term retention rates to evaluate the impact of improved customer service and engagement.",
            "**Time-to-resolution:** Measuring how quickly customers are reaching their desired outcomes, reflecting higher satisfaction scores.",
          ],
        },
        "**3. Operational efficiency metrics**",
        {
          list: [
            "**Error reduction:** Evaluating decreases in errors within processes, such as document handling or data entry, to reduce rework and streamline operations.",
            "**Automation metrics:** Quantifying the amount of work automated and the time saved as a result.",
            "**Processing time:** Measuring improvements in speed and efficiency for various operational tasks.",
          ],
        },
        "**4. AI-specific metrics**",
        {
          list: [
            "**Model accuracy:** Assessing how effectively the AI makes predictions or classifications.",
            "**Training time:** Tracking the time required to train AI models, especially large language models, to achieve desired accuracy.",
            "**Scalability:** Evaluating the system's ability to handle increasing data and user interactions without a decline in performance.",
          ],
        },
        "**5. Risk metrics**",
        {
          list: [
            "**Compliance rate:** Ensuring adherence to regulatory standards and frameworks.",
            "**Fraud detection rate:** Measuring the system's ability to identify and flag fraudulent activities, which directly impacts cost savings and risk management.",
          ],
        },
        "**6. User engagement metrics**",
        {
          list: [
            "**Query resolution time:** Tracking the time taken to close queries, especially in asynchronous interactions using AI tools.",
            "**Usage rates:** Monitoring the adoption and frequency of use of systems like conversational AI, especially during off-hours, as an indicator of their effectiveness and customer preference.",
          ],
        },
        "These metrics provide a comprehensive framework to evaluate the success of AI initiatives across different dimensions, ensuring both quantitative and qualitative benefits are captured effectively.",
      ],
    },
    {
      question:
        "As we develop this report on AI adoption across industries, what insights or recommendations would you suggest including to help business leaders effectively unlock value through data-driven strategies?",
      answer: [
        "Building a culture of continuous learning and curiosity is essential for leveraging technology effectively, particularly in fields requiring deep specialisation like AI. Here is how organisations can foster such a culture and align it with business objectives:",
        {
          ordered: true,
          list: [
            "**Promote cross-functional training and collaboration:** Reviving the practice of cross-functional training can provide employees with a holistic understanding of the organisation. This approach enables domain experts, business strategists, and data scientists to collaborate effectively, ensuring that AI solutions are practical, impactful, and stable. Cross-functional teams bring diverse perspectives to problem-solving, identifying pain points, and aligning solutions with business goals.",
            "**Encourage a culture of innovation:** Organisations should actively invest in research and development, allocating budgets for experiments and pilot projects. These initiatives allow teams to test and refine ideas within regulatory frameworks, fostering a mindset of exploration and adaptation. A culture of innovation encourages employees to think beyond immediate challenges and explore transformative solutions.",
            "**Invest in foundational data infrastructure:** A robust data infrastructure is critical for any AI initiative. Whether through data lakes or data marts, organisations must prioritise data integration, cleaning, and security. This foundational layer enables the organisation to harness data effectively, driving actionable insights and informed decision-making.",
            "**Align AI initiatives with strategic business goals:** AI use cases should be directly tied to specific business problems with clearly defined success metrics. Establishing measurable outcomes from the outset ensures that AI projects are aligned with organisational objectives and facilitates data-driven decision-making, reducing reliance on subjective judgments.",
          ],
        },
        "By combining continuous learning, strategic alignment, and collaboration, organisations can build a resilient, forward-looking culture that effectively integrates AI to revolutionise business processes and outcomes.",
      ],
    },
  ],
};
