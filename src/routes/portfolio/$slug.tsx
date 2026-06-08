import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getPortfolioBySlug, getRelatedPortfolioItems } from "@/lib/content";
import { StructuredData, buildCreativeWorkSchema } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getPortfolioBySlug(params.slug);
    if (!project) {
      throw new Error("Project not found");
    }
    const related = project.services[0] ? getRelatedPortfolioItems(project.services[0], project.slug) : [];
    return { project, related };
  },
  head: ({ loaderData }) => {
    // @ts-expect-error - bypassing type generation until tsr generate runs
    if (!loaderData?.project) return { meta: [] };
    // @ts-expect-error
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Case Study | Invonics Technologies` },
        { name: "description", content: project.metaDescription || project.summary },
        { property: "og:title", content: `${project.title} | Case Study` },
        { property: "og:description", content: project.summary },
        { rel: "canonical", href: `https://invonicstechnologies.com/portfolio/${project.slug}` },
      ],
    };
  },
  component: PortfolioDetail,
});

function PortfolioDetail() {
  const { project, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="CreativeWork"
        data={buildCreativeWorkSchema(
          project.title,
          project.summary,
          `https://invonicstechnologies.com/portfolio/${project.slug}`,
          project.publishedAt
        )}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-wider">
              <span className="text-primary">{project.industry}</span>
              <span className="h-1 w-1 rounded-full bg-border"></span>
              <span className="text-muted-foreground">{project.publishedAt}</span>
            </div>
            <h1 className="mb-6 font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              {project.title}
            </h1>
            <p className="mb-12 text-xl text-muted-foreground leading-relaxed">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 rounded-2xl border border-border/60 bg-secondary/30 p-8">
              <div className="md:col-span-2">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">The Problem</h3>
                <p className="text-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Services</h3>
                <ul className="space-y-2 text-foreground">
                  {project.services.map(s => <li key={s} className="flex items-center gap-2"><span className="text-primary text-xs">●</span> {s}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="space-y-16">
            <Reveal>
              <h2 className="mb-6 font-display text-3xl text-foreground">Our Approach</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.approach}</p>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 font-display text-3xl text-foreground">Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.technology.map(tech => (
                  <span key={tech} className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 font-display text-3xl text-foreground">Implementation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.implementation}</p>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 font-display text-3xl text-foreground">Results & Impact</h2>
              <ul className="space-y-4">
                {project.results.map(result => (
                  <li key={result} className="flex items-start gap-4 rounded-xl border border-border/60 bg-background p-4 shadow-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                    <span className="text-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mb-6 font-display text-3xl text-foreground">Lessons Learned</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.lessonsLearned}</p>
            </Reveal>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mx-auto mt-32 max-w-7xl px-5 border-t border-border/60 pt-20">
            <Reveal>
              <h2 className="mb-10 font-display text-3xl text-foreground">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.slice(0, 3).map(rel => (
                  <Link key={rel.slug} to={`/portfolio/${rel.slug}`} className="block h-full">
                    <div className="rounded-2xl border border-border/60 glass p-6 transition-all hover:border-primary/50 h-full">
                      <h3 className="mb-2 font-display text-xl text-foreground">{rel.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rel.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
