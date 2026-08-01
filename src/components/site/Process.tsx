import { Reveal } from "./Reveal";

const steps = [
  { n: "01", t: "Challenge", d: "We start by questioning assumptions, both yours and ours. What do you actually need? What are you doing today that you shouldn't be? We push back before we build." },
  {
    n: "02",
    t: "Discover",
    d: "We dig into the real pain, not just the symptoms. Interviews, system audits, and watching how your team actually works day-to-day, not how a process document says they should.",
  },
  { n: "03", t: "Simplify", d: "We strip away complexity until the problem is obvious. Most projects don't need more software. They need less, better connected." },
  {
    n: "04",
    t: "Create",
    d: "We close the gap between what your business has and what it needs. Integrate first. Build new only when what you're on is genuinely beyond repair.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-28 md:py-36 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 blueprint opacity-30" />
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-3xl">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Process
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              How we think about your problem, before we write a line of code.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 relative">
          <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
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
