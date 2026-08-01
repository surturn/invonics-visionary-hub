import { useState } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./MotionSystem";
import { Globe, LayoutDashboard, Palette, Search, Zap } from "lucide-react";
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
    icon: Globe,
    title: "Custom Software & Web Platforms",
    desc: "Custom websites, web applications and client portals that are production-grade, mobile-first, and built for SEO and longevity. Serving Nairobi and East Africa.",
    details:
      "We design and build responsive websites, dashboards, portals, and custom apps with fast loading, clean user journeys, analytics, SEO foundations, and a maintainable codebase.",
    outcomes: ["UX/UI design", "Frontend/backend build", "Launch optimization"],
  },
  {
    icon: LayoutDashboard,
    title: "Business Management Systems",
    desc: "Custom ERP, school management, HR and finance dashboards with real-time visibility. M-Pesa integrated. Built for Kenyan businesses and institutions.",
    details:
      "We turn manual operations into secure management systems with roles, records, approvals, reports, dashboards, and alerts that help leaders see what is happening in real time.",
    outcomes: ["Role-based access", "Dashboards & reports", "Data workflows"],
  },
  {
    icon: Zap,
    title: "AI & Workflow Automation",
    desc: "Cut hours of manual work with smart automation like WhatsApp ordering bots, automated invoicing, appointment reminders, and AI-powered customer replies. Designed around M-Pesa and how Kenyan businesses actually operate.",
    details:
      "We map repetitive tasks, identify bottlenecks, and automate approvals, notifications, data entry, reminders, and handoffs so your team spends less time chasing routine work.",
    outcomes: ["Process mapping", "Automated triggers", "Monitoring & handover"],
  },
  {
    icon: Palette,
    title: "Brand Design & Motion Graphics",
    desc: "Identity systems, logo design, campaign visuals, explainer videos and motion posters for product launches, brands and events across East Africa.",
    details:
      "We create logos, brand systems, typography, pitch decks, animated visuals, short promotional clips, and campaign graphics that communicate your message clearly and memorably.",
    outcomes: ["Visual identity", "Motion graphics", "Marketing assets"],
  },
  {
    icon: Search,
    title: "SEO & Digital Visibility",
    desc: "Search-first content systems and technical SEO that build organic traffic and compound your Google rankings over time.",
    details:
      "We improve technical SEO, page structure, metadata, content plans, keyword targeting, and analytics so customers can find your brand and understand your offer faster.",
    outcomes: ["SEO audit", "Content plan", "Analytics setup"],
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
              A full studio of capability, all under one roof.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="md:max-w-sm text-muted-foreground">
              Engineering, infrastructure and creative, engineered to interlock into a single,
              scalable system.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
