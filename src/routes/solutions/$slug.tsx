import { createFileRoute, redirect } from "@tanstack/react-router";

// The industry landing pages were retired. Old URLs keep their search value by
// 301-ing to the closest live page instead of returning 404. Restaurants go to
// the LuckLotter section, which now serves food businesses.
const SOLUTION_REDIRECTS: Record<string, string> = {
  restaurants: "/#lucklotter",
};

export const Route = createFileRoute("/solutions/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      href: SOLUTION_REDIRECTS[params.slug] ?? "/",
      statusCode: 301,
    });
  },
});
