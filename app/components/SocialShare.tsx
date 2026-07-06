"use client";

import { useState } from "react";

type SocialShareProps = {
  title: string;
  text: string;
  url: string;
  clanId?: number;
  clanName?: string;
};

export default function SocialShare({ title, text, url, clanId, clanName }: SocialShareProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
  };

  const trackShare = async (platform: string) => {
    if (clanId && clanName) {
      try {
        await fetch("/api/analytics/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clanId,
            clanName,
            platform,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error("Failed to track share:", error);
      }
    }
  };

  const handleShare = (platform: string, link: string) => {
    trackShare(platform);
    window.open(link, "_blank");
    setShowPopup(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      trackShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="flex items-center gap-1 text-gray-400 hover:text-[#D4A017] transition text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>

      {showPopup && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowPopup(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-lg border border-[#D4A017] p-2 min-w-[160px]">
            <button
              onClick={() => handleShare("whatsapp", shareLinks.whatsapp)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-lg"
            >
              <span className="text-lg">📱</span> WhatsApp
            </button>
            <button
              onClick={() => handleShare("email", shareLinks.email)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <span className="text-lg">✉️</span> Email
            </button>
            <div className="border-t border-[#D4A017] my-1" />
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <span className="text-lg">🔗</span> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}