import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
              <span className="text-primary">●</span>&nbsp; Our Story
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-gradient leading-[1.05]">
              We aren't just a software vendor. We are your operational partner.
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Most businesses in East Africa are forced to bend their day-to-day operations to fit rigid, off-the-shelf software. We started Invonics Technologies because we believe that is fundamentally backward. Technology should adapt to your business.
              </p>
              <p>
                We don't just write code and walk away. We sit down with you to uncover the bottlenecks draining your revenue and slowing your growth. Then, we design and engineer custom digital ecosystems—from AI workflows to full brand platforms—that fit exactly how your team actually works.
              </p>
              <p className="text-foreground font-medium">
                When you work with us, you aren't just buying an application. You are gaining a dedicated technical partner invested in your bottom line. Brands that fail to modernize with a strategic partner are quietly getting left behind. We make sure you lead.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
