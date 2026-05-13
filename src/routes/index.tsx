import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Showcase } from "@/components/site/Showcase";
import { Process } from "@/components/site/Process";
import { Vision } from "@/components/site/Vision";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Invonics Technologies — Engineering Tomorrow, Today." },
      {
        name: "description",
        content:
          "Invonics Technologies builds intelligent digital ecosystems — software, automation, branding, IT supply, Starlink installation and modern digital experiences.",
      },
      { property: "og:title", content: "Invonics Technologies — Engineering Tomorrow, Today." },
      {
        property: "og:description",
        content:
          "Software, infrastructure, automation and brand — engineered to interlock into one scalable ecosystem.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Showcase />
        <Process />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
