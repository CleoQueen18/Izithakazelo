"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ContributionType = "NEW_SURNAME" | "NEW_PRAISE" | "CORRECTION";

export default function ContributePage() {
  const router = useRouter();
  const [contributionType, setContributionType] = useState<ContributionType>("NEW_SURNAME");
  const [form, setForm] = useState({
    surname: "",
    clanName: "",
    clan_praise: "",
    origin: "",
    language: "",
    contributorName: "",
    contributorEmail: "",
    correctionDetails: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    let data = {};
    
    if (contributionType === "NEW_SURNAME") {
      data = {
        surname: form.surname,
        origin: form.origin,
        language: form.language,
      };
    } else if (contributionType === "NEW_PRAISE") {
      data = {
        surname: form.surname,
        clanName: form.clanName,
        clan_praise: form.clan_praise,
        origin: form.origin,
        language: form.language,
      };
    } else {
      data = {
        details: form.correctionDetails,
      };
    }
    
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: contributionType,
          data,
          contributorName: form.contributorName || "Anonymous",
          contributorEmail: form.contributorEmail || null,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to submit");
      
      setSubmitted(true);
      setForm({
        surname: "",
        clanName: "",
        clan_praise: "",
        origin: "",
        language: "",
        contributorName: "",
        contributorEmail: "",
        correctionDetails: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/Contribute.png')" }}
      >
        <div className="min-h-screen bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-amber-100">
              <div className="text-5xl mb-4">🙏</div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-3">Thank You for Your Contribution!</h1>
              <p className="text-gray-600 mb-6">
                Your submission has been received and will be reviewed by our team. 
                We appreciate your help in preserving African heritage.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setContributionType("NEW_SURNAME");
                }}
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-xl transition"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/Contribute.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 text-white/80 hover:text-white transition text-sm"
          >
            ← Back
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contribute to Izithakazelo</h1>
            <p className="text-white/70 text-sm">
              Help us preserve African heritage by sharing your knowledge of clan names, praises, and histories.
            </p>
            <div className="w-16 h-1 bg-amber-500 mt-4 rounded-full" />
          </div>

          {/* Contribution Type Selector */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">What would you like to contribute?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setContributionType("NEW_SURNAME")}
                className={`px-4 py-3 rounded-xl transition ${
                  contributionType === "NEW_SURNAME"
                    ? "bg-amber-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                New Surname
              </button>
              <button
                type="button"
                onClick={() => setContributionType("NEW_PRAISE")}
                className={`px-4 py-3 rounded-xl transition ${
                  contributionType === "NEW_PRAISE"
                    ? "bg-amber-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                New Clan Praise
              </button>
              <button
                type="button"
                onClick={() => setContributionType("CORRECTION")}
                className={`px-4 py-3 rounded-xl transition ${
                  contributionType === "CORRECTION"
                    ? "bg-amber-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Correction / Feedback
              </button>
            </div>
          </div>

          {/* Contribution Form */}
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {contributionType === "NEW_SURNAME" && "Add a New Surname"}
              {contributionType === "NEW_PRAISE" && "Add a New Clan Praise"}
              {contributionType === "CORRECTION" && "Submit a Correction or Feedback"}
            </h2>

            <div className="space-y-4">
              {/* Surname Field (for NEW_SURNAME and NEW_PRAISE) */}
              {(contributionType === "NEW_SURNAME" || contributionType === "NEW_PRAISE") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Surname *</label>
                  <input
                    type="text"
                    required
                    value={form.surname}
                    onChange={(e) => setForm({ ...form, surname: e.target.value })}
                    placeholder="e.g., Dlamini, Nkosi, Mkhize"
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              )}

              {/* Clan Name (for NEW_PRAISE) */}
              {contributionType === "NEW_PRAISE" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clan Name *</label>
                  <input
                    type="text"
                    required
                    value={form.clanName}
                    onChange={(e) => setForm({ ...form, clanName: e.target.value })}
                    placeholder="e.g., Zulu, Xhosa, Swati"
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              )}

              {/* Clan Praise (for NEW_PRAISE) */}
              {contributionType === "NEW_PRAISE" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clan Praise (Izithakazelo) *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.clan_praise}
                    onChange={(e) => setForm({ ...form, clan_praise: e.target.value })}
                    placeholder="Enter the praise poem..."
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              )}

              {/* Origin */}
              {(contributionType === "NEW_SURNAME" || contributionType === "NEW_PRAISE") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                    placeholder="e.g., KwaZulu-Natal, Eastern Cape"
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              )}

              {/* Language */}
              {(contributionType === "NEW_SURNAME" || contributionType === "NEW_PRAISE") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="">Select language</option>
                    <option value="isiZulu">isiZulu</option>
                    <option value="isiXhosa">isiXhosa</option>
                    <option value="siSwati">siSwati</option>
                    <option value="isiNdebele">isiNdebele</option>
                    <option value="Sesotho">Sesotho</option>
                    <option value="Setswana">Setswana</option>
                    <option value="English">English</option>
                  </select>
                </div>
              )}

              {/* Correction Details */}
              {contributionType === "CORRECTION" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback / Correction *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.correctionDetails}
                    onChange={(e) => setForm({ ...form, correctionDetails: e.target.value })}
                    placeholder="Please describe what needs to be corrected or added..."
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-amber-100 pt-4 mt-2">
                <p className="text-sm text-gray-500 mb-4">About You (Optional but helpful)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={form.contributorName}
                      onChange={(e) => setForm({ ...form, contributorName: e.target.value })}
                      placeholder="Anonymous"
                      className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (for follow-up)</label>
                    <input
                      type="email"
                      value={form.contributorEmail}
                      onChange={(e) => setForm({ ...form, contributorEmail: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl transition font-medium disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Contribution"}
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-amber-100">
            <h3 className="font-semibold text-gray-800 mb-2">Why contribute?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Your contributions help preserve African heritage for future generations. 
              All submissions are reviewed by our team before being published.
            </p>
            <p className="text-xs text-gray-500">
              Thank you for being part of this important cultural preservation effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}