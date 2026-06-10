import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getIndustryBySlug } from "@/lib/content";
import { StructuredData } from "@/components/seo/StructuredData";
import { ConsultationCTA } from "@/components/site/ConsultationCTA";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const industry = getIndustryBySlug(params.slug);
    if (!industry) {
      throw notFound();
    }
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.industry) return { meta: [] };
    const { industry } = loaderData;
    return {
      meta: [
        { title: `${industry.title} | Invonics Technologies` },
        { name: "description", content: industry.metaDescription || industry.summary },
        { property: "og:title", content: industry.title },
      ],
      links: [
        { rel: "canonical", href: `https://invonicstechnologies.com/solutions/${industry.slug}` },
      ],
    };
  },
  component: IndustryLandingPage,
});

function IndustryLandingPage() {
  const { industry } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebSite"
        data={{
          name: industry.title,
          description: industry.summary,
          url: `https://invonicstechnologies.com/solutions/${industry.slug}`,
        }}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-7xl px-5 mb-24 text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              ● Industry Solution
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-4xl mx-auto mb-6">
              {industry.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {industry.summary}
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-7xl px-5 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <Reveal>
              <div className="p-8 md:p-10 rounded-3xl border border-border/60 bg-secondary/10">
                <h2 className="font-display text-3xl mb-8">The Challenges</h2>
                <ul className="space-y-6">
                  {industry.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive text-sm font-bold">
                        ✕
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="p-8 md:p-10 rounded-3xl border border-primary/30 bg-primary/5">
                <h2 className="font-display text-3xl mb-8">Our Solutions</h2>
                <ul className="space-y-6">
                  {industry.solutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                        ✓
                      </span>
                      <span className="text-foreground leading-relaxed font-medium">
                        {solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 mb-24">
          <Reveal>
            <h2 className="font-display text-3xl text-center mb-10">Business Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industry.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl glass border border-border/60 text-center flex flex-col items-center justify-center"
                >
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-4xl px-5">
          <Reveal>
            <ConsultationCTA
              title="Transform your operations"
              description="Let's discuss how we can engineer a custom ecosystem for your business."
            />
          </Reveal>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
