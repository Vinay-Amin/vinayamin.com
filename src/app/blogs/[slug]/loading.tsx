import { BlogNavigation } from "@/components/BlogNavigation";

export default function Loading() {
  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <BlogNavigation pageType="blog" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <div className="space-y-6">
          <div className="mx-auto h-3 w-32 animate-pulse rounded-full bg-slate-800" />
          <div className="mx-auto h-12 w-full animate-pulse rounded-full bg-slate-800" />
          <div className="mx-auto h-4 w-1/2 animate-pulse rounded-full bg-slate-900" />
        </div>
        <div className="mt-10 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-6 animate-pulse rounded-full bg-slate-900/80" />
          ))}
        </div>
      </main>
    </div>
  );
}
