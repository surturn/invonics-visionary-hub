import { CaseStudy, ServicePage, IndustryPage } from "../types/content";

// Import all TypeScript content files eagerly for now.
// For massive sites, import.meta.glob with { eager: false } is better for lazy loading,
// but for static generation/SSR data fetching, eager is perfectly fine and simple.
//
// Blog posts are NOT sourced here — the live /blog routes read from Cosmic CMS
// (src/server/posts.ts). There used to be a parallel src/content/blog/*.ts stub
// feeding an unused getAllBlogPosts() here; it drifted out of sync with Cosmic
// (its own `slug` field didn't even match its filename) and was removed.

const portfolioGlob = import.meta.glob("../content/portfolio/*.ts", { eager: true });
const servicesGlob = import.meta.glob("../content/services/*.ts", { eager: true });
const industriesGlob = import.meta.glob("../content/industries/*.ts", { eager: true });

function extractValues<T>(globResult: Record<string, any>): T[] {
  return Object.values(globResult).map((module: any) => module.default as T);
}

export const getAllPortfolioItems = (): CaseStudy[] => extractValues<CaseStudy>(portfolioGlob);
export const getAllServices = (): ServicePage[] => extractValues<ServicePage>(servicesGlob);
export const getAllIndustries = (): IndustryPage[] => extractValues<IndustryPage>(industriesGlob);

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
