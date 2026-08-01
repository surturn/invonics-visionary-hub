import { Magnetic, ParallaxLayer } from "./MotionSystem";

export function Hero() {
  return (
    <section
      id="top"
      className="cinematic-section relative isolate overflow-hidden bg-hero pt-32 pb-20 md:min-h-screen md:pt-40 md:pb-28"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/hero-bg.jpg"
          alt="Invonics Technologies software studio — Nairobi, Kenya"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>
      <div className="absolute inset-0 -z-10 blueprint opacity-50" />
      <div className="hero-topology absolute inset-0 -z-10 opacity-70" />
      <ParallaxLayer
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[560px] w-[560px] bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-15 will-change-transform"
        speed={0.04}
      />

      <div className="mx-auto flex min-h-[80svh] max-w-7xl flex-col justify-center px-5 md:min-h-[70svh]">
        {/* Top engineered meta-bar */}
        <div className="mb-14 grid grid-cols-12 items-center gap-4 md:mb-20">
          <div className="col-span-6 label-mono md:col-span-3">
            <span className="text-primary">◆</span>&nbsp; INV-001 / NAIROBI
          </div>
          <div className="col-span-6 hidden md:block">
            <div className="signal-divider" />
          </div>
          <div className="col-span-6 label-mono md:col-span-3 md:text-right">
            v2026.05 · OPERATIONAL
          </div>
        </div>

        {/* Clean, authoritative headline */}
        <div className="max-w-5xl">
          <h1 className="sr-only">Custom Software Development & AI Automation Company in Nairobi, Kenya</h1>
          <h2 className="font-display leading-[0.98] tracking-tight text-[11vw] text-gradient sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Software That Fits How You Actually Work.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Your business probably already runs on a system, and maybe even a few of them.
            The problem is, they rarely fit your day-to-day operations. We close that gap by
            connecting and customising what you already have. We only build from scratch when
            your current software can&rsquo;t be saved. Fewer losses, faster operations, and
            full visibility.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic
              href="https://calendly.com/invonicstechnologies/30min"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow"
            >
              <span>Book a Strategy Call</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Magnetic>
            <Magnetic
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm text-foreground transition-colors hover:border-primary/60"
            >
              <span>Explore Our Solutions</span>
              <span className="label-mono text-[10px]">→</span>
            </Magnetic>
          </div>
        </div>

        {/* Bottom engineered status row */}
        <div className="mt-20 grid grid-cols-12 items-end gap-6 md:mt-28">
          <div className="col-span-12 grid grid-cols-3 gap-6 md:col-span-7">
            <SpecLine k="Discipline" v="Software · Infra · Brand" />
            <SpecLine k="Sectors" v="Schools · Hospitality · Enterprise" />
            <SpecLine k="Coverage" v="Nairobi · Kenya-wide" />
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="signal-divider mb-5" />
            <div className="flex items-center justify-between label-mono">
              <span>scroll · ecosystem ↓</span>
              <span className="text-primary">live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecLine({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-border pt-3">
      <div className="label-mono">{k}</div>
      <div className="mt-1 text-sm text-foreground">{v}</div>
    </div>
  );
}
