"use client";

import { useState } from "react";

type ContributePraiseFormProps = {
  surname: string;
  clanName: string;
  clanId?: number;
  surnameId?: number;
};

export default function ContributePraiseForm({
  surname,
  clanName,
  clanId,
  surnameId,
}: ContributePraiseFormProps) {
  const [open, setOpen] = useState(false);
  const [praise, setPraise] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "SURNAME_PRAISE",
          data: {
            surname,
            clanName,
            clanId,
            surnameId,
            praise,
            source,
          },
          contributorName: contributorName || "Anonymous",
          contributorEmail: null,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setPraise("");
      setContributorName("");
      setSource("");

      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setError("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
      >
        Share what you know
        <span aria-hidden="true">→</span>
      </button>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-800">
          ✅ Thank you for your contribution
        </p>
        <p className="mt-1 text-xs text-green-700">
          Your submission has been received and will be reviewed before
          appearing on the platform.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Share the {surname} izithakazelo
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {clanName} clan · All submissions are reviewed before appearing.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            The izithakazelo *
          </label>
          <textarea
            required
            rows={4}
            value={praise}
            onChange={(e) => setPraise(e.target.value)}
            placeholder="Type the clan praises as you know them..."
            className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your name (optional)
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="e.g. Thandi Mthembu"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              How do you know this? (optional)
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g. My grandmother, a family book"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit for review"}
        </button>
      </div>
    </form>
  );
}