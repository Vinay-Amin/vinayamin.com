import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function BlogCard({ slug, title, date, excerpt, tags }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-wrap gap-2 mb-2 md:mb-3">
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 line-clamp-2">
        <Link href={`/blogs/${slug}`} className="hover:text-blue-600 transition-colors duration-300 min-h-[44px] flex items-center">
          {title}
        </Link>
      </h3>
      <p className="text-blue-600 text-sm mb-2">{formattedDate}</p>
      <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 line-clamp-3">{excerpt}</p>
      <Link 
        href={`/blogs/${slug}`}
        className="text-blue-600 hover:underline inline-flex items-center font-medium transition-colors duration-300 min-h-[44px] py-2"
      >
        Read More →
      </Link>
    </div>
  );
}