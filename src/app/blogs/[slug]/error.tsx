"use client";

import { useEffect } from "react";
import { BlogNavigation } from "@/components/BlogNavigation";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Blog post failed to load", error);
  }, [error]);

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100">
      <BlogNavigation pageType="blog" />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-10 text-center">
          <h1 className="text-2xl font-semibold text-white">We couldn&apos;t load this story</h1>
          <p className="mt-3 text-sm text-red-200">
            Double-check your Contentful entry slug or try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-blue-400/50 px-6 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-300 hover:text-white"
          >
            Retry
          </button>
        </div>
      </main>
    </div>
  );
}
