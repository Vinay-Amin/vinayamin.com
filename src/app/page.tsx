'use client';

import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ImpactStats } from "@/components/ImpactStats";
import {
  experience,
  highlights,
  impactStats,
  projectHighlights,
  testimonials,
} from "@/data/resume";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleContactSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const getValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };
    const payload = {
      fullName: getValue("fullName"),
      email: getValue("email"),
      phone: getValue("phone"),
      organization: getValue("organization"),
      message: getValue("message"),
    };

    setFormStatus({ state: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof data?.message === "string"
            ? data.message
            : data?.errors && typeof data.errors === "object"
              ? Object.values(data.errors as Record<string, string>)[0] ?? "Something went wrong."
              : "Something went wrong.";

        setFormStatus({ state: "error", message });
        return;
      }

      form.reset();
      setFormStatus({ state: "success", message: data?.message ?? "Thanks for reaching out!" });
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setFormStatus({ state: "error", message: "Unable to send message right now. Please try again soon." });
    }
  }, [setFormStatus]);

  return (
    <div className="bg-gradient-to-b from-white via-white to-slate-50 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-12">
          <Link href="#hero" className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Vinay Amin
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
            headline="Vinay Amin"
            subheadline="Product & Technology Leader for Data-Rich Platforms"
            summary="Builds enterprise analytics and workflow products that convert strategy into shipped value with engineering rigor and commercial clarity."
            location="Bengaluru, India"
            email="vinayamin1997@gmail.com"
            phone="+91 82178 66171"
            linkedin="https://www.linkedin.com/in/vinayvp/"
          />
        </div>

        <Highlights items={highlights} />
        <ExperienceTimeline items={experience} />

        <section id="projects" className="section-padding px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Projects</p>
              <h2 className="heading-secondary text-balance text-slate-900 dark:text-slate-100">
                Product launches that scaled adoption, revenue, and reliability
              </h2>
              <p className="text-muted mx-auto max-w-3xl text-pretty">
                A portfolio of SaaS and platform initiatives where disciplined product management, engineering excellence, and stakeholder alignment delivered outsized outcomes.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {projectHighlights.map((project) => (
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
                  Let&apos;s accelerate your next product milestone
                </h2>
                <p className="text-muted mt-4">
                  Share a challenge, idea, or partnership opportunity. Vinay will respond within two business days.
                </p>
                <div className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <a href="mailto:vinayamin1997@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                    vinayamin1997@gmail.com
                  </a>
                  <p>+91 82178 66171</p>
                </div>
              </div>
              <form className="grid gap-4" onSubmit={handleContactSubmit}>
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:from-blue-500 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={formStatus.state === "loading"}
                >
                  Send message
                  <BsArrowRight />
                </button>
                <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                  {formStatus.state === "success" && (
                    <p className="text-emerald-600 dark:text-emerald-400">{formStatus.message}</p>
                  )}
                  {formStatus.state === "error" && (
                    <p className="text-rose-600 dark:text-rose-400">{formStatus.message}</p>
                  )}
                  {formStatus.state === "loading" && (
                    <p className="text-slate-600 dark:text-slate-300">Sending message…</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/60 bg-white px-6 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        <p>© {new Date().getFullYear()} Vinay Amin. Crafted with empathy and intent.</p>
        <div className="mt-3 flex justify-center gap-6">
          <Link href="https://www.linkedin.com/in/vinayvp/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
            LinkedIn
          </Link>
          <Link href="mailto:vinayamin1997@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">
            Email
          </Link>
        </div>
      </footer>
    </div>
  );
}
