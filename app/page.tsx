"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const tribes = ["Zulu", "Xhosa", "Sotho", "Tswana", "Venda", "Tsonga", "Pedi", "Ndebele", "Swati"];

const features = [
  {
    title: "Surnames & Clans",
    desc: "Find your izithakazelo and clan connections.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/surnames.png",
    alt: "Surnames and clans icon",
  },
  {
    title: "Praise Poems",
    desc: "Discover the poetry and praises of your people.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/praise.png",
    alt: "Praise poems icon",
  },
  {
    title: "History & Lineage",
    desc: "Trace ancestry, roots, and generational stories.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/history.png",
    alt: "History and lineage icon",
  },
  {
    title: "Share Your Story",
    desc: "Help preserve family knowledge for future generations.",
    icon: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/share.png",
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

const DEFAULT_STORY_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/default-story.png";
const FEATURES_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/features-bg.png";
const HERITAGE_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/heritage-bg.png";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("");
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
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    router.push(`/clans?letter=${letter}`);
  };

  const displayStories = featuredStories.length > 0 ? featuredStories : [
    {
      id: 1,
      title: "The Legacy of the Khumalo Clan",
      summary: "Explore the history, leadership, and lineage of the Khumalo clan, and understand their powerful role in shaping the Zulu kingdom and preserving generations of heritage.",
      content: "",
      clan: { name: "Khumalo", tribe: "Zulu" },
      imageUrl: null,
    }
  ];

  if (!mounted) return null;

  return (
    <div className="bg-[#faf7f2] text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/izithakazelo.png"
          alt="Izithakazelo heritage background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <p className="uppercase tracking-[0.35em] text-sm text-amber-200 mb-4">Heritage • Identity • Legacy</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-white mb-4 tracking-wide">Izithakazelo</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">Discover your roots, celebrate your clan, and preserve African heritage through stories, praise names, and ancestry.</p>

          <form onSubmit={handleSearch} className="w-full max-w-xl">
            <div className="flex overflow-hidden rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm">
              <input type="text" placeholder="Search surname or clan name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-6 py-4 text-gray-700 focus:outline-none" />
              <button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white px-8 font-medium transition">Search</button>
            </div>
          </form>

          <div className="mt-8 w-full max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-3 text-center">Browse by Surname Letter</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {alphabet.map((letter) => (
                  <button key={letter} onClick={() => handleLetterClick(letter)} className="w-9 h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-sm font-medium transition-all duration-200 hover:scale-105">{letter}</button>
                ))}
                <button onClick={() => handleLetterClick("")} className="px-3 h-9 rounded-full bg-white/20 hover:bg-amber-600 text-white text-sm font-medium transition-all duration-200 ml-2">All</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: `url('${FEATURES_BG}')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-amber-100">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 relative group-hover:scale-110 transition-transform duration-300">
                    <Image src={feature.icon} alt={feature.alt} width={64} height={64} className="object-contain" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Stories */}
      {!loading && displayStories.map((story) => (
        <div key={story.id} className="relative w-full overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${story.imageUrl || DEFAULT_STORY_BG}')` }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300 mb-3">Featured Clan Story</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{story.title}</h2>
              <p className="text-gray-200 leading-relaxed mb-6">{story.summary}</p>
              <Link href={`/${story.id}`} className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition">Read Full Story →</Link>
            </div>
          </div>
        </div>
      ))}

      {/* Browse by Tribe */}
      <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: `url('${FEATURES_BG}')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-sm uppercase tracking-[0.35em] text-white/80 mb-8">Browse by Tribe</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {tribes.map((tribe) => (
              <Link key={tribe} href={`/tribe/${tribe.toLowerCase()}`} className="px-5 py-3 rounded-full bg-white border border-amber-100 shadow-sm hover:shadow-md hover:bg-amber-50 transition">{tribe}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Preserving Our Heritage */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={HERITAGE_BG} alt="Preserving Our Heritage background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Preserving Our Heritage</h2>
            <p className="text-xl text-amber-200 mb-3">Honoring our past, guiding our future.</p>
            <p className="text-white/80 leading-7">Izithakazelo exists to keep African traditions, clan praises, histories, and family stories alive for the next generation.</p>
          </div>
        </div>
      </div>

   {/* Footer */}
<div className="border-t border-amber-100 py-16">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex flex-wrap justify-center items-center gap-12 mb-8">
      <Link href="/clans" className="flex flex-col items-center gap-3 group">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/roots1.png"
            alt="Learn Your Roots"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.1)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-amber-700 transition font-medium">Learn Your Roots</span>
      </Link>
      
      <Link href="/clans#add-form" className="flex flex-col items-center gap-3 group">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/share1.png"
            alt="Share Your Stories"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.1)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-amber-700 transition font-medium">Share Your Stories</span>
      </Link>
      
      <Link href="/about" className="flex flex-col items-center gap-3 group">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
          <img
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/connect1.png"
            alt="Connect with Community"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(2.2)', transformOrigin: 'center' }}
          />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-amber-700 transition font-medium">Connect with Community</span>
      </Link>
    </div>
    
    <div className="text-center text-xs text-gray-400 mt-8 pt-6 border-t border-amber-50">
      <p>© 2026 Izithakazelo — Preserving African Heritage</p>
    </div>
  </div>
</div>
    </div>
  );
}