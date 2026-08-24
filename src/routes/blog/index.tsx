import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { absoluteUrl } from "@/lib/site";
import { fetchPosts, type Post } from "../../server/posts";

export const Route = createFileRoute("/blog/")({
  loader: () => fetchPosts(),
  head: () => ({
    meta: [
      { title: "Blog — Invonics Technologies" },
      {
        name: "description",
        content:
          "Field notes on software architecture, AI automation and building for African businesses — from the Invonics Technologies team.",
      },
      { property: "og:title", content: "Blog — Invonics Technologies" },
      {
        property: "og:description",
        content: "Field notes on software architecture, AI automation and building for scale.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/blog") }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24">
        <section className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">● Blog</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] max-w-3xl mb-6">
              Field notes on building well.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Thinking on software architecture, AI automation and shipping durable systems for East
              African businesses.
            </p>
          </Reveal>

          {posts.length > 0 ? (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-16 rounded-2xl border border-border/60 bg-card px-8 py-16 text-center">
                <p className="text-muted-foreground">
                  Nothing published yet — check back soon for our first posts.
                </p>
              </div>
            </Reveal>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const cover = post.metadata.cover_image?.imgix_url;
  const initials =
    post.title
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "IN";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-video overflow-hidden bg-secondary/40">
        {cover ? (
          <img
            src={`${cover}?w=800&auto=format`}
            alt={post.title}
            loading="lazy"
            decoding="async"
            width={800}
            height={450}
            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="relative grid h-full w-full place-items-center overflow-hidden bg-linear-to-br from-secondary/70 via-background to-background"
          >
            <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
            <span className="relative select-none font-display text-5xl font-semibold text-gradient">
              {initials}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {post.published_at && (
          <time className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        )}
        <h2 className="mt-2 font-display text-xl text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        {post.metadata.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        <span className="mt-4 text-sm font-semibold text-primary">Read more →</span>
      </div>
    </Link>
  );
}
