/**
 * Single source of truth for the site's production origin.
 *
 * Every canonical link, Open Graph URL, and JSON-LD `url`/`@id` MUST be built
 * from here (directly or via `absoluteUrl`) so that:
 *   - a domain / staging change is a one-line edit, and
 *   - canonical + structured-data URLs can never drift apart across pages.
 *
 * No trailing slash — `absoluteUrl` adds the leading slash of the path.
 */
export const SITE_URL = "https://invonicstechnologies.com";

/**
 * Build an absolute URL for a site-relative path.
 * @example absoluteUrl("/services/web-platforms-and-apps")
 * @example absoluteUrl("/") // -> "https://invonicstechnologies.com/"
 */
export const absoluteUrl = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
