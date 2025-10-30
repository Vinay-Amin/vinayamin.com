import "server-only";

import fallbackBlogPosts from "@/data/blog-cache.json";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;

const POST_CONTENT_TYPE = process.env.CONTENTFUL_POST_CONTENT_TYPE_ID;

const POST_TITLE_FIELD = process.env.CONTENTFUL_POST_TITLE_FIELD ?? "title";
const POST_SLUG_FIELD = process.env.CONTENTFUL_POST_SLUG_FIELD ?? "slug";
const POST_EXCERPT_FIELD = process.env.CONTENTFUL_POST_EXCERPT_FIELD ?? "excerpt";
const POST_BODY_FIELD = process.env.CONTENTFUL_POST_BODY_FIELD ?? "body";
const POST_PUBLISH_DATE_FIELD = process.env.CONTENTFUL_POST_PUBLISH_DATE_FIELD ?? "publishDate";
const POST_TAGS_FIELD = process.env.CONTENTFUL_POST_TAGS_FIELD ?? "tags";
const POST_AUTHOR_FIELD = process.env.CONTENTFUL_POST_AUTHOR_FIELD ?? "author";
const POST_HERO_IMAGE_FIELD = process.env.CONTENTFUL_POST_HERO_IMAGE_FIELD ?? "heroImage";
const POST_SEO_TITLE_FIELD = process.env.CONTENTFUL_POST_SEO_TITLE_FIELD ?? "seoTitle";
const POST_SEO_DESCRIPTION_FIELD = process.env.CONTENTFUL_POST_SEO_DESCRIPTION_FIELD ?? "seoDescription";

const ASSET_TITLE_FIELD = process.env.CONTENTFUL_ASSET_TITLE_FIELD ?? "title";
const ASSET_DESCRIPTION_FIELD = process.env.CONTENTFUL_ASSET_DESCRIPTION_FIELD ?? "description";
const ASSET_FILE_URL_FIELD = process.env.CONTENTFUL_ASSET_FILE_URL_FIELD ?? "file";
const ASSET_FILE_WIDTH_FIELD = process.env.CONTENTFUL_ASSET_FILE_WIDTH_FIELD ?? "details.image.width";
const ASSET_FILE_HEIGHT_FIELD = process.env.CONTENTFUL_ASSET_FILE_HEIGHT_FIELD ?? "details.image.height";

const DEFAULT_REVALIDATE = 60;

