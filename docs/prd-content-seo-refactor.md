# PRD: Content → Routing → SEO Architecture Refactor

**Status:** Draft · **Owner:** _TBD_ · **Date:** 2026-07-01
**Type:** Internal engineering / technical-debt initiative

---

## 1. Summary

The Invonics marketing site renders content-driven pages (services, portfolio case studies, industry solutions, blog) from typed `.ts` files, discovered at build/runtime and rendered through dynamic `$slug` routes. The core content spine is sound, but the **boundaries around it duplicate the same knowledge across many files** — the base URL lives in ~15 source locations, content discovery is reimplemented twice (once for pages, once for SEO artifacts), structured-data schemas are hand-assembled at each call site, and page chrome is copy-pasted into every route.

This refactor consolidates that scattered knowledge into single-owner modules **and, in the same pass, closes the local-SEO gaps that directly limit rankings and visibility in Nairobi/Kenya**. It is primarily a **structural refactor** — no new user-facing pages, no visual redesign — but the driving business goal is explicit: **great UX while maximizing SEO, search rankings, and online visibility/availability for the Invonics portfolio in Nairobi and Kenya.** Every decision below uses that goal as the tiebreaker.

The payoff: (1) eliminate a class of *silent SEO bugs* where the sitemap/llms artifacts drift from the live routes and pages quietly go un-indexed; (2) guarantee canonical-URL correctness so ranking signal isn't lost to a mis-pathed host; (3) extend the local-business structured data that currently exists **only on the homepage** to the money pages (service and solution landing pages), so Google can attach location + `areaServed` signals to the exact pages targeting "…in Nairobi, Kenya" queries; (4) cut per-page edit cost so the small team ships content and layout changes without touching 6–10 files.

Audience: the engineer(s) maintaining this codebase — currently a solo/small team.

---

## 2. Problem Statement

The same fact lives in multiple places, so a one-line intent becomes a multi-file change, and the copies drift silently.

**Concrete scenario — the drift bug this is really about:**
A new content type `guides/` is added, or the `industries/` directory is renamed to `solutions/` to match its URL. The site renders correctly because `lib/content.ts` (Vite `import.meta.glob`) picks it up. But `scripts/generate-seo.ts` discovers content independently via `fs.readdirSync` and encodes the `industries → /solutions` URL mapping separately. The sitemap.xml, llms.txt, and llms-full.txt now silently omit (or mis-path) the new content. There is **no error, no failing test, no TypeScript complaint** — the gap only surfaces weeks later as missing search/AI-crawler coverage. For a site whose stated purpose is SEO and AI-authority, a sitemap that disagrees with the live routes is the most expensive possible defect and the current structure makes it the most likely one.

**Supporting pain points:**
- The production domain `https://invonicstechnologies.com` is hardcoded in ~15 source locations (canonical tags, OG tags, JSON-LD, the SEO script). A domain/staging change is a find-replace where one miss ships a wrong canonical.
- Every route re-implements the page shell (`Nav` / `main` / `Footer` / `FloatingWhatsApp`), and the copies have already drifted (e.g. `solutions/$slug` omits the WhatsApp widget others include).
- `StructuredData` hides almost nothing — each caller hand-builds the schema.org payload, typed as `Record<string, any>`, so wrong fields pass type-checking.
- Portfolio "related projects" matches on free-text service-name string equality; renaming a service silently breaks relatedness. Error handling is inconsistent (portfolio throws a 500-flavored `Error`; services/solutions throw a proper `notFound()`).

---

## 3. Goals

Framed as outcomes, ordered so the SEO/visibility goal leads:

- **G1 — Maximum crawlable coverage; zero silent drift.** Sitemap, llms.txt, and robots are derived from the same source of truth as the rendered routes, so every published page is discoverable and no page ever goes missing from the sitemap without an error. (Visibility + availability.)
- **G2 — Correct ranking signals on every page.** Canonical URLs and OG/JSON-LD URLs are always right (one base-URL owner), and crawlers get a proper `404` (not `500`) for dead URLs so crawl budget and de-indexing behave correctly.
- **G3 — Local-SEO signal on the pages that need it.** The `LocalBusiness`/NAP + `areaServed` (Nairobi, Kenya, East Africa) signal — today present only on the homepage — reaches the service and solution landing pages that target local-intent queries, plus `BreadcrumbList` schema on nested pages for richer SERP display. (Rankings for "…in Nairobi, Kenya".)
- **G4 — Change cost stays low without hurting UX.** Adding/changing a content type is a single registry edit; global chrome (`Nav`/`Footer`/WhatsApp) is owned once so it stays consistent across every page (fixing the current `solutions` inconsistency) — consistency users feel and crawlers reward.
- **G5 — Invalid structured data & broken internal links are caught before deploy**, via types and a build-time reference check, protecting internal linking (a ranking + UX factor).
- **G6 — Zero user-facing or SEO regression.** Rendered HTML, meta tags, canonical URLs, and existing JSON-LD are provably equivalent before/after for existing pages (any change is additive).

