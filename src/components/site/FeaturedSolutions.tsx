import { Reveal } from "./Reveal";
import registryShot from "@/assets/work/school-asset-registry.jpg";

const solutions = [
  {
    id: "01",
    tag: "School Systems · AssetFlow",
    title: "Stop losing what you already paid for.",
    pitch:
      "AssetFlow eliminates the silent cost of asset shrinkage in schools and institutions by giving administrators a single source of truth for every device, resource, and physical asset on campus. It automates depreciation tracking and audit trails so finance teams stop reconciling spreadsheets and start making informed budget decisions. The result: full accountability from procurement to write-off, and a measurable reduction in unexplained losses.",
    metric: "Full audit trail · zero unaccounted assets",
    img: registryShot,
    imgAlt: "AssetFlow asset registry dashboard — Invonics Technologies",
    demoUrl: "https://assetflow.invonicstechnologies.com/",
    reverse: false,
  },
  {
    id: "02",
    tag: "Hospitality · TableWise",
    title: "Turn more tables. Lose fewer orders.",
    pitch:
      "TableWise streamlines the entire dining floor into one intelligent operating layer, so orders move from table to kitchen to bill without manual re-entry or error. By eliminating miscommunication between front-of-house and kitchen staff, restaurants cut order errors and refire costs while serving more covers per shift. The result is faster table turnover, higher staff productivity, and a measurable lift in nightly revenue capacity.",
    metric: "Fewer order errors · faster table turnover",
    reverse: true,
  },
];

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
            <Reveal key={s.id} className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
              <div className={s.reverse ? "md:order-2" : ""}>
                {s.img ? (
                  <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-card">
                    <img
                      src={s.img}
                      alt={s.imgAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/70 via-background to-background">
                    <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
                    <div className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
                    <span className="relative select-none font-display text-6xl font-semibold text-gradient">
                      TW
                    </span>
                  </div>
                )}
              </div>

              <div className={s.reverse ? "md:order-1" : ""}>
                <div className="label-mono mb-4">§ {s.id} / {s.tag}</div>
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
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
