import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { TiltCard } from "@/components/site/MotionSystem";
import { getAllPortfolioItems } from "@/lib/content";
import { StructuredData } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio & Case Studies — Invonics Technologies" },
      {
        name: "description",
        content:
          "Explore our portfolio of software platforms, automation systems, and digital ecosystems engineered for modern organizations.",
      },
      { property: "og:title", content: "Portfolio & Case Studies — Invonics Technologies" },
      {
        property: "og:description",
        content: "Explore our latest engineering and automation projects.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://invonicstechnologies.com/portfolio" },
    ],
  }),
  loader: () => {
    return {
      projects: getAllPortfolioItems(),
    };
  },
  component: PortfolioIndex,
});

function PortfolioIndex() {
  const { projects } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebSite"
        data={{
          name: "Portfolio - Invonics Technologies",
          url: "https://invonicstechnologies.com/portfolio",
        }}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <span className="text-primary">●</span>&nbsp; Case Studies
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] mb-8">
              Work that works.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-16">
              A selection of our latest engineering, automation, and infrastructure projects.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 50}>
                <Link to={`/portfolio/${project.slug}`} className="block h-full">
                  <TiltCard className="group h-full rounded-2xl glass p-8 transition-all hover:ring-glow">
                    <div className="mb-4 text-xs font-medium uppercase tracking-wider text-primary">
                      {project.industry}
                    </div>
                    <h3 className="mb-3 font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.services.slice(0, 3).map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-border/80 bg-background/50 px-3 py-1 text-[11px] text-muted-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
