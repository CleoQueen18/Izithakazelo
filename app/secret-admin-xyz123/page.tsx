"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Contribution = {
  id: number;
  type: string;
  data: string;
  contributorName: string;
  contributorEmail: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
};

const ADMIN_PASSWORD = "BeeC@1218"; // Change this!

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [filter, setFilter] = useState("PENDING");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Check authentication on load
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setAuthenticated(true);
      fetchContributions();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
      fetchContributions();
    } else {
      alert("Incorrect password");
    }
  };

  async function fetchContributions() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/contributions");
      const data = await res.json();
      setContributions(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setNotification({ type: "error", message: "Failed to load contributions." });
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    try {
      const res = await fetch("/api/admin/contributions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      
      if (!res.ok) throw new Error("Failed to update");
      
      setNotification({ type: "success", message: `Contribution ${status.toLowerCase()} successfully!` });
      setSelectedContribution(null);
      setAdminNotes("");
      fetchContributions();
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update contribution." });
    }
  }

  async function deleteContribution(id: number) {
    if (!confirm("Are you sure you want to delete this contribution?")) return;
    
    try {
      const res = await fetch(`/api/admin/contributions?id=${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete");
      
      setNotification({ type: "success", message: "Contribution deleted successfully!" });
      fetchContributions();
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ type: "error", message: "Failed to delete contribution." });
    }
  }

  async function handleLogout() {
    sessionStorage.removeItem("adminAuth");
    setAuthenticated(false);
    router.push("/");
  }

  const filteredContributions = contributions.filter(c => 
    filter === "ALL" || c.status === filter
  );

  const pendingCount = contributions.filter(c => c.status === "PENDING").length;
  const approvedCount = contributions.filter(c => c.status === "APPROVED").length;
  const rejectedCount = contributions.filter(c => c.status === "REJECTED").length;

  // Show login screen if not authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
          <p className="text-gray-500 text-center mb-6">Enter password to continue</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading after authentication
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent mx-auto" />
        <p className="mt-4 text-gray-500">Loading admin dashboard...</p>
      </div>
    );
  }

  // Admin content
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header with Logout Button */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-amber-700 transition text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-semibold text-gray-800 mt-2">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage user contributions to the heritage archive</p>
          <div className="w-16 h-1 bg-amber-600 mt-4 rounded-full" />
        </div>
        
        <div className="flex gap-3">
          <Link
            href="/admin/stories"
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-xl transition font-medium"
          >
            Manage Stories
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{pendingCount}</div>
          <div className="text-sm text-yellow-600">Pending Review</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-700">{approvedCount}</div>
          <div className="text-sm text-green-600">Approved</div>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 border border-red-200">
          <div className="text-2xl font-bold text-red-700">{rejectedCount}</div>
          <div className="text-sm text-red-600">Rejected</div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-xl ${notification.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {notification.message}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-amber-100">
        {["PENDING", "APPROVED", "REJECTED", "ALL"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-t-lg transition ${
              filter === tab
                ? "bg-amber-700 text-white"
                : "text-gray-500 hover:text-amber-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contributions List */}
      {filteredContributions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100">
          <p className="text-gray-500">No contributions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContributions.map((contribution) => {
            let data;
            try {
              data = JSON.parse(contribution.data);
            } catch {
              data = { error: "Invalid JSON" };
            }
            
            return (
              <div key={contribution.id} className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          contribution.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                          contribution.status === "APPROVED" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {contribution.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(contribution.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {contribution.type.replace("_", " ")}
                      </h3>
                      <p className="text-sm text-gray-500">
                        From: {contribution.contributorName}
                        {contribution.contributorEmail && ` (${contribution.contributorEmail})`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedContribution(contribution);
                          setAdminNotes(contribution.adminNotes || "");
                        }}
                        className="text-amber-700 hover:text-amber-800 text-sm"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => deleteContribution(contribution.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 mt-2">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Review Contribution</h2>
                <button
                  onClick={() => setSelectedContribution(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <p className="text-gray-600">{selectedContribution.type.replace("_", " ")}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(JSON.parse(selectedContribution.data), null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contributor</label>
                  <p className="text-gray-600">{selectedContribution.contributorName}</p>
                  {selectedContribution.contributorEmail && (
                    <p className="text-sm text-gray-400">{selectedContribution.contributorEmail}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    placeholder="Add any notes about this decision..."
                    className="w-full px-4 py-3 border border-amber-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => updateStatus(selectedContribution.id, "APPROVED")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedContribution.id, "REJECTED")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}