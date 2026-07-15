import React from 'react';

export function OrganizationJsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://invonicstechnologies.com/#organization",
        "name": "Invonics Technologies",
        "url": "https://invonicstechnologies.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://invonicstechnologies.com/logo.jpeg"
        },
        "description": "Invonics Technologies builds vertical operating systems, custom web/app software, e-commerce, inventory and event-management systems, payment integrations, and brand/motion design for African SMEs, with deep East African market expertise.",
        "slogan": "Engineering Tomorrow, Today",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "telephone": "+254786669572",
        "email": "invonicstechnologies@gmail.com",
        "founder": {
          "@type": "Person",
          "name": "Sydney Kamau"
        },
        "sameAs": [
          "https://www.instagram.com/invonicstechnologies",
          "https://www.tiktok.com/@invonicstechnologies",
          "https://www.facebook.com/invonicstechnologies",
          "https://x.com/invonicstech"
        ],
        "areaServed": ["Kenya", "East Africa"],
        "knowsAbout": [
          "Software Development",
          "Web Development",
          "E-commerce",
          "Inventory Management",
          "Event Management",
          "Payment Integration",
          "Motion Graphics"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://invonicstechnologies.com/#website",
        "url": "https://invonicstechnologies.com",
        "name": "Invonics Technologies",
        "publisher": {
          "@id": "https://invonicstechnologies.com/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
