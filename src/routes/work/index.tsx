import { createFileRoute, redirect } from "@tanstack/react-router";

// /work was merged into /portfolio (single indexed case-study section
// instead of two competing, partially-noindexed ones). 301 so any
// existing backlinks/crawled URLs pass through rather than 404.
export const Route = createFileRoute("/work/")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio", statusCode: 301 });
  },
});
