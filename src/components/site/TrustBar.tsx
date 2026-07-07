import { Server, ShieldCheck, TrendingUp } from "lucide-react";
import { Reveal } from "./Reveal";

const signals = [
  {
    icon: Server,
    title: "Built for Zero-Downtime Operations",
    body: "99.9% uptime SLA on every hosted platform — enterprise-grade infrastructure your operations can depend on, day and night.",
  },
  {
    icon: ShieldCheck,
    title: "Data Sovereignty & Local Compliance",
    body: "Hosted and handled in line with Kenya's Data Protection Act (2019) — your records stay compliant, local, and under your control.",
  },
  {
    icon: TrendingUp,
    title: "Outcomes, Not Just Output",
    body: "Every engagement ships with a measurable result — from asset-loss reduction to order-error rates — reported back to you.",
  },
];

export function TrustBar() {
  return (
    <section className="relative border-t border-border/60 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {signals.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/5 text-primary">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{s.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
