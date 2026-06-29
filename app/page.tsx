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

const DEFAULT_STORY_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default-story.png";
const FEATURES_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png";
const HERITAGE_BG = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/heritage-bg.png";

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
    if (letter === "") {
      router.push("/clans");
    } else {
      router.push(`/clans?letter=${letter}`);
    }
  };

  const displayStories = featuredStories.length > 0 ? featuredStories.slice(0, 1) : [
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

  // Split alphabet into rows of 5 for guaranteed fit on any phone
  const alphabetRows = [
    ["A", "B", "C", "D", "E"],
    ["F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O"],
    ["P", "Q", "R", "S", "T"],
    ["U", "V", "W", "X", "Y"],
    ["Z", "All"],
  ];

  return (
    <div className="bg-[#faf7f2] text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[85vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png"
          alt="Izithakazelo heritage background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center text-center">
          <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-amber-200 mb-3 sm:mb-4">
            Heritage • Identity • Legacy
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white mb-3 sm:mb-4 tracking-wide">
            Izithakazelo
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mb-6 sm:mb-10 leading-relaxed px-2">
            Discover your roots, celebrate your clan, and preserve African heritage through stories, praise names, and ancestry.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-xl px-2 sm:px-0">
            <div className="flex overflow-hidden rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm">
              <input 
                type="text" 
                placeholder="Search surname or clan name..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-700 focus:outline-none min-h-[44px]" 
              />
              <button 
                type="submit" 
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 sm:px-8 font-medium transition min-h-[44px] text-sm sm:text-base"
              >
                Search
              </button>
            </div>
          </form>

          {/* Alphabet - 5 PER ROW - SMALL & COMPACT */}
          <div className="mt-6 sm:mt-8 w-full max-w-2xl px-2 sm:px-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20">
              <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 text-center">
                Browse by Surname Letter
              </p>
              
              <div className="flex flex-col items-center gap-1">
                {alphabetRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center gap-1">
                    {row.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => handleLetterClick(letter === "All" ? "" : letter)}
                        className={`w-6 h-6 rounded-full bg-white/20 hover:bg-amber-600 text-white font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center text-[10px] ${
                          letter === "All" ? "px-1.5 w-auto text-[9px]" : ""
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: `url('${FEATURES_BG}')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-amber-100"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 relative group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={feature.icon} 
                      alt={feature.alt} 
                      width={64} 
                      height={64} 
                      className="object-contain w-full h-full" 
                    />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
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
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 mb-2 sm:mb-3">
                Featured Clan Story
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                {story.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-6">
                {story.summary}
              </p>
              <Link 
                href={`/${story.id}`} 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                Read Full Story →
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Browse by Tribe */}
      <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: `url('${FEATURES_BG}')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/80 mb-6 sm:mb-8">
            Browse by Tribe
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {tribes.map((tribe) => (
              <Link 
                key={tribe} 
                href={`/tribe/${tribe.toLowerCase()}`} 
                className="px-3 sm:px-5 py-2 sm:py-3 rounded-full bg-white border border-amber-100 shadow-sm hover:shadow-md hover:bg-amber-50 transition text-sm sm:text-base min-h-[44px] flex items-center"
              >
                {tribe}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Preserving Our Heritage */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={HERITAGE_BG} 
            alt="Preserving Our Heritage background" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Preserving Our Heritage
            </h2>
            <p className="text-lg sm:text-xl text-amber-200 mb-2 sm:mb-3">
              Honoring our past, guiding our future.
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-6 sm:leading-7">
              Izithakazelo exists to keep African traditions, clan praises, histories, and family stories alive for the next generation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8">
            <Link href="/clans" className="flex flex-col items-center gap-2 sm:gap-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/roots1.png"
                  alt="Learn Your Roots"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
                Learn Your Roots
              </span>
            </Link>
            
            <Link href="/clans#add-form" className="flex flex-col items-center gap-2 sm:gap-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/share1.png"
                  alt="Share Your Stories"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
                Share Your Stories
              </span>
            </Link>
            
            <Link href="/about" className="flex flex-col items-center gap-2 sm:gap-3 group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
                <img
                  src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/connect1.png"
                  alt="Connect with Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 group-hover:text-amber-700 transition font-medium text-center">
                Connect with Community
              </span>
            </Link>
          </div>
          
          <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-50">
            <p>© 2026 Izithakazelo — Preserving African Heritage</p>
          </div>
        </div>
      </div>
    </div>
  );
}