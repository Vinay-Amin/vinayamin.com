'use client';

import { useEffect, useState } from "react";
import { ImpactStat, Testimonial } from "@/data/resume";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const AUTOPLAY_INTERVAL = 7000;

type ImpactStatsProps = {
  stats: ImpactStat[];
  testimonials: Testimonial[];
};

export function ImpactStats({ stats, testimonials }: ImpactStatsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((prev) => {
      const next = (prev + direction + testimonials.length) % testimonials.length;
      return next;
    });
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 px-6 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">Impact</p>
            <h2 className="heading-secondary mt-3 text-balance text-slate-100">
              Social innovation, measurable outcomes, and empowered teams
            </h2>
            <p className="mt-4 text-pretty text-slate-300">
              Whether guiding civic programs or scaling SaaS platforms, Vinay grounds decisions in data, empathy, and iterative learning.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <dt className="text-sm uppercase tracking-[0.2em] text-blue-200/80">{stat.label}</dt>
                  <dd className="mt-2 text-4xl font-bold text-white">{stat.value}</dd>
                  <p className="mt-3 text-sm text-slate-300">{stat.sublabel}</p>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
            <div className="absolute -top-20 -right-10 h-40 w-40 rounded-full bg-blue-500/40 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200/80">Testimonials</p>
              <blockquote className="mt-6 text-lg leading-relaxed text-slate-100">
                “{activeTestimonial.quote}”
              </blockquote>
              <div className="mt-6 text-sm font-medium text-blue-100">
                {activeTestimonial.name}
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-blue-200/70">
                {activeTestimonial.title}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <span
                      key={index}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        index === activeIndex ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
                    aria-label="Previous testimonial"
                  >
                    <BsArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10"
                    aria-label="Next testimonial"
                  >
                    <BsArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
