import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Server, ShieldCheck, TrendingUp } from "lucide-react";
import { MotionSystem, Magnetic, ParallaxLayer } from "@/components/site/MotionSystem";
import { StackPanel, CountUp, makeCascade } from "@/components/site/motion-primitives";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import registryShot from "@/assets/work/school-asset-registry.jpg";
import accountingShot from "@/assets/work/accounting-hero.jpg";

export const Route = createFileRoute("/home-v2")({
  head: () => ({
    meta: [{ title: "Invonics — Homepage Motion Review (v2)" }],
  }),
  component: HomeV2,
});

/**
 * REVIEW ROUTE — not linked from the live site.
 *
 * Applies the /concept-node "feel" (stacked-scroll overlay, count-up, snappy
 * interactions, on-load cascade) to the FIRST THREE homepage sections, on top
 * of the existing dark cinematic theme. Wording/content are copied verbatim
 * from the production components; only motion + structural stacking is added.
 *
 * The live Hero/TrustBar/FeaturedSolutions components are untouched — these are
 * isolated v2 copies so / stays exactly as it is.
 *
 * Stacking rhythm (only short, viewport-fitting sections pin):
 *   Hero (normal, opaque, on-load cascade)
 *     → TrustBar pins on top and OVERLAYS Hero, content fading up, 99.9% counting
 *       → FeaturedSolutions (opaque, tall) scrolls up and REPLACES the stack
 */

// On-load cascade for the hero (shared shape; home-v2 uses the defaults).
const { container: containerVariants, item: itemVariants } = makeCascade();

/* -------------------------------------------------------------------------- */
/* Section 1 — HERO (verbatim content, + on-load cascade). Not pinned so its   */
/* tall content never clips; it's the base the stack overlays.                 */
/* -------------------------------------------------------------------------- */

