"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import SocialShare from "@/app/components/SocialShare";
import { trackStoryView } from "@/app/lib/analytics";

type ClanRelation = {
  id: number;
  clan_praise: string;
  sourceTitle: string | null;
  sourceUrl: string | null;
  verificationStatus: string;
  isRebuilding: boolean;
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
  const [surname, setSurname] = useState<SurnameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (params.surnameName) {
      setSurnameName(decodeURIComponent(params.surnameName as string));
    }
  }, [params.surnameName]);

  useEffect(() => {
    if (!surnameName) return;

    async function fetchSurname() {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await fetch(
          `/api/surname/${encodeURIComponent(surnameName)}`
        );

        if (!res.ok) {
          if (res.status === 404) {
            setNotFound(true);
            setSurname(null);
            return;
          }
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setSurname(data);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSurname();
  }, [surnameName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent" />
          <p className="mt-5 text-sm text-gray-500">
            Loading {surnameName}...
          </p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <span className="text-2xl">⌕</span>
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-gray-900">
            {surnameName} isn't in our database yet
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            We don't yet have a record for this surname. Know someone with
            this surname? You can help us build the archive.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/clans"
              className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Browse clans
            </Link>
            <Link
              href="/contribute"
              className="rounded-full bg-amber-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              Add this surname
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!surname) return null;

  const clanCount = surname.clans.length;

  return (
    <main className="min-h-screen bg-[#faf7f2] text-gray-800">
      {/* HEADER */}
      <section className="bg-[#211b16] text-white">
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white"
          >
            ← Back
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
            Surname
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            {surname.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
            {surname.language && (
              <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                {surname.language}
              </span>
            )}
            {surname.origin && (
              <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                {surname.origin}
              </span>
            )}
            <span className="text-white/50">
              {clanCount} {clanCount === 1 ? "clan connection" : "clan connections"}
            </span>
          </div>
        </div>
      </section>

      {/* CLAN CONNECTIONS */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {clanCount === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <h2 className="text-xl font-semibold text-gray-900">
              No clan connections recorded yet
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              This surname is in our database, but no clans have been linked
              to it yet. If you know which clans this surname belongs to,
              please share what you know.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-700">
              Clans & Praises
            </h2>

            {surname.clans.map((rel) => (
              <div
                key={rel.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rel.clan.name} Clan
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {rel.clan.tribe} tribe
                      </p>
                    </div>
                    {rel.clan_praise && !rel.isRebuilding && (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-medium text-green-700 ring-1 ring-green-200">
                        Contributed
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  {rel.isRebuilding || !rel.clan_praise ? (
                    <div>
                      <p className="text-sm leading-6 text-gray-600">
                        We don't yet have verified izithakazelo for{" "}
                        <span className="font-medium text-gray-900">
                          {surname.name}
                        </span>{" "}
                        in the {rel.clan.name} clan.
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Know the praises? Share what you know.
                      </p>

                      <div className="mt-4">
                        <Link
                          href="/contribute"
                          className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
                        >
                          Contribute Now
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <blockquote className="border-l-2 border-amber-400 pl-4 text-base italic leading-7 text-gray-700">
                        "{rel.clan_praise}"
                      </blockquote>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {rel.sourceTitle && (
                          <p className="text-xs text-gray-400">
                            Source:{" "}
                            {rel.sourceUrl ? (
                              <a
                                href={rel.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-amber-700 underline-offset-2 hover:underline"
                              >
                                {rel.sourceTitle}
                              </a>
                            ) : (
                              <span className="font-medium text-gray-600">
                                {rel.sourceTitle}
                              </span>
                            )}
                          </p>
                        )}

                        <SocialShare
                          title={`${surname.name} - ${rel.clan.name} Clan`}
                          text={`"${rel.clan_praise}" - ${surname.name} (${rel.clan.name} Clan)`}
                          url={`${shareUrl}`}
                          clanId={rel.clan.id}
                          clanName={rel.clan.name}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTINUE EXPLORING */}
        <div className="mt-12 rounded-2xl border border-amber-100 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-gray-900">
            Explore other surnames
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Browse the archive of clans and surnames connected to our heritage.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/clans"
              className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              Browse all clans →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}