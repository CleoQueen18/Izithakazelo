"use client";

import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Head from "next/head";

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
        {/* Meta Tags for SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Primary Meta Tags */}
        <title>Izithakazelo - Discover Your African Clan &amp; Heritage</title>
        <meta name="title" content="Izithakazelo - Discover Your African Clan &amp; Heritage" />
        <meta 
          name="description" 
          content="Explore African clan names, praises (izithakazelo), and ancestry. Discover your roots, celebrate your heritage, and preserve family stories." 
        />
        <meta 
          name="keywords" 
          content="Izithakazelo, African clans, Zulu clans, Xhosa clans, Sotho clans, Tswana clans, clan praises, African heritage, ancestry, genealogy, South African culture" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Izithakazelo Team" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://izithakazelo.co.za/" />
        <meta 
          property="og:title" 
          content="Izithakazelo - Discover Your African Clan &amp; Heritage" 
        />
        <meta 
          property="og:description" 
          content="Explore African clan names, praises (izithakazelo), and ancestry. Discover your roots, celebrate your heritage, and preserve family stories." 
        />
        <meta 
          property="og:image" 
          content="https://izithakazelo.co.za/og-image.jpg" 
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Izithakazelo" />
        <meta property="og:locale" content="en_ZA" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:title" 
          content="Izithakazelo - Discover Your African Clan &amp; Heritage" 
        />
        <meta 
          name="twitter:description" 
          content="Explore African clan names, praises (izithakazelo), and ancestry. Discover your roots, celebrate your heritage, and preserve family stories." 
        />
        <meta 
          name="twitter:image" 
          content="https://izithakazelo.co.za/og-image.jpg" 
        />
        <meta name="twitter:site" content="@Izithakazelo" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://izithakazelo.co.za/" />

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