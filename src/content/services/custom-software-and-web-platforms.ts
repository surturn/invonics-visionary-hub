import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "Custom Software & Web Platforms",
  slug: "custom-software-and-web-platforms",
  summary:
    "Custom websites, web applications and client portals — production-grade, mobile-first, and built for SEO and longevity. Serving Nairobi and East Africa.",
  description:
    "Custom websites, web applications and client portals — production-grade, mobile-first, and built for SEO and longevity. Serving Nairobi and East Africa. Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
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
    "Custom websites, web apps and Android and iPhone apps built in Nairobi. M-Pesa payments, a private staging link and a full handover pack.",
  faqs: [
    {
      q: "Do you build both Android and iPhone apps?",
      a: "Yes. Android apps are built as native apps. iPhone apps are built as a cross-platform build, one app that runs on both Android and iPhone, and we confirm that approach with you in writing before work starts.",
    },
    {
      q: "Can my website or app take M-Pesa payments?",
      a: "Yes. We integrate M-Pesa STK Push through Safaricom Daraja. Payments use your own Daraja account, so the money goes straight to your business, and we test everything in Safaricom's sandbox before launch.",
    },
    {
      q: "When will you give me a delivery date?",
      a: "After discovery. We write up what we understood in a Discovery Summary, and we give a delivery date once you have confirmed it in writing. Dates also depend on you supplying content, access and approvals on time.",
    },
    {
      q: "What if I want something that was not in the agreed scope?",
      a: "Send a written change request. We estimate the cost and time, you approve it in writing, and only then does the work start. Nothing is added quietly.",
    },
    {
      q: "Can you keep the site or app running after launch?",
      a: "Yes. Ongoing bug fixes, updates and monitoring are offered as a monthly retainer, agreed with you separately from the build.",
    },
  ],
  page: {
    headline: "Website and Mobile App Development in Nairobi, Kenya",
    seoTitle: "Web & Mobile App Development in Nairobi | Invonics",
    intro:
      "We design, build, test and launch websites, web applications and mobile apps for businesses, schools and institutions in Nairobi and across East Africa. You review real work on a private staging link at every milestone, and you get a complete handover when it launches.",
    suitedFor: [
      "Businesses that need a website or web app that takes orders, bookings or payments",
      "Schools and institutions that need portals, dashboards or records online",
      "Teams that want an Android app, an iPhone app, or both",
      "Owners who want one accountable team from design through launch",
    ],
    offerings: [
      {
        name: "Websites and web applications",
        body: "Responsive sites, client portals, dashboards and custom web apps, checked on phone, tablet and computer before you see them.",
      },
      {
        name: "Android apps",
        body: "Built as native Android apps, so they run smoothly on the phones your customers already use.",
      },
      {
        name: "iPhone apps",
        body: "Delivered as a cross-platform build, one app that runs on both Android and iPhone. We agree this approach with you in writing first.",
      },
      {
        name: "M-Pesa payments",
        body: "M-Pesa STK Push through Safaricom Daraja, running on your own Daraja account and tested in the sandbox before any real money moves.",
      },
      {
        name: "Ongoing care",
        body: "Bug fixes, updates and monitoring after launch, offered as a monthly retainer.",
      },
    ],
    process: [
      {
        name: "Discovery",
        body: "We learn how your business works and write it up as a Discovery Summary. You confirm it in writing, and only then do we give a delivery date.",
      },
      {
        name: "Proposal and scope",
        body: "A written proposal sets out the scope, milestones, timeline and costs. If something is not written down, it is not included.",
      },
      {
        name: "Build, milestone by milestone",
        body: "We show the work on a private staging link. At each milestone you check it against the written acceptance criteria and either accept it or send your feedback.",
      },
      {
        name: "Testing before you see it",
        body: "We check phone, tablet and computer, test forms and payments in the payment service's test mode, keep passwords out of the code, and make sure a backup and a way back to the last working version exist.",
      },
      {
        name: "Launch and handover",
        body: "After you accept the final milestone we launch, then hand over the code access, an admin guide, setup notes, a list of the third-party accounts used, and any known limits.",
      },
    ],
    deliverables: [
      "The finished website, web app or mobile app",
      "Access to the code, with passwords moved to a safe place",
      "Notes on how everything is set up",
      "A guide for whoever runs the admin side",
      "A list of the other companies' accounts the project uses",
      "A written list of any known limits",
    ],
    boundaries: [
      "We do not promise how often a site or app is available, or how quickly it responds.",
      "Your own domain, hosting, payment-provider and store accounts are yours; costs that belong to your business are listed in the proposal and we look for cheaper options first.",
      "Changes outside the agreed scope are quoted and approved in writing before work starts.",
      "New features after launch are quoted separately.",
    ],
    related: [
      { href: "/portfolio/restaurant-management-system", label: "Restaurant Management System" },
      {
        href: "/portfolio/school-asset-inventory-system",
        label: "School Asset & Inventory System",
      },
      { href: "/portfolio/accounting-finance-system", label: "Accounting & Finance System" },
    ],
  },
};

export default service;
