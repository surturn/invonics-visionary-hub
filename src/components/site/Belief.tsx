import { Reveal } from "./Reveal";

export function Belief() {
  return (
    <section
      id="belief"
      className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 relative text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
            <span className="tracking-[0.18em] uppercase">What We Believe</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            <span className="text-gradient">Software should fit the business. </span>
            <span className="text-gradient-accent">Not the other way around.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Most organisations aren&rsquo;t short on software. They&rsquo;re short on
            software that actually fits them. And most have quietly learned to work around the gap
            instead of demanding better. We exist to close that gap for schools, hospitality
            groups, and growing businesses across Kenya and East Africa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
