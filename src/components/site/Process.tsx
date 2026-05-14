import { Reveal } from "./Reveal";

const steps = [
  { n: "01", t: "Discover", d: "Audits, interviews and systems mapping to surface real leverage." },
  { n: "02", t: "Design", d: "Information architecture, UX and brand systems set the foundations." },
  { n: "03", t: "Build", d: "Production engineering, integrations and infrastructure deployment." },
  { n: "04", t: "Automate", d: "Reliable workflows reduce ops cost and remove manual surface area." },
  { n: "05", t: "Scale", d: "Observability, growth loops and SLAs for the next stage of the business." },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 -z-10 blueprint opacity-30" />
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              A repeatable path from idea to scale.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="group relative">
                  <div className="relative z-10 mx-auto md:mx-0 h-7 w-7 rounded-full bg-card border border-primary/40 grid place-items-center shadow-glow">
                    <span className="h-2 w-2 rounded-full bg-primary pulse-glow" />
                  </div>
                  <div className="mt-6 rounded-2xl glass p-5 h-full transition-all group-hover:-translate-y-1 group-hover:ring-glow">
                    <div className="font-mono text-xs text-primary">{s.n}</div>
                    <div className="mt-2 font-display text-lg text-foreground">{s.t}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
