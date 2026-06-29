"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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

const BACKGROUND_IMAGE = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Clans.png";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function ClansContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clans, setClans] = useState<Clan[]>([]);
  const [selectedTribe, setSelectedTribe] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedClans, setExpandedClans] = useState<Set<number>>(new Set());
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    surname: "",
    clanName: "",
    clan_praise: "",
    origin: "",
    language: "",
  });
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const tribes = ["All", "Zulu", "Xhosa", "Swati", "Ndebele", "Sotho", "Tswana", "Venda", "Tsonga", "Pedi"];

  useEffect(() => {
    const letter = searchParams.get("letter");
    if (letter && alphabet.includes(letter)) {
      setSelectedLetter(letter);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchClans();
  }, []);

  async function fetchClans() {
    try {
      setLoading(true);
      const res = await fetch("/api/clans");
      const data = await res.json();
      setClans(data);
      if (data.length > 0) {
        setExpandedClans(new Set([data[0].id]));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setNotification({ type: "error", message: "Failed to load clans." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/clans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) throw new Error("Failed to save");
      
      setNotification({ type: "success", message: "Clan praise added!" });
      setForm({ surname: "", clanName: "", clan_praise: "", origin: "", language: "" });
      setShowAddForm(false);
      fetchClans();
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to save." });
    }
  }

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

  const expandAll = () => {
    const allIds = new Set(filteredClans.map(c => c.id));
    setExpandedClans(allIds);
  };

  const collapseAll = () => {
    setExpandedClans(new Set());
  };

  const clearLetterFilter = () => {
    setSelectedLetter("");
    router.push("/clans");
  };

  let filteredClans = selectedTribe && selectedTribe !== "All"
    ? clans.filter(clan => clan.tribe === selectedTribe)
    : clans;

  if (selectedLetter) {
    filteredClans = filteredClans
      .map(clan => ({
        ...clan,
        surnames: clan.surnames.filter(item => 
          item.surname.name.charAt(0).toUpperCase() === selectedLetter
        )
      }))
      .filter(clan => clan.surnames.length > 0);
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-700 border-t-transparent mx-auto" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
    >
      <div className="min-h-screen bg-[#2b1d14]/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="text-amber-300 hover:text-amber-200 transition text-sm mb-3 inline-block"
            >
              ← Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Clan Names & Praises
            </h1>
            <p className="text-amber-200/60 text-xs">
              Explore the rich heritage of African clans and their praises
            </p>
          </div>

          {notification && (
            <div className={`mb-4 p-2 rounded-lg text-sm ${notification.type === "success" ? "bg-green-500/30 text-green-200" : "bg-red-500/30 text-red-200"}`}>
              {notification.message}
            </div>
          )}

          {selectedLetter && (
            <div className="mb-3 flex items-center justify-between bg-amber-500/30 rounded-lg px-3 py-1.5">
              <span className="text-sm text-white">
                Filtering by: <strong>{selectedLetter}</strong>
              </span>
              <button
                onClick={clearLetterFilter}
                className="text-sm text-white/80 hover:text-white transition"
              >
                Clear ✕
              </button>
            </div>
          )}

          <div className="bg-[#2b1d14]/70 backdrop-blur-sm rounded-xl border border-amber-800/30 p-3 mb-4 flex flex-wrap items-center justify-between gap-2">
            <select
              value={selectedTribe}
              onChange={(e) => setSelectedTribe(e.target.value)}
              className="px-3 py-1.5 border border-amber-800/30 rounded-lg bg-[#2b1d14]/70 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {tribes.map(tribe => (
                <option key={tribe} value={tribe} className="bg-[#2b1d14]">{tribe}</option>
              ))}
            </select>
            
            <div className="flex gap-1">
              <button
                onClick={expandAll}
                className="text-amber-300 hover:text-amber-200 text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-amber-300 hover:text-amber-200 text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition"
              >
                Collapse All
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-amber-400 hover:text-amber-300 text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Alphabet - UPDATED TO MATCH HOMEPAGE STYLE */}
          <div className="bg-[#2b1d14]/70 backdrop-blur-sm rounded-xl border border-amber-800/30 p-3 sm:p-4 mb-4 overflow-hidden">
            <p className="text-amber-300/60 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 text-center">
              Filter by Surname Letter
            </p>
            <div className="w-full overflow-hidden px-0.5 sm:px-1">
              <div className="grid grid-cols-7 xs:grid-cols-8 sm:grid-cols-9 md:grid-cols-10 gap-1 sm:gap-1.5 max-w-full mx-auto">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(selectedLetter === letter ? "" : letter)}
                    className={`aspect-square w-full min-w-[28px] rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center h-8 xs:h-9 sm:h-10 ${
                      selectedLetter === letter
                        ? "bg-amber-600 text-white hover:bg-amber-700"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
                {selectedLetter && (
                  <button
                    onClick={clearLetterFilter}
                    className="col-span-2 xs:col-span-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center h-8 xs:h-9 sm:h-10 px-2 xs:px-3 min-w-[36px]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-[#2b1d14]/80 backdrop-blur-sm rounded-xl border border-amber-800/30 p-4 mb-4">
              <h2 className="text-white font-semibold text-sm mb-3">Add New Clan Praise</h2>
              <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Surname"
                  value={form.surname}
                  onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-[#2b1d14]/50 border border-amber-800/30 text-white text-sm placeholder:text-amber-300/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
                <select
                  value={form.clanName}
                  onChange={(e) => setForm({ ...form, clanName: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-[#2b1d14]/50 border border-amber-800/30 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                >
                  <option value="">Select Clan</option>
                  {clans.map(clan => (
                    <option key={clan.id} value={clan.name} className="bg-[#2b1d14]">{clan.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Clan Praise"
                  value={form.clan_praise}
                  onChange={(e) => setForm({ ...form, clan_praise: e.target.value })}
                  rows={2}
                  className="col-span-2 px-3 py-1.5 rounded-lg bg-[#2b1d14]/50 border border-amber-800/30 text-white text-sm placeholder:text-amber-300/40 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Origin"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-[#2b1d14]/50 border border-amber-800/30 text-white text-sm placeholder:text-amber-300/40"
                />
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-[#2b1d14]/50 border border-amber-800/30 text-white text-sm"
                >
                  <option value="">Language</option>
                  <option value="isiZulu">isiZulu</option>
                  <option value="isiXhosa">isiXhosa</option>
                  <option value="siSwati">siSwati</option>
                  <option value="isiNdebele">isiNdebele</option>
                  <option value="Sesotho">Sesotho</option>
                  <option value="English">English</option>
                </select>
                <div className="col-span-2 flex gap-2">
                  <button type="submit" className="bg-amber-700 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm transition">
                    Add
                  </button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {filteredClans.length === 0 ? (
            <div className="text-center py-12 bg-[#2b1d14]/70 backdrop-blur-sm rounded-xl border border-amber-800/30">
              <p className="text-amber-300/60 text-sm">No clans found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredClans.map((clan) => {
                const isExpanded = expandedClans.has(clan.id);
                
                return (
                  <div key={clan.id} className="bg-[#2b1d14]/80 backdrop-blur-sm rounded-xl border border-amber-800/30 overflow-hidden">
                    <button
                      onClick={() => toggleClan(clan.id)}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition flex justify-between items-center"
                    >
                      <div>
                        <h2 className="text-white font-semibold text-base">{clan.name} Clan</h2>
                        <p className="text-amber-300/60 text-xs">{clan.tribe} Tribe</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300/60 text-xs bg-white/5 px-1.5 py-0.5 rounded-full">
                          {clan.surnames.length}
                        </span>
                        <svg 
                          className={`w-4 h-4 text-amber-300/60 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="divide-y divide-amber-800/30 border-t border-amber-800/30">
                        <div className="px-4 pt-3">
                          <ClanImageGallery clanId={clan.id} />
                        </div>
                        
                        {clan.surnames.map((item) => (
                          <div key={item.id} className="px-4 py-3 hover:bg-white/5 transition">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1">
                                <Link 
                                  href={`/surname/${encodeURIComponent(item.surname.name)}`}
                                  className="text-white font-medium text-sm hover:text-amber-400 transition"
                                >
                                  {item.surname.name}
                                </Link>
                                <p className="text-amber-300/70 text-xs italic mt-1">
                                  "{item.clan_praise.substring(0, 80)}"
                                </p>
                                <div className="flex gap-3 text-amber-300/40 text-[10px] mt-1">
                                  {item.surname.origin && <span> {item.surname.origin}</span>}
                                  {item.surname.language && <span>{item.surname.language}</span>}
                                </div>
                              </div>
                              <SocialShare
                                title={`${item.surname.name} - Izithakazelo`}
                                text={`"${item.clan_praise}" - ${item.surname.name} (${clan.name} Clan)`}
                                url={`${shareUrl}/surname/${encodeURIComponent(item.surname.name)}`}
                                clanId={clan.id}
                                clanName={clan.name}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClansPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading clans...</div>}>
      <ClansContent />
    </Suspense>
  );
}