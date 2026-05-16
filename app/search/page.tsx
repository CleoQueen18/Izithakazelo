"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type SearchResult = {
  query: string;
  totalCount: number;
  clans: any[];
  surnames: any[];
  praises: any[];
};

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      if (!query.trim()) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setError("Failed to load search results.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-amber-700 hover:text-amber-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">Enter a search term to find results.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-amber-700 hover:text-amber-800"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!results || results.totalCount === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">No results found</h1>
        <p className="text-gray-500 mb-8">
          We couldn't find anything matching "{query}"
        </p>
        <button
          onClick={() => router.back()}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
        >
          Try Another Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 text-gray-500 hover:text-amber-700 transition text-sm"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Search Results</h1>
        <p className="text-gray-500 mt-1">
          Found {results.totalCount} result{results.totalCount !== 1 ? 's' : ''} for "{results.query}"
        </p>
        <div className="w-16 h-1 bg-amber-600 mt-4 rounded-full" />
      </div>

      {/* Clans Results */}
      {results.clans.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm">
              {results.clans.length}
            </span>
            Clans
          </h2>
          <div className="space-y-3">
            {results.clans.map((clan) => (
              <Link
                key={clan.id}
                href={`/tribe/${clan.tribe.toLowerCase()}`}
                className="block bg-white rounded-xl border border-amber-100 p-4 hover:shadow-md transition group"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
                    {clan.name} Clan
                  </h3>
                  <p className="text-sm text-gray-500">{clan.tribe} Tribe</p>
                  {clan.description && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{clan.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Surnames Results */}
      {results.surnames.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm">
              {results.surnames.length}
            </span>
            Surnames
          </h2>
          <div className="space-y-3">
            {results.surnames.map((surname) => (
              <Link
                key={surname.id}
                href={`/surname/${encodeURIComponent(surname.name)}`}
                className="block bg-white rounded-xl border border-amber-100 p-4 hover:shadow-md transition group"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition">
                    {surname.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                    {surname.origin && <span>📍 {surname.origin}</span>}
                    {surname.language && <span>🗣️ {surname.language}</span>}
                  </div>
                  {surname.clans.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2">
                      Found in {surname.clans.length} clan{surname.clans.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Praises Results */}
      {results.praises.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm">
              {results.praises.length}
            </span>
            Clan Praises
          </h2>
          <div className="space-y-3">
            {results.praises.map((praise) => (
              <div
                key={praise.id}
                className="bg-white rounded-xl border border-amber-100 p-4 hover:shadow-md transition"
              >
                <div>
                  <Link
                    href={`/surname/${encodeURIComponent(praise.surname.name)}`}
                    className="text-lg font-semibold text-gray-800 hover:text-amber-700 transition"
                  >
                    {praise.surname.name}
                  </Link>
                  <p className="text-sm text-gray-500 italic mt-1">
                    "{praise.clan_praise}"
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                    <Link
                      href={`/tribe/${praise.clan.tribe.toLowerCase()}`}
                      className="hover:text-amber-600 transition"
                    >
                      {praise.clan.name} Clan ({praise.clan.tribe} Tribe)
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}