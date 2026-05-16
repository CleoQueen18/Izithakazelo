"use client";

import { useEffect, useState } from "react";

type AnalyticsData = {
  stats: { platform: string; _count: { platform: number } }[];
  total: number;
  topClans: { clanName: string; _count: { clanName: number } }[];
};

export default function ShareAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/share?period=${period}`);
        const analytics = await res.json();
        setData(analytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [period]);

  const platformColors: Record<string, string> = {
    whatsapp: "bg-green-500",
    facebook: "bg-blue-600",
    twitter: "bg-sky-500",
    pinterest: "bg-red-600",
    email: "bg-gray-500",
    copy: "bg-purple-500",
  };

  const platformIcons: Record<string, string> = {
    whatsapp: " ",
    facebook: " ",
    twitter: " ",
    pinterest: " ",
    email: " ",
    copy: " ",
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C2633B]"></div>
      </div>
    );
  }

  if (!data || data.total === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No share data yet. Start sharing clans to see analytics!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex gap-2">
        {["day", "week", "month", "all"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              period === p
                ? "bg-[#C2633B] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Total Shares */}
      <div className="bg-gradient-to-r from-[#2C1810] to-[#4A2C20] text-white rounded-lg p-6 text-center">
        <p className="text-sm text-amber-200">Total Shares</p>
        <p className="text-4xl font-bold">{data.total}</p>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#2C1810] mb-4">Shares by Platform</h3>
        <div className="space-y-3">
          {data.stats.map((stat) => {
            const percentage = ((stat._count.platform / data.total) * 100).toFixed(1);
            return (
              <div key={stat.platform}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <span>{platformIcons[stat.platform]}</span>
                    <span className="capitalize">{stat.platform}</span>
                  </span>
                  <span>{stat._count.platform} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${platformColors[stat.platform]} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Shared Clans */}
      {data.topClans.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#2C1810] mb-4">Most Shared Clans</h3>
          <div className="space-y-2">
            {data.topClans.map((clan, index) => (
              <div key={clan.clanName} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#C2633B]">#{index + 1}</span>
                  <span className="text-gray-700">{clan.clanName}</span>
                </div>
                <span className="text-sm text-gray-500">{clan._count.clanName} shares</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}