import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Ecosystem } from "@/components/site/Ecosystem";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MotionSystem } from "@/components/site/MotionSystem";

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
    <MotionSystem>
      <div className="relative z-10 min-h-screen bg-background/80 text-foreground">
        <Nav />
        <main>
          <Hero />
          <Ecosystem />
          <About />
          <Services />
          <Work />
          <Suspense fallback={null}>
            <Showcase />
            <Process />
            <Vision />
            <Contact />
            <Booking />
            <FAQ />
            <Socials />
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionSystem>
  );
}
