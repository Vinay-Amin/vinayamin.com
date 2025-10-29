import { BlogNavigation } from "@/components/BlogNavigation";

export default function Loading() {
  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <BlogNavigation pageType="blogs" />
      <main className="mx-auto max-w-5xl px-6 pb-16 pt-32">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-3 w-40 animate-pulse rounded-full bg-slate-800" />
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded-full bg-slate-800" />
          <div className="mx-auto h-4 w-2/3 animate-pulse rounded-full bg-slate-900" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/60" />
          ))}
        </div>
      </main>
    </div>
  );
}
