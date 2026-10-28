"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  X,
  SlidersHorizontal,
} from "lucide-react";

import { trackClanSearch } from "@/app/lib/analytics";

type Surname = {
  id: number;
  name: string;
  origin: string | null;
  language: string | null;
};

type ClanSurname = {
  id: number;
  clan_praise: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  verificationStatus: string;
  isRebuilding: boolean;
  surname: Surname;
};

type Clan = {
  id: number;
  name: string;
  tribe: string;
  description: string | null;
  surnames: ClanSurname[];
};

const BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Clans.png";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const tribes = [
  "All",
  "Zulu",
  "Xhosa",
  "Swati",
  "Ndebele",
  "Sotho",
  "Tswana",
  "Venda",
  "Tsonga",
  "Pedi",
];

type Notification = {
  type: "success" | "error";
  message: string;
};

function ClansContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [clans, setClans] = useState<Clan[]>([]);
  const [selectedTribe, setSelectedTribe] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [expandedClans, setExpandedClans] = useState<Set<number>>(
    new Set()
  );

  const [showFilters, setShowFilters] = useState(false);

  const [notification, setNotification] =
    useState<Notification | null>(null);

  // ============================================================
  // URL LETTER FILTER
  // ============================================================

  useEffect(() => {
    const letter = searchParams.get("letter");

    if (letter && alphabet.includes(letter.toUpperCase())) {
      setSelectedLetter(letter.toUpperCase());
    }
  }, [searchParams]);

  // ============================================================
  // FETCH CLANS
  // ============================================================

  useEffect(() => {
    fetchClans();
  }, []);

  async function fetchClans() {
    try {
      setLoading(true);

      const res = await fetch("/api/clans");

      if (!res.ok) {
        throw new Error("Failed to fetch clans");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        setClans([]);
        return;
      }

      setClans(data);

      if (data.length > 0) {
        setExpandedClans(new Set([data[0].id]));
      }
    } catch (error) {
      console.error("Fetch error:", error);

      setNotification({
        type: "error",
        message: "Failed to load clans. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (value.length >= 2) {
      trackClanSearch(value);
    }
  };

  // ============================================================
  // CLAN ACCORDION
  // ============================================================

  const toggleClan = (clanId: number) => {
    setExpandedClans((previous) => {
      const next = new Set(previous);

      if (next.has(clanId)) {
        next.delete(clanId);
      } else {
        next.add(clanId);
      }

      return next;
    });
  };

  const expandAll = () => {
    setExpandedClans(new Set(filteredClans.map((clan) => clan.id)));
  };

  const collapseAll = () => {
    setExpandedClans(new Set());
  };

  // ============================================================
  // LETTER FILTER
  // ============================================================

  const clearLetterFilter = () => {
    setSelectedLetter("");
    router.push("/clans");
  };

  const selectLetter = (letter: string) => {
    if (selectedLetter === letter) {
      clearLetterFilter();
      return;
    }

    setSelectedLetter(letter);

    router.push(`/clans?letter=${letter}`);
  };

  // ============================================================
  // FILTER CLANS
  // ============================================================

  const filteredClans = useMemo(() => {
    let result = clans;

    if (selectedTribe !== "All") {
      result = result.filter((clan) => clan.tribe === selectedTribe);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((clan) => {
        const clanMatch =
          clan.name?.toLowerCase().includes(query) ||
          clan.tribe?.toLowerCase().includes(query) ||
          clan.description?.toLowerCase().includes(query);

        const surnameMatch = clan.surnames.some((item) => {
          return item.surname.name?.toLowerCase().includes(query);
        });

        return clanMatch || surnameMatch;
      });
    }

    if (selectedLetter) {
      result = result
        .map((clan) => ({
          ...clan,
          surnames: clan.surnames.filter(
            (item) =>
              item.surname.name.charAt(0).toUpperCase() === selectedLetter
          ),
        }))
        .filter((clan) => clan.surnames.length > 0);
    }

    return result;
  }, [clans, selectedTribe, selectedLetter, search]);

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent" />

            <p className="mt-5 text-sm text-gray-500">
              Opening the clan archive...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-[#faf7f2] text-gray-800">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#241b15]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${BACKGROUND_IMAGE}')`,
          }}
        />

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-[#241b15]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              African Heritage Archive
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Clan Names & Praises
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Discover family names, clan praises and the cultural heritage
              carried through generations.
            </p>

            <div className="mt-7 h-px w-16 bg-amber-500" />
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Intro */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
              Explore the archive
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
              Find your clan
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
              Search by clan, surname, tribe or the first letter of a family
              name.
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search clan names, surnames or tribes..."
              className="min-h-[50px] w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tribe filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {tribes.map((tribe) => (
              <button
                key={tribe}
                type="button"
                onClick={() => setSelectedTribe(tribe)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedTribe === tribe
                    ? "bg-amber-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                {tribe}
              </button>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-amber-300 hover:text-amber-700 sm:px-4"
          >
            <SlidersHorizontal className="h-4 w-4" />

            <span className="hidden sm:inline">Alphabet</span>
            <span className="sm:hidden">A-Z</span>

            {selectedLetter && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                {selectedLetter}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-amber-300 hover:text-amber-700 sm:block"
            >
              Expand All
            </button>

            <button
              type="button"
              onClick={collapseAll}
              className="hidden rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 shadow-sm transition hover:border-amber-300 hover:text-amber-700 sm:block"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* ALPHABET */}
        {showFilters && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Browse by surname
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Select a letter to narrow the archive.
                </p>
              </div>

              {selectedLetter && (
                <button
                  type="button"
                  onClick={clearLetterFilter}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10 md:grid-cols-13">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => selectLetter(letter)}
                  className={`aspect-square rounded-full text-xs font-semibold transition sm:text-sm ${
                    selectedLetter === letter
                      ? "bg-amber-700 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE FILTERS */}
        {(selectedLetter || selectedTribe !== "All" || search) && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Active filters:</span>

            {selectedTribe !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedTribe("All")}
                className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
              >
                {selectedTribe}
                <X className="h-3 w-3" />
              </button>
            )}

            {selectedLetter && (
              <button
                type="button"
                onClick={clearLetterFilter}
                className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
              >
                Letter: {selectedLetter}
                <X className="h-3 w-3" />
              </button>
            )}

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
              >
                Search: {search}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}

        {/* CLAN LIST */}
        <div className="mt-8 space-y-4">
          {filteredClans.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <Search className="mx-auto h-9 w-9 text-amber-700" />

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No clans found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find anything matching your current search or
                filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedTribe("All");
                  clearLetterFilter();
                }}
                className="mt-6 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredClans.map((clan) => {
              const isExpanded = expandedClans.has(clan.id);
              const tribeDiffersFromClan =
                clan.name.toLowerCase() !== clan.tribe.toLowerCase();

              return (
                <article
                  key={clan.id}
                  className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Clan header */}
                  <button
                    type="button"
                    onClick={() => toggleClan(clan.id)}
                    aria-expanded={isExpanded}
                    className="group flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-amber-50/40 sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                          {clan.name} Clan
                        </h3>

                        {/* Only show tribe badge if it differs from clan name */}
                        {tribeDiffersFromClan && (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                            {clan.tribe}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition ${
                        isExpanded
                          ? "rotate-180 bg-amber-50 text-amber-700"
                          : "group-hover:bg-amber-50 group-hover:text-amber-700"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      {/* Description */}
                      {clan.description && (
                        <div className="px-5 pt-6 sm:px-7">
                          <p className="max-w-3xl text-sm leading-7 text-gray-600">
                            {clan.description}
                          </p>
                        </div>
                      )}

                      {/* Surnames */}
                      <div className="px-5 pb-6 pt-6 sm:px-7">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Family Names
                            </p>

                            <h4 className="mt-1 text-lg font-semibold text-gray-900">
                              Surnames
                            </h4>
                          </div>
                        </div>

                        {clan.surnames.length === 0 ? (
                          <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                            <p className="text-sm text-gray-400">
                              No surnames have been added yet.
                            </p>
                          </div>
                        ) : (
                          <div className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
                            {clan.surnames.map((item) => {
                              // If surname name matches clan name, don't repeat it
                              const surnameMatchesClan =
                                item.surname.name.toLowerCase() ===
                                clan.name.toLowerCase();

                              return (
                                <Link
                                  key={item.id}
                                  href={`/surname/${encodeURIComponent(
                                    item.surname.name
                                  )}`}
                                  className="group flex items-center justify-between gap-4 p-4 transition hover:bg-amber-50/40 sm:p-5"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-semibold text-gray-900 transition group-hover:text-amber-700 sm:text-lg">
                                        {surnameMatchesClan
                                          ? `${item.surname.name} (surname)`
                                          : item.surname.name}
                                      </span>

                                      {item.clan_praise &&
                                        !item.isRebuilding && (
                                          <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-green-700 ring-1 ring-green-200">
                                            Verified
                                          </span>
                                        )}
                                    </div>

                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                      {item.surname.language && (
                                        <span>{item.surname.language}</span>
                                      )}
                                      {item.surname.language &&
                                        item.surname.origin && (
                                          <span className="text-gray-300">
                                            ·
                                          </span>
                                        )}
                                      {item.surname.origin && (
                                        <span>{item.surname.origin}</span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex shrink-0 items-center gap-2">
                                    <span className="hidden text-xs font-medium text-amber-700 sm:inline">
                                      {item.isRebuilding ||
                                      !item.clan_praise
                                        ? "Share what you know"
                                        : "View praises"}
                                    </span>
                                    <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-600" />
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* CONTRIBUTION CTA */}
      <section className="border-t border-amber-100 bg-[#eee3d4]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Help preserve our heritage
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Know a clan praise we're missing?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Share what you know with the community. Every contribution is
                reviewed before being added to the archive.
              </p>
            </div>

            <Link
              href="/contribute"
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              <Plus className="h-4 w-4" />
              Add a Contribution
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#211b16] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/" className="text-lg font-semibold tracking-wide">
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
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>

              <Link
                href="/clans"
                className="text-amber-300 transition hover:text-amber-200"
              >
                Clans
              </Link>

              <Link href="/tribes" className="transition hover:text-white">
                Tribes
              </Link>

              <Link href="/stories" className="transition hover:text-white">
                Stories
              </Link>

              <Link href="/about" className="transition hover:text-white">
                About
              </Link>

              <Link href="/contact" className="transition hover:text-white">
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

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <div
            className={`rounded-2xl border px-5 py-4 shadow-xl backdrop-blur-md ${
              notification.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium leading-6">
                  {notification.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-current opacity-50 hover:opacity-100"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ============================================================
// PAGE WRAPPER
// ============================================================

export default function ClansPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-700 border-t-transparent" />

            <p className="mt-4 text-sm text-gray-500">Loading clans...</p>
          </div>
        </main>
      }
    >
      <ClansContent />
    </Suspense>
  );
}