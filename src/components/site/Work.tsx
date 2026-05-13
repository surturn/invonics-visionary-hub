import { Reveal } from "./Reveal";
import saas from "@/assets/project-saas.jpg";
import school from "@/assets/project-school.jpg";
import branding from "@/assets/project-branding.jpg";
import starlink from "@/assets/project-starlink.jpg";

const projects = [
  {
    img: saas,
    tag: "SaaS · Dashboard",
    title: "Verital Operations Console",
    sub: "A dark, calm command center for distributed teams — real-time pipelines and incident clarity.",
    span: "lg:col-span-7",
  },
  {
    img: starlink,
    tag: "Infrastructure",
    title: "Starlink for Rural Campuses",
    sub: "Deployed connectivity to 14 sites with sub-200ms median latency and 99.99% uptime.",
    span: "lg:col-span-5",
  },
  {
    img: school,
    tag: "Management System",
    title: "Akademi · School OS",
    sub: "End-to-end student records, finance and parent comms used by 26,000+ learners.",
    span: "lg:col-span-5",
  },
  {
    img: branding,
    tag: "Brand · Event",
    title: "Premium Event Identity",
    sub: "A complete brand system, environment and on-site experience for a flagship summit.",
    span: "lg:col-span-7",
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-28 md:py-36 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Featured Work
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-3xl">
              Selected projects, shipped to production.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-foreground/90 hover:text-primary transition-colors"
            >
              Request a private case study
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className={p.span}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  img,
  tag,
  title,
  sub,
}: {
  img: string;
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-3xl glass shadow-card">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary/90 mb-3">
          <span className="h-1 w-1 rounded-full bg-primary pulse-glow" />
          {tag}
        </div>
        <h3 className="font-display text-xl md:text-2xl text-foreground">{title}</h3>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{sub}</p>
      </div>

      <div className="absolute top-5 right-5 h-9 w-9 rounded-full glass-strong grid place-items-center transition-transform duration-500 group-hover:rotate-45">
        <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </article>
  );
}
