import { WorkSolution } from "../../types/content";
import accountingHero from "../../assets/work/accounting-hero.jpg";

const solution: WorkSolution = {
  slug: "accounting-finance-system",
  title: "Accounting & Finance System",
  category: "Finance",
  statChip: "KRA-compliant · Turnover Tax",
  summary:
    "Real-time financial visibility for growing operations. Move past fragmented spreadsheets with automated reconciliation, custom reporting, and instant cash flow insights.",
  order: 2,

  demoUrl: "https://accounting.invonicstechnologies.com/",
  demoLabel: "Try the live demo",

  hasCaseStudy: true,
  challenge:
    "Kenyan sole proprietors, freelancers and micro-businesses run their books on spreadsheets or nothing at all. Income and expenses live across M-Pesa messages, receipts and notebooks, there's no clear view of profit or cash position, and KRA Turnover Tax is worked out by hand at the last minute — so returns are late, wrong, or skipped. Hiring an accountant for a one-person business is overkill and out of budget.",
  approach:
    "We built a proper double-entry accounting system sized for micro-businesses. Every income and expense is posted against a chart of accounts and tied to a customer or vendor and an accounting period, so the books stay balanced and auditable. Turnover Tax is calculated automatically, reports are generated on demand, and scheduled jobs handle the things owners forget — emailing filing reminders and locking closed periods — while a full audit trail keeps every change accountable.",
  workflow: [
    "Record income and expenses against a chart of accounts; each entry posts to a balanced double-entry journal.",
    "Tag transactions to a customer or vendor and to the accounting period they belong to.",
    "The system auto-calculates KRA Turnover Tax on qualifying turnover as you go.",
    "Scheduled jobs email Turnover Tax reminders before deadlines and lock periods once they close.",
    "Export P&L, Turnover Tax and cash-flow reports as PDF or CSV whenever you need them.",
  ],
  capabilities: [
    "Double-entry journal built on a structured chart of accounts",
    "Income & expense tracking with customer/vendor (party) records",
    "Automatic KRA Turnover Tax calculation",
    "Profit & Loss, Turnover Tax and cash-flow reports",
    "PDF and CSV export of any report",
    "Period locking that keeps closed books immutable",
    "Automated email reminders for Turnover Tax filing deadlines",
    "Full audit trail on every entry and change",
  ],
  outcomes: [
    "KRA-ready books for a one-person business — no accountant required",
    "Turnover Tax computed automatically, so returns are on time and correct",
    "A live view of income, expenses, profit and cash position at any moment",
    "Closed periods locked and every change audit-logged for trust",
  ],
  technology: [
    "React 18",
    "TypeScript",
    "Vite",
    "TanStack Query",
    "Recharts",
    "Node.js",
    "Express",
    "PostgreSQL",
    "JWT",
    "Zod",
  ],
  screenshots: [
    {
      src: accountingHero,
      caption: "Invonics Accounting — KRA-compliant income, expense and Turnover Tax dashboard.",
    },
  ],

  metaDescription:
    "A KRA-compliant double-entry accounting system for Kenyan sole proprietors and micro-businesses — income and expense tracking, automatic Turnover Tax, P&L and cash-flow reports, and a full audit trail. Try the live demo.",
};

export default solution;
