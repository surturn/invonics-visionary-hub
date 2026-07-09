import { createBucketClient } from "@cosmicjs/sdk";

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// The SDK rejects with a plain `{ status, message }` object (not an Error)
// when a bucket/type has zero matching objects — that's an empty result,
// not a failure, so callers should treat it as such rather than crash the route.
export function isCosmicNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: unknown }).status === 404
  );
}
