import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogNavigation } from "@/components/BlogNavigation";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/utils/contentful";
import type { BlogPost } from "@/utils/contentful";
import fs from "fs";
import path from "path";
import { getAllBlogSlugs } from "@/utils/contentful";

type BlogParams = {
  params: {
    slug: string;
  };
};

// Ensure this import is present at the top of the file:
// import { getAllBlogSlugs } from "@/utils/contentful";

/**
 * Return the list of slugs for static export. First try Contentful, then fall back
 * to a cached file at data/blog-slugs.json to make CI/static export robust.
 */
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs
      .filter((s): s is string => Boolean(s))
      .map((slug) => ({ slug }));
  } catch (err) {
    console.error("generateStaticParams: failed to fetch slugs from Contentful:", err);

    // Fallback: read cached slugs from repo (create data/blog-slugs.json)
    try {
      const cachePath = path.join(process.cwd(), "data", "blog-slugs.json");
      const raw = fs.readFileSync(cachePath, "utf8");
      const cached: string[] = JSON.parse(raw);
      return cached.filter(Boolean).map((slug) => ({ slug }));
    } catch (cacheErr) {
      console.error("generateStaticParams: failed to read cached slugs:", cacheErr);
      // Return empty array: export will succeed but no blog pages will be generated
      return [];
    }
  }
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
    return <p className="text-sm text-slate-300">Content coming soon.</p>;
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
      <p key={index} className="text-base leading-relaxed text-slate-200">
        {part}
      </p>
    );
  });
}

function RelatedCard({ post }: { post: BlogPost }) {
  const formattedDate = formatDate(post.publishDate);

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-600">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-white">
          <Link href={`/blogs/${post.slug}`} className="nav-link text-inherit">
            {post.title}
          </Link>
        </h4>
        {formattedDate && <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{formattedDate}</p>}
        {post.excerpt && <p className="text-sm text-slate-300 line-clamp-3">{post.excerpt}</p>}
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogParams) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getBlogPosts()).filter((related) => related.slug !== post.slug).slice(0, 2);
  const formattedDate = formatDate(post.publishDate);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
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
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <BlogNavigation pageType="blog" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <nav className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <ol className="flex items-center gap-2 text-slate-400">
            <li>
              <Link href="/" className="nav-link text-slate-400 hover:text-blue-300">
                Home
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li>
              <Link href="/blogs" className="nav-link text-slate-400 hover:text-blue-300">
                Blog
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li className="text-slate-200">{post.title}</li>
          </ol>
        </nav>

        <article className="space-y-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
          <header className="space-y-5 text-center">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-400/80">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-blue-400/30 px-3 py-1 text-[0.65rem] font-semibold text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-balance font-display text-4xl tracking-tight text-white sm:text-5xl">{post.title}</h1>
            <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400 sm:flex-row sm:justify-center">
              {formattedDate && (
                <time dateTime={post.publishDate ?? undefined} className="text-slate-300">
                  {formattedDate}
                </time>
              )}
              {post.author && (
                <span className="text-slate-500">•</span>
              )}
              {post.author && <span className="text-slate-300">{post.author}</span>}
            </div>
          </header>

          <div className="space-y-6 text-left leading-relaxed">
            {renderContent(post.body)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-300">
            <div>Enjoyed this read? Share it with your network.</div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://vinayvp.com/blogs/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blue-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300 transition hover:border-blue-300 hover:text-blue-200"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://vinayvp.com/blogs/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt ?? "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blue-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300 transition hover:border-blue-300 hover:text-blue-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Continue exploring</h2>
              <Link href="/blogs" className="nav-link text-sm text-blue-300 hover:text-blue-200">
                View all posts
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <RelatedCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 flex flex-col items-center gap-3 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Vinay V P. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/in/vinayvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-slate-400 hover:text-blue-300"
          >
            LinkedIn
          </a>
        </footer>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </div>
  );
}
