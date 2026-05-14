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

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Satellite,
    title: "Starlink Installation",
    desc: "End-to-end satellite internet deployment, alignment and uptime SLAs for sites of any scale.",
  },
  {
    icon: Cpu,
    title: "IT Equipment & Supply",
    desc: "Curated workstations, networking and peripherals — sourced, configured, delivered and supported.",
  },
  {
    icon: Globe,
    title: "Web Platforms & Apps",
    desc: "Production-grade websites, portals and applications built for speed, SEO and longevity.",
  },
  {
    icon: LayoutDashboard,
    title: "Management Systems",
    desc: "Operational dashboards for schools, finance, HR and logistics with real-time visibility.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "Replace manual ops with reliable, observable automations across your stack.",
  },
  {
    icon: PlugZap,
    title: "System Integrations",
    desc: "Connect payments, comms, data and SaaS into one coherent, governable system.",
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    desc: "Identity systems, design languages and brand guidelines crafted with editorial precision.",
  },
  {
    icon: Film,
    title: "Motion & Posters",
    desc: "Cinematic motion graphics, campaign posters and visual storytelling for launches.",
  },
  {
    icon: Search,
    title: "SEO & Content",
    desc: "Search-first content systems and technical SEO that compound traffic over quarters.",
  },
  {
    icon: Sparkles,
    title: "Event Tech & Experiences",
    desc: "Digital experiences, live visuals and on-site systems that make events unforgettable.",
  },
];

export function Services() {
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
              <ServiceCard {...s} />
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
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
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

      <div className="relative mt-6 flex items-center gap-2 text-xs text-primary/90 opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </TiltCard>
  );
}
