'use client';
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

interface BlogNavigationProps {
  pageType: 'home' | 'blog' | 'blogs';
}

export function BlogNavigation({ pageType }: BlogNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4 px-4 md:px-6 lg:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">
          <Link href="/">Vinay Amin</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About</Link>
            </li>
            <li>
              <Link href="/#experience" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Experience</Link>
            </li>
            <li>
              <Link href="/#projects" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Projects</Link>
            </li>
            <li>
              <Link href="/blogs" className={pageType === 'blog' || pageType === 'blogs' ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600 transition-colors duration-300"}>Blogs</Link>
            </li>
            <li>
              <Link href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`fixed right-0 top-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6">
            <button 
              className="absolute top-4 right-4 text-gray-700 focus:outline-none" 
              onClick={toggleMenu}
            >
              <HiX className="h-6 w-6" />
            </button>
            <div className="mt-8">
              <ul className="space-y-4">
                <li>
                  <Link 
                    href="/#about" 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg block"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#experience" 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg block"
                    onClick={toggleMenu}
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#projects" 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg block"
                    onClick={toggleMenu}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blogs" 
                    className={`text-lg block transition-colors duration-300 ${
                      pageType === 'blog' || pageType === 'blogs' 
                        ? "text-blue-600 font-medium" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={toggleMenu}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#contact" 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-lg block"
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
