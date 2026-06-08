import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
              <span className="text-primary">●</span>&nbsp; About
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gradient leading-[1.05]">
              We modernize the way organizations operate, build and grow.
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We modernize the way organizations in Nairobi, Kenya and across East Africa operate, build and grow. Invonics Technologies delivers custom software development, AI-powered automation, web platforms, and brand systems — engineered end-to-end for businesses, schools, SMEs and government institutions. From M-Pesa-integrated management systems to motion graphics, every solution is built to compound in value as you scale.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat n="02" label="Schools onboarded" />
              <Stat n="1,400+" label="Learners reached" />
              <Stat n="01" label="School portal live" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-t border-border pt-5">
      <div className="font-display text-3xl md:text-4xl text-foreground">{n}</div>
      <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
