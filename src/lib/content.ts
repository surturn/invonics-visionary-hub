import { CONTENT_TYPES } from "./content-registry";
import { CaseStudy, ServicePage, IndustryPage } from "../types/content";

// Import all TypeScript content files eagerly for now.
// For massive sites, import.meta.glob with { eager: false } is better for lazy loading,
// but for static generation/SSR data fetching, eager is perfectly fine and simple.
//
// Blog posts are NOT sourced here — the live /blog routes read from Cosmic CMS
// (src/server/posts.ts). There used to be a parallel src/content/blog/*.ts stub
// feeding an unused getAllBlogPosts() here; it drifted out of sync with Cosmic
// (its own `slug` field didn't even match its filename) and was removed.

// One glob for every content directory; entries are grouped by the directories
// declared in the content registry (the single owner of dir -> route mapping).
const contentGlob = import.meta.glob("../content/*/*.ts", { eager: true });

function extractValues<T>(contentDir: string): T[] {
  return Object.entries(contentGlob)
    .filter(([file]) => file.startsWith(`../content/${contentDir}/`))
    .map(([, module]) => (module as { default: T }).default);
}

export const getAllPortfolioItems = (): CaseStudy[] =>
  extractValues<CaseStudy>(CONTENT_TYPES.portfolio.contentDir);
export const getAllServices = (): ServicePage[] =>
  extractValues<ServicePage>(CONTENT_TYPES.services.contentDir);
export const getAllIndustries = (): IndustryPage[] =>
  extractValues<IndustryPage>(CONTENT_TYPES.solutions.contentDir);

export const getPortfolioBySlug = (slug: string): CaseStudy | undefined => {
  return getAllPortfolioItems().find((item) => item.slug === slug);
};

export const getServiceBySlug = (slug: string): ServicePage | undefined => {
  return getAllServices().find((item) => item.slug === slug);
};

export const getIndustryBySlug = (slug: string): IndustryPage | undefined => {
  return getAllIndustries().find((item) => item.slug === slug);
};

export const getRelatedPortfolioItems = (
  serviceName: string,
  excludeSlug?: string,
): CaseStudy[] => {
  return getAllPortfolioItems().filter(
    (item) => item.services.includes(serviceName) && item.slug !== excludeSlug,
  );
};
