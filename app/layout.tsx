"use client";

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
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-730JR4XRVP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-730JR4XRVP');
            `,
          }}
        />
      </head>
      <body className="bg-[#faf7f2] text-gray-800">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100">
          <nav className="relative max-w-6xl mx-auto px-4">
            {/* Navbar row */}
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 hover:text-amber-700 transition"
              >
                Izithakazelo
              </Link>

              <button
                className="md:hidden text-3xl text-gray-800"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? "✕" : "☰"}
              </button>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm transition ${
                      pathname === link.href
                        ? "text-amber-700 font-semibold"
                        : "text-gray-600 hover:text-amber-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
              <div className="absolute top-full left-0 w-full bg-white border-t border-amber-100 shadow-lg md:hidden">
                <div className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`py-3 text-sm border-b border-gray-100 last:border-b-0 ${
                        pathname === link.href
                          ? "text-amber-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="mt-12 border-t border-amber-100 bg-white py-6 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Izithakazelo — Preserving African
            Heritage
          </p>
        </footer>
      </body>
    </html>
  );
}