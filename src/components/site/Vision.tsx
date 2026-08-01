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
            <span className="tracking-[0.18em] uppercase">Our Motto</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            <span className="text-gradient">Engineering Your </span>
            <span className="text-gradient-accent">Tomorrow, Today.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            We believe software should fit your business, not the other way around. By building custom systems that adapt to how you actually work, we're engineering a smarter future for schools, hotels, and growing organizations across Kenya and East Africa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
