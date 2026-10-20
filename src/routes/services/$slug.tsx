import { createFileRoute, redirect, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ServiceIntakeForm } from "@/components/site/ServiceIntakeForm";
import { ConsultationCTA } from "@/components/site/ConsultationCTA";
import { getServiceBySlug } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { generateBreadcrumbSchema, generateGraphSchema, SITE_URL } from "@/lib/schema";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    // Services without a dedicated page yet keep the old behaviour: send visitors
    // to the services section of the homepage. Unknown slugs are a real 404.
    if (service && !service.page) {
      throw redirect({ to: "/", hash: "services", statusCode: 301 });
    }
    if (!service || !service.page) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.service?.page) return { meta: [] };
    const { service } = loaderData;
    const description = service.metaDescription || service.summary;
    return {
      meta: [
        { title: service.page!.seoTitle },
        { name: "description", content: description },
        { property: "og:title", content: service.page!.headline },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "canonical", href: absoluteUrl(`/services/${service.slug}`) }],
    };
  },
  component: ServiceLandingPage,
});

function ServiceLandingPage() {
  const { service } = Route.useLoaderData();
  const page = service.page!;
  const url = absoluteUrl(`/services/${service.slug}`);

  const graph: any[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: service.metaDescription || service.summary,
      url,
      serviceType: service.title,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: ["Kenya", "East Africa"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title,
        itemListElement: page.offerings.map((o) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: o.name, description: o.body },
        })),
      },
    },
    generateBreadcrumbSchema([
      { name: "Home", item: absoluteUrl("/") },
      { name: "Services", item: absoluteUrl("/#services") },
      { name: service.title, item: url },
    ]),
  ];
  if (service.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateGraphSchema(graph)) }}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-5xl px-5 mb-20">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">● Service</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-4xl mb-6">
              {page.headline}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {page.intake ? (
                <a
                  href="#start"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Start a project
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Start a project
                </Link>
              )}
              <Link
                to="/portfolio"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-medium text-foreground/90 hover:bg-secondary/40 transition-colors"
              >
                See our work
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-5 mb-20">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">What we build</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {page.offerings.map((o) => (
                <div key={o.name} className="p-6 rounded-2xl glass border border-border/60">
                  <h3 className="font-display text-lg mb-2">{o.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-5 mb-20">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">Who it suits</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.suitedFor.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="mt-1 text-primary">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-5 mb-20">
          <Reveal>
            <h2 className="font-display text-3xl mb-8">How the work runs</h2>
            <ol className="space-y-5">
              {page.process.map((step, i) => (
                <li
                  key={step.name}
                  className="flex items-start gap-5 p-6 rounded-2xl border border-border/60 bg-secondary/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary font-display">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg mb-1">{step.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-5 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="h-full p-8 rounded-3xl border border-primary/30 bg-primary/5">
                <h2 className="font-display text-2xl mb-6">What you receive</h2>
                <ul className="space-y-3">
                  {page.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-foreground leading-relaxed">
                      <span className="mt-1 text-primary">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full p-8 rounded-3xl border border-border/60 bg-secondary/10">
                <h2 className="font-display text-2xl mb-6">What we do not promise</h2>
                <ul className="space-y-3">
                  {page.boundaries.map((b) => (
                    <li key={b} className="text-muted-foreground leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {page.proof && page.proof.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 mb-20">
            <Reveal>
              <h2 className="font-display text-3xl mb-3">Related skills from our own products</h2>
              <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                We are offering this as a pilot service. These are products we built ourselves, not
                client results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {page.proof.map((p) => (
                  <div key={p.name} className="p-6 rounded-2xl glass border border-border/60">
                    <h3 className="font-display text-lg mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {page.related && page.related.length > 0 && (
          <section className="mx-auto max-w-5xl px-5 mb-20">
            <Reveal>
              <h2 className="font-display text-3xl mb-6">Related work</h2>
              <ul className="flex flex-wrap gap-3">
                {page.related.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-foreground/90 hover:bg-secondary/40 transition-colors"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {service.faqs && service.faqs.length > 0 && (
          <section className="mx-auto max-w-4xl px-5 mb-20">
            <Reveal>
              <h2 className="font-display text-3xl mb-8">Questions we hear often</h2>
              <div className="space-y-4">
                {service.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-border/60 bg-secondary/10 p-5"
                  >
                    <summary className="cursor-pointer font-medium text-foreground list-none flex justify-between gap-4">
                      {f.q}
                      <span className="text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {page.intake && (
          <section id="start" className="mx-auto max-w-3xl px-5 mb-20 scroll-mt-28">
            <Reveal>
              <h2 className="font-display text-3xl mb-3">{page.intake.title}</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">{page.intake.intro}</p>
              <ServiceIntakeForm
                serviceSlug={service.slug}
                serviceTitle={service.title}
                form={page.intake}
              />
            </Reveal>
          </section>
        )}

        <section className="mx-auto max-w-4xl px-5">
          <Reveal>
            <ConsultationCTA
              title="Tell us what you want to build"
              description="Send a short brief. We will come back with questions, then a written proposal."
            />
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
