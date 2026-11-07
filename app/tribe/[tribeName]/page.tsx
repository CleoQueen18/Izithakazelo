"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronRight,
  Search,
  ArrowLeft,
  BookOpen,
  Users,
  Languages,
  MapPin,
  AlertCircle,
} from "lucide-react";

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

const getTribeBackground = (tribeName: string): string => {
  const bgMap: Record<string, string> = {
    Zulu: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/zulu1.png",
    Xhosa: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/xhosa1.png",
    Swati: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/swati1.png",
    Ndebele: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/ndebele1.png",
    Sotho: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/sotho1.png",
    Tswana: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/tswana1.png",
    Venda: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/venda1.png",
    Tsonga: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/tsonga1.png",
    Pedi: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/pedi1.png",
  };
  return bgMap[tribeName] || "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Tribe2.png";
};

const getTribeIcon = (tribeName: string): string => {
  const iconMap: Record<string, string> = {
    Zulu: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082302/Zulu.png",
    Xhosa: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082336/Xhosa.png",
    Swati: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082154/Swati.png",
    Ndebele: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082169/Ndebele.png",
    Sotho: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082246/Sotho.png",
    Tswana: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082319/Tswana.png",
    Venda: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082267/Venda.png",
    Tsonga: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082285/Tsonga.png",
    Pedi: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1782082135/Pedi.png",
  };
  return iconMap[tribeName] || "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/default.png";
};

