import { CaseStudy } from "../../types/content";

export const eventRsvpAutomation: CaseStudy = {
  title: "Event RSVP Automation Platform",
  slug: "event-rsvp-automation",
  industry: "Events & Entertainment",
  services: ["Workflow Automation", "Web Platforms & Apps"],
  summary: "An end-to-end event registration and RSVP management platform built using AI-assisted automation workflows, designed to eliminate manual guest tracking.",
  problem: "Event organizers were spending hundreds of hours manually tracking RSVPs via spreadsheets, leading to lost registrations, communication gaps, and chaotic check-in experiences at the venue.",
  approach: "We designed a fully automated pipeline that captures registrations, verifies guest identities, sends dynamic calendar invites, and provides real-time dashboard visibility to organizers without requiring any manual data entry.",
  technology: ["React", "Node.js", "n8n", "PostgreSQL", "WhatsApp API"],
  implementation: "The system was implemented using a robust web frontend for guest registration, backed by n8n automation workflows that instantly process the RSVP, generate QR codes, and dispatch WhatsApp confirmations.",
  results: [
    "Reduced manual administrative work by 95%",
    "Processed over 10,000 automated RSVPs seamlessly",
    "Decreased check-in wait times by 80%"
  ],
  lessonsLearned: "We discovered that integrating WhatsApp directly for confirmations significantly reduced no-show rates compared to email alone. Future iterations will include deeper AI categorization of guest preferences.",
  metaDescription: "Read the case study on how Invonics Technologies built an automated Event RSVP platform to streamline guest management and event check-ins.",
  publishedAt: "2024-01-15"
};

export default eventRsvpAutomation;
