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
