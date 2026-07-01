import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp, WA_LINK } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Coming Soon | Invonics Technologies" },
      {
        name: "description",
        content:
          "Our portfolio of software platforms, automation systems and brand work for organizations in Nairobi and across East Africa is being prepared. Request a case study in the meantime.",
      },
      // Placeholder page — keep it out of the index until the real portfolio ships.
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Our Work — Coming Soon | Invonics Technologies" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/work") }],
  }),
  component: WorkComingSoon,
});

function WorkComingSoon() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
              Coming soon
            </div>

            <h1 className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04]">
              Our Work
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              We&rsquo;re putting together a proper case-study portfolio of the platforms,
              automation systems and brand work we&rsquo;ve shipped for schools, SMEs and
              institutions across Nairobi and East Africa. This page is still under development.
            </p>

            <p className="mt-4 text-base text-muted-foreground">
              Want to see relevant work for your sector right now? Ask us directly and we&rsquo;ll
              send a tailored case study.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Request a case study →
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

            <div className="mt-12">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to home
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
