import Link from "next/link";
import { Metadata } from "next";
import blogsData from "@/data/blogs.json";

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

export default function BlogsPage() {
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
              <li className="text-gray-900 font-medium">Blogs</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog Posts</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights on product management, leadership, and data-driven decision making from my experience in the field.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map((blog) => (
              <article key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-600 transition-colors duration-300">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-blue-600 text-sm mb-3">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
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
    </div>
  );
}
