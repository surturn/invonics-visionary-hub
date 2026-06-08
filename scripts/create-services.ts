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
    slug: "web-platforms-and-apps",
    title: "Web Platforms and Apps",
    desc: "Custom web applications and scalable platforms built for modern enterprises in Nairobi, Kenya. We engineer high-performance systems designed to handle complex business logic, seamless user experiences, and significant traffic scaling. From customer portals to dynamic web apps, our solutions empower your business to thrive in the digital economy.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    desc: "Intelligent workflow automation solutions for businesses in Nairobi, Kenya. We connect your existing software stack, automate repetitive manual tasks, and introduce AI-driven data processing. Reduce human error, accelerate operational speed, and let your team focus on high-value strategic work while our systems handle the rest.",
  },
  {
    slug: "management-systems",
    title: "Management Systems",
    desc: "Comprehensive business management systems tailored for schools, SMEs, and institutions in Nairobi, Kenya. Our custom ERP and operational software centralize your data, providing real-time analytics, inventory tracking, HR management, and seamless financial reporting in one unified dashboard.",
  },
  {
    slug: "system-integrations",
    title: "System Integrations",
    desc: "Expert system integrations and API development in Nairobi, Kenya. We eliminate data silos by securely connecting your legacy systems with modern cloud infrastructure. Ensure your CRM, accounting software, and operational tools communicate flawlessly to provide a single source of truth.",
  },
  {
    slug: "starlink-installation",
    title: "Starlink Installation",
    desc: "Professional Starlink satellite internet installation services across Nairobi, Kenya and East Africa. We provide enterprise-grade mounting, secure network routing, and high-speed connectivity solutions for remote offices, schools, and businesses requiring uninterrupted, high-bandwidth internet access.",
  },
  {
    slug: "it-equipment-supply",
    title: "IT Equipment Supply",
    desc: "Reliable IT equipment supply and hardware procurement for corporate environments in Nairobi, Kenya. From high-performance workstations and secure networking gear to specialized peripherals, we source, deliver, and configure the technology infrastructure your organization needs to succeed.",
  },
  {
    slug: "graphic-design-and-branding",
    title: "Graphic Design and Branding",
    desc: "Strategic graphic design and corporate branding services in Nairobi, Kenya. We craft compelling visual identities, modern logos, and cohesive brand guidelines that resonate with your target audience and establish your company as a premium authority in your industry.",
  },
  {
    slug: "motion-and-posters",
    title: "Motion and Posters",
    desc: "High-impact motion graphics and poster design in Nairobi, Kenya. Capture attention with dynamic digital signage, promotional videos, and striking print materials designed to communicate your message effectively across social media, events, and advertising campaigns.",
  },
  {
    slug: "seo-and-content",
    title: "SEO and Content",
    desc: "Data-driven SEO and digital content strategies tailored for businesses in Nairobi, Kenya. We optimize your technical web architecture, write authoritative copy, and implement schema markup to ensure your brand dominates search engine rankings and attracts high-quality organic traffic.",
  },
  {
    slug: "event-tech-and-experiences",
    title: "Event Tech and Experiences",
    desc: "Innovative event technology and digital experiences deployed in Nairobi, Kenya. From automated RSVP systems and QR-code ticketing to interactive displays, we engineer seamless digital touchpoints that elevate corporate events, conferences, and brand activations.",
  }
];

services.forEach(s => {
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
