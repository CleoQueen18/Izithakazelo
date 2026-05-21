"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SocialShare from "@/app/components/SocialShare";

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
  originStory: string | null;
  history: string | null;
  surnames: ClanSurname[];
};

// Map tribe names to their background images
const getTribeBackground = (tribeName: string): string => {
  const bgMap: Record<string, string> = {
    Zulu: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/zulu1.png",
    Xhosa: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/xhosa1.png",
    Swati: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/swati1.png",
    Ndebele: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/ndebele1.png",
    Sotho: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/sotho1.png",
    Tswana: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/tswana1.png",
    Venda: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/venda1.png",
    Tsonga: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/tsonga1.png",
    Pedi: "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/pedi1.png",
  };
  return bgMap[tribeName] || "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/Tribe2.png";
};

export default function TribeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tribeName, setTribeName] = useState<string>("");
  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedClans, setExpandedClans] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function getTribeName() {
      const resolvedParams = await params;
      setTribeName(resolvedParams.tribeName as string);
    }
    getTribeName();
  }, [params]);

  useEffect(() => {
    async function fetchTribeData() {
      if (!tribeName) return;
      
      try {
        setLoading(true);
        const res = await fetch(`/api/${tribeName}`);
        
        if (!res.ok) {
          setError(`No tribe found named "${tribeName}"`);
          return;
        }
        
        const data = await res.json();
        setClans(Array.isArray(data) ? data : []);
        if (data.length > 0) {
          setExpandedClans(new Set([data[0].id]));
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchTribeData();
  }, [tribeName]);

  const toggleClan = (clanId: number) => {
    setExpandedClans(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clanId)) {
        newSet.delete(clanId);
      } else {
        newSet.add(clanId);
      }
      return newSet;
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const displayTribeName = tribeName ? tribeName.charAt(0).toUpperCase() + tribeName.slice(1) : '';
  const backgroundImage = getTribeBackground(displayTribeName);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Loading tribe data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tribe Not Found</h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (clans.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">No clans found for this tribe.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={() => router.back()}
            className="mb-6 text-white/80 hover:text-white transition text-sm"
          >
            ← Back
          </button>

          <div className="mb-10 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {displayTribeName} Tribe
              </h1>
              <p className="text-white/70 text-lg">
                {clans.length} clan{clans.length !== 1 ? 's' : ''}
              </p>
              <div className="w-16 h-1 bg-amber-500 mt-4 rounded-full" />
            </div>
            <SocialShare
              title={`${displayTribeName} Tribe - Izithakazelo`}
              text={`Explore the clans and heritage of the ${displayTribeName} tribe.`}
              url={shareUrl}
            />
          </div>

          <div className="space-y-6">
            {clans.map((clan) => {
              const isExpanded = expandedClans.has(clan.id);
              
              return (
                <div key={clan.id} className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-sm">
                  {/* Clan Header - Clickable */}
                  <button
                    onClick={() => toggleClan(clan.id)}
                    className="w-full text-left bg-gradient-to-r from-amber-50/80 to-white/80 px-6 py-4 hover:bg-amber-100/50 transition flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {clan.name} Clan
                      </h2>
                      <p className="text-sm text-amber-600">{clan.tribe} Tribe</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {clan.surnames.length} surnames
                      </span>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="divide-y divide-amber-50 animate-fade-in">
                      {/* Origin Story Section */}
                      {clan.originStory && (
                        <div className="p-6 bg-gradient-to-r from-amber-50/50 to-transparent">
                          <h3 className="text-lg font-semibold text-amber-700 mb-3">Origin Story</h3>
                          <p className="text-gray-700 leading-relaxed">
                            {clan.originStory}
                          </p>
                        </div>
                      )}
                      
                      {/* History Section */}
                      {clan.history && (
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">History & Legacy</h3>
                          <p className="text-gray-600 leading-relaxed">
                            {clan.history}
                          </p>
                        </div>
                      )}
                      
                      {/* Surnames Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Surnames & Praises</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {clan.surnames.map((item) => (
                            <div key={item.id} className="bg-white/50 rounded-xl p-4 hover:shadow-md transition">
                              <Link 
                                href={`/surname/${encodeURIComponent(item.surname.name)}`}
                                className="font-semibold text-gray-800 hover:text-amber-700 transition text-lg"
                              >
                                {item.surname.name}
                              </Link>
                              <p className="text-gray-500 text-sm italic mt-2">
                                "{item.clan_praise}"
                              </p>
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                {item.surname.origin && <span> {item.surname.origin}</span>}
                                {item.surname.language && <span> {item.surname.language}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}