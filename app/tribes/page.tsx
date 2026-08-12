"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SocialShare from "@/app/components/SocialShare";
import { ChevronRight, Shield, Sparkles, Search } from "lucide-react";

type Tribe = {
  name: string;
  clanCount: number;
  surnameCount: number;
};

// ============================================================
// TRIBE ICONS
// ============================================================

const getTribeIcon = (tribeName: string): string => {
  const iconMap: Record<string, string> = {
    Zulu: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082302/Zulu.png",
    Xhosa:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082336/Xhosa.png",
    Swati:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082154/Swati.png",
    Ndebele:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082169/Ndebele.png",
    Sotho:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082246/Sotho.png",
    Tswana:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082319/Tswana.png",
    Venda:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082267/Venda.png",
    Tsonga:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082285/Tsonga.png",
    Pedi:
      "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082135/Pedi.png",
  };

  return (
    iconMap[tribeName] ||
    "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default.png"
  );
};

// ============================================================
// TRIBE VISUAL STYLES
// ============================================================

const tribeStyles: Record<
  string,
  {
    accent: string;
    accentBg: string;
    softBg: string;
    border: string;
  }
> = {
  Ndebele: {
    accent: "text-emerald-800",
    accentBg: "bg-emerald-700",
    softBg: "bg-emerald-50",
    border: "hover:border-emerald-300",
  },

  Pedi: {
    accent: "text-orange-700",
    accentBg: "bg-orange-600",
    softBg: "bg-orange-50",
    border: "hover:border-orange-300",
  },

  Sotho: {
    accent: "text-lime-800",
    accentBg: "bg-lime-700",
    softBg: "bg-lime-50",
    border: "hover:border-lime-300",
  },

  Swati: {
    accent: "text-yellow-700",
    accentBg: "bg-yellow-600",
    softBg: "bg-yellow-50",
    border: "hover:border-yellow-300",
  },

  Tsonga: {
    accent: "text-amber-800",
    accentBg: "bg-amber-700",
    softBg: "bg-amber-50",
    border: "hover:border-amber-300",
  },

  Tswana: {
    accent: "text-cyan-800",
    accentBg: "bg-cyan-700",
    softBg: "bg-cyan-50",
    border: "hover:border-cyan-300",
  },

  Venda: {
    accent: "text-purple-800",
    accentBg: "bg-purple-700",
    softBg: "bg-purple-50",
    border: "hover:border-purple-300",
  },

  Xhosa: {
    accent: "text-blue-800",
    accentBg: "bg-blue-700",
    softBg: "bg-blue-50",
    border: "hover:border-blue-300",
  },

  Zulu: {
    accent: "text-red-800",
    accentBg: "bg-red-700",
    softBg: "bg-red-50",
    border: "hover:border-red-300",
  },
};

// ============================================================
// PAGE
// ============================================================

