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
    desc: "Find your izithakazelo and clan connections.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/surnames.png",
    alt: "Surnames and clans icon",
  },
  {
    title: "Praise Poems",
    desc: "Discover the poetry and praises of your people.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/praise.png",
    alt: "Praise poems icon",
  },
  {
    title: "History & Lineage",
    desc: "Trace ancestry, roots, and generational stories.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/history.png",
    alt: "History and lineage icon",
  },
  {
    title: "Share Your Story",
    desc: "Help preserve family knowledge for future generations.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/share.png",
    alt: "Share your story icon",
  },
];

type FeaturedStory = {
  id: number;
  title: string;
  summary: string;
  content: string;
  clan: { name: string; tribe: string } | null;
  imageUrl: string | null;
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const DEFAULT_STORY_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default-story.png";

const FEATURES_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png";

const HERITAGE_BG =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/heritage-bg.png";

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
        const data = await res.json();
        setFeaturedStories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedStories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleLetterClick = (letter: string) => {
    router.push(`/clans?letter=${letter}`);
  };

  const displayStories =
    featuredStories.length > 0
      ? featuredStories.slice(0, 1)
      : [
          {
            id: 1,
            title: "The Legacy of the Khumalo Clan",
            summary:
              "Explore the history, leadership, and lineage of the Khumalo clan.",
            content: "",
            clan: { name: "Khumalo", tribe: "Zulu" },
            imageUrl: null,
          },
        ];

  if (!mounted) return null;

  return (
    <div className="bg-[#faf7f2] text-gray-800">
      {/* HERO */}
      <section className="relative h-[70vh] md:h-[85vh] min-h-[500px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png"
          alt="Izithakazelo background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-6">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-amber-200 mb-3">
            Heritage • Identity • Legacy
          </p>

          <h1 className="text-4xl md:text-7xl font-semibold text-white mb-3">
            Izithakazelo
          </h1>

          <p className="text-sm md:text-xl text-gray-200 max-w-2xl mb-8">
            Discover your roots, celebrate your clan, and preserve African
            heritage.
          </p>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="flex rounded-xl overflow-hidden bg-white/95">
              <input
                className="flex-1 px-4 py-3 text-sm md:text-base outline-none"
                placeholder="Search surname or clan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-amber-700 text-white px-5 md:px-8 text-sm md:text-base">
                Search
              </button>
            </div>
          </form>

          {/* ALPHABET - wraps on both PC and mobile */}
          <div className="mt-6 w-full max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-3 text-center">
                Browse by Surname Letter
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    className="w-9 h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {letter}
                  </button>
                ))}
                <button
                  onClick={() => router.push("/clans")}
                  className="px-4 h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-sm font-medium transition-all duration-200"
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${FEATURES_BG})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-5 text-center"
              >
                <Image
                  src={f.icon}
                  alt={f.alt}
                  width={60}
                  height={60}
                  className="mx-auto mb-3"
                />
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {!loading &&
        displayStories.map((story) => (
          <section
            key={story.id}
            className="relative"
            style={{
              backgroundImage: `url(${
                story.imageUrl || DEFAULT_STORY_BG
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 px-4 md:px-6 py-14 md:py-20 max-w-4xl mx-auto">
              <p className="text-amber-300 uppercase text-xs tracking-widest">
                Featured Story
              </p>

              <h2 className="text-2xl md:text-4xl text-white font-bold mt-2">
                {story.title}
              </h2>

              <p className="text-gray-200 mt-4">{story.summary}</p>

              <Link
                href={`/${story.id}`}
                className="inline-block mt-6 bg-amber-600 px-6 py-2 rounded-full text-white"
              >
                Read More →
              </Link>
            </div>
          </section>
        ))}

      {/* TRIBES */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${FEATURES_BG})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center py-14 px-4">
          <h2 className="text-white uppercase tracking-widest mb-6">
            Browse by Tribe
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {tribes.map((t) => (
              <Link
                key={t}
                href={`/tribe/${t.toLowerCase()}`}
                className="bg-white px-4 py-2 rounded-full text-sm"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="relative">
        <Image
          src={HERITAGE_BG}
          alt="heritage"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-4 md:px-6 py-16 max-w-4xl mx-auto text-white">
          <h2 className="text-2xl md:text-4xl font-bold">
            Preserving Our Heritage
          </h2>
          <p className="mt-3 text-amber-200">
            Honoring our past, guiding our future.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs py-10 text-gray-500">
        © 2026 Izithakazelo — Preserving African Heritage
      </footer>
    </div>
  );
}