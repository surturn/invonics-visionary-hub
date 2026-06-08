import heroBg from "@/assets/hero-bg.jpg";
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
          src={heroBg}
          alt="Invonics Technologies software studio — Nairobi, Kenya"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>
      <div className="absolute inset-0 -z-10 blueprint opacity-50" />
      <div className="hero-topology absolute inset-0 -z-10 opacity-70" />
      <ParallaxLayer
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[560px] w-[560px] rounded-full bg-primary/15 blur-3xl will-change-transform"
        speed={0.04}
      />
      <div className="pointer-events-none absolute left-5 right-5 top-28 -z-10 hidden h-[52vh] md:block">
        <div className="floating-module left-[6%] top-[18%]">Latency &lt; 200ms</div>
        <div className="floating-module right-[8%] top-[8%] animation-delay-2000">
          Mesh integrity 99.99
        </div>
        <div className="floating-module bottom-[16%] left-[44%] animation-delay-4000">
          Brand · software · infra
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5">
        {/* Top engineered meta-bar */}
        <div className="grid grid-cols-12 items-center gap-4 mb-14 md:mb-20">
          <div className="col-span-6 md:col-span-3 label-mono">
            <span className="text-primary">◆</span>&nbsp; INV-001 / NAIROBI
          </div>
          <div className="hidden md:block col-span-6">
            <div className="signal-divider" />
          </div>
          <div className="col-span-6 md:col-span-3 label-mono md:text-right">
            v2026.05 · OPERATIONAL
          </div>
        </div>

        {/* Asymmetric editorial headline */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left rail — section number */}
          <div className="hidden md:flex col-span-1 flex-col items-start">
            <div className="label-mono">§ 01</div>
            <div className="mt-3 h-40 w-px tick-rail" />
          </div>

          {/* Headline */}
          <div className="col-span-12 lg:col-span-8 min-w-0">
            <h1 className="sr-only">Software Development & AI Automation Company in Nairobi, Kenya</h1>
            <p className="font-display leading-[0.92] tracking-tight" aria-label="brand tagline">
              <span className="hero-word block text-[15vw] md:text-[11vw] lg:text-[8vw] xl:text-[7.2rem] text-gradient">
                Engineering
              </span>
              <span className="hero-word hero-word--offset block pl-[10vw] md:pl-[12vw] lg:pl-[8vw] -mt-2 md:-mt-3 text-[15vw] md:text-[11vw] lg:text-[8vw] xl:text-[7.2rem]">
                <span className="relative inline-block text-gradient-accent">
                  Tomorrow
                  <svg
                    className="signal-trace absolute -bottom-3 md:-bottom-5 left-0 w-full"
                    viewBox="0 0 600 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 12 L 80 12 L 110 4 L 150 20 L 190 12 L 320 12 L 350 4 L 390 20 L 430 12 L 598 12"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="text-primary"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="hero-word block text-[15vw] md:text-[11vw] lg:text-[8vw] xl:text-[7.2rem] text-gradient -mt-2 md:-mt-3">
                Today<span className="text-primary">.</span>
              </span>
            </p>
          </div>

          {/* Right column — synopsis */}
          <div className="col-span-12 lg:col-span-3 lg:pt-6 mt-6 lg:mt-0 relative z-10">
            <div className="label-mono mb-3">
              <span className="text-primary">●</span>&nbsp; Studio Note
            </div>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
              Invonics Technologies is a software development and AI automation studio based in Nairobi, Kenya — building custom platforms, workflow automations, and brand systems for businesses and schools across East Africa.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Magnetic
                href="#work"
                className="group inline-flex items-center justify-between rounded-full bg-accent-gradient px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow"
              >
                <span>View the ecosystem</span>
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
                href="https://calendly.com/invonicstechnologies/30min"
                className="inline-flex items-center justify-between rounded-full border border-border px-5 py-3 text-sm text-foreground hover:border-primary/60 transition-colors"
              >
                <span>Book a consult</span>
                <span className="label-mono text-[10px]">→</span>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Bottom engineered status row */}
        <div className="mt-20 md:mt-28 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7 grid grid-cols-3 gap-6">
            <SpecLine k="Discipline" v="Software · Infra · Brand" />
            <SpecLine k="Sectors" v="Schools · Gov · SMEs · Events" />
            <SpecLine k="Coverage" v="EA · Continent · Diaspora" />
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
