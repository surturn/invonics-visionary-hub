import { createFileRoute, redirect } from "@tanstack/react-router";

// /work/$slug was merged into /portfolio/$slug. Slugs that have a direct
// portfolio equivalent redirect straight to it; anything else, including the
// retired accounting and event RSVP systems, falls back to the portfolio index
// rather than 404ing.
const SLUG_MAP: Record<string, string> = {
  "school-asset-inventory-system": "school-asset-inventory-system",
};

export const Route = createFileRoute("/work/$slug")({
  beforeLoad: ({ params }) => {
    const target = SLUG_MAP[params.slug];
    if (target) {
      throw redirect({ to: "/portfolio/$slug", params: { slug: target }, statusCode: 301 });
    }
    throw redirect({ to: "/portfolio", statusCode: 301 });
  },
});
