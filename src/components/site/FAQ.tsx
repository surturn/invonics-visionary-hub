import { useState } from "react";
import { Reveal } from "./Reveal";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What services does Invonics Technologies offer?",
    a: "We offer software platforms, management systems, workflow automation, system integrations, branding & graphic design, motion graphics, SEO & content, IT equipment supply, Starlink installation, and event technology — all engineered to interlock as one ecosystem.",
  },
  {
    q: "How long does a project usually take?",
    a: "Brand systems take 2–4 weeks. Websites and platforms typically run 4–10 weeks depending on scope. Larger management systems and integrations are scoped after a discovery sprint, with milestones every 2 weeks.",
  },
  {
    q: "Do you build custom systems?",
    a: "Yes. Every system we ship is custom-engineered to your operations, team and growth plan. We never resell template products as bespoke work.",
  },
  {
    q: "Can businesses combine multiple services?",
    a: "Absolutely — most of our clients combine 2–4 services (e.g. brand + website + automation + IT supply). Bundles unlock pricing efficiency and a single point of accountability.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. Every engagement ends with a support plan — uptime monitoring, monthly enhancements, priority response and on-call options for mission-critical systems.",
  },
  {
    q: "How does the consultation process work?",
    a: "Book a strategy call, we listen for 30–45 minutes, then send a tailored proposal within 48 hours. No pressure, no boilerplate decks.",
  },
  {
    q: "Can you manage branding and digital content?",
    a: "Yes — we run identity systems, content calendars, motion graphics, posters and ongoing creative production as a managed service.",
  },
  {
    q: "Do you work with schools and organizations?",
    a: "Yes. Schools, NGOs and government bodies are a core part of our portfolio — including school OS platforms, connectivity rollouts and digital transformation programs.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; FAQ
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              Questions, answered.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Still curious? Reach out on WhatsApp — most teams get a tailored answer in under five
              minutes.
            </p>
          </Reveal>

          <div className="lg:col-span-7 space-y-3">
            {faqs.map((f, i) => {
              const active = open === i;
              return (
                <Reveal key={f.q} delay={i * 40}>
                  <div
                    className={`group rounded-2xl glass overflow-hidden transition-all ${
                      active ? "ring-glow" : ""
                    }`}
                  >
                    <button
                      onClick={() => setOpen(active ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-5 md:px-6 py-5 text-left"
                    >
                      <span className="font-display text-base md:text-lg text-foreground">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-transform duration-500 ${
                          active
                            ? "rotate-45 bg-accent-gradient text-primary-foreground border-transparent"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 md:px-6 pb-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
