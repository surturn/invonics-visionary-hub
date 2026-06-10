import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MotionSystem } from "@/components/site/MotionSystem";
import { StructuredData, buildFAQSchema } from "@/components/seo/StructuredData";
import { faqs } from "@/components/site/FAQ";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
const Ecosystem = lazy(() =>
  import("@/components/site/Ecosystem").then((m) => ({ default: m.Ecosystem })),
);
const About = lazy(() => import("@/components/site/About").then((m) => ({ default: m.About })));
const Services = lazy(() =>
  import("@/components/site/Services").then((m) => ({ default: m.Services })),
);
const Work = lazy(() => import("@/components/site/Work").then((m) => ({ default: m.Work })));
const Team = lazy(() => import("@/components/site/Team").then((m) => ({ default: m.Team })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));
const FloatingWhatsApp = lazy(() =>
  import("@/components/site/FloatingWhatsApp").then((m) => ({ default: m.FloatingWhatsApp })),
);

const Showcase = lazy(() =>
  import("@/components/site/Showcase").then((m) => ({ default: m.Showcase })),
);
const Process = lazy(() =>
  import("@/components/site/Process").then((m) => ({ default: m.Process })),
);
const Vision = lazy(() => import("@/components/site/Vision").then((m) => ({ default: m.Vision })));
const Contact = lazy(() =>
  import("@/components/site/Contact").then((m) => ({ default: m.Contact })),
);
const Booking = lazy(() =>
  import("@/components/site/Booking").then((m) => ({ default: m.Booking })),
);
const FAQ = lazy(() => import("@/components/site/FAQ").then((m) => ({ default: m.FAQ })));
const Socials = lazy(() =>
  import("@/components/site/Socials").then((m) => ({ default: m.Socials })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Software Development & AI Automation Company in Nairobi, Kenya | Invonics Technologies",
      },
      {
        name: "description",
        content:
          "Invonics Technologies builds custom software, AI automation, web platforms and brand systems for businesses and schools in Nairobi, Kenya and across East Africa. Get a free consultation.",
      },
      {
        name: "keywords",
        content:
          "software development Nairobi, custom software Kenya, AI automation Nairobi, web development company Kenya, mobile app development Nairobi, M-Pesa integration Kenya, branding company Nairobi, motion graphics Kenya, management systems Kenya, workflow automation Nairobi, school management software Kenya, event management software Kenya, ROI tracking software Kenya, digital transformation East Africa",
      },
      {
        property: "og:title",
        content:
          "Software Development & AI Automation Company in Nairobi, Kenya | Invonics Technologies",
      },
      {
        property: "og:description",
        content:
          "Invonics Technologies builds custom software, AI automation, web platforms and brand systems for businesses and schools in Nairobi, Kenya and across East Africa. Get a free consultation.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://invonicstechnologies.com/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionSystem>
      <div className="relative z-10 min-h-screen bg-background/80 text-foreground">
        <StructuredData
          type="LocalBusiness"
          data={{
            name: "Invonics Technologies",
            image: "https://invonicstechnologies.com/og-image.jpg",
            "@id": "https://invonicstechnologies.com",
            url: "https://invonicstechnologies.com",
            telephone: "+254786669572",
            address: {
              "@type": "PostalAddress",
              streetAddress: "259a, Njambi road, Oreteti Heights, Ongata Rongai",
              addressLocality: "Nairobi",
              addressRegion: "Nairobi",
              postalCode: "00100",
              addressCountry: "KE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -1.286389,
              longitude: 36.817223,
            },
          }}
        />
        <StructuredData type="FAQPage" data={buildFAQSchema(faqs)} />
        <Nav />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <Ecosystem />
            <About />
            <Services />
            <Work />
            <Team />
            <Showcase />
            <Process />
            <Vision />
            <Contact />
            <Booking />
            <FAQ />
            <Socials />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <FloatingWhatsApp />
        </Suspense>
      </div>
    </MotionSystem>
  );
}
