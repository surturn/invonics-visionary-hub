import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Booking } from "@/components/site/Booking";
import { FAQ } from "@/components/site/FAQ";
import { Socials } from "@/components/site/Socials";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Nairobi Tech Ecosystem | Invonics Technologies" },
      {
        name: "description",
        content:
          "Contact our React Native development Nairobi experts. Whether you need custom backend systems in Westlands or across Kenya, we are here to help your business.",
      },
      { property: "og:title", content: "Contact the Nairobi Tech Ecosystem | Invonics Technologies" },
      {
        property: "og:description",
        content:
          "Contact our React Native development Nairobi experts. Whether you need custom backend systems in Westlands or across Kenya, we are here to help your business.",
      },
    ],
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
