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
      <body className="bg-[#faf7f2] text-gray-800">
        <nav className="sticky top-0 z-50 border-b border-amber-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-gray-900">
                Izithakazelo
              </Link>
              
              {/* Desktop Navigation - hidden on mobile */}
              <div className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm text-gray-600 hover:text-amber-700">
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <input type="checkbox" id="mobile-menu" className="hidden peer" />
                <label htmlFor="mobile-menu" className="flex flex-col gap-1.5 p-2 cursor-pointer">
                  <span className="w-6 h-0.5 bg-gray-600"></span>
                  <span className="w-6 h-0.5 bg-gray-600"></span>
                  <span className="w-6 h-0.5 bg-gray-600"></span>
                </label>
                <div className="hidden peer-checked:block absolute right-4 top-14 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">{children}</main>

        <footer className="mt-20 border-t border-amber-100 bg-white py-6 text-center text-sm text-gray-500">
          <p>© 2026 Izithakazelo. Honoring heritage, preserving identity.</p>
        </footer>
      </body>
    </html>
  );
}