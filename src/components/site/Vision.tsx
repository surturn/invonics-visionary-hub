import { Reveal } from "./Reveal";

export function Vision() {
  return (
    <section
      id="vision"
      className="relative py-32 md:py-44 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/15 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 relative text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            <span className="tracking-[0.18em] uppercase">Our Vision</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            <span className="text-gradient">We are building the </span>
            <span className="text-gradient-accent">digital infrastructure</span>
            <span className="text-gradient"> for Africa&rsquo;s next century.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Software, connectivity, automation and brand — engineered as one interoperable ecosystem
            so institutions across the continent can compound value, decade over decade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
