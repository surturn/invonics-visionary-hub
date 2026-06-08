import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp, WA_LINK } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getServiceBySlug } from "@/lib/content";
import { StructuredData, buildFAQSchema } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) {
      throw notFound();
    }
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.service) return { meta: [] };
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} in Nairobi, Kenya | Invonics Technologies` },
        { name: "description", content: service.metaDescription || service.summary },
        { property: "og:title", content: `${service.title} in Nairobi, Kenya | Invonics Technologies` },
        { property: "og:description", content: service.summary },
        { rel: "canonical", href: `https://invonicstechnologies.com/services/${service.slug}` },
      ],
    };
  },
  component: ServiceLandingPage,
});

function ServiceLandingPage() {
  const { service } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="ProfessionalService"
        data={{
          name: service.title,
          description: service.summary,
          url: `https://invonicstechnologies.com/services/${service.slug}`,
        }}
      />
      {service.faqs && service.faqs.length > 0 && (
        <StructuredData type="FAQPage" data={buildFAQSchema(service.faqs)} />
      )}
      
      <Nav />
      <main className="pt-32 pb-24">
        {/* Breadcrumb & Hero Section */}
        <section className="mx-auto max-w-7xl px-5 mb-24">
          <Reveal>
            <nav className="flex text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-border">/</span>
                    <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-border">/</span>
                    <span className="text-foreground">{service.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-4xl mb-6">
              {service.title} in Nairobi, Kenya
            </h1>
            <div className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed space-y-4">
              <p>{service.summary}</p>
              <p>{service.description}</p>
            </div>
            
            <div className="mt-10">
              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </section>

        {/* Features & Benefits */}
        <section className="mx-auto max-w-7xl px-5 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal delay={100}>
              <div className="p-8 rounded-2xl glass border border-border/60 h-full">
                <h2 className="font-display text-2xl mb-6">Key Benefits</h2>
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
              <div className="h-full">
                <h2 className="font-display text-3xl mb-6">Core Capabilities</h2>
                <ul className="space-y-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="p-6 rounded-2xl border border-border/60 bg-secondary/20">
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

