"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SocialShare from "@/app/components/SocialShare";
import {
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";

type Tribe = {
  name: string;
  clanCount: number;
  surnameCount: number;
};

// Map tribe names to their icon images
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

const tribeStyles: Record<
  string,
  {
    accent: string;
    bg: string;
    iconBg: string;
  }
> = {
  Ndebele: {
    accent: "text-emerald-800",
    bg: "from-emerald-50 to-white",
    iconBg: "bg-emerald-700",
  },
  Pedi: {
    accent: "text-orange-700",
    bg: "from-orange-50 to-white",
    iconBg: "bg-orange-600",
  },
  Sotho: {
    accent: "text-lime-800",
    bg: "from-lime-50 to-white",
    iconBg: "bg-lime-700",
  },
  Swati: {
    accent: "text-yellow-700",
    bg: "from-yellow-50 to-white",
    iconBg: "bg-yellow-600",
  },
  Tsonga: {
    accent: "text-amber-800",
    bg: "from-amber-50 to-white",
    iconBg: "bg-amber-700",
  },
  Tswana: {
    accent: "text-cyan-800",
    bg: "from-cyan-50 to-white",
    iconBg: "bg-cyan-700",
  },
  Venda: {
    accent: "text-purple-800",
    bg: "from-purple-50 to-white",
    iconBg: "bg-purple-700",
  },
  Xhosa: {
    accent: "text-blue-800",
    bg: "from-blue-50 to-white",
    iconBg: "bg-blue-700",
  },
  Zulu: {
    accent: "text-red-800",
    bg: "from-red-50 to-white",
    iconBg: "bg-red-700",
  },
};

export default function TribesPage() {
  const router = useRouter();

  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTribes() {
      try {
        setLoading(true);

        const res = await fetch("/api/clans");
        const clans = await res.json();

        const tribeMap = new Map<
          string,
          {
            clanCount: number;
            surnameCount: number;
          }
        >();

        clans.forEach((clan: any) => {
          const tribeName = clan.tribe;
          const surnameCount = clan.surnames?.length || 0;

          if (tribeMap.has(tribeName)) {
            const existing = tribeMap.get(tribeName)!;

            tribeMap.set(tribeName, {
              clanCount: existing.clanCount + 1,
              surnameCount: existing.surnameCount + surnameCount,
            });
          } else {
            tribeMap.set(tribeName, {
              clanCount: 1,
              surnameCount,
            });
          }
        });

        const tribeList = Array.from(tribeMap.entries()).map(
          ([name, data]) => ({
            name,
            clanCount: data.clanCount,
            surnameCount: data.surnameCount,
          })
        );

        setTribes(
          tribeList.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error("Error fetching tribes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTribes();
  }, []);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f1e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-700 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-500 text-sm">
            Loading tribes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Tribe2.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="min-h-screen bg-black/50">
        {/* HERO SECTION */}
        <div className="relative h-[280px]">
          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <button
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2 text-white/80 hover:text-white transition text-sm w-fit"
            >
              ← Back
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 uppercase tracking-[0.2em] text-xs font-semibold">
                    Cultural Heritage
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  African Tribes
                </h1>

                <p className="mt-3 text-base text-white/80 max-w-xl">
                  Explore the rich heritage, clans,
                  praises, and surnames of{" "}
                  {tribes.length} African tribes.
                </p>

                <div className="w-16 h-0.5 bg-amber-500 rounded-full mt-4" />
              </div>

              <div className="self-start md:self-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3">
                  <SocialShare
                    title="African Tribes - Izithakazelo"
                    text="Explore the rich heritage of African tribes, their clans, surnames, and praises."
                    url={shareUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-amber-400 font-semibold text-xs uppercase tracking-wider">
                Browse Tribes
              </p>

              <h2 className="text-2xl font-bold text-white mt-1">
                Discover Heritage
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <Shield className="w-3 h-3 text-amber-400" />
              <span className="text-xs text-white/70">
                Preserving Culture
              </span>
            </div>
          </div>

          {/* TRIBES GRID with Image Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tribes.map((tribe) => {
              const style =
                tribeStyles[tribe.name] || {
                  accent: "text-gray-800",
                  bg: "from-gray-50 to-white",
                  iconBg: "bg-gray-700",
                };

              return (
                <Link
                  key={tribe.name}
                  href={`/tribe/${tribe.name.toLowerCase()}`}
                  className={`group relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  <div className="p-5">
                    {/* Header with Image Icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center shadow-md overflow-hidden`}
                        >
                          <Image
                            src={getTribeIcon(tribe.name)}
                            alt={`${tribe.name} tribe`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>

                        <div>
                          <h2
                            className={`text-xl font-bold ${style.accent}`}
                          >
                            {tribe.name}
                          </h2>

                          <p className="text-gray-500 text-xs mt-0.5">
                            Cultural Tribe
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border border-gray-100">
                        Tribe
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-2xl font-black text-gray-800">
                            {tribe.clanCount}
                          </span>
                        </div>

                        <p className="text-gray-500 text-xs mt-1">
                          Clans
                        </p>
                      </div>

                      <div className="border-l border-gray-200 pl-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-2xl font-black text-gray-800">
                            {tribe.surnameCount}
                          </span>
                        </div>

                        <p className="text-gray-500 text-xs mt-1">
                          Surnames
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <p
                        className={`text-xs font-medium ${style.accent}`}
                      >
                        Explore heritage
                      </p>

                      <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover:translate-x-0.5 transition">
                        <ChevronRight
                          className={`w-4 h-4 ${style.accent}`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}