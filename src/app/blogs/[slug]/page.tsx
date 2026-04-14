import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogNavigation } from "@/components/BlogNavigation";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/utils/contentful";
import type { BlogPost } from "@/utils/contentful";

type BlogParams = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllBlogSlugs();
  return slugs.filter((slug): slug is string => Boolean(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? `Read ${post.title}`;

  const openGraphImages = post.heroImage
    ? [
        {
          url: post.heroImage.url,
          width: post.heroImage.width,
          height: post.heroImage.height,
          alt: post.heroImage.description ?? post.heroImage.title ?? post.title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishDate,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: openGraphImages,
    },
    twitter: {
      card: post.heroImage ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

function formatDate(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function renderContent(body?: string) {
  if (!body) {
    return <p className="text-sm text-slate-400">Content coming soon.</p>;
  }

  return body.split("\n\n").map((part, index) => {
    if (part.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-10 text-2xl font-semibold text-white">
          {part.substring(3)}
        </h2>
      );
    }

    if (part.startsWith("### ")) {
      return (
        <h3 key={index} className="mt-8 text-xl font-semibold text-slate-100">
          {part.substring(4)}
        </h3>
      );
    }

    return (
      <p key={index} className="text-base leading-relaxed text-slate-300">
        {part}
      </p>
    );
  });
}

function RelatedCard({ post }: { post: BlogPost }) {
  const formattedDate = formatDate(post.publishDate);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 transition hover:border-indigo-500/20">
      <div className="rounded-[0.875rem] bg-gradient-to-br from-gray-900/80 to-gray-900/60 p-6">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white transition group-hover:text-indigo-200">
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </h4>
          {formattedDate && (
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{formattedDate}</p>
          )}
          {post.excerpt && (
            <p className="text-sm text-slate-400 line-clamp-3">{post.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogParams) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getBlogPosts())
    .filter((related) => related.slug !== post.slug)
    .slice(0, 2);
  const formattedDate = formatDate(post.publishDate);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : undefined,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vinayvp.com/blogs/${post.slug}`,
    },
    image: post.heroImage?.url,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-slate-100 grain-overlay">
      <BlogNavigation pageType="blog" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <nav className="mb-8 text-xs font-semibold uppercase tracking-[0.3em]">
          <ol className="flex items-center gap-2 text-slate-500">
            <li>
              <Link href="/" className="transition hover:text-slate-300">
                Home
              </Link>
            </li>
            <li className="text-slate-700">/</li>
            <li>
              <Link href="/blogs" className="transition hover:text-slate-300">
                Blog
              </Link>
            </li>
            <li className="text-slate-700">/</li>
            <li className="text-slate-300 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        <article className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1">
          <div className="rounded-[0.875rem] bg-gradient-to-br from-gray-900/80 to-gray-900/60 p-8 sm:p-12 space-y-10">
            <header className="space-y-5 text-center">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row sm:justify-center">
                {formattedDate && (
                  <time dateTime={post.publishDate ?? undefined} className="text-slate-400">
                    {formattedDate}
                  </time>
                )}
                {post.author && <span className="hidden sm:inline text-slate-700">·</span>}
                {post.author && <span className="text-slate-400">{post.author}</span>}
              </div>
            </header>

            <div className="space-y-6 text-left leading-relaxed">
              {renderContent(post.body)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-sm text-slate-400">
              <span>Enjoyed this? Share it.</span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://vinayvp.com/blogs/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-indigo-500/30 hover:text-indigo-300"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://vinayvp.com/blogs/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt ?? "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-indigo-500/30 hover:text-indigo-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Continue reading</h2>
              <Link
                href="/blogs"
                className="text-sm text-indigo-300 transition hover:text-indigo-200"
              >
                All posts →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <RelatedCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-20 flex flex-col items-center gap-3 border-t border-white/[0.04] pt-8 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Vinay Amin. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/in/vinayvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-slate-300"
          >
            LinkedIn
          </a>
        </footer>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
