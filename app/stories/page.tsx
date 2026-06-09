"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Story = {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  scheduledDate: string | null;
  createdAt: string;
  clan: {
    name: string;
    tribe: string;
  } | null;
};

const DEFAULT_STORY_IMAGE = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default-story.png";
const BACKGROUND_IMAGE = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Stories.png";

export default function AllStoriesPage() {
  const router = useRouter();

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories");
        const data = await res.json();
        setStories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  const featuredStory = stories[0];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Loading stories...</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        {/* Hero */}
        <div className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <button
              onClick={() => router.back()}
              className="text-white/70 hover:text-white transition text-sm mb-6"
            >
              ← Back
            </button>

            <div>
              <p className="text-amber-400 text-xs uppercase tracking-wider mb-2">
                Oral Histories & Legacy
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Heritage Stories
              </h1>
              <p className="text-white/60 text-sm max-w-2xl">
                Preserving clan histories, ancestral wisdom, and the untold stories
                that shaped African identity.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Story - KEEPS IMAGE */}
        {featuredStory && (
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-6">
              <div className="w-12 h-px bg-amber-500 mb-3" />
              <p className="text-amber-400 text-xs uppercase tracking-wider">Featured Story</p>
            </div>

            <Link href={`/${featuredStory.id}`}>
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-amber-400/30 transition">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredStory.imageUrl || DEFAULT_STORY_IMAGE}
                      alt={featuredStory.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8">
                    {featuredStory.clan && (
                      <span className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs mb-4">
                        {featuredStory.clan.tribe}
                      </span>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition">
                      {featuredStory.title}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {featuredStory.summary}
                    </p>
                    <span className="text-amber-400 text-sm group-hover:gap-2 inline-flex items-center gap-1 transition">
                      Read Story →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Search */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-white font-semibold">Explore Stories</h2>
              <p className="text-white/50 text-sm">Search through preserved histories</p>
            </div>
            <input
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/40 text-sm"
            />
          </div>
        </div>

        {/* Stories List - IMAGES REMOVED */}
        <div className="max-w-6xl mx-auto px-6 pb-16">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-white/50">No stories found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map((story) => (
                <Link key={story.id} href={`/${story.id}`}>
                  <div className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-amber-400/30 hover:bg-white/10 transition">
                    {/* REMOVED: Image div section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {story.clan && (
                          <span className="text-xs text-amber-400">{story.clan.tribe}</span>
                        )}
                        <span className="text-white/40 text-xs">
                          {new Date(story.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition mb-2">
                        {story.title}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2">
                        {story.summary}
                      </p>
                    </div>
                    <div className="text-amber-400 text-sm opacity-0 group-hover:opacity-100 transition mt-3">
                      Read →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}