'use client';

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

interface BlogNavigationProps {
  pageType: "home" | "blog" | "blogs";
}

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

export function BlogNavigation({ pageType }: BlogNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 text-slate-200">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
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
          {links.map((link) => {
            const isActive = link.href === "/blogs" && (pageType === "blog" || pageType === "blogs");
            return (
              <Link key={link.label} href={link.href} className={`nav-link ${isActive ? "text-white" : ""}`}>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 pb-6 pt-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-200">
            {links.map((link) => {
              const isActive = link.href === "/blogs" && (pageType === "blog" || pageType === "blogs");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={toggleMenu}
                  className={`nav-link ${isActive ? "text-white" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
