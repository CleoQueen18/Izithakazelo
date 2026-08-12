"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Send,
  BookOpen,
  Users,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const BACKGROUND_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png";

const HERO_IMAGE =
  "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png";

export default function ContactPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessageCount = (text: string): { count: number; color: string } => {
    const count = text.length;
    if (count > 800) return { count, color: "text-amber-600" };
    if (count > 500) return { count, color: "text-amber-500" };
    return { count, color: "text-[#94a3b8]" };
  };

  /* =========================
     SUCCESS STATE
  ========================= */

  if (submitted) {
    return (
      <main
        className="min-h-screen bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url("${BACKGROUND_IMAGE}")`,
        }}
      >
        <div className="absolute inset-0 bg-[#1b1009]/75" />

        <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-16">
          <div className="w-full max-w-lg">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 sm:p-10 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-[#b85c24]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2
                  size={42}
                  className="text-[#b85c24]"
                  strokeWidth={1.8}
                />
              </div>

              <p className="text-[#b85c24] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                Message Received
              </p>

              <h1 className="text-3xl font-bold text-[#24170f] mb-4">
                Thank You for Reaching Out
              </h1>

              <p className="text-[#64748b] text-sm sm:text-base leading-relaxed mb-8">
                Your message has been received. Thank you for connecting with
                the Izithakazelo community and helping us preserve African
                heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center justify-center gap-2 bg-[#b85c24] hover:bg-[#9f4e1d] text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                >
                  Return Home
                  <ArrowRight size={16} />
                </button>

                <Link
                  href="/clans"
                  className="inline-flex items-center justify-center gap-2 bg-[#f4eee7] hover:bg-[#e9dfd3] text-[#4a3324] px-6 py-3 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  Explore Clans
                </Link>

                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center gap-2 bg-[#f4eee7] hover:bg-[#e9dfd3] text-[#4a3324] px-6 py-3 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  Send Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     MAIN PAGE
  ========================= */

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: `url("${BACKGROUND_IMAGE}")`,
      }}
    >
      {/* Global Overlay */}
      <div className="absolute inset-0 bg-[#1b1009]/65" />

      <div className="relative z-10">
        {/* =========================
            HERO
        ========================= */}

        <section className="relative min-h-[280px] sm:min-h-[390px] flex items-center justify-center overflow-hidden">
          {/* Hero Image using Next.js Image */}
          <Image
            src={HERO_IMAGE}
            alt="Izithakazelo heritage background"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />

          {/* Hero overlays */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#1b1009]/80" />

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-5 left-5 sm:top-7 sm:left-7 z-20 inline-flex items-center gap-2 text-white/75 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-5 max-w-3xl mx-auto pt-8">
            <p className="text-[#e2ad76] text-xs uppercase tracking-[0.25em] font-semibold mb-4">
              Connect With Us
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-5">
              Contact Us
            </h1>

            <div className="w-16 h-0.5 bg-[#c26a2d] mx-auto mb-5" />

            <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
              Share your story, contribute to our archive, ask a question, or
              connect with the Izithakazelo community.
            </p>
          </div>
        </section>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-start">
            {/* =========================
                LEFT INFORMATION PANEL
            ========================= */}

            <div className="relative overflow-hidden rounded-3xl bg-[#20140d]/85 backdrop-blur-xl text-white p-6 sm:p-8 shadow-2xl border border-white/10">
              {/* Decorative element */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#c26a2d]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-8">
                  <p className="text-[#d6a16d] text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                    Let&apos;s Connect
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                    Let&apos;s Preserve Heritage Together
                  </h2>

                  <p className="text-white/70 text-sm leading-relaxed">
                    Izithakazelo is built around preserving clan names, praises,
                    stories, and cultural knowledge. Your contribution helps
                    keep these traditions accessible for generations to come.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <Mail size={17} className="text-[#d6a16d]" />
                    </div>

                    <div>
                      <p className="text-xs text-white/50 mb-1">Email</p>

                      <a
                        href="mailto:info@izithakazelo.co.za"
                        className="text-sm text-white hover:text-[#e2ad76] transition-colors"
                      >
                        info@izithakazelo.co.za
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <MapPin size={17} className="text-[#d6a16d]" />
                    </div>

                    <div>
                      <p className="text-xs text-white/50 mb-1">Location</p>
                      <p className="text-sm text-white">South Africa</p>
                    </div>
                  </div>
                </div>

                {/* Feature cards - with hover animation */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
                  <div className="bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 rounded-2xl p-4 transition-all duration-300">
                    <BookOpen
                      size={18}
                      className="mb-3 text-[#d6a16d]"
                    />

                    <h3 className="text-sm font-semibold mb-1">
                      Share Stories
                    </h3>

                    <p className="text-xs text-white/55 leading-relaxed">
                      Help preserve oral traditions and family histories.
                    </p>
                  </div>

                  <div className="bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 rounded-2xl p-4 transition-all duration-300">
                    <Users
                      size={18}
                      className="mb-3 text-[#d6a16d]"
                    />

                    <h3 className="text-sm font-semibold mb-1">
                      Contribute
                    </h3>

                    <p className="text-xs text-white/55 leading-relaxed">
                      Add clan praises, surnames, and cultural knowledge.
                    </p>
                  </div>

                  <div className="bg-white/5 hover:bg-white/10 hover:-translate-y-1 border border-white/10 rounded-2xl p-4 transition-all duration-300">
                    <HeartHandshake
                      size={18}
                      className="mb-3 text-[#d6a16d]"
                    />

                    <h3 className="text-sm font-semibold mb-1">
                      Collaborate
                    </h3>

                    <p className="text-xs text-white/55 leading-relaxed">
                      Work with us on cultural preservation initiatives.
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="italic text-white/65 text-sm leading-relaxed">
                    &ldquo;When roots are deep, there is no reason to fear the
                    wind.&rdquo;
                  </p>
                </div>

                {/* Quick links */}
                <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  <Link
                    href="/contribute"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm transition-colors"
                  >
                    Contribute
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href="/stories"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-sm transition-colors"
                  >
                    Explore Stories
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* =========================
                CONTACT FORM
            ========================= */}

            <div className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-7">
                <p className="text-[#b85c24] text-xs uppercase tracking-[0.18em] font-semibold mb-2">
                  Get In Touch
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] mb-2">
                  Send a Message
                </h2>

                <p className="text-sm text-[#64748b] leading-relaxed">
                  Have a question, correction, story, or partnership idea?
                  We&apos;d love to hear from you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-[#334155] mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ded1] bg-white focus:outline-none focus:ring-2 focus:ring-[#c26a2d]/40 focus:border-[#c26a2d] text-sm text-[#1e293b] placeholder:text-[#94a3b8] transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[#334155] mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ded1] bg-white focus:outline-none focus:ring-2 focus:ring-[#c26a2d]/40 focus:border-[#c26a2d] text-sm text-[#1e293b] placeholder:text-[#94a3b8] transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-[#334155] mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ded1] bg-white focus:outline-none focus:ring-2 focus:ring-[#c26a2d]/40 focus:border-[#c26a2d] text-sm text-[#1e293b] transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">
                      General Inquiry
                    </option>
                    <option value="Contribution">
                      Contribution Question
                    </option>
                    <option value="Correction">
                      Correction Request
                    </option>
                    <option value="Partnership">
                      Partnership Opportunity
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-[#334155]"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>

                    <span className={`text-[10px] ${getMessageCount(formData.message).color}`}>
                      {getMessageCount(formData.message).count}/1000
                    </span>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ded1] bg-white focus:outline-none focus:ring-2 focus:ring-[#c26a2d]/40 focus:border-[#c26a2d] resize-none text-sm text-[#1e293b] placeholder:text-[#94a3b8] transition"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm p-4 rounded-xl"
                  >
                    <span className="mt-0.5">⚠️</span>
                    <div>
                      <p>{error}</p>
                      <button
                        type="button"
                        onClick={() => setError("")}
                        className="mt-1 text-red-800 font-medium underline hover:no-underline transition"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#b85c24] hover:bg-[#9f4e1d] text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#94a3b8] leading-relaxed">
                  Your information is only used to respond to your message.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* =========================
            FOOTER NOTE
        ========================= */}

        <div className="text-center py-8">
          <p className="text-white/40 text-xs">
            Izithakazelo • Preserving heritage, one story at a time.
          </p>
        </div>
      </div>
    </main>
  );
}