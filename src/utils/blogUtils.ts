import type { Blog } from "@/lib/cms/types";
import { getBlogBySlug as fetchBlogBySlug, getBlogs } from "@/lib/cms/storage";

// Get all blog posts
export async function getAllBlogs(): Promise<Blog[]> {
  return getBlogs();
}

// Get a specific blog post by slug
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  return fetchBlogBySlug(slug);
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
export async function getBlogsByTag(tag: string): Promise<Blog[]> {
  const blogs = await getBlogs();
  return blogs.filter((blog) =>
    blog.tags.some((blogTag) => blogTag.toLowerCase() === tag.toLowerCase())
  );
}

// Get recent blogs (limited number)
export async function getRecentBlogs(limit: number = 3): Promise<Blog[]> {
  const blogs = await getBlogs();
  return blogs.slice(0, limit);
}

// Search blogs by title or content
export async function searchBlogs(query: string): Promise<Blog[]> {
  const blogs = await getBlogs();
  const searchTerm = query.toLowerCase();
  return blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm) ||
    blog.excerpt.toLowerCase().includes(searchTerm) ||
    blog.content.toLowerCase().includes(searchTerm) ||
    blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

// Get all unique tags from all blogs
export async function getAllTags(): Promise<string[]> {
  const blogs = await getBlogs();
  const allTags = blogs.flatMap((blog) => blog.tags);
  return Array.from(new Set(allTags));
}

// Validate blog data structure
export function validateBlogData(blog: unknown): blog is Blog {
  return (
    typeof blog.id === 'number' &&
    typeof blog.slug === 'string' &&
    typeof blog.title === 'string' &&
    typeof blog.date === 'string' &&
    typeof blog.excerpt === 'string' &&
    typeof blog.content === 'string' &&
    Array.isArray(blog.tags) &&
    blog.tags.every((tag: unknown) => typeof tag === 'string') &&
    typeof blog.metadata === 'object' &&
    typeof blog.metadata.title === 'string' &&
    typeof blog.metadata.description === 'string' &&
    Array.isArray(blog.metadata.keywords) &&
    typeof blog.metadata.author === 'string' &&
    typeof blog.metadata.publishedTime === 'string' &&
    typeof blog.metadata.modifiedTime === 'string'
  );
}