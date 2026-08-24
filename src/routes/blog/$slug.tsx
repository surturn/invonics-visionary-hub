import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { absoluteUrl } from "@/lib/site";
import { fetchPost } from "../../server/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Invonics` },
          ...(loaderData.metadata.excerpt
            ? [{ name: "description", content: loaderData.metadata.excerpt }]
            : []),
          { property: "og:title", content: loaderData.title },
          ...(loaderData.metadata.excerpt
            ? [{ property: "og:description", content: loaderData.metadata.excerpt }]
            : []),
          ...(loaderData.metadata.cover_image?.imgix_url
            ? [{ property: "og:image", content: loaderData.metadata.cover_image.imgix_url }]
            : []),
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: absoluteUrl(`/blog/${loaderData.slug}`) }] : [],
  }),
  component: BlogPost,
});

// Hand-rolled markdown typography — no @tailwindcss/typography plugin installed,
// so headings/lists/code inside the rendered markdown are styled via descendant selectors.
const ARTICLE_PROSE_CLASSES =
  "[&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 " +
  "[&_h3]:font-display [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 " +
  "[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-5 " +
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:text-muted-foreground [&_ul]:space-y-2 " +
  "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:text-muted-foreground [&_ol]:space-y-2 " +
  "[&_strong]:text-foreground [&_strong]:font-semibold " +
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 " +
  "[&_code]:bg-secondary [&_code]:text-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.85em] " +
  "[&_pre]:bg-secondary [&_pre]:border [&_pre]:border-border/60 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:mb-6 " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:mb-5 " +
  "[&_table]:w-full [&_table]:mb-6 [&_table]:text-sm [&_th]:border-b [&_th]:border-border [&_th]:text-left [&_th]:py-2 [&_th]:pr-4 [&_th]:text-foreground " +
  "[&_td]:border-b [&_td]:border-border/60 [&_td]:py-2 [&_td]:pr-4 [&_td]:text-muted-foreground " +
  "[&_hr]:border-border [&_hr]:my-8";

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-5">
          <Reveal>
            <Link
              to="/blog"
              className="text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              ← Back to Blog
            </Link>

            {post.published_at && (
              <time className="mt-6 block text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1]">
              {post.title}
            </h1>

            {post.metadata.cover_image?.imgix_url && (
              <img
                src={`${post.metadata.cover_image.imgix_url}?w=1200&auto=format`}
                alt={post.title}
                loading="eager"
                decoding="async"
                width={1200}
                height={675}
                className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border/60 object-cover"
              />
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className={`mt-10 ${ARTICLE_PROSE_CLASSES}`}>
              <ReactMarkdown>{post.metadata.content || ""}</ReactMarkdown>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </div>
  );
}
