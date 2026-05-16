"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FeaturedStory = {
  id: number;
  title: string;
  summary: string;
  content: string;
  isActive: boolean;
  displayOrder: number;
  clanId: number | null;
};

export default function ManageStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<FeaturedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    clanId: "",
    displayOrder: 0,
  });

  useEffect(() => {
    fetchStories();
  }, []);

  async function fetchStories() {
    try {
      const res = await fetch("/api/featured-stories");
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/featured-stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          clanId: form.clanId ? parseInt(form.clanId) : null,
          displayOrder: parseInt(form.displayOrder.toString()),
        }),
      });
      
      if (res.ok) {
        setShowForm(false);
        setForm({ title: "", summary: "", content: "", clanId: "", displayOrder: 0 });
        fetchStories();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <button onClick={() => router.back()} className="text-gray-500 hover:text-amber-700 text-sm mb-2">
            ← Back to Admin
          </button>
          <h1 className="text-3xl font-semibold text-gray-800">Manage Featured Stories</h1>
          <p className="text-gray-500 mt-1">Create and manage stories that appear on the homepage</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-xl transition"
        >
          + Add Story
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-amber-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">New Featured Story</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border border-amber-100 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                required
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full px-4 py-2 border border-amber-100 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) })}
                className="w-32 px-4 py-2 border border-amber-100 rounded-xl"
              />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition">
              Create Story
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl border border-amber-100 p-6">
            <h3 className="text-xl font-semibold text-gray-800">{story.title}</h3>
            <p className="text-gray-500 mt-2 line-clamp-2">{story.summary}</p>
            <div className="flex gap-2 mt-4">
              <span className={`px-2 py-1 rounded-full text-xs ${story.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {story.isActive ? "Active" : "Inactive"}
              </span>
              <span className="text-xs text-gray-400">Order: {story.displayOrder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}