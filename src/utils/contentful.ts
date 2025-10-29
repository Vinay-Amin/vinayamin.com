import "server-only";

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

function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
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
  const spaceId = assertEnv("CONTENTFUL_SPACE_ID", SPACE_ID);
  const environment = assertEnv("CONTENTFUL_ENVIRONMENT", ENVIRONMENT);
  const deliveryToken = assertEnv("CONTENTFUL_DELIVERY_TOKEN", DELIVERY_TOKEN);

  const { preview = false, query = getQuery(options.query), revalidate = DEFAULT_REVALIDATE } = options;

  const token = preview ? PREVIEW_TOKEN : deliveryToken;
  if (!token) {
    throw new Error(preview ? "CONTENTFUL_PREVIEW_TOKEN is required for preview mode." : "CONTENTFUL_DELIVERY_TOKEN is required.");
  }

  const baseUrl = preview ? "https://preview.contentful.com" : "https://cdn.contentful.com";
  const url = new URL(`/spaces/${spaceId}/environments/${environment}/entries`, baseUrl);
  query.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
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
  const query = getQuery();
  if (options.limit) {
    query.set("limit", options.limit.toString());
  }

  const collection = await contentfulFetch({
    preview: options.preview,
    query,
  });

  const assets = collection.includes?.Asset;
  return collection.items
    .map((entry) => mapBlogPost(entry, assets))
    .filter((post): post is BlogPost => Boolean(post));
}

export async function getBlogPostBySlug(slug: string, options: { preview?: boolean } = {}): Promise<BlogPost | null> {
  const query = getQuery();
  query.set(`fields.${POST_SLUG_FIELD}`, slug);
  query.set("limit", "1");

  const collection = await contentfulFetch({
    preview: options.preview,
    query,
  });

  const assets = collection.includes?.Asset;
  const [entry] = collection.items;
  const post = entry ? mapBlogPost(entry, assets) : null;

  return post ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const query = getQuery();
  query.set("select", `fields.${POST_SLUG_FIELD}`);
  const collection = await contentfulFetch({ query });
  return collection.items
    .map((entry) => getFieldValue<string>(entry.fields as Record<string, unknown>, POST_SLUG_FIELD))
    .filter((slug): slug is string => Boolean(slug));
}
