import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { fetchLocalizedPosts, type LocalizedPost } from "@/server/localizedPosts";
import { searchCosmicObjects, type CosmicSearchResult } from "@/server/cosmicSearch";

const LOCALES = ["en", "fr", "sw"] as const;
type Locale = (typeof LOCALES)[number];

// `.catch()` (not `.default()`) so a malformed/unexpected URL value never
// throws — it silently falls back instead of breaking the route.
const searchParamsSchema = z.object({
  locale: z.enum(LOCALES).catch("en"),
  q: z.string().catch(""),
});

type LoaderResult =
  | { mode: "search"; locale: Locale; posts: CosmicSearchResult[] }
  | { mode: "browse"; locale: Locale; posts: LocalizedPost[] };

export const Route = createFileRoute("/search")({
  validateSearch: (search) => searchParamsSchema.parse(search),
  // Loader reruns whenever locale or q changes, not just on first load.
  loaderDeps: ({ search }) => ({ locale: search.locale, q: search.q }),
  loader: async ({ deps }): Promise<LoaderResult> => {
    // Both branches call a createServerFn handler, so this always executes
    // server-side per request — no prerendering, no client-only fetch waterfall.
    if (deps.q.trim()) {
      const posts = await searchCosmicObjects({ data: deps.q });
      return { mode: "search", locale: deps.locale, posts };
    }

    const posts = await fetchLocalizedPosts({ data: deps.locale });
    return { mode: "browse", locale: deps.locale, posts };
  },
  component: SearchPage,
});

function SearchPage() {
  const { mode, posts } = Route.useLoaderData();
  const { locale, q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          defaultValue={q}
          placeholder="Search posts…"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
          onChange={(e) => {
            const value = e.target.value;
            // Updates the `q` param in the URL via client-side navigation
            // (no full page reload) and reruns the loader above.
            navigate({ search: (prev) => ({ ...prev, q: value }), replace: true });
          }}
        />

        <select
          value={locale}
          onChange={(e) =>
            navigate({ search: (prev) => ({ ...prev, locale: e.target.value as Locale }) })
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {LOCALES.map((code) => (
            <option key={code} value={code}>
              {code.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {mode === "search" ? `Search results for "${q}"` : `Latest posts (${locale.toUpperCase()})`}
      </p>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="rounded-md border border-border/60 p-4">
            <h2 className="font-semibold">{post.title}</h2>
            {post.metadata?.excerpt && (
              <p className="mt-1 text-sm text-muted-foreground">{post.metadata.excerpt}</p>
            )}
          </li>
        ))}
        {posts.length === 0 && <li className="text-sm text-muted-foreground">No results.</li>}
      </ul>
    </main>
  );
}
