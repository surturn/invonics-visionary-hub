import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getAllBlogPosts } from "@/lib/content";
import { StructuredData } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights & Articles — Invonics Technologies" },
      { name: "description", content: "Thoughts on software engineering, AI automation, and digital transformation in East Africa." },
      { property: "og:title", content: "Insights & Articles" },
      { rel: "canonical", href: "https://invonicstechnologies.com/blog" },
    ],
  }),
  loader: () => {
    return {
      posts: getAllBlogPosts(),
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebSite"
        data={{
          name: "Blog - Invonics Technologies",
          url: "https://invonicstechnologies.com/blog",
        }}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
              ● Insights
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient leading-[1.04] mb-8">
              Engineering Notes.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground mb-16">
              Thoughts on software architecture, AI automation, and building resilient systems.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 50}>
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="group h-full rounded-2xl glass border border-border/60 p-8 transition-all hover:ring-glow">
                    <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-primary uppercase tracking-wider">{post.category}</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h3 className="mb-3 font-display text-2xl text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
