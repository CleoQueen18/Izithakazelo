"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Story = {
  id: number;
  title: string;
  summary: string;
  content: string;
  clan: { id: number; name: string; tribe: string } | null;
  imageUrl: string | null;
  createdAt: string;
};

type RelatedStory = {
  id: number;
  title: string;
  summary: string;
};

const BACKGROUND_IMAGE = "https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/features-bg.png";

// Helper function to calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Helper function to extract headings for table of contents
function extractHeadings(content: string): { text: string; id: string }[] {
  const headingRegex = /<h2>(.*?)<\/h2>/g;
  const matches = [...content.matchAll(headingRegex)];
  return matches.map((match, index) => ({
    text: match[1],
    id: `section-${index}`
  }));
}

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [relatedStories, setRelatedStories] = useState<RelatedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showPrint, setShowPrint] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progressPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(progressPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch story and related stories
  useEffect(() => {
    async function fetchStory() {
      try {
        setLoading(true);
        const res = await fetch(`/api/featured-stories/${params.id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError("Story not found");
          } else {
            setError("Failed to load story");
          }
          return;
        }
        
        const data = await res.json();
        setStory(data);
        
        // Extract headings for table of contents
        if (data.content) {
          const extractedHeadings = extractHeadings(data.content);
          setHeadings(extractedHeadings);
        }
        
        // Fetch related stories (same tribe)
        if (data.clan?.tribe) {
          const storiesRes = await fetch("/api/stories");
          const allStories = await storiesRes.json();
          const related = allStories
            .filter((s: Story) => s.id !== data.id && s.clan?.tribe === data.clan?.tribe)
            .slice(0, 3)
            .map((s: Story) => ({ id: s.id, title: s.title, summary: s.summary }));
          setRelatedStories(related);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      fetchStory();
    }
  }, [params.id]);

  // Print function
  const handlePrint = () => {
    const printContent = contentRef.current?.innerHTML;
    const originalTitle = document.title;
    document.title = story?.title || "Izithakazelo Story";
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>${story?.title}</title>
          <style>
            body { font-family: Georgia, serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { color: #b45309; }
            h2 { color: #78350f; margin-top: 1.5rem; }
            .date { color: #666; margin-bottom: 2rem; }
            img { max-width: 100%; height: auto; }
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${story?.title}</h1>
          <div class="date">${new Date(story?.createdAt || "").toLocaleDateString()}</div>
          ${printContent}
          <p style="margin-top: 2rem; color: #666;">Source: Izithakazelo Heritage Platform</p>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
    document.title = originalTitle;
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-white/20 rounded w-24"></div>
            <div className="h-10 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
              <div className="h-4 bg-white/20 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div 
        className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Story Not Found</h1>
          <p className="text-white/70 mb-8">{error || "The story you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.push("/stories")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-xl transition"
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  const readingTime = getReadingTime(story.content || story.summary);
  const formattedDate = new Date(story.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-amber-500/20 z-50 no-print">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10">
        {/* Decorative top bar */}
        <div className="w-full h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500" />

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 text-sm no-print">
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition">Home</Link>
            <span className="mx-2 text-white/40">/</span>
            <Link href="/stories" className="text-amber-400 hover:text-amber-300 transition">Stories</Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-white/60">{story.title.substring(0, 50)}...</span>
          </div>

          {/* Back Button and Print Button */}
          <div className="flex justify-between items-center mb-6 no-print">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-white/70 hover:text-white transition"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back to Stories</span>
            </button>
            
            <button
              onClick={handlePrint}
              className="group flex items-center gap-2 text-white/70 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="text-sm">Print</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber-400" />
              <span className="text-sm uppercase tracking-[0.25em] text-amber-400 font-semibold">
                Featured Clan Story
              </span>
              <div className="w-8 h-px bg-amber-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
              </div>
              
              <div className="flex items-center gap-2 text-white/50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
              
              {story.clan && (
                <>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-2 text-white/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <Link
                      href={`/tribe/${story.clan.tribe.toLowerCase()}`}
                      className="text-amber-400 hover:text-amber-300 transition font-medium"
                    >
                      {story.clan.name} Clan • {story.clan.tribe} Tribe
                    </Link>
                  </div>
                </>
              )}
            </div>
            
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mt-6 rounded-full" />
          </div>

          {/* Two Column Layout: Table of Contents + Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents - Desktop Sidebar */}
            {headings.length > 0 && (
              <div className="lg:w-64 flex-shrink-0 no-print">
                <div className="sticky top-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4">
                  <h3 className="text-white font-semibold text-sm mb-3">On this page</h3>
                  <ul className="space-y-2">
                    {headings.map((heading, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => scrollToSection(heading.id)}
                          className="text-white/60 hover:text-amber-400 text-sm transition text-left"
                        >
                          {heading.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Image (if available) */}
              {story.imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-64 md:h-96 w-full">
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Story Content Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="w-full h-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500" />
                
                <div className="p-6 md:p-10 lg:p-12" ref={contentRef}>
                  <div 
                    className="story-content"
                    dangerouslySetInnerHTML={{ __html: story.content || story.summary }}
                  />
                </div>
              </div>

              {/* Share Buttons at Bottom */}
              <div className="mt-8 flex justify-center gap-3 no-print">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                  Share
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                  Tweet
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>

          {/* Related Stories */}
          {relatedStories.length > 0 && (
            <div className="mt-12 no-print">
              <div className="border-t border-white/20 pt-8">
                <h2 className="text-xl font-semibold text-white mb-6">Related Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedStories.map((related) => (
                    <Link key={related.id} href={`/stories/${related.id}`}>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4 hover:bg-white/20 transition group">
                        <h3 className="text-white font-semibold group-hover:text-amber-400 transition">
                          {related.title}
                        </h3>
                        <p className="text-white/50 text-sm mt-1 line-clamp-2">
                          {related.summary}
                        </p>
                        <span className="text-amber-400 text-sm mt-2 inline-block group-hover:translate-x-1 transition">
                          Read →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-12 no-print">
            <div className="bg-gradient-to-r from-amber-600/20 to-amber-700/20 backdrop-blur-sm rounded-xl border border-amber-500/30 p-6 text-center">
              <h3 className="text-white font-semibold text-lg mb-2">Enjoy this story?</h3>
              <p className="text-white/60 text-sm mb-4">Get more heritage stories delivered to your inbox.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-10 pt-6 border-t border-white/20 no-print">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => router.push("/stories")}
                className="group flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Stories
              </button>
              
              {story.clan && (
                <Link
                  href={`/clans`}
                  className="group flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition"
                >
                  Explore More {story.clan.name} Clan Heritage
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

// Scroll to Top Component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 no-print"
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}