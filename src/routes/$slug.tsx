import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getServiceBySlug, getAllPortfolioItems } from "@/lib/content";
import { StructuredData, buildFAQSchema } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) {
      throw notFound();
    }
    // Simple internal linking: Find portfolio items that mention this service
    // For now, we'll just pull a couple of items or all of them if the array is small.
    // In a real scenario, we might map slug -> service name explicitly.
    const allProjects = getAllPortfolioItems();
    return { service, allProjects };
  },
  head: ({ loaderData }) => {
    // If notFound was thrown, loaderData might be undefined during SSR error boundary
    if (!loaderData?.service) return { meta: [] };
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} | Invonics Technologies` },
        { name: "description", content: service.metaDescription || service.summary },
        { property: "og:title", content: service.title },
        { property: "og:description", content: service.summary },
        { rel: "canonical", href: `https://invonicstechnologies.com/${service.slug}` },
      ],
    };
  },
  component: ServiceLandingPage,
});

function ServiceLandingPage() {
  const { service, allProjects } = Route.useLoaderData();

  // Very basic matching for "Featured Projects". 
  // In a robust system, we would map the exact service name in portfolio.services
  // to the service page. For now, we just show a couple of projects to demonstrate the link engine.
  const featuredProjects = allProjects.slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="ProfessionalService"
        data={{
          name: service.title,
          description: service.summary,
          url: `https://invonicstechnologies.com/${service.slug}`,
        }}
      />
      {service.faqs && service.faqs.length > 0 && (
        <StructuredData type="FAQPage" data={buildFAQSchema(service.faqs)} />
      )}
      
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-5 mb-24">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              ● Service
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-4xl mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {service.summary}
            </p>
          </Reveal>
        </section>

        {/* Description & Features */}
        <section className="mx-auto max-w-7xl px-5 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal delay={100}>
              <h2 className="font-display text-3xl mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-12 p-8 rounded-2xl glass border border-border/60">
                <h3 className="font-display text-2xl mb-6">Key Benefits</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">✓</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="font-display text-3xl mb-6">Core Capabilities</h2>
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="p-6 rounded-2xl border border-border/60 bg-secondary/20">
                    <span className="text-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Phase 1 Lead Gen CTA */}
              <div className="mt-12 p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                <h3 className="font-display text-2xl text-foreground mb-4">Ready to start?</h3>
                <p className="text-muted-foreground mb-6">Book a free consultation to discuss how we can engineer a solution for your operations.</p>
                <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Project Inquiry
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Featured Projects (Internal Linking) */}
        {featuredProjects.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 mb-24 border-t border-border/60 pt-24">
            <Reveal>
              <div className="flex justify-between items-end mb-10">
                <h2 className="font-display text-3xl text-foreground">Featured Work</h2>
                <Link to="/portfolio" className="text-sm text-primary hover:underline">View all projects</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProjects.map(project => (
                  <Link key={project.slug} to={`/portfolio/${project.slug}`} className="block h-full">
                    <div className="rounded-2xl border border-border/60 glass p-8 transition-all hover:border-primary/50 h-full group">
                      <div className="mb-4 text-xs font-medium uppercase tracking-wider text-primary">
                        {project.industry}
                      </div>
                      <h3 className="mb-3 font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 mb-24">
            <Reveal>
              <h2 className="font-display text-3xl text-foreground mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/60 glass">
                    <h3 className="font-medium text-foreground text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
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
