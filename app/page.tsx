"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const tribes = [
  "Zulu",
  "Xhosa",
  "Sotho",
  "Tswana",
  "Venda",
  "Tsonga",
  "Pedi",
  "Ndebele",
  "Swati",
];

const features = [
  {
    title: "Surnames & Clans",
    desc: "Discover your izithakazelo and explore the clans connected to your name.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/surnames.png",
    alt: "Surnames and clans",
  },
  {
    title: "Praise Names",
    desc: "Explore the words, praises and names that have been passed down through generations.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/praise.png",
    alt: "Praise names",
  },
  {
    title: "History & Lineage",
    desc: "Learn about family roots, ancestry, lineage and the stories behind our names.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/history.png",
    alt: "History and lineage",
  },
  {
    title: "Share Your Story",
    desc: "Help preserve family knowledge and cultural stories for generations to come.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/share.png",
    alt: "Share your story",
  },
];

type FeaturedStory = {
  id: number;
  title: string;
  summary: string;
  content: string;
  clan: {
    name: string;
    tribe: string;
  } | null;
  imageUrl: string | null;
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const DEFAULT_STORY_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default-story.png";

const FEATURES_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png";

const HERITAGE_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/heritage-bg.png";

const HERO_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png";

const ROOTS_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/roots1.png";

const SHARE_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/share1.png";

const CONNECT_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/connect1.png";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredStories, setFeaturedStories] = useState<FeaturedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    async function fetchFeaturedStories() {
      try {
        setLoading(true);

        const res = await fetch("/api/featured-stories");

        if (!res.ok) {
          console.error("API returned:", res.status);
          return;
        }

        const data = await res.json();

        setFeaturedStories(data);
      } catch (error) {
        console.error("Error fetching featured stories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedStories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const term = searchTerm.trim();

    if (!term) {
      router.push("/clans");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleLetterClick = (letter: string) => {
    if (!letter) {
      router.push("/clans");
      return;
    }

    router.push(`/clans?letter=${letter}`);
  };

  const displayStories: FeaturedStory[] =
    featuredStories.length > 0
      ? featuredStories.slice(0, 1)
      : [
          {
            id: 1,
            title: "The Legacy of the Khumalo Clan",
            summary:
              "Explore the history, leadership, and lineage of the Khumalo clan, and discover the heritage carried through generations.",
            content: "",
            clan: {
              name: "Khumalo",
              tribe: "Zulu",
            },
            imageUrl: null,
          },
        ];

  if (!mounted) {
    return null;
  }

  return (
    <main className="bg-[#faf7f2] text-gray-800">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[620px] sm:min-h-[720px] overflow-hidden">
        <Image
          src={HERO_BG}
          alt="African cultural heritage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Softer overlay + gradient for readability */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />

        <div className="relative z-10 flex min-h-[620px] sm:min-h-[720px] items-center justify-center px-4 py-20 sm:px-6">
          <div className="mx-auto w-full max-w-5xl text-center">
            {/* Small label */}
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-amber-200 sm:text-xs md:text-sm">
              Heritage · Identity · Legacy
            </p>

            {/* Main heading */}
            <h1 className="mb-5 text-5xl font-semibold tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Izithakazelo
            </h1>

            {/* Main message */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Discover your roots, celebrate your heritage, and explore the
              stories carried through generations.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="mx-auto w-full max-w-2xl"
              role="search"
            >
              <label htmlFor="clan-search" className="sr-only">
                Search for a surname or clan
              </label>

              <div className="flex overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="flex flex-1 items-center">
                  <span
                    className="pl-4 text-xl text-gray-400 sm:pl-5"
                    aria-hidden="true"
                  >
                    ⌕
                  </span>

                  <input
                    id="clan-search"
                    type="search"
                    placeholder="Search your surname or clan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="min-h-[54px] w-full bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:min-h-[60px] sm:px-4 sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="min-h-[54px] bg-amber-700 px-5 text-sm font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 sm:min-h-[60px] sm:px-8 sm:text-base"
                >
                  Search
                </button>
              </div>

              <p className="mt-3 text-xs text-white/70 sm:text-sm">
                Try a surname such as Mthembu, Ndlovu, Khumalo or Dlamini.
              </p>
            </form>

            {/* Main CTA */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/clans"
                className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-amber-600 px-7 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-transparent sm:text-base"
              >
                Explore Clans
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SURNAME EXPLORER
      ========================================================= */}
      <section className="border-b border-amber-100 bg-[#faf7f2] px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Explore
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
              Find your family name
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
              Browse surnames alphabetically and discover the clans and
              izithakazelo connected to them.
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-4 shadow-sm ring-1 ring-amber-100 sm:p-7">
            <div className="grid grid-cols-7 gap-2 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-14">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleLetterClick(letter)}
                  aria-label={`Browse surnames beginning with ${letter}`}
                  className="flex aspect-square items-center justify-center rounded-full bg-[#f8f1e8] text-xs font-semibold text-gray-700 transition hover:bg-amber-700 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:text-sm"
                >
                  {letter}
                </button>
              ))}

              <button
                type="button"
                onClick={() => handleLetterClick("")}
                className="col-span-2 flex min-h-[40px] items-center justify-center rounded-full bg-amber-700 px-3 text-xs font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:col-span-1 sm:text-sm"
              >
                All
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/clans"
                className="text-sm font-semibold text-amber-700 transition hover:text-amber-900"
              >
                View all clans →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY IZITHAKAZELO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#eee3d4]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Why Izithakazelo?
              </p>

              <h2 className="max-w-xl text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
                Our names carry our stories.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                Izithakazelo are more than names. They carry memories, family
                connections, history and identity from one generation to the
                next.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                Izithakazelo exists to create a digital space where this
                knowledge can be discovered, shared and preserved for future
                generations.
              </p>

              <div className="mt-7">
                <Link
                  href="/about"
                  className="inline-flex items-center font-semibold text-amber-800 transition hover:text-amber-950"
                >
                  Learn more about Izithakazelo
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-amber-700/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
                <Image
                  src={HERITAGE_BG}
                  alt="African heritage and cultural preservation"
                  width={900}
                  height={700}
                  className="h-[320px] w-full object-cover sm:h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPLORE FEATURES
      ========================================================= */}
      <section className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Explore your heritage
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
              Discover more than a surname
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              Explore the people, praises, stories and histories connected to
              our names.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-amber-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8f1e8] transition duration-300 group-hover:scale-105 group-hover:bg-amber-50">
                  <Image
                    src={feature.icon}
                    alt={feature.alt}
                    width={52}
                    height={52}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED STORY
      ========================================================= */}
      <section className="bg-[#201a15]">
        {!loading &&
          displayStories.map((story) => (
            <div
              key={story.id}
              className="relative min-h-[500px] overflow-hidden sm:min-h-[560px]"
            >
              <div className="absolute inset-0">
                <Image
                  src={story.imageUrl || DEFAULT_STORY_BG}
                  alt={story.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

              <div className="relative z-10 mx-auto flex min-h-[500px] max-w-6xl items-center px-4 py-16 sm:min-h-[560px] sm:px-6">
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
                    Featured Story
                  </p>

                  {story.clan && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {story.clan.name}
                      </span>

                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {story.clan.tribe}
                      </span>
                    </div>
                  )}

                  <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                    {story.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base md:text-lg">
                    {story.summary}
                  </p>

                  <Link
                    href={`/${story.id}`}
                    className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full bg-amber-600 px-7 text-sm font-semibold text-white transition hover:bg-amber-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-black sm:text-base"
                  >
                    Read the story
                    <span className="ml-2" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* =========================================================
          BROWSE BY TRIBE
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#35291f]">
        <div className="absolute inset-0">
          <Image
            src={FEATURES_BG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </div>

        <div className="absolute inset-0 bg-[#35291f]/75" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            Explore by heritage
          </p>

          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Discover clans by tribe
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Explore the clans and surnames connected to different cultural
            communities.
          </p>

          <div className="mx-auto mt-9 flex max-w-4xl flex-wrap justify-center gap-3">
            {tribes.map((tribe) => (
              <Link
                key={tribe}
                href={`/tribe/${tribe.toLowerCase()}`}
                className="rounded-full border border-white/20 bg-white/95 px-5 py-3 text-sm font-medium text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-50 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-[#35291f] sm:px-6 sm:text-base"
              >
                {tribe}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTRIBUTION CTA
      ========================================================= */}
      <section className="bg-[#faf7f2] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#e9ddce] shadow-sm">
            <div className="grid items-center md:grid-cols-2">
              <div className="px-6 py-12 sm:px-10 sm:py-14 md:px-14">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                  Preserve what you know
                </p>

                <h2 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                  Your story belongs here.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                  Know an izithakazelo, clan story or piece of family history
                  that deserves to be remembered? Share it and help preserve
                  our heritage for future generations.
                </p>

                <Link
                  href="/clans#add-form"
                  className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:text-base"
                >
                  Share Your Story
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>

              <div className="relative h-[280px] md:h-full md:min-h-[380px]">
                <Image
                  src={SHARE_IMAGE}
                  alt="Sharing cultural stories"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK ACTIONS
      ========================================================= */}
      <section className="border-t border-amber-100 bg-white px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Keep exploring
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Start your journey
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Link
              href="/clans"
              className="group text-center"
            >
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full shadow-md ring-4 ring-[#f8f1e8] transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                <Image
                  src={ROOTS_IMAGE}
                  alt="Learn your roots"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Learn Your Roots
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Explore clans and discover your heritage.
              </p>
            </Link>

            <Link
              href="/clans#add-form"
              className="group text-center"
            >
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full shadow-md ring-4 ring-[#f8f1e8] transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                <Image
                  src={SHARE_IMAGE}
                  alt="Share your stories"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Share Your Stories
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Help keep family knowledge alive.
              </p>
            </Link>

            <Link
              href="/about"
              className="group text-center"
            >
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full shadow-md ring-4 ring-[#f8f1e8] transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                <Image
                  src={CONNECT_IMAGE}
                  alt="Connect with community"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                Connect with Community
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Learn more about the purpose behind Izithakazelo.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-amber-100 bg-[#211b16] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold tracking-wide">
                Izithakazelo
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                Preserving our names, stories and heritage for generations to
                come.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Explore
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                <Link
                  href="/clans"
                  className="transition hover:text-white"
                >
                  Clans
                </Link>

                <Link
                  href="/stories"
                  className="transition hover:text-white"
                >
                  Stories
                </Link>

                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Participate */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Participate
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
                <Link
                  href="/clans#add-form"
                  className="transition hover:text-white"
                >
                  Contribute
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-center text-xs text-white/40 sm:text-left">
              © {new Date().getFullYear()} Izithakazelo. Preserving heritage,
              one story at a time.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}