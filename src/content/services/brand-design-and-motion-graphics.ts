import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "Brand Design & Motion Graphics",
  slug: "brand-design-and-motion-graphics",
  summary:
    "Identity systems, logo design, campaign visuals, explainer videos and motion posters for product launches, brands and events across East Africa.",
  description:
    "Identity systems, logo design, campaign visuals, explainer videos and motion posters for product launches, brands and events across East Africa. Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
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
    "Logos, brand systems, pitch decks, motion graphics and explainer videos for businesses, launches and events in Nairobi and East Africa.",
  faqs: [
    {
      q: "Do you make animated videos as well as logos?",
      a: "Yes. We make motion graphics, short promotional clips, explainer videos and motion posters alongside logos and brand systems.",
    },
    {
      q: "What files do I get at the end?",
      a: "Final files in the formats you need for print, screens and social media, plus a short guide to your colours and typography where the scope includes a brand system.",
    },
    {
      q: "Can you refresh a brand I already have?",
      a: "Yes. Tell us what you already have, such as a logo file or colours, and we work from there.",
    },
  ],
  page: {
    headline: "Brand Design and Motion Graphics in Nairobi, Kenya",
    seoTitle: "Brand Design & Motion Graphics in Nairobi | Invonics",
    intro:
      "We create logos, brand systems, pitch decks, animated visuals and campaign graphics for businesses, launches and events across East Africa. The aim is a message people understand quickly and remember.",
    suitedFor: [
      "New businesses that need a first identity",
      "Established brands that need a refresh",
      "Teams preparing a launch, pitch or event",
      "Businesses that want short motion pieces for social media or screens",
    ],
    offerings: [
      {
        name: "Visual identity",
        body: "Logo, colour, typography and brand rules, so everything you publish looks like it comes from one business.",
      },
      {
        name: "Pitch decks",
        body: "Decks that put your story and numbers in a clear order.",
      },
      {
        name: "Motion graphics",
        body: "Animated visuals and short promotional clips.",
      },
      {
        name: "Explainer videos",
        body: "Short videos that explain what you do or how a product works.",
      },
      {
        name: "Campaign graphics and motion posters",
        body: "Visuals for launches and events, built to work on screens and in print.",
      },
    ],
    process: [
      {
        name: "Brief",
        body: "We learn what the brand stands for, who it speaks to and where the work will be seen.",
      },
      {
        name: "Direction",
        body: "We propose a look and a tone before drawing the full set.",
      },
      {
        name: "Drafts and review",
        body: "You see drafts and send your comments together in one go, so each round of changes is clear.",
      },
      {
        name: "Final files",
        body: "You receive final files in the formats you need for print, screens and social media.",
      },
    ],
    deliverables: [
      "Final logo files",
      "A short guide to your colours and typography",
      "Campaign graphics or motion files for the platforms you named",
      "Pitch deck files, if included in the scope",
    ],
    boundaries: [
      "We do not promise sales, followers or views. Good design makes the message clearer, it does not guarantee a result.",
      "Fonts, stock images and plug-ins made by other people keep their own licences.",
      "Work outside the agreed scope is quoted and approved in writing before it starts.",
    ],
    related: [],
    intake: {
      title: "Tell us about your brand project",
      intro: "A few questions so our first reply is about your project, not a generic price list.",
      steps: [
        {
          title: "What do you need?",
          fields: [
            {
              id: "need",
              label: "Pick everything that applies",
              type: "multi",
              options: [
                "Logo",
                "Full brand system",
                "Pitch deck",
                "Explainer video",
                "Motion poster",
                "Campaign graphics",
              ],
              required: true,
            },
            {
              id: "stage",
              label: "Where is the brand today?",
              type: "radio",
              options: ["New brand", "Refreshing an existing brand"],
              required: true,
            },
            {
              id: "current",
              label: "What do you already have?",
              type: "text",
              help: "For example: a logo file, colours, or nothing yet.",
              showIf: {
                field: "stage",
                equals: "Refreshing an existing brand",
              },
            },
          ],
        },
        {
          title: "Video details",
          blurb: "You picked a video, so a few extra questions.",
          fields: [
            {
              id: "length",
              label: "How long should it be?",
              type: "select",
              options: ["Under 30 seconds", "30 to 60 seconds", "1 to 2 minutes", "Not sure"],
              showIf: {
                field: "need",
                includes: "Explainer video",
              },
            },
            {
              id: "where",
              label: "Where will it be shown?",
              type: "multi",
              options: ["Instagram", "TikTok", "YouTube", "Event screen", "Website"],
              showIf: {
                field: "need",
                includes: "Explainer video",
              },
            },
          ],
        },
        {
          title: "The feel",
          fields: [
            {
              id: "words",
              label: "Three words for how the brand should feel",
              type: "text",
              required: true,
            },
            {
              id: "likes",
              label: "Brands or work you admire",
              type: "textarea",
              help: "Optional. Links are welcome.",
            },
          ],
        },
        {
          title: "Timing",
          fields: [
            {
              id: "date",
              label: "Is there a launch or event date?",
              type: "text",
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
