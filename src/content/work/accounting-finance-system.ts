import { WorkSolution } from "../../types/content";
import accountingHero from "../../assets/work/accounting-hero.jpg";

const solution: WorkSolution = {
  slug: "accounting-finance-system",
  title: "Accounting & Finance System",
  category: "Finance",
  statChip: "KRA-compliant · Turnover Tax",
  summary:
    "Log income, track expenses and auto-calculate KRA Turnover Tax from one dashboard — built for Kenyan sole proprietors and micro-businesses.",
  order: 2,
  demoUrl: "https://accounting.invonicstechnologies.com/",
  demoLabel: "Try the live demo",
  screenshots: [
    {
      src: accountingHero,
      caption: "Invonics Accounting — KRA-compliant income, expense and Turnover Tax dashboard.",
    },
  ],
  metaDescription:
    "A KRA-compliant accounting dashboard that logs income, tracks expenses and auto-calculates Turnover Tax for Kenyan sole proprietors and micro-businesses.",
};

export default solution;
