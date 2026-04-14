'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

interface BlogNavigationProps {
  pageType: "home" | "blog" | "blogs";
}

const links = [
  { href: "/", label: "Home" },
  { href: "/#journey", label: "Journey" },
  { href: "/#impact", label: "Impact" },
  { href: "/#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

export function BlogNavigation({ pageType }: BlogNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
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
          {links.map((link) => {
            const isActive = link.href === "/blogs" && (pageType === "blog" || pageType === "blogs");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition hover:bg-white/[0.04] hover:text-white ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={toggleMenu}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
