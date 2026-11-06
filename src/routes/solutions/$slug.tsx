import { createFileRoute, redirect } from "@tanstack/react-router";

// The industry landing pages were retired. Old URLs keep their search value by
// 301-ing to the closest live page instead of returning 404.
const SOLUTION_REDIRECTS: Record<string, string> = {
  restaurants: "/services/business-management-systems",
};

export const Route = createFileRoute("/solutions/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      href: SOLUTION_REDIRECTS[params.slug] ?? "/",
      statusCode: 301,
    });
  },
});
