import { createServerFn } from "@tanstack/react-start";
import { cosmic, isCosmicNotFound } from "../lib/cosmic";

export type LocalizedPost = {
  id: string;
  title: string;
  slug: string;
  metadata: {
    excerpt?: string;
  };
};

// Runs on every request (no ISR/webhooks in this phase) — the `locale` param
// flows straight into the Cosmic query so SSR always returns fresh, locale-scoped content.
export const fetchLocalizedPosts = createServerFn({ method: "GET" })
  .inputValidator((locale: string) => locale)
  .handler(async ({ data: locale }): Promise<LocalizedPost[]> => {
    try {
      const { objects } = await cosmic.objects
        .find({ type: "posts", locale })
        .props(["id", "title", "slug", "metadata.excerpt"])
        .limit(10);

      return objects as LocalizedPost[];
    } catch (error) {
      if (isCosmicNotFound(error)) return [];
      throw error;
    }
  });
