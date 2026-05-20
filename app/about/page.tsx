"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  BookOpen,
  Globe,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f6f1ea]">
      
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/izithakazelo.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-200 mb-4">
            Heritage • Identity • Legacy
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold text-white mb-4 tracking-wide">
            About Izithakazelo
          </h1>

          <div className="w-20 h-px bg-amber-400 mx-auto mb-6" />

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Honoring African heritage through the preservation of
            clan names, praises, and ancestral identity.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT - with features-bg.png as background */}
      <div 
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/features-bg.png')" }}
      >
        {/* Dark overlay for readability */}
        <div className="bg-black/40 py-20">
          <div className="max-w-6xl mx-auto px-6 space-y-16">

            {/* Mission Section - Image on Right Side */}
            <section className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e7ded1] overflow-hidden">
              <div className="grid md:grid-cols-2">
                
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#c26a2d] text-white flex items-center justify-center mb-5">
                    <Shield size={22} />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] mb-4">
                    Our Mission
                  </h2>

                  <p className="text-[#475569] leading-relaxed">
                    Izithakazelo is dedicated to collecting,
                    preserving, and sharing African clan praises
                    and heritage traditions across generations.
                  </p>

                  <p className="text-[#64748b] mt-4 leading-relaxed">
                    We believe cultural identity should be protected,
                    celebrated, and made accessible to future generations.
                  </p>
                </div>

                {/* Image: mission.png */}
                <div className="relative bg-[#2b1d14] min-h-[300px] md:min-h-full">
                  <Image
                    src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/mission.png"
                    alt="African cultural heritage"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  What Drives Us
                </h2>
                <div className="w-16 h-px bg-[#c26a2d] mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  {
                    icon: <HeartHandshake size={20} />,
                    title: "Preserve Heritage",
                    text: "Protecting ancestral knowledge and traditions.",
                  },
                  {
                    icon: <BookOpen size={20} />,
                    title: "Share Knowledge",
                    text: "Making clan praises accessible to everyone.",
                  },
                  {
                    icon: <Shield size={20} />,
                    title: "Honor Ancestors",
                    text: "Respecting the wisdom of those before us.",
                  },
                  {
                    icon: <Globe size={20} />,
                    title: "Unite Communities",
                    text: "Connecting cultures through shared identity.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#ece4d8] hover:-translate-y-1 transition duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#f5ede5] text-[#c26a2d] flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-[#1e293b] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* What are Izithakazelo Section - Image: what.png */}
            <section className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  What are Izithakazelo?
                </h2>
                <div className="w-12 h-px bg-[#c26a2d] mb-6" />
                <p className="text-gray-200 leading-relaxed mb-4">
                  Izithakazelo are traditional clan praises that
                  carry lineage, history, and ancestral identity.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  They connect families to their roots and preserve
                  stories passed down through generations.
                </p>
                <Link
                  href="/stories"
                  className="inline-block bg-[#b85c24] hover:bg-[#9f4e1d] text-white px-6 py-2.5 rounded-xl transition font-medium shadow-md text-sm"
                >
                  Explore Stories →
                </Link>
              </div>

              {/* Image: what.png */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#c26a2d]/20 to-[#d97706]/20 rounded-2xl blur-xl" />
                <div className="relative rounded-2xl shadow-lg overflow-hidden h-[280px] w-full">
                  <Image
                    src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/what.png"
                    alt="African clan heritage and traditions"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Quote Section */}
            <section className="bg-[#20140d]/90 backdrop-blur-sm rounded-2xl p-8 text-center text-white shadow-lg">
              <p className="text-lg md:text-xl italic leading-relaxed max-w-3xl mx-auto">
                “A people without the knowledge of their past history,
                origin and culture is like a tree without roots.”
              </p>
              <p className="mt-4 text-sm text-[#c9b29e]">
                — Marcus Garvey
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Back button at bottom */}
      <div className="text-center pb-16">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-amber-700 transition text-sm"
        >
          ← Back to Previous Page
        </button>
      </div>
    </div>
  );
}