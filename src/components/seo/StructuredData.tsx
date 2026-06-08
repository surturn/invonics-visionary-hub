export type SchemaType =
  | "Organization"
  | "LocalBusiness"
  | "WebSite"
  | "ProfessionalService"
  | "FAQPage"
  | "Article"
  | "CreativeWork";

interface StructuredDataProps {
  type: SchemaType;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Utility builders for common schemas

export const buildOrganizationSchema = () => ({
  name: "Invonics Technologies",
  url: "https://invonicstechnologies.com",
  logo: "https://invonicstechnologies.com/logo.png",
  sameAs: [
    "https://twitter.com/invonics",
    "https://linkedin.com/company/invonics"
  ],
});

export const buildCreativeWorkSchema = (
  title: string,
  summary: string,
  url: string,
  datePublished?: string
) => ({
  name: title,
  description: summary,
  url,
  author: {
    "@type": "Organization",
    name: "Invonics Technologies",
  },
  ...(datePublished && { datePublished }),
});

export const buildFAQSchema = (faqs: { q: string; a: string }[]) => ({
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});
