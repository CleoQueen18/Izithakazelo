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
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="text-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-amber-700 transition">
                Izithakazelo
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-600 hover:text-amber-700 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="min-h-screen">{children}</main>

        <footer className="mt-12 border-t border-amber-100 bg-white py-6 text-center text-xs text-gray-500">
          <p>© 2026 Izithakazelo — Preserving African Heritage</p>
        </footer>
      </body>
    </html>
  );
}