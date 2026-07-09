import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Services as ServicesComponent } from "@/components/site/Services";
import { StructuredData } from "@/components/seo/StructuredData";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services — Invonics Technologies" },
      {
        name: "description",
        content:
          "Discover our full range of services including web development, AI automation, mobile apps, and IT infrastructure.",
      },
      { property: "og:title", content: "Our Services — Invonics Technologies" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/services") }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebSite"
        data={{
          name: "Services - Invonics Technologies",
          url: absoluteUrl("/services"),
        }}
      />
      <Nav />
      <main className="pt-20 pb-24">
        <div className="pt-16">
          <ServicesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
