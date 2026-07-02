import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getAllWorkSolutions } from "@/lib/work";
import { absoluteUrl } from "@/lib/site";
import type { WorkSolution } from "@/types/content";

export const Route = createFileRoute("/work/")({
  loader: () => ({ solutions: getAllWorkSolutions() }),
  head: () => ({
    meta: [
      { title: "Our Work — Solutions & Case Studies | Invonics Technologies" },
      {
        name: "description",
        content:
          "Explore Invonics Technologies' solutions — school asset systems, accounting, event RSVP and operations tools — with live demos you can try yourself.",
      },
      // Kept out of the index until all case studies + sitemap are finalised.
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Our Work — Solutions & Case Studies | Invonics Technologies" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/work") }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  const { solutions } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">● Our Work</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-4xl mb-6">
              Real products, running in production.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A selection of the platforms we&rsquo;ve engineered for schools, businesses and events
              across Kenya and East Africa. Several have a live demo you can explore yourself — no
              sign-up, no sales call.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <WorkCard solution={s} index={i + 1} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-20 text-center">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-semibold text-foreground hover:border-primary/50 transition-all"
              >
                Request a case study →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function WorkCard({ solution, index }: { solution: WorkSolution; index: number }) {
  const id = `WORK / ${String(index).padStart(2, "0")}`;
  const shot = solution.screenshots?.[0];

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      {/* Media + on-image chips */}
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary/40">
        {shot ? (
          <img
            src={shot.src}
            alt={`${solution.title} — product screenshot`}
            loading="lazy"
            className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-secondary/60 to-background">
            <span className="font-display text-2xl text-muted-foreground/50">{solution.title}</span>
          </div>
        )}
        {/* Category chip (top-left) */}
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
          {solution.category}
        </span>
        {/* Proof stat chip (on the image, bottom-left) */}
        <span className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
          {solution.statChip}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {id}
        </div>
        <h2 className="mt-2 font-display text-xl text-foreground">{solution.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{solution.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {solution.hasCaseStudy && (
            <Link
              to="/work/$slug"
              params={{ slug: solution.slug }}
              className="text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              View case study →
            </Link>
          )}
          {solution.demoUrl ? (
            <a
              href={solution.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {solution.demoLabel ?? "Try the live demo"} ↗
            </a>
          ) : (
            !solution.hasCaseStudy && (
              <Link
                to="/contact"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Request a walkthrough →
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
