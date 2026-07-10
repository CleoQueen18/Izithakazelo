"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Send,
  BookOpen,
  Users,
  HeartHandshake,
} from "lucide-react";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f6f1ea] flex items-center justify-center px-6">
        <div className="bg-white border border-[#e7ded1] shadow-xl rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#b85c24]/10 flex items-center justify-center mx-auto mb-4">
            <Send className="text-[#b85c24]" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#1e293b] mb-3">Message Sent</h1>
          <p className="text-[#64748b] text-sm leading-relaxed mb-6">
            Thank you for reaching out. Your message has been received.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-[#b85c24] hover:bg-[#9f4e1d] text-white px-6 py-2.5 rounded-xl transition shadow-md text-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/features-bg.png')" }}
    >
      {/* Hero Section */}
      <section className="relative h-[280px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/izithakazelo.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-20 text-white/80 hover:text-white transition text-sm"
        >
          ← Back
        </button>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <div className="w-16 h-0.5 bg-[#c26a2d] mx-auto mb-4" />
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            Share your story, contribution, or questions with the Izithakazelo community.
          </p>
        </div>
      </section>

      {/* Main Content - NO harsh white wash */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Semi-transparent dark */}
          <div className="relative overflow-hidden rounded-2xl bg-[#20140d]/80 backdrop-blur-sm text-white p-8 shadow-xl border border-white/20">
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Let's Preserve Heritage Together</h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Share clan praises, oral history, or collaborate with us.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Email</p>
                    <p className="text-sm">info.izithakazelo.co.za</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Location</p>
                    <p className="text-sm">South Africa</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <BookOpen size={16} className="mb-2 text-[#d6a16d]" />
                  <h3 className="text-xs font-semibold mb-1">Share Stories</h3>
                  <p className="text-xs text-white/70">Preserve oral traditions</p>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <Users size={16} className="mb-2 text-[#d6a16d]" />
                  <h3 className="text-xs font-semibold mb-1">Contribute</h3>
                  <p className="text-xs text-white/70">Expand our archive</p>
                </div>
                <div className="bg-white/10 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <HeartHandshake size={16} className="mb-2 text-[#d6a16d]" />
                  <h3 className="text-xs font-semibold mb-1">Collaborate</h3>
                  <p className="text-xs text-white/70">Cultural initiatives</p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/20 pt-5">
                <p className="italic text-white/80 text-xs leading-relaxed">
                  “When roots are deep, there is no reason to fear the wind.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Semi-transparent white */}
          <div className="bg-white/90 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#1e293b] mb-2">Send a Message</h2>
              <p className="text-sm text-[#64748b]">Fill out the form below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ded1] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#c26a2d] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7ded1] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#c26a2d] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">Subject</label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e7ded1] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#c26a2d] text-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Contribution">Contribution Question</option>
                  <option value="Correction">Correction Request</option>
                  <option value="Partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e7ded1] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#c26a2d] resize-none text-sm"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#b85c24] hover:bg-[#9f4e1d] text-white py-2.5 rounded-xl font-medium transition shadow-md text-sm disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}