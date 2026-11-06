import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { getAllIndustries, getAllPortfolioItems } from "@/lib/content";

// Plain crawlable links to every case study and industry page. The cinematic
// Work rail above is visual-only, so without this the deeper pages were only
// reachable through /portfolio (and /solutions/restaurants not at all).
export function CaseStudyLinks() {
  const projects = getAllPortfolioItems();
  const industries = getAllIndustries();

  return (
    <section className="relative border-t border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="label-mono mb-4">
            <span className="text-primary">●</span>&nbsp; Case Studies
          </div>
          <h2 className="mb-10 font-display text-3xl text-foreground md:text-4xl">
            Read how each project was built.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to="/portfolio/$slug"
              params={{ slug: project.slug }}
              className="group block h-full rounded-2xl border border-border/60 glass p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-primary/90">
                {project.industry}
              </div>
              <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to="/solutions/$slug"
              params={{ slug: industry.slug }}
              className="text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
            >
              {industry.title} →
            </Link>
          ))}
          <Link
            to="/portfolio"
            className="text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
          >
            All work →
          </Link>
        </div>
      </div>
    </section>
  );
}
