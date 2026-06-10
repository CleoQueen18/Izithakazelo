import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Izithakazelo | Discover Your Heritage",
  description: "Explore African clan names, praises, ancestry, and heritage stories.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/tribes", label: "Tribes" },
  { href: "/clans", label: "Clans" },
  { href: "/contribute", label: "Contribute" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
      </head>
      <body className="bg-[#faf7f2] text-gray-800">
        <nav className="sticky top-0 z-50 border-b border-amber-100 bg-white/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="text-center sm:text-left mb-2 sm:mb-3">
              <Link href="/" className="text-xl sm:text-2xl font-semibold tracking-wide text-gray-900 hover:text-amber-700 transition">
                Izithakazelo
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-gray-600 hover:text-amber-700 transition py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="min-h-screen">{children}</main>

        <footer className="mt-20 border-t border-amber-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Izithakazelo</h3>
                <p className="text-sm text-gray-600">Preserving African clan names, praise poetry, and ancestral stories for future generations.</p>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
                <div className="space-y-2 text-sm">
                  <Link href="/stories" className="block hover:text-amber-700">Featured Stories</Link>
                  <Link href="/tribes" className="block hover:text-amber-700">Browse Tribes</Link>
                  <Link href="/clans" className="block hover:text-amber-700">Browse Clans</Link>
                  <Link href="/about" className="block hover:text-amber-700">About Project</Link>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Mission</h4>
                <p className="text-sm text-gray-600">Honoring our roots through digital storytelling, clan praise, and cultural preservation.</p>
              </div>
            </div>
            <div className="border-t border-amber-100 mt-6 sm:mt-8 pt-5 sm:pt-6 text-center text-xs sm:text-sm text-gray-500">
              © 2026 Izithakazelo. Honoring heritage, preserving identity.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
