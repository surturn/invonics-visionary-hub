import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "SEO & Digital Visibility",
  slug: "seo-and-digital-visibility",
  summary:
    "Technical SEO, answer-engine and AI-search work for Kenyan businesses, starting with a free audit of up to 100 pages.",
  description:
    "Search-first content systems and technical SEO that build organic traffic and compound your Google rankings over time. Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
  features: [
    "Custom architecture tailored to your specific needs",
    "Scalable cloud deployment",
    "24/7 localized support and maintenance",
  ],
  benefits: [
    "Increased operational efficiency",
    "Reduced long-term technical debt",
    "Enhanced competitive advantage",
  ],
  metaDescription:
    "SEO, AEO and GEO for Nairobi businesses. A free first audit of up to 100 pages, then fixes, content and reports. No promised rankings.",
  faqs: [
    {
      q: "What are AEO and GEO?",
      a: "AEO is writing and organising content so search engines and voice assistants can give a direct answer from it. GEO is improving the chance that AI tools such as chatbots mention or quote your business. Both are included in every engagement.",
    },
    {
      q: "Is the first audit really free?",
      a: "Yes. The first audit covers up to 100 pages and gives you one report and a walkthrough. A repeat audit is priced in your proposal.",
    },
    {
      q: "Can you guarantee a first-page ranking?",
      a: "No, and we would be wary of anyone who does. Search engines and AI tools change and results vary, so we promise careful work, a recorded baseline and honest reporting.",
    },
    {
      q: "Do I need to give you my passwords?",
      a: "No. We ask for your own login with limited rights for your website, Search Console, analytics and business profiles, never a shared password.",
    },
    {
      q: "Do you buy links or write reviews?",
      a: "Never. We do not buy links, write fake reviews or copy other sites.",
    },
  ],
  page: {
    headline: "SEO, AEO and GEO Services in Nairobi, Kenya",
    seoTitle: "SEO, AEO & GEO Services in Nairobi | Invonics",
    intro:
      "We help your business get found on Google, in direct answers and in AI tools such as chatbots. Every engagement starts with an audit, then fixes, content and reporting. AEO and GEO work is included, not an add-on.",
    suitedFor: [
      "Businesses with a website that customers are not finding",
      "Shops and service firms that want to show up on Google Maps",
      "Teams that want to be mentioned when people ask AI tools about their market",
      "Owners planning a redesign who do not want to lose the search traffic they already have",
    ],
    offerings: [
      {
        name: "SEO audit",
        body: "A check that lists what is wrong and what to fix. Your first audit is free: up to 100 pages, one report and a walkthrough.",
      },
      {
        name: "Technical and on-page fixes",
        body: "Titles, headings, descriptions, internal links, structured data and indexing problems, each recorded in a dated change log.",
      },
      {
        name: "AEO, answer engine optimisation",
        body: "Content written and organised so search engines and voice assistants can give a direct answer from it.",
      },
      {
        name: "GEO, generative engine optimisation",
        body: "Work that improves the chance AI tools mention or quote your business, checked with the same questions each time.",
      },
      {
        name: "Content",
        body: "Original pages and articles in English, checked by a person and approved by you before they are published.",
      },
      {
        name: "Reporting",
        body: "A written report with the numbers. On a monthly retainer you also get a short call to go through it.",
      },
    ],
    process: [
      {
        name: "Free first audit",
        body: "We scan your site and record a baseline: a sample of rankings, visitors from search, which pages Google has indexed, and a sample of AI answers.",
      },
      {
        name: "Prioritised fix list",
        body: "You get a ranked list of what to fix first, in plain language.",
      },
      {
        name: "Fixes and content",
        body: "We make the agreed fixes, write content for your approval, publish, and keep a dated change log of everything we touch.",
      },
      {
        name: "Report",
        body: "We report against the baseline. AI answers are checked with the same questions and tools each time and reported as samples.",
      },
      {
        name: "Keep going or stop",
        body: "Continue on a monthly retainer if it is working for you. There is no obligation after the audit.",
      },
    ],
    deliverables: [
      "The audit report and a walkthrough",
      "The recorded baseline",
      "A prioritised list of fixes",
      "A dated change log",
      "Approved, original content pieces",
      "A written report against the baseline",
    ],
    boundaries: [
      "We do not promise any ranking, number of visitors, mention by an AI tool, or date. Search engines and AI tools change and results vary.",
      "We do not buy links, write fake reviews or copy other sites.",
      "We ask for your own login with limited rights, never a shared password.",
      "Paid ads and social media management are included only if agreed in writing.",
    ],
    related: [
      {
        href: "/blog",
        label: "Field notes on search and AI visibility",
      },
    ],
    intake: {
      title: "Start with the free audit",
      intro:
        "Answer a few questions about your site and we will prepare your first audit. Your first audit is free, up to 100 pages.",
      steps: [
        {
          title: "Your website",
          fields: [
            {
              id: "url",
              label: "Website address",
              type: "text",
              required: true,
            },
            {
              id: "platform",
              label: "What is it built on?",
              type: "select",
              options: ["WordPress", "Shopify", "Wix or Squarespace", "Custom built", "Not sure"],
            },
            {
              id: "pages",
              label: "Roughly how many pages?",
              type: "select",
              options: ["Under 20", "20 to 100", "100 to 500", "Over 500", "Not sure"],
              help: "The free audit covers up to 100 pages.",
            },
          ],
        },
        {
          title: "What do you want from search?",
          fields: [
            {
              id: "goals",
              label: "Pick everything that applies",
              type: "multi",
              options: [
                "More enquiries or sales",
                "Show up on Google Maps",
                "Be mentioned in AI answers",
                "Fix technical problems",
                "Content that ranks for key topics",
              ],
              required: true,
            },
            {
              id: "searches",
              label: "Which searches do you want customers to find you with?",
              type: "textarea",
              help: "A few phrases, for example 'accountant in Nairobi'.",
            },
          ],
        },
        {
          title: "Local presence",
          fields: [
            {
              id: "gbp",
              label: "Do you have a Google Business Profile?",
              type: "radio",
              options: ["Yes", "No", "Not sure"],
            },
            {
              id: "area",
              label: "Where are your customers?",
              type: "radio",
              options: ["One location", "Several locations", "Online only"],
            },
          ],
        },
        {
          title: "Access and plans",
          blurb: "We ask for your own limited login, never a shared password.",
          fields: [
            {
              id: "access",
              label: "What could you give us access to?",
              type: "multi",
              options: [
                "Google Search Console",
                "Google Analytics",
                "Google Business Profile",
                "Website admin",
              ],
            },
            {
              id: "redesign",
              label: "Are you planning a redesign or moving the site?",
              type: "radio",
              options: ["Yes", "No", "Not sure"],
              help: "Tell us first, because a redesign can undo SEO work.",
            },
            {
              id: "extras",
              label: "Anything beyond SEO?",
              type: "multi",
              options: ["Paid ads", "Social media management", "Neither"],
            },
          ],
        },
      ],
    },
  },
};

export default service;
