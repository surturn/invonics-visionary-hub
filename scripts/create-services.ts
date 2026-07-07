import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, "..", "src", "content", "services");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const services = [
  {
    slug: "custom-software-and-web-platforms",
    title: "Custom Software & Web Platforms",
    desc: "Custom websites, web applications and client portals — production-grade, mobile-first, and built for SEO and longevity. Serving Nairobi and East Africa.",
  },
  {
    slug: "business-management-systems",
    title: "Business Management Systems",
    desc: "Custom ERP, school management, HR and finance dashboards with real-time visibility. M-Pesa integrated. Built for Kenyan businesses and institutions.",
  },
  {
    slug: "ai-and-workflow-automation",
    title: "AI & Workflow Automation",
    desc: "Cut hours of manual work with smart automation — WhatsApp ordering bots, automated invoicing, appointment reminders, and AI-powered customer replies. Designed around M-Pesa and how Kenyan businesses actually operate.",
  },
  {
    slug: "brand-design-and-motion-graphics",
    title: "Brand Design & Motion Graphics",
    desc: "Identity systems, logo design, campaign visuals, explainer videos and motion posters for product launches, brands and events across East Africa.",
  },
  {
    slug: "seo-and-digital-visibility",
    title: "SEO & Digital Visibility",
    desc: "Search-first content systems and technical SEO that build organic traffic and compound your Google rankings over time.",
  },
];

services.forEach((s) => {
  const fileContent = `import { ServicePage } from "../../types/content";

export const service: ServicePage = {
  title: "${s.title}",
  slug: "${s.slug}",
  summary: "${s.desc}",
  description: "${s.desc} Our approach combines deep technical expertise with a thorough understanding of the local East African market.",
  features: [
    "Custom architecture tailored to your specific needs",
    "Scalable cloud deployment",
    "24/7 localized support and maintenance"
  ],
  benefits: [
    "Increased operational efficiency",
    "Reduced long-term technical debt",
    "Enhanced competitive advantage"
  ],
  metaDescription: "${s.title} services by Invonics Technologies in Nairobi, Kenya."
};

export default service;
`;

  fs.writeFileSync(path.join(outDir, `${s.slug}.ts`), fileContent);
});

console.log(`Created ${services.length} service files.`);
