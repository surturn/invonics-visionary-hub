import fs from "fs";
import path from "path";

const services = {
  "web-platforms-and-apps.ts": {
    title: "Web Development Company in Nairobi, Kenya | Invonics Technologies",
    metaDescription:
      "Invonics Technologies builds custom websites, web apps and client portals for businesses and schools in Nairobi, Kenya. Mobile-first, SEO-ready, M-Pesa integrated.",
  },
  "workflow-automation.ts": {
    title: "AI Workflow Automation Services in Nairobi, Kenya | Invonics Technologies",
    metaDescription:
      "Automate your business operations with AI-powered workflow automation. Invonics Technologies serves SMEs and enterprises across Nairobi and East Africa.",
  },
  "management-systems.ts": {
    title: "Business & School Management Systems Kenya | Invonics Technologies",
    metaDescription:
      "Custom ERP, school OS, HR and finance management systems built for Kenyan businesses and institutions. M-Pesa integrated. Real-time dashboards.",
  },
  "system-integrations.ts": {
    title: "M-Pesa API Integration & System Integrations Kenya | Invonics Technologies",
    metaDescription:
      "Connect M-Pesa Daraja API, eTIMS, SaaS tools and data systems into one unified platform. Expert API integration company in Nairobi, Kenya.",
  },
  "it-equipment-supply.ts": {
    title: "IT Equipment Supply & Workstations Nairobi, Kenya | Invonics Technologies",
    metaDescription:
      "Curated IT hardware, networking equipment and workstations sourced, configured and delivered for businesses in Nairobi, Kenya.",
  },
  "graphic-design-and-branding.ts": {
    title: "Branding & Graphic Design Agency Nairobi, Kenya | Invonics Technologies",
    metaDescription:
      "Logo design, brand identity systems and graphic design services for businesses in Nairobi. Invonics Technologies — branding built to last.",
  },
  "motion-and-posters.ts": {
    title: "Motion Graphics & Video Production Company Kenya | Invonics Technologies",
    metaDescription:
      "Cinematic motion graphics, explainer videos and campaign posters for Kenyan brands and product launches. Motion design studio in Nairobi.",
  },
  "seo-and-content.ts": {
    title: "SEO Services Nairobi Kenya | Invonics Technologies",
    metaDescription:
      "Technical SEO, keyword strategy and content systems that build organic traffic for Kenyan businesses. SEO company based in Nairobi, Kenya.",
  },
  "event-tech-and-experiences.ts": {
    title: "Event Management Software & RSVP System Kenya | Invonics Technologies",
    metaDescription:
      "Digital RSVP systems, QR invitations, M-Pesa event payments and on-site event tech for corporate and social events across Kenya.",
  },
};

const dir = path.join(process.cwd(), "src/content/services");

for (const [filename, meta] of Object.entries(services)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");

  // Replace title
  content = content.replace(/title:\s*["'].*?["'],/, 'title: "' + meta.title + '",');

  // Replace metaDescription
  content = content.replace(
    /metaDescription:\s*["'].*?["']/,
    'metaDescription: "' + meta.metaDescription + '"',
  );

  fs.writeFileSync(filePath, content);
  console.log("Updated " + filename);
}
