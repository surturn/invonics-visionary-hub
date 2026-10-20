import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "AI & Workflow Automation",
  slug: "ai-and-workflow-automation",
  summary:
    "Automation for repeated tasks such as WhatsApp ordering, invoicing and reminders, delivered as a one-workflow pilot with a person checking results.",
  description:
    "Cut hours of manual work with smart automation — WhatsApp ordering bots, automated invoicing, appointment reminders, and AI-powered customer replies. Designed around M-Pesa and how Kenyan businesses actually operate. Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
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
    "AI and workflow automation for Nairobi businesses, starting with a one-workflow pilot. A person checks the results first. No invented accuracy figures.",
  faqs: [
    {
      q: "Why start with a pilot?",
      a: "A pilot covers one workflow, so we can measure the starting point, build, test and show a real before and after. It is cheaper and safer than automating everything at once.",
    },
    {
      q: "Will the automation message my customers on its own?",
      a: "Not at first. A person approves each message before it is sent. Automatic sending is allowed only after shadow mode, and only if you ask for it in writing.",
    },
    {
      q: "How accurate will it be?",
      a: "We do not promise an accuracy percentage or an hours-saved figure unless we measured your starting point first. We show you results from testing on your real cases.",
    },
    {
      q: "Where does my data go?",
      a: "Before the build we tell you where your data goes, including which AI model provider sees it, and you confirm you may use your customers' data this way.",
    },
    {
      q: "What if it fails?",
      a: "Every automation has a fallback, usually handing the task to a person, and a kill switch that turns it off immediately. The runbook tells your team what to do.",
    },
  ],
  page: {
    headline: "AI and Workflow Automation in Nairobi, Kenya",
    seoTitle: "AI & Workflow Automation in Nairobi | Invonics",
    intro:
      "We automate one repeated task at a time, starting with a small paid pilot. We measure how the task runs today, build the automation, run it with a person checking, and only then let it run on its own. Nothing goes live without a way to switch it off.",
    suitedFor: [
      "Businesses where people repeat the same task by hand every week",
      "Teams who can tell us how often it happens, how long it takes and what a mistake costs",
      "Owners who can name one person responsible for the process",
      "Clients happy for a person to check the results at first",
    ],
    offerings: [
      {
        name: "One-workflow pilot",
        body: "A fixed-price pilot on a single workflow, with discovery included. It is how we prove the idea works before doing more.",
      },
      {
        name: "Customer messaging workflows",
        body: "Reminders, order handling and replies, for example on WhatsApp. A person approves each message before it is sent.",
      },
      {
        name: "Back-office automation",
        body: "Invoicing, data entry, notifications and approvals that move on their own once something triggers them.",
      },
      {
        name: "Monitoring and handover",
        body: "We watch the automation after launch, then hand over a runbook so your team knows what to do if something fails.",
      },
    ],
    process: [
      {
        name: "Describe the task",
        body: "We write down the task in plain words: what starts it, who does it today, how often, how long it takes, which systems are involved, and what a mistake costs.",
      },
      {
        name: "Record the baseline",
        body: "We record the starting numbers before we build anything, so improvement can be shown instead of claimed.",
      },
      {
        name: "Build in a test setup",
        body: "We build and try it on real cases, with a fallback for when something fails, a kill switch, and prompts that are saved and tested on examples.",
      },
      {
        name: "Shadow mode",
        body: "The automation only suggests and a person does the action, so mistakes are caught before anything reaches a customer.",
      },
      {
        name: "Go live and watch",
        body: "We go live, keep watching, and measure the result against the baseline.",
      },
      {
        name: "Handover",
        body: "You receive the working automation, a runbook, proof from our testing and a handover session.",
      },
    ],
    deliverables: [
      "The working automation",
      "A runbook for when something goes wrong",
      "Proof from our testing",
      "The workflow files and a list of access given",
      "How it is monitored and who to call",
      "A handover session",
    ],
    boundaries: [
      "We never promise an accuracy percentage or an hours-saved figure unless we measured the starting point first.",
      "We do not promise how often an automation is available or how accurate it is.",
      "We do not take work where AI would make final legal, money, health or hiring decisions without a person checking.",
      "Before the build we tell you where your data goes, including which model provider sees it.",
      "Where the work involves personal data, we follow the Kenya Data Protection Act, 2019.",
    ],
    related: [
      {
        href: "/portfolio/school-asset-inventory-system",
        label: "School Asset & Inventory System",
      },
      {
        href: "/portfolio/event-rsvp-automation",
        label: "Event RSVP Automation Platform",
      },
    ],
    proof: [
      {
        name: "AssetFlow Schools assistant",
        body: "Our own product. The assistant answers from the school's records and uses an AI model only as a backup.",
      },
      {
        name: "LuckLotter retention engine",
        body: "Our own product. It uses rules to spot each customer's usual buying pattern, and it is currently in testing.",
      },
    ],
    intake: {
      title: "Describe the task you want automated",
      intro:
        "Our first step is always one workflow. These questions are the same ones we write down before any quote.",
      steps: [
        {
          title: "The task",
          fields: [
            {
              id: "task",
              label: "What is the task, in plain words?",
              type: "textarea",
              required: true,
              help: "For example: 'We type each order from WhatsApp into a spreadsheet.'",
            },
            {
              id: "who",
              label: "Who does it today?",
              type: "text",
            },
          ],
        },
        {
          title: "How often and how costly",
          fields: [
            {
              id: "frequency",
              label: "How many times a week?",
              type: "select",
              options: ["Under 10", "10 to 50", "50 to 200", "Over 200", "Not sure"],
            },
            {
              id: "duration",
              label: "How long does each one take?",
              type: "select",
              options: [
                "Under 5 minutes",
                "5 to 15 minutes",
                "15 to 60 minutes",
                "Over an hour",
                "Not sure",
              ],
            },
            {
              id: "mistake",
              label: "What does a mistake cost you?",
              type: "textarea",
            },
          ],
        },
        {
          title: "Systems and data",
          fields: [
            {
              id: "tools",
              label: "Which tools are involved?",
              type: "multi",
              options: [
                "WhatsApp",
                "Email",
                "M-Pesa",
                "Spreadsheets",
                "Accounting software",
                "A school or business system",
                "Other",
              ],
            },
            {
              id: "data",
              label: "What kind of data is involved?",
              type: "multi",
              options: [
                "Customer names or phone numbers",
                "Payment details",
                "Student records",
                "Staff records",
                "No personal data",
              ],
              help: "We tell you where your data goes, including which model provider sees it, before we build.",
            },
          ],
        },
        {
          title: "Customers and ownership",
          fields: [
            {
              id: "messages",
              label: "Would the automation send messages to your customers?",
              type: "radio",
              options: ["Yes", "No"],
              help: "If yes, a person approves each message at first.",
            },
            {
              id: "owner",
              label: "Who owns this process on your side?",
              type: "text",
            },
          ],
        },
        {
          title: "Success",
          fields: [
            {
              id: "success",
              label: "What would success look like, in numbers?",
              type: "textarea",
              help: "For example: 'Orders entered within 10 minutes, with fewer than 2 errors a week.'",
            },
          ],
        },
      ],
    },
  },
};

export default service;
