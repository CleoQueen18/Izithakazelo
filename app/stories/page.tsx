"use client";

import { useEffect, useMemo, useState } from "react";
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

const DEFAULT_STORY_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default-story.png";

const BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Stories.png";

export default function AllStoriesPage() {
  const router = useRouter();

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStories() {
      try {
        setLoading(true);

        const res = await fetch("/api/stories");

        if (!res.ok) {
          throw new Error(`Failed to fetch stories: ${res.status}`);
        }

        const data = await res.json();

        setStories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, []);

  /*
   * Search title, summary, clan name and tribe.
   * This makes the search much more useful than searching
   * the title alone.
   */
  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return stories;
    }

    return stories.filter((story) => {
      const title = story.title?.toLowerCase() || "";
      const summary = story.summary?.toLowerCase() || "";
      const clanName = story.clan?.name?.toLowerCase() || "";
      const tribe = story.clan?.tribe?.toLowerCase() || "";

      return (
        title.includes(query) ||
        summary.includes(query) ||
        clanName.includes(query) ||
        tribe.includes(query)
      );
    });
  }, [stories, search]);

  /*
   * The first story remains the featured story,
   * matching your current implementation.
   */
  const featuredStory = stories[0];

  const clearSearch = () => {
    setSearch("");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#211b16]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div
              className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"
              aria-label="Loading"
            />

            <p className="mt-5 text-sm text-gray-400">
              Loading heritage stories...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#211b16]">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="fixed inset-0 z-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Darker around edges, lighter through the middle */}
        <div className="absolute inset-0 bg-[#17120f]/75" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#211b16]/80 to-[#211b16]" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative z-10">
        {/* =======================================================
            HERO
        ======================================================= */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            {/* Back */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <span aria-hidden="true">←</span>
              Back
            </button>

            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                Oral histories · Memory · Legacy
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                Heritage Stories
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base md:text-lg">
                Stories that connect generations — preserving clan histories,
                ancestral wisdom, family memories and the experiences that
                shape our heritage.
              </p>

              {/* Story count */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-sm">
                  <span className="font-semibold text-amber-300">
                    {stories.length}
                  </span>{" "}
                  {stories.length === 1 ? "story" : "stories"} preserved
                </div>

                <Link
                  href="/clans#add-form"
                  className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-300 transition hover:bg-amber-500/20"
                >
                  Share your story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            FEATURED STORY
        ======================================================= */}
        {featuredStory && (
          <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Featured Story
              </p>

              <div className="mt-3 h-px w-12 bg-amber-500" />
            </div>

            <Link
              href={`/stories/${featuredStory.id}`}
              className="group block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition duration-300 hover:border-amber-400/30 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:min-h-[420px]">
                  <Image
                    src={
                      featuredStory.imageUrl || DEFAULT_STORY_IMAGE
                    }
                    alt={featuredStory.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:bg-gradient-to-r" />

                  {/* Featured badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                  {featuredStory.clan && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300">
                        {featuredStory.clan.name}
                      </span>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                        {featuredStory.clan.tribe}
                      </span>
                    </div>
                  )}

                  <h2 className="text-2xl font-semibold leading-tight text-white transition group-hover:text-amber-300 sm:text-3xl">
                    {featuredStory.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
                    {featuredStory.summary}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">
                    Read the story
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* =======================================================
            SEARCH / ARCHIVE HEADER
        ======================================================= */}
        <section className="border-y border-white/10 bg-black/10">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Heritage Archive
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Explore the stories
                </h2>

                <p className="mt-2 text-sm text-white/50">
                  Search through preserved histories and family stories.
                </p>
              </div>

              {/* Search */}
              <div className="w-full lg:max-w-md">
                <label
                  htmlFor="story-search"
                  className="sr-only"
                >
                  Search stories
                </label>

                <div className="relative">
                  <span
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/35"
                    aria-hidden="true"
                  >
                    ⌕
                  </span>

                  <input
                    id="story-search"
                    type="search"
                    placeholder="Search stories, clans or tribes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="min-h-[50px] w-full rounded-xl border border-white/10 bg-white/5 px-11 pr-12 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/30 focus:border-amber-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-amber-500/20"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search result count */}
            {search && (
              <p className="mt-5 text-xs text-white/40">
                Showing{" "}
                <span className="font-semibold text-amber-300">
                  {filteredStories.length}
                </span>{" "}
                {filteredStories.length === 1 ? "result" : "results"} for{" "}
                <span className="text-white/70">"{search}"</span>
              </p>
            )}
          </div>
        </section>

        {/* =======================================================
            STORIES LIST
        ======================================================= */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          {filteredStories.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-2xl text-amber-400">
                ⌕
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                No stories found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45">
                We couldn't find a story matching your search. Try a different
                title, clan or tribe.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-6 rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.id}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition duration-300 hover:border-amber-400/30 hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-400 sm:p-6"
                >
                  <article>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        {/* Metadata */}
                        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                          {story.clan && (
                            <>
                              <span className="text-xs font-semibold text-amber-400">
                                {story.clan.name}
                              </span>

                              <span
                                className="h-1 w-1 rounded-full bg-white/20"
                                aria-hidden="true"
                              />

                              <span className="text-xs text-white/45">
                                {story.clan.tribe}
                              </span>

                              <span
                                className="h-1 w-1 rounded-full bg-white/20"
                                aria-hidden="true"
                              />
                            </>
                          )}

                          <time
                            dateTime={story.createdAt}
                            className="text-xs text-white/35"
                          >
                            {new Date(
                              story.createdAt
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-white transition group-hover:text-amber-300 sm:text-xl">
                          {story.title}
                        </h3>

                        {/* Summary */}
                        <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-white/45">
                          {story.summary}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex shrink-0 items-center gap-2 pt-1 text-sm font-medium text-amber-400">
                        <span className="hidden sm:inline">
                          Read
                        </span>

                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* =======================================================
            CONTRIBUTION CTA
        ======================================================= */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-500/20 bg-amber-500/[0.07] px-6 py-12 text-center backdrop-blur-sm sm:px-10">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-700/10 blur-3xl" />

              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Help preserve our heritage
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                  Your family story could help someone discover their roots.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                  Share a clan story, family history or piece of knowledge that
                  deserves to be remembered and passed on.
                </p>

                <Link
                  href="/clans#add-form"
                  className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#211b16]"
                >
                  Share Your Story
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            FOOTER
        ======================================================= */}
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-wide text-white"
                >
                  Izithakazelo
                </Link>

                <p className="mt-1 text-xs text-white/35">
                  Preserving our names, stories and heritage.
                </p>
              </div>

              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/45"
              >
                <Link
                  href="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/clans"
                  className="transition hover:text-white"
                >
                  Clans
                </Link>

                <Link
                  href="/stories"
                  className="text-amber-300 transition hover:text-amber-200"
                >
                  Stories
                </Link>

                <Link
                  href="/about"
                  className="transition hover:text-white"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-center text-xs text-white/25 sm:text-left">
                © {new Date().getFullYear()} Izithakazelo. Preserving heritage,
                one story at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}