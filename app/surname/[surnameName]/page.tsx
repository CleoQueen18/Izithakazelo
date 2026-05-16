"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SocialShare from "@/app/components/SocialShare";

type ClanRelation = {
  id: number;
  clan_praise: string;
  clan: {
    id: number;
    name: string;
    tribe: string;
    description: string | null;
  };
};

type SurnameData = {
  id: number;
  name: string;
  origin: string | null;
  language: string | null;
  clans: ClanRelation[];
};

export default function SurnameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [surnameName, setSurnameName] = useState<string>("");
  const [data, setData] = useState<SurnameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSurnameName() {
      const resolvedParams = await params;
      setSurnameName(resolvedParams.surnameName as string);
    }
    getSurnameName();
  }, [params]);

  useEffect(() => {
    async function fetchSurnameData() {
      if (!surnameName) return;
      
      try {
        setLoading(true);
        const res = await fetch(`/api/surname/${encodeURIComponent(surnameName)}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError(`Surname "${surnameName}" not found`);
          } else {
            setError("Failed to load surname data");
          }
          return;
        }
        
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchSurnameData();
  }, [surnameName]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Loading surname data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Surname Not Found</h1>
        <p className="text-gray-500 mb-8">{error || "No data available"}</p>
        <button
          onClick={() => router.push("/clans")}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
        >
          Browse All Clans
        </button>
      </div>
    );
  }

  const displayName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-gray-500 hover:text-amber-700 transition text-sm"
      >
        ← Back
      </button>

      {/* Surname Header with Share Button */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-3">
            {displayName}
          </h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
            {data.origin && <span>Origin: {data.origin}</span>}
            {data.language && <span>Language: {data.language}</span>}
          </div>
          <div className="w-16 h-1 bg-amber-600 mt-4 rounded-full" />
        </div>
        <SocialShare
          title={`${displayName} - Izithakazelo Surname`}
          text={`Learn about the surname ${displayName} and its associated clans. Origin: ${data.origin || 'Various'} | Language: ${data.language || 'Various'}`}
          url={shareUrl}
        />
      </div>

      {/* Clans that bear this surname */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Clans that bear the name {displayName}
        </h2>
        <p className="text-gray-500 mb-6">
          This surname appears in {data.clans.length} clan{data.clans.length !== 1 ? 's' : ''}
        </p>
        
        {data.clans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
            <p className="text-gray-500">This surname is not associated with any clans yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.clans.map((relation) => (
              <div key={relation.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="bg-gradient-to-r from-amber-50 to-white px-6 py-4 border-b border-amber-100">
                  <Link 
                    href={`/tribe/${relation.clan.tribe.toLowerCase()}`}
                    className="text-sm text-amber-600 hover:text-amber-700 transition"
                  >
                    {relation.clan.tribe} Tribe
                  </Link>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-1">
                    {relation.clan.name} Clan
                  </h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "{relation.clan_praise}"
                  </p>
                  {relation.clan.description && (
                    <p className="text-gray-500 text-sm mt-4 pt-4 border-t border-amber-50">
                      {relation.clan.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 text-center mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Know more about this surname?</h3>
        <p className="text-gray-600 mb-4">Help us preserve heritage by contributing additional information.</p>
        <Link
          href="/clans#add-form"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
        >
          Contribute Now
        </Link>
      </div>
    </div>
  );
}