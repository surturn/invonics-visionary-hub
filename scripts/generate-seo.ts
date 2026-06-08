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

  // 1. Generate sitemap.xml
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://invonicstechnologies.com/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://invonicstechnologies.com/about</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/services</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/portfolio</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://invonicstechnologies.com/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://invonicstechnologies.com/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

  services.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/services/${slug}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
  });
  portfolio.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/portfolio/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  });
  blogs.forEach((slug) => {
    sitemap += `  <url><loc>https://invonicstechnologies.com/blog/${slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>\n`;
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
Disallow: /assets/
Allow: /

Sitemap: https://invonicstechnologies.com/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);

  console.log("SEO files generated successfully in /public");
}

generate().catch(console.error);
