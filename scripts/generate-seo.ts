import fs from "fs";
import path from "path";
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
  const portfolio = getSlugsFromDir("portfolio");
  const solutions = getSlugsFromDir("industries");
  const blogPosts = await fetchPublishedBlogPosts();

  const today = new Date().toISOString();

  // 1. Generate sitemap.xml
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://invonicstechnologies.com/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://invonicstechnologies.com/about</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/portfolio</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/contact</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://invonicstechnologies.com/blog</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

  portfolio.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/portfolio/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  });
  blogPosts.forEach((post) => {
    const lastmod = post.published_at ? new Date(post.published_at).toISOString() : today;
    sitemap += `  <url><loc>https://invonicstechnologies.com/blog/${post.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
  });
  solutions.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/solutions/${slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });
  sitemap += `</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

  // 2. Generate llms.txt
  const llms = `# Invonics Technologies
Invonics Technologies is an authority platform and premier engineering studio in Kenya, specializing in custom software, AI automation, web development, and digital infrastructure.

## About
- https://invonicstechnologies.com/about

## Portfolio
${portfolio.map((s) => `- https://invonicstechnologies.com/portfolio/${s}`).join("\n")}

## Contact
- Website: https://invonicstechnologies.com
- Contact Form: https://invonicstechnologies.com/contact
`;

  fs.writeFileSync(path.join(publicDir, "llms.txt"), llms);
  fs.writeFileSync(path.join(publicDir, "llms-full.txt"), llms);

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
