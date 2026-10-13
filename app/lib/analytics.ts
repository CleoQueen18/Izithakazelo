// app/lib/analytics.ts

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track a clan or surname search
 */
export function trackClanSearch(searchTerm: string) {
  trackEvent("clan_search", {
    search_term: searchTerm,
  });
}

/**
 * Track a clan page view
 */
export function trackClanView(clanName: string, tribe: string) {
  trackEvent("clan_view", {
    clan_name: clanName,
    tribe: tribe,
  });
}

/**
 * Track a story view
 */
export function trackStoryView(storyTitle: string, storyId: number) {
  trackEvent("story_view", {
    story_title: storyTitle,
    story_id: storyId,
  });
}

/**
 * Track a social share
 */
export function trackSocialShare(platform: string, content: string) {
  trackEvent("social_share", {
    platform: platform,
    content: content,
  });
}

/**
 * Track a contribution submission
 */
export function trackContributionSubmit(type: string) {
  trackEvent("contribution_submit", {
    contribution_type: type,
  });
}