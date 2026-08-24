import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About as AboutComponent } from "@/components/site/About";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Invonics Technologies" },
      {
        name: "description",
        content:
          "Invonics Technologies is a premier engineering studio in Kenya, specializing in custom software, AI automation, and digital infrastructure.",
      },
      { property: "og:title", content: "About Us — Invonics Technologies" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="Organization"
        data={{
          name: "Invonics Technologies",
          url: SITE_URL,
          description:
            "Premier engineering studio specializing in custom software and AI automation.",
        }}
      />
      <Nav />
      <main className="pt-20 pb-24">
        {/*
          AboutComponent's own heading is an <h2> (correct when it's a
          section under the homepage's <h1>). Standalone here it has no
          page-level heading at all, so give the page a real (visually
          hidden) <h1> rather than restyle the shared component.
        */}
        <h1 className="sr-only">About Invonics Technologies</h1>
        {/* We reuse the existing About component from the homepage for now, but in a dedicated layout */}
        <div className="pt-16">
          <AboutComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
