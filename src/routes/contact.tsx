import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Booking } from "@/components/site/Booking";
import { FAQ } from "@/components/site/FAQ";
import { Socials } from "@/components/site/Socials";
import { Footer } from "@/components/site/Footer";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Invonics Technologies" },
      {
        name: "description",
        content:
          "Chat on WhatsApp, use the Invonics Assistant, or send an inquiry. Invonics Technologies helps you build intelligent digital ecosystems.",
      },
      { property: "og:title", content: "Contact — Invonics Technologies" },
      {
        property: "og:description",
        content: "WhatsApp, the Invonics Assistant, inquiries and socials — all in one place.",
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
        {/*
          Contact's own heading is an <h2> (correct as a homepage section).
          Standalone here it has no page-level heading, so give the page a
          real (visually hidden) <h1> rather than restyle the shared component.
        */}
        <h1 className="sr-only">Contact Invonics Technologies</h1>
        <Contact />
        <Booking />
        <FAQ />
        <Socials />
      </main>
      <Footer />
    </div>
  );
}
