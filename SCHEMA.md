# Invonics Technologies Schema (JSON-LD) Guide

This guide explains how JSON-LD schema structured data is scaffolded and managed across `invonicstechnologies.com`.

## 1. Global Nodes (`__root.tsx`)
The `Organization` and `WebSite` nodes are injected globally into the `<head>` of `src/routes/__root.tsx`. This ensures search engines see canonical business data on every route.
- **Node Type:** `Organization` / `WebSite`
- **Location:** `src/routes/__root.tsx` -> `scripts` inside the `head()` definition.

## 2. Reusable Helper Module (`schema.ts`)
`src/lib/schema.ts` provides utility functions to generate schema objects for services, products, and creative works to keep things DRY.

### Adding an Offer / Service Schema
Use `generateOfferCatalogSchema(services)` to generate a catalog of `Service` offerings for the homepage or services index.
**Location:** `src/routes/services/index.tsx`
```tsx
import { generateOfferCatalogSchema } from "@/lib/schema";

// Inside head:
scripts: [
  {
    type: "application/ld+json",
    children: JSON.stringify(generateOfferCatalogSchema(servicesArray))
  }
]
```

### Adding a Software Application (Product) Schema
Use `generateSoftwareApplicationSchema(product)` to generate structured data for a specific product like the *RSVP & Event Management System*.
**Location:** `src/routes/solutions/$slug.tsx`

### Adding a Portfolio / Case Study Schema
Use `generateCreativeWorkSchema(item)` to generate structured data for portfolio pieces or case studies.
**Location:** `src/routes/portfolio/$slug.tsx` or `src/routes/work/$slug.tsx`

### Adding a Breadcrumb Schema
Use `generateBreadcrumbSchema(items)` to show hierarchy across nested routes.
**Location:** Inside the `head()` of any nested route.

---

## Validating Your Schema
Whenever you add or modify structured data, you MUST validate it using:
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)

