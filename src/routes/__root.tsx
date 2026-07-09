import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/site/Theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Invonics Technologies — Engineering Tomorrow, Today." },
      {
        name: "description",
        content:
          "Invonics Technologies engineers software, infrastructure, automation and brand systems for future-ready organizations.",
      },
      { name: "author", content: "Invonics Technologies" },
      { property: "og:title", content: "Invonics Technologies — Engineering Tomorrow, Today." },
      {
        property: "og:description",
        content:
          "A premium technology studio for software, connectivity, automation and identity systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Invonics Technologies" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:alt", content: "Invonics Technologies — Engineering Tomorrow, Today." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@invonics" },
      { name: "twitter:image", content: "/og-image.jpg" },
      { name: "theme-color", content: "#0b0d12" },
      { name: "p:domain_verify", content: "b3a1d9ae250081bdf8993cbaa6bd9cf0" },
    ],
    links: [
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preload", as: "image", href: "/hero-bg.jpg", fetchPriority: "high" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://invonicstechnologies.com/#organization",
              name: "Invonics Technologies",
              url: "https://invonicstechnologies.com",
              logo: {
                "@type": "ImageObject",
                url: "https://invonicstechnologies.com/logo.jpeg",
              },
              description:
                "Invonics Technologies builds vertical operating systems, custom web/app software, e-commerce, inventory and event-management systems, payment integrations, and brand/motion design for African SMEs, with deep East African market expertise.",
              slogan: "Engineering Tomorrow, Today",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressCountry: "KE",
              },
              telephone: "+254786669572",
              email: "invonicstechnologies@gmail.com",
              founder: {
                "@type": "Person",
                name: "Sydney Kamau",
              },
              sameAs: [
                "https://facebook.com/Invonics",
                "https://instagram.com/invonicstechnologies",
                "https://tiktok.com/@invonicstechnologies",
                "https://x.com/invonicstech",
              ],
              areaServed: ["Kenya", "East Africa"],
              knowsAbout: [
                "Software Development",
                "Web Development",
                "E-commerce",
                "Inventory Management",
                "Event Management",
                "Payment Integration",
                "Motion Graphics",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://invonicstechnologies.com/#website",
              url: "https://invonicstechnologies.com",
              name: "Invonics Technologies",
              publisher: {
                "@id": "https://invonicstechnologies.com/#organization",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('invonics-theme');if(t!=='light'&&t!=='dark'){t='dark';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.classList.toggle('light',t==='light');}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"37fb9c571acf6d2eae2ac31a09d0eea5"})});`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
