import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp, WA_LINK } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getWorkBySlug } from "@/lib/work";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const solution = getWorkBySlug(params.slug);
    if (!solution || !solution.hasCaseStudy) {
      throw notFound();
    }
    return { solution };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.solution) return { meta: [] };
    const { solution } = loaderData;
    return {
      meta: [
        { title: `${solution.title} — Case Study | Invonics Technologies` },
        { name: "description", content: solution.metaDescription || solution.summary },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: `${solution.title} — Case Study | Invonics Technologies` },
        { property: "og:description", content: solution.summary },
      ],
      links: [{ rel: "canonical", href: absoluteUrl(`/work/${solution.slug}`) }],
    };
  },
  component: WorkDetail,
});

function WorkDetail() {
  const { solution } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-5">
          {/* Breadcrumb */}
          <Reveal>
            <nav className="mb-8 flex text-sm text-muted-foreground" aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-border">
                  /
                </li>
                <li>
                  <Link to="/work" className="hover:text-primary transition-colors">
                    Work
                  </Link>
                </li>
                <li aria-hidden className="text-border">
                  /
                </li>
                <li aria-current="page" className="text-foreground">
                  {solution.title}
                </li>
              </ol>
            </nav>

            <div className="mb-4 text-xs uppercase tracking-wider text-primary">
              {solution.category}
            </div>
            <h1 className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              {solution.title}
            </h1>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">{solution.summary}</p>

            {solution.demoUrl && (
              <a
                href={solution.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                {solution.demoLabel ?? "Try the live demo"} ↗
              </a>
            )}
          </Reveal>

          {/* Screenshots */}
          {solution.screenshots && solution.screenshots.length > 0 && (
            <Reveal delay={100}>
              <div className="mt-14 space-y-4">
                {solution.screenshots.map((shot) => (
                  <figure key={shot.src} className="overflow-hidden rounded-2xl border border-border/60">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                    <figcaption className="border-t border-border/60 bg-secondary/20 px-4 py-3 text-sm text-muted-foreground">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          <div className="mt-16 space-y-16">
            {solution.challenge && (
              <Reveal>
                <h2 className="mb-4 font-display text-3xl text-foreground">The Challenge</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{solution.challenge}</p>
              </Reveal>
            )}

            {solution.approach && (
              <Reveal>
                <h2 className="mb-4 font-display text-3xl text-foreground">Our Approach</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{solution.approach}</p>
              </Reveal>
            )}

            {solution.workflow && solution.workflow.length > 0 && (
              <Reveal>
                <h2 className="mb-6 font-display text-3xl text-foreground">How it works</h2>
                <ol className="space-y-4">
                  {solution.workflow.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-muted-foreground leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {solution.capabilities && solution.capabilities.length > 0 && (
              <Reveal>
                <h2 className="mb-6 font-display text-3xl text-foreground">Capabilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/20 p-4"
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-foreground">{cap}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {solution.outcomes && solution.outcomes.length > 0 && (
              <Reveal>
                <h2 className="mb-6 font-display text-3xl text-foreground">Outcomes</h2>
                <ul className="space-y-4">
                  {solution.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        ✓
                      </span>
                      <span className="text-foreground">{o}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {solution.technology && solution.technology.length > 0 && (
              <Reveal>
                <h2 className="mb-6 font-display text-3xl text-foreground">Technology</h2>
                <div className="flex flex-wrap gap-3">
                  {solution.technology.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Closing CTA */}
          <Reveal>
            <div className="mt-20 rounded-3xl border border-border/60 bg-secondary/20 p-8 text-center">
              <h2 className="font-display text-2xl text-foreground">Want something like this?</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                We build production systems for schools, businesses and events across East Africa.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Start a conversation →
                </Link>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-semibold text-foreground hover:border-primary/50 transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
