import Link from "next/link";
import { Metadata } from "next";
import { BlogNavigation } from "@/components/BlogNavigation";
import { getBlogPosts } from "@/utils/contentful";
import type { BlogPost } from "@/utils/contentful";

export const metadata: Metadata = {
  title: "Blog — Vinay Amin | Product & Leadership Insights",
  description:
    "Insights on product management, analytics platforms, experimentation, and engineering leadership.",
  openGraph: {
    title: "Blog — Vinay Amin",
    description:
      "Insights on product management, analytics platforms, experimentation, and engineering leadership.",
    type: "website",
  },
};

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

function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  const formattedDate = formatDate(post.publishDate);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 transition hover:border-indigo-500/20">
        <div className="rounded-[0.875rem] bg-gradient-to-br from-gray-900/80 to-gray-900/60 p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4 flex-1">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-2xl font-semibold text-white transition group-hover:text-indigo-200 sm:text-3xl">
                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              </h2>
              {formattedDate && (
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {formattedDate}
                </p>
              )}
              {post.excerpt && (
                <p className="max-w-xl text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
              )}
              <Link
                href={`/blogs/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
              >
                Read Story <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1 transition hover:border-indigo-500/20">
      <div className="flex flex-1 flex-col rounded-[0.875rem] bg-gradient-to-br from-gray-900/80 to-gray-900/60 p-6">
        <div className="flex-1 space-y-3">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-lg font-semibold text-white transition group-hover:text-indigo-200">
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </h2>
          {formattedDate && (
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{formattedDate}</p>
          )}
          {post.excerpt && (
            <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">{post.excerpt}</p>
          )}
        </div>
        <div className="pt-5">
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
          >
            Read Story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-gray-950 text-slate-100 grain-overlay">
      <BlogNavigation pageType="blogs" />
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-28">
        <nav className="mb-8 text-xs font-semibold uppercase tracking-[0.3em]">
          <ol className="flex items-center gap-2 text-slate-500">
            <li>
              <Link href="/" className="transition hover:text-slate-300">
                Home
              </Link>
            </li>
            <li className="text-slate-700">/</li>
            <li className="text-slate-300">Blog</li>
          </ol>
        </nav>

        <header className="mb-14 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">
            Latest Thinking
          </p>
          <h1 className="font-display text-4xl text-white sm:text-5xl">Blog</h1>
          <p className="max-w-xl text-slate-400">
            Field notes on product strategy, analytics platforms, experimentation, and engineering leadership.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-lg font-semibold text-slate-200">No published posts yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Once entries are published in Contentful they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {featured && <PostCard post={featured} featured />}
            {rest.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
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
    </div>
  );
}