---

## 4. Non-Goals / Out of Scope

- **No visual/UX redesign.** Layout, styling, copy, and component appearance stay identical.
- **No new pages, routes, or content.** This is restructuring existing behavior only.
- **No CMS / headless-CMS migration.** Content stays as typed `.ts` files in `src/content/`.
- **No changes to the `src/components/ui/` shadcn primitives** — out of scope entirely.
- **No SSR/rendering-strategy change**, no TanStack Start upgrade, no build-pipeline overhaul beyond what G1 requires.
- **No analytics/tracking additions.** Success is measured against the existing codebase, not new instrumentation.
- **Not a full test-suite build-out** — only the minimal checks needed to guard G1/G4 (see Open Questions).

---

## 5. User Stories / Use Cases

Here "user" is the developer/maintainer, plus one crawler-facing flow.

- **US-1 (add content):** As a maintainer, I want to add a new service by dropping one `.ts` file into `src/content/services/`, so that the page, the sitemap entry, and the llms.txt entry all appear without further edits.
- **US-2 (rename mapping):** As a maintainer, I want the `industries → /solutions` URL mapping stated in exactly one place, so that renaming or re-pathing a content type can't leave the sitemap pointing at dead URLs.
- **US-3 (change domain):** As a maintainer moving to a staging/preview domain, I want to change the base URL in one config value, so that every canonical link, OG tag, and JSON-LD URL updates consistently.
- **US-4 (global layout change):** As a maintainer, I want to add a global element (e.g. an announcement bar) by editing one shell component, so that it appears on every page without a 10-file edit.
- **US-5 (structured data):** As a maintainer, I want to emit valid structured data by passing domain objects (a service, a path), so that I don't need to memorize schema.org field names or risk invalid payloads.
- **US-6 / edge case (bad URL):** As a visitor or crawler hitting `/portfolio/does-not-exist`, I want a proper 404 response, so that crawlers de-index it correctly instead of seeing a 500.
- **US-7 / failure flow (dangling reference):** As a maintainer who renamed a service, I want the build (or a check) to flag portfolio items referencing the old service name, so that broken "related projects" links are caught before deploy rather than silently rendering empty.

---

## 6. Requirements

### Functional Requirements

**Content registry (single source of truth) — addresses G1, G2, G3**
- **FR-1:** A single module MUST own the set of content types and their `{ contentDir, routePrefix }` mappings, including the non-obvious `industries → /solutions` mapping stated exactly once.
- **FR-2:** `lib/content.ts` accessors (page rendering) MUST derive their content-type/route knowledge from the registry in FR-1.
- **FR-3:** `scripts/generate-seo.ts` MUST derive the list of `{ routePrefix, slug }` URLs from the same registry / content source used by rendering, rather than independently re-scanning the filesystem with its own hardcoded path mappings.
- **FR-4:** Adding a new content directory + registry entry MUST cause the corresponding URLs to appear in sitemap.xml and llms.txt with no other code changes (verifies US-1).

**Base URL & canonical construction — addresses G2**
- **FR-5:** The production base URL MUST be defined once (config constant or env var) and imported by all consumers: route `head` blocks, `StructuredData`/schema builders, and the SEO generation script.
- **FR-6:** A single helper MUST construct canonical/absolute URLs from a path, used by every route that emits a canonical link or OG URL.

**Page shell — addresses G2, G4-adjacent consistency**
- **FR-7:** A single `PageShell` component MUST own the shared chrome (`min-h-screen` wrapper, `Nav`, `main`, `Footer`, `FloatingWhatsApp`), and all content routes MUST render their body through it.
- **FR-8:** After FR-7, the WhatsApp widget and footer MUST appear consistently on all content pages (fixes the current `solutions/$slug` omission).

