import Link from "next/link";
import { Metadata } from "next";
import { BlogNavigation } from "@/components/BlogNavigation";
import { getBlogPosts } from "@/utils/contentful";
import type { BlogPost } from "@/utils/contentful";

export const metadata: Metadata = {
  title: "Blogs - Vinay V P | Product Management & Leadership Insights",
  description: "Explore insights on product management, leadership, data-driven decision making, and agile methodologies from experienced Product Manager Vinay V P.",
  keywords: "product management blog, leadership insights, data-driven decisions, agile transformation, product strategy, team management",
  openGraph: {
    title: "Blogs - Vinay V P | Product Management & Leadership Insights",
    description: "Explore insights on product management, leadership, data-driven decision making, and agile methodologies from experienced Product Manager Vinay V P.",
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

function PostCard({ post }: { post: BlogPost }) {
  const formattedDate = formatDate(post.publishDate);

  return (
    <article className="group flex h-full flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-600 hover:bg-slate-900">
      <div className="space-y-4">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-blue-400/80">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-blue-400/30 px-3 py-1 text-[0.65rem] font-semibold text-blue-300">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white transition group-hover:text-blue-300">
            <Link href={`/blogs/${post.slug}`} className="nav-link text-inherit">
              {post.title}
            </Link>
          </h2>
          {formattedDate && <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{formattedDate}</p>}
          {post.excerpt && <p className="text-sm text-slate-300">{post.excerpt}</p>}
        </div>
      </div>
      <div className="pt-6">
        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
        >
          Read Story
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <BlogNavigation pageType="blogs" />
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-32">
        <nav className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <ol className="flex items-center gap-2 text-slate-400">
            <li>
              <Link href="/" className="nav-link text-slate-400 hover:text-blue-300">
                Home
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li className="text-slate-200">Blog</li>
          </ol>
        </nav>

        <header className="mb-12 space-y-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">Latest Thinking</p>
          <h1 className="text-balance font-display text-4xl tracking-tight text-white sm:text-5xl">
            Stories from the product leadership desk
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Field notes on orchestrating analytics platforms, aligning stakeholders, and scaling experiments that deliver measurable outcomes.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-300">
            <p className="text-lg font-semibold text-slate-200">No published posts yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Once entries are published in Contentful they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
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
    </div>
  );
}