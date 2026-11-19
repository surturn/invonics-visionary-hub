import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import registryShot from "@/assets/work/school-asset-registry.jpg";
import lucklotterShot from "@/assets/work/lucklotter-overview.webp";

type FeaturedSolution = {
  id: string;
  tag: string;
  title: string;
  pitch: string;
  metric: string;
  img: string;
  imgW: number;
  imgH: number;
  imgAlt: string;
  reverse: boolean;
  // In-page anchor, so old URLs can redirect straight to this solution.
  anchor?: string;
  caseStudySlug?: string;
  // Invite-only products link to their early-access form instead of a demo.
  earlyAccessUrl?: string;
  imgNote?: string;
};

const solutions: FeaturedSolution[] = [
  {
    id: "01",
    tag: "School Systems · AssetFlow",
    title: "Stop losing what you already paid for.",
    pitch:
      "Schools and institutions lose real money every year to equipment that goes missing or quietly disappears off the books, and no one is able to say exactly what happened or when. AssetFlow gives administrators a complete, always-current picture of everything the school owns, from the day it's bought to the day it's retired. The result is fewer unexplained losses, tighter budgets, and a level of accountability schools have never had before.",
    metric: "Full visibility · fewer unexplained losses",
    img: registryShot,
    imgW: 1000,
    imgH: 625,
    imgAlt: "AssetFlow asset registry dashboard — Invonics Technologies",
    caseStudySlug: "school-asset-inventory-system",
    reverse: false,
  },
  {
    id: "02",
    tag: "Client Engagement · LuckLotter",
    title: "Bring your regulars back before they drift away.",
    pitch:
      "Every business has regulars who quietly stop coming, and most owners only notice months later. LuckLotter learns each customer's normal visit rhythm from your sales or booking records, flags the regulars who have gone quiet, and lines up a win-back offer for each one, ready to send by SMS or WhatsApp. Your team redeems the offer at the till, and the dashboard shows exactly who came back. Built first for salons, barbershops and spas, and now opening to cafes, restaurants and food joints.",
    metric: "Beauty and food businesses · invite-only pilot",
    img: lucklotterShot,
    imgW: 1400,
    imgH: 778,
    imgAlt: "LuckLotter dashboard showing how many flagged regulars came back after an offer",
    imgNote: "Demo business and data",
    anchor: "lucklotter",
    earlyAccessUrl: "https://lucklotter.vercel.app/pilot?src=invonics-site",
    reverse: true,
  },
];

function monogram(tag: string): string {
  const product = tag.split("·").pop()?.trim() ?? tag;
  return (
    product
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "IN"
  );
}

export function FeaturedSolutions() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-28 md:py-36">
      <div className="absolute inset-0 blueprint opacity-[0.08]" />
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="label-mono mb-4">
            <span className="text-primary">●</span>&nbsp; Flagship Solutions
          </div>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.04] text-gradient md:text-5xl lg:text-6xl">
            Systems built around one outcome: protecting your revenue.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
          {solutions.map((s) => (
            <div key={s.id} id={s.anchor} className="scroll-mt-28">
              <Reveal className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className={s.reverse ? "md:order-2" : ""}>
                  {s.img ? (
                    <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-card">
                      <img
                        src={s.img}
                        alt={s.imgAlt}
                        loading="lazy"
                        decoding="async"
                        width={s.imgW}
                        height={s.imgH}
                        className="h-full w-full object-cover object-top"
                      />
                      {s.imgNote && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
                          {s.imgNote}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/70 via-background to-background">
                      <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
                      <div className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
                      <span className="relative select-none font-display text-6xl font-semibold text-gradient">
                        {monogram(s.tag)}
                      </span>
                    </div>
                  )}
                </div>

                <div className={s.reverse ? "md:order-1" : ""}>
                  <div className="label-mono mb-4">
                    § {s.id} / {s.tag}
                  </div>
                  <h3 className="font-display text-3xl leading-[1.06] text-foreground md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {s.pitch}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                      {s.metric}
                    </span>
                    {s.earlyAccessUrl && (
                      <a
                        href={s.earlyAccessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        Request early access ↗
                      </a>
                    )}
                    {s.caseStudySlug && (
                      <Link
                        to="/portfolio/$slug"
                        params={{ slug: s.caseStudySlug }}
                        className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
                      >
                        View case study →
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
