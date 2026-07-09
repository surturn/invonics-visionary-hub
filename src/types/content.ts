export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  services: string[];
  summary: string;
  problem: string;
  approach: string;
  technology: string[];
  implementation: string;
  results: string[];
  lessonsLearned: string;
  // Metadata & SEO
  metaDescription?: string;
  publishedAt?: string;
}

export interface ServicePage {
  title: string;
  slug: string;
  summary: string;
  description: string;
  features: string[];
  benefits: string[];
  faqs?: { q: string; a: string }[];
  metaDescription?: string;
}

export interface IndustryPage {
  title: string;
  slug: string;
  summary: string;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  metaDescription?: string;
}

/**
 * A solution shown on /work. Card-level fields are always present; the
 * detail fields (challenge → outcomes, screenshots) are optional so a card
 * can either open a full case-study page or link straight to its live demo.
 */
export interface WorkSolution {
  slug: string;
  title: string;
  category: string; // chip shown top-left on the card
  statChip: string; // proof stat rendered on the card image
  summary: string; // one plain-language sentence: what it does + for whom
  order?: number; // manual sort within the grid (lower = first)

  // Live demo (self-serve). When absent, the card falls back to a contact CTA.
  demoUrl?: string;
  demoLabel?: string; // e.g. "Try the live demo"
  demoInProgress?: boolean; // true => show an "app in progress" note instead of a demo link

  // Detail page (optional). Present => a /work/$slug case study is rendered.
  hasCaseStudy?: boolean;
  challenge?: string;
  approach?: string;
  workflow?: string[]; // ordered "how it works" steps
  capabilities?: string[];
  outcomes?: string[];
  technology?: string[];
  screenshots?: { src: string; caption: string }[];

  metaDescription?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string; // Could be markdown or rich HTML depending on parser
  author: string;
  publishedAt: string;
  metaDescription?: string;
}
