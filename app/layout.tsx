"use client";

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/tribes", label: "Tribes" },
  { href: "/clans", label: "Clans" },
  { href: "/contribute", label: "Contribute" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-[#faf7f2] text-gray-800">
        {/* NAV */}
        <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/90 backdrop-blur-md">
          <nav className="max-w-6xl mx-auto px-4 py-3">
            
            {/* Top row */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-amber-700 transition"
              >
                Izithakazelo
              </Link>

              {/* Hamburger button (mobile only) */}
              <button
                className="md:hidden text-2xl"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? "✕" : "☰"}
              </button>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex justify-center gap-4 mt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs transition ${
                    pathname === link.href
                      ? "text-amber-700 font-semibold"
                      : "text-gray-600 hover:text-amber-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile dropdown */}
            {open && (
              <div className="md:hidden mt-3 flex flex-col gap-3 border-t border-amber-100 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm py-1 ${
                      pathname === link.href
                        ? "text-amber-700 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-h-screen px-4">{children}</main>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-amber-100 bg-white py-6 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Izithakazelo — Preserving African Heritage
          </p>
        </footer>
      </body>
    </html>
  );
}