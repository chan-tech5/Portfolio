'use client';

/**
 * Abstract client-side analytics service layer.
 * Tracks events to the local database via POST /api/analytics,
 * and is structured to easily integrate with enterprise analytics
 * providers (Firebase, Vercel KV, Supabase, etc.) in the future.
 */

interface TrackEventDetails {
  projectId?: string;
  linkType?: 'github' | 'linkedin' | 'whatsapp' | 'calendly' | string;
  referrer?: string;
  device?: string;
  country?: string;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

export function getReferrerSource(): string {
  if (typeof window === 'undefined') return 'Direct';
  const ref = document.referrer;
  if (!ref) return 'Direct';
  
  try {
    const url = new URL(ref);
    if (url.hostname.includes('linkedin.com')) return 'LinkedIn';
    if (url.hostname.includes('github.com')) return 'GitHub';
    if (url.hostname.includes('google.com')) return 'Google';
    if (url.hostname.includes('t.co') || url.hostname.includes('twitter.com') || url.hostname.includes('x.com')) return 'Twitter / X';
    return url.hostname;
  } catch {
    return 'Other';
  }
}

export async function trackEvent(eventType: 'visitor' | 'resume_download' | 'link_click' | 'project_view', details: TrackEventDetails = {}) {
  if (typeof window === 'undefined') return;

  // Set default details
  const eventPayload = {
    type: eventType,
    device: details.device || getDeviceType(),
    referrer: details.referrer || getReferrerSource(),
    projectId: details.projectId,
    linkType: details.linkType,
    timestamp: new Date().toISOString(),
  };

  // Local console log for development debugging
  console.log(`[Analytics Event] ${eventType}:`, eventPayload);

  try {
    // Post event to local tracking API
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
      keepalive: true, // keeps request alive even if user closes tab/navigates away
    });

    if (!res.ok) {
      console.warn('Analytics logging failed: API returned status', res.status);
    }
  } catch (error) {
    // Fail silently in production so analytics never break user interactions
    console.error('Analytics tracking error:', error);
  }
}
