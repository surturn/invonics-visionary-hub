import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import registryShot from "@/assets/work/school-asset-registry.jpg";
import accountingShot from "@/assets/work/accounting-hero.jpg";

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
  // Either a live demo link, or a case-study link + an in-progress note — not both.
  demoUrl?: string;
  caseStudySlug?: string;
  demoInProgress?: boolean;
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
    demoUrl: "https://assetflow.invonicstechnologies.com/",
    reverse: false,
  },
  {
    id: "02",
    tag: "Finance · Invonics Accounting",
    title: "Know your numbers. File on time, every time.",
    pitch:
      "Most small business owners in Kenya track their finances through M-Pesa messages, paper receipts and memory. They have no real sense of whether they're actually making money, and tax season is a scramble. Invonics Accounting gives them a simple, always-up-to-date view of income, expenses and profit, and handles their KRA tax obligations automatically in the background. The result is business owners who finally know their numbers, file on time without stress, and never need to hire an accountant to do it.",
    metric: "Always tax-ready · zero late filings",
    img: accountingShot,
    imgW: 1000,
    imgH: 563,
    imgAlt: "Invonics Accounting dashboard — Invonics Technologies",
    caseStudySlug: "accounting-finance-system",
    demoInProgress: true,
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
            <Reveal
              key={s.id}
              className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14"
            >
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
                  {s.demoUrl && (
                    <a
                      href={s.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-foreground/90 hover:text-primary transition-colors"
                    >
                      Try the live demo ↗
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
                {s.demoInProgress && (
                  <p className="mt-3 text-xs italic text-muted-foreground/70">
                    Currently being rebuilt as a dedicated app, so the live demo is temporarily unavailable.
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
