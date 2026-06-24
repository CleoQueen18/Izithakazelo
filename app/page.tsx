"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import Grid from "@/app/components/Grid";
import Section from "@/app/components/Section";
import { Heading, Paragraph } from "@/app/components/Typography";

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
      {/* HERO SECTION */}
      <section className="relative min-h-[500px] h-[70vh] md:h-[85vh] overflow-hidden">
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

          <Heading level={1} className="text-white">
            Izithakazelo
          </Heading>

          <Paragraph className="text-gray-200 max-w-2xl mb-8 text-center text-sm md:text-lg">
            Discover your roots, celebrate your clan, and preserve African heritage.
          </Paragraph>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="flex rounded-xl overflow-hidden bg-white/95">
              <input
                className="flex-1 px-4 py-3 text-sm md:text-base outline-none"
                placeholder="Search surname or clan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-5 md:px-8 text-sm md:text-base transition">
                Search
              </button>
            </div>
          </form>

          {/* ALPHABET - Responsive wrapping */}
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
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {letter}
                  </button>
                ))}
                <button
                  onClick={() => router.push("/clans")}
                  className="px-3 sm:px-4 h-8 sm:h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-xs sm:text-sm font-medium transition-all duration-200"
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <Section bg="none" padding="xl" className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${FEATURES_BG})` }} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <Grid cols={4} gap="md">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-5 text-center hover:shadow-lg transition">
              <Image src={feature.icon} alt={feature.alt} width={60} height={60} className="mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </Grid>
      </Section>

      {/* FEATURED STORY */}
      {!loading &&
        displayStories.map((story) => (
          <section key={story.id} className="relative py-16 md:py-20">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${story.imageUrl || DEFAULT_STORY_BG})` }} />
            <div className="absolute inset-0 bg-black/60" />

            <Container className="relative z-10">
              <div className="max-w-2xl">
                <p className="text-amber-300 uppercase text-xs tracking-widest">Featured Story</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mt-2">{story.title}</h2>
                <p className="text-gray-200 mt-4 text-sm md:text-base">{story.summary}</p>
                <Link
                  href={`/${story.id}`}
                  className="inline-block mt-6 bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-full text-white text-sm md:text-base transition"
                >
                  Read More →
                </Link>
              </div>
            </Container>
          </section>
        ))}

      {/* TRIBES SECTION */}
      <Section bg="none" padding="xl" className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${FEATURES_BG})` }} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="text-center">
          <p className="text-white uppercase tracking-widest text-sm mb-6">Browse by Tribe</p>
          <div className="flex flex-wrap justify-center gap-3">
            {tribes.map((tribe) => (
              <Link
                key={tribe}
                href={`/tribe/${tribe.toLowerCase()}`}
                className="bg-white hover:bg-amber-50 px-4 py-2 rounded-full text-sm md:text-base transition"
              >
                {tribe}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* HERITAGE SECTION */}
      <section className="relative py-16 md:py-20">
        <Image src={HERITAGE_BG} alt="heritage" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <Container className="relative z-10">
          <h2 className="text-2xl md:text-4xl text-white font-bold">Preserving Our Heritage</h2>
          <p className="mt-3 text-amber-200 text-sm md:text-base">Honoring our past, guiding our future.</p>
        </Container>
      </section>

            {/* FOOTER WITH ICONS */}
<footer className="border-t border-amber-100 py-16">
  <Container>
    <div className="flex flex-wrap justify-center items-center gap-12 mb-8">
      <Link href="/clans" className="flex flex-col items-center gap-3 group">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/roots1.png"
            alt="Learn Your Roots"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.1)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
          Learn Your Roots
        </span>
      </Link>

      <Link href="/clans#add-form" className="flex flex-col items-center gap-3 group">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/share1.png"
            alt="Share Your Stories"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.1)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
          Share Your Stories
        </span>
      </Link>

      <Link href="/about" className="flex flex-col items-center gap-3 group">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/connect1.png"
            alt="Connect with Community"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.2)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
          Connect with Community
        </span>
      </Link>
    </div>

    <div className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-amber-50">
      <p>© 2026 Izithakazelo — Preserving African Heritage</p>
    </div>
  </Container>
</footer>
    </div>
  );
}