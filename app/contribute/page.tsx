"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ContributionType = "NEW_SURNAME" | "NEW_PRAISE" | "CORRECTION";

const BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/Contribute.png";

type FormState = {
  surname: string;
  clanName: string;
  clan_praise: string;
  origin: string;
  language: string;
  contributorName: string;
  contributorEmail: string;
  correctionDetails: string;
};

const initialForm: FormState = {
  surname: "",
  clanName: "",
  clan_praise: "",
  origin: "",
  language: "",
  contributorName: "",
  contributorEmail: "",
  correctionDetails: "",
};

export default function ContributePage() {
  const router = useRouter();

  const [contributionType, setContributionType] =
    useState<ContributionType>("NEW_SURNAME");

  const [form, setForm] = useState<FormState>(initialForm);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const changeContributionType = (type: ContributionType) => {
    setContributionType(type);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    let data: Record<string, string> = {};

    if (contributionType === "NEW_SURNAME") {
      data = {
        surname: form.surname.trim(),
        origin: form.origin.trim(),
        language: form.language,
      };
    }

    if (contributionType === "NEW_PRAISE") {
      data = {
        surname: form.surname.trim(),
        clanName: form.clanName.trim(),
        clan_praise: form.clan_praise.trim(),
        origin: form.origin.trim(),
        language: form.language,
      };
    }

    if (contributionType === "CORRECTION") {
      data = {
        details: form.correctionDetails.trim(),
      };
    }

    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: contributionType,
          data,
          contributorName: form.contributorName.trim() || "Anonymous",
          contributorEmail: form.contributorEmail.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit contribution");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error("Contribution error:", err);

      setError(
        "We couldn't submit your contribution right now. Please try again."
      );
      setRetryCount((prev) => prev + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setContributionType("NEW_SURNAME");
    setForm(initialForm);
    setError(null);
    setRetryCount(0);
  };

  // Helper to get character count with warning
  const getCharacterCount = (text: string): string => {
    const count = text.length;
    if (count === 0) return "0 characters";
    if (count > 500) return `${count} characters (consider shortening)`;
    return `${count} characters`;
  };

  /*
   * SUCCESS SCREEN
   */
  if (submitted) {
    return (
      <main
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url("${BACKGROUND_IMAGE}")`,
        }}
      >
        <div className="min-h-screen bg-black/65 backdrop-blur-[2px] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-xl">
            <button
              onClick={() => router.back()}
              className="mb-6 text-white/70 hover:text-white transition text-sm flex items-center gap-2"
            >
              <span>←</span>
              Back
            </button>

            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
              {/* Success icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                <svg
                  className="h-10 w-10 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold mb-3">
                Contribution Received
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#2b1d14] mb-4">
                Thank You for Preserving Our Heritage
              </h1>

              <p className="text-gray-600 leading-relaxed mb-8">
                Your contribution has been successfully received. Our team
                will review the information before it is published on
                Izithakazelo.
              </p>

              <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 mb-8">
                <p className="text-sm text-amber-900 leading-relaxed">
                  Every surname, praise and story shared helps preserve
                  cultural knowledge for future generations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 rounded-xl bg-amber-700 hover:bg-amber-800 text-white px-5 py-3 font-medium transition"
                >
                  Submit Another
                </button>

                <button
                  onClick={() => router.push("/clans")}
                  className="flex-1 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-3 font-medium transition"
                >
                  Explore Clans
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Know someone else who might want to contribute?{" "}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Izithakazelo - Contribute to Heritage",
                        text: "Help preserve African heritage by sharing your knowledge.",
                        url: window.location.href,
                      });
                    }
                  }}
                  className="text-amber-700 hover:text-amber-800 font-medium transition"
                >
                  Share this page
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * MAIN PAGE
   */
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url("${BACKGROUND_IMAGE}")`,
      }}
    >
      <div className="min-h-screen bg-[#1b120c]/75">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-10">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="mb-8 text-white/70 hover:text-white transition text-sm inline-flex items-center gap-2"
          >
            <span className="text-lg">←</span>
            Back
          </button>

          {/* HEADER */}
          <header className="max-w-3xl mb-8 sm:mb-10">
            <p className="text-amber-400 text-xs uppercase tracking-[0.2em] font-medium mb-3">
              Preserve • Share • Remember
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Contribute to{" "}
              <span className="text-amber-400">Izithakazelo</span>
            </h1>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
              Help preserve African heritage by sharing clan names, surnames,
              izithakazelo and cultural knowledge with the community.
            </p>

            <div className="w-16 h-1 bg-amber-500 rounded-full mt-5" />
          </header>

          {/* IMPORTANT NOTICE */}
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 backdrop-blur-sm p-4 sm:p-5">
            <div className="flex gap-3">
              <div className="shrink-0 text-amber-400 text-lg">
                ℹ
              </div>

              <div>
                <h2 className="text-sm font-semibold text-amber-200 mb-1">
                  Before you submit
                </h2>

                <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed">
                  Contributions are reviewed before being published. Please
                  provide information as accurately as possible and avoid
                  submitting private or sensitive personal information.
                </p>
              </div>
            </div>
          </div>

          {/* CONTRIBUTION TYPE */}
          <section className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
            <div className="p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
                  Step 1
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-[#2b1d14]">
                  What would you like to contribute?
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose the type of information you want to share.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* NEW SURNAME */}
                <button
                  type="button"
                  onClick={() =>
                    changeContributionType("NEW_SURNAME")
                  }
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    contributionType === "NEW_SURNAME"
                      ? "bg-amber-700 border-amber-700 text-white shadow-lg"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <div
                    className={`text-2xl mb-3 ${
                      contributionType === "NEW_SURNAME"
                        ? "text-white"
                        : "text-amber-700"
                    }`}
                  >
                    Aa
                  </div>

                  <h3 className="font-semibold mb-1">
                    New Surname
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      contributionType === "NEW_SURNAME"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    Add a surname that is not currently listed.
                  </p>
                </button>

                {/* NEW PRAISE */}
                <button
                  type="button"
                  onClick={() =>
                    changeContributionType("NEW_PRAISE")
                  }
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    contributionType === "NEW_PRAISE"
                      ? "bg-amber-700 border-amber-700 text-white shadow-lg"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <div
                    className={`text-2xl mb-3 ${
                      contributionType === "NEW_PRAISE"
                        ? "text-white"
                        : "text-amber-700"
                    }`}
                  >
                    ✦
                  </div>

                  <h3 className="font-semibold mb-1">
                    Clan Praise
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      contributionType === "NEW_PRAISE"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    Share an izithakazelo or clan praise.
                  </p>
                </button>

                {/* CORRECTION */}
                <button
                  type="button"
                  onClick={() =>
                    changeContributionType("CORRECTION")
                  }
                  className={`text-left rounded-2xl border p-4 transition-all ${
                    contributionType === "CORRECTION"
                      ? "bg-amber-700 border-amber-700 text-white shadow-lg"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <div
                    className={`text-2xl mb-3 ${
                      contributionType === "CORRECTION"
                        ? "text-white"
                        : "text-amber-700"
                    }`}
                  >
                    ✓
                  </div>

                  <h3 className="font-semibold mb-1">
                    Correction
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      contributionType === "CORRECTION"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    Tell us about incorrect or missing information.
                  </p>
                </button>
              </div>
            </div>
          </section>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6"
          >
            <div className="p-5 sm:p-7">

              {/* FORM HEADER */}
              <div className="mb-7">
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
                  Step 2
                </p>

                <h2 className="text-xl sm:text-2xl font-bold text-[#2b1d14]">
                  {contributionType === "NEW_SURNAME" &&
                    "Add a New Surname"}

                  {contributionType === "NEW_PRAISE" &&
                    "Add a New Clan Praise"}

                  {contributionType === "CORRECTION" &&
                    "Submit a Correction"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Please provide as much accurate information as you can.
                </p>
              </div>

              <div className="space-y-5">

                {/* SURNAME */}
                {(contributionType === "NEW_SURNAME" ||
                  contributionType === "NEW_PRAISE") && (
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Surname <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="surname"
                      type="text"
                      required
                      value={form.surname}
                      onChange={(e) =>
                        updateForm("surname", e.target.value)
                      }
                      placeholder="e.g. Dlamini, Nkosi, Mkhize"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                )}

                {/* CLAN NAME */}
                {contributionType === "NEW_PRAISE" && (
                  <div>
                    <label
                      htmlFor="clanName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Clan Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="clanName"
                      type="text"
                      required
                      value={form.clanName}
                      onChange={(e) =>
                        updateForm("clanName", e.target.value)
                      }
                      placeholder="Enter the clan name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                )}

                {/* PRAISE */}
                {contributionType === "NEW_PRAISE" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="clanPraise"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Clan Praise / Izithakazelo{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <span className={`text-xs ${
                        form.clan_praise.length > 500 
                          ? "text-amber-600" 
                          : "text-gray-400"
                      }`}>
                        {getCharacterCount(form.clan_praise)}
                      </span>
                    </div>

                    <textarea
                      id="clanPraise"
                      required
                      rows={7}
                      value={form.clan_praise}
                      onChange={(e) =>
                        updateForm("clan_praise", e.target.value)
                      }
                      placeholder="Enter the full clan praise or izithakazelo..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-y"
                    />

                    <p className="text-xs text-gray-400 mt-2">
                      Please preserve the wording and spelling as accurately
                      as possible.
                    </p>
                  </div>
                )}

                {/* ORIGIN + LANGUAGE */}
                {(contributionType === "NEW_SURNAME" ||
                  contributionType === "NEW_PRAISE") && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="origin"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Origin
                      </label>

                      <input
                        id="origin"
                        type="text"
                        value={form.origin}
                        onChange={(e) =>
                          updateForm("origin", e.target.value)
                        }
                        placeholder="e.g. KwaZulu-Natal"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Language
                      </label>

                      <select
                        id="language"
                        value={form.language}
                        onChange={(e) =>
                          updateForm("language", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      >
                        <option value="">Select language</option>
                        <option value="isiZulu">isiZulu</option>
                        <option value="isiXhosa">isiXhosa</option>
                        <option value="siSwati">siSwati</option>
                        <option value="isiNdebele">isiNdebele</option>
                        <option value="Sesotho">Sesotho</option>
                        <option value="Setswana">Setswana</option>
                        <option value="Sepedi">Sepedi</option>
                        <option value="Tshivenda">Tshivenda</option>
                        <option value="Xitsonga">Xitsonga</option>
                        <option value="English">English</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* CORRECTION */}
                {contributionType === "CORRECTION" && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="correction"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Feedback / Correction{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <span className={`text-xs ${
                        form.correctionDetails.length > 1000 
                          ? "text-amber-600" 
                          : "text-gray-400"
                      }`}>
                        {getCharacterCount(form.correctionDetails)}
                      </span>
                    </div>

                    <textarea
                      id="correction"
                      required
                      minLength={10}
                      rows={8}
                      value={form.correctionDetails}
                      onChange={(e) =>
                        updateForm(
                          "correctionDetails",
                          e.target.value
                        )
                      }
                      placeholder="Tell us what information is incorrect, incomplete, or missing. Include the surname, clan or page where possible."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-y"
                    />
                  </div>
                )}

                {/* CONTRIBUTOR INFORMATION */}
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800">
                      About You
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Optional — providing your details allows us to contact
                      you if we need clarification.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contributorName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Your Name
                      </label>

                      <input
                        id="contributorName"
                        type="text"
                        value={form.contributorName}
                        onChange={(e) =>
                          updateForm(
                            "contributorName",
                            e.target.value
                          )
                        }
                        placeholder="Anonymous"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contributorEmail"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email
                      </label>

                      <input
                        id="contributorEmail"
                        type="email"
                        value={form.contributorEmail}
                        onChange={(e) =>
                          updateForm(
                            "contributorEmail",
                            e.target.value
                          )
                        }
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />

                      <p className="text-xs text-gray-400 mt-2">
                        Only provide this if you would like us to follow up.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    <div className="flex gap-2 items-start">
                      <span>⚠</span>
                      <div>
                        <p>{error}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setError(null);
                            // Re-trigger submit by dispatching event
                            const form = document.querySelector('form');
                            if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                          }}
                          className="mt-2 text-red-800 font-medium underline hover:no-underline transition"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBMIT */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-amber-700 hover:bg-amber-800 text-white py-3.5 px-6 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                          aria-hidden="true"
                        />
                        Submitting Contribution...
                      </>
                    ) : (
                      <>
                        Submit Contribution
                        <span>→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-3">
                    Your contribution will be reviewed before publication.
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* WHY CONTRIBUTE */}
          <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
                Why your contribution matters
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-[#2b1d14] mb-3">
                Help keep our heritage alive
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Cultural knowledge is often passed from generation to
                generation through families and communities. By sharing
                surnames, clan praises and corrections, you can help create a
                growing record of this heritage for future generations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-amber-700 font-semibold text-sm mb-1">
                    Preserve
                  </p>
                  <p className="text-xs text-gray-600">
                    Keep cultural knowledge accessible.
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-amber-700 font-semibold text-sm mb-1">
                    Share
                  </p>
                  <p className="text-xs text-gray-600">
                    Help others discover their heritage.
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <p className="text-amber-700 font-semibold text-sm mb-1">
                    Connect
                  </p>
                  <p className="text-xs text-gray-600">
                    Help communities preserve their stories.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER NOTE */}
          <div className="text-center py-8">
            <p className="text-white/40 text-xs">
              Izithakazelo • Preserving heritage, one story at a time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}