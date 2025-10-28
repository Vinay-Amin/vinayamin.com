export type Highlight = {
  title: string;
  metric: string;
  description: string;
  iconKey: string;
  order?: number;
};

export type Experience = {
  role: string;
  company: string;
  timeframe: string;
  bullets: string[];
  order?: number;
};

export type Project = {
  name: string;
  focus: string;
  description: string;
  order?: number;
};

export type ImpactStat = {
  label: string;
  value: string;
  sublabel: string;
  order?: number;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  order?: number;
};

export type BlogMetadata = {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  publishedTime: string;
  modifiedTime: string;
};

export type Blog = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  metadata: BlogMetadata;
};

export type Profile = {
  name: string;
  headline: string;
  subheadline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
};

export type CmsData = {
  profile: Profile;
  highlights: Highlight[];
  experiences: Experience[];
  projects: Project[];
  impactStats: ImpactStat[];
  testimonials: Testimonial[];
  blogs: Blog[];
};
