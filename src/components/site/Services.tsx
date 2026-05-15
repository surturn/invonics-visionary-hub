import { useState } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./MotionSystem";
import {
  Satellite,
  Cpu,
  Globe,
  LayoutDashboard,
  Workflow,
  PlugZap,
  Palette,
  Film,
  Search,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  details: string;
  outcomes: string[];
};

const services: Service[] = [
  {
    icon: Satellite,
    title: "Starlink Installation",
    desc: "End-to-end satellite internet deployment, alignment and uptime SLAs for sites of any scale.",
    details:
      "We survey your site, plan the best mounting position, install and align the Starlink kit, configure routers, test speeds, and document the setup so your team has reliable connectivity from day one.",
    outcomes: ["Site survey", "Mounting & alignment", "Wi-Fi/network setup"],
  },
  {
    icon: Cpu,
    title: "IT Equipment & Supply",
    desc: "Curated workstations, networking and peripherals — sourced, configured, delivered and supported.",
    details:
      "We recommend the right hardware for your budget, source trusted equipment, configure devices, deliver them ready to use, and support your team with warranties, replacements, and setup guidance.",
    outcomes: ["Procurement", "Device configuration", "Delivery & support"],
  },
  {
    icon: Globe,
    title: "Web Platforms & Apps",
    desc: "Production-grade websites, portals and applications built for speed, SEO and longevity.",
    details:
      "We design and build responsive websites, dashboards, portals, and custom apps with fast loading, clean user journeys, analytics, SEO foundations, and a maintainable codebase.",
    outcomes: ["UX/UI design", "Frontend/backend build", "Launch optimization"],
  },
  {
    icon: LayoutDashboard,
    title: "Management Systems",
    desc: "Operational dashboards for schools, finance, HR and logistics with real-time visibility.",
    details:
      "We turn manual operations into secure management systems with roles, records, approvals, reports, dashboards, and alerts that help leaders see what is happening in real time.",
    outcomes: ["Role-based access", "Dashboards & reports", "Data workflows"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Replace manual ops with reliable, observable automations across your stack.",
    details:
      "We map repetitive tasks, identify bottlenecks, and automate approvals, notifications, data entry, reminders, and handoffs so your team spends less time chasing routine work.",
    outcomes: ["Process mapping", "Automated triggers", "Monitoring & handover"],
  },
  {
    icon: PlugZap,
    title: "System Integrations",
    desc: "Connect payments, comms, data and SaaS into one coherent, governable system.",
    details:
      "We connect your tools through APIs and data pipelines, making payments, CRM, messaging, accounting, and internal systems share information without duplicate entry.",
    outcomes: ["API connections", "Data sync", "Integration testing"],
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    desc: "Identity systems, design languages and brand guidelines crafted with editorial precision.",
    details:
      "We create logos, brand systems, color palettes, typography, pitch decks, company profiles, and social templates that make your business look consistent and credible everywhere.",
    outcomes: ["Visual identity", "Brand guidelines", "Marketing assets"],
  },
  {
    icon: Film,
    title: "Motion & Posters",
    desc: "Cinematic motion graphics, campaign posters and visual storytelling for launches.",
    details:
      "We produce launch posters, animated visuals, short promotional clips, event screens, and campaign graphics that communicate your message clearly and memorably.",
    outcomes: ["Poster concepts", "Motion graphics", "Campaign exports"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    desc: "Search-first content systems and technical SEO that compound traffic over quarters.",
    details:
      "We improve technical SEO, page structure, metadata, content plans, keyword targeting, and analytics so customers can find your brand and understand your offer faster.",
    outcomes: ["SEO audit", "Content plan", "Analytics setup"],
  },
  {
    icon: Sparkles,
    title: "Event Tech & Experiences",
    desc: "Digital experiences, live visuals and on-site systems that make events unforgettable.",
    details:
      "We support events with registration systems, check-in tools, screens, live visuals, digital signage, and technical coordination so guests get a smooth experience.",
    outcomes: ["Registration flow", "On-site tech", "Live visual support"],
  },
];

export function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-28 md:py-36 border-t border-border/60">
      <div className="absolute inset-x-0 top-0 glow-divider" />

      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Services
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-2xl">
              A full studio of capability — under one roof.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="md:max-w-sm text-muted-foreground">
              Engineering, infrastructure and creative — engineered to interlock into a single,
              scalable system.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50} variant="grid">
              <ServiceCard
                {...s}
                isOpen={activeService === s.title}
                onLearnMore={() =>
                  setActiveService((current) => (current === s.title ? null : s.title))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  details,
  outcomes,
  isOpen,
  onLearnMore,
}: Service & {
  isOpen: boolean;
  onLearnMore: () => void;
}) {
  const detailsId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-details`;

  return (
    <TiltCard className="group relative h-full rounded-2xl glass p-6 transition-all duration-500 hover:ring-glow overflow-hidden">
      {/* Hover light sweep */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(400px_circle_at_var(--card-x,50%)_var(--card-y,0%),oklch(0.72_0.18_245/0.18),transparent_60%)]" />

      <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary border border-border">
        <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
        <span className="absolute -inset-1 rounded-xl bg-primary/0 group-hover:bg-primary/10 blur-xl transition-colors" />
      </div>

      <h3 className="relative mt-5 font-display text-lg text-foreground">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>

      {isOpen && (
        <div
          id={detailsId}
          className="relative mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground animate-fade-in"
        >
          <p>{details}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {outcomes.map((outcome) => (
              <span
                key={outcome}
                className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {outcome}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onLearnMore}
        aria-expanded={isOpen}
        aria-controls={detailsId}
        className="relative mt-6 flex items-center gap-2 text-xs text-primary/90 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
      >
        {isOpen ? "Show less" : "Learn more"}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </TiltCard>
  );
}
