import { promises as fs } from "fs";
import path from "path";
import type { Blog, CmsData, Experience, Highlight, ImpactStat, Profile, Project, Testimonial } from "./types";

const CMS_PATH = path.join(process.cwd(), "data", "cms.json");

async function readFile(): Promise<CmsData> {
  const raw = await fs.readFile(CMS_PATH, "utf-8");
  return JSON.parse(raw) as CmsData;
}

async function writeFile(data: CmsData) {
  await fs.writeFile(CMS_PATH, JSON.stringify(data, null, 2));
}

export async function getCmsData(): Promise<CmsData> {
  return readFile();
}

export async function getProfile(): Promise<Profile> {
  const data = await readFile();
  return data.profile;
}

export async function updateProfile(profile: Profile): Promise<void> {
  const data = await readFile();
  data.profile = profile;
  await writeFile(data);
}

export async function getHighlights(): Promise<Highlight[]> {
  const data = await readFile();
  return [...data.highlights].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function replaceHighlights(highlights: Highlight[]): Promise<void> {
  const data = await readFile();
  data.highlights = highlights;
  await writeFile(data);
}

export async function getExperiences(): Promise<Experience[]> {
  const data = await readFile();
  return [...data.experiences].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function replaceExperiences(experiences: Experience[]): Promise<void> {
  const data = await readFile();
  data.experiences = experiences;
  await writeFile(data);
}

export async function getProjects(): Promise<Project[]> {
  const data = await readFile();
  return [...data.projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function replaceProjects(projects: Project[]): Promise<void> {
  const data = await readFile();
  data.projects = projects;
  await writeFile(data);
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const data = await readFile();
  return [...data.impactStats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function replaceImpactStats(stats: ImpactStat[]): Promise<void> {
  const data = await readFile();
  data.impactStats = stats;
  await writeFile(data);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await readFile();
  return [...data.testimonials].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function replaceTestimonials(testimonials: Testimonial[]): Promise<void> {
  const data = await readFile();
  data.testimonials = testimonials;
  await writeFile(data);
}

export async function getBlogs(): Promise<Blog[]> {
  const data = await readFile();
  return [...data.blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const data = await readFile();
  return data.blogs.find((blog) => blog.slug === slug);
}

export async function replaceBlogs(blogs: Blog[]): Promise<void> {
  const data = await readFile();
  data.blogs = blogs;
  await writeFile(data);
}
