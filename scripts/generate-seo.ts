import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { createBucketClient } from "@cosmicjs/sdk";

// Minimal generation script without needing full framework context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Local .env for dev convenience — CI/production supply these as real env
// vars, so a missing .env here is not an error.
try {
  // @ts-expect-error -- Node 20.6+ global, not in the TS lib we target
  process.loadEnvFile?.(path.join(rootDir, ".env"));
} catch {
  /* no .env file — fine in CI, where the platform injects env vars directly */
}

// Helper to read content files manually since import.meta.glob is Vite-only
function getSlugsFromDir(dirName: string) {
  const dirPath = path.join(rootDir, "src", "content", dirName);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(".ts", ""));
}

// Reads a top-level string field (title, slug, summary, metaDescription) from a
// content file without importing it. The content files import type-only symbols
// without the `type` keyword, which Node's type stripping cannot execute.
function readStringField(source: string, key: string): string {
  const match = source.match(new RegExp(`^\\s*${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m"));
  if (!match) return "";
  try {
    return JSON.parse(`"${match[1]}"`) as string;
  } catch {
    return match[1];
  }
}

type ContentEntry = { slug: string; title: string; summary: string; description: string };

function readContentEntries(dirName: string): ContentEntry[] {
  return getSlugsFromDir(dirName).map((slug) => {
    const source = fs.readFileSync(path.join(rootDir, "src", "content", dirName, `${slug}.ts`), "utf8");
    const summary = readStringField(source, "summary");
    return {
      slug,
      title: readStringField(source, "title") || slug,
      summary,
      description: readStringField(source, "metaDescription") || summary,
    };
  });
}

// lastmod must reflect a real change, not the build time. We use the last git
// commit that touched the page's content file. A shallow clone (common in CI)
// gives every file the same tip-commit date, so there we omit lastmod instead.
function isShallowRepo(): boolean {
  try {
    return (
      execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
        cwd: rootDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() !== "false"
    );
  } catch {
    return true;
  }
}

const shallowRepo = isShallowRepo();

function gitLastModified(relPath: string): string | null {
  if (shallowRepo) return null;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", relPath], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? new Date(out).toISOString() : null;
  } catch {
    return null;
  }
}

function lastmodTag(iso: string | null): string {
  return iso ? `<lastmod>${iso}</lastmod>` : "";
}

type CosmicBlogPost = {
  title: string;
  slug: string;
  published_at: string | null;
  metadata?: { excerpt?: string };
};

// The live /blog and /blog/$slug routes read from Cosmic CMS (src/server/posts.ts),
// NOT from src/content/blog/*.ts. Sitemap/RSS must be built from the same source
// or we submit URLs to Google that don't actually resolve — this previously
// happened (a local stub whose own `slug` field didn't even match its filename).
async function fetchPublishedBlogPosts(): Promise<CosmicBlogPost[]> {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
  const readKey = process.env.COSMIC_READ_KEY;
  if (!bucketSlug || !readKey) {
    console.warn(
      "COSMIC_BUCKET_SLUG / COSMIC_READ_KEY not set — skipping blog URLs in sitemap.xml/rss.xml this run.",
    );
    return [];
  }
  const cosmic = createBucketClient({ bucketSlug, readKey });
  try {
    const { objects } = await cosmic.objects
      .find({ type: "posts" })
      .props(["title", "slug", "published_at", "metadata.excerpt"])
      .limit(1000);
    return objects as CosmicBlogPost[];
  } catch (error) {
    // Cosmic returns a 404-shaped rejection (not an Error) for zero results.
    if (typeof error === "object" && error !== null && (error as { status?: unknown }).status === 404) {
      return [];
    }
    console.error("Failed to fetch blog posts from Cosmic — omitting blog URLs this run.", error);
    return [];
  }
}

async function generate() {
  const portfolioEntries = readContentEntries("portfolio");
  const solutionEntries = readContentEntries("industries");
  const serviceEntries = readContentEntries("services");
  const portfolio = portfolioEntries.map((e) => e.slug);
  const solutions = solutionEntries.map((e) => e.slug);
  const blogPosts = await fetchPublishedBlogPosts();

  // Newest real post date, used as the blog index lastmod. Null when no posts are known.
  const newestPostDate = blogPosts
    .map((post) => (post.published_at ? new Date(post.published_at).getTime() : 0))
    .reduce((max, time) => Math.max(max, time), 0);
  const blogIndexLastmod = newestPostDate ? new Date(newestPostDate).toISOString() : null;

  // 1. Generate sitemap.xml
  // Static pages carry no lastmod: their content lives across many components, so
  // we cannot date them honestly. An omitted lastmod is better than a false one.
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://invonicstechnologies.com/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://invonicstechnologies.com/about</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/portfolio</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://invonicstechnologies.com/blog</loc>${lastmodTag(blogIndexLastmod)}<changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

  portfolio.forEach((slug) => {
    const lastmod = lastmodTag(gitLastModified(`src/content/portfolio/${slug}.ts`));
    sitemap += `  <url><loc>https://invonicstechnologies.com/portfolio/${slug}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  });
  blogPosts.forEach((post) => {
    const lastmod = lastmodTag(post.published_at ? new Date(post.published_at).toISOString() : null);
    sitemap += `  <url><loc>https://invonicstechnologies.com/blog/${post.slug}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
  });
  solutions.forEach((slug) => {
    const lastmod = lastmodTag(gitLastModified(`src/content/industries/${slug}.ts`));
    sitemap += `  <url><loc>https://invonicstechnologies.com/solutions/${slug}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });
  sitemap += `</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

  // 2. Generate llms.txt (short index) and llms-full.txt (index plus fuller summaries).
  // Everything here is read from the site's own content files, so it never describes
  // an offering the site does not already describe.
  const SITE = "https://invonicstechnologies.com";
  const company =
    "Invonics Technologies is a custom software and AI automation company in Nairobi, Kenya. It builds custom software, AI automation, web platforms and brand systems for businesses and schools in Nairobi, Kenya and across East Africa.";

  const link = (label: string, url: string, note?: string) => {
    const cleanNote = note?.replace(/\s+/g, " ").trim();
    return `- [${label}](${url})${cleanNote ? `: ${cleanNote}` : ""}`;
  };
  const section = (title: string, lines: string[]) =>
    lines.length ? `## ${title}\n${lines.join("\n")}` : "";

  const mainPages = [
    link("Home", `${SITE}/`, "Overview of the company, its services and flagship solutions"),
    link("About", `${SITE}/about`, "About Invonics Technologies"),
    link(
      "Portfolio and case studies",
      `${SITE}/portfolio`,
      "Software platforms, automation systems and digital ecosystems built by Invonics Technologies",
    ),
    link(
      "Blog",
      `${SITE}/blog`,
      "Field notes on software architecture, AI automation and building for African businesses",
    ),
    link("Contact", `${SITE}/contact`, "Send an inquiry to the team"),
  ];
  const contactLines = [
    `- Website: ${SITE}`,
    `- Contact form: ${SITE}/contact`,
    "- Location: 259a, Njambi road, Oreteti Heights, Ongata Rongai, Nairobi, Kenya",
    "- Phone: +254 786 669 572",
  ];
  const solutionLinks = solutionEntries.map((e) =>
    link(e.title, `${SITE}/solutions/${e.slug}`, e.description),
  );
  const blogLinks = blogPosts.map((post) =>
    link(post.title, `${SITE}/blog/${post.slug}`, post.metadata?.excerpt),
  );
  const serviceLines = serviceEntries.map((e) => `- ${e.title}: ${e.summary}`);

  const joinSections = (parts: string[]) => parts.filter(Boolean).join("\n\n") + "\n";

  const llms = joinSections([
    `# Invonics Technologies\n\n> ${company}`,
    section("Main pages", mainPages),
    section(
      "Case studies",
      portfolioEntries.map((e) => link(e.title, `${SITE}/portfolio/${e.slug}`, e.description)),
    ),
    section("Solutions", solutionLinks),
    section("Blog posts", blogLinks),
    section("Contact", contactLines),
  ]);

  const llmsFull = joinSections([
    `# Invonics Technologies\n\n> ${company}`,
    section("Main pages", mainPages),
    section(`Services (described on the homepage at ${SITE}/#services)`, serviceLines),
    section(
      "Case studies",
      portfolioEntries.map((e) =>
        link(e.title, `${SITE}/portfolio/${e.slug}`, e.summary || e.description),
      ),
    ),
    section(
      "Solutions",
      solutionEntries.map((e) =>
        link(e.title, `${SITE}/solutions/${e.slug}`, e.summary || e.description),
      ),
    ),
    section("Blog posts", blogLinks),
    section("Contact", contactLines),
  ]);

  fs.writeFileSync(path.join(publicDir, "llms.txt"), llms);
  fs.writeFileSync(path.join(publicDir, "llms-full.txt"), llmsFull);

  // 3. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://invonicstechnologies.com/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);

  // 4. Generate rss.xml — sourced from the same Cosmic posts as the sitemap.
  let rssItems = "";
  blogPosts.forEach((post) => {
    const link = `https://invonicstechnologies.com/blog/${post.slug}`;
    const description = post.metadata?.excerpt ?? "";
    const pubDate = post.published_at
      ? new Date(post.published_at).toUTCString()
      : new Date().toUTCString();

    rssItems += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${link}</guid>
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Invonics Technologies Blog</title>
    <link>https://invonicstechnologies.com/blog</link>
    <description>Invonics Technologies builds vertical operating systems, custom web/app software, e-commerce, and brand design for African SMEs. Engineering Tomorrow, Today.</description>
    <language>en-us</language>
    <image>
      <url>https://invonicstechnologies.com/logo.jpeg</url>
      <title>Invonics Technologies</title>
      <link>https://invonicstechnologies.com</link>
    </image>
    <atom:link href="https://invonicstechnologies.com/rss.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);

  console.log(
    `SEO and RSS files generated successfully in /public (${blogPosts.length} blog post URL(s) from Cosmic)`,
  );
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
