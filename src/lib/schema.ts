export const SITE_URL = "https://invonicstechnologies.com";

export const LOGO_URL = `${SITE_URL}/logo.jpeg`; 

export const FOUNDER_NAME = "Sydney Kamau"; 

export const BASE_ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Invonics Technologies",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
  },
  description: "Invonics Technologies builds vertical operating systems, custom web/app software, e-commerce, inventory and event-management systems, payment integrations, and brand/motion design for African SMEs, with deep East African market expertise.",
  slogan: "Engineering Tomorrow, Today",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE"
  },
  telephone: "+254786669572",
  email: "invonicstechnologies@gmail.com",
  founder: {
    "@type": "Person",
    name: FOUNDER_NAME
  },
  sameAs: [
    "https://facebook.com/Invonics",
    "https://instagram.com/invonicstechnologies",
    "https://tiktok.com/@invonicstechnologies",
    "https://x.com/invonicstech"
  ],
  areaServed: ["Kenya", "East Africa"],
  knowsAbout: [
    "Software Development",
    "Web Development",
    "E-commerce",
    "Inventory Management",
    "Event Management",
    "Payment Integration",
    "Motion Graphics"
  ]
};

export const BASE_WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Invonics Technologies",
  publisher: {
    "@id": `${SITE_URL}/#organization`
  }
};

export function generateOfferCatalogSchema(services: any[]) {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/#offercatalog`,
    name: "Invonics Technologies Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@id": `${SITE_URL}/#organization`
        },
        areaServed: ["Kenya", "East Africa"]
      }
    }))
  };
}

export function generateSoftwareApplicationSchema(product: any) {
  const schema: any = {
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.description,
    provider: {
      "@id": `${SITE_URL}/#organization`
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`
    }
  };

  if (product.offers && product.offers.length > 0) {
    schema.offers = product.offers.map((offer: any) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "KES"
    }));
  }

  return schema;
}

export function generateCreativeWorkSchema(item: any) {
  return {
    "@type": item.isProduct ? "WebApplication" : "CreativeWork",
    name: item.name,
    description: item.description,
    creator: {
      "@id": `${SITE_URL}/#organization`
    },
    about: item.keywords || item.category,
    url: item.url || `${SITE_URL}/portfolio/${item.slug}` 
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.item
    }))
  };
}

export function generateGraphSchema(nodes: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
  };
}
