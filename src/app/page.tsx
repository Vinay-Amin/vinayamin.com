"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navigation = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

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
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="#hero" className="text-lg font-semibold tracking-tight text-white">
            Vinay Amin
          </Link>
          <button
            className="rounded-full border border-slate-800 p-2 text-slate-200 transition hover:border-slate-600 hover:text-white md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </button>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {isMenuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-6 pb-6 pt-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium text-slate-200">
              {navigation.map((item) => (
                <Link key={item.label} href={item.href} onClick={toggleMenu} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="section-padding px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">Product Leadership</p>
              <h1 className="text-balance font-display text-4xl tracking-tight text-white sm:text-5xl">
                Guiding data-rich platforms from vision to shipped outcomes
              </h1>
              <p className="text-lg text-slate-300">
                Vinay Amin is a product and technology leader based in Bengaluru who builds analytics platforms that translate
                complex strategy into measurable delivery. He blends roadmapping, experimentation, and engineering stewardship to
                help civic and enterprise teams scale impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                >
                  Let&apos;s Collaborate
                </Link>
                <Link
                  href="/vinay-amin-resume.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:text-white"
                >
                  Download Resume
                </Link>
              </div>
              <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Current Focus</span>
                  Product Manager, Varahe Analytics
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Expertise</span>
                  Analytics SaaS · Experimentation · Delivery Rigor
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Location</span>
                  Bengaluru, India
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-400/10 to-transparent blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
                <Image
                  src="/vinay-amin-headshot.svg"
                  alt="Vinay Amin portrait"
                  width={520}
                  height={520}
                  className="mx-auto h-auto w-full max-w-xs"
                  priority
                />
                <div className="mt-6 space-y-2 text-sm text-slate-300">
                  <p>
                    Previously led backend engineering at DeepByte Technology and delivered resilient omnichannel platforms at
                    Kaleyra.
                  </p>
                  <p>
                    Trusted by stakeholders for synthesising insights into roadmaps that lift retention, revenue, and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-padding bg-slate-900/60 px-6">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">About Me</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Building clarity and momentum across product lifecycles</h2>
              <p className="text-lg text-slate-300">
                Vinay pairs product discovery with engineering craftsmanship to convert ambiguous requirements into outcomes.
                Recent work at Varahe Analytics established discovery councils, activation scorecards, and KPI instrumentation that
                keep delivery grounded in the metrics that matter.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                <h3 className="text-base font-semibold text-white">Product Strategy &amp; Experimentation</h3>
                <p className="text-sm text-slate-300">
                  Orchestrated analytics SaaS roadmaps end-to-end, sequenced launches around renewal-critical value, and ran 120+
                  experiments to prioritise what delivers measurable growth.
                </p>
              </div>
              <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                <h3 className="text-base font-semibold text-white">Technical Stewardship</h3>
                <p className="text-sm text-slate-300">
                  Mentored distributed engineering teams, modernised event pipelines with 99.97% uptime, and codified delivery
                  rituals that reduced cycle time by 30%.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding px-6">
          <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-blue-500/10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">Collaborate</p>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Let&apos;s design the next experiment-driven launch</h2>
              <p className="text-base text-slate-300">
                Share the challenge you are solving—whether it is orchestrating a new analytics tier, scaling infrastructure, or
                rallying stakeholders around a roadmap. Vinay will return with next steps and ways to help.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <p>vinayamin1997@gmail.com</p>
                <p>+91 82178 66171</p>
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
                <span>Project Context</span>
                <textarea id="message" name="message" rows={4} required placeholder="What challenge can Vinay help solve?" />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                disabled={formStatus.state === "loading"}
              >
                {formStatus.state === "loading" ? "Sending..." : "Send Message"}
              </button>
              {formStatus.state === "success" && (
                <p className="text-sm text-green-400">{formStatus.message}</p>
              )}
              {formStatus.state === "error" && (
                <p className="text-sm text-rose-400">{formStatus.message}</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
