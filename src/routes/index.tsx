import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MotionSystem } from "@/components/site/MotionSystem";
import { StructuredData, buildFAQSchema } from "@/components/seo/StructuredData";
import { faqs } from "@/components/site/FAQ";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
const TrustBar = lazy(() =>
  import("@/components/site/TrustBar").then((m) => ({ default: m.TrustBar })),
);
const FeaturedSolutions = lazy(() =>
  import("@/components/site/FeaturedSolutions").then((m) => ({ default: m.FeaturedSolutions })),
);
import { Belief } from "@/components/site/Belief";
import { About } from "@/components/site/About";
import { Process } from "@/components/site/Process";

const Services = lazy(() =>
  import("@/components/site/Services").then((m) => ({ default: m.Services })),
);
const Work = lazy(() => import("@/components/site/Work").then((m) => ({ default: m.Work })));
const Team = lazy(() => import("@/components/site/Team").then((m) => ({ default: m.Team })));
const Footer = lazy(() => import("@/components/site/Footer").then((m) => ({ default: m.Footer })));

const Showcase = lazy(() =>
  import("@/components/site/Showcase").then((m) => ({ default: m.Showcase })),
);
const Vision = lazy(() => import("@/components/site/Vision").then((m) => ({ default: m.Vision })));
const Contact = lazy(() =>
  import("@/components/site/Contact").then((m) => ({ default: m.Contact })),
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
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionSystem>
      <div className="relative z-10 min-h-screen w-full overflow-x-hidden bg-background/80 text-foreground flex flex-col">
        <StructuredData
          type="LocalBusiness"
          data={{
            name: "Invonics Technologies",
            image: absoluteUrl("/og-image.jpg"),
            "@id": SITE_URL,
            url: SITE_URL,
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
        <FloatingWhatsApp />
        <main>
          <Hero />
          <Belief />
          <Process />
          <Suspense fallback={<SectionSpinner />}><FeaturedSolutions /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Services /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Work /></Suspense>
          <About />
          <Suspense fallback={<SectionSpinner />}><Team /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Showcase /></Suspense>
          <Suspense fallback={<SectionSpinner />}><TrustBar /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Vision /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Contact /></Suspense>
          <Suspense fallback={<SectionSpinner />}><FAQ /></Suspense>
          <Suspense fallback={<SectionSpinner />}><Socials /></Suspense>
        </main>
        <Suspense fallback={<SectionSpinner />}>
          <Footer />
        </Suspense>
      </div>
    </MotionSystem>
  );
}

function SectionSpinner() {
  return (
    <div className="py-24 flex justify-center opacity-50">
      <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}