export default function TribeDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [tribeName, setTribeName] = useState("");
  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedClans, setExpandedClans] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getTribeName() {
      try {
        const resolvedParams = await params;
        const value = resolvedParams.tribeName;
        if (Array.isArray(value)) {
          setTribeName(value[0] || "");
        } else {
          setTribeName(value as string);
        }
      } catch (error) {
        console.error("Unable to resolve tribe:", error);
        setError("Unable to load this tribe.");
      }
    }
    getTribeName();
  }, [params]);

  useEffect(() => {
    async function fetchTribeData() {
      if (!tribeName) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/tribes/${encodeURIComponent(tribeName)}`);
        if (!res.ok) {
          setError(`No tribe found named "${tribeName}"`);
          setClans([]);
          return;
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
        setError("Something went wrong. Please try again.");
        setClans([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTribeData();
  }, [tribeName]);

  const toggleClan = (clanId: number) => {
    setExpandedClans((previous) => {
      const next = new Set(previous);
      if (next.has(clanId)) next.delete(clanId);
      else next.add(clanId);
      return next;
    });
  };

  const expandAll = () => setExpandedClans(new Set(clans.map((clan) => clan.id)));
  const collapseAll = () => setExpandedClans(new Set());

  const displayTribeName = useMemo(() => {
    if (!tribeName) return "";
    return tribeName.charAt(0).toUpperCase() + tribeName.slice(1).toLowerCase();
  }, [tribeName]);

  const backgroundImage = getTribeBackground(displayTribeName);
  const tribeIcon = getTribeIcon(displayTribeName);

  const filteredClans = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return clans;
    return clans.filter((clan) => {
      const clanName = clan.name?.toLowerCase() || "";
      const description = clan.description?.toLowerCase() || "";
      const clanMatches = clanName.includes(query) || description.includes(query);
      const surnameMatches = clan.surnames.some((item) => item.surname.name?.toLowerCase().includes(query));
      return clanMatches || surnameMatches;
    });
  }, [clans, search]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2]">
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent" />
            <p className="mt-5 text-sm text-gray-500">Exploring {displayTribeName || "tribe"} heritage...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-gray-900">Tribe Not Found</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">{error}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => router.back()} className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
              Go Back
            </button>
            <Link href="/tribes" className="rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800">
              Explore Tribes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-gray-800">
      <section className="relative overflow-hidden bg-[#211b16]">
        <div className="absolute inset-0">
          <Image src={backgroundImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-[#211b16]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-18 sm:pt-10">
          <button onClick={() => router.back()} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2.5 shadow-2xl backdrop-blur-md sm:h-24 sm:w-24 md:h-28 md:w-28">
              <Image src={tribeIcon} alt={`${displayTribeName} tribe`} width={80} height={80} className="h-full w-full object-contain" />
            </div>

            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 sm:mb-3">
                Cultural Heritage
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {displayTribeName}
              </h1>
              <div className="mx-auto mt-3 h-px w-12 bg-amber-500 sm:mx-0 sm:mt-5 sm:w-16" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Explore the heritage</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Clans of the {displayTribeName}</h2>
          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">Explore each clan to discover its history, origin stories, surnames and izithakazelo.</p>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-md">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clans or surnames..."
                className="min-h-[46px] w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={expandAll} className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700">
              Expand All
            </button>
            <button onClick={collapseAll} className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700">
              Collapse All
            </button>
          </div>
        </div>

        <div className="mt-7 space-y-4">
          {filteredClans.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
              <Search className="mx-auto h-8 w-8 text-amber-700" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No clans found</h3>
              <p className="mt-2 text-sm text-gray-500">Try searching for another clan or surname.</p>
              <button onClick={() => setSearch("")} className="mt-5 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800">
                Clear Search
              </button>
            </div>
          ) : (
            filteredClans.map((clan) => {
              const isExpanded = expandedClans.has(clan.id);
              const tribeDiffersFromClan = clan.name.toLowerCase() !== clan.tribe.toLowerCase();

              return (
                <article key={clan.id} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                  <button onClick={() => toggleClan(clan.id)} aria-expanded={isExpanded} className="group flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-amber-50/40 sm:p-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                          {clan.name} Clan
                        </h3>
                        {tribeDiffersFromClan && (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                            {clan.tribe}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{clan.tribe}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{clan.surnames.length} {clan.surnames.length === 1 ? "surname" : "surnames"}</span>
                      </div>
                    </div>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition duration-300 group-hover:bg-amber-50 group-hover:text-amber-700 ${isExpanded ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100">
                      {clan.description && (
                        <div className="border-b border-gray-100 bg-gray-50/50 px-5 py-6 sm:px-7">
                          <p className="text-sm leading-7 text-gray-600 sm:text-base">{clan.description}</p>
                        </div>
                      )}

                      <div className="px-5 py-7 sm:px-7">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Family Names</p>
                            <h4 className="mt-1 text-xl font-semibold text-gray-900">Surnames</h4>
                          </div>
                        </div>

                        {clan.surnames.length === 0 ? (
                          <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-center">
                            <p className="text-sm text-gray-400">No surnames have been added for this clan yet.</p>
                          </div>
                        ) : (
                          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {clan.surnames.map((item) => {
                              const surnameMatchesClan = item.surname.name.toLowerCase() === clan.name.toLowerCase();
                              return (
                                <Link
                                  key={item.id}
                                  href={`/surname/${encodeURIComponent(item.surname.name)}`}
                                  className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition hover:border-amber-200 hover:bg-amber-50/40 hover:shadow-sm"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-semibold text-gray-900 transition group-hover:text-amber-700">
                                        {surnameMatchesClan ? `${item.surname.name} (surname)` : item.surname.name}
                                      </span>
                                      {item.clan_praise && !item.isRebuilding && (
                                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-green-700 ring-1 ring-green-200">
                                          Verified
                                        </span>
                                      )}
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                                      {item.surname.language && <span>{item.surname.language}</span>}
                                      {item.surname.language && item.surname.origin && <span className="text-gray-300">·</span>}
                                      {item.surname.origin && <span>{item.surname.origin}</span>}
                                    </div>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-2">
                                    <span className="hidden text-xs font-medium text-amber-700 sm:inline">
                                      {item.isRebuilding || !item.clan_praise ? "Share what you know" : "View praises"}
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

      <section className="border-t border-amber-100 bg-[#eee3d4]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Continue your journey</p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl">Explore another tribe</h2>
              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-600">Discover more clans, surnames and cultural histories from across our heritage.</p>
            </div>
            <Link href="/tribes" className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full bg-amber-700 px-7 text-sm font-semibold text-white transition hover:bg-amber-800 hover:-translate-y-0.5">
              All Tribes <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#211b16] text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/" className="text-lg font-semibold tracking-wide">Izithakazelo</Link>
              <p className="mt-1 text-xs text-white/40">Preserving our names, stories and heritage.</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/45">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <Link href="/clans" className="transition hover:text-white">Clans</Link>
              <Link href="/tribes" className="text-amber-300 transition hover:text-amber-200">Tribes</Link>
              <Link href="/stories" className="transition hover:text-white">Stories</Link>
              <Link href="/about" className="transition hover:text-white">About</Link>
              <Link href="/contact" className="transition hover:text-white">Contact</Link>
            </nav>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-center text-xs text-white/25 sm:text-left">© {new Date().getFullYear()} Izithakazelo. Preserving heritage, one story at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}