import Link from "next/link";
import { Metadata } from "next";
import blogsData from "@/data/blogs.json";
import { notFound } from "next/navigation";

type BlogParams = {
  params: {
    slug: string;
  };
};

// Generate static pages for all blog posts at build time
export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic metadata generation based on the blog post
export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const blog = blogsData.find((post) => post.slug === params.slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    };
  }
  
  return {
    title: blog.metadata.title,
    description: blog.metadata.description,
    keywords: blog.metadata.keywords,
    authors: [{ name: blog.metadata.author }],
    openGraph: {
      title: blog.metadata.title,
      description: blog.metadata.description,
      type: "article",
      publishedTime: blog.metadata.publishedTime,
      modifiedTime: blog.metadata.modifiedTime,
      authors: [blog.metadata.author],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metadata.title,
      description: blog.metadata.description,
      creator: blog.metadata.author,
    },
  };
}

export default function BlogPostPage({ params }: BlogParams) {
  const blog = blogsData.find((post) => post.slug === params.slug);
  
  // Handle case when blog post is not found
  if (!blog) {
    notFound();
  }
  
  // Format date for display
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split content by paragraphs and headings for proper formatting
  const contentParts = blog.content.split("\n\n").map((part, index) => {
    if (part.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          {part.substring(3)}
        </h2>
      );
    } else if (part.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          {part.substring(4)}
        </h3>
      );
    } else {
      return (
        <p key={index} className="mb-6 text-gray-700 leading-relaxed">
          {part}
        </p>
      );
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">
          <Link href="/">Vinay Amin</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</Link>
            </li>
            <li>
              <Link href="/#experience" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Experience</Link>
            </li>
            <li>
              <Link href="/#projects" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Projects</Link>
            </li>
            <li>
              <Link href="/blogs" className="text-blue-600 font-medium">Blogs</Link>
            </li>
            <li>
              <Link href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-blue-600 transition-colors duration-300">Blogs</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium line-clamp-1">{blog.title}</li>
            </ol>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/blogs"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              ← Back to Blogs
            </Link>
          </div>

          {/* Article */}
          <article className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
              <div className="text-blue-600 text-sm mb-4">
                <time dateTime={blog.date}>{formattedDate}</time> • By {blog.metadata.author}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {contentParts}
            </div>

            {/* Social Sharing */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://vinayvp.com/blogs/${blog.slug}`)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://vinayvp.com/blogs/${blog.slug}`)}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(blog.excerpt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0077B5] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </article>

          {/* Related Articles - Placeholder */}
          <div className="max-w-3xl mx-auto mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogsData
                .filter((relatedBlog) => relatedBlog.slug !== blog.slug)
                .slice(0, 2)
                .map((relatedBlog) => (
                  <div key={relatedBlog.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link href={`/blogs/${relatedBlog.slug}`} className="hover:text-blue-600 transition-colors duration-300">
                        {relatedBlog.title}
                      </Link>
                    </h4>
                    <p className="text-blue-600 text-sm mb-2">{new Date(relatedBlog.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 line-clamp-2">{relatedBlog.excerpt}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Vinay V P. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://www.linkedin.com/in/vinayvp/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.excerpt,
            "author": {
              "@type": "Person",
              "name": blog.metadata.author
            },
            "datePublished": blog.metadata.publishedTime,
            "dateModified": blog.metadata.modifiedTime,
            "publisher": {
              "@type": "Organization",
              "name": "Vinay V P",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vinayvp.com/logo.png"
              }
            },
            "keywords": blog.metadata.keywords.join(", "),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://vinayvp.com/blogs/${blog.slug}`
            }
          })
        }}
      />
    </div>
  );
}