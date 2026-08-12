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
  BookOpen,
  Users,
  SlidersHorizontal,
} from "lucide-react";

import SocialShare from "@/app/components/SocialShare";
import ClanImageGallery from "@/app/components/ClanImageGallery";

type Surname = {
  id: number;
  name: string;
  origin: string | null;
  language: string | null;
};

type ClanSurname = {
  id: number;
  clan_praise: string;
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

  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    surname: "",
    clanName: "",
    clan_praise: "",
    origin: "",
    language: "",
    contributorName: "",
  });

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
  // CONTRIBUTION FORM
  // ============================================================

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch("/api/admin/contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "CLAN_PRAISE",
          data: JSON.stringify(form),
          contributorName: form.contributorName || "Anonymous",
          contributorEmail: null,
          status: "PENDING",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setNotification({
        type: "success",
        message:
          "Thank you! Your contribution has been submitted for review.",
      });

      setForm({
        surname: "",
        clanName: "",
        clan_praise: "",
        origin: "",
        language: "",
        contributorName: "",
      });

      setShowAddForm(false);

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.error("Submit error:", error);

      setNotification({
        type: "error",
        message: "We couldn't submit your contribution. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

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

    // Tribe
    if (selectedTribe !== "All") {
      result = result.filter(
        (clan) => clan.tribe === selectedTribe
      );
    }

    // Search
    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((clan) => {
        const clanMatch =
          clan.name?.toLowerCase().includes(query) ||
          clan.tribe?.toLowerCase().includes(query) ||
          clan.description?.toLowerCase().includes(query);

        const surnameMatch = clan.surnames.some((item) => {
          return (
            item.surname.name
              ?.toLowerCase()
              .includes(query) ||
            item.clan_praise
              ?.toLowerCase()
              .includes(query)
          );
        });

        return clanMatch || surnameMatch;
      });
    }

    // Alphabet
    if (selectedLetter) {
      result = result
        .map((clan) => ({
          ...clan,
          surnames: clan.surnames.filter(
            (item) =>
              item.surname.name
                .charAt(0)
                .toUpperCase() === selectedLetter
          ),
        }))
        .filter((clan) => clan.surnames.length > 0);
    }

    return result;
  }, [
    clans,
    selectedTribe,
    selectedLetter,
    search,
  ]);

  // ============================================================
  // STATISTICS
  // ============================================================

  const totalSurnames = clans.reduce(
    (total, clan) => total + clan.surnames.length,
    0
  );

  const totalPraises = clans.reduce(
    (total, clan) =>
      total +
      clan.surnames.filter(
        (item) => item.clan_praise?.trim()
      ).length,
    0
  );

  const tribeCount = new Set(
    clans.map((clan) => clan.tribe)
  ).size;

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

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

      {/* ========================================================
          HERO
      ======================================================== */}

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

          {/* Back */}

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
              Discover family names, clan praises and the cultural
              heritage carried through generations.
            </p>

            <div className="mt-7 h-px w-16 bg-amber-500" />
          </div>

          {/* Hero stats */}

          <div className="mt-10 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
              <Users className="h-5 w-5 text-amber-400" />

              <p className="mt-3 text-2xl font-semibold text-white">
                {clans.length}
              </p>

              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40 sm:text-xs">
                Clans
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
              <BookOpen className="h-5 w-5 text-amber-400" />

              <p className="mt-3 text-2xl font-semibold text-white">
                {totalSurnames}
              </p>

              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40 sm:text-xs">
                Surnames
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
              <span className="text-lg font-serif text-amber-400">
                “”
              </span>

              <p className="mt-2 text-2xl font-semibold text-white">
                {totalPraises}
              </p>

              <p className="text-[10px] uppercase tracking-[0.1em] text-white/40 sm:text-xs">
                Praises
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN
      ======================================================== */}

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
              Search by clan, surname, tribe or the first letter
              of a family name.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-amber-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Contribute
          </button>

        </div>

        {/* ======================================================
            SEARCH
        ====================================================== */}

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="relative">

            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clan names, surnames or praises..."
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

        {/* ======================================================
            FILTER BAR
        ====================================================== */}

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

        {/* ======================================================
            ALPHABET
        ====================================================== */}

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

        {/* ======================================================
            ACTIVE FILTERS
        ====================================================== */}

        {(selectedLetter ||
          selectedTribe !== "All" ||
          search) && (
          <div className="mt-5 flex flex-wrap items-center gap-2">

            <span className="text-xs text-gray-400">
              Active filters:
            </span>

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

        {/* Results */}

        <div className="mt-8 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredClans.length}
            </span>{" "}
            {filteredClans.length === 1
              ? "clan"
              : "clans"}
          </p>

          {filteredClans.length > 0 && (
            <p className="hidden text-xs text-gray-400 sm:block">
              Select a clan to explore its surnames
            </p>
          )}

        </div>

        {/* ======================================================
            CLAN LIST
        ====================================================== */}

        <div className="mt-4 space-y-4">

          {filteredClans.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

              <Search className="mx-auto h-9 w-9 text-amber-700" />

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No clans found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find anything matching your current
                search or filters.
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

              const isExpanded =
                expandedClans.has(clan.id);

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
                          {clan.name}
                        </h3>

                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                          {clan.tribe}
                        </span>

                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">

                        <Users className="h-3.5 w-3.5" />

                        {clan.surnames.length}{" "}
                        {clan.surnames.length === 1
                          ? "surname"
                          : "surnames"}

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

                      {/* Gallery */}

                      <div className="px-5 pt-6 sm:px-7">

                        <ClanImageGallery
                          clanId={clan.id}
                        />

                      </div>

                      {/* Surnames */}

                      <div className="px-5 pb-6 pt-7 sm:px-7">

                        <div className="flex items-end justify-between gap-4">

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Family Names
                            </p>

                            <h4 className="mt-1 text-xl font-semibold text-gray-900">
                              Surnames & Praises
                            </h4>
                          </div>

                          <span className="text-xs text-gray-400">
                            {clan.surnames.length}
                          </span>

                        </div>

                        {clan.surnames.length === 0 ? (
                          <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">

                            <p className="text-sm text-gray-400">
                              No surnames have been added yet.
                            </p>

                          </div>
                        ) : (
                          <div className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">

                            {clan.surnames.map(
                              (item) => (
                                <div
                                  key={item.id}
                                  className="group p-4 transition hover:bg-amber-50/40 sm:p-5"
                                >

                                  <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0 flex-1">

                                      <Link
                                        href={`/surname/${encodeURIComponent(
                                          item.surname.name
                                        )}`}
                                        className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 transition hover:text-amber-700 sm:text-lg"
                                      >
                                        {item.surname.name}

                                        <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1 group-hover:text-amber-600" />
                                      </Link>

                                      {item.clan_praise && (
                                        <p className="mt-2 max-w-3xl text-sm italic leading-6 text-gray-500">
                                          "{item.clan_praise}"
                                        </p>
                                      )}

                                      <div className="mt-3 flex flex-wrap gap-2">

                                        {item.surname.origin && (
                                          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
                                            {item.surname.origin}
                                          </span>
                                        )}

                                        {item.surname.language && (
                                          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
                                            {item.surname.language}
                                          </span>
                                        )}

                                      </div>

                                    </div>

                                    <SocialShare
                                      title={`${item.surname.name} - Izithakazelo`}
                                      text={`"${item.clan_praise}" - ${item.surname.name} (${clan.name} Clan)`}
                                      url={`${shareUrl}/surname/${encodeURIComponent(
                                        item.surname.name
                                      )}`}
                                      clanId={clan.id}
                                      clanName={clan.name}
                                    />

                                  </div>

                                </div>
                              )
                            )}

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

      {/* ========================================================
          CONTRIBUTION CTA
      ======================================================== */}

      <section className="border-t border-amber-100 bg-[#eee3d4]">

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Keep the heritage alive
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
                Know a clan praise we're missing?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Share what you know with the community. Every
                contribution is reviewed before being added to the
                archive.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              <Plus className="h-4 w-4" />
              Add a Contribution
            </button>

          </div>

        </div>

      </section>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer className="bg-[#211b16] text-white">

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

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
                className="text-amber-300 transition hover:text-amber-200"
              >
                Clans
              </Link>

              <Link
                href="/tribes"
                className="transition hover:text-white"
              >
                Tribes
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
              © {new Date().getFullYear()} Izithakazelo.
              Preserving heritage, one story at a time.
            </p>

          </div>

        </div>

      </footer>

      {/* ========================================================
          CONTRIBUTION MODAL
      ======================================================== */}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">

          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >

            {/* Modal header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-5 sm:px-7">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Community Contribution
                </p>

                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                  Share a Clan Praise
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
                aria-label="Close contribution form"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            {/* Modal content */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-7"
            >

              <div className="rounded-2xl bg-amber-50 p-4">

                <p className="text-sm leading-6 text-amber-900">
                  Help preserve our heritage by sharing a surname,
                  clan praise or information you know. Your
                  submission will be reviewed before it appears
                  publicly.
                </p>

              </div>

              {/* Contributor */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Your name
                  <span className="ml-1 font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={form.contributorName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contributorName: e.target.value,
                    })
                  }
                  placeholder="Your name"
                  className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                />

              </div>

              {/* Surname + Clan */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Surname
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    required
                    value={form.surname}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        surname: e.target.value,
                      })
                    }
                    placeholder="e.g. Mthembu"
                    className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Clan
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <select
                    required
                    value={form.clanName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        clanName: e.target.value,
                      })
                    }
                    className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                  >

                    <option value="">
                      Select a clan
                    </option>

                    {clans.map((clan) => (
                      <option
                        key={clan.id}
                        value={clan.name}
                      >
                        {clan.name}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* Praise */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Clan Praise
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  required
                  value={form.clan_praise}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      clan_praise: e.target.value,
                    })
                  }
                  placeholder="Enter the clan praise..."
                  rows={5}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                />

              </div>

              {/* Origin + Language */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Origin
                  </label>

                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        origin: e.target.value,
                      })
                    }
                    placeholder="e.g. KwaZulu-Natal"
                    className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Language
                  </label>

                  <select
                    value={form.language}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        language: e.target.value,
                      })
                    }
                    className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
                  >

                    <option value="">
                      Select language
                    </option>

                    <option value="isiZulu">
                      isiZulu
                    </option>

                    <option value="isiXhosa">
                      isiXhosa
                    </option>

                    <option value="siSwati">
                      siSwati
                    </option>

                    <option value="isiNdebele">
                      isiNdebele
                    </option>

                    <option value="Sesotho">
                      Sesotho
                    </option>

                    <option value="Setswana">
                      Setswana
                    </option>

                    <option value="Tshivenda">
                      Tshivenda
                    </option>

                    <option value="Xitsonga">
                      Xitsonga
                    </option>

                    <option value="English">
                      English
                    </option>

                  </select>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="min-h-[46px] rounded-full border border-gray-200 px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="min-h-[46px] rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit for Review"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ========================================================
          NOTIFICATION
      ======================================================== */}

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

            <p className="mt-4 text-sm text-gray-500">
              Loading clans...
            </p>
          </div>
        </main>
      }
    >
      <ClansContent />
    </Suspense>
  );
}