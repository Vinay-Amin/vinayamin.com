"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaRocket,
  FaServer,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

import { RESUME_DOWNLOAD_URL } from "@/config/site";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ParticleField } from "@/components/ParticleField";

/* ─── Data ─── */
const navigation = [
  { href: "#hero", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

const journeySteps = [
  {
    year: "2021",
    role: "Associate Software Engineer",
    company: "Kaleyra",
    accent: "#38bdf8",
    icon: FaServer,
  },
  {
    year: "2022",
    role: "Backend Team Lead",
    company: "DeepByte Technology",
    accent: "#a78bfa",
    icon: FaRocket,
  },
  {
    year: "2023",
    role: "Product Manager",
    company: "Varahe Analytics",
    accent: "#6366f1",
    icon: MdLeaderboard,
  },
];

/* ─── Page ─── */
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
                  href="mailto:contact@vinayamin.com"
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/vinay-amin-headshot.jpeg"
                    alt="Vinay Amin portrait"
                    className="mx-auto h-auto w-full max-w-[280px] rounded-2xl object-cover"
                  />
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-center">
                      <p className="text-xl font-bold text-white">5+</p>
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
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ Contact ━━━ */}
        <section id="contact" className="section-padding relative px-6">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative mx-auto max-w-3xl">
            <AnimatedSection>
              <div className="glass-card overflow-hidden p-1">
                <div className="rounded-[1.375rem] bg-gradient-to-br from-gray-950/90 to-gray-900/80 p-8 sm:p-14">
                  <div className="space-y-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-400">Get in Touch</p>
                    <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                      Let&apos;s build something
                      <span className="gradient-text-brand"> together</span>
                    </h2>
                    <p className="mx-auto max-w-lg text-slate-400 leading-relaxed">
                      Whether you&apos;re orchestrating a new analytics tier, scaling infrastructure,
                      or rallying stakeholders around a roadmap — let&apos;s talk.
                    </p>

                    <motion.a
                      href="https://calendar.app.google/DPRgryrfHMZqqpbT6"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
                    >
                      <FaCalendarAlt className="h-5 w-5" />
                      Schedule a Meeting
                      <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </motion.a>

                    <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center sm:gap-8">
                      <a
                        href="mailto:contact@vinayamin.com"
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                          <FaEnvelope className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">Email</p>
                          <p className="text-xs text-slate-400">contact@vinayamin.com</p>
                        </div>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/vinayvp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                          <FaLinkedinIn className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">LinkedIn</p>
                          <p className="text-xs text-slate-400">linkedin.com/in/vinayvp</p>
                        </div>
                      </a>
                    </div>
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
          <a
            href="https://www.linkedin.com/in/vinayvp/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-slate-300"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
