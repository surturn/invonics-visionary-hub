import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./MotionSystem";
import saas from "@/assets/project-saas.jpg";
import school from "@/assets/project-school.jpg";
import branding from "@/assets/project-branding.jpg";
import starlink from "@/assets/project-starlink.jpg";
import motion from "@/assets/showcase-motion.jpg";
import poster from "@/assets/showcase-poster.jpg";
import brand from "@/assets/showcase-brand.jpg";

const nodes = [
  {
    img: starlink,
    code: "NODE-01",
    kind: "Infrastructure",
    title: "Starlink Deployment",
    meta: "14 sites · 99.99% uptime",
  },
  {
    img: saas,
    code: "NODE-02",
    kind: "Software",
    title: "Operations Console",
    meta: "Realtime · Multi-tenant",
  },
  {
    img: school,
    code: "NODE-03",
    kind: "Platform",
    title: "Akademi · School OS",
    meta: "26,000+ learners",
  },
  {
    img: branding,
    code: "NODE-04",
    kind: "Brand System",
    title: "Summit Identity",
    meta: "Identity · Environment · Print",
  },
  {
    img: motion,
    code: "NODE-05",
    kind: "Motion",
    title: "Anthem Reel · 04",
    meta: "Cinematic · 12 assets",
  },
  {
    img: poster,
    code: "NODE-06",
    kind: "Campaign",
    title: "Poster Series",
    meta: "Print · Editorial",
  },
  {
    img: brand,
    code: "NODE-07",
    kind: "Automation",
    title: "Workflow Mesh",
    meta: "3.4M / mo executions",
  },
];

export function Ecosystem() {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const canScroll = rail.scrollWidth > rail.clientWidth;
      if (!canScroll) return;
      event.preventDefault();
      rail.scrollBy({ left: event.deltaY * 0.9, behavior: "smooth" });
    };

    rail.addEventListener("wheel", onWheel, { passive: false });
    return () => rail.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="ecosystem" className="relative py-24 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <Reveal className="col-span-12 md:col-span-8" variant="left">
            <div className="label-mono mb-4">
              <span className="text-primary">◆</span>&nbsp; § 02 · Living Ecosystem
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
              <span className="text-gradient">Modular nodes,</span>
              <br />
              <span className="pl-[8vw] md:pl-[10vw] text-gradient-accent">
                one operational mesh.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-4 md:text-right" variant="right">
            <p className="text-sm text-muted-foreground max-w-xs md:ml-auto">
              Each project is a node in a wider system — connectivity, software, brand and motion
              engineered to interlock.
            </p>
            <div className="mt-5 flex md:justify-end gap-2">
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                className="h-10 w-10 rounded-full border border-border grid place-items-center hover:border-primary/60 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                className="h-10 w-10 rounded-full border border-border grid place-items-center hover:border-primary/60 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Connection line */}
        <div className="relative mb-6 hidden md:block">
          <div className="signal-divider" />
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 w-12 node-travel"
            style={{ animationDuration: "5.5s" }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>
      </div>

      {/* Horizontal scroll rail (full-bleed) */}
      <div ref={railRef} className="no-scrollbar overflow-x-auto snap-x snap-mandatory">
        <div className="flex gap-5 px-5 md:px-[max(1.25rem,calc((100vw-80rem)/2))] pb-2">
          {nodes.map((n, i) => (
            <NodeCard key={n.code} {...n} idx={i} />
          ))}
          <div className="shrink-0 w-1" />
        </div>
      </div>
    </section>
  );
}

function NodeCard({
  img,
  code,
  kind,
  title,
  meta,
  idx,
}: {
  img: string;
  code: string;
  kind: string;
  title: string;
  meta: string;
  idx: number;
}) {
  const tall = idx % 2 === 0;
  return (
    <TiltCard
      className={`group snap-start shrink-0 w-[78vw] sm:w-[420px] ${
        tall ? "md:h-[520px]" : "md:h-[460px] md:mt-10"
      } relative overflow-hidden rounded-2xl glass`}
    >
      <div className="absolute inset-0">
        <img
          src={img}
          alt={`${title} — Invonics Technologies, Nairobi Kenya`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 blueprint opacity-[0.08] mix-blend-overlay" />
      </div>

      {/* Top meta */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <span className="label-mono">{code}</span>
        <span className="label-mono text-primary">● live</span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="label-mono mb-2">{kind}</div>
        <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">{title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{meta}</span>
          <span className="h-8 w-8 rounded-full border border-border grid place-items-center group-hover:border-primary/60 group-hover:rotate-45 transition-all">
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </TiltCard>
  );
}