**Structured data — addresses G4**
- **FR-9:** Structured-data emission MUST expose one typed function/component per schema type in use (e.g. `ServiceSchema`, `CreativeWorkSchema`, `FaqSchema`, `WebSiteSchema`), each taking domain-level typed inputs rather than a `Record<string, any>`.
- **FR-10:** Call sites MUST NOT hand-assemble `@context`/`@type` or raw schema.org field names; that knowledge lives inside the schema module.

**Local SEO enrichment — addresses G3 (the ranking-driver added for the business goal)**
- **FR-15:** The `LocalBusiness` NAP + geo (name, telephone, full `PostalAddress`, `GeoCoordinates`) MUST be defined **once** with a stable `@id` (e.g. `https://invonicstechnologies.com#business`) — reusing the values currently inline in `index.tsx` — so no page re-declares the address by hand.
- **FR-16:** Service landing pages (`/services/$slug`) MUST emit `ProfessionalService` structured data that references the business via `provider: { "@id": … }` and includes `areaServed` (Nairobi, Kenya, and East Africa), rather than the current bare `{ name, description, url }`. Solution pages (`/solutions/$slug`) MUST likewise carry `areaServed`.
- **FR-17:** Nested pages that already render a visual breadcrumb (e.g. `/services/$slug`) MUST also emit a `BreadcrumbList` JSON-LD schema so the breadcrumb can appear in search results; the breadcrumb trail MUST be generated from route data, not hand-written per page.
- **FR-18:** Per-content-type `<title>`/description **templates** (e.g. the deliberate `"{title} in Nairobi, Kenya | Invonics Technologies"` pattern for services vs. the case-study pattern for portfolio) MUST be preserved and owned in one place per type when `head` construction is centralized — centralization MUST NOT flatten the intentional local-keyword suffixes.
- **FR-19 (cleanup):** The stale one-off generators `patch-services.js` and `scripts/create-services.ts`, which duplicate content now owned by `src/content/*`, MUST be removed (or clearly quarantined) so they can't reintroduce drift. _Confirm neither is wired into `build`/`postinstall` before deletion — a quick grep shows they are not in `package.json` scripts._

**Cross-references & error handling — addresses G4, US-6, US-7**
- **FR-11:** Portfolio→service relatedness MUST resolve via a stable identifier (service slug) rather than free-text service-name string equality.
- **FR-12:** All `$slug` routes MUST throw `notFound()` (proper 404) for missing content; the portfolio route MUST stop throwing a bare `Error`.
- **FR-13:** The `@ts-expect-error` suppressions in `portfolio/$slug.tsx` MUST be removed once loader types are correct (no new suppressions introduced).
- **FR-14 (optional, ties to US-7):** The SEO/build step SHOULD validate that every portfolio service reference resolves to a known service, failing loudly on a dangling reference.

### Non-Functional Requirements

- **NFR-1 (equivalence):** For every existing URL, the post-refactor rendered `<title>`, meta description, canonical href, OG tags, and JSON-LD MUST be byte-equivalent (or provably semantically equivalent) to pre-refactor output. This is the primary safety bar.
- **NFR-2 (build parity):** `npm run build` (which runs `generate-seo`) MUST succeed and produce a sitemap/llms/robots set covering the same URLs as today, plus correct handling of any type added during the change.
- **NFR-3 (no runtime cost regression):** No change to bundle strategy that increases initial payload; the shell extraction and registry are compile-time/static.
- **NFR-4 (type safety):** The refactor MUST NOT increase the count of `any` / `@ts-expect-error` / `@ts-ignore` in the touched files; net count should decrease.
- **NFR-5 (lint/format):** Code MUST pass existing `eslint` and `prettier` configs.

---

## 7. Success Metrics

Measured against the codebase immediately after merge (no new analytics required):

- **M1 — Base-URL locations:** occurrences of the literal `invonicstechnologies.com` in `src/` drop from ~15 to **1** (the config definition). _(Measure: `grep -r invonicstechnologies.com src/ | wc -l`.)_
- **M2 — Discovery engines:** number of independent content-discovery implementations drops from **2 → 1** (SEO script no longer has its own `readdirSync` path-mapping block).
- **M3 — Shell duplication:** the `min-h-screen … Nav … Footer … FloatingWhatsApp` shell appears in **1** component, not 10 routes.
- **M4 — Drift test:** a deliberately added throwaway content file appears in both a live route and the generated sitemap with no code change beyond the file + registry entry (proves US-1/FR-4); reverted after verification.
- **M5 — Type-safety delta:** `@ts-expect-error` count in `src/routes/` is **0**; `Record<string, any>` removed from the structured-data interface.
- **M6 — Regression:** diff of generated `sitemap.xml` / `llms.txt` and a sample of rendered page `<head>`s shows **no unintended change** for existing URLs (NFR-1).

