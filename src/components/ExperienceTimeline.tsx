import { Experience } from "@/data/resume";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <section id="experience" className="section-padding px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Experience</p>
          <h2 className="heading-secondary mt-3 text-balance text-slate-900 dark:text-slate-100">
            Leadership across product strategy, engineering rigor, and scaled delivery
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-3xl">
            Roles that showcase how Vinay balances customer insight, technical execution, and measurable business outcomes.
          </p>
        </div>
        <div className="relative mt-12 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-blue-500 before:via-blue-400/40 before:to-transparent md:before:left-10">
          {items.map((item) => (
            <article key={`${item.role}-${item.company}`} className="relative mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/60">
              <span className="absolute left-2 top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow-md md:left-8" />
              <div className="md:ml-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300">
                  {item.timeframe}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{item.role}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{item.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
