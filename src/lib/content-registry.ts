/**
 * Single owner of the content types and how their directories map to URLs.
 *
 * Used by BOTH the rendered routes (src/lib/content.ts) and the SEO generator
 * (scripts/generate-seo.ts), so the sitemap and llms files can never drift from
 * the live routes. Keep this file free of Vite-only APIs: Node imports it directly.
 *
 * To add a content type: create src/content/<contentDir>/, add an entry here,
 * and add its accessors in content.ts.
 */
export const CONTENT_TYPES = {
  portfolio: { contentDir: "portfolio", routePrefix: "/portfolio" },
  services: { contentDir: "services", routePrefix: "/services" },
  // The directory is "industries" but the public URL is /solutions.
  solutions: { contentDir: "industries", routePrefix: "/solutions" },
} as const;

export type ContentTypeKey = keyof typeof CONTENT_TYPES;