function HeroV2() {
  return (
    <section
      id="top"
      className="cinematic-section relative isolate overflow-hidden bg-hero pt-32 pb-20 md:min-h-screen md:pt-40 md:pb-28"
    >
      {/* Layered backgrounds (unchanged) */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/hero-bg.jpg"
          alt="Invonics Technologies software studio — Nairobi, Kenya"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>
      <div className="absolute inset-0 -z-10 blueprint opacity-50" />
      <div className="hero-topology absolute inset-0 -z-10 opacity-70" />
      <ParallaxLayer
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[560px] w-[560px] rounded-full bg-primary/15 blur-3xl will-change-transform"
        speed={0.04}
      />

      <motion.div
        className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-5 md:min-h-[70vh]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top engineered meta-bar */}
        <motion.div
          variants={itemVariants}
          className="mb-14 grid grid-cols-12 items-center gap-4 md:mb-20"
        >
          <div className="col-span-6 label-mono md:col-span-3">
            <span className="text-primary">◆</span>&nbsp; INV-001 / NAIROBI
          </div>
          <div className="col-span-6 hidden md:block">
            <div className="signal-divider" />
          </div>
          <div className="col-span-6 label-mono md:col-span-3 md:text-right">
            v2026.05 · OPERATIONAL
          </div>
        </motion.div>

        {/* Clean, authoritative headline */}
        <div className="max-w-5xl">
          <motion.h1
            variants={itemVariants}
            className="font-display leading-[0.98] tracking-tight text-[11vw] text-gradient sm:text-6xl md:text-7xl lg:text-[5.6rem]"
          >
            Enterprise Software, Engineered for Kenya&rsquo;s Growth.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Invonics Technologies builds mission-critical operating systems for hospitality groups,
            schools, and enterprise across Nairobi and beyond — replacing manual processes and
            legacy tools with automated, accountable, revenue-protecting infrastructure. Fewer
            losses. Faster operations. Full visibility.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic
              href="https://calendly.com/invonicstechnologies/30min"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform duration-150 active:scale-[0.98]"
            >
              <span>Book a Strategy Call</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Magnetic>
            <Magnetic
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm text-foreground transition-colors duration-150 hover:border-primary/60 active:scale-[0.98]"
            >
              <span>Explore Our Solutions</span>
              <span className="label-mono text-[10px]">→</span>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom engineered status row */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-12 items-end gap-6 md:mt-28"
        >
          <div className="col-span-12 grid grid-cols-3 gap-6 md:col-span-7">
            <SpecLine k="Discipline" v="Software · Infra · Brand" />
            <SpecLine k="Sectors" v="Schools · Hospitality · Enterprise" />
            <SpecLine k="Coverage" v="Nairobi · Kenya-wide" />
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="signal-divider mb-5" />
            <div className="flex items-center justify-between label-mono">
              <span>scroll · ecosystem ↓</span>
              <span className="text-primary">live</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SpecLine({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-border pt-3">
      <div className="label-mono">{k}</div>
      <div className="mt-1 text-sm text-foreground">{v}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 2 — TRUST BAR (verbatim, + sticky overlay + count-up + hover node)  */
/* -------------------------------------------------------------------------- */

const signals = [
  {
    icon: Server,
    title: "Built for Zero-Downtime Operations",
    // The 99.9% is split out so it can count up; the sentence is unchanged.
    bodyBefore: "",
    figure: "99.9%",
    bodyAfter:
      " uptime SLA on every hosted platform — enterprise-grade infrastructure your operations can depend on, day and night.",
  },
  {
    icon: ShieldCheck,
    title: "Data Sovereignty & Local Compliance",
    bodyBefore:
      "Hosted and handled in line with Kenya's Data Protection Act (2019) — your records stay compliant, local, and under your control.",
    figure: "",
    bodyAfter: "",
  },
  {
    icon: TrendingUp,
    title: "Outcomes, Not Just Output",
    bodyBefore:
      "Every engagement ships with a measurable result — from asset-loss reduction to order-error rates — reported back to you.",
    figure: "",
    bodyAfter: "",
  },
];

function TrustBarV2() {
  return (
    <StackPanel
      className="isolate overflow-hidden border-t border-border/60 bg-background py-16 md:py-20"
      innerClassName="relative flex w-full flex-1 flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {signals.map((s) => (
            <div
              key={s.title}
              className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-background/40 p-5 transition-colors duration-150 hover:border-primary/50 active:scale-[0.99]"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/5 text-primary transition-colors duration-150 group-hover:border-primary/50">
                <s.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{s.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.bodyBefore}
                  {s.figure && (
                    <CountUp value={s.figure} className="font-semibold text-foreground" />
                  )}
                  {s.bodyAfter}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StackPanel>
  );
}

/* -------------------------------------------------------------------------- */
/* Section 3 — FEATURED SOLUTIONS (verbatim, opaque, scrolls over the stack)   */
/* -------------------------------------------------------------------------- */

type FeaturedSolution = {
  id: string;
  tag: string;
  title: string;
  pitch: string;
  metric: string;
  img: string;
  imgAlt: string;
  reverse: boolean;
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
      "Schools and institutions lose real money every year to equipment that goes missing or quietly disappears off the books — with no one able to say exactly what happened or when. AssetFlow gives administrators a complete, always-current picture of everything the school owns, from the day it's bought to the day it's retired. The result is fewer unexplained losses, tighter budgets, and a level of accountability schools have never had before.",
    metric: "Full visibility · fewer unexplained losses",
    img: registryShot,
    imgAlt: "AssetFlow asset registry dashboard — Invonics Technologies",
    demoUrl: "https://assetflow.invonicstechnologies.com/",
    reverse: false,
  },
  {
    id: "02",
    tag: "Finance · Invonics Accounting",
    title: "Know your numbers. File on time, every time.",
    pitch:
      "Most small business owners in Kenya track their finances through M-Pesa messages, paper receipts and memory — with no real sense of whether they're actually making money, and tax season is a scramble. Invonics Accounting gives them a simple, always-up-to-date view of income, expenses and profit, and handles their KRA tax obligations automatically in the background. The result is business owners who finally know their numbers, file on time without stress, and never need to hire an accountant to do it.",
    metric: "Always tax-ready · zero late filings",
    img: accountingShot,
    imgAlt: "Invonics Accounting dashboard — Invonics Technologies",
    caseStudySlug: "accounting-finance-system",
    demoInProgress: true,
    reverse: true,
  },
];

function FeaturedSolutionsV2() {
  // Opaque + above the stack so it covers the pinned TrustBar as it scrolls up
  // (the "replace" step). Too tall to pin without hiding its second row.
  return (
    <section className="relative z-[1] overflow-hidden border-t border-border/60 bg-background py-28 md:py-36">
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
                <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-card">
                  <img
                    src={s.img}
                    alt={s.imgAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
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
                      className="text-sm font-semibold text-foreground/90 transition-colors hover:text-primary"
                    >
                      Try the live demo ↗
                    </a>
                  )}
                  {s.caseStudySlug && (
                    <Link
                      to="/work/$slug"
                      params={{ slug: s.caseStudySlug }}
                      className="text-sm font-semibold text-foreground/90 transition-colors hover:text-primary"
                    >
                      View case study →
                    </Link>
                  )}
                </div>
                {s.demoInProgress && (
                  <p className="mt-3 text-xs italic text-muted-foreground/70">
                    Currently being rebuilt as a dedicated app — live demo temporarily unavailable.
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

/* -------------------------------------------------------------------------- */

function HomeV2() {
  return (
    <MotionSystem>
      <div className="relative z-10 min-h-screen bg-background/80 text-foreground">
        <Nav />
        <main>
          <HeroV2 />
          <TrustBarV2 />
          <FeaturedSolutionsV2 />
        </main>
        <Footer />
      </div>
    </MotionSystem>
  );
}
