import { CaseStudy } from "../../types/content";
import registryShot from "../../assets/work/school-asset-registry.jpg";

// Merged in from the old (noindexed, orphaned) /work section — see
// docs on the /portfolio & /work merge for context.
export const schoolAssetInventorySystem: CaseStudy = {
  title: "School Asset & Inventory System",
  slug: "school-asset-inventory-system",
  industry: "Education",
  services: ["Business Management Systems", "Custom Software & Web Platforms"],
  category: "School Systems",
  statChip: "Loans · Invoices · Audit trail",
  summary:
    "Stops asset shrinkage before it costs you — a single system that tracks every device, automates depreciation, and holds every borrower accountable.",
  problem:
    "Schools hold a lot of valuable equipment — ICT devices, lab instruments, AV gear — but track it on paper or spreadsheets. Assets go missing, loans are never returned, and when something breaks or disappears there is no record of who had it or when.",
  approach:
    "We built a role-based asset system that gives every school a single source of truth. Assets live in a central registry, staff borrow and return them through a tracked workflow, invoices and reports are generated automatically, and every action is written to an immutable audit trail for accountability.",
  workflow: [
    "Register assets into a central registry, organised by category (ICT, AV, Lab).",
    "Staff request and borrow assets; the system records who holds what and when it is due back.",
    "Overdue and maintenance items are flagged automatically so nothing slips through.",
    "Invoices and reports are generated on demand as PDFs.",
    "Every action is logged to a full audit trail for accountability across roles.",
  ],
  capabilities: [
    "Central asset registry with live status (available, borrowed, maintenance, overdue)",
    "Borrow / return loan tracking with due dates",
    "Automated invoicing and PDF reports",
    "Role-based access for 6 roles (admin, teacher, librarian, staff and more)",
    "Full audit trail on every action",
    "WCAG AA accessible interface",
  ],
  technology: ["Django 5", "Django REST Framework", "PostgreSQL", "React 18", "TypeScript", "Celery", "Redis"],
  results: [
    "A single source of truth for every school asset",
    "Loans and returns tracked end-to-end — no more unaccounted devices",
    "Clear accountability through a complete audit trail",
    "Usable by all staff, including assistive-tech users (WCAG AA)",
  ],
  screenshots: [
    {
      src: registryShot,
      caption: "The AssetFlow Schools asset registry — live status across every tracked device.",
      width: 1000,
      height: 625,
    },
  ],
  demoUrl: "https://assetflow.invonicstechnologies.com/",
  demoLabel: "Try the live demo",
  metaDescription:
    "A role-based school asset and inventory system — loan tracking, automated invoicing and a full audit trail for schools in Kenya and East Africa. Try the live demo.",
};

export default schoolAssetInventorySystem;