---

## 8. Decisions & Remaining Risks

The prior open questions are **resolved** using the SEO/visibility/UX goal as the tiebreaker:

- **D-1 (was OQ-1, Vite glob in a Node script) → Option (a): registry exposes a plain-Node filesystem discovery path.** The SEO generator stays fast and dependency-light while deriving URLs from the same registry the routes use, so the sitemap/llms **cannot** drift — directly serving G1 (visibility/availability). Rejected: (b) running generation through Vite (heavier, more failure surface on a critical build step) and (c) generating from route loaders (couples the build to runtime rendering).
- **D-2 (was OQ-2, equivalence verification) → Mandatory before/after snapshot diff.** Because SEO correctness *is* the deliverable, a script snapshots `public/sitemap.xml`, `public/llms*.txt`, and the rendered `<head>` + JSON-LD of a representative URL per content type before and after each milestone; any unintended diff blocks merge (NFR-1/G6). Kept as a repo script for reuse, not built into CI for now (scope).
- **D-3 (was OQ-3, portfolio service refs) → Option (a): migrate `CaseStudy.services` to service slugs.** Enables the build-time dangling-reference check (FR-14) that protects internal linking and "related projects" — a ranking + UX factor. Cost is trivial (2 portfolio files). A display label is derived via `getServiceBySlug`, so UI text is unchanged.
- **D-4 (title templates, was Risk-3) → RESOLVED by inspection: the `"in Nairobi, Kenya"` service-title suffix is a deliberate local-SEO choice** (present on services, absent on blog/portfolio by design). Centralization preserves per-type templates (FR-18); it does **not** unify titles into one pattern.

**Remaining risks:**
- **Risk-1 — silent equivalence miss:** a subtle change (trailing slash, OG suffix) could itself hurt SEO. Mitigation: D-2 snapshot diff is non-negotiable.
- **Risk-2 — scope creep into redesign:** extracting `PageShell` invites "while we're here" layout tweaks. Mitigation: Non-Goals forbid visual change.
- **Risk-3 — geo/NAP accuracy:** the homepage `GeoCoordinates` (-1.286389, 36.817223) point to Nairobi CBD while the street address is Ongata Rongai. Not caused by this refactor, but since FR-15 makes NAP the single source reused everywhere, **correct the coordinates once** during FR-15 so the wrong value isn't propagated to more pages. _Owner to confirm the true business coordinates._
- **Risk-4 — over-marking `areaServed`:** applying local schema to genuinely non-local pages (e.g. blog thought-leadership) could dilute relevance. Mitigation: FR-16 scopes enrichment to service/solution pages only.

---

## 9. Milestones

Re-ordered around the SEO/visibility goal (was: pain-relief-per-effort). Each is independently shippable and each ends with the D-2 snapshot diff.

1. **M-1 — Correctness foundation: base URL + error handling** (FR-5, FR-6, FR-12, FR-13). One base-URL owner + canonical helper (kills wrong-canonical risk) and `notFound()` everywhere (fixes the portfolio `500`→`404`). Highest ranking-signal protection per line changed; near-zero regression risk. **Do first.**
2. **M-2 — Single content registry + SEO derivation** (FR-1–4, per D-1). The core anti-drift fix: sitemap/llms can no longer miss a page. Biggest visibility/availability win.
3. **M-3 — Local-SEO structured data** (FR-9, FR-10, FR-15–17). Typed schema module + push `LocalBusiness`/`areaServed`/`BreadcrumbList` onto service & solution pages. The ranking upside for local-intent queries; correct geo (Risk-3) here.
4. **M-4 — Consistency & cleanup: PageShell + content cross-refs** (FR-7, FR-8, FR-11, FR-14, FR-18, FR-19). Extract shell (fixes `solutions` inconsistency, preserves per-type titles), migrate portfolio refs to slugs with the dangling-ref check, delete the stale generator scripts.

---

_All prior open questions resolved (D-1–D-4) under the stated business goal — implementation is unblocked. Derived from the architecture audit of the content/routing/SEO subsystem._
