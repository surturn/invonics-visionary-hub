import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "Business Management Systems",
  slug: "business-management-systems",
  summary:
    "Custom ERP, school management, HR and finance dashboards with real-time visibility. M-Pesa integrated. Built for Kenyan businesses and institutions.",
  description:
    "Custom ERP, school management, HR and finance dashboards with real-time visibility. M-Pesa integrated. Built for Kenyan businesses and institutions. Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
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
    "Management systems for Kenyan schools and businesses: roles, approvals, dashboards, alerts and M-Pesa. Built in Nairobi with a clear handover.",
  faqs: [
    {
      q: "Can the system take M-Pesa payments?",
      a: "Yes. We integrate M-Pesa through Safaricom Daraja, running on your own Daraja account.",
    },
    {
      q: "Can different staff see different things?",
      a: "Yes. Access is role-based, so each person only sees and does what their role allows.",
    },
    {
      q: "Can you replace the spreadsheets we use now?",
      a: "Usually yes. We start by learning how you work today, then propose a system that fits it, and confirm the scope with you in writing.",
    },
    {
      q: "Do you offer a demo?",
      a: "Some of our case studies have live demos. Check the related work on this page, or ask us.",
    },
  ],
  page: {
    headline: "Business Management Systems for Kenyan Businesses and Schools",
    seoTitle: "Business Management Systems in Nairobi | Invonics",
    intro:
      "We turn paper and spreadsheet operations into secure systems with roles, records, approvals, reports and alerts, so owners and managers can see what is happening. Systems can take M-Pesa payments and are built around how Kenyan organisations work.",
    suitedFor: [
      "Schools that track assets, fees and records by hand",
      "Shops and restaurants that need stock, sales and staff in one place",
      "Small businesses that need books that meet Kenyan tax rules",
      "Managers who want reports without waiting for someone to compile them",
    ],
    offerings: [
      {
        name: "Role-based access",
        body: "Each person sees and does only what their role allows.",
      },
      {
        name: "Records and approvals",
        body: "Requests, loans, orders and approvals recorded with an audit trail.",
      },
      {
        name: "Dashboards and reports",
        body: "Reports and dashboards that show what is happening, built from your own data.",
      },
      {
        name: "Alerts",
        body: "Notifications when something needs attention, such as an overdue item or low stock.",
      },
      {
        name: "M-Pesa payments",
        body: "M-Pesa through Safaricom Daraja, on your own account.",
      },
    ],
    process: [
      {
        name: "Discovery",
        body: "We learn how your business works and write it up as a Discovery Summary. You confirm it in writing before we give a delivery date.",
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
        body: "We check phone, tablet and computer, keep passwords out of the code, and make sure a backup and a way back to the last working version exist.",
      },
      {
        name: "Launch and handover",
        body: "After you accept the final milestone we launch, then hand over code access, an admin guide, setup notes, a list of the third-party accounts used, and any known limits.",
      },
    ],
    deliverables: [
      "The working system",
      "Access to the code, with passwords moved to a safe place",
      "An admin guide for the people who run it",
      "Notes on how everything is set up",
      "A list of the other companies' accounts it uses",
      "A written list of any known limits",
    ],
    boundaries: [
      "We do not promise how often a system is available or how quickly it responds.",
      "Costs that belong to your business, such as hosting and subscriptions, are listed in the proposal and we look for cheaper options first.",
      "Changes outside the agreed scope are quoted and approved in writing before work starts.",
    ],
    related: [
      {
        href: "/portfolio/school-asset-inventory-system",
        label: "School Asset & Inventory System",
      },
      {
        href: "/portfolio/accounting-finance-system",
        label: "Accounting & Finance System",
      },
      {
        href: "/portfolio/restaurant-management-system",
        label: "Restaurant Management System",
      },
      {
        href: "/solutions/restaurants",
        label: "Restaurant & Hospitality Solutions",
      },
    ],
    intake: {
      title: "Tell us how you run things today",
      intro:
        "These questions let us propose a system that fits your organisation instead of a generic package.",
      steps: [
        {
          title: "Your organisation",
          fields: [
            {
              id: "org",
              label: "What kind of organisation is it?",
              type: "select",
              options: [
                "School",
                "Shop or retail",
                "Restaurant or hospitality",
                "Services business",
                "Other",
              ],
              required: true,
            },
            {
              id: "people",
              label: "How many people would use the system?",
              type: "select",
              options: ["1 to 5", "6 to 20", "21 to 100", "Over 100"],
            },
          ],
        },
        {
          title: "How it works today",
          fields: [
            {
              id: "today",
              label: "How do you keep records now?",
              type: "radio",
              options: ["Paper", "Spreadsheets", "Another software", "A mix"],
              required: true,
            },
            {
              id: "pain",
              label: "What goes wrong most often?",
              type: "textarea",
            },
          ],
        },
        {
          title: "What should it cover?",
          fields: [
            {
              id: "modules",
              label: "Pick everything that applies",
              type: "multi",
              options: [
                "Inventory or assets",
                "Accounting and finance",
                "Staff and HR",
                "Orders and sales",
                "Fees and student records",
                "Reports and dashboards",
                "M-Pesa payments",
              ],
              required: true,
            },
            {
              id: "daraja",
              label: "Do you have your own Safaricom Daraja account?",
              type: "radio",
              options: ["Yes", "No", "Not sure"],
              showIf: {
                field: "modules",
                includes: "M-Pesa payments",
              },
            },
          ],
        },
        {
          title: "Roles and approvals",
          fields: [
            {
              id: "roles",
              label: "Who needs to see or approve what?",
              type: "textarea",
              help: "For example: 'The bursar approves purchases, teachers can only view.'",
            },
          ],
        },
        {
          title: "Timing",
          fields: [
            {
              id: "timeline",
              label: "When would you like to start using it?",
              type: "select",
              options: [
                "As soon as possible",
                "Within 1 to 3 months",
                "Within 3 to 6 months",
                "No fixed date",
              ],
            },
            {
              id: "budget",
              label: "Budget in KES, if you have one in mind",
              type: "text",
              help: "Optional.",
            },
          ],
        },
      ],
    },
  },
};

export default service;
