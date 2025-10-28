import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { dispatchMagicLink } from "@/lib/auth/magicLink";
import { destroySession, getActiveSession } from "@/lib/auth/session";
import { clearExpiredTokens } from "@/lib/auth/store";
import {
  getCmsData,
  replaceBlogs,
  replaceExperiences,
  replaceHighlights,
  replaceImpactStats,
  replaceProjects,
  replaceTestimonials,
  updateProfile,
} from "@/lib/cms/storage";
import type {
  Blog,
  Experience,
  Highlight,
  ImpactStat,
  Profile,
  Project,
  Testimonial,
} from "@/lib/cms/types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase();

function parseJsonArrayOrRedirect<T>(
  rawValue: FormDataEntryValue | null,
  mapFn: (value: unknown, index: number) => T,
  errorCode: string,
): T[] {
  if (typeof rawValue !== "string") {
    redirect(`/admin?error=${errorCode}`);
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      redirect(`/admin?error=${errorCode}`);
    }

    return parsed.map(mapFn);
  } catch (error) {
    console.error(`Failed parsing admin JSON payload for ${errorCode}:`, error);
    redirect(`/admin?error=${errorCode}`);
  }
}

function ensureString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

type AdminPageProps = {
  searchParams?: {
    status?: string;
    error?: string;
  };
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await getActiveSession();

  async function requestMagicLink(formData: FormData) {
    "use server";

    const email = ensureString(formData.get("email")).toLowerCase();

    if (!ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL environment variable is not configured.");
      redirect("/admin?error=missing-admin-email");
    }

    if (!email || email !== ADMIN_EMAIL) {
      redirect("/admin?error=invalid-email");
    }

    await clearExpiredTokens();
    await dispatchMagicLink(email);
    redirect("/admin?status=magic-link-sent");
  }

  if (!session) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center gap-8 px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Admin access</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Enter the authorised email address to receive a one-time magic link.
          </p>
          <form action={requestMagicLink} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="you@example.com"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Send magic link
            </button>
          </form>
          {searchParams?.status === "magic-link-sent" && (
            <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
              Magic link sent. Check your inbox to continue.
            </p>
          )}
          {searchParams?.error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/20 dark:text-red-200">
              Unable to continue ({searchParams.error}).
            </p>
          )}
        </div>
      </div>
    );
  }

  const cmsData = await getCmsData();

  async function signOutAction() {
    "use server";
    await destroySession();
    redirect("/admin?status=signed-out");
  }

  async function updateProfileAction(formData: FormData) {
    "use server";

    const nextProfile: Profile = {
      name: ensureString(formData.get("name")) || cmsData.profile.name,
      headline: ensureString(formData.get("headline")) || cmsData.profile.headline,
      subheadline: ensureString(formData.get("subheadline")) || cmsData.profile.subheadline,
      summary: ensureString(formData.get("summary")) || cmsData.profile.summary,
      location: ensureString(formData.get("location")) || cmsData.profile.location,
      email: ensureString(formData.get("email")) || cmsData.profile.email,
      phone: ensureString(formData.get("phone")) || cmsData.profile.phone,
      linkedin: ensureString(formData.get("linkedin")) || cmsData.profile.linkedin,
    };

    await updateProfile(nextProfile);
    revalidatePath("/");
    redirect("/admin?status=profile-updated");
  }

  async function replaceHighlightsAction(formData: FormData) {
    "use server";
    const highlights = parseJsonArrayOrRedirect<Highlight>(
      formData.get("highlights"),
      (item) => ({
        title: String((item as Highlight).title ?? ""),
        metric: String((item as Highlight).metric ?? ""),
        description: String((item as Highlight).description ?? ""),
        iconKey: String((item as Highlight).iconKey ?? "MdLeaderboard"),
        order: typeof (item as Highlight).order === "number" ? (item as Highlight).order : undefined,
      }),
      "highlights-invalid",
    );
    await replaceHighlights(highlights);
    revalidatePath("/");
    redirect("/admin?status=highlights-updated");
  }

  async function replaceExperiencesAction(formData: FormData) {
    "use server";
    const experiences = parseJsonArrayOrRedirect<Experience>(
      formData.get("experiences"),
      (item, index) => ({
        role: String((item as Experience).role ?? ""),
        company: String((item as Experience).company ?? ""),
        timeframe: String((item as Experience).timeframe ?? ""),
        bullets: Array.isArray((item as Experience).bullets)
          ? (item as Experience).bullets.map((bullet) => String(bullet))
          : cmsData.experiences[index]?.bullets ?? [],
        order: typeof (item as Experience).order === "number" ? (item as Experience).order : undefined,
      }),
      "experiences-invalid",
    );
    await replaceExperiences(experiences);
    revalidatePath("/");
    redirect("/admin?status=experiences-updated");
  }

  async function replaceProjectsAction(formData: FormData) {
    "use server";
    const projects = parseJsonArrayOrRedirect<Project>(
      formData.get("projects"),
      (item) => ({
        name: String((item as Project).name ?? ""),
        focus: String((item as Project).focus ?? ""),
        description: String((item as Project).description ?? ""),
        order: typeof (item as Project).order === "number" ? (item as Project).order : undefined,
      }),
      "projects-invalid",
    );
    await replaceProjects(projects);
    revalidatePath("/");
    redirect("/admin?status=projects-updated");
  }

  async function replaceImpactStatsAction(formData: FormData) {
    "use server";
    const stats = parseJsonArrayOrRedirect<ImpactStat>(
      formData.get("impactStats"),
      (item) => ({
        label: String((item as ImpactStat).label ?? ""),
        value: String((item as ImpactStat).value ?? ""),
        sublabel: String((item as ImpactStat).sublabel ?? ""),
        order: typeof (item as ImpactStat).order === "number" ? (item as ImpactStat).order : undefined,
      }),
      "impact-stats-invalid",
    );
    await replaceImpactStats(stats);
    revalidatePath("/");
    redirect("/admin?status=impact-updated");
  }

  async function replaceTestimonialsAction(formData: FormData) {
    "use server";
    const testimonials = parseJsonArrayOrRedirect<Testimonial>(
      formData.get("testimonials"),
      (item) => ({
        quote: String((item as Testimonial).quote ?? ""),
        name: String((item as Testimonial).name ?? ""),
        title: String((item as Testimonial).title ?? ""),
        order: typeof (item as Testimonial).order === "number" ? (item as Testimonial).order : undefined,
      }),
      "testimonials-invalid",
    );
    await replaceTestimonials(testimonials);
    revalidatePath("/");
    redirect("/admin?status=testimonials-updated");
  }

  async function replaceBlogsAction(formData: FormData) {
    "use server";
    const blogs = parseJsonArrayOrRedirect<Blog>(
      formData.get("blogs"),
      (item, index) => ({
        id: typeof (item as Blog).id === "number" ? (item as Blog).id : index + 1,
        slug: String((item as Blog).slug ?? ""),
        title: String((item as Blog).title ?? ""),
        date: String((item as Blog).date ?? new Date().toISOString()),
        excerpt: String((item as Blog).excerpt ?? ""),
        content: String((item as Blog).content ?? ""),
        tags: Array.isArray((item as Blog).tags) ? (item as Blog).tags.map((tag) => String(tag)) : [],
        metadata: {
          title: String((item as Blog).metadata?.title ?? (item as Blog).title ?? ""),
          description: String((item as Blog).metadata?.description ?? ""),
          keywords: Array.isArray((item as Blog).metadata?.keywords)
            ? (item as Blog).metadata!.keywords.map((keyword) => String(keyword))
            : [],
          author: String((item as Blog).metadata?.author ?? cmsData.profile.name),
          publishedTime: String((item as Blog).metadata?.publishedTime ?? new Date().toISOString()),
          modifiedTime: String((item as Blog).metadata?.modifiedTime ?? new Date().toISOString()),
        },
      }),
      "blogs-invalid",
    );

    await replaceBlogs(blogs);
    revalidatePath("/");
    revalidatePath("/blogs");
    revalidatePath("/blogs/[slug]");
    redirect("/admin?status=blogs-updated");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Content admin</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Signed in as <span className="font-medium">{session.email}</span>
            </p>
            {searchParams?.status && (
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                {searchParams.status.replace(/-/g, " ")}
              </p>
            )}
            {searchParams?.error && (
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
                {searchParams.error.replace(/-/g, " ")}
              </p>
            )}
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
          <form action={updateProfileAction} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Name
              <input
                name="name"
                defaultValue={cmsData.profile.name}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Headline
              <input
                name="headline"
                defaultValue={cmsData.profile.headline}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200 sm:col-span-2">
              Subheadline
              <input
                name="subheadline"
                defaultValue={cmsData.profile.subheadline}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200 sm:col-span-2">
              Summary
              <textarea
                name="summary"
                rows={4}
                defaultValue={cmsData.profile.summary}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Location
              <input
                name="location"
                defaultValue={cmsData.profile.location}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Email
              <input
                type="email"
                name="email"
                defaultValue={cmsData.profile.email}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              Phone
              <input
                name="phone"
                defaultValue={cmsData.profile.phone}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-200">
              LinkedIn
              <input
                name="linkedin"
                defaultValue={cmsData.profile.linkedin}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="mt-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Save profile
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Highlights</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of highlight objects. Fields: title, metric, description, iconKey, order (optional).
          </p>
          <form action={replaceHighlightsAction} className="mt-4 space-y-4">
            <textarea
              name="highlights"
              rows={8}
              defaultValue={JSON.stringify(cmsData.highlights, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save highlights
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Experience</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of experience entries. Fields: role, company, timeframe, bullets[], order (optional).
          </p>
          <form action={replaceExperiencesAction} className="mt-4 space-y-4">
            <textarea
              name="experiences"
              rows={10}
              defaultValue={JSON.stringify(cmsData.experiences, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save experience timeline
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Projects</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of project entries. Fields: name, focus, description, order (optional).
          </p>
          <form action={replaceProjectsAction} className="mt-4 space-y-4">
            <textarea
              name="projects"
              rows={8}
              defaultValue={JSON.stringify(cmsData.projects, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save projects
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Impact stats</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of stats. Fields: label, value, sublabel, order (optional).
          </p>
          <form action={replaceImpactStatsAction} className="mt-4 space-y-4">
            <textarea
              name="impactStats"
              rows={6}
              defaultValue={JSON.stringify(cmsData.impactStats, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save impact stats
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Testimonials</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of testimonials. Fields: quote, name, title, order (optional).
          </p>
          <form action={replaceTestimonialsAction} className="mt-4 space-y-4">
            <textarea
              name="testimonials"
              rows={8}
              defaultValue={JSON.stringify(cmsData.testimonials, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save testimonials
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Blogs</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Provide an array of blog entries. Each entry should include id, slug, title, date, excerpt, content, tags, and metadata.
          </p>
          <form action={replaceBlogsAction} className="mt-4 space-y-4">
            <textarea
              name="blogs"
              rows={16}
              defaultValue={JSON.stringify(cmsData.blogs, null, 2)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Save blogs
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
