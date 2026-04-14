"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaChartLine,
  FaRocket,
  FaServer,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

import { RESUME_DOWNLOAD_URL } from "@/config/site";
import { AnimatedSection, AnimatedItem } from "@/components/AnimatedSection";
import { CountUp } from "@/components/CountUp";
import { ParticleField } from "@/components/ParticleField";

/* ─── Data ─── */
const navigation = [
  { href: "#hero", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#impact", label: "Impact" },
  { href: "#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

const journeySteps = [
  {
    year: "2021",
    role: "Associate Software Engineer",
    company: "Kaleyra",
    description: "Shipped omnichannel platform components, optimised infrastructure spend by tuning queuing & caching layers.",
    accent: "#38bdf8",
    icon: FaServer,
  },
  {
    year: "2022",
    role: "Backend Team Lead",
    company: "DeepByte Technology",
    description: "Architected Python services processing 4M+ monthly transactions. Mentored a distributed team of 6 engineers.",
    accent: "#a78bfa",
    icon: FaRocket,
  },
  {
    year: "2023",
    role: "Product Manager",
    company: "Varahe Analytics",
    description: "Leading analytics SaaS roadmap from discovery through release, running 120+ experiments to validate feature bets.",
    accent: "#6366f1",
    icon: MdLeaderboard,
  },
];

const impactMetrics = [
  { value: 4.2, prefix: "$", suffix: "M", label: "ARR Influenced", icon: FaChartLine },
  { value: 120, prefix: "", suffix: "+", label: "Experiments Shipped", icon: FaRocket },
  { value: 30, prefix: "", suffix: "%", label: "Faster Delivery", icon: FaServer },
  { value: 99.97, prefix: "", suffix: "%", label: "Pipeline Uptime", icon: MdLeaderboard },
];

const projects = [
  {
    name: "Signal Insights Platform",
    focus: "Enterprise Analytics SaaS",
    result: "+12% renewals",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    name: "Viyaat Consulting",
    focus: "Digital Delivery Platform",
    result: "+30% throughput",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Aatri Experiential Travel",
    focus: "Experience Orchestration",
    result: "+18pt CSAT",
    gradient: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    name: "SphereTree Analytics",
    focus: "Insight Storytelling",
    result: "Data-driven adoption",
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
];

const testimonials = [
  {
    quote: "Vinay is the rare product leader who can translate ambiguous problem spaces into crisp, data-backed product strategy.",
    name: "Sahana Rao",
    title: "VP, Product Strategy",
  },
  {
    quote: "He creates clarity in complex stakeholder environments and rallies teams around measurable outcomes.",
    name: "Arjun Menon",
    title: "Head of Engineering, DeepByte",
  },
  {
    quote: "From roadmap to rollout, Vinay ensures every decision ladders up to user impact and business value.",
    name: "Priya Desai",
    title: "Product Marketing Lead",
  },
];

/* ─── Page ─── */
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formStatus, setFormStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleContactSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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

        if (data?.mailto) {
          window.open(data.mailto, "_blank");
          form.reset();
          setFormStatus({ state: "success", message: "Opening your email client..." });
          return;
        }

        form.reset();
        setFormStatus({ state: "success", message: data?.message ?? "Thanks for reaching out!" });
      } catch (error) {
        console.error("Failed to submit contact form", error);
        setFormStatus({ state: "error", message: "Unable to send message right now. Please try again soon." });
      }
    },
    [],
  );

  return (
    <div className="min-h-screen bg-gray-950 text-slate-100 grain-overlay">
      {/* ━━━ Header ━━━ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-gray-950/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="#hero" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/25">
              VA
            </div>
            <span className="text-base font-semibold tracking-tight text-white transition group-hover:text-indigo-300">
              Vinay Amin
            </span>
          </Link>

          <button
            className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:border-white/20 hover:text-white md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={RESUME_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
            >
              Resume
            </Link>
          </nav>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/[0.04] md:hidden"
            >
              <nav className="flex flex-col gap-1 px-6 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={toggleMenu}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* ━━━ Hero ━━━ */}
        <section id="hero" className="relative min-h-screen overflow-hidden px-6 pt-28 pb-20 flex items-center">
          <ParticleField />
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />

          <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Product & Technology Leader
              </motion.div>

              <h1 className="font-display text-5xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-white">Turning data</span>
                <br />
                <span className="gradient-text">into outcomes</span>
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-slate-400">
                Building analytics platforms that translate complex strategy into
                measurable delivery — from vision to shipped product.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
                >
                  Let&apos;s Collaborate
                  <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#journey"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  View Journey
                </Link>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/vinayvp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-indigo-500/40 hover:text-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a
                  href="mailto:vinayamin1997@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:border-indigo-500/40 hover:text-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <FaEnvelope className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              <div className="animate-pulse-ring absolute -inset-8 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-1 shadow-2xl shadow-indigo-500/10 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-8">
                  <Image
                    src="/vinay-amin-headshot.svg"
                    alt="Vinay Amin portrait"
                    width={520}
                    height={520}
                    className="mx-auto h-auto w-full max-w-[280px]"
                    priority
                  />
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-center">
                      <p className="text-xl font-bold text-white">4+</p>
                      <p className="text-xs text-slate-400">Years Experience</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-center">
                      <p className="text-xl font-bold text-white">3</p>
                      <p className="text-xs text-slate-400">Companies</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex h-10 w-6 items-start justify-center rounded-full border border-white/10 pt-2"
            >
              <div className="h-1.5 w-1 rounded-full bg-white/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* ━━━ Journey Timeline ━━━ */}
        <section id="journey" className="section-padding relative px-6">
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="relative mx-auto max-w-5xl">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">The Journey</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">From engineer to product leader</h2>
            </AnimatedSection>

            <div className="mt-16 space-y-0">
              {journeySteps.map((step, i) => (
                <AnimatedSection key={step.year} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="group relative flex gap-8 pb-16 last:pb-0">
                    {/* Timeline line */}
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gray-950 shadow-xl"
                        style={{ boxShadow: `0 0 30px ${step.accent}20` }}
                      >
                        <step.icon className="h-5 w-5" style={{ color: step.accent }} />
                      </motion.div>
                      {i < journeySteps.length - 1 && (
                        <div className="absolute top-14 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <span
                        className="text-xs font-bold tracking-[0.3em]"
                        style={{ color: step.accent }}
                      >
                        {step.year}
                      </span>
                      <h3 className="mt-1 text-xl font-semibold text-white">{step.role}</h3>
                      <p className="text-sm text-slate-400">{step.company}</p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Impact Metrics ━━━ */}
        <section id="impact" className="section-padding relative overflow-hidden px-6">
          <div className="absolute inset-0 mesh-gradient opacity-60" />
          <div className="relative mx-auto max-w-5xl">
            <AnimatedSection className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">Impact</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Numbers that matter</h2>
            </AnimatedSection>

            <AnimatedSection variant="stagger" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactMetrics.map((metric) => (
                <AnimatedItem key={metric.label}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card group relative overflow-hidden p-6 text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <metric.icon className="mx-auto mb-4 h-6 w-6 text-indigo-400 transition group-hover:text-indigo-300" />
                      <div className="text-3xl font-bold text-white">
                        <CountUp
                          end={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </div>
                      <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ━━━ Projects ━━━ */}
        <section className="section-padding relative px-6">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative mx-auto max-w-5xl">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">Projects</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">What I&apos;ve built</h2>
            </AnimatedSection>

            <AnimatedSection variant="stagger" className="mt-16 grid gap-5 sm:grid-cols-2">
              {projects.map((project) => (
                <AnimatedItem key={project.name}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card group relative overflow-hidden p-7"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    <div className="relative">
                      <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400">
                        {project.focus}
                      </div>
                      <h3 className="text-lg font-semibold text-white transition group-hover:text-indigo-200">
                        {project.name}
                      </h3>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {project.result}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ━━━ Testimonials ━━━ */}
        <section className="section-padding relative overflow-hidden px-6">
          <div className="absolute inset-0 mesh-gradient opacity-40" />
          <div className="relative mx-auto max-w-3xl">
            <AnimatedSection className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">Testimonials</p>
              <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">What people say</h2>
            </AnimatedSection>

            <AnimatedSection className="mt-16">
              <div className="glass-card relative overflow-hidden p-8 sm:p-12">
                <div className="absolute top-6 left-8 text-6xl font-serif text-indigo-500/20">&ldquo;</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
                      {testimonials[activeTestimonial].quote}
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-slate-400">{testimonials[activeTestimonial].title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeTestimonial
                          ? "w-8 bg-indigo-400"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ━━━ Contact ━━━ */}
        <section id="contact" className="section-padding relative px-6">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative mx-auto max-w-5xl">
            <AnimatedSection>
              <div className="glass-card overflow-hidden p-1">
                <div className="rounded-[1.375rem] bg-gradient-to-br from-gray-950/90 to-gray-900/80 p-8 sm:p-12">
                  <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">Get in Touch</p>
                      <h2 className="font-display text-3xl text-white sm:text-4xl">
                        Let&apos;s build something
                        <span className="gradient-text-brand"> together</span>
                      </h2>
                      <p className="text-slate-400 leading-relaxed">
                        Whether you&apos;re orchestrating a new analytics tier, scaling infrastructure,
                        or rallying stakeholders around a roadmap — I&apos;d love to hear about it.
                      </p>

                      <div className="space-y-4 pt-4">
                        <a
                          href="mailto:vinayamin1997@gmail.com"
                          className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                            <FaEnvelope className="h-4 w-4 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Email</p>
                            <p className="text-xs text-slate-400">vinayamin1997@gmail.com</p>
                          </div>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/vinayvp/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                            <FaLinkedinIn className="h-4 w-4 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">LinkedIn</p>
                            <p className="text-xs text-slate-400">linkedin.com/in/vinayvp</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="form-field">
                        <span>Full Name</span>
                        <input id="fullName" name="fullName" type="text" autoComplete="name" required placeholder="Your name" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="form-field">
                          <span>Email</span>
                          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                        </div>
                        <div className="form-field">
                          <span>Phone</span>
                          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
                        </div>
                      </div>
                      <div className="form-field">
                        <span>Organization</span>
                        <input id="organization" name="organization" type="text" placeholder="Company or initiative" />
                      </div>
                      <div className="form-field">
                        <span>Message</span>
                        <textarea id="message" name="message" rows={4} required placeholder="Tell me about your project..." />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 disabled:opacity-50"
                        disabled={formStatus.state === "loading"}
                      >
                        {formStatus.state === "loading" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </motion.button>
                      <AnimatePresence>
                        {formStatus.state === "success" && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                          >
                            {formStatus.message}
                          </motion.p>
                        )}
                        {formStatus.state === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                          >
                            {formStatus.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* ━━━ Footer ━━━ */}
      <footer className="border-t border-white/[0.04] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Vinay Amin. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/vinayvp/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-slate-300"
            >
              LinkedIn
            </a>
            <Link href="/blogs" className="transition hover:text-slate-300">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
