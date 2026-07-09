import { createServerFn } from "@tanstack/react-start";

export type CosmicSearchResult = {
  id: string;
  title: string;
  slug: string;
  metadata?: { excerpt?: string };
};

type CosmicObjectsResponse = {
  objects: CosmicSearchResult[];
  total: number;
};

// Hits the Cosmic REST API directly (rather than the SDK) on every call, with
// `cache: "no-store"` so nothing is cached at the edge — always live data.
export const searchCosmicObjects = createServerFn({ method: "GET" })
  .inputValidator((q: string) => q)
  .handler(async ({ data: q }): Promise<CosmicSearchResult[]> => {
    const query = q.trim();
    if (!query) return [];

    // --- Cosmic env vars (server-only, never sent to the client) ---
    // Set COSMIC_BUCKET_SLUG and COSMIC_READ_KEY in:
    //   - Cloudflare Pages/Workers dashboard → Settings → Environment Variables (production)
    //   - `.dev.vars` in the project root (local `wrangler`/`vite dev`)
    const bucketSlug = process.env.COSMIC_BUCKET_SLUG;
    const readKey = process.env.COSMIC_READ_KEY;

    if (!bucketSlug || !readKey) {
      console.error("Missing COSMIC_BUCKET_SLUG / COSMIC_READ_KEY environment variables.");
      return [];
    }

    // Cosmic's REST `query` param is a Mongo-style filter object, not free text —
    // this does a case-insensitive title match. Adjust the filter to match your
    // object type/schema (e.g. add more fields, change the target `type`).
    const filter = JSON.stringify({
      type: "posts",
      title: { $regex: query, $options: "i" },
    });

    const url =
      `https://api.cosmicjs.com/v3/buckets/${bucketSlug}/objects` +
      `?query=${encodeURIComponent(filter)}` +
      `&read_key=${readKey}` +
      `&props=id,title,slug,metadata`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Cosmic search request failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = (await res.json()) as CosmicObjectsResponse;
    return data.objects ?? [];
  });
