import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Reveal } from "@/components/site/Reveal";
import { getAllBlogPosts } from "@/lib/content";
import { StructuredData } from "@/components/seo/StructuredData";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getAllBlogPosts().find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return { meta: [] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Invonics Technologies` },
        { name: "description", content: post.metaDescription || post.summary },
        { property: "og:title", content: post.title },
        { property: "og:type", content: "article" },
        { rel: "canonical", href: `https://invonicstechnologies.com/blog/${post.slug}` },
      ],
    };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="Article"
        data={{
          headline: post.title,
          description: post.summary,
          author: {
            "@type": "Organization",
            name: post.author,
          },
          datePublished: post.publishedAt,
        }}
      />
      <Nav />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-primary uppercase tracking-wider">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.publishedAt}</span>
            </div>
            <h1 className="mb-10 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.04] text-foreground">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            {/* Extremely simple markdown/HTML renderer for MVP */}
            <div
              className="prose prose-invert prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/\n\n/g, "<br/><br/>")
                  .replace(
                    /### (.*?)\n/g,
                    '<h3 class="text-2xl text-foreground mt-8 mb-4 font-display">$1</h3>',
                  ),
              }}
            />
          </Reveal>
        </article>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
