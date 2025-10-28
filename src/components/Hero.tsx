'use client';

import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import type { Profile } from "@/lib/cms/types";

type HeroProps = Pick<
  Profile,
  "headline" | "subheadline" | "summary" | "location" | "email" | "phone" | "linkedin"
>;

export function Hero({
  headline,
  subheadline,
  summary,
  location,
  email,
  phone,
  linkedin,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 text-slate-100">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-12 h-72 w-72 rounded-full bg-blue-500/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-12 px-6 py-24 md:flex-row md:items-center md:py-28 lg:px-12">
        <div className="mx-auto h-40 w-40 overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-blue-950/20 transition-transform duration-500 hover:-translate-y-1 md:h-56 md:w-56">
          <Image
            src="/vinay-amin-headshot.svg"
            alt="Vinay Amin headshot"
            width={224}
            height={224}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200/80">Product Leader</p>
          <h1 className="mt-4 text-balance font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-4 text-lg text-slate-100/80 sm:text-xl">{subheadline}</p>
          <p className="mt-6 max-w-2xl text-pretty text-base text-slate-100/75 sm:text-lg">{summary}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-100/80 md:justify-start">
            <span className="rounded-full border border-white/20 px-4 py-2">{location}</span>
            <a href={`mailto:${email}`} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
              {email}
            </a>
            <a href={`tel:${phone}`} className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
              {phone}
            </a>
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              LinkedIn
            </Link>
          </div>
          <div className="mt-10 flex justify-center md:justify-start">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-blue-950/30 transition hover:bg-blue-100"
            >
              Let&apos;s build together
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
