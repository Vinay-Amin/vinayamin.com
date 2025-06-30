import blogsData from '@/data/blogs.json';

// Type definitions for blog data structure
export interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedTime: string;
  modifiedTime: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  metadata: BlogMetadata;
}

// Get all blog posts
export function getAllBlogs(): Blog[] {
  return blogsData as Blog[];
}

// Get a specific blog post by slug
export function getBlogBySlug(slug: string): Blog | undefined {
  return blogsData.find((blog) => blog.slug === slug) as Blog | undefined;
}

// Generate a slug from a title
export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
}

// Get blogs by tag
export function getBlogsByTag(tag: string): Blog[] {
  return blogsData.filter((blog) => 
    blog.tags.some((blogTag) => blogTag.toLowerCase() === tag.toLowerCase())
  ) as Blog[];
}

// Get recent blogs (limited number)
export function getRecentBlogs(limit: number = 3): Blog[] {
  return blogsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit) as Blog[];
}

// Search blogs by title or content
export function searchBlogs(query: string): Blog[] {
  const searchTerm = query.toLowerCase();
  return blogsData.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm) ||
    blog.excerpt.toLowerCase().includes(searchTerm) ||
    blog.content.toLowerCase().includes(searchTerm) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  ) as Blog[];
}

// Get all unique tags from all blogs
export function getAllTags(): string[] {
  const allTags = blogsData.flatMap((blog) => blog.tags);
  return Array.from(new Set(allTags));
}

// Validate blog data structure
export function validateBlogData(blog: any): blog is Blog {
  return (
    typeof blog.id === 'number' &&
    typeof blog.slug === 'string' &&
    typeof blog.title === 'string' &&
    typeof blog.date === 'string' &&
    typeof blog.excerpt === 'string' &&
    typeof blog.content === 'string' &&
    Array.isArray(blog.tags) &&
    blog.tags.every((tag: any) => typeof tag === 'string') &&
    typeof blog.metadata === 'object' &&
    typeof blog.metadata.title === 'string' &&
    typeof blog.metadata.description === 'string' &&
    Array.isArray(blog.metadata.keywords) &&
    typeof blog.metadata.author === 'string' &&
    typeof blog.metadata.publishedTime === 'string' &&
    typeof blog.metadata.modifiedTime === 'string'
  );
}