export default function TribesPage() {
  const router = useRouter();

  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================================================
  // FETCH TRIBE DATA
  // ==========================================================

  useEffect(() => {
    async function fetchTribes() {
      try {
        setLoading(true);

        const res = await fetch("/api/clans");

        if (!res.ok) {
          throw new Error(`Failed to fetch clans: ${res.status}`);
        }

        const clans = await res.json();

        if (!Array.isArray(clans)) {
          setTribes([]);
          return;
        }

        const tribeMap = new Map<
          string,
          {
            clanCount: number;
            surnameCount: number;
          }
        >();

        clans.forEach((clan: any) => {
          const tribeName = clan?.tribe;

          if (!tribeName) {
            return;
          }

          const surnameCount = Array.isArray(clan.surnames)
            ? clan.surnames.length
            : 0;

          if (tribeMap.has(tribeName)) {
            const existing = tribeMap.get(tribeName)!;

            tribeMap.set(tribeName, {
              clanCount: existing.clanCount + 1,
              surnameCount:
                existing.surnameCount + surnameCount,
            });
          } else {
            tribeMap.set(tribeName, {
              clanCount: 1,
              surnameCount,
            });
          }
        });

        const tribeList: Tribe[] = Array.from(
          tribeMap.entries()
        ).map(([name, data]) => ({
          name,
          clanCount: data.clanCount,
          surnameCount: data.surnameCount,
        }));

        setTribes(
          tribeList.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error("Error fetching tribes:", error);
        setTribes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTribes();
  }, []);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredTribes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return tribes;
    }

    return tribes.filter((tribe) =>
      tribe.name.toLowerCase().includes(query)
    );
  }, [tribes, search]);

  // ==========================================================
  // SHARE URL
  // ==========================================================

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  // ==========================================================
  // TOTALS
  // ==========================================================

  const totalClans = tribes.reduce(
    (total, tribe) => total + tribe.clanCount,
    0
  );

  const totalSurnames = tribes.reduce(
    (total, tribe) => total + tribe.surnameCount,
    0
  );

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div
              className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"
              aria-label="Loading tribes"
            />

            <p className="mt-5 text-sm text-gray-500">
              Discovering our tribes...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-gray-800">
      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative overflow-hidden bg-[#211b16]">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Tribe2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/65" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#211b16]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          {/* Back */}
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            {/* Hero text */}
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles
                  className="h-4 w-4 text-amber-400"
                  aria-hidden="true"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Cultural Heritage
                </span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                Discover our tribes.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base md:text-lg">
                Explore the clans, surnames and cultural heritage connected
                to the communities represented on Izithakazelo.
              </p>

              <div className="mt-7 h-px w-16 bg-amber-500" />
            </div>

            {/* Share */}
            <div className="w-fit">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                <SocialShare
                  title="African Tribes - Izithakazelo"
                  text="Explore the rich heritage of African tribes, their clans, surnames, and praises."
                  url={shareUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STATS
      ======================================================== */}

      <section className="border-b border-amber-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-amber-100">
          <div className="px-3 py-7 text-center sm:py-9">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {tribes.length}
            </p>

            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
              Tribes
            </p>
          </div>

          <div className="px-3 py-7 text-center sm:py-9">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {totalClans}
            </p>

            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
              Clans
            </p>
          </div>

          <div className="px-3 py-7 text-center sm:py-9">
            <p className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {totalSurnames}
            </p>

            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
              Surnames
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Browse by heritage
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Explore our tribes
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              Select a tribe to explore its clans, surnames and cultural
              heritage.
            </p>
          </div>

          {/* Search */}
          <div className="w-full lg:max-w-xs">
            <label
              htmlFor="tribe-search"
              className="sr-only"
            >
              Search tribes
            </label>

            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />

              <input
                id="tribe-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tribes..."
                className="min-h-[48px] w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>
        </div>

        {/* ======================================================
            TRIBE GRID
        ====================================================== */}

        <div className="mt-10">
          {filteredTribes.length === 0 ? (
            <div className="rounded-3xl border border-amber-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
                <Search
                  className="h-6 w-6 text-amber-700"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                No tribes found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try searching for another tribe.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTribes.map((tribe) => {
                const style =
                  tribeStyles[tribe.name] || {
                    accent: "text-gray-800",
                    accentBg: "bg-gray-700",
                    softBg: "bg-gray-50",
                    border: "hover:border-gray-300",
                  };

                return (
                  <Link
                    key={tribe.name}
                    href={`/tribe/${tribe.name.toLowerCase()}`}
                    className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border} focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
                  >
                    {/* Accent line */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${style.accentBg}`}
                    />

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${style.softBg} ring-1 ring-black/5 transition duration-300 group-hover:scale-105`}
                          >
                            <Image
                              src={getTribeIcon(tribe.name)}
                              alt={`${tribe.name} tribe`}
                              width={52}
                              height={52}
                              className="h-12 w-12 object-contain"
                            />
                          </div>

                          {/* Name */}
                          <div>
                            <h3
                              className={`text-xl font-semibold ${style.accent}`}
                            >
                              {tribe.name}
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Cultural community
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-400">
                          Tribe
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-6 text-sm leading-6 text-gray-500">
                        Explore {tribe.name} clans, family names and
                        izithakazelo.
                      </p>

                      {/* Stats */}
                      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/70">
                        <div className="px-4 py-4">
                          <p className="text-2xl font-semibold text-gray-900">
                            {tribe.clanCount}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {tribe.clanCount === 1 ? "Clan" : "Clans"}
                          </p>
                        </div>

                        <div className="border-l border-gray-200 px-4 py-4">
                          <p className="text-2xl font-semibold text-gray-900">
                            {tribe.surnameCount}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {tribe.surnameCount === 1
                              ? "Surname"
                              : "Surnames"}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                        <span
                          className={`text-sm font-semibold ${style.accent}`}
                        >
                          Explore heritage
                        </span>

                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${style.softBg} transition duration-300 group-hover:translate-x-1`}
                        >
                          <ChevronRight
                            className={`h-4 w-4 ${style.accent}`}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          HERITAGE CTA
      ======================================================== */}

      <section className="border-t border-amber-100 bg-[#eee3d4]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Continue exploring
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Looking for your family name?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Browse the clan directory and search for surnames connected to
                your heritage.
              </p>
            </div>

            <Link
              href="/clans"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-amber-700 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Explore Clans
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="bg-[#211b16] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/"
                className="text-lg font-semibold tracking-wide"
              >
                Izithakazelo
              </Link>

              <p className="mt-1 text-xs text-white/40">
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
                className="transition hover:text-white"
              >
                Stories
              </Link>

              <Link
                href="/tribes"
                className="text-amber-300 transition hover:text-amber-200"
              >
                Tribes
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
    </main>
  );
}