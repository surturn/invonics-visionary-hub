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
      { title: "Contact — Invonics Technologies" },
      {
        name: "description",
        content:
          "Chat on WhatsApp, book a strategy call, or send an inquiry. Invonics Technologies helps you build intelligent digital ecosystems.",
      },
      { property: "og:title", content: "Contact — Invonics Technologies" },
      {
        property: "og:description",
        content: "WhatsApp, Calendly, inquiries and socials — all in one place.",
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
