import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Booking } from "@/components/site/Booking";
import { FAQ } from "@/components/site/FAQ";
import { Socials } from "@/components/site/Socials";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Nairobi Tech Ecosystem | Invonics" },
      {
        name: "description",
        content:
          "Discuss intelligent digital solutions, React Native development Nairobi, and Docker containerization and server infrastructure. Contact us to scale efficiently.",
      },
      { property: "og:title", content: "Contact the Nairobi Tech Ecosystem | Invonics" },
      {
        property: "og:description",
        content:
          "Discuss intelligent digital solutions, React Native development Nairobi, and Docker containerization and server infrastructure. Contact us to scale efficiently.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-20">
        <Contact />
        <Booking />
        <FAQ />
        <Socials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
