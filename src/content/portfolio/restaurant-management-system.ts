import { CaseStudy } from "../../types/content";

export const restaurantManagementSystem: CaseStudy = {
  title: "Restaurant Management System",
  slug: "restaurant-management-system",
  industry: "Hospitality",
  services: ["Management Systems", "System Integrations", "Web Platforms & Apps"],
  summary:
    "A unified restaurant management platform featuring an integrated POS, online ordering, and room booking capabilities, designed to streamline operations for modern hospitality businesses.",
  problem:
    "The client was struggling with fragmented systems: one for POS, another for online delivery, and a separate spreadsheet for booking tables and private rooms. This led to operational bottlenecks and revenue leakage.",
  approach:
    "We architected a single, centralized management ecosystem. By unifying the POS with online orders and table management, staff could operate from a single pane of glass, reducing errors and increasing table turnover.",
  technology: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe API"],
  implementation:
    "The platform is currently in active development. We are rolling out the core POS and menu management first, followed by the online ordering portal, and concluding with the automated room booking engine.",
  results: [
    "Projected 30% increase in order processing speed",
    "Unified dashboard eliminating the need for 3 separate software subscriptions",
    "Real-time inventory sync across digital and physical orders",
  ],
  lessonsLearned:
    "Early beta testing revealed that kitchen staff required ultra-high-contrast interfaces for the ticket display system. We adapted our UI system to be highly visible under harsh kitchen lighting.",
  metaDescription:
    "Discover how Invonics Technologies is building a unified Restaurant Management System integrating POS, online ordering, and room bookings.",
  publishedAt: "2024-03-10",
};

export default restaurantManagementSystem;
