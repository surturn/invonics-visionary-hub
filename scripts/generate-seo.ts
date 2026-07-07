import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Minimal generation script without needing full framework context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Helper to read content files manually since import.meta.glob is Vite-only
function getSlugsFromDir(dirName: string) {
  const dirPath = path.join(rootDir, "src", "content", dirName);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(".ts", ""));
}

async function generate() {
  const services = getSlugsFromDir("services");
  const portfolio = getSlugsFromDir("portfolio");
  const blogs = getSlugsFromDir("blog");
  const solutions = getSlugsFromDir("industries");

  const today = new Date().toISOString();

  // 1. Generate sitemap.xml
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://invonicstechnologies.com/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://invonicstechnologies.com/about</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/services</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/portfolio</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/contact</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://invonicstechnologies.com/blog</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

  services.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/services/${slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
  });
  portfolio.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/portfolio/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  });
  blogs.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
  });
  solutions.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/solutions/${slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });
  sitemap += `</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

  // 2. Generate llms.txt
  const llms = `# Invonics Technologies
Invonics Technologies is an authority platform and premier engineering studio in Kenya, specializing in custom software, AI automation, web development, and digital infrastructure.

## Core Services
${services.map((s) => `- https://invonicstechnologies.com/services/${s}`).join("\n")}

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

  // 4. Generate rss.xml
  let rssItems = "";
  blogs.forEach((fileSlug) => {
    const filePath = path.join(rootDir, "src", "content", "blog", `${fileSlug}.ts`);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, "utf-8");

    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const descMatch = content.match(/summary:\s*["']([^"']+)["']/);
    const dateMatch = content.match(/publishedAt:\s*["']([^"']+)["']/);

    if (titleMatch && slugMatch) {
      const title = titleMatch[1];
      const link = `https://invonicstechnologies.com/blog/${slugMatch[1]}`;
      const description = descMatch ? descMatch[1] : "";
      const pubDate = dateMatch ? new Date(dateMatch[1]).toUTCString() : new Date().toUTCString();

      rssItems += `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${link}</guid>
    </item>`;
    }
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

  console.log("SEO and RSS files generated successfully in /public");
}

generate().catch(console.error);
