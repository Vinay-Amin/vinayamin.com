import type { ComponentType } from "react";

import { FaChartLine, FaHandsHelping, FaLightbulb } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

import type { Highlight } from "@/lib/cms/types";

const iconMap = {
  MdLeaderboard,
  FaChartLine,
  FaHandsHelping,
  FaLightbulb,
} satisfies Record<string, ComponentType<{ className?: string }>>;

export function Highlights({ items }: { items: Highlight[] }) {
  return (
    <section id="highlights" className="section-padding bg-slate-50 px-6 dark:bg-slate-900/60">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Highlights</p>
          <h2 className="heading-secondary text-balance text-slate-900 dark:text-slate-100">
            Outcomes delivered across product, civic impact, and technical leadership
          </h2>
          <p className="text-muted mx-auto max-w-3xl text-pretty">
            Stories, metrics, and transformation moments that showcase how Vinay ships clarity, velocity, and measurable value.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((highlight) => {
            const Icon = iconMap[highlight.iconKey] ?? MdLeaderboard;
            return (
              <article
                key={highlight.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-slate-100">{highlight.title}</h3>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{highlight.metric}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{highlight.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
