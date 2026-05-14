import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./MotionSystem";
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
    metric: "04 systems unified",
  },
  {
    img: starlink,
    tag: "Infrastructure",
    title: "Starlink for Rural Campuses",
    sub: "Deployed connectivity to 14 sites with sub-200ms median latency and 99.99% uptime.",
    metric: "14 sites online",
  },
  {
    img: school,
    tag: "Management System",
    title: "Akademi · School OS",
    sub: "End-to-end student records, finance and parent comms used by 26,000+ learners.",
    metric: "26k learners",
  },
  {
    img: branding,
    tag: "Brand · Event",
    title: "Premium Event Identity",
    sub: "A complete brand system, environment and on-site experience for a flagship summit.",
    metric: "12 launch assets",
  },
];

// Duplicate cards to enable seamless infinite loop
const loopedProjects = [...projects, ...projects];

export function Work() {
  const railRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollStartRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Speed in px/frame (~1px per frame @ 60fps = ~60px/s)
  const SPEED = 0.6;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const step = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        rail.scrollLeft += SPEED;

        // When we've scrolled exactly one "set" width, jump back silently
        const halfWidth = rail.scrollWidth / 2;
        if (rail.scrollLeft >= halfWidth) {
          rail.scrollLeft -= halfWidth;
        }

        // Update active dot based on scroll position
        const cardWidth = rail.scrollWidth / loopedProjects.length;
        const idx = Math.round(rail.scrollLeft / cardWidth) % projects.length;
        setActiveIndex(idx);
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pause on hover
  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  // Drag-to-scroll (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragScrollStartRef.current = railRef.current!.scrollLeft;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    railRef.current!.scrollLeft = dragScrollStartRef.current + delta;
  };
  const handleMouseUp = () => { isDraggingRef.current = false; };

  // Dot navigation
  const scrollToCard = (idx: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.scrollWidth / loopedProjects.length;
    rail.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="cinematic-section relative overflow-hidden border-t border-border/60 py-28 md:py-36"
    >
      <div className="absolute inset-0 blueprint opacity-[0.08]" />
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <Reveal variant="left">
            <div className="label-mono mb-4">
              <span className="text-primary">●</span>&nbsp; Featured Work / cinematic rail
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-3xl">
              Selected projects, sequenced like product storytelling.
            </h2>
          </Reveal>
          <Reveal delay={120} variant="right">
            <a
              href="#contact"
              className="magnetic inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground/90 transition-colors hover:border-primary/60 hover:text-primary"
            >
              Request a private case study
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* Rail */}
      <div
        ref={railRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="no-scrollbar overflow-x-auto px-5 md:px-[max(1.25rem,calc((100vw-80rem)/2))] cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-5 pb-3">
          {loopedProjects.map((p, i) => (
            <div key={`${p.title}-${i}`} className="shrink-0">
              <ProjectCard {...p} index={i % projects.length} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2.5 mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to project ${i + 1}`}
            className="group relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
            style={{ width: activeIndex === i ? "2.5rem" : "0.375rem" }}
          >
            <span className="absolute inset-0 rounded-full bg-border group-hover:bg-primary/40 transition-colors" />
            {activeIndex === i && (
              <span className="absolute inset-0 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  img,
  tag,
  title,
  sub,
  metric,
  index,
}: {
  img: string;
  tag: string;
  title: string;
  sub: string;
  metric: string;
  index: number;
}) {
  return (
    <TiltCard className="portfolio-card group relative h-[72vh] min-h-[520px] w-[86vw] max-w-[980px] overflow-hidden rounded-[2rem] glass shadow-card">
      <div className="absolute inset-0">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.055]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,oklch(0.13_0.008_260/0.78)_35%,transparent_76%)]" />
        <div className="absolute inset-0 blueprint opacity-[0.1] mix-blend-overlay" />
      </div>

      <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
        <span className="label-mono">PRJ-{String(index + 1).padStart(2, "0")}</span>
        <span className="label-mono text-primary">{metric}</span>
      </div>

      <div className="relative z-10 flex h-full max-w-xl flex-col justify-end p-6 md:p-10">
        <div className="mb-5 h-px w-32 overflow-hidden bg-border">
          <span className="block h-full w-16 bg-primary line-scan" />
        </div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary/90 mb-3">
          <span className="h-1 w-1 rounded-full bg-primary pulse-glow" />
          {tag}
        </div>
        <h3 className="font-display text-4xl md:text-6xl text-foreground leading-[0.98]">
          {title}
        </h3>
        <p className="mt-5 max-w-lg text-sm md:text-base leading-relaxed text-muted-foreground">
          {sub}
        </p>
      </div>

      <div className="absolute bottom-8 right-8 hidden h-16 w-16 place-items-center rounded-full glass-strong transition-all duration-700 group-hover:rotate-45 group-hover:scale-110 md:grid">
        <svg
          className="h-5 w-5 text-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </TiltCard>
  );
}