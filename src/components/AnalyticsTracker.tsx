'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Record page visit on mount
    trackEvent('visitor');
  }, []);

  return null; // Invisible component
}
