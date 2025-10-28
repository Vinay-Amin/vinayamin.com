'use client';

import Link from "next/link";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

import type {
  Experience,
  Highlight,
  ImpactStat,
  Profile,
  Project,
  Testimonial,
} from "@/lib/cms/types";

import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ImpactStats } from "./ImpactStats";

export type HomeClientProps = {
  profile: Profile;
  highlights: Highlight[];
  experiences: Experience[];
  projects: Project[];
  impactStats: ImpactStat[];
  testimonials: Testimonial[];
};

export function HomeClient({
  profile,
  highlights,
  experiences,
  projects,
  impactStats,
  testimonials,
}: HomeClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="bg-gradient-to-b from-white via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-12">
          <Link href="#hero" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {profile.name}
          </Link>
          <button
            className="md:hidden rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <Link href="#highlights" className="nav-link">
              Highlights
            </Link>
            <Link href="#experience" className="nav-link">
              Experience
            </Link>
            <Link href="#projects" className="nav-link">
              Projects
            </Link>
            <Link href="#impact" className="nav-link">
              Impact
            </Link>
            <Link href="#contact" className="nav-link">
              Contact
            </Link>
          </nav>
        </div>
        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 shadow-md dark:border-slate-800 dark:bg-slate-950 md:hidden">
            <nav className="flex flex-col space-y-4 text-sm font-medium text-slate-700 dark:text-slate-200">
              {[
                { href: "#highlights", label: "Highlights" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#impact", label: "Impact" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} onClick={toggleMenu} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <div id="hero">
          <Hero
            headline={profile.headline}
            subheadline={profile.subheadline}
            summary={profile.summary}
            location={profile.location}
            email={profile.email}
            phone={profile.phone}
            linkedin={profile.linkedin}
          />
        </div>

        <Highlights items={highlights} />
        <ExperienceTimeline items={experiences} />

        <section id="projects" className="section-padding px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Projects</p>
              <h2 className="heading-secondary text-balance text-slate-900 dark:text-slate-100">
                Programs and products that unlocked measurable change
              </h2>
              <p className="text-muted mx-auto max-w-3xl text-pretty">
                A mix of civic innovation, digital transformation, and operational reinvention led with curiosity and clarity.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500/90 dark:text-blue-300">
                      {project.focus}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{project.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div id="impact">
          <ImpactStats stats={impactStats} testimonials={testimonials} />
        </div>

        <section id="contact" className="section-padding px-6">
          <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
            <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Get in touch</p>
                <h2 className="heading-secondary mt-3 text-slate-900 dark:text-slate-100">
                  Let&apos;s collaborate on products that move communities forward
                </h2>
                <p className="text-muted mt-4">
                  Share a challenge, idea, or partnership opportunity. Vinay will respond within two business days.
                </p>
                <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {profile.email}
                  </a>
                  <p>{profile.phone}</p>
                </div>
              </div>
              <form className="grid gap-4">
                <label className="form-field">
                  <span>Full Name</span>
                  <input type="text" name="fullName" placeholder="Vinay V P" autoComplete="name" />
                </label>
                <label className="form-field">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="name@email.com" autoComplete="email" />
                </label>
                <label className="form-field">
                  <span>Phone</span>
                  <input type="tel" name="phone" placeholder="(+91)" autoComplete="tel" />
                </label>
                <label className="form-field">
                  <span>Organisation</span>
                  <input type="text" name="organization" placeholder="Your company" autoComplete="organization" />
                </label>
                <label className="form-field">
                  <span>How can we collaborate?</span>
                  <textarea name="message" rows={4} placeholder="Share context, goals, and timelines." />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:from-blue-500 hover:to-cyan-400"
                >
                  Send message
                  <BsArrowRight />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white px-6 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        <p>© {new Date().getFullYear()} {profile.name}. Crafted with empathy and intent.</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            LinkedIn
          </Link>
          <Link href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            Email
          </Link>
        </div>
      </footer>
    </div>
  );
}
