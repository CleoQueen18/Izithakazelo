"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  BookOpen,
  Globe,
  HeartHandshake,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const HERO_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png";

const BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png";

const MISSION_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/mission.png";

const WHAT_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/what.png";

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: HeartHandshake,
      title: "Preserve Heritage",
      text: "Protecting ancestral knowledge, clan praises, and traditions for generations to come.",
    },
    {
      icon: BookOpen,
      title: "Share Knowledge",
      text: "Making cultural knowledge easier to discover, explore, and share with others.",
    },
    {
      icon: Shield,
      title: "Honor Identity",
      text: "Celebrating the names, stories, and traditions that connect people to their roots.",
    },
    {
      icon: Globe,
      title: "Connect Communities",
      text: "Creating a space where people can learn from and contribute to our shared heritage.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f1ea]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[620px] h-[82vh] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="African cultural heritage"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#20140d]/80" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-5 sm:left-8 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
        >
          ← Back
        </button>

        {/* Hero content */}
        <div className="relative z-10 flex h-full items-center justify-center px-5 sm:px-6">
          <div className="max-w-4xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 sm:w-12 bg-amber-400/70" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-amber-200">
                Heritage • Identity • Legacy
              </p>
              <span className="h-px w-8 sm:w-12 bg-amber-400/70" />
            </div>

            <h1 className="text-3xl font-semibold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
              About Izithakazelo
            </h1>

            <div className="mx-auto my-6 h-px w-16 bg-amber-400 sm:w-20" />

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              Honouring African heritage through the preservation of clan
              names, praises, stories, and ancestral identity.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/clans"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b85c24] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#9f4e1d] hover:-translate-y-0.5 sm:w-auto"
              >
                Explore Clans
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/contribute"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20 sm:w-auto"
              >
                Contribute
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60">
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <section
        className="relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url("${BACKGROUND_IMAGE}")`,
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[#20140d]/70" />

        <div className="relative z-10 py-14 sm:py-18">
          <div className="mx-auto max-w-6xl space-y-16 px-5 sm:px-6">

            {/* =====================================================
                INTRO
            ===================================================== */}
            <section className="mx-auto max-w-3xl text-center text-white">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300">
                Our Story
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Keeping our roots alive
              </h2>

              <div className="mx-auto mt-5 h-px w-16 bg-[#c26a2d]" />

              <p className="mt-6 text-sm leading-7 text-white/70 sm:text-base">
                Izithakazelo was created as a space where African clan
                identities, praises, and stories can be preserved, explored,
                and shared. Our goal is to make cultural knowledge easier to
                access while respecting the traditions and communities from
                which it comes.
              </p>
            </section>

            {/* =====================================================
                MISSION
            ===================================================== */}
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
              <div className="grid md:grid-cols-2">

                {/* Text */}
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#c26a2d] text-white shadow-md">
                    <Shield size={22} />
                  </div>

                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#b85c24]">
                    Our Mission
                  </p>

                  <h2 className="mb-5 text-2xl font-bold text-[#1e293b] sm:text-3xl">
                    Preserving what connects us
                  </h2>

                  <p className="leading-7 text-[#475569]">
                    Izithakazelo is dedicated to collecting, preserving, and
                    sharing African clan praises and heritage traditions
                    across generations.
                  </p>

                  <p className="mt-4 leading-7 text-[#64748b]">
                    We believe cultural identity should be protected,
                    celebrated, and made accessible to future generations.
                    Every surname, praise, and story carries a piece of
                    history worth remembering.
                  </p>

                  <Link
                    href="/contribute"
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-[#b85c24] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9f4e1d]"
                  >
                    Help Preserve Heritage
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Image */}
                <div className="relative min-h-[300px] sm:min-h-[360px] md:min-h-full">
                  <Image
                    src={MISSION_IMAGE}
                    alt="African cultural heritage"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </section>

            {/* =====================================================
                VALUES
            ===================================================== */}
            <section>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300">
                  What Matters To Us
                </p>

                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  What Drives Us
                </h2>

                <div className="mx-auto mt-5 h-px w-16 bg-[#c26a2d]" />

                <p className="mt-5 text-sm leading-6 text-white/65 sm:text-base">
                  Our work is guided by the belief that knowing where we come
                  from helps us understand who we are.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-[#ece4d8] bg-white/95 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5ede5] text-[#c26a2d] transition-all duration-300 group-hover:bg-[#c26a2d] group-hover:text-white group-hover:scale-110">
                        <Icon size={20} />
                      </div>

                      <h3 className="mb-2 text-base font-bold text-[#1e293b]">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-6 text-[#64748b]">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =====================================================
                WHAT ARE IZITHAKAZELO?
            ===================================================== */}
            <section className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">

              {/* Text */}
              <div className="text-white">
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300">
                  Understanding Our Heritage
                </p>

                <h2 className="text-3xl font-bold sm:text-4xl">
                  What are Izithakazelo?
                </h2>

                <div className="my-6 h-px w-14 bg-[#c26a2d]" />

                <p className="text-sm leading-7 text-white/80 sm:text-base">
                  Izithakazelo are traditional clan praises that carry
                  lineage, history, identity, and ancestral memory.
                </p>

                <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                  They connect families to their roots and preserve stories
                  passed down through generations. For many people, reciting
                  izithakazelo is more than saying a name — it is a way of
                  recognising lineage and honouring those who came before us.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/clans"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b85c24] px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#9f4e1d]"
                  >
                    Explore Clan Names
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/stories"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
                  >
                    Read Stories
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-[#c26a2d]/20 to-[#d97706]/20 blur-2xl" />

                <div className="relative h-[300px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px]">
                  <Image
                    src={WHAT_IMAGE}
                    alt="African clan heritage and traditions"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            </section>

            {/* =====================================================
                QUOTE
            ===================================================== */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20140d]/90 px-6 py-12 text-center text-white shadow-2xl sm:px-10">
              <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 bg-[#c26a2d]" />

              <div className="mx-auto max-w-3xl">
                <div className="mb-5 text-4xl text-amber-400/60">“</div>

                <p className="text-xl italic leading-relaxed text-white/90 sm:text-2xl">
                  A people without the knowledge of their past history,
                  origin and culture is like a tree without roots.
                </p>

                <div className="mx-auto mt-6 h-px w-10 bg-[#c26a2d]" />

                <p className="mt-4 text-sm font-medium text-[#c9b29e]">
                  — Marcus Garvey
                </p>
              </div>
            </section>

            {/* =====================================================
                FINAL CTA
            ===================================================== */}
            <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#3a2115] to-[#6b351d] p-8 text-center shadow-2xl sm:p-12">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-amber-300">
                Be Part of the Story
              </p>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Help us preserve African heritage
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Have a clan praise, surname, correction, or story to share?
                Your knowledge can help keep our cultural heritage alive for
                the next generation.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contribute"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#6b351d] shadow-lg transition hover:bg-[#f8f1e8]"
                >
                  Make a Contribution
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/15"
                >
                  Contact Us
                </Link>
              </div>
            </section>

          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER ACTION
      ========================================================= */}
      <div className="border-t border-amber-100 bg-[#f6f1ea] px-6 py-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8b5e3c] transition hover:text-[#b85c24]"
        >
          ← Return to Izithakazelo Home
        </Link>
      </div>
    </main>
  );
}