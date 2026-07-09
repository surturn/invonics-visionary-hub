import { createServerFn } from "@tanstack/react-start";
import { cosmic, isCosmicNotFound } from "../lib/cosmic";

export type Post = {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
  metadata: {
    excerpt?: string;
    cover_image?: { imgix_url: string };
    content?: string;
  };
};

export const fetchPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { objects } = await cosmic.objects
      .find({ type: "posts" })
      .props(["id", "title", "slug", "published_at", "metadata.excerpt", "metadata.cover_image"])
      .limit(10);

    return objects as Post[];
  } catch (error) {
    if (isCosmicNotFound(error)) return [];
    throw error;
  }
});

export const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const { object } = await cosmic.objects
        .findOne({ type: "posts", slug })
        .props(["id", "title", "slug", "published_at", "metadata"])
        .depth(1);

      return object as Post | null;
    } catch (error) {
      if (isCosmicNotFound(error)) return null;
      throw error;
    }
  });