type ContentfulSys = {
  id: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

type ContentfulEntry<TFields = Record<string, unknown>> = {
  sys: ContentfulSys;
  fields: TFields;
};

type ContentfulAsset = {
  sys: ContentfulSys;
  fields: Record<string, unknown>;
};

type ContentfulCollection<TEntry> = {
  items: TEntry[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  publishDate?: string;
  tags: string[];
  author?: string;
  heroImage?: AssetDetails;
  seoTitle?: string;
  seoDescription?: string;
};

const FALLBACK_BLOG_POSTS: BlogPost[] = (fallbackBlogPosts as BlogPost[]).map((post) => ({
  ...post,
  tags: Array.isArray(post.tags) ? [...post.tags] : [],
  heroImage: post.heroImage
    ? {
        ...post.heroImage,
      }
    : undefined,
}));

function cloneFallbackPosts(): BlogPost[] {
  return FALLBACK_BLOG_POSTS.map((post) => ({
    ...post,
    tags: [...post.tags],
    heroImage: post.heroImage ? { ...post.heroImage } : undefined,
  }));
}

function getFallbackPostBySlug(slug: string): BlogPost | null {
  return FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export type AssetDetails = {
  id: string;
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
};

type FetchOptions = {
  preview?: boolean;
  query?: URLSearchParams;
  revalidate?: number;
};

function isContentfulConfigured() {
  return Boolean(SPACE_ID && DELIVERY_TOKEN);
}

function getContentfulConfig(preview?: boolean) {
  if (!isContentfulConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Contentful environment variables are not fully configured. Blog content will be skipped during build."
      );
    }
    return null;
  }

  if (preview && !PREVIEW_TOKEN && process.env.NODE_ENV !== "production") {
    console.warn("CONTENTFUL_PREVIEW_TOKEN is not set. Falling back to delivery token for preview mode.");
  }

  return {
    spaceId: SPACE_ID as string,
    environment: ENVIRONMENT,
    token: preview && PREVIEW_TOKEN ? PREVIEW_TOKEN : (DELIVERY_TOKEN as string),
    baseUrl: preview && PREVIEW_TOKEN ? "https://preview.contentful.com" : "https://cdn.contentful.com",
  } as const;
}

function getQuery(params?: URLSearchParams) {
  const query = params ?? new URLSearchParams();
  query.set("include", "2");
  if (POST_CONTENT_TYPE) {
    query.set("content_type", POST_CONTENT_TYPE);
  }
  if (!query.has("order")) {
    query.set("order", `-fields.${POST_PUBLISH_DATE_FIELD}`);
  }
  return query;
}

async function contentfulFetch<TEntry>(options: FetchOptions = {}): Promise<ContentfulCollection<ContentfulEntry>> {
  const { preview = false, query = getQuery(options.query), revalidate = DEFAULT_REVALIDATE } = options;
  const config = getContentfulConfig(preview);

  if (!config) {
    return { items: [] };
  }

  const url = new URL(`/spaces/${config.spaceId}/environments/${config.environment}/entries`, config.baseUrl);
  query.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Contentful: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as ContentfulCollection<ContentfulEntry>;
}

function getFieldValue<T = unknown>(fields: Record<string, unknown>, path: string): T | undefined {
  const segments = path.split(".");
  let current: unknown = fields;

  for (const segment of segments) {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }

  return current as T | undefined;
}

function buildAsset(asset: ContentfulAsset): AssetDetails | undefined {
  const fields = asset.fields;
  const url = getFieldValue<string>(fields, ASSET_FILE_URL_FIELD);
  if (!url) return undefined;

  const title = getFieldValue<string>(fields, ASSET_TITLE_FIELD);
  const description = getFieldValue<string>(fields, ASSET_DESCRIPTION_FIELD);
  const width = Number(getFieldValue(fields, ASSET_FILE_WIDTH_FIELD));
  const height = Number(getFieldValue(fields, ASSET_FILE_HEIGHT_FIELD));

  return {
    id: asset.sys.id,
    url: url.startsWith("//") ? `https:${url}` : url,
    title,
    description,
    width: Number.isFinite(width) ? width : undefined,
    height: Number.isFinite(height) ? height : undefined,
  };
}

function resolveAssetFromReference(reference: unknown, assets: ContentfulAsset[] | undefined): AssetDetails | undefined {
  if (!reference || !assets) return undefined;

  const references = Array.isArray(reference) ? reference : [reference];

  for (const ref of references) {
    const id = typeof ref === "object" && ref !== null && "sys" in ref ? (ref as { sys?: { id?: string } }).sys?.id : undefined;
    if (!id) continue;

    const asset = assets.find((item) => item.sys.id === id);
    if (asset) {
      const parsed = buildAsset(asset);
      if (parsed) return parsed;
    }
  }

  return undefined;
}

function mapBlogPost(entry: ContentfulEntry, assets: ContentfulAsset[] | undefined): BlogPost | null {
  const fields = entry.fields as Record<string, unknown>;
  const slug = getFieldValue<string>(fields, POST_SLUG_FIELD);
  const title = getFieldValue<string>(fields, POST_TITLE_FIELD);

  if (!slug || !title) {
    return null;
  }

  const excerpt = getFieldValue<string>(fields, POST_EXCERPT_FIELD);
  const body = getFieldValue<string>(fields, POST_BODY_FIELD);
  const publishDate = getFieldValue<string>(fields, POST_PUBLISH_DATE_FIELD);
  const tagsField = getFieldValue<unknown>(fields, POST_TAGS_FIELD);
  const author = getFieldValue<string>(fields, POST_AUTHOR_FIELD);
  const heroImageRef = getFieldValue(fields, POST_HERO_IMAGE_FIELD);
  const seoTitle = getFieldValue<string>(fields, POST_SEO_TITLE_FIELD);
  const seoDescription = getFieldValue<string>(fields, POST_SEO_DESCRIPTION_FIELD);

  const tags = Array.isArray(tagsField)
    ? tagsField.filter((tag): tag is string => typeof tag === "string")
    : typeof tagsField === "string"
      ? tagsField.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  const heroImage = resolveAssetFromReference(heroImageRef, assets);

  return {
    id: entry.sys.id,
    title,
    slug,
    excerpt,
    body,
    publishDate,
    tags,
    author,
    heroImage,
    seoTitle,
    seoDescription,
  };
}

export async function getBlogPosts(options: { preview?: boolean; limit?: number } = {}): Promise<BlogPost[]> {
  if (!isContentfulConfigured()) {
    return cloneFallbackPosts();
  }

  const query = getQuery();
  if (options.limit) {
    query.set("limit", options.limit.toString());
  }

  try {
    const collection = await contentfulFetch({
      preview: options.preview,
      query,
    });

    const assets = collection.includes?.Asset;
    const posts = collection.items
      .map((entry) => mapBlogPost(entry, assets))
      .filter((post): post is BlogPost => Boolean(post));

    return posts.length > 0 ? posts : cloneFallbackPosts();
  } catch (error) {
    console.error("getBlogPosts: failed to fetch from Contentful:", error);
    return cloneFallbackPosts();
  }
}

export async function getBlogPostBySlug(slug: string, options: { preview?: boolean } = {}): Promise<BlogPost | null> {
  if (!isContentfulConfigured()) {
    return getFallbackPostBySlug(slug);
  }

  const query = getQuery();
  query.set(`fields.${POST_SLUG_FIELD}`, slug);
  query.set("limit", "1");

  try {
    const collection = await contentfulFetch({
      preview: options.preview,
      query,
    });

    const assets = collection.includes?.Asset;
    const [entry] = collection.items;
    const post = entry ? mapBlogPost(entry, assets) : null;

    return post ?? getFallbackPostBySlug(slug);
  } catch (error) {
    console.error("getBlogPostBySlug: failed to fetch from Contentful:", error);
    return getFallbackPostBySlug(slug);
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!isContentfulConfigured()) {
    return cloneFallbackPosts().map((post) => post.slug);
  }

  const query = getQuery();
  query.set("select", `fields.${POST_SLUG_FIELD}`);
  try {
    const collection = await contentfulFetch({ query });
    const slugs = collection.items
      .map((entry) => getFieldValue<string>(entry.fields as Record<string, unknown>, POST_SLUG_FIELD))
      .filter((slug): slug is string => Boolean(slug));

    return slugs.length > 0 ? slugs : cloneFallbackPosts().map((post) => post.slug);
  } catch (error) {
    console.error("getAllBlogSlugs: failed to fetch from Contentful:", error);
    return cloneFallbackPosts().map((post) => post.slug);
  }
}
